var globalData="";
var galbalDataTemp=[]; 
var username = "";
var password = "";
const pageNumberDefault=1;
let countDatatableGenerate = 0;
var GlobalChangingSortingData;

//function refreshDataSortFn(index, objName, data) {
//	console.log(index, objName, data, 'index')
//	console.log(GlobalChangingSortingData['items'][0].objName, 1)
//	GlobalChangingSortingData['items'][0].objName = data;
//	console.log(GlobalChangingSortingData['items'][0].objName, 2)
//	console.log(GlobalChangingSortingData);
//}

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
			htmlOption+="<option value=''>All Organization Level</option>";
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
			htmlOption+="<option value=''>All Employee Level</option>";
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
        	if(data.length!==0) {
            	htmlOption += "<option value='999'>Save</option>"; //999 is not update stage
                $.each(data, function (index, indexEntry) {
                	htmlOption += "<option value='" + indexEntry['stage_id'] + "'>" + indexEntry['to_action'] + "</option>";
                });
        	}
            $("#actionToAssign").html(htmlOption);
        }
    });
}

var listDataFn = function(data) {
	//console.log(data, '411')
	//GlobalChangingSortingData = data;
	//console.log(GlobalChangingSortingData, 413)
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
	
	//25
	htmlHeader1+="<tr>";
	//freeze
	htmlHeader1+="<th rowspan=\"3\" class=\"fix-column-top no-sort\"><input type=\"checkbox\" name=\"statusSelectAll\" id=\"statusSelectAll\" class=\"statusSelectAll\"></th>";
	htmlHeader1+="<th rowspan=\"3\" class=\"fix-column-top no-sort\">"+$(".lt-emp-name").val()+"</th>";
	htmlHeader1+="<th rowspan=\"3\" class=\"fix-column-top no-sort\">"+$(".lt-organization").val()+"</th>";
	htmlHeader1+="<th rowspan=\"3\" class=\"fix-column-top refreshSoring column_z_score\" sort-type='asc' name-sort='z_score'>Z-Score</th>";
	htmlHeader1+="<th rowspan=\"3\" class=\"fix-column-top refreshSoring column_score\" sort-type='asc' name-sort='"+(data['is_board']==1 || data['is_board']==undefined || data['is_board']=='undefined' ? 'score_board' : 'score_coo')+"'>"+(data['is_board']==1 ? 'คะแนนประเมิน Board.' : 'คะแนนประเมิน COO.')+"</th>";
	htmlHeader1+="<th rowspan=\"3\" class=\"fix-column-top refreshSoring column_grade\" sort-type='asc' name-sort='grade'>เกรด</th>";
	htmlHeader1+="<th rowspan=\"3\" class=\"fix-column-top no-sort\">Cal Standard</th>";
	htmlHeader1+="<th rowspan=\"3\" class=\"fix-column-top no-sort\">ขาด/เกิน</th>";
	htmlHeader1+="<th colspan=\"4\" class=\"fix-column-top\">รายได้ที่เปลี่ยนแปลง</th>";
	//end freeze
	
	htmlHeader1+="<th colspan=\"2\" class=\"fix-column-top\">Calculator</th>";
	htmlHeader1+="<th colspan=\"3\" class=\"fix-column-top\">รายได้จากการคำนวนตีค่างาน</th>";
	htmlHeader1+="<th colspan=\"7\" class=\"fix-column-top\">รายได้ปัจจุบัน</th>";
	htmlHeader1+="<th colspan=\"7\" class=\"fix-column-top\">รายได้ใหม่</th>";
	
//	htmlHeader3+="<th rowspan=\"3\" class=\"fix-column-top\">ผลการประเมินค่างาน( 65 คะแนน )</th>";
//	htmlHeader3+="<th rowspan=\"3\" class=\"fix-column-top\">คะแนนผลงานปีที่ผ่านมา ( 20 คะแนน )</th>";
//	htmlHeader3+="<th rowspan=\"3\" class=\"fix-column-top\">คะแนนความสามารถที่มีคุณค่าต่อองค์กร ( 15 คะแนน )</th>";

	htmlHeader3+="<th rowspan=\"3\" class=\"fix-column-top refreshSoring column_score_mgr\" sort-type='asc' name-sort='score_mgr'>คะแนนประเมิน Mgr. </th>";
	htmlHeader3+="<th rowspan=\"3\" class=\"fix-column-top refreshSoring column_score_bu\" sort-type='asc' name-sort='score_bu'>คะแนนประเมิน BU. </th>";
	
	if(data['is_board']==1) {
		htmlHeader3+="<th rowspan=\"3\" class=\"fix-column-top refreshSoring column_score_coo\" sort-type='asc' name-sort='score_coo2'>คะแนนประเมิน COO.</th>";
	}
	
	htmlHeader3+="<th rowspan=\"3\" class=\"fix-column-top no-sort\">คะแนนเต็มตีค่างาน (ความรู้)</th>";
	htmlHeader3+="<th rowspan=\"3\" class=\"fix-column-top no-sort\">คะแนนเต็มตีค่างาน (ศักยภาพ)</th>";
	htmlHeader3+="<th rowspan=\"3\" class=\"fix-column-top no-sort\">Total Point</th>";
	htmlHeader3+="<th rowspan=\"3\" class=\"fix-column-top no-sort\">Baht/Point</th>";
	htmlHeader3+="</tr>";
	
	htmlHeader3+="<tr>";
	htmlHeader3+="<th rowspan=\"2\" class=\"fix-column-top no-sort maxWidth30\">ปรับรายได้ Total</th>";
	htmlHeader3+="<th rowspan=\"2\" class=\"fix-column-top no-sort maxWidth30\">ปรับเงินเดือน</th>";
	htmlHeader3+="<th rowspan=\"2\" class=\"fix-column-top no-sort maxWidth30\">ปรับ P-QPI</th>";
	htmlHeader3+="<th rowspan=\"2\" class=\"fix-column-top refreshSoring column_diff maxWidth10\" sort-type='asc' name-sort='score_diff'>% Diff</th>";
	
	htmlHeader3+="<th rowspan=\"2\" class=\"fix-column-top no-sort maxWidth30\">%</th>";
	htmlHeader3+="<th rowspan=\"2\" class=\"fix-column-top maxWidth30\">Bath</th>";
	
	htmlHeader3+="<th rowspan=\"2\" class=\"fix-column-top no-sort\">รายได้รวมที่ควรได้ 90% ไม่รวม Bonus</th>";
	htmlHeader3+="<th rowspan=\"2\" class=\"fix-column-top no-sort\">รายได้ Fix ที่ควรได้ 65%</th>";
	htmlHeader3+="<th rowspan=\"2\" class=\"fix-column-top no-sort\">รายได้ Var ที่ควรได้ 25%</th>";
	htmlHeader3+="<th rowspan=\"2\" class=\"fix-column-top refreshSoring column_current_total maxWidth30\" sort-type='asc' name-sort='current_total'>รายได้ปัจจุบัน Total</th>";
	
	htmlHeader3+="<th colspan=\"3\" class=\"fix-column-top\">FIX65%</th>";
	htmlHeader3+="<th colspan=\"3\" class=\"fix-column-top\">VAR25%</th>";
	htmlHeader3+="<th rowspan=\"2\" class=\"fix-column-top refreshSoring column_new_total maxWidth30\" sort-type='asc' name-sort='new_total'>รายได้ใหม่<br>Total</th>";
	htmlHeader3+="<th colspan=\"3\" class=\"fix-column-top\">FIX 65%</th>";
	htmlHeader3+="<th colspan=\"3\" class=\"fix-column-top\">VAR 25%</th>";
	htmlHeader3+="</tr>";
	
	htmlHeader3+="<tr>";
	htmlHeader3+="<th class=\"fix-column-top no-sort maxWidth30\">Salary</th>";
	htmlHeader3+="<th class=\"fix-column-top no-sort maxWidth30\">P-QPI</th>";
	htmlHeader3+="<th class=\"fix-column-top no-sort maxWidth30\">อื่นๆ</th>";
	htmlHeader3+="<th class=\"fix-column-top no-sort maxWidth30\">MPI</th>";
	htmlHeader3+="<th class=\"fix-column-top no-sort maxWidth30\">PI</th>";
	htmlHeader3+="<th class=\"fix-column-top no-sort maxWidth30\">อื่นๆ</th>";
	
	htmlHeader3+="<th class=\"fix-column-top no-sort maxWidth30\">Salary</th>";
	htmlHeader3+="<th class=\"fix-column-top no-sort maxWidth30\">P-QPI</th>";
	htmlHeader3+="<th class=\"fix-column-top no-sort maxWidth30\">อื่นๆ</th>";
	htmlHeader3+="<th class=\"fix-column-top no-sort maxWidth30\">MPI</th>";
	htmlHeader3+="<th class=\"fix-column-top no-sort maxWidth30\">PI</th>";
	htmlHeader3+="<th class=\"fix-column-top no-sort maxWidth30\">อื่นๆ</th>";
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
		$("#average-score").text("");
		$("#sd-score").text("");
		return;
	}
	
	$("#average-score").text(data['avg'].toFixed(2));
	$("#sd-score").text(data['sd'].toFixed(2));
	
	countStruc = data['items'][0]['structure_result'].length;
	
	$.each(data['items'][0]['structure_result'],function (index, indexEntry) {
		htmlHeader2 +="<th rowspan='3' class='fix-column-top no-sort'>"+indexEntry.structure_name+"</th>";
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
	
	if(data.sum_new_salary==null || data.sum_new_salary=="") {
		var sum_salary = data.sum_salary;
	} else {
		var sum_salary = data.sum_new_salary;
	}
	
	if(data.sum_new_pqpi_amount==null || data.sum_new_pqpi_amount=="") {
		var sum_pqpi_amount = data.sum_pqpi_amount;
	} else {
		var sum_pqpi_amount = data.sum_new_pqpi_amount;
	}
	
	htmlHTMLFooter += "<tr>";
	htmlHTMLFooter += "<td></td>";
	htmlHTMLFooter += "<td></td>";
	htmlHTMLFooter += "<td></td>";
	htmlHTMLFooter += "<td></td>";
	htmlHTMLFooter += "<td></td>";
	htmlHTMLFooter += "<td></td>";
	
	htmlHTMLFooter += "<td data-value=\""+Math.round(notNullFn(data.sum_cal_standard))+"\" class=\"bold pos-column-rig ft-sum-cal-standard\">"+Comma(Math.round(notNullFn(data.sum_cal_standard)))+"</td>";
	htmlHTMLFooter += "<td data-value=\""+notNullFn()+"\" class=\"bold pos-column-rig ft-sum-missover\">"+notNullFn()+"</td>";
	htmlHTMLFooter += "<td data-value=\""+notNullFn()+"\" class=\"bold pos-column-rig ft-sum-change-total maxWidth30\">"+notNullFn()+"</td>";
	htmlHTMLFooter += "<td data-value=\""+notNullFn()+"\" class=\"bold pos-column-rig ft-sum-change-salary maxWidth30\">"+notNullFn()+"</td>";
	htmlHTMLFooter += "<td data-value=\""+notNullFn()+"\" class=\"bold pos-column-rig ft-sum-change-pqpi maxWidth30\">"+notNullFn()+"</td>";
	htmlHTMLFooter += "<td data-value=\""+notNullFn()+"\" class=\"bold pos-column-rig ft-sum-change-diff maxWidth10\">"+notNullFn()+"</td>";
	htmlHTMLFooter += "<td data-value=\""+notNullFn()+"\" class=\"bold pos-column-rig ft-sum-percent maxWidth30\">"+notNullFn()+"</td>";
	htmlHTMLFooter += "<td data-value=\""+notNullFn()+"\" class=\"bold pos-column-rig ft-sum-bath maxWidth30\">"+notNullFn()+"</td>";
	
	htmlHTMLFooter += "<td></td>";
	htmlHTMLFooter += "<td></td>";
	
	htmlHTMLFooter += "<td class=\"bold pos-column-rig\">Total</td>";
	htmlHTMLFooter += "<td data-value=\""+notNullFn(data.sum_total_now_salary)+"\" class=\"bold pos-column-rig ft-sum-current-total maxWidth30\">"+Comma(notNullFn(data.sum_total_now_salary))+"</td>";
	htmlHTMLFooter += "<td data-value=\""+notNullFn(data.sum_salary)+"\" class=\"bold pos-column-rig ft-sum-current-salary maxWidth30\">"+Comma(notNullFn(data.sum_salary))+"</td>";
	htmlHTMLFooter += "<td data-value=\""+notNullFn(data.sum_pqpi_amount)+"\" class=\"bold pos-column-rig ft-sum-current-pqpi maxWidth30\">"+Comma(notNullFn(data.sum_pqpi_amount))+"</td>";
	htmlHTMLFooter += "<td data-value=\""+notNullFn(data.sum_fix_other_amount)+"\" class=\"bold pos-column-rig ft-sum-current-fix-other maxWidth30\">"+Comma(notNullFn(data.sum_fix_other_amount))+"</td>";
	htmlHTMLFooter += "<td data-value=\""+notNullFn(data.sum_mpi_amount)+"\" class=\"bold pos-column-rig ft-sum-current-mipi maxWidth30\">"+Comma(notNullFn(data.sum_mpi_amount))+"</td>";
	htmlHTMLFooter += "<td data-value=\""+notNullFn(data.sum_pi_amount)+"\" class=\"bold pos-column-rig ft-sum-current-pi maxWidth30\">"+Comma(notNullFn(data.sum_pi_amount))+"</td>";
	htmlHTMLFooter += "<td data-value=\""+notNullFn(data.sum_var_other_amount)+"\" class=\"bold pos-column-rig ft-sum-current-var-other maxWidth30\">"+Comma(notNullFn(data.sum_var_other_amount))+"</td>";
	htmlHTMLFooter += "<td data-value=\""+notNullFn(data.sum_total_now_salary)+"\" class=\"bold pos-column-rig ft-sum-new-total maxWidth30\">"+Comma(notNullFn(data.sum_total_now_salary))+"</td>";
	htmlHTMLFooter += "<td data-value=\""+notNullFn(sum_salary)+"\" class=\"bold pos-column-rig ft-sum-new-salary maxWidth30\">"+Comma(notNullFn(sum_salary))+"</td>";
	htmlHTMLFooter += "<td data-value=\""+notNullFn(sum_pqpi_amount)+"\" class=\"bold pos-column-rig ft-sum-new-pqpi maxWidth30\">"+Comma(notNullFn(sum_pqpi_amount))+"</td>";
	htmlHTMLFooter += "<td data-value=\""+notNullFn(data.sum_fix_other_amount)+"\" class=\"bold pos-column-rig ft-sum-new-fix-other maxWidth30\">"+Comma(notNullFn(data.sum_fix_other_amount))+"</td>";
	htmlHTMLFooter += "<td data-value=\""+notNullFn(data.sum_mpi_amount)+"\" class=\"bold pos-column-rig ft-sum-new-mpi maxWidth30\">"+Comma(notNullFn(data.sum_mpi_amount))+"</td>";
	htmlHTMLFooter += "<td data-value=\""+notNullFn(data.sum_pi_amount)+"\" class=\"bold pos-column-rig ft-sum-new-pi maxWidth30\">"+Comma(notNullFn(data.sum_pi_amount))+"</td>";
	htmlHTMLFooter += "<td data-value=\""+notNullFn(data.sum_var_other_amount)+"\" class=\"bold pos-column-rig ft-sum-new-var-other maxWidth30\">"+Comma(notNullFn(data.sum_var_other_amount))+"</td>";
	
	htmlHTMLFooter3 += "<td></td>";
	htmlHTMLFooter3 += "<td></td>";
	
	if(data['is_board']==1) {
		htmlHTMLFooter3 += "<td></td>";
	}
	
	htmlHTMLFooter3 += "<td></td>";
	htmlHTMLFooter3 += "<td></td>";
	htmlHTMLFooter3 += "<td></td>";
	htmlHTMLFooter3 += "<td></td>";
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
		
		var cal1 = Number(indexEntry.total_point) * Number(indexEntry.score_coo);
		let cal2 = cal1 / 100;
		let cal3 = cal2 * Number(indexEntry.baht_per_point);
		
		let total_percent = Comma(roundThen(notNullFn(isNaN((cal3 * 90)/100) ? 0 : (cal3 * 90)/100 ), -2));
		let fix_percent = Comma(roundThen(notNullFn(isNaN((cal3 * 65)/100) ? 0 : (cal3 * 65)/100 ), -2));
		let var_percent = Comma(roundThen(notNullFn(isNaN((cal3 * 25)/100) ? 0 : (cal3 * 25)/100 ), -2));
		
		let total_now_salary = Comma(notNullFn(indexEntry.total_now_salary));
		let salary = Comma(notNullFn(indexEntry.salary));
		let pqpi_amount = Comma(notNullFn(indexEntry.pqpi_amount));
		
		if(indexEntry.new_salary==null || indexEntry.new_salary=="") {
			var new_salary = salary;
			var dataValueSalary = indexEntry.salary;
		} else {
			var new_salary = Comma(indexEntry.new_salary);
			var dataValueSalary = indexEntry.new_salary;
		}
		
		if(indexEntry.new_pqpi_amount==null || indexEntry.new_pqpi_amount=="") {
			var new_pqpi_amount = pqpi_amount;
			var dataValuePQPIAmount = indexEntry.pqpi_amount;
		} else {
			var new_pqpi_amount = Comma(indexEntry.new_pqpi_amount);
			var dataValuePQPIAmount = indexEntry.new_pqpi_amount;
		}
		
		if(indexEntry.adjust_raise_s_amount==null || indexEntry.adjust_raise_s_amount==0) {
			var adjust_raise_s_amount = Math.round(indexEntry.cal_standard);
		} else {
			var adjust_raise_s_amount = Math.round(indexEntry.adjust_raise_s_amount);
		}
		
		let fix_other_amount = Comma(notNullFn(indexEntry.fix_other_amount));
		let mpi_amount = Comma(notNullFn(indexEntry.mpi_amount));
		let pi_amount = Comma(notNullFn(indexEntry.pi_amount));
		let var_other_amount = Comma(notNullFn(indexEntry.var_other_amount));
		console.log(indexEntry.salary, '+', indexEntry.pqpi_amount, '+', indexEntry.fix_other_amount, '-', fix_percent);
		let cal_miss_over = (Number(indexEntry.salary)+Number(indexEntry.pqpi_amount)+Number(indexEntry.fix_other_amount))-removeComma(fix_percent);
		let miss_over = Comma(roundThen(notNullFn(cal_miss_over), -2));
		console.log(miss_over, 'miss')
		
		let cal_standard = Comma(Math.round(notNullFn(indexEntry.cal_standard)));
		
		var job_code = notNullTextFn(indexEntry.job_code);
		var grade = notNullTextFn(indexEntry.grade);
		
		htmlHTML += "<tr class='control-calculate rowNum"+index+"' rowNum="+index+" data-current-total='"+notNullFn(indexEntry.total_now_salary)+"' total_point='"+notNullFn(indexEntry.total_point)+"' bath_point='"+notNullFn(indexEntry.baht_per_point)+"'>";
		//start freeze
		htmlHTML += "	<td class='data-check pos-column-cen'><input type=\"checkbox\" class=\"select-check\" emp_result_id='"+indexEntry.emp_result_id+"'></td>";
		htmlHTML += "	<td class='pos-column-lef data-main' emp_result_id='"+indexEntry.emp_result_id+"' emp_id='"+indexEntry.emp_id+"'><span class='ecEmpName' data-text='"+indexEntry.emp_name+"'>"+indexEntry.emp_name+"</span></td>";
		htmlHTML += "	<td class='pos-column-lef'><span class='ecOrgName' data-text='"+indexEntry.org_name+"'>"+indexEntry.org_name+"</span></td>";
		htmlHTML += "	<td class='pos-column-cen'>"+indexEntry.z_score.toFixed(2)+"</td>";
		htmlHTML += "	<td class='data-coo' array-grade='"+JSON.stringify(indexEntry['cal_grade'])+"'>";
		htmlHTML += "		<div class='float-label-control'>";
		htmlHTML += "			<input type='text' style='text-align:right; min-width:40px;' class='form-control input-xs span12 score_coo numberOnlyCoo' value='"+(data['is_board']==1 ? score_board : score_coo)+"' obj-name='"+(data['is_board']==1 ? 'score_board' : 'score_coo')+"'/>";
		htmlHTML += "		</div>";
		htmlHTML += "	</td>";
		
		if(indexEntry['is_job_evaluation']==1) {
			htmlHTML += "	<td class='pos-column-cen'></td>";
			htmlHTML += "	<td class='pos-column-rig'></td>";
			htmlHTML += "	<td class='data-miss-over pos-column-rig' data-value="+miss_over+">"+miss_over+"</td>";
		} else {
			htmlHTML += "	<td class='data-grade pos-column-cen'>"+grade+"</td>";
			htmlHTML += "	<td class='pos-column-rig'>"+cal_standard+"</td>";
			htmlHTML += "	<td class='pos-column-rig' data-value=''></td>";
		}
		
		htmlHTML += "	<td class='data-up-total pos-column-rig maxWidth30' data-value=\""+Math.round(indexEntry.cal_standard)+"\">"+cal_standard+"</td>";
		htmlHTML += "	<td class='data-salary changesal2 maxWidth30' data-sort='"+Math.random()+"'>";
		htmlHTML += "		<div class='float-label-control'>";
		htmlHTML += "			<input type='text' style='text-align:right; min-width:40px;' class='form-control input-xs span12 salary numberOnly' value='' />";
		htmlHTML += "		</div>";
		htmlHTML += "	</td>";
		htmlHTML += "	<td class='data-pqpi maxWidth30'>";
		htmlHTML += "		<div class='float-label-control'>";
		htmlHTML += "			<input type='text' style='text-align:right; min-width: 40px;' class='form-control input-xs span12 pqpi numberOnly' value='' />";
		htmlHTML += "		</div>";
		htmlHTML += "	</td>";
		htmlHTML += "	<td class=\"data-percent-diff pos-column-rig maxWidth10\" data-value=\"0.00\"></td>";
		//end freeze
		
		htmlHTML += "	<td class='data-percent maxWidth30'>";
		htmlHTML += "		<div class='float-label-control'>";
		htmlHTML += "			<input type='text' style='text-align:right; min-width:40px;' class='form-control input-xs span12 percent numberOnly' now_salary='"+Math.round(indexEntry.total_now_salary)+"' value='100' />";
		htmlHTML += "		</div>";
		htmlHTML += "	</td>";
		htmlHTML += "	<td class='data-score maxWidth30'>";
		htmlHTML += "		<div class='float-label-control'>";
		htmlHTML += "			<input type='text' style='text-align:right; min-width: 40px;' class='form-control input-xs span12 score numberOnly' now_salary='"+Math.round(indexEntry.total_now_salary)+"' value='0.00' />";
		htmlHTML += "		</div>";
		htmlHTML += "	</td>";
		
		if(indexEntry['is_job_evaluation']==1) {
			htmlHTML += "	<td class='data-total-percent pos-column-rig'>"+total_percent+"</td>";
			htmlHTML += "	<td class='data-fix-percent pos-column-rig'>"+fix_percent+"</td>";
			htmlHTML += "	<td class='data-var-percent pos-column-rig'>"+var_percent+"</td>";
		} else {
			htmlHTML += "	<td class='pos-column-rig'></td>";
			htmlHTML += "	<td class='pos-column-rig'></td>";
			htmlHTML += "	<td class='pos-column-rig'></td>";
		}

		htmlHTML += "	<td class=\"data-current-total pos-column-rig maxWidth30\" data-value=\""+notNullFn(indexEntry.total_now_salary)+"\">"+total_now_salary+"</td>";
		htmlHTML += "	<td class=\"data-current-salary pos-column-rig maxWidth30\" data-value=\""+notNullFn(indexEntry.salary)+"\">"+salary+"</td>";
		htmlHTML += "	<td class=\"data-current-pqpi pos-column-rig maxWidth30\" data-value=\""+notNullFn(indexEntry.pqpi_amount)+"\">"+pqpi_amount+"</td>";
		htmlHTML += "	<td class='pos-column-rig maxWidth30'>"+fix_other_amount+"</td>";
		htmlHTML += "	<td class='pos-column-rig maxWidth30'>"+mpi_amount+"</td>";
		htmlHTML += "	<td class='pos-column-rig maxWidth30'>"+pi_amount+"</td>";
		htmlHTML += "	<td class='pos-column-rig maxWidth30'>"+var_other_amount+"</td>";
		htmlHTML += "	<td class=\"data-new-total-salary pos-column-rig maxWidth30\"  data-value=\""+notNullFn(indexEntry.total_now_salary)+"\">"+total_now_salary+"</td>";
		htmlHTML += "	<td class=\"data-new-salary pos-column-rig maxWidth30\" data-value=\""+notNullFn(dataValueSalary)+"\">"+new_salary+"</td>";
		htmlHTML += "	<td class=\"data-new-pqpi pos-column-rig maxWidth30\" data-value=\""+notNullFn(dataValuePQPIAmount)+"\">"+new_pqpi_amount+"</td>";
		htmlHTML += "	<td class=\"data-new-fix-other pos-column-rig maxWidth30\" data-value=\""+notNullFn(indexEntry.fix_other_amount)+"\">"+fix_other_amount+"</td>";
		htmlHTML += "	<td class=\"data-new-mpi pos-column-rig maxWidth30\" data-value=\""+notNullFn(indexEntry.mpi_amount)+"\">"+mpi_amount+"</td>";
		htmlHTML += "	<td class=\"data-new-pi pos-column-rig maxWidth30\" data-value=\""+notNullFn(indexEntry.pi_amount)+"\">"+pi_amount+"</td>";
		htmlHTML += "	<td class=\"data-new-var-other pos-column-rig maxWidth30\" data-value=\""+notNullFn(indexEntry.var_other_amount)+"\">"+var_other_amount+"</td>";
		
		$.each(indexEntry['structure_result'],function (iStruc, dataStruc) {
			htmlHTML +="<td class='pos-column-rig'>"+Comma(notNullFn(dataStruc.score))+"</td>";
		});
		
		htmlHTML += "	<td class='pos-column-rig'>"+score_manager+"</td>";
		htmlHTML += "	<td class='pos-column-rig'>"+score_bu+"</td>";
		
		if(data['is_board']==1) {
			htmlHTML += "	<td class='pos-column-rig'>"+score_coo+"</td>";
		}
		
		if(indexEntry['is_job_evaluation']==1) {
			htmlHTML += "	<td class='pos-column-rig'>"+knowledge_point+"</td>";
			htmlHTML += "	<td class='pos-column-rig'>"+capability_point+"</td>";
			htmlHTML += "	<td class='pos-column-rig'>"+total_point+"</td>";
			htmlHTML += "	<td class='pos-column-rig'>"+baht_per_point+"</td>";
		} else {
			htmlHTML += "	<td class='pos-column-rig'></td>";
			htmlHTML += "	<td class='pos-column-rig'></td>";
			htmlHTML += "	<td class='pos-column-rig'></td>";
			htmlHTML += "	<td class='pos-column-rig'></td>";
		}

		htmlHTML += "</tr>";
	});
	$("#list_empjudege").html(htmlHTML);
	
	createDatatable(table, countStruc, data['is_board']); //สร้างรูปแบบ datatable
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
	}
	
	$("#list_empjudege").find('.percent').keyup();
	$("#list_empjudege").find('.salary').keyup();
	
	if($("#actionToAssign").val()==null || $("#actionToAssign").val()==undefined) {
		$("#btnSubmit").attr("disabled", true);
    } else {
    	$("#btnSubmit").attr("disabled", false);
    }
}

