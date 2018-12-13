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
        url: restfulURL + "/" + serviceName + "/public/emp/adjustment",
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
//        	var numbersArr = [];
//        	var data_length = data['result']['data'].length;
//        	var total = 90;
//        	var avg = 60;
//        	var standard_deviation = 6.65;
//        	var temp_data = data;
//        	$.each(temp_data['result']['data'],function (index, indexEntry) {
//        		temp_data['result']['data'][index].z_core = (indexEntry.perv_score_1 - avg)/standard_deviation;
//        	});
//        	console.log("temp");
//        	console.log(temp_data['data']);
//        	if(data_length != 0){
//	        	$.each(data['data'],function (index, indexEntry) {
//	        		total += Number(indexEntry.perv_score_1);
//	        		numbersArr.push(indexEntry.perv_score_1);
//	        	});
//	        	avg = total/data_length;
//	        	standard_deviation= standardDeviationFn(numbersArr);
//	        	$.each(data['data'],function (index, indexEntry) {
//	        		console.log("perv_score_1 : " +indexEntry.perv_score_1);
//	        		console.log("avg : " +avg);
//	        		console.log("standard_deviation : " +standard_deviation);
//	        		console.log("z_core : " + (indexEntry.perv_score_1 - avg)/standard_deviation);
//	        		indexEntry.z_core = (indexEntry.perv_score_1 - avg)/standard_deviation;
//	        	});
//        	}
        	//console.log(data['data']);
        	$("#average-score").html(data['avg']);
        	$("#sd-score").html(data['sd']);
            listDataFn(data['result']['data']);
            setThemeColorFn(tokenID.theme_color);
            globalData = data['result'];
            paginationSetUpFn(globalData['current_page'], globalData['last_page'], globalData['last_page']);
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
        	
        	console.log(statusFakeAdjust,'statusFakeAdjust');
        }
    });
}

