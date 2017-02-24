var url = "http://localhost:3000/categoria/geladeira/page/1";
//var teste;

casper.test.begin('Phantomjs Tests >> Categories', 5, function(test) {

    casper.start(url, function() {

        casper.page.injectJs("https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js");

        test.assertHttpStatus(200);
        test.assertTitle("Before Deciding - avaliações antes de comprar", "Before Deciding homepage title is the one expected");

    }).then(function() {

      // bd  boys counter
      test.assertElementCount('#href_bd_boy_happy', 20,"offers search for casperjs retrieves 20 href_bd_boy_happy selectors");
      test.assertElementCount('#href_bd_boy_sad', 20,"offers search for casperjs retrieves 20 href_bd_boy_sad selectors");

      test.assertEvalEquals(function() {
            return __utils__.findOne('#title_category').textContent;
      }, '\n \tgeladeira 131 ofertas\n ');
        
    }).run(function() {
      test.done();
    });
});


