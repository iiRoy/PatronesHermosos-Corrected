'use client';

import React from 'react';
import OptionLink from '../buttons_inputs/OptionLink';
import * as Icons from '../icons';

const menuItems = [
    {
        title: 'MENU',
        items: [
            {
                icon: 'Acorn',
                label: 'Estadísticas',
                href: '/list/results',
                visible: ['admin', 'coordinador'],
            },
            {
                icon: 'Acorn',
                label: 'SEDES',
                href: '/admin',
                visible: ['admin'],
            },
            {
                icon: 'Acorn',
                label: 'Mi SEDE',
                href: '/list/classes',
                visible: ['coordinador'],
            },
            {
                icon: 'Acorn',
                label: 'Gestionar Usuarios',
                href: '/list/teachers',
                visible: ['admin'],
            },
            {
                icon: 'Acorn',
                label: 'Solicitudes',
                href: '/list/students',
                visible: ['admin', 'coordinador'],
            },
            {
                icon: 'Acorn',
                label: 'Diplomas',
                href: '/list/parents',
                visible: ['admin', 'coordinador'],
            },
            {
                icon: 'Acorn',
                label: 'Correos',
                href: '/list/subjects',
                visible: ['admin'],
            },
        ],
    },
];

const Menu: React.FC = () => {
    return (
        <div className='text-[clamp(1rem,1.5vw,3rem)]'>
            {menuItems.map((section) => (
                <div key={section.title} className="flex flex-col gap-[1.5vmax] px-2">
                    {section.items.map((item) => {
                        const IconComponent = Icons[item.icon as keyof typeof Icons];
                        return (
                            <OptionLink
                                key={item.label}
                                label={item.label}
                                Icon={IconComponent}
                                href={item.href}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default Menu;