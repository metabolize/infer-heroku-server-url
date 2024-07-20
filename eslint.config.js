'use strict'

const globals = require('globals')

module.exports = [
  ...require('neostandard')({
    noStyle: true,
    ts: true,
    files: ['**/*.ts', '**/*.js'],
    ignores: [
      'dist/',
      'packages/*/dist/',
      'apps/*/dist/',
      'apps/*/packages/*/dist/',
    ],
  }),
  ...require('neostandard').plugins['typescript-eslint'].configs['recommended'],
  {
    plugins: {
      'simple-import-sort': require('eslint-plugin-simple-import-sort'),
    },
    rules: {
      camelcase: 'off',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        { selector: 'import', format: ['camelCase', 'PascalCase'] },
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
        { selector: 'typeLike', format: ['PascalCase'] },
        { selector: 'enumMember', format: ['PascalCase'] },
        {
          selector: 'objectLiteralProperty',
          format: ['camelCase', 'PascalCase', 'snake_case', 'UPPER_CASE'],
        },
        {
          selector: [
            'classProperty',
            'objectLiteralProperty',
            'typeProperty',
            'classMethod',
            'objectLiteralMethod',
            'typeMethod',
            'accessor',
            'enumMember',
          ],
          format: null,
          modifiers: ['requiresQuotes'],
        },
      ],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      curly: ['error', 'all'],
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-empty': ['error', { allowEmptyCatch: true }],
    },
  },
  {
    files: ['**/*.test.ts', '**/*.integration.ts', '**/*.e2e.ts'],
    languageOptions: { globals: globals.mocha },
  },
  {
    files: ['**/*.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'no-undef': 'error',
      'no-unused-vars': ['error', { args: 'none' }],
      'no-var': 'error',
      'prefer-const': 'error',
      strict: ['error', 'global'],
    },
    languageOptions: { sourceType: 'script' },
  },
]
