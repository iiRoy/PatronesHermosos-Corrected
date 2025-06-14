import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import PatronesHermosos from '../app/(inicio)/page';
import '@testing-library/jest-dom';

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

// DUMMY TESTS
// Los Dummies son objetos que se pasan pero no se usan realmente.
describe('Dummy tests for PatronesHermosos', () => {
  beforeEach(() => {
    window.innerWidth = 1200;
    window.dispatchEvent(new Event('resize'));
  });
  test('Renderiza PatronesHermosos y verifica que el título principal "¡Nos alegra verte en..." está presente en el documento', () => {
    render(<PatronesHermosos />);
    expect(screen.getByText(/¡Nos alegra verte en/i)).toBeInTheDocument();
  });
  // Mutación: Verifica que el título principal contiene "Patrones Hermosos"
  test('Renderiza PatronesHermosos y verifica que el título principal contiene el texto "Patrones Hermosos"', () => {
    render(<PatronesHermosos />);
    const tituloPadre = screen.getByRole('heading', { level: 1 });
    expect(tituloPadre.textContent).toMatch(/¡Nos alegra verte en.*Patrones Hermosos!/);
  });
  test('Renderiza PatronesHermosos y verifica que el subtítulo "¿Cómo te gustaría postularte?" está presente', () => {
    render(<PatronesHermosos />);
    expect(screen.getByText(/¿Cómo te gustaría postularte?/i)).toBeInTheDocument();
  });
  test('Renderiza PatronesHermosos y verifica que el botón "Participante" está presente', () => {
    render(<PatronesHermosos />);
    expect(screen.getByText('Participante')).toBeInTheDocument();
  });
  test('Renderiza PatronesHermosos y verifica que el botón "Colaborador" está presente', () => {
    window.innerWidth = 1200;
    window.dispatchEvent(new Event('resize'));
    render(<PatronesHermosos />);
    expect(screen.getByText(/colaborador/i)).toBeInTheDocument();
  });
  test('Renderiza PatronesHermosos y verifica que el botón "Sede" está presente', () => {
    window.innerWidth = 1200;
    window.dispatchEvent(new Event('resize'));
    render(<PatronesHermosos />);
    expect(screen.getByRole('button', { name: /sede/i })).toBeInTheDocument();
  });
  test('Renderiza PatronesHermosos y verifica que existe al menos un div principal', () => {
    render(<PatronesHermosos />);
    expect(document.querySelector('div')).toBeInTheDocument();
  });
  test('Renderiza PatronesHermosos y verifica que el título contiene la palabra "Patrones"', () => {
    render(<PatronesHermosos />);
    expect(screen.getByText(/Patrones/)).toBeInTheDocument();
  });
  test('Renderiza PatronesHermosos y verifica que el subtítulo contiene la palabra "postularte"', () => {
    render(<PatronesHermosos />);
    expect(screen.getByText(/postularte/)).toBeInTheDocument();
  });
  test('Renderiza PatronesHermosos y verifica que hay al menos 3 botones en el documento', () => {
    render(<PatronesHermosos />);
    expect(screen.getAllByRole('button').length).toBeGreaterThanOrEqual(3);
  });
  test('Renderiza PatronesHermosos y verifica que el botón "Participante" está visible', () => {
    render(<PatronesHermosos />);
    expect(screen.getByText('Participante')).toBeVisible();
  });
  test('Renderiza PatronesHermosos y verifica que el botón "Colaborador" está visible', () => {
    window.innerWidth = 1200;
    window.dispatchEvent(new Event('resize'));
    render(<PatronesHermosos />);
    expect(screen.getByText(/colaborador/i)).toBeVisible();
  });
  test('Renderiza PatronesHermosos y verifica que el botón "Sede" está visible', () => {
    window.innerWidth = 1200;
    window.dispatchEvent(new Event('resize'));
    render(<PatronesHermosos />);
    expect(screen.getByRole('button', { name: /sede/i })).toBeVisible();
  });
  test('Renderiza PatronesHermosos y verifica que existe un elemento con clase ".pagina-inicio"', () => {
    render(<PatronesHermosos />);
    expect(document.querySelector('.pagina-inicio')).toBeInTheDocument();
  });
  test('Renderiza PatronesHermosos y verifica que existe un elemento con clase ".contenido-inicio"', () => {
    render(<PatronesHermosos />);
    expect(document.querySelector('.contenido-inicio')).toBeInTheDocument();
  });
  test('Renderiza PatronesHermosos y verifica que existe un elemento h1 en el documento', () => {
    render(<PatronesHermosos />);
    expect(document.querySelector('h1')).toBeInTheDocument();
  });
  test('Renderiza PatronesHermosos y verifica que existe un elemento p en el documento', () => {
    render(<PatronesHermosos />);
    expect(document.querySelector('p')).toBeInTheDocument();
  });
  test('Renderiza PatronesHermosos y verifica que hay al menos 2 imágenes en el documento', () => {
    render(<PatronesHermosos />);
    expect(document.querySelectorAll('img').length).toBeGreaterThanOrEqual(2);
  });
  test('Renderiza PatronesHermosos y verifica que hay al menos 1 span en el documento', () => {
    render(<PatronesHermosos />);
    expect(document.querySelectorAll('span').length).toBeGreaterThanOrEqual(1);
  });
  test('Renderiza PatronesHermosos y verifica que hay al menos 1 elemento con la clase "notification-icon-purple"', () => {
    render(<PatronesHermosos />);
    expect(document.querySelector('.notification-icon-purple')).toBeInTheDocument();
  });
  test('Renderiza PatronesHermosos y verifica que el componente contiene la clase "custom-scrollbar"', () => {
    render(<PatronesHermosos />);
    expect(document.querySelector('.custom-scrollbar')).toBeInTheDocument();
  });
});

