import React from 'react';
import { Switch } from '@/components/ui/switch';

interface TableToggleProps {
  includeTable: boolean;
  setIncludeTable: (v: boolean) => void;
}

const TableToggle: React.FC<TableToggleProps> = ({ includeTable, setIncludeTable }) => {
  return (
    <div className='mb-4 flex items-center gap-2'>
      <Switch checked={includeTable} onCheckedChange={setIncludeTable} id='switch-table-summary' />
      <label htmlFor='switch-table-summary' className='text-sm cursor-pointer select-none'>
        Incluir tabla resumen de datos
      </label>
    </div>
  );
};

export default TableToggle;
