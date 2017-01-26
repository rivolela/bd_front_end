var requestsUtile = require('../utile/requests.server.utile.js');
var config = require('../../config/config.js');



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

	if(to >= data.pages){
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

		
	var category = req.params.category;
	var page = req.params.page;

	if ((page === undefined ) || (page < 0)){
		page = 1;
	};

	var url = config.service_host + "/api/offers/bd/query/" + category + "/page/" + page + "/limit/10";

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

				res.render('categories/categories',{
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
					category:category,
					query: query,
					total: data.total,
					env: process.env.NODE_ENV,
					featureToogle: config.offers_toogle,
				});

			});
		};
	});
	
}

