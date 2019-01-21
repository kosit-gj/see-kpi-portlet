var globalData="";
var galbalDataTemp=[]; 
//var phaseArray=[];
//var globalCount=0;
var username = "";
var password = "";
const pageNumberDefault=1;
var genJudgeHradComplete = 0;
var statusFakeAdjust;
var startDatatable = true;

var callFlashSlideBody =function(text,id,flashType){
	if(flashType=="error") {
		if(id!=undefined){
			$(id).html(text).show();
		}else{
			$("#information").html(text).show();
		}
	} else {
		if(id!=undefined){
			$(id).html(text).show();
		}else{
			$("#information").html(text).show();
		}
		setTimeout(function(){
			if(id!=undefined){
				$(id).hide("slow");
			}else{
				$("#information").hide("slow");
			}
		},3000);
	}
	
 	$(".btnCloseWarning").css({
 		"color": "red",
	    "cursor": "pointer",
	    "font-size": "16px",
	    "font-weight": "bold",
	    "margin-right": "5px",
	    "position": "relative",
	    "text-align": "right"
 	});
 	
 	$(".btnCloseWarning").click(function() {
 		$("#information").hide("slow");
 	});
}

var validationFn = function(data) {
	var btnClose="<span class=\"btnCloseWarning\">×</span>";
 	var validate = "";
 	var count = 0;
 	$.each(data, function(index, indexEntry) {

 		if (index != undefined) {
 			for (var key in indexEntry) {
 			    if (indexEntry.hasOwnProperty(key)) {
		 			if (count == 0) {
		 				validate += "<div style=\"display: flex; justify-content: space-between;\">";
		 				validate += "<span><font color='red'>* </font>" + indexEntry[key] + "</span>";
		 				validate += "<span>" + btnClose + "</span>";
		 				validate += "</div>";
		 			} else {
		 				validate += "<div><font color='red'>* </font> " + indexEntry[key] + " </div>";
		 			}
		 			
		 			count++;
 			    }
 			    
 			}
 		}

 	});
 	
 	callFlashSlideBody(validate,"#information","error");
}

var clearFn = function() {
	$("#information").hide();
}

var refreshMultiPosition = function() {
	$("#Position").multiselect('refresh').multiselectfilter();
	$("#Position_ms").css({'width':'100%'});
	$(".ui-icon-check,.ui-icon-closethick,.ui-icon-circle-close").css({'margin-top':'3px'});
	$('input[name=multiselect_Position]').css({'margin-bottom':'6px','margin-right':'3px'});
}

var dropDrowYearListFn = function(nameArea,id){
	if(nameArea==undefined){
		nameArea="";
	}
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/bonus/advance_search/year",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(index==0){
					htmlOption+="<option selected='selected' value="+indexEntry['appraisal_year']+">"+indexEntry['appraisal_year']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['appraisal_year']+">"+indexEntry['appraisal_year']+"</option>";
				}
			});
			$("#AppraisalYear"+nameArea).html(htmlOption);
		}
	});
}

var dropDrowPeriodListFn = function(){

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/salary/parameter/period",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"appraisal_year":$("#AppraisalYear").val()},
		success:function(data){
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				
				htmlOption+="<option value="+indexEntry['period_id']+">"+indexEntry['appraisal_period_desc']+"</option>";
			});
			$("#AppraisalPeriod").html(htmlOption);
		}
	});
}

var dropDrowAppraisalOrgLevelFn = function(id){

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/bonus/advance_search/organization_level",
		type:"get",
		dataType:"json",
		async:false,
		data:{"individual_level":$("#AppraisalEmpLevel").val()},
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			htmlOption+="<option value=''>All Level</option>";
			$.each(data,function(index,indexEntry){
				htmlOption+="<option value="+indexEntry['level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
			});
			$("#AppraisalOrgLevel").html(htmlOption);
		}
	});
}

var dropDrowAppraisalEmpLevelFn = function(id){

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/bonus/advance_search/individual_level",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			htmlOption+="<option value=''>All Level</option>";
			$.each(data,function(index,indexEntry){

				if(id==indexEntry['level_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}
			});
			$("#AppraisalEmpLevel").html(htmlOption);
		}
	});
}


var dropDrowOrgFn = function(){

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/bonus/advance_search/organization",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"individual_level":$("#AppraisalEmpLevel").val(),"organization_level":$("#AppraisalOrgLevel").val()},
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


var dropDrowFormTypeFn = function(id){
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/salary/parameter/form",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
//			htmlOption+="<option value=''>All Form</option>";
			$.each(data,function(index,indexEntry){
				htmlOption+="<option value="+indexEntry['appraisal_form_id']+">"+indexEntry['appraisal_form_name']+"</option>";
			});
			$("#AppraisalForm").html(htmlOption);
		}
	});
}


var dropDrowPositionFn = function(id){

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/bonus/advance_search/position_name",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{
			"organization_id" : $("#organization").val(),
			"employee_id" : $("#EmpName_id").val()
		},
		success:function(data){
			var htmlOption="";
			$.each(data,function(index,indexEntry){
			
					htmlOption+="<option value="+indexEntry['position_id']+">"+indexEntry['position_name']+"</option>";				
			});
			$("#Position").html(htmlOption);
		}
	});
}

var appraisalStatusFn = function () {
    $.ajax({
        url: restfulURL + "/" + serviceName + "/public/bonus/advance_search/status",
        type: "get",
        dataType: "json",
        async: false,
        data: {
        	"flag": "emp_result_judgement_flag",
        	"appraisal_form_id": $("#AppraisalForm").val(),
        	"appraisal_type_id": 2
        },
        headers: { Authorization: "Bearer " + tokenID.token },
        success: function (data) {
        	var htmlOption="";
//			htmlOption+="<option value=''>All Status</option>";
            $.each(data, function (index, indexEntry) {
            	htmlOption += "<option value='" + indexEntry['stage_id'] + "'>" + indexEntry['status'] + "</option>";
            });
            $("#status").html(htmlOption);
        }
    });
}

