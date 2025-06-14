import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import SolicitudesRegistroAdmin from '../app/(private)/(dashboards)/admin/solicitudes/page';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

// Mock global de fetch para cualquier petición (incluyendo json())
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

// Mock de hooks y componentes externos
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/admin/solicitudes',
}));
jest.mock('@/components/buttons_inputs/Notification', () => ({
  useNotification: () => ({ notify: jest.fn() }),
}));

// Mock global de fetch para todos los tests
const globalFetchMock = jest.fn();
beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  global.fetch = globalFetchMock;
});
beforeEach(() => {
  window.localStorage.setItem('api_token', 'token-fake');
  globalFetchMock.mockClear();
});
afterEach(() => {
  window.localStorage.clear();
  jest.clearAllMocks();
  globalFetchMock.mockClear();
});
afterAll(() => {
  jest.resetAllMocks();
});

// DUMMY TESTS
// Dummy: mock mínimo de fetch solo para Dummy, restaurar después
describe('Dummy tests for SolicitudesRegistroAdmin', () => {
  let fetchSpy: jest.SpyInstance;
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    fetchSpy = jest.spyOn(global, 'fetch').mockImplementation((url: any) => {
      // Mock mínimo para endpoints requeridos
      if (typeof url === 'string' && url) {
        return Promise.resolve(
          new Response(
            JSON.stringify({
              dataForRequests: [
                {
                  id_participant: 1,
                  name: 'Ana',
                  paternal_name: 'Pérez',
                  maternal_name: 'López',
                  email: 'ana@mail.com',
                  preferred_group: null,
                  status: 'Pendiente',
                  sede: 'Sede A',
                },
                {
                  id_participant: 2,
                  name: 'Bea',
                  paternal_name: 'García',
                  maternal_name: 'Martínez',
                  email: 'bea@mail.com',
                  preferred_group: null,
                  status: 'Pendiente',
                  sede: 'Sede A',
                },
              ],
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } },
          ),
        );
      }
      if (typeof url === 'string' && url.includes('/api/collaborators')) {
        return Promise.resolve(
          new Response(JSON.stringify({ dataForRequests: [] }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }),
        );
      }
      if (typeof url === 'string' && url.includes('/api/venues')) {
        return Promise.resolve(
          new Response(JSON.stringify([{ id_venue: 1, name: 'Sede A', status: 'Pendiente' }]), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }),
        );
      }
      return Promise.resolve(
        new Response(JSON.stringify({}), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      );
    });
  });
  beforeEach(() => {
    window.localStorage.setItem('api_token', 'token-fake');
  });
  afterEach(() => {
    window.localStorage.clear();
    jest.clearAllMocks();
  });
  afterAll(() => {
    fetchSpy.mockRestore();
  });
  for (let i = 1; i <= 20; i++) {
    test(`Renderiza SolicitudesRegistroAdmin y verifica que el título "Solicitudes" está presente en el documento (Dummy ${i})`, async () => {
      render(<SolicitudesRegistroAdmin />);
      expect(await screen.findByText(/Solicitudes/i)).toBeInTheDocument();
    });
    // Mutación: Renderiza y verifica que el título contiene "Solicitudes"
    test(`Renderiza SolicitudesRegistroAdmin y verifica que el título contiene el texto "Solicitudes" (Dummy ${i} mutación)`, async () => {
      render(<SolicitudesRegistroAdmin />);
      const titulo = await screen.findByText(/Solicitudes/i);
      expect(titulo.textContent).toMatch(/Solicitudes/);
    });
  }
});

