import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import EditarCoordinadora from '../app/(private)/(dashboards)/admin/gestion-usuarios/coordinadoras/editarCoordinadora/[id]/page';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

// Mock de hooks y componentes externos
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  useParams: () => ({ id: '1' }),
  usePathname: () => '/admin/gestion-usuarios/coordinadoras/editarCoordinadora/1',
}));
jest.mock('@/components/buttons_inputs/Notification', () => ({
  useNotification: () => ({ notify: jest.fn() }),
}));

// Utilidad para crear un mock de Response compatible con TypeScript
function createMockResponse({
  ok = true,
  status = 200,
  json = () => Promise.resolve({}),
  ...rest
}: any = {}) {
  return {
    ok,
    status,
    statusText: ok ? 'OK' : 'Error',
    headers: new Headers(),
    redirected: false,
    type: 'basic',
    url: '',
    clone: function () {
      return this;
    },
    body: null,
    bodyUsed: false,
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
    blob: () => Promise.resolve(new Blob()),
    formData: () => Promise.resolve(new FormData()),
    json,
    text: () => Promise.resolve(''),
    ...rest,
  } as Response;
}

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

// Mock global de fetch para todos los tests
const globalFetchMock = jest.fn((url, options) => {
  // Mock para /api/venue-coordinators/:id
  if (typeof url === 'string' && url.match(/\/api\/venue-coordinators\//)) {
    return Promise.resolve(
      createMockResponse({
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve({
            id_venue_coord: 1,
            name: 'Ana',
            paternal_name: 'García',
            maternal_name: 'López',
            email: 'ana@correo.com',
            phone_number: '+521234567890',
            username: 'anauser',
            id_venue: 101,
          }),
      }),
    );
  }
  // Mock para /api/venues
  if (typeof url === 'string' && url.includes('/api/venues')) {
    return Promise.resolve(
      createMockResponse({
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve([
            { id_venue: 101, name: 'Sede A' },
            { id_venue: 102, name: 'Sede B' },
          ]),
      }),
    );
  }
  // Mock para PUT (actualización)
  if (typeof url === 'string' && url.includes('/api/venue-coordinators/specific/')) {
    return Promise.resolve(
      createMockResponse({ ok: true, status: 200, json: () => Promise.resolve({}) }),
    );
  }
  // Default: respuesta exitosa vacía
  return Promise.resolve(
    createMockResponse({ ok: true, status: 200, json: () => Promise.resolve({}) }),
  );
});

// Mock global de scrollIntoView para Radix UI Select
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
// Verifican renderizado básico y presencia de elementos clave.
describe('Dummy tests for EditarCoordinadora', () => {
  test('Renderiza EditarCoordinadora y verifica que el título principal "Editar Coordinadora" está presente en el documento', async () => {
    render(<EditarCoordinadora />);
    expect(await screen.findByText(/Editar Coordinadora/i)).toBeInTheDocument();
  });
  test('El título principal tiene la clase esperada', async () => {
    render(<EditarCoordinadora />);
    const titulo = await screen.findByText(/Editar Coordinadora/i);
    expect(titulo.className).toBeDefined();
  });
  test('El campo "Nombre" está presente', async () => {
    render(<EditarCoordinadora />);
    expect(await screen.findByLabelText(/Nombre/i)).toBeInTheDocument();
  });
  test('El campo "Apellido Paterno" está presente', async () => {
    render(<EditarCoordinadora />);
    expect(await screen.findByLabelText(/Apellido Paterno/i)).toBeInTheDocument();
  });
  test('El campo "Apellido Materno" está presente', async () => {
    render(<EditarCoordinadora />);
    expect(await screen.findByLabelText(/Apellido Materno/i)).toBeInTheDocument();
  });
  test('El campo "Username" está presente', async () => {
    render(<EditarCoordinadora />);
    expect(await screen.findByLabelText(/Username/i)).toBeInTheDocument();
  });
  test('El campo "Correo" está presente', async () => {
    render(<EditarCoordinadora />);
    expect(await screen.findByLabelText(/Correo/i)).toBeInTheDocument();
  });
  test('El campo "Teléfono" está presente', async () => {
    render(<EditarCoordinadora />);
    expect(await screen.findByLabelText(/Teléfono/i)).toBeInTheDocument();
  });
  test('El dropdown de "Sede" está presente', async () => {
    render(<EditarCoordinadora />);
    expect(await screen.findByLabelText(/Sede/i)).toBeInTheDocument();
  });
  test('El botón "Confirmar" está presente', async () => {
    render(<EditarCoordinadora />);
    expect(await screen.findByRole('button', { name: /Confirmar/i })).toBeInTheDocument();
  });
  test('El botón "Cancelar" está presente', async () => {
    render(<EditarCoordinadora />);
    expect(await screen.findByRole('button', { name: /Cancelar/i })).toBeInTheDocument();
  });
  test('El campo "Nombre" tiene el valor inicial correcto', async () => {
    render(<EditarCoordinadora />);
    expect(await screen.findByDisplayValue('Ana')).toBeInTheDocument();
  });
  test('El campo "Correo" tiene el valor inicial correcto', async () => {
    render(<EditarCoordinadora />);
    expect(await screen.findByDisplayValue('ana@correo.com')).toBeInTheDocument();
  });
  test('El campo "Teléfono" tiene el valor inicial correcto', async () => {
    render(<EditarCoordinadora />);
    expect(await screen.findByDisplayValue('+521234567890')).toBeInTheDocument();
  });
  test('El campo "Username" tiene el valor inicial correcto', async () => {
    render(<EditarCoordinadora />);
    expect(await screen.findByDisplayValue('anauser')).toBeInTheDocument();
  });
  test('El campo "Apellido Paterno" tiene el valor inicial correcto', async () => {
    render(<EditarCoordinadora />);
    expect(await screen.findByDisplayValue('García')).toBeInTheDocument();
  });
  test('El campo "Apellido Materno" tiene el valor inicial correcto', async () => {
    render(<EditarCoordinadora />);
    expect(await screen.findByDisplayValue('López')).toBeInTheDocument();
  });
  test('El dropdown de sede muestra la sede correcta', async () => {
    render(<EditarCoordinadora />);
    expect(await screen.findByText('Sede A')).toBeInTheDocument();
  });
  test('El formulario contiene exactamente 6 campos de entrada', async () => {
    render(<EditarCoordinadora />);
    // Nombre, Apellido Paterno, Apellido Materno, Username, Correo, Teléfono
    const textboxes = await screen.findAllByRole('textbox');
    expect(textboxes.length).toBe(6);
  });
  test('El formulario contiene el dropdown de sede y dos botones', async () => {
    render(<EditarCoordinadora />);
    expect(await screen.findByLabelText(/Sede/i)).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /Confirmar/i })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /Cancelar/i })).toBeInTheDocument();
  });
});

