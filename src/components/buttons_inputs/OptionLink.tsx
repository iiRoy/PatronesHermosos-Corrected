"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface OptionLinkProps {
    label: string;
    icon: string;
    href: string;
}

const OptionLink: React.FC<OptionLinkProps> = ({ label, icon, href }) => {
    const pathname = usePathname(); // Obtiene la ruta actual

    return (
        <Link href={href} className={`option-link ${pathname === href ? "active" : ""}`}>
            <Image src={icon} alt={label} width={25} height={25} className="option-icon" />
            <span className="option-label hidden lg:block text-start max-w-[70px]">{label}</span>
        </Link>
    );
};

export default OptionLink;
