// var restfulPathDashboard="/"+serviceName+"/public/cds_result";
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
 
 var dropDrowPeriodFn = function(paramPeriod,paramAssignFrequency){
		
		var htmlOption="";
		
		
		if(paramAssignFrequency==1){
			htmlOption+="<option value=''></option>";
		}else{
			$("#period").removeAttr("disabled");
		}
		
		$.ajax({
			url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/period_list",
			type:"get",
			dataType:"json",
			async:false,
			headers:{Authorization:"Bearer "+tokenID.token},
			data:{"appraisal_year":$("#YearList").val(),"frequency_id":$("#periodFrequency").val()},
			success:function(data){
				
				console.log(data);
				$.each(data,function(index,indexEntry){
					if(index==0 && paramAssignFrequency==0){
						htmlOption+="<option selected='selected' value="+indexEntry['period_id']+">"+indexEntry['appraisal_period_desc']+"</option>";
					}else{
						htmlOption+="<option value="+indexEntry['period_id']+">"+indexEntry['appraisal_period_desc']+"</option>";
					}
				});
				$("#period_id").html(htmlOption);
				
				if(paramAssignFrequency==1){
					$("#period_id").attr("disabled","disabled");
				}else{
					$("#period_id").removeAttr("disabled");
				}
				
					
			}
		});
		
	}
 var getDataFn = function(page,rpp){
		var year= $("#param_year").val();
		var period= $("#param_period").val();
		var app_type= $("#param_app_type").val();
		var emp= $("#param_emp").val();
		//var position= $("#param_position").val();
		var app_lv= $("#param_app_lv").val();
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
				//"position_id"			:		position,
				"level_id"				:		app_lv,
				"org_id"				:		org	
			},
			headers:{Authorization:"Bearer "+tokenID.token},
			async:false,// w8 data 
			success : function(data) {
				galbalDashboard=data;
				$("#btn_kpi").hide();
				$("#captionPieChart").html("<input type='hidden' id='overall_name' name='overall_name' value='"+data['name']+"'><div id='txtTopic' class='span12 graphLTopHeader'>"+data['header'].replace("Performance by Perspective", "<div style='display: inline-block;'>Performance by Perspective</div>")+"</div>");
				$("#overall_name_on_list_kpi").html(data['name']);
				generateChartPieFn(data);
				
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

};
 


 $(document).ready(function(){
	var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		 if(connectionServiceFn(username,password,plid)==false){
	 		return false;
	 	}
		$("#appraisalType").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/appraisal_assignment/appraisal_type_list","GET"));
		generateAutocomplete("#empName",restfulURL+"/"+serviceName+"/public/cds_result/auto_emp_name","post",{"emp_name":null});
		generateAutocomplete("#Position",restfulURL+"/"+serviceName+"/public/appraisal_assignment/auto_position_name","post",{"position_name":null});
		$("#appraisalLevel").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/appraisal/al_list","GET"));
		$("#organization").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/dashboard/org_list","POST",{"appraisal_level":$("#appraisalLevel").val()}));
		$("#YearList").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/appraisal/year_list","GET"));
		$("#periodFrequency").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/appraisal_assignment/frequency_list","GET"));
		$(".app_url_hidden").show();
		
		
		$("#appraisalLevel").change(function(){
			$("#organization").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/dashboard/org_list","POST",{"appraisal_level":$("#appraisalLevel").val()}));
			});
		$("#periodFrequency").change(function(){
			dropDrowPeriodFn($(this).val(),$("#assignFrequency").val());
		});
		$("#assignFrequency").change(function(){
			dropDrowPeriodFn($("#periodFrequency").val(),$(this).val())
		});
		$("#assignFrequency").change();
		$("#appraisalType").change(function(){
			if($("#appraisalType").val() == "2"){

				//$("#position").removeAttr('disabled');
				$("#empName,#Position").removeAttr('disabled');
				//$('#appraisalLevel').val($('#apprasiaLevel option:first-child').val());
				//$('#appraisalLevel').change();
				//$('#organization').val($('#organization option:first-child').val());
				$("#apprasiaLevel").attr("disabled", 'disabled');
			
			}else if($("#appraisalType").val() == "1"){
				//$("#position").attr("disabled", 'disabled');
				$("#empName,#Position").attr("disabled", 'disabled');
				//$("#appraisalLevel").removeAttr('disabled');
				$("#empName,#empName_id,#Position,#Position_id").val("");
			
				
			}
		});
		
		
		
		
		
		
		
		//binding tooltip start
		 $('[data-toggle="tooltip"]').css({"cursor":"pointer"});
		 $('[data-toggle="tooltip"]').tooltip({
			 html:true
		 });
		//binding tooltip end
		 $(".lfr-hudcrumbs").removeClass("lfr-hudcrumbs");
		 
		 
	 }
 });