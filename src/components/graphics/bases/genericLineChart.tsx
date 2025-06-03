'use client';
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from 'react';
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  Customized,
} from 'recharts';
import withIconDecorator from '../../decorators/IconDecorator';
import * as Icons from '../../icons';
import OptionsMenu from '../../headers_menu_users/OptionMenu';
import { format, parseISO, startOfWeek, subMonths, subWeeks } from 'date-fns';
import { es } from 'date-fns/locale';
import { line as d3Line, curveMonotoneX } from 'd3-shape';

const PrevIcon = withIconDecorator(Icons.ArrowFatLineLeft);
const NextIcon = withIconDecorator(Icons.ArrowFatLineRight);
export const Options = withIconDecorator(Icons.DotsThree);

interface GenericLineChartProps {
  apiEndpoint: string;
  title?: string;
  dataPath?: string;
  xKey?: string;
  onMinimize: () => void;
  isFrozen?: boolean;
}

interface ChartDataItem {
  [key: string]: any;
}

const getExactRolesInCollision = (
  row: Record<string, any>,
  selectedRoles: string[],
  roleActual: string
): string[] => {
  const valorActual = Number(row[roleActual] ?? 0);
  return selectedRoles.filter(
    (rol) => rol !== roleActual && Number(row[rol] ?? 0) === valorActual
  );
};

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
        stroke="#fff"
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
        stroke="#fff"
        strokeWidth={0.5}
      />
    );
  }

  return <g>{paths}</g>;
};

const MultiColorDashLine: React.FC<{
  points: { x: number; y: number }[];
  roles: string[];
  roleColors: Record<string, string>;
}> = ({ points, roles, roleColors }) => {
  if (roles.length <= 1 || points.length < 2) {
    return null;
  }

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
          y1={String(yStart)}
          x2={xEnd}
          y2={String(yEnd)}
          stroke={color}
          strokeWidth={2.5}
          strokeLinecap="round"
        />
      );
    }
  }

  return <g>{segments}</g>;
};

