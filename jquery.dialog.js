/*! jQuery dialog v0.1.2 | (c) 2014 Aram Mkrtchyan |
 *
 */
(function ($) {

	var Popup = function (element, options) {
		this.options = options;

		var self = this;
		this.element = $(element);
		this.element.data("dialog", this);

		this.popupSelector = this.element.attr("data-dialog");
		this.containerSize = {
			width: $(this.popupSelector).outerWidth(true),
			height: $(this.popupSelector).outerHeight(true)
		};

		$(this.popupSelector).hide();


		this.element.on("click", function () {
			self.open();
			return false;
		});
	};

	Popup.prototype.dialogContainerPosition = function () {
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();
		var containerWidth = this.containerSize.width;
		var containerHeight = this.containerSize.height;
		var dialogContainerTop;
		var bottomSpace;

		var dialogContainerleft = (windowWidth - containerWidth) / 2;

		if (windowHeight > containerHeight) {
			dialogContainerTop = (windowHeight - containerHeight) / 2
		} else if (windowHeight < containerHeight) {
			dialogContainerTop = 50;
			bottomSpace = 50;
		} else if (windowHeight == containerHeight) {
			dialogContainerTop = 0;
		}

		return {
			left: dialogContainerleft,
			top: dialogContainerTop,
			marginBottom: bottomSpace
		};
	};

	Popup.prototype.open = function () {
		var self = this;

		if (self.p == undefined) {
			self.p = $(this.popupSelector).detach();
		}


		var dialogClose = $("<a href='' class='dialogClose'>close</a>");
		dialogClose.on("click", function () {
			self.close();
			return false;
		});

		var overlay = $("<div class='dialogOverlay'></div>");

		var dialogContainer = $("<div class='dialogContainer'></div>")
			.css(this.containerSize)
			.css(self.dialogContainerPosition())
			.append(dialogClose)
			.append(self.p.clone().show());

		$(window).resize(function () {
			dialogContainer.css(self.dialogContainerPosition());
		});

		switch (this.options.show) {
			case "fade":
					dialogContainer.hide();
					overlay.hide();
				break;
		}

		$("body")
			.append(dialogContainer)
			.append(overlay);

		switch (this.options.show) {
			case "fade":
				dialogContainer.fadeIn(this.options.showSpeed);
				overlay.fadeIn(this.options.showSpeed);
				break;
		}
	};

	Popup.prototype.close = function () {
		switch (this.options.hide) {
			case "fade":
				$(".dialogContainer, .dialogOverlay").fadeOut(this.options.hideSpeed, function () {
					this.remove();
				});
				break;
			default:
				$(".dialogContainer, .dialogOverlay").remove();
				break;
		}
	};

	Popup.prototype.destroy = function () {

	};

	$.fn.dialog = function (options) {

		var settings = $.extend({
			show: "none",
			hide: "none",
			showSpeed: 500,
			hideSpeed: 500
		}, options);

		return this.each(function () {
			new Popup(this, settings);
		});
	}
}(jQuery));
