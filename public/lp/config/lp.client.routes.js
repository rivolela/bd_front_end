angular.module('lp').config(['$routeProvider',
	function($routeProvider){
		$routeProvider.when('/',{
			templateUrl:'lp/views/lp.client.view.html',
			controller:'LpController'
		});
	}
]);
