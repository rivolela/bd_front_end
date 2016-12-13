var url = "http://localhost:3000/offers";
//var teste;

casper.test.begin('Phantomjs Tests >> Offers', 5, function(test) {

    casper.start(url, function() {

        test.assertHttpStatus(200);

        test.assertTitle("Before Deciding - reviews antes de comprar", "Before Deciding homepage title is the one expected");

        test.assertExists('form[action="/offers"]', "offer search form is found");
          this.fill('form[action="/offers"]', {
            query: "geladeira"
        }, true);

    }).then(function() {

      test.assertEval(function() {
          return __utils__.findAll("h4").length >= 10;
      }, "offers search for \"casperjs\" retrieves 10 or more total of reviews results");

    }).then(function() {

       test.assertEval(function() {
          return __utils__.findAll("a").length >= 20;
      },"links pagination for \"casperjs\" retrieves 10 or more tags<a> ( bd boys happy and sad ) in results");

    }).run(function() {
        test.done();
    });
});


