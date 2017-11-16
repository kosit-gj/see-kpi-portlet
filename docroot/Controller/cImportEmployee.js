var restfulPathImportEmployee="/"+serviceName+"/public/import_employee";
var restfulPathAppraisalLevel="/"+serviceName+"/public/appraisal_level";
var restfulPathDropDownOrganization="/"+serviceName+"/public/org";
var restfulPathPositionAutocomplete="/"+serviceName+"/public/position/auto";
var restfulPathEmployeeAutocomplete="/"+serviceName+"/public/import_employee/auto_employee_name";
//Global variable
var galbalDataImportEmp=[];
var galbalDataTemp = [];
var pageNumberDefault=1;

//Check Validation Start
var validationFn = function(data){

	var validate = "";
	var count = 0;
	$.each(data['data'], function(index, indexEntry) {

		if (index != undefined) {
			if (count == 0) {
				validate += "<font color='red'>* </font>" + indexEntry + "";
			} else {
				validate += "<br><font color='red'>* </font> " + indexEntry + " ";
			}
		}

		count++;
	});
	
	callFlashSlideInModal(validate,"#information2","error");
	//callFlashSlideInModal(validate);
};

//Check Validation Edd
var validateFileFn = function(data){
	var validateFile="";

	$.each(data,function(index,indexEntry){
		if(indexEntry[Object.keys(indexEntry)[0]]!= undefined || indexEntry[Object.keys(indexEntry)[0]]==null){
		
			if(indexEntry[Object.keys(indexEntry)[0]]== null){//The employee code field is null
				validateFile+="<font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font> "+Object.keys(indexEntry)[0]+" : null <i class='fa fa-level-down'></i><br>";
			}else{
				validateFile+="<font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font> "+Object.keys(indexEntry)[0]+": "+indexEntry[Object.keys(indexEntry)[0]]+" <i class='fa fa-level-down'></i><br>";
			}
			if(indexEntry['errors']!=null || indexEntry['errors']!=undefined || indexEntry['errors']!=""){
				validateFile+="<font color='red'>&emsp;*</font> "+indexEntry['errors']+"<br>";
			}
		}
		 
//	     $.each(indexEntry['errors'],function(index2,indexEntry2){
//	    	 console.log("test4");
//	    	 //validateFile+="<font color='red'>&emsp;*</font> "+indexEntry2+"<br>";
//	     });
	 
	});
	callFlashSlideInModal(validateFile,"#informationFile","error");
}
var listErrorFn =function(data){
	var errorData="";
	
	$.each(data,function(index,indexEntry){



		if(data[index]['employee_code']!= undefined || data[index]['employee_code']==null){
			if(data[index]['employee_code']== null){//The employee code field is null
				errorData+="<font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font> Employee Code : null <i class='fa fa-level-down'></i><br>";
			}else{
				errorData+="<font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font> Employee Code : "+data[index]['employee_code']+" <i class='fa fa-level-down'></i><br>";}
		}
	    if(data[index]['errors']['level_id']!=undefined){
				errorData+="<font color='red'>&emsp;*</font> "+data[index]['errors']['level_id']+"<br>";
		}
		if(data[index]['errors']['working_start_date_yyyy_mm_dd']!=undefined){
			errorData+="<font color='red'>&emsp;*</font> "+data[index]['errors']['working_start_date_yyyy_mm_dd']+"<br>";
		}
		if(data[index]['errors']['probation_end_date_yyyy_mm_dd']!=undefined){
			errorData+="<font color='red'>&emsp;*</font> "+data[index]['errors']['probation_end_date_yyyy_mm_dd']+"<br>";
		}
		if(data[index]['errors']['acting_end_date_yyyy_mm_dd']!=undefined){
			errorData+="<font color='red'>&emsp;*</font> "+data[index]['errors']['probation_end_date_yyyy_mm_dd']+"<br>";
		}
		if(data[index]['errors']['org_id']!=undefined){
			errorData+="<font color='red'>&emsp;*</font> "+data[index]['errors']['org_id']+"<br>";
		}
		if(data[index]['errors']['position_id']!=undefined){
			errorData+="<font color='red'>&emsp;*</font> "+data[index]['errors']['position_id']+"<br>";
		}
		if(data[index]['errors']['chief_employee_code']!=undefined){
			errorData+="<font color='red'>&emsp;*</font> "+data[index]['errors']['chief_employee_code']+"<br>";
		}
		if(data[index]['errors']['salary_amount']!=undefined){
			errorData+="<font color='red'>&emsp;*</font> "+data[index]['errors']['salary_amount']+"<br>";
		}
		if(data[index]['errors']['email']!=undefined){
			errorData+="<font color='red'>&emsp;*</font> "+data[index]['errors']['email']+"<br>";
		}
		if(data[index]['errors']['employee_type']!=undefined){
			errorData+="<font color='red'>&emsp;*</font> "+data[index]['errors']['employee_type']+"<br>";
		}		
		

	});
	
	
	
	//alert(errorData);
	callFlashSlideInModal(errorData,"#information","error");
	//callFlashSlideInModal(errorData);
	/*return errorData;*/
}

