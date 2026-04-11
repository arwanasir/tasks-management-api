const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
// module.exports =  {
//   testEnvironment: "node",
//   transform: {
//     ...tsJestTransformCfg,
//   },
//   moduleNameMapper: {
//     // This maps the .js extension in imports to the .ts source file
//     '^(\\.{1,2}/.*)\\.js$': '$1',
//   }
// };
module.exports = {
  preset: 'ts-jest/presets/default-esm', // The "Magic" setting for ESM
  testEnvironment: 'node',
  moduleNameMapper: {
    // This handles your .js extensions in the imports
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    // This tells Jest to use ts-jest for all .ts files
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
};