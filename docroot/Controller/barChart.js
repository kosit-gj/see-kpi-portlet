
var barChart=function(chartId,data,option){
	themeBarChart="";
//Array Unigue start
	//checkOption start
	
	
	if(option['cateRotate']==""){
		option['cateRotate']=0;
	}
	
	// #############get id on hover for get id for use tooltip#########################
	$(".chart").hover(function(){
		//alert(this.id);
		$(".idChart").remove();
		$("body").append("<div class=\"idChart\" style=\"display:none\">"+this.id+"</div>");
	});

	
	if(option['themeCustom']!=undefined){
		themeBarChart=option['themeCustom'];
		//$(".theme").remove();
		$("body").append("<div id=theme"+chartId+" class=\"themeTooltip\" style=\"display:none\">"+option['themeCustom']+"</div>");
	}else{
	
		themeBarChart=option['theme'];
		//$(".theme").remove();
		$("body").append("<div id=theme"+chartId+" class=\"themeTooltip\" style=\"display:none\">"+option['theme']+"</div>");
	}
	// #############get id on hover for get id for use tooltip#########################
	
	
	if(option['pointLabelsDicimal']==true){
		dicimal="%.2f";
	}else{
		dicimal="%d";
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
		
		/*
		var value="";
		value+="[[";
		var cateLength=cateArrayUnique.length-1;
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
		//alert(value);
		
	*/
		

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
		
	    
	    // Can specify a custom tick Array.
	    // Ticks should match up one for each y value (category) in the series.
		
	    var ticks =cateArrayUnique;
	    var obValue=eval("("+value+")");
	    var obSeries=eval("("+series+")");
	    var plot1 = $.jqplot(chartId, obValue, {
	        // The "seriesDefaults" option is an options object that will
	        // be applied to all series in the chart.
	    	
	    	animate: true,
	        seriesDefaults:{
	            renderer:$.jqplot.BarRenderer,
	            rendererOptions: {fillToZero: true,
	            				 barWidth: option['barWidth']
	            				 },
	            pointLabels: { show: option['pointLabels'] },
	        },
	       
	        stackSeries: option['stackSeries'],
	        title: option['title'],
	       // stackSeries: true,
	        // Custom labels for the series are specified with the "label"
	        // option on the series option.  Here a series option object
	        // is specified for each series.
	        series:obSeries,
	        // Show the legend and put it outside the grid, but inside the
	        // plot container, shrinking the grid to accomodate the legend.
	        // A value of "outside" would not shrink the grid and allow
	        // the legend to overflow the container.
	        axesDefaults: {
                //tickRenderer: $.jqplot.CanvasAxisTickRenderer ,
                tickOptions: {
                  angle: option['cateRotate'],
                  fontSize: option['fontSize'],
                }
            },
	        legend:{ 
                show:true,
                    renderer: $.jqplot.EnhancedLegendRenderer,
                    location: option['location'] ,
                    placement :option['placement'],
                    marginTop : "10px",
                    rendererOptions: {
                        numberRows: 1
                    }
                 }, 
            
	            
	        axes: {
	            // Use a category axis on the x axis and use our custom ticks.
	            xaxis: {
	                renderer: $.jqplot.CategoryAxisRenderer,
	                ticks: ticks,
	                //pad: 0,
	               // min:0,
	                max:option['max'],
	                
	                tickOptions: {formatString:dicimal, 
	                	formatter: $.jqplot.euroFormatter,	                	
      		        },
	               
               
                  
	            },
	            // Pad the y axis just a little so bars can get close to, but
	            // not touch, the grid boundaries.  1.2 is the default padding.
	            yaxis: {
	            	// rendererOptions: { forceTickAt0: true, forceTickAt100: true },
	                //pad: -1.5,
	                //tickOptions: {formatString: '%d'},
	            	 tickOptions: {formatString:dicimal, formatter: $.jqplot.euroFormatter,
	            		        },
	            	 //min:0,
	            	 max:option['max']
	            	
	            },
	           
	            
	        },
	        
	        seriesColors: themeBarChart,
	        negativeSeriesColors:themeBarChart,
	        highlighter:{
	            show:option['tooltip'],
	            tooltipContentEditor:tooltipContentEditor
	        },
	       
	    });
	    
	    if(option['clickable']==true){
	    		    
		    $("#"+chartId).on('jqplotDataHighlight', function () {
		    	   $("#"+chartId+" > .jqplot-event-canvas").css( 'cursor', 'pointer' );
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
	
	    /*
	     transform:rotate(7deg);
	    /*-ms-transform:rotate(7deg);*/ /* IE 9 */
	    /*-webkit-transform:rotate(7deg);*/ /* Opera, Chrome, and Safari */
	    
	    
	};
	  
	