//--------  Clear Start 
var clearFn = function() {
	
	
	
	$("#from_emp_code").val("");
	$("#from_emp_name").val("");
	$("#from_emp_wsd").val("");
	$("#from_emp_ped").val("");
	$("#from_emp_aed").val("");
	$("#from_org_id").val("");
	$("#from_org_name").val("");
	$("#from_Level_id").val("");
	$("#from_position_id").val("");
	$("#from_position_name").val("");
	$("#from_sup_emp_code").val("");
	$("#from_emp_email").val("");
	$("#from_emp_salary").val("");
	$("#from_emp_erp_user").val("");
	

	$("#from_checkboxIs_active").prop("checked",false);
	
	 $(".from_data_role").prop('checked', false); 
	 
	 $('#file').val("");

//	$("#txtSampleData").removeAttr("disabled");
	
	$("#action").val("add");
	$("#btnSubmit").val("Add");

}
//--------  Clear End

//--------  GetData Start
var getDataFn = function(page,rpp){
	var Organization= $("#param_Organization").val();
	var position= $("#param_Position").val();
	var empName= $("#param_EmpName").val();
	$.ajax({
		url : restfulURL+restfulPathImportEmployee,
		type : "get",
		dataType : "json",
		data:{"page":page,"rpp":rpp,
			"org_id":Organization,
			"position_id":position,
			"emp_code":empName
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,// w8 data 
		success : function(data) {
			
			listImportEmployeeFn(data['data']);
			//total
			galbalDataImportEmp=data;
			paginationSetUpFn(galbalDataImportEmp['current_page'],galbalDataImportEmp['last_page'],galbalDataImportEmp['last_page']);
		}
	});
	
	
};
//--------  GetData End


//-------- findOne
var findOneFn = function(id) {
	$.ajax({
		url:restfulURL+restfulPathImportEmployee+"/"+id,
		type : "get",
		dataType : "json",
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {		
			//alert(txtFrom + " Name : "+data['emp_name']);
			
				
				$("#from_emp_code").val(data['emp_code']);
				$("#from_emp_name").val(data['emp_name']);
				$("#from_Level_id").val(data['level_id']);
				$("#from_emp_wsd").val(data['working_start_date']);
				$("#from_emp_ped").val(data['probation_end_date']);
				$("#from_emp_aed").val(data['acting_end_date']);
				$("#from_org_id").val(data['org_id']);
				$("#from_position_id").val(data['position_id']);
				$("#from_position_name").val(data['position_name']);
				$("#from_sup_emp_code").val(data['chief_emp_code']);
				$("#from_emp_email").val(data['email']);
				$("#from_emp_salary").val(data['s_amount']);
				$("#from_emp_erp_user").val(data['erp_user']);
				$("#from_emp_type").val(data['emp_type']);

				
				//IsAction
				if(data['is_active']==1){
					$('#from_checkboxIs_active').prop('checked', true);
				}else{
					$('#from_checkboxIs_active').prop('checked', false);
				}		
								
		}
	});
};
//--------- findOne

//-------- SearchFn Start
var searchAdvanceFn = function (Organization,Position,EmployeeName) {
	//embed parameter start
	var htmlParam="";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_Organization' name='param_Organization' value='"+Organization+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_Position' name='param_Position' value='"+Position+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_EmpName' name='param_EmpName' value='"+EmployeeName+"'>";
	$(".paramEmbed").remove();
	$("body").append(htmlParam);
	//embed parameter end
	getDataFn(pageNumberDefault,$("#rpp").val());
	
	
}
// -------- SearchFn End


//--------  ListData  Start

var listImportEmployeeFn = function(data) {

	$("#listEmployee").empty();
	var htmlAppraisalLevel= "";
	var htmlTable = "";
	//console.log(data);
	$.each(data,function(index,indexEntry) {

//		$.each(indexEntry["appraisal_level"],function(index,indexEntry){
//			htmlAppraisalLevel+=indexEntry["appraisal_level_name"]+"<br>";
//		});
		htmlTable += "<tr class='rowSearch'>";
		htmlTable += "<td id=\"objectCenter\" class='objectCenter 'style=\"\">"+"<input  style=\"margin-bottom: 3px;\"type=\"checkbox\"  class='selectEmpCheckbox' id=kpiCheckbox-"+indexEntry["emp_code"]+" value=\""+indexEntry["emp_code"]+"\">"+ "</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+ indexEntry["emp_code"]+ "</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+ notNullTextFn(indexEntry["emp_name"])+ "</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+notNullTextFn(indexEntry["org_name"])+"</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+notNullTextFn(indexEntry["position_name"])+"</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+notNullTextFn(indexEntry["chief_emp_code"])+"</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+notNullTextFn(indexEntry["appraisal_level_name"])+"</td>";
		//htmlTable += "<td class='objectCenter'>"+IsActive+"</td>";
		//<button class='btn btn-primary btn-xs btn-gear role' id="+ indexEntry["_id"]+ " data-target=#ModalLevel data-toggle='modal'>Ruld</button>&nbsp;
		//&lt;button class='btn btn-primary btn-xs btn-gear add' id=1 data-target=#ModalLevel data-toggle='modal'&gt;Role&lt;/button&gt;
		htmlTable += "<td id=\"objectCenter\" style=\"vertical-align: middle;\"><i class=\"fa fa-cog font-gear popover-edit-del\" data-trigger=\"focus\" tabindex=\""+index+"\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\" " +
				//"<button class='btn btn-primary btn-xs btn-gear role' id="+ indexEntry["emp_id"]+ " data-target=#ModalLevel data-toggle='modal'>Role</button>&nbsp;" +
				"<button class='btn btn-warning btn-xs btn-gear edit' id="+ indexEntry["emp_code"]+ " data-target=#ModalEditEmp data-toggle='modal'>Edit</button>&nbsp;" +
		        "<button id="+indexEntry["emp_code"]+" class='btn btn-danger btn-xs btn-gear del'>Delete</button>\"></i></td>";
		htmlTable += "</tr>";
		
		htmlAppraisalLevel="";
	});

	$("#listEmployee").html(htmlTable);
	
	//function popover
	$(".popover-edit-del").popover();
	
	
	$("#tableEmployee").off("click",".popover-edit-del");
	$("#tableEmployee").on("click",".popover-edit-del",function(){
			$(".edit").on("click",function() {
			$(".btnModalClose").click();
			$(this).parent().parent().parent().children().click();
			dropDownEmpType();
			findOneFn(this.id);
			
			$("#from_emp_wsd").datepicker();
		    $("#from_emp_wsd").datepicker( "option", "dateFormat", "yy-mm-dd" );
		    $("#from_emp_ped").datepicker();
		    $("#from_emp_ped").datepicker( "option", "dateFormat", "yy-mm-dd" );
		    $("#from_emp_aed").datepicker();
		    $("#from_emp_aed").datepicker( "option", "dateFormat", "yy-mm-dd" );
		    $(".ui-datepicker").hide();
			
			$("#id").val(this.id);
			$("#action").val("edit");
			$("#btnSubmit").val("Edit");		
			
			
		});
		
		
		$(".del").on("click",function(){
			var id = this.id;
			$(this).parent().parent().parent().children().click();
			 
			$("#confrimModal").modal();
			$(document).off("click","#btnConfirmOK");
			$(document).on("click","#btnConfirmOK",function(){
			
				$.ajax({
					 url:restfulURL+restfulPathImportEmployee+"/"+id,
					 type : "delete",
					 dataType:"json",
					 async:false,
					 headers:{Authorization:"Bearer "+tokenID.token},
				     success:function(data){    
				    	 
					     if(data['status']==200){
					    	 
					       callFlashSlide("Delete Successfully.");
					       getDataFn($("#pageNumber").val(),$("#rpp").val());
					       clearFn();
					       $("#confrimModal").modal('hide');
					       
					     }else if (data['status'] == "400"){
					    	 callFlashSlideInModal(data['data'],"#inform_on_confirm","error");
					    	 //backToTopFn();
					    	}
					     	
					 }
				});
				
			});
			
		});	
		
	});
	
	
}

//------ List Appraisal Level Start
var listAppraisalLevel = function() {
	var htmlTable="";
	var htmlDropDown="";
	$.ajax ({
		url:restfulURL+restfulPathAppraisalLevel ,
		type:"get" ,
		dataType:"json" ,
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
			//console.log(data);
			htmlDropDown+="<option  value=''></option>";
			$.each(data,function(index,indexEntry){
				htmlTable+="<tr>";
				htmlTable+="<td>";
				htmlTable+="<input  style=\"margin-bottom: 2px;\" id=\"form_role_item-"+indexEntry["level_id"]+"\" class=\"from_data_role\"";
				htmlTable+="type='checkbox' value=\""+indexEntry["level_id"]+"\">";
				htmlTable+="</td>";
				htmlTable+="<td style=\"vertical-align:middle\">"+indexEntry["appraisal_level_name"]+"</td>";
				htmlTable+="</tr>";
				htmlDropDown+="<option  value="+indexEntry["level_id"]+">"+indexEntry["appraisal_level_name"]+"</option>";
//				}		
			});	
		}
	});	
	$("#formListAppraisalLevel").html(htmlTable);
	//console.log(htmlDropDown);
	$("#from_Level_id").html(htmlDropDown);
	
	 $(".from_data_role").click(function(){  // à¹€à¸¡à¸·à¹ˆà¸­à¸„à¸¥à¸´à¸� checkbox  à¹ƒà¸”à¹†  
	        if($(this).prop("checked")==true){ // à¸•à¸£à¸§à¸ˆà¸ªà¸­à¸š property  à¸�à¸²à¸£ à¸‚à¸­à¸‡   
	            var indexObj=$(this).index(".from_data_role"); //   
	            $(".from_data_role").not(":eq("+indexObj+")").prop( "checked", false ); // à¸¢à¸�à¹€à¸¥à¸´à¸�à¸�à¸²à¸£à¸„à¸¥à¸´à¸� à¸£à¸²à¸¢à¸�à¸²à¸£à¸­à¸·à¹ˆà¸™  
	        }  
	    });  
}


