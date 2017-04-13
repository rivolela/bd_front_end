var url = "http://localhost:3000/geladeira/geladeira-brastemp-clean-frost-free-378-l-220v";


casper.test.begin('Phantomjs Tests >> Reviews pagination', 11, function(test) {

    casper.start(url, function() {

        casper.page.injectJs("https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js");

        test.assertHttpStatus(200);
        test.assertTitle("Geladeira Brastemp Clean Frost Free 378 L 220V - ver avaliações - Decidaki", "Decidaki homepage title is the one expected");

    }).then(function() {

      // pagination from 1 to 10
      this.echo('Pagination >> 1 to 10');
      test.assertElementCount('.pagination_active', 1); 
      test.assertElementCount('.pagination_disabled', 3); 

      // previous    
      test.assertElementCount('#a_previous', 0); 

      // next
      test.assertElementCount('#a_next', 0); 

      // go to pagination 10
      this.evaluate(function() {
         document.getElementById("a_next").click(); 
      });

    }).then(function(){
      // pagination 10
      this.echo('Pagination >> 11 to 20');

      // previous    
      test.assertElementCount('#a_previous', 0); 

      // next
      test.assertElementCount('#a_next', 0); 


      // pagination 11 to 20
      test.assertElementCount('.pagination_active', 1); 
      test.assertElementCount('.pagination_disabled', 3); 

      // go to pagination 01
      this.evaluate(function() {
         document.getElementById("a_previous").click(); 
      });

    }).then(function(){
      // back do pagination 01
      test.assertElementCount('.pagination_disabled', 3); 
    }).run(function() {
      test.done();
    });
});


