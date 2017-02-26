var url = "http://localhost:3000/home";
//var teste;

casper.test.begin('Phantomjs Tests >> Search Offers', 8, function(test) {

    casper.start(url, function() {

        test.assertHttpStatus(200);
        test.assertTitle("Before Deciding - veja avaliações antes de comprar", "Before Deciding homepage title is the one expected");
       
        // test using query = geladeira
        
        test.assertExists('form[action="/home"]', "offer search form is found with query = geladeira");
          this.fill('form[action="/home"]', {
            query: "geladeira"
        }, true);
        test.assertElementCount('#href_bd_boy_happy', 20,"offers search for casperjs retrieves 20 href_bd_boy_happy selectors");

    }).then(function() {

        // test using query = "" 
        
        test.assertExists('form[action="/home"]', "offer search form is found with query = '' ");
          this.fill('form[action="/home"]', {
        }, true);
        test.assertElementCount('#href_bd_boy_happy', 20,"offers search for casperjs retrieves 20 href_bd_boy_happy selectors");

    }).then(function(){

        // test using query = ˆ&%ˆˆ%&!@#$%
        
        test.assertExists('form[action="/home"]', "offer search form is found with query = ˆ&%ˆˆ%&!@#$%");
          this.fill('form[action="/home"]', {
            query: "ˆ&%ˆˆ%&!@#$%"
        }, true);
        
    }).then(function(){
         // check redirect to offers page, after to close msg error
        casper.wait(5000, function() {
            this.echo('should appear after 5s');
            test.assertEvalEquals(function() {
                return __utils__.findOne('#div_error_msg').textContent;
            }, "\n        ×\n        Por favor, digite um produto válido para o Before Deciding buscar os reviews !\n      ",
            'msg error should be set in error.ejs');        
        });
        
    }).run(function() {
      test.done();
    });
});


