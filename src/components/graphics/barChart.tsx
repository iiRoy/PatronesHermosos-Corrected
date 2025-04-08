'use client';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Rectangle,
    ResponsiveContainer,
} from 'recharts';

const CustomTick: React.FC<{
    x?: number;
    y?: number;
    payload?: { value: string };
    numElements: number;
}> = ({ x = 0, y = 0, payload = { value: '' }, numElements }) => {
    const [chartWidth, setChartWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const updateWidth = () => setChartWidth(window.innerWidth);
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const getFontSize = () => Math.max(chartWidth / 75, 14);
    const getLineHeight = () =>
        chartWidth > 800 ? 18 : chartWidth > 400 ? 16 : 14;
    const fontSize = getFontSize();
    const lineHeight = getLineHeight();

    const maxWidth = chartWidth / (numElements * 2);

    const measureTextWidth = (text: string, fontSize: number) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (context) {
            context.font = `${fontSize}px sans-serif`;
            return context.measureText(text).width;
        }
        return 0;
    };

    const truncateWord = (word: string, maxWidth: number) => {
        if (measureTextWidth(word, fontSize) <= maxWidth) return word;
        let truncated = word;
        while (
            measureTextWidth(truncated + '...', fontSize) > maxWidth &&
            truncated.length > 1
        ) {
            truncated = truncated.slice(0, -1);
        }
        return truncated + '...';
    };

    const splitText = (text: string, maxWidth: number) => {
        const words = text.split(' ');
        const lines: string[] = [];
        let currentLine = '';

        words.forEach((word) => {
            const processedWord = truncateWord(word, maxWidth);
            const newLine = currentLine
                ? `${currentLine} ${processedWord}`
                : processedWord;
            const lineWidth = measureTextWidth(newLine, fontSize);

            if (lineWidth > maxWidth && currentLine) {
                lines.push(currentLine);
                currentLine = processedWord;
            } else {
                currentLine = newLine;
            }
        });

        if (currentLine) lines.push(currentLine);

        if (lines.length > 2) {
            if (!lines[1].endsWith('...')) {
                lines[1] += '...';
            }
            return lines.slice(0, 2);
        }

        if (
            lines.join(' ') !== text &&
            !lines[lines.length - 1].endsWith('...')
        ) {
            lines[lines.length - 1] += '...';
        }

        return lines;
    };

    const lines = splitText(payload?.value || '', maxWidth);

    return (
        <text
            x={x}
            y={y + 15}
            textAnchor='middle'
            fill='#8E76A3FF'
            fontSize={fontSize}
        >
            {lines.map((line, index) => (
                <tspan key={index} x={x} dy={index * lineHeight}>
                    {line}
                </tspan>
            ))}
        </text>
    );
};

const CustomLegend = () => {
    const legendKeys = Object.keys(data[0]).filter((key) => key !== 'name');

    return (
        <div className='flex items-center gap-4'>
            {legendKeys.map((key, index) => (
                <div key={key} className='flex items-center gap-1'>
                    <span
                        className={`w-3 h-3 rounded-full ${
                            index % 2 === 0 ? 'bg-primary' : 'bg-secondaryShade'
                        }`}
                    ></span>
                    <span
                        className={`font-medium ${
                            index % 2 === 0
                                ? 'text-primary'
                                : 'text-secondaryShade'
                        }`}
                    >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                    </span>
                </div>
            ))}
        </div>
    );
};

const data = [
    {
        name: 'ITESM Puebla',
        participantes: 50,
        colaboradores: 15,
    },
    {
        name: 'MIT',
        participantes: 100,
        colaboradores: 32,
    },
    {
        name: 'Universidad de los Andes',
        participantes: 26,
        colaboradores: 10,
    },
    {
        name: 'ITESM Guadalajara',
        participantes: 67,
        colaboradores: 20,
    },
    {
        name: 'ITESM Querétaro',
        participantes: 15,
        colaboradores: 5,
    },
    {
        name: 'ITESM Monterrey',
        participantes: 140,
        colaboradores: 35,
    },
];

