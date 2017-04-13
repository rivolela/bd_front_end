var url = "http://localhost:3000/";

casper.test.begin('Phantomjs Tests >> Landing Page ( without cookie )', 0, function(test) {
   

    casper.start(url, function() {

    //     test.assertHttpStatus(200);
    //     test.assertTitle("Before Deciding - veja avaliações antes de comprar", "Before Deciding homepage title is the one expected");
    //     test.assertExist('#btnCallToAction');       

    }).then(function(){
         this.echo('Phantomjs Tests >> Landing Page ( without cookie )');

      // simulated click to call to action ( ver avaliacoes )
    //   this.evaluate(function() {
    //     document.getElementById("btnCallToAction").click();  
    //   });

    // }).then(function(){

    //   test.assertElementCount('#href_bd_boy_happy', 20,"offers search for casperjs retrieves 20 href_bd_boy_happy selectors");
    //   test.assertElementCount('#href_bd_boy_sad', 20,"offers search for casperjs retrieves 20 href_bd_boy_sad selectors");

    }).run(function() {
        test.done();
    });
});

