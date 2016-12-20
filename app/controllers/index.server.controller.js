var config = require('../../config/config.js');

exports.render = function(req,res){
	// res.render('index',{
	// 	title:'Hello World',
	// 	user: JSON.stringify(req.user)
	// });
	res.render('lp',{
		title:config.title,
		featureToogle: config.lp_toogle,
		env: process.env.NODE_ENV
		//user: JSON.stringify(req.user)
	});
	// if (req.session.lastVisit){
	// 	console.log(req.session.lastVisit);
	// }
	// req.session.lastVisit = new Date();
	// res.render('index',{title: 'hello world'});
};
