
	
function doorAction(left,right,time){
	var $door =$('.door');
	var doorLeft =$('.door-left');
	var doorRight=$('.door-right');
	var defer = $.Deferred();
	var count =2;
	//等待开门完成
	var complete = function(){
		if(count==1){
			defer.resolve();
			return;
		}
		count--;
	};
	doorLeft.transition({
		'left':left
	},time,complete);
	doorRight.transition({
		'left':right
	},time,complete);
	return defer;
}

//灯光动画
var lamp = {
	elem:$('.b_background'),
	light:function(){
		this.elem.addClass('lamp-bright');
	},
	dark:function(){
		this.elem.removeClass('lamp-bright');
	}
}
//开门
	function openDoor(){
		return doorAction('-50%','100%',2000);
	}
//关门
	function shutDoor(){
		return doorAction('0%','50%',2000);
	}
//男孩走路
////////////////////////
function boyWalk(){

	var instanceX;//离商店的距离
	var boy = $('#boy');
	var boyHeight=boy.height();
	// 获取数据
	var getValue = function(className){
		var elem = $(''+className+'');
		return{
			height:elem.height(),
			top:elem.position().top
		};
	};
	var pathY = function(){
		var data = getValue('.a_background_middle');
		return data.top+data.height;
	}();

	boy.css({
		top:pathY-boyHeight-10
	});
	//动画处理
	//回复走路
	function restoreWalk(){
		boy.removeClass('pauseWalk');
	}
	//css3的动作变化
	function slowWalk(){
		boy.addClass('slowWalk');
	}
	//暂停走路
	function pauseWalk(){
		boy.addClass('pauseWalk');
	}
	//计算移动距离
	function calculateDist(direction,proportion){
		return (direction=='x'?visualWidth:visualHeight)*proportion;
	}
	//用transition做运动
	function startRun(options,runTime){
		var dfdPlay = $.Deferred();
		restoreWalk();
		boy.transition(options,runTime,'linear',function(){
			dfdPlay.resolve();
		});
		return dfdPlay;
	}
	//开始走路
	function walkRun(time,distX,distY){
		time = time||3000;
		slowWalk();
		var d1 = startRun({
			'left':distX+'px',
			'top':distY?distY:undefined
		},time);
			return d1;
	}
	//进商店
	function walkToShop(runtime){
		var defer = $.Deferred();
		var doorObj = $('.door');
		var offsetDoor = doorObj.offset();
		var doorOffsetLeft = offsetDoor.left;
		//小孩当前坐标
		var boyOffsetLeft  = boy.offset().left;
		//需要移动的坐标
		instanceX=(doorOffsetLeft+doorObj.width()/2)-(boyOffsetLeft+boy.width()/2);
		//开始走路
		var walkPlay = startRun({
			transform:'translateX'+instanceX+'px),scale(0.3,0.3)',
			opacity:0.1
		},2000);
		walkPlay.done(function(){
			boy.css({
				opacity:0
			});
			defer.resolve();
		});
		return defer;
	}
	//买花
	function  getFlower(){
		var defer = $.Deferred();
		setTimeout(function(){
			boy.addClass('slowFlowerWalk');
			defer.resolve();
		},1000);
		return defer;
	}
	//出商店
	function walkOutShop(runTime){
		var defer =$.Deferred();
		restoreWalk();
		var walkPlay = startRun({
			transform:'translateX('+instanceX+'px),scale(1,1)',
			opacity:1
		},runTime);
		walkPlay.done(function(){
			defer.resolve();
		});
		return defer;

	}
	return {
		walkTo:function(time,proportionX,proportionY){
			var distX = calculateDist('x',proportionX);
			var distY = calculateDist('y',proportionY);
			return walkRun(time,distX,distY);
		},
		stopWalk:function(){
			pauseWalk();
		},
		setColor:function(value){
			boy.css('background-color',value);
		},
		toShop:function(){
			return walkToShop.apply(null,arguments);
		},
		getFlower:function(){
			return getFlower();
		},
		outShop:function(){
			return walkOutShop.apply(null,arguments);
		},
		setFlowerWalk:function(){
			boy.addClass('slowFlowerWalk');
		},
		// 获取男孩的宽度
		getWidth: function() {
			return boy.width();
		},
		// 复位初始状态
		resetOriginal: function() {
			this.stopWalk();
			// 恢复图片
			boy.removeClass('slowWalk slowFlolerWalk').addClass('boyOriginal');
		},
		// 转身动作
	   rotate: function(callback) {
		   restoreWalk();
		   boy.addClass('boy-rotate');
		  
	   }
	}

}
//右边飞鸟
var bird ={
	elem:$('.bird'),
	fly:function(){
		this.elem.addClass('birdFly');
		this.elem.transition({
			right:container.width()
		},15000,'linear');
	}
}
    //小女孩 //
    ////////
