var reviews = require('../controllers/reviews.server.controller');
var offers = require('../controllers/offers.server.controller');

module.exports = function(app){
	
	app.route('/avaliacoes/:reviews/offer/:offer/page/:page')
		.get(reviews.getReviewsByProductURl);

	app.route('/avaliacoes/:reviews/offer/:offer/page/:page/filter/:filter')
		.get(reviews.getReviewsByProductURl);

	app.route('/avaliacoes/:avaliacoes')
		.post(offers.getOffersByEan,reviews.getReviewsByEan,reviews.getReviewsByProductURl);

	app.param('reviews',offers.getOffersByEan);

};


