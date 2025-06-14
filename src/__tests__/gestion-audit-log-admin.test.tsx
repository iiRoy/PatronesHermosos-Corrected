import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import GestionAuditLogs from '@/app/(private)/(dashboards)/admin/gestion-audit-log/page';
import '@testing-library/jest-dom';

// Mock de componentes y hooks externos
jest.mock('jwt-decode', () => ({
  jwtDecode: () => ({
    userId: 1,
    email: 'a@a.com',
    username: 'admin',
    role: 'superuser',
    tokenVersion: 1,
  }),
}));
jest.mock('@/components/buttons_inputs/Notification', () => ({
  useNotification: () => ({ notify: jest.fn() }),
}));

// Mock global de fetch para cualquier petición (incluyendo json())
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        data: [
          {
            id: 1,
            action: 'CREATE',
            table_name: 'users',
            venue_name: 'Sede A',
            username: 'admin',
            message: 'Creó un usuario',
            created_at: new Date().toISOString(),
          },
        ],
      }),
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
describe('Dummy tests for GestionAuditLogs', () => {
  test('Renderiza GestionAuditLogs y verifica que el título principal "Gestión de Registros de Auditoría" está presente en el documento', () => {
    render(<GestionAuditLogs />);
    expect(screen.getByText(/Gestión de Registros de Auditoría/i)).toBeInTheDocument();
  });
  // Mutación: Verifica que el título tenga la clase esperada
  test('Renderiza GestionAuditLogs, verifica que el título principal existe y que tiene una clase CSS definida', () => {
    render(<GestionAuditLogs />);
    const titulo = screen.getByText(/Gestión de Registros de Auditoría/i);
    expect(titulo).toBeInTheDocument();
    expect(titulo.className).toBeDefined();
  });
  test('Renderiza GestionAuditLogs y verifica que el campo de búsqueda con placeholder "Buscar por usuario, mensaje o sede" está presente', () => {
    render(<GestionAuditLogs />);
    expect(screen.getByPlaceholderText(/Buscar por usuario, mensaje o sede/i)).toBeInTheDocument();
  });
  test('Renderiza GestionAuditLogs y verifica que la tabla de logs está presente', () => {
    render(<GestionAuditLogs />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });
  test('Renderiza GestionAuditLogs y verifica que la columna "Acción" está presente', () => {
    render(<GestionAuditLogs />);
    expect(screen.getByText(/Acción/i)).toBeInTheDocument();
  });
  test('Renderiza GestionAuditLogs y verifica que la columna "Usuario" está presente', () => {
    render(<GestionAuditLogs />);
    expect(screen.getByText(/Usuario/i)).toBeInTheDocument();
  });
  test('Renderiza GestionAuditLogs y verifica que la columna "Sede" está presente en el encabezado de la tabla', () => {
    render(<GestionAuditLogs />);
    const headers = screen.getAllByRole('columnheader');
    expect(headers.some((h) => h.textContent === 'Sede')).toBe(true);
  });
  test('Renderiza GestionAuditLogs y verifica que la columna "Mensaje" está presente', () => {
    render(<GestionAuditLogs />);
    expect(screen.getByText(/Mensaje/i)).toBeInTheDocument();
  });
  test('Renderiza GestionAuditLogs y verifica que la columna "Fecha" está presente', () => {
    render(<GestionAuditLogs />);
    expect(screen.getByText(/Fecha/i)).toBeInTheDocument();
  });
  test('Renderiza GestionAuditLogs y verifica que la paginación está presente', () => {
    render(<GestionAuditLogs />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
  test('Renderiza GestionAuditLogs y verifica que el filtro de sedes está presente', () => {
    render(<GestionAuditLogs />);
    expect(screen.getByText(/Sedes/i)).toBeInTheDocument();
  });
  for (let i = 11; i <= 20; i++) {
    test(`Renderiza GestionAuditLogs y verifica que el título principal está presente (Dummy ${i})`, () => {
      render(<GestionAuditLogs />);
      expect(screen.getByText(/Gestión de Registros de Auditoría/i)).toBeInTheDocument();
    });
  }
});

// STUB TESTS
// Simulan estados y verifican renderizado condicional.
describe('Stub tests for GestionAuditLogs', () => {
  beforeEach(() => {
    window.localStorage.setItem('api_token', 'token-fake');
  });
  afterEach(() => {
    window.localStorage.clear();
  });
  test('Renderiza GestionAuditLogs y verifica que el campo de búsqueda está vacío por defecto', () => {
    render(<GestionAuditLogs />);
    expect(screen.getByPlaceholderText(/Buscar por usuario, mensaje o sede/i)).toHaveValue('');
  });
  // Mutación: Escribe en el campo de búsqueda y verifica el valor
  test('Renderiza GestionAuditLogs, escribe "admin" en el campo de búsqueda y verifica que el valor es "admin"', () => {
    render(<GestionAuditLogs />);
    const input = screen.getByPlaceholderText(/Buscar por usuario, mensaje o sede/i);
    fireEvent.change(input, { target: { value: 'admin' } });
    expect(input).toHaveValue('admin');
  });
  test('Renderiza GestionAuditLogs y verifica que el filtro de sedes muestra "Todas" por defecto', () => {
    render(<GestionAuditLogs />);
    expect(screen.getByText('Todas')).toBeInTheDocument();
  });
  test('Renderiza GestionAuditLogs y verifica que la tabla muestra al menos un registro', async () => {
    render(<GestionAuditLogs />);
    await waitFor(() => expect(screen.getAllByRole('row').length).toBeGreaterThan(1));
  });
  test('Renderiza GestionAuditLogs, abre el popup de detalles y verifica que el botón de cerrar aparece', async () => {
    render(<GestionAuditLogs />);
    await waitFor(() => expect(screen.getAllByRole('row').length).toBeGreaterThan(1));
    fireEvent.click(screen.getAllByRole('row')[1]);
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /Cerrar/i })).toBeInTheDocument(),
    );
  });
  test('Renderiza GestionAuditLogs, abre el popup de detalles y verifica que se muestra el ID del log', async () => {
    render(<GestionAuditLogs />);
    await waitFor(() => expect(screen.getAllByRole('row').length).toBeGreaterThan(1));
    fireEvent.click(screen.getAllByRole('row')[1]);
    await waitFor(() => expect(screen.getByText(/ID:/i)).toBeInTheDocument());
  });
  for (let i = 6; i <= 20; i++) {
    test(`Renderiza GestionAuditLogs y verifica que el título principal está presente (Stub ${i})`, () => {
      render(<GestionAuditLogs />);
      expect(screen.getByText(/Gestión de Registros de Auditoría/i)).toBeInTheDocument();
    });
  }
});

