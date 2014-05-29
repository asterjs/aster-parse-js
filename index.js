'use strict';

var Rx = require('rx');
var parse = require('esprima').parse;

module.exports = function (options) {
	options = options || {};

	var loc = options.loc !== false;
	var attachComment = !!options.comments;

	return function (files) {
		return files.map(function (file) {
			return parse(file.contents, {loc: loc, source: file.path, attachComment: attachComment});
		});
	};
};