// --------  ListData  End


//-------- Update Start
var updateFn = function () {


	
	var isActive="";
	//IsAction
	if($("#from_checkboxIs_active:checked").is(":checked")){
		isActive="1";
	}else{
		isActive="0";
	}
	
	$.ajax({
		url:restfulURL+restfulPathImportEmployee+"/"+$("#id").val(),
		type : "PATCH",
		dataType : "json",
		headers:{Authorization:"Bearer "+tokenID.token},
		data : {
			"emp_code":$("#from_emp_code").val(),
			"emp_name":$("#from_emp_name").val(),
			"working_start_date":$("#from_emp_wsd").val(),
			"probation_end_date":$("#from_emp_ped").val(),
			"acting_end_date":$("#from_emp_aed").val(),
			"org_id":$("#from_org_id").val(),
			"level_id":$("#from_Level_id").val(),
			"position_id":$("#from_position_id").val(),
			"chief_emp_code":$("#from_sup_emp_code").val(),
			"email":$("#from_emp_email").val(),
			"s_amount":$("#from_emp_salary").val(),
			"erp_user":$("#from_emp_erp_user").val(),
			"emp_type":$("#from_emp_type").val(),
			"is_active":isActive
		},	
		success : function(data) {
			
			if (data['status'] == "200") {
				getDataFn($("#pageNumber").val(),$("#rpp").val());
				clearFn();
				$('#ModalEditEmp').modal('hide');
				callFlashSlide("Update Successfully.");
				
			}else if (data['status'] == "400") {
				
				validationFn(data);
			}
		}
	});
	return false;
}
// -------- Update End

