const _ = require('lodash')
const cssData = require('mdn-data').css

const {
  atRules,
  selectors,
  types,
  properties,
  syntaxes,
  units
} = cssData

const multipliers = {
  "one": "one time",
  "*": "0 or more times",
  "+": "1 or more times",
  "?": "0 or 1 time",
  "{": "At least A times, at most B times - {A,B}",
  "#": "1 or more times, but each occurence separated by a comma",
  "!": "Group musr produce at least 1 value"
}

const operators = ['&', '|', '[', ';']

//   "&": "mandatory - &&",
//   "|": "at least one must be present - ||",
//   "|": "exactly one must be present",
//   "[": "group together - []",
//   ";": "next order"

const cssPropertyNames = _.keys(properties)

function isValidCssProperty(cssProperty) {
  return _.includes(cssPropertyNames, cssProperty)
}

function formatSyntax(syntax) {
  return _.replace(
    syntax,
    /[a-z>\]*+?}#!] [\[<a-z]/g,
    function(string){ return string.replace(' ', ';') }
  ).replace(/ /g, '')
}

function findMatchingSymbolIndex(syntax, opening, closing) {
  return _.tail(syntax).reduce((result, value, index) => {
    switch (value) {
      case opening:
        return result + 1
        break;
      case closing:
        if (result > 0) {
          return result - 1
        } else {
          return index + 1
        }
        break;
      default:
        return result
    }
  }, 0)
}

function handleSyntax(syntax, isSpecial) {
  let closingIndex

  if (isSpecial) {
    closingIndex = findMatchingSymbolIndex(syntax, '<', '>')
  } else {
    closingIndex = _.takeWhile(
      syntax,
      character => RegExp(/[a-z-0-9()]/g).test(character)
    ).length - 1
  }

  continuousSyntax = syntax.slice(closingIndex + 1)
  data = { stuff: syntax.slice(0, closingIndex + 1).join('') }

  if (Object.keys(multipliers).includes(continuousSyntax[0])) {
    data.multiplier = continuousSyntax[0]
    continuousSyntax = _.tail(continuousSyntax)
  }

  return {
    syntax: continuousSyntax,
    goody: data
  }
}

function handleOperator(syntax, initialData = { members: [], operator: null, multiplier: "one" }) {
  let data = initialData
  let continuousSyntax = syntax

  while (continuousSyntax.length > 0) {
    let nextCharacter = continuousSyntax[0]
    if (RegExp(/[a-z-]/g).test(nextCharacter)) {
      const result = handleSyntax(continuousSyntax, false)
      continuousSyntax = result.syntax
      data.members.push(result.goody)
    } else if (nextCharacter === '<') {
      const result = handleSyntax(continuousSyntax, true)
      continuousSyntax = result.syntax
      data.members.push(result.goody)
    } else if (nextCharacter === '[') {
      const closingBracketIndex = findMatchingSymbolIndex(continuousSyntax, '[', ']')
      const bracketContent = continuousSyntax.slice(0, closingBracketIndex + 1)
      continuousSyntax = continuousSyntax.slice(closingBracketIndex + 1)
      data.members.push(
        handleOperator(bracketContent.slice(1, bracketContent.length - 1))
      )
    } else if (operators.includes(nextCharacter)) {
      let symbol = nextCharacter

      if (continuousSyntax[1] === nextCharacter) {
        symbol += continuousSyntax[1]
      }

      if (!data.operator) {
        continuousSyntax = continuousSyntax.slice(symbol.length)
        data.operator = symbol
      } else if (symbol === data.operator) {
        continuousSyntax = continuousSyntax.slice(symbol.length)
      } else {
        return handleOperator(
          continuousSyntax.slice(symbol.length),
          {
            members: [data],
            operator: symbol,
            multiplier: "one"
          }
        )
      }
    } else if (Object.keys(multipliers).includes(continuousSyntax[0])) {
      if (continuousSyntax[0] === '{') {
        const index = findMatchingSymbolIndex(syntax, '{', '}')
        data.multiplier = continuousSyntax.slice(0, index + 1)
        continuousSyntax = continuousSyntax.slice(index + 1)
      } else {
        continuousSyntax = _.tail(continuousSyntax)
        data.multiplier = nextCharacter
      }
    } else {
      throw 'Dont understand this'
    }
  }

  return data
}

function processor(syntax) {
  const formattedSyntax = formatSyntax(syntax).split('')

  return handleOperator(formattedSyntax)
}


// special cases
// scroll-snap-points-y, scroll-snap-points-x, offset-path,
// grid-template, grid-row, grid-column, grid-area, grid,
// font-variant-alternatives, font-variant, border-radius, border-image, background,
// -webkit-mask-repeat, -webkit-mask-image(around), -moz-outline-radius
// cases like <'margin-left'>
// cases with , like cursor, content
