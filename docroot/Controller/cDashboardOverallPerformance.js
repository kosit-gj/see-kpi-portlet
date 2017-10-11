 var restfulPathDashboard="/see_api/public/cds_result"; 
 var galbalDashboard=[];
 var galbalDataTemp = [];
 galbalDataTemp['galbalOrg'] = [];
 galbalDataTemp['extract'] = false;
 galbalDataTemp['All_KPI'] = [];
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
 

 var generateChartBubbleFn = function(data){	
	 var analysisChart = new FusionCharts({
	        type: 'bubble',
	        dataLoadStartMessage: "Loading chart. Please wait",
		    baseChartMessageFont: "Arial",
		    baseChartMessageFontSize: "16",
		    baseChartMessageColor: "#993300",
	        renderAt: 'listBubbleChart',
	        width: '100%',
	        height: '400',
	        dataFormat: 'json',
	        dataSource: {
	            "chart": {
	                //"caption": data['header'],
//	                "subcaption": "Last Quarter",
	                "captionFont": "Arial",
	                "captionFontSize": "18",
	                "captionFontBold": "1",
	                "basefontsize": "12",
	                "valueFontSize": "11",
	                "valueFontBold": "1",
	                "xAxisMinValue": "0",
	                //"xAxisMaxValue": "100",
	                "yAxisMinValue": "0",
	                //"yAxisMaxValue": "100",
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
	                "plotFillAlpha": "70",
	                "plotFillHoverColor": "",
	                "bubbleHoverAlpha": "35",
	                "xAxisName": "Urgency",
	                "yAxisName": "Impact",
	                "numDivlines": "2",
	                "showValues":"0",
	                "showPlotBorder":"1",
	                "showTrendlineLabels": "1",
	                "showYAxisValues":"0",
	                "numDivlines": "0",
	                "chartLeftMargin": "35",
	                "chartRightMargin": "35",
	                //Dynamic tool-tips with HTML and macro variables
	                "plotTooltext": "<div id='nameDiv'>$name</div>{br}Urgency : <b>$xDataValue</b>{br}Impact : <b>$yDataValue</b>{br}Achievement : <b>$zvalue%</b>",
	                
	                "theme": "fint"
	            },
	            "categories": data['categories'],
	            "dataset" 	: data['dataset'],
	            "trendlines" : data['trendlines']
	        },
	        "events": {
	            "dataplotclick" : function(ev, props) {
	            	var objDataset = ev.sender.getJSONData().dataset;
	            	console.log(objDataset);
	            	console.log(props.displayValue);
	            	var clickLabel = $("#nameDiv").text();
	            	$.each(objDataset,function(index,indexEntry){
	            		$.each(indexEntry['data'],function(index2,indexEntry2){
		            	  if(clickLabel == indexEntry2['name']){
//		            		  var year= $("#param_year").val();
//		            			var period= $("#param_period").val();
//		            			var app_type= $("#param_app_type").val();
//		            			var emp= $("#param_emp").val();
//		            			var position= $("#param_position").val();
//		            			var app_lv= $("#param_app_lv").val();
//		            			var org= $("#param_org_id").val();
//		            			var item= $("#param_item").val(indexEntry2['item_id']);
//		            			var paramLink =
//		            			"year_id="+year+
//		            			"&period_id="+period+
//		        				"&appraisal_type_id="+app_type+
//		        				"&emp_id="+emp+
//		        				"&position_id="+position+
//		        				"&level_id="+app_lv+
//		        				"&org_id="+org+
//		        				"&item_id="+item;
		            			$("#param_item").val(indexEntry2['item_id']);
		            			$("form#linkParam").attr("action","http://"+window.location.host+"/web/guest/subordinate-performance");
		            			$("form#linkParam").submit();
//		            			setTimeout(function(){
//		            				$("form#linkParam").attr("action","http://"+window.location.host+"/web/guest/performance-trend");
//			            			$("form#linkParam").submit();
//		            				}, 1000);
		            			
		            		  //getDataBubbleFn();
		            		  return false;
		            	  }
	            	 	});
		              });
	            }    
	        }
	    }).render();
	 
 };
 var generateChartPieFn = function(data){	
	 var topProductsChart = new FusionCharts({
	        type: 'multilevelpie',
	        dataLoadStartMessage: "Loading chart. Please wait",
		    baseChartMessageFont: "Arial",
		    baseChartMessageFontSize: "16",
		    baseChartMessageColor: "#993300",
	        renderAt: 'listPieChart',
	        width: '100%',
	        height: '385',
	        //id : "myChart",
	        dataFormat: 'json',
	        dataSource: {
	            "chart": {
	            	//"caption": data['header'],
	            	"captionFont": "Arial",
	                "captionFontSize": "18",
	                //"captionFontBold": "1",
	                "baseFontColor" : "#333333",
	                "baseFont" : "Helvetica Neue,Arial",   
	                "basefontsize": "12",
	                "valueFontSize": "11",
	                "valueFontBold": "1",
	                "subcaptionFontBold": "0",
	                "bgColor" : "#ffffff",
	                "canvasBgColor" : "#ffffff",
	                "showBorder" : "0",
	                "showShadow" : "0",
	                "showCanvasBorder": "0",
	                "showPlotBorder": "1",
	                "pieFillAlpha": "60",
	                "pieBorderThickness": "2",
	                "hoverFillColor": data['category'][0]['color'],
	                "hoverFillAlpha":"35",
	                "pieBorderColor": "#ffffff",
	                "useHoverColor": "1",
	                "showValuesInTooltip": "1",
	                "showPercentInTooltip": "0",
	                "numberPrefix": "$",
	                "plotTooltext": "$label",//, $value, $percentValue
	                "theme": "fint"
	            },
	            "category": data['category']
	        },
	        "events": {
	            "dataplotclick" : function(ev, props) {
	              var senderData = ev.sender.getJSONData()['category'];
	              var clickLabel = props.label.replace("<br />", "{br}");
	              
	              $.each(senderData,function(index,indexEntry){
	            	  
	            	  if(clickLabel == indexEntry['label']){
	            		  $("#param_perspective").val("");
	            		  getDataBubbleFn();
	            		  return false;
	            	  }
		                $.each(indexEntry['category'],function(index2,indexEntry2){
							if (clickLabel == indexEntry2['label']) {
								$("#param_perspective").val(indexEntry2['perspective_id']);
								getDataBubbleFn();
								return false;
							}
		                });
	              });
	    				}    
	        }
	    }).render();
	 	
	    
 };
 var getDataFn = function(page,rpp){
		var year= $("#param_year").val();
		var period= $("#param_period").val();
		var app_type= $("#param_app_type").val();
		var emp= $("#param_emp").val();
		//var position= $("#param_position").val();
		var app_lv= $("#param_app_lv").val();
		var org= $("#param_org_id").val();

		$.ajax({
			url : restfulURL+"/see_api/public/dashboard/kpi_overall_pie",
			type : "get",
			dataType : "json",
			data:{
				"year_id"				:		year,
				"period_id"				:		period,
				"appraisal_type_id"		:		app_type,
				"emp_id"				:		emp,
				//"position_id"			:		position,
				"level_id"				:		app_lv,
				"org_id"				:		org	
			},
			headers:{Authorization:"Bearer "+tokenID.token},
			async:false,// w8 data 
			success : function(data) {
				galbalDashboard=data;
				$("#captionPieChart").html("<div id='txtTopic' class='span12 graphLTopHeader'>"+data['header'].replace("Performance by Perspective", "<div style='display: inline-block;'>Performance by Perspective</div>")+"</div>");
				generateChartPieFn(data);
				
			}
		});	
};
var getDataBubbleFn = function(page,rpp){
	var year= $("#param_year").val();
	var period= $("#param_period").val();
	var app_type= $("#param_app_type").val();
	var emp= $("#param_emp").val();
	//var position= $("#param_position").val();
	var app_lv= $("#param_app_lv").val();
	var org= $("#param_org_id").val();
	var perspective= $("#param_perspective").val();
	$.ajax({
		url : restfulURL+"/see_api/public/dashboard/kpi_overall_bubble",
		type : "get",
		dataType : "json",
		data:{
			"year_id"				:		year,
			"period_id"				:		period,
			"appraisal_type_id"		:		app_type,
			"emp_id"				:		emp,
			//"position_id"			:		position,
			"level_id"				:		app_lv,
			"org_id"				:		org,
			"perspective_id" 		:		perspective 
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,// w8 data 
		success : function(data) {
			$("#captionBubbleChart").html("<div id='txtTopic' class='span12 graphLTopHeader'>"+data['header'].replace("Performance by KPI", "<div style='display: inline-block;'>Performance by KPI</div>")+"</div>");
			generateChartBubbleFn(data);
			
		}
	});	
};

 
 var searchAdvanceFn = function (year,period,app_lv,org,app_type,emp,emp_name,position) {
	//embed parameter start
		
		var htmlParam="";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_year' 		name='param_year' 		value='"+year+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_period' 		name='param_period' 	value='"+period+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_app_type' 	name='param_app_type' 	value='"+app_type+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_emp' 			name='param_emp' 		value='"+emp+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_emp_name' 			name='param_emp_name' 		value='"+emp_name+"'>";
		//htmlParam+="<input type='hidden' class='paramEmbed' id='param_position' 	name='param_position' 	value='"+position+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_app_lv' 		name='param_app_lv' 	value='"+app_lv+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_org_id' 		name='param_org_id' 	value='"+org+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_perspective' 	name='param_perspective'value=''>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_item' 		name='param_item' 		value=''>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='sending_status' 	name='sending_status' 	value='true'>";
		$(".paramEmbed").remove();
		$("form#linkParam").append(htmlParam);
		//embed parameter end
		getDataFn();
		getDataBubbleFn();
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
		
		
		$(".app_url_hidden").show();
		
		$("#btnSearchAdvance").click(function(){
			if($("#app_type").val() == "1"){
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
		
					$("#app_type").val(),
					$("#emp_name_id").val(),
					$("#emp_name").val()
					//$("#position_id").val()
					);
			$("#listSubordinate").show();
			return false;
		});
		

		
		$(".app_url_hidden").show();
		
		
		//Autocomplete Search Start
		//generateAutocomplete("#position",restfulURL+"/see_api/public/cds_result/auto_position_name","post",{"position_name":null});
		generateAutocomplete("#emp_name",restfulURL+"/see_api/public/cds_result/auto_emp_name","post",{"emp_name":null});
		//Autocomplete Search End
		
		$("#app_type").change(function(){
			if($("#app_type").val() == "1"){

				//$("#position").removeAttr('disabled');
				$("#emp_name").removeAttr('disabled');
				$("#emp_name").removeAttr('disabled');
				$('#apprasiaLevel').val($('#apprasiaLevel option:first-child').val());
				$('#apprasiaLevel').change();
				//$('#organization').val($('#organization option:first-child').val());
				$("#apprasiaLevel , #organization").attr("disabled", 'disabled');
			
			}else if($("#app_type").val() == "2"){
				//$("#position").attr("disabled", 'disabled');
				$("#emp_name").attr("disabled", 'disabled');
				$("#apprasiaLevel , #organization").removeAttr('disabled');
				//$("#position").val("");
				//$("#position_id").val("");
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