var createDatatable = function(table, countStruc, isBoard) {
	var columnSettingFirst = [
		//start freeze
		{ "width": "10px", "targets": [0]}, //checkbox
    	{ "width": "30px", "targets": [1]}, //Employee Name
    	{ "width": "65px", "targets": [2]}, //org
    	{ "width": "20px", "targets": [3]}, //z-score
    	{ "width": "20px", "targets": [4]}, //คะแนนประเมินCOO or board
    	{ "width": "10px", "targets": [5]}, //Grade
    	{ "width": "10px", "targets": [6]}, //Calstandard
    	{ "width": "10px", "targets": [7]}, //ขาดเกิน
    	{ "width": "30px", "targets": [8]}, //ปรับรายได้ total
    	{ "width": "30px", "targets": [9]}, //ปรับเงินเดือน
    	{ "width": "30px", "targets": [10]}, //ปรับ pqpi
    	{ "width": "10px", "targets": [11] }, // % diff
    	// end freeze
    	
    	{ "width": "10px", "targets": [12]}, //%
    	{ "width": "10px", "targets": [13] }, //Bath
    	{ "width": "40px", "targets": [14]}, //รายได้รวมที่ควรได้90% ไม่รวม Bonus
    	{ "width": "40px", "targets": [15]}, //รายได้รวมที่ควรได้65% ไม่รวม Bonus
    	{ "width": "40px", "targets": [16]}, //รายได้รวมที่ควรได้25% ไม่รวม Bonus
    	{ "width": "30px", "targets": [17] }, //รายได้ปัจจุบันTotal
    	{ "width": "30px", "targets": [18]}, //Salary
    	{ "width": "30px", "targets": [19]}, //P-QPI
    	{ "width": "30px", "targets": [20]}, //อื่นๆ
    	{ "width": "30px", "targets": [21]}, ////MPI
    	{ "width": "30px", "targets": [22]}, ///PI
    	{ "width": "30px", "targets": [23]}, //อื่นๆ
    	{ "width": "30px", "targets": [24] },  //รายได้ใหม่Total
    	{ "width": "30px", "targets": [25] }, //Salary
    	{ "width": "30px", "targets": [26]}, //P-QPI
    	{ "width": "30px", "targets": [27] }, //อื่นๆ
    	{ "width": "30px", "targets": [28]}, ////MPI
    	{ "width": "30px", "targets": [29] }, ///PI
    	{ "width": "30px", "targets": [30] }, //อื่นๆ
    ];
	
	var i;
	for (i = 0; i < countStruc; i++) {
		//i start 0
		columnSettingFirst.push({
			"width": "50px",
			"targets": [31+i]
		});
	}
	
	if(isBoard==1) {
		var columnSettingLast = [
	    	{ "width": "40px", "targets": [31+countStruc] }, //คะแนนประเมิน Mgr.
	    	{ "width": "40px", "targets": [32+countStruc] }, //คะแนนประเมิน Bu
	    	{ "width": "40px", "targets": [33+countStruc] }, //คะแนนประเมิน Coo
	    	{ "width": "40px", "targets": [34+countStruc]}, //คะแนนเต็มตีค่างาน (ความรู้)
	    	{ "width": "40px", "targets": [35+countStruc] }, //คะแนนเต็มตีค่างาน (ศักยภาพ)
	    	{ "width": "30px", "targets": [36+countStruc] }, //Total Point
	    	{ "width": "30px", "targets": [37+countStruc] }, //Baht/Point
	    ];
	} else {
		var columnSettingLast = [
	    	{ "width": "40px", "targets": [31+countStruc] }, //คะแนนประเมิน Mgr.
	    	{ "width": "40px", "targets": [32+countStruc] }, //คะแนนประเมิน Bu
	    	{ "width": "40px", "targets": [33+countStruc] }, //คะแนนเต็มตีค่างาน (ความรู้)
	    	{ "width": "40px", "targets": [34+countStruc] }, //คะแนนเต็มตีค่างาน (ศักยภาพ)
	    	{ "width": "30px", "targets": [35+countStruc] }, //Total Point
	    	{ "width": "30px", "targets": [36+countStruc] }, //Baht/Point
	    ];
	}
	
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
	    	leftColumns: 12,
	    	heightMatch: 'auto'
	    },
