var requestsUtile = require('../utile/requests.server.utile.js');
var config = require('../../config/config.js');
var validate = require("validate.js");

var constraints = {
  query: {
    format: {
      pattern: "[a-z0-9]+",
      flags: "i",
      message: "can only contain a-z and 0-9"
    }
  }
};


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


exports.list = function(req,res){
	Article.find().sort('-created').populate('creator','firstName last name fullName').exec(function(err,articles){
		if(err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			res.json(articles);
		}
	});
};

/**
 * @description list offers by ean 
 * @param  {req}
 * @param  {res}
 * @param  {next}
 * @return {list of offers of ean requested}
 */
exports.getOffersByEan = function(req,res,next){

	var ean = req.params.reviews;
	var url = config.service_host + '/api/offers/bd/ean/' + ean + '/page/1/limit/100/';
	var call = new requestsUtile();

	call.getJson(url,function(data,response,error){

		if(error){
			console.log(error);
			return next(err);
		}else{
			req.offers = data;
			next();
		}
	});	
};


function validateSearch(req,res,query,next){

	console.log("validate Search >> ");

	var page = req.body.page;

	if ((page === undefined ) || (page < 0)){
		page = 1;
	};

	var query = req.body.query;

	if ((validate.isEmpty(query)) || (query === undefined)){
		
		query = "brastemp";
		return next(query,page);

	}else if(validate({query: query}, constraints)){

		res.render('partials/error',{
			title: config.title,
			message: config.message_search_validate,
			env: process.env.NODE_ENV
		});
	}else{
		return next(query,page);	
	};
			
};


exports.getOffersByQuery = function(req,res,query){

	console.log("getOffersByQuery controller >> ");	

	validateSearch(req,res,query,function(query,page){
		
		console.log("query",query);
		var url = config.service_host + "/api/offers/bd/query/" + query + "/page/" + page + "/limit/10";

		console.log(url);

		var call = new requestsUtile();

		call.getJson(url,function(data,response,error){

			if(data.total == 0){
				var message = "produto não encontrado";
				res.render('partials/error',{
					title: config.title,
					message: config.message_search_error,
					env: process.env.NODE_ENV
				});
			}
			else if(data.code == 500) {
				console.log("error >>", data.message);
				var message = "ops! ocorreu algum problema técnico. Fique tranquilo, o nosso time já está trabalhando na resolução. = )";
				res.render('partials/error',{
					title: config.title,
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

				// date pagination
				var next = 0;
				var previous = 1;
				var start = 1;

				if(page >= 10){
					next = Number(page) + 9;
					previous = Number(page) - 9;
					start = Number(page)
				}else{
					next = 10;
					previous = 1;
					start = 1;
				}

				console.log("next >> ",next);
				console.log("previous >>",previous);

				res.render('offers/offers',{
					title: config.title,
					pagination: {
						next: next,
						previous: previous,
						start: start,
						page: page,
						pages: data.pages
					},
					offers: data,
					query: query,
					env: process.env.NODE_ENV,
					featureToogle: config.offers_toogle,
				});

			}
		});
	})
	
};

// exports.read = function(req,res){
// 	console.log("testes server");
// 	res.json(req.article);
// };