//Global variable
var galbalDataCDSResult=[];
var golbalDataError=[];
var galbalDataTemp = [];
var pageNumberDefault=1;
var restfulPathCdsResult="/"+serviceName+"/public/cds_result";

var restfulPathDropDownYear=restfulPathCdsResult+"/year_list";
var restfulPathDropDownMonth=restfulPathCdsResult+"/month_list";
var restfulPathDropDownAppraisalLevel=restfulPathCdsResult+"/al_list";
var restfulPathDropDownAppraisalType="/"+serviceName+"/public/appraisal_assignment/appraisal_type_list";
var restfulPathPositionAutocomplete=restfulPathCdsResult+"/auto_position_name";
var restfulPathEmployeeAutocomplete=restfulPathCdsResult+"/auto_emp_name";
var loadingFn = function(){
	$("body").mLoading();
	setTimeout(function(){ $("body").mLoading('hide'); }, 200);
};
var clearFn = function(){
//	$(':input')
//	  .not(':button, :submit, :reset, :hidden')
//	  .val('')
//	  .removeAttr('checked')
//	  .removeAttr('selected');
//	  $(".checkWeigthOver").html("");
//	  $(".grandTotalWeight").html("");
	  /*Clear File*/
	  $('#file').val("");
	  $(".btnModalClose").click();
	  $(".dropify-clear").click();
	  /*Clear File*/
	  
	  $("#attachFileCdsResultId").val("");
	  $("#txtTitleImport").html("Import CDS Result");
	
}
var paginationSetUpCdsResultFn = function(pageIndex,pageButton,pageTotal){
	
	if(pageTotal==0){
		pageTotal=1
	}
	$('.paginationCds_top,.paginationCds_bottom').off("page");
	$('.paginationCds_top,.paginationCds_bottom').bootpag({
	    total: pageTotal,//page Total
	    page: pageIndex,//page index
	    maxVisible: 5,//จำนวนปุ่ม
	    leaps: true,
	    firstLastUse: true,
	    first: '←',
	    last: '→',
	    wrapClass: 'pagination',
	    activeClass: 'active',
	    disabledClass: 'disabled',
	    nextClass: 'next',
	    prevClass: 'prev',
	    next: 'next',
	    prev: 'prev',
	    lastClass: 'last',
	    firstClass: 'first'
	}).on("page", function(event, num){
		var rpp=10;
		if($("#rppCds").val()==undefined){
			rpp=10;
		}else{
			rpp=$("#rppCds").val();
		}
		
		getCdsResultDataFn(num,rpp);
		
	    $(".pagingCdsNumber").remove();
	    var htmlPageNumber= "<input type='hidden' id='pageCdsNumber' name='pageCdsNumber' class='pagingCdsNumber' value='"+num+"'>";
	    $("body").append(htmlPageNumber);
	   
	}); 

	$(".countCdsPagination").off("change");
	$(".countCdsPagination").on("change",function(){

		$("#countCdsPaginationTop").val($(this).val());
		$("#countCdsPaginationBottom").val($(this).val());
		
		getCdsResultDataFn(1,$(this).val());
		
		$(".rppCds").remove();
		$(".pagingCdsNumber").remove();
		var htmlRrp="";
			htmlRrp+= "<input type='hidden' id='rppCds' name='rppCds' class='rppCds' value='"+$(this).val()+"'>";
	        htmlRrp+="<input type='hidden' id='pageCdsNumber' name='pageCdsNumber' class='pagingCdsNumber' value='1'>";
	    $("body").append(htmlRrp);
	});
}

