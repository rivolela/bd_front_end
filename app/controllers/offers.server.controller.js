var requestsUtile = require('../utile/requests.server.utile.js');
var config = require('../../config/config.js');
var validate = require("validate.js");



/**
 * @description list offers by ean 
 * @param  {req}
 * @param  {res}
 * @param  {next}
 * @return {list of offers of ean requested}
 */
exports.getOffersByEan = function(req,res,next){

	var ean = req.body.ean;
	console.log("ean >>",ean);
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


exports.getOffersByProduct = function(req,res,next){

	var ean = req.product.docs[0].ean;
	console.log("ean >>",ean);
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
