import React from 'react';

interface MinimizeButtonProps {
  onMinimize: () => void;
}

const MinimizeButton: React.FC<MinimizeButtonProps> = ({ onMinimize }) => {
  return (
    <button
      onClick={onMinimize}
      className='w-full bg-[var(--warning)] text-white py-1 rounded hover:bg-[var(--warning-dark)]'
    >
      Minimizar sección
    </button>
  );
};

export default MinimizeButton;
