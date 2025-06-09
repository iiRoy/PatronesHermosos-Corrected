// src/components/headers_menu_users/OptionMenu.tsx

'use client';
import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { useNotification } from '../buttons_inputs/Notification';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Rectangle,
  LineChart,
  Line,
  Customized,
  XAxis as XAxisLine,
  YAxis as YAxisLine,
} from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { createRoot } from 'react-dom/client';
import MaxItemsInput from './options/MaxItemsInput';
import ColorPickerSection from './options/ColorPickerSection';
import FormatSelector from './options/FormatSelector';
import TableToggle from './options/TableToggle';
import DownloadButton from './options/DownloadButton';
import MinimizeButton from './options/MinimizeButton';
import { PieChart as RePieChart, Pie, Cell, LabelList } from 'recharts';
import type { OptionsMenuProps } from './options/types';
import FiltroEvento from '../headers_menu_users/FiltroEvento';
import { parseISO, format as formatDate } from 'date-fns';
import { es } from 'date-fns/locale';
import { line as d3LineShape, curveMonotoneX } from 'd3-shape';

interface ExtendedOptionsMenuProps extends OptionsMenuProps {
  outerLabels?: string[];
  outerColors?: string[];
  outerData?: any[];
  defaultOuterColors?: string[];
  restoreDefaultOuterColors?: () => void;
  setOuterColors?: (colors: string[]) => void;
  selectedFilters?: { [key: string]: string };
  setSelectedFilters?: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  chartType: 'pie' | 'bar' | 'line';
  selection?: string[];
  selectionChange?: (updated: string[]) => void;
}

