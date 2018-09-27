var gSetCriteriaCurLevel, gSetWeightCurStruc;

//-------- Update Criteria Start
var options=[];
var insertCriteriaFn = function (levelId, modalCloseType) {
	var structure =[];
	var weight = [];
	var criteria = [];
	var checkbox = "";
	var curFormId = $("#ac_appraisal_form").val();
	//from_data_structure
	$('.from_data_structure').each(function(index, indexEntry) {
		if($(indexEntry).is(":checked")){
			checkbox = "1";
		}else{
			checkbox = "0";
		}
		criteria.push({
			"structure_id": ""+this.id.split("__")[1]+"",
			"weight_percent": ""+$(".from_data_weight[id$="+this.id.split("__")[1]+"]").val()+"",
			"checkbox": ""+checkbox+""
		});
	});
	
		$.ajax({
			url:restfulURL+"/"+serviceName+"/public/appraisal_level_360/"+levelId+"/criteria",
			type : "PATCH",
			dataType : "json",
			headers:{Authorization:"Bearer "+tokenID.token},
			async:false,
			data:{"criteria":criteria, "appraisal_form_id":curFormId},
			success : function(data) {
				if(data['status']==200){					
					
					if(modalCloseType == "freeze"){
						GetAppraisalFormByLevel(levelId, curFormId);
						$("body").mLoading('hide');
						callFlashSlideInModal("Add Appraisal Criteria Successfully.","#information2","info");
						
					} else {
						$('#addModalCriteria').modal('hide');
						callFlashSlide("Add Appraisal Criteria Successfully.");
						getDataFn('','',options);
					}
										
				}else if (data['status'] == "400") {
					var validate = "<font color='red'>* </font>" + data['data'] + "";
					callFlashSlideInModal(validate,"#information2","error");
				} 
			}
		});
	
	return false;
}
// -------- Update Criteria End


//--------  List Criteria  Start
var listAppraisalCriteria = function(id, formId) {
	htmlTable="";
	weight_percent="";
	no_weight = "";
	is_check = "";
	$.ajax({ 
		url:restfulURL+"/"+serviceName+"/public/appraisal_level_360/"+id+"/criteria",
		type : "get",
		dataType : "json",
		data : {"form_id":formId},
		headers:{Authorization:"Bearer "+tokenID.token},
		async: false,
		success : function(data) {
			if(data["no_weight"] == 1){
				no_weight="disabled";
			}else{
				no_weight="";
			};
			
			$.each(data['data'],function(index,indexEntry) { 
				if(index==0) {
					$("#ac_appraisal_level_name").html("<b>"+indexEntry['appraisal_level_name']+"</b>");
				}
				if(indexEntry["weight_percent"] == null){
					weight_percent="0.00";
				}else{
					weight_percent=indexEntry["weight_percent"];
				}
				if(indexEntry["checkbox"] == 1){
					is_check="checked";
				}else{
					is_check="";
				};
				
				htmlTable+="<tr>";
				htmlTable+="	<td>";
				htmlTable+="		<input  id=\"form_structure_item__"+indexEntry["structure_id"]+"\" class=\"from_data_structure\"";
				htmlTable+="		type='checkbox' "+is_check+" value=\""+indexEntry["structure_id"]+"\">";
				htmlTable+="	</td>";
				htmlTable+="	<td style='vertical-align:middle'>";
				htmlTable+=			"<p id='structure_name__"+indexEntry["structure_id"]+"' style='float:left;'>"+indexEntry["structure_name"]+"</p>";
				if(indexEntry["form_id"]==2) {
					if(is_check == "checked"){
						htmlTable+="			<a class='addModalCriteriaSetWeight' id='set_weight__"+indexEntry["structure_id"]+"' style='padding-left:8px;cursor:pointer;'><u><i class='icon-edit icon-white'> Set Weight </i></u></a>";
					}else{
						htmlTable+="			<a class='addModalCriteriaSetWeight not-active' id='set_weight__"+indexEntry["structure_id"]+"' style='padding-left:8px;cursor:pointer;'><u><i class='icon-edit icon-white'> Set Weight </i></u></a>";
					}
				}
				htmlTable+="	</td>";
				htmlTable+="	<td style=\"vertical-align:middle\" >";
				htmlTable+="		<input style='margin-bottom: 0px;' class=\"span12 from_data_weight numberOnly\" "+no_weight+" type='text'  id=\""+indexEntry["structure_id"]+"\" value=\""+weight_percent+"\" />";
				htmlTable+="	</td>";
				htmlTable+="</tr>";
			});
			$("#formListAppraisalCriteria").html(htmlTable);
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
								
		}
	});
}
//--------  List Criteria End


