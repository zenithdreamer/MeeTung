import baseConfig, { restrictEnvAccess } from "@mee-tung/eslint-config/base";
import nextjsConfig from "@mee-tung/eslint-config/nextjs";
import reactConfig from "@mee-tung/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
