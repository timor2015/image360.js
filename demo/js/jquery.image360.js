;(function($,window,document,undefined){
	// 代码开始


	// 插件的默认参数
    var defaults = {

    	// 图片的参数
    	'img' : {
    		'num' : 48,					// 默认图片的数量
    		'imgpath' : './images', 	// 默认图片的路径
    		'imgprefix' : '',			// 默认图片名称的前缀
    		'imgsuffix' : 'png',  		// 默认图片的后缀名
    		'imginitnum' : 1,			// 插件默认展示的第一张图片坐标
    	},

    	// 默认不自动播放
    	'autoplay' : false,
    	// 自动播放时默认的参数
    	'auto' : {
    		'dir' : 'left',		// 默认的播放方向
    		'imgtime' : 200,	// 切换图片的时间间隔
    		'delaytime' : 3000, // 重新启动播放需要的延长时间
    	},

	    
	};

	// 注册用到的函数
	var methods = {
		// 对插件需要的内容进行CSS初始化设置
		cssInit : function(that){
			that.attr('style', cssCode.img360);
			that.find('.img360_float').attr('style', cssCode.float);
			that.find('.img360_shelf').attr('style', cssCode.shelf);			
			that.find('.img360_shelf img').attr('style', cssCode.shelf_img);
		},

		// 向images添加预加载图片
		addImages : function(that, nums, imgPath, imgprefix, imgtype, nowNum){
			var str = '';
			for (var i = 1; i < nums+1; i++) {
				str += '<img data-src="'+ imgPath + imgprefix + i +'.'+ imgtype + '" src="###" style="display:none" />';
			}
			that.find('.img360_images').html(str);
			that.find('.img360_shelf').html('<img src="'+ imgPath + imgprefix + nowNum +'.'+ imgtype + '">');
		},

		// 先载入一定数量的图片
		loadAdvance : function(that, nums, loadNums, nowNum){
			for(var i = nowNum; i < nowNum+loadNums; i++) {
				var k = i + 1;
					j = i - loadNums;
				k = k > nums ? k-nums : k;
				j = j <= 0 ? nums + j : j;
				methods.addImg(that, k-1);
				methods.addImg(that, j-1);
				console.log(k +', ' + j);
			};			
		},

		// 加载真实的图片
		addImg : function(that,$nth){
			var look = that.find('.img360_images img').eq($nth);
			look.attr('src', look.attr('data-src'));
			look.removeAttr("data-src");
		},

		// 切换图片
		changeImg : function(that, dir, settings){
			var nextNum = 0;
			var nextAddImg = 0;
			if (dir=='left') {
				nextNum = para.nowNum == 1 ? settings.img.num : para.nowNum - 1;
				nextAddImg = para.nowNum <= para.loadImgNum ? settings.img.num + para.nowNum - para.loadImgNum - 1 : para.nowNum - para.loadImgNum;
			}else if(dir=='right'){
				nextNum = para.nowNum == settings.img.num ? 1 : para.nowNum + 1;
				nextAddImg = para.nowNum >= settings.img.num - para.loadImgNum ? para.nowNum - settings.img.num - 2 + para.loadImgNum : para.nowNum + 1 + para.loadImgNum;
			}
			that.find('.img360_shelf img').attr('src', settings.img.imgpath + settings.img.imgprefix + nextNum +'.'+ settings.img.imgsuffix);
			methods.addImg(that, nextAddImg-1);
			para.nowNum = nextNum;
		},
		
	};

	var cssCode = {
		'img360' : 'position: relative;',
		'shelf' : 'width: inherit; height: inherit;',
		'shelf_img' : 'width: inherit; height:inherit;',
		'float' : 'position: absolute; left: 0px; top: 0px; z-index:2; width: inherit; height: inherit;',
	}


	// 插件运行中用到的参数
	var para = {
		'nowPos' : 0,			// 当前鼠标的坐标
		'pastPos' : 0,			// 上个鼠标的坐标
		'loadImgNum' : 5,		// 默认预加载图片的个数
		'timer' : null,			// 插件运行用到的定时器
		'dir' : 'left',			// 方向保持
		'touchOff' : false,		// 触摸开关
		'nowNum' : 1,			// 当前图片的坐标
		'timerOff' : true,		// 定时器开关
		'iSwiperSpacing' : 18,  // 单次滑动时,划过像素触发切图动作
	};


	// 插件启动函数
    $.fn.image360 = function (options) {

    	
		// 设定参数的覆盖顺序()
		var settings = $.extend( {}, defaults, options);
		var setimg = $.extend(defaults.img, options.img);
		var setauto = $.extend(defaults.auto, options.auto);
		settings.img = setimg;
		settings.auto = setauto;

		// 把用户定义的方向传到参数para
		para.dir = settings.auto.dir;
		para.nowNum = settings.img.imginitnum;

		console.log(settings)

		// 向images添加预加载图片
		methods.addImages(
			this,
			settings.img.num, 
			settings.img.imgpath,
			settings.img.imgprefix, 
			settings.img.imgsuffix,
			para.nowNum);

		// 初始化插件需要的样式设定
		methods.cssInit(this);

		// 先载入预加载的图片
		methods.loadAdvance(
			this, 
			settings.img.num, 
			para.loadImgNum, 
			para.nowNum);

		methods.changeImg(this, 'left', settings);


		// 返回jquery对象, 保持链式操作
		return this;
    };



})(jQuery,window,document);
