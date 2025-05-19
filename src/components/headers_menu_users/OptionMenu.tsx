'use client';
import React, { useRef, useState, useEffect } from 'react';
import { useNotification } from '../buttons_inputs/Notification';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Rectangle } from 'recharts';
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

interface ExtendedOptionsMenuProps extends OptionsMenuProps {
  outerLabels?: string[];
  outerColors?: string[];
  outerData?: any[];
  defaultOuterColors?: string[];
  restoreDefaultOuterColors?: () => void;
  setOuterColors?: (colors: string[]) => void;
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
    setOuterColors = () => { },
  } = props;

  const [format, setFormat] = useState<'png' | 'jpg' | 'pdf'>('png');
  const [includeTable, setIncludeTable] = useState(true);
  const [currentView, setCurrentView] = useState<'customization' | 'download'>('customization');
  const [displayedView, setDisplayedView] = useState(currentView);
  const [transitionPhase, setTransitionPhase] = useState<'fadeOut' | 'fadeIn' | null>(null);
  const [isCustomizingColors, setIsCustomizingColors] = useState(false);
  const [customizingOuter, setCustomizingOuter] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const { notify } = useNotification();

  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const isBarChart = !!seriesKeys?.length;

  function adjustTextColor(hex: string): string {
    const parsed = hex.replace('#', '');
    const r = parseInt(parsed.substring(0, 2), 16);
    const g = parseInt(parsed.substring(2, 4), 16);
    const b = parseInt(parsed.substring(4, 6), 16);

    // Luminosidad relativa: fórmula perceptual
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b);

    if (luminance > 170) {
      // Si es brillante, oscurece
      return `#${[r * 0.6, g * 0.6, b * 0.6].map((c) =>
        Math.round(Math.min(255, c)).toString(16).padStart(2, '0')
      ).join('')}`;
    } else {
      // Si es oscuro, aclara
      return `#${[r + (255 - r) * 0.5, g + (255 - g) * 0.5, b + (255 - b) * 0.5].map((c) =>
        Math.round(c).toString(16).padStart(2, '0')
      ).join('')}`;
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

  const handleClose = () => {
    setVisible(false);
    setIsCustomizingColors(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' && (target as HTMLInputElement).type === 'color') return;
      if (menuRef.current?.contains(target)) return;
      handleClose();
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const handleDownload = async () => {
    const WIDTH = 1200;
    const HEIGHT_BASE = 800;
    const ROW_HEIGHT = 50;
    const TABLE_EXTRA = includeTable ? (filteredData.length + 1) * ROW_HEIGHT + 10 : 0;
    const HEIGHT = HEIGHT_BASE + TABLE_EXTRA;

    const sandbox = document.createElement('div');
    sandbox.style.position = 'fixed';
    sandbox.style.top = '-10000px';
    sandbox.style.left = '-10000px';
    sandbox.style.width = `${WIDTH}px`;
    sandbox.style.height = `${HEIGHT}px`;
    sandbox.style.zIndex = '-1';
    document.body.appendChild(sandbox);

    const tempRoot = document.createElement('div');
    const legendHtml = isBarChart
      ? seriesKeys
        .map((key, i) => {
          const label = key.charAt(0).toUpperCase() + key.slice(1);
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
                background: ${defaultColors[i] || colors[i % colors.length]};
                border: 1.5px solid #aaa;
                display: flex;
                align-items: center;
                justify-content: center;
              "></div>
              <span style="
                font-size: 17px;
                font-weight: 600;
                color: ${defaultColors[i] || colors[i % colors.length]};
                line-height: 22px;
                display: block;
                text-align: left;
              ">${label}</span>
            </div>
          `;
        })
        .join('')
      : outerLabels
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
      !isBarChart &&
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

    let tableHtml = '';
    if (includeTable && isBarChart) {
      const tableHeaderHtml = `
        <tr>
          <th style="border-bottom:2px solid #ddd; padding: 0 60px 16px 16px; text-align:center; font-size:17px; color:#272025; background:#f5f0f7;">
            ${xKey.charAt(0).toUpperCase() + xKey.slice(1)}
          </th>
          ${seriesKeys
          .map(
            (key, i) => `
            <th style="border-bottom:2px solid #ddd; padding: 0 60px 16px 16px; text-align:center; font-size:17px; color:${defaultColors[i] || colors[i % colors.length]
              }; background:#f5f0f7;">
              ${key.charAt(0).toUpperCase() + key.slice(1)}
            </th>
          `,
          )
          .join('')}
        </tr>
      `;
      const tableRowsHtml = filteredData
        .map(
          (item) => `
        <tr>
          <td style="border-bottom:1px solid #f0e6f5; padding: 0 60px 16px 16px; font-size:16px; text-align:center;">
            ${item[xKey]}
          </td>
          ${seriesKeys
              .map(
                (key, i) => `
            <td style="border-bottom:1px solid #f0e6f5; padding: 0 60px 16px 16px; text-align:center; font-size:16px; color: ${defaultColors[i] || colors[i % colors.length]
                  }; font-weight: 500; background: #fdfafd;">
              ${item[key]}
            </td>
          `,
              )
              .join('')}
        </tr>
      `,
        )
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

    {
      isBarChart
        ? (tempRoot.innerHTML = `
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
    `)
        : (tempRoot.innerHTML = `
    <div style="
      width: 100%;
      height: 100%;
      padding: 32px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      font-family: Arial, sans-serif;
    ">
      <h1 style="color: #97639c; font-size: 38px; text-align: center; font-weight: bold; margin-bottom: 22px; margin-top: 6px;">
        ${title}
      </h1>
      <h2 style="font-size:20px;color:#333;margin-top:20px;">Roles</h2>
      <div style="display: flex; justify-content: center; gap: 40px; flex-wrap: wrap; margin-bottom: 20px;">
        ${innerLegendHtml}
      </div>
      <h2 style="font-size:20px;color:#333;margin-top:20px;">Estados</h2>
      <div style="display: flex; justify-content: center; gap: 40px; flex-wrap: wrap; margin-bottom: 20px;">
        ${legendHtml}
      </div>
      <div id="chart-export" style="width: 1000px; height: 600px; align-self: center;"></div>
    </div>
  `);
    }
    sandbox.appendChild(tempRoot);

    const chartExportDiv = tempRoot.querySelector('#chart-export');
    const root = createRoot(chartExportDiv!);

    if (!isBarChart) {
      const outerColorMap = outerLabels.reduce((acc, label, i) => {
        acc[label] = outerColors[i];
        return acc;
      }, {} as Record<string, string>);

      root.render(
        <div style={{ position: 'relative', width: '900px', height: '500px' }}>
          <RePieChart width={1000} height={600}>
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
                dataKey="total"
                content={(props: any) => {
                  const RADIAN = Math.PI / 180;
                  const midAngle = (props.viewBox.startAngle + props.viewBox.endAngle) / 2;
                  const radius = props.viewBox.innerRadius + (props.viewBox.outerRadius - props.viewBox.innerRadius) * 1.3;
                  const x = props.viewBox.cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = props.viewBox.cy + radius * Math.sin(-midAngle * RADIAN);
                  console.log(props)

                  const entry = outerData?.[props.index];
                  const baseColor = entry ? (outerColorMap[entry.name] ?? '#999') : '#999';
                  const textColor = adjustTextColor(baseColor);

                  return (
                    <text
                      x={x}
                      y={y}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill={textColor}
                      fontSize={16}
                      fontWeight="bold"
                    >
                      {props.value}
                    </text>
                  );
                }}
              />
            </Pie>
          </RePieChart>

          {/* (Opcional) Imagen */}
        </div>,
      );
    } else {
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
              fill={defaultColors[index] || colors[index % colors.length]}
              radius={[10, 10, 0, 0]}
              isAnimationActive={false}
              activeBar={<Rectangle />}
            />
          ))}
        </BarChart>,
      );
    }

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
        pdf.save('grafica.pdf');
      } else {
        const link = document.createElement('a');
        link.download = `grafica.${format}`;
        link.href = dataURL;
        link.click();
      }

      root.unmount();
      document.body.removeChild(sandbox);
    }, 600);
  };

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
          className={`flex-1 py-1 rounded-l ${currentView === 'customization'
              ? 'bg-[var(--secondaryColor)] text-white'
              : 'bg-gray-200 text-gray-800'
            }`}
          onClick={() => handleViewChange('customization')}
        >
          Personalizar
        </button>
        <button
          className={`flex-1 py-1 rounded-r ${currentView === 'download'
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
        ${transitionPhase === 'fadeOut'
            ? 'opacity-0 -translate-x-3 pointer-events-none'
            : transitionPhase === 'fadeIn'
              ? 'opacity-0 translate-x-3'
              : 'opacity-100 translate-x-0'
          }`}
      >
        {displayedView === 'customization' && (
          <>
            {isBarChart && !isCustomizingColors && (
              <MaxItemsInput
                value={maxItemsSelected}
                totalItems={totalItems}
                onChange={onMaxItemsChange}
              />
            )}
            {!isBarChart && (
              <div>
                {isCustomizingColors && (
                  <div className='flex gap-2 mb-2'>
                    <button
                      onClick={() => setCustomizingOuter(false)}
                      className={`flex-1 text-sm py-1 rounded ${!customizingOuter ? 'bg-purple-200 text-purple-900' : 'bg-gray-200'
                        }`}
                    >
                      Colores Internos
                    </button>
                    <button
                      onClick={() => setCustomizingOuter(true)}
                      className={`flex-1 text-sm py-1 rounded ${customizingOuter ? 'bg-purple-200 text-purple-900' : 'bg-gray-200'
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
              defaultColors={customizingOuter ? defaultOuterColors ?? outerColors : defaultColors}
              notify={notify}
              elementLabels={customizingOuter ? outerLabels : elementLabels}
              onIsCustomizingChange={setIsCustomizingColors}
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
            <DownloadButton onDownload={handleDownload} />
          </>
        )}
        <div
          className={`transition-opacity duration-300 ease-in-out ${transitionPhase ? 'opacity-0 pointer-events-none' : 'opacity-100'
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
