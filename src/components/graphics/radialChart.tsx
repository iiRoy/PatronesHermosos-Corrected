'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import withIconDecorator from '../decorators/IconDecorator';
import * as Icons from '../icons';

export const Options = withIconDecorator(Icons.DotsThree);

const RadialChart = () => {
    const [data, setData] = useState<{ rol: string; cantidad: number; fill: string }[]>([]);

    useEffect(() => {
        fetch('/api/dashboard', {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
        })
            .then((res) => res.json())
            .then((json) => {
                const resumen = json.resumenColaboradoras;
                const formatted = [
                    { rol: 'Total', cantidad: resumen.total, fill: 'white' },
                    { rol: 'Instructoras', cantidad: resumen.instructoras, fill: '#683756' },
                    { rol: 'Facilitadoras', cantidad: resumen.facilitadoras, fill: '#97639c' },
                    { rol: 'Staff', cantidad: resumen.staff, fill: '#B77690' },
                ];
                setData(formatted);
            });
    }, []);

    const legendRoles = ['Instructoras', 'Facilitadoras', 'Staff'];

    return (
        <div className='bg-white rounded-xl w-full h-full p-4 justify-between min-gap-2 flex flex-col'>
            {/* TITLE */}
            <div className='flex justify-between items-center'>
                <h1 className='flex justify-between font-bold items-center text-2xl'>
                    Colaboradores
                </h1>
                <Options
                    fillColor='var(--secondary)'
                    strokeColor='var(--secondary)'
                    strokeWidth={3}
                    width={30}
                    height={30}
                />
            </div>

            {/* CHART */}
            <div className='relative w-full h-full'>
                <ResponsiveContainer>
                    <RadialBarChart
                        cx='50%'
                        cy='50%'
                        innerRadius='40%'
                        outerRadius='100%'
                        barSize={32}
                        data={data}
                    >
                        <RadialBar
                            background={{ fill: '#E6E1ECFF' }}
                            dataKey='cantidad'
                            cornerRadius={10}
                        />
                    </RadialBarChart>
                </ResponsiveContainer>
                <Image
                    src='/assets/logo.png'
                    alt='Logo centro'
                    width={50}
                    height={50}
                    className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                />
            </div>

            {/* LEGEND */}
            <div className='flex justify-between gap-3 items-center w-auto ml-5 mr-5 mt-1'>
                {legendRoles.map((rol) => {
                    const item = data.find((d) => d.rol === rol);
                    return (
                        <div key={rol} className='flex flex-col items-center text-primary'>
                            <div
                                className='w-5 h-5 rounded-full'
                                style={{ backgroundColor: item?.fill || '#ccc' }}
                            />
                            <h1 className='font-semibold'>{item?.cantidad ?? 0}</h1>
                            <h2 className='text-xs text-gray-600'>{rol}</h2>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RadialChart;