var barChartHorizontal = function(chartId,data,option){
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
	
	if(option['pointLabelsDicimal']==true){
		dicimal="%.2f";
	}else{
		dicimal="%d\%";
	}
	
	var cateArray= new Array();
	var cateArrayUnique= new Array();
	var seriesArray=new Array();
	var seriesArrayUnique=new Array();
	var series="";
	
	
	$.each(data,function(index,indexEntry){
		//alert(indexEntry[2]);
		
		cateArray[index]=indexEntry[0];
		seriesArray[index]=indexEntry[1];
		
		
		
	});
	cateArrayUnique=cateArray.getUnique();
	seriesArrayUnique=seriesArray.getUnique();
	
	//
	/*
	 {label:'Hotel'},
     {label:'Event Regristration'},
     {label:'Airfare'}
	 */
	series+="[";
	$.each(seriesArrayUnique,function(index,indexEntry){
		if(index==0){
		series+="{label:'"+indexEntry+"'}";
		}else{
		series+=",{label:'"+indexEntry+"'}";
		}
		
	});
	series+="]";
	
	

	var cateLength=cateArrayUnique.length-1;
	
	var slotArray= new Array();//get array all
	var slotArray2= new Array();//get array for data is not empty
	
	for(var i=0;i<seriesArrayUnique.length;i++){
		
		
		slotArray[i] = new Array();
		slotArray2[i] = new Array();
		
		
		for(var j=0;j<cateArrayUnique.length;j++){
			slotArray[i][j]=cateArrayUnique[j];
			//alert(cateArrayUnique[j]);
			
			$.each(data,function(index,indexEntry){
				if((cateArrayUnique[j]==indexEntry[0])&&(seriesArrayUnique[i]==indexEntry[1])){
					//alert(cateArrayUnique[j]+"-"+indexEntry[2]);
					slotArray2[i][j]=indexEntry[2];

				}
				
			});

		}
		
		
	}

	var value="";
	value+="[[";
	var checkUndefinedValue=0;
	//manage import data value  and check undefined value
	for(var i=0;i<slotArray.length;i++){
				//alert(slotArray[i]);
			for(var j=0;j<slotArray[i].length;j++){
				if(slotArray2[i][j]==undefined){
					checkUndefinedValue=0; 
				}else{
					checkUndefinedValue=slotArray2[i][j];
				}

				
				if(i==0){
					if(j==0){
					value+=+checkUndefinedValue;
					}else{
					value+=","+checkUndefinedValue;	
					}
				}else{
					if(cateLength==cateArrayUnique.length-1){
						value+=",["+checkUndefinedValue;
					}else{
						value+=","+checkUndefinedValue;
					}
					
				}
				
				if(cateLength==0){
					value+="]";
					cateLength=cateArrayUnique.length;
				}
				cateLength--;
				
				
			}
		
	}
	value+="]";
	
	//alert(value);
	
	/*
		$.each(data,function(index,indexEntry){
			
				if(index==0){
					value+=indexEntry[2];
				}else{
					if(cateLength==cateArrayUnique.length-1){
						value+=",["+indexEntry[2];
					}else{
						value+=","+indexEntry[2];
					}
					
				}
				
				if(cateLength==0){
					value+="]";
					cateLength=cateArrayUnique.length;
				}
				cateLength--;
				
				
				
		});
		
		value+="]";
		*/
		//alert(cateArrayUnique);
		//alert(value);
		//alert(series);
	

    
    // Can specify a custom tick Array.
    // Ticks should match up one for each y value (category) in the series.
		
    var ticks =cateArrayUnique;
    var obValue=eval("("+value+")");
    var obSeries=eval("("+series+")");
	
	
	

	        //var ticks = ['A', 'B', 'C', 'D', 'E'];

	        plot4 = $.jqplot(chartId, obValue, {
	            animate: true,
	            stackSeries: option['stackSeries'],
	            captureRightClick: true,
	            title: option['title'],
	            seriesColors: theme,
	            seriesDefaults: {
	                renderer: $.jqplot.BarRenderer,
	                shadowAngle: 135,
	                rendererOptions: {
	                    barDirection: 'horizontal',
	                    highlightMouseDown: true,
	                    barWidth: option['barWidth']
	                },
	                pointLabels: {
	                    show: option['pointLabels'],
	                    //formatString: '%d',
	                    tickOptions: {formatString:dicimal, formatter: $.jqplot.euroFormatter},
	                    hideZeros: true
	                }
	            },
	            series:obSeries,
    	        legend: {
    	            show: true,
    	            renderer: $.jqplot.EnhancedLegendRenderer,
                    location: option['location'] ,
                    placement :option['placement'],
                    marginTop : "10px",
                    rendererOptions: {
                        numberRows: 1
                    }
    	        },
	            axes: {
	                xaxis: {
	                    renderer: $.jqplot.LogAxisRenderer,
	                    showTicks: true,
	                    drawMajorGridlines: true,
	                    tickOptions: {formatString:dicimal, formatter: $.jqplot.euroFormatter},
	                    //pad: 1.5,
	                    min:0,
	                    max:option['max'],
	                    ticks:option['ticks'],
	                },
	                yaxis: {
	                    renderer: $.jqplot.CategoryAxisRenderer,
	                    rendererOptions: {
	                        tickRenderer: $.jqplot.AxisTickRenderer,
	                        tickOptions: {
	                            mark: null,
	                            angle: option['cateRotate'],
	                            fontSize: option['fontSize'],
	                            formatString:dicimal, formatter: $.jqplot.euroFormatter,
	                        },
	                        min:0,
	                        max:option['max']
	                    },
	                    
	                    //pad: 1.05,
	                    ticks: ticks,
	                    
	                }
	            },
	            
		        highlighter:{
		            show:option['tooltip'],
		            tooltipContentEditor:tooltipContentEditor
		        },
	        });
	       
	        if(option['clickable']==true){
    		    
			    $("#"+chartId).on('jqplotDataHighlight', function () {
			    	   $("#"+chartId+" >.jqplot-event-canvas").css( 'cursor', 'pointer' );
			    	});
		    }
	        $("#"+chartId+">.jqplot-yaxis-tick").css({"color":"#000000"});
	        $("#"+chartId+">.jqplot-point-label").css({"font-size":option['pointLabelsFont'],"color":option['pointLabelsColor']});
	        $("#"+chartId+">.jqplot-highlighter-tooltip").css({"font-size":option['tooltipFontSize']});
	        $("#"+chartId+">.jqplot-point-label").css({
		    	"-webkit-transform":"rotate("+option['pointLabelsRotate']+"deg)",
		    	"-moz-transform":"rotate("+option['pointLabelsRotate']+"deg)",
		    	"-transform":"rotate("+option['pointLabelsRotate']+"deg)",
		    	"-ms-transform":"rotate("+option['pointLabelsRotate']+"deg)",
		    	});
	        
	};