const OptionsMenu: React.FC<ExtendedOptionsMenuProps> = (props) => {
  const {
    onMinimize,
    onMaxItemsChange,
    onToggleVisibility,
    maxItemsSelected,
    visible,
    setVisible,
    totalItems,
    defaultColors,
    defaultOuterColors,
    filteredData,
    xKey,
    seriesKeys,
    title,
    colors,
    setColors,
    outerData,
    elementLabels,
    restoreDefaultOuterColors,
    outerLabels = [],
    outerColors = [],
    setOuterColors = () => {},
    chartType,
    selection,
    selectionChange,
    selectedFilters,
    setSelectedFilters = () => {},
  } = props;

  // Para LineChart: número de filas (fechas) a incluir en la descarga
  const [downloadDateCount, setDownloadDateCount] = useState<number>(2);
  useEffect(() => {
    if (chartType === 'line') {
      const maxAllowed = Math.min(10, filteredData.length);
      setDownloadDateCount((prev) => {
        if (prev < 2) return 2;
        if (prev > maxAllowed) return maxAllowed;
        return prev;
      });
    }
  }, [filteredData, chartType]);

  // Estados globales del menú
  const fallbackFilters = useMemo(
    () => props.selectedFilters ?? { sede: '__all__' },
    [props.selectedFilters],
  );
  const [format, setFormat] = useState<'png' | 'jpg' | 'pdf'>('png');
  const [includeTable, setIncludeTable] = useState(true);
  const [currentView, setCurrentView] = useState<'customization' | 'download'>('customization');
  const [displayedView, setDisplayedView] = useState(currentView);
  const [transitionPhase, setTransitionPhase] = useState<'fadeOut' | 'fadeIn' | null>(null);
  const [isCustomizingColors, setIsCustomizingColors] = useState(false);
  const [customizingOuter, setCustomizingOuter] = useState(false);
  const [resetPickerSignal, setResetPickerSignal] = useState<number>(0);

  // Listas de sedes/roles para FiltroEvento (pie/line)
  const [sedes, setSedes] = useState<{ label: string; value: string }[]>([]);
  const [roles, setRoles] = useState<{ label: string; value: string }[]>([]);
  const [userRole, setUserRole] = useState<string>('');
  useEffect(() => {
    setUserRole(typeof window !== 'undefined' ? localStorage.getItem('user_role') || '' : '');
  }, []);

  const shouldShowSedeFilter = userRole === 'superuser';

  const fetchDashboardData = async (filters: {
    page: string;
    sede?: string;
    colab?: string;
  }): Promise<any> => {
    const { page, sede, colab } = filters;
    const params = new URLSearchParams();
    if (sede) params.append('id', sede);
    if (colab) params.append('colab', colab);
    try {
      const res = await fetch(`/api/data?page=${page}&${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('api_token') : ''}`,
        },
      });
      return await res.json();
    } catch (error) {
      console.error('Error cargando resumenEvento:', error);
      return null;
    }
  };

  const loadSedes = useCallback(async () => {
    try {
      const res = await fetchDashboardData({ page: 'venues' });
      if (res?.venues && Array.isArray(res.venues)) {
        const opciones = res.venues.map((sede: any) => ({
          value: sede.id.toString(),
          label: sede.name,
        }));
        setSedes([{ value: '__all__', label: 'Todas las sedes' }, ...opciones]);
      } else {
        console.warn('No se encontraron sedes o el formato de respuesta es incorrecto:', res);
      }
    } catch (error) {
      console.error('Error al cargar las sedes:', error);
    }
  }, []);

  const loadRoles = useCallback(async () => {
    try {
      const res = await fetchDashboardData({ page: 'roles' });
      if (res?.roles && Array.isArray(res.roles)) {
        const detalle = props.selectedFilters?.detalle ?? '1';
        const opciones: { value: string; label: string }[] = [];

        res.roles.forEach((rol: any) => {
          if (detalle === '1') {
            opciones.push({
              value: rol.value,
              label: rol.value.charAt(0).toUpperCase() + rol.value.slice(1),
            });
          } else if (detalle === '2') {
            if (rol.variante && Array.isArray(rol.variante)) {
              rol.variante.forEach((v: string) => {
                opciones.push({ value: v, label: v });
              });
            } else {
              opciones.push({
                value: rol.value,
                label: rol.value.charAt(0).toUpperCase() + rol.value.slice(1),
              });
            }
          }
        });

        setRoles(opciones);
      } else {
        console.warn('No se encontraron roles o el formato de respuesta es incorrecto:', res);
      }
    } catch (error) {
      console.error('Error al cargar los roles:', error);
    }
  }, [props.selectedFilters?.detalle]);

  useEffect(() => {
    if (chartType === 'pie' || chartType === 'line') {
      loadSedes();
      loadRoles();
    }
  }, [loadSedes, loadRoles, chartType]);

  const menuRef = useRef<HTMLDivElement>(null);
  const { notify } = useNotification();
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const isBarChart = chartType === 'bar';
  const isPieChart = chartType === 'pie';
  const isLineChart = chartType === 'line';

  function adjustTextColor(hex: string): string {
    const parsed = hex.replace('#', '');
    const r = parseInt(parsed.substring(0, 2), 16);
    const g = parseInt(parsed.substring(2, 4), 16);
    const b = parseInt(parsed.substring(4, 6), 16);
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    if (luminance > 170) {
      return `#${[r * 0.6, g * 0.6, b * 0.6]
        .map((c) => Math.round(Math.min(255, c)).toString(16).padStart(2, '0'))
        .join('')}`;
    } else {
      return `#${[r + (255 - r) * 0.5, g + (255 - g) * 0.5, b + (255 - b) * 0.5]
        .map((c) => Math.round(c).toString(16).padStart(2, '0'))
        .join('')}`;
    }
  }

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      setIsVisible(false);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 200);
    }
  }, [visible]);

  const handleClose = useCallback(() => {
    setVisible(false);
    setIsCustomizingColors(false);
  }, [setVisible]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' && (target as HTMLInputElement).type === 'color') return;
      if (menuRef.current?.contains(target)) return;
      handleClose();
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClose]);

  const handleViewChange = (targetView: 'customization' | 'download') => {
    if (currentView === targetView) return;
    setTransitionPhase('fadeOut');
    setTimeout(() => {
      setDisplayedView(targetView);
      setIsCustomizingColors(false);
      setCurrentView(targetView);
      setTransitionPhase('fadeIn');
      setTimeout(() => setTransitionPhase(null), 300);
    }, 250);
  };

  // ————————— Funciones auxiliares para dibujar “colisiones” en LineChart —————————

  // 1) Detecta qué roles colisionan en un mismo punto (mismo valor)
  const getExactRolesInCollision = (
    row: Record<string, any>,
    selectedRolesArr: string[],
    roleActual: string,
  ): string[] => {
    const valorActual = Number(row[roleActual] ?? 0);
    return selectedRolesArr.filter(
      (rol) => rol !== roleActual && Number(row[rol] ?? 0) === valorActual,
    );
  };

  // 2) Dibuja un “dot” circular, dividido en sectores si hay colisión
  const CollisionPieDot: React.FC<{
    cx: number;
    cy: number;
    r: number;
    roles: string[];
    roleColors: Record<string, string>;
  }> = ({ cx, cy, r, roles, roleColors }) => {
    if (roles.length <= 1) {
      const solo = roles[0] || '';
      return (
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill={roleColors[solo] || '#CCCCCC'}
          stroke='#fff'
          strokeWidth={1.5}
        />
      );
    }
    const slices = roles.length;
    const angleStep = (2 * Math.PI) / slices;
    const paths: JSX.Element[] = [];
    for (let i = 0; i < slices; i++) {
      const startAngle = i * angleStep - Math.PI / 2;
      const endAngle = startAngle + angleStep;
      const x1 = cx + r * Math.cos(startAngle);
      const y1 = cy + r * Math.sin(startAngle);
      const x2 = cx + r * Math.cos(endAngle);
      const y2 = cy + r * Math.sin(endAngle);
      const largeArc = angleStep > Math.PI ? 1 : 0;
      paths.push(
        <path
          key={i}
          d={`
            M ${cx} ${cy}
            L ${x1} ${y1}
            A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}
            Z
          `}
          fill={roleColors[roles[i]] || '#CCCCCC'}
          stroke='#fff'
          strokeWidth={0.5}
        />,
      );
    }
    return <g>{paths}</g>;
  };

  // 3) Dibuja segmentos “dash” multicolor cuando hay colisión en un tramo
  const MultiColorDashLine: React.FC<{
    points: { x: number; y: number }[];
    roles: string[];
    roleColors: Record<string, string>;
  }> = ({ points, roles, roleColors }) => {
    if (roles.length <= 1 || points.length < 2) return null;
    const TOTAL_DASHES = 8;
    const segments: JSX.Element[] = [];
    for (let i = 1; i < points.length; i++) {
      const p0 = points[i - 1];
      const p1 = points[i];
      const dx = p1.x - p0.x;
      const dy = p1.y - p0.y;
      for (let d = 0; d < TOTAL_DASHES; d++) {
        const t0 = d / TOTAL_DASHES;
        const t1 = (d + 0.5) / TOTAL_DASHES;
        const xStart = p0.x + dx * t0;
        const yStart = p0.y + dy * t0;
        const xEnd = p0.x + dx * t1;
        const yEnd = p0.y + dy * t1;
        const color = roleColors[roles[d % roles.length]] || '#CCCCCC';
        segments.push(
          <line
            key={`${i}-${d}`}
            x1={xStart}
            y1={yStart}
            x2={xEnd}
            y2={yEnd}
            stroke={color}
            strokeWidth={2.5}
            strokeLinecap='round'
          />,
        );
      }
    }
    return <g>{segments}</g>;
  };

  // ——— Método unificado de descarga (“handleDownload”) —————————————————————
  const handleDownload = async () => {
    const WIDTH = 1200;
    const HEIGHT_BASE = 800;
    const ROW_HEIGHT = 50;
    const TABLE_EXTRA =
      includeTable && !isLineChart ? (filteredData.length + 1) * ROW_HEIGHT + 10 : 0;
    const HEIGHT = HEIGHT_BASE + TABLE_EXTRA;

    // 1) Crear el “sandbox” oculto
    const sandbox = document.createElement('div');
    sandbox.style.position = 'fixed';
    sandbox.style.top = '-10000px';
    sandbox.style.left = '-10000px';
    sandbox.style.width = `${WIDTH}px`;
    sandbox.style.height = `${HEIGHT}px`;
    sandbox.style.zIndex = '-1';
    document.body.appendChild(sandbox);

    const tempRoot = document.createElement('div');
    sandbox.appendChild(tempRoot);

    // 2) Generar leyendas HTML según tipo
    let legendHtml = '';
    if (isBarChart) {
      legendHtml = seriesKeys
        .map((key, i) => {
          const label = key.charAt(0).toUpperCase() + key.slice(1);
          const color = colors[i % colors.length] || defaultColors[i];
          return `
            <div style="
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 3px;
              min-width: 120px;
              justify-content: center;
            ">
              <div style="
                width: 22px;
                height: 22px;
                border-radius: 50%;
                background: ${color};
                border: 1.5px solid #aaa;
                display: flex;
                align-items: center;
                justify-content: center;
              "></div>
              <span style="
                font-size: 17px;
                font-weight: 600;
                color: ${color};
                line-height: 22px;
                display: block;
                text-align: left;
              ">${label}</span>
            </div>
          `;
        })
        .join('');
    } else {
      // PieChart: leyendas internas (roles) y externas (estados)
      const outerLegendHtml = outerLabels
        .map((label, i) => {
          const color = outerColors[i];
          const total = (outerData ?? [])
            .filter((d) => d.name === label)
            .reduce((sum, d) => sum + (d.total ?? 0), 0);
          return `
            <div style="
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 4px;
              min-width: 120px;
              justify-content: center;
            ">
              <div style="
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background: ${color};
                border: 1.5px solid #aaa;
              "></div>
              <span style="
                font-size: 17px;
                font-weight: 600;
                color: ${color};
                text-align: center;
              ">${label}</span>
              <span style="
                font-size: 15px;
                color: #555;
                font-weight: 500;
              ">${total}</span>
            </div>
          `;
        })
        .join('');

      const innerLegendHtml =
        isPieChart &&
        elementLabels
          .map((label, i) => {
            const color = colors[i];
            const total = filteredData
              .filter((d) => d.name === label)
              .reduce((sum, d) => sum + (d.total ?? 0), 0);
            return `
              <div style="
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 4px;
                min-width: 120px;
                justify-content: center;
              ">
                <div style="
                  width: 24px;
                  height: 24px;
                  border-radius: 50%;
                  background: ${color};
                  border: 1.5px solid #aaa;
                "></div>
                <span style="
                  font-size: 17px;
                  font-weight: 600;
                  color: ${color};
                  text-align: center;
                ">${label}</span>
                <span style="
                  font-size: 15px;
                  color: #555;
                  font-weight: 500;
                ">${total}</span>
              </div>
            `;
          })
          .join('');

      legendHtml = `
        <h2 style="font-size:20px;color:#333;margin-top:20px;">Roles</h2>
        <div style="display: flex; justify-content: center; gap: 40px; flex-wrap: wrap; margin-bottom: 20px;">
          ${innerLegendHtml}
        </div>
        <h2 style="font-size:20px;color:#333;margin-top:20px;">Estados</h2>
        <div style="display: flex; justify-content: center; gap: 40px; flex-wrap: wrap; margin-bottom: 20px;">
          ${outerLegendHtml}
        </div>
      `;
    }

    // 3) Para BarChart: HTML de tabla si includeTable === true
    let tableHtml = '';
    if (includeTable && isBarChart) {
      const tableHeaderHtml = `
        <tr>
          <th style="border-bottom:2px solid #ddd; padding: 0 60px 16px 16px; text-align:center; font-size:17px; color:#272025; background:#f5f0f7;">
            ${xKey.charAt(0).toUpperCase() + xKey.slice(1)}
          </th>
          ${seriesKeys
            .map((key, i) => {
              const color = colors[i % colors.length] || defaultColors[i];
              return `
                <th style="border-bottom:2px solid #ddd; padding: 0 60px 16px 16px; text-align:center; font-size:17px; color:${color}; background:#f5f0f7;">
                  ${key.charAt(0).toUpperCase() + key.slice(1)}
                </th>
              `;
            })
            .join('')}
        </tr>
      `;
      const tableRowsHtml = filteredData
        .map((item) => {
          return `
          <tr>
            <td style="border-bottom:1px solid #f0e6f5; padding: 0 60px 16px 16px; font-size:16px; text-align:center;">
              ${item[xKey]}
            </td>
            ${seriesKeys
              .map((key, i) => {
                const color = colors[i % colors.length] || defaultColors[i];
                return `
                <td style="border-bottom:1px solid #f0e6f5; padding: 0 60px 16px 16px; text-align:center; font-size:16px; color:${color}; font-weight: 500; background: #fdfafd;">
                  ${item[key]}
                </td>
              `;
              })
              .join('')}
          </tr>
        `;
        })
        .join('');

      tableHtml = `
        <div style="width: 1000px; margin: 28px auto 0 auto; border-radius: 18px; overflow: hidden; box-shadow: 0 2px 12px #dbb7e821;">
          <table style="width: 100%; border-collapse: collapse; font-family: inherit; background: #fff8fd;">
            ${tableHeaderHtml}
            ${tableRowsHtml}
          </table>
        </div>
      `;
    }

    // 4) Rellenar tempRoot.innerHTML según chartType
    if (isBarChart) {
      tempRoot.innerHTML = `
        <div style="width: 100%; height: 100%; padding: 32px; display: flex; flex-direction: column; justify-content: flex-start;">
          <h1 style="color: #97639c; font-size: 38px; text-align: center; font-weight: bold; margin-bottom: 22px; margin-top: 6px;">
            ${title}
          </h1>
          <div style="display: flex; justify-content: center; gap: 40px; margin-bottom: 25px;">
            ${legendHtml}
          </div>
          <div id="chart-export" style="width: 1000px; height: 600px; align-self: center;"></div>
          ${tableHtml}
        </div>
      `;
    } else if (isPieChart) {
      // <-- Aumentar altura del contenedor para evitar cortes
      tempRoot.innerHTML = `
        <div style="
          width: 100%;
          height: 100%;
          padding: 32px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          font-family: Arial, sans-serif;
        ">
          <h1 style="
            color: #97639c;
            font-size: 38px;
            text-align: center;
            font-weight: bold;
            margin-bottom: 22px;
            margin-top: 6px;
          ">
            ${title}
          </h1>
          ${legendHtml}
          <div id="chart-export" style="width: 1000px; height: 1500px; align-self: center;"></div>
        </div>
      `;
    } else if (isLineChart) {
      // 4.a) Construir leyenda HTML de líneas
      const legendHtmlLine = seriesKeys
        .map((key, i) => {
          const label = key.charAt(0).toUpperCase() + key.slice(1);
          const color = colors[i % colors.length] || defaultColors[i];
          return `
            <div style="
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 3px;
              min-width: 120px;
              justify-content: center;
            ">
              <div style="
                width: 22px;
                height: 4px;
                background: ${color};
                border: 1.5px solid ${color};
                border-radius: 2px;
              "></div>
              <span style="
                font-size: 17px;
                font-weight: 600;
                color: ${color};
                line-height: 22px;
                display: block;
                text-align: left;
              ">${label}</span>
            </div>
          `;
        })
        .join('');

      tempRoot.innerHTML = `
        <div style="
          width: 100%;
          height: 100%;
          padding: 32px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          font-family: Arial, sans-serif;
        ">
          <h1 style="
            color: #97639c;
            font-size: 38px;
            text-align: center;
            font-weight: bold;
            margin-bottom: 22px;
            margin-top: 6px;
          ">
            ${title}
          </h1>
          <div style="
            display: flex;
            justify-content: center;
            gap: 40px;
            flex-wrap: wrap;
            margin-bottom: 20px;
          ">
            ${legendHtmlLine}
          </div>
          <div id="chart-export" style="width: 1000px; height: 650px; align-self: center; overflow: visible"></div>
        </div>
      `;
    }

    const chartExportDiv = tempRoot.querySelector('#chart-export');
    const root = createRoot(chartExportDiv!);

    // 5) Renderizar con React el gráfico según chartType
    if (isPieChart) {
      const outerColorMap = outerLabels.reduce(
        (acc, label, i) => {
          acc[label] = outerColors[i];
          return acc;
        },
        {} as Record<string, string>,
      );

      root.render(
        <div style={{ position: 'relative', width: '900px', height: '600px' }}>
          <RePieChart width={900} height={600}>
            {/* Círculo interno: roles */}
            <Pie
              data={filteredData}
              dataKey='total'
              nameKey='name'
              paddingAngle={1}
              cx='50%'
              cy='50%'
              innerRadius='23%'
              outerRadius='50%'
              isAnimationActive={false}
            >
              {filteredData.map((entry, index) => (
                <Cell key={`inner-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>

            {/* Círculo externo: estados */}
            <Pie
              data={outerData}
              dataKey='total'
              nameKey='name'
              paddingAngle={1}
              cx='50%'
              cy='50%'
              innerRadius='55%'
              outerRadius='75%'
              isAnimationActive={false}
            >
              {(outerData ?? []).map((entry, index) => (
                <Cell key={`outer-${index}`} fill={outerColorMap[entry.name] ?? '#ccc'} />
              ))}
              <LabelList
                dataKey='total'
                content={(props: any) => {
                  const RADIAN = Math.PI / 180;
                  const midAngle = (props.viewBox.startAngle + props.viewBox.endAngle) / 2;
                  const radius =
                    props.viewBox.innerRadius +
                    (props.viewBox.outerRadius - props.viewBox.innerRadius) * 1.3;
                  const x = props.viewBox.cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = props.viewBox.cy + radius * Math.sin(-midAngle * RADIAN);
                  const entry = outerData?.[props.index];
                  const baseColor = entry ? (outerColorMap[entry.name] ?? '#999') : '#999';
                  const textColor = adjustTextColor(baseColor);
                  return (
                    <text
                      x={x}
                      y={y}
                      textAnchor='middle'
                      dominantBaseline='central'
                      fill={textColor}
                      fontSize={16}
                      fontWeight='bold'
                    >
                      {props.value}
                    </text>
                  );
                }}
              />
            </Pie>
          </RePieChart>
        </div>,
      );
    } else if (isBarChart) {
      root.render(
        <BarChart width={1000} height={600} data={filteredData} barSize={24}>
          <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='#ccc' />
          <XAxis dataKey={xKey} axisLine={false} tickLine={false} height={60} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip />
          {seriesKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              fill={colors[index % colors.length] || defaultColors[index]}
              radius={[10, 10, 0, 0]}
              isAnimationActive={false}
              activeBar={<Rectangle />}
            />
          ))}
        </BarChart>,
      );
    } else if (isLineChart) {
      // 5.a) Extraer las primeras N filas para descarga
      const downloadData = filteredData.slice(0, downloadDateCount);
      // 5.b) Calcular maxY para ese subconjunto
      const maxYForDownload = Math.max(
        0,
        ...downloadData.flatMap((entry) => seriesKeys.map((key) => Number(entry[key] || 0))),
      );

      // Función para formatear ticks del eje X
      const renderXAxisTick = (props: any) => {
        const { x, y, payload } = props;
        const fecha = parseISO(payload.value as string);
        const isMonthly = selectedFilters?.frecuencia === '2';
        return (
          <g transform={`translate(${x},${y + 10})`}>
            {isMonthly ? (
              <>
                <text textAnchor='middle' fill='#333' fontWeight='bold' fontSize={12}>
                  {formatDate(fecha, 'MMMM', { locale: es }).charAt(0).toUpperCase() +
                    formatDate(fecha, 'MMMM', { locale: es }).slice(1)}
                </text>
                <text y={14} textAnchor='middle' fill='#777' fontSize={10}>
                  {formatDate(fecha, 'yyyy', { locale: es })}
                </text>
              </>
            ) : (
              <>
                <text textAnchor='middle' fill='#333' fontWeight='bold' fontSize={12}>
                  Semana {filteredData.findIndex((d) => d[xKey] === payload.value) + 1}
                </text>
                <text y={14} textAnchor='middle' fill='#777' fontSize={10}>
                  ({formatDate(fecha, 'dd-MM-yyyy')})
                </text>
              </>
            )}
          </g>
        );
      };

      root.render(
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LineChart
            width={1000}
            height={650}
            data={downloadData}
            margin={{ top: 20, right: 30, bottom: 0, left: 0 }}
          >
            <CartesianGrid strokeDasharray='5 5' stroke='#e2e8f0' />

            <XAxisLine
              dataKey={xKey}
              height={60}
              tick={renderXAxisTick}
              axisLine={false}
              tickLine={false}
              interval={0}
              allowDataOverflow={true}
            />

            <YAxisLine
              domain={[0, maxYForDownload]}
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              wrapperStyle={{
                backgroundColor: '#fff',
                borderRadius: '5px',
                border: '1px solid #ddd',
              }}
              contentStyle={{
                backgroundColor: '#fff',
                borderRadius: '5px',
              }}
            />

            {/* Líneas invisibles solo para la leyenda */}
            {seriesKeys.map((role, idx) => (
              <Line
                key={role}
                type='monotone'
                dataKey={role}
                stroke={colors[idx % colors.length] || defaultColors[idx] || '#CCCCCC'}
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
                legendType='line'
                opacity={0}
              />
            ))}

            <Customized
              component={(props: any) => {
                const { width, height, ...chartProps } = props;
                const content: JSX.Element[] = [];
                const pageDataHere = downloadData;
                const threshold = maxYForDownload * 0.02;

                // 1) Dibujar líneas (solid o MultiColorDashLine)
                seriesKeys.forEach((role) => {
                  const points = pageDataHere.map((entry) => ({
                    x: chartProps.xAxisMap[0].scale(entry[xKey]),
                    y: chartProps.yAxisMap[0].scale(entry[role]),
                    payload: entry,
                  }));
                  if (points.length < 2) return;
                  for (let i = 1; i < points.length; i++) {
                    const prevPt = points[i - 1];
                    const currPt = points[i];
                    const rolesPrevExact = getExactRolesInCollision(
                      prevPt.payload,
                      seriesKeys,
                      role,
                    );
                    const rolesCurrExact = getExactRolesInCollision(
                      currPt.payload,
                      seriesKeys,
                      role,
                    );
                    const intersectionExact = rolesPrevExact.filter((r) =>
                      rolesCurrExact.includes(r),
                    );
                    if (intersectionExact.length > 0) {
                      content.push(
                        <MultiColorDashLine
                          key={`dash-${role}-${i}`}
                          points={[prevPt, currPt]}
                          roles={[role, ...intersectionExact]}
                          roleColors={props.colorsMap || {}}
                        />,
                      );
                    } else {
                      const subGen = d3LineShape<{ x: number; y: number }>()
                        .x((d) => d.x)
                        .y((d) => d.y)
                        .curve(curveMonotoneX);
                      const subPath = subGen([
                        { x: prevPt.x, y: prevPt.y },
                        { x: currPt.x, y: currPt.y },
                      ]);
                      content.push(
                        <path
                          key={`solid-${role}-${i}`}
                          d={subPath || ''}
                          fill='none'
                          stroke={props.colorsMap?.[role] || '#CCCCCC'}
                          strokeWidth={2}
                        />,
                      );
                    }
                  }
                });

                // 2) Dibujar “dots” de colisión (CollisionPieDot) en cada fecha
                pageDataHere.forEach((entry) => {
                  const fecha: string = entry[xKey];
                  const roleValues: { role: string; value: number }[] = seriesKeys.map((r) => ({
                    role: r,
                    value: Number(entry[r] || 0),
                  }));
                  const clusters: string[][] = [];
                  const visited = new Set<string>();
                  roleValues.forEach(({ role: r1, value: v1 }) => {
                    if (visited.has(r1)) return;
                    visited.add(r1);
                    const cluster = [r1];
                    roleValues.forEach(({ role: r2, value: v2 }) => {
                      if (r2 === r1 || visited.has(r2)) return;
                      if (Math.abs(v1 - v2) <= threshold) {
                        cluster.push(r2);
                        visited.add(r2);
                      }
                    });
                    clusters.push(cluster);
                  });
                  clusters.forEach((cluster) => {
                    const sum = cluster.reduce((acc, r) => acc + Number(entry[r] || 0), 0);
                    const avgValue = sum / cluster.length;
                    const xCoord = chartProps.xAxisMap[0].scale(fecha);
                    const yCoord = chartProps.yAxisMap[0].scale(avgValue);
                    content.push(
                      <CollisionPieDot
                        key={`cluster-dot-${fecha}-${cluster.join('-')}`}
                        cx={xCoord}
                        cy={yCoord}
                        r={6}
                        roles={cluster}
                        roleColors={props.colorsMap || {}}
                      />,
                    );
                  });
                });

                return <g>{content}</g>;
              }}
              colorsMap={seriesKeys.reduce(
                (acc, role, idx) => {
                  acc[role] = colors[idx % colors.length] || defaultColors[idx] || '#CCCCCC';
                  return acc;
                },
                {} as Record<string, string>,
              )}
            />
          </LineChart>
        </div>,
      );
    }

    // 6) Esperar y luego capturar con html2canvas y descargar
    setTimeout(async () => {
      const canvas = await html2canvas(sandbox, {
        backgroundColor: format === 'png' ? null : '#ffffff',
        useCORS: true,
        width: WIDTH,
        height: HEIGHT,
        scale: 2,
      });
      const dataURL = canvas.toDataURL(`image/${format}`);

      if (format === 'pdf') {
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'px',
          format: [WIDTH, HEIGHT],
        });
        pdf.addImage(dataURL, 'PNG', 0, 0, WIDTH, HEIGHT);
        pdf.save(
          isLineChart
            ? 'grafica_lineal.pdf'
            : isPieChart
              ? 'grafica_pie.pdf'
              : 'grafica_barras.pdf',
        );
      } else {
        const link = document.createElement('a');
        link.download = isLineChart
          ? `grafica_lineal.${format}`
          : isPieChart
            ? `grafica_pie.${format}`
            : `grafica_barras.${format}`;
        link.href = dataURL;
        link.click();
      }

      root.unmount();
      document.body.removeChild(sandbox);
    }, 600);

    return;
  };

  // ——— Render principal del menú ——————————————————————————————
  if (!shouldRender) return null;

  return (
    <div
      ref={menuRef}
      className={`
        absolute right-0 mt-2 bg-white shadow-lg gap-3 rounded-xl z-50 p-5 w-80 border
        transform transition-all duration-200 ease-out
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
      `}
    >
      <h3 className='font-bold text-lg mb-4 text-[var(--secondary-shade)]'>Menú de opciones</h3>

      <div className='flex justify-between mb-4'>
        <button
          className={`flex-1 py-1 rounded-l ${
            currentView === 'customization'
              ? 'bg-[var(--secondaryColor)] text-white'
              : 'bg-gray-200 text-gray-800'
          }`}
          onClick={() => handleViewChange('customization')}
        >
          Personalizar
        </button>
        <button
          className={`flex-1 py-1 rounded-r ${
            currentView === 'download'
              ? 'bg-[var(--secondaryColor)] text-white'
              : 'bg-gray-200 text-gray-800'
          }`}
          onClick={() => handleViewChange('download')}
        >
          Descargar
        </button>
      </div>

      <div
        key={displayedView}
        className={`transition-all duration-300 ease-in-out transform
          ${
            transitionPhase === 'fadeOut'
              ? 'opacity-0 -translate-x-3 pointer-events-none'
              : transitionPhase === 'fadeIn'
                ? 'opacity-0 translate-x-3'
                : 'opacity-100 translate-x-0'
          }
        `}
      >
        {displayedView === 'customization' && (
          <>
            {isBarChart && !isCustomizingColors && shouldShowSedeFilter && (
              <MaxItemsInput
                value={maxItemsSelected}
                totalItems={totalItems}
                onChange={onMaxItemsChange}
              />
            )}

            {isPieChart && !isCustomizingColors && shouldShowSedeFilter && (
              <div className='mb-2'>
                <FiltroEvento
                  disableCheckboxes
                  label='Filtros'
                  extraFilters={[{ label: 'SEDE', key: 'sede', options: sedes }]}
                  filterActiva={fallbackFilters}
                  onExtraFilterChange={(key, value) =>
                    props.setSelectedFilters?.((prev) => ({ ...prev, [key]: value }))
                  }
                  fade={false}
                />
              </div>
            )}

            {isLineChart && !isCustomizingColors && (
              <div className='mb-2'>
                <FiltroEvento
                  disableCheckboxes
                  label='Personalización'
                  iconName='Star'
                  extraFilters={[
                    ...(shouldShowSedeFilter
                      ? [
                          {
                            label: 'SEDE',
                            key: 'sede',
                            options: sedes,
                          },
                        ]
                      : []),
                    {
                      label: 'Frecuencia',
                      key: 'frecuencia',
                      options: [
                        { label: 'Semanal', value: '__default__' },
                        { label: 'Mensual', value: '2' },
                      ],
                    },
                    {
                      label: 'Detalle',
                      key: 'detalle',
                      options: [
                        { label: 'General', value: '1' },
                        { label: 'Detallado', value: '2' },
                      ],
                    },
                    {
                      label: 'Estado',
                      key: 'estado',
                      options: [
                        { label: 'Aprobada', value: '1' },
                        { label: 'Pendiente', value: '2' },
                        { label: 'Rechazada', value: '3' },
                        { label: 'Todos', value: '__all__' },
                      ],
                    },
                  ]}
                  filterActiva={props.selectedFilters ?? { sede: '__all__' }}
                  onExtraFilterChange={(key, value) =>
                    props.setSelectedFilters?.((prev) => ({ ...prev, [key]: value }))
                  }
                />
                <div className='mt-2'>
                  <FiltroEvento
                    options={roles}
                    selected={selection}
                    onChange={selectionChange}
                    label='Filtros'
                    labelOptions='Roles'
                    selectAll={true}
                    deselectAll={true}
                  />
                </div>
              </div>
            )}

            {isPieChart && (
              <div>
                {isCustomizingColors && (
                  <div className='flex gap-2 mb-2'>
                    <button
                      onClick={() => {
                        setCustomizingOuter(false);
                        setResetPickerSignal((prev) => prev - 1);
                      }}
                      className={`flex-1 text-sm py-1 rounded ${
                        !customizingOuter ? 'bg-purple-200 text-purple-900' : 'bg-gray-200'
                      }`}
                    >
                      Colores Internos
                    </button>
                    <button
                      onClick={() => {
                        setCustomizingOuter(true);
                        setResetPickerSignal((prev) => prev - 1);
                      }}
                      className={`flex-1 text-sm py-1 rounded ${
                        customizingOuter ? 'bg-purple-200 text-purple-900' : 'bg-gray-200'
                      }`}
                    >
                      Colores Externos
                    </button>
                  </div>
                )}
              </div>
            )}

            <ColorPickerSection
              colors={customizingOuter ? outerColors : colors}
              setColors={customizingOuter ? setOuterColors : setColors}
              defaultColors={customizingOuter ? (defaultOuterColors ?? outerColors) : defaultColors}
              notify={notify}
              elementLabels={customizingOuter ? outerLabels : elementLabels}
              onIsCustomizingChange={setIsCustomizingColors}
              resetModeSignal={resetPickerSignal}
              restoreDefaultColors={() => {
                if (customizingOuter && restoreDefaultOuterColors) {
                  restoreDefaultOuterColors();
                } else {
                  setColors([...defaultColors]);
                }
              }}
            />
          </>
        )}

        {displayedView === 'download' && (
          <>
            <FormatSelector format={format} setFormat={setFormat} />

            {isBarChart && (
              <TableToggle includeTable={includeTable} setIncludeTable={setIncludeTable} />
            )}

            {isLineChart && (
              <div className='mb-2'>
                <MaxItemsInput
                  value={downloadDateCount}
                  totalItems={Math.min(10, filteredData.length)}
                  onChange={(val) => setDownloadDateCount(val ?? 2)}
                />
                <p className='text-xs text-gray-500 mt-1'>
                  (Mínimo 2, máximo {Math.min(10, filteredData.length)})
                </p>
              </div>
            )}

            <DownloadButton onDownload={handleDownload} />
          </>
        )}

        <div
          className={`transition-opacity duration-300 ease-in-out ${
            transitionPhase ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <MinimizeButton
            onMinimize={() => {
              handleClose();
              onToggleVisibility();
              onMinimize();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default OptionsMenu;
