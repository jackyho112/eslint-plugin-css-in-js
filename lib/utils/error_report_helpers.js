/**
 * Reporting functions for CSS lint errors
 */

const _ = require('lodash')

function reportInvalidCssProperties (eslintContext, faultyPropertyNodes) {
  _.each(faultyPropertyNodes, node => (
    eslintContext.report({ node, message: 'Invalid CSS property' })
  ))

  return null
}

module.exports = {
  reportInvalidCssProperties
}
