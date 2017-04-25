/**
 *
 */

const _ = require('lodash')

const generalRuleHelpers = require('../utils/rule_helpers/general_helpers')
const ruleHelpers = require('../utils/rule_helpers/no_invalid_css_property_helpers')
const errorReportHelpers = require('../utils/error_report_helpers')

const { isCssObject } = generalRuleHelpers
const { getInvalidCssPropertyNodes } = ruleHelpers
const { reportInvalidCssProperties } = errorReportHelpers

module.exports = {
  meta: {
    docs: {
      description: 'No invalid css property allowed',
      category: 'CSS properties',
      recommended: true
    },
    fixable: 'code',
    schema: []
  },
  create (context) {
    let faultyNodes = []

    return {
      ObjectExpression (node) {
        if (isCssObject(node)) {
          faultyNodes = _.concat(faultyNodes, getInvalidCssPropertyNodes(node))
        }
      },

      onCodePathEnd () {
        reportInvalidCssProperties(
          context,
          _.uniqBy(faultyNodes, node => `${node.start}-${node.end}`)
        )
      }
    }
  }
}
