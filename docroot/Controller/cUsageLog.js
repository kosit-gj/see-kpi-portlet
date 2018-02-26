//binding tooltip.
var golbalData=[];
var galbalDataTemp=[];
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});
var dropDrowOrgFn = function(appraisalLevelId){

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/org",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"level_id":appraisalLevelId},
		success:function(data){
			var htmlOption="";
			htmlOption+="<option value=''>All Organization</option>";
			$.each(data,function(index,indexEntry){
			
					htmlOption+="<option value="+indexEntry['org_id']+">"+indexEntry['org_name']+"</option>";
				
			});
			$("#organization").html(htmlOption);
		}
	});
}

var appraisalLevelListFn = function(nameArea,id){
	
	if(nameArea==undefined){
		nameArea="";
	}
	
	$.ajax({
		//url:restfulURL+"/"+serviceName+"/public/appraisal_item/al_list",
		url:restfulURL+"/"+serviceName+"/public/report/al_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			htmlOption+="<option  value=\"\">All Level</option>";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['level_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
					
				}
			});
			$("#appraisalLevel"+nameArea).html(htmlOption);
		}
	});
}
var appraisalTypeFn = function(nameArea,id){
	
	if(nameArea==undefined){
		nameArea="";
	}
	
	$.ajax({
		//http://192.168.1.52/"+serviceName+"/public/appraisal_assignment/appraisal_type_list
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/appraisal_type_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['appraisal_type_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['appraisal_type_id']+">"+indexEntry['appraisal_type_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['appraisal_type_id']+">"+indexEntry['appraisal_type_name']+"</option>";
					
				}
			});
			$("#appraisalType"+nameArea).html(htmlOption);
		}
	});
}


var listDataFn = function(data){
	
			 var htmlTable="";
			 $("#listMainUsageLog").empty();
			   $.each(data['data'],function(index,indexEntry){
				
				    htmlTable+="<tr>";
						htmlTable+="<td style='padding:0px;'>";
							htmlTable+="<div class=\"ibox float-e-margins\">";
								htmlTable+="<div class=\"ibox-title2\">";
									htmlTable+="<div class=\"titlePanel2\">"+index+" </div>";
								htmlTable+="</div>";
								htmlTable+="<div class=\"ibox-content\" style='padding: 0 0px 0px;'>";
								//SUB TABLE HERE..
								
								htmlTable+="<table class=\"table\">";
								htmlTable+="<thead>";
									htmlTable+="<tr  class=\"active\">";
										//htmlTable+="<th style='width:30px;'><b>No.</b></th>";
										htmlTable+="<th style='width:200px;'><b>Usage Date</b></th>";
										htmlTable+="<th style='width:100px;'><b>Employee Code</b></th>";
										htmlTable+="<th style='width:150px;'><b>Employee Name</b></th>";
										htmlTable+="<th style='width:200px;'><b>Organization</b></th>";
										htmlTable+="<th style='width:300px;'><b>Menu</b></th>";
										
										
									
										
									htmlTable+="</tr>";
								htmlTable+="</thead>";
									htmlTable+="<tbody>";
									//LOOP START
									
									var count=1;
									 $.each(indexEntry['items'],function(index2,indexEntry2){
										htmlTable+="<tr>";
											//htmlTable+="<td><div class='text-inline-table'>"+indexEntry2['row_number']+"</div></td>";
											htmlTable+="<td><div class='text-inline-table'>"+indexEntry2['created_dttm']+"</div></td>";
											htmlTable+=" <td><div class='text-inline-table'>"+indexEntry2['emp_code']+"</div></td>";
											htmlTable+="<td><div class='text-inline-table'>"+indexEntry2['emp_name']+"</div></td>";  
											htmlTable+="<td><div class='text-inline-table'>"+indexEntry2['org_name']+"  </div></td>";
											htmlTable+="<td><div class='text-inline-table'>"+indexEntry2['url']+"  </div></td>";
											
										htmlTable+="</tr>";
										count++;
									});
									//LOOP END
								htmlTable+="</tbody>";
							htmlTable+=" </table>";
		                       //SUB TABLE HERE..
							
								htmlTable+="</div>";
							htmlTable+="</div>";
						htmlTable+="</td>";
					htmlTable+="</tr>";
					
			   });
				
			  $("#listMainUsageLog").html(htmlTable);
			 setThemeColorFn(tokenID.theme_color);
			
			
			
	
};
var getDataFn = function(page,rpp){
	
	
	$.ajax({
		url : restfulURL+"/"+serviceName+"/public/report/usage_log",
		type : "get",
		dataType : "json",
		data:{"page":page,"rpp":rpp,
		
			/*
			 embed_appraisal_type_id
			 embed_emp_id
			 embed_position_id
			 embed_appraisal_level_id
			 embed_organization
			 embed_param_usage_start_date
			 embed_param_usage_end_date
			 */
			
			
			"usage_start_date":$("#embed_param_usage_start_date").val(),
			"usage_end_date":$("#embed_param_usage_end_date").val(),
			"emp_id":$("#embed_emp_id").val(),
			"position_id":$("#embed_position_id").val(),
			"level_id":$("#embed_appraisal_level_id").val(),
			"org_id":$("#embed_organization").val()
			
			
			},
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success : function(data) {
			//console.log(data);
			listDataFn(data);
			golbalData=data;
			paginationSetUpFn(golbalData['current_page'],golbalData['last_page'],golbalData['last_page']);
			$(".display_result").show();
			
		}
	});

	
};
var searchAdvance = function(){

	

	var Position= $("#position_id").val();//.split("-");
	//Position=Position[0];
	

	
	var empNameCode= $("#empName_id").val();//.split("-");
	//empNameCode=empNameCode[0];
	
	
	
	$(".embed_param_search").remove();
	

	
	
	var embedParam="";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_appraisal_type_id' name='embed_appraisal_type_id' value='"+$("#appraisalType").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_emp_id' name='embed_emp_id' value='"+empNameCode+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_position_id' name='embed_position_id' value='"+Position+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_appraisal_level_id' name='embed_appraisal_level_id' value='"+$("#appraisalLevel").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_organization' name='embed_organization' value='"+$("#organization").val()+"'>";
	embedParam+="<input type='hidden' id='embed_param_usage_start_date' name='embed_param_usage_start_date' class='embed_param_search' value='"+$("#usage_start_date").val()+"' >";
	embedParam+="<input type='hidden' id='embed_param_usage_end_date' name='embed_param_usage_end_date' class='embed_param_search' value='"+$("#usage_end_date").val()+"' >";

	
	
	$("#embedParamSearch").append(embedParam);
	
	//getDataFn();
	getDataFn(1,$("#rpp").val());
}