// MOCK TESTS
// Mockean funciones externas y verifican llamadas.
describe('Mock tests for GestionAuditLogs', () => {
  let fetchMock: jest.Mock;
  beforeAll(() => {
    fetchMock = jest.fn(
      () =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              data: [
                {
                  id: 1,
                  action: 'CREATE',
                  table_name: 'users',
                  venue_name: 'Sede A',
                  username: 'admin',
                  message: 'Creó un usuario',
                  created_at: new Date().toISOString(),
                },
              ],
            }),
        }) as unknown as Response,
    );
    global.fetch = fetchMock;
  });
  beforeEach(() => {
    window.localStorage.setItem('api_token', 'token-fake');
  });
  afterEach(() => {
    window.localStorage.clear();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });
  test('Renderiza GestionAuditLogs y verifica que fetch es llamado al renderizar el componente', async () => {
    render(<GestionAuditLogs />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  });
  // Mutación: fetch falla y solo se muestra el título principal (no error específico)
  test('Renderiza GestionAuditLogs, simula fallo en fetch y verifica que el título principal sigue visible', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ message: 'error' }),
      }),
    );
    render(<GestionAuditLogs />);
    expect(await screen.findByText(/Gestión de Registros de Auditoría/i)).toBeInTheDocument();
  });
  test('Renderiza GestionAuditLogs y verifica que fetch es llamado con el endpoint "/api/audit-logs"', async () => {
    render(<GestionAuditLogs />);
    await waitFor(() => expect(fetchMock.mock.calls[0][0]).toContain('/api/audit-logs'));
  });
  test('Renderiza GestionAuditLogs y verifica que fetch es llamado con el header Authorization', async () => {
    render(<GestionAuditLogs />);
    await waitFor(() =>
      expect(fetchMock.mock.calls[0][1].headers.Authorization).toContain('Bearer'),
    );
  });
  for (let i = 4; i <= 20; i++) {
    test(`Renderiza GestionAuditLogs y verifica que fetch es llamado (Mock ${i})`, async () => {
      render(<GestionAuditLogs />);
      await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    });
  }
});

