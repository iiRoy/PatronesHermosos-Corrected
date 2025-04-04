"use client";
import Image from 'next/image';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: '18-24',
        uv: 31.47,
        pv: 2400,
        fill: '#8884d8',
    },
    {
        name: '25-29',
        uv: 26.69,
        pv: 4567,
        fill: '#83a6ed',
    },
    {
        name: '30-34',
        uv: 15.69,
        pv: 1398,
        fill: '#8dd1e1',
    },
    {
        name: '35-39',
        uv: 8.22,
        pv: 9800,
        fill: '#82ca9d',
    },
    {
        name: '40-49',
        uv: 8.63,
        pv: 3908,
        fill: '#a4de6c',
    },
    {
        name: '50+',
        uv: 2.63,
        pv: 4800,
        fill: '#d0ed57',
    },
    {
        name: 'unknow',
        uv: 6.67,
        pv: 4800,
        fill: '#ffc658',
    },
];

const CountChart = () => {
    return (
        <div className=''>
            {/*TITLE*/}
            <div className='flex justify-between items-center'>
                <h1 className='flex justify-between font-bold items-center text-2xl'>Colaboradores</h1>
                <Image src="/moreDark.png" alt="" width={20} height={20}/>
            </div>
            {/*CHART*/}
            <div className="w-full h-60%">
                <div className="w-full h-full">
                    <ResponsiveContainer>
                    <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={data}>
                        <RadialBar
                            label={{ position: 'insideStart', fill: '#fff' }}
                            background
                            dataKey="uv"
                        />
                        <Legend iconSize={10} layout="vertical" verticalAlign="middle" />
                    </RadialBarChart>
                </ResponsiveContainer>
            </div>
            </div>
            {/*BOTTOM*/}
            <div className="flex justify-center items-center gap-16">
                <div className="flex flex-col items-center text-primary">
                    <div className="w-5 h-5 bg-primary rounded-full"/>
                    <h1 className='font-semibold'>1,234</h1>
                    <h2 className='text-xs text-gray-600'>Instructoras</h2>
                </div>
                <div className="flex flex-col items-center text-secondary">
                    <div className="w-5 h-5 bg-secondary rounded-full"/>
                    <h1 className='font-semibold'>1,234</h1>
                    <h2 className='text-xs text-gray-600'>Facilitadoras</h2>
                </div>
                <div className="flex flex-col items-center text-accent">
                    <div className="w-5 h-5 bg-accent rounded-full"/>
                    <h1 className='font-semibold'>1,234</h1>
                    <h2 className='text-xs text-gray-600'>Staff</h2>
                </div>
            </div>
        </div>
    )
}

export default CountChart
