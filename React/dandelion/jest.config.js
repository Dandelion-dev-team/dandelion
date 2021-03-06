const {defaults} = require('jest-config');

module.exports = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  transform: {
    "^.+\\.jsx?$": `<rootDir>/tests/jest-preprocess.js`,
    "^.+\\.(ts|js)x?$": "ts-jest",
  },
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/tests/__mocks__/file-mock.js`,
  },
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`, "<rootDir>/node_modules/(?!(quill-mention)/)"],
  globals: {
    __PATH_PREFIX__: ``,
  },
  resetMocks: false,
  setupFilesAfterEnv: ["<rootDir>/tests/setup-test-env.js"],
}