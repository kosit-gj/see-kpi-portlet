//var restfulURL ="http://192.168.1.58";
//var restfulPath = ":3001/api/tyw_system_configuration/";
//var tokenID= eval("("+sessionStorage.getItem("tokenID")+")");
var tempSystemconId ="";
var galbalSystemcon=[];
var galbalDataEmpThreshold =[];
var restfulPathdropDownListMonth="kpi_api/public/system_config/month_list";
var restfulPathSystemcon="/kpi_api/public/system_config";
var restfulPathDropDownMonth=restfulPathSystemcon+"/month_list";
var restfulPathDropDownFrequency=restfulPathSystemcon+"/frequency_list";
var data2 = [{
	  "id": 1,
	  "begin_threshold": 1.07,
	  "end_threshold": 2.37,
	  "color": "3a69cf"
	}, {
	  "id": 2,
	  "begin_threshold": 1.22,
	  "end_threshold": 2.29,
	  "color": "9ad67f"
	}, {
	  "id": 3,
	  "begin_threshold": 2.0,
	  "end_threshold": 2.17,
	  "color": "804780"
	}];
var maxData = 0;
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

//------------------- getDateEmpThresholdFn FN Start ---------------------
var getDateEmpThresholdFn = function(){
	//var month= $("#drop_down_list_month").val();
	
	$.ajax({
		url : restfulURL+restfulPathSystemcon,
		type : "get",
		dataType : "json",
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,// w8 data 
		success : function(data) {
			galbalDataEmpThreshold=data2;
			
			listEmpThresholdFn(data2);
		}
	});
	
};
//*********** getDateEmpThresholdFn end *********************//

