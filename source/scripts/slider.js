;(function () {
	var minSwiperWidth = 1200;
	
	var sliderController = {
		$slider: null,
		$link: null,
		linkClass: null,
		sliderWidth: 0,
		duration: 500,
		animationDelay: 500,
		swiperMain: null,
		swiperLinks: null,
		
		init: function () {
			this.$slider = $('.js-slider');
			this.linkClass = '.js-sliderLink';
			this.$link = $(this.linkClass);
			this.sliderWidth = this.$slider.parent().width();
			if (this.$slider.length == 0)
			{
				return;
			}
			
			this.initEvents();
		},
		
		initSwiper: function () {
			this.swiperMain = new Swiper('.js-slider', {
			});
			this.swiperLinks = new Swiper('.js-sliderLinksContainer', {
				slidesPerView: 'auto',
				slideToClickedSlide: true,
				centeredSlides: true
			});   
			this.swiperMain.params.control = this.swiperLinks;
			this.swiperLinks.params.control = this.swiperMain;
		},
		
		destroySwiper: function () {
			if (this.swiperMain && this.swiperLinks)
			{			
				this.swiperMain.destroy();
				this.swiperLinks.destroy();
			}
			$('.swiper-wrapper, .swiper-slide').removeAttr('style');
		},
		
		destroy: function () {
			$('.js-slider').removeAttr('style');
			if (this.$link)
			{
				this.$link.off('click');
			}
		},
		
		initEvents: function () {
			var self = this;			
			this.$link.on('click', function (event) {
				event.preventDefault();
				var currentSlideName = $('.redactionsLink__item_active').attr('href').substring(1),
					$currentSlide = self.$slider.find('[data-slide="' + currentSlideName + '"]');
				var $self = $(this),
					slide = $self.attr('href').substring(1);
				$('.swiper-slide-active').removeClass('swiper-slide-active');
				$self.closest('.swiper-slide').addClass('swiper-slide-active');
				self.gotoSlide(slide);
			});
		},
		
		gotoSlide: function (slide) {			
			var $slide = this.$slider.find('[data-slide="' + slide + '"]'),
				marginLeft = $slide.index() * this.sliderWidth * (-1);
			if ($slide.length == 0)
			{
				return;
			}
			this.$slider.stop().animate({
				'marginLeft': marginLeft
			}, this.duration);
		}
	};
	
	function turnSlider(width)
	{
		if (width > minSwiperWidth)
		{
			sliderController.destroySwiper();
			sliderController.init();
		}
		else
		{
			sliderController.destroy();
			sliderController.initSwiper();
		}
	}
	
	window.onload = function () {
		turnSlider($(window).width())		
	};
	
	$(window).on('resize', function () {
		turnSlider($(this).width())		
	});
	
})();