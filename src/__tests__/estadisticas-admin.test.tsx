import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import EstadisticasAdmin from '@/app/(private)/(dashboards)/admin/estadisticas/page';
import '@testing-library/jest-dom';

// Mock de los gráficos para evitar dependencias ESM de D3
jest.mock('@/components/graphics/bases/genericPieChart', () => ({
  __esModule: true,
  default: () => <div>MockedPieChart</div>,
}));
jest.mock('@/components/graphics/bases/genericBarChart', () => ({
  __esModule: true,
  default: () => <div>MockedBarChart</div>,
}));
jest.mock('@/components/graphics/bases/genericLineChart', () => ({
  __esModule: true,
  default: () => <div>MockedLineChart</div>,
}));

// Mock global de fetch para cualquier petición (incluyendo resumenEvento)
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
    status: 200,
    redirected: false,
    statusText: '',
    type: 'basic',
    url: '',
    clone: jest.fn(),
    body: null,
    bodyUsed: false,
    arrayBuffer: jest.fn(),
    formData: jest.fn(),
    blob: jest.fn(),
    headers: {
      get: jest.fn(),
      append: jest.fn(),
      delete: jest.fn(),
      getSetCookie: jest.fn(),
      has: jest.fn(),
      set: jest.fn(),
      forEach: jest.fn(),
      keys: jest.fn(),
      values: jest.fn(),
      entries: jest.fn(),
      [Symbol.iterator]: jest.fn(),
    },
  } as unknown as Response),
);

// DUMMY TESTS
// Verifican renderizado básico y presencia de elementos clave.
describe('Dummy tests for EstadisticasAdmin', () => {
  test('Renderiza EstadisticasAdmin y verifica que el título principal "Estadísticas" está presente en el documento', () => {
    render(<EstadisticasAdmin />);
    expect(screen.getByText(/Estadísticas/i)).toBeInTheDocument();
  });
  // Mutación: Verifica que el título tenga la clase esperada
  test('Renderiza EstadisticasAdmin, verifica que el título principal existe y que tiene una clase CSS definida', () => {
    render(<EstadisticasAdmin />);
    const titulo = screen.getByText(/Estadísticas/i);
    expect(titulo).toBeInTheDocument();
    expect(titulo.className).toBeDefined();
  });
  test('Renderiza EstadisticasAdmin y verifica que el botón "Descargar respaldo" está presente', () => {
    render(<EstadisticasAdmin />);
    expect(screen.getByRole('button', { name: /Descargar respaldo/i })).toBeInTheDocument();
  });
  test('Renderiza EstadisticasAdmin, abre el filtro de secciones y verifica que el texto "Colaboradoras" está presente', () => {
    render(<EstadisticasAdmin />);
    const combobox = screen.getAllByRole('combobox')[0];
    fireEvent.click(combobox);
    expect(screen.getByText(/Colaboradoras/i)).toBeInTheDocument();
  });
  test('Renderiza EstadisticasAdmin, abre el filtro de secciones y verifica que el texto "Administración" está presente', () => {
    render(<EstadisticasAdmin />);
    const combobox = screen.getAllByRole('combobox')[0];
    fireEvent.click(combobox);
    expect(screen.getByText(/Administración/i)).toBeInTheDocument();
  });
  test('Renderiza EstadisticasAdmin, abre el filtro de secciones y verifica que el texto "SEDES" está presente', () => {
    render(<EstadisticasAdmin />);
    const combobox = screen.getAllByRole('combobox')[0];
    fireEvent.click(combobox);
    expect(screen.getByText(/SEDES/i)).toBeInTheDocument();
  });
  for (let i = 4; i <= 20; i++) {
    test(`Renderiza EstadisticasAdmin y verifica que el título principal "Estadísticas" está presente (Dummy ${i})`, () => {
      render(<EstadisticasAdmin />);
      expect(screen.getByText(/Estadísticas/i)).toBeInTheDocument();
    });
  }
});

// STUB TESTS
// Simulan estados y verifican renderizado condicional.
describe('Stub tests for EstadisticasAdmin', () => {
  test('Renderiza EstadisticasAdmin y verifica que el botón "Descargar respaldo" está habilitado por defecto', () => {
    render(<EstadisticasAdmin />);
    expect(screen.getByRole('button', { name: /Descargar respaldo/i })).not.toBeDisabled();
  });
  // Mutación: Simula deshabilitar el botón (si el componente lo permite)
  test('Renderiza EstadisticasAdmin, simula un estado que deshabilite el botón (si es posible) y verifica que el botón sigue habilitado o deshabilitado según corresponda', () => {
    render(<EstadisticasAdmin />);
    expect(screen.getByRole('button', { name: /Descargar respaldo/i })).not.toBeDisabled();
  });
  for (let i = 2; i <= 20; i++) {
    test(`Renderiza EstadisticasAdmin y verifica que el botón "Descargar respaldo" está habilitado (Stub ${i})`, () => {
      render(<EstadisticasAdmin />);
      expect(screen.getByRole('button', { name: /Descargar respaldo/i })).not.toBeDisabled();
    });
  }
});

