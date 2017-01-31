// casper.options.viewportSize = {width: 1024, height: 768};
var url = "http://localhost:3000/reviews/7891129233621/offer/588958555ae7250400b3877b/page/1";
//var url = "http://www.beforedeciding.com.br/reviews/7891129233614/offer/585a3e9dacee650400972bf7/page/1";

var mouse = require("mouse").create(casper);

casper.test.begin('Phantomjs Tests >> Reviews filters', 11, function(test) {

    casper.start(url, function() {

        casper.page.injectJs("https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js");

        // page information

        test.assertHttpStatus(200);
        test.assertTitle("Before Deciding - avaliações antes de comprar", "Before Deciding homepage title is the one expected");

        // simulated click to bd_boy_happy icon 
        this.echo('filter reviews by bd boy happy ');
        this.evaluate(function() {
            document.getElementById("a_bd_boy_happy_icon").click();   
        });   

    }).then(function(){
        // bd boys counter
        test.assertElementCount('#review_title', 10,"it should find 10 #review_title elements");
        test.assertElementCount('.bd_boy_happy', 11,"it should find 11 .bd_boy_happy elements");
        test.assertElementCount('.bd_boy_sad_off', 1,"it should find 1 .bd_boy_sad_off elements");

        // simulated click to bd_boy_sad icon 
        this.echo('filter reviews by bd boy sad ');
        this.evaluate(function() {
           document.getElementById("a_bd_boy_sad_icon").click();   
        });   

    }).then(function(){

        casper.wait(5000, function() {
             // bd boys counter
            test.assertElementCount('#review_title', 2,"it should find 2 #review_title elements");
            test.assertElementCount('.bd_boy_sad', 3,"it should find 1 .bd_boy_happy elements");
            test.assertElementCount('.bd_boy_happy_off', 1,"it should find 1 .bd_boy_happy_off elements");
             // simulated click total reviews 
            this.echo('filter reviews by total of reviews ');
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


