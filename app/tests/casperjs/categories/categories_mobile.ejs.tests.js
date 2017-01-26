casper.options.viewportSize = {width: 320, height: 568};
// 
var url = "http://localhost:3000/categoria/geladeira/page/1";
//var teste;

casper.test.begin('Phantomjs Tests >> Categories', 5, function(test) {

    casper.start(url, function() {

        casper.page.injectJs("https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js");

        test.assertHttpStatus(200);
        test.assertTitle("Before Deciding - avaliações antes de comprar", "Before Deciding homepage title is the one expected");

    }).then(function() {

      // bd  boys counter
      test.assertElementCount('#href_bd_boy_happy', 10,"offers search for casperjs retrieves 10 href_bd_boy_happy selectors");
      test.assertElementCount('#href_bd_boy_sad', 10,"offers search for casperjs retrieves 10 href_bd_boy_sad selectors");

      test.assertEvalEquals(function() {
            return __utils__.findOne('#title_category').textContent;
      }, '\n        geladeira 57 ofertas\n      ');

      casper.capture("./app/tests/casperjs/categories/img/categories_mobile.png");
        
    }).run(function() {
      test.done();
    });
});