var searchAdvanceFn = function () {

    $("#embedParamSearch").empty();
    var embedParam = "";
    embedParam += "<input type='hidden' class='embed_param_search' id='embed_appraisal_level_id_org' name='embed_appraisal_level_id_org' value='" + $("#AppraisalOrgLevel").val()+"'>";
    embedParam += "<input type='hidden' class='embed_param_search' id='embed_appraisal_level_id_emp' name='embed_appraisal_level_id_emp' value='" + $("#AppraisalEmpLevel").val() + "'>";
    embedParam += "<input type='hidden' class='embed_param_search' id='embed_period_id' name='embed_period_id' value='" + $("#AppraisalPeriod").val()+"'>";
    embedParam += "<input type='hidden' class='embed_param_search' id='embed_position_id' name='embed_position_id' value='" + $("#Position").val() + "'>";
    embedParam += "<input type='hidden' class='embed_param_search' id='embed_emp_id' name='embed_emp_id' value='"+$("#EmpName_id").val()+"'>";
//    embedParam += "<input type='hidden' class='embed_param_search' id='embed_year_list' name='embed_year_list' value='" + $("#AppraisalYear").val() + "'>";
    embedParam += "<input type='hidden' class='embed_param_search' id='embed_organization' name='embed_organization' value='"+$("#organization").val()+"'>";
    embedParam += "<input type='hidden' class='embed_param_search' id='embed_status' name='embed_status' value='" + $("#status").val() + "'>";
    embedParam += "<input type='hidden' class='embed_param_search' id='embed_appraisal_form' name='embed_appraisal_form' value='" + $("#AppraisalForm").val() + "'>";

    $("#embedParamSearch").append(embedParam);
    
    to_action();
    getDataFn(pageNumberDefault,$("#rpp").val());
};

//Get Data
var getDataFn = function (page, rpp) {
    var position_id = [];
    
    var level_id_org = $("#embed_appraisal_level_id_org").val();
    var level_id_emp = $("#embed_appraisal_level_id_emp").val();
    var period_id = $("#embed_period_id").val();
    var emp_id = $("#embed_emp_id").val();
    var org_id = $("#embed_organization").val();
    var status = $("#embed_status").val();
    var form = $("#embed_appraisal_form").val();
    position_id.push($("#embed_position_id").val());
    $("#average-score").html("0");
	$("#sd-score").html("0");
    /* Test Parameter 
    var testParam ={
    		"level_id_org" : level_id_org,
    		"level_id_emp" : level_id_emp,
    		"period_id" : period_id,
    		"position_id" : position_id,
    		"emp_id" : emp_id,
    		"org_id" : org_id,
    		"status" : status,
    		"form" : form
    }    
    console.log(testParam);
    */
    
    $.ajax({
        url: restfulURL + "/" + serviceName + "/public/salary",
//    	url: restfulURL + "/" + serviceName + "/public/emp/adjustment",
        type: "get",
        dataType: "json",
        async: true,
        headers: { Authorization: "Bearer " + tokenID.token },
        data: {
//            "page": page,
//            "rpp": rpp,
//            "emp_level": level_id_emp,
//            "org_level": level_id_org,
//            "period_id": period_id,
            "position_id": position_id,        
//            "org_id": org_id,
//            "emp_id": emp_id,
//            "stage_id": status,
            "appraisal_form_id": 10
        },
        success: function (data) {
//        	console.log(data);
            listDataFn(data[1]);
            setThemeColorFn(tokenID.theme_color);
//            globalData = data['result'];
//            paginationSetUpFn(globalData['current_page'], globalData['last_page'], globalData['last_page']);
        }
    });
};

var to_action = function () {
	var status = $("#embed_status").val();
    $.ajax({
        url: restfulURL + "/" + serviceName + "/public/emp/adjustment/to_action",
        type: "get",
        dataType: "json",
        async: true,
        data: {
            "stage_id": status,
            "flag": "emp_result_judgement_flag",
            "appraisal_type_id": 2,
            "appraisal_form_id": $("#embed_appraisal_form").val()
        },
        headers: { Authorization: "Bearer " + tokenID.token },
        success: function (data) {
        	var htmlOption="";
            $.each(data, function (index, indexEntry) {
            	htmlOption += "<option value='" + indexEntry['stage_id'] + "'>" + indexEntry['to_action'] + "</option>";
            });
            $("#actionToAssign").html(htmlOption);
            
            if($("#actionToAssign").val()==null) {
            	$("#btnConfirm,#btnSubmit,#btn_search_calculate").prop("disabled", true);
            } else {
            	$("#btnConfirm,#btnSubmit,#btn_search_calculate").prop("disabled", false);
            }
        }
    });
}

