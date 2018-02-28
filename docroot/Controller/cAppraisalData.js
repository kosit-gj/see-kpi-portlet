//Global variable
var galbalDataAppData=[];
var tempAppItemName="";
var tempAppItemId="";
var tempEmpName="";
var tempEmpId="";  
var galbalDataTemp = [];
var pageNumberDefault=1;
var restfulPathAppData="/"+serviceName+"/public/appraisal_data";
 
var restfulPathDropDownStructure=restfulPathAppData+"/structure_list";


var restfulPathDropDownPeriod=restfulPathAppData+"/period_list";


//var restfulPathAutocompleteAppraisalItem=restfulPathAppData+"/auto_appraisal_item";
//var restfulPathAutocompleteEmployeeName=restfulPathAppData+"/auto_emp_name";
//restfulPathCdsResult
var restfulPathCdsResult="/"+serviceName+"/public/cds_result";

var restfulPathDropDownYear=restfulPathCdsResult+"/year_list";
var restfulPathDropDownPeriod="/"+serviceName+"/public/dashboard/period_list";
var restfulPathDropDownAppraisalLevel=restfulPathCdsResult+"/al_list";
var restfulPathDropDownAppraisalType="/"+serviceName+"/public/appraisal_assignment/appraisal_type_list";
var restfulPathPositionAutocomplete=restfulPathCdsResult+"/auto_position_name";
var restfulPathEmployeeAutocomplete=restfulPathCdsResult+"/auto_emp_name";


