'use client';
import Image from 'next/image';
import {
    RadialBarChart,
    RadialBar,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const data = [
    {
        name: 'Total',
        count: 530,
        fill: 'white',
    },
    {
        name: 'Instructoras',
        count: 80,
        fill: '#97639c',
    },
    {
        name: 'Facilitadoras',
        count: 110,
        pv: 4567,
        fill: '#683756',
    },
    {
        name: 'Staff',
        count: 340,
        fill: '#B77690',
    },
];

const CountChart = () => {
    return (
        <div className='bg-white rounded-xl w-full h-full p-4'>
            {/*TITLE*/}
            <div className='flex justify-between items-center'>
                <h1 className='flex justify-between font-bold items-center text-2xl'>
                    Colaboradores
                </h1>
                <Image src='/moreDark.png' alt='' width={20} height={20} />
            </div>
            {/*CHART*/}
            <div className='relative w-full h-[75%]'>
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
                            background
                            dataKey='count'
                            cornerRadius={10}
                        />
                    </RadialBarChart>
                </ResponsiveContainer>
                <Image
                    src='/logo.png'
                    alt=''
                    width={50}
                    height={50}
                    className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                />
            </div>
            {/*BOTTOM*/}
            <div className='flex justify-center items-center gap-16'>
                <div className='flex flex-col items-center text-primary'>
                    <div className='w-5 h-5 bg-primary rounded-full' />
                    <h1 className='font-semibold'>80</h1>
                    <h2 className='text-xs text-gray-600'>Instructoras</h2>
                </div>
                <div className='flex flex-col items-center text-secondary'>
                    <div className='w-5 h-5 bg-secondary rounded-full' />
                    <h1 className='font-semibold'>110</h1>
                    <h2 className='text-xs text-gray-600'>Facilitadoras</h2>
                </div>
                <div className='flex flex-col items-center text-accent'>
                    <div className='w-5 h-5 bg-accent rounded-full' />
                    <h1 className='font-semibold'>340</h1>
                    <h2 className='text-xs text-gray-600'>Staff</h2>
                </div>
            </div>
        </div>
    );
};

export default CountChart;
