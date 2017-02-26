var url = "http://localhost:3000/categoria/geladeira/";
//var teste;

casper.test.begin('Phantomjs Tests >> Categories pagination', 11, function(test) {

    casper.start(url, function() {

        casper.page.injectJs("https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js");

        test.assertHttpStatus(200);
        test.assertTitle("Before Deciding - veja avaliações de geladeira", "Before Deciding homepage title is the one expected");

    }).then(function() {

      // pagination from 1 to 9
      this.echo('Pagination >> 1 to 9');
      test.assertElementCount('.pagination_active', 1); 
      test.assertElementCount('.pagination_disabled', 9); 

      // previous    
      test.assertElementCount('#a_previous', 0); 

      // next
      test.assertElementCount('#a_next', 1); 

      // go to pagination 10
      this.evaluate(function() {
         document.getElementById("a_next").click();  
      });

    }).then(function(){
      // pagination from 10 to 19
      this.echo('Pagination >> 10 to 19');

      // previous    
      test.assertElementCount('#a_previous', 1); 

      // next
      test.assertElementCount('#a_next', 0); 

      // pagination 10 to 11
      test.assertElementCount('.pagination_active', 1); 
      test.assertElementCount('.pagination_disabled', 3); 

      // go to pagination 01
      this.evaluate(function() {
         document.getElementById("a_next").click(); 
      });

    }).then(function(){
      // back do pagination 01
      this.echo('Return to page 01');
      test.assertElementCount('.pagination_disabled', 3); 
    }).run(function() {
      test.done();
    });
});


