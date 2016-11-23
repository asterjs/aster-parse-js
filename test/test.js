/* global describe, it */

'use strict';

var assert = require('assert'),
	Rx = require('rx'),
	parseJs = require('..'),
	parse = require('esprima').parse;

it('without comments', function (done) {
	var file = {path: 'file.js', contents: 'a = 1;'},
		input = [file],
		expected = [parse(file.contents, {loc: true, source: file.path})];

	// simulating file sequence and applying transformation
	parseJs()(Rx.Observable.fromArray(input))
	// .zip(input, function (ast, file) {
	// 	assert.equal(ast.loc.source, file.path);
	// 	return ast.program;
	// })
	// checking against array of expected results iteratively
	// .zip(expected, assert.deepEqual)
	.do(function (file) {
		assert.equal(file, expected[0]);
		// assert.equal(file.program.type, 'Program');
	})

	// subscribing to check results
	.subscribe(function () {}, done, done);
});

it('with comments', function (done) {
	var file = {path: 'file.js', contents: '/* hello, world! */a = 1;'},
		input = [file],
		expected = [parse(file.contents, {loc: true, source: file.path, attachComment: true})];

	// simulating file sequence and applying transformation
	parseJs({comments: true})(Rx.Observable.fromArray(input))
	// .zip(input, function (ast, file) {
	// 	assert.equal(ast.loc.source, file.path);
	// 	return ast.program;
	// })
	// checking against array of expected results iteratively
//	.zip(expected, assert.deepEqual)
	.do(function (file) {
		assert.equal(file, expected[0]);
		// assert.equal(file.program.type, 'Program');
	})

	// subscribing to check results
	.subscribe(function () {}, done, done);
});

it('no location tracking', function (done) {
	var file = {path: 'file.js', contents: 'a = 1;'},
		input = [file],
		expected = [parse(file.contents)];

	// simulating file sequence and applying transformation
	parseJs({loc: false})(Rx.Observable.fromArray(input))
	// .zip(input, function (ast, file) {
	// 	assert.equal(ast.loc.source, file.path);
	// 	return ast.program;
	// })
	// // checking against array of expected results iteratively
	// .zip(expected, assert.deepEqual)
	.do(function (file) {
		assert.equal(file, expected[0]);
		// assert.equal(file.program.type, 'Program');
	})

	// subscribing to check results
	.subscribe(function () {}, done, done);
});
