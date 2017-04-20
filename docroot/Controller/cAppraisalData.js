//Global variable
var galbalDataAppData=[];
var tempAppItemName="";
var tempAppItemId="";
var tempEmpName="";
var tempEmpId="";  
var pageNumberDefault=1;
var restfulPathAppData="/tyw_api/public/appraisal_data";
 
var restfulPathDropDownStructure=restfulPathAppData+"/structure_list";
var restfulPathDropDownAppraisalLevel=restfulPathAppData+"/al_list";
var restfulPathDropDownAppraisalType=restfulPathAppData+"/appraisal_type_list";
var restfulPathDropDownPeriod=restfulPathAppData+"/period_list";


var restfulPathAutocompleteAppraisalItem=restfulPathAppData+"/auto_appraisal_item";
var restfulPathAutocompleteEmployeeName=restfulPathAppData+"/auto_emp_name";


//------------------- GetData FN Start ---------------------
var getDataFn = function(page,rpp){
	var structure= $("#param_structure").val();
	var app_lv= $("#param_app_lv").val();
	var app_type= $("#param_app_type").val();
	var app_item= $("#param_app_item").val();
	var period= $("#param_period").val();
	var emp_code= $("#param_emp_code").val();
	$.ajax({
		url : restfulURL+restfulPathAppData,
		type : "get",
		dataType : "json",
		data:{"page":page,"rpp":rpp,
			
			"structure_id":structure,
			"appraisal_level_id":app_lv,
			"appraisal_type_id":app_type,
			"appraisal_item_id":app_item,
			"period_id":period,
			"emp_code":emp_code
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,// w8 data 
		success : function(data) {
			
			listAppraisalDataFn(data['data']);
			//total
			galbalDataAppData=data;
			paginationSetUpFn(galbalDataAppData['current_page'],galbalDataAppData['last_page'],galbalDataAppData['last_page']);
		}
	});
	
	
};

//------------------- GetData FN END ---------------------

//------------------- Search Appraisal Data FN Start ---------------------

var searchAdvanceFn = function (Structure,AppLv,AppItem,Period,EmpName,app_type) {
	//embed parameter start
	
	var htmlParam="";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_structure' name='param_structure' value='"+Structure+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_app_lv' name='param_app_lv' value='"+AppLv+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_app_type' name='param_app_type' value='"+app_type+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_app_item' name='param_app_item' value='"+AppItem+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_period' name='param_period' value='"+Period+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_emp_code' name='param_emp_code' value='"+EmpName+"'>";
	$(".paramEmbed").remove();
	$("body").append(htmlParam);
	//embed parameter end
	getDataFn(pageNumberDefault,$("#rpp").val());
	
}

//------------------- Search Appraisal Data FN END ---------------------

//------------------- List Appraisal Data FN Start ---------------------

var listAppraisalDataFn = function (data) {
	var htmlTable = "";
	$.each(data,function(index,indexEntry) {
		
		htmlTable += "<tr class='rowSearch'>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["appraisal_period_desc"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["structure_name"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["appraisal_type_name"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["appraisal_item_name"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["emp_code"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["emp_name"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["actual_value"]+ "</td>";
		htmlTable += "</tr>";
	});
	$("#listAppraisalData").html(htmlTable);
}

//------------------- List Appraisal Data FN END ---------------------

//-------------------  Drop Down List Structure FN Strart ---------------------

var dropDownListStructure = function(){
	var html="";
	
	
	html+="<select id=\"structure\" class=\"input span12 m-b-n\" data-toggle=\"tooltip\" title=\"Structure\" name=\"structure\">";
	html+="<option  selected value=''>All</option>";
	$.ajax ({
		url:restfulURL+restfulPathDropDownStructure,
		type:"get" ,
		dataType:"json" ,
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
			$.each(data,function(index,indexEntry){

					html+="<option  value="+indexEntry["structure_id"]+">"+indexEntry["structure_name"]+"</option>";	
		
			});	

		}
	});	
	html+="</select>";
	return html;
};
//-------------------  Drop Down List Structure FN END ---------------------


