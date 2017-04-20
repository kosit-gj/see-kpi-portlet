//Global variable
var galbalDataCDSResult=[];
var tempEmpName="";
var tempEmpId="";
var tempPosiName="";
var tempPosiId="";
var pageNumberDefault=1;
var restfulPathCdsResult="/tyw_api/public/cds_result";

var restfulPathDropDownYear=restfulPathCdsResult+"/year_list";
var restfulPathDropDownMonth=restfulPathCdsResult+"/month_list";
var restfulPathDropDownAppraisalLevel=restfulPathCdsResult+"/al_list";

var restfulPathPositionAutocomplete=restfulPathCdsResult+"/auto_position_name";
var restfulPathEmployeeAutocomplete=restfulPathCdsResult+"/auto_emp_name";



//------------------- GetData FN Start ---------------------
var getDataFn = function(page,rpp){
	var year= $("#param_year").val();
	var month= $("#param_month").val();
	var app_lv= $("#param_app_lv").val();
	var position= $("#param_position_code").val();
	var emp_name= $("#param_emp_code").val();
	$.ajax({
		url : restfulURL+restfulPathCdsResult,
		type : "get",
		dataType : "json",
		data:{"page":page,"rpp":rpp,
			"current_appraisal_year":year,
			"month_id":month,
			"appraisal_level_id":app_lv,
			"position_code":position,
			"emp_code":emp_name		
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,// w8 data 
		success : function(data) {
			
			listCdsResultFn(data['data']);
			galbalDataCDSResult=data;
			paginationSetUpFn(galbalDataCDSResult['current_page'],galbalDataCDSResult['last_page'],galbalDataCDSResult['last_page']);
		}
	});
	
	
};

//------------------- GetData FN END ---------------------

//-------------------  Appraisal Data FN ---------------------
var searchAdvanceFn = function (year,month,app_lv,position,emp_name) {
//embed parameter start
	
	var htmlParam="";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_year' name='param_year' value='"+year+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_month' name='param_month' value='"+month+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_app_lv' name='param_app_lv' value='"+app_lv+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_position_code' name='param_position_code' value='"+position+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_emp_code' name='param_emp_code' value='"+emp_name+"'>";
	$(".paramEmbed").remove();
	$("body").append(htmlParam);
	//embed parameter end
	getDataFn(pageNumberDefault,$("#rpp").val());
}

var listCdsResultFn = function (data) {
	var htmlTable = "";
	$.each(data,function(index,indexEntry) {
// 		console.log(indexEntry["period"]+indexEntry["structure"]
// 		+indexEntry["appraisal_level"]+indexEntry["appraisal_item"]);
	
		htmlTable += "<tr class='rowSearch'>";//cds_result_id
		htmlTable += "<td class='columnSearch'>"+ indexEntry["emp_code"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["emp_name"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["appraisal_level_name"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["cds_id"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["cds_name"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["appraisal_year"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["month_name"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["cds_value"]+ "</td>";
		htmlTable += "</tr>";
	});
	$("#listCdsResult").html(htmlTable);
}

//-------------------  Appraisal Data FN END ---------------------


//-------------------  Drop Down List Month FN Strart ---------------------

var dropDownListMonth = function(){
	var html="";
	
	
	html+="<select id=\"month\" class=\"input span12 m-b-n\" data-toggle=\"tooltip\" title=\"Month\" name=\"month\">";
	//html+="<option  selected value=''>All</option>";
	$.ajax ({
		url:restfulURL+restfulPathDropDownMonth ,
		type:"get" ,
		dataType:"json" ,
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
			$.each(data,function(index,indexEntry){

					html+="<option  value="+indexEntry["month_id"]+">"+indexEntry["month_name"]+"</option>";	
		
			});	

		}
	});	
	html+="</select>";
	return html;
};
//-------------------  Drop Down List Month FN END ---------------------

//-------------------  Drop Down List Year FN Strart ---------------------

var dropDownListYear = function(){
	var html="";
	
	
	html+="<select id=\"year\" class=\"input span12 m-b-n\" data-toggle=\"tooltip\" title=\"Year\" name=\"year\">";
	//html+="<option  selected value=''>All</option>";
	$.ajax ({
		url:restfulURL+restfulPathDropDownYear ,
		type:"get" ,
		dataType:"json" ,
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
				//galbalDqsRoleObj=data;
			$.each(data,function(index,indexEntry){

					html+="<option  value="+indexEntry["current_appraisal_year"]+">"+indexEntry["current_appraisal_year"]+"</option>";	
		
			});	

		}
	});	
	html+="</select>";
	return html;
};
//-------------------  Drop Down List Year FN END ---------------------

//-------------------  Drop Down List Appraisal Level FN Strart ---------------------

var dropDownListAppraisalLevel = function(){
	var html="";
	
	
	html+="<select id=\"app_lv\" class=\"input span12 m-b-n\" data-toggle=\"tooltip\" title=\"Appraisal Level\" name=\"app_lv\">";
	html+="<option  selected value=''>All</option>";
	$.ajax ({
		url:restfulURL+restfulPathDropDownAppraisalLevel,
		type:"get" ,
		dataType:"json" ,
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
				//galbalDqsRoleObj=data;
			$.each(data,function(index,indexEntry){

					html+="<option  value="+indexEntry["appraisal_level_id"]+">"+indexEntry["appraisal_level_name"]+"</option>";	
		
			});	

		}
	});	
	html+="</select>";
	return html;
};
var listErrorFn =function(data){
	var errorData="";
	//alert(data['errors'] instanceof  Array);
		$.each(data,function(index,indexEntry){	
		if(data[index]['employee_code']!= undefined || data[index]['employee_code']==null){
			if(data[index]['employee_code']== null){//The employee code field is null
				errorData+="<font color='red'>*</font> employee code : null ↓<br>";
			}else{
				errorData+="<font color='red'>*</font> employee code : "+data[index]['employee_code']+"  ↓<br>";}
		}
		
		if(typeof data[index]['errors'] != 'object'){
			errorData+="<font color='red'>*</font> "+data[index]['errors']+"<br>";
		}
		if(data[index]['errors']['employee_code']!=undefined){
			errorData+="<font color='red'>*</font> "+data[index]['errors']['employee_code']+"<br>";
		}
		if(data[index]['errors']['cds_id']!=undefined){
			errorData+="<font color='red'>*</font> "+data[index]['errors']['cds_id']+"<br>";
		}
		if(data[index]['errors']['year']!=undefined){
			errorData+="<font color='red'>*</font> "+data[index]['errors']['year']+"<br>";
		}
		if(data[index]['errors']['month']!=undefined){
			errorData+="<font color='red'>*</font> "+data[index]['errors']['month']+"<br>";
		}
		if(data[index]['errors']['cds_value']!=undefined){
			errorData+="<font color='red'>*</font> "+data[index]['errors']['cds_value']+"<br>";
		}
		
		
	});

	//alert(errorData);
	//callFlashSlideInModal(errorData);
	callFlashSlideInModal(errorData,"#information","error");
	/*return errorData;*/
}
//-------------------  Drop Down List Appraisal Level FN END ---------------------

$(document).ready(function() {
	var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
	 	if(connectionServiceFn(username,password)==false){
	 		return false;
	 	}
	 }
	$("#position").val("");
	$("#emp_name").val("");
	$("#position_id").val("");
	$("#emp_name_id").val("");
	
	$("#cds_result_list_content").hide();
	$(".sr-only").hide();
	$("#drop_down_list_year").html(dropDownListYear());
	$("#drop_down_list_month").html(dropDownListMonth());
	$("#drop_down_list_appraisal_level").html(dropDownListAppraisalLevel());
	
	$("#countPaginationTop").val( $("#countPaginationTop option:first-child").val());
	$("#countPaginationBottom").val( $("#countPaginationBottom option:first-child").val());
	
	$("#btnSearchAdvance").click(function(){

	
		searchAdvanceFn(
				$("#year").val(),
				$("#month").val(),
				$("#app_lv").val(),
				$("#position_id").val(),
				$("#emp_name_id").val());
		$("#cds_result_list_content").show();
		return false;
	});
	//$("#btnSearchAdvance").click();
	
	//Autocomplete Search Position Start
	$("#position").autocomplete({
        source: function (request, response) {
        	$.ajax({
				 url:restfulURL+restfulPathPositionAutocomplete,
				 type:"post",
				 dataType:"json",
				 data:{
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
                                position_code : item.position_code
                                
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
            $("#position_id").val(ui.item.position_code);
            tempPosiName = ui.item.label;
            tempPosiId=ui.item.position_code;
            return false;
        },change: function(e, ui) {  

 
			if ($("#position").val() == tempPosiName) {
				$("#position_id").val(tempPosiId);
			}  else if (ui.item != null){
				$("#position_id").val(ui.item.position_code);
			}else {
				$("#position_id").val("");
			}
         }
    });
	

   
	//Autocomplete Search Position End
	

  //Auto Complete Employee Name end
	
	$("#emp_name").autocomplete({
		
        source: function (request, response) {
        	$.ajax({
				 url:restfulURL+restfulPathEmployeeAutocomplete,
				 type:"post",
				 dataType:"json",
				 data:{
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
			$("#emp_name").val(ui.item.value);
            $("#emp_name_id").val(ui.item.emp_code);
            tempEmpName = ui.item.value;
            tempEmpId=ui.item.emp_code;
            return false;
        },change: function(e, ui) {  
			if ($("#emp_name").val() == tempEmpName) {
				$("#emp_name_id").val(tempEmpId);
			} else if (ui.item != null){
				$("#emp_name_id").val(ui.item.emp_code);
			} else {
				$("#emp_name_id").val("");
				
			}
        	
         }
    });
    
  //Auto Complete Employee Name end
	
	
	
	
	
	
	//#### Call Export User Function Start ####
	$("#exportToExcel").click(function(){
		var paramYear=$("#param_year").val();
		var paramMonth=$("#param_month").val();
		var paramAppLv=$("#param_app_lv").val();
		var paramPositionCode=$("#param_position_code").val();
		var paramEmpCode=$("#param_emp_code").val();

		
		var param="";
		param+="&current_appraisal_year="+paramYear;
		param+="&month_id="+paramMonth;
		param+="&appraisal_level_id="+paramAppLv;
		param+="&position_code="+paramPositionCode;
		param+="&emp_code="+paramEmpCode;
		//alert(restfulURL+restfulPathCdsResult+"/export?token="+tokenID.token+""+param);
		$("form#formExportToExcel").attr("action",restfulURL+restfulPathCdsResult+"/export?token="+tokenID.token+""+param);
		$("form#formExportToExcel").submit();
	});
    //#### Call Export User Function End ####
	
	//FILE IMPORT MOBILE START
	$("#btn_import").click(function () {
		$('#file').val("");
		$(".btnModalClose").click();
	});
	
	// Variable to store your files
	var files;
	// Add events
	$('#file').on('change', prepareUpload2);

	// Grab the files and set them to our variable
	function prepareUpload2(event)
	{
	  files = event.target.files;
	}
	$('form#fileImportCdsResult').on('submit', uploadFiles);

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
			url:restfulURL+restfulPathCdsResult,
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
							
					callFlashSlide("Import CDS Result Successfully");
					getDataFn($(".pagination .active").attr( "data-lp" ),$("#rpp").val());
					$("body").mLoading('hide');
					$('#file').val("");
					$('#ModalImport').modal('hide');
					
				}else{
					listErrorFn(data['errors']);
					$('#file').val("");
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

