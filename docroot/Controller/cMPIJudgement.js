var globalData="";
var galbalDataTemp=[]; 
//var phaseArray=[];
//var globalCount=0;
var username = "";
var password = "";
var score = "";
var type_score = "";
var user_id = "";
var user_level_id = "";
var user_admin = "";
var table = "";
const pageNumberDefault=1;
var startDatatable = true;
var clearFn = function() {
	$("#information").hide();
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
		url:restfulURL+"/"+serviceName+"/public/mpi/parameter/form",
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
	$('input[name=multiselect_Position]').css({'margin-bottom':'5px'});
}
var appraisalStatusFn = function () {
	var position_id = $("#Position").val();
	if (position_id == null){ position_id = ['null'];}
	
    $.ajax({
        url: restfulURL + "/" + serviceName + "/public/bonus/advance_search/status",
        type: "get",
        dataType: "json",
        async: false,
        data: {
        	"flag": "mpi_judgement_flag",
        	"appraisal_form_id": $("#AppraisalForm").val(),
        	"appraisal_type_id": 2,
        	
        	"emp_level" : $("#AppraisalEmpLevel").val(),
            "org_level" : $("#AppraisalOrgLevel").val(),
            "org_id" : $("#organization").val(),
            "appraisal_year" : $("#AppraisalYear").val(),
            "period_id" : $("#AppraisalPeriod").val(),
            "emp_id" : $("#EmpName_id").val(),
            "position_id" : position_id
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

//SearchAdvance
/*
var searchAdvanceFn = function () {

    $("#embedParamSearch").empty();
    var embedParam = "";
    embedParam += "<input type='hidden' class='embed_param_search' id='embed_appraisal_level_id_org' name='embed_appraisal_level_id_org' value='" + $("#AppraisalOrgLevel").val()+"'>";
    embedParam += "<input type='hidden' class='embed_param_search' id='embed_appraisal_level_id_emp' name='embed_appraisal_level_id_emp' value='" + $("#AppraisalEmpLevel").val() + "'>";
    embedParam += "<input type='hidden' class='embed_param_search' id='embed_period_id' name='embed_period_id' value='" + $("#AppraisalPeriod").val()+"'>";
    embedParam += "<input type='hidden' class='embed_param_search' id='embed_position_id' name='embed_position_id' value='" + $("#Position").val() + "'>";
    embedParam += "<input type='hidden' class='embed_param_search' id='embed_emp_id' name='embed_emp_id' value='"+$("#EmpName_id").val()+"'>";
    embedParam += "<input type='hidden' class='embed_param_search' id='embed_year_list' name='embed_year_list' value='" + $("#AppraisalYear").val() + "'>";
    embedParam += "<input type='hidden' class='embed_param_search' id='embed_organization' name='embed_organization' value='"+$("#organization").val()+"'>";
    embedParam += "<input type='hidden' class='embed_param_search' id='embed_status' name='embed_status' value='" + $("#status").val() + "'>";
    embedParam += "<input type='hidden' class='embed_param_search' id='embed_appraisal_form' name='embed_appraisal_form' value='" + $("#AppraisalForm").val() + "'>";

    $("#embedParamSearch").append(embedParam);
    
    to_action();
    getDataFn(pageNumberDefault,$("#rpp").val());
};
*/

//Get Data
var getDataFn = function (page, rpp) {
	to_action();
	
	//var page = pageNumberDefault;
	//var rpp = $("#rpp").val();
	
	var position_id = $("#Position").val();
	if (position_id == null){ position_id = ['null'];}
    var year = $("#AppraisalYear").val();
    var level_id_org = $("#AppraisalOrgLevel").val();
    var level_id_emp = $("#AppraisalEmpLevel").val();
    var period_id = $("#AppraisalPeriod").val();
    var emp_id = $("#EmpName_id").val();
    var org_id = $("#organization").val();
    var status = $("#status").val();
    var form = $("#AppraisalForm").val();
    //position_id.push($("#Position").val());
    
    $.ajax({
        url: restfulURL + "/" + serviceName + "/public/mpi/mpi_judgement",
        type: "get",
        dataType: "json",
        async: true,
        headers: { Authorization: "Bearer " + tokenID.token },
        data: {
            "page": page,
            "rpp": rpp,
            "appraisal_year": year,
            "period_id": period_id,
            "emp_level": level_id_emp,
            "org_level": level_id_org,
            "org_id": org_id,
            "emp_id": emp_id,
            "position_id": position_id,        
            "stage_id": status,
            "appraisal_form": form
        },
        success: function (data) {
            listDataFn(data['data']);
            setThemeColorFn(tokenID.theme_color);
            globalData = data;
            paginationSetUpFn(globalData['current_page'], globalData['last_page'], globalData['last_page']);     
        }
    });
};


var to_action = function () {
	var status = $("#status").val();
	var form_id = $("#AppraisalForm").val();
	
    $.ajax({
        url: restfulURL + "/" + serviceName + "/public/emp/adjustment/to_action",
        type: "get",
        dataType: "json",
        async: true,
        data: {
        	"stage_id": status,
        	"flag": "mpi_judgement_flag",
        	"appraisal_type_id": 2,
        	"appraisal_form_id": form_id
        },
        headers: { Authorization: "Bearer " + tokenID.token },
        success: function (data) {
        	var htmlOption="";
            $.each(data, function (index, indexEntry) {
            	htmlOption += "<option value='" + indexEntry['stage_id'] + "'>" + indexEntry['to_action'] + "</option>";
            });
            $("#actionToAssign").html(htmlOption);

            if($("#actionToAssign").val()==null) {
            	$("#btnCalculation, #btnSubmit").prop("disabled", true);
            } else {
            	$("#btnCalculation, #btnSubmit").prop("disabled", false);
            }
        }
    });
}


var listDataFn = function(data){
	var htmlHTML="";
	var edit_flag = "";
	var grade_manager = "";
	var grade_bu = "";
	var grade_coo = "";
	
	var table = $('#tableBonusAdjustment');
	table.DataTable().clear();
	table.DataTable().destroy();
	//ก่อน generate data ต้องเคลีย freeze เก่าออก ไม่งั้นข้อมูลมันไม่เปลี่ยน
	
	if(data.length==0) {
		htmlHTML +="<tr>";
		htmlHTML +="<td></td>";
		htmlHTML +="<td></td>";
		htmlHTML +="<td></td>";
		htmlHTML +="<td></td>";
		htmlHTML +="<td></td>";
		htmlHTML +="<td></td>";
		htmlHTML +="<td></td>";
		htmlHTML +="<td></td>";
		htmlHTML +="<td></td>";
		htmlHTML +="<td></td>";
		htmlHTML +="<td></td>";
		htmlHTML +="<td></td>";
		htmlHTML +="<td></td>";
		htmlHTML +="<td></td>";
		htmlHTML +="<td></td>";
		htmlHTML +="<td></td>";
		//htmlHTML +="<div style='margin-top: 40px;margin-bottom: 40px;font-weight: bold;color: #e04747;' align='center'>No Data to Display.</div>";
		//htmlHTML +="</td>";
		htmlHTML +="</tr>";
		$("#list_mpi_judgement").html(htmlHTML);
		$(".head_adjust").hide();
		return;
	}
	
	$.each(data,function (index, indexEntry) {

		user_bu = indexEntry['is_bu'];
		user_coo = indexEntry['is_coo'];
		user_admin = indexEntry['is_admin'];
		user_id = indexEntry['user_emp_id'];
		user_level_id = indexEntry['user_level_id'];
		
		if (indexEntry['grade_manager'] == null){
			grade_manager = "-";
		}else if (indexEntry['grade_manager'] != null){
			grade_manager = indexEntry['grade_manager'];
		}
		
		if (indexEntry['grade_bu'] == null){
			grade_bu = "-";
		}else if (indexEntry['grade_bu'] != null){
			grade_bu = indexEntry['grade_bu'];
		}
		
		if (indexEntry['grade_coo'] == null){
			grade_coo = "-";
		}else if (indexEntry['grade_coo'] != null){
			grade_coo = indexEntry['grade_coo'];
		}
		
			htmlHTML += " <tr class=\"control-calculate\">";
	        htmlHTML += " <td style=\"text-align: center;\">";
	        htmlHTML += " <input type=\"checkbox\" class=\"select-check\" id=\""+indexEntry['emp_result_id']+"\" edit_flag=\""+indexEntry['edit_flag']+"\" style=\"margin-top:-3px;\">";
	        htmlHTML += " </td>";
	        htmlHTML += " <td style=\"text-align: center;\" >";
	        htmlHTML += " <div class=\"ellipsis\" data-text=\""+indexEntry['emp_code']+"\">"+indexEntry['emp_code']+"</div>";
	        htmlHTML += " </td>";
	        htmlHTML += " <td><div style=\"margin-left: 5px; text-align: left; \" >";
	        htmlHTML += " <div class=\"OverFlow\" data-text=\""+indexEntry['emp_name']+"\">"+indexEntry['emp_name']+"</div>";
	        htmlHTML += " </div></td>";
	        htmlHTML += " <td style=\"text-align: center;\" >";
	        htmlHTML += " <div class=\"OverFlow\" data-text=\""+indexEntry['appraisal_level_name']+"\">"+indexEntry['appraisal_level_name']+"</div>";
	        htmlHTML += " </td>";
	        htmlHTML += " <td style=\"text-align: left;\" >";
	        htmlHTML += " <div class=\"OverFlow\" data-text=\""+indexEntry['org_name']+"\">"+indexEntry['org_name']+"</div>";
	        htmlHTML += " </td>";
	        htmlHTML += " <td style=\"text-align: left;\" >";
	        htmlHTML += " <div class=\"OverFlow\" data-text=\""+indexEntry['position_name']+"\">"+indexEntry['position_name']+"</div>";
	        htmlHTML += " </td>";
	        htmlHTML += " <td style=\"text-align: center;\" >";
	        htmlHTML += " <div class=\"OverFlow\" data-text=\""+indexEntry['status']+"\">"+indexEntry['status']+"</div>";
	        htmlHTML += " </td>";
	        htmlHTML += " <td style=\"text-align: center;\">";
	        htmlHTML += " "+indexEntry['score_manager']+"";
	        htmlHTML += " </td>";
	        htmlHTML += " <td style=\"text-align: center;\">";
	        htmlHTML += " "+grade_manager+"";
	        htmlHTML += " </td>";
	        htmlHTML += " <td style=\"text-align: center;\">";
	        htmlHTML += " "+addCommas(notNullFn(indexEntry['amount_manager']))+"";
	        htmlHTML += " </td>";
	        
	        if(indexEntry['is_bu']==1) {
	        	htmlHTML += " <td class=\"score_bu\">";
	        	htmlHTML += "	<div class=\"float-label-control \">";
	            htmlHTML += "		<input type=\"text\" class=\"form-control input-xs span12 bu numberOnly\" value='"+indexEntry['score_bu']+"'>";
	            htmlHTML += "	</div>";
	            htmlHTML += " </td>";
			} else {
				htmlHTML += " <td style=\"text-align: right;\">";
				htmlHTML += " "+addCommas(notNullFn(indexEntry['score_bu']))+"";
				htmlHTML += " </td>";
			}
	        
	        htmlHTML += " <td style=\"text-align: center;\">";
	        htmlHTML += " "+grade_bu+"";
	        htmlHTML += " </td>";
	        htmlHTML += " <td style=\"text-align: right;\">";
	        htmlHTML += " "+addCommas(notNullFn(indexEntry['amount_bu']))+"";
	        htmlHTML += " </td>";
	        
	        if(indexEntry['is_coo']==1) {
	        	htmlHTML += " <td class=\"score_coo\">";
	        	htmlHTML += "	<div class=\"float-label-control \">";
	            htmlHTML += "		<input type=\"text\" class=\"form-control input-xs span12 coo numberOnly\" value='"+indexEntry['score_coo']+"'>";
	            htmlHTML += "	</div>";
	            htmlHTML += " </td>";
			} else {
				htmlHTML += " <td style=\"text-align: right;\">";
				htmlHTML += " "+addCommas(notNullFn(indexEntry['score_coo']))+"";
				htmlHTML += " </td>";
			}
	        
	        htmlHTML += " <td style=\"text-align: center;\">";
	        htmlHTML += " "+grade_coo+"";
	        htmlHTML += " </td>";
	        htmlHTML += " <td style=\"text-align: right;\">";
	        htmlHTML += " "+addCommas(notNullFn(indexEntry['amount_coo']))+"";
	        htmlHTML += " </td>";
	        htmlHTML += " </tr>";
		

	});
	
	$("#list_mpi_judgement").html(htmlHTML);
	
	
	//เซ็ต datatable freeze column, freeze header และ ความกว้างของคอลัม
	table.DataTable({
		"searching": false,
		fixedHeader: true,
		"ordering": false,
		"bInfo" : false,
		"scrollY": 350,
		"scrollX": true,
		scrollCollapse: true,
		paging: false,
		fixedColumns: {
			leftColumns: 3
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
				{ "width": "30px", "targets": [0] },
				{ "width": "50px", "targets": [7,8,10,11,13,14] }, 
				{ "width": "65px", "targets": [3,9,12,15] }, 
				{ "width": "70px", "targets": [1] },
				{ "width": "100px", "targets": [6] },
				{ "width": "150px", "targets": [2] },
				{ "width": "220px", "targets": [4,5] }
		]
	});
	
	$("table thead th").css({"border-bottom" : "0px"});
	
	// สามารถเลือก checkbox ได้เฉพาะคนที่เป็น bu และ coo
	if (user_bu == '1' || user_coo == '1' || user_admin == '1'){
		$( "input[type='checkbox']" ).prop({
			  disabled: false
		});
	}else {
		$( "input[type='checkbox']" ).prop({
			  disabled: true
		});
	}
		
	//	table.DataTable().fixedColumns().update();
	//	table.DataTable().fixedColumns().relayout();
	
	$(".numberOnly").autoNumeric('init');
	$(".numberOnly").autoNumeric('update', {
		vMin : '0',
		vMax : '9999999999',
		lZero: 'deny',
		wEmpty: 'zero',
	});
	$(".head_adjust").show();
	$("#statusSelectAll").prop('checked', false); //ล้างค่าการ checked ที่ปุ่ม check
	$(".statusSelectAll").prop('checked', false); //ล้างค่าการ checked ที่ปุ่ม check ตรง freeze
	$('.statusSelectAll').click(function () { //ถ้าคลิ้ก  check ตรง freeze
		$('#statusSelectAll').click(); //ให้ปุ่ม  check ทำงาน
		if ($('#statusSelectAll').prop('checked')) {
			$(".select-check").prop('checked', true);
	    } else {
	    	$(".select-check").prop('checked', false);
	    }
	});
	
	if($("#actionToAssign").val()==null || $("#actionToAssign").val()==undefined) {
		$("#btnSubmit").attr("disabled");
	} else {
		$("#btnSubmit").removeAttr("disabled");
	}
};

//var calculatePercentKeyup = function() {
//	$("#list_empjudege").find('.percent').keyup(function() {
//		var percent = $(this).autoNumeric('get');
//		var adjust_result_score = Number($(this).attr("total_adjust_result_score"));
//		var total = (percent/adjust_result_score);
//		//$(this).closest('.control-calculate').find('.data-score').find('.score').val(total.toFixed(2));
//		$(this).closest('.control-calculate').find('.data-score').find('.score').autoNumeric('set', total);
//	});
//		
//	$("#list_empjudege").find('.score').keyup(function() {
//		var score = $(this).autoNumeric('get');
//		var adjust_result_score = Number($(this).attr("total_adjust_result_score"));
//		var total = (score*adjust_result_score);
//		//$(this).closest('.control-calculate').find('.data-percent').find('.percent').val(total.toFixed(2));
//		$(this).closest('.control-calculate').find('.data-percent').find('.score').autoNumeric('set', total);
//	});
//}

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

var insertFn = function(type) {
	/* var position_id = $("#Position").val();
    var year = $("#AppraisalYear").val();
    var level_id_org = $("#AppraisalOrgLevel").val();
    var level_id_emp = $("#AppraisalEmpLevel").val();
    var period_id = $("#AppraisalPeriod").val();
    var emp_id = $("#EmpName_id").val();
    var org_id = $("#organization").val();
    var status = $("#status").val();
    var form = $("#AppraisalForm").val();
	var stage_id = $("#actionToAssign").val(); */
	
	var detail = [];
	$.each($(".control-calculate").get(),function(index,indexEntry){
		var idInput = $(indexEntry).find('input').attr('id');
		if(user_bu == '1'){
			if($(indexEntry).find('.select-check').prop('checked')) {
			detail.push({
				emp_result_id		: $(indexEntry).find('.select-check').attr('id'),
				score				: $('#'+idInput).parent().parent().find('.score_bu').find('.bu').autoNumeric('get'),
				type_score			: "bu",
				user_id				: user_id,
				user_level_id		: user_level_id,
				user_admin			: user_admin
			});
			}
		}
		if(user_coo == '1'){
			if($(indexEntry).find('.select-check').prop('checked')) {
			detail.push({
				emp_result_id		: $(indexEntry).find('.select-check').attr('id'),
				score	    		: $('#'+idInput).parent().parent().find('.score_coo').find('.coo').autoNumeric('get'),
				type_score			: "coo",
				user_id				: user_id,
				user_level_id		: user_level_id,
				user_admin			: user_admin
			});
			}
		}
		if(user_admin == '1'){
			if($(indexEntry).find('.select-check').prop('checked')) {
			detail.push({
				emp_result_id		: $(indexEntry).find('.select-check').attr('id'),
				user_id				: user_id,
				user_level_id		: user_level_id,
				user_admin			: user_admin
			});
			}
		}
	});
	
	/* console.log({
		"appraisal_year" : year,
    	"period_id" : period_id,
    	"emp_level" : level_id_emp,
    	"org_level" : level_id_org,
    	"org_id" : org_id,
    	"emp_id" : emp_id,
    	"position_id" : position_id,
    	"stage_id" :  stage_id,
    	"confirm_flag" : type,
    	"detail": detail
	}); */
	
	
    $.ajax({
        url: restfulURL + "/" + serviceName + "/public/mpi/mpi_judgement",
        type: "patch",
        dataType: "json",
        async: true,
        data: {
        	"stage_id" : $("#actionToAssign").val(),
        	"confirm_flag" : type,
        	"data": detail
        },
        headers: { Authorization: "Bearer " + tokenID.token },
        success: function (data) {
        	if(data['status']==200) {
        		appraisalStatusFn();
        		getDataFn(pageNumberDefault,$("#rpp").val());
        		callFlashSlide($(".lt-update-successfully").val());
        		clearFn();
        	} else if(data['status']==400) {
        		validationFn(data['data']);
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
			
			$("#AppraisalPeriod").change(function() {
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
		    	getDataFn(pageNumberDefault,$("#rpp").val());
		    	if($("#rpp").val()=='' ||$("#rpp").val() == undefined){  // default 
					$(".countPagination").val('All');
					$("#rpp").remove();
				}
		        $("#search_result").show();
		        clearFn();
		        
		    });
		    
		    $("#btnSubmit").click(function() {
		    	insertFn(1);
		    });
		    
		    $("#btnCalculation").click(function() {
		    	insertFn(0);
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
