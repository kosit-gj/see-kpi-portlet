var dataTemp = [];
var dataTempModal = [];
var checkedItemArr = [];

var gPeriodInfo;
var gDropdownYear = $("#AppraisalYear");
var gDropdownPeriod = $("#AppraisalPeriod");

var getPeriodInfoFn = function(){
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/salary_raise/parameter/period",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			gPeriodInfo = data;
		}
	});
}


var dropDrowYearListFn = function () {   
	var gUniqueYear = $.unique(gPeriodInfo.map(function(d){return d.appraisal_year;}));
	
	var optionStr="";
	$.each(gUniqueYear,function(index,indexEntry){
		optionStr+="<option value="+indexEntry+">"+indexEntry+"</option>";
	});
	gDropdownYear.html(optionStr);
}


var dropDrowPeriodListFn = function (selectedyear) {
	var periodArr = jQuery.grep(gPeriodInfo, function (period, i) {
        return period.appraisal_year == selectedyear;
    });
	
    var periodOption = "";
    $.each(periodArr, function(index,indexEntry){
    	periodOption+="<option value="+indexEntry.period_id+">"+indexEntry.appraisal_period_desc+"</option>";
	});
    gDropdownPeriod.html(periodOption);
}


var dropDrowJudgementListFn = function () { 
	var htmlOption = "";
	
    $.ajax({
        url: restfulURL + "/" + serviceName + "/public/judgement/list_status",
        type: "get",
        dataType: "json",
        async: false,
        headers: { Authorization: "Bearer " + tokenID.token },
        success: function (data) {
        		htmlOption = "<option selected='selected' value=''>All Judgement</option>";
            $.each(data, function (index, indexEntry) {
            	htmlOption += "<option value=" + indexEntry['judgement_status_id'] + ">" + indexEntry['judgement_status'] + "</option>";     
            });
            $("#Judgement").html(htmlOption); 
        },
        error: function(jqXHR, textStatus, errorThrown){
        	console.log(textStatus+" / "+jqXHR+ " / " + errorThrown);
			$("body").mLoading('hide'); //Loading
		}
    });
}


$(document).ready(function () {
    var username = $('#user_portlet').val();
    var password = $('#pass_portlet').val();
    var plid = $('#plid_portlet').val();

    if (username != "" && username != null & username != [] && username != undefined) {
        if (connectionServiceFn(username, password, plid) == false) {
            return false;
        }
    }

    $(".app_url_hidden").show();

    
    $("#AppraisalYear").change(function () {   // FUNCTION CLICK 
	   dropDrowPeriodListFn($("#AppraisalYear").val());
    });
  
    $("#btn_submit").click(function () {   // FUNCTION CLICK 
    	
    	if(!checkedItemArr.length) {
    		callFlashSlide("Please choose Item for Judgement.");
    		return false;
    	}
    	insertJudgementFn();
    	
    });
    
    $("#btn_search_advance").click(function () {   // FUNCTION CLICK SEARCH
    	$(".countPagination").val(10);
        $("#rpp").remove();
        
	    getDataFn();   // get data 
	    $(".search_result").show(); // show detail
    });
    
    $("#btn_judgement").click(function () {     // FUNCTION CLICK JUDGEMENT
    	if(!checkboxArr.length) {
    		callFlashSlide("Please choose Employees for Judgement.");
    		return false;
    	}
    	getJudgementFn();
    });
    
    $("#btn_raise_salary").click(function () {    // FUNCTION CLICK RAISE SALARY
    	if(!checkboxArr.length) {
    		callFlashSlide("Please choose Employees for Raise Salary.");
    		return false;
    	}
    	insertRaiseSalaryFn();
//    	alert("insertRaiseSalaryFn Function")
    });


    // FUNCTION TOOLTIP
    $('[data-toggle="tooltip"]').css({ "cursor": "pointer" });
    $('[data-toggle="tooltip"]').tooltip({
        html: true
    });

    // RUN FUNCTION BEGIN
    getPeriodInfoFn();
    dropDrowYearListFn();  			// list year and period.
    dropDrowPeriodListFn(gDropdownYear.val());
    dropDrowJudgementListFn();	    // list judgement.
    
    gDropdownYear.change(function () {
	    dropDrowPeriodFn(this.value);
	});
    
    
});




