[![Build Status][build-badge]][build-page]
[![version][version-badge]][package]
[![Coverage Status][coverage-badge]][coverage-badge]

# eslint-plugin-css-in-js

For all your CSS JS object linting need! Not really,
it's just linting your CSS properties now for objects that
have at least one valid CSS property.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-css-in-js`:

```
$ npm install eslint-plugin-css-in-js --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-css-in-js` globally.

## Usage

Add `css-in-js` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "css-in-js"
    ]
}
```

or enable all the rules

```json
{
    "plugins": [
      "css-in-js:recommended"
    ]
}
```


Or configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "css-in-js/rule-name": 2
    }
}
```

## Supported Rules

| Rule | Description |
| :--- | :---------- |
| [no-invalid-properties](docs/rules/no-invalid-css-property.md) | Disallow invalid CSS properties |

## Contributing

This plugin is pretty lacking right now. It's open to new rule suggestions and
PRs. For your PRs, don't forget to commit by

```javascript
npm run commit
```

and ensure 100% test coverage.

Currently, I am looking into validating CSS values using
https://github.com/mdn/data and using the rules in
https://github.com/stylelint/stylelint.
Also open to suggestions and PRs in these issues.

## License

[MIT][license] © Jacky Ho

<!-- Definition -->
[license]: LICENSE
[build-page]: https://travis-ci.org/jackyho112/eslint-plugin-css-in-js.svg
[build-badge]: https://img.shields.io/travis/jackyho112/eslint-plugin-css-in-js.svg
[version-badge]: https://img.shields.io/npm/v/eslint-plugin-css-in-js.svg?style=flat-square
[package]: https://www.npmjs.com/package/eslint-plugin-css-in-js
[coverage-badge]:https://coveralls.io/repos/jackyho112/eslint-plugin-css-in-js/badge.svg?branch=master
