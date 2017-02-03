var url = "http://localhost:3000/home";
//var teste;

casper.test.begin('Phantomjs Tests >> Offers_orders_reviews ', 15, function(test) {

    casper.start(url, function() {

        casper.page.injectJs("https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js");

        test.assertHttpStatus(200);
        test.assertTitle("Before Deciding - avaliações antes de comprar", "Before Deciding homepage title is the one expected");
       
        // test using query = eletrodomésticos
        test.assertExists('form[action="/home"]', "offer search form is found with query = eletrodomésticos");
          this.fill('form[action="/home"]', {
            query: "eletrodomésticos"
        }, true);
        test.assertElementCount('.total_review_order', 20,"it should find 20 .total_review_order elements");
        test.assertElementCount('.bd_boy_happy', 20,"it should find 10 .bd_boy_happy elements");
        test.assertElementCount('.bd_boy_sad', 20,"it should find 10 .bd_boy_sad elements");
       
    }).then(function(){

        // order by total de avaliações
        this.evaluate(function() {
           $('#select_reviews').val('1').change();
        });


    }).then(function() {

        casper.wait(5000, function() {
            // ordered by total de avaliações
            this.echo('ordered by total de avaliações');
            test.assertElementCount('.total_review_order', 20,"it should find 20 .total_review_order elements");
            test.assertElementCount('.bd_boy_happy_off', 0,"it should find 20 .bd_boy_happy_off elements");
            test.assertElementCount('.bd_boy_sad_off', 0,"it should find 20 .bd_boy_sad_off elements");
        });
         
    }).then(function(){
         // order by avaliações positivos
        this.evaluate(function() {
           $('#select_reviews').val('2').change();
        });

    }).then(function(){

        casper.wait(5000, function() {
            // ordered by avaliações positivos
            this.echo('ordered by avaliações positivos');
            test.assertElementCount('.total_review_order', 0,"it should find 20 .total_review_order elements");
            test.assertElementCount('.bd_boy_happy', 20,"it should find 10 .bd_boy_happy elements");
            test.assertElementCount('.bd_boy_sad_off',20,"it should find 10 .bd_boy_sad_off elements");
        });

    }).then(function(){

         // order by avaliações negativas
        this.evaluate(function() {
           $('#select_reviews').val('3').change();
        });

    }).then(function(){

        casper.wait(5000, function() {
            //ordered by avaliações negativas
            this.echo('ordered by avaliações negativas');
            test.assertElementCount('.total_review_order', 0,"it should find 0 .total_review_order elements");
            test.assertElementCount('.bd_boy_happy_off', 20,"it should find 10 .bd_boy_happy_off elements");
            test.assertElementCount('.bd_boy_sad', 20,"it should find 10 .bd_boy_sad elements");
        });

    }).run(function() {
      test.done();
    });
});