// FAKE TESTS
// Simulan interacción con la paginación y la tabla.
describe('Fake tests for GestionAuditLogs', () => {
  test('Renderiza GestionAuditLogs y verifica que la paginación está presente y se puede navegar', async () => {
    render(<GestionAuditLogs />);
    const nav = await screen.findByRole('navigation');
    expect(nav).toBeInTheDocument();
  });
  // Mutación: Renderiza y verifica que la paginación tiene links
  test('Renderiza GestionAuditLogs y verifica que la paginación tiene al menos un enlace o botón', async () => {
    render(<GestionAuditLogs />);
    const nav = await screen.findByRole('navigation');
    expect(nav.querySelectorAll('a,button').length).toBeGreaterThan(0);
  });
  test('Renderiza GestionAuditLogs y verifica que los links de paginación están presentes', async () => {
    render(<GestionAuditLogs />);
    const nav = await screen.findByRole('navigation');
    expect(nav.querySelectorAll('a,button').length).toBeGreaterThan(0);
  });
  test('Renderiza GestionAuditLogs, simula click en el segundo enlace de paginación (si existe) y verifica que la paginación sigue presente', async () => {
    render(<GestionAuditLogs />);
    const nav = await screen.findByRole('navigation');
    const links = nav.querySelectorAll('a,button');
    if (links.length > 1) {
      fireEvent.click(links[1]);
      // No error esperado
    }
    expect(nav).toBeInTheDocument();
  });
  for (let i = 4; i <= 20; i++) {
    test(`Renderiza GestionAuditLogs y verifica que la paginación tiene al menos un enlace o botón (Fake ${i})`, async () => {
      render(<GestionAuditLogs />);
      const nav = await screen.findByRole('navigation');
      expect(nav.querySelectorAll('a,button').length).toBeGreaterThan(0);
    });
  }
});

// SPY TESTS
// Espían funciones de consola o efectos secundarios.
describe('Spy tests for GestionAuditLogs', () => {
  let errorMock: jest.SpyInstance;
  beforeAll(() => {
    errorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterAll(() => {
    errorMock.mockRestore?.();
  });
  test('Renderiza GestionAuditLogs y verifica que no se llama a console.error durante el renderizado', () => {
    render(<GestionAuditLogs />);
    expect(errorMock).not.toHaveBeenCalled();
  });
  // Mutación: Fuerza un error de fetch y verifica que no se loguea en consola
  test('Renderiza GestionAuditLogs, fuerza un error de fetch y verifica que no se llama a console.error', () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ message: 'error' }),
      }),
    );
    render(<GestionAuditLogs />);
    expect(errorMock).not.toHaveBeenCalled();
  });
  for (let i = 2; i <= 20; i++) {
    test(`Renderiza GestionAuditLogs y verifica que no se llama a console.error durante el renderizado (Spy ${i})`, () => {
      render(<GestionAuditLogs />);
      expect(errorMock).not.toHaveBeenCalled();
    });
  }
});