var getDataFn = function (page, rpp) { 
	
dataTemp = [];  // set zero
checkboxArr = []; // set zero

$("#param_AppraisalYear").val($("#AppraisalYear").val());
$("#param_AppraisalPeriod").val($("#AppraisalPeriod").val());
$("#param_Judgement").val($("#Judgement").val());

var year   = $("#param_AppraisalYear").val();
var period = $("#param_AppraisalPeriod").val();
var status = $("#param_Judgement").val();

    $.ajax({
        url: restfulURL + "/" + serviceName + "/public/judgement",
        type: "get",
        dataType: "json",
        async: false,
        data: { 
        	"page": page ,
        	"rpp": rpp ,
        	"year": year ,
        	"period": period ,
        	"status": status ,
        	},
       
        headers: { Authorization: "Bearer " + tokenID.token },
        success: function (data) {
        	dataTemp = data;
            paginationSetUpFn(data['current_page'], data['last_page'], data['last_page']);
            genTableListDataFn(data);
            setThemeColorFn(tokenID.theme_color);
        },
        error: function(jqXHR, textStatus, errorThrown){
        	console.log(textStatus+" / "+jqXHR+ " / " + errorThrown);
			$("body").mLoading('hide'); //Loading
		}
    });
}

var insertJudgementFn = function () { 

    $.ajax({
        url: restfulURL + "/" + serviceName + "/public/judgement",
        type: "post",
        dataType: "json",
        async: false,
        data: {
        	"emp_result_id": checkboxArr,
        	"items": checkedItemArr
        },
        headers: { Authorization: "Bearer " + tokenID.token },
        success: function (data) {
        	if(data['status']==200 && data['errors'].length == 0){
        		callFlashSlide("Judgement Successful.");
            	$("#ModalAppraisal").modal('hide');
            	getDataFn();   // get data
        	}
        	 
        },
        error: function(jqXHR, textStatus, errorThrown){
			console.log(textStatus+" / "+jqXHR+ " / " + errorThrown);
			$("body").mLoading('hide'); //Loading
		}
    });
}

var insertRaiseSalaryFn = function () { 
	var emp_id = [];
		$.each(checkboxArr, function(index, indexEntry) { // push data total and judgement_status_id != 3
			emp_id.push( indexEntry['id']);
		});
		
    $.ajax({
        url: restfulURL + "/" + serviceName + "/public/salary_raise/judgement",
        type: "post",
        dataType: "json",
        data: {
        	"period_id": $("#param_AppraisalPeriod").val(),
        	"emp_result_id": emp_id
        	},
        async: false,
        headers: { Authorization: "Bearer " + tokenID.token },
        success: function (data) {
         	if(data['status']==200){
        		callFlashSlide("Raise Salary Successful.");
            	$("#ModalAppraisal").modal('hide');
            	getDataFn();   // get data
        	}
        },
    	error: function(jqXHR, textStatus, errorThrown){
    		console.log(textStatus+" / "+jqXHR+ " / " + errorThrown);
			$("body").mLoading('hide'); //Loading
		}
    });
}

var getJudgementFn = function () { 
	    $.ajax({
	        url: restfulURL + "/" + serviceName + "/public/judgement/assign_judgement",
	        type: "get",
	        dataType: "json",
	        data: {
	        	"emp_result_id" : JSON.stringify(checkboxArr),
	        	"appraisal_period" : gDropdownPeriod.val()
	        },
	        async: false,
	        headers: { Authorization: "Bearer " + tokenID.token },
	        success: function (data) {
	        	genTemplateModalFn(data);
	        },
	    	error: function(jqXHR, textStatus, errorThrown){
	    		console.log(textStatus+" / "+jqXHR+ " / " + errorThrown);
				$("body").mLoading('hide'); //Loading
			}
	    });
	}

