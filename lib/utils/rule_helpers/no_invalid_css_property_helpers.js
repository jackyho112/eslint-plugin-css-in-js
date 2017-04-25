/**
 * CSS-related helper functions for the no-invalid-css-property rule
 */

const _ = require('lodash')
const cssData = require('mdn-data').css

const generalHelpers = require('../general_helpers')
const astHelpers = require('../ast_helpers')

const { replaceCamalCaseWithDash } = generalHelpers
const { getObjectExpressionPropertyNodes } = astHelpers

const cssProperties = _.keys(cssData.properties)
const cssSelectors = _.keys(cssData.selectors)

function isMediaQuery (property) {
  return _.includes(property, '@media')
}

function isPesudoSelector (property) {
  return _.includes(cssSelectors, property)
}

// to cover a case like this: { 'html.ie9 & span.title': { fontWeight: 'bold' } }
// check out the glamor doc to learn more
function isGlamorSpecialCase (property) {
  return _.includes(property, ' ') && _.includes(property, '&')
}

function isCssProperty (property) {
  return _.includes(cssProperties, property)
}

function isCssPropertyValid (property) {
  return (
    isMediaQuery(property) ||
    isPesudoSelector(property) ||
    isGlamorSpecialCase(property) ||
    isCssProperty(property)
  )
}

function getInvalidCssPropertyNodes (cssObjectExpressionNode) {
  const propertyNodes = getObjectExpressionPropertyNodes(cssObjectExpressionNode)

  return propertyNodes.reduce((result, node) => {
    const propertyName = replaceCamalCaseWithDash(node.key.name || node.key.value)

    if (!isCssPropertyValid(propertyName)) {
      return result.concat(node)
    }

    return result
  }, [])
}

module.exports = {
  getInvalidCssPropertyNodes
}