//	    drawCallback: function() {
//	        $('#tableBonusAdjustment1 tbody tr').each(function(i, tr) {
//	           tr.children[0].textContent = i+1;
//	           console.log(i);
//	        })
//	    },
//	    "iDisplayLength": -1,
//	    "bPaginate": true,
//	    "iCookieDuration": 60,
//	    "bStateSave": false,
//	    "bAutoWidth": true,
//	    "bScrollAutoCss": true,
//	    "bProcessing": true,
//	    "bRetrieve": true,
//	    "bJQueryUI": true,
	    columnDefs : columnSetting,
	});
	
	/*
	$('#filter-group').change(function() {
        table.DataTable()
        .columns(0).search(this.value)
        .draw();
	}); // เซ็ตการค้นหาในคอลั่มแรก
	*/
	
	$(".numberOnly,.numberOnlyCoo").autoNumeric('init');
	$(".numberOnly").autoNumeric('update', {
		vMin : '0',
		vMax : '99999999',
		lZero: 'deny',
		wEmpty: 'zero',
		//aSign : ' %',
		//pSign : 's'
	});
	
	$(".numberOnlyCoo").autoNumeric('update', {
		vMin : '0',
		vMax : '999',
		lZero: 'deny',
		wEmpty: 'zero',
		//aSign : ' %',
		//pSign : 's'
	});

	$(".fix-column-top").css({
		"text-align" : "center", 
		"border-bottom" : "0px", 
		"vertical-align": "top"
	});
	
	$(".maxWidth30").css({
		"max-width" : "30px", 
		"overflow-y" : "auto", 
		"text-overflow": "clip", 
		"vertical-align": "top"
	});
	
	$(".maxWidth10").css({
		"max-width" : "10px", 
		"overflow-y" : "auto", 
		"text-overflow": "clip", 
		"vertical-align": "top"
	});
	
	$(".maxWidth30,.maxWidth10").addClass("hideScrollbar");
	
	$("table.dataTable.no-footer").css({"border-bottom" : "0px"});
	
	//$(".tableBonusAdjustment>tbody>tr").css({"height" : "0"}); //clear height tr
	
	$(".pos-column-lef").css({
		"text-align" : "left", 
		"vertical-align": "top"
	});
	
	$(".pos-column-cen").css({
		"text-align" : "center", 
		"vertical-align": "top"
	});
	
	$(".pos-column-rig").css({
		"text-align" : "right", 
		"vertical-align": "top"
	});
	
	$(".pos-column-rig.bold").css({"font-weight" : "bold"});
	
	$(".no-sort").removeClass("sorting_asc");
	
