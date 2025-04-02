import Image from "next/image"
import Link from "next/link";

const navItems = [
    {
        title: "NAVIGATION",
        items: [
            {
                icon: "/home.png",
                label: "Postúlate",
                href: "/",
                type: "link",
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: "/teacher.png",
                label: "Conócenos",
                href: "/list/teachers",
                type: "link",
                visible: ["admin", "teacher"],
            },
            {
                icon: "/student.png",
                label: "Iniciar Sesión",
                href: "/list/students",
                type: "button",
                visible: ["admin", "teacher"],
            },
        ],
    },
];

const Navbar = () => {
    return (
        <div className='flex item-center justify-between p-4 bg-[#2E1C31] shadow-md rounded-lg h-[10%] w-full'>
            {/*LOGO*/}
            <div className="hidden md:block flex items-center justify-center">
                <Image src="/logo.png" alt="logo" width={60} height={60} className="center" />
            </div>
            {/*NAVIGATION*/}
            <div className="">
                {navItems.map(i => (
                    <div key={i.title} className="mb-4 flex flex gap-2 items-center justify-center">
                        {i.items.map(item => (
                            item.type === "link" ? (
                                <Link href={item.href} key={item.label} className="flex items-center justify-center gap-2 p-2 rounded-md hover:bg-gray-200 transition duration-200 ease-in-out">
                                    <Image src={item.icon} alt="" width={20} height={20} className="center" />
                                    <span className="hidden lg:block">{item.label}</span>
                                </Link>
                            ) : (
                                <button key={item.label} className="flex items-center justify-center gap-2 p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition duration-200 ease-in-out">
                                    <Image src={item.icon} alt="" width={20} height={20} className="center" />
                                    <span className="hidden lg:block">{item.label}</span>
                                </button>
                            )
                        ))}
                    </div>))}

            </div>
        </div>
    )
}

export default Navbar