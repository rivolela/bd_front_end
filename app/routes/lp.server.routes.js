module.exports = function(app){
	
	var lp = require('../controllers/lp.server.controller');
	
	app.route('/lp/welcome').get(lp.render);
};
