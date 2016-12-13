var url = "http://localhost:3000/reviews/7891129233621/offer/584fb2b19f97d20400af5c34/page/1";


casper.test.begin('Phantomjs Tests >> Reviews', 11, function(test) {

    casper.start(url, function() {

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

    }).run(function() {
        test.done();
    });
});


