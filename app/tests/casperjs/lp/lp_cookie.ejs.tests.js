var url = "http://localhost:3000/";

var cookie = "bd_lp=1";
var domain = "localhost";
cookie.split(";").forEach(function(pair){
    pair = pair.split("=");
    phantom.addCookie({
      'name': pair[0],
      'value': pair[1],
      'domain': domain
    });
});

casper.test.begin('Phantomjs Tests >> Landing Page ( with cooke )', 6, function(test) {
   
    casper.start(url, function() {

        test.assertHttpStatus(200);
        test.assertTitle("Before Deciding - veja avaliações antes de comprar", "Before Deciding homepage title is the one expected");
        test.assertExist('#btnVerReviews');  

    }).then(function(){

        // simulated click to call to action ( ver avaliacoes )
        this.evaluate(function() {
          document.getElementById("btnVerReviews").click();  
        });
    
    }).then(function(){
        casper.wait(5000, function() {
            this.echo('afer 5 seconds | go reviews page');
            test.assertElementCount('#review_description', 10,"reviews page for casperjs retrieves 10 #review_description");
            test.assertElementCount('#review_title', 10,"offers search for casperjs retrieves 10 #review_title' selectors");
        });
      
    }).then(function() {
      
      //Function explained:

      // Take the cookiename as parameter (cname).
      // Create a variable (name) with the text to search for (cname + "=").
      // Decode the cookie string, to handle cookies with special characters, e.g. '$'
      // Split document.cookie on semicolons into an array called ca (ca = decodedCookie.split(';')).
      // Loop through the ca array (i = 0; i < ca.length; i++), and read out each value c = ca[i]).
      // If the cookie is found (c.indexOf(name) == 0), return the value of the cookie (c.substring(name.length, c.length).
      // If the cookie is not found, return "".
      // 
      test.assertTrue(this.evaluate(function () { 
            var name = "bd_lp" + "=";
            var ca = document.cookie.split(';');
            for(var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length) == 1;
                }
            }
            return "";
       }), 'Test get cookie bd_lp');

 
    }).run(function() {
        test.done();
    });
});


        
     //    test.assertEquals('85169',this.evaluate(function () { 
     //     return document.getElementsByClassName("comentarios-avaliacao")[0].getAttribute("produtoid");
      // }), 'Test produtoid');

      // test.assertTrue(this.evaluate(function () { 
     //     return document.getElementById("SetaComentariosDireita").getAttribute("paginatotal") > '20';
      // }), 'Test total paginacao ( should be > 20 )');


      //test.assertExists('#SetaComentariosDireita');

        // test.assertTextExists(' <div class="comentarios-avaliacao" produtoid="85169">', 'OK');
      

    // test.assertEvalEquals(function() {
  //           return __utils__.findOne('.comentarios-avaliacao[produtoid]').textContent;
  //       }, '85169');


    
        //var produtoid = casper.getElementsInfo("div.comentarios-avaliacao[produtoid]");
        //casper.test.comment("produtoid" + produtoid.value);

        // test.assertEval(function() {
        //     return __utils__.findOne('.comentarios-avaliacao[produtoid]').textContent === '85169';
        // });