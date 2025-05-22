import React from 'react';

interface MaxItemsInputProps {
  value: number | undefined;
  totalItems: number;
  onChange: (val: number | undefined) => void;
}

const MaxItemsInput: React.FC<MaxItemsInputProps> = ({ value, totalItems, onChange }) => {
  const handleChange = (val: string) => {
    const num = parseInt(val);
    if (!val || num < 1) {
      onChange(undefined);
    } else {
      onChange(num);
    }
  };

  return (
    <div className="mb-4">
      <label className="block mb-1 text-sm font-semibold text-gray-700">
        Máximo seleccionables:
      </label>
      <input
        type="number"
        min={0}
        max={totalItems}
        value={value && value > 0 ? value : ''}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Sin Límites"
        className="w-full rounded-lg bg-[#f3eaf1] text-[#822f87] font-semibold shadow-sm px-3 py-2 border border-purple-300 placeholder-[#b085b3] focus:outline-none focus:ring-2 focus:ring-[#c69cd3] transition-all"
      />
    </div>
  );
};

export default MaxItemsInput;