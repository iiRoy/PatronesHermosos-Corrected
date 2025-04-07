'use client';


import UserCard from "@/components/headers_menu_users/UserCard"
import Navbar from "@/components/headers_menu_users/navbar";
import Pagination from "@/components/buttons_inputs/Pagination";
import InputField from "@/components/buttons_inputs/InputField";
import Notification from "@/components/buttons_inputs/Notification";
import Button from "@/components/buttons_inputs/Button";
import Checkbox from "@/components/buttons_inputs/Checkbox";
import MessageCard from "@/components/buttons_inputs/MessageCard";

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
                <Notification
                    color="green"
                    variant="one"
                    title="¡Éxito!"
                    message="Tu acción se completó correctamente."
                />
                <Notification
                    color="purple"
                    variant="one"
                    title="Notificación"
                    message="Has recibido una notificación"
                />
                <Notification
                    color="red"
                    variant="two"
                    title="Error"
                    message="Hubo un problema al guardar los datos."
                />
                <Notification
                    color="yellow"
                    variant="two"
                    title="Advertencia"
                    message="Uno de los datos introducidos es incorrecto"
                />
                <Button
                    label="Perfil"
                    variant="secondary"
                    showLeftIcon
                    leftIconPath="/student.png"
                    showRightIcon
                    rightIconPath="/close.png"
                />
                <Button
                    label="Add"
                    variant="primary"
                    round
                    showLeftIcon
                    leftIconPath="/plus.png"
                />
                <Button
                    label="Enviar"
                    variant="success"
                />

                <Checkbox
                    label="Label"
                    color="white"
                    checked={true}
                    bordered={false}
                    onChange={(val) => console.log('New state:', val)}
                />

                <Checkbox
                    label="Label"
                    color="purple"
                    checked={true}
                    bordered={false}
                    onChange={(val) => console.log('New state:', val)}
                />

                <Checkbox
                    label="Label"
                    color="green"
                    checked={false}
                    onChange={(val) => console.log('New state:', val)}
                />

                <Checkbox
                    label="Label"
                    color="yellow"
                    checked={false}
                    bordered={true}
                    onChange={(val) => console.log('New state:', val)}
                />

                <Checkbox
                    label="Label"
                    color="red"
                    checked={true}
                    bordered={false}
                    onChange={(val) => console.log('New state:', val)}
                />

                <MessageCard
                    color="purple"
                    icon={<img src="/student.png" alt="icon" />}
                    title="Label"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vulputate orci sit amet nulla consequat, ac iaculis magna auctor. Nullam quis eros fermentum, condimentum neque ac, aliquet augue. Cras non bibendum eros. Maecenas non neque quam. Nam a elit a quam interdum suscipit et in lacus. Integer vitae luctus erat."
                    checkboxLabel="Acepto los términos"
                    checkboxChecked={true}
                    onCheckboxChange={(val) => console.log('New state:', val)}

                    showAccept
                    acceptVariant="success"
                    acceptLabel="¡Sí!"
                    acceptIcon="/plus.png"
                    onAccept={() => console.log("Aceptado")}

                    showDoubt
                    doubtVariant="warning"
                    doubtLabel="No se"
                    doubtIcon="/edit.png"
                    onDoubt={() => console.log("Prolongado")}

                    showDecline
                    declineVariant="error"
                    declineLabel="No gracias"
                    declineIcon="/close.png"
                    onDecline={() => console.log("Declinado")}
                />

                <MessageCard
                    color="green"
                    icon={<img src="/student.png" alt="icon" />}
                    title="Label"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vulputate orci sit amet nulla consequat, ac iaculis magna auctor. Nullam quis eros fermentum, condimentum neque ac, aliquet augue. Cras non bibendum eros. Maecenas non neque quam. Nam a elit a quam interdum suscipit et in lacus. Integer vitae luctus erat."
                    checkboxLabel="Acepto los términos"
                    checkboxChecked={true}
                    onCheckboxChange={(val) => console.log('New state:', val)}

                    showAccept
                    acceptVariant="success"
                    acceptLabel="¡Sí!"
                    acceptIcon="/plus.png"
                    onAccept={() => console.log("Aceptado")}

                    showDoubt
                    doubtVariant="warning"
                    doubtLabel="No se"
                    doubtIcon="/edit.png"
                    onDoubt={() => console.log("Prolongado")}

                    showDecline
                    declineVariant="error"
                    declineLabel="No gracias"
                    declineIcon="/close.png"
                    onDecline={() => console.log("Declinado")}
                />

                <MessageCard
                    color="yellow"
                    icon={<img src="/student.png" alt="icon" />}
                    title="Label"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vulputate orci sit amet nulla consequat, ac iaculis magna auctor. Nullam quis eros fermentum, condimentum neque ac, aliquet augue. Cras non bibendum eros. Maecenas non neque quam. Nam a elit a quam interdum suscipit et in lacus. Integer vitae luctus erat."
                    checkboxLabel="Acepto los términos"
                    checkboxChecked={true}
                    onCheckboxChange={(val) => console.log('New state:', val)}

                    showAccept
                    acceptVariant="success"
                    acceptLabel="¡Sí!"
                    acceptIcon="/plus.png"
                    onAccept={() => console.log("Aceptado")}

                    showDecline
                    declineVariant="error"
                    declineLabel="No gracias"
                    declineIcon="/close.png"
                    onDecline={() => console.log("Declinado")}
                />

                <MessageCard
                    color="red"
                    icon={<img src="/student.png" alt="icon" />}
                    title="Label"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vulputate orci sit amet nulla consequat, ac iaculis magna auctor. Nullam quis eros fermentum, condimentum neque ac, aliquet augue. Cras non bibendum eros. Maecenas non neque quam. Nam a elit a quam interdum suscipit et in lacus. Integer vitae luctus erat."
                    checkboxLabel="Acepto los términos"
                    checkboxChecked={true}
                    onCheckboxChange={(val) => console.log('New state:', val)}

                    showDoubt
                    doubtVariant="warning"
                    doubtLabel="No se"
                    doubtIcon="/edit.png"
                    onDoubt={() => console.log("Prolongado")}

                    showDecline
                    declineVariant="error"
                    declineLabel="No gracias"
                    declineIcon="/close.png"
                    onDecline={() => console.log("Declinado")}
                />



            </div>
        </div>
    )
}

export default EstadisticasAdmin