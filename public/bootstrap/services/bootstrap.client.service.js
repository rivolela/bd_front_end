angular.module('bootstrap').factory('Page',['$rootScope',
	function($rootScope){

		var title = 'default';

		return {
			 setTitle: function(title){
            	$rootScope.title = title;
        	}
		};

	}

]);


