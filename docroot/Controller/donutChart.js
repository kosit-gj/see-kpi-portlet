var donutChart=function(chartId,data,option){
	
		// var s1 = [['a',6], ['b',8], ['c',14], ['d',20]];
		  //var s2 = [['a', 8], ['b', 12], ['c', 6], ['d', 9]];
	/*
	if(option['themeCustom']){
		theme=option['themeCustom'];
		}else{
		theme=option['theme'];
		}
	*/
	// #############get id on hover for get id for use tooltip#########################
	$(".chart").hover(function(){
		//alert(this.id);
		$(".idChart").remove();
		$("body").append("<div class=\"idChart\" style=\"display:none\">"+this.id+"</div>");
	});

	
	if(option['themeCustom']!=undefined){
		theme=option['themeCustom'];
		//$(".theme").remove();
		$("body").append("<div id=theme"+chartId+" class=\"themeTooltip\" style=\"display:none\">"+option['themeCustom']+"</div>");
	}else{
	
		theme=option['theme'];
		//$(".theme").remove();
		$("body").append("<div id=theme"+chartId+" class=\"themeTooltip\" style=\"display:none\">"+option['theme']+"</div>");
	}
	// #############get id on hover for get id for use tooltip#########################
	
	var value = "";
	value+="[";
	
	$.each(data,function(index,indexEntry){
		if(index==0){
			value+="[";
			value+="\""+indexEntry[0]+"\""+","+indexEntry[1];
			
		}else{
			value+=",[";
			value+="\""+indexEntry[0]+"\""+","+indexEntry[1];
		}
		value+="]";
	});
	value+="]";
	var valueObj= eval("("+value+")");
	
	
		  var plot3 = $.jqplot(chartId, [valueObj], {
			seriesColors: theme,
			title: option['title'],
		    seriesDefaults: {
		      // make this a donut chart.
		    	
		      renderer:$.jqplot.DonutRenderer,
		      rendererOptions:{
		        // Donut's can be cut into slices like pies.
		        sliceMargin: 3,
		        // Pies and donuts can start at any arbitrary angle.
		        startAngle: -90,
		        showDataLabels: option['showDataLabels'],
		        // By default, data labels show the percentage of the donut/pie.
		        // You can show the data 'value' or data 'label' instead.
		        //dataLabels: 'value'	//แสดง value เป็นจำนวนจริง
		        dataLabels:'percent',	//แสดง value เป็น %
		        //innerDiameter: 160, //ขนาดกราฟ
		        
		      }
		  	
		    },
            highlighter: {
          	  show: option['tooltip'],
          	  formatString:'%s %d', 
          	  tooltipLocation:'sw', 
          	  useAxesFormatters:false,
          	 tooltipContentEditor:tooltipContentEditorByCate
          	},
		    legend: { 
		    	show:true,
	            renderer: $.jqplot.EnhancedLegendRenderer,
                location: option['location'] ,
                placement : option['placement'],
                marginTop : "10px",
                rendererOptions: {
                    numberRows: option['numberRows'],
		    }
		    },
          	//legend: { show:true, rendererOptions: {numberRows: 1} , location: option['location'], placement :option['placement'] }
		  });
		  //$(".jqplot-highlighter-tooltip").css({"background":option['theme'][0],"color":option['tooltipTextColor'],"opacity":"1"});
		  $("#"+chartId+">.jqplot-highlighter-tooltip").css({"font-size":option['tooltipFontSize']});
		  $("#"+chartId+">.jqplot-data-label").css({"font-size":option['pointLabelsFont'],"color":option['pointLabelsColor']});
		
	};
	