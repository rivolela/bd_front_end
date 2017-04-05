var config = require('./config'),
	express = require('express'),
	morgan = require('morgan'),
	compress = require('compression'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	session = require('express-session'),
	cookieSession = require('cookie-session'),
	cookieParser = require('cookie-parser'),
	flash = require('connect-flash'),
	passport = require('passport');


module.exports = function(){
	var app = express();
	app.use(express.static('./public'));

	if(process.env.NODE_ENV==='development'){
		app.use(morgan('dev'));
	}else if (process.env.NODE_ENV==='production'){
		app.use(compress());
	}

	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
	app.use(cookieParser());
	// app.use(express.cookieParser(config.sessionSecret));
	app.use(methodOverride());
	// session express
	app.use(session({
		saveUninitialized: true,
		resave:false,
		secret:config.sessionSecret,
	}));
	// app.use(cookieSession({
	// 	name: 'bd',
	// 	keys: ['lp'],
	// 	secret:config.sessionSecret
	// }));

	//example : how to use cookie informations
	// app.use(function (req, res, next) {
 //  		// Update views 
 //  		req.session.views = (req.session.views || 0) + 1;
 //  		req.session.lp = (req.session.views || 0) + 1;
 
 //  		// Write response 
 //  		res.end(req.session.views + ' views');
	// });
 // 	app.get('/cookie',function(req, res){
 //    	res.cookie('bd', '1',{lp:1}).send('Cookie is set');
 //    	console.log("Cookies :  ", req.cookies.bd);
	// });

	app.set('view engine','ejs');
	app.set('views','./app/views');

	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());

	require('../app/routes/users.server.routes.js')(app);
	require('../app/routes/articles.server.routes.js')(app);
	require('../app/routes/home.server.routes.js')(app);
	require('../app/routes/lp.server.routes.js')(app);


	return app;
};