//------------------- GetData FN Start ---------------------
var getCdsResultDataFn = function(page,rpp){
	var year= $("#param_year").val();
	var month= $("#param_month").val();
	var app_lv= $("#param_app_lv").val() == "null" ? "":$("#param_app_lv").val();
	var app_lv_emp = $("#param_app_lv_emp").val();
	var app_type= $("#param_app_type").val();
	var org= $("#param_org_id").val();
	var position= $("#param_position_id").val();
	var emp_name= $("#param_emp_id").val();
	$("#listCdsResult").empty();
	if(app_type == "2"){
		$("#tableCdsResult thead tr").find("th:first").html("Emp&nbsp;Code&emsp;");
		$("#tableCdsResult thead tr").find("th:first").next().html("Emp&nbsp;Name&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;");
		$(".theadThField").show();
	}else if(app_type == "1"){
		$("#tableCdsResult thead tr").find("th:first").html("Org&nbsp;Code&emsp;");
		$("#tableCdsResult thead tr").find("th:first").next().html("Org&nbsp;Name&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;");
		$(".theadThField").hide();
		app_lv_emp = "";
	}
	
	//console.log(app_lv_emp)
	
	$.ajax({
		url : restfulURL+restfulPathCdsResult,
		type : "get",
		dataType : "json",
		data:{"page":page,"rpp":rpp,
			"current_appraisal_year":year,
			"month_id":month,
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
			
			listCdsResultFn(data['data']);
			galbalDataCDSResult=data;
			paginationSetUpCdsResultFn(galbalDataCDSResult['current_page'],galbalDataCDSResult['last_page'],galbalDataCDSResult['last_page']);
		}
	});
	
	
};

//------------------- GetData FN END ---------------------

//-------------------  Appraisal Data FN ---------------------
var searchAdvanceCdsFn = function (year,month,month_name,app_lv,app_lv_emp,app_type,org_id,position,emp_name) {
//embed parameter start
	
	var htmlParam="";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_year' name='param_year' value='"+year+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_month' name='param_month' value='"+month+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_month_name' name='param_month_name' value='"+month_name+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_app_lv' name='param_app_lv' value='"+app_lv+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_app_lv_emp' name='param_app_lv_emp' value='"+app_lv_emp+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_app_type' name='param_app_type' value='"+app_type+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_org_id' name='param_org_id' value='"+org_id+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_position_id' name='param_position_id' value='"+position+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_emp_id' name='param_emp_id' value='"+emp_name+"'>";
	$(".paramEmbed").remove();
	$("body").append(htmlParam);
	//embed parameter end
	getCdsResultDataFn(pageNumberDefault,$("#rppCds").val());
}