//-------- Update Criteria Start
var options=[];
var insertSetweightFn = function (level_id, structure_id) {
	var structure =[];
	var weight = [];
	var setweight = [];
	var checkbox = "";
	//from_data_setweight
	$('.from_data_setweight').each(function(index, indexEntry) {
		if($(indexEntry).is(":checked")){
			checkbox = "1";
		}else{
			checkbox = "0";
		}
		setweight.push({
			"structure_id": ""+structure_id+"",
			"assessor_group_id": ""+this.id.split("__")[1]+"",
			"weight_percent": ""+$(".from_data_group_weight[id$="+this.id.split("__")[1]+"]").val()+"",
			"checkbox": ""+checkbox+""
		   });
	});
	
		$.ajax({
			url:restfulURL+"/"+serviceName+"/public/competency_criteria/"+level_id+"/"+structure_id,
			type : "PATCH",
			dataType : "json",
			headers:{Authorization:"Bearer "+tokenID.token},
			async:false,
			data:{"set_weight":setweight, "appraisal_form_id":$("#ac_appraisal_form").val()},
			success : function(data) {
				if(data['status']==200){
					callFlashSlide("Add Appraisal Criteria SetWeight Successfully.");
					
					getDataFn('','',options);
					
					$('#addModalCriteriaSetWeightModal').modal('hide');
					
				}else if (data['status'] == "400") {
					
					var validate = "<font color='red'>* </font>" + data['data'] + "";
//					alert(validate);
					callFlashSlideInModal(validate,"#information3","error");
					
				} 
			}
		});
	
	return false;
}
// -------- Update Criteria set weight End

//--------  List Criteria Set Weight Start

var SetWeightFn = function(level_id, structure_id, structure_name) {
	htmlTable="";
	weight_percent="";
	no_weight = "";
	is_check = "";
	$.ajax({ 
		url:restfulURL+"/"+serviceName+"/public/competency_criteria",
		type : "get",
		dataType : "json",
		data:{"appraisal_level_id":level_id,'structure_id':structure_id},
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			$.each(data,function(index,indexEntry) {
				if(index==0) {
					$("#ac_Structure_name").html("<b>"+structure_name+"</b>");
				}
				if(indexEntry["weight_percent"] == null){
					weight_percent="0.00";
				}else{
					weight_percent=indexEntry["weight_percent"];
				}
				if(indexEntry["checkbox"] == 1){
					is_check="checked";
				}else{
					is_check="";
				};
		
				
				htmlTable+="<tr>";
				htmlTable+="	<td>";
				htmlTable+="		<input  id=\"form_structure_item__"+indexEntry["assessor_group_id"]+"__"+indexEntry["structure_id"]+"\" class=\"from_data_setweight\"";
				htmlTable+="		<input type='checkbox'"+is_check+" value=\""+indexEntry["assessor_group_id"]+"\">";
				htmlTable+="	</td>";
				htmlTable+="	<td>";
				htmlTable+=			indexEntry["assessor_group_name"];
				htmlTable+="	</td>";
				htmlTable+="	<td style=\"vertical-align:middle\" >";
				htmlTable+="		<input style='margin-bottom: 0px;' class=\"span12 from_data_group_weight numberOnly\" "+no_weight+" type='text'  id=\""+indexEntry["assessor_group_id"]+"\" value=\""+indexEntry["weight_percent"]+"\" />";
				htmlTable+="	</td>";
				htmlTable+="</tr>";
					
				 
		
			});
			$("#formListCriteriaSetWeight").html(htmlTable)
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
		}
	});
}
//--------  List Criteria Set Weight End


// Get appraisal form level id // 
var GetAppraisalFormByLevel = function(level_id, formId){
	// Get Appraisal Form //
	var htmlForm="";
	var fromIdResponse = 0;
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/competency_criteria/form_list",
		type : "get",
		dataType : "json",
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"level_id":level_id},
		async: false,
		success : function(data) {
			fromIdResponse = data[0].appraisal_form_id;
			$.each(data,function(index,indexEntry) {
				var usedIcon = (indexEntry.used_flag == "1")?"&#10004 ":"&emsp; ";				
				if(indexEntry.appraisal_form_id == formId){
					htmlForm += "<option value='"+indexEntry.appraisal_form_id+"' selected>"+usedIcon+indexEntry.appraisal_form_name+" </option>";
				} else {
					htmlForm += "<option value='"+indexEntry.appraisal_form_id+"'>"+usedIcon+indexEntry.appraisal_form_name+" </option>";
				}
			});
			$("select#ac_appraisal_form").html(htmlForm);
		}
	});
	
	return fromIdResponse;
}