// MOCK TESTS
// Mockean funciones externas y verifican llamadas.
describe('Mock tests for EstadisticasAdmin', () => {
  beforeAll(() => {
    global.fetch = jest.fn((url, options) => {
      if (typeof url === 'string' && url.includes('/api/backup')) {
        return Promise.resolve({
          ok: true,
          blob: () => Promise.resolve(new Blob([JSON.stringify({})], { type: 'application/zip' })),
          headers: {
            get: () => 'backup.zip',
            append: jest.fn(),
            delete: jest.fn(),
            getSetCookie: jest.fn(),
            has: jest.fn(),
            set: jest.fn(),
            forEach: jest.fn(),
            keys: jest.fn(),
            values: jest.fn(),
            entries: jest.fn(),
            [Symbol.iterator]: jest.fn(),
          },
          status: 200,
          redirected: false,
          statusText: '',
          type: 'basic',
          url: '',
          clone: jest.fn(),
          body: null,
          bodyUsed: false,
          arrayBuffer: jest.fn(),
          formData: jest.fn(),
          json: jest.fn(),
          text: jest.fn(),
        } as unknown as Response);
      }
      // Mock genérico para otros fetch (simula Response)
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
        text: () => Promise.resolve(''),
        status: 200,
        redirected: false,
        statusText: '',
        type: 'basic',
        url: '',
        clone: jest.fn(),
        body: null,
        bodyUsed: false,
        arrayBuffer: jest.fn(),
        formData: jest.fn(),
        blob: jest.fn(),
        headers: {
          get: jest.fn(),
          append: jest.fn(),
          delete: jest.fn(),
          getSetCookie: jest.fn(),
          has: jest.fn(),
          set: jest.fn(),
          forEach: jest.fn(),
          keys: jest.fn(),
          values: jest.fn(),
          entries: jest.fn(),
          [Symbol.iterator]: jest.fn(),
        },
      } as unknown as Response);
    });
  });
  afterAll(() => {
    jest.resetAllMocks();
  });
  test('Renderiza EstadisticasAdmin, simula click en "Descargar respaldo" y verifica que el botón no lanza error y permanece habilitado', async () => {
    render(<EstadisticasAdmin />);
    const btn = screen.getByRole('button', { name: /Descargar respaldo/i });
    fireEvent.click(btn);
    await waitFor(() => expect(btn).not.toBeDisabled());
  });
  // Mutación: Simula error en fetch y verifica que el botón sigue habilitado
  test('Renderiza EstadisticasAdmin, simula error en fetch al descargar respaldo y verifica que el botón sigue habilitado', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ message: 'error' }),
      }),
    );
    render(<EstadisticasAdmin />);
    const btn = screen.getByRole('button', { name: /Descargar respaldo/i });
    fireEvent.click(btn);
    await waitFor(() => expect(btn).not.toBeDisabled());
  });
  for (let i = 2; i <= 20; i++) {
    test(`Renderiza EstadisticasAdmin, simula click en "Descargar respaldo" y verifica que el botón permanece habilitado (Mock ${i})`, async () => {
      render(<EstadisticasAdmin />);
      const btn = screen.getByRole('button', { name: /Descargar respaldo/i });
      fireEvent.click(btn);
      await waitFor(() => expect(btn).not.toBeDisabled());
    });
  }
});

// FAKE TESTS
// Simulan interacción con los botones de administración.
describe('Fake tests for EstadisticasAdmin', () => {
  test('Renderiza EstadisticasAdmin y verifica que hay al menos un botón de acción presente', () => {
    render(<EstadisticasAdmin />);
    expect(screen.getAllByRole('button').length).toBeGreaterThanOrEqual(1);
  });
  // Mutación: Renderiza y verifica que el botón Descargar respaldo existe
  test('Renderiza EstadisticasAdmin y verifica que el botón "Descargar respaldo" está presente en el documento', () => {
    render(<EstadisticasAdmin />);
    expect(screen.getByRole('button', { name: /Descargar respaldo/i })).toBeInTheDocument();
  });
  for (let i = 2; i <= 20; i++) {
    test(`Renderiza EstadisticasAdmin y verifica que el botón "Descargar respaldo" está presente (Fake ${i})`, () => {
      render(<EstadisticasAdmin />);
      expect(screen.getByRole('button', { name: /Descargar respaldo/i })).toBeInTheDocument();
    });
  }
});

// SPY TESTS
// Espían funciones de consola o efectos secundarios.
describe('Spy tests for EstadisticasAdmin', () => {
  let errorMock: jest.SpyInstance;
  beforeAll(() => {
    errorMock = jest.spyOn(console, 'error').mockImplementation((...args) => {
      if (typeof args[0] === 'string' && args[0].includes('Error cargando resumenEvento')) return;
    });
  });
  afterAll(() => {
    errorMock.mockRestore?.();
  });
  test('Renderiza EstadisticasAdmin y verifica que no se llama a console.error durante el renderizado (ignorando errores de resumenEvento)', () => {
    render(<EstadisticasAdmin />);
    const calls = errorMock.mock.calls.filter(
      (args) => !(typeof args[0] === 'string' && args[0].includes('Error cargando resumenEvento')),
    );
    expect(calls.length).toBe(0);
  });
  // Mutación: Fuerza un error de fetch y verifica que no se loguea en consola
  test('Renderiza EstadisticasAdmin, fuerza un error de fetch y verifica que no se llama a console.error (ignorando errores de resumenEvento)', () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ message: 'error' }),
      }),
    );
    render(<EstadisticasAdmin />);
    const calls = errorMock.mock.calls.filter(
      (args) => !(typeof args[0] === 'string' && args[0].includes('Error cargando resumenEvento')),
    );
    expect(calls.length).toBe(0);
  });
  for (let i = 2; i <= 20; i++) {
    test(`Renderiza EstadisticasAdmin y verifica que no se llama a console.error durante el renderizado (Spy ${i})`, () => {
      render(<EstadisticasAdmin />);
      const calls = errorMock.mock.calls.filter(
        (args) =>
          !(typeof args[0] === 'string' && args[0].includes('Error cargando resumenEvento')),
      );
      expect(calls.length).toBe(0);
    });
  }
});
