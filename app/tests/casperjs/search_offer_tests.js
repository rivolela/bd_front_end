var url = "http://localhost:3000/offers";
//var teste;

casper.test.begin('Phantomjs Tests >> Search Offers', 8, function(test) {

    casper.start(url, function() {

        test.assertHttpStatus(200);
        test.assertTitle("Before Deciding - avaliações antes de comprar", "Before Deciding homepage title is the one expected");
        
        // test using query = geladeira

        test.assertExists('form[action="/offers"]', "offer search form is found with query = geladeira");
          this.fill('form[action="/offers"]', {
            query: "geladeira"
        }, true);
        test.assertElementCount('#href_bd_boy_happy', 10,"offers search for casperjs retrieves 20 href_bd_boy_happy selectors");

    }).then(function() {

        // test using query = null, "" or undefinied

        test.assertExists('form[action="/offers"]', "offer search form is found with query = '' ");
          this.fill('form[action="/offers"]', {
        }, true);
        test.assertElementCount('#href_bd_boy_happy', 10,"offers search for casperjs retrieves 20 href_bd_boy_happy selectors");

    }).then(function(){

        // test using query = ˆ&%ˆˆ%&!@#$%

        test.assertExists('form[action="/offers"]', "offer search form is found with query = ˆ&%ˆˆ%&!@#$%");
          this.fill('form[action="/offers"]', {
            query: "ˆ&%ˆˆ%&!@#$%"
        }, true);
        
    }).then(function(){

        casper.wait(5000, function() {
            test.assertEvalEquals(function() {
            return __utils__.findOne('#div_error_msg').textContent;
        }, "Por favor, digite um produto válido para o Before Deciding buscar os reviews !",
        'msg error should be set in error.ejs');

        });
      
    }).run(function() {
      test.done();
    });
});


