// casper.options.viewportSize = {width: 1024, height: 768};
var url = "http://localhost:3000/avaliacoes/geladeira-brastemp-clean-frost-free-378-l-220v";
//var url = "http://www.beforedeciding.com.br/reviews/7891129233614/offer/585a3e9dacee650400972bf7/page/1";

var mouse = require("mouse").create(casper);

casper.test.begin('Phantomjs Tests >> Reviews filters', 11, function(test) {

    casper.start(url, function() {

        casper.page.injectJs("https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js");

        // page information

        test.assertHttpStatus(200);
        test.assertTitle("Geladeira Brastemp Clean Frost Free 378 L 220V - ver avaliações - Decidaki", "Decidaki homepage title is the one expected");

        // simulated click to bd_boy_happy icon 
        this.echo('order reviews by bd boy happy ');
        this.evaluate(function() {
            document.getElementById("a_bd_boy_happy_icon").click();   
        });   

    }).then(function(){
        // bd boys counter
        test.assertElementCount('#review_title', 10,"it should find 10 #review_title elements");
        test.assertElementCount('.bd_boy_happy', 10,"it should find 10 .bd_boy_happy elements");
        test.assertElementCount('.bd_boy_sad_off', 0,"it should find 0 .bd_boy_sad_off elements");

        // simulated click to bd_boy_sad icon 
        this.echo('order reviews by bd boy sad ');
        this.evaluate(function() {
           document.getElementById("a_bd_boy_sad_icon").click();   
        });   

    }).then(function(){

        casper.wait(5000, function() {
             // bd boys counter
            test.assertElementCount('#review_title', 10,"it should find 10 #review_title elements");
            test.assertElementCount('.bd_boy_sad', 0,"it should find 4 .bd_boy_sad elements");
            test.assertElementCount('.bd_boy_happy_off',0,"it should find 0 .bd_boy_happy_off elements");
             // simulated click total reviews 
            this.echo('order reviews by total of reviews ');
            this.evaluate(function() {
               document.getElementById("a_total_reviews").click();   
            }); 
        });
       
    }).then(function(){

        casper.wait(5000, function() {
             // bd boys counter
            test.assertElementCount('#review_title', 10,"it should find 10 #review_title elements");
            test.assertElementCount('.bd_boy_happy_off',0,"it should not find .bd_boy_happy elements");
            test.assertElementCount('.bd_boy_sad_off', 0,"it should not find .bd_boy_happy_off elements");
        });

    }).run(function() {
        test.done();
    });
});


