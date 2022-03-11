const path = require('path');

module.exports = {
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    allowImportExportEverywhere: false,
  },
  rules: {
    'linebreak-style': 'off',
    'max-len': [1, { code: 120 }],
    'no-underscore-dangle': [
      'error',
      {
        allow: ['_id'],
        allowAfterThis: false,
        allowAfterSuper: false,
        enforceInMethodNames: true,
      },
    ],
    'no-nested-ternary': 'off',
    'import/prefer-default-export': 'off',
    'prettier/prettier': 'error',
  },
  settings: {
    'import/resolver': {
      'eslint-import-resolver-lerna': {
        packages: path.resolve(__dirname, '../'),
      },
    },
  },
};
