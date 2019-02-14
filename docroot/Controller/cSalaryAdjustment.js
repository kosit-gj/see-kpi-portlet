var globalData="";
var galbalDataTemp=[]; 
var username = "";
var password = "";
const pageNumberDefault=1;
let countDatatableGenerate = 0;

function roundThen(value, precision) {
	if (Number.isInteger(precision)) {
		var shift = Math.pow(10, precision);
		return Math.round(value * shift) / shift;
	} else {
		return Math.round(value);
	}
	
	/* example
	roundThen(123.688689)     // 123
	roundThen(123.688689, 0)  // 123
	roundThen(123.688689, 1)  // 123.7
	roundThen(123.688689, 2)  // 123.69
	roundThen(123.688689, -2) // 100
	*/
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

var clearFn = function() {
	$("#information").hide();
}

var clearFooterSumFn = function() {
	$(".dataTables_scrollFoot").find("#list_footer").find("td").text("");
}

var clearTbodyWithHeaderDynamic = function(table) {
	/* กรณีที่  th ของ header ไม่ได้ fix ตายตัว  จะต้องใช้การล้างค่าคลาสต่างๆออก หากไปใช้ function ของ datatables ตอนนี้จะทำให้เกิด error สาเหตุอาจเป็นเพราะ จำนวนของ  header สามารถเพิ่มได้เรื่อยๆ */
	table.empty();
	$('.DTFC_LeftBodyWrapper').hide();
	$('.DTFC_ScrollWrapper').css({"height": "115px"});
	$(".fix-column-top").css({"text-align" : "center", "border-bottom" : "0px", "vertical-align": "top"});
}

var refreshMultiPosition = function() {
	$("#AppraisalForm").multiselect('refresh');
	$("#Position").multiselect('refresh').multiselectfilter();
	$(".ui-multiselect").css({'width':'100%'});
	$(".ui-multiselect-menu").css({'padding-bottom':'15px'});
	$(".ui-multiselect-checkboxes").css({'padding-bottom':'10px'});
	$(".ui-icon-check,.ui-icon-closethick,.ui-icon-circle-close").css({'margin-top':'3px'});
	$('input[name=multiselect_Position]').css({'margin-bottom':'6px','margin-right':'3px'});
	$('input[name=multiselect_AppraisalForm]').css({'margin-bottom':'6px','margin-right':'3px'});
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
        	"appraisal_type_id": 2,
        	
        	"emp_level" : $("#AppraisalEmpLevel").val(),
            "org_level" : $("#AppraisalOrgLevel").val(),
            "org_id" : $("#organization").val(),
            "appraisal_year" : $("#AppraisalYear").val(),
            "period_id" : $("#AppraisalPeriod").val(),
            "emp_id" : $("#EmpName_id").val(),
            "position_id" : $("#Position").val()
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
    var form_id = [];
    
    var level_id_org = $("#embed_appraisal_level_id_org").val();
    var level_id_emp = $("#embed_appraisal_level_id_emp").val();
    var period_id = $("#embed_period_id").val();
    var emp_id = $("#embed_emp_id").val();
    var org_id = $("#embed_organization").val();
    var status = $("#embed_status").val();
    position_id.push($("#embed_position_id").val());
    form_id.push($("#embed_appraisal_form").val());
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
            "appraisal_form_id": form_id
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
            "appraisal_form_id": $("#AppraisalForm").val()
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
	
	var htmlHeader1 = "";
	var htmlHeader2 = "";
	var htmlHeader3 = "";
	
	var htmlHTMLFooter = "";
	var htmlHTMLFooter2 = "";
	var htmlHTMLFooter3 = "";
	
	var edit_flag = "";
	
	//countStruc   คือ จำนวน structure header column
	let countStruc = 0;
	
	// countDatatableGenerate คือการ generate datatable ไปเรื่อยๆเนื่องจากคอลั่มหัวตารางมีการเปลี่ยนจึงต้องสร้างใหม่ และลบอันเก่าออก
	// ทำไมถึงต้องสร้างใหม่ไปเรื่อยๆ เนื่องจาก datatable ตอน clear แล้วมันจะ error หาก datatable datatable มีการ dynamic header column 
	countDatatableGenerate += 1;
	//console.log(countDatatableGenerate);
	var startTableDynamic = "";
	startTableDynamic +="<table class=\"table table-striped table-bordered tableBonusAdjustment\" id=\"tableBonusAdjustment"+countDatatableGenerate+"\" style=\"margin-bottom: 0px; max-width: none;\">";
	startTableDynamic +="</table>";
	$("#scroll-tableBonusAdjustment").html(startTableDynamic);
	var table = $('#tableBonusAdjustment'+countDatatableGenerate);
	
	var tableBegin = "";
	tableBegin +="<thead id=\"list_header\"></thead>";
	tableBegin +="<tbody id=\"list_empjudege\"></tbody>";
	tableBegin +="<tfoot id=\"list_footer\"></tfoot>";
	table.html(tableBegin);
		
	htmlHeader1+="<tr>";
	htmlHeader1+="<th rowspan=\"3\" class=\"fix-column-top\"><input type=\"checkbox\" name=\"statusSelectAll\" id=\"statusSelectAll\" class=\"statusSelectAll\"></th>";
	htmlHeader1+="<th rowspan=\"3\" class=\"fix-column-top\">"+$(".lt-emp-code").val()+"</th>";
	htmlHeader1+="<th rowspan=\"3\" class=\"fix-column-top\">"+$(".lt-emp-name").val()+"</th>";
	htmlHeader1+="<th rowspan=\"3\" class=\"fix-column-top\">"+$(".lt-level").val()+"</th>";
	htmlHeader1+="<th rowspan=\"3\" class=\"fix-column-top\">"+$(".lt-organization").val()+"</th>";
	htmlHeader1+="<th rowspan=\"3\" class=\"fix-column-top\">"+$(".lt-form-type").val()+"</th>";
	htmlHeader1+="<th rowspan=\"3\" class=\"fix-column-top\">"+$(".lt-position").val()+"</th>";
	htmlHeader1+="<th rowspan=\"3\" class=\"fix-column-top\">"+$(".lt-job-code").val()+"</th>";
	htmlHeader1+="<th rowspan=\"3\" class=\"fix-column-top\">คะแนนเต็มตีค่างาน<br>(ความรู้)</th>";
	htmlHeader1+="<th rowspan=\"3\" class=\"fix-column-top\">คะแนนเต็มตีค่างาน<br>(ศักยภาพ)</th>";
	htmlHeader1+="<th rowspan=\"3\" class=\"fix-column-top\">Total Point</th>";
	htmlHeader1+="<th rowspan=\"3\" class=\"fix-column-top\">Baht Point</th>";

	htmlHeader3+="<th rowspan=\"3\" class=\"fix-column-top\">คะแนนประเมิน Mgr.</th>";
	htmlHeader3+="<th rowspan=\"3\" class=\"fix-column-top\">คะแนนประเมิน BU.</th>";
	htmlHeader3+="<th rowspan=\"3\" class=\"fix-column-top\">คะแนนประเมิน COO.</th>";
	htmlHeader3+="<th rowspan=\"3\" class=\"fix-column-top\">คะแนนประเมิน Board.</th>";
	htmlHeader3+="<th rowspan=\"3\" class=\"fix-column-top\">เกรด</th>";
	htmlHeader3+="<th colspan=\"3\" class=\"fix-column-top\">รายได้จากการคำนวนตีค่างาน</th>";
	htmlHeader3+="<th colspan=\"7\" class=\"fix-column-top\">รายได้ปัจจุบัน</th>";
	htmlHeader3+="<th rowspan=\"3\" class=\"fix-column-top\">ขาด/เกิน</th>";
	htmlHeader3+="<th rowspan=\"3\" class=\"fix-column-top\">Cal Standard</th>";
	htmlHeader3+="<th colspan=\"2\" class=\"fix-column-top\">% Cal</th>";
	htmlHeader3+="<th colspan=\"4\" class=\"fix-column-top\">รายได้ที่เปลี่ยนแปลง</th>";
	htmlHeader3+="<th colspan=\"7\" class=\"fix-column-top\">รายได้ใหม่</th>";
	htmlHeader3+="</tr>";
	htmlHeader3+="<tr>";
	htmlHeader3+="<th rowspan=\"2\" class=\"fix-column-top\">รายได้รวมที่ควรได้ <br>90% ไม่รวม Bonus</th>";
	htmlHeader3+="<th rowspan=\"2\" class=\"fix-column-top\">รายได้ Fix<br>ที่ควรได้ 65%</th>";
	htmlHeader3+="<th rowspan=\"2\" class=\"fix-column-top\">รายได้ Var<br>ที่ควรได้ 25%</th>";
	htmlHeader3+="<th rowspan=\"2\" class=\"fix-column-top\">รายได้ปัจจุบัน<br>Total</th>";
	htmlHeader3+="<th colspan=\"3\" class=\"fix-column-top\">FIX 65%</th>";
	htmlHeader3+="<th colspan=\"3\" class=\"fix-column-top\">VAR 25%</th>";
	htmlHeader3+="<th rowspan=\"2\" class=\"fix-column-top\">%</th>";
	htmlHeader3+="<th rowspan=\"2\" class=\"fix-column-top\">Bath</th>";
	htmlHeader3+="<th rowspan=\"2\" class=\"fix-column-top\">ปรับรายได้<br>Total</th>";
	htmlHeader3+="<th rowspan=\"2\" class=\"fix-column-top\">ปรับเงินเดือน</th>";
	htmlHeader3+="<th rowspan=\"2\" class=\"fix-column-top\">ปรับ P-QPI</th>";
	htmlHeader3+="<th rowspan=\"2\" class=\"fix-column-top\">% Diff</th>";
	htmlHeader3+="<th rowspan=\"2\" class=\"fix-column-top\">รายได้ใหม่<br>Total</th>";
	htmlHeader3+="<th colspan=\"3\" class=\"fix-column-top\">FIX 65%</th>";
	htmlHeader3+="<th colspan=\"3\" class=\"fix-column-top\">VAR 25%</th>";
	htmlHeader3+="</tr>";	
	htmlHeader3+="<tr>";
	htmlHeader3+="<th class=\"fix-column-top\">Salary</th>";
	htmlHeader3+="<th class=\"fix-column-top\">P-QPI</th>";
	htmlHeader3+="<th class=\"fix-column-top\">อื่นๆ</th>";
	htmlHeader3+="<th class=\"fix-column-top\">MPI</th>";
	htmlHeader3+="<th class=\"fix-column-top\">PI</th>";
	htmlHeader3+="<th class=\"fix-column-top\">อื่นๆ</th>";
	htmlHeader3+="<th class=\"fix-column-top\">Salary</th>";
	htmlHeader3+="<th class=\"fix-column-top\">P-QPI</th>";
	htmlHeader3+="<th class=\"fix-column-top\">อื่นๆ</th>";
	htmlHeader3+="<th class=\"fix-column-top\">MPI</th>";
	htmlHeader3+="<th class=\"fix-column-top\">PI</th>";
	htmlHeader3+="<th class=\"fix-column-top\">อื่นๆ</th>";
	htmlHeader3+="</tr>";

	if(data==undefined) {
		$("#list_header").html(htmlHeader1+htmlHeader3);
		if(!$.fn.DataTable.isDataTable(table)) { // datatable ยังไม่ถูกสร้างขึ้นให้ set table เปล่าๆไป
			table.css({"width": "5000px"});
			$(".fix-column-top").css({"text-align" : "center", "vertical-align": "top"});
		} else { // datatable ถูกสร้างขึ้นแล้วให้เคลีย cache เก่าออก
			clearTbodyWithHeaderDynamic(table);
		}
		
		clearFooterSumFn(); //clear sum ใน footer
		$(".head_adjust").hide();
		return;
	}
	
	countStruc = data['items'][0]['structure_result'].length;
	
	$.each(data['items'][0]['structure_result'],function (index, indexEntry) {
		htmlHeader2 +="<th rowspan='3' class='fix-column-top'>"+indexEntry.structure_name+"</th>";
		htmlHTMLFooter2 +="<td></td>";
	});
	
	$("#list_header").html(htmlHeader1+htmlHeader2+htmlHeader3);
	table.DataTable().clear();
	table.DataTable().destroy();
	/* clear freeze
		ต้องเคลียหลังจาก  table มี header columnแล้ว ถ้าเคลียก่อนมันจะ error
		และต้องเคลียก่อน มี  data ใน  tbody
		หมายเหตุ** จำนวน header จะต้องมีจำนวนเท่ากันทุกคั้งที่กด search ถ้า header มีเพิ่มขึ้นจะต้อง refresh หน้าจอ
	*/
	
	//footer sum total
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
	
	htmlHTMLFooter3 += "	<td></td>";
	htmlHTMLFooter3 += "	<td></td>";
	htmlHTMLFooter3 += "	<td></td>";
	htmlHTMLFooter3 += "	<td></td>";
	htmlHTMLFooter3 += "	<td></td>";
	htmlHTMLFooter3 += "	<td></td>";
	htmlHTMLFooter3 += "	<td></td>";
	htmlHTMLFooter3 += "		<td class=\"bold pos-column-rig\">Total</td>";
	htmlHTMLFooter3 += "		<td data-value=\""+notNullFn(data.sum_total_now_salary)+"\" class=\"bold pos-column-rig ft-sum-current-total\">"+Comma(notNullFn(data.sum_total_now_salary))+"</td>";
	htmlHTMLFooter3 += "		<td data-value=\""+notNullFn(data.sum_salary)+"\" class=\"bold pos-column-rig ft-sum-current-salary\">"+Comma(notNullFn(data.sum_salary))+"</td>";
	htmlHTMLFooter3 += "		<td data-value=\""+notNullFn(data.sum_pqpi_amount)+"\" class=\"bold pos-column-rig ft-sum-current-pqpi\">"+Comma(notNullFn(data.sum_pqpi_amount))+"</td>";
	htmlHTMLFooter3 += "		<td data-value=\""+notNullFn(data.sum_fix_other_amount)+"\" class=\"bold pos-column-rig ft-sum-current-fix-other\">"+Comma(notNullFn(data.sum_fix_other_amount))+"</td>";
	htmlHTMLFooter3 += "		<td data-value=\""+notNullFn(data.sum_mpi_amount)+"\" class=\"bold pos-column-rig ft-sum-current-mipi\">"+Comma(notNullFn(data.sum_mpi_amount))+"</td>";
	htmlHTMLFooter3 += "		<td data-value=\""+notNullFn(data.sum_pi_amount)+"\" class=\"bold pos-column-rig ft-sum-current-pi\">"+Comma(notNullFn(data.sum_pi_amount))+"</td>";
	htmlHTMLFooter3 += "		<td data-value=\""+notNullFn(data.sum_var_other_amount)+"\" class=\"bold pos-column-rig ft-sum-current-var-other\">"+Comma(notNullFn(data.sum_var_other_amount))+"</td>";
	htmlHTMLFooter3 += "		<td data-value=\""+notNullFn(data.sum_miss_over)+"\" class=\"bold pos-column-rig ft-sum-missover\">"+Comma(notNullFn(data.sum_miss_over))+"</td>";
	htmlHTMLFooter3 += "		<td data-value=\""+Math.round(notNullFn(data.sum_cal_standard))+"\" class=\"bold pos-column-rig ft-sum-cal-standard\">"+Comma(Math.round(notNullFn(data.sum_cal_standard)))+"</td>";
	htmlHTMLFooter3 += "		<td data-value=\""+notNullFn()+"\" class=\"bold pos-column-rig ft-sum-percent\">"+notNullFn()+"</td>";
	htmlHTMLFooter3 += "		<td data-value=\""+notNullFn()+"\" class=\"bold pos-column-rig ft-sum-bath\">"+notNullFn()+"</td>";
	htmlHTMLFooter3 += "		<td data-value=\""+notNullFn()+"\" class=\"bold pos-column-rig ft-sum-change-total\">"+notNullFn()+"</td>";
	htmlHTMLFooter3 += "		<td data-value=\""+notNullFn()+"\" class=\"bold pos-column-rig ft-sum-change-salary\">"+notNullFn()+"</td>";
	htmlHTMLFooter3 += "		<td data-value=\""+notNullFn()+"\" class=\"bold pos-column-rig ft-sum-change-pqpi\">"+notNullFn()+"</td>";
	htmlHTMLFooter3 += "		<td data-value=\""+notNullFn()+"\" class=\"bold pos-column-rig ft-sum-change-diff\">"+notNullFn()+"</td>";
	htmlHTMLFooter3 += "		<td data-value=\""+notNullFn(data.sum_total_now_salary)+"\" class=\"bold pos-column-rig ft-sum-new-total\">"+Comma(notNullFn(data.sum_total_now_salary))+"</td>";
	htmlHTMLFooter3 += "		<td data-value=\""+notNullFn(data.sum_salary)+"\" class=\"bold pos-column-rig ft-sum-new-salary\">"+Comma(notNullFn(data.sum_salary))+"</td>";
	htmlHTMLFooter3 += "		<td data-value=\""+notNullFn(data.sum_pqpi_amount)+"\" class=\"bold pos-column-rig ft-sum-new-pqpi\">"+Comma(notNullFn(data.sum_pqpi_amount))+"</td>";
	htmlHTMLFooter3 += "		<td data-value=\""+notNullFn(data.sum_fix_other_amount)+"\" class=\"bold pos-column-rig ft-sum-new-fix-other\">"+Comma(notNullFn(data.sum_fix_other_amount))+"</td>";
	htmlHTMLFooter3 += "		<td data-value=\""+notNullFn(data.sum_mpi_amount)+"\" class=\"bold pos-column-rig ft-sum-new-mpi\">"+Comma(notNullFn(data.sum_mpi_amount))+"</td>";
	htmlHTMLFooter3 += "		<td data-value=\""+notNullFn(data.sum_pi_amount)+"\" class=\"bold pos-column-rig ft-sum-new-pi\">"+Comma(notNullFn(data.sum_pi_amount))+"</td>";
	htmlHTMLFooter3 += "		<td data-value=\""+notNullFn(data.sum_var_other_amount)+"\" class=\"bold pos-column-rig ft-sum-new-var-other\">"+Comma(notNullFn(data.sum_var_other_amount))+"</td>";
	htmlHTMLFooter3 += "</tr>";
	$("#list_footer").html(htmlHTMLFooter+htmlHTMLFooter2+htmlHTMLFooter3);
	
	$.each(data['items'],function (index, indexEntry) {
		let knowledge_point = Comma(notNullFn(indexEntry.knowledge_point));
		let capability_point = Comma(notNullFn(indexEntry.capability_point));
		let total_point = Comma(notNullFn(indexEntry.total_point));
		let baht_per_point = Comma(notNullFn(indexEntry.baht_per_point));
		let score_manager = Comma(notNullFn(indexEntry.score_manager));
		let score_bu = Comma(notNullFn(indexEntry.score_bu));
		let score_coo = Comma(notNullFn(indexEntry.score_coo));
		let score_board = Comma(notNullFn(indexEntry.score_board));
		
		let structureIdToCal = indexEntry['first_structure_id'];
		let calArrayFilter = indexEntry['structure_result'].filter(function (el) {
			  return el.structure_id == structureIdToCal;
		});
		
		var cal1 = Number(indexEntry.total_point) * Number(calArrayFilter[0]['score']);
//		console.log(indexEntry.total_point,'indexEntry.total_point');
//		console.log(calArrayFilter[0]['score'],'score');
//		console.log(cal1,'cal1');
		
		let cal2 = cal1 / Number(calArrayFilter[0]['total_score']);
//		console.log(calArrayFilter[0]['total_score'],'total_score');
//		console.log(cal2,'cal2');
		
		let cal3 = cal2 * Number(indexEntry.baht_per_point);
//		console.log(indexEntry.baht_per_point,'baht_per_point');
//		console.log(cal3,'cal3');
		
		let total_percent = Comma(roundThen(notNullFn(isNaN((cal3 * 90)/100) ? 0 : (cal3 * 90)/100 ), -2));
//		console.log(total_percent,'total_percent');
		let fix_percent = Comma(roundThen(notNullFn(isNaN((cal3 * 65)/100) ? 0 : (cal3 * 65)/100 ), -2));
//		console.log(fix_percent,'fix_percent');
		let var_percent = Comma(roundThen(notNullFn(isNaN((cal3 * 25)/100) ? 0 : (cal3 * 25)/100 ), -2));
//		console.log(var_percent,'var_percent');
		
		let total_now_salary = Comma(notNullFn(indexEntry.total_now_salary));
		let salary = Comma(notNullFn(indexEntry.salary));
		let pqpi_amount = Comma(notNullFn(indexEntry.pqpi_amount));
		let fix_other_amount = Comma(notNullFn(indexEntry.fix_other_amount));
		let mpi_amount = Comma(notNullFn(indexEntry.mpi_amount));
		let pi_amount = Comma(notNullFn(indexEntry.pi_amount));
		let var_other_amount = Comma(notNullFn(indexEntry.var_other_amount));
		let miss_over = Comma(notNullFn(indexEntry.total_now_salary-((cal3 * 90)/100)));
		let cal_standard = Comma(Math.round(notNullFn(indexEntry.cal_standard)));
		
		var job_code = notNullTextFn(indexEntry.job_code);
		var grade = notNullTextFn(indexEntry.grade);
		
		index += 1
		
		htmlHTML += "<tr class='control-calculate'>";
		htmlHTML += "	<td class='data-check pos-column-cen'><input type=\"checkbox\" class=\"select-check\" emp_result_id='"+indexEntry.emp_result_id+"'></td>";
		htmlHTML += "	<td class='data-main pos-column-cen' emp_result_id='"+indexEntry.emp_result_id+"' emp_id='"+indexEntry.emp_id+"'>"+indexEntry.emp_code+"</td>";
		htmlHTML += "	<td class='pos-column-lef'>"+indexEntry.emp_name+"</td>";
		htmlHTML += "	<td class='pos-column-cen'>"+indexEntry.PG+"</td>";
		htmlHTML += "	<td class='pos-column-lef'>"+indexEntry.org_name+"</td>";
		htmlHTML += "	<td class='pos-column-cen'>"+indexEntry.appraisal_form_name+"</td>";
		htmlHTML += "	<td class='pos-column-lef'>"+indexEntry.position_name+"</td>";
		htmlHTML += "	<td class='pos-column-cen'>"+job_code+"</td>";
		htmlHTML += "	<td class='pos-column-rig'>"+knowledge_point+"</td>";
		htmlHTML += "	<td class='pos-column-rig'>"+capability_point+"</td>";
		htmlHTML += "	<td class='pos-column-rig'>"+total_point+"</td>";
		htmlHTML += "	<td class='pos-column-rig'>"+baht_per_point+"</td>";
		
		$.each(indexEntry['structure_result'],function (iStruc, dataStruc) {
			htmlHTML +="<td class='pos-column-rig'>"+Comma(notNullFn(dataStruc.score))+"</td>";
		});
		
		htmlHTML += "	<td class='pos-column-rig'>"+score_manager+"</td>";
		htmlHTML += "	<td class='pos-column-rig'>"+score_bu+"</td>";
		htmlHTML += "	<td class='pos-column-rig'>"+score_coo+"</td>";
		htmlHTML += "	<td class='pos-column-rig'>"+score_board+"</td>";
		htmlHTML += "	<td class='pos-column-cen'>"+grade+"</td>";
		htmlHTML += "	<td class='pos-column-rig'>"+total_percent+"</td>";
		htmlHTML += "	<td class='pos-column-rig'>"+fix_percent+"</td>";
		htmlHTML += "	<td class='pos-column-rig'>"+var_percent+"</td>";
		htmlHTML += "	<td class=\"data-current-total pos-column-rig\" data-value=\""+notNullFn(indexEntry.total_now_salary)+"\">"+total_now_salary+"</td>";
		htmlHTML += "	<td class=\"data-current-salary pos-column-rig\" data-value=\""+notNullFn(indexEntry.salary)+"\">"+salary+"</td>";
		htmlHTML += "	<td class=\"data-current-pqpi pos-column-rig\" data-value=\""+notNullFn(indexEntry.pqpi_amount)+"\">"+pqpi_amount+"</td>";
		htmlHTML += "	<td class='pos-column-rig'>"+fix_other_amount+"</td>";
		htmlHTML += "	<td class='pos-column-rig'>"+mpi_amount+"</td>";
		htmlHTML += "	<td class='pos-column-rig'>"+pi_amount+"</td>";
		htmlHTML += "	<td class='pos-column-rig'>"+var_other_amount+"</td>";
		htmlHTML += "	<td class='pos-column-rig'>"+miss_over+"</td>";
		htmlHTML += "	<td class='pos-column-rig'>"+cal_standard+"</td>";
		htmlHTML += "	<td class='data-percent'>";
		htmlHTML += "		<div class='float-label-control'>";
		htmlHTML += "			<input type='text' style='text-align:right; min-width:40px;' class='form-control input-xs span12 percent numberOnly' now_salary='"+Math.round(indexEntry.cal_standard)+"' value='100' />";
		htmlHTML += "		</div>";
		htmlHTML += "	</td>";
		htmlHTML += "	<td class='data-score'>";
		htmlHTML += "		<div class='float-label-control'>";
		htmlHTML += "			<input type='text' style='text-align:right; min-width: 40px;' class='form-control input-xs span12 score numberOnly' now_salary='"+Math.round(indexEntry.cal_standard)+"' value='0.00' />";
		htmlHTML += "		</div>";
		htmlHTML += "	</td>";
		htmlHTML += "	<td class='data-up-total pos-column-rig' data-value=\""+Math.round(indexEntry.cal_standard)+"\">"+cal_standard+"</td>";
		htmlHTML += "	<td class='data-salary changesal2'>";
		htmlHTML += "		<div class='float-label-control'>";
		htmlHTML += "			<input type='text' style='text-align:right; min-width:40px;' class='form-control input-xs span12 salary numberOnly' value='"+Math.round(indexEntry.cal_standard)+"' />";
		htmlHTML += "		</div>";
		htmlHTML += "	</td>";
		htmlHTML += "	<td class='data-pqpi'>";
		htmlHTML += "		<div class='float-label-control'>";
		htmlHTML += "			<input type='text' style='text-align:right; min-width: 40px;' class='form-control input-xs span12 pqpi numberOnly' value='0.00' />";
		htmlHTML += "		</div>";
		htmlHTML += "	</td>";
		htmlHTML += "	<td class=\"data-percent-diff pos-column-rig\" data-value=\"0.00\"></td>";
		htmlHTML += "	<td class=\"data-new-total-salary pos-column-rig\"  data-value=\""+notNullFn(indexEntry.total_now_salary)+"\">"+total_now_salary+"</td>";
		htmlHTML += "	<td class=\"data-new-salary pos-column-rig\" data-value=\""+notNullFn(indexEntry.salary)+"\">"+salary+"</td>";
		htmlHTML += "	<td class=\"data-new-pqpi pos-column-rig\" data-value=\""+notNullFn(indexEntry.pqpi_amount)+"\">"+pqpi_amount+"</td>";
		htmlHTML += "	<td class=\"data-new-fix-other pos-column-rig\" data-value=\""+notNullFn(indexEntry.fix_other_amount)+"\">"+fix_other_amount+"</td>";
		htmlHTML += "	<td class=\"data-new-mpi pos-column-rig\" data-value=\""+notNullFn(indexEntry.mpi_amount)+"\">"+mpi_amount+"</td>";
		htmlHTML += "	<td class=\"data-new-pi pos-column-rig\" data-value=\""+notNullFn(indexEntry.pi_amount)+"\">"+pi_amount+"</td>";
		htmlHTML += "	<td class=\"data-new-var-other pos-column-rig\" data-value=\""+notNullFn(indexEntry.var_other_amount)+"\">"+var_other_amount+"</td>";
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
	
	createDatatable(table, countStruc); //สร้างรูปแบบ datatable
	calculatePercentKeyup(); //เซ็ตค่าการกดคำนวนต่างๆ
	//filterGroup(data['items']); //generate filter group
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
		
		if($("#actionToAssign").val()==null || $("#actionToAssign").val()==undefined) {
			$("#btnSubmit").attr("disabled", true);
	    } else {
	    	$("#btnSubmit").attr("disabled", false);
	    }
	}
}

var createDatatable = function(table, countStruc) {
	var columnSettingFirst = [
		{ "width": "20px", "targets": [0] }, //Emp Code
    	{ "width": "90px", "targets": [1] }, //Emp Code
    	{ "width": "200px", "targets": [2] }, //Employee Name
    	{ "width": "30px", "targets": [3] }, //PG
    	{ "width": "200px", "targets": [4] }, //org
    	{ "width": "50px", "targets": [5] }, //Group
    	{ "width": "200px", "targets": [6] }, //Position
    	{ "width": "70px", "targets": [7] }, //Job Code
    	{ "width": "130px", "targets": [8] }, //คะแนนเต็มตีค่างาน(ความรู้)
    	{ "width": "130px", "targets": [9] }, //คะแนนเต็มตีค่างาน(ศักยภาพ)
    	{ "width": "80px", "targets": [10] }, //Total Point
    	{ "width": "80px", "targets": [11] }, //Baht/Point
    ]
    
	var i;
	for (i = 0; i < countStruc; i++) {
		columnSettingFirst.push({
			"width": "100px",
			"targets": [12+i]
		});
	}
	
	var columnSettingLast = [
    	{ "width": "100px", "targets": [12+countStruc] }, //คะแนนประเมินMgr 
    	{ "width": "100px", "targets": [13+countStruc] }, //คะแนนประเมินBU 
    	{ "width": "100px", "targets": [14+countStruc] }, //คะแนนประเมินCOO
    	{ "width": "100px", "targets": [15+countStruc] }, //คะแนนประเมินBoard
    	{ "width": "50px", "targets": [16+countStruc] }, //เกรด
    	{ "width": "130px", "targets": [17+countStruc] }, //รายได้รวมที่ควรได้ 
    	{ "width": "100px", "targets": [18+countStruc] }, //รายได้ Fix
    	{ "width": "100px", "targets": [19+countStruc] }, //รายได้ Var
    	{ "width": "100px", "targets": [20+countStruc] }, //รายได้ปัจจุบันTotal
    	{ "width": "80px", "targets": [21+countStruc] }, //Salary
    	{ "width": "80px", "targets": [22+countStruc] }, //P-QPI
    	{ "width": "80px", "targets": [23+countStruc] }, //อื่นๆ
    	{ "width": "80px", "targets": [24+countStruc] }, //MPI
    	{ "width": "80px", "targets": [25+countStruc] }, //PI
    	{ "width": "80px", "targets": [26+countStruc] }, //อื่นๆ
    	{ "width": "80px", "targets": [27+countStruc] }, //ขาด/เกิน
    	{ "width": "80px", "targets": [28+countStruc] }, //Cal Standard
    	{ "width": "80px", "targets": [29+countStruc] }, //%
    	{ "width": "80px", "targets": [30+countStruc] }, //Bath
    	{ "width": "80px", "targets": [31+countStruc] }, //ปรับรายได้
    	{ "width": "80px", "targets": [32+countStruc] }, //ปรับเงินเงินเดือน
    	{ "width": "80px", "targets": [33+countStruc] }, //ปรับ P-QPI	
    	{ "width": "80px", "targets": [34+countStruc] }, //% Diff
    	{ "width": "80px", "targets": [35+countStruc] }, //รายได้ใหม่Total
    	{ "width": "80px", "targets": [36+countStruc] }, //Salary
    	{ "width": "80px", "targets": [37+countStruc] }, //P-QPI
    	{ "width": "80px", "targets": [38+countStruc] }, //อื่นๆ
    	{ "width": "80px", "targets": [39+countStruc] }, //MPI
    	{ "width": "80px", "targets": [40+countStruc] }, //PI
    	{ "width": "80px", "targets": [41+countStruc] } //อื่นๆ
    ]
	
	var columnSetting = columnSettingFirst.concat(columnSettingLast); 
	
	table.DataTable({
		fixedHeader: true,
	    "searching": false,
		"ordering": false,
		"bInfo" : false,
		"scrollY": 350,
        "scrollX": true,
	    scrollCollapse: true,
	    paging: false,
	    fixedColumns: {
	    	leftColumns: 5
	    },
//	    "iDisplayLength": -1,
//	    "bPaginate": true,
//	    "iCookieDuration": 60,
//	    "bStateSave": false,
//	    "bAutoWidth": true,
//	    "bScrollAutoCss": true,
//	    "bProcessing": true,
//	    "bRetrieve": true,
//	    "bJQueryUI": true,
	    columnDefs : columnSetting
	});
	
	/*
	$('#filter-group').change(function() {
        table.DataTable()
        .columns(0).search(this.value)
        .draw();
	}); // เซ็ตการค้นหาในคอลั่มแรก
	*/
	
	$(".fix-column-top").css({"text-align" : "center", "border-bottom" : "0px", "vertical-align": "top"});
	$("table.dataTable.no-footer").css({"border-bottom" : "0px"});
	$(".pos-column-lef").css({"text-align" : "left"});
	$(".pos-column-cen").css({"text-align" : "center"});
	$(".pos-column-rig").css({"text-align" : "right"});
	$(".pos-column-rig").closest('.bold').css({"font-weight" : "bold"});
	
	$("#statusSelectAll").prop('checked', false); //ล้างค่าการ checked ที่ปุ่ม check
	$(".statusSelectAll").prop('checked', false); //ล้างค่าการ checked ที่ปุ่ม check ตรง freeze
	$('.statusSelectAll').click(function () { //ถ้าคลิ้ก  check ตรง freeze
		$('#statusSelectAll').click(); //ให้ปุ่ม  check ทำงาน
		if ($('#statusSelectAll').prop('checked')) {
			$(".select-check").prop('checked', true);
			$(".dataTables_scroll").find(".select-check").attr('select-check', 1);
	    } else {
	    	$(".select-check").prop('checked', false);
	    	$(".dataTables_scroll").find(".select-check").attr('select-check', 0);
	    }
	});
	
	$(".select-check").prop('checked', false);
	$('.select-check').click(function () { //ถ้าคลิ้ก  check ตรง freeze
		var freezeEmpResultId = $(this).attr("emp_result_id");
		if($(this).prop("checked")) {
			$.each($(".dataTables_scroll").find(".select-check").get(),function(index,indexEntry) {
				//ถ้า attr emp_result_id ใน checkbox freeze เหมือนกับ checkbox ตัวจริง ให้ set attr select-check = 1 
				if(parseInt(freezeEmpResultId)===parseInt($(indexEntry).attr("emp_result_id"))) {
					$(indexEntry).attr('select-check', 1);
				}
			});
		} else {
			$.each($(".dataTables_scroll").find(".select-check").get(),function(index,indexEntry) {
				if(parseInt(freezeEmpResultId)===parseInt($(indexEntry).attr("emp_result_id"))) {
					$(indexEntry).attr('select-check', 0);
				}
			});
		}
	});
}

/*
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
*/

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
		$(".ft-sum-change-total").attr('data-value', Math.round(sumTotalChangeSalary));
		$(".ft-sum-change-salary").attr('data-value', sumChangeSalary);
		$(".ft-sum-change-pqpi").attr('data-value', sumChangePQPI);
		$(".ft-sum-change-diff").attr('data-value', sumChangeDiff);
		$(".ft-sum-new-total").attr('data-value', sumTotalNewSalary);
		$(".ft-sum-new-salary").attr('data-value', sumNewSalary);
		$(".ft-sum-new-pqpi").attr('data-value', sumNewPQPI);
		
		$(".dataTables_scrollFoot").find(".ft-sum-percent").text(Comma(sumPercent.toFixed(2)));
		$(".dataTables_scrollFoot").find(".ft-sum-bath").text(Comma(sumBath.toFixed(2)));
		$(".dataTables_scrollFoot").find(".ft-sum-change-total").text(Comma(Math.round(sumTotalChangeSalary)));
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
	
	function calculateNewSalaryTotal(elementThis) {
		var new_salary = Number(elementThis.closest('.control-calculate').find('.data-new-salary').attr('data-value'));
		var new_pqpi = Number(elementThis.closest('.control-calculate').find('.data-new-pqpi').attr('data-value'));
		var new_fix_other = Number(elementThis.closest('.control-calculate').find('.data-new-fix-other').attr('data-value'));
		var new_mipi = Number(elementThis.closest('.control-calculate').find('.data-new-mpi').attr('data-value'));
		var new_pi = Number(elementThis.closest('.control-calculate').find('.data-new-pi').attr('data-value'));
		var new_var_other = Number(elementThis.closest('.control-calculate').find('.data-new-var-other').attr('data-value'));
		var total = new_salary + new_pqpi + new_fix_other + new_mipi + new_pi + new_var_other;
		//console.log('total -> ',total,"data -> ", new_salary, new_pqpi, new_fix_other, new_mipi, new_pi, new_var_other);
		elementThis.closest('.control-calculate').find('.data-new-total-salary').attr('data-value', total.toFixed(2));
		elementThis.closest('.control-calculate').find('.data-new-total-salary').text(Comma(total.toFixed(2)));
	}
	
	$("#list_empjudege").find('.salary').keyup(function() {
		var salary = Number($(this).autoNumeric('get'));
		
		//คำนวน ปรับรายได้ Total
		var pqpi_score = Number($(this).closest('.control-calculate').find('.data-pqpi').find('.pqpi').autoNumeric('get'));
		var total = pqpi_score + salary;
		$(this).closest('.control-calculate').find('.data-up-total').attr('data-value', Math.round(total));
		$(this).closest('.control-calculate').find('.data-up-total').text(Comma(Math.round(total)));
		
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
		
		//คำนวน รายได้ใหม่ total
		calculateNewSalaryTotal($(this));
		calculateSumtotalFooter();
	});
	
	$("#list_empjudege").find('.pqpi').keyup(function() {
		var pqpi = Number($(this).autoNumeric('get'));

		//คำนวน ปรับรายได้ Total
		var salary_score = Number($(this).closest('.control-calculate').find('.data-salary').find('.salary').autoNumeric('get'));
		var total = salary_score + pqpi;
		$(this).closest('.control-calculate').find('.data-up-total').attr('data-value', Math.round(total));
		$(this).closest('.control-calculate').find('.data-up-total').text(Comma(Math.round(total)));
		
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
		
		//คำนวน รายได้ใหม่ total
		calculateNewSalaryTotal($(this));
		calculateSumtotalFooter();
	});
	
	$("#list_empjudege").find('.percent').keyup();
	$("#list_empjudege").find('.salary').keyup();
}

var updateFn = function() {
	var stage_id = $("#actionToAssign").val();
	var detail = [];
	$.each($(".control-calculate").get(),function(index,indexEntry) {
		if (typeof $(indexEntry).attr('data-dt-row') !== typeof undefined && $(indexEntry).attr('data-dt-row') !== false) {
			//เป็นคลาสของ datatables ซึ่งจะไม่เอาข้อมูลในส่วนนี้
			
		} else {
			if($(indexEntry).find('.data-check').find('.select-check').attr('select-check')==1) {
				detail.push({
					emp_result_id		: $(indexEntry).find('.data-main').attr('emp_result_id'),
					emp_id				: $(indexEntry).find('.data-main').attr('emp_id'),
					salary				: $(indexEntry).find('.data-salary').find('.salary').autoNumeric('get'),
					pqpi				: $(indexEntry).find('.data-pqpi').find('.pqpi').autoNumeric('get')
				});
			}
		}
	});
	
	//console.log(detail);
	
	if(detail.length==0) {
		callFlashSlide("Please Select Employee");
		return;
	}

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
				appraisalStatusFn();
			});
			
			$("#AppraisalEmpLevel").change(function() {
				dropDrowAppraisalOrgLevelFn();
				dropDrowOrgFn();
				appraisalStatusFn();
			});
			
			$("#AppraisalOrgLevel").change(function() {
				dropDrowOrgFn();
				appraisalStatusFn();
			});
			
			$("#AppraisalForm").multiselect({
				minWidth:'100%',
				noneSelectedText: "Select Form",
				selectedText: "# Form",
				header: false
			});
			
			$("#AppraisalForm").change(function() {
				appraisalStatusFn();
			});
			
			$("#organization").change(function() {
				dropDrowPositionFn();
				refreshMultiPosition();
				appraisalStatusFn();
			});
			
			
			$("#Position").multiselect({
				minWidth:'100%;',
				noneSelectedText: "Select Position",
				selectedText: "# Position"
			}).multiselectfilter();
			
			refreshMultiPosition();
			  
			$("#Position").change(function() {
			  appraisalStatusFn();
			});
			
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
					appraisalStatusFn();
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
		    
		    $(window).scroll(function() {
		    	$('.fixedHeader-floating').hide(); //ทุกครั้งที่เลื่อนสกอ จะซ่อนคลาสของ datatable ที่ freeze ไม่งั้น ui จะเพี้ยน
		    });
		    
//		    $.fn.dataTable.ext.errMode = function ( settings, helpPage, message ) { 
//		        console.log(message);
//		    };
		    
		    $("#advanceSearchAppraisalGroup").show();
		}
	}
});
