$(document).ready(function () {
	//变量的定义
	var wrap = $(".wrap");
	var boxShadow = $('.shoadow');
	var clickFlag = true;
	var actBox;

	/**
	 * 页面初始化
	 */
	function pageInit() {
		wrap.hide();
		loadInit();
		eventBind();
		sound_handler();
	}//end func
	pageInit();

	function sound_handler() {
		if (os.weixin) {
			var wsb = window;
			if (wsb.WeixinJSBridge) {
				try {
					wsb.WeixinJSBridge.invoke("getNetworkType", {}, sound_creat);
				}
				catch (e) {
					wx.ready(sound_creat);
				}
			}
			else {
				document.addEventListener("WeixinJSBridgeReady", sound_creat, false);
			}
		} else {
			sound_creat();
		}
	}//edn func

	function sound_creat() {
		document.removeEventListener("WeixinJSBridgeReady", sound_creat);
		ibgm.init({ src: 'audio/bgm.mp3', autoplay: true });
	}//end func

	/**
	 * 加载图片
	 */
	function loadInit() {
		var loader = new PxLoader();
		loader.addImage('images/index/photo/1.jpg');
		
		loader.addCompletionListener(function () {
			pageShow();
			loader = null;
		});
		loader.start();
	}//end func

	/**
	 * 页面显示
	 */
	function pageShow() {
		wrap.fadeIn();
		indexAnime();
	}//end func

	/**
	 * 事件绑定
	 */
	function eventBind() {
		$(".scaleBox").on("click", scaleBox);
		boxShadow.on("click", hideScaleBox);
	}//end func

	/**
	 * 首页动画
	 */
	function indexAnime(){
		var indexPage = $(".indexPage");
		var photoPage = $(".photoPage");
		var bg = $(".indexPage .bg");
		var iconp = $(".indexPage .iconp");
		var w1 = $(".indexPage .w1");
		var w2 = $(".indexPage .w2");
		var w3 = $(".indexPage .w3");
		var ar = $(".indexPage .ar");

		photoPage.addClass("overflow");

		bg.transition({opacity:1},1000);
		iconp.transition({opacity:1,delay:1500},1000);
		w1.transition({opacity:1,delay:1000},1000);
		w2.transition({height:"1.81rem",delay:2000},1200);
		w3.transition({height:"1.29rem",delay:3200},1200);
		ar.transition({opacity:1,delay:4500},800,function(){
			indexPage.one("swipeup",function(){
				photoPage.show();
				indexPage.transition({y:"-150%"},800,function(){
					indexPage.hide();
					photoPage.removeClass("overflow");
				})
			})
		});
	}

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