 var restfulPathDashboard="/"+serviceName+"/public/cds_result";
 var galbalDashboard=[];
 var galbalDataTemp = [];
 var rangeColorsThreshold=[];
 var currentUrl = document.URL;//window.location.protocol+"//"
 galbalDataTemp['protocol']=currentUrl.split(":")[0]+"://";
 galbalDataTemp['galbalOrg'] = [];
 galbalDataTemp['extract'] = false;
 galbalDataTemp['All_KPI'] = [];
 galbalDataTemp['collapse_show']="";
 galbalDataTemp['click'];
 galbalDataTemp['click_Timeout'];
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
 				if(index==0){
 					html+="<option selected value="+indexEntry[Object.keys(indexEntry)[0]]+">"+indexEntry[Object.keys(indexEntry)[1] == undefined  ?  Object.keys(indexEntry)[0]:Object.keys(indexEntry)[1]]+"</option>";	
 				}else{
 					html+="<option value="+indexEntry[Object.keys(indexEntry)[0]]+">"+indexEntry[Object.keys(indexEntry)[1] == undefined  ?  Object.keys(indexEntry)[0]:Object.keys(indexEntry)[1]]+"</option>";	
 	 				
 				}
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
	                "xAxisMaxValue": (parseFloat(data['max_x']*1.15).toFixed(0)),
	                "yAxisMinValue": "0",
	                "yAxisMaxValue": (parseFloat(data['max_y']*1.15).toFixed(0)),
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
	                "xAxisName": "ห่างเป้า",
	                "yAxisName": "ความสำคัญ",
	                "numDivlines": "2",
	                "showValues":"0",
	                "showPlotBorder":"1",
	                "showTrendlineLabels": "1",
	                "showYAxisValues":"0",
	                "numDivlines": "0",
	                "chartLeftMargin": "35",
	                "chartRightMargin": "35",
	                "legendborderalpha": "30",
	                "legendShadow":"1",
	                //Dynamic tool-tips with HTML and macro variables
	                //"plotTooltext": "<div id='nameDiv'>$name</div>{br}Urgency : <b>$xDataValue</b>{br}Impact : <b>$yDataValue</b>{br}Achievement : <b>$zvalue%</b>{br}Last Updated: 2017-09-26 17:36:32",
	                "theme": "fint"
	            },
	            "categories": data['categories'],
	            "dataset" 	: data['dataset'],
	            "trendlines" : data['trendlines']
	        }
