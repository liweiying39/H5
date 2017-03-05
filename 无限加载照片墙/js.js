/**
 * Created by 英子 on 2016/6/29.
 */
window.onload = function(){

var ImgSrc ={data:[
    {src:'images/0.jpg'},{src:'images/1.jpg'},{src:'images/2.jpg'},{src:'images/3.jpg'},{src:'images/4.jpg'},
    {src:'images/5.jpg'},{src:'images/6.jpg'},{src:'images/7.jpg'},{src:'images/8.jpg'},{src:'images/9.jpg'},
    {src:'images/10.jpg'},{src:'images/11.jpg'},{src:'images/12.jpg'},{src:'images/13.jpg'},{src:'images/14.jpg'},
    {src:'images/15.jpg'},{src:'images/16.jpg'},{src:'images/17.jpg'},{src:'images/18.jpg'},{src:'images/19.jpg'},
    {src:'images/20.jpg'},{src:'images/21.jpg'},{src:'images/22.jpg'},{src:'images/23.jpg'},{src:'images/24.jpg'},
    {src:'images/25.jpg'},{src:'images/26.jpg'},{src:'images/27.jpg'},{src:'images/28.jpg'},{src:'images/29.jpg'}
]}

    waterfall('container','box');

   window.onscroll = function(){
       if(checkscrollside('container','box')){   //如果滚到底部,就加载图片
           var parent = document.getElementById("container");
           for(var i = 0 ; i < ImgSrc.data.length ; i++){
               var oDiv = document.createElement("div");
               oDiv.className = 'box';
               parent.appendChild(oDiv);
               var imgBox = document.createElement('div');
               imgBox.className ='box-img';
               oDiv.appendChild(imgBox);
               var img = document.createElement('img');
               img.src= ImgSrc.data[i].src;
               imgBox.appendChild(img);
           }
           waterfall('container','box');
       }
   }

    function waterfall(parent,className){
        var oparent = document.getElementById(parent);
        var oChild = getChild(parent,className);  //得到全部照片
        var imgWidth = oChild[0].offsetWidth;   //每个照片的大小
        var documentWidth = document.documentElement.clientWidth;  //屏幕的大小
        var num =Math.floor (documentWidth / imgWidth);
        oparent.style.cssText = 'width:'+num * imgWidth +'px;margin:0 auto'; //固定总体的大小，cssText的使用

        var imgHeightArr = [];  //用来存放第一行中的元素的高度
        for(var i = 0 ; i < oChild.length ; i++){
            var imgHeight = oChild[i].offsetHeight;
            if(i < num){    //第一行
                imgHeightArr[i] = imgHeight;
            }else{
                var minH = Math.min.apply(null,imgHeightArr); //找到元素数组中最矮的元素
                var minHIndex =lowerHeightIndex(imgHeightArr,minH); //找到元素数组中最矮的元素的索引值
                oChild[i].style.position = 'absolute';
                oChild[i].style.top = minH +'px';
                oChild[i].style.left = oChild[minHIndex].offsetLeft + 'px';
                imgHeightArr[minHIndex] += oChild[i].offsetHeight;  //更新它的高度

            }
        }
    }

    function checkscrollside(parent,oChildClassName){
        var oParent = document.getElementById(parent);
        var oChild = getChild(parent,oChildClassName);

        var lastImag = oChild[oChild.length-1].offsetTop +Math.floor((oChild[oChild.length-1].offsetHeight)/2);///创建【触发添加块框函数waterfall()】的高度：最后一个块框的距离网页顶部+自身高的一半(
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;//页面的滚动高度
        var windowH = document.documentElement.clientHeight;   //屏幕的高
        return lastImag <(scrollTop + windowH) ? true : false;
    }



}

//获取某个ID为parent的父节点下className中子节点
function getChild(parent,className){
    var childArr = [];
    var parent = document.getElementById(parent);
    var allChild = parent.getElementsByTagName('*');
    for(var i = 0 ; i < allChild.length ; i++){
        if(allChild[i].className == className){
            childArr.push(allChild[i])
        }
    }
    return childArr;
}

//获取数组元素中的高度为最矮的元素的索引
function lowerHeightIndex(arr,minH){
    for(var i = 0 ; i < arr.length; i++){
        if(arr[i] == minH){
            return i;
        }
    }
}