var standardDeviationFn = function (numbersArr) {
    //--CALCULATE AVAREGE--
    var total = 0;
    for(var key in numbersArr) 
       total += numbersArr[key];
    var meanVal = total / numbersArr.length;
    //--CALCULATE AVAREGE--
  
    //--CALCULATE STANDARD DEVIATION--
    var SDprep = 0;
    for(var key in numbersArr) 
       SDprep += Math.pow((parseFloat(numbersArr[key]) - meanVal),2);
    var SDresult = Math.sqrt(SDprep/numbersArr.length);
    //--CALCULATE STANDARD DEVIATION--
    return SDresult;
    
};
var listDataFn = function(data){
	var htmlHTML="";
	var edit_flag = "";
	
	
	
	if(data.length==0) {
		htmlHTML +="<tr>";
		htmlHTML +="<td colspan=\"11\">";
		htmlHTML +="<div style='margin-top: 40px;margin-bottom: 40px;font-weight: bold;color: #e04747;' align='center'>No Data to Display.</div>";
		htmlHTML +="</td>";
		htmlHTML +="</tr";
		$("#list_empjudege").html(htmlHTML);
		$(".head_adjust").hide();
		
		$("#score_name2 , #score_name3 ").hide();
		$("#score_name1 ").text("");
		$("#score_name1 ").show();
		$(".setColSpanResultAssess").attr('colspan',1);
		$("#result_assess_from_no_data").show();
		$(".head_judge_score").remove();
		return;
	} else {
		//if(genJudgeHradComplete == 0){
			// set current judge org level name
			$("#adjust_result_score_name").text(data[0].cur_judge_org_level);
			$("#result_assess_from_no_data").hide();
			$(".head_judge_score").remove();
			// Generate head score under Result Assess From
			var judHtml = "";
			$.each(data[0].judgements,function (index, jud) {
				judHtml += "<th style='width:auto;' class='head_judge_score' id='judge_score_"+jud.org_level_id+"'>"+jud.org_level_name+"</th>";
			});
			$("#tableBonusAdjustment-head2").append(judHtml);
			$(".setColSpanResultAssess").attr('colspan', data[0].judgements.length);
			//genJudgeHradComplete = 1;
		//}
	}
	

	$.each(data,function (index, indexEntry) {
		
		if(indexEntry['edit_flag']==0) {
			edit_flag = "disabled";
			$("#adjust_percent, #btnAdjust").prop('disabled', true);
		} else {
			edit_flag = "";
			$("#adjust_percent, #btnAdjust").prop('disabled', false);
		}
		
		/* Generate table body */
		htmlHTML += "<tr class='control-calculate'>";
		htmlHTML += "	<td style='text-align:center;'>";
		htmlHTML += "		<input style='margin-bottom:5px;' type='checkbox' class='select-check' id='"+indexEntry.emp_result_id+"' edit_flag='"+indexEntry.edit_flag+"' style='margin-top:-3px;'>";
		htmlHTML += "	</td>";
		htmlHTML += "	<td>"+indexEntry.emp_code+"</td>";
		htmlHTML += "	<td style='white-space:nowrap'>"+indexEntry.emp_name+"</td>";
		htmlHTML += "	<td>"+indexEntry.appraisal_level_name+"</td>";
		htmlHTML += "	<td style='width:180px;' class='testOverFlow'>"+indexEntry.org_name+"</td>";
		htmlHTML += "	<td style='width:180px;' class='testOverFlow'>"+indexEntry.position_name+"</td>";
		htmlHTML += "	<td style='white-space:nowrap'>"+indexEntry.status+"</td>";
		htmlHTML += "	<td style='white-space:nowrap;text-align:right;'>"+(indexEntry.z_score.toFixed(2))+"</td>";
		htmlHTML += "	<td class='data-percent'>";
		htmlHTML += "		<div class='float-label-control'>";
		htmlHTML += "			<input "+edit_flag+" type='text' style='text-align:right; min-width:40px;' class='form-control input-xs span12 percent numberOnly' total_adjust_result_score='"+indexEntry.last_judge_score+"' value='"+indexEntry.percent_adjust+"'/>";
		htmlHTML += "		</div>";
		htmlHTML += "	</td>";
		htmlHTML += "	<td class='data-score'>";
		htmlHTML += "		<div class='float-label-control'>";
		htmlHTML += "			<input "+edit_flag+" type='text' style='text-align:right; min-width: 40px;' class='form-control input-xs span12 score numberOnly' total_adjust_result_score='"+indexEntry.last_judge_score+"' value='"+indexEntry.last_judge_score+"'/>";
		htmlHTML += "		</div>";
		htmlHTML += "	</td>";
		
		// Result Assess From
		$.each(indexEntry.judgements,function (index, jud) {
			htmlHTML += "<td style='text-align:right;'>"+((jud.adjust_result_score == 0) ? "": jud.adjust_result_score)+"</td>";
		});
		
		htmlHTML += "</tr>";		
	});	
	$("#list_empjudege").html(htmlHTML);

	
	$("#adjust_percent").autoNumeric('set', 100);
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
	$("#statusSelectAll").prop('checked', false);
	$('#statusSelectAll').click(function () {
        if ($('#statusSelectAll').prop('checked')) {
//        	$.each($(".control-calculate").get(),function(index,indexEntry) {
//        		if($(indexEntry).find('.select-check').attr('edit_flag')==1) {
//        			$(indexEntry).find('.select-check').prop('checked', true);
//        		}
//        	});
        	$(".select-check").prop('checked', true);
        } else {
            $(".select-check").prop('checked', false);
        }
    });
	
	if(edit_flag=='disabled') {
		$("#adjust_percent,#btnAdjust").attr('disabled');
	} else {
		$("#adjust_percent,#btnAdjust").removeAttr('disabled');
	}
	
	if($("#actionToAssign").val()==null || $("#actionToAssign").val()==undefined) {
		$("#btnSubmit,#btn_search_calculate").attr("disabled");
    } else {
    	$("#btnSubmit,#btn_search_calculate").removeAttr("disabled");
    }
	
	calculatePercentKeyup();
};

