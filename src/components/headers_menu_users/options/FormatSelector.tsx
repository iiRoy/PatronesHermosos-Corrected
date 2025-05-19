import React from 'react';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

interface FormatSelectorProps {
  format: 'png' | 'jpg' | 'pdf';
  setFormat: (f: 'png' | 'jpg' | 'pdf') => void;
}

const FormatSelector: React.FC<FormatSelectorProps> = ({ format, setFormat }) => {
  return (
    <div className="mb-4" onMouseDown={(e) => e.stopPropagation()}>
      <label className="block mb-1 text-sm font-semibold text-gray-700">
        Formato de descarga:
      </label>
      <Select
        value={format}
        onValueChange={(v) => setFormat(v as 'png' | 'jpg' | 'pdf')}
      >
        <SelectTrigger className="w-full text-md rounded-lg bg-[#f3eaf1] text-[#822f87] font-semibold shadow-sm hover:bg-[#e7d7e4] transition-colors">
          <SelectValue placeholder="Selecciona un formato" />
        </SelectTrigger>
        <SelectContent
          className="bg-[#f4edf4] text-[#822f87] border border-purple-300 rounded-md shadow-md animate-fadeIn transition-all duration-200 ease-in-out"
        >
          <SelectItem
            value="png"
            className="hover:bg-[#e5d4e9] focus:bg-[#d7bfd8] focus:text-white px-3 py-2 font-medium rounded-md cursor-pointer transition-all duration-150"
          >
            PNG
          </SelectItem>
          <SelectItem
            value="jpg"
            className="hover:bg-[#e5d4e9] focus:bg-[#d7bfd8] focus:text-white px-3 py-2 font-medium rounded-md cursor-pointer transition-all duration-150"
          >
            JPG
          </SelectItem>
          <SelectItem
            value="pdf"
            className="hover:bg-[#e5d4e9] focus:bg-[#d7bfd8] focus:text-white px-3 py-2 font-medium rounded-md cursor-pointer transition-all duration-150"
          >
            PDF
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FormatSelector;