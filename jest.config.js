module.exports = {
  moduleFileExtensions: ['js', 'json'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@core/(.*)$': '<rootDir>/src/core/$1',
  },
  collectCoverage: false,
  collectCoverageFrom: ['**/*.{js}', '!**/node_modules/**'],
  // testRegex: 'src/core/routes/Router.test.js',
}
