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

var clearFooterSumFn = function() {
	$(".dataTables_scrollFoot").find("#list_footer").find("td").text("");
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
        	"flag": "salary_adjustment_flag",
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
        url: restfulURL + "/" + serviceName + "/public/salary/show",
//    	url: restfulURL + "/" + serviceName + "/public/emp/adjustment",
        type: "get",
        dataType: "json",
        async: true,
        headers: { Authorization: "Bearer " + tokenID.token },
        data: {
            "page": page,
            "rpp": rpp,
            "emp_level": level_id_emp,
            "org_level": level_id_org,
            "period_id": period_id,
            "position_id": position_id,        
            "org_id": org_id,
            "emp_id": emp_id,
            "stage_id": status,
            "appraisal_form_id": form
        },
        success: function (data) {
            listDataFn(data[1]);
//            setThemeColorFn(tokenID.theme_color);
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
            "flag": "salary_adjustment_flag",
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
        }
    });
}

var listDataFn = function(data) {
	var htmlHTML="";
	var edit_flag = "";
	
	var table = $('#tableBonusAdjustment');
	table.DataTable().clear();
	table.DataTable().destroy();
	//ก่อน generate data ต้องเคลีย freeze เก่าออก ไม่งั้นข้อมูลมันไม่เปลี่ยน

	if(data==undefined) {
		createDatatable(table, data); //สร้างรูปแบบ datatable
		clearFooterSumFn(); //clear sum ใน footer
		$(".head_adjust").hide();
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
		
		let str1 = Comma(notNullFn(indexEntry.one));
		let str2 = Comma(notNullFn(indexEntry.two));
		let str3 = Comma(notNullFn(indexEntry.three));
		let str4 = Comma(notNullFn(indexEntry.four));
		let str5 = Comma(notNullFn(indexEntry.five));

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
		
		index += 1
		
		htmlHTML += "<tr class='control-calculate'>";
//		htmlHTML += "	<td class='data-main pos-column-cen no' emp_result_id='"+indexEntry.emp_result_id+"' emp_id='"+indexEntry.emp_id+"'>"+index+"</td>";
		htmlHTML += "	<td class='data-main pos-column-cen ec' emp_result_id='"+indexEntry.emp_result_id+"' emp_id='"+indexEntry.emp_id+"'>"+indexEntry.emp_code+"</td>";
		htmlHTML += "	<td class='pos-column-lef en'>"+indexEntry.emp_name+"</td>";
		htmlHTML += "	<td class='pos-column-cen pg'>"+indexEntry.PG+"</td>";
		htmlHTML += "	<td class='pos-column-lef or'>"+indexEntry.org_name+"</td>";
		htmlHTML += "	<td class=\"pos-column-cen gr\">"+indexEntry.appraisal_form_name+"</td>";
		htmlHTML += "	<td class='pos-column-lef po'>"+indexEntry.position_name+"</td>";
		htmlHTML += "	<td class='pos-column-cen jc'>"+job_code+"</td>";
//		htmlHTML += "	<td class='pos-column-cen pc'>"+indexEntry.position_code+"</td>";
		htmlHTML += "	<td class='pos-column-rig kn'>"+knowledge_point+"</td>";
		htmlHTML += "	<td class='pos-column-rig pe'>"+capability_point+"</td>";
		htmlHTML += "	<td class='pos-column-rig tp'>"+total_point+"</td>";
		htmlHTML += "	<td class='pos-column-rig bp'>"+baht_per_point+"</td>";
		htmlHTML += "	<td class='pos-column-cen str1'>"+str1+"</td>";
		htmlHTML += "	<td class='pos-column-cen str2'>"+str2+"</td>";
		htmlHTML += "	<td class='pos-column-cen str3'>"+str3+"</td>";
		htmlHTML += "	<td class='pos-column-cen str4'>"+str4+"</td>";
		htmlHTML += "	<td class='pos-column-cen str5'>"+str5+"</td>";
		htmlHTML += "	<td class='pos-column-rig mgr'>"+score_manager+"</td>";
		htmlHTML += "	<td class='pos-column-rig bu'>"+score_bu+"</td>";
		htmlHTML += "	<td class='pos-column-rig coo'>"+score_coo+"</td>";
		htmlHTML += "	<td class='pos-column-cen grade'>"+grade+"</td>";
		htmlHTML += "	<td class='pos-column-rig sal1'>"+total_percent+"</td>";
		htmlHTML += "	<td class='pos-column-rig sal2'>"+fix_percent+"</td>";
		htmlHTML += "	<td class='pos-column-rig sal3'>"+var_percent+"</td>";
		htmlHTML += "	<td class=\"data-current-total pos-column-rig cursal1\" data-value=\""+notNullFn(indexEntry.total_now_salary)+"\">"+total_now_salary+"</td>";
		htmlHTML += "	<td class=\"data-current-salary pos-column-rig cursal2\" data-value=\""+notNullFn(indexEntry.salary)+"\">"+salary+"</td>";
		htmlHTML += "	<td class=\"data-current-pqpi pos-column-rig cursal3\" data-value=\""+notNullFn(indexEntry.pqpi_amount)+"\">"+pqpi_amount+"</td>";
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
		
		htmlHTML += "	<td class=\"data-new-total-salary pos-column-rig newsal1\"  data-value=\""+notNullFn(indexEntry.total_now_salary)+"\">"+total_now_salary+"</td>";
		htmlHTML += "	<td class=\"data-new-salary pos-column-rig newsal2\" data-value=\""+notNullFn(indexEntry.salary)+"\">"+salary+"</td>";
		htmlHTML += "	<td class=\"data-new-pqpi pos-column-rig newsal3\" data-value=\""+notNullFn(indexEntry.pqpi_amount)+"\">"+pqpi_amount+"</td>";
		htmlHTML += "	<td class=\"data-new-fix-other pos-column-rig newsal4\" data-value=\""+notNullFn(indexEntry.fix_other_amount)+"\">"+fix_other_amount+"</td>";
		htmlHTML += "	<td class=\"data-new-mpi pos-column-rig newsal5\" data-value=\""+notNullFn(indexEntry.mpi_amount)+"\">"+mpi_amount+"</td>";
		htmlHTML += "	<td class=\"data-new-pi pos-column-rig newsal6\" data-value=\""+notNullFn(indexEntry.pi_amount)+"\">"+pi_amount+"</td>";
		htmlHTML += "	<td class=\"data-new-var-other pos-column-rig newsal7\" data-value=\""+notNullFn(indexEntry.var_other_amount)+"\">"+var_other_amount+"</td>";
		htmlHTML += "</tr>";	
	});
	$("#list_empjudege").html(htmlHTML);
	
	//footer sum total
	var htmlHTMLFooter = "";
	htmlHTMLFooter += "<tr>";
	htmlHTMLFooter += "	<td></td>";
	htmlHTMLFooter += "	<td></td>";
	htmlHTMLFooter += "	<td></td>";
	htmlHTMLFooter += "	<td></td>";
	htmlHTMLFooter += "	<td></td>";
	htmlHTMLFooter += "	<td></td>";
	htmlHTMLFooter += "	<td></td>";
	htmlHTMLFooter += "	<td></td>";
	htmlHTMLFooter += "	<td></td>";
	htmlHTMLFooter += "	<td></td>";
	htmlHTMLFooter += "	<td></td>";
	htmlHTMLFooter += "	<td></td>";
	htmlHTMLFooter += "	<td></td>";
	htmlHTMLFooter += "	<td></td>";
	htmlHTMLFooter += "	<td></td>";
	htmlHTMLFooter += "	<td></td>";
	htmlHTMLFooter += "	<td></td>";
	htmlHTMLFooter += "	<td></td>";
	htmlHTMLFooter += "	<td></td>";
	htmlHTMLFooter += "	<td></td>";
	htmlHTMLFooter += "	<td></td>";
	htmlHTMLFooter += "	<td></td>";
	htmlHTMLFooter += "		<td class=\"bold pos-column-rig\">Total</td>";
	htmlHTMLFooter += "		<td data-value=\""+notNullFn(data.sum_total_now_salary)+"\" class=\"bold pos-column-rig ft-sum-current-total\">"+Comma(notNullFn(data.sum_total_now_salary))+"</td>";
	htmlHTMLFooter += "		<td data-value=\""+notNullFn(data.sum_salary)+"\" class=\"bold pos-column-rig ft-sum-current-salary\">"+Comma(notNullFn(data.sum_salary))+"</td>";
	htmlHTMLFooter += "		<td data-value=\""+notNullFn(data.sum_pqpi_amount)+"\" class=\"bold pos-column-rig ft-sum-current-pqpi\">"+Comma(notNullFn(data.sum_pqpi_amount))+"</td>";
	htmlHTMLFooter += "		<td data-value=\""+notNullFn(data.sum_fix_other_amount)+"\" class=\"bold pos-column-rig ft-sum-current-fix-other\">"+Comma(notNullFn(data.sum_fix_other_amount))+"</td>";
	htmlHTMLFooter += "		<td data-value=\""+notNullFn(data.sum_mpi_amount)+"\" class=\"bold pos-column-rig ft-sum-current-mipi\">"+Comma(notNullFn(data.sum_mpi_amount))+"</td>";
	htmlHTMLFooter += "		<td data-value=\""+notNullFn(data.sum_pi_amount)+"\" class=\"bold pos-column-rig ft-sum-current-pi\">"+Comma(notNullFn(data.sum_pi_amount))+"</td>";
	htmlHTMLFooter += "		<td data-value=\""+notNullFn(data.sum_var_other_amount)+"\" class=\"bold pos-column-rig ft-sum-current-var-other\">"+Comma(notNullFn(data.sum_var_other_amount))+"</td>";
	
	htmlHTMLFooter += "		<td data-value=\""+notNullFn(data.sum_miss_over)+"\" class=\"bold pos-column-rig ft-sum-missover\">"+Comma(notNullFn(data.sum_miss_over))+"</td>";
	htmlHTMLFooter += "		<td data-value=\""+notNullFn(data.sum_cal_standard)+"\" class=\"bold pos-column-rig ft-sum-cal-standard\">"+Comma(notNullFn(data.sum_cal_standard))+"</td>";
	
	htmlHTMLFooter += "		<td data-value=\""+notNullFn()+"\" class=\"bold pos-column-rig ft-sum-percent\">"+notNullFn()+"</td>";
	htmlHTMLFooter += "		<td data-value=\""+notNullFn()+"\" class=\"bold pos-column-rig ft-sum-bath\">"+notNullFn()+"</td>";
	htmlHTMLFooter += "		<td data-value=\""+notNullFn()+"\" class=\"bold pos-column-rig ft-sum-change-total\">"+notNullFn()+"</td>";
	htmlHTMLFooter += "		<td data-value=\""+notNullFn()+"\" class=\"bold pos-column-rig ft-sum-change-salary\">"+notNullFn()+"</td>";
	htmlHTMLFooter += "		<td data-value=\""+notNullFn()+"\" class=\"bold pos-column-rig ft-sum-change-pqpi\">"+notNullFn()+"</td>";
	htmlHTMLFooter += "		<td data-value=\""+notNullFn()+"\" class=\"bold pos-column-rig ft-sum-change-diff\">"+notNullFn()+"</td>";
	
	htmlHTMLFooter += "		<td data-value=\""+notNullFn(data.sum_total_now_salary)+"\" class=\"bold pos-column-rig ft-sum-new-total\">"+Comma(notNullFn(data.sum_total_now_salary))+"</td>";
	htmlHTMLFooter += "		<td data-value=\""+notNullFn(data.sum_salary)+"\" class=\"bold pos-column-rig ft-sum-new-salary\">"+Comma(notNullFn(data.sum_salary))+"</td>";
	htmlHTMLFooter += "		<td data-value=\""+notNullFn(data.sum_pqpi_amount)+"\" class=\"bold pos-column-rig ft-sum-new-pqpi\">"+Comma(notNullFn(data.sum_pqpi_amount))+"</td>";
	htmlHTMLFooter += "		<td data-value=\""+notNullFn(data.sum_fix_other_amount)+"\" class=\"bold pos-column-rig ft-sum-new-fix-other\">"+Comma(notNullFn(data.sum_fix_other_amount))+"</td>";
	htmlHTMLFooter += "		<td data-value=\""+notNullFn(data.sum_mpi_amount)+"\" class=\"bold pos-column-rig ft-sum-new-mpi\">"+Comma(notNullFn(data.sum_mpi_amount))+"</td>";
	htmlHTMLFooter += "		<td data-value=\""+notNullFn(data.sum_pi_amount)+"\" class=\"bold pos-column-rig ft-sum-new-pi\">"+Comma(notNullFn(data.sum_pi_amount))+"</td>";
	htmlHTMLFooter += "		<td data-value=\""+notNullFn(data.sum_var_other_amount)+"\" class=\"bold pos-column-rig ft-sum-new-var-other\">"+Comma(notNullFn(data.sum_var_other_amount))+"</td>";
	htmlHTMLFooter += "</tr>";
	$("#list_footer").html(htmlHTMLFooter);

	$(".numberOnly").autoNumeric('init');
	$(".numberOnly").autoNumeric('update', {
		vMin : '0',
		vMax : '99999999',
		lZero: 'deny',
		wEmpty: 'zero',
		//aSign : ' %',
		//pSign : 's'
	});
	
	createDatatable(table, data); //สร้างรูปแบบ datatable
	calculatePercentKeyup(); //เซ็ตค่าการกดคำนวนต่างๆ
	filterGroup(data['items']); //generate filter group
	setPermission(data); //set สิทการจัดการข้อมูล
	
	$(".head_adjust").show();
};

