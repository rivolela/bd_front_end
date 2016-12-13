var reviews = require('../controllers/reviews.server.controller');
var offers = require('../controllers/offers.server.controller');

module.exports = function(app){
	
	app.route('/reviews/:reviews/offer/:offer/page/:page')
		.get(reviews.getReviewsByEan);

	// app.route('/api/articles/:articleId')
	// 	.get(articles.read)
	// 	.put(users.requireLogin,articles.hasAuthorization,articles.update)
	// 	.delete(users.requireLogin,articles.hasAuthorization,articles.delete);

	app.param('reviews',offers.getOffersByEan);

};
