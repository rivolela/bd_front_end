casper.options.viewportSize = {width: 320, height: 568};
// 
var url = "http://localhost:3000/categoria/geladeira/";
//var teste;

casper.test.begin('Phantomjs Tests >> Categories', 5, function(test) {

    casper.start(url, function() {

        casper.page.injectJs("https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js");

        test.assertHttpStatus(200);
        test.assertTitle("Before Deciding - veja avaliações de geladeira", "Before Deciding homepage title is the one expected");

    }).then(function() {

      // bd  boys counter
      test.assertElementCount('#href_bd_boy_happy', 20,"offers search for casperjs retrieves 20 href_bd_boy_happy selectors");
      test.assertElementCount('#href_bd_boy_sad', 20,"offers search for casperjs retrieves 20 href_bd_boy_sad selectors");

      test.assertEvalEquals(function() {
            return __utils__.findOne('#title_category').textContent;
      }, '\n \tgeladeira 131 ofertas\n ');

      casper.capture("./app/tests/casperjs/categories/img/categories_mobile.png");
        
    }).run(function() {
      test.done();
    });
});
