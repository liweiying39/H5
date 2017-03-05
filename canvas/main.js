var RADIUS = 8;       //圆球的半径
var MARGIN_TOP = 60;   //每个数字离左边的距离
var MARGIN_LEFT = 30;   //每个数字离上边的距离
/*var endTime = new Date();  //最后的时间
endTime.setDate(endTime.getDate()+3);   //距离当前时间向后3天*/
var curShowTimeSeconds = 0;     //当前的时间，单位为S
var balls =[];            //用来放置圆球
var color =['#33B5e5','#0099c','#AA66CC','#993300','#99CC00','#669900','#ffbb33','#FF8800','#FF4444','#CC000C'];//圆球的颜色

window.onload = function(){
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

 WINDOW_WIDTH = screen.width;   //当前屏幕分辨率
 WINDOW_HEIGHT = screen.height;  //注意这里是全局变量

MARGIN_LEFT = Math.round(WINDOW_WIDTH/10);
RADIUS = Math.round(WINDOW_WIDTH*4/5/108)-1;

MARGIN_TOP = Math.round(WINDOW_HEIGHT/5);

canvas.width = WINDOW_WIDTH;   
canvas.height = WINDOW_HEIGHT;

curShowTimeSeconds = getcurShowTimeSeconds(); //得到当前时间

setInterval(function(){      //setInterval（）设置动画效果，每50毫秒更新一次时间，数据
	render(context);  //绘制时间数字，圆球
	update();    //时间的动画，圆球滚动的动画

},100);
}

function getcurShowTimeSeconds(){       //获取最后时间离现在时间的S数，单位为S
	/*var cur = new Date();
	var ret = endTime.getTime() - cur.getTime();
	ret = Math.round(ret/1000);     //毫妙转换为秒

	return ret>=0? ret :0;   //如果到达了最后时间，返回0*/

	var cur = new Date();             //时钟效果
	var ret = cur.getHours()*3600 + cur.getMinutes()*60 + cur.getSeconds();

	return ret;
}

function update(){
  var nextShowTimeSecond = getcurShowTimeSeconds();   //获取当前时间后50毫秒时间
 
    var nextHours = parseInt(nextShowTimeSecond/3600);
	var nextMintes = parseInt((nextShowTimeSecond - nextHours*3600)/60);
	var nextSeconds = parseInt(nextShowTimeSecond%60);

    var curHours = parseInt(curShowTimeSeconds/3600);      //获取当前时间
	var curMintes = parseInt((curShowTimeSeconds - curHours*3600)/60);
	var curSeconds = parseInt(curShowTimeSeconds%60);

	if(curSeconds != nextSeconds){    //如果50毫秒后的时间与当前的时间不同时（单位S），更新
		if(parseInt(curHours/10) != parseInt(nextHours/10)){
			addBalls(MARGIN_LEFT+0*(RADIUS+1),MARGIN_TOP,parseInt(curHours/10));
		}
		if(parseInt(curHours%10) != parseInt(nextHours%10)){
			addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(curHours%10));
		}
		if(parseInt (curMintes/10) != parseInt(nextMintes/10)){
			addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(curMintes/10));
		}
		if(parseInt(curMintes%10) != parseInt(nextMintes%10)){
			addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(curMintes%10));
		}
		if(parseInt(curSeconds/10) != parseInt(nextSeconds/10)){
			addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds/10));
		}
		if(parseInt(curSeconds%10) != parseInt(nextSeconds%10)){
			addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds%10));
		}
		curShowTimeSeconds = nextShowTimeSecond;
	}
       updateBalls();
}

function updateBalls(){      //让圆球动起来
		for(var i = 0 ; i < balls.length ; i++){
			balls[i].x +=balls[i].vx;
			balls[i].y += balls[i].vy;
			balls[i].vy += balls[i].g;     //受重力影响

	    if(balls[i].y >= WINDOW_HEIGHT-RADIUS){     //碰撞检测 
	    	balls[i].y = WINDOW_HEIGHT - RADIUS;
	    	balls[i].vy =- balls[i].vy * 0.75;    //添加摩擦系数
	    }
		}

		var cnt = 0;
	    for(var i = 0 ; i < ball.length ; i++){    //把超出画布的数组删除掉，节省内存空间
		if(ball[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH){
				ball[cnt++] = ball[i];    //注意这里的数字，i一定小于或等于cnt，0-cnt的数字是在画面内的，而在cnt-ball.length的数字是在画布外的

				while(ball.length > cnt){  //把超出画布的圆球删除掉
					ball.pop();
				}
		 	}
		 }
	}

function addBalls(x,y,num){     //为改变的数字添加圆球
	for(var i = 0 ; i < digit[num].length; i++){
		for(var j = 0 ; j < digit[num][i].length ; j++){
			if(digit[num][i][j] == 1){
				var aBall = {
					x:x+j*2*(RADIUS+1)+(RADIUS+1),
					y:y+i*2*(RADIUS+1)+(RADIUS+1),
					g:1.5+Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
					vy:-5,
					color:color[Math.floor(Math.random()*color.length)]
				}
				balls.push(aBall);
			}
		}
    }
}

function render(cxt){

    cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);   //在描绘之前，先清空
	var hours = parseInt(curShowTimeSeconds/3600);
	var mintes = parseInt((curShowTimeSeconds - hours*3600)/60);
	var seconds = parseInt(curShowTimeSeconds%60);

	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);    //
	renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),cxt);
	renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,cxt);
	renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(mintes/10),cxt);
	renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(mintes%10),cxt);
	renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,cxt);
	renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt);
	renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);

	for(var i = 0; i < balls.length ; i++){  //为改变的数字描绘圆球
		cxt.fillStyle = balls[i].color;

		cxt.beginPath();
		cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
		cxt.closePath();

		cxt.fill();
	}
}

function renderDigit(x,y,num,cxt){     //每个数字进行描绘
	cxt.fillStyle = "rgb(0,102,153)";
	for(var i = 0 ; i < digit[num].length; i++){
		for(var j = 0 ; j < digit[num][i].length ; j++){
			if(digit[num][i][j] == 1){
				cxt.beginPath();
				cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
				cxt.closePath();

				cxt.fill();

			}
		}
	}
}
