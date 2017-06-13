var url = "http://localhost:3000/geladeira";
//var teste;

casper.test.begin('Phantomjs Tests >> Search', 5, function(test) {

    casper.start(url, function() {

        casper.page.injectJs("https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js");

        test.assertHttpStatus(200);
        test.assertTitle("Geladeira é no Decidaki - veja avaliações antes de decidir comprar!");

    }).then(function() {

      // bd  boys counter
      test.assertElementCount('#href_bd_boy_happy', 20,"offers search for casperjs retrieves 20 href_bd_boy_happy selectors");
      test.assertElementCount('#href_bd_boy_sad', 20,"offers search for casperjs retrieves 20 href_bd_boy_sad selectors");

      test.assertEvalEquals(function() {
            return __utils__.findOne('#title_category').textContent;
      }, '\n\n  \n\n    \n\n      \n        Home\n      \n      \n\n    \n\n   \t\n\n      \n        eletrodomésticos\n      \n      \n\n    \n\n   \t\n\n   \t\n\n\t    \n\n\t   \t\t\n\n            \n              geladeira ( 224 ofertas )\n            \n            \n        \n\n\t     \n\n     \n  \n');
        
    }).run(function() {
      test.done();
    });
});


