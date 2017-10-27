 var restfulPathDashboard="/see_api/public/cds_result";
 var galbalDashboard=[];
 var galbalDataTemp = [];
 var changeAutocomplete=true;
 var mobileStatus=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
 galbalDataTemp['galbalOrg'] = [];
 galbalDataTemp['extract'] = false;
 galbalDataTemp['All_KPI'] = {};
 galbalDataTemp['collapse_show']="";
 galbalDataTemp['double_click']=false;
//# Generate Drop Down List
 var generateDropDownList = function(url,type,request,initValue){
 	var html="";
 	
 	if(initValue!=undefined){
 		html+="<option value=''>"+initValue+"</option>";
	}

 	$.ajax ({
 		url:url,
 		type:type ,
 		dataType:"json" ,
 		data:request,
 		headers:{Authorization:"Bearer "+tokenID.token},
 		async:false,
 		success:function(data){
 			try {
 			    if(Object.keys(data[0])[0] != undefined && Object.keys(data[0])[0] == "item_id"){
 			    	galbalDataTemp["item_id"] = [];
 			    	$.each(data,function(index,indexEntry){
 			    		galbalDataTemp["item_id"].push(indexEntry[Object.keys(indexEntry)[0]]);
 		 			});	
 			    }
 			}
 			catch(err) {
 			    console.log(err.message);
 			}

 			
 			$.each(data,function(index,indexEntry){
 				html+="<option value="+indexEntry[Object.keys(indexEntry)[0]]+">"+indexEntry[Object.keys(indexEntry)[1] == undefined  ?  Object.keys(indexEntry)[0]:Object.keys(indexEntry)[1]]+"</option>";	
 			});	

 		}
 	});	
 	return html;
 };
 var generateAutocomplete = function(id,url,type,requests){
	 $(id).autocomplete({
	        source: function (request, response) {
	        	requests[Object.keys(requests)] = request.term;
	        	$.ajax({
					 url:url,
					 type:type,
					 dataType:"json",
					 data:requests,
					//async:false,
					 headers:{Authorization:"Bearer "+tokenID.token},
	                 error: function (xhr, textStatus, errorThrown) {
	                        console.log('Error: ' + xhr.responseText);
	                    },
					 success:function(data){
						  
							response($.map(data, function (item) {
	                            return {
	                                label: item[Object.keys(item)[1]],
	                                value: item[Object.keys(item)[1]],
	                                value_id : item[Object.keys(item)[0]]
	                                
	                            };
	                        }));
						
					},
					beforeSend:function(){
						$("body").mLoading('hide');	
					}
					
					});
	        },
			select:function(event, ui) {
				$(id).val(ui.item.value);
	            $(id+"_id").val(ui.item.value_id);
	            changeAutocomplete = true;
	            $("#kpi").html((generateDropDownList(restfulURL+"/see_api/public/dashboard/kpi_list","POST",{"appraisal_level":$("#apprasiaLevel").val(),"org_id":$("#organization").val(),"emp_id":$("#emp_name_id").val(),"appraisal_type_id":$("#app_type").val()})));
	            galbalDataTemp[id] = ui.item.label;
	            galbalDataTemp[id+"_id"]=ui.item.value_id;
	            return false;
	        },change: function(e, ui) {  

	 
				if ($(id).val() == galbalDataTemp[id]) {
					$(id+"_id").val(galbalDataTemp[id+"_id"]);
					changeAutocomplete = true;
				}  else if (ui.item != null){
					$(id+"_id").val(ui.item.value_id);
					changeAutocomplete = true;
				}else {
					$(id+"_id").val("");
					if(changeAutocomplete == true){
						$("#kpi").html((generateDropDownList(restfulURL+"/see_api/public/dashboard/kpi_list","POST",{"appraisal_level":$("#apprasiaLevel").val(),"org_id":$("#organization").val(),"emp_id":$("#emp_name_id").val(),"appraisal_type_id":$("#app_type").val()})));
						changeAutocomplete = false;
					}
					
				}
				
	         }
	    });
 }
 var generateAccordionHTML = function(data,parent,type){
		var kpi_id = galbalDataTemp["item_id"];
		var accordionHtml = "";
		if(parent == "group1"){
			accordionHtml += "<div id='orgParent' class='panel panel-default sortableItem'>";
		}else{
			accordionHtml += "<div class='panel panel-default sortableItem'>";
		}
			
		accordionHtml += "	<div class='panel-heading' role='tab' id='headOrg-"+(type == "org" ? data['org_id'] : data['emp_id'] )+"'>";
		accordionHtml += "		<h4 class='panel-title' "+(parent == "group1" ? "style='margin-top: 5px; margin-bottom: 5px;' " : "")+">";
		accordionHtml += "			 <a class='collapsed row' role='button' data-toggle='collapse' data-parent='#accordion' href='#bodyOrg-"+(type == "org" ? data['org_id'] : data['emp_id'] )+"' aria-expanded='false' aria-controls='bodyOrg-"+(type == "org" ? data['org_id'] : data['emp_id'] )+"' style='color: black;font-weight: bold;'>";
		
		if(parent == "group1"){
			accordionHtml += "<div class='accordion-content span10' style=''>";
			accordionHtml += "	<div style='margin-bottom: auto; margin-top: auto;'><span class='fa fa-caret-right'></span> "+data['org_name']+"&emsp;</div>";
			accordionHtml += "</div>";
			accordionHtml += "<div class='accordion-btn'>";
			accordionHtml += "<button id='btn_extract' type='button' class='btn btn-xs btn-white' style='margin-top: -1px;font-weight: 700;'> <i class='fa fa-plus-square' aria-hidden='true'></i> Expand</button>";
			accordionHtml += "<button id='btn_kpi' type='button' data-target='#ModalKPI' data-toggle='modal' class='btn btn-xs btn-white' style='margin-top: -1px;margin-left: 5px;font-weight: 700;'> <i class='fa fa-table fa-table' aria-hidden='true'></i> All KPI</button>";
			accordionHtml += "</div>";
		}else{
			accordionHtml += "<span class='fa fa-caret-right'></span> "+data['org_name']+"&emsp;";	
		}
		
		accordionHtml += "			</a>";	
		accordionHtml += "		</h4>";	
		accordionHtml += "	</div>";	
		accordionHtml += "	<div id='bodyOrg-"+(type == "org" ? data['org_id'] : data['emp_id'] )+"' class='panel-collapse collapse' role='tabpanel' aria-labelledby='headOrg-"+(type == "org" ? data['org_id'] : data['emp_id'] )+"'>";	
		accordionHtml += "		<div class='panel-body'>";
		//#Start Body Accordion
		accordionHtml += "				<div class='span12 graphLTopHeader'>"+data['perspective_name']+" - "+data['item_name']+" (หน่วย : "+data['uom_name']+") "+"<span class='LastUpdateText'>Last Updated: "+data['etl_dttm']+"</spen></div>";		
		//#btn next & previous kpi
		if(kpi_id[kpi_id.indexOf(parseInt($("#param_kpi_id").val()))-1] !=  undefined && parent == "group1"){
			accordionHtml += "			<span id='previous' class='arrow' data-previous='"+kpi_id[kpi_id.indexOf(parseInt($("#param_kpi_id").val()))-1]+"'></span>";
		}
		if(kpi_id[kpi_id.indexOf(parseInt($("#param_kpi_id").val()))+1] !=  undefined && parent == "group1"){
			accordionHtml += "			<span id='next' class='arrow' data-next='"+kpi_id[kpi_id.indexOf(parseInt($("#param_kpi_id").val()))+1]+"'></span>";	
		}
		
		accordionHtml += "			<div class='' style='height: auto;'>";
		
		accordionHtml += "				<div class='span4'>";
		//accordionHtml += "				<div class='graphLTopHeader'>Perspective: "+data['perspective_name']+"</div>";
		accordionHtml += "					<div>";
		accordionHtml += "						<div class='graphLTop'>";
		accordionHtml += "							<div class='textGRaphTop'>Target</div>";
		accordionHtml += "							<div class='textGRaphTop'>"+addCommas(data['dual_chart']['data']['target'])+"</div>";
		accordionHtml += "						</div>";
		accordionHtml += "						<div class='graphLTop'>";
		accordionHtml += "							<div class='textGRaphTop'>Forecast</div>";
		accordionHtml += "							<div class='textGRaphTop'>"+addCommas(data['dual_chart']['data']['forecast'])+"</div>";
		accordionHtml += "						</div>";
		accordionHtml += "						<div class='graphLTop'>";
		accordionHtml += "							<div class='textGRaphTop'>Actual</div>";
		accordionHtml += "							<div class='textGRaphTop'>"+addCommas(data['dual_chart']['data']['actual_value'])+"</div>";
		accordionHtml += "						</div>";
		accordionHtml += "						<br style='clear: both'>";
		accordionHtml += "					</div>";
		accordionHtml += "					<div>";
		accordionHtml += "						<div id='chartOrgGauge-"+(type == "org" ? data['org_id'] : data['emp_id'] )+"'></div>";
		accordionHtml += "					</div>";
		accordionHtml += "				</div>";	
		accordionHtml += "				</div>";
		accordionHtml += "				<div class='span8' style='overflow: auto'>";
		//accordionHtml += "					<div class='graphLTopHeader' style='margin-bottom: 3px;'>KPI: "+data['item_name']+"</div>";
		accordionHtml += "					<div id='chartOrgBar-"+(type == "org" ? data['org_id'] : data['emp_id'] )+"' style='min-width:500px;'></div>";
		accordionHtml += "				</div>";
		accordionHtml += "			</div>";
		//#End Body Accordion
		accordionHtml += "		</div>";	
		accordionHtml += "</div>";

		return accordionHtml;
		//$("#accordion").append(accordionHtml);
		
}
 var generateChartGaugeFn = function(data,type){
	 var color = [];
	 $.each(data['dual_chart']['color_range'],function(index,indexEntry){
		 color.push({
			 "minValue":indexEntry['min_val'],
			 "maxValue":indexEntry['max_val'],
			 "code": "#"+indexEntry['color']
		 	});
	 });
		    var cSatScoreChart = new FusionCharts({
		        type: 'angulargauge',
		        dataLoadStartMessage: "Loading chart. Please wait",
			    baseChartMessageFont: "Arial",
			    baseChartMessageFontSize: "18",
			    baseChartMessageColor: "#993300",
		        renderAt:  "chartOrgGauge-"+(type == "org" ? data['org_id'] : data['emp_id'] ),
		        width: '100%',
		        height: '200',
		        dataFormat: 'json',
		        dataSource: {
		            "chart": {
		                 "baseFontSize":"11",
		                 "captionFontSize":"14",
		                 //"lowerLimit": "0",
		                 //"upperLimit": "120000",
		                 "gaugeFillMix": "{dark-30},{light-60},{dark-10}",
		                 "gaugeFillRatio": "15",
		                 "majorTMNumber": "4",
		                 "majorTMColor": "#333",
		                 "majorTMAlpha": "100",
		                 "majorTMHeight": "15",
		                 "majorTMThickness": "2",  
		                 "showValue": "1",
		                 "theme": "fint",
		                 "exportEnabled" :"0",
		                 "valueBelowPivot": "1",
		                 "bgColor": "#ffffff",
		                 "chartTopMargin":"0",
		                 "chartRightMargin":"0",
		                 "chartLeftMargin":"0",
		            },
		            "colorRange": {
		                "color": color
		            },
		            "dials": {
		                "dial": [{
		                    "value": (data['dual_chart']['data']['actual_value']/data['dual_chart']['data']['target'])*100
		                }]
		            },
		            "trendpoints": {
		                "point": [
		                    {
		                        "thickness": "3.5",
		                        "radius": "152",
		                        "innerRadius": "78",
		                        "alpha": "100"
		                    }
		                ]    
		            }
		        }
		}).render(); 
		
		
	 return false;
 };
 
 var generateChartBulletFn = function(id,data,color){
	    var revBulletChart = new FusionCharts({
	        type: 'hbullet',
	        renderAt: id,
	        width: '270',
	        height: '30',
	        dataFormat: 'json',
	        dataSource: {
	            "chart": {
	                "theme": "fint",
	                "lowerLimit": "1",
	                //"showPlotBorder":"1",
	                //"plotBorderColor":"#dedede",
	                "plotBorderThickness":"1",
	                //"plotFillColor": "#5b0101",
	                //"plotFillAlpha": "90",
	                "targetThickness": "4",
	                "targetColor": "#5b0101",
	                "showTickMarks":"0",
	                "showTickValues":"0",
	                "showValue":"0",
	                "chartBottomMargin": "0",
	                "chartTopMargin": "0",
	                "chartLeftMargin": "0",
	                "chartRightMargin": "0",
	                "gaugeFillMix": "{dark-30},{light-60},{dark-10}"
	            },
	            "colorRange": {
	                "color": color
	            },
	            "value": data,
	            "target": "100"
	        }
	    })
	    .render();
		
	 return false;
 };
 var generateChartBulletSparkFn = function(data){ 
	 $('.sparkline').sparkline('html', {
		 	type: 'bullet',
		 	width:'170',
		 	height: '20',
		 	targetWidth: '4',
		    targetColor: '#fefefe',
		    performanceColor: '#ee9c57',
		    rangeColors: data[0]['rangeColor']
		 } );
 };
 var generateChartBarFn = function(data,type){
	 var actual = [] ;
	 $.each(data['bar_chart']['data']['actual'],function(index,indexEntry){
		 actual.push({
			 "label":indexEntry['month'],
			 "value":indexEntry['value']
		 	});
	 });
	 
		    var revenueChart1 = new FusionCharts({
		        type: 'column2d',
		        dataLoadStartMessage: "Loading chart. Please wait",
			    baseChartMessageFont: "Arial",
			    baseChartMessageFontSize: "18",
			    baseChartMessageColor: "#993300",
		        renderAt: "chartOrgBar-"+(type == "org" ? data['org_id'] : data['emp_id'] ),
		        width: '100%',
		        height: '255',
		        dataFormat: 'json',
		        dataSource: {
		            "chart": {
		               // "caption": "Monthly revenue for last year",
		               //"subCaption": "Harry's SuperMart",
		                "xAxisName": "Month",
		                "yAxisName": "YTD Actual",
		                "xAxisNameFont": "Arial",
		                "xAxisNameFontSize": "14",
		                "xAxisNameFontColor": "#993300",
		                "xAxisNameFontBold": "1",
		                //"xAxisNameFontItalic": "1",
		                "xAxisNameAlpha": "80",
		                "yAxisNameFont": "Arial",
		                "yAxisNameFontSize": "14",
		                "yAxisNameFontColor": "#993300",
		                "yAxisNameFontBold": "1",
		                //"yAxisNameFontItalic": "1",
		                "yAxisNameAlpha": "80",
		                //"yAxisMaxValue": (data['bar_chart']['max_value'] <= 4 ? "5" : data['bar_chart']['max_value']*(1.05)),
		                //"numberPrefix": "$",
		                "showBorder": "0",
		                "paletteColors": "#"+tokenID.theme_color,
		                "bgColor": "#ffffff",
		                "borderAlpha": "20",
		                "canvasBorderAlpha": "0",
		                "usePlotGradientColor": "0",
		                "plotBorderAlpha": "10",
		                "placevaluesInside": "1",
		                "rotatevalues": "1",
		                "valueFontColor": "#ffffff",                
		                "showXAxisLine": "1",
		                "showValues":"0",
		                "placevaluesinside": "1",
		                "xAxisLineColor": "#999999",
		                "divlineColor": "#999999",               
		                "divLineIsDashed": "1",
		                "showAlternateHGridColor": "0",
		                "subcaptionFontBold": "0",
		                "exportEnabled" :"0",
		                "subcaptionFontSize": "14",
		                "useRoundEdges":"1",
	                    "theme" : "fint"
		            },            
		            "data": actual,
		            "trendlines": [
		                {
		                    "line": [
		                        {
		                            "startvalue": data['bar_chart']['data']['target'],
		                            "color": "#1aaf5d",
		                            "valueOnRight": "1",
		                            "displayvalue": "Target"
		                        },{
		                            "startvalue": data['bar_chart']['data']['forecast'],
		                            "color": "#DC143C",
		                            "valueOnRight": "1",
		                            "displayvalue": "Forecast"
		                        }
		                    ]
		                }
		            ],
		            "annotations": data['annotations']
		        },

            
		        "events": {
		            "annotationclick" : function(ev, props) {
		              
		            	$("#param_item_result_id").val("");
	                 	$("#param_item_result_id").val(props.groupId.split("-")[0]);
	                 	//$("#param_link").val("email");
            			$("form#linkParam").attr("action","http://"+window.location.host+"/web/guest/kpi-result");
            			$("form#linkParam").submit();
            		  return false;
		             
		    		}    
		        }
		    }).render();
		    
	 return false;
 };
 var generateChartBarLineAreaFn = function(data,type){	
	 var salesAnlysisChart = new FusionCharts({
	        type: 'mscombi2d',
	        renderAt: 'chart-container',
	        dataLoadStartMessage: "Loading chart. Please wait",
		    baseChartMessageFont: "Arial",
		    baseChartMessageFontSize: "18",
		    baseChartMessageColor: "#993300",
	        width: '100%',
	        height: '255',
	        renderAt: "chartOrgBar-"+(type == "org" ? data['org_id'] : data['emp_id'] ),
	        dataFormat: 'json',
	        dataSource: {
	            "chart": {
	            	"xAxisname": "Month",
	                "yAxisName": "Monthly Actual",
	                "xAxisNameFont": "Arial",
	                "xAxisNameFontSize": "14",
	                "xAxisNameFontColor": "#993300",
	                "xAxisNameFontBold": "1",
	                "xAxisNameFontItalic": "1",
	                "xAxisNameAlpha": "80",
	                "yAxisNameFont": "Arial",
	                "yAxisNameFontSize": "14",
	                "yAxisNameFontColor": "#993300",
	                "yAxisNameFontBold": "1",
	                "yAxisNameFontItalic": "1",
	                "yAxisNameAlpha": "80",
	                
	                //"numberPrefix": "$",
	               	//"sNumberSuffix" : "%",
	                //"sYAxisMaxValue" : "50",
					"showValues": "0",
					//Cosmetics
					"paletteColors": "#"+tokenID.theme_color+",#1aaf5d,#f2c500",
	                "baseFontColor" : "#333333",
	                //"baseFont" : "Helvetica Neue,Arial",
	                //"captionFontSize" : "14",
	                //"subcaptionFontSize" : "14",
	                //"subcaptionFontBold" : "0",
	                "showBorder" : "0",
	                "bgColor" : "#ffffff",
	                "showShadow" : "0",
	                "canvasBgColor" : "#ffffff",
	                "canvasBorderAlpha" : "0",
	                "divlineAlpha" : "100",
	                "divlineColor" : "#999999",
	                "divlineThickness" : "1",
	                "divLineIsDashed" : "1",
	                "divLineDashLen" : "1",
	                "divLineGapLen" : "1",
	                "usePlotGradientColor" : "0",
	                "showplotborder" : "0",
	                "showXAxisLine" : "1",
	                "xAxisLineThickness" : "1",
	                "xAxisLineColor" : "#999999",
	                "showAlternateHGridColor" : "0",
	                "showAlternateVGridColor" : "0",
	                "toolTipColor": "#ffffff",
	                "toolTipBorderThickness": "0",
	                "toolTipBgColor": "#000000",
	                "toolTipBgAlpha": "80",
	                "toolTipBorderRadius": "4",
	                "toolTipPadding": "10",
	                "legendBgAlpha" : "0",
	                "legendBorderAlpha" : "0",
	                "legendShadow" : "0",
	                "legendItemFontSize" : "10",
	                "legendItemFontColor" : "#666666",
	                "useRoundEdges":"1",
	                "chartRightMargin":"0",
	                //"caption": "Harry's SuperMart",
	                //"subCaption": "Sales analysis of last year",
	            	/*
	                "xAxisname": "Month",
	                "yAxisName": "Monthly Actual",
	                "xAxisNameFont": "Arial",
	                "xAxisNameFontSize": "14",
	                "xAxisNameFontColor": "#993300",
	                "xAxisNameFontBold": "1",
	                "xAxisNameFontItalic": "1",
	                "xAxisNameAlpha": "80",
	                "yAxisNameFont": "Arial",
	                "yAxisNameFontSize": "14",
	                "yAxisNameFontColor": "#993300",
	                "yAxisNameFontBold": "1",
	                "yAxisNameFontItalic": "1",
	                "yAxisNameAlpha": "80",
	                //"numberPrefix": "$",
	                "showBorder": "0",
	                "showValues": "0",
	                "paletteColors": "#FF850D",
	                "paletteColors": "#"+tokenID.theme_color+",#1aaf5d,#f2c500",
	                "bgColor": "#ffffff",
	                "showCanvasBorder": "0",
	                "canvasBgColor": "#ffffff",
	                "captionFontSize": "14",
	                "subcaptionFontSize": "14",
	                "subcaptionFontBold": "0",
	                "divlineColor": "#999999",
	                "divLineIsDashed": "1",
	                "divLineDashLen": "1",
	                "divLineGapLen": "1",
	                "showAlternateHGridColor": "0",
	                "usePlotGradientColor": "0",
	                "toolTipColor": "#ffffff",
	                "toolTipBorderThickness": "0",
	                "toolTipBgColor": "#000000",
	                "toolTipBgAlpha": "80",
	                "toolTipBorderRadius": "4",
	                "toolTipPadding": "10",
	                "legendBgColor": "#ffffff",
	                "legendBorderAlpha": '0',
	                "legendShadow": '0',
	                "legendItemFontSize": '10',
	                "legendItemFontColor": '#666666',
	                "useRoundEdges":"1"*/
	            },
	            "categories": data['categories'],
	            "dataset": data['dataset'],
	            "annotations": data['annotations'],
	            
	        },

            
	        "events": {
	            "annotationclick" : function(ev, props) {
	              
	            	$("#param_item_result_id").val("");
                 	$("#param_item_result_id").val(props.groupId.split("-")[0]);
                 	//$("#param_link").val("email");
        			$("form#linkParam").attr("action","http://"+window.location.host+"/web/guest/kpi-result");
        			$("form#linkParam").submit();
        		  return false;
	             
	    		}    
	        }
	    }).render();
	 return false;
 };
 var generateChartBarLineDualFn = function(data,type){	
	 
	 var salesAnlysisChart = new FusionCharts({//scrollcombidy2d mscombidy2d
	        type: (data['is_show_variance'] == "1" ? "mscombidy2d":"mscombi2d"),
	        renderAt: 'chart-container',
	        dataLoadStartMessage: "Loading chart. Please wait",
		    baseChartMessageFont: "Arial",
		    baseChartMessageFontSize: "18",
		    baseChartMessageColor: "#993300",
	        width: '100%',
	        height: '255',
	        renderAt: "chartOrgBar-"+(type == "org" ? data['org_id'] : data['emp_id'] ),
	        dataFormat: 'json',
	        dataSource: {
	            "chart": {
	            	"xAxisname": "Month",
	                "yAxisName": "Monthly Actual",
	                "xAxisNameFont": "Arial",
	                "xAxisNameFontSize": "14",
	                "xAxisNameFontColor": "#993300",
	                "xAxisNameFontBold": "1",
	                "xAxisNameFontItalic": "1",
	                "xAxisNameAlpha": "80",
	                "yAxisNameFont": "Arial",
	                "yAxisNameFontSize": "14",
	                "yAxisNameFontColor": "#993300",
	                "yAxisNameFontBold": "1",
	                "yAxisNameFontItalic": "1",
	                "yAxisNameAlpha": "80",
	                "sYAxisName": "Variance",
	                //Font properties for secondary y-axis
                	"sYAxisNameFont": "Arial",
                	"sYAxisNameFontSize": "14",
                	"sYAxisNameFontColor": "#993300",
                	"sYAxisNameFontBold": "1",
                	"sYAxisNameFontItalic": "1",
                	"sYAxisNameAlpha": "80",
	                //"numberPrefix": "$",
	               	//"sNumberSuffix" : "%",
	                //"sYAxisMaxValue" : "50",
					"showValues": "0",
					//Cosmetics
					"paletteColors": "#"+tokenID.theme_color+",#613CAA",//,#1aaf5d
	                "baseFontColor" : "#333333",
	                //"baseFont" : "Helvetica Neue,Arial",
	                //"captionFontSize" : "14",
	                //"subcaptionFontSize" : "14",
	                //"subcaptionFontBold" : "0",
	                "showBorder" : "0",
	                "bgColor" : "#ffffff",
	                "showShadow" : "0",
	                "canvasBgColor" : "#ffffff",
	                "canvasBorderAlpha" : "0",
	                "divlineAlpha" : "100",
	                "divlineColor" : "#999999",
	                "divlineThickness" : "1",
	                "divLineIsDashed" : "1",
	                "divLineDashLen" : "1",
	                "divLineGapLen" : "1",
	                "usePlotGradientColor" : "0",
	                "showplotborder" : "0",
	                "showXAxisLine" : "1",
	                "xAxisLineThickness" : "1",
	                "xAxisLineColor" : "#999999",
	                "showAlternateHGridColor" : "0",
	                "showAlternateVGridColor" : "0",
	                "toolTipColor": "#ffffff",
	                "toolTipBorderThickness": "0",
	                "toolTipBgColor": "#000000",
	                "toolTipBgAlpha": "80",
	                "toolTipBorderRadius": "4",
	                "toolTipPadding": "10",
	                "legendBgAlpha" : "0",
	                "legendBorderAlpha" : "0",
	                "legendShadow" : "0",
	                "legendItemFontSize" : "10",
	                "legendItemFontColor" : "#666666",
	                "useRoundEdges":"1",
	                "anchorRadius": "4",
					"anchorBorderThickness": "2",
					"anchorBgColor": "#FCFDFC",
					"chartRightMargin":(data['is_show_variance'] == "1" ? "-35" :"0"),
					//"anchorBorderColor": "#127fcb",
					//"anchorSides": "6",
					"scrollheight": "4",
					//"numVisiblePlot": "6",
					"flatScrollBars": "1",
					"scrollPadding":"10",
					
	            },
	            "categories": data['bar_chart']['categories'],
	            "dataset": data['bar_chart']['dataset'],
	            "trendlines": data['bar_chart']['trendlines'],
	            "annotations": data['annotations']
	        },

            
	        "events": {
	            "annotationclick" : function(ev, props) {
	              
	            	$("#param_item_result_id").val("");
                 	$("#param_item_result_id").val(props.groupId.split("-")[0]);
                 	//$("#param_link").val("email");
        			$("form#linkParam").attr("action","http://"+window.location.host+"/web/guest/kpi-result");
        			$("form#linkParam").submit();
        		  return false;
	             
	    		}    
	        }
	    }).render();
	 return false;
 };
