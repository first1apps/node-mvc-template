'use strict';

module.exports = {
	app: {
		title: 'my-server-side-mvc-template',
		description: '',
		keywords: ''
	},
	assets: {
		lib: {
			css: [],
			js: []
		},
		css: [],
		js: [],
		tests: []
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions'
};