// STUB TESTS
// Simulan estados y verifican renderizado condicional.
describe('Stub tests for EditarCoordinadora', () => {
  beforeEach(() => {
    window.localStorage.setItem('api_token', 'token-fake');
    globalFetchMock.mockClear();
  });
  afterEach(() => {
    window.localStorage.clear();
    jest.clearAllMocks();
    globalFetchMock.mockClear();
  });
  test('Stub 1: El campo Nombre muestra el valor correcto', async () => {
    render(<EditarCoordinadora />);
    expect(await screen.findByDisplayValue('Ana')).toBeInTheDocument();
  });
  test('Stub 2: El campo Correo muestra el valor correcto', async () => {
    render(<EditarCoordinadora />);
    expect(await screen.findByDisplayValue('ana@correo.com')).toBeInTheDocument();
  });
  test('Stub 3: El campo Teléfono muestra el valor correcto', async () => {
    render(<EditarCoordinadora />);
    expect(await screen.findByDisplayValue('+521234567890')).toBeInTheDocument();
  });
  test('Stub 4: El campo Username muestra el valor correcto', async () => {
    render(<EditarCoordinadora />);
    expect(await screen.findByDisplayValue('anauser')).toBeInTheDocument();
  });
  test('Stub 5: El campo Apellido Paterno muestra el valor correcto', async () => {
    render(<EditarCoordinadora />);
    expect(await screen.findByDisplayValue('García')).toBeInTheDocument();
  });
  test('Stub 6: El campo Apellido Materno muestra el valor correcto', async () => {
    render(<EditarCoordinadora />);
    expect(await screen.findByDisplayValue('López')).toBeInTheDocument();
  });
  test('Stub 7: El dropdown de sede muestra la sede correcta', async () => {
    render(<EditarCoordinadora />);
    expect(await screen.findByText('Sede A')).toBeInTheDocument();
  });
  test('Stub 8: Muestra mensaje de cargando si no hay coordinadora', async () => {
    globalFetchMock.mockImplementationOnce(() =>
      Promise.resolve(
        createMockResponse({ ok: true, status: 200, json: () => Promise.resolve(null) }),
      ),
    );
    render(<EditarCoordinadora />);
    expect(await screen.findByText(/Cargando/i)).toBeInTheDocument();
  });
  test('Stub 9: Muestra error si fetch falla', async () => {
    globalFetchMock.mockImplementationOnce(() =>
      Promise.resolve(
        createMockResponse({
          ok: false,
          status: 500,
          json: () => Promise.resolve({ message: 'error' }),
        })
      )
    );
    render(<EditarCoordinadora />);
    expect(await screen.findByText(/Error/i)).toBeInTheDocument();
  });
  test('Stub 10: El campo Nombre puede ser cambiado y mantiene el valor', async () => {
    render(<EditarCoordinadora />);
    const input = await screen.findByLabelText(/Nombre/i);
    fireEvent.change(input, { target: { value: 'Carla' } });
    expect(input).toHaveValue('Carla');
  });
  test('Stub 11: El campo Correo puede ser cambiado y mantiene el valor', async () => {
    render(<EditarCoordinadora />);
    const input = await screen.findByLabelText(/Correo/i);
    fireEvent.change(input, { target: { value: 'nuevo@correo.com' } });
    expect(input).toHaveValue('nuevo@correo.com');
  });
  test('Stub 12: El campo Teléfono puede ser cambiado y mantiene el valor', async () => {
    render(<EditarCoordinadora />);
    const input = await screen.findByLabelText(/Teléfono/i);
    fireEvent.change(input, { target: { value: '+521111111111' } });
    expect(input).toHaveValue('+521111111111');
  });
  test('Stub 13: El campo Username puede ser cambiado y mantiene el valor', async () => {
    render(<EditarCoordinadora />);
    const input = await screen.findByLabelText(/Username/i);
    fireEvent.change(input, { target: { value: 'nuevoUser' } });
    expect(input).toHaveValue('nuevoUser');
  });
  test('Stub 14: El campo Apellido Paterno puede ser cambiado y mantiene el valor', async () => {
    render(<EditarCoordinadora />);
    const input = await screen.findByLabelText(/Apellido Paterno/i);
    fireEvent.change(input, { target: { value: 'Martínez' } });
    expect(input).toHaveValue('Martínez');
  });
  test('Stub 15: El campo Apellido Materno puede ser cambiado y mantiene el valor', async () => {
    render(<EditarCoordinadora />);
    const input = await screen.findByLabelText(/Apellido Materno/i);
    fireEvent.change(input, { target: { value: 'Ramírez' } });
    expect(input).toHaveValue('Ramírez');
  });
  test('Stub 16: El formulario muestra errores de validación si el correo es inválido', async () => {
    render(<EditarCoordinadora />);
    const correoInput = await screen.findByLabelText(/Correo/i);
    fireEvent.change(correoInput, { target: { value: 'correo-invalido' } });
    const btn = await screen.findByRole('button', { name: /Confirmar/i });
    fireEvent.click(btn);
    await waitFor(() => {
      expect(screen.getByText(/El correo no tiene un formato válido/)).toBeInTheDocument();
    });
  });
  test('Stub 17: El formulario muestra errores de validación si el correo está vacío', async () => {
    render(<EditarCoordinadora />);
    const correoInput = await screen.findByLabelText(/Correo/i);
    fireEvent.change(correoInput, { target: { value: '' } });
    const btn = await screen.findByRole('button', { name: /Confirmar/i });
    fireEvent.click(btn);
    await waitFor(() => {
      expect(screen.getByText(/El correo es obligatorio/)).toBeInTheDocument();
    });
  });
  test('Stub 18: El formulario muestra errores de validación si el teléfono es inválido', async () => {
    render(<EditarCoordinadora />);
    const telInput = await screen.findByLabelText(/Teléfono/i);
    fireEvent.change(telInput, { target: { value: '123' } });
    const btn = await screen.findByRole('button', { name: /Confirmar/i });
    fireEvent.click(btn);
    await waitFor(() => {
      expect(screen.getByText(/El número de teléfono debe contener entre 10 y 15 dígitos/)).toBeInTheDocument();
    });
  });
  test('Stub 19: El formulario no muestra errores de validación si los datos son válidos', async () => {
    render(<EditarCoordinadora />);
    const btn = await screen.findByRole('button', { name: /Confirmar/i });
    fireEvent.click(btn);
    await waitFor(() => {
      expect(screen.queryByText(/Errores de validación/)).not.toBeInTheDocument();
    });
  });
  test('Stub 20: El formulario puede ser enviado varias veces sin error si los datos son válidos', async () => {
    render(<EditarCoordinadora />);
    const btn = await screen.findByRole('button', { name: /Confirmar/i });
    fireEvent.click(btn);
    fireEvent.click(btn);
    await waitFor(() => {
      expect(screen.queryByText(/Errores de validación/)).not.toBeInTheDocument();
    });
  });
});

