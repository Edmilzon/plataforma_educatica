// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintPluginImport from 'eslint-plugin-import';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    plugins: {
      import: eslintPluginImport,
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      // ESTILO
      'camelcase': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',

      // CONVENCIONES DE NOMBRES
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'typeLike',
          format: ['PascalCase'],
          custom: {
            regex: '^[A-Z][a-zA-Z]*(Dto|Entity|Service|Controller|Module|Type|Interface|Util)?$',
            match: true,
          },
        },
        {
          selector: ['variable', 'function', 'parameter', 'objectLiteralProperty', 'classProperty'],
          format: ['snake_case', 'PascalCase'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
          custom: {
            regex: '^[a-z]+(_[a-z]+)*$|^[A-Z][a-zA-Z]*$',
            match: true,
          },
        },
        {
          selector: 'variable',
          modifiers: ['const', 'global'],
          format: ['UPPER_CASE'],
          custom: {
            regex: '^[A-Z0-9_]+$',
            match: true,
          },
        },
      ],

      // MANTENIBILIDAD
      'complexity': ['error', 5],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'max-lines-per-function': ['warn', { max: 50, skipBlankLines: true, skipComments: true }],

      // SEGURIDAD / ESTRUCTURA
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

      // IMPORTACIONES
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
          'newlines-between': 'always',
        },
      ],
    },
  }
);