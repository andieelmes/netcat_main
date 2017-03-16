;
(function() {
    var $animationElement = $('.js-animationElement'),
        $window = $(window);

    function inView() {
        var windowHeight = $window.height(),
            delta = windowHeight * 3 / 4,
            windowWidth = $window.height(),
            windowTop = $window.scrollTop(),
            windowBottom = (windowTop + delta);

        $.each($animationElement, function() {
            var $element = $(this),
                elementHeight = $element.outerHeight(),
                elementTop = $element.offset().top,
                elementBottom = (elementTop + elementHeight);

            if (elementBottom >= windowTop && elementTop <= windowBottom) {
                $element.addClass('inView');
            }
        });
    }

    $window.on('scroll resize', inView);
    $window.trigger('scroll');
})();
