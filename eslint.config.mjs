// @ts-check

import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default defineConfig({
  files: ['**/*.{js,ts}'],
  extends: [
    js.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    tseslint.configs.strict,
    tseslint.configs.stylistic,
    eslintConfigPrettier,
  ],
  languageOptions: {
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: import.meta.dirname,
    },
  },
  plugins: {
    prettier: eslintPluginPrettier,
  },
  rules: {
    '@typescript-eslint/no-floating-promises': 'error',
    'prettier/prettier': 'error',
  },
});
