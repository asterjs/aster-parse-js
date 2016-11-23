# aster-parse-js
[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

> JavaScript parser for aster.

## Usage

This is internal module and should be used as part of [aster-parse](https://npmjs.org/package/aster-parse) or [aster-src](https://npmjs.org/package/aster-src).

It uses [esprima](https://npmjs.org/package/esprima) to do it's job.

## API

### parseJS(options)

#### options.loc
Type: `Boolean`
Default: `true`

Location tracking (required for source maps).

#### options.comments
Type: `Boolean`
Default: `false`

Include comments to AST.

#### options.parser

Customized parser generator, by default:

```js
function defaultParser(options) {
    return function (files) {
        return files.map(function (file) {
            return {
                type: 'File',
                program: parse(file.contents, {loc: options.loc, source: file.path, attachComment: options.attachComment}),
                loc: {
                    source: file.path
                }
            };
        });
    };
}
```

You can f.ex change the `type: 'File'` if you are not parsing files.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/aster-parse-js
[npm-image]: https://badge.fury.io/js/aster-parse-js.png

[travis-url]: http://travis-ci.org/asterjs/aster-parse-js
[travis-image]: https://secure.travis-ci.org/asterjs/aster-parse-js.png?branch=master
