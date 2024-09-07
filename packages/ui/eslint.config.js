import baseConfig from "@mee-tung/eslint-config/base";
import reactConfig from "@mee-tung/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [],
  },
  ...baseConfig,
  ...reactConfig,
];
