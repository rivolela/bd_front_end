var reviews = require('../controllers/reviews.server.controller');
var offers = require('../controllers/offers.server.controller');
var product = require('../controllers/product.server.controller');

module.exports = function(app){
	
	// app.route('/avaliacoes/:reviews/offer/:offer/page/:page')
	// 	.get(reviews.getReviewsByProductURl);

	// app.route('/avaliacoes/:reviews/offer/:offer/page/:page/filter/:filter')
	// 	.get(reviews.getReviewsByProductURl);

	app.route('/avaliacoes/:avaliacoes')
		.get(	offers.getOffersByProduct,
				reviews.getReviewsByProduct,
				reviews.getReviewsByProductURl)
		.post(	product.getProductByNameURL,
				offers.getOffersByEan,
				reviews.getReviewsByEan,
				reviews.getReviewsByProductURl);

	app.param('avaliacoes',product.getProductByNameURL);

};


