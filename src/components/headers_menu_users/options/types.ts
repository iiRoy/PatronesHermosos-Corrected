export interface OptionsMenuProps {
  onMinimize: () => void;
  onMaxItemsChange: (value: number | undefined) => void;
  onToggleVisibility: () => void;
  maxItemsSelected: number | undefined;
  visible: boolean;
  setVisible: (v: boolean) => void;
  chartRef: React.RefObject<HTMLDivElement>;
  totalItems: number;
  defaultColors: string[];
  restoreDefaultColors: () => void;
  filteredData: any[];
  xKey: string;
  seriesKeys: string[];
  title: string;
  colors: string[];
  setColors: (colors: string[]) => void;
  elementLabels: string[];
}
