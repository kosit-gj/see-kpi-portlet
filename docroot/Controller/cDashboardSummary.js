 var restfulPathDashboard="/see_api/public/cds_result";
 var galbalDashboard=[];
 var galbalDataTemp = [];
 galbalDataTemp['extract'] = false;
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
 var generateAccordionHTML = function(parent,data){
		var kpi_id = galbalDataTemp["item_id"];
		var accordionHtml = "";
		if(parent == "group1"){
			accordionHtml += "<div id='orgParent' class='panel panel-default sortableItem'>";
		}else{
			accordionHtml += "<div class='panel panel-default sortableItem'>";
		}
			
		accordionHtml += "	<div class='panel-heading' role='tab' id='headOrg-"+data['org_id']+"'>";
		accordionHtml += "		<h4 class='panel-title'>";
		accordionHtml += "			 <a class='collapsed' role='button' data-toggle='collapse' data-parent='#accordion' href='#bodyOrg-"+data['org_id']+"' aria-expanded='false' aria-controls='bodyOrg-"+data['org_id']+"' style='color: black;font-weight: bold;'>";
		accordionHtml += "<span class='fa fa-caret-right'></span> "+data['org_name']+"&emsp;";	
		if(parent == "group1"){
			accordionHtml += "<button id='btn_extract' type='button' class='btn btn-xs btn-white' style='margin-top: -6px;'> <i class='fa fa-plus-square' aria-hidden='true'></i> Extract</button>";
		}

		accordionHtml += "			</a>";	
		accordionHtml += "		</h4>";	
		accordionHtml += "	</div>";	
		accordionHtml += "	<div id='bodyOrg-"+data['org_id']+"' class='panel-collapse collapse' role='tabpanel' aria-labelledby='headOrg-"+data['org_id']+"'>";	
		accordionHtml += "		<div class='panel-body'>";
		//#Start Body Accordion
		
		//#btn next & previous kpi
		if(kpi_id[kpi_id.indexOf(parseInt($("#param_kpi_id").val()))-1] !=  undefined && parent == "group1"){
			accordionHtml += "			<span id='previous' class='arrow' data-previous='"+kpi_id[kpi_id.indexOf(parseInt($("#param_kpi_id").val()))-1]+"'></span>";
		}
		if(kpi_id[kpi_id.indexOf(parseInt($("#param_kpi_id").val()))+1] !=  undefined && parent == "group1"){
			accordionHtml += "			<span id='next' class='arrow' data-next='"+kpi_id[kpi_id.indexOf(parseInt($("#param_kpi_id").val()))+1]+"'></span>";	
		}
		
		accordionHtml += "			<div class='' style='height: auto;'>";
		accordionHtml += "				<div class='span4'>";
		accordionHtml += "				<div class='graphLTopHeader'>Perspective: "+data['perspective_name']+"</div>";
		accordionHtml += "					<div>";
		accordionHtml += "						<div class='graphLTop'>";
		accordionHtml += "							<div class='textGRaphTop'>Target</div>";
		accordionHtml += "							<div class='textGRaphTop'>"+data['dual_chart']['data']['target']+"</div>";
		accordionHtml += "						</div>";
		accordionHtml += "						<div class='graphLTop'>";
		accordionHtml += "							<div class='textGRaphTop'>Forecast</div>";
		accordionHtml += "							<div class='textGRaphTop'>"+data['dual_chart']['data']['forecast']+"</div>";
		accordionHtml += "						</div>";
		accordionHtml += "						<div class='graphLTop'>";
		accordionHtml += "							<div class='textGRaphTop'>Actual</div>";
		accordionHtml += "							<div class='textGRaphTop'>"+data['dual_chart']['data']['actual_value']+"</div>";
		accordionHtml += "						</div>";
		accordionHtml += "						<br style='clear: both'>";
		accordionHtml += "					</div>";
		accordionHtml += "					<div>";
		accordionHtml += "						<div id='chartOrgGauge-"+data['org_id']+"'></div>";
		accordionHtml += "					</div>";
		accordionHtml += "				</div>";	
		accordionHtml += "				</div>";
		accordionHtml += "				<div class='span8'>";
		accordionHtml += "					<div class='graphLTopHeader' style='margin-bottom: 3px;'>KPI: "+data['item_name']+"</div>";
		accordionHtml += "					<div id='chartOrgBar-"+data['org_id']+"'></div>";
		accordionHtml += "				</div>";
		accordionHtml += "			</div>";
		//#End Body Accordion
		accordionHtml += "		</div>";	
		accordionHtml += "</div>";
		//console.log(accordionHtml);
		return accordionHtml;
		//$("#accordion").append(accordionHtml);
		
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
		        renderAt:  "chartOrgGauge-"+data['org_id'],
		        width: '100%',
		        height: '250',
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
		                    "value": data['dual_chart']['data']['actual_value']
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
		        renderAt: "chartOrgBar-"+data['org_id'],
		        width: '100%',
		        height: '350',
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
		                            "startvalue": data['bar_chart']['data']['forecast'],
		                            "color": "#1aaf5d",
		                            "valueOnRight": "1",
		                            "displayvalue": "Target"
		                        },{
		                            "startvalue": data['bar_chart']['data']['target'],
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
 
 var getDataFn = function(page,rpp){
		var year= $("#param_year").val();
		var period= $("#param_period").val();
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

 
 var searchAdvanceFn = function (year,period,app_lv,org,kpi) {
	//embed parameter start
		
		var htmlParam="";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_year' name='param_year' value='"+year+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_period' name='param_period' value='"+period+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_app_lv' name='param_app_lv' value='"+app_lv+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_org_id' name='param_org_id' value='"+org+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_kpi_id' name='param_kpi_id' value='"+kpi+"'>";
		$(".paramEmbed").remove();
		$("body").append(htmlParam);
		//embed parameter end
		getDataFn();
};
 
 var listDashBoardFn = function(data){
	 
	 $("#accordion").empty();
	 $("#accordion").hide();
	 html = "";
	 $.each(data , function(inedx,indexEntry){
		 html+=generateAccordionHTML(inedx,indexEntry);
	 });
	 $("#accordion").html(html);
	 
	 
	 $.each(data , function(inedx,indexEntry){
//		 generateChartGaugeFn(indexEntry);
//		 generateChartBarFn(indexEntry);
		 $.when(generateChartGaugeFn(indexEntry),generateChartBarFn(indexEntry)).then(function() {
				    console.log(inedx+" Loading Chart: Success");
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
	    }).on('hide.bs.collapse', function(){
	    	$(this).parent().css({"border-color": "#c5c5c5"});
	    	$(this).prev().css({"background": "#f6f6f6"});
	    	$(this).parent().find(".fa").removeClass("fa-caret-down").addClass("fa-caret-right");
	    });


	    //Open Parent Org

			$("#next").off("click");
			$("#next").on("click",function() {
				  console.log("Next KPI : "+$(this).attr("data-next"));

				  			searchAdvanceFn(
									$("#param_year").val(),
									$("#param_period").val(),
									$("#param_app_lv").val(),
									$("#param_org_id").val(),
									$(this).attr("data-next"));
				  			$("#accordion").show();
				  			$("#accordion").children().children().next().eq(0).collapse('show');
				  			return false;
				  
				});
			$("#previous").off("click");
			$("#previous").on("click",function() {
				  console.log("Next Previous : "+$(this).attr("data-previous"));
				  			
				  			searchAdvanceFn(
									$("#param_year").val(),
									$("#param_period").val(),
									$("#param_app_lv").val(),
									$("#param_org_id").val(),
									$(this).attr("data-previous"));
				  			$("#accordion").show();
				  			$("#accordion").children().children().next().eq(0).collapse('show');;
				  			return false;
				  	
				});
			$("#btn_extract").off("click");
			$("#btn_extract").click(function(event){
				console.log(event);
				  event.stopPropagation();
				  if(galbalDataTemp['extract'] == true){
					  console.log(galbalDataTemp['extract']);
				    $("#btn_extract").find(".fa").removeClass("fa-minus-square").addClass("fa-plus-square");
				    $("#accordion").children().children().next().collapse('hide');
				    galbalDataTemp['extract'] = false;
				  }
				  else if(galbalDataTemp['extract'] == false){
					  console.log(galbalDataTemp['extract']);
					  $("#btn_extract").find(".fa").removeClass("fa-plus-square").addClass("fa-minus-square");
					    $("#accordion").children().children().next().collapse('show');
					    galbalDataTemp['extract'] = true;
				  }
				});
			
			$( "#accordion" ).sortable({
				 // revert: true
				 items: '.sortableItem:not(#orgParent)'
				});
			$('#accordion').disableSelection();
 };
$(document).ready(function(){
	var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
	 	if(connectionServiceFn(username,password)==false){
	 		return false;
	 	}
	 	//Generate DropDown List
		$("#year").html(generateDropDownList(restfulURL+"/see_api/public/dashboard/year_list","GET"));
		$("#period").html(generateDropDownList(restfulURL+"/see_api/public/dashboard/period_list","POST",{"appraisal_year":$("#year").val()}));
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
					$("#kpi").val());
			$("#accordion").show();
			$("#accordion").children().children().next().eq(0).collapse('show');;
			return false;
		});
		

		
		$(".app_url_hidden").show();
		
		//binding tooltip start
		 $('[data-toggle="tooltip"]').css({"cursor":"pointer"});
		 $('[data-toggle="tooltip"]').tooltip({
			 html:true
		 });
		//binding tooltip end
	 	
	 }
 });
 

 
 
 
 
 