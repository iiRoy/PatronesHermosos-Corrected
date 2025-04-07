import React from "react";
import Button from "@/components/buttons_inputs/Button";
import Checkbox from "@/components/buttons_inputs/Checkbox";

type Variant = 'primary' | 'secondary' | 'success' | 'error' | 'warning';

type MessageCardProps = {
    color: "purple" | "green" | "red" | "yellow";
    icon: React.ReactNode;
    title: string;
    description: string;
    checkboxLabel?: string;
    checkboxChecked: boolean;
    onCheckboxChange: (checked: boolean) => void;

    // Mostrar botones
    showAccept?: boolean;
    showDoubt?: boolean;
    showDecline?: boolean;

    // Configuración para cada botón
    acceptVariant?: Variant;
    acceptLabel?: string;
    acceptIcon?: string;
    onAccept?: () => void;

    doubtVariant?: Variant;
    doubtLabel?: string;
    doubtIcon?: string;
    onDoubt?: () => void;

    declineVariant?: Variant;
    declineLabel?: string;
    declineIcon?: string;
    onDecline?: () => void;
};

export const MessageCard: React.FC<MessageCardProps> = ({
    color,
    icon,
    title,
    description,
    checkboxLabel,
    checkboxChecked,
    onCheckboxChange,

    showAccept = false,
    showDoubt = false,
    showDecline = false,

    acceptVariant = "success",
    acceptLabel = "Accept",
    acceptIcon = "/check.png",
    onAccept,

    doubtVariant = "warning",
    doubtLabel = "Doubt",
    doubtIcon = "/doubt.png",
    onDoubt,

    declineVariant = "error",
    declineLabel = "Decline",
    declineIcon = "/decline.png",
    onDecline,
}) => {
    return (
        <div className={`message-card border-${color}`}>
            <div className="icon-title">
                <div className={`message-icon icon-${color}`}>{icon}</div>
                <h2 className={`title title-${color}`}>{title}</h2>
            </div>
            <p className="description">{description}</p>

            {checkboxLabel && (
                <div className="checkbox-row">
                    <Checkbox
                        color={color}
                        label={checkboxLabel}
                        checked={checkboxChecked}
                        onChange={onCheckboxChange}
                    />
                </div>
            )}

            <div className="button-row">
                {showAccept && (
                    <Button
                        variant={acceptVariant}
                        showLeftIcon
                        leftIconPath={acceptIcon}
                        label={acceptLabel}
                        onClick={onAccept}
                    />
                )}
                {showDoubt && (
                    <Button
                        variant={doubtVariant}
                        showLeftIcon
                        leftIconPath={doubtIcon}
                        label={doubtLabel}
                        onClick={onDoubt}
                    />
                )}
                {showDecline && (
                    <Button
                        variant={declineVariant}
                        showLeftIcon
                        leftIconPath={declineIcon}
                        label={declineLabel}
                        onClick={onDecline}
                    />
                )}
            </div>
        </div>
    );
};

export default MessageCard;