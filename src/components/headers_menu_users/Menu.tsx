import Image from "next/image";
import OptionLink from "../buttons_inputs/OptionLink";

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
        href: "/admin",
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
    <div className="text-sm flex flex-col justify-center mr-4 ml-4">
      {menuItems.map((section) => (
        <div key={section.title} className="mb-4 flex flex-col gap-7">
          {section.items.map((item) => (
            <OptionLink
              key={item.label}
              label={item.label}
              icon={item.icon}
              href={item.href}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
