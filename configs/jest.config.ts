import type { Config } from 'jest';

const config: Config = {
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(t|j|mj)s$',
  moduleFileExtensions: ['ts', 'js', 'mjs', 'json', 'node'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['../.'],
  coverageDirectory: '../static/coverage',
};
export default config;
