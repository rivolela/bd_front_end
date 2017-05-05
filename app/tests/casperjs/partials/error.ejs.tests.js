var url = "http://localhost:3000/";
//var teste;

casper.test.begin('Phantomjs Tests >> Error page', 4, function(test) {

    casper.start(url, function() {

        casper.page.injectJs("https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js");

        test.assertHttpStatus(200);

        test.assertTitle("Decidaki - veja avaliações antes de decidir comprar!", "Decidaki homepage title is the one expected");

        // test using query = ˆ&%ˆˆ%&!@#$%
        this.echo('simulated click to search erererere');
        this.evaluate(function() {
            document.getElementById("input_search_offer").value = "erererere";
            document.getElementById("btnSearchOffers").click();
        });     

    }).then(function() {

        test.assertEvalEquals(function() {
            return __utils__.findOne('#div_error_msg').textContent;
        }, "\n        ×\n        Ops!! não encontramos avaliações para o seu produto desta vez!\n      ",
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
          test.assertElementCount('#href_bd_boy_happy', 20,"offers search for casperjs retrieves 20 href_bd_boy_happy selectors");
        });

    }).run(function() {
        test.done();
    });
});


