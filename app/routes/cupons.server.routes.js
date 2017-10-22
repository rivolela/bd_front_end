module.exports = function(app){
	
	var cupon = require('../controllers/cupons.server.controller');
	
	app.route('/parceiros/incentivos/cupons').get(cupon.render);

};
