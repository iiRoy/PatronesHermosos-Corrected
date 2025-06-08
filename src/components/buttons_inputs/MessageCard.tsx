// components/ui/MessageCard.tsx
import React from 'react';
import Button from '@/components/buttons_inputs/Button';
import Checkbox from '@/components/buttons_inputs/Checkbox';
import withIconDecorator from '../decorators/IconDecorator';
import * as Icons from '../icons';

type Variant = 'primary' | 'secondary' | 'success' | 'error' | 'warning';

interface MessageCardProps {
  color: 'purple' | 'green' | 'red' | 'yellow';
  icon: keyof typeof Icons;
  // Ahora pueden ser ReactNode para meter formularios dentro
  title: React.ReactNode;
  description: React.ReactNode;
  checkboxLabel?: string;
  checkboxChecked: boolean;
  onCheckboxChange: (checked: boolean) => void;

  // Mostrar botones
  showAccept?: boolean;
  showDecline?: boolean;

  // Configuración para cada botón
  acceptVariant?: Variant;
  acceptLabel?: string;
  onAccept?: () => void;

  declineVariant?: Variant;
  declineLabel?: string;
  onDecline?: () => void;

  showToggle?: boolean;
  toggleLabel?: string;
  onToggle?: () => void;
}

export const MessageCard: React.FC<MessageCardProps> = ({
  color,
  icon,
  title,
  description,
  checkboxLabel,
  checkboxChecked,
  onCheckboxChange,

  showAccept = false,
  showDecline = false,

  acceptVariant = 'success',
  acceptLabel = 'Enviar',
  onAccept,

  declineVariant = 'error',
  declineLabel = 'Cancelar',
  onDecline,

  showToggle = false,
  toggleLabel = 'Destinatarios',
  onToggle,
}) => {
  const IconComponent: React.ComponentType<any> | null =
    icon && Icons[icon] ? withIconDecorator(Icons[icon]) : null;
  return (
    <div className={`message-card border-${color}`}>
      <div className='icon-title'>
        <div className={`message-icon icon-${color}`}>
          {IconComponent && (
            <IconComponent
              width={35}
              height={35}
              strokeWidth={0.7}
              strokeColor={'var(--primaryColor)'}
              fillColor={'var(--text-color)'}
            />
          )}
        </div>
        <div className={`title title-${color}`}>{title}</div>
      </div>

      <div className='description'>{description}</div>

      {checkboxLabel && (
        <div className='checkbox-row'>
          <Checkbox label={checkboxLabel} checked={checkboxChecked} onChange={onCheckboxChange} />
        </div>
      )}
      <div className='button-row'>
        {showToggle && <Button variant='secondary' label={toggleLabel} onClick={onToggle} />}
        {showAccept && <Button variant={acceptVariant} label={acceptLabel} onClick={onAccept} />}
        {showDecline && (
          <Button variant={declineVariant} label={declineLabel} onClick={onDecline} />
        )}
      </div>
    </div>
  );
};

export default MessageCard;
