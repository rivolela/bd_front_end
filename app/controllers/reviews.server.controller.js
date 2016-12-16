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



exports.getReviewsByEan = function(req,res){

	var ean = req.params.reviews;
	var offerId = req.params.offer;
	var page = req.params.page;

	if ((page === undefined ) || (page < 0)){
		page = 1;
	}

	var url = "https://bd-services.herokuapp.com/api/reviews/ean/" + ean + "/page/" + page + "/limit/10";

	console.log(url);

	var call = new requestsUtile();
	

	call.getJson(url,function(data,response,error){

		//console.log(data);

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
			var totalItems = Number(data.total);
			var totalItemsByPage = Number(data.items);
			var totalPaginacao = Number(data.pages);

			// date pagination
			var next = 0;
			var previous = 0;
			var start = 0;

			if(page >= 10){
				next = Number(page) + 9;
				previous = Number(page) - 9;
				start = Number(page)
			}else{
				next = 0;
				previous = 0;
				start = 1;
			}

			console.log("next >> ",next);
			console.log("previous >>",previous);


			res.render('reviews/reviews',{
				title: config.title,
				pagination: {
					totalPaginacao:totalPaginacao + 1,
					next: next,
					previous: previous,
					start: start,
					page: page,
					pages: data.pages
				},
				reviews: data,
				env: process.env.NODE_ENV,
				featureToogle: config.reviews_toogle,
				ean:ean,
				offerSelected:offerId,
				offers:req.offers
			});

		}
	});

};
