var requestsUtile = require('../utile/requests.server.utile.js');
var config = require('../../config/config.js');
var SEO = require('../../config/seo/seo.js');
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


exports.getReviewsByProduct = function(req,res,next){

	var ean = req.product.docs[0].ean;
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
		var product = req.product.docs[0];
		console.log("product",product);

		res.render('reviews/reviews',{
			title: SEO.title_reviews,
			slogan: SEO.slogan,
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
			head_reviews:product.name,
			offers:req.offers,
			filter:filter,
			product: product,
			departamentBD: product.departamentBD,
			query: req.params.search,
			typeSearch: null,
			total: req.reviews.total,
		});

	});					

};