function getBridgeY(){
	return $('.c_background_middle').position().top;

};
var girl = {
        elem: $('.girl'),
        getHeight: function() {
            return this.elem.height();
        },
        // 转身动作
        rotate: function() {
            this.elem.addClass('girl-rotate');
        },
        setOffset: function() {
            this.elem.css({
                left: visualWidth / 2,
                top: getBridgeY() - this.getHeight()
            });
        },
        getOffset: function() {
            return this.elem.offset();
        },
        getWidth: function() {
            return this.elem.width();
        }
		
   };
  ///////////
    //loge动画 //
    ///////////
    var logo = {
        elem: $('.logo'),
        run: function() {
            this.elem.addClass('logolightSpeedIn');
        }
    };
	 var snowflakeURl = [
        'http://img.mukewang.com/55adde120001d34e00410041.png',
        'http://img.mukewang.com/55adde2a0001a91d00410041.png',
        'http://img.mukewang.com/55adde5500013b2500400041.png',
        'http://img.mukewang.com/55adde62000161c100410041.png',
        'http://img.mukewang.com/55adde7f0001433000410041.png',
        'http://img.mukewang.com/55addee7000117b500400041.png'
    ]
	   ///////
    //飘雪花 //
    ///////
 function snowflake() {
        // 雪花容器
        var $flakeContainer = $('#snowflake');

        // 随机六张图
        function getImagesName() {
            return snowflakeURl[[Math.floor(Math.random() * 6)]];
        }
        // 创建一个雪花元素
        function createSnowBox() {
            var url = getImagesName();
            return $('<div class="snowbox" />').css({
                'width': 41,
                'height': 41,
                'position': 'absolute',
                'backgroundSize': 'cover',
                'zIndex': 100000,
                'top': '-41px',
                'backgroundImage': 'url(' + url + ')'
            }).addClass('snowRoll');
        }
        // 开始飘花
        setInterval(function() {
            // 运动的轨迹
            var startPositionLeft = Math.random() * visualWidth - 100,
                startOpacity    = 1,
                endPositionTop  = visualHeight - 40,
                endPositionLeft = startPositionLeft - 100 + Math.random() * 500,
                duration        = visualHeight * 10 + Math.random() * 5000;

            // 随机透明度，不小于0.5
            var randomStart = Math.random();
            randomStart = randomStart < 0.5 ? startOpacity : randomStart;

            // 创建一个雪花
            var $flake = createSnowBox();

            // 设计起点位置
            $flake.css({
                left: startPositionLeft,
                opacity : randomStart
            });

            // 加入到容器
            $flakeContainer.append($flake);

            // 开始执行动画
            $flake.transition({
                top: endPositionTop,
                left: endPositionLeft,
                opacity: 0.7
            }, duration, 'ease-out', function() {
                $(this).remove() //结束后删除
            });
            
        }, 200);
    }
//音乐配置
var audioConfig={
	enable:true,//是否开启音乐
	playURL: 'http://www.imooc.com/upload/media/happy.wav', // 正常播放地址
    cycleURL: 'http://www.imooc.com/upload/media/circulation.wav' // 正常循环播放地址
};
/////////
    //背景音乐 //
    /////////