//	$(".pos-column-lef").find('.ecEmpName').addClass("maxWidthEmpName ellipsis");
//	$(".pos-column-lef").find('.ecOrgName').addClass("maxWidthOrg ellipsis");
	
//	$(".pos-column-lef").find('.eclip').addClass("ellipsis");
	
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
		let sumMissOver = 0;
		
		$.each($(".control-calculate").get(),function(index,indexEntry) {
			if (typeof $(indexEntry).attr('data-dt-row') !== typeof undefined && $(indexEntry).attr('data-dt-row') !== false) {
				//เป็นคลาสของ datatables ซึ่งจะไม่เอาข้อมูลในส่วนนี้
			} else {
				let row_num = $(indexEntry).closest('.control-calculate').attr('rowNum');
				
				sumPercent += Number(removeComma($(indexEntry).find('.data-percent').find('.percent').val()));
				sumBath += Number(removeComma($(indexEntry).find('.data-score').find('.score').val()));
				sumTotalChangeSalary += Number(removeComma($(indexEntry).find('.data-up-total').attr('data-value')));
				
				sumChangeSalary += Number(removeComma($(indexEntry).closest('.dataTables_scroll').next().find('.DTFC_LeftBodyWrapper').find(".rowNum"+row_num).find('.data-salary').find('.salary').val()));
				sumChangePQPI += Number(removeComma($(indexEntry).closest('.dataTables_scroll').next().find('.DTFC_LeftBodyWrapper').find(".rowNum"+row_num).find('.data-pqpi').find('.pqpi').val()));
				sumChangeDiff += Number(removeComma($(indexEntry).closest('.dataTables_scroll').next().find('.DTFC_LeftBodyWrapper').find(".rowNum"+row_num).find('.data-percent-diff').attr('data-value')));
				
				sumTotalNewSalary += Number(removeComma($(indexEntry).find('.data-new-total-salary').attr('data-value')));
				sumNewSalary += Number(removeComma($(indexEntry).find('.data-new-salary').attr('data-value')));
				sumNewPQPI += Number(removeComma($(indexEntry).find('.data-new-pqpi').attr('data-value')));
				sumMissOver += Number(removeComma($(indexEntry).find('.data-miss-over').attr('data-value')));
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
		$(".ft-sum-missover").attr('data-value', sumMissOver);
		
		$(".dataTables_scrollFoot").find(".ft-sum-percent").text(Comma(sumPercent.toFixed(2)));
		$(".dataTables_scrollFoot").find(".ft-sum-bath").text(Comma(sumBath.toFixed(2)));
		
		$(".DTFC_LeftFootWrapper").find(".ft-sum-change-total").text(Comma(Math.round(sumTotalChangeSalary)));
		$(".DTFC_LeftFootWrapper").find(".ft-sum-change-salary").text(Comma(sumChangeSalary.toFixed(2)));
		$(".DTFC_LeftFootWrapper").find(".ft-sum-change-pqpi").text(Comma(sumChangePQPI.toFixed(2)));
		$(".DTFC_LeftFootWrapper").find(".ft-sum-change-diff").text(Comma(sumChangeDiff.toFixed(2)));
		
		$(".dataTables_scrollFoot").find(".ft-sum-new-total").text(Comma(sumTotalNewSalary.toFixed(2)));
		$(".dataTables_scrollFoot").find(".ft-sum-new-salary").text(Comma(sumNewSalary.toFixed(2)));
		$(".dataTables_scrollFoot").find(".ft-sum-new-pqpi").text(Comma(sumNewPQPI.toFixed(2)));
		
		$(".DTFC_LeftFootWrapper").find(".ft-sum-missover").text(Comma(sumMissOver));
		
		//update main table
		/*
		$(".dataTables_scrollBody").find(".ft-sum-change-total").text(Comma(Math.round(sumTotalChangeSalary)));
		$(".dataTables_scrollBody").find(".ft-sum-change-salary").text(Comma(sumChangeSalary.toFixed(2)));
		$(".dataTables_scrollBody").find(".ft-sum-change-pqpi").text(Comma(sumChangePQPI.toFixed(2)));
		$(".dataTables_scrollBody").find(".ft-sum-change-diff").text(Comma(sumChangeDiff.toFixed(2)));
		*/
		
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
		console.log(score, now_salary, total, '1016');
		$(this).closest('.control-calculate').find('.data-percent').find('.percent').autoNumeric('set', total);
		calculateSumtotalFooter();
	});
	
	function calculateNewSalaryTotal(elementThis) {
		let row_num = $(elementThis).closest('.control-calculate').attr('rowNum');
		var new_salary = Number($(".rowNum"+row_num).find('.data-new-salary').attr('data-value'));
		var new_pqpi = Number($(".rowNum"+row_num).find('.data-new-pqpi').attr('data-value'));
		var new_fix_other = Number($(".rowNum"+row_num).find('.data-new-fix-other').attr('data-value'));
		var new_mipi = Number($(".rowNum"+row_num).find('.data-new-mpi').attr('data-value'));
		var new_pi = Number($(".rowNum"+row_num).find('.data-new-pi').attr('data-value'));
		var new_var_other = Number($(".rowNum"+row_num).find('.data-new-var-other').attr('data-value'));
		var total = new_salary + new_pqpi + new_fix_other + new_mipi + new_pi + new_var_other;
		//console.log('total -> ',total,"data -> ", new_salary, new_pqpi, new_fix_other, new_mipi, new_pi, new_var_other);
		$(".rowNum"+row_num).find('.data-new-total-salary').attr('data-value', total.toFixed(2));
		$(".rowNum"+row_num).find('.data-new-total-salary').text(Comma(total.toFixed(2)));
	}
	
	$('.salary').keyup(function() {
		var salary = Number($(this).autoNumeric('get'));
		let row_num = $(this).closest('.control-calculate').attr('rowNum');
		$('.dataTables_scrollBody').find(".rowNum"+row_num).find('.data-salary').find('.salary').attr('value', salary);
		//$(this).closest('.dataTables_scroll').find('.dataTables_scrollBody').find(".rowNum"+row_num).find('.data-salary').find('.salary').val(salary);
		
		//คำนวน ปรับรายได้ Total
		var pqpi_score = Number($(this).closest(".rowNum"+row_num).find('.data-pqpi').find('.pqpi').autoNumeric('get'));
		var total = pqpi_score + salary;
		$(".rowNum"+row_num).find('.data-up-total').attr('data-value', Math.round(total));
		$(".rowNum"+row_num).find('.data-up-total').text(Comma(Math.round(total)));
		$('.dataTables_scrollBody').find(".rowNum"+row_num).find('.data-up-total').text(Comma(Math.round(total))); //update grade value in main table
		
		//คำนวน รายได้ใหม่  ตรง salary
		var current_salary = Number($(".rowNum"+row_num).find('.data-current-salary').attr('data-value'));
		var new_salary = current_salary + salary;
		$(".rowNum"+row_num).find('.data-new-salary').attr('data-value', new_salary.toFixed(2));
		$(".rowNum"+row_num).find('.data-new-salary').text(Comma(new_salary.toFixed(2)));

		//คำนวน % Diff
		var data_current_total = Number($(this).closest(".rowNum"+row_num).attr('data-current-total'));
		var val_diff = (total/data_current_total)*100;
		if(val_diff=="Infinity") {
			val_diff = 0;
			console.log("รายได้ปัจจุบัน Total เป็น 0 ถ้า (ปรับรายได้ Total/รายได้ปัจจุบัน Total) % diff จะเป็น infinity");
		}
		
		$(this).closest(".rowNum"+row_num).find('.data-percent-diff').attr('data-value', val_diff.toFixed(2));
		$(this).closest(".rowNum"+row_num).find('.data-percent-diff').text(Comma(val_diff.toFixed(2)));
		$('.dataTables_scrollBody').find(".rowNum"+row_num).find('.data-percent-diff').text(Comma(val_diff.toFixed(2)));
		
		//คำนวน รายได้ใหม่ total
		calculateNewSalaryTotal($(this));
		calculateSumtotalFooter();
	});
	
	$(".pqpi").keyup(function() {
		var pqpi = Number($(this).autoNumeric('get'));
		let row_num = $(this).closest('.control-calculate').attr('rowNum');
		$('.dataTables_scrollBody').find(".rowNum"+row_num).find('.data-pqpi').find('.pqpi').attr('value', pqpi);

		//คำนวน ปรับรายได้ Total
		var salary_score = Number($(this).closest(".rowNum"+row_num).find('.data-salary').find('.salary').autoNumeric('get'));
		var total = salary_score + pqpi;
		$(this).closest(".rowNum"+row_num).find('.data-up-total').attr('data-value', Math.round(total));
		$(this).closest(".rowNum"+row_num).find('.data-up-total').text(Comma(Math.round(total)));
		$('.dataTables_scrollBody').find(".rowNum"+row_num).find('.data-up-total').text(Comma(Math.round(total))); //update grade value in main table
		
		//คำนวน รายได้ใหม่  ตรง  P-QPI
		var current_pqpi = Number($(".rowNum"+row_num).find('.data-current-pqpi').attr('data-value'));
		var new_pqpi = current_pqpi + pqpi;
		$(".rowNum"+row_num).find('.data-new-pqpi').attr('data-value', new_pqpi.toFixed(2));
		$(".rowNum"+row_num).find('.data-new-pqpi').text(Comma(new_pqpi.toFixed(2)));
		
		//คำนวน % Diff
		var data_current_total = Number($(this).closest(".rowNum"+row_num).attr('data-current-total'));
		var val_diff = (total/data_current_total)*100;
		if(val_diff=="Infinity") {
			val_diff = 0;
			console.log("รายได้ปัจจุบัน Total เป็น 0 ถ้า (ปรับรายได้ Total/รายได้ปัจจุบัน Total) % diff จะเป็น infinity");
		}
		
		$(this).closest(".rowNum"+row_num).find('.data-percent-diff').attr('data-value', val_diff.toFixed(2));
		$(this).closest(".rowNum"+row_num).find('.data-percent-diff').text(Comma(val_diff.toFixed(2)));
		$('.dataTables_scrollBody').find(".rowNum"+row_num).find('.data-percent-diff').text(Comma(val_diff.toFixed(2)));
		
		//คำนวน รายได้ใหม่ total
		calculateNewSalaryTotal($(this));
		calculateSumtotalFooter();
	});
	
	$(".score_coo").keyup(function() {
		var scoreCooOrBoard = Number($(this).autoNumeric('get'));
		let indexArray = $(this).closest('.control-calculate').attr('rowNum');
		$('.dataTables_scrollBody').find(".rowNum"+indexArray).find('.data-coo').find('.score_coo').attr('value', scoreCooOrBoard); //update score_coo value in main table
		
//		let objName = $(this).attr('obj-name');
//		refreshDataSortFn(indexArray, objName, scoreCooOrBoard);

		var arrayG = $(this).closest('.data-coo').attr('array-grade');
		var ArrayScore = JSON.parse(arrayG);
		
		var filterScore = ArrayScore.filter(function (el) {
		    return scoreCooOrBoard >= el.begin_score && scoreCooOrBoard <= el.end_score;
		});
		
		var grade = (filterScore.length==0 ? '' : filterScore[0]['grade']);
		
		$(this).closest('.control-calculate').find('.data-grade').text(grade);
		$('.dataTables_scrollBody').find(".rowNum"+indexArray).find('.data-grade').text(grade); //update grade value in main table
		
		let score_coo = $(this).autoNumeric('get');
		let total_point = $(this).closest('.control-calculate').attr('total_point');
		let bath_point = $(this).closest('.control-calculate').attr('bath_point');
		
		let cal1 = Number(total_point) * Number(score_coo);
		let cal2 = cal1 / 100;
		let cal3 = cal2 * Number(bath_point);
		let total_percent = Comma(roundThen(notNullFn(isNaN((cal3 * 90)/100) ? 0 : (cal3 * 90)/100 ), -2));
		let fix_percent = Comma(roundThen(notNullFn(isNaN((cal3 * 65)/100) ? 0 : (cal3 * 65)/100 ), -2));
		let var_percent = Comma(roundThen(notNullFn(isNaN((cal3 * 25)/100) ? 0 : (cal3 * 25)/100 ), -2));
		
		let row_num = $(this).closest('.control-calculate').attr('rowNum');
		$(".rowNum"+row_num).find('.data-total-percent').text(Comma(total_percent));
		$(".rowNum"+row_num).find('.data-fix-percent').text(Comma(fix_percent));
		$(".rowNum"+row_num).find('.data-var-percent').text(Comma(var_percent));
		
		$(this).closest('.data-coo').attr('data-sort', notNullFn(score_coo)); //add score_coo or score_board to attr
	});
	
	/*
	$(".refreshSoring").click(function() {
		if($(this).attr('sort-type')=='asc') {
			if($(this).attr('name-sort')=='score_coo' || $(this).attr('name-sort')=='score_coo2') {
				GlobalChangingSortingData['items'].sort((a,b) => (a.score_coo > b.score_coo) ? 1 : ((b.score_coo > a.score_coo) ? -1 : 0)); 
			} else if($(this).attr('name-sort')=='score_board') {
				GlobalChangingSortingData['items'].sort((a,b) => (a.score_board > b.score_board) ? 1 : ((b.score_board > a.score_board) ? -1 : 0)); 
			} else if($(this).attr('name-sort')=='z_score') {
				GlobalChangingSortingData['items'].sort((a,b) => (a.z_score > b.z_score) ? 1 : ((b.z_score > a.z_score) ? -1 : 0)); 
			} else if($(this).attr('name-sort')=='grade') {
				GlobalChangingSortingData['items'].sort((a,b) => (a.grade > b.grade) ? 1 : ((b.grade > a.grade) ? -1 : 0)); 
			} else if($(this).attr('name-sort')=='score_diff') {
				GlobalChangingSortingData['items'].sort((a,b) => (a.percent_diff > b.percent_diff) ? 1 : ((b.percent_diff > a.percent_diff) ? -1 : 0)); 
			} else if($(this).attr('name-sort')=='current_total') {
				GlobalChangingSortingData['items'].sort((a,b) => (a.total_now_salary > b.total_now_salary) ? 1 : ((b.total_now_salary > a.total_now_salary) ? -1 : 0)); 
			} else if($(this).attr('name-sort')=='new_total') {
				GlobalChangingSortingData['items'].sort((a,b) => (a.total_now_salary > b.total_now_salary) ? 1 : ((b.total_now_salary > a.total_now_salary) ? -1 : 0)); 
			} else if($(this).attr('name-sort')=='score_mgr') {
				GlobalChangingSortingData['items'].sort((a,b) => (a.score_manager > b.score_manager) ? 1 : ((b.score_manager > a.score_manager) ? -1 : 0)); 
			} else if($(this).attr('name-sort')=='score_bu') {
				GlobalChangingSortingData['items'].sort((a,b) => (a.score_bu > b.score_bu) ? 1 : ((b.score_bu > a.score_bu) ? -1 : 0)); 
			}
		} else {
			if($(this).attr('name-sort')=='score_coo' || $(this).attr('name-sort')=='score_coo2') {
				GlobalChangingSortingData['items'].sort((a,b) => (a.score_coo < b.score_coo) ? 1 : ((b.score_coo < a.score_coo) ? -1 : 0)); 
			} else if($(this).attr('name-sort')=='score_board') {
				GlobalChangingSortingData['items'].sort((a,b) => (a.score_board < b.score_board) ? 1 : ((b.score_board < a.score_board) ? -1 : 0)); 
			} else if($(this).attr('name-sort')=='z_score') {
				GlobalChangingSortingData['items'].sort((a,b) => (a.z_score < b.z_score) ? 1 : ((b.z_score < a.z_score) ? -1 : 0)); 
			} else if($(this).attr('name-sort')=='grade') {
				GlobalChangingSortingData['items'].sort((a,b) => (a.grade < b.grade) ? 1 : ((b.grade < a.grade) ? -1 : 0)); 
			} else if($(this).attr('name-sort')=='score_diff') {
				GlobalChangingSortingData['items'].sort((a,b) => (a.percent_diff < b.percent_diff) ? 1 : ((b.percent_diff < a.percent_diff) ? -1 : 0)); 
			} else if($(this).attr('name-sort')=='current_total') {
				GlobalChangingSortingData['items'].sort((a,b) => (a.total_now_salary < b.total_now_salary) ? 1 : ((b.total_now_salary < a.total_now_salary) ? -1 : 0)); 
			} else if($(this).attr('name-sort')=='new_total') {//waiting fix
				GlobalChangingSortingData['items'].sort((a,b) => (a.total_now_salary_new < b.total_now_salary_new) ? 1 : ((b.total_now_salary_new < a.total_now_salary_new) ? -1 : 0)); 
			} else if($(this).attr('name-sort')=='score_mgr') {
				GlobalChangingSortingData['items'].sort((a,b) => (a.score_manager < b.score_manager) ? 1 : ((b.score_manager < a.score_manager) ? -1 : 0)); 
			} else if($(this).attr('name-sort')=='score_bu') {
				GlobalChangingSortingData['items'].sort((a,b) => (a.score_bu < b.score_bu) ? 1 : ((b.score_bu < a.score_bu) ? -1 : 0)); 
			}
		}
		
		listDataFn(GlobalChangingSortingData);
		if($(this).attr('sort-type')=='asc') {
			$('.refreshSoring.column_score').attr('sort-type', 'desc');
			$('.refreshSoring.column_z_score').attr('sort-type', 'desc');
			$('.refreshSoring.column_grade').attr('sort-type', 'desc');
			$('.refreshSoring.column_diff').attr('sort-type', 'desc');
			$('.refreshSoring.column_current_total').attr('sort-type', 'desc');
			$('.refreshSoring.column_new_total').attr('sort-type', 'desc');
			$('.refreshSoring.column_score_mgr').attr('sort-type', 'desc');
			$('.refreshSoring.column_score_bu').attr('sort-type', 'desc');
		} else {
			$('.refreshSoring.column_score').attr('sort-type', 'asc');
			$('.refreshSoring.column_z_score').attr('sort-type', 'asc');
			$('.refreshSoring.column_grade').attr('sort-type', 'asc');
			$('.refreshSoring.column_diff').attr('sort-type', 'asc');
			$('.refreshSoring.column_current_total').attr('sort-type', 'asc');
			$('.refreshSoring.column_new_total').attr('sort-type', 'asc');
			$('.refreshSoring.column_score_mgr').attr('sort-type', 'asc');
			$('.refreshSoring.column_score_bu').attr('sort-type', 'asc');
		}
	});
	*/
}

