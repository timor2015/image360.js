# image360.js
360度图片展示

> 功能描述: 展示的目标可以左右滑动以改变观察目标的角度.
			目标自动旋转改变观察角度.
			用户滑动或鼠标拖拽过目标后,记录旋转的方向,再次旋转时,保持旋转方向.




* 应用场景: 目标的360度展示(不是3D,类似人绕着目标走了一圈看到*
*的目标图片), 将gif图片的没一帧保存出来做处理.
适用那些动态图片第一帧和最后一帧连接起来的gif效果.


*插件对图片有一定的要求, 使用时需要提供一些关于图片的信息:*
*1. 图片的数量*
*2. 图片的路径*
*3. 图片文件名的前缀*
*4. 图片的格式*
*5. 默认初始化时显示第几张图片*

** 插件的启动需要手动的设定一些关于图片的参数以及自动旋转播放的参数**

```
$('#img360').image360({

	// 图片的参数
	'img' : {
		'num' : 48,					// 默认图片的数量
		'imgpath' : './images', 	   // 默认图片的路径
		'imgprefix' : '',			  // 默认图片名称的前缀
		'imgsuffix' : 'png',  	     // 默认图片的后缀名
		'imginitnum' : 1			   // 插件默认展示的第一张图片坐标
	},

	// 默认不自动播放
	'autoplay' : false,
	// 自动播放时默认的参数
	'auto' : {
		'dir' : 'left',		// 默认的播放方向
		'imgtime' : 200,	   // 切换图片的时间间隔
		'delaytime' : 3000,    // 重新启动播放需要的延长时间
	},

});
```

> 如果需要更深度精确的控制, 可以修改插件内部的 para 参数集合

```
// 插件运行中用到的参数
	var para = {
		'ele_that' : null,		 // 快捷对象-插件容器
		'ele_float' : null,		// 快捷对象-遮罩层
		'nowPos' : 0,		      // 当前鼠标的坐标
		'pastPos' : 0,			 // 上个鼠标的坐标
		'loadImgNum' : 3,		  // 默认预加载图片的个数
		'timer' : null,			// 插件运行用到的定时器
		'dir' : 'left',			// 转动方向保持
		'touchOff' : false,		// 触摸开关
		'nowNum' : 1,			  // 当前图片的坐标
		'timerOff' : true,		 // 定时器开关
		'iSwiperSpacing' : 25,     // 单次滑动时,划过像素数量触发切图动作
	};
```



插件使用了 图片预加载方式来进行性能优化.
```
'loadImgNum' : 3,    // 控制图片预加载的个数 --> 顺时针3个, 逆时针3个
```

页面刚载入的时候图片的格式及http请求是这样的:

图片的代码
![](http://timor2015.github.io/jquery.image360.js/demo/images/info1.jpg)
connect信息
![](http://timor2015.github.io/jquery.image360.js/demo/images/yu1.jpg)


在目标自转或被用户拖动换图片的时候, 

图片的代码
![](http://timor2015.github.io/jquery.image360.js/demo/images/info2.jpg)
connect信息
![](http://timor2015.github.io/jquery.image360.js/demo/images/yu2.jpg)
