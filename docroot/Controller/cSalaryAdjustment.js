var globalData="";
var galbalDataTemp=[]; 
var username = "";
var password = "";
var pqGridTable;
const pageNumberDefault=1;
let countDatatableGenerate = 0;
var GlobalChangingSortingData;

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
	console.log("searchAdvanceFn " + new Date(Date.now()));
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
    getDataFn();
};

//Get Data
var getDataFn = function () {
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
    
    $.ajax({
        url: restfulURL + "/" + serviceName + "/public/salary/show",
        type: "get",
        dataType: "json",
        async: true,
        headers: { Authorization: "Bearer " + tokenID.token },
        data: {
            "emp_level": level_id_emp,
            "org_level": level_id_org,
            "period_id": period_id,
            "position_id": position_id,        
            "org_id": org_id,
            "emp_id": emp_id,
            "stage_id": status,
            "appraisal_form_id": form_id
        },
        success: function (respData) {
        	globalData=respData;
        	listDataFn(respData);
        	
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
            	//htmlOption += "<option value='999'>Save</option>"; //999 is not update stage
                $.each(data, function (index, indexEntry) {
                	htmlOption += "<option value='" + indexEntry['stage_id'] + "'>" + indexEntry['to_action'] + "</option>";
                });
        	}
            $("#actionToAssign").html(htmlOption);
        }
    });
}