$(document).ready(function(){
	
	
	
var username = $('#user_portlet').val();
var password = $('#pass_portlet').val();
var plid = $('#plid_portlet').val();

if(connectionServiceFn(username,password,plid)==true){
	
	//SEARCH PARAM 
	appraisalTypeFn();
	appraisalLevelListFn();
	$("#appraisalLevel").change(function(){
		dropDrowOrgFn($(this).val());	
	});
	$("#appraisalLevel").change();
	
	

	$("#appraisalType").change(function(){
		if($("#appraisalType").val()==1){
			
			$("#position").prop("disabled",true);
			$("#empName").prop("disabled",true);
			
			$("#position").val("");
			$("#empName").val("");
			
		}else{
			$("#position").prop("disabled",false);
			$("#empName").prop("disabled",false);
		}
	});
	$("#appraisalType").change();
	
	$(".app_url_hidden").show();
	
	

	
	//Auto complete Start
	
//	$("#position").autocomplete({
//        source: function (request, response) {
//        	$.ajax({
//				 url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/auto_position_name",
//				 type:"post",
//				 dataType:"json",
//				 headers:{Authorization:"Bearer "+tokenID.token},
//				 data:{"position_name":request.term},
//				 //async:false,
//                 error: function (xhr, textStatus, errorThrown) {
//                        console.log('Error: ' + xhr.responseText);
//                    },
//				 success:function(data){
//						response($.map(data, function (item) {
//                            return {
//                                label: item.position_id+"-"+item.position_name,
//                                value: item.position_id+"-"+item.position_name
//                            };
//                        }));
//				},
//				beforeSend:function(){
//					$("body").mLoading('hide');	
//				}
//				
//				});
//        }
//    });
	//Autocomplete Search Position Start
	$("#position").autocomplete({
        source: function (request, response) {
        	$.ajax({
        		
        		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/auto_position_name2",
				type:"post",
				dataType:"json",
				async:false,
				headers:{Authorization:"Bearer "+tokenID.token},
				data:{"emp_code":request.term},
				 data:{
					 	"position_name":request.term ,
					 	"emp_name":($("#empName_id").val()==""?"":$("#empName").val().split("(")[0]),
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
	
//	$("#empName").autocomplete({
//        source: function (request, response) {
//        	$.ajax({
//				 url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/auto_employee_name",
//				 type:"post",
//				 dataType:"json",
//				 headers:{Authorization:"Bearer "+tokenID.token},
//				 data:{"emp_name":request.term},
//				 //async:false,
//                 error: function (xhr, textStatus, errorThrown) {
//                        console.log('Error: ' + xhr.responseText);
//                    },
//				 success:function(data){
//						response($.map(data, function (item) {
//                            return {
//                                label: item.emp_code+"-"+item.emp_name,
//                                value: item.emp_code+"-"+item.emp_name,
//                            };
//                        }));
//				},
//				beforeSend:function(){
//					$("body").mLoading('hide');	
//				}
//				
//				});
//        }
//    });
 //Auto Complete Employee Name end
	
	$("#empName").autocomplete({
		
        source: function (request, response) {
        	$.ajax({
				 url:restfulURL+"/"+serviceName+"/public/cds_result/auto_emp_name",
				 type:"post",
				 dataType:"json",
				 data:{
					 "emp_name":request.term,"emp_code":session_emp_code,"org_id":$("#organization").val()},
				//async:false,
				 headers:{Authorization:"Bearer "+tokenID.token},
                 error: function (xhr, textStatus, errorThrown) {
                        console.log('Error: ' + xhr.responseText);
                    },
				 success:function(data){
					  	console.log(data)
						response($.map(data, function (item) {
                            return {
                                label: item.emp_name,
                                value: item.emp_name,
                                emp_id: item.emp_id,
                                emp_code: item.emp_code
                            };
                        }));
					
				},
				beforeSend:function(){
					$("body").mLoading('hide');	
				}
				
				});
        },
		select:function(event, ui) {
			$("#empName").val(ui.item.value+"("+ui.item.emp_code+")");
            $("#empName_id").val(ui.item.emp_id);
            galbalDataTemp['empName'] = ui.item.value+"("+ui.item.emp_code+")";
            galbalDataTemp['empName_id']=ui.item.emp_id;
            galbalDataTemp['emp_code']=ui.item.emp_code;
            empNameAutoCompelteChangeToPositionName(ui.item.value);
            return false;
        },change: function(e, ui) {  
			if ($("#empName").val() == galbalDataTemp['empName']) {
				$("#empName_id").val(galbalDataTemp['empName_id']);
			} else if (ui.item != null){
				$("#empName_id").val(ui.item.emp_id);
			} else {
				$("#empName_id").val("");
				
			}
        	
         }
    });

	var empNameAutoCompelteChangeToPositionName = function(name) {

		
		
		$.ajax({
			url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/auto_position_name2",
			type:"post",
			dataType:"json",
			async:false,
			headers:{Authorization:"Bearer "+tokenID.token},
			data:{"emp_name":name},
			success:function(data){
				if(data.length!==0) {
					$("#position_id").val(data[0].position_id);
					$("#position").val(data[0].position_name);
					galbalDataTemp['position_name'] = data[0].position_name;
					galbalDataTemp['position_id'] = data[0].position_id;
				}
			}
		});
	}
    
  //Auto Complete Employee Name end
	
	
	//Auto Complete End
	
	
	//parameter date start
	$("#usage_start_date").datepicker();
    $("#usage_start_date").datepicker( "option", "dateFormat", "yy-mm-dd" );
    //$("#usage_start_date").val(firstDayInMonthFn());
    
    $("#usage_end_date").datepicker();
    $("#usage_end_date").datepicker( "option", "dateFormat", "yy-mm-dd" );
   // $("#usage_end_date").val(currentDateFn());
    
    $(".ui-datepicker").hide();
	//parameter date end
    
    $("#advanceSearchDisplay").show();

	
	
	//Search Data Here..
	$("#btnSearchAdvance").click(function(){
		searchAdvance();
		$(".display_result").show();
	});
	//$("#btnSearchAdvance").click();
	//Search Data Here..
	
	
	
	
	
}
});