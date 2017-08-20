module.exports = {
  testRegex: '\/src\\/.*(\\.test)\\.tsx?$',
  moduleFileExtensions: ['js', 'ts', 'tsx'], // need to include .js for jest to build successfully

  transform: {
    '^.+\\.tsx?$': 'ts-jest/preprocessor',
  },

  globals: {
    'ts-jest': {
      skipBabel: true,
    },
  },

  mapCoverage: true,
};
  