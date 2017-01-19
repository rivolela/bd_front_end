var requestsUtile = require('../utile/requests.server.utile.js');
var config = require('../../config/config.js');
var validate = require("validate.js");

var constraints = {
  query: {
    format: {
      pattern: "[a-z0-9ãáàâíôóõúçéê_ ]+",
      flags: "i",
      message: "can only contain a-z ,0-9 and ã,á,à,â,í,ô,ó,õ,ú,ç,é,ê"
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
			env: process.env.NODE_ENV,
			slogan: config.slogan,
		});
	}else{
		return next(query,page);	
	};
			
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
					slogan: config.slogan,
					env: process.env.NODE_ENV
				});
			}
			else if(data.code == 500) {
				console.log("error >>", data.message);
				var message = "ops! ocorreu algum problema técnico. Fique tranquilo, o nosso time já está trabalhando na resolução. = )";
				res.render('partials/error',{
					title: config.title,
					message: message,
					slogan: config.slogan,
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

					res.render('offers/offers',{
						title: config.title,
						slogan: config.slogan,
						pagination: {
							page: page,
							from:from,
							to:to,
							next:next,
							previous:previous,
							pages:data.pages
						},
						offers: data,
						query: query,
						total: data.total,
						env: process.env.NODE_ENV,
						featureToogle: config.offers_toogle,
					});

				});
			};
		});
	});
	
}

// exports.read = function(req,res){
// 	console.log("testes server");
// 	res.json(req.article);
// };