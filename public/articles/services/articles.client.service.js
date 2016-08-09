angular.module('articles').factory('Articles',['$resource',function($resource) {
  // return $resource('api/articles/:articleId', { id: '@_id' }, {
  return $resource('api/articles/:articleId', { articleId: '@_id' }, {
    update: {
      method: 'PUT' // this method issues a PUT request
    },
    get:{
    	method:'GET'
    },
    save:{
    	method:'POST'
    },
    query:{
    	method:'GET', isArray:true
    },
    remove:{
    	method:'DELETE'
    }
  });
}]);


// 'get':    {method:'GET'},
//   'save':   {method:'POST'},
//   'query':  {method:'GET', isArray:true},
//   'remove': {method:'DELETE'},
//   'delete': {method:'DELETE'} };