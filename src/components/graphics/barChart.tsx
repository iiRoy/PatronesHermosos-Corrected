'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const CustomTick: React.FC<{
    x?: number;
    y?: number;
    payload?: { value: string };
}> = ({ x = 0, y = 0, payload = { value: '' } }) => {
    const [chartWidth, setChartWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        // Actualizar el ancho al montar el componente
        const updateWidth = () => setChartWidth(window.innerWidth);
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    // Ajuste del tamaño del texto y espaciado según el ancho
    const getFontSize = () => Math.max(chartWidth / 75, 14);
    const getLineHeight = () =>
        chartWidth > 800 ? 18 : chartWidth > 400 ? 16 : 14;
    const fontSize = getFontSize();
    const lineHeight = getLineHeight();

    // Ancho máximo permitido para el texto
    const maxWidth = chartWidth / 20;

    // Medir el ancho del texto usando canvas
    const measureTextWidth = (text: string, fontSize: number) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (context) {
            context.font = `${fontSize}px`;
            return context.measureText(text).width;
        }
        return 0;
    };

    const truncateWord = (word: string, maxWidth: number) => {
        let truncated = word;
        if (measureTextWidth(word, fontSize) > maxWidth) {
            while (
                measureTextWidth(truncated + '...', fontSize) > maxWidth &&
                truncated.length > 1
            ) {
                truncated = truncated.slice(0, -6);
            }
            return truncated + '...';
        }
        return word;
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

            if (lineWidth > maxWidth) {
                if (currentLine) lines.push(currentLine);
                currentLine = processedWord;
            } else {
                currentLine = newLine;
            }
        });

        if (currentLine) lines.push(currentLine);

        if (lines.length > 2) {
            lines[1] = truncateWord(lines[1], maxWidth);
            return lines.slice(0, 2);
        }

        return lines;
    };

    const lines = splitText(payload?.value || '', maxWidth);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
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
            setFilteredData(
                data.filter((d) => updatedSedes.includes(d.name))
            );
            setFade(false); // Trigger fade-in
        }, 200); // Duration of fade-out transition
    };

    return (
        <div className='bg-white rounded-xl w-full h-full p-4'>
            {/*TITLE*/}
            <div className='flex justify-between items-center'>
                <h1 className='flex justify-between font-bold items-center text-2xl'>
                    Personas por SEDE
                </h1>
                <Image src='/moreDark.png' alt='' width={20} height={20} />
            </div>
            {/*LEGEND AND FILTER*/}
            <div className='flex justify-between items-center mt-4 mb-4 ml-7 mr-7'>
                {/* Leyenda Personalizada */}
                <CustomLegend />
                <div className='flex justify-between w-full items-center'>
                    {/* Search Bar Styled Filter */}
                    <div className='flex items-center w-full justify-end relative'>
                        <div
                            className='flex items-center border border-gray-300 rounded-lg px-3 py-2 cursor-pointer w-full max-w-xs gap-3 bg-purple-100 text-primaryShade'
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
                        {/* Dropdown Menu */}
                        <div
                            id='filter-dropdown'
                            className='absolute top-full right-0 mt-2 w-full max-w-xs bg-white border border-gray-300 rounded-lg shadow-lg hidden z-10'
                        >
                            {options.map((option, index) => (
                                <div
                                    key={option.value}
                                    className={`${
                                        index % 2 === 0
                                            ? 'odd:text-primaryShade'
                                            : 'even:text-secondaryShade'
                                    } flex items-center px-4 py-2 hover:bg-purple-100`}
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
                                    <label className='text-sm'>
                                        {option.label}
                                    </label>
                                </div>
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
            <div className='w-[98%] h-[80%]'>
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
                            stroke='#ddd'
                        />
                        <XAxis
                            dataKey='name'
                            axisLine={false}
                            tick={<CustomTick />}
                            tickLine={false}
                            interval={0}
                            height={60} // Aumenta el tamaño en Y del XAxis
                        />
                        <YAxis
                            axisLine={false}
                            tick={{ fill: '#8E76A3FF' }}
                            tickLine={false}
                        />
                        <Tooltip
                            labelFormatter={(label) => (
                                <span style={{ fontWeight: 'bold' }}>{`SEDE: ${
                                    label.charAt(0).toUpperCase() +
                                    label.slice(1)
                                }`}</span>
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
                                    fill={index === 0 ? '#97639c' : '#C57FAB'}
                                    radius={[10, 10, 0, 0]}
                                    isAnimationActive={false}
                                />
                            ))}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default CountChart;