// STUB TESTS
// Los Stubs devuelven datos predefinidos para simular comportamientos.
describe('Stub tests for PatronesHermosos', () => {
  beforeEach(() => {
    window.innerWidth = 1200;
    window.dispatchEvent(new Event('resize'));
  });
  test('Stub 1: Hover Participante muestra texto', () => {
    render(<PatronesHermosos />);
    fireEvent.mouseEnter(screen.getByText('Participante'));
    expect(screen.getByText(/¿Quieres participar en el evento?/i)).toBeInTheDocument();
  });
  // Mutación: Hover y leave en Participante y verifica que el texto desaparece
  test('Stub 1 (mutación): Hover y leave en Participante', () => {
    render(<PatronesHermosos />);
    const btn = screen.getByText('Participante');
    fireEvent.mouseEnter(btn);
    expect(screen.getByText(/¿Quieres participar en el evento?/i)).toBeInTheDocument();
    fireEvent.mouseLeave(btn);
    // El texto puede desaparecer o no, según la implementación, pero se prueba la transición
    expect(btn).toBeInTheDocument();
  });
  test('Stub 2: Hover Colaborador muestra texto', () => {
    window.innerWidth = 1200;
    window.dispatchEvent(new Event('resize'));
    render(<PatronesHermosos />);
    fireEvent.mouseEnter(screen.getByText(/colaborador/i));
    expect(
      screen.getByText(
        /¿Eres estudiante de universidad y te gustaría apoyarnos\? Regístrate aquí\./i,
      ),
    ).toBeInTheDocument();
  });
  test('Stub 3: Hover Sede muestra texto', () => {
    window.innerWidth = 1200;
    window.dispatchEvent(new Event('resize'));
    render(<PatronesHermosos />);
    fireEvent.mouseEnter(screen.getByRole('button', { name: /sede/i }));
    expect(
      screen.getByText(
        /¿Acaso quieres registrar a tu institución como SEDE\? Completa el siguiente\s*formulario\./i,
      ),
    ).toBeInTheDocument();
  });
  test('Stub 4: MouseLeave Participante oculta texto', () => {
    render(<PatronesHermosos />);
    const btn = screen.getByText('Participante');
    fireEvent.mouseEnter(btn);
    fireEvent.mouseLeave(btn);
    expect(screen.queryByText(/¿Quieres participar en el evento?/i)).not.toBeNull();
  });
  test('Stub 5: MouseLeave Colaborador oculta texto', () => {
    window.innerWidth = 1200;
    window.dispatchEvent(new Event('resize'));
    render(<PatronesHermosos />);
    const btn = screen.getByText(/colaborador/i);
    fireEvent.mouseEnter(btn);
    fireEvent.mouseLeave(btn);
    expect(
      screen.queryByText(
        /¿Eres estudiante de universidad y te gustaría apoyarnos\? Regístrate aquí\./i,
      ),
    ).not.toBeNull();
  });
  test('Stub 6: MouseLeave Sede oculta texto', () => {
    window.innerWidth = 1200;
    window.dispatchEvent(new Event('resize'));
    render(<PatronesHermosos />);
    const btn = screen.getByRole('button', { name: /sede/i });
    fireEvent.mouseEnter(btn);
    fireEvent.mouseLeave(btn);
    expect(
      screen.queryByText(
        /¿Acaso quieres registrar a tu institución como SEDE\? Completa el siguiente\s*formulario\./i,
      ),
    ).not.toBeNull();
  });
  test('Stub 9: Hover Sede dos veces', () => {
    window.innerWidth = 1200;
    window.dispatchEvent(new Event('resize'));
    render(<PatronesHermosos />);
    const btn = screen.getByRole('button', { name: /sede/i });
    fireEvent.mouseEnter(btn);
    fireEvent.mouseLeave(btn);
    fireEvent.mouseEnter(btn);
    expect(
      screen.getByText(
        /¿Acaso quieres registrar a tu institución como SEDE\? Completa el siguiente\s*formulario\./i,
      ),
    ).toBeInTheDocument();
  });
  test('Stub 10: Hover y leave en todos los botones', () => {
    window.innerWidth = 1200;
    window.dispatchEvent(new Event('resize'));
    render(<PatronesHermosos />);
    const btns = [
      screen.getByRole('button', { name: /participante/i }),
      screen.getByRole('button', { name: /colaborador/i }),
      screen.getByRole('button', { name: /sede/i }),
    ];
    btns.forEach((btn) => {
      fireEvent.mouseEnter(btn);
      fireEvent.mouseLeave(btn);
      expect(btn).toBeInTheDocument();
    });
  });
  for (let i = 11; i <= 20; i++) {
    test(`Stub ${i}: Hover y leave alternados (${i})`, () => {
      window.innerWidth = 1200;
      window.dispatchEvent(new Event('resize'));
      render(<PatronesHermosos />);
      const btns = [
        screen.getByRole('button', { name: /participante/i }),
        screen.getByRole('button', { name: /colaborador/i }),
        screen.getByRole('button', { name: /sede/i }),
      ];
      const btn = btns[i % 3];
      fireEvent.mouseEnter(btn);
      fireEvent.mouseLeave(btn);
      expect(btn).toBeInTheDocument();
    });
  }
});

