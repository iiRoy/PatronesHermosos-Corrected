import Link from "next/link";
import Image from "next/image";
import Menu from "@/components/headers_menu_users/Menu";
import User from "@/components/headers_menu_users/User";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
            <div className="h-screen flex text-text">
                {/*LEFT*/}
                <div className="w-[9%] md:w-[8%] lg:w-[17%] xl:w-[15%] overflow-y-auto overflow-x-hidden min-w-[8vh] max-h-screen flex flex-col justify-between bg-[#2E1C31]">
                    <div className="mt-6 p-1 lg:p-0 lg:mt-10 flex items-center justify-center">
                        <Link href="/" className="flex items-center justify-center min-w-[30px] min-h-[30px] mb-4">
                            <Image src="/logo.png" alt="logo" width={110} height={110} />
                        </Link>
                    </div>
                    <Menu />
                    <User />
                </div>
                {/*RIGHT*/}
                <div className="w-[91%] md:w-[92%] lg:w-[83%] xl:w-[85%] bg-[#F5F5F5] overflow-y-auto bg-back">
                    {children}
                </div>
            </div>
    );
}