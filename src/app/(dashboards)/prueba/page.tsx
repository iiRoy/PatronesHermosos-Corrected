'use client';


import UserCard from "@/components/headers_menu_users/UserCard"
import Navbar from "@/components/headers_menu_users/navbar";
import Pagination from "@/components/buttons_inputs/Pagination";
import InputField from "@/components/buttons_inputs/InputField";

const EstadisticasAdmin = () => {
    return (
        <div className='p-4 flex gap-4 flex-col md:flex-row'>
            <div className="w-full flex flex-col gap-8">
                {/*USER CARD*/}
                <Navbar />
                <Pagination
                    currentPage={7}
                    totalPages={11}
                    variant="accent" //"accent" o "primary", "secondary-shade"
                    onPageChange={(page) => console.log("Página cambiada:", page)}
                />
                <Pagination
                    currentPage={2}
                    totalPages={11}
                    variant="primary" //"accent" o "primary", "secondary-shade"
                    onPageChange={(page) => console.log("Página cambiada:", page)}
                />
                <Pagination
                    currentPage={9}
                    totalPages={11}
                    variant="secondary-shade" //"accent" o "primary", "secondary-shade"
                    onPageChange={(page) => console.log("Página cambiada:", page)}
                />
                <InputField
                    label="Label"
                    description="Description"
                    placeholder="Placeholder"
                    error="Error"
                    variant="warning"
                    iconSrc="/student.png"
                />
                <InputField
                    label="Sign In"
                    showDescription={false}
                    placeholder="Username"
                    showError={false}
                    variant="primary"
                    iconSrc="/student.png"
                />
                <InputField
                    label="Sign In"
                    description="This input is disabled"
                    placeholder="Username"
                    showError={false}
                    error="Error"
                    variant="primary-disabled"
                    iconSrc="/student.png"
                />
                <InputField
                    label="Sign In"
                    showDescription={false}
                    placeholder="Username"
                    error="Error: That user doesn't exist"
                    variant="warning"
                    iconSrc="/student.png"
                />
            </div>
        </div>
    )
}

export default EstadisticasAdmin