var listCdsResultFn = function (data) {
	var htmlTable = "";
	$.each(data,function(index,indexEntry) {
// 		console.log(indexEntry["period"]+indexEntry["structure"]
// 		+indexEntry["appraisal_level"]+indexEntry["appraisal_item"]);
	
		htmlTable += "<tr class='rowSearch'>";//cds_result_id
		if($("#param_app_type").val() == "2"){
			htmlTable += "<td class='columnSearch'>"+ indexEntry["emp_code"]+ "</td>";
			htmlTable += "<td class='columnSearch'>"+ indexEntry["emp_name"]+ "</td>";
			htmlTable += "<td class='columnSearch'>"+ indexEntry["appraisal_level_name"]+ "</td>";
			htmlTable += "<td class='columnSearch'>"+ indexEntry["org_name"]+ "</td>";
			htmlTable += "<td class='columnSearch'>"+ indexEntry["position_name"]+ "</td>";
		}else if($("#param_app_type").val() == "1"){
			htmlTable += "<td class='columnSearch'>"+ indexEntry["org_code"]+ "</td>";
			htmlTable += "<td class='columnSearch'>"+ indexEntry["org_name"]+ "</td>";
			htmlTable += "<td class='columnSearch'>"+ indexEntry["appraisal_level_name"]+ "</td>";
		};

		htmlTable += "<td class='columnSearch'>"+ indexEntry["cds_id"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["cds_name"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["year"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ $("#param_month_name").val()+ "</td>";
		//htmlTable += "<td class='columnSearch'>"+ indexEntry["month_name"]+ "</td>";
		htmlTable += "<td class='columnSearch' style='text-align: right;padding-right: 10px;'> <input id='cdsValueID-"+indexEntry["cds_result_id"]+"-"+indexEntry["cds_id"]+"-"+indexEntry["org_id"]+"-"+indexEntry["emp_id"]+"-"+indexEntry["position_id"]+"-"+indexEntry["level_id"]+"-"+indexEntry["year"]+"-"+indexEntry["month"];
		htmlTable +="'style='text-align:right;width: 130px;' class='cdsValue numberOnlyCds addCommaCds' disabled type=\"text\"  value='"+ (indexEntry["cds_value"] == "" ? "" :addCommas(parseFloat(indexEntry["cds_value"]).toFixed(2)))+ "'></td>";
		//htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;text-align: center;\"><i id='"+ indexEntry["cds_result_id"]+ "' class='fa fa-trash del' style='color: red; cursor: pointer;'></i></td>";
		if(indexEntry["cds_result_id"] == null){
			htmlTable += "<td class='columnSearch'></td>";
		}else{
			htmlTable += "<td id=\"objectCenter\" style=\"vertical-align: middle;\"><i class=\"fa fa-cog font-gear popover-edit-del-cds\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-trigger=\"focus\" tabindex=\""+index+"\" data-content=\"<button class='btn btn-warning btn-xs downloadAttachFileCds'style='width:95%' id='downloadAttachFileCds-"+ indexEntry["cds_result_id"]+ "' data-target=#downloadAttachFileModal data-toggle='modal' data-backdrop='"+setModalPopup[0]+"' data-keyboard='"+setModalPopup[1]+"'>Dowload</button>&nbsp;" ;
			htmlTable += "<button class='btn btn-success btn-xs attachFileCds' style='width:95%;' id='attachFileCds-"+ indexEntry["cds_result_id"]+ "' data-target=#ModalImport data-toggle='modal' data-backdrop='"+setModalPopup[0]+"' data-keyboard='"+setModalPopup[1]+"'>Attach File</button>&nbsp;";
			htmlTable += "<button style='width:95%' id='delCds-"+indexEntry["cds_result_id"]+"' class='btn btn-danger btn-xs delCds'>Delete</button>\"></i></td>";
		}
		
		htmlTable += "</tr>";////parseFloat().toLocaleString()
	});
	$("#listCdsResult").html(htmlTable);
	$(".popover-edit-del-cds").popover(setPopoverDisplay);
	$("#tableCdsResult").off("click",".popover-edit-del-cds");
	$("#tableCdsResult").on("click",".popover-edit-del-cds",function(){
		
		$(".attachFileCds").on("click",function() {
			clearFn();
			var id = this.id.split("-")[1];
			
			$("#attachFileCdsResultId").val(id);
			$("#txtTitleImport").html("Attach File");	
			
			
		});
		$(".downloadAttachFileCds").on("click",function() {
			clearFn();
			var id = this.id.split("-")[1];
			
			$("#attachFileCdsResultId").val(id);
			getAttachFileFn(id);	
			
			
		});
		
		$(".delCds").on("click",function(){
				var id = this.id.split("-")[1];
				 
				$("#confrimModalCdsResult").modal({
					"backdrop" : setModalPopup[0],
					"keyboard" : setModalPopup[1]
				});
				$(document).off("click","#btnConfirmOK");
				$(document).on("click","#btnConfirmOK",function(){
				
					$.ajax({
						 url:restfulURL+restfulPathCdsResult+"/"+id,
						 type : "delete",
						 dataType:"json",
						 headers:{Authorization:"Bearer "+tokenID.token},
						success:function(data){    
					    	 
						     if(data['status']==200){
						    	 
						       callFlashSlide("Delete Successfully.");
						       getCdsResultDataFn($("#pageCdsNumber").val(),$("#rppCds").val()); 
						       $("#confrimModalCdsResult").modal('hide');
						       
						     }else{
						    	 $("#confrimModalCdsResult").modal('hide');
						    	 callFlashSlide(data['data'],"error");
						    	}
						 }
					});
					
				});
				
			});	
		

		
	});

}
/* phase function end*/
/* attach function start*/
var getAttachFileFn = function(id){

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/cds_result/upload_file/"+id,
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			//console.log(data);
			listAttachFileFn(data);
		}
	});

}

