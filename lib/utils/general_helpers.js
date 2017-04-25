/**
 * Genearl helper functions for everything
 */

function replaceCamalCaseWithDash (string) {
  return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

module.exports = {
  replaceCamalCaseWithDash
}
