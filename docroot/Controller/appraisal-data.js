//Global variable
var galbalDataAppData=[];
var tempAppItemName="";
var tempAppItemId="";
var tempEmpName="";
var tempEmpId="";

var restfulPathAppData="/"+serviceName+"/public/appraisal_data";

var restfulPathDropDownStructure=restfulPathAppData+"/structure_list";
var restfulPathDropDownAppraisalLevel=restfulPathAppData+"/al_list";
var restfulPathDropDownPeriod=restfulPathAppData+"/period_list";


var restfulPathAutocompleteAppraisalItem=restfulPathAppData+"/auto_appraisal_item";
var restfulPathAutocompleteEmployeeName=restfulPathAppData+"/auto_emp_name";

   
//------------------- GetData FN Start ---------------------
var getDataFn = function(page,rpp){
	var structure= $("#param_structure").val();
	var app_lv= $("#param_app_lv").val();
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

var searchAdvanceFn = function (Structure,AppLv,AppItem,Period,EmpName) {
	//embed parameter start
	
	var htmlParam="";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_structure' name='param_structure' value='"+Structure+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_app_lv' name='param_app_lv' value='"+AppLv+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_app_item' name='param_app_item' value='"+AppItem+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_period' name='param_period' value='"+Period+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_emp_code' name='param_emp_code' value='"+EmpName+"'>";
	$(".paramEmbed").remove();
	$("body").append(htmlParam);
	//embed parameter end
	getDataFn($("#pageNumber").val(),$("#rpp").val());
	
}

//------------------- Search Appraisal Data FN END ---------------------

//------------------- List Appraisal Data FN Start ---------------------

var listAppraisalDataFn = function (data) {
	var htmlTable = "";
	$.each(data,function(index,indexEntry) {
		
		htmlTable += "<tr class='rowSearch'>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["appraisal_period_desc"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["structure_name"]+ "</td>";
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
	
	
	html+="<select id=\"structure\" class=\"input form-control input-sm col-lg-9\" data-toggle=\"tooltip\" title=\"Structure\" name=\"structure\">";
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
	
	
	html+="<select id=\"app_lv\" class=\"input form-control input-sm col-lg-9\" data-toggle=\"tooltip\" title=\"Level\" name=\"app_lv\">";
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


//-------------------  Drop Down List Period FN Strart ---------------------

var dropDownListPeriod = function(){
	var html="";
	
	
	html+="<select id=\"period\" class=\"input form-control input-sm col-lg-9\" data-toggle=\"tooltip\" title=\"Period\" name=\"period\">";
	html+="<option  selected value=''>All</option>";
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

$(document).ready(function() { 
	// -------------------  Appraisal Data  ---------------------	
//	var username = $('#user_portlet').val();
//	 var password = $('#pass_portlet').val();
	 var username = 1;
	 var password = 11;
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		 if(connectionServiceFn(username,password,plid)==true){
	 		return false;
	 	}
	 }
	$("#drop_down_list_structure").html(dropDownListStructure());
	$("#drop_down_list_appraisal_level").html(dropDownListAppraisalLevel());
	$("#drop_down_list_period").html(dropDownListPeriod());
	
	$("#btnSearchAdvance").click(function(){
		
		searchAdvanceFn(
				$("#structure").val(),
				$("#app_lv").val(),
				$("#app_item_id").val(),
				$("#period").val(),
				$("#emp_name_id").val());
		
		return false;
	});
	$("#btnSearchAdvance").click();
	
	
	//Autocomplete Search Position Start
	$("#app_item").autocomplete({
        source: function (request, response) {
        	$.ajax({
				 url:restfulURL+restfulPathPositionAutocomplete,
				 type:"post",
				 dataType:"json",
				 data:{
					 "structure_id":$().val(),
					 "appraisal_level_id":request.term,
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
		//$("form#formExportToExcel").attr("action",restfulURL+"/dqs_api/public/dqs_user/export?token="+tokenID.token);
		$("form#formExportToExcel").attr("action","../file/excel_appraisal_data.xlsx");	

 		
//		$("#export_employee_Code").val($("#").val());
//		$("#export_structure_id").val($("#").val());
//		$("#export_structure_name").val($("#").val());
//		$("#export_period_id").val($("#").val());
//		$("#export_period_name").val($("#").val());
//		$("#export_appraisal_item_id").val($("#").val());
//		$("#export_appraisal_item_name").val($("#").val());
//		$("#export_data_value").val($("#").val());

		$("form#formExportToExcel").submit();
	});
    //#### Call Export User Function End ####	

	
});