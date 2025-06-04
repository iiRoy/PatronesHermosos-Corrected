'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@components/headers_menu_users/navbar';

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='min-h-screen flex flex-col text-text bg-back'>

            <Navbar />
            {/* RIGHT: Main content */}
            <div className='w-[100%] relative overflow-x-hidden custom-scrollbar'>

                {/* Círculos decorativos */}
                <div className='sticky z-20 overflow-x-clip'>
                    <div className='absolute top-0 right-[6vw] w-[8vw] h-[8vw] bg-[#C57FAB] rounded-full transform -translate-y-2/3 shadow-custom-dark'></div>
                    <div className='absolute top-[4vw] right-[-1vw] w-[10vw] h-[10vw] bg-[#97639C] rounded-full transform translate-x-1/3 -translate-y-1/4 shadow-custom-dark'></div>
                    <div className='absolute top-0 right-[1vw] w-[9vw] h-[9vw] bg-[#2E1C31] rounded-full transform translate-x-1/4 -translate-y-2/4 shadow-custom-dark'></div>
                    <div className='absolute top-[4vw] right-[4vw] w-[4vw] h-[4vw] bg-[#EBE6EB] rounded-full shadow-custom-dark'></div>
                    <div className='absolute top-[3vw] right-[8vw] w-[2.5vw] h-[2.5vw] bg-[#EBE6EB] rounded-full shadow-custom-dark'></div>
                </div>
                {/* Contenido principal */}
                <div className='relative overflow-x-hidden'>{children}</div>
            </div>
        </div>
    );
}
