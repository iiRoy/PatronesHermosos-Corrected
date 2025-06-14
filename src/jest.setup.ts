// src/jest.setup.ts
import '@testing-library/jest-dom';
import 'whatwg-fetch';

// Polyfill global Response, Request y Headers para entorno Node
if (typeof global.Response === 'undefined') {
  global.Response = window.Response;
}
if (typeof global.Request === 'undefined') {
  global.Request = window.Request;
}
if (typeof global.Headers === 'undefined') {
  global.Headers = window.Headers;
}

// Mocks para los hooks de Next.js App Router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
    events: { on: jest.fn(), off: jest.fn(), emit: jest.fn() },
  }),
  usePathname: () => '/',
  useSearchParams: () => ({ get: jest.fn(), set: jest.fn() }),
  useParams: () => ({}),
  useSelectedLayoutSegments: () => [],
  useSelectedLayoutSegment: () => '',
  useTransition: () => ({
    isPending: false,
    startTransition: (fn: any) => fn(),
    triggerTransition: jest.fn(),
  }),
}));

// Mock global para window.matchMedia (soporte breakpoints Tailwind/Next.js en tests)
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches:
      query.includes('min-width: 1024px') ||
      query.includes('max-width: 1200px') ||
      window.innerWidth >= 1024,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  });
}

// Mock global para fetch en entorno de test (Node)
if (!global.fetch) {
  global.fetch = jest.fn((url, options) => {
    // Simula respuesta para /api/backup
    if (typeof url === 'string' && url.includes('/api/backup')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        statusText: 'OK',
        redirected: false,
        type: 'basic',
        url: '',
        clone: jest.fn(),
        body: null,
        bodyUsed: false,
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
        blob: () => Promise.resolve(new Blob([JSON.stringify({})], { type: 'application/zip' })),
        formData: () => Promise.resolve(new FormData()),
        json: () => Promise.resolve({ backup: true }),
        text: () => Promise.resolve(''),
        headers: {
          get: () => 'backup.zip',
          has: jest.fn(),
          forEach: jest.fn(),
          append: jest.fn(),
          delete: jest.fn(),
          entries: jest.fn(),
          keys: jest.fn(),
          values: jest.fn(),
        },
      } as unknown as Response);
    }
    // Mock genérico para otros fetch (simula Response)
    return Promise.resolve({
      ok: true,
      status: 200,
      statusText: 'OK',
      redirected: false,
      type: 'basic',
      url: '',
      clone: jest.fn(),
      body: null,
      bodyUsed: false,
      arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      blob: () => Promise.resolve(new Blob()),
      formData: () => Promise.resolve(new FormData()),
      json: () => Promise.resolve({}),
      text: () => Promise.resolve(''),
      headers: {
        get: jest.fn(),
        has: jest.fn(),
        forEach: jest.fn(),
        append: jest.fn(),
        delete: jest.fn(),
        entries: jest.fn(),
        keys: jest.fn(),
        values: jest.fn(),
      },
    } as unknown as Response);
  });
}

// Mock global para XMLHttpRequest en entorno de test (Node/jsdom)
// Incluye las propiedades y métodos más comunes para compatibilidad con TypeScript y jsdom
global.XMLHttpRequest = class {
  static UNSENT = 0;
  static OPENED = 1;
  static HEADERS_RECEIVED = 2;
  static LOADING = 3;
  static DONE = 4;
  onreadystatechange = null;
  onerror = null;
  onabort = null;
  onload = null;
  ontimeout = null;
  onprogress = null;
  onloadend = null;
  onloadstart = null;
  readyState = 4;
  status = 200;
  statusText = 'OK';
  response = '';
  responseText = '';
  responseType = '';
  responseXML = null;
  responseURL = '';
  timeout = 0;
  upload = { addEventListener: jest.fn(), removeEventListener: jest.fn() };
  withCredentials = false;
  abort = jest.fn();
  addEventListener = jest.fn();
  removeEventListener = jest.fn();
  dispatchEvent = jest.fn();
  getAllResponseHeaders = jest.fn(() => '');
  getResponseHeader = jest.fn();
  open = jest.fn();
  overrideMimeType = jest.fn();
  send = jest.fn();
  setRequestHeader = jest.fn();
} as any;

// Importar React para usar en el mock global
const React = require('react');

// Mock global para GroupSelectionTable (usado en tests de participante)
jest.mock('@components/tables/GroupSelectionTable', () => ({
  __esModule: true,
  default: () =>
    React.createElement('div', { 'data-testid': 'group-table-mock' }, 'MOCK GROUP TABLE'),
}));
