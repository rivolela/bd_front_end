var offers = require('../controllers/offers.server.controller');

module.exports = function(app){
	
	app.route('/offers/')
		.post(offers.getOffersByQuery)
		.get(offers.getOffersByQuery);

	// app.route('/api/articles/:articleId')
	// 	.get(articles.read)
	// 	.put(users.requireLogin,articles.hasAuthorization,articles.update)
	// 	.delete(users.requireLogin,articles.hasAuthorization,articles.delete);

	// app.param('query',offers.getOffersByQuery);

};