var listDataFn = function(data) {

	var edit_flag="";
	var permissionSA=[{status:false,icon:""},{status:true,icon:"*"}];//<span class='ui-icon ui-icon-pencil'></span>
	//var data = globalData;
	//countStruc   คือ จำนวน structure header column
	var countStruc = 0;
	countStruc = data['items'][0]['structure_result'].length;
	
	$("#average-score").text(data['avg'].toFixed(2));
	$("#sd-score").text(data['sd'].toFixed(2));
	$("#filter-average-score").text(data['avg_filter'].toFixed(2));
	$("#filter-sd-score").text(data['sd_filter'].toFixed(2));
	
	try {
			$( "#sa" ).pqGrid( "destroy" );
	}catch(err) {
		  //document.getElementById("demo").innerHTML = err.message;
	}
	var json_data = data['items'] ;
	
    var obj = { 
        /*width: 'flex',*/ height: 'flex', maxHeight: 600,
        flex: { on: true, one: true, all: true }, icon: undefined,
        title: 'Salary Adjustment', showTitle: true,
        freezeCols: (17+countStruc),
        numberCell: { show: false },  
        dataModel: { data: json_data },
        groupModel: {
            on: true, header: false, headerMenu: false, merge: false,
            grandSummary: true
        },
		summaryTitle: { sum: "{0}" ,count:"{0} คน"},
		rowInit: function(ui) {
			
			/* ########### ในส่วน grandsummary ###########*/
			if (ui.rowData.hasOwnProperty('pq_grandsummary') === true) {
				// Column "รายได้ Var ที่ควรได้ 25%" ใส่ word Total
				ui.rowData.var_percent = 'Total';
				// Column "% Diff" หาเปอร์เซ็นต์ผลต่างของ   "ปรับรายได้ Total" / "รายได้ปัจจุบัน Total"
				ui.rowData.percent_diff = isNaN(Number(ui.rowData.total_up_salary)/Number(ui.rowData.total_now_salary)) ? 0 : (Number(ui.rowData.total_up_salary)/Number(ui.rowData.total_now_salary));
				//return { style: 'color:blue;font-weight:bold;font-size:larger;'};
			}
   
        },
        editorEnd: function( event, ui ) {
			if(ui.dataIndx == "input_percent"){
				//คำนวน % ของรายได้ปัจจุบัน Total ว่าเป็นกี่ Bath
				$( event.target ).pqGrid( "updateRow", { rowIndx: ui.rowIndx , newRow: { 'input_score': parseFloat((ui.rowData.input_percent/100)*ui.rowData.total_now_salary).toFixed(2) }} );

			}else if(ui.dataIndx == "input_score"){
				//คำนวน Bath ของรายได้ปัจจุบัน Total ว่าเป็นกี่ %
				$( event.target ).pqGrid( "updateRow", { rowIndx: ui.rowIndx , newRow: { 'input_percent': parseFloat(ui.rowData.input_score*100/ui.rowData.total_now_salary).toFixed(2) }} );
			}
		},
    };
    

    /* ########### Start: Create Columns Header ########### */
    obj.colModel = [
    	{ dataIndx: "state", maxWidth: 30, minWidth: 30, align: "center", resizable: false,
            title: "",
            menuIcon: false,
            type: 'checkBoxSelection', cls: 'ui-state-default', sortable: false, editor: false,
            dataType: 'bool',
            cb: {
                all: false, //checkbox selection in the header affect current page only.
                header: true //show checkbox in header. 
            }
        },
    	{ title: "ID", dataIndx: "emp_result_id" , hidden: true },
    	{ title: $(".lt-emp-code").val(), dataIndx: "emp_code" , width: 50,maxWidth: 60,halign:"left", editable: false , hidden: true},
	 	{ title: $(".lt-emp-name").val(), dataIndx: "emp_name" , width: 50,maxWidth: 50,editable: false,summary: { type: 'count' }},
		{ title: "Org Name", dataIndx: "org_name" ,maxWidth: 50, editable: false},
		{ title: "Z-Score", dataIndx: "z_score",dataType: "float",format: '#,###.00' , editable: false} ,
		{ title: "Z-Score Corp.", dataIndx: "z_score_filter",dataType: "float",format: '#,###.00' , editable: false} ,
		{ title: (data==undefined || data['is_board']==1 ? "*คะแนนประเมิน Board." : "*คะแนนประเมิน COO."), dataIndx: "score_last",dataType: "float",format: '#,###.00' , editable: true} ,
		{ title: "เกรด", dataIndx: "grade", editable: false} ,
		{ title: "Cal Standard", dataIndx: "cal_standard",dataType: "float",format: '#,###.00' , editable: false , summary: { type: 'sum' }} ,
		{ title: "ขาด/เกิน", dataIndx: "miss_over",dataType: "float",format: '#,###' , editable: false , summary: { type: 'sum' }} ,
		{ title: "รายได้ที่เปลี่ยนแปลง",align: "center", colModel: [
				{ title: "ปรับรายได้ Total", dataIndx: "total_up_salary",dataType: "float",format: '#,###.00' , editable: false, summary: { type: 'sum' }} ,
				{ title: permissionSA[data.edit_flag].icon+"ปรับเงินเดือน", dataIndx: "adjust_raise_s_amount",dataType: "float",format: '#,###.00' , editable: permissionSA[data.edit_flag].status , summary: { type: 'sum' }} ,
				{ title: permissionSA[data.edit_flag].icon+"ปรับ P-QPI", dataIndx: "adjust_raise_pqpi_amount",dataType: "float",format: '#,###.00' , editable: permissionSA[data.edit_flag].status , summary: { type: 'sum' }} ,
				{ title: "% Diff", dataIndx: "percent_diff",dataType: "float",format: '#,###.00%' , editable: false} ,
		]},
		{ title: "Calculator",align: "center", colModel: [
				{ title: permissionSA[data.edit_flag].icon+"%", dataIndx: "input_percent",dataType: "float",format: '#,###.00%' , editable: permissionSA[data.edit_flag].status , summary: { type: 'sum' }} ,
				{ title: permissionSA[data.edit_flag].icon+"Bath", dataIndx: "input_score", dataType: "float",format: '#,###.00' , editable: permissionSA[data.edit_flag].status , summary: { type: 'sum' }} ,
		]},
		{ title: "รายได้จากการคำนวนตีค่างาน",align: "center", colModel: [
			{ title: "รายได้รวมที่ควรได้ 90% ไม่รวม Bonus", dataIndx: "total_percent",dataType: "float",format: '#,###.00' , editable: false} ,
			{ title: "รายได้ Fix ที่ควรได้ 65%", dataIndx: "fix_percent",dataType: "float",format: '#,###.00' , editable: false} ,
			{ title: "รายได้ Var ที่ควรได้ 25%", dataIndx: "var_percent",dataType: "float",format: '#,###.00' , editable: false} ,		
		]},
		/* ########### END: Frozen columns ########### */
		{ title: "รายได้ปัจจุบัน",align: "center", colModel: [
				{ title: "รายได้ปัจจุบัน Total", dataIndx: "total_now_salary",dataType: "float",format: '#,###.00' , editable: false , summary: { type: 'sum' }} ,
				{ title: "FIX65%",align: "center", colModel:[
						{ title: "Salary", dataIndx: "salary",dataType: "float",format: '#,###.00' , editable: false , summary: { type: 'sum' }} ,
						{ title: "P-QPI", dataIndx: "pqpi_amount",dataType: "float",format: '#,###.00' , editable: false , summary: { type: 'sum' }} ,
						{ title: "อื่นๆ", dataIndx: "fix_other_amount",dataType: "float",format: '#,###.00' , editable: false , summary: { type: 'sum' }} ,
				]},
				{ title: "VAR25%",align: "center", colModel:[
						{ title: "MPI", dataIndx: "mpi_amount",dataType: "float",format: '#,###.00' , editable: false , summary: { type: 'sum' }} ,
						{ title: "PI", dataIndx: "pi_amount",dataType: "float",format: '#,###.00' , editable: false , summary: { type: 'sum' }} ,
						{ title: "อื่นๆ", dataIndx: "var_other_amount",dataType: "float",format: '#,###.00' , editable: false , summary: { type: 'sum' }} ,
				]},
		]},
		{ title: "รายได้ใหม่",align: "center", colModel: [
				{ title: "รายได้ใหม่ Total", dataIndx: "input_total_new_salary",dataType: "float",format: '#,###.00' , editable: false} ,
				{ title: "FIX65%",align: "center", colModel:[
						{ title: "Salary", dataIndx: "new_salary",dataType: "float",format: '#,###.00' , editable: false} ,
						{ title: "P-QPI", dataIndx: "new_pqpi_amount",dataType: "float",format: '#,###.00' , editable: false} ,
						{ title: "อื่นๆ", dataIndx: "fix_other_amount",dataType: "float",format: '#,###.00' , editable: false} ,
				]},
				{ title: "VAR25%",align: "center", colModel:[
						{ title: "MPI", dataIndx: "mpi_amount",dataType: "float",format: '#,###.00' , editable: false} ,
						{ title: "PI", dataIndx: "pi_amount",dataType: "float",format: '#,###.00' , editable: false} ,
						{ title: "อื่นๆ", dataIndx: "var_other_amount",dataType: "float",format: '#,###.00' , editable: false} ,
				]},
		]},
		
		
		];
    
    $.each(data['items'][0]['structure_result'],function (index, indexEntry) {
    	obj.colModel.push({title: indexEntry.structure_name, dataIndx: "structure_result_"+indexEntry.structure_id,dataType: "float",format: '#,###.00' , editable: false}); 
    });
    
    obj.colModel.push(
    		{ title: "คะแนนประเมิน Mgr.", dataIndx: "score_manager",dataType: "float",format: '#,###.00' , editable: false} ,
    		{ title: "คะแนนประเมิน BU.", dataIndx: "score_bu",dataType: "float",format: '#,###.00' , editable: false} ,
    		{ title: "คะแนนประเมิน COO.", dataIndx: "score_coo",dataType: "float",format: '#,###.00' , editable: false} ,
    		{ title: "คะแนนประเมิน Board.", dataIndx: "score_board",dataType: "float",format: '#,###.00' , editable: false, hidden: (data==undefined || data['is_board']==1)} ,
    		{ title: "คะแนนเต็มตีค่างาน (ความรู้)", dataIndx: "knowledge_point",dataType: "float",format: '#,###.00' , editable: false} ,
    		{ title: "คะแนนเต็มตีค่างาน (ศักยภาพ)", dataIndx: "capability_point",dataType: "float",format: '#,###.00' , editable: false} ,
    		{ title: "Total Point", dataIndx: "total_point",dataType: "float",format: '#,###.00' , editable: false} ,
    		{ title: "Baht/Point", dataIndx: "baht_per_point",dataType: "float",format: '#,###.00' , editable: false}
    ); 
    /* ########### End: Create Columns Header ########### */
    
    /* ########### Start: Set Calculate Columns ########### */
    obj.formulas = [ 
		["grade", function(rd) { 
			// rd = ข้อมูลทั้งหมดของ row นั้น
			if(rd.is_job_evaluation == 1) {return '';};
			var ArrayScore = rd.cal_grade;
			var filterScore = ArrayScore.filter(function (el) {
	    		return rd.score_last >= el.begin_score && rd.score_last <= el.end_score;
			});
			var grade = (filterScore.length==0 ? '' : filterScore[0]['grade']);
			return grade; 
		}],
		["cal_standard", function(rd) { 
			if(rd.is_job_evaluation == 1) {return '';};
			var ArrayScore = rd.cal_grade;
			var cal_standard;
			ArrayScore.filter(function (el) {
				if(rd.score_last >= el.begin_score && rd.score_last <= el.end_score) {
					if(el.raise_type==1) {
						cal_standard =  roundThen(Math.round(notNullFn(el.salary_raise_amount)),-2);
					} else {
						cal_standard = roundThen(Math.round(notNullFn((el.salary_raise_percent*rd.salary)/100)),-2);
					}
				}
			});
			return cal_standard;
		}],
		["miss_over", function(rd) {
			if(rd.is_job_evaluation != 1) {return '';};
			var scoreCooOrBoard = rd.score_last;
			var cal = ( (Number(rd.total_point) * Number(scoreCooOrBoard)) / 100 ) * Number(rd.baht_per_point);
			var fix_percent = roundThen(notNullFn(isNaN((cal * 65)/100) ? 0 : (cal * 65)/100 ), -2);
			var cal_miss_over = (Number(rd.salary)+Number(rd.pqpi_amount)+Number(rd.fix_other_amount))-fix_percent;
			var miss_over = roundThen(notNullFn(cal_miss_over), -2);
			var attr = rd.pq_cellattr = rd.pq_cellattr || {};
            if(miss_over > 0){                       
                attr.emp_result_id = attr.miss_over = { style: 'color: #ff0000;font-style:italic;'}                        
            }
			return miss_over;
		}],
		["total_up_salary", function(rd) {
			//คำนวน ปรับรายได้ Total = ปรับเงินเดือน+(ปรับ P-QPI)
			if( ($.inArray(rd.adjust_raise_pqpi_amount, [null,undefined,'']) == -1) ||  ($.inArray(rd.adjust_raise_s_amount, [null,undefined,'']) == -1)   ){
				var adjust_raise_pqpi_amount = ($.inArray(rd.adjust_raise_pqpi_amount, [null,undefined,'']) != -1) ? 0 : Number(rd.adjust_raise_pqpi_amount);
				var adjust_raise_s_amount = ($.inArray(rd.adjust_raise_s_amount, [null,undefined,'']) != -1) ? 0 : Number(rd.adjust_raise_s_amount);
				var total = adjust_raise_pqpi_amount+adjust_raise_s_amount;
				return isNaN(Math.round(total)) ? '' : Math.round(total);
			}else{
				return '';
			}
		}],
		["percent_diff", function(rd) {
			//% Diff = รายได้ปัจจุบัน Total/รายได้ปัจจุบัน Totall
			if($.inArray(rd.total_up_salary, [null,undefined,'']) != -1){
				return '';
			}else{
				return isNaN(Number(rd.total_up_salary)/Number(rd.total_now_salary)) ? '' : (Number(rd.total_up_salary)/Number(rd.total_now_salary));
			}
		}],
		["total_percent", function(rd) {
			if(rd.is_job_evaluation != 1) {return '';};
			var scoreCooOrBoard = rd.score_last;
			var cal = ( (Number(rd.total_point) * Number(scoreCooOrBoard)) / 100 ) * Number(rd.baht_per_point);
			var total_percent = roundThen(notNullFn(isNaN((cal * 90)/100) ? 0 : (cal * 90)/100 ), -2);
			return total_percent;
		}],
		["fix_percent", function(rd) {
			if(rd.is_job_evaluation != 1) {return '';};
			var scoreCooOrBoard = rd.score_last;
			var cal = ( (Number(rd.total_point) * Number(scoreCooOrBoard)) / 100 ) * Number(rd.baht_per_point);
			var fix_percent = roundThen(notNullFn(isNaN((cal * 65)/100) ? 0 : (cal * 65)/100 ), -2);
			return fix_percent;
		}],
		["var_percent", function(rd) {
			if(rd.is_job_evaluation != 1) {return '';};
			var scoreCooOrBoard = rd.score_last;
			var cal = ( (Number(rd.total_point) * Number(scoreCooOrBoard)) / 100 ) * Number(rd.baht_per_point);
			var var_percent = roundThen(notNullFn(isNaN((cal * 25)/100) ? 0 : (cal * 25)/100 ), -2);
			return var_percent;
		}],
		["total_now_salary", function(rd) { 
			// FIX65%
			var salary = Number(rd.salary);
			var pqpi = Number(rd.pqpi_amount);
			var fix_other =  Number(rd.fix_other_amount);
			// FIX25%
			var mipi = Number(rd.mpi_amount);
			var pi = Number(rd.pi_amount);
			var var_other = Number(rd.var_other_amount);
			// รายได้ปัจจุบัน Total
			var total = salary + pqpi + fix_other + mipi + pi + var_other;
			return notNullFn(total);
			
		}],
		["new_salary", function(rd) { 
			//console.log(rd.new_salary);
			if(rd.new_salary==null || rd.new_salary==""){
				return rd.salary;
			}else{
				return parseFloat(Number(rd.adjust_raise_s_amount) + Number(rd.salary)).toFixed(2);
			}
			
		}],
		["new_pqpi_amount", function(rd) { 	
			if(rd.new_pqpi_amount==null || rd.new_pqpi_amount==""){
				return rd.pqpi_amount;
			}else{
				return parseFloat(Number(rd.adjust_raise_pqpi_amount) + Number(rd.pqpi_amount)).toFixed(2);
			}
		}],

		["input_total_new_salary", function(rd) { 
			if((typeof rd.input_total_new_salary === 'undefined')){
				return notNullFn(Number(rd.total_now_salary)+Number(rd.adjust_raise_s_amount)+Number(rd.adjust_raise_pqpi_amount));
			}else{
				var new_salary = Number(rd.new_salary);
				var new_pqpi = Number(rd.new_pqpi_amount);
				var new_fix_other =  Number(rd.fix_other_amount);
				var new_mipi = Number(rd.mpi_amount);
				var new_pi = Number(rd.pi_amount);
				var new_var_other = Number(rd.var_other_amount);
				var total = new_salary + new_pqpi + new_fix_other + new_mipi + new_pi + new_var_other;
				return notNullFn(total);
			}
		}],
		["knowledge_point", function(rd) { 
			return rd.is_job_evaluation == 0 ? null : rd.knowledge_point;
		}],
		["capability_point", function(rd) { 	
			if(rd.is_job_evaluation != 1) {return '';};
			return rd.is_job_evaluation == 0 ? null : rd.capability_point;
		}],
		["total_point", function(rd) { 	
			if(rd.is_job_evaluation != 1) {return '';};
			return rd.is_job_evaluation == 0 ? null : rd.total_point;
		}],
		["baht_per_point", function(rd) { 	
			return rd.is_job_evaluation == 0 ? null : rd.baht_per_point;
		}],
		

		];
    //หาค่า score ใน Strcture_result ออกมาแสดง
    $.each(data['items'][0]['structure_result'],function (index, indexEntry) {
		
   	 obj.formulas.push(
				["structure_result_"+indexEntry.structure_id, function(rd) {
					var ArrayScore = rd.structure_result;
					var filterScore = ArrayScore.filter(function (el) {
						return indexEntry.structure_id === el.structure_id;
					});
					var score = (filterScore.length==0 ? '' : filterScore[0]['score']);
					return score; 	
				}]
		); 
   });
    
    /* ########### End: Set Calculate Columns ########### */
    
    pqGridTable = $("#sa").pqGrid(obj);

    //$( "#sa" ).pqGrid( "refresh" );
	
	
    
    if($("#actionToAssign").val()==null || $("#actionToAssign").val()==undefined) {
		$("#btnSubmit").attr("disabled", true);
    } else {
    	$("#btnSubmit").attr("disabled", false);
    }
    
	$(".head_adjust").show();
	
};