var genTableListDataFn = function(data){
	var HTML = "";
	var is_disabled = "";
	var classCheckbox = "";
	
	if(data['data'][0] == undefined) {
		$("#listAppraisal").html("");
		return false;
	}
	else{
		
	 HTML += "<div class=\"row-fluid\">";
     HTML += "<div class=\"span12\">";
	     HTML += "<div class=\"ibox-title2\">";
	     	HTML += "<div class=\"titlePanel2\">" + data['data'][0]['appraisal_period_desc'] + " </div> ";
	     HTML += "</div>";
     HTML += "<div class=\"ibox-content\">";
	     HTML += "<div class=\"table-responsive\" style='overflow:auto;'>";
		     HTML += "<table id=\"table-judgement\" class=\"table table-striped\" style=\"max-width: none\">";
			     HTML += "<thead>";
			     	HTML += "<tr>";
				     	HTML += " <th style=\"width:auto;\"><input type='checkbox' value='' id='check-box-all' class='checkbox' onchange='checkboxEvenFn(\"check-box-all\")'></th>";
				     	HTML += " <th style=\"width:auto;\"><b>" + $(".lt-emp-code").val() + "</b></th>";
				     	HTML += " <th style=\"width:auto;\"><b>" + $(".lt-emp-name").val() + "</b></th>";
				     	HTML += " <th style=\"width:auto;\"><b>" + $(".lt-level").val() + "</b> </th>";
				     	HTML += " <th style=\"width:auto;\"><b>" + $(".lt-organization").val() + "</b></th>";
				     	HTML += " <th style=\"width:auto;\"><b>" + $(".lt-position").val() + "</b> </th>";
				     	HTML += " <th style=\"width:auto;\"><b>" + $(".lt-status").val() + "</b></th>";
				     HTML += "</tr>";
				 HTML += "</thead>";
				 HTML += "<tbody id='tbody-judgement'>";
				 HTML += "</tbody>";
			HTML += "</table>";
		HTML += "</div>";
	HTML += "</div>";
	HTML += "</div>";
	HTML += "</div>";
	$("#listAppraisal").html(HTML);
	}
	
	HTML = "";	
	if(data['data'][0]!=undefined){  // get row table
		 $.each(data['data'], function (index, itemEntry) { 
			 if(itemEntry['judgement_status_id']==3){  // if judgement_status_id is 3 --> disable 
				is_disabled = "disabled"; 
				classCheckbox = ""; }
			 else {
				 is_disabled = "";
				 classCheckbox = "checkbox"; }
				 				 
				HTML += "<tr>";
					HTML += "<td><input "+is_disabled+" id='" + itemEntry['emp_result_id'] + "' class='"+classCheckbox+"'  onchange='checkboxEvenFn(\"" + itemEntry['emp_result_id'] + "\")'  type='checkbox' value=''></td>";
					HTML += "<td>" + itemEntry['emp_code'] + "</td>";
					HTML += "<td>" + itemEntry['emp_name'] + "</td>";
					HTML += "<td>" + itemEntry['appraisal_level_name'] + "</td>";
					HTML += "<td>" + itemEntry['org_name'] + "</td>";
					HTML += "<td>" + itemEntry['position_name'] + "</td>";
					HTML += "<td>" + itemEntry['judgement_status'] + "</td>";
				HTML += "</tr>";
			 });
		 $("#tbody-judgement").html(HTML);
   }
}