//-------------------  Drop Down List Appraisal Level FN Strart ---------------------

var dropDownListAppraisalLevel = function(){
	var html="";
	
	
	html+="<select id=\"app_lv\" class=\"input span12 m-b-n\" data-toggle=\"tooltip\" title=\"Appraisal Level\" name=\"app_lv\">";
	html+="<option  selected value=''>All</option>";
	$.ajax ({
		url:restfulURL+restfulPathDropDownAppraisalLevel ,
		type:"get" ,
		dataType:"json" ,
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
			$.each(data,function(index,indexEntry){

					html+="<option  value="+indexEntry["appraisal_level_id"]+">"+indexEntry["appraisal_level_name"]+"</option>";	
		
			});	

		}
	});	
	html+="</select>";
	return html;
};
//-------------------  Drop Down List Appraisal Level FN END ---------------------

//-------------------  Drop Down List Appraisal Type FN Strart ---------------------

var dropDownListAppraisalType = function(){
	var html="";
	
	
	html+="<select id=\"app_type\" class=\"input span12 m-b-n\" data-toggle=\"tooltip\" title=\"Appraisal Type\" name=\"app_type\">";
	
	$.ajax ({
		url:restfulURL+restfulPathDropDownAppraisalType ,
		type:"get" ,
		dataType:"json" ,
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
			$.each(data,function(index,indexEntry){

					html+="<option  value="+indexEntry["appraisal_type_id"]+">"+indexEntry["appraisal_type_name"]+"</option>";	
		
			});	

		}
	});	
	html+="</select>";
	return html;
};
//-------------------  Drop Down List Appraisal Type FN END ---------------------

//-------------------  Drop Down List Period FN Strart ---------------------

var dropDownListPeriod = function(){
	var html="";
	
	
	html+="<select id=\"period\" class=\"input span12 m-b-n\" data-toggle=\"tooltip\" title=\"Period\" name=\"period\">";
	//html+="<option  selected value=''>All</option>";
	$.ajax ({
		url:restfulURL+restfulPathDropDownPeriod,
		type:"get" ,
		dataType:"json" ,
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
			$.each(data,function(index,indexEntry){

					html+="<option  value="+indexEntry["period_id"]+">"+indexEntry["appraisal_period_desc"]+"</option>";	
		
			});	

		}
	});	
	html+="</select>";
	return html;
};
//-------------------  Drop Down List Appraisal Item FN END ---------------------

