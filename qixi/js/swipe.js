//页面滑动
function Swipe(container){
	var swipe = {};//滑动对象
	var element = container.find(":first");
	var slides = element.find('>');

	var width = container.width();
	var height = container.height();
	element.css({
		width:(slides.length*width)+'px',
		height:height+'px'
	});
	$.each(slides,function(index){
		var slide = slides.eq(index);
		slide.css({
			width:width+'px',
			height:height+'px'
		});
	});
//监控完成与移动
swipe.scrollTo = function(x,speed){
		element.css({
			'transition-timing-function':'linear',
			'transition-duration':speed+'ms',
			'transform':'translate3d(-'+x+'px,0px,0px)'
		});
		return this;
	}
	return swipe;
}


