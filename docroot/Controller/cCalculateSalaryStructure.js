var gPeriodInfo;
var gDropdownYear = $("#dorpDownRaiseAppraisalYear");
var gDropdownPeriod = $("#dorpDownSalaryPeriod");
var gBtnCalRaiseSalary = $("#btnCalRaiseSalary");


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


var dropDrowYearFn = function(){
	var gUniqueYear = $.unique(gPeriodInfo.map(function(d){return d.appraisal_year;}));
	
	var optionStr="";
	$.each(gUniqueYear,function(index,indexEntry){
		optionStr+="<option value="+indexEntry+">"+indexEntry+"</option>";
	});
	gDropdownYear.html(optionStr);
}


var dropDrowPeriodFn = function(selectedyear){
	
	var periodArr = jQuery.grep(gPeriodInfo, function (period, i) {
        return period.appraisal_year == selectedyear;
    });
	
    var periodOption = "";
    $.each(periodArr, function(index,indexEntry){
    	periodOption+="<option value="+indexEntry.period_id+">"+indexEntry.appraisal_period_desc+"</option>";
	});
    gDropdownPeriod.html(periodOption);
}


var SalaryRaise = function(periodId){
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/salary_raise/raise",
		type:"post",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{
			"period_id":periodId,
		},
		success:function(data){
			console.log(data);
			if(data['status']=='200'){
				callFlashSlide("Calculate Successed.");
			}
		}
	});
}


$(document).ready(function(){
	
	var username = $('#user_portlet').val();
	var password = $('#pass_portlet').val();
	
	if(username!="" && username!=null & username!=[] && username!=undefined ){
		
		if(connectionServiceFn(username,password)==true){
			// Generate Dropdown //
			getPeriodInfoFn();
			dropDrowYearFn();
			dropDrowPeriodFn(gDropdownYear.val());
			
			// Display Application //
			$(".app_url_hidden").show();
			
			gDropdownYear.change(function () {
			    dropDrowPeriodFn(this.value);
			});
			
			gBtnCalRaiseSalary.click(function(){
				$("#confrimModal").modal();
			});
			$("#btnConfirmOK").click(function(){
				SalaryRaise(gDropdownPeriod.val());
				$('#confrimModal').modal('toggle');
			});
			
		}
	}
	
});