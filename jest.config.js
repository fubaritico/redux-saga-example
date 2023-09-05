const { createJestConfig } = require('@craco/craco')

const cracoConfig = require('./craco.config.js')
const jestConfig = createJestConfig(cracoConfig)

const config = {
  ...jestConfig,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['browser'],
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.afterEnv.js'],
  setupFiles: ['<rootDir>/jest.setup.js', '<rootDir>/setupFetchForAllTests.js'],
  testRegex: ['(/src/.*(test|spec))\\.[jt]sx?$'],
  testMatch: undefined,
  testTimeout: 80_000,
  moduleNameMapper: {
    ...jestConfig.moduleNameMapper,
    '^@Components/(.*)$': '<rootDir>/src/components/$1',
    '^@Types/(.*)$': '<rootDir>/src/types/$1',
    '^@Helpers/(.*)$': '<rootDir>/src/helpers/$1',
    '^@Hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@Styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@Redux/(.*)$': '<rootDir>/src/redux/$1',
    '^@Slices/(.*)$': '<rootDir>/src/redux/slices/$1',
    '^@Sagas/(.*)$': '<rootDir>/src/sagas/$1',
    '^@Selectors/(.*)$': '<rootDir>/src/redux/selectors/$1',
    '^@Svg/(.*)$': '<rootDir>/src/svg/$1',
    '\\.svg': '<rootDir>/src/test/svgr.mock.tsx',
  },
  transform: {
    ...jestConfig.transform,
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
}

module.exports = config
