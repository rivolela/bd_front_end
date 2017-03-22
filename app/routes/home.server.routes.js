var home = require('../controllers/home.server.controller');

module.exports = function(app){
	
	app.route('/home')
		// .post(home.getOffersByQuery)
		.get(home.getOffersByQuery);


	// app.route('/home/page/:page/filter/:filter')
	// 	.post(home.getOffersByQuery)
	// 	.get(home.getOffersByQuery);
	// app.route('/api/articles/:articleId')
	// 	.get(articles.read)
	// 	.put(users.requireLogin,articles.hasAuthorization,articles.update)
	// 	.delete(users.requireLogin,articles.hasAuthorization,articles.delete);

	// app.param('query',offers.getOffersByQuery);

};
