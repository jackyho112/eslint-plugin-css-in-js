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
