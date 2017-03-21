;
(function() {
    var $animationElement = $('.js-animationElement'),
        $window = $(window);

    function inView() {
        var windowHeight = $window.height(),
            delta = windowHeight * 3 / 4,
            windowWidth = $window.width(),
            windowTop = $window.scrollTop(),
            windowBottom = (windowTop + delta);
        if (windowWidth <= 960) {
            $animationElement.addClass('inView')
        }

        $animationElement.each(function() {
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