var calculatePercentKeyup = function() {
	/*$("#adjust_percent").keyup(function() {
		if (Number(this.value) > 100) {
	      this.value = 100;
	    }
	});*/
	
	$("#list_empjudege").find('.percent').keyup(function() {
		/*if (Number(this.value) > 100) {
			this.value = 100;
		}*/
		var percent = $(this).autoNumeric('get');
		var adjust_result_score = Number($(this).attr("total_adjust_result_score"));
		var total = (percent/100)*adjust_result_score;
		
		//console.log(total,'percent');
		//$(this).closest('.control-calculate').find('.data-score').find('.score').val(total.toFixed(2));
		$(this).closest('.control-calculate').find('.data-score').find('.score').autoNumeric('set', total);
		//console.log((percent/100)*adjust_result_score);
		
	});
		
	$("#list_empjudege").find('.score').keyup(function() {
		var score = $(this).autoNumeric('get');
		var adjust_result_score = Number($(this).attr("total_adjust_result_score"));
		var total = (adjust_result_score == 0 ? 0 : (score*100)/adjust_result_score);
		
		//console.log(total,'score');
		//$(this).closest('.control-calculate').find('.data-percent').find('.percent').val(total.toFixed(2));
		$(this).closest('.control-calculate').find('.data-percent').find('.percent').autoNumeric('set', total);
		//console.log((score*100)/adjust_result_score);
		
	});

	$("#btnAdjust").click(function() {
		//var adjust_percent = Number($("#adjust_percent").val());
		var adjust_percent = $("#adjust_percent").autoNumeric('get');
		$.each($(".control-calculate").get(),function(index,indexEntry) {
//    		if($(indexEntry).find('.select-check').attr('edit_flag')==1) {
    			$(indexEntry).find(".data-percent").find(".percent").autoNumeric('set', adjust_percent);
    			var percent = Number(adjust_percent);
    			var adjust_result_score = Number($(indexEntry).find(".data-percent").find(".percent").attr("total_adjust_result_score"));
    			var total = (percent/100)*adjust_result_score;
    			//$(indexEntry).find('.data-score').find('.score').val(total.toFixed(2));
    			$(indexEntry).find('.data-score').find('.score').autoNumeric('set', total);
    			
//    		}
    	});
	});
	
//	$("#btnAdjust").click(function() {
//		var adjust_percent = Number($("#adjust_percent").val());
//		var element_percent = $("#tableBonusAdjustment").find("#list_empjudege").find(".data-percent").find(".percent");
//		element_percent.val(adjust_percent);
//		
//		$.each(element_percent.get(),function(index,indexEntry) {
//			var percent = Number($(indexEntry).val());
//			var adjust_result_score = Number($(indexEntry).attr("total_adjust_result_score"));
//			var total = (percent/100)*adjust_result_score;
//			
//			console.log(total,'btnAdjust');
//			$(this).closest('.control-calculate').find('.data-score').find('.score').val(total.toFixed(2));
//			console.log((percent/100)*adjust_result_score);
//		});
//	});
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
			
			$(".sort-z-score").off('click');
			$(".sort-z-score").on('click',function(){
					
				$("body").mLoading();
				console.log(globalData.data.sort(compareValues('z_score', 'desc')));
				var el = $(this);
				var sortData; 
				setTimeout(function(){ 
					if(el.find('i').hasClass('fa-sort')){
						sortData = globalData.data.sort(compareValues('z_score', 'desc'));
						listDataFn(sortData);
						el.find('i').removeClass('fa-sort');
						el.find('i').addClass('fa-sort-up icon-sort-color');
					}else if(el.find('i').hasClass('fa-sort-up')){
						$("body").mLoading();
						sortData = globalData.data.sort(compareValues('z_score', 'asc'));
						listDataFn(sortData);
						
						el.find('i').removeClass('fa-sort-up');
						el.find('i').addClass('fa-sort-down');
					}else if(el.find('i').hasClass('fa-sort-down')){
						
						sortData = globalData.data.sort(compareValues('z_score', 'desc'));
						listDataFn(sortData);
						
						el.find('i').removeClass('fa-sort-down');
						el.find('i').addClass('fa-sort-up');
					} 
					$("body").mLoading('hide');
				}, 200);
			
			
			});
			$(window).scroll(function() {
				var myElements = $("#scroll-tableBonusAdjustment")[0].querySelectorAll("thead");
				if($(this).scrollTop() >= $("#scroll-tableBonusAdjustment").offset().top){
					$(".lfr-hudcrumbs").hide();
					$(".nav-collapse").hide();
					var translate = "translate(0," + ($(this).scrollTop()-$("#scroll-tableBonusAdjustment").offset().top) + "px)";
					for (var i = 0; i < myElements.length; i++) {
				       myElements[i].style.transform=translate;
				     }
				 }else{
					 $(".nav-collapse").show();
					 $("#scroll-tableBonusAdjustment thead").css("transform","translate(0,0px)");
				 }

			});
			
			
			$("#adjust_percent").val(100);
			$("#adjust_percent").autoNumeric('init');
			$("#adjust_percent").autoNumeric('update', {
				vMin : '0',
				vMax : '99999999',
				lZero: 'deny',
				wEmpty: 'zero',
				//aSign : ' %',
				//pSign : 's'
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
		        $("#btn_search_calculate").prop("disabled",false)
		        
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

/*
$("#scroll-tableBonusAdjustment thead").css("transform","translate(0,0px)");
$(window).bind("scroll", function() {
    var myElements = $("#scroll-tableBonusAdjustment")[0].querySelectorAll("thead");
 if($(this).scrollTop() >= $("#scroll-tableBonusAdjustment").offset().top){
  $(".lfr-hudcrumbs").hide();
  $(".nav-collapse").hide();
  var translate = "translate(0," + ($(this).scrollTop()-$("#scroll-tableBonusAdjustment").offset().top) + "px)";
     for (var i = 0; i < myElements.length; i++) {
       myElements[i].style.transform=translate;
     }
 }else{
  $(".nav-collapse").show();
  $("#scroll-tableBonusAdjustment thead").css("transform","translate(0,0px)");
 }

});


$("#scroll-tableBonusAdjustment").bind("scroll", function() {
    var translate = "translate(0," + this.scrollTop + "px)";
    var myElements = this.querySelectorAll("thead");

    for (var i = 0; i < myElements.length; i++) {
     myElements[i].style.transform=translate;
    }
});
*/
