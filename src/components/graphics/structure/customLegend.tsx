'use client';
import React from 'react';

interface CustomLegendProps {
  legendKeys: string[];
}

const CustomLegend: React.FC<CustomLegendProps> = ({ legendKeys }) => (
  <div className='flex items-center gap-4 flex-wrap justify-between'>
    {legendKeys.map((key, index) => (
      <div key={key} className='flex items-center gap-1'>
        <span
          className={`w-3 h-3 rounded-full ${['bg-[#97639c]', 'bg-[#C57FAB]', 'bg-[#6E2D75]', 'bg-[#683756]'][index % 4]}`}
        />
        <span className={`font-medium ${['text-[#97639c]', 'text-[#C57FAB]', 'text-[#6E2D75]', 'text-[#683756]'][index % 4]}`}>
          {key.charAt(0).toUpperCase() + key.slice(1)}
        </span>
      </div>
    ))}
  </div>
);

export default CustomLegend;
