module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // add your custom rules here
  rules: {
    'no-eval': 1,
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'indent': ['error', 2],
    'semi': ['error', 'always'],
    'brace-style': ['error', 'stroustrup'],
    'no-undef': 'error',
    'no-trailing-spaces': ['error', { skipBlankLines: true }],
    'comma-dangle': ['error', {
      "arrays": "never",
      "objects": "always-multiline",
      "imports": "never",
      "exports": "never",
      "functions": "never"
    }],
    'standard/no-callback-literal': 0,
  }
};
