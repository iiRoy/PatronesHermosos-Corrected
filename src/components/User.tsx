import Image from 'next/image';
import Link from 'next/link';

const User = () => {
    return (
            <div className='flex flex-col w-full'>
                <div className="mt-6 p-1 flex items-center lg:ml-2 justify-center lg:justify-start pb-0">
                    <Link href={"/"} className="flex items-center justify-center gap-2 p-2 ">
                        <Image src={"/profile.png"} alt="user" width={25} height={25} className="min-w-[17px] min-h-[17px]" />
                        <div className='flex flex-col text-left hidden lg:block'>
                            <span className="text-sm leading-5">Usuario</span>
                            <span className='text-[10px] font-medium text-gray-500 hidden lg:block'>@Usuario</span>
                        </div>
                    </Link>
                </div>
                <div className="flex flex-col lg:flex-row items-center lg:items-end justify-center lg:justify-end mb-5 p-1 pt-0">
                    <Link href={"/"} className="flex items-center justify-center p-2">
                        <Image src={"/message.png"} alt="Notifications" width={25} height={25} className="lg:max-w-[20px] lg:max-h-[20px] min-w-[17px] min-h-[17px]" />
                    </Link>
                    <Link href={"/"} className="flex items-center justify-center p-2">
                        <Image src={"/exam.png"} alt="Example1" width={25} height={25} className="lg:max-w-[20px] lg:max-h-[20px] min-w-[17px] min-h-[17px]" />
                    </Link>
                    <Link href={"/"} className="flex items-center justify-center p-2">
                        <Image src={"/home.png"} alt="Home" width={25} height={25} className="lg:max-w-[20px] lg:max-h-[20px] min-w-[17px] min-h-[17px]" />
                    </Link>
                </div>
            </div>
    )
}

export default User