// Appraisal form change //
function AppraisalFormChange(formId){
	
	// Get Appraisal Form List //
	GetAppraisalFormByLevel(gSetCriteriaCurLevel, formId); //(level_id, form_id)
	
	listAppraisalCriteria(gSetCriteriaCurLevel, formId);
	$("#addModalCriteria").modal({
		"backdrop" : setModalPopup[0],
		"keyboard" : setModalPopup[1]
	});
	
}


$(document).ready(
		function() {
			var username = $('#user_portlet').val();
			var password = $('#pass_portlet').val();
			var plid = $('#plid_portlet').val();
			if (username != "" && username != null & username != []
					&& username != undefined) {

				if (connectionServiceFn(username, password, plid) == true) {

					options = {
						"colunms" : [ {
							"colunmsDisplayName" : "Seq",
							"width" : "",
							"id" : "seq_no",
							"colunmsType" : "text"
						}, {
							"colunmsDisplayName" : "Appraisal Level Name",
							"width" : "",
							"id" : "appraisal_level_name",
							"colunmsType" : "text"
						}, {
							"colunmsDisplayName" : "View All Employee",
							"width" : "",
							"id" : "is_all_employee",
							"colunmsType" : "checkbox"
						}, {
							"colunmsDisplayName" : "Is HR",
							"width" : "",
							"id" : "is_hr",
							"colunmsType" : "checkbox"
						}, {
							"colunmsDisplayName" : "Is Self Assign",
							"width" : "",
							"id" : "is_self_assign",
							"colunmsType" : "checkbox"
						}, {
							"colunmsDisplayName" : "Is Group Action",
							"width" : "",
							"id" : "is_group_action",
							"colunmsType" : "checkbox"
						}, {
							"colunmsDisplayName" : "Is Show Quality",
							"width" : "",
							"id" : "is_show_quality",
							"colunmsType" : "checkbox"
						}, {
							"colunmsDisplayName" : "Organization",
							"width" : "",
							"id" : "is_org",
							"colunmsType" : "checkbox"
						}, {
							"colunmsDisplayName" : "Individual",
							"width" : "",
							"id" : "is_individual",
							"colunmsType" : "checkbox"
						}, {
							"colunmsDisplayName" : "Is Active",
							"width" : "",
							"id" : "is_active",
							"colunmsType" : "checkbox"
						}, {
							"colunmsDisplayName" : "Parent",
							"width" : "",
							"id" : "parent_level_name",
							"colunmsType" : "text"
						}

						],

						"form" : [
								{
									"label" : "Seq",
									"inputType" : "text",
									"placeholder" : "Seq",
									"id" : "seq_no",
									"width" : "250px",
									"dataTypeInput" : "number",
									"required" : true,
								},
								{
									"label" : "Appraisal Level Name",
									"inputType" : "text",
									"placeholder" : "Appraisal Level Name",
									"id" : "appraisal_level_name",
									"width" : "250px",
									"required" : true

								},
								{
									"label" : "View All Employee",
									"inputType" : "checkbox",
									"default" : "uncheck",
									"id" : "is_all_employee",
									"width" : "250px"
								},
								{
									"label" : "Is HR",
									"inputType" : "checkbox",
									"default" : "uncheck",
									"id" : "is_hr",
									"width" : "200px"
								},
								{
									"label" : "Is Self Assign",
									"inputType" : "checkbox",
									"default" : "uncheck",
									"id" : "is_self_assign",
									"width" : "200px"
								},
								{
									"label" : "Is Group Action",
									"inputType" : "checkbox",
									"default" : "uncheck",
									"id" : "is_group_action",
									"width" : "200px"
								},
								{
									"label" : "Is Show Quality",
									"inputType" : "checkbox",
									"default" : "uncheck",
									"id" : "is_show_quality",
									"width" : "200px"
								},
								{
									"label" : "No Weight",
									"inputType" : "checkbox",
									"default" : "uncheck",
									"id" : "no_weight",
									"width" : "200px"
								},
								{
									"label" : "District",
									"inputType" : "checkbox",
									"default" : "uncheck",
									"id" : "district_flag",
									"width" : "200px"
								},
								{
									"label" : "Organization",
									"inputType" : "checkbox",
									"default" : "uncheck",
									"id" : "is_org",
									"width" : "200px"
								},
								{
									"label" : "Individual",
									"inputType" : "checkbox",
									"default" : "uncheck",
									"id" : "is_individual",
									"width" : "200px"
								},
								{
									"label" : "IsActive",
									"inputType" : "checkbox",
									"default" : "checked",
									"id" : "is_active",
									"width" : "200px"
								},
								{
									"label" : "Parent Appraisal Level",
									"inputType" : "dropdown",
									"initValue" : "",
									"updateList" : true,
									"id" : "parent_id",
									"width" : "250px",
									"url" : "" + restfulURL + "/" + serviceName
											+ "/public/appraisal_level"
								}, {
									"label" : "Default Stage ID",
									"inputType" : "text",
									"placeholder" : "Default Stage ID",
									"default" : "1",
									"id" : "default_stage_id",
									"width" : "50px",
									"dataTypeInput" : "number",
									"required" : true,
								}

						],

						"formDetail" : {
							"formSize" : "modal-dialog",
							"formName" : "Appraisal Level",
							"id" : "appraisalLevelForm",
							"pk_id" : "level_id"
						},
						"serviceName" : [ restfulURL + "/" + serviceName
								+ "/public/appraisal_level" ],
						"tokenID" : tokenID,
						"pagignation" : false,
						"expressSearch" : false,
						"advanceSearchSet" : false,
						"btnManageOption" : {
							"id" : "addModalCriteria",
							"name" : "Criteria"
						}
					}
					createDataTableFn(options);

				}
			}

});