var listAttachFileFn = function(data){
	var host = "http://"+window.location.hostname;

	//console.log(data);
	var html="";

	$.each(data,function(index,indexEntry){
		html+="<tr>";
			html+="<td  style='text-align:center;'>"+(index+1)+"</td>";
			html+="<td>"+indexEntry['doc_path']+"</td>";
			html+="<td style='text-align:center;'><a target=\"_blank\" href=\""+restfulURL+"/"+serviceName+"/public/"+indexEntry['doc_path']+"\" class='attachDownload' id='attachDownload-"+indexEntry['cds_result_doc_id']+"'><i class='fa fa-download'></i></a>,<a class=\"delAttach\" id=\"delAttach-"+indexEntry['cds_result_doc_id']+"\" href=\"#\"><i style='color:red;' class='icon-trash'></i></a></td>";
		html+="</tr>";
	});

	$("#listDataAttachFile").html(html);
	$(".delAttach").click(function(){
		var id = this.id;
		id = id.split("-");
		id=id[1];
		deleteAttachFileFn(id);
	});

}
var deleteAttachFileFn = function(id){


	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/cds_result/delete_file/"+id,
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			if(data['status']==200){
				getAttachFileFn($("#attachFileCdsResultId").val());
			}
		}
	});
}
/* attach function end*/
/* phase function end*/
var updateCdsResultFn = function () {
	
	var cds_results =[];
	$.each($(".cdsValue").get(),function(index,indexEntry){
		var tempData = indexEntry.id.split("-");
		cds_results.push({
			"cds_result_id": tempData[1]=="null"? "":tempData[1],
			"appraisal_type_id": $("#param_app_type").val(),
			"cds_id": notNullTextFn(tempData[2]),
			"org_id": notNullTextFn(tempData[3]),
			"emp_id": notNullTextFn(tempData[4]),
			"position_id": notNullTextFn(tempData[5]),
			"level_id": notNullTextFn(tempData[6]),
			"year": notNullTextFn(tempData[7]),
			"month": notNullTextFn(tempData[8]),
			"cds_value": indexEntry.value == "" ? "" :notNullFn(indexEntry.value.replace(/,/g, "")),
		});
		
	});


	
	$.ajax({
		url:restfulURL+restfulPathCdsResult,
		type : "PATCH",
		dataType : "json",
		headers:{Authorization:"Bearer "+tokenID.token},
		data : {
			"cds_results":cds_results
		},	
		success : function(data) {
			
			if (data['status'] == "200") {
				getCdsResultDataFn($("#pageCdsNumber").val(),$("#rppCds").val());
				clearFn();
				callFlashSlide("Update Successfully.");
				
			}else{
				callFlashSlide("Update fail.");
			}
		}
	});
	return false;
}

//-------------------  Drop Down List Month FN Strart ---------------------

var dropDownListMonth = function(){
	var html="";
	
	
	html+="<select id=\"monthCdsResult\" class=\"input span12 m-b-n\" data-toggle=\"tooltip\" title=\"Month\" name=\"monthCdsResult\">";
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
	
	
	html+="<select id=\"yearCdsResult\" class=\"input span12 m-b-n\" data-toggle=\"tooltip\" title=\"Year\" name=\"yearCdsResult\">";
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
			//console.log(data);
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
					html+="<option  value="+indexEntry["appraisal_type_id"]+">"+indexEntry["appraisal_type_name"]+"</option>";	
			});	
		}
	});	
	html+="</select>";
	return html;
};

var dropDownListOrganization = function() {
	//console.log("test")
	var service_url_Check;
	if($("#app_type").val()==1) {
		service_url_Check = "org";
	}
	else {
		service_url_Check = "org/list_org_for_emp";
	}
	
	var html="";
//	html+="<select data-placement='top' id=\"org_id\" class=\"input span12 m-b-n\" name=\"org_id\">";
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
	$("#org_id").html(html);
};

