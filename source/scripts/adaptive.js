;(function () {
	var $topmenu = $('.topmenu');
	$('.js-topMenuTrigger').on('click', function (event) {
		event.preventDefault();		
		
		if ($topmenu.is(':visible'))
		{
			$topmenu.fadeOut(animationDuration);
		}
		else
		{
			$topmenu.fadeIn(animationDuration);
		}
	});
	$(window).on('resize', function () {
		if ($(this).width() > 1020)
		{
			$topmenu.removeAttr('style');
		}
	});
})();