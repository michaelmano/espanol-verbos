// eslint.config.js
import js from "@eslint/js";
import airbnbBase from "eslint-config-airbnb-base";
import airbnbTypescript from "eslint-config-airbnb-typescript";
import prettier from "eslint-config-prettier";
import jestDom from "eslint-plugin-jest-dom";
import testingLibrary from "eslint-plugin-testing-library";
import vue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  airbnbBase,
  ...airbnbTypescript.configs.recommended,
  {
    files: ["**/*.vue", "**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        extraFileExtensions: [".vue"],
      },
    },
    plugins: {
      vue,
    },
    rules: {
      "vue/multi-word-component-names": "off", // allow <Home.vue>
      "vue/component-tags-order": [
        "error",
        {
          order: ["scriptSetup", "script", "template", "style"],
        },
      ],
    },
  },
  {
    files: ["**/*.test.ts", "**/*.test.js"],
    plugins: {
      "testing-library": testingLibrary,
      "jest-dom": jestDom,
    },
    rules: {
      ...testingLibrary.configs["vue"].rules,
      ...jestDom.configs.recommended.rules,
    },
  },
  prettier, // disable style rules that conflict with Prettier
];
