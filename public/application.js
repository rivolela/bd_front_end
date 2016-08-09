var mainApplicationModuleName = 'mean';
var mainApplicationModule = angular.module(mainApplicationModuleName,['ngResource',
	'ngRoute','usuarios','example','articles','bootstrap']);

mainApplicationModule.config(['$locationProvider',function($locationProvider){
		$locationProvider.hashPrefix('!');
	}
]);

if(window.location.hash === '#_=_'){
	window.location.hash = '#!';
}

angular.element(document).ready(function(){
	angular.bootstrap(document,[mainApplicationModuleName]);
});

mainApplicationModule.run(['$rootScope', function($rootScope) {
    $rootScope.page = {
        setTitle: function(title) {
            this.title = title + ' | Site Name';
        }
    }

}]);