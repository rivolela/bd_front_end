var requestsUtile = require('../utile/requests.server.utile.js');
var config = require('../../config/config.js');

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


exports.getOffersByQuery = function(req,res,query){

	console.log("getOffersByQuery controller >> ");

	var query = req.body.query;
	var page = req.body.page;

	if ((page === undefined ) || (page < 0)){
		page = 0;
	}

	if(query === undefined){
		query = "geladeira";
	}

	var url = "https://bd-services.herokuapp.com/api/offers/zn/query/" + query + "/page/" + page + "/items/10";

	console.log(url);

	var call = new requestsUtile();
	

	call.getJson(url,function(data,response,error){

		if(data.items == 0){
			var message = "produto não encontrado";
			res.render('offers',{
				title: config.title,
				error:true,
				message: config.message_search_error,
				env: process.env.NODE_ENV
			});
		}
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
			var totalPaginacao = Math.trunc(totalItems / totalItemsByPage);

			// date pagination
			var next = 0;
			var previous = 0;
			var start = 0;

			if(page >= 10){
				next = Number(page) + 9;
				previous = Number(page) - 9;
				start = Number(page)
			}else{
				next = 10;
				previous = 0;
				start = 0;
			}

			console.log("next >> ",next);
			console.log("previous >>",previous);

			res.render('offers',{
				title:'Before Deciding - reviews antes de comprar',
				pagination: {
					totalPaginacao:totalPaginacao,
					next: next,
					previous: previous,
					start: start,
					page: page
				},
				offers: data,
				query: query,
				env: process.env.NODE_ENV,
				featureToogle: config.offers_toogle
			});

		}
	});


	// Article.findById(id).populate('creator','firstName lastName fullName').exec(function(err,article){
	// 	if(err){
	// 		return next(err);
	// 	}
	// 	if(!article){
	// 		return next(new Error('Failed to load article' + id));			
	// 	}
	// 	req.article = article;
	// 	next();
	// });
};

// exports.read = function(req,res){
// 	console.log("testes server");
// 	res.json(req.article);
// };