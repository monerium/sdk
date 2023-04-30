import type { Config } from 'jest';

const config: Config = {
  transformIgnorePatterns: [
    '/configs/jest.setup.js',
    '/.yarn/',
    'node_modules/',
  ],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(t|j)s$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['../.'],
  coverageDirectory: '../static/coverage',
  setupFiles: ['./jest.setup.js'],
};
export default config;
