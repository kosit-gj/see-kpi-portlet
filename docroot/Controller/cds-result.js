//Global variable
var galbalDataCDSResult=[];
var tempEmpName="";
var tempEmpId="";
var tempPosiName="";
var tempPosiId="";
var restfulPathCdsResult="/tyw_api/public/cds_result";

var restfulPathDropDownYear=restfulPathCdsResult+"/year_list";
var restfulPathDropDownMonth=restfulPathCdsResult+"/month_list";
var restfulPathDropDownAppraisalLevel=restfulPathCdsResult+"/al_list";

var restfulPathPositionAutocomplete=restfulPathCdsResult+"/auto_position_name";
var restfulPathEmployeeAutocomplete=restfulPathCdsResult+"/auto_emp_name";



//------------------- GetData FN Start ---------------------
var getDataFn = function(page,rpp){
	var year= $("#param_Year").val();
	var month= $("#param_Month").val();
	var app_lv= $("#param_AppLv").val();
	var position= $("#param_Position").val();
	var emp_name= $("#param_EmpName").val();
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
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_Year' name='param_Year' value='"+year+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_Month' name='param_Month' value='"+month+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_AppLv' name='param_AppLv' value='"+app_lv+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_Position' name='param_Position' value='"+position+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_EmpName' name='param_EmpName' value='"+emp_name+"'>";
	$(".paramEmbed").remove();
	$("body").append(htmlParam);
	//embed parameter end
	getDataFn($("#pageNumber").val(),$("#rpp").val());
	
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
	
	
	html+="<select id=\"month\" class=\"input form-control input-sm col-lg-9\" data-toggle=\"tooltip\" title=\"Month\" name=\"month\">";
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
	
	
	html+="<select id=\"year\" class=\"input form-control input-sm col-lg-9\" data-toggle=\"tooltip\" title=\"Year\" name=\"year\">";
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
	
	
	html+="<select id=\"app_lv\" class=\"input form-control input-sm col-lg-9\" data-toggle=\"tooltip\" title=\"Appraisal Level\" name=\"app_lv\">";
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
//-------------------  Drop Down List Appraisal Level FN END ---------------------

$(document).ready(function() {
	
	$("#drop_down_list_year").html(dropDownListYear());
	$("#drop_down_list_month").html(dropDownListMonth());
	$("#drop_down_list_appraisal_level").html(dropDownListAppraisalLevel());
	$("#btnSearchAdvance").click(function(){
	$("#position").val("");
	$("#emp_name").val("");
		
		searchAdvanceFn(
				$("#year").val(),
				$("#month").val(),
				$("#app_lv").val(),
				$("#position_id").val(),
				$("#emp_name_id").val());
		
		return false;
	});
	$("#btnSearchAdvance").click();
	
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
		//$("form#formExportToExcel").attr("action",restfulURL+"/dqs_api/public/dqs_user/export?token="+tokenID.token);
		$("form#formExportToExcel").attr("action","../file/excel_cds_result.xlsx");

 		
//		$("#export_employee_Code").val($("#").val());
//		$("#export_cds_id").val($("#").val());
//		$("#export_cds_name").val($("#").val());
//		$("#export_year").val($("#").val());
//		$("#export_Month").val($("#").val());
//		$("#export_cds_Value").val($("#").val());
		
		$("form#formExportToExcel").submit();
	});
    //#### Call Export User Function End ####
	
	
	
});

