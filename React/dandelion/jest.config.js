module.exports = {
    transform: {
      "^.+\\.jsx?$": `<rootDir>/tests/jest-preprocess.js`,
      '^.+\\.(ts|tsx)?$': 'ts-jest',
      "^.+\\.(js|jsx)$": "babel-jest",  
    },
    moduleNameMapper: {
      ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
      ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/tests/__mocks__/file-mock.js`,
      "localStorage": `<rootDir>/tests/__mocks__/localStorage.js`,
    },
    testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
    transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
    globals: {
      __PATH_PREFIX__: ``,
    },
    setupFilesAfterEnv: ["<rootDir>/tests/setup-test-env.js"],
  }