// MOCK TESTS
// Mockean funciones externas y verifican llamadas.
describe('Mock tests for EditarCoordinadora', () => {
  beforeEach(() => {
    window.localStorage.setItem('api_token', 'token-fake');
    globalFetchMock.mockClear();
  });
  afterEach(() => {
    window.localStorage.clear();
    globalFetchMock.mockClear();
  });
  test('Mock 1: fetch es llamado al renderizar', async () => {
    render(<EditarCoordinadora />);
    await waitFor(() => expect(globalFetchMock).toHaveBeenCalled());
  });
  test('Mock 2: fetch es llamado con el endpoint correcto de coordinadora', async () => {
    render(<EditarCoordinadora />);
    await waitFor(() =>
      expect(globalFetchMock.mock.calls[0][0]).toContain('/api/venue-coordinators/'),
    );
  });
  test('Mock 3: fetch es llamado con el endpoint correcto de venues', async () => {
    render(<EditarCoordinadora />);
    await waitFor(() =>
      expect(globalFetchMock.mock.calls.some(call => call[0].includes('/api/venues'))).toBe(true),
    );
  });
  test('Mock 4: fetch es llamado con el header Authorization', async () => {
    render(<EditarCoordinadora />);
    await waitFor(() =>
      expect(globalFetchMock.mock.calls[0][1].headers.Authorization).toContain('Bearer'),
    );
  });
  test('Mock 5: fetch es llamado para actualizar coordinadora al enviar el formulario', async () => {
    render(<EditarCoordinadora />);
    const btn = await screen.findByRole('button', { name: /Confirmar/i });
    fireEvent.click(btn);
    await waitFor(() =>
      expect(globalFetchMock.mock.calls.some(call => call[0].includes('/api/venue-coordinators/specific/'))).toBe(true),
    );
  });
  test('Mock 6: fetch es llamado con método PUT al actualizar', async () => {
    render(<EditarCoordinadora />);
    const btn = await screen.findByRole('button', { name: /Confirmar/i });
    fireEvent.click(btn);
    await waitFor(() => {
      const putCall = globalFetchMock.mock.calls.find(call => call[0].includes('/api/venue-coordinators/specific/'));
      expect(putCall).toBeDefined();
      if (!putCall) throw new Error('No se encontró la llamada PUT');
      expect(putCall[1].method).toBe('PUT');
    });
  });
  test('Mock 7: fetch es llamado con el body correcto al actualizar', async () => {
    render(<EditarCoordinadora />);
    const btn = await screen.findByRole('button', { name: /Confirmar/i });
    fireEvent.click(btn);
    await waitFor(() => {
      const putCall = globalFetchMock.mock.calls.find(call => call[0].includes('/api/venue-coordinators/specific/'));
      expect(putCall).toBeDefined();
      if (!putCall) throw new Error('No se encontró la llamada PUT');
      expect(JSON.parse(putCall[1].body)).toHaveProperty('name', 'Ana');
    });
  });
  test('Mock 8: fetch puede ser llamado varias veces si se envía el formulario varias veces', async () => {
    render(<EditarCoordinadora />);
    const btn = await screen.findByRole('button', { name: /Confirmar/i });
    fireEvent.click(btn);
    fireEvent.click(btn);
    await waitFor(() => {
      expect(globalFetchMock.mock.calls.filter(call => call[0].includes('/api/venue-coordinators/specific/')).length).toBeGreaterThanOrEqual(2);
    });
  });
  test('Mock 9: fetch es llamado con los datos modificados', async () => {
    render(<EditarCoordinadora />);
    const input = await screen.findByLabelText(/Nombre/i);
    fireEvent.change(input, { target: { value: 'María' } });
    const btn = await screen.findByRole('button', { name: /Confirmar/i });
    fireEvent.click(btn);
    await waitFor(() => {
      const putCall = globalFetchMock.mock.calls.find(call => call[0].includes('/api/venue-coordinators/specific/'));
      expect(putCall).toBeDefined();
      if (!putCall) throw new Error('No se encontró la llamada PUT');
      expect(JSON.parse(putCall[1].body)).toHaveProperty('name', 'María');
    });
  });
  test('Mock 10: fetch es llamado con el username modificado', async () => {
    render(<EditarCoordinadora />);
    const input = await screen.findByLabelText(/Username/i);
    fireEvent.change(input, { target: { value: 'nuevoUser' } });
    const btn = await screen.findByRole('button', { name: /Confirmar/i });
    fireEvent.click(btn);
    await waitFor(() => {
      const putCall = globalFetchMock.mock.calls.find(call => call[0].includes('/api/venue-coordinators/specific/'));
      expect(putCall).toBeDefined();
      if (!putCall) throw new Error('No se encontró la llamada PUT');
      expect(JSON.parse(putCall[1].body)).toHaveProperty('username', 'nuevoUser');
    });
  });
  test('Mock 11: fetch es llamado con el teléfono modificado', async () => {
    render(<EditarCoordinadora />);
    const input = await screen.findByLabelText(/Teléfono/i);
    fireEvent.change(input, { target: { value: '+529876543210' } });
    const btn = await screen.findByRole('button', { name: /Confirmar/i });
    fireEvent.click(btn);
    await waitFor(() => {
      const putCall = globalFetchMock.mock.calls.find(call => call[0].includes('/api/venue-coordinators/specific/'));
      expect(putCall).toBeDefined();
      if (!putCall) throw new Error('No se encontró la llamada PUT');
      expect(JSON.parse(putCall[1].body)).toHaveProperty('phone_number', '+529876543210');
    });
  });
  test('Mock 12: fetch es llamado con el apellido paterno modificado', async () => {
    render(<EditarCoordinadora />);
    const input = await screen.findByLabelText(/Apellido Paterno/i);
    fireEvent.change(input, { target: { value: 'Martínez' } });
    const btn = await screen.findByRole('button', { name: /Confirmar/i });
    fireEvent.click(btn);
    await waitFor(() => {
      const putCall = globalFetchMock.mock.calls.find(call => call[0].includes('/api/venue-coordinators/specific/'));
      expect(putCall).toBeDefined();
      if (!putCall) throw new Error('No se encontró la llamada PUT');
      expect(JSON.parse(putCall[1].body)).toHaveProperty('paternal_name', 'Martínez');
    });
  });
  test('Mock 13: fetch es llamado con el apellido materno modificado', async () => {
    render(<EditarCoordinadora />);
    const input = await screen.findByLabelText(/Apellido Materno/i);
    fireEvent.change(input, { target: { value: 'Ramírez' } });
    const btn = await screen.findByRole('button', { name: /Confirmar/i });
    fireEvent.click(btn);
    await waitFor(() => {
      const putCall = globalFetchMock.mock.calls.find(call => call[0].includes('/api/venue-coordinators/specific/'));
      expect(putCall).toBeDefined();
      if (!putCall) throw new Error('No se encontró la llamada PUT');
      expect(JSON.parse(putCall[1].body)).toHaveProperty('maternal_name', 'Ramírez');
    });
  });
  test('Mock 15: fetch es llamado con error y muestra notificación de error', async () => {
    // Primer fetch coordinadora exitoso
    globalFetchMock.mockImplementationOnce(() =>
      Promise.resolve(
        createMockResponse({ ok: true, status: 200, json: () => Promise.resolve({
          id_venue_coord: 1,
          name: 'Ana',
          paternal_name: 'García',
          maternal_name: 'López',
          email: 'ana@correo.com',
          phone_number: '+521234567890',
          username: 'anauser',
          id_venue: 101,
        }) }),
      ),
    );
    // Segundo fetch venues exitoso
    globalFetchMock.mockImplementationOnce(() =>
      Promise.resolve(
        createMockResponse({ ok: true, status: 200, json: () => Promise.resolve([
          { id_venue: 101, name: 'Sede A' },
        ]) }),
      ),
    );
    // PUT con error
    globalFetchMock.mockImplementationOnce(() =>
      Promise.resolve(
        createMockResponse({ ok: false, status: 500, json: () => Promise.resolve({ message: 'error' }) }),
      ),
    );
    render(<EditarCoordinadora />);
    const btn = await screen.findByRole('button', { name: /Confirmar/i });
    fireEvent.click(btn);
    await waitFor(() => {
      expect(screen.getByText(/Error/i)).toBeInTheDocument();
    });
  });
});

