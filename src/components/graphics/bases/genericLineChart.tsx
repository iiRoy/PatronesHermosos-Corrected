// app/components/charts/GenericLineChart.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from 'recharts';
import Filtro from '../../headers_menu_users/FiltroEvento';
import withIconDecorator from '../../decorators/IconDecorator';
import * as Icons from '../../icons';
import OptionsMenu from '../../headers_menu_users/OptionMenu';

export const Options = withIconDecorator(Icons.DotsThree);

interface GenericLineChartProps {
  apiEndpoint: string;
  title?: string;
  dataPath?: string;
  xKey?: string;
  onMinimize: () => void;
}

interface ChartDataItem {
  [key: string]: string | number;
}

const GenericLineChart: React.FC<GenericLineChartProps> = ({
  apiEndpoint,
  title = 'Gráfica de Línea',
  dataPath,
  xKey = 'fecha',
  onMinimize,
}) => {
  const [data, setData] = useState<ChartDataItem[]>([]);
  const [filteredData, setFilteredData] = useState<ChartDataItem[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<string>('mensual');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [colors, setColors] = useState<string[]>(['#97639c', '#C57FAB', '#6E2D75', '#683756']);
  const [showMenu, setShowMenu] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(apiEndpoint);
        const json = await res.json();
        const rawData = dataPath ? json[dataPath] : json;
        if (!Array.isArray(rawData)) return;
        setData(rawData);
        setFilteredData(rawData);
        setSelectedRoles(
          Object.keys(rawData[0] || {}).filter((key) => key !== xKey && typeof rawData[0][key] === 'number')
        );
      } catch (err) {
        console.error('Error cargando datos:', err);
      }
    };
    fetchData();
  }, [apiEndpoint, dataPath, xKey]);

  const handleRoleFilterChange = (updated: string[]) => {
    setSelectedRoles(updated);
  };

  const filteredPaginatedData = () => {
    const itemsPerPage = 30;
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredData.slice(start, end);
  };

  return (
    isVisible && (
      <div ref={chartRef} className='bg-white rounded-xl w-full h-full p-4 flex flex-col'>
        <div className='relative flex justify-between items-center'>
          <h1 className='font-bold text-2xl'>{title}</h1>
          <button
            onClick={() => setShowMenu(true)}
            disabled={showMenu}
            className='cursor-pointer'
          >
            <Options fillColor='var(--secondaryColor)' strokeColor='var(--secondaryColor)' width='3vmax' height='3vmax' />
          </button>
          <div className='absolute top-full right-0 z-50'>
            <OptionsMenu
              onMinimize={onMinimize}
              onToggleVisibility={() => setIsVisible(false)}
              setColors={setColors}
              visible={showMenu}
              setVisible={setShowMenu}
              chartRef={chartRef}
              totalItems={data.length}
              defaultColors={colors}
              filteredData={filteredData}
              xKey={xKey}
              seriesKeys={selectedRoles}
              title={title}
              colors={colors}
              elementLabels={selectedRoles}
              restoreDefaultColors={() => setColors(['#97639c', '#C57FAB', '#6E2D75', '#683756'])}
              onMaxItemsChange={() => {}}
              maxItemsSelected={selectedRoles.length}
            />
          </div>
        </div>

        <div className='flex justify-end my-4'>
          <Filtro
            options={selectedRoles.map((r) => ({ value: r, label: r }))}
            selected={selectedRoles}
            onChange={handleRoleFilterChange}
            label='Roles'
            labelOptions='ROL'
            selectAll={true}
            deselectAll={true}
          />
        </div>

        <ResponsiveContainer width='100%' height={400}>
          <LineChart data={filteredPaginatedData()}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            {selectedRoles.map((role, index) => (
              <Line
                key={role}
                type='monotone'
                dataKey={role}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>

        <div className='flex justify-center items-center mt-4 gap-2'>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
            className='px-3 py-1 bg-gray-200 rounded hover:bg-gray-300'
          >
            {'<'} Anterior
          </button>
          <span className='text-sm text-gray-700'>Página {currentPage + 1}</span>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className='px-3 py-1 bg-gray-200 rounded hover:bg-gray-300'
          >
            Siguiente {'>'}
          </button>
        </div>
      </div>
    )
  );
};

export default GenericLineChart;