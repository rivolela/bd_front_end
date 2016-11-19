module.exports = function(config){
	config.set({
		// this sets the list of files that Karma will include in its tests.
		frameworks:['jasmine'],files:[
			'public/lib/angular/angular.js',
			'public/lib/angular-resource/angular-resource.js',
			'public/lib/angular-route/angular-route.js',
			'public/lib/angular-mocks/angular-mocks.js',
			'public/lib/jquery/dist/jquery.min.js',
			'public/lib/bootstrap/dist/js/bootstrap.min.js',
			'public/application.js',
			// "public/lp/lp.client.module.js",
			// "public/lp/controllers/lp.client.controller.js",
			// "public/lp/config/lp.client.routes.js",
			//'public/**/*.module.js',
			//'public/services/authentication.client.service.js',
			//'public/articles/tests/unit/*.js',
			// 'public/usuarios/authentication.client.service.js',
			// 'public/articles/articles.client.module.js',
			// 'public/articles/services/articles.client.service.js',
			//'public/articles/controller/articles.client.controller.js',
			
		 // 	'public/articles/config/articles.client.routes.js',
			//'public/articles/tests/unit/*.js',
			// 'public/usuarios/usuarios.client.module.js',
			// 'public/usuarios/services/authentication.client.service.js',
			// 'public/application.js',
			// 'public/articles/controller/*.js',
			// 'public/articles/services/*.js',
			// 'public/articles/views/*.js',
			// // 'public/*.js',
			'public/*[!lib]*/*.js',
			'public/*[!lib]*/*',
			'public/*[!lib]*/*[!tests]*/*.js',
			'public/*[!lib]*/tests/unit/*.js',
			],
			exclude: [
				'public/*[img]*/*',
				//'public/*[css]*/*.less',
			],
			reporters:
				['progress'],//this sets the way Karma reports its tests results
			browsers:
				['PhantomJS'],//this is a list of browsers Karma will test on 
			captureTimeout:6000,//this sets the timeout for Karma tests execution
			singleRun:true// this forces Karma to quit after it finishes the tests execution
	});
};