var globalSevice=[];
var restfulPathImportJobCode = "/" + serviceName + "/public/import_job_code";
var restfulPathExport = "/" + serviceName + "/public/import_job_code/export";
var restfulPathDelete = "/" + serviceName + "/public/import_job_code/delete/";
var restfulPathEdit = "/" + serviceName + "/public/import_job_code/update/";

globalSevice['restfulPathGlobal']=restfulURL + "/" + serviceName + "/public/bonus";

//Parameter Sevice
globalSevice['restfulPathDropDownYear']= restfulURL + "/" + serviceName + "/public/bonus/advance_search/year_salary";
globalSevice['restfulPathDropDownBonusPeriod']= restfulURL + "/" + serviceName + "/public/bonus/advance_search/period_salary";
globalSevice['restfulPathFormType']= restfulURL + "/" + serviceName + "/public/bonus/advance_search/form_salary";


//Export Sevice
globalSevice['restfulPathExportPQPI']=restfulURL + "/" + serviceName + "/public/import_pqpi/export";
//globalSevice['restfulPathBonusAppraisalCalculate']=globalSevice['restfulPathBonusAppraisal']+"/calculate";

//Monthly Bonus Rate Sevice
globalSevice['restfulPathMonthlyBonusRate']=restfulURL + "/" + serviceName + "/public/system_config";

//Global variable
var galbalDataImportJobCode = [];
var galbalDataTemp = [];
var pageNumberDefault = 1;
var refreshMultiAppraisalForm = function() {
	$("#AppraisalForm").multiselect('refresh').multiselectfilter();
	$("#AppraisalForm_ms").css({'width':'100%'});
	$(".ui-icon-check,.ui-icon-closethick,.ui-icon-circle-close").css({'margin-top':'3px'});
	$('input[name=multiselect_AppraisalForm]').css({'margin-bottom':'6px','margin-right':'3px'});
}

var validationFn = function (data) {
	var validate = "";
	var count = 0;
	$.each(data['data'], function (index, indexEntry) {
		if (index != undefined) {
			if (count == 0) {
				validate += "<font color='red'>* </font>" + indexEntry + "";
			} else {
				validate += "<br><font color='red'>* </font> " + indexEntry + " ";
			}
		}
		count++;
	});
	callFlashSlideInModal(validate, "#information2", "error");
};


var generateDropDownList = function(url,type,request,initValue){
 	var html="";
 	var firstItem=false;
 	if(initValue!=undefined){
 		html+="<option selected value=''>"+initValue+"</option>";
	}else{
	 	//var firstItem=true;
	}

 	$.ajax ({
 		url:url,
 		type:type ,
 		dataType:"json" ,
 		data:request,
 		headers:{Authorization:"Bearer "+tokenID.token},
 		async:false,
 		success:function(data){
 			 			
 			$.each(data,function(index,indexEntry){
 				if(firstItem == true){
 					html+="<option selected value="+indexEntry[Object.keys(indexEntry)[0]]+">"+indexEntry[Object.keys(indexEntry)[1] == undefined  ?  Object.keys(indexEntry)[0]:Object.keys(indexEntry)[1]]+"</option>";
 					firstItem=false;
 				}else{
 					html+="<option value="+indexEntry[Object.keys(indexEntry)[0]]+">"+indexEntry[Object.keys(indexEntry)[1] == undefined  ?  Object.keys(indexEntry)[0]:Object.keys(indexEntry)[1]]+"</option>";
 				}
 					
 			});	

 		}
 	});	
 	return html;
 };


var clearFn = function () {
	$(".btnModalClose").click();
	$("#from_job_code").val("")
	$("#from_job_code").val("");
	$("#from_knowledge_point").val("");
	$("#from_capability_point").val("");
	$("#from_total_point").val("");
	$("#from_baht_per_point").val("");
	$("#label-del").text("Confirm to delete data ?");
}

