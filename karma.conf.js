module.exports = function(config){
	config.set({
		// this sets the list of files that Karma will include in its tests.
		frameworks:['jasmine'],files:[
			'public/lib/angular/angular.js',
			'public/lib/angular-resource/angular-resource.js',
			'public/lib/angular-route/angular-route.js',
			'public/lib/angular-mocks/angular-mocks.js',
			'public/application.js',
			'public/*[!lib]*/*.js',
			'public/*[!lib]*/*',
			'public/*[!lib]*/*[!tests]*/*.js',
			'public/*[!lib]*/tests/unit/*.js'
			],
			exclude: [
				// 'public/*[!img]*/*',
			],
			reporters:
				['progress'],//this sets the way Karma reports its tests results
			browsers:
				['PhantomJS'],//this is a list of browsers Karma will test on 
			captureTimeout:6000,//this sets the timeout for Karma tests execution
			singleRun:true// this forces Karma to quit after it finishes the tests execution
	});
};