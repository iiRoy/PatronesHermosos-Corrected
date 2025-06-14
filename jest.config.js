const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/src/jest.setup.ts'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{spec,test}.{ts,tsx,js,jsx}',
    '<rootDir>/src/__tests__/**/*.{spec,test}.{ts,tsx,js,jsx}',
  ],
  reporters: ['default', '<rootDir>/jest-markdown-reporter.js'],
  transformIgnorePatterns: [
    '/node_modules/(?!(d3-|internmap|robust-predicates|tslib|@?observablehq|@?floating-ui|@?reduxjs|@?visx)/)',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { configFile: './babel.config.test.js' }],
  },
};

module.exports = createJestConfig(customJestConfig);
