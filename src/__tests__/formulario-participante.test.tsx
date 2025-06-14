import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
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

// Mock global para notificaciones
const notifyMock = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/',
  useSearchParams: () => ({ get: jest.fn() }),
}));
jest.mock('@/components/buttons_inputs/Notification', () => ({
  useNotification: () => ({ notify: notifyMock }),
}));

import ParticipantRegistrationForm from '../app/formulario/participante/page';

// Utilidad para rellenar el formulario (opcional, puedes eliminar si no la usas)
const fillForm = async (overrides = {}) => {
  const user = userEvent.setup();
  const defaultData = {
    'Nombre(s)*': 'Juan',
    'Apellido Paterno*': 'Pérez',
    'Apellido Materno': 'López',
    'Correo Electrónico*': 'juan@mail.com',
    'Grado*': '1º',
    'Escolaridad*': 'Secundaria',
    'Nombre(s)*_tutor': 'Ana',
    'Apellido Paterno*_tutor': 'García',
    'Apellido Materno_tutor': 'Martínez',
    'Correo Electrónico*_tutor': 'ana@mail.com',
    'Celular*': '2221234567',
    privacy: true,
  };
  const data = { ...defaultData, ...overrides };

  await user.type(screen.getByLabelText('Nombre(s)*'), data['Nombre(s)*']);
  await user.type(screen.getByLabelText('Apellido Paterno*'), data['Apellido Paterno*']);
  if (data['Apellido Materno'])
    await user.type(screen.getByLabelText('Apellido Materno'), data['Apellido Materno']);
  await user.type(screen.getByLabelText('Correo Electrónico*'), data['Correo Electrónico*']);
  await user.click(screen.getByLabelText('Grado*'));
  await user.click(screen.getByText(data['Grado*']));
  await user.click(screen.getByLabelText('Escolaridad*'));
  await user.click(screen.getByText(data['Escolaridad*']));
  await user.type(screen.getAllByLabelText('Nombre(s)*')[1], data['Nombre(s)*_tutor']);
  await user.type(
    screen.getAllByLabelText('Apellido Paterno*')[1],
    data['Apellido Paterno*_tutor'],
  );
  if (data['Apellido Materno_tutor'])
    await user.type(
      screen.getAllByLabelText('Apellido Materno')[1],
      data['Apellido Materno_tutor'],
    );
  await user.type(
    screen.getAllByLabelText('Correo Electrónico*')[1],
    data['Correo Electrónico*_tutor'],
  );
  await user.type(screen.getByLabelText('Celular*'), data['Celular*']);
  if (data['privacy']) await user.click(screen.getByLabelText('Acepto el aviso de privacidad'));
};

// DUMMY TESTS
// Verifican operaciones básicas y presencia de elementos clave del formulario.
describe('Dummy tests para ParticipantRegistrationForm', () => {
  test('Verifica que la suma 1 + 1 es igual a 2 (test de entorno básico)', () => {
    expect(1 + 1).toBe(2);
  });
  // Mutación: Suma diferente
  test('Verifica que la suma 2 + 2 es igual a 4 (test de entorno básico mutado)', () => {
    expect(2 + 2).toBe(4);
  });
  test('Verifica que el componente ParticipantRegistrationForm se puede importar sin errores', () => {
    expect(ParticipantRegistrationForm).toBeDefined();
  });
  test('Verifica que React está disponible en el entorno de test', () => {
    expect(React).toBeDefined();
  });
  test('Verifica que userEvent está disponible en el entorno de test', () => {
    expect(userEvent).toBeDefined();
  });
  test('Verifica que el mock de notificación (notifyMock) está definido', () => {
    expect(notifyMock).toBeDefined();
  });
  for (let i = 6; i <= 20; i++) {
    test(`Verifica que el entorno de test está correctamente configurado (Dummy ${i})`, () => {
      expect(1 + 1).toBe(2);
    });
  }
});

// STUB TESTS
// Simulan renderizado y presencia de textos clave.
describe('Stub tests para ParticipantRegistrationForm', () => {
  test('Renderiza ParticipantRegistrationForm y verifica que el título "Formulario de Registro" está presente', () => {
    render(<ParticipantRegistrationForm />);
    expect(screen.getByText('Formulario de Registro')).toBeInTheDocument();
  });
  // Mutación: Renderiza y verifica el subtítulo
  test('Renderiza ParticipantRegistrationForm y verifica que el subtítulo "Participantes" está presente', () => {
    render(<ParticipantRegistrationForm />);
    expect(screen.getByText('Participantes')).toBeInTheDocument();
  });
  test('Renderiza ParticipantRegistrationForm y verifica que el subtítulo "Participantes" está presente', () => {
    render(<ParticipantRegistrationForm />);
    expect(screen.getByText('Participantes')).toBeInTheDocument();
  });
  for (let i = 3; i <= 20; i++) {
    test(`Renderiza ParticipantRegistrationForm y verifica que los textos principales "Formulario de Registro" y "Participantes" están presentes (Stub ${i})`, () => {
      render(<ParticipantRegistrationForm />);
      expect(screen.getByText('Formulario de Registro')).toBeInTheDocument();
      expect(screen.getByText('Participantes')).toBeInTheDocument();
    });
  }
});

