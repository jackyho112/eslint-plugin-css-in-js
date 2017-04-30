/**
 * CSS-related helper functions for all the rules
 */

const _ = require('lodash')
const cssData = require('mdn-data').css
const generalHelpers = require('../general_helpers')
const astHelpers = require('../ast_helpers')

const { getObjectExpressionPropertyNodes } = astHelpers

const cssProperties = _.keys(cssData.properties)

// check if there is any CSS property key in the ObjectExpression node to
// identify a CSS ObjectExpression node. If there is, returns true;
// otherwise, return false
function isCssObject (objectExpressionNode) {
  const propertyNodes = getObjectExpressionPropertyNodes(objectExpressionNode)
  const properties = propertyNodes.map(
   node => _.kebabCase(node.key.name || node.key.value)
 )

  if (_.intersection(properties, cssProperties).length === 0) {
    return false
  }

  return true
}

module.exports = {
  isCssObject
}