var setPermission = function(data) {
	if(data.edit_flag==0) {
		$("#list_empjudege").find(".percent").attr("disabled", true);
		$("#list_empjudege").find(".score").attr("disabled", true);
		$("#list_empjudege").find(".salary").attr("disabled", true);
		$("#list_empjudege").find(".pqpi").attr("disabled", true);
		$("#btnSubmit").attr("disabled", true);
	} else {
		$("#list_empjudege").find(".percent").attr("disabled", false);
		$("#list_empjudege").find(".score").attr("disabled", false);
		$("#list_empjudege").find(".salary").attr("disabled", false);
		$("#list_empjudege").find(".pqpi").attr("disabled", false);
		$("#btnSubmit").attr("disabled", false);
	}
	
	if($("#actionToAssign").val()==null || $("#actionToAssign").val()==undefined) {
		$("#btnSubmit").attr("disabled", true);
    } else {
    	$("#btnSubmit").attr("disabled", false);
    }
}

var createDatatable = function(table, data) {
	table.DataTable({
		fixedHeader: {
			header: true,
	        footer: true
	    },
//		fixedHeader: true,
		"ordering": false,
		"bInfo" : false,
		"scrollY": 350,
        "scrollX": true,
	    scrollCollapse: true,
	    paging: false,
	    fixedColumns: {
	    	leftColumns: 4
	    },
	    "searching": true,
	    dom: 'lr<"table-filter-container">tip',
//	    initComplete: function(settings) {
//	    	var api = new $.fn.dataTable.Api(settings);
//	    	$('.table-filter-container', api.table().container()).append(
//	    		$('#table-filter-group').detach().show()
//	        );
//	    	
//	    	$('#table-filter-group select').on('change', function(){
//	    		table.search(this.value).draw();   
//	        });
//	    },
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
	    	{ "width": "90px", "targets": [0] }, //Emp Code
	    	{ "width": "200px", "targets": [1] }, //Employee Name
	    	{ "width": "30px", "targets": [2] }, //PG
	    	{ "width": "200px", "targets": [3] }, //org
	    	{ "width": "50px", "targets": [4] }, //Group
//	    	{ "width": "30x", "targets": [5] }, //No
	    	{ "width": "200px", "targets": [5] }, //Position
	    	{ "width": "70px", "targets": [6] }, //Job Code
//	    	{ "width": "101px", "targets": [8] }, //Position Code
	    	{ "width": "130px", "targets": [7] }, //คะแนนเต็มตีค่างาน(ความรู้)
	    	{ "width": "130px", "targets": [8] }, //คะแนนเต็มตีค่างาน(ศักยภาพ)
	    	{ "width": "80px", "targets": [9] }, //Total Point
	    	{ "width": "80px", "targets": [10] }, //Baht/Point
	    	{ "width": "145px", "targets": [11] }, //ผลการประเมินค่างาน
	    	{ "width": "95px", "targets": [12] }, //คะแนนความรู้	
	    	{ "width": "110px", "targets": [13] }, //คะแนนศักยภาพ
	    	{ "width": "170px", "targets": [14] }, //คะแนนผลงานปีที่ผ่านมา
	    	{ "width": "145px", "targets": [15] }, //คะแนนความสามารถที่มีคุณค่าต่อองค์กร
	    	{ "width": "100px", "targets": [16] }, //คะแนนประเมินMgr 
	    	{ "width": "100px", "targets": [17] }, //คะแนนประเมินBU 
	    	{ "width": "100px", "targets": [18] }, //คะแนนประเมินCOO
	    	{ "width": "50px", "targets": [19] }, //เกรด
	    	{ "width": "130px", "targets": [20] }, //รายได้รวมที่ควรได้ 
	    	{ "width": "100px", "targets": [21] }, //รายได้ Fix
	    	{ "width": "100px", "targets": [22] }, //รายได้ Var
	    	{ "width": "100px", "targets": [23] }, //รายได้ปัจจุบันTotal
	    	{ "width": "80px", "targets": [24] }, //Salary
	    	{ "width": "80px", "targets": [25] }, //P-QPI
	    	{ "width": "80px", "targets": [26] }, //อื่นๆ
	    	{ "width": "80px", "targets": [27] }, //MPI
	    	{ "width": "80px", "targets": [28] }, //PI
	    	{ "width": "80px", "targets": [29] }, //อื่นๆ
	    	{ "width": "80px", "targets": [30] }, //ขาด/เกิน
	    	{ "width": "80px", "targets": [31] }, //Cal Standard
	    	{ "width": "80px", "targets": [32] }, //%
	    	{ "width": "80px", "targets": [33] }, //Bath
	    	{ "width": "80px", "targets": [34] }, //ปรับรายได้
	    	{ "width": "80px", "targets": [35] }, //ปรับเงินเงินเดือน
	    	{ "width": "80px", "targets": [36] }, //ปรับ P-QPI	
	    	{ "width": "80px", "targets": [37] }, //% Diff
	    	{ "width": "80px", "targets": [38] }, //รายได้ใหม่Total
	    	{ "width": "80px", "targets": [39] }, //Salary
	    	{ "width": "80px", "targets": [40] }, //P-QPI
	    	{ "width": "80px", "targets": [41] }, //อื่นๆ
	    	{ "width": "80px", "targets": [42] }, //MPI
	    	{ "width": "80px", "targets": [43] }, //PI
	    	{ "width": "80px", "targets": [44] } //อื่นๆ
	    ]
	});
	
