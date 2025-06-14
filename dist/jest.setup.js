"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
// src/jest.setup.ts
require("@testing-library/jest-dom");
require("whatwg-fetch");
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
        startTransition: (fn) => fn(),
        triggerTransition: jest.fn(),
    }),
}));
// Mock global para window.matchMedia (soporte breakpoints Tailwind/Next.js en tests)
if (!window.matchMedia) {
    window.matchMedia = (query) => ({
        matches: query.includes('min-width: 1024px') ||
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
            });
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
        });
    });
}
// Mock global para XMLHttpRequest en entorno de test (Node/jsdom)
// Incluye las propiedades y métodos más comunes para compatibilidad con TypeScript y jsdom
global.XMLHttpRequest = (_a = class {
        constructor() {
            this.onreadystatechange = null;
            this.onerror = null;
            this.onabort = null;
            this.onload = null;
            this.ontimeout = null;
            this.onprogress = null;
            this.onloadend = null;
            this.onloadstart = null;
            this.readyState = 4;
            this.status = 200;
            this.statusText = 'OK';
            this.response = '';
            this.responseText = '';
            this.responseType = '';
            this.responseXML = null;
            this.responseURL = '';
            this.timeout = 0;
            this.upload = { addEventListener: jest.fn(), removeEventListener: jest.fn() };
            this.withCredentials = false;
            this.abort = jest.fn();
            this.addEventListener = jest.fn();
            this.removeEventListener = jest.fn();
            this.dispatchEvent = jest.fn();
            this.getAllResponseHeaders = jest.fn(() => '');
            this.getResponseHeader = jest.fn();
            this.open = jest.fn();
            this.overrideMimeType = jest.fn();
            this.send = jest.fn();
            this.setRequestHeader = jest.fn();
        }
    },
    _a.UNSENT = 0,
    _a.OPENED = 1,
    _a.HEADERS_RECEIVED = 2,
    _a.LOADING = 3,
    _a.DONE = 4,
    _a);
// Importar React para usar en el mock global
const React = require('react');
// Mock global para GroupSelectionTable (usado en tests de participante)
jest.mock('@components/tables/GroupSelectionTable', () => ({
    __esModule: true,
    default: () => React.createElement('div', { 'data-testid': 'group-table-mock' }, 'MOCK GROUP TABLE'),
}));