var listDataFn = function(data) {
	var htmlHTML="";
	var edit_flag = "";
	
	if(data['items'].length==0) {
		htmlHTML +="<tr>";
		htmlHTML +="<td colspan=\"46\">";
		htmlHTML +="<div style='margin-top: 40px;margin-bottom: 40px;font-weight: bold;color: #e04747;' align='center'>No Data to Display.</div>";
		htmlHTML +="</td>";
		htmlHTML +="</tr";
		$("#list_empjudege").html(htmlHTML);
		return;
	}

	$.each(data['items'],function (index, indexEntry) {
		let knowledge_point = Comma(notNullFn(indexEntry.knowledge_point));
		let capability_point = Comma(notNullFn(indexEntry.capability_point));
		let total_point = Comma(notNullFn(indexEntry.total_point));
		let baht_per_point = Comma(notNullFn(indexEntry.baht_per_point));
		let score_manager = Comma(notNullFn(indexEntry.score_manager));
		let score_bu = Comma(notNullFn(indexEntry.score_bu));
		let score_coo = Comma(notNullFn(indexEntry.score_coo));
		let total_percent = Comma(notNullFn(indexEntry.total_percent));
		let fix_percent = Comma(notNullFn(indexEntry.fix_percent));
		let var_percent = Comma(notNullFn(indexEntry.var_percent));
		
//		let var_percent = Comma(notNullFn(indexEntry.cal_standard));
//		let var_percent = Comma(notNullFn(indexEntry.cal_standard));
//		let var_percent = Comma(notNullFn(indexEntry.cal_standard));
//		let var_percent = Comma(notNullFn(indexEntry.cal_standard));
//		let var_percent = Comma(notNullFn(indexEntry.cal_standard));
//		let var_percent = Comma(notNullFn(indexEntry.cal_standard));

		
		let total_now_salary = Comma(notNullFn(indexEntry.total_now_salary));
		let salary = Comma(notNullFn(indexEntry.salary));
		let pqpi_amount = Comma(notNullFn(indexEntry.pqpi_amount));
		let fix_other_amount = Comma(notNullFn(indexEntry.fix_other_amount));
		let mpi_amount = Comma(notNullFn(indexEntry.mpi_amount));
		let pi_amount = Comma(notNullFn(indexEntry.pi_amount));
		let var_other_amount = Comma(notNullFn(indexEntry.var_other_amount));
		let miss_over = Comma(notNullFn(indexEntry.miss_over));
		let cal_standard = Comma(notNullFn(indexEntry.cal_standard));
		
		var job_code = notNullTextFn(indexEntry.job_code);
		var grade = notNullTextFn(indexEntry.grade);
		
		htmlHTML += "<tr class='control-calculate'>";
		htmlHTML += "	<td class=\"pos-column-cen gr\">"+indexEntry.appraisal_form_name+"</td>";
		htmlHTML += "	<td class='data-main pos-column-cen no' emp_result_id='"+indexEntry.emp_result_id+"' emp_id='"+indexEntry.emp_id+"'>"+index+"</td>";
		htmlHTML += "	<td class='pos-column-cen ec'>"+indexEntry.emp_code+"</td>";
		htmlHTML += "	<td class='pos-column-lef en'>"+indexEntry.emp_name+"</td>";
		htmlHTML += "	<td class='pos-column-lef po'>"+indexEntry.position_name+"</td>";
		htmlHTML += "	<td class='pos-column-cen pg'>"+indexEntry.PG+"</td>";
		htmlHTML += "	<td class='pos-column-lef or'>"+indexEntry.org_name+"</td>";
		htmlHTML += "	<td class='pos-column-cen jc'>"+job_code+"</td>";
		htmlHTML += "	<td class='pos-column-cen pc'>"+indexEntry.position_code+"</td>";
		htmlHTML += "	<td class='pos-column-rig kn'>"+knowledge_point+"</td>";
		htmlHTML += "	<td class='pos-column-rig pe'>"+capability_point+"</td>";
		htmlHTML += "	<td class='pos-column-rig tp'>"+total_point+"</td>";
		htmlHTML += "	<td class='pos-column-rig bp'>"+baht_per_point+"</td>";
		htmlHTML += "	<td class='pos-column-cen str1'></td>";
		htmlHTML += "	<td class='pos-column-cen str2'></td>";
		htmlHTML += "	<td class='pos-column-cen str3'></td>";
		htmlHTML += "	<td class='pos-column-cen str4'></td>";
		htmlHTML += "	<td class='pos-column-cen str5'></td>";
		htmlHTML += "	<td class='pos-column-rig mgr'>"+score_manager+"</td>";
		htmlHTML += "	<td class='pos-column-rig bu'>"+score_bu+"</td>";
		htmlHTML += "	<td class='pos-column-rig coo'>"+score_coo+"</td>";
		htmlHTML += "	<td class='pos-column-cen grade'>"+grade+"</td>";
		htmlHTML += "	<td class='pos-column-rig sal1'>"+total_percent+"</td>";
		htmlHTML += "	<td class='pos-column-rig sal2'>"+fix_percent+"</td>";
		htmlHTML += "	<td class='pos-column-rig sal3'>"+var_percent+"</td>";
		htmlHTML += "	<td class=\"data-current-total pos-column-rig cursal1\" data-value=\""+indexEntry.total_now_salary+"\">"+total_now_salary+"</td>";
		htmlHTML += "	<td class=\"data-current-salary pos-column-rig cursal2\" data-value=\""+indexEntry.salary+"\">"+salary+"</td>";
		htmlHTML += "	<td class=\"data-current-pqpi pos-column-rig cursal3\" data-value=\""+indexEntry.pqpi_amount+"\">"+pqpi_amount+"</td>";
		htmlHTML += "	<td class='pos-column-rig cursal4'>"+fix_other_amount+"</td>";
		htmlHTML += "	<td class='pos-column-rig cursal5'>"+mpi_amount+"</td>";
		htmlHTML += "	<td class='pos-column-rig cursal6'>"+pi_amount+"</td>";
		htmlHTML += "	<td class='pos-column-rig cursal7'>"+var_other_amount+"</td>";
		htmlHTML += "	<td class='pos-column-rig busy'>"+miss_over+"</td>";
		htmlHTML += "	<td class='pos-column-rig cal'>"+cal_standard+"</td>";
		htmlHTML += "	<td class='data-percent percal1'>";
		htmlHTML += "		<div class='float-label-control'>";
		htmlHTML += "			<input type='text' style='text-align:right; min-width:40px;' class='form-control input-xs span12 percent numberOnly' now_salary='"+indexEntry.total_now_salary+"' value='0.00' />";
		htmlHTML += "		</div>";
		htmlHTML += "	</td>";
		htmlHTML += "	<td class='data-score percal2'>";
		htmlHTML += "		<div class='float-label-control'>";
		htmlHTML += "			<input type='text' style='text-align:right; min-width: 40px;' class='form-control input-xs span12 score numberOnly' now_salary='"+indexEntry.total_now_salary+"' value='0.00' />";
		htmlHTML += "		</div>";
		htmlHTML += "	</td>";
		
		htmlHTML += "	<td class='data-up-total pos-column-rig changesal1' data-value=\"0.00\"></td>";
		
		htmlHTML += "	<td class='data-salary changesal2'>";
		htmlHTML += "		<div class='float-label-control'>";
		htmlHTML += "			<input type='text' style='text-align:right; min-width:40px;' class='form-control input-xs span12 salary numberOnly' value='0.00' />";
		htmlHTML += "		</div>";
		htmlHTML += "	</td>";
		htmlHTML += "	<td class='data-pqpi changesal3'>";
		htmlHTML += "		<div class='float-label-control'>";
		htmlHTML += "			<input type='text' style='text-align:right; min-width: 40px;' class='form-control input-xs span12 pqpi numberOnly' value='0.00' />";
		htmlHTML += "		</div>";
		htmlHTML += "	</td>";
		
		htmlHTML += "	<td class=\"data-percent-diff pos-column-rig changesal4\" data-value=\"0.00\"></td>";
		
		htmlHTML += "	<td class=\"data-new-total-salary pos-column-rig newsal1\"  data-value=\""+indexEntry.total_now_salary+"\">"+total_now_salary+"</td>";
		htmlHTML += "	<td class=\"data-new-salary pos-column-rig newsal2\" data-value=\""+indexEntry.salary+"\">"+salary+"</td>";
		htmlHTML += "	<td class=\"data-new-pqpi pos-column-rig newsal3\" data-value=\""+indexEntry.pqpi_amount+"\">"+pqpi_amount+"</td>";
		htmlHTML += "	<td class=\"data-new-fix-other pos-column-rig newsal4\" data-value=\""+indexEntry.fix_other_amount+"\">"+fix_other_amount+"</td>";
		htmlHTML += "	<td class=\"data-new-mpi pos-column-rig newsal5\" data-value=\""+indexEntry.mpi_amount+"\">"+mpi_amount+"</td>";
		htmlHTML += "	<td class=\"data-new-pi pos-column-rig newsal6\" data-value=\""+indexEntry.pi_amount+"\">"+pi_amount+"</td>";
		htmlHTML += "	<td class=\"data-new-var-other pos-column-rig newsal7\" data-value=\""+indexEntry.var_other_amount+"\">"+var_other_amount+"</td>";
		htmlHTML += "</tr>";	
	});
	
	htmlHTML += "<tr>";
	htmlHTML += "	<td class=\"pos-column-cen\"></td>";
	htmlHTML += "	<td class=\"pos-column-cen\"></td>";
	htmlHTML += "	<td class=\"pos-column-cen\"></td>";
	htmlHTML += "	<td class=\"pos-column-cen\"></td>";
	htmlHTML += "	<td class=\"pos-column-cen\"></td>";
	htmlHTML += "	<td class=\"pos-column-cen\"></td>";
	htmlHTML += "	<td class=\"pos-column-cen\"></td>";
	htmlHTML += "	<td class=\"pos-column-cen\"></td>";
	htmlHTML += "	<td class=\"pos-column-cen\"></td>";
	htmlHTML += "	<td class=\"pos-column-cen\"></td>";
	htmlHTML += "	<td class=\"pos-column-cen\"></td>";
	htmlHTML += "	<td class=\"pos-column-cen\"></td>";
	htmlHTML += "	<td class=\"pos-column-cen\"></td>";
	htmlHTML += "	<td class=\"pos-column-cen\"></td>";
	htmlHTML += "	<td class=\"pos-column-cen\"></td>";
	htmlHTML += "	<td class='pos-column-cen'></td>";
	htmlHTML += "	<td class='pos-column-cen'></td>";
	htmlHTML += "	<td class='pos-column-cen'></td>";
	htmlHTML += "	<td class=\"pos-column-cen\"></td>";
	htmlHTML += "	<td class=\"pos-column-cen\"></td>";
	htmlHTML += "	<td class=\"pos-column-cen\"></td>";
	htmlHTML += "	<td class=\"pos-column-cen\"></td>";
	htmlHTML += "	<td class=\"pos-column-cen\"></td>";
	htmlHTML += "	<td class=\"pos-column-cen\"></td>";
	htmlHTML += "		<td class=\"bold pos-column-rig\">Total</td>";
	htmlHTML += "		<td data-value=\"\" class=\"bold pos-column-rig ft-sum-current-total\"></td>";
	htmlHTML += "		<td data-value=\"\" class=\"bold pos-column-rig ft-sum-current-salary\"></td>";
	htmlHTML += "		<td data-value=\"\" class=\"bold pos-column-rig ft-sum-current-pqpi\"></td>";
	htmlHTML += "		<td data-value=\"\" class=\"bold pos-column-rig ft-sum-current-fix-other\"></td>";
	htmlHTML += "		<td data-value=\"\" class=\"bold pos-column-rig ft-sum-current-mipi\"></td>";
	htmlHTML += "		<td data-value=\"\" class=\"bold pos-column-rig ft-sum-current-pi\"></td>";
	htmlHTML += "		<td data-value=\"\" class=\"bold pos-column-rig ft-sum-current-var-other\"></td>";
	htmlHTML += "		<td data-value=\"\" class=\"bold pos-column-rig ft-sum-missover\"></td>";
	htmlHTML += "		<td data-value=\"\" class=\"bold pos-column-rig ft-sum-cal-standard\"></td>";
	htmlHTML += "		<td data-value=\"\" class=\"bold pos-column-rig ft-sum-percent\"></td>";
	htmlHTML += "		<td data-value=\"\" class=\"bold pos-column-rig ft-sum-bath\"></td>";
	htmlHTML += "		<td data-value=\"\" class=\"bold pos-column-rig ft-sum-change-total\"></td>";
	htmlHTML += "		<td data-value=\"\" class=\"bold pos-column-rig ft-sum-change-salary\"></td>";
	htmlHTML += "		<td data-value=\"\" class=\"bold pos-column-rig ft-sum-change-pqpi\"></td>";
	htmlHTML += "		<td data-value=\"\" class=\"bold pos-column-rig ft-sum-change-diff\"></td>";
	htmlHTML += "		<td data-value=\"\" class=\"bold pos-column-rig ft-sum-new-total\"></td>";
	htmlHTML += "		<td data-value=\"\" class=\"bold pos-column-rig ft-sum-new-salary\"></td>";
	htmlHTML += "		<td data-value=\"\" class=\"bold pos-column-rig ft-sum-new-pqpi\"></td>";
	htmlHTML += "		<td data-value=\"\" class=\"bold pos-column-rig ft-sum-new-fix-other\"></td>";
	htmlHTML += "		<td data-value=\"\" class=\"bold pos-column-rig ft-sum-new-mpi\"></td>";
	htmlHTML += "		<td data-value=\"\" class=\"bold pos-column-rig ft-sum-new-pi\"></td>";
	htmlHTML += "		<td data-value=\"\" class=\"bold pos-column-rig ft-sum-new-var-other\"></td>";
	htmlHTML += "</tr>";
	$("#list_empjudege").html(htmlHTML);

	//footer sum total
	$(".ft-sum-current-total,.ft-sum-new-total").attr('data-value', notNullFn(data.sum_total_now_salary));
	$(".ft-sum-current-salary,.ft-sum-new-salary").attr('data-value', notNullFn(data.sum_salary));
	$(".ft-sum-current-pqpi,.ft-sum-new-pqpi").attr('data-value', notNullFn(data.sum_pqpi_amount));
	$(".ft-sum-current-fix-other,.ft-sum-new-fix-other").attr('data-value', notNullFn(data.sum_fix_other_amount));
	$(".ft-sum-current-mipi,.ft-sum-new-mpi").attr('data-value', notNullFn(data.sum_mpi_amount));
	$(".ft-sum-current-pi,.ft-sum-new-pi").attr('data-value', notNullFn(data.sum_pi_amount));
	$(".ft-sum-current-var-other,.ft-sum-new-var-other").attr('data-value', notNullFn(data.sum_var_other_amount));
	
	$(".ft-sum-missover").attr('data-value', notNullFn(data.sum_miss_over));
	$(".ft-sum-cal-standard").attr('data-value', notNullFn(data.sum_cal_standard));
	
	$(".ft-sum-current-total,.ft-sum-new-total").text(Comma(notNullFn(data.sum_total_now_salary)));
	$(".ft-sum-current-salary,.ft-sum-new-salary").text(Comma(notNullFn(data.sum_salary)));
	$(".ft-sum-current-pqpi,.ft-sum-new-pqpi").text(Comma(notNullFn(data.sum_pqpi_amount)));
	$(".ft-sum-current-fix-other,.ft-sum-new-fix-other").text(Comma(notNullFn(data.sum_fix_other_amount)));
	$(".ft-sum-current-mipi,.ft-sum-new-mpi").text(Comma(notNullFn(data.sum_mpi_amount)));
	$(".ft-sum-current-pi,.ft-sum-new-pi").text(Comma(notNullFn(data.sum_pi_amount)));
	$(".ft-sum-current-var-other,.ft-sum-new-var-other").text(Comma(notNullFn(data.sum_var_other_amount)));
	
	$(".ft-sum-missover").text(Comma(notNullFn(data.sum_miss_over)));
	$(".ft-sum-cal-standard").text(Comma(notNullFn(data.sum_cal_standard)));
	
    $(".ft-sum-percent").text(notNullFn());
    $(".ft-sum-bath").text(notNullFn());
    $(".ft-sum-change-total").text(notNullFn());
    $(".ft-sum-change-salary").text(notNullFn());
    $(".ft-sum-change-pqpi").text(notNullFn());
    $(".ft-sum-change-diff").text(notNullFn());
    
    $("#ft-sum-percent").attr('data-value', notNullFn());
    $("#ft-sum-bath").attr('data-value', notNullFn());
    $("#ft-sum-change-total").attr('data-value', notNullFn());
    $("#ft-sum-change-salary").attr('data-value', notNullFn());
    $("#ft-sum-change-pqpi").attr('data-value', notNullFn());
    $("#ft-sum-change-diff").attr('data-value', notNullFn());

	$(".numberOnly").autoNumeric('init');
	$(".numberOnly").autoNumeric('update', {
		vMin : '0',
		vMax : '99999999',
		lZero: 'deny',
		wEmpty: 'zero',
		//aSign : ' %',
		//pSign : 's'
	});
	
	if($("#actionToAssign").val()==null || $("#actionToAssign").val()==undefined) {
		$("#btnSubmit").attr("disabled");
    } else {
    	$("#btnSubmit").removeAttr("disabled");
    }
	
	$(".head_adjust").show();
	
	createDatatable();
	calculatePercentKeyup();
	filterGroup(data['items']);
};

