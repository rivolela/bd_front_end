var home = require('../controllers/home.server.controller');
// var categories = require('../controllers/categories.server.controller');
var reviews = require('../controllers/reviews.server.controller');
var offers = require('../controllers/offers.server.controller');
var product = require('../controllers/product.server.controller');
var search = require('../controllers/search.server.controller');

module.exports = function(app){
	
	app.route('/').get(home.checkCookie);

	app.route('/:search').get(search.searchOffers);

	app.route('/:search/:nameurl')
		.get(product.getProductByNameURL,
			 offers.getOffersByProduct,
			 reviews.getReviewsByProduct,
			 reviews.getReviewsByProductURl);

};
