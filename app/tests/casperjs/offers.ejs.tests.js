var url = "http://localhost:3000/offers";
//var teste;

casper.test.begin('Phantomjs Tests >> Offers', 9, function(test) {

    casper.start(url, function() {

        test.assertHttpStatus(200);

        test.assertTitle("Before Deciding - avaliações antes de comprar", "Before Deciding homepage title is the one expected");

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
      },"links pagination for \"casperjs\" retrieves 10 or more tags<a> in results");

    }).then(function() {

      test.assertElementCount('#href_bd_boy_happy', 10,"offers search for casperjs retrieves 20 href_bd_boy_happy selectors");
      test.assertElementCount('#href_bd_boy_sad', 10,"offers search for casperjs retrieves 20 href_bd_boy_sad selectors");

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


