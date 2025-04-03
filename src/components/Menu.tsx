import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/result.png",
        label: "Estadísticas",
        href: "/list/results",
        visible: ["admin", "coordinador"],
      },
      {
        icon: "/home.png",
        label: "SEDES",
        href: "/",
        visible: ["admin"],
      },
      {
        icon: "/class.png",
        label: "Mi SEDE",
        href: "/list/classes",
        visible: ["coordinador"],
      },
      {
        icon: "/teacher.png",
        label: "Gestionar Usuarios",
        href: "/list/teachers",
        visible: ["admin"],
      },
      {
        icon: "/student.png",
        label: "Solicitudes",
        href: "/list/students",
        visible: ["admin", "coordinador"],
      },
      {
        icon: "/parent.png",
        label: "Diplomas",
        href: "/list/parents",
        visible: ["admin", "coordinador"],
      },
      {
        icon: "/subject.png",
        label: "Correos",
        href: "/list/subjects",
        visible: ["admin"],
      },
    ],
  },
];

const Menu = () => {
  return (
    <div className='text-sm flex flex-col items-center justify-center'>
      {menuItems.map(i=>(
        <div key={i.title} className="mb-4 flex flex-col gap-2 items-center justify-center">
          {i.items.map(item =>(
            <Link href={item.href} key={item.label} className="flex items-center justify-center gap-2 p-2 rounded-md hover:bg-gray-200 transition duration-200 ease-in-out text-center">
              <Image src={item.icon} alt="" width={25} height={25} className="min-w-[17px] min-h-[17px] ml-1 mr-1"/>
              <span className="hidden lg:block whitespace-normal text-center max-w-[70px]">{item.label}</span>
            </Link>
          ))}
        </div>))}
    </div>
  )
}

export default Menu