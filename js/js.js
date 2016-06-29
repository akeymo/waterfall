window.onload=function(){
	waterfall('main','box')

	//模拟后台json数据
	var oData = {"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},
							{"src":"4.jpg"},{"src":"5.jpg"},{"src":"6.jpg"},
							{"src":"7.jpg"},{"src":"8.jpg"},{"src":"9.jpg"},
							{"src":"10.jpg"},{"src":"11.jpg"},{"src":"12.jpg"},]}

	window.onscroll = function(){
		//拖动滚动条加载事件
		if(checkScroll){
			//条件成立，动态创建div插入页面
			for(var i=0;i<oData.data.length;i++){
				var oParent = document.getElementById('main')
				var oBox = document.createElement('div')
				oBox.className = "box"
				oParent.appendChild(oBox)
				var oPic = document.createElement('div')
				oPic.className = "pic"
				oBox.appendChild(oPic)
				var oImg = document.createElement('img')
				oImg.src = "img/"+oData.data[i].src
				oPic.appendChild(oImg)
			}			
			waterfall('main','box')
		}
	}
}

function waterfall(parent,box){
	//瀑布流函数
	var oParent = document.getElementById(parent),
		oBox = getByClass(oParent,box)
	//设置图片列数
	var oBoxW = oBox[0].offsetWidth, //获取单个box的宽度
		cols = Math.floor(document.documentElement.clientWidth/oBoxW)
	//设置main的宽度
	oParent.style.cssText = 'width:'+cols*oBoxW+'px;margin:0 auto;'

	var arrH = [] //存放每一列的高度
	for(var i=0;i<oBox.length;i++){
		if(i<cols){
			//先将第一行各列的高度存放进数组
			arrH.push(oBox[i].offsetHeight)
		}else{
			var minH = Math.min.apply(null,arrH) //获取列高最矮的高度
			var index = getMinIndex(arrH,minH) //获取最矮列数的索引值
			oBox[i].style.position = 'absolute'
			oBox[i].style.top = minH + 'px'
			//oBox[i].style.left = index*oBoxW + 'px'或：
			oBox[i].style.left = oBox[index].offsetLeft + 'px'
			arrH[index] += oBox[i].offsetHeight //更新高度数组的值
		}
	}
}

function getMinIndex(array,val){
	//获取列高最矮的列数的索引值
	for(var i in array){
		if(array[i] == val) return i
	}
}

function checkScroll(){
	//判断滚动条拖动是否需要加载
	var oParent = document.getElementById('main')
	var oBox = getByClass(oParent,'box')
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop
	var lastBoxH = oBox[oBox.length-1].offsetTop+Math.floor(oBox[oBox.length-1].offsetHeight/2)
	var clientH = document.body.clientHeight || document.documentElement.clientHeight
	//若最后一个盒子露出超过一半则加载
	return (lastBoxH<scrollTop+clientH)?true:false
}

function getByClass(parent,clsName){
	//根据className取出元素
	var	ele = parent.getElementsByTagName('*'),
		result = []

	for(var i=0;i<ele.length;i++){
		if(ele[i].className == clsName){
			result.push(ele[i])
		}
	}

	return result
}