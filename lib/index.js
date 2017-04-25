/**
 * For all your CSS JS object linting need
 */

module.exports = {
  rules: {
    'no-invalid-css-property': require('./rules/no-invalid-css-property')
  },

  configs: {
    recommended: {
      'parserOptions': {
        'ecmaVersion': 6
      },
      rules: {
        'no-invalid-css-property': 2
      }
    }
  }
}
