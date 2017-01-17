
var categories = require('../controllers/categories.server.controller');

module.exports = function(app){
	
	app.route('/categories/:categories/page/:page')
		.get(categories.getOffersByQuery);
};