var generateSubTableKPIFn = function(item,data){
	var ContentHTML = "";
	
	ContentHTML+="<table class='tableInside table-striped'>";
	ContentHTML+="	<thead>";
	ContentHTML+="		<tr>";
	ContentHTML+="			<th><div class='fontBold ' style='width:100px'>Target</div></th>";
	ContentHTML+="			<th><div class='fontBold ' style='width:100px'>Forecast</div></th>";
	ContentHTML+="			<th><div class='fontBold ' style='width:100px'>Actual</div></th>";
	ContentHTML+="		</tr>";
	ContentHTML+="	</thead>";
	ContentHTML+="	<tbody>";
	ContentHTML+="		<tr>";
	ContentHTML+="			<td>"+data['target']+"</td>";
	ContentHTML+="			<td>"+data['forecast']+"</td>";
	ContentHTML+="			<td>"+data['actual']+"</td>";
	ContentHTML+="		</tr>";
	ContentHTML+="		<tr>";
	ContentHTML+="			<td>%Target</td>";
	ContentHTML+="			<td colspan='2'><div id='perTarget-Item-"+item+"-Org-"+data['org_code']+"' class='sparkline'></div></td>";
	ContentHTML+="		</tr>";
	ContentHTML+="		<tr>";
	ContentHTML+="			<td>%Forecast</td>";
	ContentHTML+="			<td colspan='2'><div id='perForecast-Item-"+item+"-Org-"+data['org_code']+"' class='sparkline'></div></td>";
	ContentHTML+="		</tr>";
	ContentHTML+="	</tbody>";
	ContentHTML+="</table'>";
	//console.log(ContentHTML);
	return ContentHTML;
/* ### Ex.return ###
					<!-- table start -->
					<table class='tableInside table-striped'>
						<thead>
							<tr>
								<th><div class='fontBold '>Target</div></th>
								<th><div class='fontBold '>Forecast</div></th>
								<th><div class='fontBold '>Actual</div></th>
							</tr>
							
						</thead>
						<tbody>
							<tr>
								<td>4</td>
								<td>3.5</td>
								<td>3</td>
							</tr>
							<tr>
								<td>%Target</td>
								<td colspan='2'><div class='sparkline'></div></td>
								
							</tr>
							<tr>
								<td>%Forecast</td>
								<td colspan='2'><div class='sparkline'></div></td>
								
							</tr>
						</tbody>
					</table>
					<!-- table end -->
 */	
	
	
	
};
 var getDataFn = function(page,rpp){
		var year= $("#param_year").val();
		var period= $("#param_period").val();
		var app_type= $("#param_app_type").val();
		var emp= $("#param_emp").val();
		//var position= $("#param_position").val();
		var app_lv= $("#param_app_lv").val();
		var org= $("#param_org_id").val();
		var kpi= $("#param_kpi_id").val();

		$.ajax({
			url : restfulURL+"/see_api/public/dashboard/performance_trend",
			type : "get",
			dataType : "json",
			data:{
				"year_id":year,
				"period_id":period,
				"appraisal_type_id":app_type,
				"emp_id":emp,
				//"position_id":position,
				"level_id":app_lv,
				"org_id":org,
				"item_id":kpi		
			},
			headers:{Authorization:"Bearer "+tokenID.token},
			async:false,// w8 data 
			success : function(data) {
				galbalDashboard=data;
				listDashBoardFn(data);
				
			}
		});	
};

