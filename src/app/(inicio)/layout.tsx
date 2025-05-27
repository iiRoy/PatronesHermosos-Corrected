'use client';

import React, { useState, useEffect } from 'react';

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='h-screen flex text-text bg-back'>
            {/* RIGHT: Main content */}
            <div className='w-[100%] relative min-h-screen overflow-x-hidden overflow-y-hidden custom-scrollbar'>
                {/* Círculos decorativos inferior derecha */}
                <div className='absolute z-20 bottom-0 right-0'>
                    <div className='absolute bottom-0 right-[6vw] w-[8vw] h-[8vw] bg-[#C57FAB] rounded-full transform -mb-16 translate-x-1/4 shadow-custom-dark'></div>
                    <div className='absolute bottom-0 right-[-1vw] w-[10vw] h-[10vw] bg-[#97639C] rounded-full transform translate-x-1/4 -translate-y-1/2  shadow-custom-dark'></div>
                    <div className='absolute bottom-0 right-[1vw] w-[9vw] h-[9vw] bg-[#2E1C31] rounded-full transform translate-x-1/2 -translate-y-10px shadow-custom-dark -mb-8'></div>
                    <div className='absolute bottom-[2vw] right-[7vw] w-[4vw] h-[4vw] bg-[#EBE6EB] rounded-full shadow-custom-dark'></div>
                    <div className='absolute bottom-[8vw] right-[6vw] w-[2.5vw] h-[2.5vw] bg-[#EBE6EB] rounded-full shadow-custom-dark'></div>
                </div>
                {/* Contenido principal */}
                <div className='relative overflow-x-hidden z-0'>{children}</div>
            </div>
        </div>
    );
}