//-------- Insert Role Start
var insertRoleFn = function () {
	var chackSelect =  false;
	var emp =[];
	var level = [];
	//console.log("insertRoleFn");
	$.each($(".selectEmpCheckbox").get(),function(index,indexEntry){
		if($(indexEntry).is(":checked")){
			emp.push($(indexEntry).val());
		}
	});
	//console.log("selectEmpCheckbox Pass");
	$.each($(".from_data_role").get(),function(index,indexEntry){
		if($(indexEntry).is(":checked")){
			level.push($(indexEntry).val());
			chackSelect = true;
		}
	});
	//console.log("from_data_role Pass");
	if (chackSelect == false){callFlashSlideInModal("<font color='red'>*</font> Please Select Appraisal level !!!","#information3"); return false;}
	//console.log("chackSelect Pass");
		$.ajax({
			url : restfulURL+restfulPathImportEmployee+"/role",
			type : "PATCH",
			dataType : "json",
			headers:{Authorization:"Bearer "+tokenID.token},
			async:false,
			data:{
				"employees"	:	emp,
				"roles"	:	level
				},
			success : function(data) {
				//console.log("ajax Pass");
				if(data['status']==200){
					callFlashSlide("Add Role Successfully.");
					getDataFn($("#pageNumber").val(),$("#rpp").val());
					$('#ModalLevel').modal('hide');
					
				}
			}
		});
	
	return false;
}
// -------- Update Role End