var createDatatable = function() {
    var table = $('#tableBonusAdjustment');
	if(startDatatable==true) {
		startDatatable = false; // เซตให้รันแค่ครั้งแรก
		table.DataTable({
//			fixedHeader: {
//				header: true,
//		        footer: true
//		    },
			fixedHeader: true,
			"ordering": false,
			"bInfo" : false,
			"scrollY": 300,
	        "scrollX": true,
		    scrollCollapse: true,
		    paging: false,
		    fixedColumns: {
		    	leftColumns: 1
		    },
		    dom: 'lr<"table-filter-container">tip',
		    initComplete: function(settings) {
		    	var api = new $.fn.dataTable.Api(settings);
		    	$('.table-filter-container', api.table().container()).append(
		    		$('#table-filter-group').detach().show()
		        );
		    	
		    	$('#table-filter-group select').on('change', function(){
		    		table.search(this.value).draw();   
		        });       
		    },
		    "iDisplayLength": -1,
		    "bPaginate": true,
		    "iCookieDuration": 60,
		    "bStateSave": false,
		    "bAutoWidth": true,
		    "bScrollAutoCss": true,
		    "bProcessing": true,
		    "bRetrieve": true,
		    "bJQueryUI": true,
		    columnDefs: [
		    	{ "width": "50px", "targets": [0] }, //Group
		    	{ "width": "30x", "targets": [1] }, //No
		    	{ "width": "90px", "targets": [2] }, //Emp Code
		    	{ "width": "200px", "targets": [3] }, //Employee Name
		    	{ "width": "200px", "targets": [4] }, //Position
		    	{ "width": "30px", "targets": [5] }, //PG
		    	{ "width": "200px", "targets": [6] }, //ฝ่าย
		    	{ "width": "100px", "targets": [7] }, //Job Code
		    	{ "width": "130px", "targets": [8] }, //Position Code
		    	{ "width": "150px", "targets": [9] }, //คะแนนเต็มตีค่างาน(ความรู้)
		    	{ "width": "150px", "targets": [10] }, //คะแนนเต็มตีค่างาน(ศักยภาพ)
		    	{ "width": "100px", "targets": [11] }, //Total Point
		    	{ "width": "100px", "targets": [12] }, //Baht/Point
		    	{ "width": "180px", "targets": [13] }, //ผลการประเมินค่างาน
		    	{ "width": "150px", "targets": [14] }, //คะแนนความรู้	
		    	{ "width": "150px", "targets": [15] }, //คะแนนศักยภาพ
		    	{ "width": "200px", "targets": [16] }, //คะแนนผลงานปีที่ผ่านมา
		    	{ "width": "200px", "targets": [17] }, //คะแนนความสามารถที่มีคุณค่าต่อองค์กร
		    	{ "width": "100px", "targets": [18] }, //คะแนนประเมินMgr 
		    	{ "width": "100px", "targets": [19] }, //คะแนนประเมินBU 
		    	{ "width": "100px", "targets": [20] }, //คะแนนประเมินCOO
		    	{ "width": "50px", "targets": [21] }, //เกรด
		    	{ "width": "180px", "targets": [22] }, //รายได้รวมที่ควรได้ 
		    	{ "width": "180px", "targets": [23] }, //รายได้ Fix
		    	{ "width": "180px", "targets": [24] }, //รายได้ Var
		    	{ "width": "180px", "targets": [25] }, //รายได้ปัจจุบันTotal
		    	{ "width": "100px", "targets": [26] }, //Salary
		    	{ "width": "100px", "targets": [27] }, //P-QPI
		    	{ "width": "100px", "targets": [28] }, //อื่นๆ
		    	{ "width": "100px", "targets": [29] }, //MPI
		    	{ "width": "100px", "targets": [30] }, //PI
		    	{ "width": "100px", "targets": [31] }, //อื่นๆ
		    	{ "width": "100px", "targets": [32] }, //ขาด/เกิน
		    	{ "width": "100px", "targets": [33] }, //Cal Standard
		    	{ "width": "100px", "targets": [34] }, //%
		    	{ "width": "100px", "targets": [35] }, //Bath
		    	{ "width": "100px", "targets": [36] }, //ปรับรายได้
		    	{ "width": "100px", "targets": [37] }, //ปรับเงินเงินเดือน
		    	{ "width": "100px", "targets": [38] }, //ปรับ P-QPI	
		    	{ "width": "100px", "targets": [39] }, //% Diff
		    	{ "width": "100px", "targets": [40] }, //รายได้ใหม่Total
		    	{ "width": "100px", "targets": [41] }, //Salary
		    	{ "width": "100px", "targets": [42] }, //P-QPI
		    	{ "width": "100px", "targets": [43] }, //อื่นๆ
		    	{ "width": "100px", "targets": [44] }, //MPI
		    	{ "width": "100px", "targets": [45] }, //PI
		    	{ "width": "100px", "targets": [46] } //อื่นๆ
		    ]
		});
		
		
//		$("#tableBonusAdjustment").css({
//			"table-layout": "fixed"
//		});
		
		//ต้องเซทหลังจากสร้าง datatable ไม่งั้น css datatables จะทับ
		$(".fix-column-top").css({"text-align" : "center", "border-bottom" : "0px"});
		$(".pos-column-lef").css({"text-align" : "left"});
		$(".pos-column-cen").css({"text-align" : "center"});
		$(".pos-column-rig").css({"text-align" : "right"});
		$(".pos-column-rig").closest('.bold').css({"font-weight" : "bold"});
		
		/*
		$("#tableBonusAdjustment").find('.gr').css({"width": "2%"}); //33
		$("#tableBonusAdjustment").find('.no').css({"width": "1%"});
		$("#tableBonusAdjustment").find('.ec').css({"width": "3%"});
		$("#tableBonusAdjustment").find('.en').css({"width": "4%"});
		$("#tableBonusAdjustment").find('.po').css({"width": "4%"});
		$("#tableBonusAdjustment").find('.pg').css({"width": "1%"});
		$("#tableBonusAdjustment").find('.or').css({"width": "4%"});
		$("#tableBonusAdjustment").find('.jc').css({"width": "3%"});
		$("#tableBonusAdjustment").find('.pc').css({"width": "3%"});
		$("#tableBonusAdjustment").find('.kn').css({"width": "3%"});
		$("#tableBonusAdjustment").find('.pe').css({"width": "3%"});
		
		$("#tableBonusAdjustment").find('.tp').css({"width": "3%"});// 28
		$("#tableBonusAdjustment").find('.bp').css({"width": "3%"});
		$("#tableBonusAdjustment").find('.str1').css({"width": "3%"});
		$("#tableBonusAdjustment").find('.str2').css({"width": "3%"});
		$("#tableBonusAdjustment").find('.str3').css({"width": "3%"});
		$("#tableBonusAdjustment").find('.str4').css({"width": "3%"});
		$("#tableBonusAdjustment").find('.str5').css({"width": "3%"});
		$("#tableBonusAdjustment").find('.mgr').css({"width": "3%"});
		$("#tableBonusAdjustment").find('.bu').css({"width": "3%"});
		$("#tableBonusAdjustment").find('.coo').css({"width": "3%"});
		
		$("#tableBonusAdjustment").find('.grade').css({"width": "3%"});// 9
		$("#tableBonusAdjustment").find('.busy').css({"width": "3%"});
		$("#tableBonusAdjustment").find('.cal').css({"width": "3%"});
		
		//30
		$("#tableBonusAdjustment").find('.sal').css({"width": "6%"});
		$("#tableBonusAdjustment").find('.sal1').css({"width": "2%"});
		$("#tableBonusAdjustment").find('.sal2').css({"width": "2%"});
		$("#tableBonusAdjustment").find('.sal3').css({"width": "2%"});
		
		$("#tableBonusAdjustment").find('.cursal').css({"width": "8%"});
		$("#tableBonusAdjustment").find('.cursal1').css({"width": "2%"});
		$("#tableBonusAdjustment").find('.cursal2').css({"width": "1%"});
		$("#tableBonusAdjustment").find('.cursal3').css({"width": "1%"});
		$("#tableBonusAdjustment").find('.cursal4').css({"width": "1%"});
		$("#tableBonusAdjustment").find('.cursal5').css({"width": "1%"});
		$("#tableBonusAdjustment").find('.cursal6').css({"width": "1%"});
		$("#tableBonusAdjustment").find('.cursal7').css({"width": "1%"});
		
		$("#tableBonusAdjustment").find('.percal').css({"width": "3%"});
		$("#tableBonusAdjustment").find('.percal1').css({"width": "1.5%"});
		$("#tableBonusAdjustment").find('.percal2').css({"width": "1.5%"});
		
		$("#tableBonusAdjustment").find('.changesal').css({"width": "6%"});
		$("#tableBonusAdjustment").find('.changesal1').css({"width": "2%"});
		$("#tableBonusAdjustment").find('.changesal2').css({"width": "2%"});
		$("#tableBonusAdjustment").find('.changesal3').css({"width": "1%"});
		$("#tableBonusAdjustment").find('.changesal4').css({"width": "1%"});
		
		$("#tableBonusAdjustment").find('.newsal').css({"width": "7%"});
		$("#tableBonusAdjustment").find('.newsal1').css({"width": "2%"});
		$("#tableBonusAdjustment").find('.newsal2').css({"width": "1%"});
		$("#tableBonusAdjustment").find('.newsal3').css({"width": "1%"});
		$("#tableBonusAdjustment").find('.newsal4').css({"width": "1%"});
		$("#tableBonusAdjustment").find('.newsal5').css({"width": "1%"});
		$("#tableBonusAdjustment").find('.newsal6').css({"width": "0.5%"});
		$("#tableBonusAdjustment").find('.newsal7').css({"width": "0.5%"});
		*/
		
	}
	
	table.DataTable().fixedColumns().update(); //refresh column freeze
//	table.DataTable().fixedColumns().relayout();
}

