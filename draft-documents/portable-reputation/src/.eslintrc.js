var config = {
  extends: [
    'standard'
  ],
  env: {
    node: true
  },
  globals: {
  },
  // parser: 'babel-eslint',
  plugins: [
    'promise'
  ],
  rules: {
    'linebreak-style': [2, 'unix'],
    'no-console': 1,
    'no-nested-ternary': 2,
    // 'no-unused-vars': [2, { 'varsIgnorePattern': '^(' + unusedVars.join('|') + ')$' }],
    'object-property-newline': 0, // disable "standard" rule
    'promise/always-return': 2,
    'quotes': 0,
    'strict': [2, 'safe']
  }
}

module.exports = config
