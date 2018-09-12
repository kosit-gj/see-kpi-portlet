var dataTemp = [];
var dataTempModal = [];

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

  
    $("#btn_search_advance").click(function () {   // FUNCTION CLICK SEARCH
    	getDataFn();   // get data 
    	$(".search_result").show(); // show detail
    	
    	alert("Hi btn_search_advance"); 
    });
    
    $("#btn_judgement").click(function () {     // FUNCTION CLICK JUDGEMENT
    	alert("Hi btn_judgement");
    });
    
    $("#btn_raise_salary").click(function () {    // FUNCTION CLICK RAISE SALARY
    	alert("Hi btn_raise_salary");
    });


    // FUNCTION TOOLTIP
    $('[data-toggle="tooltip"]').css({ "cursor": "pointer" });
    $('[data-toggle="tooltip"]').tooltip({
        html: true
    });

    // RUN FUNCTION BEGIN
    dropDrowYearListFn();  			// list year and period.
//  dropDrowJudgementListFn();	// list judgement.
    
    
});

//------------- LIST PARAMETER START ---------------------->

var dropDrowYearListFn = function () {   
    var htmlOption = "";

    $.ajax({
        url: restfulURL + "/" + serviceName + "/public/appraisal/year_list_assignment",
        type: "get",
        dataType: "json",
        async: false,
        headers: { Authorization: "Bearer " + tokenID.token },
        success: function (data) {
            $.each(data, function (index, indexEntry) {
                    htmlOption += "<option value=" + indexEntry['appraisal_year'] + ">" + indexEntry['appraisal_year'] + "</option>";
            });
            $("#AppraisalYear").html(htmlOption);
            dropDrowPeriodListFn($("#AppraisalYear").val());
        }
    });
}

var dropDrowPeriodListFn = function (year) { 
	var htmlOption = "";
	
    $.ajax({
        url: restfulURL + "/" + serviceName + "/public/appraisal/period_list",
        type: "get",
        dataType: "json",
        async: false,
        headers: { Authorization: "Bearer " + tokenID.token },
        data: { "appraisal_year": year },
        success: function (data) {
            $.each(data, function (index, indexEntry) {
                    htmlOption += "<option  value=" + indexEntry['period_id'] + ">" + indexEntry['appraisal_period_desc'] + "</option>";
            });
            $("#AppraisalPeriod").html(htmlOption); 
        }
    });
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
            $.each(data, function (index, indexEntry) {
                    htmlOption += "<option value=" + indexEntry['judgement_status_id'] + ">" + indexEntry['judgement_status'] + "</option>";
            });
            $("#judgement").html(htmlOption); 
        }
    });
}

//------------- LIST PARAMETER END ---------------------->

var getDataFn = function (page, rpp) { 
	
dataTemp = [];
var year   = $("#param_AppraisalYear").val($("#AppraisalYear").val());
var period = $("#param_AppraisalPeriod").val($("#AppraisalPeriod").val());
var status = $("#param_Judgement").val($("#Judgement").val());

    $.ajax({
        url: restfulURL + "/" + serviceName + "/public/judgement",
        type: "get",
        dataType: "json",
        data: { 
        	"year": year ,
        	"period": period ,
        	"status": status ,
        	"page": page ,
        	"rpp": rpp ,
        	},
        async: false,
        headers: { Authorization: "Bearer " + tokenID.token },
        success: function (data) {
        	dataTemp = data;
            paginationSetUpFn(data['current_page'], data['last_page'], data['last_page']);
            genTableListDataFn(data);
        }
    });
}

var getJudgementFn = function (page, rpp) { 
	    $.ajax({
	        url: restfulURL + "/" + serviceName + "/public/judgement/assign_judgement",
	        type: "get",
	        dataType: "json",
	        data: {"emp_result_id":JSON.stringify(checkboxArr)},
	        async: false,
	        headers: { Authorization: "Bearer " + tokenID.token },
	        success: function (data) {
	        	genTemplateModalFn(data);
	        }
	    });
	}

var genTableListDataFn = function(data){
	var HTML = "";
	 HTML += "<div class=\"row-fluid\">";
     HTML += "<div class=\"span12\">";
	     HTML += "<div class=\"ibox-title2\">";
	     	HTML += "<div class=\"titlePanel2\">" + data['appraisal_period_desc'] + " </div> ";
	     HTML += "</div>";
     HTML += "<div class=\"ibox-content\">";
	     HTML += "<div class=\"table-responsive\" style='overflow:auto;'>";
		     HTML += "<table id=\"tablethreshould\" class=\"table table-striped\" style=\"max-width: none\">";
			     HTML += "<thead>";
			     	HTML += "<tr>";
				     	HTML += " <th style=\"width:auto;\"><input type='checkbox' value='' id='check-box-all' class='checkbox' onchange='checkboxEvenFn(\"check-box-all\")'></th>";
				     	HTML += " <th style=\"width:auto;\"><b>" + $(".lt-emp-code").val() + "</b></th>";
				     	HTML += " <th style=\"width:auto;\"><b>" + $(".lt-emp-name").val() + "</b></th>";
				     	HTML += " <th style=\"width:auto;\"><b>" + $(".lt-level").val() + "</b> </th>";
				     	HTML += " <th style=\"width:auto;\"><b>" + $(".lt-organization").val() + "</b></th>";
				     	HTML += " <th style=\"width:auto;\"><b>" + $(".lt-position").val() + "</b> </th>";
				     	HTML += " <th style=\"width:30%;\"><b>" + $(".lt-status").val() + "</b></th>";
				     HTML += "</tr>";
				 HTML += "</thead>";
				 HTML += "<tbody>";
				 $.each(data['data'], function (index, itemEntry) {
						HTML += "<tr>";
							HTML += "<td><input id='" + itemEntry['emp_result_id'] + "' class='checkbox'  onchange='checkboxEvenFn(\"" + itemEntry['emp_result_id'] + "\")'  type='checkbox' value=''></td>";
							HTML += "<td>" + itemEntry['emp_code'] + "</td>";
							HTML += "<td>" + itemEntry['emp_name'] + "</td>";
							HTML += "<td>" + itemEntry['appraisal_level_name'] + "</td>";
							HTML += "<td>" + itemEntry['org_name'] + "</td>";
							HTML += "<td>" + itemEntry['position_name'] + "</td>";
							HTML += "<td>" + itemEntry['judgement_status'] + "</td>";
						HTML += "</tr>";
					 });
				 HTML += "</tbody>";
			HTML += "</table>";
		HTML += "</div>";
	HTML += "</div>";
	HTML += "</div>";
	HTML += "</div>";
	$("#listAppraisal").html(HTML);
}