function Html5Audio(url,isloop){
	var audio = new Audio(url);
        audio.autoPlay = true;
        audio.loop = isloop || false;
        audio.play();
	return{
		end:function(callback){
			audio.addEventListener('ended',function(){
				callback();
				},false);
		}
	}
}
	var container = $("#content");
    var swipe = Swipe(container);
	var boy = boyWalk();
	var visualWidth = container.width();
	var visualHeight = container.height();
	girl.setOffset();
$('button:first').click(function(){
	$('#sun').addClass("rotation");
	$('.cloud1').addClass('cloud1Anim');
	$('.cloud2').addClass('cloud2Anim');
	 boy.walkTo(2000, 0.2)
		.then(function() {
			swipe.scrollTo(visualWidth, 10000);
		}).then(function() {
			// 第二次走路
			return boy.walkTo(10000, 0.5);
		}).then(function(){boy.stopWalk();}
	).then(function(){return openDoor();}
	).then(function(){return lamp.light();}
	).then(function(){return boy.toShop(2000);}
	).then(function(){
		bird.fly();
		return boy.getFlower();}
	).then(function(){return boy.outShop(2000);}
	).then(function(){return shutDoor();}
	).then(function(){lamp.dark();}
	).then(function(){swipe.scrollTo(visualWidth*2,10000)}
	).then(function(){boy.walkTo(10000,0.15);}
	).then(function(){return boy.walkTo(1500, 0.25, (getBridgeY() - $('.girl').height()) / visualHeight);}
	).then(function(){
		var proportionX = (girl.getOffset().left - boy.getWidth() - girl.getWidth() / 5) / visualWidth;
		return boy.walkTo(2000,proportionX);
	}).then(function(){
		return boy.resetOriginal();
	}).then(function() {
		// 增加转身动作 
		setTimeout(function() {
			girl.rotate();
			boy.rotate();
		}, 1000);
	}).then(function(){
		logo.run();
		snowflake();
	});
});
function playMusic(){
	var audio = Html5Audio(audioConfig.playURL);
	audio.end(function(){
		Html5Audio(audioConfig.cycleURL,true);
	});
}
function second(){
	boy.walkTo(2000,0.15).then(function(){
		
		return boy.walkTo(1500, 0.25, (getBridgeY() - $('.girl').height()) / visualHeight);
	}).then(function(){
		var proportionX = (girl.getOffset().left - boy.getWidth() + girl.getWidth() / 5) / visualWidth;
		return boy.walkTo(2000,proportionX);
	}).then(function(){
		return boy.resetOriginal();
	}).then(function() {
		// 增加转身动作 
		setTimeout(function() {
			girl.rotate();
			boy.rotate();
		}, 1000);
	}).then(function(){
		logo.run();
		snowflake();
	});
}
function firstWalk(){
	  boy.walkTo(1000, 0.2)
                .then(function() {
                    // 第一次走路完成
                    // 开始页面滚动
                    //?
                    scrollTo(5000, 1);
                }).then(function() {
                    // 第二次走路
                    return boy.walkTo(5000, 0.5);
                });
	boy.walkTo(2000,0.5)
		.then(function(){boy.stopWalk();}
	).then(function(){return openDoor();}
	).then(function(){return lamp.light();}
	).then(function(){return boy.toShop(2000);}
	).then(function(){
		bird.fly();
		return boy.getFlower();}
	).then(function(){return boy.outShop(2000);}
	).then(function(){return shutDoor();}
	).then(function(){lamp.dark();}
	).then(function(){return boy.walkTo(2000,0.15);}
	).then(function(){	return boy.walkTo(1500, 0.25, (getBridgeY() - $('.girl').height()) / visualHeight);
	}).then(function(){
		var proportionX = (girl.getOffset().left - boy.getWidth() + girl.getWidth() / 5) / visualWidth;
		return boy.walkTo(2000,proportionX);
	}).then(function(){
		return boy.resetOriginal();
	}).then(function() {
		// 增加转身动作 
		setTimeout(function() {
			girl.rotate();
			boy.rotate();
		}, 1000);
	}).then(function(){
		logo.run();
		snowflake();
	});
}