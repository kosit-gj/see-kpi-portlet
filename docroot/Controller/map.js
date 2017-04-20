var map = function(mapId,data,option){
	
	if(option['themeCustom']){
		theme=option['themeCustom'];
		}else{
		theme=option['theme'];
		}
	
	var scaleObj=eval("("+option['scale']+")");
	var mapData="";
	var mapDataColor="";
	mapData+="{";
	mapDataColor+="{";
	$.each(data,function(index,indexEntry){
		if(index==0){
		mapData+="\""+indexEntry[0]+"\":\""+indexEntry[1]+"\"";
		mapDataColor+="\""+indexEntry[0]+"\":\""+indexEntry[2]+"\"";

		}else{
		mapData+=",\""+indexEntry[0]+"\":\""+indexEntry[1]+"\"";
		mapDataColor+=",\""+indexEntry[0]+"\":\""+indexEntry[2]+"\"";
		}
	});
	mapData+="}";
	mapDataColor+="}";
	
	var mapDataObj=eval("("+mapData+")");
	var mapDataColorObj=eval("("+mapDataColor+")");
	console.log(mapDataObj);
	console.log(mapDataColorObj);
	/*
		var mapData = {
				  "TH-XNE": 16.63,//North East
				  "TH-XN": 11.58,//North
				  "TH-XC": 158.97,//Central
				  "TH-XS": 100//south
				 
				};
	*/
		$("#"+mapId).vectorMap({
			  map:option['mapType'],
			  backgroundColor: "transparent",
			  markerStyle: option['markerStyle'],
			  markers: option['markers'], 
			  
			  series: {
			    regions: [{
			      values: mapDataColorObj,
			      attribute: "fill",
			      //scale: scaleObj,
			      //normalizeFunction: 'polynomial'
			    }]
			  },
			  onRegionLabelShow: function(e, el, code){
				//console.log(code);
			    el.html(el.html()+' '+mapDataObj[code]);
			    //alert(mapDataColorObj[code]);
			    if(mapDataColorObj[code]){
			    	//alert("hello");
			    	$(".jvectormap-label").css({"background":mapDataColorObj[code],"color":option['tooltipTextColor'],"opacity":"1"});
			    }else{
			    	$(".jvectormap-label").css({"background":theme[0],"color":option['tooltipTextColor'],"opacity":"1"});
			    }
			  },
			  regionStyle: {
					initial: {fill: option['initial']},
					selected: {fill: option['selected']}
				},
				onRegionClick:function (event, code){
					//alert(code);
					
					//return code;
					$("#mapCode").remove();
					$("body").append("<div id=\"mapCode\" style=\"display:none\">"+code+"</div>");
				}
			});
		
		if(option['clickable']==true){
		$(".jvectormap-region").css({"cursor":"pointer"});
		}
	

};

