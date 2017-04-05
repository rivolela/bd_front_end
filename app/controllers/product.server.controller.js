var requestsUtile = require('../utile/requests.server.utile.js');
var config = require('../../config/config.js');
var validate = require("validate.js");



/**
 * [getProductByNameURL get product by name url of product]
 * @param  {request}   req [description]
 * @param  {response}  res [description]
 * @param  {Function} next [description]
 * @return {err}       [description]
 * @return {req.product} [description]
 */
exports.getProductByNameURL = function(req,res,next){
	console.log("getProductByNameURL");
	var nameurl = req.params.nameurl;
	console.log("req.params.nameurl >> ",nameurl);

	var url = config.service_host + '/api/products/nameurl/' + nameurl;
	console.log("url >>",url);
	var call = new requestsUtile();

	call.getJson(url,function(data,response,error){

		if(error){
			console.log(error);
			return next(err);
		}else{
			req.product = data;
			next();
		}
	});	
};

/**
 * [getProductByEAN get product by ean]
 * @param  {request}   req  [description]
 * @param  {response}   res [description]
 * @param  {Function} next [description]
 * @return {req.product}   [description]
 */
exports.getProductByEAN = function(req,res,next){

	var ean = req.body.ean;
	console.log("ean >>",ean);
	var url = config.service_host + '/api/products/ean/' + ean;
	var call = new requestsUtile();

	call.getJson(url,function(data,response,error){

		if(error){
			console.log(error);
			return next(err);
		}else{
			req.product = data;
			next();
		}
	});	
};
