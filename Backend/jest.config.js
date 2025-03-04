/** @type {import('jest').Config} */
const config = {
  collectCoverage: true,
  coverageThreshold: {
    // Cobertura mínima que debe arrojar el test para contar como test satisfactorio
    global: {
      branches: 20.58,
      functions: 63.63,
      lines: 50.92,
      statements: 50.92,
    },
  },
};

export default config;
