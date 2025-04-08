'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface OptionLinkProps {
  label: string;
  Icon: React.FC<{ width?: number; height?: number; strokeColor?: string; strokeWidth?: number; fillColor?: string}>;
  href: string;
}

const OptionLink: React.FC<OptionLinkProps> = ({ label, Icon, href }) => {
  const pathname = usePathname();

  // Cambiar el color del icono si la ruta coincide
  const iconColor = pathname === href ? 'var(--accent)' : '#EBE6EB';
  const iconWidth = pathname === href ? 0.2 : 1.3;

  return (
    <Link
      href={href}
      className={`
        option-link ${pathname === href ? 'active' : ''}
        flex justify-center items-center gap-2 items-center
      `}
    >
      <div className="
        option-icon md:min-w-[2vw] md:min-h-[2vw]
        min-w-[3vmax] min-h-[3vmax]
        flex items-center justify-center
      ">
        <Icon width={30} height={30} strokeColor={'#2E1C31'} fillColor={"currentColor"} strokeWidth={iconWidth} />
      </div>
      <span
        className="
          option-label
          hidden
          lg:block
        "
      >
        {label}
      </span>
    </Link>
  );
};

export default OptionLink;