var listErrorFn =function(data){
	var errorData="";
	//alert(data['errors'] instanceof  Array);
	golbalDataError=data;
	
	var validateFile="";

	$.each(data,function(index,indexEntry){
		if(indexEntry[Object.keys(indexEntry)[0]]!= undefined || indexEntry[Object.keys(indexEntry)[0]]==null){
			if(indexEntry[Object.keys(indexEntry)[0]]== null){//The employee code field is null
				validateFile+="<font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font> "+Object.keys(indexEntry)[0]+" : null <i class='fa fa-level-down'></i><br>";
			}else{
				validateFile+="<font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font> "+Object.keys(indexEntry)[0]+": "+data[index][Object.keys(indexEntry)[0]]+" <i class='fa fa-level-down'></i><br>";}
			}
	     $.each(indexEntry['errors'],function(index2,indexEntry2){
	    	 validateFile+="<font color='red'>&emsp;*</font> "+indexEntry2+"<br>";
	     });
	 
	});
	   

	//alert(errorData);
	//callFlashSlideInModal(errorData);
	callFlashSlideInModal(validateFile,"#informationImport","error");
	/*return errorData;*/
}
//-------------------  Drop Down List Appraisal Level FN END ---------------------
var getBrowserWidthCds = function(){
    var wSearchAdvance = $('.cSearchAdvance').width()-4;
    var wTarget = $('#drop_down_list_appraisal_type').width();
    var wCalTarget = $('#drop_down_list_appraisal_type').width()*4+20;
    var height = $('#drop_down_list_appraisal_type').height()+0.25;
    
//		if(window.innerWidth < 980){
//			$("#txtEmpInput").css({"width":""});
//			$("#txtEmpInput").css({"height":""});
//		} else if(window.innerWidth < 1366){
//			// Small Device
//    
//			$("#txtEmpInput").width(wSearchAdvance-wCalTarget+wTarget);
//			$("#txtEmpInput").css({"height":height});
//		} else {
//			// Large Device
//			$("#txtEmpInput").width(wSearchAdvance-wCalTarget+wTarget);
//			$("#txtEmpInput").css({"height":height});
//	
//		}
		//console.log(wSearchAdvance-wCalTarget+wTarget);
};

