/*jslint browser: true*/
/*global $, jQuery*/
$(function () {
	"use strict";

	function aspectRatio() {
		"use strict";


		//Add attr
		$('.aspectRatio').attr('data-heqw', '1.77777778');

		// Start Aspect ratio
		$("[data-heqw]").each(function () {
			var xclass = $(this).attr('data-heqw');
			var finalv = Number($(this).innerWidth()) / Number(xclass);
			if (finalv != 0) {
				$(this).css('height', Math.ceil(finalv));
			} else {
				setTimeout(function () {
					aspectRatio();
				}, 5000)
			}
		});
		// End Aspect ratio

	}
	

	

	$(document).ready(function () {
	
		/* ---------------------------------------------------------------------- */
		/*	Mobile Menu
	    /* ---------------------------------------------------------------------- */

		$(".menu-btn").on('click', function (e) {
			e.preventDefault();
			$('.menu, .menu-btn, .lang-area').toggleClass("active");
		});
		$(".button-one").on('click', function (e) {
			$('.collapse-section-img img').removeClass("active");
			$('.collapse-section-img-one').removeClass("three-active");
			$('.collapse-section-img-one').addClass("active");
		});
		$(".button-two").on('click', function (e) {
			$('.collapse-section-img img').removeClass("active");
			$('.collapse-section-img-one').removeClass("three-active");
			$('.collapse-section-img-two').addClass("active");
		});
		$(".button-three").on('click', function (e) {
			$('.collapse-section-img img').removeClass("active");
			$('.collapse-section-img-one').addClass("three-active");
			$('.collapse-section-img-three').addClass("active");
		});

		//Owl carousel #homeCarousel
		$('#mockupSlider').owlCarousel({
			items: 1,
			loop: false,
			center: false,
			dots: true,
			nav: false,
			margin: 0,
			autoplay: false,
			autoplayHoverPause: true,
			autoplayTimeout: 7000,
			// dotsContainer: '#mainCarouselDots',
		});

		$("body,html").animate({
			scrollTop: 1
		}, 0);
	});

	/* ---------------------------------------------------------------------- */
    /* Onresize
    /* ---------------------------------------------------------------------- */
	$(window).on('resize', function () {
		aspectRatio();
		setTimeout(function () {
		}, 500);
		
	});

	/* ---------------------------------------------------------------------- */
    /* Onload
    /* ---------------------------------------------------------------------- */
	$(window).on('load', function () {
		aspectRatio();
		// Loading
		setTimeout(function () {
			$('body').addClass('loaded');
		}, 200);

	});
});

/*******Fisrt Snippet ************ */
  gtag('event', 'conversion', {'send_to': 'AW-344110416/9KSRCKm0o88CENDqiqQB'});


/********** Second ********************** */
    (function(u,x,s,n,i,f){
        u.ux=u.ux||function(){(u.ux.q=u.ux.q||[]).push(arguments)};
        u._uxSettings={uxid:'158737259-1',uxv:'U'};
        i=x.getElementsByTagName('head')[0];
        f=x.createElement('script');f.async=1;
        f.src=s+n+u._uxSettings.uxv+'A-'+u._uxSettings.uxid;
        i.appendChild(f);
    })(window,document,'https://s3-ap-southeast-1.amazonaws.com/uxsniff/uxsnf_track','.js?uxid=');

/*************** Third ********************* */


