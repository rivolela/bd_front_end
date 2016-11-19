var mainApplicationModuleName = "mean";
var mainApplicationModule = angular.module(mainApplicationModuleName,["ngResource",
	"ngRoute","articles","usuarios","example","bootstrap","lp"]);

mainApplicationModule.config(['$locationProvider',function($locationProvider){
		$locationProvider.hashPrefix('!');
	}
]);

if(window.location.hash === '#_=_'){
	window.location.hash = '#!';
}

angular.element(document).ready(function(){
	angular.bootstrap(document,[mainApplicationModuleName]);
	try {
   		$(document.body).attr("ng-app", mainApplicationModuleName);
	} catch(e){
	}

});

mainApplicationModule.run(['$rootScope', function($rootScope) {
    $rootScope.page = {
        setTitle: function(title) {
            this.title = title + ' | Site Name';
        }
    }

}]);