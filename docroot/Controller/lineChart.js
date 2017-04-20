var lineChart=function(chartId,data,option){
	
	//Array Unigue start
	//checkOption start
	
	if(option['cateRotate']==""){
		option['cateRotate']=0;
	}
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
		dicimal="%.0f\%";
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
			
		    //var test = indexEntry[2];
		    //console.log(test);
			
			
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
		//check value is empty is set 0
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
		
		var val="";
		val+="[";
		var checkUndefinedValue=0;
		for(var i=0;i<slotArray.length;i++){
				for(var j=0;j<slotArray[i].length;j++){
					if(slotArray2[i][j]==undefined){
						checkUndefinedValue=0; 
					}else{
						checkUndefinedValue=slotArray2[i][j];
					}
					if(i==0){
						if(j==0){
						val+=+checkUndefinedValue;
						}else{
						val+=","+checkUndefinedValue;	
						}
					}else{
						if(cateLength==cateArrayUnique.length-1){
							val+=","+checkUndefinedValue;
						}else{
							val+=","+checkUndefinedValue;
						}
					}
					if(cateLength==0){
						val+="";
						cateLength=cateArrayUnique.length;
					}
					cateLength--;
				}
		}
		val+="]";
	    
	    // Can specify a custom tick Array.
	    // Ticks should match up one for each y value (category) in the series.
		
	    var ticks =cateArrayUnique;
	    var obValue=eval("("+value+")");
	    var obSeries=eval("("+series+")");
	    
	    var obVal=eval("("+val+")");
	    var maxobVal = Math.max.apply(Math,obVal);
	    var maxobValfun = (maxobVal + ((10*maxobVal)/100));
	    var obValstr = (maxobValfun.toLocaleString("en-IN",{maximumSignificantDigits: 2})).replace(',','');
	    var maxvalues = parseInt(obValstr);
	    
		if(option['maxY']==true){
			maxY = maxvalues;
		}else{
			maxY = null;
		}
	    //console.log(obVal);
	    //console.log(test);
	    //console.log(test1);
	    //console.log(test2);
	    //console.log(test3);
	    
		//var ticks = ['May', 'June', 'July', 'August', 'June', 'July', 'August', 'June', 'July'];
		 var plot2 = $.jqplot (chartId, obValue, {
		      // Give the plot a title.
		      title: option['title'],
		      // You can specify options for all axes on the plot at once with
		      // the axesDefaults object.  Here, we're using a canvas renderer
		      // to draw the axis label which allows rotated text.
		      series:obSeries,
		      
		      seriesColors: theme,
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
		      axesDefaults: {
		        //labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
		        //tickRenderer: $.jqplot.CanvasAxisTickRenderer ,
		        tickOptions: {
	                  angle: option['cateRotate'],
	                  fontSize: option['fontSize']
	                },
	                
		      },
		      // An axes object holds options for all axes.
		      // Allowable axes are xaxis, x2axis, yaxis, y2axis, y3axis, ...
		      // Up to 9 y axes are supported.
		      axes: {
		        // options for each axis are specified in seperate option objects.
		         xaxis: {
	                renderer: $.jqplot.CategoryAxisRenderer,
	                ticks: ticks,
	                pad: 1.5,
	                min:0
	            },
		        yaxis: {
		          //label: "Y Axis"
		        	tickOptions: {formatString:dicimal, formatter: $.jqplot.euroFormatter},
		        	pad: 0,
		        	ticks:option['ticksY'],
		        	min:0,
		        	max:maxY,
		        }
		      },
		      seriesDefaults:{
		          
		            pointLabels: { show: option['pointLabels'] },
		            
		            
		        },
		      highlighter:{
		            show:option['tooltip'],
		            tooltipContentEditor:tooltipContentEditor
		        }
		    });
		
		 if(option['clickable']==true){
			    $("#"+chartId+" >.jqplot-event-canvas").css( 'cursor', 'pointer' );
		    	$("#"+chartId+" >.jqplot-point-label").css( 'cursor', 'pointer' );
		    	
			   
		    }
		 $("#"+chartId+">.jqplot-yaxis-tick").css({"color":"#000000"});
		 $("#"+chartId+">.jqplot-point-label").css({"font-size":option['pointLabelsFont'],"color":option['pointLabelsColor']});
		 $("#"+chartId+">.jqplot-point-label").css({
		    	"-webkit-transform":"rotate("+option['pointLabelsRotate']+"deg)",
		    	"-moz-transform":"rotate("+option['pointLabelsRotate']+"deg)",
		    	"-transform":"rotate("+option['pointLabelsRotate']+"deg)",
		    	"-ms-transform":"rotate("+option['pointLabelsRotate']+"deg)",
		    	});
		 $("#"+chartId+">.jqplot-highlighter-tooltip").css({"font-size":option['tooltipFontSize']});
		 //$(".jqplot-highlighter-tooltip").css({"background":option['theme'][0],"color":option['tooltipTextColor'],"opacity":"1"});
	};