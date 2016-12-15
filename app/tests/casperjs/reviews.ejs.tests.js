var url = "http://localhost:3000/reviews/7891129233621/offer/5852559e645fbb0400db7814/page/1ß";
var mouse = require("mouse").create(casper);

casper.test.begin('Phantomjs Tests >> Reviews', 13, function(test) {

    casper.start(url, function() {

        casper.page.injectJs("https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js");

        // page information
        test.assertHttpStatus(200);
        test.assertTitle("Before Deciding - reviews antes de comprar", "Before Deciding homepage title is the one expected");

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

        test.assertTextExists(bd_boy_value, "mouseover has title >> 'bd boy felizes'");

    }).then(function(){

        // tool_tip_bd_boy_sad.ejs
        var bd_boy_value = this.evaluate(function() {
            // show all tool tips
            $('a[data-toggle=tooltip]').tooltip("show");
            var bd_boy_sad = $(".tooltip-inner").children('strong')[1].textContent;
            return bd_boy_sad
        });

        // this.echo(bd_boy_value);

        test.assertTextExists(bd_boy_value, "mouseover has title >> 'bd boy tristes'");

    }).run(function() {
        test.done();
    });
});


