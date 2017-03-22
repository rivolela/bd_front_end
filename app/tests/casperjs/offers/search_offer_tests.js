var url = "http://localhost:3000/home";
//var teste;

casper.test.begin('Phantomjs Tests >> Search Offers', 5, function(test) {

    casper.start(url, function() {

        test.assertHttpStatus(200);
        test.assertTitle("Before Deciding - veja avaliações antes de comprar", "Before Deciding homepage title is the one expected");
       
        this.echo('simulated click to search eletrodomésticos');
        this.evaluate(function() {
            document.getElementById("input_search_offer").value = "geladeira";
            document.getElementById("btnSearchOffers").click();
        });       
        test.assertElementCount('#href_bd_boy_happy', 20,"offers search for casperjs retrieves 20 href_bd_boy_happy selectors");

    }).then(function() {

        // test using query = "" 
        this.echo('simulated click to search " "');
        this.evaluate(function() {
            document.getElementById("input_search_offer").value = " ";
            document.getElementById("btnSearchOffers").click();
        });       
        test.assertElementCount('#href_bd_boy_happy', 20,"offers search for casperjs retrieves 20 href_bd_boy_happy selectors");

    }).then(function(){

        // test using query = ˆ&%ˆˆ%&!@#$%
        this.echo('simulated click to search ˆ&%ˆˆ%&!@#$% ');
        this.evaluate(function() {
            document.getElementById("input_search_offer").value = "ˆ&%ˆˆ%&!@#$%";
            document.getElementById("btnSearchOffers").click();
        });     
        
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


