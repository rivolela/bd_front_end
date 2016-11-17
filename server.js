process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose'),
	express = require('./config/express'),
	passport = require('./config/passport');

var db = mongoose();
var app = express();
var passport = passport();

//app.listen(3000);
var server_port;

if(process.env.NODE_ENV == 'production'){
	server_port = process.env.PORT || 80;
}else{
	server_port = 3000;
}

app.listen(server_port,function() {
    console.log('Server runnning on port %d', server_port);
});

module.exports = app; 


