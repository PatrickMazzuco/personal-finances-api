import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

export default {
  bail: true,
  clearMocks: true,
  resetMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/modules/**/use-cases/**/*.service.ts',
    '<rootDir>/src/modules/**/use-cases/**/*.controller.ts',
    '<rootDir>/src/modules/**/errors/**/*.ts',
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  coverageReporters: ['json', 'text', 'lcov', 'clover', 'text-summary'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>',
  }),
  preset: 'ts-jest',
  reporters: ['default'],
  testMatch: ['**/*.spec.ts'],
  coveragePathIgnorePatterns: ['<rootDir>/dist/'],
};
