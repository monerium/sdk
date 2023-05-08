import type { Config } from 'jest';

const config: Config = {
  transformIgnorePatterns: [
    '/configs/jest.setup.js',
    '.yarn/',
    'node_modules/',
  ],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(t|j|mj)s$',
  moduleFileExtensions: ['ts', 'js', 'mjs', 'json', 'node'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  // Get a 502 Gateway error when bundle and client tests are run together
  maxWorkers: 1,
  coverageDirectory: '../static/coverage',
  setupFiles: ['./configs/jest.setup.js'],
};
export default config;