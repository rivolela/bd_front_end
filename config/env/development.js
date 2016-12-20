module.exports = {
	// Development configuration options
	db:'mongodb://localhost/mean-book',
	sessionSecret:'developmentSessionSecret',

	// messages
	message_search_error:'Ops!! não encontramos avaliações para o seu produto desta vez. No momento o Before Deciding está trabalhando somente com eletrodométicos.',
	title: 'Before Deciding - avaliações antes de comprar',

	// toogle
	lp_toogle:true,
	offers_toogle:false,
	reviews_toogle:false,

	facebook:{
		clientID:'101029623673783',
		clientSecret:'048b2d74eec461e2647dcce53194fa9b',
		callbackURL: 'http://localhost:3000/oauth/facebook/callback',
	 	profileFields: ['emails', 'displayName','name','photos','gender']
	 },
	 twitter:{
	 	clientID:'mPw8xcOvWQWCTJ01T0kwM5W98',
	 	clientSecret:'k1sIPj161QwQRitpeTV4WBGzOgSOJfSd8Egve859k2JRdgwIp9',
	 	callbackURL: 'http://localhost:3000/oauth/twitter/callback'
	 },
	 google:{
	 	clientID:'416679921997-pod9rv1pq75rfbrt2l38cvc6cq2qscde.apps.googleusercontent.com',
	 	clientSecret:'LRCW9Q90b7Uo_df9F8B5-Fzv',
	 	callbackURL: 'http://localhost:3000/oauth/google/callback'
	 }
};


