var option = new Array();
var theme=["#007BC3", "#76B800", "#FFA500","#EF4C00","#A52A2A","#4682b4"];
//option['theme']=["#007BC3", "#76B800", "#FFA500","#EF4C00","#A52A2A","#4682b4"];
//option['themeCustom']=[];
var themeCustom=[];
var dicimal="";
//var themeCustom=[];
option['fontSize']="13px";
option['tooltipTextColor']='white';
option['tooltipFontSize']="27px";



//ฟังก์ชันสำหรับ tooltip แสดงค่าตัวเลข 2 ตำแหน่ง และ Commas
function getDicimalCommas(value){
 var nStr=(value).toFixed(2);
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}
//ฟังก์ชันจัดการ Commas
function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}	



function tooltipContentEditorByCate(str, seriesIndex, pointIndex, plot) {
    // display series_label, x-axis_tick, y-axis value
	// console.log(seriesIndex+"="+pointIndex);
	//console.log(plot.data[seriesIndex][pointIndex]);
	var cate=plot.data[seriesIndex][pointIndex][0];
	var vale=plot.data[seriesIndex][pointIndex][1];
	var idChart=$(".idChart").text();
    var themeCustom = $("#theme"+idChart).text();
	var themeCustomArray = themeCustom.split(",");
	
	
	//console.log(themeCustomArray);
	
	/*if(option['themeCustom']!=undefined){
		$("#"+idChart+">.jqplot-highlighter-tooltip").css({"background":option['themeCustom'][pointIndex],"color":option['tooltipTextColor'],"opacity":"1","z-index":"12999","padding-left":"2px","padding-right":"5px"});
	}else{
		$("#"+idChart+">.jqplot-highlighter-tooltip").css({"background":theme[pointIndex],"color":option['tooltipTextColor'],"opacity":"1","z-index":"12999","padding-left":"2px","padding-right":"5px"});
	}
	*/
	//alert(pointIndex);
	$("#"+idChart+">.jqplot-highlighter-tooltip").css({"background":themeCustomArray[pointIndex],"color":option['tooltipTextColor'],"opacity":"1","z-index":"12999","padding-left":"2px","padding-right":"5px"});

	if(option['pointLabelsDicimal']==true){
	 return   cate+" "+getDicimalCommas(vale);
	}else{
	 return   cate+" "+addCommas(vale);
	}
}

function tooltipContentEditor(str, seriesIndex, pointIndex, plot) {
    // display series_label, x-axis_tick, y-axis value
	//console.log(option['themeCustom'][pointIndex]);
    //console.log($(".idChart").text());
    var idChart=$(".idChart").text();
    var themeCustom = $("#theme"+idChart).text();
	var themeCustomArray = themeCustom.split(",");
    //alert(themeCustomArray);
	//if(option['themeCustom']!=undefined){
		
		
		
		
		$("#"+idChart+">.jqplot-highlighter-tooltip").css({"background":themeCustomArray[seriesIndex],"color":option['tooltipTextColor'],"opacity":"1","z-index":"12999","padding-left":"2px","padding-right":"5px"});
	
	//}else{
		//$("#"+idChart+">.jqplot-highlighter-tooltip").css({"background":theme[seriesIndex],"color":option['tooltipTextColor'],"opacity":"1","z-index":"12999","padding-left":"2px","padding-right":"5px"});
	//}
	if(option['pointLabelsDicimal']==true){
	 return plot.series[seriesIndex]["label"] + " " + getDicimalCommas(plot.data[seriesIndex][pointIndex]);
	}else{
	return plot.series[seriesIndex]["label"] + " " + addCommas(plot.data[seriesIndex][pointIndex]);	
	}
	
	
}
//checkOption end
Array.prototype.getUnique = function(){
	   var u = {}, a = [];
	   for(var i = 0, l = this.length; i < l; ++i){
	      if(u.hasOwnProperty(this[i])) {
	         continue;
	      }
	      a.push(this[i]);
	      u[this[i]] = 1;
	   }
	   return a;
	}
//Array Unigue end
var getCate = function(paramUrl,pointIndex,option){
	
	//var param = eval("("+option['param']+")");
	var param=option['param'];
	var cateName="";
	$.ajax({
		url:paramUrl, 
		type:"get",
		dataType:"json",
		data:param,
		async:false,
		success:function(data){
			//cateName=data;
			var cateArray= new Array();
			$.each(data,function(index,indexEntry){
				//alert(indexEntry[2]);
				
				cateArray[index]=indexEntry[0];
			});
			cateArrayUnique=cateArray.getUnique();
			cateName= cateArrayUnique[pointIndex];
		}
	 });
	
	return cateName;
};

var getSeries = function(paramUrl,seriesIndex,option){
	var seriesName="";
	$.ajax({
		url:paramUrl, 
		type:"get",
		dataType:"json",
		data:option['param'],
		async:false,
		success:function(data){
				
				var seriesArray=new Array();
				$.each(data,function(index,indexEntry){

					seriesArray[index]=indexEntry[1];
				});
				seriesArrayUnique=seriesArray.getUnique();
				
			seriesName= seriesArrayUnique[seriesIndex];
			
		}
	 });
	return seriesName;
};
var getSeriesCode = function(paramUrl,seriesIndex,option){
	var seriesName="";
	$.ajax({
		url:paramUrl, 
		type:"get",
		dataType:"json",
		data:option['param'],
		async:false,
		success:function(data){
				
				var seriesArray=new Array();
				$.each(data,function(index,indexEntry){

					seriesArray[index]=indexEntry[3];
				});
				seriesArrayUnique=seriesArray.getUnique();
				
			seriesName= seriesArrayUnique[seriesIndex];
			
		}
	 });
	return seriesName;
};