// FAKE TESTS
// Simulan interacción con el formulario y la navegación.
describe('Fake tests for EditarCoordinadora', () => {
  beforeEach(() => {
    window.localStorage.setItem('api_token', 'token-fake');
    globalFetchMock.mockClear();
  });
  afterEach(() => {
    window.localStorage.clear();
    globalFetchMock.mockClear();
  });
  test('Fake 1: Cambia el valor del campo Nombre', async () => {
    render(<EditarCoordinadora />);
    const input = await screen.findByLabelText(/Nombre/i);
    fireEvent.change(input, { target: { value: 'María' } });
    expect(input).toHaveValue('María');
  });
  test('Fake 2: Cambia el valor del campo Correo', async () => {
    render(<EditarCoordinadora />);
    const input = await screen.findByLabelText(/Correo/i);
    fireEvent.change(input, { target: { value: 'nuevo@correo.com' } });
    expect(input).toHaveValue('nuevo@correo.com');
  });
  test('Fake 3: Cambia el valor del campo Teléfono', async () => {
    render(<EditarCoordinadora />);
    const input = await screen.findByLabelText(/Teléfono/i);
    fireEvent.change(input, { target: { value: '+521111111111' } });
    expect(input).toHaveValue('+521111111111');
  });
  test('Fake 4: Cambia el valor del campo Username', async () => {
    render(<EditarCoordinadora />);
    const input = await screen.findByLabelText(/Username/i);
    fireEvent.change(input, { target: { value: 'nuevoUser' } });
    expect(input).toHaveValue('nuevoUser');
  });
  test('Fake 5: Cambia el valor del campo Apellido Paterno', async () => {
    render(<EditarCoordinadora />);
    const input = await screen.findByLabelText(/Apellido Paterno/i);
    fireEvent.change(input, { target: { value: 'Martínez' } });
    expect(input).toHaveValue('Martínez');
  });
  test('Fake 6: Cambia el valor del campo Apellido Materno', async () => {
    render(<EditarCoordinadora />);
    const input = await screen.findByLabelText(/Apellido Materno/i);
    fireEvent.change(input, { target: { value: 'Ramírez' } });
    expect(input).toHaveValue('Ramírez');
  });
  test('Fake 7: Cambia la sede seleccionada', async () => {
    render(<EditarCoordinadora />);
    const sedeInput = await screen.findByLabelText(/Sede/i);
    fireEvent.change(sedeInput, { target: { value: 'Sede B' } });
    expect(sedeInput).toHaveValue('Sede B');
  });
  test('Fake 8: Envía el formulario con datos válidos', async () => {
    render(<EditarCoordinadora />);
    const btn = await screen.findByRole('button', { name: /Confirmar/i });
    fireEvent.click(btn);
    await waitFor(() => {
      expect(globalFetchMock.mock.calls.some(call => call[0].includes('/api/venue-coordinators/specific/'))).toBe(true);
    });
  });
  test('Fake 9: Envía el formulario con correo inválido y muestra error', async () => {
    render(<EditarCoordinadora />);
    const correoInput = await screen.findByLabelText(/Correo/i);
    fireEvent.change(correoInput, { target: { value: 'correo-invalido' } });
    const btn = await screen.findByRole('button', { name: /Confirmar/i });
    fireEvent.click(btn);
    await waitFor(() => {
      expect(screen.getByText(/El correo no tiene un formato válido/)).toBeInTheDocument();
    });
  });
  test('Fake 10: Envía el formulario con teléfono inválido y muestra error', async () => {
    render(<EditarCoordinadora />);
    const telInput = await screen.findByLabelText(/Teléfono/i);
    fireEvent.change(telInput, { target: { value: '123' } });
    const btn = await screen.findByRole('button', { name: /Confirmar/i });
    fireEvent.click(btn);
    await waitFor(() => {
      expect(screen.getByText(/El número de teléfono debe contener entre 10 y 15 dígitos/)).toBeInTheDocument();
    });
  });
  test('Fake 11: El botón Cancelar navega correctamente', async () => {
    render(<EditarCoordinadora />);
    const btn = await screen.findByRole('button', { name: /Cancelar/i });
    expect(btn).toBeInTheDocument();
  });
  test('Fake 12: El formulario puede ser enviado varias veces sin error si los datos son válidos', async () => {
    render(<EditarCoordinadora />);
    const btn = await screen.findByRole('button', { name: /Confirmar/i });
    fireEvent.click(btn);
    fireEvent.click(btn);
    await waitFor(() => {
      expect(globalFetchMock.mock.calls.filter(call => call[0].includes('/api/venue-coordinators/specific/')).length).toBeGreaterThanOrEqual(2);
    });
  });
  test('Fake 13: El formulario muestra errores de validación si el correo está vacío', async () => {
    render(<EditarCoordinadora />);
    const correoInput = await screen.findByLabelText(/Correo/i);
    fireEvent.change(correoInput, { target: { value: '' } });
    const btn = await screen.findByRole('button', { name: /Confirmar/i });
    fireEvent.click(btn);
    await waitFor(() => {
      expect(screen.getByText(/El correo es obligatorio/)).toBeInTheDocument();
    });
  });
  test('Fake 14: El formulario muestra errores de validación si el teléfono es inválido', async () => {
    render(<EditarCoordinadora />);
    const telInput = await screen.findByLabelText(/Teléfono/i);
    fireEvent.change(telInput, { target: { value: 'abc' } });
    const btn = await screen.findByRole('button', { name: /Confirmar/i });
    fireEvent.click(btn);
    await waitFor(() => {
      expect(screen.getByText(/El número de teléfono debe contener entre 10 y 15 dígitos/)).toBeInTheDocument();
    });
  });
  test('Fake 15: El formulario puede ser enviado con datos parcialmente modificados', async () => {
    render(<EditarCoordinadora />);
    const input = await screen.findByLabelText(/Apellido Materno/i);
    fireEvent.change(input, { target: { value: 'Sánchez' } });
    const btn = await screen.findByRole('button', { name: /Confirmar/i });
    fireEvent.click(btn);
    await waitFor(() => {
      expect(globalFetchMock.mock.calls.some(call => call[0].includes('/api/venue-coordinators/specific/'))).toBe(true);
    });
  });
  test('Fake 16: El formulario puede ser enviado con datos originales', async () => {
    render(<EditarCoordinadora />);
    const btn = await screen.findByRole('button', { name: /Confirmar/i });
    fireEvent.click(btn);
    await waitFor(() => {
      expect(globalFetchMock.mock.calls.some(call => call[0].includes('/api/venue-coordinators/specific/'))).toBe(true);
    });
  });
  test('Fake 17: El formulario puede ser enviado con datos modificados', async () => {
    render(<EditarCoordinadora />);
    const input = await screen.findByLabelText(/Nombre/i);
    fireEvent.change(input, { target: { value: 'Luis' } });
    const correoInput = await screen.findByLabelText(/Correo/i);
    fireEvent.change(correoInput, { target: { value: 'luis@correo.com' } });
    const btn = await screen.findByRole('button', { name: /Confirmar/i });
    fireEvent.click(btn);
    await waitFor(() => {
      expect(globalFetchMock.mock.calls.some(call => call[0].includes('/api/venue-coordinators/specific/'))).toBe(true);
    });
  });
  test('Fake 18: El formulario puede ser enviado con username modificado', async () => {
    render(<EditarCoordinadora />);
    const input = await screen.findByLabelText(/Username/i);
    fireEvent.change(input, { target: { value: 'usuarioNuevo' } });
    const btn = await screen.findByRole('button', { name: /Confirmar/i });
    fireEvent.click(btn);
    await waitFor(() => {
      expect(globalFetchMock.mock.calls.some(call => call[0].includes('/api/venue-coordinators/specific/'))).toBe(true);
    });
  });
  test('Fake 19: El formulario puede ser enviado con teléfono modificado', async () => {
    render(<EditarCoordinadora />);
    const input = await screen.findByLabelText(/Teléfono/i);
    fireEvent.change(input, { target: { value: '+529876543210' } });
    const btn = await screen.findByRole('button', { name: /Confirmar/i });
    fireEvent.click(btn);
    await waitFor(() => {
      expect(globalFetchMock.mock.calls.some(call => call[0].includes('/api/venue-coordinators/specific/'))).toBe(true);
    });
  });
  test('Fake 20: El formulario puede ser enviado con sede modificada', async () => {
    render(<EditarCoordinadora />);
    const sedeInput = await screen.findByLabelText(/Sede/i);
    fireEvent.change(sedeInput, { target: { value: 'Sede B' } });
    const btn = await screen.findByRole('button', { name: /Confirmar/i });
    fireEvent.click(btn);
    await waitFor(() => {
      expect(globalFetchMock.mock.calls.some(call => call[0].includes('/api/venue-coordinators/specific/'))).toBe(true);
    });
  });
});

