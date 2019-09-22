$(document).ready(function () {
	//变量的定义
	var boxShadow = $('.shoadow');
	var clickFlag = true;
	var actBox;

	/**
	 * 页面初始化
	 */
	function pageInit() {
		loadInit();
		eventBind();
	}//end func
	pageInit();

	/**
	 * 加载图片
	 */
	function loadInit() {
		var loader = new PxLoader();
		loader.addImage('images/index/photo/1.jpg');

		icom.loadingShow();
		loader.addCompletionListener(function () {
			pageShow();
			icom.loadingHide();
			loader = null;
		});
		loader.start();
	}//end func

	/**
	 * 页面显示
	 */
	function pageShow() {

	}//end func

	/**
	 * 事件绑定
	 */
	function eventBind() {
		$(".scaleBox").on("click", scaleBox);
		boxShadow.on("click", hideScaleBox);
	}//end func

	/**
	 * 放大照片
	 */
	function scaleBox() {
		if (clickFlag) {
			var box = $(this);
			var word = box.find(".wordBox");
			if (box.hasClass("scale")) hideScaleBox();
			else {
				box
					.addClass("scale")
					.css({ "z-index": 3 })
					.transition({ scale: 1.2 });
				word.transition({ opacity: 1 });
				boxShadow.fadeIn();
				actBox = box;
			}

			clickFlag = false;
			setTimeout(function () {
				clickFlag = true;
			}, 500);

		}
	}

	/**
	 * 缩小照片
	 */
	function hideScaleBox() {
		if (actBox && clickFlag) {
			var word = actBox.find(".wordBox");
			actBox
				.removeClass("scale")
				.transition({ scale: 1 }, function () {
					actBox.css({ "z-index": 0 })
				});
			word.transition({ opacity: 0 });
			boxShadow.fadeOut();

			clickFlag = false;
			setTimeout(function () {
				clickFlag = true;
			}, 500);
		}
	}
});//end ready