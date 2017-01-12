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
 * @description return pagination of offers page
 * @param  {data} return of bd services api
 * @param  {page} current page
 * @param  {callback} 
 * @return {from,to,previous,next} 
 */
function pagination(data,page,callback){

	if(Number(page) <= data.limit){
		var to = data.limit;
		var from = 1;
		var previous = 0;
		var next = to + 1;
	}else{
		var decimal = Math.floor((Number(page) / data.limit));
		var to = (decimal + 1) * data.limit;
		var from = (to - data.limit) + 1;
		var previous = from - data.limit;
		var next = to + 1;
	};

	if(to > data.pages){
		to = data.pages;
		next = 0;
	};

	console.log("from >> ",from);
	console.log("to >>",to);
	console.log("next >> ",next);
	console.log("previous >>",previous);

	return callback(from,to,previous,next);
}



exports.getReviewsByEan = function(req,res){

	var ean = req.params.reviews;
	var offerId = req.params.offer;
	var page = req.params.page;

	if ((page === undefined ) || (page < 0)){
		page = 1;
	}

	var url = config.service_host  + "/api/reviews/ean/" + ean + "/page/" + page + "/limit/10";

	console.log(url);

	var call = new requestsUtile();
	

	call.getJson(url,function(data,response,error){

		console.log("offers",req.offers);

		if(data.code == 500) {
			console.log("error >>", data.message);
			var message = "ops! ocorreu algum problema técnico. Fique tranquilo, o nosso time já está trabalhando na resolução. = )";
			res.render('offers',{
				title: config.title,
				error:true,
				message: message,
				env: process.env.NODE_ENV
			});
		}
		else if(error){
			console.log("error",error);
			return res.status(400).send({
				message: getErrorMessage(error)
			});
		}else{
			console.log(data);
			
			pagination(data,page,function(from,to,previous,next){

				var offers = req.offers;
				console.log("offers",offers.docs.length);
				var teste = offers.docs[0];
				console.log(teste);

				res.render('reviews/reviews',{
					title: config.title,
					pagination: {
						page: page,
						from:from,
						to:to,
						next:next,
						previous:previous
					},
					reviews: data,
					env: process.env.NODE_ENV,
					featureToogle: config.reviews_toogle,
					ean:ean,
					offerSelected:offerId,
					head_reviews:teste,
					offers:offers,
				});

			});					
		}
	});

};

