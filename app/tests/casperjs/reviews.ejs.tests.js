var url = "http://localhost:3000/reviews/ean/7891129206205/page/1";
//var teste;

casper.test.begin('Phantomjs Tests >> Reviews', 5, function(test) {

    casper.start(url, function() {

        test.assertHttpStatus(200);

        test.assertTitle("Before Deciding - reviews antes de comprar", "Before Deciding homepage title is the one expected");

    }).then(function() {

        test.assertEval(function() {
            return __utils__.findAll("img").length >= 10;
        }, "reviews list search for \"casperjs\" retrieves 8 or more <img> tags bd_boys");

    }).then(function() {

        test.assertEval(function() {
          return __utils__.findAll("h4").length >= 10;
        },"reviews list search for \"casperjs\" retrieves 8 or more <h4> reviews' titles");

    }).then(function(){

        test.assertEval(function() {
          return __utils__.findAll("a").length >= 4;
        },"links pagination for \"casperjs\" retrieves 4 or more results");

    }).run(function() {
        test.done();
    });
});