const CountChart = () => {
    const [filteredData, setFilteredData] = useState(data);
    const [selectedSedes, setSelectedSedes] = useState<string[]>(
        data.map((d) => d.name)
    );
    const [fade, setFade] = useState(false);

    const options = data.map((d) => ({
        value: d.name,
        label: d.name,
    }));

    const handleFilterChange = (updatedSedes: string[]) => {
        setFade(true); // Trigger fade-out
        setTimeout(() => {
            setSelectedSedes(updatedSedes);
            setFilteredData(data.filter((d) => updatedSedes.includes(d.name)));
            setFade(false); // Trigger fade-in
        }, 200);
    };

    const isFirstRender = useRef(true);
    useEffect(() => {

        isFirstRender.current = false;

        const handleClickOutside = (event: MouseEvent) => {
            if ((event.target as HTMLElement).closest('#filter-bar')) {
                return;
            }
            const dropdown = document.getElementById('filter-dropdown');
            if (dropdown && !dropdown.contains(event.target as Node)) {
                dropdown.classList.add('hidden');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='bg-white rounded-xl w-full h-full p-4 flex flex-col justify-between'>
            {/*TITLE*/}
            <div className='flex justify-between items-center'>
                <h1 className='flex justify-between font-bold items-center text-2xl'>
                    Personas por SEDE
                </h1>
                <Image src='/moreDark.png' alt='' width={20} height={20} />
            </div>
            {/*LEGEND AND FILTER*/}
            <div className='flex flex-col md:flex-row gap-3 md:gap-6 justify-between items-center mt-4 mb-4 ml-7 mr-7'>
                <CustomLegend />
                <div className='flex justify-between w-full items-center'>
                    <div className='flex items-center w-full justify-end relative'>
                        <div
                            id='filter-bar'
                            className='flex items-center rounded-lg px-3 py-2 cursor-pointer w-full md:max-w-xs gap-3 bg-[#E6E1ECFF] text-primaryShade'
                            onClick={() => {
                                const dropdown =
                                    document.getElementById('filter-dropdown');
                                if (dropdown)
                                    dropdown.classList.toggle('hidden');
                            }}
                        >
                            <Image
                                src='/date.png'
                                alt='Filtros'
                                width={20}
                                height={20}
                                className='ml-2'
                            />
                            <span className='font-bold text-lg'>Filtros</span>
                        </div>
                        <div
                            id='filter-dropdown'
                            className='absolute top-full right-0 mt-2 w-full md:max-w-xs bg-white border border-gray-300 rounded-lg shadow-lg hidden z-10'
                        >
                            {options.map((option, index) => (
                                <label
                                    key={option.value}
                                    className={`${
                                        index % 2 === 0
                                            ? 'odd:text-primaryShade'
                                            : 'even:text-secondaryShade'
                                    } flex items-center px-4 py-2 hover:bg-purple-100 cursor-pointer`}
                                >
                                    <input
                                        type='checkbox'
                                        checked={selectedSedes.includes(
                                            option.value
                                        )}
                                        onChange={(e) => {
                                            const updatedSedes = e.target
                                                .checked
                                                ? [
                                                    ...selectedSedes,
                                                    option.value,
                                                ]
                                                : selectedSedes.filter(
                                                    (sede) =>
                                                        sede !== option.value
                                                );
                                            handleFilterChange(updatedSedes);
                                        }}
                                        className={`checkbox-circle mr-2 ${
                                            index % 2 === 0
                                                ? 'checkbox-odd'
                                                : 'checkbox-even'
                                        }`}
                                    />
                                    <span className='text-sm'>
                                        {option.label}
                                    </span>
                                </label>
                            ))}
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className='absolute inset-0'
                                style={{ zIndex: -1 }}
                                onMouseDown={() => {
                                    const dropdown =
                                        document.getElementById(
                                            'filter-dropdown'
                                        );
                                    if (dropdown)
                                        dropdown.classList.add('hidden');
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
            {/*CHART*/}
            <div
                className={`w-[0.9vm] h-full transition-opacity duration-300 ${
                    fade ? 'opacity-0' : 'opacity-100'
                }`}
            >
                {filteredData.length === 0 ? (
                    <div className='flex justify-center items-center h-full'>
                        <p className='text-textDim text-lg'>
                            No hay datos para mostrar
                        </p>
                    </div>
                ) : (
                    <ResponsiveContainer>
                        <BarChart
                            data={filteredData}
                            barSize={20}
                            className={`transition-opacity duration-300 ${
                                fade ? 'opacity-0' : 'opacity-100'
                            }`}
                        >
                            <CartesianGrid
                                strokeDasharray='3 3'
                                vertical={false}
                                stroke='#BBA5BDFF'
                            />
                            <XAxis
                                dataKey='name'
                                axisLine={false}
                                tick={
                                    <CustomTick
                                        numElements={filteredData.length}
                                    />
                                }
                                tickLine={false}
                                interval={0}
                                height={60}
                            />
                            <YAxis
                                axisLine={false}
                                tick={{ fill: '#8E76A3FF' }}
                                tickLine={false}
                            />
                            <Tooltip
                                labelFormatter={(label) => (
                                    <span style={{ fontWeight: 'bold' }}>
                                        {`SEDE: ${
                                            label.charAt(0).toUpperCase() +
                                            label.slice(1)
                                        }`}
                                    </span>
                                )}
                                formatter={(value, name) => {
                                    const formattedName =
                                        typeof name === 'string'
                                            ? name.charAt(0).toUpperCase() +
                                            name.slice(1)
                                            : name;
                                    return [`${value}`, formattedName];
                                }}
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc',
                                }}
                            />
                            {Object.keys(data[0])
                                .filter((key) => key !== 'name')
                                .map((key, index) => (
                                    <Bar
                                        key={key}
                                        dataKey={key}
                                        fill={
                                            index === 0 ? '#97639c' : '#C57FAB'
                                        }
                                        radius={[10, 10, 0, 0]}
                                        activeBar={
                                            index === 0 ? (
                                                <Rectangle fill='#6E2D75' />
                                            ) : (
                                                <Rectangle fill='#683756' />
                                            )
                                        }
                                        isAnimationActive={
                                            isFirstRender.current
                                        }
                                    />
                                ))}
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
};

export default CountChart;
