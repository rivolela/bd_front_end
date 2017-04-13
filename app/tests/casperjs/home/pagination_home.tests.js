var url = "http://localhost:3000/brastemp/";
//var teste;

casper.test.begin('Phantomjs Tests >> Search pagination', 11, function(test) {

    casper.start(url, function() {

        casper.page.injectJs("https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js");

        test.assertHttpStatus(200);
        test.assertTitle("Brastemp é no Decidaki - veja avaliações antes de decidir comprar!", "Decidaki homepage title is the one expected");
        // test.assertExists('form[action="/home"]', "offer search form is found");
        //   this.fill('form[action="/home"]', {
        //     query: "brastemp"
        // }, true);

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
      // pagination 10
      this.echo('Pagination >> 10 to 11');

      // previous    
      test.assertElementCount('#a_previous', 1); 

      // next
      test.assertElementCount('#a_next', 0); 

      // pagination 10 to 11
      test.assertElementCount('.pagination_active', 1); 
      test.assertElementCount('.pagination_disabled', 3); 

      // go to pagination 01
      this.evaluate(function() {  
          document.getElementById("a_previous").click(); 
      });

    }).then(function(){
      // back do pagination 01
      this.echo('back do pagination 01');
      test.assertElementCount('.pagination_disabled', 9); 
    }).run(function() {
      test.done();
    });
});