var filterGroup = function(data) {
	var htmlHTMLFilter = "";
	htmlHTMLFilter+="<option value=\"\">All</option>";
	const unique = [...new Set(data.map(item => item.appraisal_form_name))];
	unique.forEach(function (value, i) { //loop exmple [1,2,3]
		htmlHTMLFilter+="<option value=\""+value+"\">"+value+"</option>";
	});
	$("#filter-group").html(htmlHTMLFilter);
}

var calculatePercentKeyup = function() {
	
	function calculateSumtotalFooter() {
		let sumPercent = 0;
		let sumBath = 0;
		let sumTotalChangeSalary = 0;
		let sumChangeSalary = 0;
		let sumChangePQPI = 0;
		let sumChangeDiff = 0;
		let sumTotalNewSalary = 0;
		let sumNewSalary = 0;
		let sumNewPQPI = 0;
		
		$.each($(".control-calculate").get(),function(index,indexEntry) {
			if (typeof $(indexEntry).attr('data-dt-row') !== typeof undefined && $(indexEntry).attr('data-dt-row') !== false) {
				//เป็นคลาสของ datatables ซึ่งจะไม่เอาข้อมูลในส่วนนี้
			} else {
				sumPercent += Number(removeComma($(indexEntry).find('.data-percent').find('.percent').val()));
				sumBath += Number(removeComma($(indexEntry).find('.data-score').find('.score').val()));
				sumTotalChangeSalary += Number(removeComma($(indexEntry).find('.data-up-total').attr('data-value')));
				sumChangeSalary += Number(removeComma($(indexEntry).find('.data-salary').find('.salary').val()));
				sumChangePQPI += Number(removeComma($(indexEntry).find('.data-pqpi').find('.pqpi').val()));
				sumChangeDiff += Number(removeComma($(indexEntry).find('.data-percent-diff').attr('data-value')));
				sumTotalNewSalary += Number(removeComma($(indexEntry).find('.data-new-total-salary').attr('data-value')));
				sumNewSalary += Number(removeComma($(indexEntry).find('.data-new-salary').attr('data-value')));
				sumNewPQPI += Number(removeComma($(indexEntry).find('.data-new-pqpi').attr('data-value')));
			}
		});
		
		console.log(sumPercent,'sumPercent');
		console.log(sumBath,'sumBath');
		console.log(sumTotalChangeSalary,'sumTotalChangeSalary');
		console.log(sumChangeSalary,'sumChangeSalary');
		console.log(sumChangePQPI,'sumChangePQPI');
		console.log(sumChangeDiff,'sumChangeDiff');
		console.log(sumTotalNewSalary,'sumTotalNewSalary');
		console.log(sumNewSalary,'sumNewSalary');
		console.log(sumNewPQPI,'sumNewPQPI');

		$(".ft-sum-percent").attr('data-value', sumPercent);
		$(".ft-sum-bath").attr('data-value', sumBath);
		$(".ft-sum-change-total").attr('data-value', sumTotalChangeSalary);
		$(".ft-sum-change-salary").attr('data-value', sumChangeSalary);
		$(".ft-sum-change-pqpi").attr('data-value', sumChangePQPI);
		$(".ft-sum-change-diff").attr('data-value', sumChangeDiff);
		$(".ft-sum-new-total").attr('data-value', sumTotalNewSalary);
		$(".ft-sum-new-salary").attr('data-value', sumNewSalary);
		$(".ft-sum-new-pqpi").attr('data-value', sumNewPQPI);
		
		$("#list_empjudege").find(".ft-sum-percent").text(Comma(sumPercent.toFixed(2)));
		$("#list_empjudege").find(".ft-sum-bath").text(Comma(sumBath.toFixed(2)));
		$("#list_empjudege").find(".ft-sum-change-total").text(Comma(sumTotalChangeSalary.toFixed(2)));
		$("#list_empjudege").find(".ft-sum-change-salary").text(Comma(sumChangeSalary.toFixed(2)));
		$("#list_empjudege").find(".ft-sum-change-pqpi").text(Comma(sumChangePQPI.toFixed(2)));
		$("#list_empjudege").find(".ft-sum-change-diff").text(Comma(sumChangeDiff.toFixed(2)));
		$("#list_empjudege").find(".ft-sum-new-total").text(Comma(sumTotalNewSalary.toFixed(2)));
		$("#list_empjudege").find(".ft-sum-new-salary").text(Comma(sumNewSalary.toFixed(2)));
		$("#list_empjudege").find(".ft-sum-new-pqpi").text(Comma(sumNewPQPI.toFixed(2)));
	}
	
	$("#list_empjudege").find('.percent').keyup(function() {
		var percent = $(this).autoNumeric('get');
		
		//คำนวน % ของรายได้ปัจจุบัน Total ว่าเป็นกี่ Bath
		var now_salary = Number($(this).attr("now_salary"));
		var total = (percent/100)*now_salary;
		$(this).closest('.control-calculate').find('.data-score').find('.score').autoNumeric('set', total);
		calculateSumtotalFooter();
	});
		
	$("#list_empjudege").find('.score').keyup(function() {
		var score = $(this).autoNumeric('get');
		
		//คำนวน Bath ของรายได้ปัจจุบัน Total ว่าเป็นกี่ %
		var now_salary = Number($(this).attr("now_salary"));
		var total = (now_salary == 0 ? 0 : (score*100)/now_salary);
		$(this).closest('.control-calculate').find('.data-percent').find('.percent').autoNumeric('set', total);
		calculateSumtotalFooter();
	});
	
	function calculateNewSalaryTotal(elementThis, salaryOrPQPI) {
		console.log(elementThis,'Ethis')
		console.log(salaryOrPQPI,'salaryOrPQPI')
		var new_pqpi = Number(elementThis.closest('.control-calculate').find('.data-new-pqpi').attr('data-value'));
		var new_fix_other = Number(elementThis.closest('.control-calculate').find('.data-new-fix-other').attr('data-value'));
		var new_mipi = Number(elementThis.closest('.control-calculate').find('.data-new-mpi').attr('data-value'));
		var new_pi = Number(elementThis.closest('.control-calculate').find('.data-new-pi').attr('data-value'));
		var new_var_other = Number(elementThis.closest('.control-calculate').find('.data-new-var-other').attr('data-value'));
		console.log(new_pqpi,'new_pqpi');
		console.log(new_fix_other,'new_fix_other');
		console.log(new_mipi,'new_mipi');
		console.log(new_pi,'new_pi');
		console.log(new_var_other,'new_var_other');
		var total = salaryOrPQPI + new_pqpi + new_fix_other + new_mipi + new_pi + new_var_other;
		console.log(total,'total');
		elementThis.closest('.control-calculate').find('.data-new-total-salary').attr('data-value', total.toFixed(2));
		elementThis.closest('.control-calculate').find('.data-new-total-salary').text(Comma(total.toFixed(2)));
	}
	
	$("#list_empjudege").find('.salary').keyup(function() {
		var salary = Number($(this).autoNumeric('get'));
		
		//คำนวน ปรับรายได้ Total
		var pqpi_score = Number($(this).closest('.control-calculate').find('.data-pqpi').find('.pqpi').autoNumeric('get'));
		var total = pqpi_score + salary;
		$(this).closest('.control-calculate').find('.data-up-total').attr('data-value', total.toFixed(2));
		$(this).closest('.control-calculate').find('.data-up-total').text(Comma(total.toFixed(2)));
		
		//คำนวน รายได้ใหม่  ตรง salary
		var current_salary = Number($(this).closest('.control-calculate').find('.data-current-salary').attr('data-value'));
		var new_salary = current_salary + salary;
		$(this).closest('.control-calculate').find('.data-new-salary').attr('data-value', new_salary.toFixed(2));
		$(this).closest('.control-calculate').find('.data-new-salary').text(Comma(new_salary.toFixed(2)));
		
		//คำนวน % Diff
		var data_current_total = Number($(this).closest('.control-calculate').find('.data-current-total').attr('data-value'));
		var val_diff = total/data_current_total;
		console.log(val_diff,'val_diff')
		$(this).closest('.control-calculate').find('.data-percent-diff').attr('data-value', val_diff.toFixed(2));
		$(this).closest('.control-calculate').find('.data-percent-diff').text(Comma(val_diff.toFixed(2)));
//		$(this).closest('.control-calculate').find('.data-percent-diff').find('.ellipsis').attr('data-text', Comma(val_diff.toFixed(2)));
//		$(this).closest('.control-calculate').find('.data-percent-diff').find('.ellipsis').text(Comma(val_diff.toFixed(2)));
		
		//คำนวน รายได้ใหม่ total
		calculateNewSalaryTotal($(this), new_salary);
		calculateSumtotalFooter();
	});
	
	$("#list_empjudege").find('.pqpi').keyup(function() {
		var pqpi = Number($(this).autoNumeric('get'));
		console.log(pqpi,'pqpi')
		//คำนวน ปรับรายได้ Total
		var salary_score = Number($(this).closest('.control-calculate').find('.data-salary').find('.salary').autoNumeric('get'));
		console.log(salary_score,'salary_score pqpi')
		var total = salary_score + pqpi;
		console.log(total,'total_pqpi')
		$(this).closest('.control-calculate').find('.data-up-total').attr('data-value', total.toFixed(2));
		$(this).closest('.control-calculate').find('.data-up-total').text(Comma(total.toFixed(2)));
		
		//คำนวน รายได้ใหม่  ตรง  P-QPI
		var current_pqpi = Number($(this).closest('.control-calculate').find('.data-current-pqpi').attr('data-value'));
		var new_pqpi = current_pqpi + pqpi;
		$(this).closest('.control-calculate').find('.data-new-pqpi').attr('data-value', new_pqpi.toFixed(2));
		$(this).closest('.control-calculate').find('.data-new-pqpi').text(Comma(new_pqpi.toFixed(2)));
		
		//คำนวน % Diff
		var data_current_total = Number($(this).closest('.control-calculate').find('.data-current-total').attr('data-value'));
		var val_diff = total/data_current_total;
		console.log(val_diff,'val_diff')
		$(this).closest('.control-calculate').find('.data-percent-diff').attr('data-value', val_diff.toFixed(2));
		$(this).closest('.control-calculate').find('.data-percent-diff').text(Comma(val_diff.toFixed(2)));
//		$(this).closest('.control-calculate').find('.data-percent-diff').find('.ellipsis').attr('data-text', Comma(val_diff.toFixed(2)));
//		$(this).closest('.control-calculate').find('.data-percent-diff').find('.ellipsis').text(Comma(val_diff.toFixed(2)));
		
		//คำนวน รายได้ใหม่ total
		calculateNewSalaryTotal($(this), new_pqpi);
		calculateSumtotalFooter();
	});	
}

