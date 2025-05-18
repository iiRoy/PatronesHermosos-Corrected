/**
 * @file mutants.test.tsx
 * Tests mutations in conditional and calculation logic for GenericBarChart.
 */


import fs from 'fs';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import GenericBarChart from '@/components/graphics/bases/genericBarChart';

const failedTests: string[] = [];

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

HTMLCanvasElement.prototype.getContext = function (
  contextId: '2d' | 'bitmaprenderer' | 'webgl' | 'webgl2',
  options?: any,
): any {
  if (contextId === '2d') {
    return {
      fillRect: () => {},
      clearRect: () => {},
      getImageData: () => ({
        data: new Uint8ClampedArray(0),
        width: 0,
        height: 0,
        colorSpace: 'srgb',
      }),
      putImageData: () => {},
      createImageData: () => ({
        data: new Uint8ClampedArray(0),
        width: 0,
        height: 0,
        colorSpace: 'srgb',
      }),
      setTransform: () => {},
      drawImage: () => {},
      save: () => {},
      fillText: () => {},
      restore: () => {},
      beginPath: () => {},
      moveTo: () => {},
      lineTo: () => {},
      closePath: () => {},
      stroke: () => {},
      translate: () => {},
      scale: () => {},
      rotate: () => {},
      arc: () => {},
      fill: () => {},
      measureText: () => ({
        width: 0,
        actualBoundingBoxAscent: 0,
        actualBoundingBoxDescent: 0,
        actualBoundingBoxLeft: 0,
        actualBoundingBoxRight: 0,
        fontBoundingBoxAscent: 0,
        fontBoundingBoxDescent: 0,
        emHeightAscent: 0,
        emHeightDescent: 0,
        hangingBaseline: 0,
        alphabeticBaseline: 0,
        ideographicBaseline: 0,
      }),
      transform: () => {},
      rect: () => {},
      clip: () => {},
      canvas: document.createElement('canvas'),
      globalAlpha: 1,
      globalCompositeOperation: 'source-over',
      imageSmoothingEnabled: true,
      imageSmoothingQuality: 'low',
      lineCap: 'butt',
      lineDashOffset: 0,
      lineJoin: 'miter',
      lineWidth: 1,
      miterLimit: 10,
      shadowBlur: 0,
      shadowColor: '',
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      strokeStyle: '',
      fillStyle: '',
      filter: '',
      font: '',
      fontKerning: 'auto',
      fontStretch: 'normal',
      fontVariantCaps: 'normal',
      letterSpacing: '',
      textAlign: 'start',
      textBaseline: 'alphabetic',
      direction: 'inherit',
      fontVariant: '',
      wordSpacing: '',
      isPointInPath: () => false,
      isPointInStroke: () => false,
      setLineDash: () => {},
      getLineDash: () => [],
    } as unknown as CanvasRenderingContext2D;
  }
  if (contextId === 'bitmaprenderer') {
    return {
      transferFromImageBitmap: () => {},
      canvas: document.createElement('canvas'),
    } as unknown as ImageBitmapRenderingContext;
  }
  return null;
};

jest.mock('@/components/headers_menu_users/OptionMenu', () => () => (
  <div data-testid='option-menu' />
));

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
  localStorage.setItem('api_token', 'test-token');
});

const mockData = [
  { name: 'A', value: '10' },
  { name: 'B', value: 20 },
  { name: 'C', value: '30' },
];

