import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
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
import withIconDecorator from '../../decorators/IconDecorator';
import * as Icons from '../../icons';
import OptionsMenu from '../../headers_menu_users/OptionMenu';
import { format, parseISO, startOfWeek, subMonths, subWeeks } from 'date-fns';
import { es } from 'date-fns/locale';

export const Options = withIconDecorator(Icons.DotsThree);

interface GenericLineChartProps {
  apiEndpoint: string;
  title?: string;
  dataPath?: string;
  xKey?: string;
  onMinimize: () => void;
}

interface ChartDataItem {
  [key: string]: any;
}

const GenericLineChart: React.FC<GenericLineChartProps> = ({
  apiEndpoint,
  title = '',
  dataPath,
  xKey = 'Fecha',
  onMinimize,
}) => {
  const [data, setData] = useState<ChartDataItem[]>([]);
  const [filteredData, setFilteredData] = useState<ChartDataItem[]>([]);
  const [availableRoles, setAvailableRoles] = useState<string[]>([]);
  const isFirstRender = useRef(true);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [currentStartIndex, setCurrentStartIndex] = useState<number>(0);
  const [colors, setColors] = useState<string[]>(['#97639c', '#C57FAB', '#6E2D75', '#683756']);
  const [showMenu, setShowMenu] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [maxYValue, setMaxYValue] = useState(0);
  const chartRef = useRef<HTMLDivElement>(null);
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string }>({
    sede: '__all__',
    frecuencia: '__default__',
    detalle: '1',
    estado: '__all__',
  });
  const [selectedSedeName, setSelectedSedeName] = useState<string>('');
  const [sedes, setSedes] = useState<{ label: string; value: string }[]>([]);

  const handleRoleFilterChange = (updated: string[]) => setSelectedRoles(updated);

  const apiURL = useMemo(() => {
    const params = new URLSearchParams();
    if (selectedFilters.sede && selectedFilters.sede !== '__all__')
      params.append('id', selectedFilters.sede);
    if (selectedFilters.sede == '__all__') selectedFilters.sede = ''
    if (selectedFilters.frecuencia && selectedFilters.frecuencia !== '__default__')
      params.append('frec', selectedFilters.frecuencia);
    if (selectedFilters.detalle) params.append('lev', selectedFilters.detalle);
    if (selectedFilters.estado && selectedFilters.estado !== '__all__')
      params.append('state', selectedFilters.estado);
    return `${apiEndpoint}&${params.toString()}`;
  }, [selectedFilters, apiEndpoint]);

  const itemsPerPage = 4;

  useEffect(() => {
    if (availableRoles.length > 0) {
      setSelectedRoles(availableRoles);
    }
  }, [availableRoles]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(apiURL, {
          headers: {
            Authorization: `Bearer ${
              typeof window !== 'undefined' ? localStorage.getItem('api_token') : ''
            }`,
          },
        });
        const json = await res.json();
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

        const rawData = dataPath ? json[dataPath] : json;
        if (!Array.isArray(rawData)) return;

        const rawByDate = new Map<string, Record<string, any>>();

        rawData.forEach(({ fecha, tipo, total }) => {
          if (!rawByDate.has(fecha)) {
            rawByDate.set(fecha, { [xKey]: fecha });
          }
          rawByDate.get(fecha)![tipo] = total;
        });

        const allDatesRaw = Array.from(rawByDate.keys()).map((d) => parseISO(d));
        if (allDatesRaw.length === 0) return;

        const isMonthly = selectedFilters.frecuencia === '2';
        const today = new Date();
        const maxDate = isMonthly
          ? new Date(today.getFullYear(), today.getMonth(), 1)
          : startOfWeek(today, { weekStartsOn: 1 });
        const minDate = new Date(Math.min(...allDatesRaw.map((d) => d.getTime())));

        const dateList: string[] = [];
        let current = new Date(maxDate);

        const formatter = (date: Date) =>
          isMonthly ? format(date, 'yyyy-MM-01') : format(date, 'yyyy-MM-dd');

        if (isMonthly) {
          current.setDate(1);
          let count = 0;
          while (current >= minDate || count < itemsPerPage) {
            dateList.push(formatter(current));
            current = isMonthly ? subMonths(current, 1) : subWeeks(current, 1);
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

        const filled: Record<string, any>[] = dateList.map((fecha) => {
          const row = { [xKey]: fecha };
          allRoles.forEach((role) => {
            row[role] = rawByDate.get(fecha)?.[role] ?? 0;
          });
          return row;
        });

        const maxTotal = Math.max(
          0,
          ...filled.flatMap((entry) => allRoles.map((role) => Number(entry[role] || 0))),
        );

        setFilteredData(filled);
        setData(filled);
        setAvailableRoles(allRoles);
        setMaxYValue(maxTotal);
        setCurrentStartIndex(0);
        setSelectedSedeName(sedes.find((s) => s.value === selectedFilters.sede)?.label ?? '');
      } catch (err) {
        console.error('Error cargando datos:', err);
      }
    };
    fetchData();
  }, [apiURL, dataPath, xKey]);

  const loadSedes = useCallback(async () => {
    try {
      const res = await fetch('/api/data?page=venues', {
        headers: {
          Authorization: `Bearer ${
            typeof window !== 'undefined' ? localStorage.getItem('api_token') : ''
          }`,
        },
      });
      const data = await res.json();

      if (data?.venues && Array.isArray(data.venues)) {
        const opciones = data.venues
          .filter((venues: any) => venues.status === 'Registrada con participantes')
          .map((sede: any) => ({
            value: sede.id.toString(),
            label: sede.name,
          }));

        setSedes([{ value: '__all__', label: 'Todas las sedes' }, ...opciones]);
      } else {
        console.warn('No se encontraron sedes o el formato de respuesta es incorrecto:', data);
      }
    } catch (error) {
      console.error('Error al cargar las sedes:', error);
    }
  }, []);

  useEffect(() => {
    loadSedes();
  }, [loadSedes]);

  const paginatedData = () =>
    filteredData.slice(currentStartIndex, currentStartIndex + itemsPerPage);

  const avanzarPagina = () => {
    if (currentStartIndex + itemsPerPage < filteredData.length) {
      setCurrentStartIndex((prev) => prev + 1);
    }
  };

  const retrocederPagina = () => {
    if (currentStartIndex > 0) {
      setCurrentStartIndex((prev) => prev - 1);
    }
  };

  return (
    <div className='bg-white rounded-xl w-full h-full p-4 flex flex-col'>
      {/* Título */}
      <div className='relative flex justify-between items-center'>
        <div className='flex flex-col'>
          <h1 className='font-bold text-2xl'>{title}</h1>
          <div className={`text-[var(--secondaryColor)] text-xs transition-opacity duration-300`}>
            <span>{selectedSedeName}</span>
          </div>
        </div>
        <button
          onClick={() => {
            if (!showMenu) setShowMenu(true);
          }}
          disabled={showMenu}
          id='options-button'
          className={`cursor-pointer transition-opacity ${
            showMenu ? 'opacity-50 pointer-events-none' : 'opacity-100'
          }`}
        >
          <Options
            fillColor='var(--secondaryColor)'
            strokeColor='var(--secondaryColor)'
            strokeWidth={2.5}
            width={'3vmax'}
            height={'3vmax'}
          />
        </button>
        {/* Menú fuera del flujo flex, pero dentro de contenedor relative */}
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
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            chartType='line'
            selection={selectedRoles}
            selectionChange={handleRoleFilterChange}
          />
        </div>
      </div>
      <div className='relative w-full h-[41vh]'>
      <ResponsiveContainer>
        <LineChart data={paginatedData()}>
          <CartesianGrid strokeDasharray='5 5' stroke='#ccc' />
          <XAxis
            dataKey={xKey}
            height={60}
            tick={({ x, y, payload }) => {
              const fecha = parseISO(payload.value);
              const isMonthly = selectedFilters.frecuencia === '2';

              return (
                <g transform={`translate(${x},${y + 10})`}>
                  {isMonthly ? (
                    <>
                      <text textAnchor='middle' fill='#333' fontWeight='bold' fontSize={12}>
                        {format(fecha, 'MMMM', { locale: es }).charAt(0).toUpperCase()}
                        {format(fecha, 'MMMM', { locale: es }).slice(1)}
                      </text>
                      <text y={14} textAnchor='middle' fill='#777' fontSize={10}>
                        {format(fecha, 'yyyy', { locale: es })}
                      </text>
                    </>
                  ) : (
                    <>
                      <text textAnchor='middle' fill='#333' fontWeight='bold' fontSize={12}>
                        Semana {filteredData.findIndex((d) => d[xKey] === payload.value) + 1}
                      </text>
                      <text y={14} textAnchor='middle' fill='#777' fontSize={10}>
                        ({format(fecha, 'dd-MM-yyyy')})
                      </text>
                    </>
                  )}
                </g>
              );
            }}
          />
          <YAxis domain={[0, maxYValue]} allowDecimals={false} tickLine={false} axisLine={false} />
          <Tooltip wrapperClassName='text-sm' />
          <Legend wrapperStyle={{ fontSize: '0.75rem' }} />
          {selectedRoles.map((role, index) => (
            <Line
              key={role}
              type='monotone'
              dataKey={role}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              isAnimationActive={isFirstRender.current}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      </div>

      <div className='flex justify-center items-center mt-4 gap-2'>
        <button
          onClick={retrocederPagina}
          disabled={currentStartIndex === 0}
          className='px-3 py-1 bg-gray-200 rounded hover:bg-gray-300'
        >
          {'<'} Anterior
        </button>
        <span className='text-sm text-gray-700'>Página {currentStartIndex + 1}</span>
        <button
          onClick={avanzarPagina}
          disabled={currentStartIndex + itemsPerPage >= filteredData.length}
          className='px-3 py-1 bg-gray-200 rounded hover:bg-gray-300'
        >
          Siguiente {'>'}
        </button>
      </div>
    </div>
  );
};

export default GenericLineChart;
