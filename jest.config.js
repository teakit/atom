module.exports = {
  testEnvironment: "node",
  preset: "ts-jest/presets/default-esm",
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.(m)?js$": "$1",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(m)?(ts|js)$",
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.js", , "src/**/*.ts", "src/**/*.mts", "!src/**/*.d.ts", "!src/**/*.d.mts"],
};