//------------------- GetData FN Start ---------------------
var getDataFn = function(page,rpp){
	var year= $("#param_year").val();
	var period= $("#param_period").val();
	var app_lv= $("#param_app_lv").val();
	var app_lv_emp = $("#param_app_lv_emp").val();
	var app_type= $("#param_app_type").val();
	var org= $("#param_org_id").val();
	var position= $("#param_position_id").val();
	var emp_name= $("#param_emp_id").val();
	$.ajax({
		url : restfulURL+restfulPathAppData,
		type : "get",
		dataType : "json",
		data:{"page":page,"rpp":rpp,
			
			"current_appraisal_year":year,
			"period_id":period,
			"appraisal_type_id":app_type,
			"level_id":app_lv,
			"level_id_emp":app_lv_emp,
			"org_id":org,
			"position_id":position,
			"emp_id":emp_name	
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

var searchAdvanceFn = function (year,period,app_lv,app_lv_emp,app_type,org_id,position,emp_name) {
	//embed parameter start
	
	var htmlParam="";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_year' name='param_year' value='"+year+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_period' name='param_period' value='"+period+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_app_lv' name='param_app_lv' value='"+app_lv+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_app_lv_emp' name='param_app_lv_emp' value='"+app_lv_emp+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_app_type' name='param_app_type' value='"+app_type+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_org_id' name='param_org_id' value='"+org_id+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_position_id' name='param_position_id' value='"+position+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_emp_id' name='param_emp_id' value='"+emp_name+"'>";
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
		//htmlTable += "<td class='columnSearch'>"+ indexEntry["appraisal_period_desc"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["structure_name"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["item_name"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["emp_code"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["emp_name"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["appraisal_level_name"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["org_name"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["position_name"]+ "</td>";
		htmlTable += "<td class='columnSearch' style='text-align: right;padding-right: 10px;'>"+ addCommas(parseFloat(notNullFn(indexEntry["actual_value"])).toFixed(2))+ "</td>";
		htmlTable += "</tr>";//parseFloat().toLocaleString()
	});
	$("#listAppraisalData").html(htmlTable);
}

//------------------- List Appraisal Data FN END ---------------------
var addCommas =  function(nStr)
{
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}
//-------------------  Drop Down List Period FN Strart ---------------------

var dropDownListPeriod = function(){
	var html="";
	
	
	html+="<select id=\"period\" class=\"input span12 m-b-n\" data-toggle=\"tooltip\" title=\"Period\" name=\"period\">";
	//html+="<option  selected value=''>All</option>";
	$.ajax ({
		url:restfulURL+restfulPathDropDownPeriod ,
		type:"POST" ,
		data:{"appraisal_year":$("#year").val()},
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
//-------------------  Drop Down List Period FN END ---------------------

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
	//html+="<option  selected value=''>All Appraisal Level</option>";
	$.ajax ({
		//url:restfulURL+restfulPathDropDownAppraisalLevel,
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/al_list_org",
		type:"get" ,
		dataType:"json" ,
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		data:{"emp_code":session_emp_code},
		success:function(data){
				//galbalDqsRoleObj=data;
			$.each(data,function(index,indexEntry){

					html+="<option  value="+indexEntry["level_id"]+">"+indexEntry["appraisal_level_name"]+"</option>";	
		
			});	

		}
	});	
	html+="</select>";
	$("#app_lv").html(html);
	//return html;
};

var dropDownListEmpLevelFn = function(){
	//console.log(session_emp_code)
	var html="";
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/al_list_emp",
		type:"get",
		dataType:"json",
		async:false,
		data:{"emp_code":session_emp_code},
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			console.log(data);
			$.each(data,function(index,indexEntry){
				html+="<option value="+indexEntry['level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
			});
			$("#app_lv_emp").html(html);
		}
	});
}

var dropDownListEmpLevelToOrgFn = function(){
	$.ajax({
		//url:restfulURL+"/"+serviceName+"/public/appraisal_item/al_list",
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/al_list_emp_org",
		type:"get",
		dataType:"json",
		async:false,
		data:{"emp_code":session_emp_code,"level_id":$("#app_lv_emp").val()},
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			//console.log(data);
			var htmlOption="";
			$.each(data,function(index,indexEntry){
					htmlOption+="<option value="+indexEntry['level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
			});
			$("#app_lv").html(htmlOption);
		}
	});
}

//-------------------  Drop Down List Appraisal Type FN Strart ---------------------

var dropDownListAppraisalType = function(){
	var html="";
	html+="<select data-placement='top' id=\"app_type\" class=\"input span12 m-b-n\" data-toggle=\"tooltip\" title=\"Entity Type\" name=\"app_type\">";
	$.ajax ({
		url:restfulURL+restfulPathDropDownAppraisalType,
		type:"get" ,
		dataType:"json" ,
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
				//galbalDqsRoleObj=data;
			$.each(data,function(index,indexEntry){
				if(indexEntry["appraisal_type_id"]=2){
					html+="<option  value="+indexEntry["appraisal_type_id"]+">"+indexEntry["appraisal_type_name"]+"</option>";	
				}
					
			});	
		}
	});	
	html+="</select>";
	return html;
};

var dropDownListOrganization = function() {
	console.log("test")
	var service_url_Check;
	if($("#app_type").val()==1) {
		service_url_Check = "org";
	}
	else {
		service_url_Check = "org/list_org_for_emp";
	}
	
	var html="";
	html+="<select data-placement='top' id=\"org_id\" class=\"input span12 m-b-n\" name=\"org_id\">";
	html+="<option  selected value=''>All Organization</option>";
	$.ajax ({
		//url:restfulURL+"/"+serviceName+"/public/org",
		url:restfulURL+"/"+serviceName+"/public/"+service_url_Check+"",
		type:"get" ,
		dataType:"json" ,
		//data:{"level_id":$("#app_lv").val()},
		data:{"level_id":$("#app_lv").val(),"emp_code":session_emp_code,"level_id_emp":$("#app_lv_emp").val()},
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
				//galbalDqsRoleObj=data;
			$.each(data,function(index,indexEntry){
					html+="<option  value="+indexEntry["org_id"]+">"+indexEntry["org_name"]+"</option>";	
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
				errorData+="<font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font> Employee Code : null <i class='fa fa-level-down'></i><br>";
			}else{
				errorData+="<font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font> Employee Code : "+data[index]['employee_code']+" <i class='fa fa-level-down'></i><br>";}
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
		if(data[index]['errors']['item_id']!=undefined){
			errorData+="<font color='red'>*</font> "+data[index]['errors']['item_id']+"<br>";
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
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		 if(connectionServiceFn(username,password,plid)==false){
	 		return false;
	 	}
	 }

	$(".sr-only").hide();
	$("#org_name").val("");
	$("#position").val("");
	$("#emp_name").val("");
	$("#org_id").val("");
	$("#position_id").val("");
	$("#emp_name_id").val("");
	
	$(".sr-only").hide();
	$("#drop_down_list_year").html(dropDownListYear());
	$("#drop_down_list_period").html(dropDownListPeriod());
	$("#drop_down_list_appraisal_type").html(dropDownListAppraisalType());
	$("#countPaginationTop").val( $("#countPaginationTop option:first-child").val());
	$("#countPaginationBottom").val( $("#countPaginationBottom option:first-child").val());
	
	$("#year").change(function(){$("#drop_down_list_period").html(dropDownListPeriod());});
	$(".app_url_hidden").show();
	$("#btnSearchAdvance").click(function(){
		
		searchAdvanceFn(
				$("#year").val(),
				$("#period").val(),
				$("#app_lv").val(),
				$("#app_lv_emp").val(),
				$("#app_type").val(),
				$("#org_id").val(),
				$("#position_id").val(),
				$("#emp_name_id").val());
				
		$("#appraisal_data_list_content").show();
		return false;
	});
	//$("#btnSearchAdvance").click();
	
	
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
					 	"emp_name":($("#emp_id").val()==""?"":$("#emp_name").val().split("(")[0]),
					 	"org_id":$("#org_id").val()
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
	

   
	//Autocomplete Search Position End
	

  //Auto Complete Employee Name end
	
	$("#emp_name").autocomplete({
		
        source: function (request, response) {
        	$.ajax({
				 url:restfulURL+restfulPathEmployeeAutocomplete,
				 type:"post",
				 dataType:"json",
				 data:{
					 "emp_name":request.term,"emp_code":session_emp_code,"org_id":$("#org_id").val()},
				//async:false,
				 headers:{Authorization:"Bearer "+tokenID.token},
                 error: function (xhr, textStatus, errorThrown) {
                        console.log('Error: ' + xhr.responseText);
                    },
				 success:function(data){
					  	console.log(data)
						response($.map(data, function (item) {
                            return {
                                label: item.emp_name+"("+item.emp_code+")",
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
			$("#emp_name").val(ui.item.label);
            $("#emp_name_id").val(ui.item.emp_id);
            galbalDataTemp['emp_name'] = ui.item.label;
            galbalDataTemp['emp_id']=ui.item.emp_id;
            galbalDataTemp['emp_code']=ui.item.emp_code;
            empNameAutoCompelteChangeToPositionName(ui.item.value);
            return false;
        },change: function(e, ui) {  
			if ($("#emp_name").val() == galbalDataTemp['emp_name']) {
				$("#emp_name_id").val(galbalDataTemp['emp_id']);
			} else if (ui.item != null){
				$("#emp_name_id").val(ui.item.emp_id);
			} else {
				$("#emp_name_id").val("");
				
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
	
	$("#app_type").change(function(){
		if($("#app_type").val() == "2") {

			$("#app_lv_emp").removeAttr('disabled');
			$("#position").removeAttr('disabled');
			$("#emp_name").removeAttr('disabled');
			
			dropDownListEmpLevelFn();
			dropDownListEmpLevelToOrgFn();
			$("#drop_down_list_organization").html(dropDownListOrganization());
			
		}else if($("#app_type").val() == "1") {
			
			$("#app_lv_emp").attr("disabled", 'disabled');
			$("#position").attr("disabled", 'disabled');
			$("#emp_name").attr("disabled", 'disabled');
			$("#position").val("");
			$("#position_id").val("");
			$("#emp_name").val("");
			$("#emp_name_id").val("");
			$("#app_lv_emp").empty();
			
			dropDownListAppraisalLevel();
			$("#drop_down_list_organization").html(dropDownListOrganization());
			
		}
	});
	$("#app_type").change();
	
	$("#app_lv").change(function() {
		$("#drop_down_list_organization").html(dropDownListOrganization());
	});
	
	$("#app_lv_emp").change(function() {
		dropDownListEmpLevelToOrgFn();
		$("#drop_down_list_organization").html(dropDownListOrganization());
	});
	
	
    // -------------------  Appraisal Data END ---------------------	
	
	//#### Call Export User Function Start ####
	$("#exportToExcel").click(function(){
//		var paramStructure= $("#structure").val();
//		var paramAppLv= $("#app_lv").val();
//		var paramAppType= $("#app_type").val();
//		var paramAppItem= $("#app_item_id").val();
//		var paramPeriod= $("#period").val();
//		var paramEmpCode= $("#emp_name_id").val();
//		
//		
//		var param="";
//		param+="&structure_id="+paramStructure;
//		param+="&level_id="+paramAppLv;
//		param+="&appraisal_type_id="+paramAppType;
//		param+="&item_id="+paramAppItem;
//		param+="&period_id="+paramPeriod;
//		param+="&emp_id="+paramEmpCode;
		var paramYear=$("#year").val();
		var paramPeriod=$("#period").val();
		var paramAppLv=$("#app_lv").val();
		var paramAppLvEmp=$("#app_lv_emp").val();
		var paramAppType= $("#app_type").val();
		var paramQrg= $("#org_id").val();
		var paramPositionCode=$("#position_id").val();
		var paramEmpCode=$("#emp_name_id").val();

		
		var param="";
		param+="&current_appraisal_year="+paramYear;
		param+="&period_id="+paramPeriod;
		param+="&level_id="+paramAppLv;
		param+="&level_id_emp="+paramAppLvEmp;
		param+="&appraisal_type_id="+paramAppType;
		param+="&org_id="+paramQrg;
		param+="&position_id="+paramPositionCode;
		param+="&emp_id="+paramEmpCode;
		//alert(restfulURL+restfulPathCdsResult+"/export?token="+tokenID.token+""+param);
		$("form#formExportToExcel").attr("action",restfulURL+restfulPathAppData+"/export?token="+tokenID.token+""+param);
		$("form#formExportToExcel").submit();
	});
    //#### Call Export User Function End ####	
	//FILE IMPORT MOBILE START
	$("#btn_import").click(function () {
		$('#file').val("");
		$(".btnModalClose").click();
		$(".dropify-clear").click();
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
	$('form#fileAppraisalData').on('submit', uploadFiles);

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