//	.fixedColumns().relayout();
	
	$('#filter-group').change(function() {
        table.DataTable()
        .columns(0).search(this.value)
        .draw();
	}); // เซ็ตการค้นหาในคอลั่มแรก
	
	/*
	$(function() {
	    // Check the initial Poistion of the Sticky Header
	 var stickyHeaderTop = $('#tableBonusAdjustment').offset().top;
	 $(window).scroll(function() {
	if ($(window).scrollTop() > stickyHeaderTop) {
	  $('.dataTables_scrollHead, .DTFC_LeftHeadWrapper').css('transform', 'translateY(0%)');
	  $('.DTFC_LeftHeadWrapper').css({position: 'fixed',top: '0px',zIndex: '1',left: 'auto'});
	  $('.dataTables_scrollHead').css({position: 'fixed',top: '0px', zIndex: '1' });
	  $('.DTFC_ScrollWrapper').css({height: ''});
	 
	 }
	 else {
	  $('.DTFC_LeftHeadWrapper, .DTFC_LeftHeadWrapper').css({position: 'relative',top: '0px'});
	  $('.dataTables_scrollHead').css({position: 'relative', top: '0px'});
	  $('.dataTables_scrollHead').css('transform', 'translateY(0%)');
	      }

	    });
	 });
	 */
    
    var textOne = data==undefined || data.total_one==0.00 || data.total_one==null ? "" : "<br>("+data.total_one+" คะแนน)";
    var textTwo = data==undefined || data.total_two==0.00 || data.total_two==null ? "" : "<br>("+data.total_two+" คะแนน)";
    var textThree = data==undefined || data.total_three==0.00 || data.total_three==null ? "" : "<br>("+data.total_three+" คะแนน)";
    var textFour = data==undefined || data.total_four==0.00 || data.total_four==null ? "" : "<br>("+data.total_four+" คะแนน)";
    var textFive = data==undefined || data.total_five==0.00 || data.total_five==null ? "" : "<br>("+data.total_five+" คะแนน)";
    
    $("#scroll-tableBonusAdjustment").find(".dataTables_scrollHeadInner").find(".fix-column-top").closest(".str1").html("ผลการประเมินค่างาน"+ textOne);
	$("#scroll-tableBonusAdjustment").find(".dataTables_scrollHeadInner").find(".fix-column-top").closest(".str2").html("คะแนนความรู้"+ textTwo);
	$("#scroll-tableBonusAdjustment").find(".dataTables_scrollHeadInner").find(".fix-column-top").closest(".str3").html("คะแนนศักยภาพ"+ textThree);
	$("#scroll-tableBonusAdjustment").find(".dataTables_scrollHeadInner").find(".fix-column-top").closest(".str4").html("คะแนนผลงานปีที่ผ่านมา"+ textFour);
	$("#scroll-tableBonusAdjustment").find(".dataTables_scrollHeadInner").find(".fix-column-top").closest(".str5").html("คะแนนความสามารถที่มีคุณค่าต่อองค์กร"+ textFive);
    
	$(".fix-column-top").css({"text-align" : "center", "border-bottom" : "0px"});
	$("table.dataTable.no-footer").css({"border-bottom" : "0px"});
	$(".pos-column-lef").css({"text-align" : "left"});
	$(".pos-column-cen").css({"text-align" : "center"});
	$(".pos-column-rig").css({"text-align" : "right"});
	$(".pos-column-rig").closest('.bold').css({"font-weight" : "bold"});
}

