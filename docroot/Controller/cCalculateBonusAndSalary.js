
/*
function myFunction(){
	$('#myIframe').attr('src', ifameURL+"/TYW_KPI/Views/emp-result-bonus-raise-amount.html?username="+$('#user_portlet').val()+"&password="+$("#pass_portlet").val()+""); 
	
} 

$(document).ready(function(){
	
	myFunction();

});
*/



var dropDrowAppraisaYearFn = function(){
	$.ajax({
		url:restfulURL+"/tyw_api/public/result_bonus/appraisal_year",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				htmlOption+="<option value="+indexEntry['current_appraisal_year']+">"+indexEntry['current_appraisal_year']+"</option>";
			});
			$("#dorpDownAppraisalYear").html(htmlOption);
		}
	});
}
var dropDrowAppraisalRaiseYearFn = function(){
	$.ajax({
		url:restfulURL+"/tyw_api/public/result_raise_amount/appraisal_year",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				htmlOption+="<option value="+indexEntry['current_appraisal_year']+">"+indexEntry['current_appraisal_year']+"</option>";
			});
			$("#dorpDownRaiseAppraisalYear").html(htmlOption);
		}
	});
}


var dropDrowBonusPeriodFn = function(){
	$.ajax({
		url:restfulURL+"/tyw_api/public/result_bonus/bonus_period",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				htmlOption+="<option value='"+indexEntry['param_end_date']+"_"+indexEntry['period_id']+"'>"+indexEntry['bonus_period_desc']+"</option>";
			});
			$("#dorpDownBonusPeriod").html(htmlOption);
		}
	});
}
var dropDrowSalaryPeriodFn = function(){
	$.ajax({
		url:restfulURL+"/tyw_api/public/result_raise_amount/salary_period",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				htmlOption+="<option value='"+indexEntry['period_id']+"'>"+indexEntry['salary_period_desc']+"</option>";
			});
			$("#dorpDownSalaryPeriod").html(htmlOption);
		}
	});
}

var callStoredCalBonusFn = function(){

	//$("#confrimModal").modal();
	var param_period_id="";
	var param_end_date="";
	var param="";
	param = $("#dorpDownBonusPeriod").val().split("_");;
	param_period_id=param[1];
	param_end_date=param[0];
	$.ajax({
		url:restfulURL+"/tyw_api/public/result_bonus/result_bonus",
		type:"post",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{
			"param_appraisal_year":$("#dorpDownAppraisalYear").val(),
			"param_bonus_period_desc":$("#dorpDownBonusPeriod  option:selected").text(),
			"param_end_date":param_end_date,
			"param_period_id":param_period_id
			},
		success:function(data){
			console.log(data);
			if(data['status']=='200'){
				callFlashSlide("Calculate Successed.");
			}
		}
	});

}

var callStoredCalRaiseAmountFn = function(){
	
	//$("#confrimModal").modal();
	$.ajax({
		url:restfulURL+"/tyw_api/public/result_raise_amount/result_raise_amount",
		type:"post",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{
			"param_appraisal_year":$("#dorpDownRaiseAppraisalYear").val(),
			"param_salary_period_desc":$("#dorpDownSalaryPeriod  option:selected").text(),
			"param_salary_period_id":$("#dorpDownSalaryPeriod").val(),
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

	/*
	var username = getParamValue('username');
	var password = getParamValue('password');
	*/
	
	var username = $('#user_portlet').val();
	var password = $('#pass_portlet').val();
	

	
	if(username!="" && username!=null & username!=[] && username!=undefined ){
		
		if(connectionServiceFn(username,password)==true){
			
			dropDrowAppraisaYearFn();
			dropDrowAppraisalRaiseYearFn();
			dropDrowBonusPeriodFn();
			dropDrowSalaryPeriodFn();
			$(".app_url_hidden").show();
			$("#btnCalBonus").click(function(){
				callStoredCalBonusFn();
			});
			
			$("#btnCalRaiseAmount").click(function(){
				callStoredCalRaiseAmountFn();
			});
	
	
		}
	}
	
});