var updateFn = function(cal) {
	var stage_id = $("#actionToAssign").val();
	var detail = [];
	$.each($(".control-calculate").get(),function(index,indexEntry) {
		if (typeof $(indexEntry).attr('data-dt-row') !== typeof undefined && $(indexEntry).attr('data-dt-row') !== false) {
			//เป็นคลาสของ datatables ซึ่งจะไม่เอาข้อมูลในส่วนนี้
			
		} else {
			if($(indexEntry).find('.data-check').find('.select-check').attr('select-check')==1) {
				let row_num = $(indexEntry).closest('.control-calculate').attr('rowNum');
				detail.push({
					emp_result_id		: $(indexEntry).find('.data-main').attr('emp_result_id'),
					emp_id				: $(indexEntry).find('.data-main').attr('emp_id'),
					salary				: $(indexEntry).find('.data-salary').find('.salary').autoNumeric('get'),
					pqpi				: $(indexEntry).find('.data-pqpi').find('.pqpi').autoNumeric('get'),
					grade				: $(indexEntry).closest('.dataTables_scroll').next().find('.DTFC_LeftBodyWrapper').find('.rowNum'+row_num).find('.data-grade').text().trim(),
					score_adjust		: $(indexEntry).closest('.dataTables_scroll').next().find('.DTFC_LeftBodyWrapper').find('.rowNum'+row_num).find('.score_coo').autoNumeric('get')
				});
			}
		}
	});
	
	console.log(detail, cal);
	
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
        	"calculate_flag": cal,
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

var exportExcel = function() {
	let selectCheck = false;
	$("#list_header_temp").empty().html($("#tableBonusAdjustment"+countDatatableGenerate+" > thead").html());

	// append row is checked
	$("#list_boby_temp").empty();
	$("#tableBonusAdjustment"+countDatatableGenerate+" > tbody > tr").each(function() {
		var isRowSelect = $(this).children("td:eq(0)").children("input").attr("select-check");
		if (typeof isRowSelect !== typeof undefined && isRowSelect == "1") {
			$("#list_boby_temp").append("<tr>"+$(this).html()+"</tr>");
			selectCheck = true;
		}
	});
	
	if(selectCheck==false) {
		callFlashSlide("Please Select Employee");
		return;
	}
	
	var numFooter = [6,7,8,9,10,11]

	$.each(numFooter,function(index,value) {
	  $(".dataTables_scroll").find(".dataTables_scrollFootInner").find(".tableBonusAdjustment").find("#list_footer > tr > td:eq("+value+")")
	  .html($(".DTFC_LeftFootWrapper").find(".tableBonusAdjustment").find("#list_footer > tr > td:eq("+value+")").html()
	  );
	});
	
	$("#list_footer_temp").empty().html($(".dataTables_scroll").find(".dataTables_scrollFootInner").find(".tableBonusAdjustment").find("#list_footer").html());

	// export table to excel
	$("#table-export-temp").table2excel({
		exclude: ".noExl",
		filename: "Salary Adjustment.xls"
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
		    	updateFn(0);
		    });
		    
		    $("#btnCalculate").click(function() {
		    	updateFn(1);
		    });
		    
		    $("#btnExport").click(function() {
		    	exportExcel();
		    });
		    
		    //binding tooltip start
		    $('[data-toggle="tooltip"]').css({"cursor":"pointer"});
		    $('[data-toggle="tooltip"]').tooltip({
		    	 html:true
		    });
		    
		    $(window).scroll(function() {
		    	$('.fixedHeader-floating').hide(); //ทุกครั้งที่เลื่อนสกอ จะซ่อนคลาสของ datatable ที่ freeze ไม่งั้น ui จะเพี้ยน
		    	//$(".DTFC_LeftBodyWrapper").css({"height" : $('.dataTables_scrollBody').find('tbody:visible').height()}); //set height frezze math tr
				//$(".DTFC_ScrollWrapper").css({"height" : $('.dataTables_scroll:visible').height()}); //set div freeze math height main table
		    });
		    
//		    $.fn.dataTable.ext.errMode = function ( settings, helpPage, message ) { 
//		        console.log(message);
//		    };
		    
		    $("#advanceSearchAppraisalGroup").show();
		}
	}
});
