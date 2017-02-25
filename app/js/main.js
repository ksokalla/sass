$(function(){
	
	/* Efekt Smooth Scroll */
	
	$('a[href*="#"]:not([href="#"])').click(function(){
		$('body').animate( { scrollTop: $(this.hash).offset().top - 50 }, 500 );
	});

	/* Scroll menu color change */
	
	if($(window).scrollTop() >= 50){
		$('#main-nav').addClass('scroll');
	}
	
	$(window).scroll(function(){
		if($(window).scrollTop() >= 50 ) {
			$('#main-nav').addClass('scroll');
			$('#main-nav').css({'transition':'all 0.3s'})
		} else {
			$('#main-nav').removeClass('scroll');
		}
	});
	
});