var toDayFn = function(id) {
	  var date = new Date();
	  var day = date.getDate();
	  var month = date.getMonth() + 1;
	  var year = date.getFullYear();

	  if (month < 10) month = "0" + month;
	  if (day < 10) day = "0" + day;

	  var today = year + "-" + month + "-" + day;
	  //document.getElementById(id).value = today;
	  $(id).val(today);
	  // document.getElementById("datepicker-end").value = today;

};
var getDataFn = function (page, rpp) {
	//	clearFn();
	$.ajax({
		url: restfulURL + restfulPathImportJobCode,
		type: "get",
		dataType: "json",
		data: {
			"page": page, "rpp": rpp,
		},
		headers: { Authorization: "Bearer " + tokenID.token },
		async: false,
		success: function (data) {
			listImportJobCodeFn(data['data']);
			galbalDataImportJobCode = data;
			paginationSetUpFn(galbalDataImportJobCode['current_page'], galbalDataImportJobCode['last_page'], galbalDataImportJobCode['last_page']);
		}
	});
};


var listImportJobCodeFn = function (data) {
	var htmlTable = "";
	$("#listJobCode").empty();
	$.each(data, function (index, indexEntry) {
		htmlTable += "<tr class='rowSearch'>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">" + indexEntry["job_code"] + "</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle; text-align: right;\">" + addCommas(indexEntry["knowledge_point"]) + "</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle; text-align: right;\">" + addCommas(indexEntry["capability_point"]) + "</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle; text-align: right;\">" + addCommas(indexEntry["total_point"]) + "</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle; text-align: right;\">" + addCommas(indexEntry["baht_per_point"]) + "</td>";
		htmlTable += "<td id=\"objectCenter\" style=\"vertical-align: middle;\"><i class=\"fa fa-cog font-gear popover-edit-del\" data-trigger=\"focus\" tabindex=\"" + index + "\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\" " +
			"<button class='btn btn-warning btn-xs btn-gear edit' id=" + indexEntry["job_code"] + " data-target=#ModalEdit data-toggle='modal' data-backdrop='" + setModalPopup[0] + "' data-keyboard='" + setModalPopup[1] + "'>Edit</button>&nbsp;" +
			"<button id=" + indexEntry["job_code"] + " class='btn btn-danger btn-xs btn-gear del'>Delete</button>\"></i></td>";
		htmlTable += "</tr>";
	});
	$("#listJobCode").html(htmlTable);

	//function popover
	$(".popover-edit-del").popover(setPopoverDisplay);

	$("#tableJobCode").off("click", ".popover-edit-del");
	$("#tableJobCode").on("click", ".popover-edit-del", function () {
		$(".edit").on("click", function () {
			clearFn();
			$.ajax({
				url: restfulURL + restfulPathImportJobCode,
				type: "get",
				dataType: "json",
				data: {
					"job_code": this.id,
				},
				headers: { Authorization: "Bearer " + tokenID.token },
				async: false,
				success: function (data) {
					$.each(data['data'], function (index, indexEntry) {
						$("#from_job_code").val(indexEntry['job_code'])
						$("#from_job_code").val(indexEntry['job_code']);
						$("#from_knowledge_point").val(indexEntry['knowledge_point']);
						$("#from_capability_point").val(indexEntry['capability_point']);
						$("#from_total_point").val(indexEntry['total_point']);
						$("#from_baht_per_point").val(indexEntry['baht_per_point']);
					});
				}
			});

			$(document).off("click", "#btnEdit");
			$(document).on("click", "#btnEdit", function () {
				$.ajax({
					url: restfulURL + restfulPathEdit + $("#from_job_code").val(),
					type: "patch",
					dataType: "json",
					data: {
						"knowledge_point": $("#from_knowledge_point").autoNumeric('get'),
						"capability_point": $("#from_capability_point").autoNumeric('get'),
						"total_point": $("#from_total_point").autoNumeric('get'),
						"baht_per_point": $("#from_baht_per_point").autoNumeric('get'),
					},
					headers: { Authorization: "Bearer " + tokenID.token },
					async: false,
					success: function (data) {
						if (data['status'] == "200") {
							getDataFn($("#pageNumber").val(), $("#rpp").val());
							$('#ModalEdit').modal('hide');
							callFlashSlide("Update Successfully.");
						} else if (data['status'] == "400") {
							validationFn(data);
						}
					}
				});
			});
			var option = {
				vMin: '0',
				vMax: '32767',
				lZero: 'deny',
				//						aPad: false,
				wEmpty: 'zero',
				mDec: '0'
			};
			scriptInputAutoNumeric(".autoNumeric", option);

		});

		$(".del").on("click", function () {
			var job_code = this.id;
			$("#label-del").text("Confirm to delete job code "+job_code+" ?");
			$("#confrimModal").modal({
				"backdrop": setModalPopup[0],
				"keyboard": setModalPopup[1]
			});

			$(document).off("click", "#btnConfirmOK");
			$(document).on("click", "#btnConfirmOK", function () {
				$.ajax({
					url: restfulURL + restfulPathDelete + job_code,
					type: "DELETE",
					dataType: "json",
					headers: { Authorization: "Bearer " + tokenID.token },
					async: false,
					success: function (data) {
						if (data['status'] == "200") {
							getDataFn($("#pageNumber").val(), $("#rpp").val());
							$('#confrimModal').modal('hide');
							callFlashSlide("Delete Successfully.");
						} else if (data['status'] == "400") {
							callFlashSlide("" + data['data'] + "");
						}
					}
				});
			});
			return false;
		});
	});
}


