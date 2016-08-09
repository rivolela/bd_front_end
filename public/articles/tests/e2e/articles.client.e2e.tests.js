describe('Articles E2E Tests:',function(){
	describe('New Article Page',function(){
		it('Should not be able to create a new article',function(){
			browser.get('http://localhost:3000/#!/articles/create');
			element(by.id('teste')).click();
			element(by.id('teste2')).getText().then(function(errorText){
				expect(errorText).toBe('User is not logged in');
			});
		});
	});
});