var genTemplateModalFn = function(data){
	checkboxModalArr = { "emp_result_id": [] ,"items": [] };;
	data = dataModal;
	dataTempModal = data;
	HTML = "";
	
		$("#txtEmpCode").text(data['head']['emp_code']);
		$("#txtEmpName").text(data['head']['emp_name']);
		$("#txtPosition").text(data['head']['org_name']);
		$("#txtOrgName").text(data['head']['position']);
		$("#txtChiefEmpCode").text(data['head']['chief_emp_code']);
		$("#txtChiefEmpName").text(data['head']['chief_emp_name']);
		$("#txtPeriod").text(data['head']['appraisal_period_desc']);
		$("#txtGrandTotalWeigh").text(data['head']['grand_total']);

		HTML += "<table id=\"tablethreshould\" class=\"table table-striped\" style=\"max-width: none\">";
			HTML += "<thead>";
	     	HTML += "<tr>";
		     	HTML += " <th style=\"width:10%;\"><input type='checkbox' value='' id='check-box-all-modal' class='checkbox-modal' onchange='checkboxEvenModalFn(\"check-box-all-modal\")'></th>";
		     	HTML += " <th style=\"width:auto;\"><b>" + $(".lt-item_name").val() + "</b></th>";
		     HTML += "</tr>";
		     HTML += "</thead>";
		 HTML += "<tbody>";
		 $.each(data['detail'], function (index, itemEntry) {
				HTML += "<tr>";
					HTML += "<td><input id='" + itemEntry['judgement_item_id'] + "' class='checkbox-modal'  onchange='checkboxEvenModalFn(\"" + itemEntry['judgement_item_id'] + "\")'  type='checkbox' value=''></td>";
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
		if ($("#"+emp_result_id).prop("checked")) {
			$(".checkbox").prop("checked", true);
			$.each(dataTemp['data'], function(index, indexEntry) {
				checkboxArr.push({
					"id" : indexEntry['emp_result_id']
				});
			});
		} else {
			$(".checkbox").prop("checked", false);
		}
	}
	else if ($("#"+emp_result_id).prop("checked")) { // check one
		checkboxArr.push({
			"id" : emp_result_id
		});
	} 
	else{ // no check one
		checkboxArr = $.grep(checkboxArr, function(data, index) {
			return data.id != emp_result_id;
		});
	}
	console.log('check box-->'+JSON.stringify(checkboxArr));
}

var checkboxModalArr = { "emp_result_id": [] ,"items": [] };

var checkboxEvenModalFn = function(judgement_item_id){
	if(judgement_item_id == 'check-box-all-modal'){ // check all
		checkboxModalArr = { "emp_result_id": [],"items": [] };
		if ($("#"+judgement_item_id).prop("checked")) {
			$(".checkbox-modal").prop("checked", true);
			$.each(dataTempModal['detail'], function(index, indexEntry) {
				checkboxModalArr['items'].push({
					"judgement_item_id" : indexEntry['judgement_item_id'],
					"is_pass" : 1
				});
			});
		} else {
			$(".checkbox-modal").prop("checked", false);
		}
	}
	else if ($("#"+judgement_item_id).prop("checked")) { // check one
		checkboxModalArr['items'].push({
			"judgement_item_id" : judgement_item_id,
			"is_pass" : 1
		});
	} 
	else{ // no check one
		checkboxModalArr['items'] = $.grep(checkboxModalArr['items'], function(data, index) {
			return data.judgement_item_id != judgement_item_id;
		});
	}
	checkboxModalArr['emp_result_id'] = checkboxArr;
	
	console.log('check box-->'+JSON.stringify(checkboxModalArr));
}





var dataTest = {
		  "total": 15765,
		  "per_page": 10,
		  "current_page": 1,
		  "last_page": 1577,
		  "appraisal_period_desc": "Hello",
		  "next_page_url": "/?page=2",
		  "prev_page_url": null,
		  "from": 1,
		  "to": 10,
		  "data": [
		    {
		      "emp_result_id": "1234",
		      "emp_code": "1234",
		      "emp_name": "DARIS",
		      "appraisal_level_name": "SINGHAD",
		      "org_name": "GOINJESS",
		      "position_name": "DEV",
		      "judgement_status": "1"
		    }
		  ]
		};

var dataModal = {
		  "head": {
			    "emp_code": "1234",
			    "emp_name": "DARIS",
			    "org_name": "GJ",
			    "position": "777",
			    "chief_emp_code": "HOME",
			    "chief_emp_name": "NAME",
			    "appraisal_period_desc": "2",
			    "grand_total": "90"
			  },
			  "detail": [
			    {
			        "judgement_item_id": "12342",
			        "judgement_item_name": "DARIS",
			        "is_pass": ""
			    }
			  ]
			};
