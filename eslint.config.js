import js from '@eslint/js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import importPlugin from 'eslint-plugin-import'
import globals from 'globals'

export default [
  { ignores: ['dist/**', 'node_modules/**', 'public/**'] },
  {
    files: ['**/*.{js,jsx,cjs,mjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: { react, 'react-hooks': reactHooks, 'jsx-a11y': jsxA11y, import: importPlugin },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],

      // Relax some rules that were causing lots of noisy warnings in VS Code
      // while the project still builds fine with Vite.
      // - import/no-unresolved was complaining about valid relative JSX imports
      // - import/order was fighting with the natural React import style
      'import/no-unresolved': 'off',
      'import/order': 'off',
    },
    settings: { react: { version: 'detect' } },
  },
  {
    files: ['**/*.test.{js,jsx}'],
    languageOptions: {
      globals: {
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        describe: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        vi: 'readonly',
      },
    },
  },
]
