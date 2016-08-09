// jshint expr:true
var passport = require('passport'),
	url = require('url'),
	FacebookStrategy = require('passport-facebook').Strategy,
	config = require('../config'),
	users = require('../../app/controllers/users.server.controller');
	User = require('mongoose').model('User'),

module.exports = function() {
	passport.use(new FacebookStrategy({
		clientID:config.facebook.clientID,
		clientSecret:config.facebook.clientSecret,
		callbackURL:config.facebook.callbackURL,
		profileFields: config.facebook.profileFields},

		function(req,acessToken,refreshToken,profile,done){

			var providerData = profile._json;
			providerData.acessToken = acessToken;
			providerData.refreshToken = refreshToken;

			var providerUserProfile = {
				firstName: profile.name.givenName,
				lastName: profile.name.familyName,
				fullName: profile.displayName,
				email: profile.emails[0].value,
				username: profile.username,
				provider:'facebook',
				providerID: profile.id,
				picture: profile.photos[0].value,
				providerData: providerData
			};

			users.saveOAuthUserProfile(req,providerUserProfile,done);
		}
	));

};
