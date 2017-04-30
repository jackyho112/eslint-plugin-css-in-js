# Disallow invalid css properties (no-invalid-css-property)

## Rule Details

This rule aims to prevent the use of invalid CSS properties in a CSS object.
An object is identified to be a CSS object if there is at least one valid
CSS properties in it.

It also supports special cases in https://github.com/threepointone/glamor and https://github.com/jackyho112/glamorous.

For example,

```js
{
  "name": "John",
  "dog": "none"
}
```
will not be identified as a CSS object

```js
{
  "height": "80px",
  "cat": 20
}
```
will and will raise an error

Please refer to https://github.com/mdn/data/blob/master/css/properties.json for
all the valid CSS properties

Examples of **incorrect** code for this rule:

```js
{
  "width": "100%",
  "rock": "solid"
}

```

Examples of **correct** code for this rule:

```js

{
  "position": "relative",
  "align-content": "flex-start"
}

```
