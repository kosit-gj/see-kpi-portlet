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
		url:restfulURL+"/"+serviceName+"/public/bonus/advance_search/period_hr",
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
		url:restfulURL+"/"+serviceName+"/public/bonus/advance_search/form_hr",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			//htmlOption+="<option value=''>All Form</option>";
			$.each(data,function(index,indexEntry){
				htmlOption+="<option value="+indexEntry['appraisal_form_id']+">"+indexEntry['appraisal_form_name']+"</option>";
			});
			$("#AppraisalForm").html(htmlOption);
		}
	});
}
var refreshMultiAppraisalForm = function() {
	$("#AppraisalForm").multiselect('refresh').multiselectfilter();
	$("#AppraisalForm_ms").css({'width':'100%'});
	$(".ui-icon-check,.ui-icon-closethick,.ui-icon-circle-close").css({'margin-top':'3px'});
	$('input[name=multiselect_AppraisalForm]').css({'margin-bottom':'6px','margin-right':'3px'});
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

//Get Data
var getDataFn = function () {
	$("body").mLoading('show'); //Loading
	var AppraisalYear= $("#AppraisalYear").val();
	var AppraisalPeriod= $("#AppraisalPeriod").val();
	var AppraisalEmpLevel= $("#AppraisalEmpLevel").val();
	var AppraisalOrgLevel= $("#AppraisalOrgLevel").val();
	var organization = $("#organization").val();
	var EmpName_id= $("#EmpName_id").val();
	var Position_id= $("#Position").val()== null ? '' : $("#Position").val().toString();
	var AppraisalFrom=$("#AppraisalForm").val()== null ? '' : $("#AppraisalForm").val().toString();
	var EffectiveDate=$("#effectiveDate").val();	
	var output_type = $("#output_type").val();
	var parameter = {};
	var template_name ="";
	
	if(Position_id ==''){
		$(".ui-multiselect-all").click();
		Position_id = $("#Position").val().toString();
	}
	console.log(Position_id);
	if(AppraisalFrom ==''){
		$(".ui-multiselect-all").click();
		AppraisalFrom = $("#AppraisalForm").val().toString();
	}
	console.log(AppraisalFrom);
	console.log(EffectiveDate);
	/*  if (Position_id == '') {
	        $("body").mLoading('hide'); //Loading
	        callFlashSlide("Position is Require !");
	        return false;
	    }*/
		parameter = {
				param_year: AppraisalYear,
				param_org_id: organization,
				param_period: AppraisalPeriod,
				param_position: Position_id,
				param_emp: EmpName_id,
				param_level_emp: AppraisalEmpLevel,
				param_level_org: AppraisalOrgLevel,
				param_from:AppraisalFrom,
				param_effectiveDate:EffectiveDate
			  };

/*	//-- set report lacale name --//
	var currentLocale = $("#user_locale").val();
	var template_name = "report-hr-summary-consider";
	if(typeof currentLocale !== 'undefined'){
		template_name = template_name+"_"+currentLocale;
	}*/

    var data = JSON.stringify(parameter);
    var url_report_jasper = restfulURL + "/" + serviceName + "/public/generateAuth?template_name=report-salary-adjustment&token=" + tokenID.token + "&template_format=" + output_type + "&used_connection=1&inline=1&data=" + data;
    console.log(url_report_jasper);
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        window.open(url_report_jasper, "_blank");
    } else {
        $('#iFrame_report').attr('src', url_report_jasper);
    }
    $("body").mLoading('hide'); //Loading
};
	
/*	  var data = JSON.stringify(parameter);
	  var url_report_jasper = restfulURL+"/"+serviceName+"/public/generateAuth?template_name="+template_name+"&token="+tokenID.token+"&template_format=xlsx&used_connection=1&inline=1&data="+data;
			window.open(url_report_jasper,"_blank");
			$("body").mLoading('hide'); //Loading
		return false;
//	 	var url_report_jasper = "http://localhost/see_api/public/generate?template_name=report_kpis_org&template_format=pdf&used_connection=1&inline=1&data={%22param_period%22:%221%22,%22param_org%22:%22895%22}";
		
//	 if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
//		 window.open(url_report_jasper,"_blank");
//		} else {
//			$('#iFrame_report').attr('src',url_report_jasper);
//		}
	 
};*/
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
			
//			$("#AppraisalForm").change(function() {
//				dropDrowFormTypeFn();
//			});
			
			$("#organization").change(function() {
				dropDrowPositionFn();
				refreshMultiPosition();
			});
			
			
			$("#Position").multiselect({
				minWidth:'100%;',
				noneSelectedText: "Select Position",
		 		selectedText: "# Position"	
			}).multiselectfilter();
			  refreshMultiPosition();
			
			  $("#AppraisalForm").multiselect({
				  minWidth:'100%;',
				  noneSelectedText: "Select Form",
			 	  selectedText: "# AppraisalForm"
			  }).multiselectfilter();
			  refreshMultiAppraisalForm();
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
		    	getDataFn();
		    	/*if($("#Position")  == ''){
		    		$(".ui-multiselect-all").click();
		    	}*/
		    		    
		    });
		    
		    toDayFn("#effectiveDate ");
			
			 $("#effectiveDate").datepicker({
				 	dateFormat: "yy-mm-dd",
		         minDate: new Date(2018, 1 - 1, 1),
		         onSelect: function () {		            
		             var startDate = $(this).datepicker('getDate');
		             var minDate = $(this).datepicker('getDate');		           
		         }
		     });
			 $("#effectiveDate").keypress(function(event) {
				    return ( ( event.keyCode || event.which ) === 9 ? true : false );
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
