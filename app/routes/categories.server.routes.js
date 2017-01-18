
var categories = require('../controllers/categories.server.controller');

module.exports = function(app){
	
	app.route('/categoria/:category/page/:page')
		.get(categories.getOffersByQuery);
};

