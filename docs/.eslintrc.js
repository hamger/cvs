const ERROR = 2
const WARNING = 1
const IGNORE = 0

module.exports = {
  extends: ['eslint-config-alloy/vue'],
  globals: {
    // 这里填入你的项目需要的全局变量
    // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
    BMap: false,
    MhcJsBridge: false,
    BMapLib: false,
    wx: false,
    mhcCallNative: false,
    $fetch: false
  },
  rules: {
    'no-var': IGNORE,
    'one-var': IGNORE,
    'no-useless-constructor': IGNORE,
    'no-unused-vars': IGNORE,
    'no-undef': IGNORE,
    'no-new': IGNORE,
    'no-ueless-constructor': IGNORE,
    'operator-linebreak': [ERROR, 'after'],
    'no-proto': IGNORE,
    'new-cap': IGNORE,
    'no-useless-call': IGNORE,
    'comma-dangle': IGNORE,
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        flatTernaryExpressions: true
      }
    ],
    semi: [2, 'never']
  }
};
