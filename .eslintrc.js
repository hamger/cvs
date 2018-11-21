const ERROR = 2
const WARNING = 1
const IGNORE = 0

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true
  },
  extends: ['standard'],
  rules: {
    'one-var': IGNORE,
    'no-useless-constructor': IGNORE,
    'no-unused-vars': IGNORE,
    'no-undef': IGNORE,
    'no-new': IGNORE,
    'no-useless-constructor': IGNORE,
    'operator-linebreak': [ERROR, 'after'],
    'no-proto': IGNORE,
    'new-cap': IGNORE,
    'no-useless-call': IGNORE,
    'comma-dangle': IGNORE,
    'indent': [
      'error',
      2,
      {
        SwitchCase: 1,
        flatTernaryExpressions: true
      }
    ],
    semi: [2, 'never']
  },
}