var listErrorFn =function(data){
	var errorData="";
	
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
		if(data[index]['errors']['period_id']!=undefined){
			errorData+="<font color='red'>*</font> "+data[index]['errors']['period_id']+"<br>";
		}
		if(data[index]['errors']['appraisal_item_id']!=undefined){
			errorData+="<font color='red'>*</font> "+data[index]['errors']['appraisal_item_id']+"<br>";
		}
		if(data[index]['errors']['data_value']!=undefined){
			errorData+="<font color='red'>*</font> "+data[index]['errors']['data_value']+"<br>";
		}
		
		
	});
	//alert(errorData);
	callFlashSlideInModal(errorData,"#information","error");
	//callFlashSlideInModal(errorData);
	
	/*return errorData;*/
}
$(document).ready(function() {
	// -------------------  Appraisal Data  ---------------------
	var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
	 	if(connectionServiceFn(username,password)==false){
	 		return false;
	 	}
	 }
	$("#appraisal_data_list_content").hide();
	$(".sr-only").hide();
	$("#drop_down_list_structure").html(dropDownListStructure());
	$("#drop_down_list_appraisal_level").html(dropDownListAppraisalLevel());
	$("#drop_down_list_appraisal_type").html(dropDownListAppraisalType());
	$("#drop_down_list_period").html(dropDownListPeriod());
	
	$("#app_item").val("");
	$("#emp_name").val("");
	$("#app_item_id").val("");
	$("#emp_name_id").val("");
	
	$("#countPaginationTop").val( $("#countPaginationTop option:first-child").val());
	$("#countPaginationBottom").val( $("#countPaginationBottom option:first-child").val());
	
	$("#btnSearchAdvance").click(function(){
		
		searchAdvanceFn(
				$("#structure").val(),
				$("#app_lv").val(),
				$("#app_item_id").val(),
				$("#period").val(),
				$("#emp_name_id").val()
				,$("#app_type").val()
		);
				
		$("#appraisal_data_list_content").show();
		return false;
	});
	//$("#btnSearchAdvance").click();
	
	
	//Autocomplete Search Position Start
	$("#app_item").autocomplete({
        source: function (request, response) {
        	$.ajax({
				 url:restfulURL+restfulPathAutocompleteAppraisalItem,
				 type:"post",
				 dataType:"json",
				 data:{
					 "structure_id":$("#structure").val(),
					 "appraisal_level_id":$("#app_item_id").val(),
					 "appraisal_item_name":request.term},
				//async:false,
				 headers:{Authorization:"Bearer "+tokenID.token},
                 error: function (xhr, textStatus, errorThrown) {
                        console.log('Error: ' + xhr.responseText);
                    },
				 success:function(data){
					  
						response($.map(data, function (item) {
                            return {
                                label: item.appraisal_item_name,
                                value: item.appraisal_item_name,
                                appraisal_item_id : item.appraisal_item_id
                                
                            };
                        }));
					
				},
				beforeSend:function(){
					$("body").mLoading('hide');	
				}
				
				});
        },
		select:function(event, ui) {
			$("#app_item").val(ui.item.value);
            $("#app_item_id").val(ui.item.appraisal_item_id);
            tempAppItemName = ui.item.label;
            tempAppItemId=ui.item.appraisal_item_id;
            return false;
        },change: function(e, ui) {  

 
			if ($("#app_item").val() == tempAppItemName) {
				$("#app_item_id").val(tempAppItemId);
			}  else if (ui.item != null){
				$("#app_item_id").val(ui.item.appraisal_item_id);
			}else {
				$("#app_item_id").val("");
			}
         }
    });
	

   
	//Autocomplete Search Position End
	

  //Auto Complete Employee Name end
	
	$("#emp_name").autocomplete({
		
        source: function (request, response) {
        	$.ajax({
				 url:restfulURL+restfulPathAutocompleteEmployeeName,
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
	
	
    // -------------------  Appraisal Data END ---------------------	
	
	//#### Call Export User Function Start ####
	$("#exportToExcel").click(function(){
		var paramStructure= $("#param_structure").val();
		var paramAppLv= $("#param_app_lv").val();
		var paramAppType= $("#param_app_type").val();
		var paramAppItem= $("#param_app_item").val();
		var paramPeriod= $("#param_period").val();
		var paramEmpCode= $("#param_emp_code").val();
		
		
		var param="";
		param+="&structure_id="+paramStructure;
		param+="&appraisal_level_id="+paramAppLv;
		param+="&appraisal_type_id="+paramAppType;
		param+="&appraisal_item_id="+paramAppItem;
		param+="&period_id="+paramPeriod;
		param+="&emp_code="+paramEmpCode;
		//alert(restfulURL+restfulPathCdsResult+"/export?token="+tokenID.token+""+param);
		$("form#formExportToExcel").attr("action",restfulURL+restfulPathAppData+"/export?token="+tokenID.token+""+param);
		$("form#formExportToExcel").submit();
	});
    //#### Call Export User Function End ####	
	//FILE IMPORT MOBILE START
	$("#btn_import").click(function () {
		$('#file').val("");
		$(".btnModalClose").click();
	});
	
	// Variable to store your files
	var files2;
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
			url:restfulURL+restfulPathAppData,
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
					$('#file').val("");
					$("body").mLoading('hide');
					$('#ModalImport').modal('hide');
					
				}else{
					listErrorFn(data['errors']);
					getDataFn($(".pagination .active").attr( "data-lp" ),$("#rpp").val());
					$('#file').val("");
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