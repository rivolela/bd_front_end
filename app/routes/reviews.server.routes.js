var reviews = require('../controllers/reviews.server.controller');

module.exports = function(app){
	
	app.route('/reviews/ean/:ean/page/:page')
		.get(reviews.getReviewsByEan);

	// app.route('/api/articles/:articleId')
	// 	.get(articles.read)
	// 	.put(users.requireLogin,articles.hasAuthorization,articles.update)
	// 	.delete(users.requireLogin,articles.hasAuthorization,articles.delete);

	// app.param('query',offers.getOffersByQuery);

};