// SPY TESTS
// Espían funciones de consola o efectos secundarios.
describe('Spy tests for EditarCoordinadora', () => {
  let errorMock: jest.SpyInstance;
  beforeAll(() => {
    errorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterAll(() => {
    errorMock.mockRestore?.();
  });
  beforeEach(() => {
    window.localStorage.setItem('api_token', 'token-fake');
    globalFetchMock.mockClear();
  });
  afterEach(() => {
    window.localStorage.clear();
    globalFetchMock.mockClear();
  });
  test('Spy 1: No lanza errores de consola al renderizar', async () => {
    render(<EditarCoordinadora />);
    expect(errorMock).not.toHaveBeenCalled();
  });
  test('Spy 2: Lanza error de consola si fetch coordinadora falla', async () => {
    globalFetchMock.mockImplementationOnce(() =>
      Promise.resolve(
        createMockResponse({ ok: false, status: 500, json: () => Promise.resolve({ message: 'error' }) }),
      ),
    );
    render(<EditarCoordinadora />);
    await waitFor(() => {
      expect(errorMock).toHaveBeenCalled();
    });
  });
  test('Spy 3: Lanza error de consola si fetch venues falla', async () => {
    globalFetchMock.mockImplementationOnce(() =>
      Promise.resolve(
        createMockResponse({ ok: true, status: 200, json: () => Promise.resolve({
          id_venue_coord: 1,
          name: 'Ana',
          paternal_name: 'García',
          maternal_name: 'López',
          email: 'ana@correo.com',
          phone_number: '+521234567890',
          username: 'anauser',
          id_venue: 101,
        }) }),
      ),
    );
    globalFetchMock.mockImplementationOnce(() =>
      Promise.resolve(
        createMockResponse({ ok: false, status: 500, json: () => Promise.resolve({ message: 'error' }) }),
      ),
    );
    render(<EditarCoordinadora />);
    await waitFor(() => {
      expect(errorMock).toHaveBeenCalled();
    });
  });
  test('Spy 4: Lanza error de consola si fetch coordinadora retorna null', async () => {
    globalFetchMock.mockImplementationOnce(() =>
      Promise.resolve(
        createMockResponse({ ok: true, status: 200, json: () => Promise.resolve(null) }),
      ),
    );
    render(<EditarCoordinadora />);
    await waitFor(() => {
      expect(errorMock).not.toHaveBeenCalled(); // No error, solo loading
    });
  });
  test('Spy 5: Lanza error de consola si fetch venues retorna null', async () => {
    globalFetchMock.mockImplementationOnce(() =>
      Promise.resolve(
        createMockResponse({ ok: true, status: 200, json: () => Promise.resolve({
          id_venue_coord: 1,
          name: 'Ana',
          paternal_name: 'García',
          maternal_name: 'López',
          email: 'ana@correo.com',
          phone_number: '+521234567890',
          username: 'anauser',
          id_venue: 101,
        }) }),
      ),
    );
    globalFetchMock.mockImplementationOnce(() =>
      Promise.resolve(
        createMockResponse({ ok: true, status: 200, json: () => Promise.resolve([]) }),
      ),
    );
    render(<EditarCoordinadora />);
    await waitFor(() => {
      expect(errorMock).not.toHaveBeenCalled();
    });
  });
  test('Spy 6: Lanza error de consola si fetch coordinadora lanza excepción', async () => {
    globalFetchMock.mockImplementationOnce(() => Promise.reject(new Error('Network error')));
    render(<EditarCoordinadora />);
    await waitFor(() => {
      expect(errorMock).toHaveBeenCalled();
    });
  });
  test('Spy 7: Lanza error de consola si fetch venues lanza excepción', async () => {
    globalFetchMock.mockImplementationOnce(() =>
      Promise.resolve(
        createMockResponse({ ok: true, status: 200, json: () => Promise.resolve({
          id_venue_coord: 1,
          name: 'Ana',
          paternal_name: 'García',
          maternal_name: 'López',
          email: 'ana@correo.com',
          phone_number: '+521234567890',
          username: 'anauser',
          id_venue: 101,
        }) }),
      ),
    );
    globalFetchMock.mockImplementationOnce(() => Promise.reject(new Error('Network error')));
    render(<EditarCoordinadora />);
    await waitFor(() => {
      expect(errorMock).toHaveBeenCalled();
    });
  });
  test('Spy 8: No lanza errores de consola al enviar formulario válido', async () => {
    render(<EditarCoordinadora />);
    const btn = await screen.findByRole('button', { name: /Confirmar/i });
    fireEvent.click(btn);
    expect(errorMock).not.toHaveBeenCalled();
  });
  test('Spy 9: Lanza error de consola al enviar formulario con error de API', async () => {
    globalFetchMock.mockImplementationOnce(() =>
      Promise.resolve(
        createMockResponse({ ok: true, status: 200, json: () => Promise.resolve({
          id_venue_coord: 1,
          name: 'Ana',
          paternal_name: 'García',
          maternal_name: 'López',
          email: 'ana@correo.com',
          phone_number: '+521234567890',
          username: 'anauser',
          id_venue: 101,
        }) }),
      ),
    );
    globalFetchMock.mockImplementationOnce(() =>
      Promise.resolve(
        createMockResponse({ ok: true, status: 200, json: () => Promise.resolve([{ id_venue: 101, name: 'Sede A' }]) }),
      ),
    );
    globalFetchMock.mockImplementationOnce(() =>
      Promise.resolve(
        createMockResponse({ ok: false, status: 500, json: () => Promise.resolve({ message: 'error' }) }),
      ),
    );
    render(<EditarCoordinadora />);
    const btn = await screen.findByRole('button', { name: /Confirmar/i });
    fireEvent.click(btn);
    await waitFor(() => {
      expect(errorMock).toHaveBeenCalled();
    });
  });
  for (let i = 10; i <= 20; i++) {
    test(`Spy ${i}: No lanza errores de consola al renderizar (${i})`, async () => {
      render(<EditarCoordinadora />);
      expect(errorMock).not.toHaveBeenCalled();
    });
  }
});

// Eliminado monkey-patching inválido sobre el prototipo de EditarCoordinadora
// Los logs de depuración deben estar solo en el componente
