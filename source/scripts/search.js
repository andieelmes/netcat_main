;(function () {
	var searchController = {
		$button: null,
		$field: null,
		
		init: function () {
			this.$button = $('.js-search .search__button');
			this.$field = $('.js-search .search__field');
			
			this.initEvents();
		},
		
		initEvents: function () {
			var self = this;
			this.$button.on('click', function () {
				if (self.$field.hasClass('search__field_open'))
				{
					if (self.$field.val().length == 0)
					{
						self.closeField();
					}
					else
					{
						self.search();
					}
				}
				else
				{
					self.openField();
				}
			});
			this.$field.on('keydown', function (event) {
				if (event.which == 13)
				{
					self.search();
				}
				if (event.which == 27)
				{
					self.closeField();
				}
			});
		},
		
		openField: function () {
			this.$field.addClass('search__field_open').focus();
			this.$button.addClass('search__button_open');
		},
		
		closeField: function () {
			var self = this;
			this.$field.val('').blur();
			this.$field.removeClass('search__field_open');
			setTimeout(function () {
				self.$button.removeClass('search__button_open');
			}, 200);
		},
		
		search: function () {
			alert('Запущен поиск по строке: ' + this.$field.val());
			this.closeField();
		}
	};
	searchController.init();
})();