module.exports = {
  extends: ['standard', 'plugin:prettier/recommended'],
  plugins: ['node', 'promise'],
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    es6: true
  },
  rules: {
    'no-unused-vars': 'off'
  }
}
