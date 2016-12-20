var url = "http://localhost:3000/offers";
//var teste;

casper.test.begin('Phantomjs Tests >> Error page', 5, function(test) {

    casper.start(url, function() {

        casper.page.injectJs("https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js");

        test.assertHttpStatus(200);

        test.assertTitle("Before Deciding - avaliações antes de comprar", "Before Deciding homepage title is the one expected");

        test.assertExists('form[action="/offers"]', "offer search form is found");
          this.fill('form[action="/offers"]', {
            query: "erererere"
        }, true);

    }).then(function() {

        test.assertEvalEquals(function() {
            return __utils__.findOne('#div_error_msg').textContent;
        }, "\n        ×\n        Ops!! não encontramos avaliações para o seu produto desta vez. No momento o Before Deciding está trabalhando somente com eletrodométicos.\n      ",
        'msg error should be set in error.ejs');

    }).then(function(){

        // simulated click to close msg error
        this.evaluate(function() {
          $('#btn_close_error').click();   
        });

    }).then(function(){

        // check redirect to offers page, after to close msg error
        casper.wait(5000, function() {
          // this.echo('should appear after 5s');
          test.assertElementCount('#href_bd_boy_happy', 10,"offers search for casperjs retrieves 20 href_bd_boy_happy selectors");
        });

    }).run(function() {
        test.done();
    });
});


