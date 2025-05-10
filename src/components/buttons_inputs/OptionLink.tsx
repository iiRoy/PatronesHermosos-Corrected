'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import withIconDecorator from '../decorators/IconDecorator';
import { useMemo } from 'react';

interface OptionLinkProps {
  label: string;
  Icon: React.FC<{
    width?: number | string;
    height?: number | string;
    strokeColor?: string;
    fillColor?: string;
    className?: string;
  }>;
  href?: string;
  forceActive?: boolean;
}

const OptionLink: React.FC<OptionLinkProps> = ({ label, Icon, href, forceActive }) => {
  const pathname = usePathname();
  const isActive = href ? pathname === href : false;
  const isHovered = forceActive;

  const DecoratedIcon = useMemo(() => withIconDecorator(Icon), [Icon]);

  const classes = `
    option-link group
    ${isActive ? 'active' : ''} ${isHovered ? 'hovered' : ''}
    transition-colors duration-300 ease-in-out
    flex justify-center items-center gap-2
  `;

  const content = (
    <>
      <div
        className={`
          option-icon flex items-center justify-center
          transition-transform duration-300 ease-in-out
          ${isActive ? 'active scale-110' : 'scale-100'}
        `}
      >
        <DecoratedIcon
          strokeColor="#2E1C31"
          fillColor="currentColor"
          width="2rem"
          height="2rem"
          className="transition-colors duration-300 ease-in-out"
        />
      </div>
      <span className="option-label hidden lg:block">{label}</span>
    </>
  );

  return href ? (
    <Link href={href} className={classes}>
      {content}
    </Link>
  ) : (
    <span className={classes}>{content}</span>
  );
};

export default OptionLink;



{/*
  const classes = `
    option-link ${isActive ? 'active' : ''} ${isHovered ? 'hovered' : ''}
    flex justify-center items-center gap-2
  `;

  const content = (
    <>
      <div className={`option-icon transition-all ease-in-out duration-2000 ${isActive ? 'active' : ''} flex items-center justify-center`}>
        <DecoratedIcon
          strokeColor={'#2E1C31'}
          fillColor={'currentColor'}
          width={'2rem'}
          height={'2rem'}
          className={`transition-all duration-2000 ease-in-out transform ${isActive ? 'scale-110' : 'scale-100'}`}
        />
      </div>
      <span className='option-label hidden lg:block'>{label}</span>
    </>
  );

  return href ? (
    <Link href={href} className={classes}>
      {content}
    </Link>
  ) : (
    <span className={classes}>{content}</span>
  );
};
*/}