var url = "http://localhost:3000/reviews/7896584052084/offer/5875ee75a5ba3b0400baa8de/page/1";


casper.test.begin('Phantomjs Tests >> Reviews pagination', 15, function(test) {

    casper.start(url, function() {

        casper.page.injectJs("https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js");

        test.assertHttpStatus(200);
        test.assertTitle("Before Deciding - avaliações antes de comprar", "Before Deciding homepage title is the one expected");

    }).then(function() {

      // pagination from 1 to 10
      this.echo('Pagination >> 1 to 10');
      test.assertElementCount('.pagination_active', 1); 
      test.assertElementCount('.pagination_disabled', 9); 

      // previous    
      test.assertElementCount('#li_hidden_previous', 1); 
      test.assertElementCount('#li_active_previous', 0); 

      // next
      test.assertElementCount('#li_hidden_next', 0); 
      test.assertElementCount('#li_active_next', 1); 

      // go to pagination 10
      this.evaluate(function() {
         document.getElementById("a_next").click(); 
      });

    }).then(function(){
      // pagination 10
      this.echo('Pagination >> 11 to 20');

      // previous    
      test.assertElementCount('#li_hidden_previous', 0); 
      test.assertElementCount('#li_active_previous', 1); 

      // next
      test.assertElementCount('#li_hidden_next', 0); 
      test.assertElementCount('#li_active_next', 1); 

      // pagination 11 to 20
      test.assertElementCount('.pagination_active', 1); 
      test.assertElementCount('.pagination_disabled', 9); 

      // go to pagination 01
      this.evaluate(function() {
         document.getElementById("a_previous").click(); 
      });

    }).then(function(){
      // back do pagination 01
      test.assertElementCount('.pagination_disabled', 9); 
    }).run(function() {
      test.done();
    });
});


