;(function () {
	var reviewsController = {
		$reviews: null,
		$link: null,
		activeId: null,
		duration: 500,
		
		init: function () {
			this.$reviews = $('.js-reviews');
			this.$link = $('.js-reviewsLink');
			this.activeId = parseInt($('.js-reviewsLink.active').attr('data-review'));
			if (this.$reviews.length == 0)
			{
				return;
			}
			
			this.initEvents();
		},
		
		initEvents: function () {
			var self = this;			
			this.$link.on('click', function (event) {
				event.preventDefault();
				var $self = $(this),
					review = parseInt($self.attr('data-review')),
					$current = self.$reviews.find('[data-reviewItem="' + self.activeId + '"]'),
					$next = self.$reviews.find('[data-reviewItem="' + review + '"]');
				$self.addClass('active').siblings().removeClass('active');
				$current.stop().fadeOut(self.duration);
				$next.stop().fadeIn(self.duration);
				
				self.activeId = review;
			});
		}
	};
	reviewsController.init();
})();