const GenericLineChart: React.FC<GenericLineChartProps> = ({
  apiEndpoint,
  title = '',
  dataPath,
  xKey = 'Fecha',
  onMinimize,
  isFrozen = false,
}) => {
  // --- 1. Estados de datos y filtros ---
  const [data, setData] = useState<ChartDataItem[]>([]);
  const [filteredData, setFilteredData] = useState<ChartDataItem[]>([]);
  const [availableRoles, setAvailableRoles] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [maxYValue, setMaxYValue] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({
    sede: '__all__',
    frecuencia: '__default__',
    detalle: '1',
    estado: '__all__',
  });
  const [selectedSedeName, setSelectedSedeName] = useState<string>('');
  const [sedes, setSedes] = useState<{ label: string; value: string }[]>([]);

  // --- Mapa de colores: ahora en estado en lugar de ref ---
  const [roleColorMap, setRoleColorMap] = useState<Record<string, string>>({});
  // Para asignar colores base de forma incremental
  const baseColors = [
    '#97639c',
    '#C57FAB',
    '#6E2D75',
    '#683756',
    '#95508f',
    '#c084c0',
    '#8c2f63',
    '#492f57',
    '#a65968',
    '#a495c9',
  ];
  const colorIndexRef = useRef<number>(0);

  const itemsPerPage = 4;

  // --- 2. ResizeObserver + debounce para evitar re-render constante ---
  const chartWrapperRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [debouncedSize, setDebouncedSize] = useState({ width: 0, height: 0 });
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    if (!chartWrapperRef.current) return;
    const observer = new ResizeObserver((entries) => {
      if (!entries.length) return;
      const rect = entries[0].contentRect;
      setIsResizing(true);
      setContainerSize({ width: rect.width, height: rect.height });
    });
    observer.observe(chartWrapperRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSize(containerSize);
      setIsResizing(false);
    }, 100);
    return () => clearTimeout(handler);
  }, [containerSize]);

  useEffect(() => {
    if (isResizing) setIsVisible(false);
    else setIsVisible(true);
  }, [isResizing]);

  // --- 3. Cuando cambian los roles (desde la API), seleccionarlos todos por defecto ---
  useEffect(() => {
    if (availableRoles.length > 0) {
      setSelectedRoles(availableRoles.slice());
    }
  }, [availableRoles]);

  // --- 4. Construir URL de la API con filtros ---
  const apiURL = useMemo(() => {
    const params = new URLSearchParams();
    if (selectedFilters.sede && selectedFilters.sede !== '__all__')
      params.append('id', selectedFilters.sede);
    if (selectedFilters.sede === '__all__') selectedFilters.sede = '';
    if (
      selectedFilters.frecuencia &&
      selectedFilters.frecuencia !== '__default__'
    ) {
      params.append('frec', selectedFilters.frecuencia);
    }
    if (selectedFilters.detalle) params.append('lev', selectedFilters.detalle);
    if (
      selectedFilters.estado &&
      selectedFilters.estado !== '__all__'
    ) {
      params.append('state', selectedFilters.estado);
    }
    return `${apiEndpoint}&${params.toString()}`;
  }, [selectedFilters, apiEndpoint]);

  // --- 5. Fetch de datos + procesamiento para llenar filteredData ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 5.1. Obtener datos “raw” de la API
        const res = await fetch(apiURL, {
          headers: {
            Authorization: `Bearer ${
              typeof window !== 'undefined'
                ? localStorage.getItem('api_token')
                : ''
            }`,
          },
        });
        const json = await res.json();
        // 5.2. Obtener lista de roles desde /api/data?page=roles
        const rolesRes = await fetch(`/api/data?page=roles`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('api_token')}`,
          },
        });
        const rolesJson = await rolesRes.json();

        const detalle = selectedFilters.detalle ?? '1';
        let allRoles: string[] = [];
        rolesJson.roles.forEach((rol: { value: string; variante?: string[] }) => {
          if (detalle === '1') {
            allRoles.push(rol.value);
          } else if (detalle === '2') {
            if (rol.variante && Array.isArray(rol.variante)) {
              allRoles.push(...rol.variante);
            } else {
              allRoles.push(rol.value);
            }
          }
        });

        const rawData: any[] = dataPath ? json[dataPath] : json;
        if (!Array.isArray(rawData)) return;

        // 5.3. Reorganizar rawData por fecha → { Fecha: string, rol1: total, rol2: total, ... }
        const rawByDate = new Map<string, Record<string, any>>();
        rawData.forEach(
          ({
            fecha,
            tipo,
            total,
          }: {
            fecha: string;
            tipo: string;
            total: number;
          }) => {
            if (!rawByDate.has(fecha)) {
              rawByDate.set(fecha, { [xKey]: fecha });
            }
            rawByDate.get(fecha)![tipo] = total;
          }
        );

        const allDatesRaw = Array.from(rawByDate.keys()).map((d) =>
          parseISO(d)
        );
        if (allDatesRaw.length === 0) return;

        // 5.4. Calcular “maxDate” y “minDate” según frecuencia semanal o mensual
        const isMonthly = selectedFilters.frecuencia === '2';
        const today = new Date();
        const maxDate = isMonthly
          ? new Date(today.getFullYear(), today.getMonth(), 1)
          : startOfWeek(today, { weekStartsOn: 1 });
        const minDate = new Date(
          Math.min(...allDatesRaw.map((d) => d.getTime()))
        );

        // 5.5. Generar lista de fechas (strings) suficientes para itemsPerPage
        const dateList: string[] = [];
        let current = new Date(maxDate);
        const formatter = (date: Date) =>
          isMonthly
            ? format(date, 'yyyy-MM-01')
            : format(date, 'yyyy-MM-dd');

        if (isMonthly) {
          current.setDate(1);
          let count = 0;
          while (current >= minDate || count < itemsPerPage) {
            dateList.push(formatter(current));
            current = subMonths(current, 1);
            count++;
          }
        } else {
          current = startOfWeek(current, { weekStartsOn: 1 });
          let count = 0;
          while (current >= minDate || count < itemsPerPage) {
            dateList.push(formatter(current));
            current = subWeeks(current, 1);
            count++;
          }
        }

        // 5.6. Llenar con cero donde no exista algún rol en alguna fecha
        const filled: Record<string, any>[] = dateList.map((fecha) => {
          const row: Record<string, any> = { [xKey]: fecha };
          allRoles.forEach((role) => {
            row[role] = rawByDate.get(fecha)?.[role] ?? 0;
          });
          return row;
        });

        // 5.7. Calcular máximo global en Y para fijar dominio de Y
        const maxTotal = Math.max(
          0,
          ...filled.flatMap((entry) =>
            allRoles.map((role) => Number(entry[role] || 0))
          )
        );

        // 5.8. Guardar en estado
        setFilteredData(filled);
        setData(filled);
        setAvailableRoles(allRoles);

        // 5.9. Asignar colores base a cada rol que no tenga color aún
        setRoleColorMap((prev) => {
          const next = { ...prev };
          allRoles.forEach((role) => {
            if (!next[role]) {
              next[role] = baseColors[colorIndexRef.current % baseColors.length];
              colorIndexRef.current++;
            }
          });
          return next;
        });

        setMaxYValue(maxTotal);
        setCurrentIndex(0);
        setSelectedSedeName(
          sedes.find((s) => s.value === selectedFilters.sede)?.label ?? ''
        );
      } catch (err) {
        console.error('Error cargando datos:', err);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiURL, dataPath, xKey]);

  // --- 6. Carga inicial de sedes desde /api/data?page=venues ---
  const loadSedes = useCallback(async () => {
    try {
      const res = await fetch('/api/data?page=venues', {
        headers: {
          Authorization: `Bearer ${
            typeof window !== 'undefined'
              ? localStorage.getItem('api_token')
              : ''
          }`,
        },
      });
      const venuesData = await res.json();
      if (venuesData?.venues && Array.isArray(venuesData.venues)) {
        const opciones = venuesData.venues
          .filter((venue: any) => venue.status === 'Registrada con participantes')
          .map((sede: any) => ({
            value: sede.id.toString(),
            label: sede.name,
          }));
        setSedes([{ value: '__all__', label: 'Todas las sedes' }, ...opciones]);
      } else {
        console.warn(
          'No se encontraron sedes o el formato de respuesta es incorrecto:',
          venuesData
        );
      }
    } catch (error) {
      console.error('Error al cargar las sedes:', error);
    }
  }, []);
  useEffect(() => {
    loadSedes();
  }, [loadSedes]);

  // --- 7. Ventana deslizante: “currentWindow” son las 4 filas desde currentIndex ---
  const currentWindow = useMemo(() => {
    return filteredData.slice(currentIndex, currentIndex + itemsPerPage);
  }, [filteredData, currentIndex]);

  const handleNext = () => {
    if (currentIndex + itemsPerPage < filteredData.length) {
      setCurrentIndex((i) => i + 1);
    }
  };
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  return (
    <div className="bg-white rounded-xl w-full h-full p-4 flex flex-col">
      {/* --- Título y menú de opciones --- */}
      <div className="relative flex justify-between items-center mb-2">
        <div className="flex flex-col">
          <h1 className="font-bold text-2xl">{title}</h1>
          <div className="text-[var(--secondaryColor)] text-xs transition-opacity duration-300">
            <span>{selectedSedeName}</span>
          </div>
        </div>
        <button
          onClick={() => {
            if (!showMenu) setShowMenu(true);
          }}
          disabled={showMenu}
          id="options-button"
          className={`cursor-pointer transition-opacity ${
            showMenu ? 'opacity-50 pointer-events-none' : 'opacity-100'
          }`}
        >
          <Options
            fillColor="var(--secondaryColor)"
            strokeColor="var(--secondaryColor)"
            strokeWidth={2.5}
            width={'3vmax'}
            height={'3vmax'}
          />
        </button>
        <div className="absolute top-full right-0 z-50">
          <OptionsMenu
            onMinimize={onMinimize}
            onToggleVisibility={() => setIsVisible(false)}
            setColors={(colors: string[]) => {
              setRoleColorMap((prev) => {
                const next = { ...prev };
                selectedRoles.forEach((role, idx) => {
                  next[role] = colors[idx] || '#CCCCCC';
                });
                return next;
              });
            }}
            visible={showMenu}
            setVisible={setShowMenu}
            chartRef={chartWrapperRef}
            totalItems={data.length}
            defaultColors={baseColors}
            filteredData={filteredData}
            xKey={xKey}
            seriesKeys={selectedRoles}
            title={title}
            colors={selectedRoles.map(
              (r) => roleColorMap[r] || '#CCCCCC'
            )}
            elementLabels={selectedRoles}
            restoreDefaultColors={() => {
              setRoleColorMap((prev) => {
                const next = { ...prev };
                selectedRoles.forEach((r, idx) => {
                  next[r] = baseColors[idx % baseColors.length];
                });
                return next;
              });
            }}
            onMaxItemsChange={() => {}}
            maxItemsSelected={selectedRoles.length}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            chartType="line"
            selection={selectedRoles}
            selectionChange={(updated: string[]) =>
              setSelectedRoles(updated)
            }
          />
        </div>
      </div>

      {/* --- Área del gráfico con debounce de resize y fade --- */}
      <div
        className="mt-2 w-full h-[39vh] overflow-hidden rounded-md"
        ref={chartWrapperRef}
      >
        <div
          className={`w-full h-full transition-opacity duration-500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/*
            Si está “frozen” o está redimensionando, no renderizamos el chart.
            En cuanto termine el resize (isResizing === false) y no esté “frozen”,
            desplegamos el LineChart con “currentWindow” como data.
          */}
          {!isFrozen &&
          !isResizing &&
          debouncedSize.width > 0 &&
          debouncedSize.height > 0 ? (
            <LineChart
              width={debouncedSize.width}
              height={debouncedSize.height}
              data={currentWindow}
            >
              {/* Grid (no se mueve) */}
              <CartesianGrid strokeDasharray="5 5" stroke="#e2e8f0" />

              {/* Eje X */}
              <XAxis
                dataKey={xKey}
                height={60}
                tick={({ x, y, payload }) => {
                  const fecha = parseISO(payload.value as string);
                  const isMonthly = selectedFilters.frecuencia === '2';
                  return (
                    <g transform={`translate(${x},${y + 10})`}>
                      {isMonthly ? (
                        <>
                          <text
                            textAnchor="middle"
                            fill="#333"
                            fontWeight="bold"
                            fontSize={12}
                          >
                            {format(fecha, 'MMMM', { locale: es }).charAt(0).toUpperCase()}
                            {format(fecha, 'MMMM', { locale: es }).slice(1)}
                          </text>
                          <text
                            y={14}
                            textAnchor="middle"
                            fill="#777"
                            fontSize={10}
                          >
                            {format(fecha, 'yyyy', { locale: es })}
                          </text>
                        </>
                      ) : (
                        <>
                          <text
                            textAnchor="middle"
                            fill="#333"
                            fontWeight="bold"
                            fontSize={12}
                          >
                            Semana{' '}
                            {/* Calculamos la posición relativa dentro del filteredData */}
                            {filteredData.findIndex(
                              (d) => d[xKey] === payload.value
                            ) + 1}
                          </text>
                          <text
                            y={14}
                            textAnchor="middle"
                            fill="#777"
                            fontSize={10}
                          >
                            ({format(fecha, 'dd-MM-yyyy')})
                          </text>
                        </>
                      )}
                    </g>
                  );
                }}
              />

              {/* Eje Y (dominio fijo de 0 a maxYValue sobre TODOS los datos) */}
              <YAxis
                domain={[0, maxYValue]}
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
              />

              {/* Tooltip (se mantiene estático en el mismo lugar) */}
              <Tooltip
                wrapperClassName="bg-white border border-gray-200 rounded-md shadow-md text-sm"
                contentStyle={{
                  backgroundColor: '#fff',
                  borderRadius: '5px',
                }}
              />

              {/* Cada línea se dibuja sin puntos, con animación activa */}
              {selectedRoles.map((role) => (
                <Line
                  key={`legend-${role}`}
                  type="monotone"
                  dataKey={role}
                  stroke={roleColorMap[role] || '#CCCCCC'}
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={true}
                  animationDuration={500}
                  legendType="line"
                  opacity={0}
                />
              ))}

              {/* Leyenda (estática) */}
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{
                  fontSize: '0.75rem',
                  marginTop: 8,
                }}
              />

              {/* Dibujo personalizado de líneas punteadas y “dots” */}
              <Customized
                component={(props: any) => {
                  const { width, height, ...chartProps } = props;
                  const content: JSX.Element[] = [];
                  const pageDataHere = currentWindow;
                  const threshold = maxYValue * 0.04;

                  // 1) DIBUJAR LÍNEAS (solid o MultiColorDashLine)
                  selectedRoles.forEach((role) => {
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
                        selectedRoles,
                        role
                      );
                      const rolesCurrExact = getExactRolesInCollision(
                        currPt.payload,
                        selectedRoles,
                        role
                      );
                      const intersectionExact = rolesPrevExact.filter((r) =>
                        rolesCurrExact.includes(r)
                      );

                      if (intersectionExact.length > 0) {
                        content.push(
                          <MultiColorDashLine
                            key={`dash-${role}-${i}`}
                            points={[prevPt, currPt]}
                            roles={[role, ...intersectionExact]}
                            roleColors={roleColorMap}
                          />
                        );
                      } else {
                        const subGen = d3Line<{
                          x: number;
                          y: number;
                        }>()
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
                            d={subPath ?? ''}
                            fill="none"
                            stroke={
                              roleColorMap[role] || '#CCCCCC'
                            }
                            strokeWidth={2}
                          />
                        );
                      }
                    }
                  });

                  // 2) DIBUJAR “dots” concentrados por fecha si hay colisión de valores
                  pageDataHere.forEach((entry) => {
                    const fecha: string = entry[xKey];
                    const roleValues: {
                      role: string;
                      value: number;
                    }[] = selectedRoles.map((r) => ({
                      role: r,
                      value: Number(entry[r] ?? 0),
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
                      const sum = cluster.reduce(
                        (acc, r) => acc + Number(entry[r] ?? 0),
                        0
                      );
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
                          roleColors={roleColorMap}
                        />
                      );
                    });
                  });

                  return <g>{content}</g>;
                }}
              />
            </LineChart>
          ) : (
            // Mientras está redimensionando o “frozen”, dejamos un contenedor vacío
            <div className="w-full h-full" />
          )}
        </div>
      </div>

      {/* --- Controles de navegación: Prev / Next --- */}
      <div className="flex justify-center gap-3 mt-2">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`flex items-center justify-center w-12 h-12 rounded-full transition-shadow ${
            currentIndex === 0
              ? 'bg-gray-200 cursor-not-allowed'
              : 'bg-purple-100 hover:bg-purple-200 shadow-md'
          }`}
        >
          <PrevIcon
            fillColor={currentIndex === 0 ? '#A0AEC0' : 'var(--secondaryColor)'}
            width={20}
            height={20}
          />
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex + itemsPerPage >= filteredData.length}
          className={`flex items-center justify-center w-12 h-12 rounded-full transition-shadow ${
            currentIndex + itemsPerPage >= filteredData.length
              ? 'bg-gray-200 cursor-not-allowed'
              : 'bg-purple-100 hover:bg-purple-200 shadow-md'
          }`}
        >
          <NextIcon
            fillColor={
              currentIndex + itemsPerPage >= filteredData.length
                ? '#A0AEC0'
                : 'var(--secondaryColor)'
            }
            width={20}
            height={20}
          />
        </button>
      </div>
    </div>
  );
};

export default GenericLineChart;