//DropDownList Organization
var dropDownListOrganization = function(param){
	var html="";
	if(param == 'All'){
		html+="<option  selected value=''>All Organization</option>";
	}else{
		html+="<option selected value=\"\" selected></option>";
	}
	$.ajax ({
		url:restfulURL+restfulPathDropDownOrganization ,
		type:"get" ,
		dataType:"json" ,
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
			$.each(data,function(index,indexEntry){
//				if(id==indexEntry["txtConnection_id"]){
//					html+="<option  value="+indexEntry["org_id"]+">"+indexEntry["org_name"]+"</option>";			
//				}else{
					html+="<option  value="+indexEntry["org_id"]+">"+indexEntry["org_name"]+"</option>";	
//				}		
			});	

		}
	});	

	return html;
};

//DropDownList Emp Type
var dropDownEmpType = function(){
	var html="";
	html+="<select data-toggle=\"tooltip\" title=\"Employee Type\" class=\"input span12 m-b-n\" id=\"from_emp_type\" name=\"from_emp_type\" >";
	html+="<option value=\"\" selected></option>";
	html+="<option value=\"รายวัน\" >รายวัน</option>";
	html+="<option value=\"รายเดือน\">รายเดือน</option>";
	html+="</select>";
	$("#drop_down_emp_typy").html(html);
};
var backToTopFn = function(){
	$('body,html').animate({
		scrollTop: 0
	}, 800);
	return false;
}

