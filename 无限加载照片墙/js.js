/**
 * Created by Ӣ�� on 2016/6/29.
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
       if(checkscrollside('container','box')){   //��������ײ�,�ͼ���ͼƬ
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
        var oChild = getChild(parent,className);  //�õ�ȫ����Ƭ
        var imgWidth = oChild[0].offsetWidth;   //ÿ����Ƭ�Ĵ�С
        var documentWidth = document.documentElement.clientWidth;  //��Ļ�Ĵ�С
        var num =Math.floor (documentWidth / imgWidth);
        oparent.style.cssText = 'width:'+num * imgWidth +'px;margin:0 auto'; //�̶�����Ĵ�С��cssText��ʹ��

        var imgHeightArr = [];  //������ŵ�һ���е�Ԫ�صĸ߶�
        for(var i = 0 ; i < oChild.length ; i++){
            var imgHeight = oChild[i].offsetHeight;
            if(i < num){    //��һ��
                imgHeightArr[i] = imgHeight;
            }else{
                var minH = Math.min.apply(null,imgHeightArr); //�ҵ�Ԫ�����������Ԫ��
                var minHIndex =lowerHeightIndex(imgHeightArr,minH); //�ҵ�Ԫ�����������Ԫ�ص�����ֵ
                oChild[i].style.position = 'absolute';
                oChild[i].style.top = minH +'px';
                oChild[i].style.left = oChild[minHIndex].offsetLeft + 'px';
                imgHeightArr[minHIndex] += oChild[i].offsetHeight;  //�������ĸ߶�

            }
        }
    }

    function checkscrollside(parent,oChildClassName){
        var oParent = document.getElementById(parent);
        var oChild = getChild(parent,oChildClassName);

        var lastImag = oChild[oChild.length-1].offsetTop +Math.floor((oChild[oChild.length-1].offsetHeight)/2);///������������ӿ����waterfall()���ĸ߶ȣ����һ�����ľ�����ҳ����+����ߵ�һ��(
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;//ҳ��Ĺ����߶�
        var windowH = document.documentElement.clientHeight;   //��Ļ�ĸ�
        return lastImag <(scrollTop + windowH) ? true : false;
    }



}

//��ȡĳ��IDΪparent�ĸ��ڵ���className���ӽڵ�
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

//��ȡ����Ԫ���еĸ߶�Ϊ���Ԫ�ص�����
function lowerHeightIndex(arr,minH){
    for(var i = 0 ; i < arr.length; i++){
        if(arr[i] == minH){
            return i;
        }
    }
}

