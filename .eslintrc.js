module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    '@typescript-eslint/array-type': 1,
    '@typescript-eslint/explicit-function-return-type': 1,
    '@typescript-eslint/brace-style': 1,
    '@typescript-eslint/comma-spacing': 1,
    '@typescript-eslint/no-extra-parens': 1,
    '@typescript-eslint/indent': [
      'error',
      2,
      {
        'SwitchCase': 1
      }
    ],
    '@typescript-eslint/keyword-spacing': 1,
    '@typescript-eslint/no-unused-vars': 1,
    'no-mixed-spaces-and-tabs': 1,
    'object-shorthand': [
      1,
      'methods'
    ],
    'prefer-arrow-callback': 1,
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
  }
};