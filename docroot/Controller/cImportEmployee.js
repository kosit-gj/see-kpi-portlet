//Global variable
var galbalDataImportEmp=[];

var tempEmpName="";
var tempEmpID="";
var tempPosiName="";
var tempPosiID="";
var pageNumberDefault=1;
var restfulPathImportEmployee="/tyw_api/public/import_employee";
var restfulPathRole="/tyw_api/public/import_employee/role_list";

var restfulPathDropDownDepartment="/tyw_api/public/import_employee/dep_list";
var restfulPathDropDownSection="/tyw_api/public/import_employee/sec_list";

var restfulPathPositionAutocomplete="/tyw_api/public/import_employee/auto_position_name";
var restfulPathEmployeeAutocomplete="/tyw_api/public/import_employee/auto_employee_name";

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

var listErrorFn =function(data){
	var errorData="";
	
	$.each(data,function(index,indexEntry){

		
		if(data[index]['employee_code']!= undefined || data[index]['employee_code']==null){
			if(data[index]['employee_code']== null){//The employee code field is null
				errorData+="<font color='red'>*</font> employee code : null ↓<br>";
			}else{
				errorData+="<font color='red'>*</font> employee code : "+data[index]['employee_code']+"  ↓<br>";}
		}
		if(data[index]['errors']['working_start_date_yyyy_mm_dd']!=undefined){
			errorData+="<font color='red'>*</font> "+data[index]['errors']['working_start_date_yyyy_mm_dd']+"<br>";
		}
		if(data[index]['errors']['probation_end_date_yyyy_mm_dd']!=undefined){
			errorData+="<font color='red'>*</font> "+data[index]['errors']['probation_end_date_yyyy_mm_dd']+"<br>";
		}
		if(data[index]['errors']['acting_end_date_yyyy_mm_dd']!=undefined){
			errorData+="<font color='red'>*</font> "+data[index]['errors']['probation_end_date_yyyy_mm_dd']+"<br>";
		}
		if(data[index]['errors']['salary_amount']!=undefined){
			errorData+="<font color='red'>*</font> "+data[index]['errors']['salary_amount']+"<br>";
		}
		if(data[index]['errors']['email']!=undefined){
			errorData+="<font color='red'>*</font> "+data[index]['errors']['email']+"<br>";
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
	$("#from_department_code").val("");
	$("#from_department_name").val("");
	$("#from_section_code").val("");
	$("#from_section_name").val("");
	$("#from_position_code").val("");
	$("#from_position_name").val("");
	$("#from_position_group").val("");
	$("#from_sup_emp_code").val("");
	$("#from_emp_email").val("");
	$("#from_emp_salary").val("");
	$("#from_emp_erp_user").val("");
	
	$("#from_checkboxIs_corporate_kpi").prop("checked",false);
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
	var department= $("#param_Department").val();
	var section= $("#param_Section").val();
	var position= $("#param_Position").val();
	var empName= $("#param_EmpName").val();
	$.ajax({
		url : restfulURL+restfulPathImportEmployee,
		type : "get",
		dataType : "json",
		data:{"page":page,"rpp":rpp,
			"department_code":department,
			"section_code":section,
			"position_code":position,
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
				$("#from_emp_wsd").val(data['working_start_date']);
				$("#from_emp_ped").val(data['probation_end_date']);
				$("#from_emp_aed").val(data['acting_end_date']);
				$("#from_department_code").val(data['department_code']);
				$("#from_department_name").val(data['department_name']);
				$("#from_section_code").val(data['section_code']);
				$("#from_section_name").val(data['section_name']);
				$("#from_position_code").val(data['position_code']);
				$("#from_position_name").val(data['position_name']);
				$("#from_position_group").val(data['position_group']);
				$("#from_sup_emp_code").val(data['chief_emp_code']);
				$("#from_emp_email").val(data['email']);
				$("#from_emp_salary").val(data['s_amount']);
				$("#from_emp_erp_user").val(data['erp_user']);
				$("#from_emp_type").val(data['emp_type']);
				
				//isCorporateKPI
				if(data['is_coporate_kpi']==1){
					$('#from_checkboxIs_corporate_kpi').prop('checked', true);
				}else{
					$('#from_checkboxIs_corporate_kpi').prop('checked', false);
				}
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
//-------- findOneRole
var findOneRoleFn = function(id,txtFrom) {
	$.ajax({
		url:restfulURL+restfulPathImportEmployee+"/"+id+"/role",
		type : "get",
		dataType : "json",
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {		


			$.each(data,function(index,indexEntry) {
				//console.log();
				if (indexEntry["role_active"]=="1"){
					$("#form_role_item-"+indexEntry["appraisal_level_id"]).prop("checked",true);				
				}else if (indexEntry["role_active"]=="0"){
					$("#form_role_item-"+indexEntry["appraisal_level_id"]).prop("checked",false);
				}

			});
			
								
		}
	});
};
//--------- findOne




//-------- SearchFn Start
var searchAdvanceFn = function (Department,Section,Position,EmployeeName) {
	//embed parameter start
	var htmlParam="";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_Department' name='param_Department' value='"+Department+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_Section' name='param_Section' value='"+Section+"'>";
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
	//alert("listCommonDataSetFn");
	//clear ฟังก์ชัน  data ข้อมูลเก่าทิ้ง 
	$("#listEmployee").empty();
	var htmlAppraisalLevel= "";
	var htmlTable = "";
//	var IsSQL ="";
//	var IsActive ="";
	$.each(data,function(index,indexEntry) {
		//console.log();
//		if (indexEntry["IsActive"]=="1"){
//			IsActive = "<input disabled type='checkbox' name='is_active' id='is_active' checked value='1'>";
//		}else if (indexEntry["IsActive"]=="0"){
//			IsActive = "<input disabled type='checkbox' name='is_active' id='is_active'  value='0'>";
//		}
		$.each(indexEntry["appraisal_level"],function(index,indexEntry){
			htmlAppraisalLevel+=indexEntry["appraisal_level_name"]+"<br>";
		});
		htmlTable += "<tr class='rowSearch'>";
		htmlTable += "<td id=\"objectCenter\" class='objectCenter 'style=\"\">"+"<input  style=\"margin-bottom: 3px;\"type=\"checkbox\"  class='selectEmpCheckbox' id=kpiCheckbox-"+indexEntry["emp_code"]+" value=\""+indexEntry["emp_code"]+"\">"+ "</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+ indexEntry["emp_code"]+ "</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+ indexEntry["emp_name"]+ "</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+indexEntry["department_name"]+"</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+indexEntry["section_name"]+"</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+indexEntry["position_name"]+"</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+indexEntry["position_group"]+"</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+indexEntry["chief_emp_code"]+"</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+htmlAppraisalLevel+"</td>";
		//htmlTable += "<td class='objectCenter'>"+IsActive+"</td>";
		//<button class='btn btn-primary btn-xs btn-gear role' id="+ indexEntry["_id"]+ " data-target=#ModalRole data-toggle='modal'>Ruld</button>&nbsp;
		//&lt;button class='btn btn-primary btn-xs btn-gear add' id=1 data-target=#ModalRole data-toggle='modal'&gt;Role&lt;/button&gt;
		htmlTable += "<td id=\"objectCenter\" style=\"vertical-align: middle;\"><i class=\"fa fa-cog font-gear popover-edit-del\" data-trigger=\"focus\" tabindex=\""+index+"\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\" " +
				"<button class='btn btn-primary btn-xs btn-gear role' id="+ indexEntry["emp_code"]+ " data-target=#ModalRole data-toggle='modal'>Role</button>&nbsp;" +
				"<button class='btn btn-warning btn-xs btn-gear edit' id="+ indexEntry["emp_code"]+ " data-target=#ModalEditEmp data-toggle='modal'>Edit</button>&nbsp;" +
		        "<button id="+indexEntry["emp_code"]+" class='btn btn-danger btn-xs btn-gear del'>Delete</button>\"></i></td>";
		htmlTable += "</tr>";
		
		htmlAppraisalLevel="";
	});
	
	//alert("ผ่าน");
	$("#listEmployee").html(htmlTable);
	
	//function popover
	$(".popover-edit-del").popover();
	
	
	$("#tableEmployee").off("click",".popover-edit-del");
	$("#tableEmployee").on("click",".popover-edit-del",function(){
			$(".role").on("click",function(){
				$("#txtAssignEmpName").show();
				$(this).parent().parent().parent().children().click();
				$("#from_role_emp_name").html($(this).parent().parent().parent().prev().prev().prev().prev().prev().prev().prev().text());
				//listAppraisalLevel();
				findOneRoleFn(this.id);
				$("#id").val(this.id);
				$("#action").val("edit");
				//Number Only Text Fields.
				
				
				
				
			});
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
					    	 $("#confrimModal").modal('hide');
					    	 callFlashSlide(data['data'],"error");
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
	$.ajax ({
		url:restfulURL+restfulPathRole ,
		type:"get" ,
		dataType:"json" ,
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
			
			$.each(data,function(index,indexEntry){
				htmlTable+="<tr>";
				htmlTable+="<td>";
				htmlTable+="<input  style=\"margin-bottom: 2px;\" id=\"form_role_item-"+indexEntry["appraisal_level_id"]+"\" class=\"from_data_role\"";
				htmlTable+="type='checkbox' value=\""+indexEntry["appraisal_level_id"]+"\">";
				htmlTable+="</td>";
				htmlTable+="<td style=\"vertical-align:middle\">"+indexEntry["appraisal_level_name"]+"</td>";
				htmlTable+="</tr>";
					
//				}		
			});	
//			htmlTable+="<tr>";
//			htmlTable+="<td>";
//			htmlTable+="<div class=\"checkbox m-l-sm\">";
//			htmlTable+="<input style=\"margin-top:1px;\" id=\"form_role_item_all\" class=\"from_data_role\"";
//			htmlTable+="type='checkbox' value=\all\"> <label> </label>";
//			htmlTable+="</div>";
//			htmlTable+="</td>";
//			htmlTable+="<td style=\"vertical-align:middle\">ทุกระดับ</td>";
//			htmlTable+="</tr>";

		}
	});	
	$("#formListRuld").html(htmlTable);
}


// --------  ListData  End


//-------- Update Start
var updateFn = function () {


	var isCorporateKpi = "";
	var isActive="";
	//isCorporateKpi
	if($("#from_checkboxIs_corporate_kpi:checked").is(":checked")){
		isCorporateKpi="1";
	}else{
		isCorporateKpi="0";
	}
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
			"department_code":$("#from_department_code").val(),
			"department_name":$("#from_department_name").val(),
			"section_code":$("#from_section_code").val(),
			"section_name":$("#from_section_name").val(),
			"position_code":$("#from_position_code").val(),
			"position_name":$("#from_position_name").val(),
			"position_group":$("#from_position_group").val(),
			"chief_emp_code":$("#from_sup_emp_code").val(),
			"email":$("#from_emp_email").val(),
			"s_amount":$("#from_emp_salary").val(),
			"erp_user":$("#erp_user").val(),
			"emp_type":$("#from_emp_type").val(),
			"is_coporate_kpi":isCorporateKpi ,
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
	var emp =[];
	var role = [];
	$.each($(".selectEmpCheckbox").get(),function(index,indexEntry){
		if($(indexEntry).is(":checked")){
			emp.push($(indexEntry).val());
		}
	});
	$.each($(".from_data_role").get(),function(index,indexEntry){
		if($(indexEntry).is(":checked")){
			role.push($(indexEntry).val());
		}
	});
	
		$.ajax({
			url : restfulURL+restfulPathImportEmployee+"/role",
			type : "PATCH",
			dataType : "json",
			headers:{Authorization:"Bearer "+tokenID.token},
			async:false,
			data:{"employees":emp,"roles":role},
			success : function(data) {
				if(data['status']==200){
					callFlashSlide("Add Role Successfully.");
					getDataFn($("#pageNumber").val(),$("#rpp").val());
					$('#ModalRole').modal('hide');
					
				}
			}
		});
	
	return false;
}
// -------- Update Role End

//-------- Update Role Start
var updateRoleFn = function () {

		var role = [];
		$.each($(".from_data_role").get(),function(index,indexEntry){
			if($(indexEntry).is(":checked")){
				role.push($(indexEntry).val());
			}
			
			
		});
		
			$.ajax({
				url : restfulURL +restfulPathImportEmployee+"/"+$("#id").val()+"/role",
				type : "PATCH",
				dataType : "json",
				headers:{Authorization:"Bearer "+tokenID.token},
				async:false,
				data:{"roles":role},
				success : function(data) {
					if(data['status']==200){
						clearFn();
						callFlashSlide("Update Role Successfully.");
						getDataFn($("#pageNumber").val(),$("#rpp").val());
						$('#ModalRole').modal('hide');
						
					}
				}
			});



	return false;
}
// -------- Update Role End



//DropDownList Department
var dropDownListDepartment = function(){
	var html="";
	html+="<select data-toggle=\"tooltip\" title=\"Department\" class=\"input span12 m-b-n\" id=\"search_department\" name=\"search_department\" >";
	html+="<option  selected value=''>All</option>";
	$.ajax ({
		url:restfulURL+restfulPathDropDownDepartment ,
		type:"get" ,
		dataType:"json" ,
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
			$.each(data,function(index,indexEntry){
//				if(id==indexEntry["txtConnection_id"]){
//					html+="<option  value="+indexEntry["department_code"]+">"+indexEntry["department_name"]+"</option>";			
//				}else{
					html+="<option  value="+indexEntry["department_code"]+">"+indexEntry["department_name"]+"</option>";	
//				}		
			});	

		}
	});	
	html+="</select>";
	return html;
};

//DropDownList Section
var dropDownListSection = function(id){
	var html="";
	html+="<select data-toggle=\"tooltip\" title=\"Section\" class=\"input span12 m-b-n\" id=\"search_section\" name=\"search_section\" >";
	
	html+="<option  selected value=''>All</option>";
	$.ajax ({
		url:restfulURL+restfulPathDropDownSection ,
		type:"get" ,
		dataType:"json" ,
		data : {"department_code":id},
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
				//galbalDqsRoleObj=data;
			$.each(data,function(index,indexEntry){
//				if(id==indexEntry["section_code"]){
//					html+="<option  value="+indexEntry["section_code"]+">"+indexEntry["section_name"]+"</option>";			
//				}else{
					html+="<option  value="+indexEntry["section_code"]+">"+indexEntry["section_name"]+"</option>";	
//				}		
			});	

		}
	});	
	html+="</select>";
	return html;
};
//DropDownList Emp Type
var dropDownEmpType = function(){
	var html="";
	html+="<select data-toggle=\"tooltip\" title=\"Employee Type\" class=\"input span12 m-b-n\" id=\"from_emp_type\" name=\"from_emp_type\" >";
	
	
	html+="<option value=\"รายวัน\" selected>รายวัน</option>";
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
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
	 	if(connectionServiceFn(username,password)==false){
	 		return false;
	 	}
	 }
	$("#search_position").val("");
	$("#search_position_id").val("");
	$("#search_emp_name").val("");
	$("#search_emp_id").val("");
	

	$("#countPaginationTop").val( $("#countPaginationTop option:first-child").val());
	$("#countPaginationBottom").val( $("#countPaginationBottom option:first-child").val());
	
	$("#employee_list_content").hide();
	$(".sr-only").hide();
	$("#drop_down_department").html(dropDownListDepartment());
	$("#drop_down_section").html(dropDownListSection($("#search_department").val()));
	$("#drop_down_department").change(function () {
		$("#drop_down_section").html(dropDownListSection($("#search_department").val()));
	});
	
	$("#btnSearchAdvance").click(function(){
		
		searchAdvanceFn(
				$("#search_department").val(),
				$("#search_section").val(),
				//$("#search_position").val().split("-", 1),
				$("#search_position_id").val(),
				//$("#search_emp_name").val().split("-", 1)search_emp_id
				$("#search_emp_id").val()
				);
		$("#employee_list_content").show();
		
		return false;
	});
	listAppraisalLevel();
	//$("#btnSearchAdvance").click();
	
	$("#btn_add_role").click(function() {
		clearFn();
		$("#txtAssignEmpName").hide();

		//listAppraisalLevel();
		
//		$("#form_role_item_all").change(function(){  //"select all" change 
//		    $(".from_data_role").prop('checked', $(this).prop("checked")); //change all ".from_data_role" checked status
//		});
//		
//		//".from_data_role" change 
//		$('.from_data_role').change(function(){ 
//		    //uncheck "select all", if one of the listed from_data_role item is unchecked
//		    if(false == $(this).prop("checked")){ //if this item is unchecked
//		        $("#form_role_item_all").prop('checked', false); //change "select all" checked status to false
//		    }
//		    //check "select all" if all from_data_role items are checked
//		    if ($('.from_data_role:checked').length == $('.from_data_role').length ){
//		        $("#form_role_item_all").prop('checked', true);
//		    }
//		});   
		 
	});  
    $(".from_data_role").click(function(){  // เมื่อคลิก checkbox  ใดๆ  
        if($(this).prop("checked")==true){ // ตรวจสอบ property  การ ของ   
            var indexObj=$(this).index(".from_data_role"); //   
            $(".from_data_role").not(":eq("+indexObj+")").prop( "checked", false ); // ยกเลิกการคลิก รายการอื่น  
        }  
    });  
	$("#btnEmpSubmit").click(function(){
		if ($("#action").val() == "add"|| $("#action").val() == "") {
			//insertFn();
			insertFn();
		}else{
			updateFn();
		}
		return false;
	});
	
	$("#btnRoldSubmit").click(function(){
		if ($("#action").val() == "add"|| $("#action").val() == "") {
			insertRoleFn();
		} else {
			updateRoleFn();
		}
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
				 type:"GET",
				 dataType:"json",
				 data:{
					 "department_code":$("#search_department").val(),
					 "section_code":$("#search_section").val(),
					 "position_name":request.term},
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
                                position_code:item.position_code
                            };
                        }));
					
				},
				beforeSend:function(){
					$("body").mLoading('hide');	
				}
				
				});
        },
		select:function(event, ui) {
			$("#search_position").val(ui.item.value);
            $("#search_position_id").val(ui.item.position_code);
            tempPosiName = ui.item.value;
            tempPosiId=ui.item.position_code;
            return false;
        },change: function(e, ui) {  
        	//alert($("#search_position").val() +"-----"+tempPosiName+"-----"+tempPosiId);
			if ($("#search_position").val() == tempPosiName) {
				$("#search_position_id").val(tempPosiId);
			} else if (ui.item != null) {
				$("#search_position_id").val(ui.item.position_code);
			} else {
				$("#search_position_id").val("");
			}
        	
         }
    });
   
	//Autocomplete Search Position End
	

  //Auto Complete Employee Name end
	
	$("#search_emp_name").autocomplete({
        source: function (request, response) {
        	$.ajax({
				 url:restfulURL+restfulPathEmployeeAutocomplete,
				 type:"GET",
				 dataType:"json",
				 data:{
					 "department_code":$("#search_department").val(),
					 "section_code":$("#search_section").val(),
					 "position_code":$("#search_position_id").val(),
					 "emp_name":request.term},
				//async:false,
				 headers:{Authorization:"Bearer "+tokenID.token},
                 error: function (xhr, textStatus, errorThrown) {
                        console.log('Error: ' + xhr.responseText);
                    },
				 success:function(data){
					  
						response($.map(data, function (item) {
                            return {
                                label: item.emp_name,
                                value: item.emp_name,
                                emp_code:item.emp_code
                            };
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
            tempEmpName = ui.item.value;
            tempEmpId=ui.item.emp_code;
            return false;
        },change: function(e, ui) {  
			if ($("#search_emp_name").val() == tempEmpName) {
				$("#search_emp_id").val(tempEmpId);
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
//	$("#exportToExcel").click(function(){
//		$("form#formExportToExcel").attr("action",restfulURL+"/dqs_api/public/dqs_user/export?token="+tokenID.token);
//		
//
// 		
//		$("#export_employee_Code").val($("#").val());
//		$("#export_cds_id").val($("#").val());
//		$("#export_cds_name").val($("#").val());
//		$("#export_year").val($("#").val());
//		$("#export_Month").val($("#").val());
//		$("#export_cds_Value").val($("#").val());
//		
//		$("form#formExportToExcel").submit();
//	});
    //#### Call Export User Function End ####
	
	
	
	$(".numberOnly").keydown(function (e) {
		        // Allow: backspace, delete, tab, escape, enter and .
			
		        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
		             // Allow: Ctrl+A, Command+A
		            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
		             // Allow: home, end, left, right, down, up
		            (e.keyCode >= 35 && e.keyCode <= 40)) {
		                 // let it happen, don't do anything
		                 return;
		        }
		        // Ensure that it is a number and stop the keypress
		        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
		            e.preventDefault();
		        }
		});
	
	
	//FILE IMPORT MOBILE START
	$("#btn_import").click(function () {
		$('#file').val("");
		$(".btnModalClose").click();
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
				
				console.log(data);
				if(data['status']==200 && data['errors'].length==0){
							
					callFlashSlide("Import Employee Successfully");
					getDataFn($(".pagination .active").attr( "data-lp" ),$("#rpp").val());
					$("body").mLoading('hide');
					$('#ModalImport').modal('hide');
					
				}else{
					listErrorFn(data['errors']);
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
	

		


    
	
});