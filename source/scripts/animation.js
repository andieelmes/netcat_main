;(function () {
	var $animationElement = $('.js-animationElement'),
		$window = $(window);

	function inView() 
	{
		var windowHeight = $window.height(),
			windowWidth = $window.height(),
			windowTop = $window.scrollTop(),
			windowBottom = (windowTop + windowHeight);

		$.each($animationElement, function() {
			var $element = $(this),
				elementHeight = $element.outerHeight(),
				elementTop = $element.offset().top,
				elementBottom = (elementTop + elementHeight);

			if (elementBottom >= windowTop && elementTop <= windowBottom)
			{
				$element.addClass('inView');
			} 
			/* else 
			{
				$element.removeClass('inView');
			} */
		});
	}

	$window.on('scroll resize', inView);
	$window.trigger('scroll');
})();