var updateFn = function(cal) {
	var stage_id = $("#actionToAssign").val();
	var detail = [];
	
	try {
		detail = $( "#sa" ).pqGrid("Checkbox", "state").getCheckedNodes();
		if(detail.length==0) {
			callFlashSlide("Please Select Employee");
			return;
		}
	}catch(err) {
		callFlashSlide("Please Select Employee");
	}
	detail = $( "#sa" ).pqGrid("Checkbox", "state").getCheckedNodes();
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
        		getDataFn();
        	} else if(resData.status == 400) {
        		validationFn(resData.data);
        	}
        }
    });
}

var exportExcel = function() {
	$("body").mLoading();
	
	try {
		var detail = $( "#sa" ).pqGrid("Checkbox", "state").getCheckedNodes();
		if(detail.length==0) {
			$("body").mLoading('hide');
			callFlashSlide("Please Select Employee");
			return;
		}else{
			// filter เฉพาะที่เลือกพนักงานเท่านั้น
			$( "#sa" ).pqGrid("filter", {
		        oper: 'replace',
		        rules: [{ dataIndx: "state", condition: "contain", value: true}]
		    });
		}
	}catch(err) {
		callFlashSlide("Please Select Employee");
	}
	
	 var  blob = $( "#sa" ).pqGrid( "exportData", {  format: 'xlsx', nopqdata: true});
	 if(typeof blob === "string"){blob = new Blob([blob]);};
	 saveAs(blob, "Salary Adjustment.xlsx" );
	 
	 
	 // ยกเลิก filter
	 $( "#sa" ).pqGrid("filter", {
	        oper: 'replace',
	        rules: []
	    });
	 
	 $("body").mLoading('hide');
	
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
		    

		    
		    $("#advanceSearchAppraisalGroup").show();
		}
	}
});
