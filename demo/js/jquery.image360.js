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
			that.find('.img360_images img').attr('style', cssCode.images);
			
		}
	};

	var cssCode = {
		'img360' : 'position: relative;',
		'shelf' : 'width: inherit; height: inherit;',
		'images' : 'display: none;',
		'float' : 'position: absolute; left: 0px; top: 0px; z-index:2; width: inherit; height: inherit;',
	}


	// 插件运行中用到的参数
	var para = {
		'imgStr' : '',			// 添加img标签时用到的空字符串
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

    	
		// 设定参数的覆盖顺序
		var settings = $.extend( {}, defaults, options);

		// 把用户定义的方向传到参数para
		para.dir = settings.auto.dir;

		// 初始化插件需要的样式设定
		methods.cssInit(this);




		// 返回jquery对象, 保持链式操作
		return this;
    };



})(jQuery,window,document);
