var url = "http://localhost:3000/home";
//var teste;

casper.test.begin('Phantomjs Tests >> Home', 8, function(test) {

    casper.start(url, function() {

        casper.page.injectJs("https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js");

        test.assertHttpStatus(200);
        test.assertTitle("Before Deciding - veja avaliações antes de comprar", "Before Deciding homepage title is the one expected");
        // test.assertExists('form[action="/home"]', "offer search form is found");
        //   this.fill('form[action="/home"]', {
        //     query: "geladeira"
        // }, true);

    }).then(function() {

      // bd  boys counter

      test.assertElementCount('#href_bd_boy_happy', 20,"offers search for casperjs retrieves 20 href_bd_boy_happy selectors");
      test.assertElementCount('#href_bd_boy_sad', 20,"offers search for casperjs retrieves 20 href_bd_boy_sad selectors");

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

      // term searched
      test.assertEvalEquals(function() {
            return __utils__.findOne('#title_category').textContent;
      }, '\n \tsmartphones 253 ofertas\n ');

      // tool_tip_bd_boy_sad.ejs

      var bd_boy_value = this.evaluate(function() {
          // show all tool tips
          $('a[data-toggle=tooltip]').tooltip("show");
          var bd_boy_sad = $(".tooltip-inner").children('strong')[1].textContent;
          return bd_boy_sad
      });

      // this.echo(bd_boy_value);

      test.assertEquals(bd_boy_value,"avaliações com \n1, 2 ou 3 estrelas\n" ,"bd boy sad mouseover has text >> 'avaliações com 1, 2 ou 3 estrelas'");      
       
    }).then(function(){

      // simulated click to href_bd_boy_happy 
      this.echo('simulated click in href_bd_boy_happy');
      this.evaluate(function() {
        $("#txt_ver_avaliacoes")[0].click();  
      });   

    }).then(function(){

      casper.wait(6000, function() {
        //check result of click href_bd_boy_happy : should be in reviews page
        test.assertExist('#review_title'); 
      });   

    }).run(function() {
      test.done();
    });
});