var filterGroup = function(data) {
	var htmlHTMLFilter = "";
	htmlHTMLFilter+="<option value=\"\">All</option>";
	
	if(data!=undefined) {
		const unique = [...new Set(data.map(item => item.appraisal_form_name))];
		unique.forEach(function (value, i) { //loop exmple [1,2,3]
			htmlHTMLFilter+="<option value=\""+value+"\">"+value+"</option>";
		});
	}
	
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

		$(".ft-sum-percent").attr('data-value', sumPercent);
		$(".ft-sum-bath").attr('data-value', sumBath);
		$(".ft-sum-change-total").attr('data-value', sumTotalChangeSalary);
		$(".ft-sum-change-salary").attr('data-value', sumChangeSalary);
		$(".ft-sum-change-pqpi").attr('data-value', sumChangePQPI);
		$(".ft-sum-change-diff").attr('data-value', sumChangeDiff);
		$(".ft-sum-new-total").attr('data-value', sumTotalNewSalary);
		$(".ft-sum-new-salary").attr('data-value', sumNewSalary);
		$(".ft-sum-new-pqpi").attr('data-value', sumNewPQPI);
		
		$(".dataTables_scrollFoot").find(".ft-sum-percent").text(Comma(sumPercent.toFixed(2)));
		$(".dataTables_scrollFoot").find(".ft-sum-bath").text(Comma(sumBath.toFixed(2)));
		$(".dataTables_scrollFoot").find(".ft-sum-change-total").text(Comma(sumTotalChangeSalary.toFixed(2)));
		$(".dataTables_scrollFoot").find(".ft-sum-change-salary").text(Comma(sumChangeSalary.toFixed(2)));
		$(".dataTables_scrollFoot").find(".ft-sum-change-pqpi").text(Comma(sumChangePQPI.toFixed(2)));
		$(".dataTables_scrollFoot").find(".ft-sum-change-diff").text(Comma(sumChangeDiff.toFixed(2)));
		$(".dataTables_scrollFoot").find(".ft-sum-new-total").text(Comma(sumTotalNewSalary.toFixed(2)));
		$(".dataTables_scrollFoot").find(".ft-sum-new-salary").text(Comma(sumNewSalary.toFixed(2)));
		$(".dataTables_scrollFoot").find(".ft-sum-new-pqpi").text(Comma(sumNewPQPI.toFixed(2)));
		
//		$("#list_empjudege").find(".ft-sum-percent").text(Comma(sumPercent.toFixed(2)));
//		$("#list_empjudege").find(".ft-sum-bath").text(Comma(sumBath.toFixed(2)));
//		$("#list_empjudege").find(".ft-sum-change-total").text(Comma(sumTotalChangeSalary.toFixed(2)));
//		$("#list_empjudege").find(".ft-sum-change-salary").text(Comma(sumChangeSalary.toFixed(2)));
//		$("#list_empjudege").find(".ft-sum-change-pqpi").text(Comma(sumChangePQPI.toFixed(2)));
//		$("#list_empjudege").find(".ft-sum-change-diff").text(Comma(sumChangeDiff.toFixed(2)));
//		$("#list_empjudege").find(".ft-sum-new-total").text(Comma(sumTotalNewSalary.toFixed(2)));
//		$("#list_empjudege").find(".ft-sum-new-salary").text(Comma(sumNewSalary.toFixed(2)));
//		$("#list_empjudege").find(".ft-sum-new-pqpi").text(Comma(sumNewPQPI.toFixed(2)));
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
		var new_pqpi = Number(elementThis.closest('.control-calculate').find('.data-new-pqpi').attr('data-value'));
		var new_fix_other = Number(elementThis.closest('.control-calculate').find('.data-new-fix-other').attr('data-value'));
		var new_mipi = Number(elementThis.closest('.control-calculate').find('.data-new-mpi').attr('data-value'));
		var new_pi = Number(elementThis.closest('.control-calculate').find('.data-new-pi').attr('data-value'));
		var new_var_other = Number(elementThis.closest('.control-calculate').find('.data-new-var-other').attr('data-value'));
		var total = salaryOrPQPI + new_pqpi + new_fix_other + new_mipi + new_pi + new_var_other;
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
		if(val_diff=="Infinity") {
			val_diff = 0;
			console.log("รายได้ปัจจุบัน Total เป็น 0 ถ้า (ปรับรายได้ Total/รายได้ปัจจุบัน Total) % diff จะเป็น infinity");
		}
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

		//คำนวน ปรับรายได้ Total
		var salary_score = Number($(this).closest('.control-calculate').find('.data-salary').find('.salary').autoNumeric('get'));
		var total = salary_score + pqpi;
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
		if(val_diff=="Infinity") {
			val_diff = 0;
			console.log("รายได้ปัจจุบัน Total เป็น 0 ถ้า (ปรับรายได้ Total/รายได้ปัจจุบัน Total) % diff จะเป็น infinity");
		}
		$(this).closest('.control-calculate').find('.data-percent-diff').attr('data-value', val_diff.toFixed(2));
		$(this).closest('.control-calculate').find('.data-percent-diff').text(Comma(val_diff.toFixed(2)));
//		$(this).closest('.control-calculate').find('.data-percent-diff').find('.ellipsis').attr('data-text', Comma(val_diff.toFixed(2)));
//		$(this).closest('.control-calculate').find('.data-percent-diff').find('.ellipsis').text(Comma(val_diff.toFixed(2)));
		
		//คำนวน รายได้ใหม่ total
		calculateNewSalaryTotal($(this), new_pqpi);
		calculateSumtotalFooter();
	});	
}

var updateFn = function() {
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
	
	console.log(detail);

    $.ajax({
        url: restfulURL + "/" + serviceName + "/public/salary/update",
        type: "patch",
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
        		callFlashSlide($(".lt-update-successfully").val());
        		clearFn();
        		$("#btnSearchAdvance").click();
        	} else if(resData.status == 400) {
        		validationFn(resData.data);
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
		    	updateFn();
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
