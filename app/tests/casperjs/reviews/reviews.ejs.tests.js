// casper.options.viewportSize = {width: 1024, height: 768};
var url = "http://localhost:3000/geladeira/geladeira-brastemp-clean-frost-free-378-l-220v";
//var url = "http://www.beforedeciding.com.br/reviews/7891129233614/offer/585a3e9dacee650400972bf7/page/1";

var mouse = require("mouse").create(casper);

casper.test.begin('Phantomjs Tests >> Reviews', 17, function(test) {

    casper.start(url, function() {

        casper.page.injectJs("https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js");

        // page information

        test.assertHttpStatus(200);
        test.assertTitle("Geladeira Brastemp Clean Frost Free 378 L 220V - ver avaliações - Decidaki", "Decidaki homepage title is the one expected");

    }).then(function() {

        // box_reviews.ejs

        test.assertEvalEquals(function() {
            return __utils__.findOne('#name_offer').textContent;
        }, 'Geladeira Brastemp Clean Frost Free 378 L 220V', 'should return #name_offer === Geladeira Brastemp Clean Frost Free 378 L 220V');

        test.assertElementCount('#img_picture_offer', 1);
        test.assertSelectorHasText('#counter_happy', '37');
        test.assertSelectorHasText('#counter_sad', '3');

    }).then(function() {

        // list_reviews.ejs

        test.assertElementCount('#review_title', 10);
        test.assertElementCount('#bd_boy_review', 10);
        test.assertElementCount('#review_description', 10);
        test.assertElementCount('#review_author', 10);

    }).then(function(){

        // pagination_reviews.ejs

        test.assertElementCount('#pagination_numbers_reviews', 4);

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

    }).then(function() {

        // box_prices_offer.ejs

        // desktop + mobile 
        test.assertElementCount('#href_ir_loja', 6);
        test.assertElementCount('#img_retailer', 6);
        test.assertElementCount('#href_offer_price', 6); 
        // casper.click("a[href*='/programming/new/']");

        //simulated click to href_ir_loja
        this.evaluate(function() {
            var url = $("#href_ir_loja").prop('href');
            window.location.href = url;
        });                       

    }).then(function(){
             // check redirect to offers page, after to close msg error
        casper.wait(5000, function() {
            this.echo('should appear after 5s');
            // test redirect and title offer page 
            test.assertTitle("Geladeira Frost Free 378 L Brastemp Clean - Brastemp", "Store homepage title is the one expected");
    
            casper.capture("./app/tests/casperjs/reviews/img/redirect_evidence.png");     
        });
        
    }).run(function() {
        test.done();
    });
});


