var config = require('../../config/config.js');
var SEO = require('../../config/seo/seo.js');


exports.render = function(req,res,next){
	res.render('lp/lp',{
		title:SEO.title,
		featureToogle: config.lp_toogle,
		env: process.env.NODE_ENV, 
	});
};