//------------------- listEmpThresholdFn FN Start ---------------------
var listEmpThresholdFn = function(data){
	var htmlEmpthreshold='';
	$.each(data,function(index,indexEntry){
		htmlEmpthreshold += "<tr class='rowSearch'>";
		htmlEmpthreshold += "<td class='objectCenter'>";
		htmlEmpthreshold +=	"	<input disabled style=\"margin-bottom: 3px;\"type=\"checkbox\"  class='selectEmpCheckbox' id=empCheckbox-"+indexEntry["id"]+" value=\""+indexEntry["id"]+"\">"+ "</td>";
		htmlEmpthreshold +="<td class='objectCenter'><input disabled type='text' placeholder='Begin Threshold' style='width: 110px;margin-bottom: 0px;' class='selectEmpBegin' id='empBegin-"+indexEntry["id"]+"' value=\""+indexEntry["begin_threshold"]+"\"></td>";
		htmlEmpthreshold +="<td class='objectCenter'><input disabled type='text' placeholder='End Threshold' style='width: 110px;margin-bottom: 0px;' class='selectEmpEnd' id='empBegin-"+indexEntry["id"]+"' value=\""+indexEntry["end_threshold"]+"\"></td>";
		htmlEmpthreshold +="<td class='objectCenter'><button disabled class=\"jscolor {valueElement:null,value:'"+indexEntry["color"]+"',valueElement:'empColor-"+indexEntry["id"]+"'} selectEmpColor\" style='width:50px; height:20px;'></button> <input type='hidden' id=\"empColor-"+indexEntry["id"]+"\" value='"+indexEntry["color"]+"'></td>";
		htmlEmpthreshold += "</tr>";
		maxData = indexEntry["id"]; 
	});
	$('#formListEmpResult').html(htmlEmpthreshold);
	jscolor.installByClassName("jscolor");
	
	
};
//*********** listEmpThresholdFn end *********************//


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
	if($("#radiosScore:checked").is(":checked")){
		console.log("Select Score \n Max Score :"+$("#maxScore").val());
		//executeFn();
	}else{
		console.log("Select %Wigth \n Max Score : - ");
	}
	$.ajax({
		url:restfulURL+restfulPathSystemcon+$("#id").val(),
		type : "PATCH",
		dataType : "json",
		data : {
			
			"period_start_month_id"             :  $("#month").val(),
			"appraisal_frequency_id"            :  $("#appraisalFrequency").val(),
			"bonus_frequency_id"                :  $("#bonusFrequency").val(),
			"bonus_prorate"                     :  $("#bonusprorateSystem").val(),
			"daily_bonus_rate"                  :  $("#dailyBonusRate").val(),
			"monthly_bonus_rate"                :  $("#monthlyBonusRate").val(),
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

//******************** updateTheme start********//
var updateThemeFn = function(color){
	console.log(color);
	$(".ibox-title").css({"background-color": "#"+color, "border-color": "#"+color});
	$(".ibox-content").css({"border-color": "#"+color});
	$(".modal-header").css({"background": "#"+color});
};
//******************** updateTheme end********//
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
			
			/*
			jQuery('.numberOnly').keyup(function () { 
			    // this.value = this.value.replace(/[^0-9\.]/g,'');
		        $(this).val($(this).val().replace(/[^0-9\.]/g,''));
		        
		        if($(this).val().split(".").length>2 && ($(this).val().indexOf('.') != $(this).val().lastIndexOf('.'))){
		        $(this).val($(this).val().substring(0, $(this).val().lastIndexOf('.')));
		        }
		        else if ($(this).val().split(".")[1] != null || ($(this).val().split(".")[1]).length ){
		            $(this).val($(this).val().substring(0, $(this).val().indexOf('.')+3));
		        }  
			});
			*/
			var getSelectionStart = function (o) {
				if (o.createTextRange) {
					var r = document.selection.createRange().duplicate()
					r.moveEnd('character', o.value.length)
					if (r.text == '') return o.value.length
					return o.value.lastIndexOf(r.text)
				} else return o.selectionStart
			};
			jQuery('.numberOnly').keypress(function (evt) { 
				 var charCode = (evt.which) ? evt.which : event.keyCode;
				 var number = this.value.split('.');
				 if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
				    return false;
				 }
				    //just one dot
				 if(number.length>1 && charCode == 46){
				    return false;
				 }
				    //get the carat position
				 var caratPos = getSelectionStart(this);
				 var dotPos = this.value.indexOf(".");
				 
				 if( caratPos > dotPos && dotPos>-1 && (number[1].length > 1)){
				    return false;
				 }
				 return true;
			});
			
			
			$('#btnEmpResult').click(function(){
				getDateEmpThresholdFn();
			});
			$("#btnEmpCancel").click(function(){
				$("#action").val("add");
				$(".add").removeAttr("disabled");
				$(".edit").removeAttr("disabled");
				$(".del").removeAttr("disabled");
				getDateEmpThresholdFn();
				
			});
			$('.add').click(function(){
				$(".edit").attr("disabled","disabled");
				$(".del").attr("disabled","disabled");
				$("#action").val("add");
				
				maxData++;
				var htmlEmpthreshold = '';

				htmlEmpthreshold += "<tr class='tempAdd'>";
				htmlEmpthreshold += "<td class='objectCenter'>";
				htmlEmpthreshold +=	"	<input disabled style=\"margin-bottom: 3px;\"type=\"checkbox\"  class='selectEmpCheckbox' id=empCheckbox-"+maxData+" >"+ "</td>";
				htmlEmpthreshold +="<td class='objectCenter'><input type='text' placeholder='Begin Threshold' style='width: 110px;margin-bottom: 0px;' class='selectEmpBegin' id='empBegin-"+maxData+"' ></td>";
				htmlEmpthreshold +="<td class='objectCenter'><input type='text' placeholder='End Threshold' style='width: 110px;margin-bottom: 0px;' class='selectEmpEnd' id='empBegin-"+maxData+"' ></td>";
				htmlEmpthreshold +="<td class='objectCenter'><button class=\"jscolor {valueElement:null,value:'ffffff',valueElement:'empColor-"+maxData+"'} selectEmpColor\" style='width:50px; height:20px;'></button> <input type='hidden' id=\"empColor-"+maxData+"\" value='ffffff'></td>";
				htmlEmpthreshold += "</tr>";
				
				$("#formListEmpResult").append(htmlEmpthreshold);
				jscolor.installByClassName("jscolor");
				
			});
			$(".edit").click(function(){
				$("#action").val("edit");
				$(".add").attr("disabled","disabled");
				$(".del").attr("disabled","disabled");
				getDateEmpThresholdFn();
				
			});
			
	 	}
	 }
	 
	 $("input[name$=optionsRadios2]").change(function name() {
			if($("#resultPercentage:checked").is(":checked")){
				$("#btnEmpResult").removeAttr("disabled");
				//executeFn();
			}else{
				$("#btnEmpResult").attr("disabled","disabled");
			}
		});
	 
	 $("#radiosWeight").click();
	
});


	
	