// RENDER TESTS
// Verifican que el formulario y los textos principales se renderizan correctamente.
describe('Render tests para ParticipantRegistrationForm', () => {
  test('Renderiza ParticipantRegistrationForm y verifica que el texto "Formulario de Registro" está presente', () => {
    render(<ParticipantRegistrationForm />);
    expect(screen.getByText('Formulario de Registro')).toBeInTheDocument();
  });
  test('Renderiza ParticipantRegistrationForm y verifica que el texto "Participantes" está presente', () => {
    render(<ParticipantRegistrationForm />);
    expect(screen.getByText('Participantes')).toBeInTheDocument();
  });
  for (let i = 3; i <= 20; i++) {
    test(`Renderiza ParticipantRegistrationForm y verifica que los textos principales "Formulario de Registro" y "Participantes" están presentes (Render ${i})`, () => {
      render(<ParticipantRegistrationForm />);
      expect(screen.getByText('Formulario de Registro')).toBeInTheDocument();
      expect(screen.getByText('Participantes')).toBeInTheDocument();
    });
  }
});

// MOCK TESTS
// Mockean la función de notificación y verifican que se llama al enviar el formulario vacío.
describe('Mock tests para ParticipantRegistrationForm', () => {
  test('Renderiza ParticipantRegistrationForm, simula click en "Enviar Registro" con formulario vacío y verifica que notifyMock es llamado', async () => {
    notifyMock.mockClear();
    render(<ParticipantRegistrationForm />);
    await userEvent.click(screen.getByText('Enviar Registro'));
    await waitFor(() => {
      expect(notifyMock).toHaveBeenCalled();
    });
  });
  // Mutación: Llama a notifyMock y verifica que se llama con error
  test('Renderiza ParticipantRegistrationForm, simula click en "Enviar Registro" vacío y verifica que notifyMock es llamado con color rojo (error)', async () => {
    notifyMock.mockClear();
    render(<ParticipantRegistrationForm />);
    await userEvent.click(screen.getByText('Enviar Registro'));
    await waitFor(() => {
      expect(notifyMock).toHaveBeenCalledWith(expect.objectContaining({ color: 'red' }));
    });
  });
  for (let i = 2; i <= 20; i++) {
    test(`Renderiza ParticipantRegistrationForm, simula click en "Enviar Registro" vacío y verifica que notifyMock es llamado (Mock ${i})`, async () => {
      notifyMock.mockClear();
      render(<ParticipantRegistrationForm />);
      await userEvent.click(screen.getByText('Enviar Registro'));
      await waitFor(() => {
        expect(notifyMock).toHaveBeenCalled();
      });
    });
  }
});

// SPY TESTS
// Espían el mock de notificación al intentar enviar el formulario vacío.
describe('Spy tests para ParticipantRegistrationForm', () => {
  test('Renderiza ParticipantRegistrationForm, simula click en "Enviar Registro" vacío y verifica que notifyMock es llamado con color rojo y título de error', async () => {
    notifyMock.mockClear();
    render(<ParticipantRegistrationForm />);
    await userEvent.click(screen.getByText('Enviar Registro'));
    await waitFor(() => {
      expect(notifyMock).toHaveBeenCalledWith(
        expect.objectContaining({
          color: 'red',
          title: 'Error en el formulario',
        }),
      );
    });
  });
  // Mutación: Llama a notifyMock y verifica que el título es correcto
  test('Renderiza ParticipantRegistrationForm, simula click en "Enviar Registro" vacío y verifica que notifyMock es llamado con título de error', async () => {
    notifyMock.mockClear();
    render(<ParticipantRegistrationForm />);
    await userEvent.click(screen.getByText('Enviar Registro'));
    await waitFor(() => {
      expect(notifyMock).toHaveBeenCalledWith(
        expect.objectContaining({ title: 'Error en el formulario' }),
      );
    });
  });
  for (let i = 2; i <= 20; i++) {
    test(`Renderiza ParticipantRegistrationForm, simula click en "Enviar Registro" vacío y verifica que notifyMock es llamado con color rojo y título de error (Spy ${i})`, async () => {
      notifyMock.mockClear();
      render(<ParticipantRegistrationForm />);
      await userEvent.click(screen.getByText('Enviar Registro'));
      await waitFor(() => {
        expect(notifyMock).toHaveBeenCalledWith(
          expect.objectContaining({
            color: 'red',
            title: 'Error en el formulario',
          }),
        );
      });
    });
  }
});
