var users = require('../../app/controllers/users.server.controller'),
	passport = require('passport');

module.exports = function(app){
	app.route('/signup')
		.get(users.renderSignup)
		.post(users.signup);

	app.route('/signin')
		.get(users.renderSignin)
		.post(passport.authenticate('local',{
			successRedirect:'/',
			failureRedirect:'/signin',
			failureFlash:true,
		}));

	app.get('/signout',users.signout);

	app.get('/oauth/facebook',passport.authenticate('facebook',{
	 		scope:'email',
	 		failureRedirect:'/signin',
	 	}));

	 app.get('/oauth/facebook/callback', 
          passport.authenticate('facebook', { 
                                successRedirect: '/',
                                failureRedirect: '/signin',
                               	
          })); 


	app.get('/oauth/twitter',passport.authenticate('twitter',{
			failureRedirect:'/signin',
			failureFlash: true // optional, see text as well
		}));

	app.get('/oauth/twitter/callback', 
         passport.authenticate('twitter', { 
                                successRedirect: '/',
                                failureRedirect: '/signin',
                                failureFlash: true // optional, see text as well
         })); 

	
	app.get('/oauth/google',passport.authenticate('google',{
		scope: ['https://www.googleapis.com/auth/plus.me','https://www.google.com/m8/feeds', 'https://www.googleapis.com/auth/userinfo.email','https://www.googleapis.com/auth/userinfo.profile'],
		failureRedirect:'/signin',
		}));

	app.get('/oauth/google/callback', 
         passport.authenticate('google', { 
                                successRedirect: '/',
                                failureRedirect: '/signin',
                                failureFlash: true // optional, see text as well
         })); 


	app.route('/users')
		.post(users.create)
		.get(users.list);

	app.param('userId',users.userByID);

	app.route('/users/:userId')
		.get(users.read)
		.put(users.update)
		.delete(users.delete);
	
};


