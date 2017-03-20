var requestsUtile = require('../utile/requests.server.utile.js');
var config = require('../../config/config.js');
var fs = require('fs');
var ejs = require('ejs');

exports.render = function(req,res){

	res.render('offers',{
		title:'Before Deciding - reviews antes de comprar',
		//user: JSON.stringify(req.user)
	});

};


var getErrorMessage = function(err){
	if(err.errors){
		for (var errName in err.errors){
			if(err.errors[errName].message){
				return err.errors[errName].message;
			}
		}
	}else{
		return 'Unknown server error';
	}
};


/**
 * @description return pagination of reviews page
 * @param  {data} return of bd services api
 * @param  {page} current page
 * @param  {callback} 
 * @return {from,to,previous,next} 
 */
function pagination(limit,page,pages,callback){

	if(Number(page) <= limit){
		var to = limit;
		var from = 1;
		var previous = 0;
		var next = to + 1;
	}else{
		var decimal = Math.floor((Number(page) / limit));
		var to = (decimal + 1) * limit;
		var from = (to - limit) + 1;
		var previous = from - limit;
		var next = to + 1;
	};

	if(to > pages){
		to = pages;
		next = 0;
	};

	console.log("from >> ",from);
	console.log("to >>",to);
	console.log("next >> ",next);
	console.log("previous >>",previous);

	return callback(from,to,previous,next);
}


/**
 * @description list offers by ean 
 * @param  {req}
 * @param  {res}
 * @param  {next}
 * @return {list of offers of ean requested}
 */
exports.getReviewsByEan = function(req,res,next){

	var ean = req.body.ean;
	var page = req.query.page;
	var filter = req.query.filter;

	if ((page === undefined ) || (page < 0)){
		page = 1;
	}

	if ((filter === undefined ) || (filter < 0)){
		filter = 0;
	}

	var url = config.service_host  + "/api/reviews/ean/" + ean + "/page/" + page + "/limit/10/filter/" + filter ;
	var call = new requestsUtile();

	call.getJson(url,function(data,response,error){

		if(error){
			console.log(error);
			return next(err);
		}else{
			req.reviews = data;
			next();
		}
	});	
};


// exports.getReviewsByEan = function(req,res){

// 	var ean = req.params.reviews;
// 	var offerId = req.params.offer;
// 	var page = req.params.page;
// 	var filter = req.params.filter;

// 	if ((page === undefined ) || (page < 0)){
// 		page = 1;
// 	}

// 	if ((filter === undefined ) || (filter < 0)){
// 		filter = 0;
// 	}

// 	var url = config.service_host  + "/api/reviews/ean/" + ean + "/page/" + page + "/limit/10/filter/" + filter ;

// 	console.log(url);

// 	var call = new requestsUtile();
	

// 	call.getJson(url,function(data,response,error){

// 		console.log("offers",req.offers);

// 		if(data.code == 500) {
// 			console.log("error >>", data.message);
// 			var message = "ops! ocorreu algum problema técnico. Fique tranquilo, o nosso time já está trabalhando na resolução. = )";
// 			res.render('offers',{
// 				title: config.title,
// 				error:true,
// 				message: message,
// 				env: process.env.NODE_ENV
// 			});
// 		}
// 		else if(error){
// 			console.log("error",error);
// 			return res.status(400).send({
// 				message: getErrorMessage(error)
// 			});
// 		}else{
// 			console.log(data);
			
// 			pagination(data,page,function(from,to,previous,next){

// 				var offers = req.offers;
// 				console.log("offers",offers.docs.length);
// 				var teste = offers.docs[0];
// 				console.log(teste);

// 				res.render('reviews/reviews',{
// 					title: config.title,
// 					slogan: config.slogan,
// 					pagination: {
// 						page: page,
// 						from:from,
// 						to:to,
// 						next:next,
// 						previous:previous,
// 						pages:data.pages
// 					},
// 					reviews: data,
// 					env: process.env.NODE_ENV,
// 					featureToogle: config.reviews_toogle,
// 					ean:ean,
// 					offerSelected:offerId,
// 					head_reviews:teste,
// 					offers:offers,
// 					filter:filter
// 				});

// 			});					
// 		}
// 	});

// };


exports.getReviewsByProductURl = function(req,res){

	var ean = req.body.ean;
	var offerId = req.body.offer;
	var page = req.query.page;
	var filter = req.query.filter;

	if ((page === undefined ) || (page < 0)){
		page = 1;
	}

	if ((filter === undefined ) || (filter < 0)){
		filter = 0;
	}

	var call = new requestsUtile();
	var limit = req.reviews.limit;
	var pages = req.reviews.pages;
	
	pagination(limit,page,pages,function(from,to,previous,next){

		var offers = req.offers;
		
		console.log("offers",offers.docs.length);
		var teste = offers.docs[0];
		console.log(teste);

		res.render('reviews/reviews',{
			title: config.title,
			slogan: config.slogan,
			pagination: {
				page: page,
				from:from,
				to:to,
				next:next,
				previous:previous,
				pages:pages
			},
			reviews: req.reviews,
			env: process.env.NODE_ENV,
			featureToogle: config.reviews_toogle,
			ean:ean,
			offerSelected:offerId,
			head_reviews:teste,
			offers:offers,
			filter:filter
		});

	});					

};

