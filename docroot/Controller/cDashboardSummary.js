 var restfulPathDashboard="/see_api/public/cds_result";
 var galbalDashboard=[];
 var galbalDataTemp = [];
 

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

 			$.each(data,function(index,indexEntry){
 				html+="<option value="+indexEntry[Object.keys(indexEntry)[0]]+">"+indexEntry[Object.keys(indexEntry)[1] == undefined  ?  Object.keys(indexEntry)[0]:Object.keys(indexEntry)[1]]+"</option>";	
 			});	

 		}
 	});	
 	return html;
 };

 
$(document).ready(function(){
	var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
	 	if(connectionServiceFn(username,password)==false){
	 		return false;
	 	}
	 }
	//Generate DropDown List
	$("#year").html(generateDropDownList(restfulURL+"/see_api/public/dashboard/year_list","GET"));
	$("#period").html(generateDropDownList(restfulURL+"/see_api/public/dashboard/period_list","POST",{"appraisal_year":$("#year").val()}));
	$("#apprasiaLevel").html(generateDropDownList(restfulURL+"/see_api/public/dashboard/appraisal_level","GET"));
	$("#organization").html(generateDropDownList(restfulURL+"/see_api/public/dashboard/org_list","POST",{"appraisal_level":$("#apprasiaLevel").val()}));
	$("#kpi").html(generateDropDownList(generateDropDownList(restfulURL+"/see_api/public/dashboard/kpi_list","POST",{"appraisal_level":$("#apprasiaLevel").val(),"org_id":$("#organization").val()})));
	
	//#Change Param Function
	$("#year").change(function(){$("#period").html(generateDropDownList(restfulURL+"/see_api/public/dashboard/period_list","POST",{"appraisal_year":$("#year").val()}));});
	$("#apprasiaLevel").change(function(){
		$("#organization").html(generateDropDownList(restfulURL+"/see_api/public/dashboard/org_list","POST",{"appraisal_level":$("#apprasiaLevel").val()}));
		$("#kpi").html(generateDropDownList(generateDropDownList(restfulURL+"/see_api/public/dashboard/kpi_list","POST",{"appraisal_level":$("#apprasiaLevel").val(),"org_id":$("#organization").val()})));
	});
	$("#organization").change(function(){$("#kpi").html(generateDropDownList(generateDropDownList(restfulURL+"/see_api/public/dashboard/kpi_list","POST",{"appraisal_level":$("#apprasiaLevel").val(),"org_id":$("#organization").val()})));});
	
	
	$(".app_url_hidden").show();
	 $( "#accordion" ).accordion({
		 heightStyle: 'content'
		 
	 });
 });
 
 FusionCharts.ready(function () {
	    var cSatScoreChart = new FusionCharts({
	        type: 'angulargauge',
	        renderAt: 'chart-container',
	        width: '400',
	        height: '250',
	        dataFormat: 'json',
	        dataSource: {
	            "chart": {
	                 "baseFontSize":"11",
	                 "captionFontSize":"14",
	                 "lowerLimit": "0",
	                 "upperLimit": "120000",
	                 "gaugeFillMix": "{dark-30},{light-60},{dark-10}",
	                 "gaugeFillRatio": "15",
	                 "majorTMNumber": "4",
	                 "majorTMColor": "#333",
	                 "majorTMAlpha": "100",
	                 "majorTMHeight": "15",
	                 "majorTMThickness": "2",  
	                 "showValue": "1",
	                 "theme": "fint",
	                 "exportEnabled" :"1",
	                 "bgColor": "#ffffff",
	            },
	            "colorRange": {
	                "color": [
	                    {
	                        "minValue": "0",
	                        "maxValue": "72000",
	                        "code": "#FF0000"
	                    },
	                    {
	                        "minValue": "72000",
	                        "maxValue": "96000",
	                        "code": "#FFFF00"
	                    },
	                    {
	                        "minValue": "96000",
	                        "maxValue": "108000",
	                        "code": "#AEDC5A"
	                    },
	                    {
	                        "minValue": "108000",
	                        "maxValue": "120000",
	                        "code": "#339933"
	                    }
	                ]
	            },
	            "dials": {
	                "dial": [{
	                    "value": "85090"
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
	});
 
 
 
 
 FusionCharts.ready(function () {
	    var revenueChart = new FusionCharts({
	        type: 'column2d',
	        renderAt: 'chart-container2',
	        width: '760',
	        height: '350',
	        dataFormat: 'json',
	        dataSource: {
	            "chart": {
	                "caption": "Monthly revenue for last year",
	                "subCaption": "Harry's SuperMart",
	                "xAxisName": "Month",
	                "yAxisName": "Revenues (In USD)",
	                "numberPrefix": "$",
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
	                "subcaptionFontSize": "14"
	            },            
	            "data": [
	                {
	                    "label": "Jan",
	                    "value": "120000"
	                }, 
	                {
	                    "label": "Feb",
	                    "value": "250000"
	                }, 
	                {
	                    "label": "Mar",
	                    "value": "320000"
	                }, 
	                {
	                    "label": "Apr",
	                    "value": "450000"
	                }, 
	                {
	                    "label": "May",
	                    "value": "510000"
	                }, 
	                {
	                    "label": "Jun",
	                    "value": "620000"
	                }, 
	                {
	                    "label": "Jul",
	                    "value": "680000"
	                }, 
	                {
	                    "label": "Aug",
	                    "value": "720000"
	                }, 
	                {
	                    "label": "Sep",
	                    "value": "850000"
	                }, 
	                {
	                    "label": "Oct",
	                    "value": "990000"
	                }, 
	                {
	                    "label": "Nov",
	                    "value": "1000000"
	                }, 
	                {
	                    "label": "Dec",
	                    "value": "1230000"
	                }
	            ],
	            "trendlines": [
	                {
	                    "line": [
	                        {
	                            "startvalue": "700000",
	                            "color": "#1aaf5d",
	                            "valueOnRight": "1",
	                            "displayvalue": "Target"
	                        },{
	                            "startvalue": "600000",
	                            "color": "#DC143C",
	                            "valueOnRight": "1",
	                            "displayvalue": "Forecast"
	                        }
	                    ]
	                }
	            ]
	        }
	    }).render();
	});