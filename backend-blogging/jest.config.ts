// module.exports = {
// //  testEnvironment: "node",
//  // testeMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
//   transform: {
//     '^.+\\.(ts|tsx)$': 'ts-jest',
// },
//   //present: "ts-jest"
// }

import { Config } from 'jest'

const config: Config = {
  verbose: true,
  // testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  preset: 'ts-jest',
  testMatch: ['**/(*.)+(spec|test).ts?(x)'],

  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },

  setupFiles: ['<rootDir>/.env'],

  forceExit: true,
}

export default config
