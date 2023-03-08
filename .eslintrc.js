module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [],
  // eslint configure for react
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    parser: '@babel/eslint-parser',
    ecmaFeatures: {
      'jsx': true,
      'modules': true,
      'experimentalObjectRestSpread': true
    }
  },
  /**
   eslint rules for first value
   "off" or 0 - turn the rule off
   "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
   "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)
  */
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'comma-dangle': ['off'],
    quotes: ['error', 'single'], // js文件强制单引号
    semi: ['error', 'never'], // 行尾不跟随分号
    'max-len': ['off'], // 单行最大长度限制解除
    'no-extra-semi': 'off', // 禁止不必要的分号
    'no-dupe-args': 'error', // 禁止 function 定义中出现重名参数
    'global-require': 'off',
    'no-plusplus': 'off', // 不允许出现++ 及 --单运算符
    radix: 'off', // parseInt函数用法校验
    'no-param-reassign': 'off', // 禁止对函数参数再赋值
    'no-await-in-loop': 'off',
    'linebreak-style': ['off', 'windows'], // lf换行符转换成crlf校验
    'operator-linebreak': ['off'] // js换行校验
  }
}
