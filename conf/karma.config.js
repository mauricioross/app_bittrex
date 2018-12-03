
module.exports = function(config) {
	config.set({
		port: 9876,
		basePath: '../',
		frameworks: ['jasmine'],
		files: [
			'bundle/js/libs.js',
			'bundle/js/app.js',
			'node_modules/angular-mocks/angular-mocks.js',
			'src/tests/*.js'
		],
		exclude: [],
		preprocessors: {},
		reporters: ['verbose'],
		colors: true, 
		logLevel: config.LOG_INFO, //config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		autoWatch: true,
		browsers: ['Chrome'],
		singleRun: false,
		concurrency: Infinity
	});
};