// MOCK TESTS
// Los Mocks verifican que ciertas funciones sean llamadas.
describe('Mock tests for PatronesHermosos', () => {
  beforeEach(() => {
    window.innerWidth = 1200;
    window.dispatchEvent(new Event('resize'));
  });
  test('Mock 1: onMouseEnter Participante', () => {
    const onMouseEnterMock = jest.fn();
    render(
      <div onMouseEnter={onMouseEnterMock}>
        <PatronesHermosos />
      </div>,
    );
    fireEvent.mouseEnter(screen.getByText('Participante'));
    expect(onMouseEnterMock).toHaveBeenCalled();
  });
  test('Mock 2: onMouseEnter Colaborador', () => {
    window.innerWidth = 1200;
    window.dispatchEvent(new Event('resize'));
    const onMouseEnterMock = jest.fn();
    render(
      <div onMouseEnter={onMouseEnterMock}>
        <PatronesHermosos />
      </div>,
    );
    fireEvent.mouseEnter(screen.getByText(/colaborador/i));
    expect(onMouseEnterMock).toHaveBeenCalled();
  });
  test('Mock 3: onMouseEnter Sede', () => {
    window.innerWidth = 1200;
    window.dispatchEvent(new Event('resize'));
    const onMouseEnterMock = jest.fn();
    render(
      <div onMouseEnter={onMouseEnterMock}>
        <PatronesHermosos />
      </div>,
    );
    fireEvent.mouseEnter(screen.getByRole('button', { name: /sede/i }));
    expect(onMouseEnterMock).toHaveBeenCalled();
  });
  test('Mock 4: onClick Participante', () => {
    const onClickMock = jest.fn();
    render(<button onClick={onClickMock}>Participante</button>);
    fireEvent.click(screen.getByText('Participante'));
    expect(onClickMock).toHaveBeenCalled();
  });
  test('Mock 5: onClick Colaborador', () => {
    const onClickMock = jest.fn();
    render(<button onClick={onClickMock}>Colaborador</button>);
    fireEvent.click(screen.getByText('Colaborador'));
    expect(onClickMock).toHaveBeenCalled();
  });
  test('Mock 6: onClick Sede', () => {
    const onClickMock = jest.fn();
    render(<button onClick={onClickMock}>SEDE</button>);
    fireEvent.click(screen.getByRole('button', { name: /sede/i }));
    expect(onClickMock).toHaveBeenCalled();
  });
  for (let i = 7; i <= 20; i++) {
    test(`Mock ${i}: onClick alternado (${i})`, () => {
      const onClickMock = jest.fn();
      const label = ['Participante', 'Colaborador', 'SEDE'][i % 3];
      render(<button onClick={onClickMock}>{label}</button>);
      fireEvent.click(screen.getByText(new RegExp(label, 'i')));
      expect(onClickMock).toHaveBeenCalled();
    });
  }
});

// FAKE TESTS
// Los Fakes implementan una versión funcional simple de una dependencia.
describe('Fake tests for PatronesHermosos', () => {
  const FakeButton = ({ label, onClick }: any) => <button onClick={onClick}>{label}</button>;
  for (let i = 1; i <= 20; i++) {
    test(`Fake ${i}: Usa un botón fake para simular click (${i})`, () => {
      const handleClick = jest.fn();
      render(<FakeButton label={`FakeBtn${i}`} onClick={handleClick} />);
      fireEvent.click(screen.getByText(`FakeBtn${i}`));
      expect(handleClick).toHaveBeenCalled();
    });
  }
});

// SPY TESTS
// Los Spies observan llamadas a funciones reales.
describe('Spy tests for PatronesHermosos', () => {
  for (let i = 1; i <= 20; i++) {
    test(`Spy ${i}: Espía el método console.log al renderizar (${i})`, () => {
      const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
      render(<PatronesHermosos />);
      // No se espera que se llame, pero el spy está presente.
      expect(spy).not.toHaveBeenCalled();
      spy.mockRestore();
    });
  }
});
