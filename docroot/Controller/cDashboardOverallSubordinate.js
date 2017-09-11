 var restfulPathDashboard="/see_api/public/cds_result"; 
 var galbalDashboard=[];
 var galbalDataTemp = [];
 galbalDataTemp['galbalOrg'] = [];
 galbalDataTemp['extract'] = false;
 galbalDataTemp['All_KPI'] = {};
 galbalDataTemp['collapse_show']="";
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
	            galbalDataTemp[id] = ui.item.label;
	            galbalDataTemp[id+"_id"]=ui.item.value_id;
	            return false;
	        },change: function(e, ui) {  

	 
				if ($(id).val() == galbalDataTemp[id]) {
					$(id+"_id").val(galbalDataTemp[id+"_id"]);
				}  else if (ui.item != null){
					$(id+"_id").val(ui.item.value_id);
				}else {
					$(id+"_id").val("");
				}
	         }
	    });
 }
 
 var generateChartGaugeFn = function(data){
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
			    baseChartMessageColor: "#FC0000",
		        renderAt:  "chartOrgGauge-"+data['org_id'],
		        width: '100%',
		        height: '200',
		        dataFormat: 'json',
		        dataSource: {
		            "chart": {
		                 "baseFontSize":"11",
		                 "captionFontSize":"14",
		                 "lowerLimit": "0",
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
		                 "bgColor": "#ffffff",
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
		    targetColor: '#003f7f',
		    performanceColor: '#00007f',
		    rangeColors: data[0]['rangeColor']
		 } );
 };
 var generateChartBarFn = function(data){
	 var actual = [] ;
	 $.each(data['bar_chart']['data']['actual'],function(index,indexEntry){
		 actual.push({
			 "label":indexEntry['month'],
			 "value":indexEntry['value']
		 	});
	 });
	 
		    var revenueChart = new FusionCharts({
		        type: 'column2d',
		        dataLoadStartMessage: "Loading chart. Please wait",
			    baseChartMessageFont: "Arial",
			    baseChartMessageFontSize: "18",
			    baseChartMessageColor: "#FC0000",
		        renderAt: "chartOrgBar-"+data['org_id'],
		        width: '100%',
		        height: '250',
		        dataFormat: 'json',
		        dataSource: {
		            "chart": {
		               // "caption": "Monthly revenue for last year",
		               //"subCaption": "Harry's SuperMart",
		                "xAxisName": "Month",
		                "yAxisName": "YTD Actual",
		                //"numberPrefix": "$",
		                "showBorder": "0",
		                "paletteColors": "#0075c2",
		                "bgColor": "#ffffff",
		                "borderAlpha": "20",
		                "canvasBorderAlpha": "0",
		                "usePlotGradientColor": "0",
		                "plotBorderAlpha": "10",
		                "placevaluesInside": "1",
		                "rotatevalues": "1",
		                "valueFontColor": "#ffffff",                
		                "showXAxisLine": "1",
		                "xAxisLineColor": "#999999",
		                "divlineColor": "#999999",               
		                "divLineIsDashed": "1",
		                "showAlternateHGridColor": "0",
		                "subcaptionFontBold": "0",
		                "exportEnabled" :"0",
		                "subcaptionFontSize": "14"
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
		            ]
		        }
		    }).render();
		
	 return false;
 };
 var generateChartBarLineAreaFn = function(data){	
	 var salesAnlysisChart = new FusionCharts({
	        type: 'mscombi2d',
	        renderAt: 'chart-container',
	        width: '100%',
	        height: '250',
	        renderAt: "chartOrgBar-"+data['org_id'],
	        dataFormat: 'json',
	        dataSource: {
	            "chart": {
	                //"caption": "Harry's SuperMart",
	                //"subCaption": "Sales analysis of last year",
	                "xAxisname": "Month",
	                "yAxisName": "Monthly Actual",
	                //"numberPrefix": "$",
	                "showBorder": "0",
	                "showValues": "0",
	                "paletteColors": "#0075c2,#1aaf5d,#f2c500",
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
	                "legendItemFontColor": '#666666'
	            },
	            "categories": [
	                {
	                    "category": [
	                        {
	                            "label": "Jan"
	                        },
	                        {
	                            "label": "Feb"
	                        },
	                        {
	                            "label": "Mar"
	                        },
	                        {
	                            "label": "Apr"
	                        },
	                        {
	                            "label": "May"
	                        },
	                        {
	                            "label": "Jun"
	                        },
	                        {
	                            "label": "Jul"
	                        },
	                        {
	                            "label": "Aug"
	                        },
	                        {
	                            "label": "Sep"
	                        },
	                        {
	                            "label": "Oct"
	                        },
	                        {
	                            "label": "Nov"
	                        },
	                        {
	                            "label": "Dec"
	                        }
	                    ]
	                }
	            ],
	            "dataset": [
	                {
	                    "seriesName": "Actual",
	                    "showValues": "0",
	                    "data": [
	                        {
	                            "value": "16000"
	                        },
	                        {
	                            "value": "20000"
	                        },
	                        {
	                            "value": "18000"
	                        },
	                        {
	                            "value": "19000"
	                        },
	                        {
	                            "value": "15000"
	                        },
	                        {
	                            "value": "21000"
	                        },
	                        {
	                            "value": "16000"
	                        },
	                        {
	                            "value": "20000"
	                        },
	                        {
	                            "value": "17000"
	                        },
	                        {
	                            "value": "25000"
	                        },
	                        {
	                            "value": "19000"
	                        },
	                        {
	                            "value": "23000"
	                        }
	                    ]
	                },
	                {
	                    "seriesName": "Forecast",
	                    "renderAs": "line",
	                    "data": [
	                        {
	                            "value": "15000"
	                        },
	                        {
	                            "value": "16000"
	                        },
	                        {
	                            "value": "17000"
	                        },
	                        {
	                            "value": "18000"
	                        },
	                        {
	                            "value": "19000"
	                        },
	                        {
	                            "value": "19000"
	                        },
	                        {
	                            "value": "19000"
	                        },
	                        {
	                            "value": "19000"
	                        },
	                        {
	                            "value": "20000"
	                        },
	                        {
	                            "value": "21000"
	                        },
	                        {
	                            "value": "22000"
	                        },
	                        {
	                            "value": "23000"
	                        }
	                    ]
	                },
	                {
	                    "seriesName": "Taget",
	                    "renderAs": "area",
	                    "data": [
	                        {
	                            "value": "4000"
	                        },
	                        {
	                            "value": "5000"
	                        },
	                        {
	                            "value": "3000"
	                        },
	                        {
	                            "value": "4000"
	                        },
	                        {
	                            "value": "1000"
	                        },
	                        {
	                            "value": "7000"
	                        },
	                        {
	                            "value": "1000"
	                        },
	                        {
	                            "value": "4000"
	                        },
	                        {
	                            "value": "1000"
	                        },
	                        {
	                            "value": "8000"
	                        },
	                        {
	                            "value": "2000"
	                        },
	                        {
	                            "value": "7000"
	                        }
	                    ]
	                }
	            ]
	        }
	    }).render();
	 return false;
 };
 var generateChartBubbleFn = function(data){	
	 var analysisChart = new FusionCharts({
	        type: 'bubble',
	        renderAt: 'listBubbleChart',
	        width: '100%',
	        height: '400',
	        dataFormat: 'json',
	        dataSource: {
	            "chart": {
//	                "caption": "Sales Analysis of Shoe Brands",
//	                "subcaption": "Last Quarter",
	                "xAxisMinValue": "0",
	                "xAxisMaxValue": "100",
	                "yAxisMinValue": "0",
	                "yAxisMaxValue": "1000",
	                "xAxisNameFont": "Arial",
	                "xAxisNameFontSize": "16",
	                "xAxisNameFontColor": "#993300",
	                "xAxisNameFontBold": "1",
	                "xAxisNameFontItalic": "1",
	                "xAxisNameAlpha": "80",
	                "yAxisNameFont": "Arial",
	                "yAxisNameFontSize": "16",
	                "yAxisNameFontColor": "#993300",
	                "yAxisNameFontBold": "1",
	                "yAxisNameFontItalic": "1",
	                "yAxisNameAlpha": "80",
	                "plotFillAlpha": "70",
	                "plotFillHoverColor": "#6baa01",
	                "showPlotBorder": "0",
	                "xAxisName": "Target",
	                "yAxisName": "Actual",
	                "numDivlines": "2",
	                "showValues":"1",
	                "showTrendlineLabels": "0",
	                "chartLeftMargin": "35",
	                "chartRightMargin": "35",
	                //Dynamic tool-tips with HTML and macro variables
	                "plotTooltext": "<div id='nameDiv'>$name :</div>{br}Average Price : <b>$$xDataValue</b>{br}Units Sold : <b>$yDataValue</b>{br}Profit Contribution : <b>$zvalue%</b>",
	                "theme": "fint"
	            },
	            "dataset" : [ {
						"color" : "#00aee4",
						"data" : [ {
							"x" : "80",
							"y" : "15000",
							"z" : "24",
							"name" : "Nike"
						}, {
							"x" : "60",
							"y" : "18500",
							"z" : "26",
							"name" : "Adidas"
						}, {
							"x" : "50",
							"y" : "19450",
							"z" : "19",
							"name" : "Puma"
						} ]
					}, {
						"data" : [ {

							"x" : "32",
							"y" : "22000",
							"z" : "10",
							"name" : "Reebok"
						}, {
							"x" : "44",
							"y" : "13000",
							"z" : "9",
							"name" : "Woodland"
						} ]
					}, {
						"data" : [ {
							"x" : "65",
							"y" : "10500",
							"z" : "8",
							"name" : "Fila"
						}, {
							"x" : "43",
							"y" : "8750",
							"z" : "5",
							"name" : "Lotto"
						} ]
					} ]
	        }
	    }).render();
 };
 var getDataFn = function(page,rpp){
		var year= $("#param_year").val();
		var period= $("#param_period").val();
		var app_type= $("#param_app_type").val();
		var emp= $("#param_emp").val();
		var position= $("#param_position").val();
		var app_lv= $("#param_app_lv").val();
		var org= $("#param_org_id").val();
		var kpi= $("#param_kpi_id").val();

		$.ajax({
			url : restfulURL+"/see_api/public/dashboard/content",
			type : "post",
			dataType : "json",
			data:{
				"year_id":year,
				"period_id":period,
				"appraisal_type_id":app_type,
				"emp_id":emp,
				"position_id":position,
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

 
 var searchAdvanceFn = function (year,period,app_lv,org,kpi,app_type,emp,position) {
	//embed parameter start
		
		var htmlParam="";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_year' 	name='param_year' 		value='"+year+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_period' 	name='param_period' 	value='"+period+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_app_type' name='param_app_type' 	value='"+app_type+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_emp' 		name='param_emp' 		value='"+emp+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_position' name='param_position' 	value='"+position+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_app_lv' 	name='param_app_lv' 	value='"+app_lv+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_org_id' 	name='param_org_id' 	value='"+org+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_kpi_id' 	name='param_kpi_id' 	value='"+kpi+"'>";
		$(".paramEmbed").remove();
		$("body").append(htmlParam);
		//embed parameter end
		getDataFn();
};
 


var listDashBoardFn = function(data){
	 $("#txtTopic").html("01.Strong Financial - 01 จำนวนเงิน Gross NPL");
	 generateChartBubbleFn();
	 var html = "";
	 var kpi_id = galbalDataTemp["item_id"];
	 if (kpi_id[kpi_id.indexOf(parseInt($("#param_kpi_id").val())) - 1] != undefined ) {
		 html += "			<span id='previous' class='arrow' data-previous='"
				+ kpi_id[kpi_id.indexOf(parseInt($("#param_kpi_id").val())) - 1]
				+ "'></span>";
	 }
	 if (kpi_id[kpi_id.indexOf(parseInt($("#param_kpi_id").val())) + 1] != undefined) {
		 html += "			<span id='next' class='arrow' data-next='"
				+ kpi_id[kpi_id.indexOf(parseInt($("#param_kpi_id").val())) + 1]
				+ "'></span>";
	 }
	 $("#pager").html(html);
			$("#next").off("click");
			$("#next").on("click",function() {
				  			searchAdvanceFn(
									$("#param_year").val(),
									$("#param_period").val(),
									$("#param_app_lv").val(),
									$("#param_org_id").val(),
									$(this).attr("data-next"));
				  			
				  			return false;
				  
				});
			$("#previous").off("click");
			$("#previous").on("click",function() {
				  			searchAdvanceFn(
									$("#param_year").val(),
									$("#param_period").val(),
									$("#param_app_lv").val(),
									$("#param_org_id").val(),
									$(this).attr("data-previous"));
				  			return false;
				  	
				});
			
 };

 $(document).ready(function(){
	var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
	 	if(connectionServiceFn(username,password)==false){
	 		return false;
	 	}
	 	$(".advance-search input").val("");
	 	//Generate DropDown List
		$("#year").html(generateDropDownList(restfulURL+"/see_api/public/dashboard/year_list","GET"));
		$("#period").html(generateDropDownList(restfulURL+"/see_api/public/dashboard/period_list","POST",{"appraisal_year":$("#year").val()}));
		$("#app_type").html(generateDropDownList(restfulURL+"/see_api/public/appraisal_assignment/appraisal_type_list","GET"));
		$("#apprasiaLevel").html(generateDropDownList(restfulURL+"/see_api/public/appraisal/al_list","GET"));
		$("#organization").html(generateDropDownList(restfulURL+"/see_api/public/dashboard/org_list","POST",{"appraisal_level":$("#apprasiaLevel").val()}));
		$("#kpi").html((generateDropDownList(restfulURL+"/see_api/public/dashboard/kpi_list","POST",{"appraisal_level":$("#apprasiaLevel").val(),"org_id":$("#organization").val()})));
		
		//#Change Param Function
		$("#year").change(function(){$("#period").html(generateDropDownList(restfulURL+"/see_api/public/dashboard/period_list","POST",{"appraisal_year":$("#year").val()}));});
		$("#apprasiaLevel").change(function(){$("#organization").html(generateDropDownList(restfulURL+"/see_api/public/dashboard/org_list","POST",{"appraisal_level":$("#apprasiaLevel").val()}));$("#organization").change();});
		$("#organization").change(function(){$("#kpi").html((generateDropDownList(restfulURL+"/see_api/public/dashboard/kpi_list","POST",{"appraisal_level":$("#apprasiaLevel").val(),"org_id":$("#organization").val()})));});
		
		
		
		$("#btnSearchAdvance").click(function(){
			searchAdvanceFn(
					$("#year").val(),
					$("#period").val(),
					$("#apprasiaLevel").val(),
					$("#organization").val(),
					$("#kpi").val(),
					$("#app_type").val(),
					$("#emp_name_id").val(),
					$("#position_id").val());
			$("#listSubordinate").show();
			return false;
		});
		

		
		$(".app_url_hidden").show();
		
		
		//Autocomplete Search Start
		generateAutocomplete("#position",restfulURL+"/see_api/public/cds_result/auto_position_name","post",{"position_name":null});
		generateAutocomplete("#emp_name",restfulURL+"/see_api/public/cds_result/auto_emp_name","post",{"emp_name":null});
		//Autocomplete Search End
		
		$("#app_type").change(function(){
			if($("#app_type").val() == "1"){

				$("#position").removeAttr('disabled');
				$("#emp_name").removeAttr('disabled');
			}else if($("#app_type").val() == "2"){
				$("#position").attr("disabled", 'disabled');
				$("#emp_name").attr("disabled", 'disabled');
				$("#position").val("");
				$("#position_id").val("");
				$("#emp_name").val("");
				$("#emp_name_id").val("");
				
			}
		});
		$("#app_type").change();
		
		
		
		
		
		
		//binding tooltip start
		 $('[data-toggle="tooltip"]').css({"cursor":"pointer"});
		 $('[data-toggle="tooltip"]').tooltip({
			 html:true
		 });
		//binding tooltip end
		 $(".lfr-hudcrumbs").removeClass("lfr-hudcrumbs");
		 
		 
	 }
 });