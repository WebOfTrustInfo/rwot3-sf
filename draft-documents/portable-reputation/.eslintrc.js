var unusedVars = [
  'd'
]

var config = {
  extends: [
    'standard'
  ],
  env: {
    node: true
  },
  globals: {
    describe: true,
    it: true,
    xit: true
  },
  plugins: [
    'promise'
  ],
  rules: {
    'linebreak-style': [2, 'unix'],
    'no-console': 0,
    'no-nested-ternary': 2,
    'no-unused-vars': [2, { 'varsIgnorePattern': '^(' + unusedVars.join('|') + ')$' }],
    'object-property-newline': 0,
    'promise/always-return': 0,
    'quotes': 0,
    'strict': [2, 'safe']
  }
}

module.exports = config
