import type { Config } from 'jest';

const config: Config = {
  rootDir: './',
  testEnvironment: 'jsdom',

  // Файли, які виконуються перед тестами
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],

  // ts-jest трансформує .ts/.tsx у ESM
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.jest.json',
        useESM: true
      }
    ]
  },

  extensionsToTreatAsEsm: ['.ts', '.tsx'],

  globals: {
    'ts-jest': {
      useESM: true
    }
  },

  moduleNameMapper: {
    '\\.(css|scss|less)$': 'identity-obj-proxy',
    '\\.(gif|png|jpg|jpeg|svg)$': '<rootDir>/test/mocks/fileMock.js'
  },
  
   transformIgnorePatterns: [
    'node_modules/(?!(identity-obj-proxy)/)'
  ]
};

export default config;