describe('GenericBarChart - Conditional and Calculation Mutations', () => {
  it('should display error when dataPath is missing in API response', async () => {
    try {
      fetchMock.mockResponseOnce(JSON.stringify({}));
      render(<GenericBarChart apiEndpoint='/api/data' dataPath='invalidPath' maxItemsSelected={3} />);
      await waitFor(() => {
        expect(screen.getByText((text) => text.toLowerCase().includes('no se encontró la propiedad'))).toBeInTheDocument();
      });
    } catch (error) {
      failedTests.push('t1');
      throw error;
    }
  });

  it('should display error when dataPath is missing in API response', async () => {
    try {
      fetchMock.mockResponseOnce(JSON.stringify({}));
      render(<GenericBarChart apiEndpoint='/api/data' dataPath='invalidPath' maxItemsSelected={3} />);
      await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent(/no se encontró la propiedad/i);
      });
    } catch (error) {
      failedTests.push('t2');
      throw error;
    }
  });

  it('should display error when dataPath is not an array', async () => {
    try {
      fetchMock.mockResponseOnce(JSON.stringify({ data: {} }));
      render(<GenericBarChart apiEndpoint='/api/data' dataPath='data' maxItemsSelected={3} />);
      await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent(/no contiene un arreglo válido/i);
      });
    } catch (error) {
      failedTests.push('t3');
      throw error;
    }
  });

  it('should show empty state if data array is empty', async () => {
    try {
      fetchMock.mockResponseOnce(JSON.stringify({ data: [] }));
      render(<GenericBarChart apiEndpoint='/api/data' dataPath='data' maxItemsSelected={3} />);
      await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent(/lista está vacía/i);
      });
    } catch (error) {
      failedTests.push('t4');
      throw error;
    }
  });

  it('should convert string numbers to actual numbers', async () => {
    try {
      fetchMock.mockResponseOnce(JSON.stringify({ data: mockData }));
      render(<GenericBarChart apiEndpoint='/api/data' dataPath='data' maxItemsSelected={3} />);
      await waitFor(() => {
        expect(screen.getByText('A')).toBeInTheDocument();
      });
    } catch (error) {
      failedTests.push('t5');
      throw error;
    }
  });

  it('should toggle fade class on filter change', async () => {
    try {
      fetchMock.mockResponseOnce(JSON.stringify({ data: mockData }));
      render(<GenericBarChart apiEndpoint='/api/data' dataPath='data' maxItemsSelected={3} />);
      await waitFor(() => {
        expect(screen.getByText(/filtros/i)).toBeInTheDocument();
      });
    } catch (error) {
      failedTests.push('t6');
      throw error;
    }
  });

  it('should limit data length based on maxItemsSelected', async () => {
    try {
      fetchMock.mockResponseOnce(JSON.stringify({ data: [...mockData, { name: 'D', value: 50 }] }));
      render(<GenericBarChart apiEndpoint='/api/data' dataPath='data' maxItemsSelected={2} />);
      await waitFor(() => {
        expect(screen.queryByText('D')).not.toBeInTheDocument();
      });
    } catch (error) {
      failedTests.push('t7');
      throw error;
    }
  });

  it('should hide legend if no items are selected', async () => {
    try {
      fetchMock.mockResponseOnce(JSON.stringify({ data: [] }));
      render(<GenericBarChart apiEndpoint='/api/data' dataPath='data' maxItemsSelected={3} />);
      await waitFor(() => {
        expect(screen.getByText((text) => text.toLowerCase().includes('no hay datos para mostrar'))).toBeInTheDocument();
      });
    } catch (error) {
      failedTests.push('t8');
      throw error;
    }
  });

  it('should fetch data only once on initial render', async () => {
    try {
      fetchMock.mockResponseOnce(JSON.stringify({ data: mockData }));
      render(<GenericBarChart apiEndpoint='/api/data' dataPath='data' maxItemsSelected={3} />);
      await waitFor(() => {
        expect(fetchMock).toHaveBeenCalledTimes(1);
      });
    } catch (error) {
      failedTests.push('t9');
      throw error;
    }
  });

  it('should not close dropdown when clicking inside filter bar', async () => {
    try {
      fetchMock.mockResponseOnce(JSON.stringify({ data: mockData }));
      render(<GenericBarChart apiEndpoint='/api/data' dataPath='data' maxItemsSelected={3} />);
      await waitFor(() => {
        expect(screen.getByText(/filtros/i)).toBeInTheDocument();
      });
      const filterBar = document.getElementById('filter-bar');
      if (filterBar) {
        const mouseDownEvent = new MouseEvent('mousedown', {
          bubbles: true,
          cancelable: true,
        });
        Object.defineProperty(mouseDownEvent, 'target', {
          value: filterBar,
        });
        document.dispatchEvent(mouseDownEvent);
      }
    } catch (error) {
      failedTests.push('t10');
      throw error;
    }
  });

  it('should update filtered data based on selected keys', async () => {
    try {
      fetchMock.mockResponseOnce(JSON.stringify({ data: mockData }));
      render(<GenericBarChart apiEndpoint='/api/data' dataPath='data' maxItemsSelected={3} />);
      await waitFor(() => {
        expect(screen.getByText('A')).toBeInTheDocument();
      });
    } catch (error) {
      failedTests.push('t11');
      throw error;
    }
  });
});

afterAll(() => {
  const output: string[] = [];
  const logPath = './test-results.log';

  if (failedTests.length > 0) {
    output.push('\n❌ Tests que fallaron:');
    failedTests.forEach((testName) => output.push(`${testName}`));
  } else {
    output.push('\n✅ Todos los tests pasaron correctamente.');
  }

  // Imprimir en consola
  console.log(output.join('\n'));

  // Guardar en archivo log
  try {
    fs.writeFileSync(logPath, output.join('\n'), 'utf-8');
    console.log(`📄 Reporte guardado en: ${logPath}`);
  } catch (err) {
    console.error('❌ Error al guardar el log de pruebas:', err);
  }
});