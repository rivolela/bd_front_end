var url = "http://localhost:3000/offers";
//var teste;

casper.test.begin('Phantomjs Tests >> Offers', 5, function(test) {

    casper.start(url, function() {

        test.assertHttpStatus(200);

        test.assertTitle("Before Deciding - reviews antes de comprar", "Before Deciding homepage title is the one expected");

        test.assertExists('form[action="/offers"]', "offer search form is found");
          this.fill('form[action="/offers"]', {
            query: "fogão"
        }, true);

    }).then(function() {

      test.assertEval(function() {
          return __utils__.findAll(".btn_reviews").length >= 8;
      }, "offers search for \"casperjs\" retrieves 8 or more results");

    }).then(function() {

       test.assertEval(function() {
          return __utils__.findAll("a").length >= 10;
      },"links pagination for \"casperjs\" retrieves 10 or more results");

    }).run(function() {
        test.done();
    });
});