var getOrgFn = function(data){
	galbalDataTemp['galbalOrg'] = [];
	  if(data[0]['org']!=undefined){
	   $.each(data[0]['org'],function(index,indexEntry){
		   
		galbalDataTemp['galbalOrg'].push({"org_id":indexEntry['org_id'],"org_name":indexEntry['org']});
	    //console.log(indexEntry['org']);
	   });
	   
	   listHeaderFn(galbalDataTemp['galbalOrg']);
	  }
	  
};

var getDataKPIFn = function(page,rpp){
	var year= $("#param_year").val();
	var period= $("#param_period").val();
	var app_type= $("#param_app_type").val();
	var emp= $("#param_emp").val();
	//var position= $("#param_position").val();
	var app_lv= $("#param_app_lv").val();
	var org= $("#param_org_id").val();
	var kpi= $("#param_kpi_id").val();

	$.ajax({
		url : restfulURL+"/see_api/public/dashboard/all_content",
		type : "post",
		dataType : "json",
		data:{
			"year_id":year,
			"period_id":period,
			"appraisal_type_id":app_type,
			"emp_id":emp,
			//"position_id":position,
			"level_id":app_lv,
			"org_id":org,
			"item_id":kpi		
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,// w8 data 
		success : function(data) {
			
			galbalDataTemp['All_KPI']=data;
			getOrgFn(data);
			listDashBoardAllKPIFn(data);
			$("#ModalKPI").modal('show');
			$("#scrollOrg *").scrollTop(0).scrollLeft(0);
			$('#subTableKPI1 , #subTableKPI2').css('margin-top', "0");
			$("#subTableKPI1").html($("#tableAllKPI1 > thead").clone()).show();
			$("#subTableKPI2").html($("#tableAllKPI2 > thead").clone()).show(); 
			
			$("#scrollOrg *").unbind( "mouseenter , mouseleave, scroll" );
			$( "#scrollSubOrg1" ).bind({
			  mouseenter: function() {
			   
			    //console.log("in");
			    $("#scrollSubOrg3").unbind( "scroll" );
			    $("#scrollSubOrg2").bind("scroll", function() {
			            
								    var offset = $(this).scrollTop();
								    //console.log(offset);
								    $('#scrollSubOrg3').scrollTop(offset);
							        $('#subTableKPI1').css('margin-top', offset);
							        $('#subTableKPI2').css('margin-top', offset);

								});
			    
			    
			  },
			  mouseleave: function() {
			    $("#scrollSubOrg2").unbind("scroll");
			    //console.log("out");
			    $("#scrollSubOrg3").bind("scroll", function() {
			             //$("#scrollSubOrg2").unbind( "scroll" );
								    var offset = $(this).scrollTop();
			         
								    $('#scrollSubOrg2').scrollTop(offset);
							        $('#subTableKPI1').css('margin-top', offset);
							        $('#subTableKPI2').css('margin-top', offset);

								});
			  }
			});
			//"touchmove"
			//"touchend"
			/*
			 $('#scrollSubOrg3').bind('touchmove', function(e) { 
				console.log($(this).scrollTop()); // Replace this with your code.
				});	 
			  
			 */

			$("#scrollSubOrg3").bind("scroll", function() {
								    var offset = $(this).scrollTop();
			         
								    $('#scrollSubOrg2').scrollTop(offset);
							        $('#subTableKPI1').css('margin-top', offset);
							        $('#subTableKPI2').css('margin-top', offset);

								});
			
			setTimeout(function(){ 
				
				generateChartBulletSparkFn(data);
				//$('.sparkline').show();
				$("body").mLoading('hide');
			}, 2000);
			
		}
	});	
};

 
 var searchAdvanceFn = function (year,period,app_lv,org,kpi,app_type,emp,position) {
	//embed parameter start
		
		var htmlParam="";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_year' 	name='param_year' 		value='"+year+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_period' 	name='param_period' 	value='"+period+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_app_type' name='param_app_type' 	value='"+app_type+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_emp' 		name='param_emp' 		value='"+emp+"'>";
		//htmlParam+="<input type='hidden' class='paramEmbed' id='param_position' name='param_position' 	value='"+position+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_app_lv' 	name='param_app_lv' 	value='"+app_lv+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_org_id' 	name='param_org_id' 	value='"+org+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_kpi_id' 	name='param_kpi_id' 	value='"+kpi+"'>";
		$(".paramEmbed").remove();
		$("body").append(htmlParam);
		//embed parameter end
		getDataFn();
};
 
var listHeaderFn=function(galbalOrg){
	 var htmlHeader1 = "";
	 var htmlHeader2 = "";
	 var htmlHeaderMain = "";
	 var htmlHeaderSummary1 = "";
	 var htmlHeaderSummary2 = "";
	 var org= ($("#param_emp").val() == "" ? $("#param_org_id").val() :$("#param_emp").val());
	 htmlHeader1+="<th style='width:120px;'>";
	 htmlHeader1+="<div class='fontBold '> Perspective</div>";
	 htmlHeader1+="</th>";
	 
	 htmlHeader1+="<th style='width:237px;'>";
	 htmlHeader1+="<div class='fontBold '>KPI</div>";
	 htmlHeader1+="</th>";
	 
	 htmlHeader1+="<th style='width:60px;'>";
	 htmlHeader1+="<div class='fontBold '>UOM</div>";
	 htmlHeader1+="</th>";
	 
	 $.each(galbalOrg,function(index,indexEntry){
	  //console.log(indexEntry);
	  if(indexEntry['org_id']==org){
	   htmlHeaderMain+="<th style='min-width:325px;'>";
	    htmlHeaderMain+="<div class='fontBold fontCenter'>"+indexEntry['org_name']+"</div>";
	   htmlHeaderMain+="</th>";
	  }else{
	   htmlHeader2+="<th style='min-width:325px;'>";
	    htmlHeader2+="<div class='fontBold fontCenter'>"+indexEntry['org_name']+"</div>";
	   htmlHeader2+="</th>";
	  }
	 });
	 htmlHeaderSummary1+=htmlHeader1;
	 htmlHeaderSummary1+=htmlHeaderMain;
	 htmlHeaderSummary2+=htmlHeader2;
	 $("#listHeader1").html(htmlHeaderSummary1);
	 $("#listHeader2").html(htmlHeaderSummary2);
	 
	 
};

var listDashBoardFn = function(data){
	 
	 $("#accordion").empty();
	 $("#accordion").hide();
	 var org= $("#param_org_id").val();
	 var emp= $("#param_emp").val();
	 var html = "";
	 if(emp == ""){
		 $.each(data , function(inedx,indexEntry){
			 if(org == indexEntry['org_id'] ){
				 html+=generateAccordionHTML(indexEntry,"group1","org");
				 return false;
			 };
			 
		 });
		 $.each(data , function(inedx,indexEntry){
			 if(org != indexEntry['org_id']){
				 html+=generateAccordionHTML(indexEntry,"","org");
			 };
		 });
	 }else{
		 $.each(data , function(inedx,indexEntry){
			 if(emp == indexEntry['emp_id'] ){
				 html+=generateAccordionHTML(indexEntry,"group1","emp");
				 return false;
			 };
			 
		 });
		 $.each(data , function(inedx,indexEntry){
			 if(emp != indexEntry['emp_id']){
				 html+=generateAccordionHTML(indexEntry,"emp");
			 };
		 }); 
	 }
	 
	 $("#accordion").html(html);
	 
	 
	 $.each(data , function(inedx,indexEntry){
//		 generateChartGaugeFn(indexEntry);
//		 generateChartBarFn(indexEntry);
		 $.when(
				 generateChartGaugeFn(indexEntry,(emp == "" ? "org" :"emp")),
				 indexEntry['chart_type'] == "yearly" ? 
						 generateChartBarLineDualFn(indexEntry,(emp == "" ? "org" :"emp")) : 
						 generateChartBarLineAreaFn(indexEntry,(emp == "" ? "org" :"emp"))
				).then(function() {
				    //console.log(inedx+" Loading Chart: Success");
		});
	 });
	 

		// Add minus icon for collapse element which is open by default
	    $(".collapse.in").each(function(){
	    	$(this).siblings(".panel-heading").find(".fa").addClass("fa-caret-down").removeClass("fa-caret-right");
	    });
	    
	    // Toggle plus minus icon on show hide of collapse element
	    $(".collapse").on('show.bs.collapse', function(){
	    	$(this).prev().css({"background": "#"+tokenID.theme_color});
	    	$(this).parent().css({"border-color": "#"+tokenID.theme_color});
	    	$(this).parent().find(".fa").removeClass("fa-caret-right").addClass("fa-caret-down");
	    	$("#btn_kpi").find(".fa").removeClass("fa-caret-down").addClass("fa-table");
	    }).on('hide.bs.collapse', function(){
	    	$(this).parent().css({"border-color": "#c5c5c5"});
	    	$(this).prev().css({"background": "#f6f6f6"});
	    	$(this).parent().find(".fa").removeClass("fa-caret-down").addClass("fa-caret-right");
	    	$("#btn_kpi").find(".fa").removeClass("fa-caret-right").addClass("fa-table");
	    });


	    //Open Parent Org

			$("#next , #previous").off("click");
			$("#next , #previous").on("click",function() {
				  //console.log("Next KPI : "+$(this).attr("data-next"));
							galbalDataTemp['collapse_show'] = $(".collapse.in").get();///Memory Collapse Show
							
							$("#param_kpi_id").val($(this).attr("data-"+this.id));
							$("#kpi").val($(this).attr("data-"+this.id));
							//console.log($(this).attr("data-"+this.id));
							getDataFn();

				  			$("#accordion").show();
				  			$("#accordion").children().children().next().eq(0).collapse('show');
				  			$.each(galbalDataTemp['collapse_show'],function(index,indexEntry){
				  				$("#"+this.id).collapse('show');
				  			});
				  			return false;
				  
				});
			
			$("#btn_extract").off("click");
			$("#btn_extract").click(function(event){
				  event.stopPropagation();
				  if(galbalDataTemp['extract'] == true){
					  //console.log(galbalDataTemp['extract']);
				    $("#btn_extract").find(".fa").removeClass("fa-minus-square").addClass("fa-plus-square");
				    
				    $("#accordion").children().children().next().collapse('hide');
				    galbalDataTemp['extract'] = false;
				  }
				  else if(galbalDataTemp['extract'] == false){
					  //console.log(galbalDataTemp['extract']);
					  $("#btn_extract").find(".fa").removeClass("fa-plus-square").addClass("fa-minus-square");
					  $("#btn_kpi").find(".fa").removeClass("fa-plus-square").addClass("fa-table");
					    $("#accordion").children().children().next().collapse('show');
					    galbalDataTemp['extract'] = true;
				  }
				});
			$("#btn_kpi").off("click");
			$("#btn_kpi").click(function(event){
				  event.stopPropagation();
				  event.preventDefault();
				  $("#ModalKPI").modal('hide');
				  getDataKPIFn();
				  
				  $("body").mLoading();
//				  document.body.scrollTop = 0;
//				  document.documentElement.scrollTop = 0;
				  $('html, body').animate({
				        scrollTop: $("#ModalKPI").offset().top
				    }, 0);
				  

				  
				  //http://localhost/see_api/public/dashboard/all_content
				});
			$( "#accordion" ).sortable({
				 // revert: true
				 items: '.sortableItem:not(#orgParent)'
				});
			$('#accordion').disableSelection();
 };
var listDashBoardAllKPIFn = function(data){
	 var org= ($("#param_emp").val() == "" ? $("#param_org_id").val() :$("#param_emp").val());
	var htmlData1="";
	var htmlData3="";
	 $.each(data,function(index,indexEntry){
	  var htmlData2="";
	  htmlData1+="<tr>";
	  htmlData3+="<tr>";
	   htmlData1+="<td>"+indexEntry['perspective']+"</td>";//etl_dttm
	   htmlData1+="<td>"+indexEntry['item']+"<br><span class='LastUpdateText'>Last Updated: "+indexEntry['etl_dttm']+"</span></td>";
	   htmlData1+="<td>"+indexEntry['uom']+"</td>";
	   
	   //loop here..
	   $.each(indexEntry['org'],function(index2,indexEntry2){
	   
	   if(indexEntry2['org_id']==org){
	    
	    htmlData2+="<td>"; 
	    htmlData2+="<table class='tableInside table-striped'>";
	    htmlData2+="<thead>";
	    htmlData2+="<tr>";
	    htmlData2+="<th><div class='fontBold ' style='min-width:102px'>Target</div></th>";
	    htmlData2+="<th><div class='fontBold '  style='min-width:100px'>Forecast</div></th>";
	    htmlData2+="<th><div class='fontBold ' style='min-width:100px'>Actual</div></th>";
	      htmlData2+="</tr>";
	     htmlData2+="</thead>";
	     htmlData2+="<tbody>";
	      htmlData2+="<tr>";
	      htmlData2+="<td style='text-align:right;'>"+addCommas(notNullFn(indexEntry2['target']))+"</td>";
	      htmlData2+="<td style='text-align:right;'>"+addCommas(notNullFn(indexEntry2['forecast']))+"</td>";
	      htmlData2+="<td style='text-align:right;'>"+addCommas(notNullFn(indexEntry2['actual']))+"</td>";
	      htmlData2+="</tr>";
	      htmlData2+="<tr>";
	      htmlData2+="<td>%Target<span style='float:right'>"+notNullFn(indexEntry2['percent_target'])+"</span></td>";
	      htmlData2+="<td colspan='2'><div class='sparkline' id='perTarget"+index+"-Item-"+indexEntry['item_id']+"-Org-"+indexEntry2['org_code']+"'>"+indexEntry2['percent_target_str']+"</div></td>";
	      htmlData2+="</tr>";
	      htmlData2+="<tr>";
	      htmlData2+="<td>%Forecast<span style='float:right'>"+notNullFn(indexEntry2['percent_forecast'])+"</span></td>";
	      htmlData2+="<td colspan='2'><div class='sparkline' id='perForecast"+index+"-Item-"+indexEntry['item_id']+"-Org-"+indexEntry2['org_code']+"'>"+indexEntry2['percent_forecast_str']+"</div></td>";  
	      htmlData2+="</tr>";
	     htmlData2+="</tbody>";
	    htmlData2+="</table>";
	    htmlData2+="</td>";
	    
	   }else{
	    
	    
	    htmlData3+="<td>"; 
	    htmlData3+="<table class='tableInside table-striped'>";
	    htmlData3+="<thead>";
	     htmlData3+="<tr>";
	      htmlData3+="<th><div class='fontBold ' style='min-width:102px;'>Target</div></th>";
	      htmlData3+="<th><div class='fontBold ' style='min-width:100px;'>Forecast</div></th>";
	      htmlData3+="<th><div class='fontBold ' style='min-width:100px;'>Actual</div></th>";
	      htmlData3+="</tr>";
	    htmlData3+="</thead>";
	     htmlData3+="<tbody>";
	      htmlData3+="<tr>";
	      htmlData3+="<td style='text-align:right;'>"+addCommas(notNullFn(indexEntry2['target']))+"</td>";
	      htmlData3+="<td style='text-align:right;'>"+addCommas(notNullFn(indexEntry2['forecast']))+"</td>";
	      htmlData3+="<td style='text-align:right;'>"+addCommas(notNullFn(indexEntry2['actual']))+"</td>";
	      htmlData3+="</tr>";
	      htmlData3+="<tr>";
	       htmlData3+="<td>%Target<span style='float:right'>"+notNullFn(indexEntry2['percent_target'])+"</span></td>";
	       htmlData3+="<td colspan='2'><div class='sparkline' id='perTarget"+index+"-Item-"+indexEntry['item_id']+"-Org-"+indexEntry2['org_code']+"'>"+indexEntry2['percent_target_str']+"</div></td>";
	      htmlData3+="</tr>";
	      htmlData3+="<tr>";
	       htmlData3+="<td>%Forecast<span style='float:right'>"+notNullFn(indexEntry2['percent_forecast'])+"</span></td>";
	       htmlData3+="<td colspan='2'><div class='sparkline' id='perForecast"+index+"-Item-"+indexEntry['item_id']+"-Org-"+indexEntry2['org_code']+"'>"+indexEntry2['percent_forecast_str']+"</div></td>";   
	      htmlData3+="</tr>";
	      htmlData3+="</tbody>";
	    htmlData3+="</table>";
	    htmlData3+="</td>";
	    
	   }
	   
	   });
	   htmlData1+=htmlData2;
	   //htmlData1+=htmlData3;
	   //loop
	  htmlData1+="</tr>";
	  htmlData3+="</tr>";
	  
	  
	 });
	 
	 $("#listData1").html(htmlData1);
	 $("#listData2").html(htmlData3);
	 
	 //..loop chart
/*	 $.each(data,function(index,indexEntry){
		 $.each(indexEntry['org'],function(index2,indexEntry2){
			 generateChartBulletFn("perTarget"+index+"-Item-"+indexEntry['item_id']+"-Org-"+indexEntry2['org_code'],indexEntry2['percent_target'],indexEntry['color']);
			 generateChartBulletFn("perForecast"+index+"-Item-"+indexEntry['item_id']+"-Org-"+indexEntry2['org_code'],indexEntry2['percent_forecast'],indexEntry['color']);
		 });
	 });
*/	  
	 
};
 $(document).ready(function(){
	var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		 if(connectionServiceFn(username,password,plid)==false){
	 		return false;
	 	}
	 	$(".advance-search input").val("");
	 	
	 	$("#btnSearchAdvance").click(function(){
			if($("#app_type").val() == "2"){
				if($("#emp_name_id").val() ==""){
					callFlashSlide("Employee Name is Require !");
					return false;
				}
			}
			searchAdvanceFn(
					$("#year").val(),
					$("#period").val(),
					$("#apprasiaLevel").val(),
					$("#organization").val(),
					$("#kpi").val(),
					$("#app_type").val(),
					$("#emp_name_id").val()//,
					//$("#position_id").val()
					);
			$("#accordion").show();
			$("#accordion").children().children().next().eq(0).collapse('show');;
			return false;
		});
	 	
	 	
	 	//Generate DropDown List
	 	if($("#get_sending_status").val() == "true" && $("#get_sending_status").val() != null){
	 		$("#year").html(generateDropDownList(restfulURL+"/see_api/public/dashboard/year_list","GET"));
			$("#year").val($("#get_year_id").val());
			$("#period").html(generateDropDownList(restfulURL+"/see_api/public/dashboard/period_list","POST",{"appraisal_year":$("#year").val()}));
			$("#period").val($("#get_period_id").val());
			
			$("#app_type").html(generateDropDownList(restfulURL+"/see_api/public/appraisal_assignment/appraisal_type_list","GET"));
			$("#app_type").val($("#get_appraisal_type_id").val());
			
			$("#emp_name").val($("#get_emp_name").val());
			$("#emp_name_id").val($("#get_emp_id").val());
			
			$("#apprasiaLevel").html(generateDropDownList(restfulURL+"/see_api/public/appraisal/al_list","GET"));
			$("#apprasiaLevel").val($("#get_level_id").val());
			
			$("#organization").html(generateDropDownList(restfulURL+"/see_api/public/dashboard/org_list","POST",{"appraisal_level":$("#apprasiaLevel").val()}));
			$("#organization").val($("#get_org_id").val());

			$("#kpi").html((generateDropDownList(restfulURL+"/see_api/public/dashboard/kpi_list","POST",{"appraisal_level":$("#apprasiaLevel").val(),"org_id":$("#organization").val(),"emp_id":$("#emp_name_id").val(),"appraisal_type_id":$("#app_type").val()})));
			$("#kpi").val($("#get_item_id").val());
			if($("#app_type").val() == "2"){

				//$("#position").removeAttr('disabled');
				$("#emp_name").removeAttr('disabled');
				$("#apprasiaLevel , #organization").attr("disabled", 'disabled');
			}else if($("#app_type").val() == "1"){

				$("#emp_name").attr("disabled", 'disabled');
				$("#apprasiaLevel , #organization").removeAttr('disabled');
				$("#emp_name").val("");
				$("#emp_name_id").val("");
				
			}
	
			$("#btnSearchAdvance").click();
			$("#get_sending_status").val("false");
		}else{
			//Generate DropDown List
			$("#year").html(generateDropDownList(restfulURL+"/see_api/public/dashboard/year_list","GET"));
			$("#period").html(generateDropDownList(restfulURL+"/see_api/public/dashboard/period_list","POST",{"appraisal_year":$("#year").val()}));
			$("#app_type").html(generateDropDownList(restfulURL+"/see_api/public/appraisal_assignment/appraisal_type_list","GET"));
			$("#apprasiaLevel").html(generateDropDownList(restfulURL+"/see_api/public/appraisal/al_list","GET"));
			$("#organization").html(generateDropDownList(restfulURL+"/see_api/public/dashboard/org_list","POST",{"appraisal_level":$("#apprasiaLevel").val()}));
			$("#kpi").html((generateDropDownList(restfulURL+"/see_api/public/dashboard/kpi_list","POST",{"appraisal_level":$("#apprasiaLevel").val(),"org_id":$("#organization").val(),"emp_id":$("#emp_name_id").val(),"appraisal_type_id":$("#app_type").val()})));
			
			//#Change Param Function
			$("#year").change(function(){$("#period").html(generateDropDownList(restfulURL+"/see_api/public/dashboard/period_list","POST",{"appraisal_year":$("#year").val()}));});
			$("#apprasiaLevel").change(function(){$("#organization").html(generateDropDownList(restfulURL+"/see_api/public/dashboard/org_list","POST",{"appraisal_level":$("#apprasiaLevel").val()}));$("#organization").change();});
			$("#organization").change(function(){$("#kpi").html((generateDropDownList(restfulURL+"/see_api/public/dashboard/kpi_list","POST",{"appraisal_level":$("#apprasiaLevel").val(),"org_id":$("#organization").val(),"emp_id":$("#emp_name_id").val(),"appraisal_type_id":$("#app_type").val()})));});
			
			
		}
		
		$(".app_url_hidden").show();
		
		
		//Autocomplete Search Start
		//generateAutocomplete("#position",restfulURL+"/see_api/public/cds_result/auto_position_name","post",{"position_name":null});
		generateAutocomplete("#emp_name",restfulURL+"/see_api/public/cds_result/auto_emp_name","post",{"emp_name":null});
		
		//Autocomplete Search End
		
		$("#app_type").change(function(){
			console.log("app_type change");
			if($("#app_type").val() == "2"){

				//$("#position").removeAttr('disabled');
				$("#emp_name").removeAttr('disabled');
				$('#apprasiaLevel').val($('#apprasiaLevel option:first-child').val());
				$('#apprasiaLevel').change();

				$("#apprasiaLevel , #organization").attr("disabled", 'disabled');
			
			}else if($("#app_type").val() == "1"){
				//$("#position").attr("disabled", 'disabled');
				$("#emp_name").attr("disabled", 'disabled');
				$('#organization').change();
				$("#apprasiaLevel , #organization").removeAttr('disabled');
				//$("#position").val("");
				//$("#position_id").val("");
				$("#emp_name").val("");
				$("#emp_name_id").val("");
				
			}
		});
		//$("#app_type").change();
		

		//binding tooltip start
		 $('[data-toggle="tooltip"]').css({"cursor":"pointer"});
		 $('[data-toggle="tooltip"]').tooltip({
			 html:true
		 });
		//binding tooltip end
		 $(".lfr-hudcrumbs").removeClass("lfr-hudcrumbs");
		 
		 if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			    // is mobile..
			 //alert(navigator.userAgent);
			 $("#scrollSubOrg2").css({'max-height':500});
			 $("#scrollSubOrg1").css({'max-height':500});
			 $("#scrollSubOrg1").height(500);
			 $("#scrollSubOrg2").width(740);
			 
		 }
	 }
 });