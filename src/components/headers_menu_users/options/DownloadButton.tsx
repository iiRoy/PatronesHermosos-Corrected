import React from 'react';

interface DownloadButtonProps {
  onDownload: () => void;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ onDownload }) => {
  return (
    <button
      onClick={onDownload}
      className='w-full bg-[var(--success)] text-white py-1 rounded hover:bg-[var(--success-dark)] mb-3'
    >
      Descargar
    </button>
  );
};

export default DownloadButton;
