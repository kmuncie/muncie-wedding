'use strict';

var app = (function(document, $) {
	var docElem = document.documentElement,
		_userAgentInit = function() {
			docElem.setAttribute('data-useragent', navigator.userAgent);
		},
		_init = function() {

		$(window).load(function () {
    		$('.Collage').removeWhitespace().collagePlus({
    			'allowPartialLastRow':true
    		});
		});

		var resizeTimer = null;
			$(window).bind('resize', function() {
			// hide all the images until we resize them
			// set the element you are scaling i.e. the first child nodes of ```.Collage``` to opacity 0
			$('.Collage .Image_Wrapper').css("opacity", 0);
			// set a timer to re-apply the plugin
			if (resizeTimer) clearTimeout(resizeTimer);
				resizeTimer = setTimeout(collage, 200);
		});

		$(function() {
		    $('.countdown').countdown({
		        date: "March 28, 2015 15:00:00"
		    });
		});			

		};
	return {
		init: _init
	};
})(document, jQuery);

(function() {
	app.init();
})();