var genTemplateModalFn = function(data){
	checkedItemArr = [];
	dataTempModal = data;
	HTML = "";
	var TOTAL_WEIGH = "";
	
		// get text to modal
	if(data['head'][0]!=undefined){
		$("#txtEmpCode").text(data['head'][0]['emp_code']);
		$("#txtEmpName").text(data['head'][0]['emp_name']);
		$("#txtPosition").text(data['head'][0]['position_name']);
		$("#txtOrgName").text(data['head'][0]['org_name']);
		$("#txtChiefEmpCode").text(data['head'][0]['chief_emp_code']);
		$("#txtChiefEmpName").text(data['head'][0]['chief_emp_name']);
		$("#txtPeriod").text(data['head'][0]['appraisal_period_desc']);
		
		TOTAL_WEIGH = data['head'][0]['grand_total'].split("(");
		TOTAL_WEIGH = TOTAL_WEIGH[0]+"<br>("+TOTAL_WEIGH[1]; 
		$("#txtGrandTotalWeigh").html(TOTAL_WEIGH);
		$("#modal-header").show();
	}
	else{
		$("#modal-header").hide();
	}
	
		HTML += "<table id=\"tablethreshould\" class=\"table table-striped\" style=\"max-width: none\">";
			HTML += "<thead>";
	     	HTML += "<tr>";
		     	HTML += " <th style=\"width:10%;\"><input type='checkbox' value='' id='check-box-all-modal' class='checkbox-modal' onchange='checkedItemEvenFn(\"check-box-all-modal\")'></th>";
		     	HTML += " <th style=\"width:auto;\"><b>" + $(".lt-item_name").val() + "</b></th>";
		     HTML += "</tr>";
		     HTML += "</thead>";
		 HTML += "<tbody>";
		 
		 // Generate Item List //
		 $.each(data['detail'], function (index, itemEntry) {
			 
			 // Add Item into checkedItemArr //
			 checkedItemArr.push({
				 "judgement_item_id" : itemEntry['judgement_item_id'],
				 "is_pass" : itemEntry['is_pass']
			 });
			 
			 HTML += "<tr>";
			 HTML += "<td><input "+checkedFn(itemEntry['is_pass'])+" id='" + itemEntry['judgement_item_id'] + "' class='checkbox-modal'  onchange='checkedItemEvenFn(" + itemEntry['judgement_item_id'] + ")'  type='checkbox' value=''></td>";
			 HTML += "<td>" + itemEntry['judgement_item_name'] + "</td>";
			 HTML += "</tr>";
		 });
		 
		 HTML += "</tbody>";
		 HTML += "</table>";
		
		$("#modal-table-judgerment").html(HTML);
		
	$("#ModalAppraisal").modal({
	    "backdrop": setModalPopup[0],
	    "keyboard": setModalPopup[1]
	}).css({ "margin-top": "0px" });
	
}

var checkboxArr = [];
var checkboxEvenFn = function(emp_result_id){
	
	if(emp_result_id == 'check-box-all'){ // check all
		checkboxArr = [];
		if ($("#"+emp_result_id).prop("checked")) { // if CheckBox all status is checked.
			$(".checkbox").prop("checked", true);
			$.each(dataTemp['data'], function(index, indexEntry) { // push data total and judgement_status_id != 3
				if(indexEntry['judgement_status_id']!=3) 
					checkboxArr.push({
						"id" : indexEntry['emp_result_id']
					});
			});
		} else { // if CheckBox all status is no checked.
			$(".checkbox").prop("checked", false);
		}
	}
	else if ($("#"+emp_result_id).prop("checked")) { // check one
		checkboxArr.push({
			"id" : emp_result_id
		});
	} 
	else{ // no check one
		$("#check-box-all").prop("checked", false);
		checkboxArr = $.grep(checkboxArr, function(data, index) {
			return data.id != emp_result_id;
		});
	}
}


var checkedItemEvenFn = function(judgement_item_id){
	
	var itemObjIndex = checkedItemArr.findIndex((obj => obj.judgement_item_id == judgement_item_id));
	
	if(judgement_item_id == 'check-box-all-modal'){ // check all
		if ($("#"+judgement_item_id).prop("checked")) {
			$(".checkbox-modal").prop("checked", true);
			// set all values in array of object //
			checkedItemArr.map(obj=>obj.is_pass = 1);
		} else {
			$(".checkbox-modal").prop("checked", false);
			// set all values in array of object //
			checkedItemArr.map(obj=>obj.is_pass = 0);
		}
	}
	else if ($("#"+judgement_item_id).prop("checked")) { // check one
		// set isPass = 1 on this item //
		checkedItemArr[itemObjIndex].is_pass = 1;
	} 
	else{ // unchecked
		$("#check-box-all-modal").prop("checked", false);
		// set isPass = 0 on this item//
		checkedItemArr[itemObjIndex].is_pass = 0;
	}
}


var checkedFn = function(status){
	if(status == 1) return "checked";
	else  return "";
}
