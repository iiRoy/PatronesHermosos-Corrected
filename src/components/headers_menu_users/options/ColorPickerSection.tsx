import React, { useState, useRef, useEffect } from 'react';

interface ColorPickerSectionProps {
  colors: string[];
  setColors: (colors: string[]) => void;
  defaultColors: string[];
  notify: (params: any) => void;
  elementLabels: string[];
  onIsCustomizingChange: (val: boolean) => void;
  restoreDefaultColors: () => void;
  resetModeSignal?: number;
}

const ColorPickerSection: React.FC<ColorPickerSectionProps> = ({
  colors,
  setColors,
  defaultColors,
  notify,
  elementLabels,
  onIsCustomizingChange,
  resetModeSignal,
}) => {
  const [mode, setMode] = useState<'main' | 'select' | 'edit'>('main');
  const [transitioning, setTransitioning] = useState(false);
  const [displayedMode, setDisplayedMode] = useState<typeof mode>('main');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [tempColor, setTempColor] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const lastClickTimeRef = useRef<number>(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);

  const measureHeight = () => {
    if (wrapperRef.current) {
      const next = wrapperRef.current.querySelector('[data-active="true"]') as HTMLDivElement;
      if (next) {
        const newHeight = next.offsetHeight;
        const clamped = Math.max(36, Math.min(newHeight, 176)); // min 9, max 44
        setHeight(clamped);
      }
    }
  };

  useEffect(() => {
    measureHeight();
  }, [displayedMode, selectedIndex]);

useEffect(() => {
  if (mode === 'edit') {
    setTransitioning(true);
    enterMode('select');
    onIsCustomizingChange(false);
    setTransitioning(false);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [resetModeSignal]);


  const enterMode = (next: typeof mode) => {
    if (next === mode) return;
    setTransitioning(true);
    setTimeout(() => {
      setDisplayedMode(next);
      setMode(next);
      onIsCustomizingChange(next !== 'main');
      setTimeout(() => setTransitioning(false), 250);
    }, 150);
  };

  const handleAccept = () => {
    if (selectedIndex === null) return;
    const updated = [...colors];
    updated[selectedIndex] = tempColor;
    setColors(updated);
    notify({
      variant: 'two',
      title: 'Color actualizado',
      message: `Elemento "${elementLabels[selectedIndex]}" actualizado`,
      color: 'purple',
      iconName: 'CheckFat',
    });
  };

  const handleRestore = () => {
    if (selectedIndex === null) return;
    const updated = [...colors];
    updated[selectedIndex] = defaultColors[selectedIndex];
    setColors(updated);
    notify({
      variant: 'two',
      title: 'Color restaurado',
      message: `Elemento "${elementLabels[selectedIndex]}" restaurado`,
      color: 'green',
      iconName: 'CheckCircle',
    });
  };

  const handleRestoreAll = () => {
    setColors([...defaultColors]);
    notify({
      variant: 'two',
      title: 'Colores restaurados',
      message: 'Todos los colores fueron restaurados',
      color: 'green',
      iconName: 'CheckCircle',
    });
  };

  const handleEditColor = (index: number) => {
    setSelectedIndex(index);
    setTempColor(colors[index]);
    enterMode('edit');
  };

  return (
    <div
      className="transition-all duration-300 overflow-clip"
      style={{
        height,
        minHeight: 36, // 9 * 4
        maxHeight: 176, // 44 * 4
      }}
    >
      <div ref={wrapperRef}>
        {/* MAIN */}
        <div
          data-active={displayedMode === 'main'}
          className={`transition-all duration-300 ease-in-out ${
            displayedMode === 'main'
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-3 absolute pointer-events-none'
          }`}
        >
          <button
            onClick={() => enterMode('select')}
            className="w-full bg-[var(--primaryColor)] hover:bg-[var(--primary-shade)] text-white text-sm py-1 rounded-md"
          >
            Editar colores
          </button>
        </div>

        {/* SELECT */}
        <div
          data-active={displayedMode === 'select'}
          className={`transition-all duration-300 ease-in-out ${
            displayedMode === 'select'
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-3 absolute pointer-events-none'
          }`}
        >
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-700 font-medium">Selecciona un elemento:</span>
            <button
              onClick={handleRestoreAll}
              className="text-xs text-[var(--error)] underline hover:text-[var(--error-dark)]"
            >
              Restaurar todos
            </button>
          </div>
          <ul className="flex flex-col gap-1 overflow-y-auto max-h-[100px] pr-1">
            {elementLabels.map((label, i) => (
              <li
                key={i}
                className="flex justify-between items-center px-2 py-1 rounded hover:bg-gray-100 cursor-pointer"
                onClick={() => handleEditColor(i)}
              >
                <span className="text-sm" style={{ color: colors[i] }}>{label}</span>
                <div
                  className="w-5 h-5 rounded-full border shadow"
                  style={{ backgroundColor: colors[i] }}
                />
              </li>
            ))}
          </ul>
          <button
            onClick={() => enterMode('main')}
            className="text-xs text-[var(--primaryColor)] hover:text-[var(--primary-shade)] hover:underline mb-2 text-left"
          >
            ← Volver
          </button>
        </div>

        {/* EDIT */}
        {selectedIndex !== null && (
          <div
            data-active={displayedMode === 'edit'}
            className={`transition-all duration-300 ease-in-out ${
              displayedMode === 'edit'
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-3 pointer-events-none'
            }`}
          >
            <span className="text-sm text-gray-700 font-medium block mb-2">
              Personalizando: <strong>{elementLabels[selectedIndex]}</strong>
            </span>

            <input
              ref={inputRef}
              type="color"
              value={tempColor}
              onChange={(e) => setTempColor(e.target.value)}
              className="hidden"
            />

            <button
              onClick={() => {
                const now = Date.now();
                if (now - lastClickTimeRef.current < 300) return;
                lastClickTimeRef.current = now;
                inputRef.current?.click();
              }}
              className="w-full h-12 border rounded cursor-pointer flex items-center justify-center mb-2"
              style={{ backgroundColor: tempColor }}
            >
              <span className="text-sm text-white drop-shadow-sm">Seleccionar color</span>
            </button>

            <div className="flex gap-2 mb-2">
              <button
                onClick={handleAccept}
                className="flex-1 bg-[var(--success)] text-white py-1 rounded hover:bg-[var(--success-dark)] text-sm"
              >
                Aceptar
              </button>
              <button
                onClick={handleRestore}
                className="flex-1 bg-[var(--error)] hover:bg-[var(--error-dark)] text-white py-1 rounded text-sm"
              >
                Restaurar
              </button>
            </div>

            <button
              onClick={() => enterMode('select')}
              className="text-xs text-[var(--primaryColor)] hover:text-[var(--primary-shade)] hover:underline mb-2 text-left"
            >
              ← Volver
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorPickerSection;
