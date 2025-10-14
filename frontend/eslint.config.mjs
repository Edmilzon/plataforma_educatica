import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
//import eslintPluginImport from "eslint-plugin-import";
//import { match } from "assert";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },

  {
    files: ["**/*.ts", "**/*.tsx"],

    rules: {
      camelcase: "off",
      "@typescript-eslint/naming-convention": [
        "error",
        // Clases, Interfaces, Tipos (PascalCase: Estándar)
        {
          selector: "typeLike",
          format: ["PascalCase"],
          custom: {
            regex: "^[A-Z][a-zA-Z]*(Props|Component|Hook|Type|Interface)?$",
            match: true,
          },
        },
        // Variables, funciones, etc. (PascalCase O snake_case)
        {
          selector: [
            "variable",
            "function",
            "parameter",
            "objectLiteralProperty",
            "classProperty",
          ],
          format: ["snake_case", "PascalCase"],
          leadingUnderscore: "allow",
          trailingUnderscore: "allow",
          custom: {
            regex: "^[a-z]+(_[a-z]+)*$|^[A-Z][a-zA-Z]*$",
            match: true,
          },
        },
        // Constantes Globales (SCREAMING_SNAKE_CASE: Variables de Entorno)
        {
          selector: "variable",
          modifiers: ["const", "global"],
          format: ["UPPER_CASE"],
          custom: {
            regex: "^[A-Z0-9_]+$",
            match: true,
          },
        },
      ],

      // MANTENIBILIDAD Y RENDIMIENTO
      complexity: ["error", 5],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "max-lines-per-function": [
        "warn",
        { max: 50, skipBlankLines: true, skipComments: true },
      ],
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],

      // REGULARIZACIÓN DE COMPONENTES/HOOKS
      "react/jsx-sort-props": [
        "warn",
        { callbacksLast: true, shorthandFirst: true },
      ],
      "react-hooks/exhaustive-deps": "error",
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],

      // ORDEN DE IMPORTACIONES
      "import/order": [
        "error",
        {
          groups: [
            ["builtin", "external"],
            "internal",
            ["parent", "sibling", "index"],
          ],
          "newlines-between": "always",
        },
      ],
      "@next/next/no-img-element": "error",
    },
  },
];

export default eslintConfig;