// Set Criteria //
$(document).on('click', '.addModalCriteria', function() {
	$("#information2").hide();
	
	gSetCriteriaCurLevel = this.id.split("-")[1];
	
	// Get Appraisal Form List //
	// GetAppraisalFormByLevel(level_id, form_id) Return from_id //
	var formId = GetAppraisalFormByLevel(gSetCriteriaCurLevel, null);
	
	console.log("From Result: "+formId);
	
	listAppraisalCriteria(gSetCriteriaCurLevel, formId);
	$("#addModalCriteria").modal({
		"backdrop" : setModalPopup[0],
		"keyboard" : setModalPopup[1]
	});

	$(".btnCriteriaSubmit").off("click");
	$(".btnCriteriaSubmit").on("click", function() {
		$("#information2").hide();
		insertCriteriaFn(gSetCriteriaCurLevel, this.value);
	});	
	
	$("#btnCriteriaClose").off("click");
	$("#btnCriteriaClose").on("click", function() {
		getDataFn('','',options);
		$('#addModalCriteria').css({'z-index' : '1045'});
	});	
});


// Set Criteria Weight (Form 2) //
$(document).on('click', '.addModalCriteriaSetWeight', function() {
	$("#information2").hide();
	gSetWeightCurStruc = this.id.split("__")[1];
	SetWeightFn(gSetCriteriaCurLevel, gSetWeightCurStruc, $('#structure_name__'+gSetWeightCurStruc).text()); //SetWeightFn(level_id, structure_id, structure_nam);
	$("#addModalCriteriaSetWeightModal").modal(
		{
			"backdrop" : setModalPopup[0],
			"keyboard" : setModalPopup[1]
		}
	).css({'z-index': '1050'});
	$('#addModalCriteria').css({'z-index' : '1030'});
	$("#btnSetweightSubmit").off("click");
	$("#btnSetweightSubmit").on('click', function() {
		$("#information3").hide();
		insertSetweightFn(gSetCriteriaCurLevel, gSetWeightCurStruc); //insertSetweightFn(level_id, structure_id)
	});	
});
$(document).on('click','.setWeightCloseModal',function(){
		$('#addModalCriteria').css({'z-index' : '1045'});
	});
$(document).on('click','#btnSetweightSubmit',function(){
	$('#addModalCriteria').css({'z-index' : '1045'});
});

// enable/disable Set Weight button //
$(document).on('change', '.from_data_structure', function() {
	var id = this.id.split("__");
	 if ($(this).is(":checked")){
		 $('#set_weight__'+id[1]).removeClass('not-active');
	 } else {
		 $('#set_weight__'+id[1]).addClass('not-active');
	 }
});