var scriptInputAutoNumeric = function (id, option) {
	$(id).autoNumeric('init');
	$(id).autoNumeric('update', option);
};


$(document).ready(function () {

	var username = $('#user_portlet').val();
	var password = $('#pass_portlet').val();
	var plid = $('#plid_portlet').val();

	if (username != "" && username != null & username != [] && username != undefined) {

		if (connectionServiceFn(username, password, plid) == false) {
			return false;
		}
	}
	$("#AppraisalYear").html(generateDropDownList(globalSevice['restfulPathDropDownYear'],"GET",{}));
	$("#AppraisalPeriod").html(generateDropDownList(globalSevice['restfulPathDropDownBonusPeriod'],"GET",{appraisal_year:$("#AppraisalYear").val()}));
	$("#AppraisalForm").html(generateDropDownList(globalSevice['restfulPathFormType'],"GET",{}));
	$("#AppraisalForm").multiselect({minWidth:'100%;'}).multiselectfilter();
	refreshMultiAppraisalForm();
	
	//console.log(AppraisalFrom);
	toDayFn("#effectiveDate , #expiredDate");
	
	 $("#effectiveDate").datepicker({
		 	dateFormat: "yy-mm-dd",
         minDate: new Date(2018, 1 - 1, 1),
         onSelect: function () {
             var dt2 = $('#expiredDate');
             var startDate = $(this).datepicker('getDate');
             var minDate = $(this).datepicker('getDate');
             var dt2Date = dt2.datepicker('getDate');
             //difference in days. 86400 seconds in day, 1000 ms in second
             var dateDiff = (dt2Date - minDate)/(86400 * 1000);
             
             if (dt2Date == null || dateDiff < 0) {
             		dt2.datepicker('setDate', minDate);
             }
             dt2.datepicker('option', 'maxDate', null);
             dt2.datepicker('option', 'minDate', minDate);
         }
     });
     $('#expiredDate').datepicker({
     	dateFormat: "yy-mm-dd",
     	minDate: 0
     });
     $("#effectiveDate ,#expiredDate").keypress(function(event) {
		    return ( ( event.keyCode || event.which ) === 9 ? true : false );
		});
     
	$(".app_url_hidden").show();

	//getDataFn(pageNumberDefault, $("#rpp").val());
	//$("#list_content").show();




	$("#btnExport").click(function () {
		var param="";
		param+="&period_id="+$("#AppraisalPeriod").val();
		param+="&appraisal_form_id="+$("#AppraisalForm").val()== null ? '' : $("#AppraisalForm").val();
		param+="&effective_date="+$("#effectiveDate").val();
		param+="&expired_date="+$("#expiredDate").val();
		console.log(globalSevice['restfulPathExportPQPI'] + "?token=" + tokenID.token + ""+param)
		$("form#formExportToExcel").attr("action", globalSevice['restfulPathExportPQPI'] + "?token=" + tokenID.token+""+param+"");
		$("#formExportToExcel").submit();
		if($("#AppraisalForm")==''){
			$(".ui-multiselect-all").click();
			AppraisalFrom = $("#AppraisalForm").val();
		}
		console.log($("#AppraisalForm"));
	});
	

	//binding tooltip start
	$('[data-toggle="tooltip"]').css({ "cursor": "pointer" });
	$('[data-toggle="tooltip"]').tooltip({
		html: true
	});

	
});
