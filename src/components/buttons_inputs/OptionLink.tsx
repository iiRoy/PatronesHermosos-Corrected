'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface OptionLinkProps {
  label: string;
  Icon: React.FC<{ width?: number; height?: number; color?: string }>;
  href: string;
}

const OptionLink: React.FC<OptionLinkProps> = ({ label, Icon, href }) => {
  const pathname = usePathname();

  // Cambiar el color del icono si la ruta coincide
  const iconColor = pathname === href ? 'var(--accent)' : '#EBE6EB';

  return (
    <Link
      href={href}
      className={`
        option-link ${pathname === href ? 'active' : ''}
        flex justify-center items-center gap-2 items-center
      `}
    >
      <div className="
        md:min-w-[2vw] md:min-h-[2vw]
        min-w-[3vmax] min-h-[3vmax]
        flex items-center justify-center
      ">
        <Icon width={25} height={25} color={iconColor} />
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
