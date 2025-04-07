'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface OptionLinkProps {
  label: string;
  icon: string;
  href: string;
}

const OptionLink: React.FC<OptionLinkProps> = ({ label, icon, href }) => {
  const pathname = usePathname();

  return (
<Link
  href={href}
  className={`
    option-link ${pathname === href ? 'active' : ''}
    inline-flex justify-center items-center gap-2 items-center
  `}
>
  <Image
    src={icon}
    alt={label}
    width={25}
    height={25}
    className="
      md:min-w-[2vw] md:min-h-[2vw]
      min-w-[3vmax] min-h-[3vmax]
    "
  />
  <span
    className="
      option-label
      hidden
      lg:inline-flex
      text-center
    "
  >
    {label}
  </span>
</Link>
  );
};

export default OptionLink;
