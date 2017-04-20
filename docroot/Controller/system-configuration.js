//var restfulURL ="http://192.168.1.58";
//var restfulPath = ":3001/api/tyw_system_configuration/";
//var tokenID= eval("("+sessionStorage.getItem("tokenID")+")");
var tempSystemconId ="";
var galbalSystemcon=[];
var restfulPathdropDownListMonth="tyw_api/public/system_config/month_list";
var restfulPathSystemcon="/tyw_api/public/system_config";
var restfulPathDropDownMonth=restfulPathSystemcon+"/month_list";
var restfulPathDropDownFrequency=restfulPathSystemcon+"/frequency_list";

//Check Validation
var validationFn = function(data){
	var validate = "";
	var count = 0;
	$.each(data['data'], function(index, indexEntry) {

		if (index != undefined) {
			if (count == 0) {
				validate += "<font color='red'>* </font>" + indexEntry + "";
			} else {
				validate += "<br><font color='red'>* </font> " + indexEntry + " ";
			}
		}

		count++;
	});
	
	callFlashSlideInModal(validate,"#information");
	$(".btnModalClose").hide();
};	
//------------------- GetData FN Start ---------------------
var getDataFn = function(page,rpp){
	//var month= $("#drop_down_list_month").val();
	
	$.ajax({
		url : restfulURL+restfulPathSystemcon,
		type : "get",
		dataType : "json",
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,// w8 data 
		success : function(data) {
			
			//listSystemConfigFn(data['data']);
			galbalDataSystemcon=data;
//			alert(galbalDataSystemcon["period_start_month_id"]);
//			alert(galbalDataSystemcon["appraisal_frequency_id"]);
//			alert(galbalDataSystemcon["bonus_frequency_id"]);
//			alert(galbalDataSystemcon["bonus_prorate"]);
//			alert(galbalDataSystemcon["bonus_rate"]);
//			alert(galbalDataSystemcon["nof_date_bonus"]);
//			alert(galbalDataSystemcon["salary_raise_frequency_id"]);
			
			
			$("#current_appraisal_year").val(data["current_appraisal_year"]);
			$("#drop_down_list_month").html(dropDownListMonth(data["period_start_month_id"]));
			$("#appraisalSystem").html(dropDownListAppraisalFrequency(data["appraisal_frequency_id"]));
			$("#bonusfreSystem").html(dropDownListBonusfrequency(data["bonus_frequency_id"]));
			$("#bonusprorateSystem").val(data["bonus_prorate"]);
			$("#dailyBonusRate").val(data["daily_bonus_rate"]);
			$("#monthlyBonusRate").val(data["monthly_bonus_rate"]);
			$("#workingSystem").val(data["nof_date_bonus"]);
			$("#salarySystem").html(dropDownListSalaryRaisefrequency(data["salary_raise_frequency_id"]));
		}
	});
	
};
//*********** getdata end *********************//


//************ clear start *********//

var clearFn = function() {
	 
	$("#drop_down_list_month").html(dropDownListMonth(galbalDataSystemcon["period_start_month_id"]));
	$("#appraisalSystem").html(dropDownListAppraisalFrequency(galbalDataSystemcon["appraisal_frequency_id"]));
	$("#bonusfreSystem").html(dropDownListBonusfrequency(galbalDataSystemcon["bonus_frequency_id"]));
	$("#bonusprorateSystem").val(galbalDataSystemcon["bonus_prorate"]);
	$("#dailyBonusRate").val(galbalDataSystemcon["daily_bonus_rate"]);
	$("#monthlyBonusRate").val(galbalDataSystemcon["monthly_bonus_rate"]);
	$("#workingSystem").val(galbalDataSystemcon["nof_date_bonus"]);
	$("#salarySystem").html(dropDownListSalaryRaisefrequency(galbalDataSystemcon["salary_raise_frequency_id"]));
	$("#current_appraisal_year").val(galbalDataSystemcon["current_appraisal_year"]);
};

//************** clear end *********//


//************** dropDownList Month start  **************//

var dropDownListMonth = function(id){
	var html="";
	
	html+="<select id=\"month\" class=\"input form-control input-sm span12\" data-toggle=\"tooltip\" title=\"Month\" name=\"month\">";
	//html+="<option  selected value=''>All</option>";
	$.ajax ({
		url:restfulURL+restfulPathDropDownMonth,
		type:"get" ,
		dataType:"json" ,
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
			$.each(data,function(index,indexEntry){
				//console.log(data[index]["month_id"]);
				if(id==indexEntry["month_id"]){
					html+="<option selected value="+indexEntry["month_id"]+">"+indexEntry["month_name"]+"</option>";			
				}else{
					html+="<option  value="+indexEntry["month_id"]+">"+indexEntry["month_name"]+"</option>";	
				}
			
			});	
		}
	});	
	html+="</select>";
	return html;
};
//****************dropDownListMonth end************************//


