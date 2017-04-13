casper.options.viewportSize = {width: 1200, height: 900};

var url = "http://localhost:3000/";
//var teste;

casper.test.begin('Phantomjs Tests >> Offers_orders_reviews ', 14, function(test) {

    casper.start(url, function() {

        casper.page.injectJs("https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js");

        test.assertHttpStatus(200);
        test.assertTitle("Decidaki - veja avaliações antes de decidir comprar!", "Decidaki homepage title is the one expected");
        
        this.echo('simulated click to search eletrodomésticos');

        this.evaluate(function() {
            document.getElementById("input_search_offer").value = "eletrodomésticos";
            document.getElementById("btnSearchOffers").click();
        });     
       
    }).then(function(){
        casper.wait(5000, function() {
            test.assertElementCount('#txt_ver_avaliacoes', 10,"it should find 10 #txt_ver_avaliacoes elements");
            test.assertElementCount('.bd_boy_happy', 20,"it should find 20 .bd_boy_happy elements");
            test.assertElementCount('.bd_boy_sad', 20,"it should find 20 .bd_boy_sad elements");
        });
      
    }).then(function(){

        // order by total de avaliações
        this.evaluate(function() {
           $('#select_reviews').val('1').change();
        });


    }).then(function() {

        casper.wait(5000, function() {
            // ordered by total de avaliações
            this.echo('ordered by total de avaliações');
            test.assertElementCount('#txt_ver_avaliacoes', 10,"it should find 10 #txt_ver_avaliacoes elements");
            test.assertElementCount('.bd_boy_happy_off', 0,"it should find 0 .bd_boy_happy_off elements");
            test.assertElementCount('.bd_boy_sad_off', 0,"it should find 0 .bd_boy_sad_off elements");
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
            test.assertElementCount('#txt_ver_avaliacoes', 10,"it should find 20 #txt_ver_avaliacoes elements");
            test.assertElementCount('.bd_boy_happy', 20,"it should find 20 .bd_boy_happy elements");
            test.assertElementCount('.bd_boy_sad_off',0,"it should find 0 .bd_boy_sad_off elements");
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
            test.assertElementCount('#txt_ver_avaliacoes', 10,"it should find 0 #txt_ver_avaliacoes elements");
            test.assertElementCount('.bd_boy_happy_off', 0,"it should find 0 .bd_boy_happy_off elements");
            test.assertElementCount('.bd_boy_sad', 20,"it should find 20 .bd_boy_sad elements");
        });

    }).run(function() {
      test.done();
    });
});