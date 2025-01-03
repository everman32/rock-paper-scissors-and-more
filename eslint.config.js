import globals from "globals";
import eslint from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintImportPlugin from "eslint-plugin-import";
import eslintSonarjsPlugin from "eslint-plugin-sonarjs";
import eslintPluginUnicorn from "eslint-plugin-unicorn";

export default [
  {
    ignores: ["*.config.js"],
  },
  eslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  eslintImportPlugin.flatConfigs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
    },
  },
  eslintSonarjsPlugin.configs.recommended,
  eslintPluginUnicorn.configs["flat/recommended"],
  {
    rules: {
      "unicorn/no-array-for-each": "off",
    },
  },
  eslintPluginPrettierRecommended,
];