//--------------- DropDownList Appraisal start ----------------
var dropDownListAppraisalFrequency = function(id){
	var html="";
	
	html+="<select id=\"appraisalFrequency\" class=\"input form-control input-sm span12\" data-toggle=\"tooltip\" title=\"Frequency\" name=\"appraisalFrequency\">";
	//html+="<option  selected value=''>All</option>";
	$.ajax ({
		url:restfulURL+restfulPathDropDownFrequency,
		type:"get" ,
		dataType:"json" ,
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
			$.each(data,function(index,indexEntry){
				//console.log(data[index]["frequency_id"]);
				if(id==indexEntry["frequency_id"]){
					html+="<option selected value="+indexEntry["frequency_id"]+">"+indexEntry["frequency_name"]+"</option>";			
				}else{
					html+="<option  value="+indexEntry["frequency_id"]+">"+indexEntry["frequency_name"]+"</option>";	
				}	
			});	
		}
	});	
	html+="</select>";
	return html;
};
//----------------DropDownList Appraisal  frequency ------------
//--------------- DropDownList Bonus start ----------------
var dropDownListBonusfrequency = function(id){
	var html="";
	
	html+="<select id=\"bonusFrequency\" class=\"input form-control input-sm span12\" data-toggle=\"tooltip\" title=\"Frequency\" name=\"bonusFrequency\">";
	//html+="<option  selected value=''>All</option>";
	$.ajax ({
		url:restfulURL+restfulPathDropDownFrequency,
		type:"get" ,
		dataType:"json" ,
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
			$.each(data,function(index,indexEntry){
				//console.log(data[index]["frequency_id"]);
				if(id==indexEntry["frequency_id"]){
					html+="<option selected value="+indexEntry["frequency_id"]+">"+indexEntry["frequency_name"]+"</option>";			
				}else{
					html+="<option  value="+indexEntry["frequency_id"]+">"+indexEntry["frequency_name"]+"</option>";	
				}	
			});	
		}
	});	
	html+="</select>";
	return html;
};
//----------------Salary Raise frequency ------------
var dropDownListSalaryRaisefrequency = function(id){
	var html="";
	
	html+="<select id=\"salaryRaiseFrequency\" class=\"input form-control input-sm span12\" data-toggle=\"tooltip\" title=\"Frequency\" name=\"salaryRaiseFrequency\">";
	//html+="<option  selected value=''>All</option>";
	$.ajax ({
		url:restfulURL+restfulPathDropDownFrequency,
		type:"get" ,
		dataType:"json" ,
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
			$.each(data,function(index,indexEntry){
				//console.log(data[index]["frequency_id"]);
				if(id==indexEntry["frequency_id"]){
					html+="<option selected value="+indexEntry["frequency_id"]+">"+indexEntry["frequency_name"]+"</option>";			
				}else{
					html+="<option  value="+indexEntry["frequency_id"]+">"+indexEntry["frequency_name"]+"</option>";	
				}	
			});	
		}
	});	
	html+="</select>";
	return html;
};
//----------------Salary Raise frequency ------------


// --------------- listSystemConfig start---------------

var listSystemConfigFn = function (data) {
	var htmlTable = "";
	$.each(data,function(index,indexEntry) {
	//console.log(indexEntry["period"]+indexEntry["structure"]);
// 		+indexEntry["appraisal_level"]+indexEntry["appraisal_item"]);
	
		htmlTable += "<tr class='rowSearch'>";//cds_result_id
		htmlTable += "<td class='columnSearch'>"+ indexEntry["period_start_month_name"]+ "</td>";
		htmlTable += "</tr>";
	});
	$("#listSystemConfig").html(htmlTable);
}
//...................listSystemConfig end......................



//..................update start.......................
var updateFn = function() {
	//alert(is_Threshould +is_Import+is_Active );
	//console.log("updateFn");
	$.ajax({
		url:restfulURL+restfulPathSystemcon+$("#id").val(),
		type : "PATCH",
		dataType : "json",
		data : {
			
			"period_start_month_id"             :  $("#month").val(),
			"appraisal_frequency_id"            :  $("#appraisalFrequency").val(),
			"bonus_frequency_id"                :  $("#bonusFrequency").val(),
			"bonus_prorate"                     :  $("#bonusprorateSystem").val(),
			"daily_bonus_rate"                        :  $("#dailyBonusRate").val(),
			"monthly_bonus_rate"                        :  $("#monthlyBonusRate").val(),
			"nof_date_bonus"                    :  $("#workingSystem").val(),
			"salary_raise_frequency_id"         :  $("#salaryRaiseFrequency").val(),
			"current_appraisal_year"            :  $("#current_appraisal_year").val()
		
			
		},	
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data,status) {
			//console.log("success");
				if (data['status'] == "200") {
//					console.log("update Successfully.");
						   //*****btnsubmit******
						   callFlashSlide("update Successfully.");
					       getDataFn();
					       
					 	  
				}else if (data['status'] == "400"){
					validationFn(data);
			    }
			}
	});
	
	return false
};

//******************** update end********//



$(document).ready(function () {
	
	 var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
	 	if(connectionServiceFn(username,password)==true){
	 		
	 	
			getDataFn();
			$(".btnCancle").click(function () {
				clearFn();
				
			});
			$("#btnSubmit").click(function(){
				updateFn();
				
			});
			

			jQuery('.numberOnly').keyup(function () { 
			    this.value = this.value.replace(/[^0-9\.]/g,'');
			});
	 
	 	}
	 }
	
});

	
	



