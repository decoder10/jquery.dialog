/*! jQuery dialog v0.2.0 | (c) 2014 Aram Mkrtchyan |
 *
 */

(function ($) {

	var $templates = {};

	var Dialog = function (element, options) {
		this.options = options;

		var self = this;
		this.element = $(element);
		this.element.data("jquery.dialog", this);

		this.dialogSelector = this.element.attr("data-dialog");
		this.containerSize = {
			width: $(this.dialogSelector).outerWidth(true),
			height: $(this.dialogSelector).outerHeight(true)
		};

		$(this.dialogSelector).hide();

		this.element.on("click.dialog.jquery", function () {
			self.open();
			return false;
		});
	};

	Dialog.prototype.dialogContainerPosition = function () {
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();
		var containerWidth = this.containerSize.width;
		var containerHeight = this.containerSize.height;
		var dialogContainerTop;
		var bottomSpace;

		var dialogContainerleft = (windowWidth - containerWidth) / 2;

		if (windowHeight > containerHeight) {
			dialogContainerTop = (windowHeight - containerHeight) / 2;
		} else if (windowHeight < containerHeight) {
			dialogContainerTop = 50;
			bottomSpace = 50;
		} else if (windowHeight == containerHeight) {
			dialogContainerTop = 0;
		}

		return {
			left: dialogContainerleft,
			marginTop: dialogContainerTop,
			marginBottom: bottomSpace
		};
	};

	Dialog.prototype.open = function () {
		var self = this;

		if ($templates[this.dialogSelector] == undefined) {
			$templates[this.dialogSelector] = $(this.dialogSelector).detach();
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
			.append($templates[this.dialogSelector].clone().show());

		var marginFix = $("<div class='marginFix'></div>")
			.append(dialogContainer);

		$(window).resize(function () {
			dialogContainer.css(self.dialogContainerPosition());
		});

		switch (this.options.show) {
			case "fade":
				marginFix.hide();
				dialogContainer.hide();
				overlay.hide();
				break;
		}

		self.element.trigger("dialog.beforeShow");

		$("body")
			.append(marginFix)
			.append(overlay);

		switch (this.options.show) {
			case "fade":
				marginFix.show();
				overlay.fadeIn(this.options.showSpeed);
				dialogContainer.fadeIn(this.options.showSpeed, function () {
					self.element.trigger("dialog.afterShow");
				});
				break;
			default:
				self.element.trigger("dialog.afterShow");
				break;
		}
	};

	Dialog.prototype.close = function () {
		self = this;

		this.element.trigger("dialog.beforeHide");

		switch (this.options.hide) {
			case "fade":
				$(".dialogContainer, .dialogOverlay, .marginFix").fadeOut(this.options.hideSpeed, function () {
					this.remove();
					self.element.trigger("dialog.afterHide");
				});
				break;
			default:
				$(".dialogContainer, .dialogOverlay, .marginFix").remove();
				self.element.trigger("dialog.afterHide");
				break;
		}
	};

	Dialog.prototype.destroy = function () {
		this.element.off("click.dialog.jquery");
		this.element.removeData("jquery.dialog");
	};

	$.fn.dialog = function (options) {

		var settings = $.extend({
			show: "none",
			hide: "none",
			showSpeed: 500,
			hideSpeed: 500
		}, options);

		return this.each(function () {
			new Dialog(this, settings);
		});
	}
}(jQuery));