 var restfulPathDashboard="/"+serviceName+"/public/cds_result";
 var galbalDashboard=[];
 var galbalDataTemp = [];
 var changeAutocomplete=true;
 galbalDataTemp['galbalOrg'] = [];
 
//# Generate Drop Down List
 var generateDropDownList = function(url,type,request,initValue,initValue2){
 	var html="";
 	
 	if(initValue!=undefined){
 		html+="<option value='All'>"+initValue+"</option>";
	}
 	
 	if(initValue2!=undefined){
 		html+="<option value='Unassign'>"+initValue2+"</option>";
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
 
 
 var getDataFn = function() {
		var year= $("#param_year").val();
		var period= $("#param_period").val();
		var app_type= $("#param_app_type").val();
		var emp= $("#param_emp").val();

		var app_lv= $("#param_app_lv").val();
		var org= $("#param_org_id").val();
		var app_lv_org= $("#param_app_lv_org").val();
		var status= $("#param_status").val();
		var output_type = $("#param_output").val();
		
		if(org=='null') {
			callFlashSlide(Liferay.Language.get("organization-is-require"));
			return false;
		}
		
		var parameter = {
				param_year: year,
				param_period: period,
				param_emp_level: app_lv,
				param_org_level: app_lv_org,
				param_org_id: org,
				param_status: status
		}
		var data = JSON.stringify(parameter);
		
		//-- set report lacale name --//
		var templateName = "report-data-entry-status";
		var currentLocale = $("#user_locale").val();
		if(typeof currentLocale !== 'undefined'){
			templateName = templateName+"_"+currentLocale;
		}
		
		//$('#iFrame_report').attr('src',url_report_jasper);
		var url_report_jasper = restfulURL+"/"+serviceName+"/public/generate?template_name="+templateName+"&token="+tokenID.token+"&template_format="+output_type+"&used_connection=1&inline=1&data="+data;
		
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			window.open(url_report_jasper,"_blank");
		 } else {
			 $('#iFrame_report').attr('src',url_report_jasper);
		 }
};

 
 var searchAdvanceFn = function (year,period,app_lv,org,app_lv_org,status,output) {
	//embed parameter start
		
		var htmlParam="";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_year' 	name='param_year' 		value='"+year+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_period' 	name='param_period' 	value='"+period+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_app_type' name='param_app_type' 	value='1'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_app_lv' 	name='param_app_lv' 	value='"+app_lv+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_org_id' 	name='param_org_id' 	value='"+org+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_app_lv_org' 	name='param_app_lv_org' 	value='"+app_lv_org+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_status' 	name='param_status' 	value='"+status+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_output' 	name='param_output' 	value='"+output+"'>";
		$(".paramEmbed").remove();
		$("form#linkParam").append(htmlParam);
		//embed parameter end
		getDataFn();
};
 


var listDashBoardFn = function(data){
	 $("#txtTopic").html(data['header']);
	 generateChartBubbleFn(data);
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
	 $("#next , #previous").off("click");
	 $("#next , #previous").on("click",function() {
		 $("#param_kpi_id").val($(this).attr("data-"+this.id));
		 $("#kpi").val($(this).attr("data-"+this.id));
		 getDataFn();
		 return false;
	});
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
			searchAdvanceFn(
					$("#year").val(),
					$("#period").val(),
					$("#apprasiaLevel").val(),
					$("#organization").val(),
					$("#apprasiaLevelOrg").val(),
					$("#status").val(),
					$("#output_type").val()
					);
			$("#listSubordinate").show();
			return false;
		});
		
		//Generate DropDown List
		$("#year").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/appraisal/year_list_assignment","GET"));
		$("#period").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/dashboard/period_list","POST",{"appraisal_year":$("#year").val()}));
		$("#app_type").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/appraisal_assignment/appraisal_type_list","GET"));
		$("#apprasiaLevel").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/report/al_list_emp","GET","","All Emp level"));
		$("#apprasiaLevelOrg").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/report/al_list_org","GET",{"level_id":$("#apprasiaLevel").val()},"All Org Level"));
		$("#organization").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/report/org_list","get",{"appraisal_level":$("#apprasiaLevelOrg").val()}));
		$("#status").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/report/status_list","GET",{},"All Status","Unassign"));
		$("#organization").multiselect({minWidth:'100%;'}).multiselectfilter();
		
		//#Change Param Function
		$("#year").change(function(){$("#period").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/dashboard/period_list","POST",{"appraisal_year":$("#year").val()}));});
		$("#apprasiaLevel").change(function(){$("#apprasiaLevelOrg").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/report/al_list_org","get",{"level_id":$("#apprasiaLevel").val()},"All Org Level"));$("#apprasiaLevelOrg").change(); $("#organization").multiselect('refresh').multiselectfilter(); });
		$("#apprasiaLevelOrg").change(function(){$("#organization").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/report/org_list","get",{"appraisal_level":$("#apprasiaLevelOrg").val()})); /*$("#organization").change();*/ $("#organization").multiselect('refresh').multiselectfilter(); });
		//$("#organization").change(function(){console.log("organization change");$("#kpi").html((generateDropDownList(restfulURL+"/"+serviceName+"/public/dashboard/kpi_list","POST",{"appraisal_level":$("#apprasiaLevel").val(),"org_id":$("#organization").val(),"emp_id":$("#emp_name_id").val(),"appraisal_type_id":1})));});
		
		$(".app_url_hidden").show();

		
		//binding tooltip start
		 $('[data-toggle="tooltip"]').css({"cursor":"pointer"});
		 $('[data-toggle="tooltip"]').tooltip({
			 html:true
		 });
		//binding tooltip end
		 $(".lfr-hudcrumbs").removeClass("lfr-hudcrumbs");
		 
		 $("#output_type").change(function(){
				$('#iFrame_report').attr('src','');
		});
		 
		 
	 }
 });