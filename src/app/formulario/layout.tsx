'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@components/headers_menu_users/navbar';

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='h-screen flex flex-col text-text bg-back'>


            {/* RIGHT: Main content */}
            <div className='w-[100%] relative overflow-x-hidden custom-scrollbar'>
                <Navbar />
                {/* Contenido principal */}
                <div className='relative overflow-x-hidden'>{children}</div>
            </div>
        </div>
    );
}
