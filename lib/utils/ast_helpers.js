/**
 * Genearl helper functions for working with AST nodes
 */


const _ = require('lodash');

// pass in an ObjectExpression node to get all its property nodes
function getObjectExpressionPropertyNodes(objectExpressionNode, propertyNodes = []) {
  _.each(objectExpressionNode.properties, (propertyNode) => {
    propertyNodes.push(propertyNode);

    if (propertyNode.value.type === 'ObjectExpression') {
      propertyNodes.concat(
        getObjectExpressionPropertyNodes(propertyNode.value, propertyNodes),
      );
    }
  });

  return propertyNodes;
}

module.exports = {
  getObjectExpressionPropertyNodes,
};