$(document).ready(function() {

	var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		 if(connectionServiceFn(username,password,plid)==false){
	 		return false;
	 	}
	 }
	$(".sr-only").hide();
	$("#search_position").val("");
	$("#search_position_id").val("");
	$("#search_emp_name").val("");
	$("#search_emp_id").val("");
	$("#search_org").html(dropDownListOrganization('All'));
	$("#from_org_id").html(dropDownListOrganization());
	listAppraisalLevel();

	$("#countPaginationTop").val( $("#countPaginationTop option:first-child").val());
	$("#countPaginationBottom").val( $("#countPaginationBottom option:first-child").val());




	$(".app_url_hidden").show();
	
	$("#btnSearchAdvance").click(function(){
		
		searchAdvanceFn(
				$("#search_org").val(),
				$("#search_position_id").val(),
				$("#search_emp_id").val()
				);
		$("#employee_list_content").show();
		
		return false;
	});
	
	//$("#btnSearchAdvance").click();
	
	$("#btn_assign_level").click(function() {
		clearFn();
		$("#txtAssignEmpName").hide();
		$(".btnModalClose").click();
		
		var chackSelect =  false;
		$.each($(".selectEmpCheckbox").get(),function(index,indexEntry){
			if($(indexEntry).is(":checked")){
				chackSelect = true;
				return false;
			}
		});
		if (chackSelect == true){
			listAppraisalLevel();
			
			$("#ModalLevel").modal();
			}
		else{
			callFlashSlide("Please Select Employee !!!");
		}

	});  
   
	$("#btnEmpSubmit").click(function(){
		updateFn();
		return false;
	});
	
	$("#btnLvSubmit").click(function(){
		insertRoleFn();
		return false;
	});


	
	
	
	
	
	$(".btnCancle").click(function() {
		clearFn();
	});
	$(".close").click(function() {
		clearFn();
	});
	
	//Autocomplete Search Position Start
	$("#search_position").autocomplete({
        source: function (request, response) {
        	$.ajax({
				 url:restfulURL+restfulPathPositionAutocomplete,
				 type:"POST",
				 dataType:"json",
				 data:{
					 "q":request.term},
				//async:false,
				 headers:{Authorization:"Bearer "+tokenID.token},
                 error: function (xhr, textStatus, errorThrown) {
                        //console.log('Error: ' + xhr.responseText);
                    },
				 success:function(data){
					  
						response($.map(data, function (item) {
							var dataSet = new Object();
							//autocomplete default values REQUIRED
							dataSet.label = item.position_name;
							dataSet.value = item.position_name;

                            //extend values
							dataSet.position_id = item.position_id;

							
                            return dataSet;
                        }));
					
				},
				beforeSend:function(){
					$("body").mLoading('hide');	
				}
				
				});
        },
		select:function(event, ui) {
			$("#search_position").val(ui.item.value);
            $("#search_position_id").val(ui.item.position_id);
            galbalDataTemp["search_position_name"]= ui.item.value;
            galbalDataTemp["search_position_id"]= ui.item.position_id;
            return false;
        },change: function(e, ui) {  
        	//alert($("#search_position").val() +"-----"+tempPosiName+"-----"+tempPosiId);
			if ($("#search_position").val() == galbalDataTemp["search_position_name"]) {
				$("#search_position_id").val(galbalDataTemp["search_position_id"]);
			} else if (ui.item != null) {
				$("#search_position_id").val(ui.item.position_id);
			} else {
				$("#search_position_id").val("");
			}
         }
    });
   
	//Autocomplete Search Position End
	
	//Autocomplete From Position Start
	$("#from_position_name").autocomplete({
        source: function (request, response) {
        	$.ajax({
				 url:restfulURL+restfulPathPositionAutocomplete,
				 type:"POST",
				 dataType:"json",
				 data:{
					 "q":request.term},
				//async:false,
				 headers:{Authorization:"Bearer "+tokenID.token},
                 error: function (xhr, textStatus, errorThrown) {
                        //console.log('Error: ' + xhr.responseText);
                    },
				 success:function(data){
					  
						response($.map(data, function (item) {
							var dataSet = new Object();
							//autocomplete default values REQUIRED
							dataSet.label = item.position_name;
							dataSet.value = item.position_name;

                            //extend values
							dataSet.position_id = item.position_id;

							
                            return dataSet;
                        }));
					
				},
				beforeSend:function(){
					$("body").mLoading('hide');	
				}
				
				});
        },
		select:function(event, ui) {
			$("#from_position_name").val(ui.item.value);
            $("#from_position_id").val(ui.item.position_id);
            galbalDataTemp["from_position_name"]= ui.item.value;
            galbalDataTemp["from_position_id"]= ui.item.position_id;

            return false;
        },change: function(e, ui) {  
        	//alert($("#search_position").val() +"-----"+tempPosiName+"-----"+tempPosiId);
			if ($("#from_position_name").val() == galbalDataTemp["from_position_name"]) {
				$("#from_position_id").val(galbalDataTemp["from_position_id"]);
			} else if (ui.item != null) {
				$("#from_position_id").val(ui.item.position_id);
			} else {
				$("#from_position_id").val("");
			}
        	
         }
    });
   
	//Autocomplete From Position End
	

  //Auto Complete Employee Name end
	
	$("#search_emp_name").autocomplete({
        source: function (request, response) {
        	$.ajax({
				 url:restfulURL+restfulPathEmployeeAutocomplete,
				 type:"POST",
				 dataType:"json",
				 data:{
					 "org_id":$("#search_org").val(),
					 "position_id":$("#search_position_id").val(),
					 "emp_name":request.term},
				//async:false,
				 headers:{Authorization:"Bearer "+tokenID.token},
                 error: function (xhr, textStatus, errorThrown) {
                        //console.log('Error: ' + xhr.responseText);
                    },
				 success:function(data){
					  
						response($.map(data, function (item) {
							var dataSet = new Object();
							//autocomplete default values REQUIRED
							dataSet.label = item.emp_name;
							dataSet.value = item.emp_name;

                            //extend values
							dataSet.emp_code = item.emp_code;

                            return dataSet;
                        }));
					
				},
				beforeSend:function(){
					$("body").mLoading('hide');	
				}
				
				});
        },
		select:function(event, ui) {
			$("#search_emp_name").val(ui.item.value);
            $("#search_emp_id").val(ui.item.emp_code);
            galbalDataTemp["search_emp_name"]= ui.item.value;
            galbalDataTemp["search_emp_id"]= ui.item.emp_code;

            return false;
        },change: function(e, ui) {  
			if ($("#search_emp_name").val() == galbalDataTemp["search_emp_name"]) {
				$("#search_emp_id").val(galbalDataTemp["search_emp_id"]);
			} else if (ui.item != null) {
				$("#search_emp_id").val(ui.item.emp_code);
			} else {
				$("#search_emp_id").val("");
			}
        	
         }
    });
    
  //Auto Complete Employee Name end
	
	$("#exportToExcel").click(function(){
		$("form#formExportToExcel").attr("action",$("#url_portlet").val()+"/file/import_employee_template.xlsx");
	});
	
	//#### Call Export User Function Start ####

	
	
	
	var getSelectionStart = function (o) {
		if (o.createTextRange) {
			var r = document.selection.createRange().duplicate()
			r.moveEnd('character', o.value.length)
			if (r.text == '') return o.value.length
			return o.value.lastIndexOf(r.text)
		} else return o.selectionStart
	};
	jQuery('.numberOnly').keypress(function (evt) { 
		 var charCode = (evt.which) ? evt.which : event.keyCode;
		 var number = this.value.split('.');
		 if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
		    return false;
		 }
		    //just one dot
		 if(number.length>1 && charCode == 46){
		    return false;
		 }
		    //get the carat position
		 var caratPos = getSelectionStart(this);
		 var dotPos = this.value.indexOf(".");
		 if( caratPos > dotPos && dotPos>-1 && (number[1].length > 1)){
		    return false;
		 }
		 return true;
	});
	
	
	//FILE IMPORT MOBILE START
	$("#btn_import").click(function () {
		$('#file').val("");
		$(".btnModalClose").click();
		$(".dropify-clear").click(); 
	});
