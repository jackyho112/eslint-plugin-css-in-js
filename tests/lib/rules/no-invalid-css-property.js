

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-invalid-css-property');

const RuleTester = require('eslint').RuleTester;

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
  },
});


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const errors = [{ message: 'Invalid CSS property' }];
const ruleTester = new RuleTester();
ruleTester.run('no-invalid-css-property', rule, {
  valid: [
    // test that if there is no valid CSS property as keys, object should not
    // be identified as a CSS object and hence not be linted
    "var css = { sword: 'dragon', dog: 50 }",

    // test for allowing media queries
    "var css = { '@media(min-width: 300px)': { fontSize: 20 } }",

    // test for allowing pseudo elements and nesting
    "var css = { ':hover': { color: 'blue' } }",

    // test for allowing special Glamor CSS object keys
    "var css = { 'html.ie9 & span.title': { fontWeight: 'bold' } }",
  ],
  invalid: [
    // should find a lint error when there is at least one valid CSS property
    // key in the object plus any invalid CSS property key
    { errors, code: "var css = { height: '40', ball: true }" },

    // should find a lint error for invalid Pseudo selectors
    {
      errors,
      code: "var css = { color: 'blue', ':after': { position: 'relative' }}",
    },

    // should find a lint error for nested invalid CSS properties
    {
      errors,
      code: "var css = { color: 'blue', '::after': { diamond: 'relative' }}",
    },

    // should find a lint error when the glamor special use case that supports
    // multiple selectors is missing &, the target selector
    {
      errors,
      code: "var css = { 'html.ie9 span.title': { fontWeight: 'bold' } }",
    }
  ],
});
