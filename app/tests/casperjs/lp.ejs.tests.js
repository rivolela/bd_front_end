var url = "http://localhost:3000/";
//var teste;

casper.test.begin('Phantomjs Tests >> Landing Page', 3, function(test) {
   
    casper.start(url, function() {

        test.assertHttpStatus(200);

        test.assertTitle("Before Deciding - reviews antes de comprar", "Before Deciding homepage title is the one expected");

        test.assertDoesntExist('#btnCallToAction');
        
     //    test.assertEquals('85169',this.evaluate(function () { 
     //    	return document.getElementsByClassName("comentarios-avaliacao")[0].getAttribute("produtoid");
    	// }), 'Test produtoid');

    	// test.assertTrue(this.evaluate(function () { 
     //    	return document.getElementById("SetaComentariosDireita").getAttribute("paginatotal") > '20';
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
    }).run(function() {
        test.done();
    });
});