//	$("#importFileMobile").click(function () {
//		$('#file').val("");
//	});
	// Variable to store your files
	var files;
	// Add events
	$('#file').on('change', prepareUpload2);

	// Grab the files and set them to our variable
	function prepareUpload2(event)
	{
	  files = event.target.files;
	}
	$('form#fileImportEmployee').on('submit', uploadFiles);

	// Catch the form submit and upload the files
	function uploadFiles(event)
	{
		
		event.stopPropagation(); // Stop stuff happening
		event.preventDefault(); // Totally stop stuff happening

		// START A LOADING SPINNER HERE

		// Create a formdata object and add the files
		var data = new FormData();
		$.each(files, function(key, value)
		{
			data.append(key, value);
		});
		$("body").mLoading();
		$.ajax({
			url:restfulURL+restfulPathImportEmployee,
			type: 'POST',
			data: data,
			cache: false,
			dataType: 'json',
			processData: false, // Don't process the files
			contentType: false, // Set content type to false as jQuery will tell the server its a query string request
			headers:{Authorization:"Bearer "+tokenID.token},
			success: function(data, textStatus, jqXHR)
			{
				
				//console.log(data);
				if(data['status']==200 && data['errors'].length==0){
							
					callFlashSlide("Import Employee Successfully");
					getDataFn($(".pagination .active").attr( "data-lp" ),$("#rpp").val());
					$("body").mLoading('hide');
					$('#ModalImport').modal('hide');
					
				}else{
					validateFileFn(data['errors']);
					getDataFn($(".pagination .active").attr( "data-lp" ),$("#rpp").val());
					$("body").mLoading('hide');
				}
			},
			error: function(jqXHR, textStatus, errorThrown)
			{
				// Handle errors here
				callFlashSlide('Format Error : ' + textStatus);
				// STOP LOADING SPINNER
			}
		});
		return false;
	}
	
	//binding tooltip start
	 $('[data-toggle="tooltip"]').css({"cursor":"pointer"});
	 $('[data-toggle="tooltip"]').tooltip({
		 html:true
	 });
	//binding tooltip end

     // Basic
     $('.dropify').dropify();

     // Translated
      $('.dropify-fr').dropify({
         messages: {
         	 'default': 'Glissez-dposez un fichier ici ou cliquez',
             replace: 'Glissez-dposez un fichier ou cliquez pour remplacer',
             remove:  'Supprimer',
             error:   'Dsol, le fichier trop volumineux'
         }
     });
	// Used events
     var drEvent = $('#input-file-events').dropify();

     drEvent.on('dropify.beforeClear', function(event, element){
         return confirm("Do you really want to delete \"" + element.file.name + "\" ?");
     });

     drEvent.on('dropify.afterClear', function(event, element){
         alert('File deleted');
     });

     drEvent.on('dropify.errors', function(event, element){
         console.log('Has Errors');
     });

     var drDestroy = $('#input-file-to-destroy').dropify();
     drDestroy = drDestroy.data('dropify');
     $('#toggleDropify').on('click', function(e){
         e.preventDefault();
         if (drDestroy.isDropified()) {
             drDestroy.destroy();
         } else {
             drDestroy.init();
         }
     });
		


    
	
});