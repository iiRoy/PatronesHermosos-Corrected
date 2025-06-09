'use client';
import Image from 'next/image';
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import withIconDecorator from '../../decorators/IconDecorator';
import { interpolateRgb } from 'd3-interpolate';
import * as Icons from '../../icons';

export const Options = withIconDecorator(Icons.DotsThree);
export const Back = withIconDecorator(Icons.ArrowBendUpLeft);
import OptionsMenu from '../../headers_menu_users/OptionMenu';

interface ConcentricDonutChartProps {
  apiEndpoint: string;
  dataPath: string;
  title?: string;
  areaInner: string;
  areaOuter?: string;
  outerFilterValues?: string[];
  colorPalette?: string[];
  statusColors?: string[];
  imageSrc?: string;
  onMinimize?: () => void;
  isFrozen?: boolean;
}

function toGrayish(hex: string, intensity: number = 1): string {
  const parsed = hex.replace('#', '');
  const r = parseInt(parsed.substring(0, 2), 16);
  const g = parseInt(parsed.substring(2, 4), 16);
  const b = parseInt(parsed.substring(4, 6), 16);

  const gray = Math.round((r-0.2 + g + b) / 2.8);
  const newR = Math.round(r * (1 - intensity) + gray * intensity *1.3);
  const newG = Math.round(g * (1 - intensity) + gray * intensity *1.3);
  const newB = Math.round(b * (1 - intensity) + gray * intensity *1.3);

  return `#${[newR, newG, newB].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}

const ConcentricDonutChart: React.FC<ConcentricDonutChartProps> = ({
  apiEndpoint,
  dataPath,
  title = 'Gráfico Concéntrico',
  areaInner,
  areaOuter = 'status',
  outerFilterValues = [],
  colorPalette,
  statusColors,
  imageSrc = '/assets/logo.png',
  onMinimize,
  isFrozen = false,
}) => {
  const [innerData, setInnerData] = useState<any[]>([]);
  const [outerData, setOuterData] = useState<any[]>([]);
  const [outerColorMap, setOuterColorMap] = useState<Record<string, string>>({});
  const [fade, setFade] = useState(false);
  const [fadeSec, setFadeSec] = useState(false);
  const [selectedRol, setSelectedRol] = useState<string | undefined>(undefined);
  const [rolColor, setRolColor] = useState<string | undefined>(undefined);
  const isFirstRender = useRef(true);
  const [showMenu, setShowMenu] = useState(false);
  const [colors, setColors] = useState<string[]>([]); // Inicializa con tus colores
  const [defaultColors, setDefaultColors] = useState<string[]>([]);
  const defaultRoleColors = useMemo(() => ['#683756', '#97639c', '#B77690'], []);
  const defaultStatusPalette = useMemo(() => ['#BBA44BFF', '#488262FF', '#BB4B4BFF', '#aaa'], []);
  const [animatedInnerFills, setAnimatedInnerFills] = useState<string[]>([]);
  const [animatedOuterFills, setAnimatedOuterFills] = useState<string[]>([]);
  const [interactionsDisabled, setInteractionsDisabled] = useState(true);
  const chartRef = useRef<HTMLDivElement>(null);
  const [defaultOuterColorMap, setDefaultOuterColorMap] = useState<Record<string, string>>({});
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string }>({
    sede: '__all__',
  });
  const [sedeOptions, setSedeOptions] = useState<{ label: string; value: string }[]>([]);
  const [selectedSedeName, setSelectedSedeName] = useState<string>('');
  const [dataReady, setDataReady] = useState(false);

  useEffect(() => {
    setDataReady(false);
    if (innerData.length > 0) {
      // Espera un tick para desmontar y volver a montar el PieChart
      setTimeout(() => setDataReady(true), 500);
    }
  }, [innerData, outerData]);

  useEffect(() => {
    if (isFirstRender.current) {
      setFade(true);
      setTimeout(() => {
        setFade(false);
      }, 1000);
    }
  }, [chartRef, setFade, setFadeSec]);

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
          Authorization: `Bearer ${
            typeof window !== 'undefined' ? localStorage.getItem('api_token') : ''
          }`,
        },
      });

      return await res.json();
    } catch (error) {
      console.error('Error cargando resumenEvento:', error);
      return null;
    }
  };

  const apiURL = useMemo(() => {
    const sede = selectedFilters.sede;
    const params = new URLSearchParams();
    if (sede && sede !== '__all__') params.append('id', sede);
    return `${apiEndpoint}${params.toString() ? `&${params.toString()}` : ''}`;
  }, [selectedFilters, apiEndpoint]);

  useEffect(() => {
    const steps = 20;
    const stepDuration = 15;

    let step = 0;

    const innerInterpolators = innerData.map((entry, index) => {
      const from = animatedInnerFills[index] || entry.fill;
      const to = !selectedRol || entry.name === selectedRol ? entry.fill : toGrayish(entry.fill);
      return interpolateRgb(from, to);
    });

    const outerInterpolators = outerData.map((entry, index) => {
      const from = animatedOuterFills[index] || entry.fill;
      const to = !selectedRol || entry.rol === selectedRol ? entry.fill : toGrayish(entry.fill);
      return interpolateRgb(from, to);
    });

    const interval = setInterval(() => {
      step += 1;
      const progress = Math.min(step / steps, 1);

      setAnimatedInnerFills(innerInterpolators.map((fn) => fn(progress)));
      setAnimatedOuterFills(outerInterpolators.map((fn) => fn(progress)));

      if (progress >= 1) clearInterval(interval);
    }, stepDuration);

    return () => clearInterval(interval);
  }, [selectedRol, innerData, outerData, animatedInnerFills, animatedOuterFills]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setDataReady(false);
        const res = await fetch(apiURL, {
          headers: {
            Authorization: `Bearer ${
              typeof window !== 'undefined' ? localStorage.getItem('api_token') : ''
            }`,
          },
        });

        const json = await res.json();
        const source = dataPath ? json[dataPath] : json;
        if (!Array.isArray(source)) return;

        const parsedPalette = colorPalette ?? defaultRoleColors;
        const parsedStatusPalette = statusColors ?? defaultStatusPalette;

        const allStatuses = Array.from(new Set(['Pendiente', 'Aprobada', 'Rechazada']));
        const statusToColorMap = new Map<string, string>();
        allStatuses.forEach((status, i) => {
          statusToColorMap.set(status, parsedStatusPalette[i % parsedStatusPalette.length]);
        });

        const innerMap = new Map<string, number>();
        const outerCounts: Record<string, Record<string, number>> = {};

        source.forEach((item) => {
          const inner = item[areaInner] ?? 'Desconocido';
          const outer = item[areaOuter] ?? 'Desconocido';
          const value = Number(item.total) || 0;
          innerMap.set(inner, (innerMap.get(inner) || 0) + value);
          if (!outerCounts[inner]) outerCounts[inner] = {};
          outerCounts[inner][outer] = (outerCounts[inner][outer] || 0) + value;
        });

        const innerArray = Array.from(innerMap.entries()).map(([name, total], index) => ({
          name,
          total,
          fill: parsedPalette[index % parsedPalette.length],
        }));

        const outerArray: any[] = [];
        innerArray.forEach((segment) => {
          const outer = outerCounts[segment.name];
          Object.entries(outer).forEach(([status, value]) => {
            if (outerFilterValues.length === 0 || outerFilterValues.includes(status)) {
              outerArray.push({
                name: status,
                rol: segment.name,
                total: value,
                fill: statusToColorMap.get(status) || '#ccc',
              });
            }
          });
        });

        // Guardar defaultColors para inner
        setColors(innerArray.map((d) => d.fill));
        setDefaultColors(innerArray.map((d) => d.fill));

        // Construir y guardar defaultOuterColorMap
        const outerMap: Record<string, string> = {};
        outerArray.forEach((d) => {
          if (!outerMap[d.name]) outerMap[d.name] = d.fill;
        });
        setOuterColorMap(outerMap);
        setDefaultOuterColorMap({ ...outerMap });

        setFadeSec(true);
    
          setFadeSec(false);
          setInnerData(innerArray);
          setOuterData(outerArray);
          setSelectedSedeName(
            sedeOptions.find((s) => s.value === selectedFilters.sede)?.label ?? '',
          );
          setTimeout(() => setDataReady(true), 500);

        setTimeout(() => {
          isFirstRender.current = false;
          setInteractionsDisabled(false);
        }, 2500);
      } catch (err) {
        console.error('Error al cargar datos:', err);
      }
    };

    fetchData();
  }, [
    apiURL,
    dataPath,
    areaInner,
    areaOuter,
    colorPalette,
    statusColors,
    sedeOptions,
    selectedFilters.sede,
    defaultRoleColors,
    defaultStatusPalette,
  ]);

  useEffect(() => {
    const loadSedes = async () => {
      const res = await fetchDashboardData({ page: 'venues' });
      if (res?.venues && Array.isArray(res.venues)) {
        const opciones = res.venues
          .filter((venue: any) => venue.status === 'Registrada con participantes')
          .map((sede: any) => ({
            label: sede.name,
            value: sede.id.toString(),
          }));
        setSedeOptions([{ label: '', value: '__all__' }, ...opciones]);
      }
    };
    loadSedes();
  }, []);

  const elementLabels = innerData.map((d) => d.name);

  const outerLabels = Array.from(new Set(outerData.map((d) => d.name)));
  const outerColors = outerLabels.map((name) => outerColorMap[name] ?? '#ccc');
  const defaultOuterColors = outerLabels.map((name) => defaultOuterColorMap[name] ?? '#ccc');

  return (
    <div className='bg-white rounded-xl w-full h-full p-4 flex flex-col'>
      {/* Título */}
      <div className='relative flex justify-between items-center'>
        <div className='flex flex-col'>
          <h1 className='font-bold text-2xl'>{title}</h1>
          <div
            className={`text-[var(--secondaryColor)] text-xs transition-opacity duration-300 ${
              fadeSec ? 'opacity-0' : 'opacity-100'
            }`}
          >
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
            onMinimize={
              onMinimize ??
              (() => {
                isFrozen = true;
              })
            }
            onToggleVisibility={() => {}}
            onMaxItemsChange={() => {}}
            maxItemsSelected={undefined}
            visible={showMenu}
            setVisible={setShowMenu}
            chartRef={chartRef}
            totalItems={innerData.length}
            defaultColors={defaultColors}
            filteredData={innerData}
            outerData={outerData}
            xKey='name'
            seriesKeys={[]} // PieChart
            title={title}
            colors={colors}
            setColors={(newColors) => {
              setColors(newColors);
              setInnerData((prev) => prev.map((d, i) => ({ ...d, fill: newColors[i] ?? d.fill })));
            }}
            elementLabels={elementLabels}
            restoreDefaultColors={() => setColors(defaultColors)}
            outerLabels={outerLabels}
            outerColors={outerColors}
            defaultOuterColors={defaultOuterColors}
            setOuterColors={(newColors) => {
              const newMap: Record<string, string> = {};
              outerLabels.forEach((label, i) => {
                newMap[label] = newColors[i] ?? '#ccc';
              });
              setOuterColorMap(newMap);
              setOuterData((prev) =>
                prev.map((d) => ({
                  ...d,
                  fill: newMap[d.name] ?? d.fill,
                })),
              );
            }}
            restoreDefaultOuterColors={() => {
              setOuterColorMap({ ...defaultOuterColorMap });
              setOuterData((prev) =>
                prev.map((d) => ({
                  ...d,
                  fill: defaultOuterColorMap[d.name] ?? '#ccc',
                })),
              );
            }}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            chartType='pie'
          />
        </div>
      </div>

      {/* Gráfico */}
      <div className='relative w-auto h-auto'>
        {!isFrozen ? (
          innerData.length === 0 || !dataReady && isFirstRender.current ? (
            <div className='relative flex flex-col justify-between items-center h-auto'>
              <p className='text-textDim text-lg text-center px-10 py-40 h-max'>
                No hay datos para mostrar
              </p>
            </div>
          ) : (
            <div className='pointer-events-none relative w-full h-[30vh]'>
              <ResponsiveContainer>
                <PieChart>
                  {/* Círculo interno - áreas principales */}
                  <Pie
                    data={innerData}
                    dataKey='total'
                    nameKey='name'
                    cx='50%'
                    cy='50%'
                    innerRadius='43%'
                    outerRadius='70%'
                    isAnimationActive
                  >
                    {innerData.map((entry, index) => (
                      <Cell
                        key={`inner-${index}`}
                        stroke={'#fff'}
                        strokeWidth={2}
                        fill={
                          isFirstRender.current
                            ? entry.fill
                            : animatedInnerFills[index] ?? entry.fill
                        }
                      />
                    ))}
                  </Pie>

                  {/* Círculo externo - desglose alineado */}
                  <Pie
                    data={outerData}
                    dataKey='total'
                    nameKey='name'
                    cx='50%'
                    cy='50%'
                    innerRadius='72%'
                    outerRadius='94%'
                    isAnimationActive
                  >
                    {outerData.map((entry, index) => (
                      <Cell
                        key={`outer-${index}`}
                        stroke={'#fff'}
                        strokeWidth={2}
                        fill={
                          isFirstRender.current
                            ? entry.fill
                            : animatedOuterFills[index] ?? entry.fill
                        }
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Imagen central */}
              <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-2 transition-opacity duration-300 ${
                  fade && !isFirstRender.current ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <Image src={imageSrc} alt='Logo centro' width={60} height={60} />
              </div>
            </div>
          )
        ) : (
          <div className='w-full h-full' />
        )}
      </div>

      {/* Leyendas Interactivas */}
      {innerData.length > 0 || dataReady && !isFirstRender.current ? (
        <div
          className={`flex ${
            interactionsDisabled ? 'pointer-events-none' : ''
          } flex-col items-center gap-3 mt-4 transition-opacity duration-300 ${
            fadeSec || fade ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className={`flex flex-row items-center justify-end w-full relative`}>
            {/* Título dinámico */}
            <div className='flex flex-col w-full items-center justify-center'>
              <h2
                className='text-lg font-bold text-center'
                style={{ color: selectedRol !== undefined ? rolColor : undefined }}
              >
                {selectedRol === undefined ? 'Leyendas' : selectedRol}
              </h2>
              {selectedRol == undefined ? (
                <span className={'text-xs text-textDim'}>
                  Selecciona una leyenda para ver sus propiedades.
                </span>
              ) : (
                <span className={'text-xs text-textDim'}>Propiedades de la leyenda.</span>
              )}
            </div>
            {selectedRol !== undefined && (
              <button
                onClick={() => {
                  setFade(true);
                  setTimeout(() => {
                    setSelectedRol(undefined);
                    setRolColor(undefined);
                    setFade(false);
                  }, 200);
                }}
                className='hover:opacity-80 hover:scale-125 transition-all absolute'
              >
                <Back
                  fillColor='var(--secondaryColor)'
                  strokeColor='var(--secondaryColor)'
                  strokeWidth={1}
                  width={20}
                  height={20}
                />
              </button>
            )}
          </div>

          {/* Leyenda principal o detalle */}
          <div className='flex gap-2 justify-center items-center text-center h-full'>
            {selectedRol === undefined
              ? innerData.map((item) => {
                  const hasDetails = outerData.some((d) => d.rol === item.name);
                  return (
                    <div
                      key={item.name}
                      className='flex flex-col hover:scale-110 transition-all items-center w-24 text-center cursor-pointer group'
                      style={{ color: item.fill || '#ccc' }}
                      onClick={() => {
                        if (hasDetails) {
                          setFade(true);
                          setTimeout(() => {
                            setSelectedRol(item.name);
                            setRolColor(item.fill);
                            setFade(false);
                          }, 200);
                        }
                      }}
                      title={hasDetails ? 'Ver detalles' : 'Sin detalles'}
                    >
                      <div className='items-center justify-center gap-1 mb-1'>
                        <div
                          className='w-5 h-5 rounded-full'
                          style={{ backgroundColor: item.fill || '#ccc' }}
                        />
                      </div>
                      <h1 className='font-semibold text-sm'>{item.total}</h1>
                      <h2 className='text-xs text-gray-600 break-words'>{item.name}</h2>
                    </div>
                  );
                })
              : outerData
                  .filter((d) => d.rol === selectedRol)
                  .map((item, idx) => (
                    <div
                      key={idx}
                      className='flex flex-col items-center w-24 text-center'
                      style={{ color: item.fill || '#ccc' }}
                    >
                      <div
                        className='w-5 h-5 rounded-full mb-1'
                        style={{ backgroundColor: item.fill || '#ccc' }}
                      />
                      <h1 className='font-semibold text-sm'>{item.total}</h1>
                      <h2 className='text-xs text-gray-600 break-words'>{item.name}</h2>
                    </div>
                  ))}
          </div>
        </div>
      ) : undefined}
    </div>
  );
};

export default ConcentricDonutChart;