var insertFn = function() {
	var stage_id = $("#actionToAssign").val();
	var detail = [];
	$.each($(".control-calculate").get(),function(index,indexEntry) {
		if (typeof $(indexEntry).attr('data-dt-row') !== typeof undefined && $(indexEntry).attr('data-dt-row') !== false) {
			//เป็นคลาสของ datatables ซึ่งจะไม่เอาข้อมูลในส่วนนี้
		} else {
			detail.push({
				emp_result_id		: $(indexEntry).find('.data-main').attr('emp_result_id'),
				emp_id				: $(indexEntry).find('.data-main').attr('emp_id'),
				salary				: $(indexEntry).find('.data-salary').find('.salary').autoNumeric('get'),
				pqpi				: $(indexEntry).find('.data-pqpi').find('.pqpi').autoNumeric('get')
				
				//salary				: removeComma($(indexEntry).find('.data-salary').find('.salary').val()),
				//pqpi				: removeComma($(indexEntry).find('.data-pqpi').find('.pqpi').val())
			});
		}
	});

    $.ajax({
        url: restfulURL + "/" + serviceName + "/public/emp/adjustment",
        type: "post",
        dataType: "json",
        async: true,
        data: {
        	"stage_id": stage_id,
        	"detail": detail
        },
        headers: { Authorization: "Bearer " + tokenID.token },
        success: function (resData) {
        	if(resData.status == 200) {
			appraisalStatusFn();
        		getDataFn();
        		callFlashSlide($(".lt-update-successfully").val());
        		clearFn();
        	} else if(resData.status == 400) {
        		callFlashSlide(resData.data);
        	}
        }
    });
}