//	        "events": {
//	            "dataplotclick" : function(ev, props) {
//	            	
//	            	var objDataset = ev.sender.getJSONData().dataset;
//	            	//console.log(objDataset);
//	            	//console.log(props);
//	            	//console.log(props.displayValue);
//	            	var clickLabel = $("#nameDiv").text();
//	            	if(galbalDataTemp['click'] == null || galbalDataTemp['click'] == "" || galbalDataTemp['click']['id'] != clickLabel){
//	            		galbalDataTemp['click']={id:clickLabel,double_click:false};
//	            		clearTimeout(galbalDataTemp['click_Timeout']);
//	            		galbalDataTemp['click_Timeout'] = setTimeout(function(){ console.log("*** Clear Timeout ***");galbalDataTemp['click']['id']=""; }, 1000);
//	            	}else if(galbalDataTemp['click']['id'] == clickLabel){
//	            		galbalDataTemp['click']['double_click'] =true;
//	            	}
//	            	console.log(galbalDataTemp['click']['double_click']);
//	            	$.each(objDataset,function(index,indexEntry){
//	            		$.each(indexEntry['data'],function(index2,indexEntry2){
//		            	  if(clickLabel == indexEntry2['name'] && galbalDataTemp['click']['double_click'] == true){
////		            		  
//		            			$("#param_item").val(indexEntry2['item_id']);
//		            			$("form#linkParam").attr("action", galbalDataTemp['protocol']+window.location.host+"/web/guest/subordinate-performance");
//		            			$("form#linkParam").submit();
////		            			setTimeout(function(){
////		            				$("form#linkParam").attr("action", galbalDataTemp['protocol']+window.location.host+"/web/guest/performance-trend");
////			            			$("form#linkParam").submit();
////		            				}, 1000);
//		            			
//		            			galbalDataTemp['click']['id']="";
//		            		  return false;
//		            	  }
//	            	 	});
//		              });
//	            }    
//	        }
	    }).render();
	 
 };
 
 var generateChartPieFn = function(data){	
	 var hoverColor = "";
	 try {
		 hoverColor = data['category'][0]['color'];
		}
		catch(err) {
		    console.log(err.message);
		}
	hoverColor = hoverColor == null || hoverColor == undefined ? "" : hoverColor;
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
	                "hoverFillColor": hoverColor,
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
	            		  getDataAllKPIFn();
	            		  return false;
	            	  }
		                $.each(indexEntry['category'],function(index2,indexEntry2){
							if (clickLabel == indexEntry2['label']) {
								$("#param_perspective").val(indexEntry2['perspective_id']);
								getDataBubbleFn();
								getDataAllKPIFn();
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
		var position= $("#param_position").val();
		var app_lv= $("#param_app_lv").val();
		var app_lv_org= $("#param_app_lv_org").val();
		var org= $("#param_org_id").val();

		$.ajax({
			url : restfulURL+"/"+serviceName+"/public/dashboard/kpi_overall_pie",
			type : "get",
			dataType : "json",
			data:{
				"year_id"				:		year,
				"period_id"				:		period,
				"appraisal_type_id"		:		app_type,
				"emp_id"				:		emp,
				"position_id"			:		position,
				"level_id"				:		app_lv,
				"org_level_id"			:		app_lv_org,
				"org_id"				:		org	
			},
			headers:{Authorization:"Bearer "+tokenID.token},
			async:false,// w8 data 
			success : function(data) {
				galbalDashboard=data;
				$("#btn_kpi").hide();
				$("#captionPieChart").html("<input type='hidden' id='overall_name' name='overall_name' value='"+data['name']+"'><div id='txtTopic' class='span12 graphLTopHeader'>"+data['header'].replace("Performance by Perspective", "<div style='display: inline-block;'>"+$(".lt-performance-by-perspective").val()+"</div>")+"</div>");
				$("#overall_name_on_list_kpi").html(data['name']);
				generateChartPieFn(data);
				
			}
		});	
};

var getDataAllKPIFn = function(page,rpp){
	var year= $("#param_year").val();
	var period= $("#param_period").val();
	var app_type= $("#param_app_type").val();
	var emp= $("#param_emp").val();
	var position= $("#param_position").val();
	var app_lv= $("#param_app_lv").val();
	var org= $("#param_org_id").val();
	var perspective= $("#param_perspective").val();
	$.ajax({
		url : restfulURL+"/"+serviceName+"/public/dashboard/perspective_details",
		type : "get",
		dataType : "json",
		data:{
			"year_id"				:		year,
			"period_id"				:		period,
			"appraisal_type_id"		:		app_type,
			"emp_id"				:		emp,
			"position_id"			:		position,
			"level_id"				:		app_lv,
			"org_id"				:		org,
			"perspective_id" 		:		perspective 
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,// w8 data 
		success : function(data) {
			console.log(data);
			
			if(data =="" || data ==null ){
				$("#btn_kpi").hide();
			}else{
				$("#btn_kpi").show();
			}
			listAllKPIFn(data);
			
		}
	});	
};
var listAllKPIFn = function(data){
	
	var dataTableHTML="";
	var forecast;
	var target;
	var actual;
	var percent_target;
	var percent_forecast;
	$.each(data,function(index2,indexEntry2){
		rangeColorsThreshold = indexEntry2['rangeColor'];
		target = (indexEntry2['target']==null || indexEntry2['target']=='') ? '&nbsp;' : addCommas(notNullFn(indexEntry2['target']));
		forecast = (indexEntry2['forecast']==null || indexEntry2['forecast']=='') ? '&nbsp;' : addCommas(notNullFn(indexEntry2['forecast']));
		actual = (indexEntry2['actual']==null || indexEntry2['actual']=='') ? '&nbsp;' : addCommas(notNullFn(indexEntry2['actual']));
		percent_target = (indexEntry2['percent_target']==null || indexEntry2['percent_target']=='') ? '' : addCommas(notNullFn(indexEntry2['percent_target']));
		percent_forecast = (indexEntry2['percent_forecast']==null || indexEntry2['percent_forecast']=='') ? '' : addCommas(notNullFn(indexEntry2['percent_forecast']));

		dataTableHTML+="<tr>";
			dataTableHTML+="<td>"+indexEntry2['perspective_name']+" </td>";
			dataTableHTML+="<td>"+indexEntry2['item_name']+"<br><span class='LastUpdateText'>As of: "+indexEntry2['etl_dttm']+"</span></td>";
			dataTableHTML+="<td>"+indexEntry2['uom_name']+" </td>";
			dataTableHTML+="<td>";
			
			dataTableHTML+="<table class='tableInside table-striped'>";
				dataTableHTML+="<thead>";
					dataTableHTML+="<tr>";
						dataTableHTML+="<th style='min-width: 100px;'>"+$(".lt-target").val()+"</th>";
						dataTableHTML+="<th style='min-width: 100px;'>"+$(".lt-forecast").val()+"</th>";
						dataTableHTML+="<th style='min-width: 100px;'>"+$(".lt-actual").val()+"</th>";
					dataTableHTML+="</tr>";
					dataTableHTML+="</thead>";
					dataTableHTML+="<tbody>";
						dataTableHTML+="<tr>";
							dataTableHTML+="<td style=' text-align: right !important;'>"+target+"</td>";
							dataTableHTML+="<td style=' text-align: right !important;'>"+forecast+"</td>";
							dataTableHTML+="<td style=' text-align: right !important;'>"+actual+"</td>";
						dataTableHTML+="</tr>";
						dataTableHTML+="<tr>";
							dataTableHTML+="<td>"+$(".lt-percent-target").val()+"<span style='float:right'>"+percent_target+"</span></td>";
							dataTableHTML+="<td colspan='2'><div class='sparkline' style='opacity:1;'  >"+indexEntry2['percent_target_str']+"</div></td>";
						dataTableHTML+="</tr>";
						dataTableHTML+="<tr>";
							dataTableHTML+="<td>"+$(".lt-percent-forecast").val()+"<span style='float:right'>"+percent_forecast+"</span></td>";
							dataTableHTML+="<td colspan='2'><div class='sparkline' style='opacity:1;'>"+indexEntry2['percent_forecast_str']+"</div></td>";
						dataTableHTML+="</tr>";
					dataTableHTML+="</tbody>";
				dataTableHTML+="</table>";
			dataTableHTML+="</td>";
		dataTableHTML+="</tr>";
		
	});
	$("#kpiList").html(dataTableHTML);
	$("#btn_kpi").off("click");
	$("#btn_kpi").on("click");
	$("#btn_kpi").click(function(){
		
		if($("#btn_kpi").attr("data-sparkline") != "active" ){
			$("body").mLoading('show');
			$("#btn_kpi").attr("data-sparkline","active" );
			setTimeout(function(){ 
				$(".sparkline").sparkline('html', {
			        type: 'bullet',
			        width:'120',
			        height: '20',
			        targetWidth: '6',
				    targetColor: '#fefefe',
				    performanceColor: '#282a4b',
			        rangeColors: rangeColorsThreshold
				}).css("opacity","1");
				
				$("body").mLoading('hide');
			}, 1000);
			
		}
		
		
	});
	
}
var getDataBubbleFn = function(page,rpp){
	var year= $("#param_year").val();
	var period= $("#param_period").val();
	var app_type= $("#param_app_type").val();
	var emp= $("#param_emp").val();
	var position= $("#param_position").val();
	var app_lv= $("#param_app_lv").val();
	var org= $("#param_org_id").val();
	var perspective= $("#param_perspective").val();
	var app_lv_org= $("#param_app_lv_org").val();
	
	$.ajax({
		url : restfulURL+"/"+serviceName+"/public/dashboard/kpi_overall_bubble",
		type : "get",
		dataType : "json",
		data:{
			"year_id"				:		year,
			"period_id"				:		period,
			"appraisal_type_id"		:		app_type,
			"emp_id"				:		emp,
			"position_id"			:		position,
			"level_id"				:		app_lv,
			"org_level_id"			:		app_lv_org,
			"org_id"				:		org,
			"perspective_id" 		:		perspective 
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,// w8 data 
		success : function(data) {
			var htmlCaption="";
			htmlCaption +="<div id='txtTopic' class='span12 graphLTopHeader'>"+data['header'].replace("Performance by KPI", "<div style='display: inline-block;'>"+$(".lt-performance-by-kpi").val()+"</div>");
			htmlCaption +="<div style='display: inline-block;'><button id='btn_kpi' type='button' data-target='#ModalKPI' data-toggle='modal' data-backdrop='"+setModalPopup[0]+"' data-keyboard='"+setModalPopup[1]+"' class='btn btn-xs btn-white' > <i class='fa fa-table fa-table' aria-hidden='true'></i>"+$(".lt-all-kpi").val()+"</button></div>";
			htmlCaption +="</div>";
			
			$("#captionBubbleChart").html(htmlCaption);
			generateChartBubbleFn(data);
			
		}
	});	
};

 
 var searchAdvanceFn = function (year,period,app_lv,org,app_type,emp,emp_name,position) {
	//embed parameter start
	 var AppraisalLevel_ = ($("#app_type").val() == "1") ? $("#AppraisalOrgLevel").val() : $("#AppraisalEmpLevel").val() ;
	 var AppraisalLevelOrg_ = $("#AppraisalOrgLevel").val();
		
		var htmlParam="";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_year' 		name='param_year' 		value='"+year+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_period' 		name='param_period' 	value='"+period+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_app_type' 	name='param_app_type' 	value='"+app_type+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_emp' 			name='param_emp' 		value='"+emp+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_emp_name' 	name='param_emp_name' 	value='"+emp_name+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_position' 	name='param_position' 	value='"+position+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_app_lv' 		name='param_app_lv' 	value='"+AppraisalLevel_+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_app_lv_org' 	name='param_app_lv_org' value='"+AppraisalLevelOrg_+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_org_id' 		name='param_org_id' 	value='"+org+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_perspective' 	name='param_perspective'value=''>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_item' 		name='param_item' 		value=''>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='sending_status' 	name='sending_status' 	value='true'>";
		$(".paramEmbed").remove();
		$("form#linkParam").append(htmlParam);
		//embed parameter end
		getDataFn();
		getDataBubbleFn();
		getDataAllKPIFn();
};

var CreateOrgLevelAndOrganizByEmpName = function(emp_id){
	$("#AppraisalOrgLevel").html(generateDropDownList(
		restfulURL+"/"+serviceName+"/public/appraisal/parameter/org_level_by_empname",
		"GET",
		{"emp_id": emp_id,"period_id": $("#period").val()}
	));
	$("#organization").html(generateDropDownList(
		restfulURL+"/"+serviceName+"/public/appraisal/parameter/organization_by_empname",
		"GET",
		{"emp_id": emp_id,"org_level": $("#AppraisalOrgLevel").val(),"period_id": $("#period").val()}
	));
}


 $(document).ready(function(){
	var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		 if(connectionServiceFn(username,password,plid)==false){
	 		return false;
	 	}
		 
		 var dataClearParam = [
				{'id':'#position', 'val': ""},
				{'id':'#position_id', 'val': ""},
				{'id':'#emp_name', 'val': ""},
				{'id':'#emp_name_id', 'val': ""}
			];
		 
		 var dataSetParam = [
				{'id':'#position', 'val': ""+cMain_position_name+""},
				{'id':'#position_id', 'val': cMain_position_id},
				{'id':'#emp_name', 'val': ""+cMain_emp_name+""},
				{'id':'#emp_name_id', 'val': cMain_emp_id},
				{'id':'#AppraisalEmpLevel', 'val': ""+cMain_level_id+""}
			];
		 
	 	$(".advance-search input").val("");
	 	
	 	//Generate DropDown List
		$("#year").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/appraisal/year_list_assignment","GET"));
		$("#period").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/dashboard/period_list","POST",{"appraisal_year":$("#year").val()}));
		$("#app_type").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/appraisal_assignment/appraisal_type_list","GET"));
		// $("#apprasiaLevel").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/appraisal/al_list","GET"));
		// $("#kpi").html((generateDropDownList(restfulURL+"/"+serviceName+"/public/dashboard/kpi_list","POST",{"appraisal_level":$("#apprasiaLevel").val(),"org_id":$("#organization").val()})));
		
		//#Change Param Function
		$("#year").change(function(){$("#period").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/dashboard/period_list","POST",{"appraisal_year":$("#year").val()}));});
		// $("#apprasiaLevel").change(function(){$("#organization").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/dashboard/org_list","POST",{"appraisal_level":$("#apprasiaLevel").val()}));$("#organization").change();});
		
		$("#app_type").change(function() {
			if ($("#app_type").val() == 1) {
				$("#emp_name , #position").val("").prop("disabled", true);
				$("#emp_name_id , #position_id").val("");
				$("#AppraisalEmpLevel").prop("disabled", true);
				$("#AppraisalEmpLevel").empty();
				
				$("#AppraisalOrgLevel").html( generateDropDownList(
					restfulURL+"/"+serviceName+"/public/appraisal/parameter/org_level",
					"GET"
				));
				
				
				$("#organization").html( generateDropDownList(
					restfulURL+"/"+serviceName+"/public/dashboard/org_list",
					"POST",
					{"appraisal_level":$("#AppraisalOrgLevel").val()}
				));
				
				
			} else {
			    $("#emp_name , #position").prop("disabled", false);
				$("#AppraisalEmpLevel").prop("disabled", false);
				$("#AppraisalEmpLevel").html( generateDropDownList(
					restfulURL+"/"+serviceName+"/public/appraisal/parameter/emp_level",
					"GET"
				));
				
				$("#AppraisalOrgLevel").html( generateDropDownList(
					restfulURL+"/"+serviceName+"/public/appraisal/parameter/org_level_individual",
					"GET",
					{"level_id": $("#AppraisalEmpLevel").val()}
				));
				
				$("#organization").html( generateDropDownList(
					restfulURL+"/"+serviceName+"/public/appraisal/parameter/org_individual",
					"GET",
					{"emp_level":$("#AppraisalEmpLevel").val(), "org_level":$("#AppraisalOrgLevel").val()}
				));
			}
		});
		$("#app_type").change();
		
		$("#organization").change(function() {
			clearParamSearch(dataClearParam);// in cMain.js
		});
		
		$("#AppraisalOrgLevel").change(function(){
			clearParamSearch(dataClearParam);// in cMain.js
			
			if($("#app_type").val() == "1"){
				$("#organization").html( generateDropDownList(
					restfulURL+"/"+serviceName+"/public/dashboard/org_list",
					"POST",
					{"appraisal_level":$("#AppraisalOrgLevel").val()}
				));
			} else {
				$("#organization").html( generateDropDownList(
					restfulURL+"/"+serviceName+"/public/appraisal/parameter/org_individual",
					"GET",
					{"emp_level":$("#AppraisalEmpLevel").val(), "org_level":$("#AppraisalOrgLevel").val()}
				));
				
			}
		});
		
		$("#AppraisalEmpLevel").change(function(){
			clearParamSearch(dataClearParam);// in cMain.js
			
			$("#AppraisalOrgLevel").html(generateDropDownList(
				restfulURL+"/"+serviceName+"/public/appraisal/parameter/org_level_individual",
				"GET",
				{"level_id": $("#AppraisalEmpLevel").val()}
			));
			
			$("#organization").html(generateDropDownList(
				restfulURL+"/"+serviceName+"/public/appraisal/parameter/org_individual",
				"GET",
				{"emp_level":$("#AppraisalEmpLevel").val(), "org_level":$("#AppraisalOrgLevel").val()}
			));
		});
		
		if ($("#app_type").val() == 2) {
			setParamSearch(dataSetParam);// in cMain.js
			$("#AppraisalOrgLevel").html( generateDropDownList(
				restfulURL+"/"+serviceName+"/public/appraisal/parameter/org_level_individual",
				"GET",
					{"level_id": $("#AppraisalEmpLevel").val()}
			));
				
			$("#organization").html( generateDropDownList(
				restfulURL+"/"+serviceName+"/public/appraisal/parameter/org_individual",
				"GET",
				{"emp_level":$("#AppraisalEmpLevel").val(), "org_level":$("#AppraisalOrgLevel").val()}
			));
		}
			
		
	
		
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
		
					$("#app_type").val(),
					$("#emp_name_id").val(),
					$("#emp_name").val(),
					$("#position_id").val()
					);
			$("#listSubordinate").show();
			return false;
		});
		

		
		$(".app_url_hidden").show();
		
		
		//Autocomplete Search Start
		//generateAutocomplete("#position",restfulURL+"/"+serviceName+"/public/cds_result/auto_position_name","post",{"position_name":null});
		// generateAutocomplete("#emp_name",restfulURL+"/"+serviceName+"/public/cds_result/auto_emp_name","post",{"emp_name":null});

		//Autocomplete Search Position Start
		$("#position").autocomplete({
	        source: function (request, response) {
	        	$.ajax({
	        		
	        		url:restfulURL+"/"+serviceName+"/public/appraisal/parameter/auto_position_list",
					type:"post",
					dataType:"json",
					async:false,
					headers:{Authorization:"Bearer "+tokenID.token},
					data:{"emp_code":request.term},
					 data:{
						 	"position_name":request.term ,
						 	"emp_name":($("#emp_id").val()==""?"":$("#emp_name").val().split("(")[0]),
						 	"org_id":$("#organization").val()
					 },

					//async:false,
					 headers:{Authorization:"Bearer "+tokenID.token},
	                 error: function (xhr, textStatus, errorThrown) {
	                        console.log('Error: ' + xhr.responseText);
	                    },
					 success:function(data){
						  
							response($.map(data, function (item) {
	                            return {
	                                label: item.position_name,
	                                value: item.position_name,
	                                position_id : item.position_id
	                                
	                            };
	                        }));
						
					},
					beforeSend:function(){
						$("body").mLoading('hide');	
					}
					
					});
	        },
			select:function(event, ui) {
				$("#position").val(ui.item.value);
	            $("#position_id").val(ui.item.position_id);
	            galbalDataTemp['position_name'] = ui.item.label;
	            galbalDataTemp['position_id']=ui.item.position_id;
	            return false;
	        },change: function(e, ui) {  

	 
				if ($("#position").val() == galbalDataTemp['position_name']) {
					$("#position_id").val(galbalDataTemp['position_id']);
				}  else if (ui.item != null){
					$("#position_id").val(ui.item.position_id);
				}else {
					$("#position_id").val("");
				}
	         }
	    });
		var empNameAutoCompelteChangeToPositionName = function(name) {
			
//			var empNameCodeToPosition= $("#empName").val().split("-");
//			empNameCodeToPosition=empNameCodeToPosition[1];
			
			$.ajax({
				url:restfulURL + "/" + serviceName + "/public/appraisal/parameter/auto_position_list",
				type:"post",
				dataType:"json",
				async:false,
				headers:{Authorization:"Bearer "+tokenID.token},
				data:{"emp_name":name},
				success:function(data){
					if(data.length!==0) {
						$("#position").val(data[0].position_name);
						$("#position_id").val(data[0].position_id);
						galbalDataTemp['position_name'] = data[0].position_name;
						galbalDataTemp['position_id'] = data[0].position_id;
					}
				}
			});
	}
		$("#emp_name").autocomplete({
	        source: function (request, response) {
	        	$.ajax({
					 url: restfulURL + "/" + serviceName + "/public/appraisal/parameter/auto_emp_list",
					 type: "GET",
					 dataType:"json",
					 data: {
							"emp_name": request.term,
							"level_id": $("#AppraisalEmpLevel").val(),
							"emp_code":session_emp_code,"org_id":$("#organization").val()
						},
					//async:false,
					 headers:{Authorization:"Bearer "+tokenID.token},
	                 error: function (xhr, textStatus, errorThrown) {
	                        console.log('Error: ' + xhr.responseText);
	                    },
					 success:function(data){
						  
							response($.map(data, function (item) {
	                            return {
	                                label: item[Object.keys(item)[2]]+"("+item[Object.keys(item)[1]]+")",
	                                value: item[Object.keys(item)[2]],
	                                value_id : item[Object.keys(item)[0]],
	                                value_code : item[Object.keys(item)[1]],
	                                
	                            };
	                        }));
						
					},
					beforeSend:function(){
						$("body").mLoading('hide');	
					}
					
					});
	        },
			select:function(event, ui) {
				//CreateOrgLevelAndOrganizByEmpName(ui.item.value_id);
				$("#emp_name").val(ui.item.label);
	            $("#emp_name"+"_id").val(ui.item.value_id);
	            galbalDataTemp["#emp_name"] = ui.item.label;
	            galbalDataTemp["#emp_name"+"_id"]=ui.item.value_id;
	            empNameAutoCompelteChangeToPositionName(ui.item.value);
	            return false;
	        },change: function(e, ui) {   
				if ($("#emp_name").val() == galbalDataTemp["#emp_name"]) {
					$("#emp_name"+"_id").val(galbalDataTemp["#emp_name"+"_id"]);
				}  else if (ui.item != null){
					$("#emp_name"+"_id").val(ui.item.value_id);
				}else {
					$("#emp_name"+"_id").val("");
				}
	         }
	    });
		//Autocomplete Search End

	
		
		
		
		
		
		
		//binding tooltip start
		 $('[data-toggle="tooltip"]').css({"cursor":"pointer"});
		 $('[data-toggle="tooltip"]').tooltip({
			 html:true
		 });
		//binding tooltip end
		 $(".lfr-hudcrumbs").removeClass("lfr-hudcrumbs");
		 
		 
	 }
 });