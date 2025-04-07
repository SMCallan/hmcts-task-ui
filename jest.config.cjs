// jest.config.js
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Optional setup file
  moduleNameMapper: {
    // Handle CSS Modules or regular CSS files
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Handle static assets if needed (e.g., SVGs imported as components)
    // Example: '^.+\\.svg$': '<rootDir>/__mocks__/svgMock.js',
  },
  transform: {
      // Use babel-jest to transpile tests with the babel configuration
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  // Ignore node_modules, except for specific ones if needed
  transformIgnorePatterns: [
      '/node_modules/',
      '\\.pnp\\.[^\\/]+$',
  ],
};