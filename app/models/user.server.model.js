var mongoose = require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
	firstName: String,
	lastName: String,
	email: {
		type: String,
		index: true,
		match: [/.+\@.+\..+/,"Please fill a valid e-mail address"]
	},
	picture:{
		type: String,
	},
	username: {
		type: String,
		unique:true,
		required: 'Username is required',
		trim:true
	},
	password: {
		type:String,
		validate: [
			function(password){
				return password.length > 6;
			},
			'Password should be longer']
	},
	// hash the password
	salt: {
		type:String,
	},
	// strategy to be used to register the user
	provider:{
		type:String,
		required: 'Provider is required'
	},
	// the user identifier for the authentication
	providerId:String,
	// store the user object retrieved from OAuth
	providerData:{},
	create: {
		type:Date,
		default: Date.now
	}
	// website: {
	// 	type:String,
	// 	get:function(url){
	// 		if(!url){
	// 			return url;
	// 		}else{
	// 			if(url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0){
	// 				url = 'http://' + url;
	// 			}
	// 			return url;
	// 		}
	// 	}
	// },
	// role: {
	// 	type:String,
	// 	enum:['Admin','Owner','User']
	// }
});



UserSchema.virtual('fullName').get(function(){
	return this.firstName + ' ' + this.lastName;
}).set(function(fullName){
	var splitName = fullName.split(' ');
	this.firstName = splitName[0] || '';
	this.lastName = splitName[1] || '';
});

// middleware to handle the hashing of user's passwords
UserSchema.pre('save',function(next){
	if(this.password){
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'),'base64');
		this.password = this.hashPassword(this.password);
	}

	next();
});


// UserSchema.methods.setPassword = function(password){
//     this.salt = crypto.randomBytes(16).toString('hex');
//     this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
// }

// UserSchema.methods.validatePassword = function(password){
//     var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
//     return this.hash === hash;
// };

// it is used to hash a password string by utilizing Node.js' crypto module
UserSchema.methods.hashPassword = function(password){
	return crypto.pbkdf2Sync(password,this.salt,10000,64).toString('base64');
};

// instance method tha accepts a string argumet, hashes it, qnd compares it to he current user's hashed password
UserSchema.methods.authenticate = function(password){
	return this.password === this.hashPassword(password);
};

// it is used to find an available unique username for new users
UserSchema.statics.findUniqueUsername = function(username,suffix,callback){
	var _this = this;
	var possibleUsername = username + (suffix || '');
	_this.findOne({username:possibleUsername},function(err,user){
		if(!err){
			if(!user){
				callback(possibleUsername);
			}else{
				return _this.findUniqueUsername(username,(suffix || 0) + 1,callback);
			}
		}else{
			callback(null);
		}
	});
};

UserSchema.set('toJson',{
	getters:true,
	virtuals:true
});

mongoose.model('User',UserSchema);

