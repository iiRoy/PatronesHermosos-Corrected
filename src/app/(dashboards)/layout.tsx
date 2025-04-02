import Link from "next/link";
import Image from "next/image";
import Menu from "@/components/Menu";
import Navbar from "@/components/navbar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
            <div className="h-screen flex">
                {/*LEFT*/}
                <div className="w-[9%] md:w-[8%] lg:w-[17%] xl:w-[15%] overflow-y-auto min-w-[8vh] max-h-screen">
                    <div className="mt-6 p-1 lg:p-0 lg:mt-10 flex items-center justify-center">
                        <Link href="/" className="flex items-center justify-center min-w-[30px] min-h-[30px] mb-4">
                            <Image src="/logo.png" alt="logo" width={110} height={110} />
                        </Link>
                    </div>
                    <Menu />
                </div>
                {/*RIGHT*/}
                <div className="w-[91%] md:w-[92%] lg:w-[83%] xl:w-[85%] bg-[#F5F5F5] overflow-y-auto">
                    < Navbar/>
                    {children}
                </div>
            </div>
    );
}