import Link from 'next/link';
import Image from 'next/image';
import Menu from '@/components/headers_menu_users/Menu';
import User from '@/components/headers_menu_users/User';

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='h-screen flex text-text bg-back'>
            {/* LEFT */}
            <div className='w-[9%] md:w-[8%] lg:w-[17%] xl:w-[15%] overflow-x-hidden min-w-[8vh] max-h-screen flex flex-col justify-between bg-[#2E1C31] rounded-tr-[10px] rounded-br-[10px] scrollbar-hide'>
                <div className='mt-6 p-1 lg:p-0 lg:mt-10 flex items-center justify-center'>
                    <Link
                        href='/'
                        className='flex items-center justify-center min-w-[30px] min-h-[30px] mb-4'
                    >
                        <Image
                            src='/logo.png'
                            alt='logo'
                            width={110}
                            height={110}
                        />
                    </Link>
                </div>
                <Menu />
                <User />
            </div>
            {/* RIGHT */}
            <div className='w-[91%] md:w-[92%] lg:w-[83%] xl:w-[85%] relative overflow-x-hidden'>
                <div className=' sticky z-20 overflow-x-clip'>
                    {/* Círculos en la esquina superior derecha */}
                    <div className='absolute top-0 right-[6vmax] w-[8vmax] h-[8vmax] bg-[#C57FAB] rounded-full transform -translate-y-2/3 shadow-custom-dark'></div>
                    <div className='absolute top-[4vmax] right-[-1vmax] w-[10vmax] h-[10vmax] bg-[#97639C] rounded-full transform translate-x-1/3 -translate-y-1/4 shadow-custom-dark'></div>
                    <div className='absolute top-0 right-[1vmax] w-[9vmax] h-[9vmax] bg-[#2E1C31] rounded-full transform translate-x-1/4 -translate-y-2/4 shadow-custom-dark'></div>
                    <div className='absolute top-[4vmax] right-[7vmax] w-[4vmax] h-[4vmax] bg-[#EBE6EB] rounded-full shadow-custom-dark'></div>
                    <div className='absolute top-[3vmax] right-[12vmax] w-[2.5vmax] h-[2.5vmax] bg-[#EBE6EB] rounded-full shadow-custom-dark'></div>
                </div>
                <div className='relative overflow-y-auto overflow-x-hidden z-0'>
                    {children}
                </div>
            </div>
        </div>
    );
}
