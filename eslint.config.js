// eslint.config.js
import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierFlat from 'eslint-config-prettier/flat';
import preferArrowPlugin from 'eslint-plugin-prefer-arrow';
import vuePlugin from 'eslint-plugin-vue';
import globals from 'globals';
import vueParser from 'vue-eslint-parser';

export default [
  // ---- Vue flat recommended (includes processor & base rules for .vue) ----
  ...vuePlugin.configs['flat/recommended'],

  // ---- Ignore patterns ----
  {
    ignores: [
      '**/*.json',
      '**/*.d.ts',
      'node_modules/',
      'dist/',
      'coverage/',
      '*.config.js',
      'eslint.config.js',
      'vite.config.ts',
      'vitest.setup.ts',
    ],
  },

  // ---- Base JS rules ----
  {
    ...js.configs.recommended,
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020,
      },
    },
  },

  // ---- TypeScript rules ----
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.app.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'prefer-arrow': preferArrowPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'prefer-arrow/prefer-arrow-functions': [
        'error',
        {
          disallowPrototype: true,
          singleReturnOnly: false,
          classPropertiesAllowed: false,
        },
      ],
    },
  },

  // ---- Vue-specific rule overrides ----
  {
    files: ['**/*.vue'],
    plugins: {
      'prefer-arrow': preferArrowPlugin,
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/component-definition-name-casing': ['error', 'PascalCase'],
      'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
      'no-console': ['error', { allow: ['warn', 'error'] }],

      // Enforce arrow functions in <script> blocks
      'prefer-arrow/prefer-arrow-functions': [
        'error',
        {
          disallowPrototype: true,
          singleReturnOnly: false,
          classPropertiesAllowed: false,
        },
      ],
    },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser, // important for <script lang="ts">
        extraFileExtensions: ['.vue'],
        project: './tsconfig.eslint.json',
      },
    },
  },

  // ---- Test files ----
  {
    files: ['**/*.test.ts'],
    rules: {
      'no-console': 'off',
    },
  },

  // ---- Prettier (last) ----
  prettierFlat,
];
