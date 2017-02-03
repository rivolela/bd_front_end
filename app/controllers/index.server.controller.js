var config = require('../../config/config.js');

/**
 * [checkCookie set cookie to mark user visit in the landing page ]
 * @param  {http}   req  
 * @param  {http}   res  
 * @param  {callback} next 
 * @return {resp,flagFirstVisit}  
 */
function checkCookie(req,res,next){
	console.log("check cookie");
	var cookie = req.cookies.bd_lp;
	var flagFirstVisit;

	if(cookie === undefined){
		console.log("cookie doesn't exist");
		res.cookie('bd_lp','1',{expires: new Date(Date.now() + (2000*24*60*60*1000)),encode: String});
		flagFirstVisit = true;
	}else{
		console.log("cookie exists");
		flagFirstVisit = false;
	}
	
	next(res,flagFirstVisit);
};


exports.render = function(req,res){
	// res.render('index',{
	// 	title:'Hello World',
	// 	user: JSON.stringify(req.user)
	// });
	// 
	checkCookie(req,res,function(resp,flagFirstVisit){

		if(flagFirstVisit){
			resp.render('lp/lp',{
				title:config.title,
				featureToogle: config.lp_toogle,
				env: process.env.NODE_ENV,
				//user: JSON.stringify(req.user)
			});
		}else{
			resp.redirect('/home');
		}
		
	});

	// if (req.session.lastVisit){
	// 	console.log(req.session.lastVisit);
	// }
	// req.session.lastVisit = new Date();
	// res.render('index',{title: 'hello world'});
};