$(document).ready(function() {
	
	var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		 if(connectionServiceFn(username,password,plid)==false){
	 		return false;
	 	}
	 }
	$("#org_name").val("");
	$("#cds_result_position").val("");
	$("#emp_name").val("");
	$("#org_id").val("");
	$("#cds_result_position_id").val("");
	$("#emp_name_id").val("");
	
	$(".sr-only").hide();
	$("#drop_down_list_year").html(dropDownListYear());
	$("#drop_down_list_month").html(dropDownListMonth());
	$("#drop_down_list_appraisal_type").html(dropDownListAppraisalType());
	$("#countCdsPaginationTop").val( $("#countCdsPaginationTop option:first-child").val());
	$("#countCdsPaginationBottom").val( $("#countCdsPaginationBottom option:first-child").val());

	$(".app_url_hidden").show();
	getBrowserWidthCds();
	$("#btnSearchAdvanceCdsResult").click(function(){
		$("#btnSaveCdsresult ,#btnCancelCdsresult").attr("disabled", 'disabled');
		$("#btnEditCdsresult ,#countCdsPaginationTop,#countCdsPaginationBottom").removeAttr('disabled');
		$(".paginationCds_top,.paginationCds_bottom ").removeClass( "not-active" );
	
		searchAdvanceCdsFn(
				$("#yearCdsResult").val(),
				$("#monthCdsResult").val(),
				$("#monthCdsResult").children("option:selected").text(),
				$("#app_lv").val(),
				$("#app_lv_emp").val(),
				$("#app_type").val(),
				$("#org_id").val(),
				$("#cds_result_position_id").val(),
				$("#emp_name_id").val());
		$("#cds_result_list_content").show();
		getBrowserWidthCds();
		return false;
	});
	$("#btnEditCdsresult").click(function(){
		
		$("#btnEditCdsresult ,#countCdsPaginationTop,#countCdsPaginationBottom").attr("disabled", 'disabled');
		$("#btnSaveCdsresult ,#btnCancelCdsresult,#btnCancelCdsresult,.cdsValue").removeAttr('disabled');
		$(".paginationCds_top,.paginationCds_bottom ").addClass( "not-active" );
		$(".popover-edit-del-cds").popover('disable');

		
		var getSelectionStart = function (o) {
			if (o.createTextRange) {
				var r = document.selection.createRange().duplicate()
				r.moveEnd('character', o.value.length)
				if (r.text == '') return o.value.length
				return o.value.lastIndexOf(r.text)
			} else return o.selectionStart
		};
		jQuery('.numberOnlyCds').keypress(function (evt) { 
			 var charCode = (evt.which) ? evt.which : evt.keyCode;
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
		$(".addCommaCds").keyup(function(){
			$(this).val(Comma($(this).val()));
		});
	});
	$("#btnSaveCdsresult").click(function(){

		
		updateCdsResultFn();
		$("#btnSaveCdsresult ,#btnCancelCdsresult").attr("disabled", 'disabled');
		$("#btnEditCdsresult ,#countCdsPaginationTop,#countCdsPaginationBottom").removeAttr('disabled');
		$(".paginationCds_top,.paginationCds_bottom ").removeClass( "not-active" );
		
		
		
	});
	$("#btnCancelCdsresult").click(function(){
		$("#btnSaveCdsresult ,#btnCancelCdsresult").attr("disabled", 'disabled');
		$("#btnEditCdsresult ,#countCdsPaginationTop,#countCdsPaginationBottom").removeAttr('disabled');
		$(".paginationCds_top,.paginationCds_bottom ").removeClass( "not-active" );
		loadingFn();
		listCdsResultFn(galbalDataCDSResult['data']);
		
	});
	
	//Autocomplete Search Position Start
	$("#cds_result_position").autocomplete({
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
			$("#cds_result_position").val(ui.item.value);
            $("#cds_result_position_id").val(ui.item.position_id);
            galbalDataTemp['position_name'] = ui.item.label;
            galbalDataTemp['position_id']=ui.item.position_id;
            return false;
        },change: function(e, ui) {  

 
			if ($("#cds_result_position").val() == galbalDataTemp['position_name']) {
				$("#cds_result_position_id").val(galbalDataTemp['position_id']);
			}  else if (ui.item != null){
				$("#cds_result_position_id").val(ui.item.position_id);
			}else {
				$("#cds_result_position_id").val("");
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

	var empNameAutoCompelteChangeToPositionName = function(emp_name) {

		
		
		$.ajax({
			url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/auto_position_name2",
			type:"post",
			dataType:"json",
			async:false,
			headers:{Authorization:"Bearer "+tokenID.token},
			data:{"emp_name":emp_name},
			success:function(data){
				if(data.length!==0) {
					$("#cds_result_position_id").val(data[0].position_id);
					$("#cds_result_position").val(data[0].position_name);
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
			$("#cds_result_position").removeAttr('disabled');
			$("#emp_name").removeAttr('disabled');
			
			dropDownListEmpLevelFn();
			dropDownListEmpLevelToOrgFn();
			dropDownListOrganization();
			
		}else if($("#app_type").val() == "1") {
			
			$("#app_lv_emp").attr("disabled", 'disabled');
			$("#cds_result_position").attr("disabled", 'disabled');
			$("#emp_name").attr("disabled", 'disabled');
			$("#cds_result_position").val("");
			$("#cds_result_position_id").val("");
			$("#emp_name").val("");
			$("#emp_name_id").val("");
			$("#app_lv_emp").empty();
			
			dropDownListAppraisalLevel();
			dropDownListOrganization();
			
		}
	});
	$("#app_type").change();
	
	$("#app_lv").change(function() {
		var dataClearParam = ['#cds_result_position','#cds_result_position_id','#emp_name','#emp_name_id'];
		clearParamSearch(dataClearParam);// in cMain.js
		dropDownListOrganization();
	});
	
	$("#app_lv_emp").change(function() {
		var dataClearParam = ['#cds_result_position','#cds_result_position_id','#emp_name','#emp_name_id'];
		clearParamSearch(dataClearParam);// in cMain.js
		dropDownListEmpLevelToOrgFn();
		dropDownListOrganization();
	});
	
	$("#org_id").change(function() {
		//console.log("org_id");
		var dataClearParam = ['#cds_result_position','#cds_result_position_id','#emp_name','#emp_name_id'];
		clearParamSearch(dataClearParam);// in cMain.js
	});
	

	
	
	//#### Call Export User Function Start ####
	$("#exportToExcel").click(function(){
		var paramYear=$("#yearCdsResult").val();
		var paramMonth=$("#monthCdsResult").val();
		var paramAppLv=$("#app_lv").val();
		var paramAppLvEmp=$("#app_lv_emp").val();
		var paramAppType= $("#app_type").val();
		var paramQrg= $("#org_id").val();
		var paramPositionCode=$("#cds_result_position_id").val();
		var paramEmpCode=$("#emp_name_id").val();

		
		var param="";
		param+="&current_appraisal_year="+paramYear;
		param+="&month_id="+paramMonth;
		param+="&level_id="+paramAppLv;
		param+="&level_id_emp="+paramAppLvEmp;
		param+="&appraisal_type_id="+paramAppType;
		param+="&org_id="+paramQrg;
		param+="&position_id="+paramPositionCode;
		param+="&emp_id="+paramEmpCode;
		
		console.log(restfulURL+restfulPathCdsResult+"/export?token="+tokenID.token+""+param)

		$("form#formExportToExcel").attr("action",restfulURL+restfulPathCdsResult+"/export?token="+tokenID.token+""+param);
		$("form#formExportToExcel").submit();
	});
    //#### Call Export User Function End ####
	
	//FILE IMPORT MOBILE START
	$("#btn_import").click(function () {
		$("#ModalImport").modal({
			"backdrop" : setModalPopup[0],
			"keyboard" : setModalPopup[1]
		});
		clearFn();
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
			url:restfulURL+($("#attachFileCdsResultId").val()==""? restfulPathCdsResult :"/"+serviceName+"/public/cds_result/upload_file/"+$("#attachFileCdsResultId").val()),
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
				if(data['status']==200 && $("#attachFileCdsResultId").val()!=""){
					callFlashSlide($("#attachFileCdsResultId").val()==""?"Import CDS Result Successfully":"Attach File Successfully");
					clearFn();
					$("body").mLoading('hide');
					$
					$('#ModalImport').modal('hide');
				}else if(data['status']==200 && data['errors'].length==0){
							
					callFlashSlide($("#attachFileCdsResultId").val()==""?"Import CDS Result Successfully":"Attach File Successfully");
					getCdsResultDataFn($(".pagination .active").attr( "data-lp" ),$("#rppCds").val());
					clearFn();
					$("body").mLoading('hide');
					$
					$('#ModalImport').modal('hide');
					
				}else{
					listErrorFn(data['errors']);
					getCdsResultDataFn($(".pagination .active").attr( "data-lp" ),$("#rppCds").val());
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
         	 default: 'Glissez-d�posez un fichier ici ou cliquez',
             replace: 'Glissez-d�posez un fichier ou cliquez pour remplacer',
             remove:  'Supprimer',
             error:   'D�sol�, le fichier trop volumineux'
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
 	
 	$(window).on('resize',function(){
 		getBrowserWidthCds();
 	});
 	
});

