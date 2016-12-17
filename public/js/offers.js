$(document).ready(function() {
  	// Handler for .ready() called.

	// $(window).height();   // returns height of browser viewport
	// $(document).height(); // returns height of HTML document
	var width_screen = $(window).width();   // returns width of browser viewport
	// $(document).width(); // returns width of HTML document
	// screen size 
	// screen.width; 
	// screen.height;

	/* adjustment of pagination size to mobile devices */
	if(width_screen < 768){
		$( "ul" ).each(function( index ) {
  			$(this).addClass("pagination-sm");
		});
	}

	$('a[data-toggle=tooltip]').tooltip();

});


