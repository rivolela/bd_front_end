var url = "http://localhost:3000/reviews/7891129233621/offer/58579bdbd8d57d04007a6ffd/page/1";

var mouse = require("mouse").create(casper);

casper.test.begin('Phantomjs Tests >> Reviews', 13, function(test) {

    casper.start(url, function() {

        casper.page.injectJs("https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js");

        // page information
        test.assertHttpStatus(200);
        test.assertTitle("Before Deciding - avaliações antes de comprar", "Before Deciding homepage title is the one expected");

    }).then(function() {

        // box_offers.ejs
        test.assertEvalEquals(function() {
            return __utils__.findOne('#name_offer').textContent;
        }, 'Fogão 4 Bocas Brastemp Clean', 'should return #name_offer === Fogão 4 Bocas Brastemp Clean');

        test.assertElementCount('#img_picture_offer', 1);
        test.assertSelectorHasText('#counter_happy', '16');
        test.assertSelectorHasText('#counter_sad', '2');

    }).then(function() {

        // list_reviews.ejs
        test.assertElementCount('#review_title', 10);
        test.assertElementCount('#bd_boy_review', 10);
        test.assertElementCount('#review_description', 10);
        test.assertElementCount('#review_author', 10);

    }).then(function(){

        // pagination_reviews.ejs
        test.assertElementCount('#pagination_numbers_reviews', 2);

    }).then(function(){
        
        // tool_tip_bd_boy_happy.ejs
        var bd_boy_value = this.evaluate(function() {
            // show all tool tips
            $('a[data-toggle=tooltip]').tooltip("show");
            var bd_boy_happy = $(".tooltip-inner").children('strong')[0].textContent;
            return bd_boy_happy
        });

        test.assertEquals(bd_boy_value,"avaliações com \n4 ou 5 estrelas\n" ,"bd boy happy mouseover has text >> 'avaliações com 4 ou 5 estrelas'");

    }).then(function(){

        // tool_tip_bd_boy_sad.ejs
        var bd_boy_value = this.evaluate(function() {
            // show all tool tips
            $('a[data-toggle=tooltip]').tooltip("show");
            var bd_boy_sad = $(".tooltip-inner").children('strong')[1].textContent;
            return bd_boy_sad
        });

        // this.echo(bd_boy_value);

       test.assertEquals(bd_boy_value,"avaliações com \n1, 2 ou 3 estrelas\n" ,"bd boy sad mouseover has text >> 'avaliações com 1, 2 ou 3 estrelas'");

    }).run(function() {
        test.done();
    });
});


