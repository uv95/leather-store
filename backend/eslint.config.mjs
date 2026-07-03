import tseslint from "typescript-eslint";
import globals from "globals";
import prettier from "eslint-config-prettier";

export default [
  ...tseslint.configs.recommended,
  prettier,
  {
    files: ["**/*.ts"],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
        },
      ],
      "no-console": "off",
      "indent": [1, 2],
      "no-underscore-dangle": "off",
      "block-spacing": "error",
      "space-before-blocks": "error",
      "space-in-parens": "error",
      "no-multi-spaces": "error",
      "comma-spacing": ["error", { "before": false, "after": true }],
      "arrow-spacing": "error",
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "coverage/**",
    ],
  },
];