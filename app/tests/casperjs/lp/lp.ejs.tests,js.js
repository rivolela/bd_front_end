var url = "http://localhost:3000/";

casper.test.begin('Phantomjs Tests >> Landing Page ( without cookie )', 5, function(test) {
   
    casper.start(url, function() {

        test.assertHttpStatus(200);
        test.assertTitle("Before Deciding - avaliações antes de comprar", "Before Deciding homepage title is the one expected");
        test.assertExist('#btnCallToAction');  

        // simulated click to call to action ( ver avaliacoes )
        this.evaluate(function() {
          document.getElementById("btnCallToAction").click();  
        });

    }).then(function(){

      test.assertElementCount('#href_bd_boy_happy', 10,"offers search for casperjs retrieves 10 href_bd_boy_happy selectors");
      test.assertElementCount('#href_bd_boy_sad', 10,"offers search for casperjs retrieves 10 href_bd_boy_sad selectors");

    }).run(function() {
        test.done();
    });
});

