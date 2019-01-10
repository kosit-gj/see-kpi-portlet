var globalData="";
var galbalDataTemp=[]; 
//var phaseArray=[];
//var globalCount=0;
var username = "";
var password = "";
const pageNumberDefault=1;
var genJudgeHradComplete = 0;
var statusFakeAdjust;
var clearFn = function() {
	$("#information").hide();
	$(".sort-z-score").find('i').removeClass('fa-sort fa-sort-up fa-sort-down icon-sort-color');
	$(".sort-z-score").find('i').addClass('fa-sort');
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
		url:restfulURL+"/"+serviceName+"/public/bonus/advance_search/period",
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
		url:restfulURL+"/"+serviceName+"/public/bonus/advance_search/form",
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
var refreshMultiPosition = function() {
	$("#Position").multiselect('refresh').multiselectfilter();
	$("#Position_ms").css({'width':'100%'});
	$(".ui-icon-check,.ui-icon-closethick,.ui-icon-circle-close").css({'margin-top':'3px'});
	$('input[name=multiselect_Position]').css({'margin-bottom':'6px','margin-right':'3px'});
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
/*
var getDataCalculateFn = function(){
	//alert("Page : "+page+" - Rpp : "+rpp);


	var stage_id = $("#actionToAssign").val();
	var detail = [];
	$.each($(".control-calculate").get(),function(index,indexEntry){
		if($(indexEntry).find('.select-check').prop('checked')) {
			detail.push({
				emp_result_id		: $(indexEntry).find('.select-check').attr('id'),
				percent_adjust		: $(indexEntry).find('.data-percent').find('.percent').autoNumeric('get'),
				adjust_result_score	: $(indexEntry).find('.data-score').find('.score').autoNumeric('get'),
				edit_flag           : $(indexEntry).find('.select-check').attr('edit_flag')
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
        	"detail": detail,
        	"cal_flag" : 1
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
	
	
};
*/
//SearchAdvance
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
    fakeAdjustFn();
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
//        	console.log(data);
            listDataFn(data[1]['items']);
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

var fakeAdjustFn = function () {
	var status = $("#embed_status").val();
	$.ajax({
        url: restfulURL + "/" + serviceName + "/public/bonus/advance_search/fake_adjust",
        type: "get",
        dataType: "json",
        async: true,
        data: {
        	"stage_id" : status
        },
        headers: { Authorization: "Bearer " + tokenID.token },
        success: function (data) {
        	console.log(data['edit_flag'],'edit_flag');
        	if(data['edit_flag'].length==0) {
        		$("#fake_adjust,#fake_adjust_box").hide();
            	statusFakeAdjust = 3;
        	} else if(data['edit_flag']==0) {
            	$("#fake_adjust,#fake_adjust_box").hide();
            	statusFakeAdjust = 2;
        	} else {
        		var htmlOption="";
        		htmlOption+="<option value=''>"+$(".lt-select").val()+"</option>";
                $.each(data['data'], function (index, indexEntry) {
                	htmlOption += "<option value='" + indexEntry['emp_id'] + "-" + indexEntry['org_level_id'] + "'>" + indexEntry['emp_name'] + "</option>";
                });
                $("#fake_adjust").html(htmlOption);
        		$("#fake_adjust,#fake_adjust_box").show();
                statusFakeAdjust = 1;
        	}
        	
        }
    });
}

var listDataFn = function(data){
	console.log(data);
	var htmlHTML="";
	var edit_flag = "";
	
	if(data.length==0) {
		htmlHTML +="<tr>";
		htmlHTML +="<td colspan=\"46\">";
		htmlHTML +="<div style='margin-top: 40px;margin-bottom: 40px;font-weight: bold;color: #e04747;' align='center'>No Data to Display.</div>";
		htmlHTML +="</td>";
		htmlHTML +="</tr";
		$("#list_empjudege").html(htmlHTML);
		return;
	}

	$.each(data,function (index, indexEntry) {
		/* Generate table body */
		htmlHTML += "<tr class='control-calculate'>";
		htmlHTML += "	<td class='pos-column cen'>"+indexEntry.RowNumber+"</td>";
		htmlHTML += "	<td class='pos-column cen'>"+indexEntry.emp_code+"</td>";
		htmlHTML += "	<td class='pos-column lef'>"+indexEntry.emp_name+"</td>";
		htmlHTML += "	<td class='pos-column lef'>"+indexEntry.position_name+"</td>";
		htmlHTML += "	<td class='pos-column cen'>"+indexEntry.PG+"</td>";
		htmlHTML += "	<td class='pos-column lef'>"+indexEntry.org_name+"</td>";
		htmlHTML += "	<td class=\"filter-group pos-column cen\">"+indexEntry.appraisal_form_name+"</td>";
		htmlHTML += "	<td class='pos-column cen'>"+indexEntry.job_code+"</td>";
		htmlHTML += "	<td class='pos-column cen'>"+indexEntry.position_code+"</td>";
		htmlHTML += "	<td class='pos-column rig'>"+indexEntry.knowledge_point+"</td>";
		htmlHTML += "	<td class='pos-column rig'>"+indexEntry.capability_point+"</td>";
		htmlHTML += "	<td class=\"fix-column-left pos-column rig\">"+indexEntry.total_point+"</td>";
		htmlHTML += "	<td class='pos-column rig'>"+indexEntry.baht_per_point+"</td>";
		htmlHTML += "	<td class='pos-column cen'></td>";
		htmlHTML += "	<td class='pos-column cen'></td>";
		htmlHTML += "	<td class='pos-column cen'></td>";
		htmlHTML += "	<td class='pos-column cen'></td>";
		htmlHTML += "	<td class='pos-column cen'></td>";
		htmlHTML += "	<td class='pos-column rig'>"+indexEntry.score_manager+"</td>";
		htmlHTML += "	<td class='pos-column rig'>"+indexEntry.score_bu+"</td>";
		htmlHTML += "	<td class='pos-column rig'>"+indexEntry.score_coo+"</td>";
		htmlHTML += "	<td class='pos-column cen'>"+indexEntry.grade+"</td>";
		htmlHTML += "	<td class='pos-column rig'>"+indexEntry.total_percent+"</td>";
		htmlHTML += "	<td class='pos-column rig'>"+indexEntry.fix_percent+"</td>";
		htmlHTML += "	<td class='pos-column rig'>"+indexEntry.var_percent+"</td>";
		htmlHTML += "	<td class=\"data-current-total pos-column rig\" data-value=\""+indexEntry.total_now_salary+"\">"+indexEntry.total_now_salary+"</td>";
		htmlHTML += "	<td class=\"data-current-salary pos-column rig\" data-value=\""+indexEntry.salary+"\">"+indexEntry.salary+"</td>";
		htmlHTML += "	<td class=\"data-current-pqpi pos-column rig\" data-value=\""+indexEntry.pqpi_amount+"\">"+indexEntry.pqpi_amount+"</td>";
		htmlHTML += "	<td class='pos-column rig'>"+indexEntry.fix_other_amount+"</td>";
		htmlHTML += "	<td class='pos-column rig'>"+indexEntry.mpi_amount+"</td>";
		htmlHTML += "	<td class='pos-column rig'>"+indexEntry.pi_amount+"</td>";
		htmlHTML += "	<td class='pos-column rig'>"+indexEntry.var_other_amount+"</td>";
		htmlHTML += "	<td class='pos-column rig'>"+indexEntry.miss_over+"</td>";
		htmlHTML += "	<td class='pos-column rig'>"+indexEntry.cal_standard+"</td>";
		htmlHTML += "	<td class='data-percent'>";
		htmlHTML += "		<div class='float-label-control'>";
		htmlHTML += "			<input type='text' style='text-align:right; min-width:40px;' class='form-control input-xs span12 percent numberOnly' now_salary='"+indexEntry.total_now_salary+"' />";
		htmlHTML += "		</div>";
		htmlHTML += "	</td>";
		htmlHTML += "	<td class='data-score'>";
		htmlHTML += "		<div class='float-label-control'>";
		htmlHTML += "			<input type='text' style='text-align:right; min-width: 40px;' class='form-control input-xs span12 score numberOnly' now_salary='"+indexEntry.total_now_salary+"' />";
		htmlHTML += "		</div>";
		htmlHTML += "	</td>";
		
		htmlHTML += "	<td class='data-up-total pos-column rig' data-value=\"\"></td>";
		
		htmlHTML += "	<td class='data-salary'>";
		htmlHTML += "		<div class='float-label-control'>";
		htmlHTML += "			<input type='text' style='text-align:right; min-width:40px;' class='form-control input-xs span12 salary numberOnly '/>";
		htmlHTML += "		</div>";
		htmlHTML += "	</td>";
		htmlHTML += "	<td class='data-pqpi'>";
		htmlHTML += "		<div class='float-label-control'>";
		htmlHTML += "			<input type='text' style='text-align:right; min-width: 40px;' class='form-control input-xs span12 pqpi numberOnly' />";
		htmlHTML += "		</div>";
		htmlHTML += "	</td>";
		
		htmlHTML += "	<td class=\"data-percent-diff pos-column rig\" data-value=\"\"></td>";
		
		htmlHTML += "	<td class=\"data-new-total-salary pos-column rig\" data-value=\"\"></td>";
		htmlHTML += "	<td class=\"data-new-salary pos-column rig\" data-value=\"\"></td>";
		htmlHTML += "	<td class=\"data-new-pqpi pos-column rig\" data-value=\"\"></td>";
		htmlHTML += "	<td class=\"data-new-fix-other pos-column rig\" data-value=\""+indexEntry.fix_other_amount+"\">"+indexEntry.fix_other_amount+"</td>";
		htmlHTML += "	<td class=\"data-new-mpi pos-column rig\" data-value=\""+indexEntry.mpi_amount+"\">"+indexEntry.mpi_amount+"</td>";
		htmlHTML += "	<td class=\"data-new-pi pos-column rig\" data-value=\""+indexEntry.pi_amount+"\">"+indexEntry.pi_amount+"</td>";
		htmlHTML += "	<td class=\"data-new-var-other pos-column rig\" data-value=\""+indexEntry.var_other_amount+"\">"+indexEntry.var_other_amount+"</td>";
		htmlHTML += "</tr>";	
	});	
	$("#list_empjudege").html(htmlHTML);

	$(".numberOnly").autoNumeric('init');
	$(".numberOnly").autoNumeric('update', {
		vMin : '0',
		vMax : '99999999',
		lZero: 'deny',
		wEmpty: 'zero',
		//aSign : ' %',
		//pSign : 's'
	});
	
	$(".head_adjust").show();
	
	if($("#actionToAssign").val()==null || $("#actionToAssign").val()==undefined) {
		$("#btnSubmit,#btn_search_calculate").attr("disabled");
    } else {
    	$("#btnSubmit,#btn_search_calculate").removeAttr("disabled");
    }
	
	calculatePercentKeyup();
	filterGroup(data);
	filterGroupOnClick([]);
};

var expanded = false;
var showCheckboxesFilter = function() {
  var checkboxes = document.getElementById("multiselect-filter-checkboxes");
  if (!expanded) {
	checkboxes.style.display = "block";
	checkboxes.style.position = "absolute";
	checkboxes.style.backgroundColor = "#ffffff";
	checkboxes.style.borderRadius = "3px";
	checkboxes.style.maxHeight = "200px";
	checkboxes.style.maxWidth = "200px";
	checkboxes.style.overflowY = "scroll";
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}

$(document).mouseup(function(e) {
	var container = $("#multiselect-filter-checkboxes");
	// if the target of the click isn't the container nor a descendant of the container
		if (!container.is(e.target) && container.has(e.target).length === 0) {
		        container.hide();
		}
});

var filterGroup = function(data) {
	var htmlHTMLFilter = "";
	htmlHTMLFilter +="<label for=\"fg-all\" id=\"filter-all\">&nbsp;<input type=\"checkbox\" id=\"fg-all\"/>&nbsp;Check All&nbsp;</label>";
	const unique = [...new Set(data.map(item => item.appraisal_form_name))];
	unique.forEach(function (value, i) { //loop exmple [1,2,3]
		htmlHTMLFilter +="<label for=\"fg-"+i+"\" class=\"select-filter\">&nbsp;<input type=\"checkbox\" id=\"fg-"+i+"\" value=\""+value+"\"/>&nbsp;"+value+"&nbsp;</label>";
	});
	$("#multiselect-filter-checkboxes").html(htmlHTMLFilter);
	
	$('#filter-all').click(function () {
		if ($('#fg-all').prop('checked')) {
			$(".select-filter").find('input').prop('checked', true);
		} else {
			$(".select-filter").find('input').prop('checked', false);
		}
		filterGroupOnClick([]);
	});
	
	$(".select-filter").on("click", function () {
		let gArray = [];
		$(".select-filter").find('input').get().forEach(function (value, i) {
			if (value.checked === true) {
				gArray.push(value.value);
			}
		});
		filterGroupOnClick(gArray);
	});
}

var filterGroupOnClick = function(data) {	
	if(data.length==0) {
		$("#list_empjudege").find('.control-calculate').show();
	} else {
		$.each($("#list_empjudege").find('.control-calculate').get(),function(index,indexEntry) {
			if(data.indexOf($(this).find('.filter-group').text()) > -1) { // show data
				$(this).closest('.control-calculate').show();
			} else {
				$(this).closest('.control-calculate').hide();
			}
		});
	}
}

var calculatePercentKeyup = function() {
	$("#list_empjudege").find('.percent').keyup(function() {
		var percent = $(this).autoNumeric('get');
		
		//คำนวน % ของรายได้ปัจจุบัน Total ว่าเป็นกี่ Bath
		var now_salary = Number($(this).attr("now_salary"));
		var total = (percent/100)*now_salary;
		$(this).closest('.control-calculate').find('.data-score').find('.score').autoNumeric('set', total);
	});
		
	$("#list_empjudege").find('.score').keyup(function() {
		var score = $(this).autoNumeric('get');
		
		//คำนวน Bath ของรายได้ปัจจุบัน Total ว่าเป็นกี่ %
		var now_salary = Number($(this).attr("now_salary"));
		var total = (now_salary == 0 ? 0 : (score*100)/now_salary);
		$(this).closest('.control-calculate').find('.data-percent').find('.percent').autoNumeric('set', total);
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
		
		//คำนวน รายได้ใหม่ total
		calculateNewSalaryTotal($(this), new_salary);
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
		
		//คำนวน รายได้ใหม่ total
		calculateNewSalaryTotal($(this), new_pqpi);
	});	
}

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


/* fakeFlag
   1 = แอดมิน  is_hr = 1 ประเมินให้คนอื่นได้   ปรับ stage และ save 
   2 = แอดมิน  is_hr = 1 ประเมินให้คนอื่นแต่  ปรับแค่ stage
   3 = ประเมินปกติ ปรับ stage และ save
*/

/* calFlag
0 = ไม่ได้กดมาจากปุ่ม cal 
1 = กดมาจากปุ่ม cal 
*/
var insertFn = function(fakeFlag, calFlag) {
	if(fakeFlag==1) {
		var objectJudge = {
			"emp_id" : $("#fake_adjust").val().split("-")[0],
			"level_id" : $("#fake_adjust").val().split("-")[1]
		}
	} else {
		var objectJudge = {}
	}
	
	var stage_id = $("#actionToAssign").val();
	var detail = [];
	$.each($(".control-calculate").get(),function(index,indexEntry){
		if($(indexEntry).find('.select-check').prop('checked')) {
			detail.push({
				emp_result_id		: $(indexEntry).find('.select-check').attr('id'),
				percent_adjust		: $(indexEntry).find('.data-percent').find('.percent').autoNumeric('get'),
				adjust_result_score	: $(indexEntry).find('.data-score').find('.score').autoNumeric('get'),
				edit_flag           : $(indexEntry).find('.select-check').attr('edit_flag')
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
        	"detail": detail,
        	"cal_flag" : calFlag,
        	"fake_flag" : fakeFlag,
        	"object_judge" : objectJudge
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
var compareValues = function (key, order='asc') {
	  return function(a, b) {
	    if(!a.hasOwnProperty(key) || 
	       !b.hasOwnProperty(key)) {
	  	  return 0; 
	    }
	    
	    const varA = (typeof a[key] === 'string') ? 
	      a[key].toUpperCase() : a[key];
	    const varB = (typeof b[key] === 'string') ? 
	      b[key].toUpperCase() : b[key];
	      
	    let comparison = 0;
	    if (varA > varB) {
	      comparison = 1;
	    } else if (varA < varB) {
	      comparison = -1;
	    }
	    return (
	      (order == 'desc') ? 
	      (comparison * -1) : comparison
	    );
	  };
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
			
//			$(window).scroll(function() {
//				var myElements = $("#scroll-tableBonusAdjustment")[0].querySelectorAll("thead");
//				if($(this).scrollTop() >= $("#scroll-tableBonusAdjustment").offset().top){
//					$(".lfr-hudcrumbs").hide();
//					$(".nav-collapse").hide();
//					var translate = "translate(0," + ($(this).scrollTop()-$("#scroll-tableBonusAdjustment").offset().top) + "px)";
//					for (var i = 0; i < myElements.length; i++) {
//				       myElements[i].style.transform=translate;
//				     }
//				 }else{
//					 $(".nav-collapse").show();
//					 $("#scroll-tableBonusAdjustment thead").css("transform","translate(0,0px)");
//				 }
//
//			});
			
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
		    
		    $("#btnSubmit,#btn_search_calculate").click(function() {
		    	if($(this).attr('id')=="btnSubmit") {
		    		var calFlag = 0;
		    	} else if($(this).attr('id')=="btn_search_calculate") {
		    		var calFlag = 1;
		    	} else {
		    		return;
		    	}
		    	
		    	if(statusFakeAdjust==1) { //เป็นการประเมินแทน ปรับ stage และบันทึก
		    		if($("#fake_adjust").val()=="") {
		    			callFlashSlide($(".lt-validate-select-judge").val());
		    			return;
		    		} else {
		    			$("#fake_adjust_name").html($(".lt-validate-confirm-judge").val()+" "+$("#fake_adjust option:selected").text()+"?");
		    			$("#confrimModal").modal({
		    				"backdrop" : setModalPopup[0],
		    				"keyboard" : setModalPopup[1]
		    			});
		    			
		    			$("#confrimModal").off("click","#btnConfirmYes");
		    			$("#confrimModal").on("click","#btnConfirmYes",function(){
		    				$("#confrimModal").modal('hide');
		    				insertFn(statusFakeAdjust, calFlag);
		    				$('.modal-body').animate({ scrollTop: 0 }, "slow");
		    			});
		    		}
		    	} else {
			    	insertFn(statusFakeAdjust, calFlag); // 2 or 3
		    	}
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