// --- STUB TESTS ---
describe('Stub tests for SolicitudesRegistroAdmin', () => {
  let fetchSpy: jest.SpyInstance;
  beforeAll(() => {
    fetchSpy = jest.spyOn(global, 'fetch');
  });
  beforeEach(() => {
    globalFetchMock.mockImplementation((url) => {
      if (url.includes('/api/participants')) {
        return Promise.resolve(
          new Response(
            JSON.stringify({
              dataForRequests: [
                {
                  id_participant: 1,
                  name: 'Ana',
                  paternal_name: 'García',
                  maternal_name: 'López',
                  email: 'ana@correo.com',
                  preferred_group: null,
                  status: 'Pendiente',
                },
                {
                  id_participant: 2,
                  name: 'Luis',
                  paternal_name: 'Pérez',
                  maternal_name: 'Martínez',
                  email: 'luis@correo.com',
                  preferred_group: null,
                  status: 'Pendiente',
                },
              ],
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } },
          ),
        );
      }
      if (url.includes('/api/collaborators')) {
        return Promise.resolve(
          new Response(
            JSON.stringify({
              dataForRequests: [
                {
                  id_collaborator: 1,
                  name: 'Bea',
                  paternal_name: 'Ruiz',
                  maternal_name: 'Soto',
                  email: 'bea@correo.com',
                  phone_number: '123',
                  college: '',
                  degree: '',
                  semester: '',
                  gender: '',
                  status: 'Pendiente',
                  preferred_role: '',
                  preferred_language: '',
                  preferred_level: '',
                  preferred_group: null,
                  role: '',
                  level: '',
                  language: '',
                },
              ],
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } },
          ),
        );
      }
      if (url.includes('/api/venues')) {
        // Cambiar aquí: devolver objeto con dataForRequests
        return Promise.resolve(
          new Response(
            JSON.stringify({
              dataForRequests: [
                {
                  id_venue: 1,
                  name: 'Sede A',
                  country: '',
                  state: 'CDMX',
                  address: 'Calle 1',
                  status: 'Pendiente',
                },
                {
                  id_venue: 2,
                  name: 'Sede B',
                  country: '',
                  state: 'EdoMex',
                  address: 'Calle 2',
                  status: 'Pendiente',
                },
              ],
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } },
          ),
        );
      }
      return Promise.resolve(
        new Response(JSON.stringify({}), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      );
    });
    window.localStorage.setItem('api_token', 'token-fake');
  });
  afterEach(() => {
    window.localStorage.clear();
    jest.clearAllMocks();
  });
  afterAll(() => {
    fetchSpy.mockRestore();
  });
  for (let i = 1; i <= 20; i++) {
    test(`Renderiza SolicitudesRegistroAdmin con datos simulados y verifica que los nombres, tabs y sedes se muestran correctamente (Stub ${i})`, async () => {
      render(<SolicitudesRegistroAdmin />);
      expect(await screen.findByText(/Ana/)).toBeInTheDocument();
      const staffTab = screen.getByText(/Apoyo & Staff/i);
      await userEvent.click(staffTab);
      expect(await screen.findByText(/Bea/)).toBeInTheDocument();
      const sedesTab = screen.getByText(/Sedes/i);
      await userEvent.click(sedesTab);
      expect(await screen.findByText(/Sede A/)).toBeInTheDocument();
    }, 20000);
    // Mutación: Renderiza y verifica que el tab de Sedes existe
    test(`Renderiza SolicitudesRegistroAdmin y verifica que el tab "Sedes" está presente (Stub ${i} mutación)`, async () => {
      render(<SolicitudesRegistroAdmin />);
      const sedesTab = screen.getByText(/Sedes/i);
      expect(sedesTab).toBeInTheDocument();
    });
  }
});

// --- MOCK TESTS ---
describe('Mock tests for SolicitudesRegistroAdmin', () => {
  let fetchSpy: jest.SpyInstance;
  beforeAll(() => {
    fetchSpy = jest
      .spyOn(global, 'fetch')
      .mockImplementation(() =>
        Promise.resolve(new Response(JSON.stringify({ dataForRequests: [] }), { status: 200 })),
      );
  });
  beforeEach(() => {
    window.localStorage.setItem('api_token', 'token-fake');
  });
  afterEach(() => {
    window.localStorage.clear();
    jest.clearAllMocks();
  });
  afterAll(() => {
    fetchSpy.mockRestore();
  });
  for (let i = 1; i <= 20; i++) {
    test(`Renderiza SolicitudesRegistroAdmin y verifica que fetch es llamado al renderizar el componente (Mock ${i})`, async () => {
      render(<SolicitudesRegistroAdmin />);
      await waitFor(() => expect(fetchSpy).toHaveBeenCalled());
    });
  }
  // Mutación: fetch falla y solo se muestra el título principal (no error específico)
  test('Renderiza SolicitudesRegistroAdmin, simula fallo en fetch y verifica que el título principal "Solicitudes de Registro" sigue visible', async () => {
    fetchSpy.mockImplementationOnce(() => Promise.resolve(new Response(null, { status: 500 })));
    render(<SolicitudesRegistroAdmin />);
    expect(await screen.findByText(/Solicitudes de Registro/i)).toBeInTheDocument();
  });
});

// --- FAKE TESTS (paginación robusta) ---
describe('Fake tests for SolicitudesRegistroAdmin', () => {
  beforeEach(() => {
    // 40 participantes para probar paginación
    globalFetchMock.mockImplementation((url) => {
      if (url.includes('/api/participants')) {
        return Promise.resolve(
          new Response(
            JSON.stringify({
              dataForRequests: Array.from({ length: 40 }, (_, i) => ({
                id_participant: i + 1,
                name: `Nombre${i + 1}`,
                paternal_name: `ApellidoP${i + 1}`,
                maternal_name: `ApellidoM${i + 1}`,
                email: `correo${i + 1}@mail.com`,
                preferred_group: null,
                status: 'Pendiente',
              })),
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } },
          ),
        );
      }
      if (url.includes('/api/collaborators')) {
        return Promise.resolve(
          new Response(JSON.stringify({ dataForRequests: [] }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }),
        );
      }
      if (url.includes('/api/venues')) {
        return Promise.resolve(
          new Response(JSON.stringify([]), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }),
        );
      }
      return Promise.resolve(
        new Response(JSON.stringify({}), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      );
    });
    window.localStorage.setItem('api_token', 'token-fake');
  });
  afterEach(() => {
    window.localStorage.clear();
    jest.clearAllMocks();
  });
  // 10 tests: verifica nombres en la página 1
  for (let i = 0; i < 10; i++) {
    test(`Renderiza SolicitudesRegistroAdmin y verifica que el nombre "Nombre${i + 1} ApellidoP${
      i + 1
    } ApellidoM${i + 1}" está presente en la página 1 (Fake ${i + 1})`, async () => {
      render(<SolicitudesRegistroAdmin />);
      const nombreEsperado = `Nombre${i + 1} ApellidoP${i + 1} ApellidoM${i + 1}`;
      await waitFor(() => {
        expect(screen.getByText(nombreEsperado)).toBeInTheDocument();
      });
    }, 20000);
  }
  // 10 tests: navega a la página 2 y verifica nombres de la página 2
  for (let i = 0; i < 10; i++) {
    test(`Renderiza SolicitudesRegistroAdmin, navega a la página 2 y verifica que el nombre "Nombre${
      20 + i + 1
    } ApellidoP${20 + i + 1} ApellidoM${20 + i + 1}" está presente (Fake ${i + 11})`, async () => {
      render(<SolicitudesRegistroAdmin />);
      const pageBtn = await screen.findByRole('link', { name: '2' });
      await userEvent.click(pageBtn);
      const idx = 20 + i + 1;
      const nombreEsperado = `Nombre${idx} ApellidoP${idx} ApellidoM${idx}`;
      await waitFor(() => {
        expect(screen.getByText(nombreEsperado)).toBeInTheDocument();
      });
    }, 20000);
  }
  // Test 21: recorre ambas páginas y verifica todos los datos
  test('Renderiza SolicitudesRegistroAdmin, navega por ambas páginas y verifica que todos los nombres esperados están presentes', async () => {
    render(<SolicitudesRegistroAdmin />);
    for (let page = 1; page <= 2; page++) {
      if (page > 1) {
        const pageBtn = await screen.findByRole('link', { name: `${page}` });
        await userEvent.click(pageBtn);
      }
      const start = (page - 1) * 20 + 1;
      const end = page * 20;
      for (let i = start; i <= end; i++) {
        const nombreEsperado = `Nombre${i} ApellidoP${i} ApellidoM${i}`;
        await waitFor(() => {
          expect(screen.getByText(nombreEsperado)).toBeInTheDocument();
        });
      }
    }
  }, 20000); // timeout 20s
});

// --- SPY TESTS ---
describe('Spy tests for SolicitudesRegistroAdmin', () => {
  let errorMock: jest.SpyInstance;
  beforeAll(() => {
    errorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterAll(() => {
    errorMock.mockRestore?.();
  });
  afterEach(() => {
    jest.clearAllMocks();
    globalFetchMock.mockClear();
  });
  for (let i = 1; i <= 20; i++) {
    test(`Renderiza SolicitudesRegistroAdmin y verifica que no se llama a console.error durante el renderizado (Spy ${i})`, async () => {
      render(<SolicitudesRegistroAdmin />);
      expect(errorMock).not.toHaveBeenCalled();
    });
  }
});