$(document).ready(function() {

	username = $('#user_portlet').val();
	password = $('#pass_portlet').val();
	var plid = $('#plid_portlet').val();

	if(username!="" && username!=null & username!=[] && username!=undefined ) {
		if(connectionServiceFn(username,password,plid)==true) {
	
			dropDrowYearListFn();
			dropDrowPeriodListFn();
			dropDrowFormTypeFn();
			dropDrowAppraisalEmpLevelFn();
			dropDrowAppraisalOrgLevelFn();
			dropDrowOrgFn();
			dropDrowPositionFn();
			appraisalStatusFn();
			
			$("#AppraisalYear").change(function(){
				dropDrowPeriodListFn();
			});
			
			$("#AppraisalEmpLevel").change(function() {
				dropDrowAppraisalOrgLevelFn();
				dropDrowOrgFn();
			});
			
			$("#AppraisalOrgLevel").change(function() {
				dropDrowOrgFn();
			});
			
			$("#AppraisalForm").change(function() {
				appraisalStatusFn();
			});
			
			$("#organization").change(function() {
				dropDrowPositionFn();
				refreshMultiPosition();
			});
			
			
			$("#Position").multiselect({minWidth:'100%;'}).multiselectfilter();
			  refreshMultiPosition();
			
			$("#EmpName").autocomplete({
		        source: function (request, response) {
		        	$.ajax({
						 url:restfulURL+"/"+serviceName+"/public/bonus/advance_search/employee_name",
						 type:"GET",
						 dataType:"json",
						 data:{
							 "employee_name":request.term,
							 "organization_id":$("#organization").val(),
							 "individual_level":$("#AppraisalEmpLevel").val()
							 },
						//async:false,
						 headers:{Authorization:"Bearer "+tokenID.token},
		                 error: function (xhr, textStatus, errorThrown) {
		                        console.log('Error: ' + xhr.responseText);
		                    },
						 success:function(data){
								response($.map(data, function (item) {
		                            return {
		                                label: item.emp_name+"("+item.emp_code+")",
		                                value: item.emp_name,
		                                emp_id: item.emp_id
		                            };
		                        }));
							
						},
						beforeSend:function(){
							$("body").mLoading('hide');	
						}
						
						});
		        },
				select:function(event, ui) {
					$("#EmpName").val(ui.item.label);
		            $("#EmpName_id").val(ui.item.emp_id);
		            galbalDataTemp['EmpName'] = ui.item.label;
		            galbalDataTemp['EmpName_id']= ui.item.emp_id;
		            return false;
		        },change: function(e, ui) {
					if ($("#EmpName").val() == galbalDataTemp['EmpName']) {
						$("#EmpName_id").val(galbalDataTemp['EmpName_id']);
					} else if (ui.item != null){
						$("#EmpName_id").val(ui.item.emp_id);
					} else {
						$("#EmpName_id").val("");
					}
					
					dropDrowPositionFn();
					refreshMultiPosition();
		         }       
		    });
			
			//Search Start
		    $("#btnSearchAdvance").click(function () {
		        searchAdvanceFn();
		    	if($("#rpp").val()=='' || $("#rpp").val() == undefined){  // default  
					$(".countPagination").val('All');
					$("#rpp").remove();
				}
		        $("#search_result").show();
		        clearFn();
		    });
		    
		    $("#btnSubmit").click(function() {
		    	insertFn();
		    });
		    
		    //binding tooltip start
		    $('[data-toggle="tooltip"]').css({"cursor":"pointer"});
		    $('[data-toggle="tooltip"]').tooltip({
		    	 html:true
		    });
		    
		    $("#advanceSearchAppraisalGroup").show();
		}
	}
});
