angular.module('bootstrap').config(['$routeProvider',
	function($routeProvider){
		$routeProvider.when('/bootstrap',{
			templateUrl:'bootstrap/views/bootstrap.client.view.html',
			controller:'BootstrapController'
		}).when('/signup2',{
			templateUrl:'bootstrap/views/signup.html',
		}).when('/tables',{
			templateUrl:'bootstrap/views/tables.html',
		}).when('/affix',{
			templateUrl:'bootstrap/views/affix.html',
		}).when('/collapse',{
			templateUrl:'bootstrap/views/collapse.html',
		}).when('/progressbar',{
			templateUrl:'bootstrap/views/progressbar.html',
		}).when('pagesize',{
			templateUrl:'bootstrap/views/pagesize.html',
		});
	}
]);
