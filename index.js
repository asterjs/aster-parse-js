'use strict';

var Rx = require('rx');
var parse = require('esprima').parse;

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

module.exports = function (options) {
	options = options || {};

	var loc = options.loc !== false;
	var attachComment = !!options.comments;

	options.loc = loc
	options.attachComment = attachComment

	var parser = options.parser || defaultParser;
	parser = typeof parser === 'function' ? parser(options) : parser

	return parser
};
