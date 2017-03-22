
var categories = require('../controllers/categories.server.controller');

module.exports = function(app){
	
	// app.route('/categoria/:category/page/:page')
	// 	.get(categories.getOffersByQuery);

	// app.route('/categoria/:category/')
	// 	.get(categories.getOffersByQuery);

	app.route('/categoria/:category/')
		.get(categories.getOffersByQuery)
		.post(categories.getOffersByQuery);

	// app.route('/categoria/:category/page/:page/order/:order')
	// 	.get(categories.getOffersByQuery);
};

