const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  testPathIgnorePatterns: ['/node_modules/', '/tests/'],
  transformIgnorePatterns: ['/node_modules/(?!(isomorphic-ws|@supabase)/)'],
};

module.exports = createJestConfig(customJestConfig);
