//var restfulURL ="http://192.168.1.58";
//var restfulPath = ":3001/api/tyw_system_configuration/";
//var tokenID= eval("("+sessionStorage.getItem("tokenID")+")");
var tempSystemconId ="";
var galbalSystemcon=[];
var galbalDataEmpThreshold =[];
var restfulPathdropDownListMonth=""+serviceName+"/public/system_config/month_list";
var restfulPathSystemcon="/"+serviceName+"/public/system_config";
var restfulPathDropDownMonth=restfulPathSystemcon+"/month_list";
var restfulPathDropDownFrequency=restfulPathSystemcon+"/frequency_list";
var restfulPathEmpThreshold="/"+serviceName+"/public/emp_threshold";

var maxData = 0;
//Check Validation
var validationFn = function(data,id,error){
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
	
	callFlashSlideInModal(validate,id,error);
	$(".btnModalClose").hide();
};

//------------------- GetData FN Start ---------------------
var getDataFn = function(page,rpp){
	
	$.ajax({
		url : restfulURL+restfulPathSystemcon,
		type : "get",
		dataType : "json",
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success : function(data) {

			galbalDataSystemcon=data;
	
			//setThemeColorFn(data["theme_color"]);
			var htmlTheamColor = "<button class=\"btn jscolor {valueElement:null,value:'"+data["theme_color"]+"',valueElement:'themeColor',onFineChange:'setThemeColorFn(this)'} \" style='width:70px; height:26px;'></button>";
			$("#current_appraisal_year").val(data["current_appraisal_year"]);
			$("#month").val(data["period_start_month_id"]);
			$("#appraisalFrequency").val(data["appraisal_frequency_id"]);
			$("#bonusFrequency").val(data["bonus_frequency_id"]);
			$("#bonusprorateSystem").val(data["bonus_prorate"]);
			$("#dailyBonusRate").val(data["daily_bonus_rate"]);
			$("#monthlyBonusRate").val(data["monthly_bonus_rate"]);
			$("#workingSystem").val(data["nof_date_bonus"]);
			$("#salaryRaiseFrequency").val(data["salary_raise_frequency_id"]);
			
			if(data["raise_type"] == 1){$("#raiseFixAmount").prop("checked", true);}
			else if(data["raise_type"] == 2){$("#raisePercentage").prop("checked", true);}
			 
			if(data["result_type"] == 0){$("#resultWeightPercentage").prop("checked", true);}
			else if(data["result_type"] == 1){$("#resultPercentage").prop("checked", true);}
			else if(data["result_type"] == 2){$("#raiseScore").prop("checked", true);}
			
			if(data["threshold"] == 1){$("#thresholdOn").prop("checked", true);}
			else if(data["threshold"] == 0){$("#thresholdOff").prop("checked", true);}
			
			if(data["email_reminder_flag"] == 1){$("#emailReminderOn").prop("checked", true);}
			else if(data["email_reminder_flag"] == 0){$("#emailReminderOff").prop("checked", true);}
			$("#listThemeColor").html(htmlTheamColor);
			jscolor.installByClassName("jscolor");
			
			
			//Modal Setup Email
			$("#form_mail_driver").val(data["mail_driver"]);
			$("#form_mail_host").val(data["mail_host"]);
			$("#form_mail_port").val(data["mail_port"]);
			$("#form_mail_username").val(data["mail_username"]);
			$("#form_mail_password").val(data["mail_password"]);
			$("#form_mail_encryption").val(data["mail_encryption"]);
			$("#form_web_domain").val(data["web_domain"]);
			
			
		}
	});
	
};
//*********** getdata end *********************//

//------------------- getDateEmpThresholdFn FN Start ---------------------
var getDateEmpThresholdFn = function(){
	//var month= $("#drop_down_list_month").val();
	
	$.ajax({
		url : restfulURL+restfulPathEmpThreshold,
		type : "get",
		dataType : "json",
		data : {"result_type" : $("#id").val()},
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,// w8 data 
		success : function(data) {
			//galbalDataEmpThreshold=data2;
			
			listEmpThresholdFn(data);
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
		htmlEmpthreshold +=	"	<input disabled style=\"margin-bottom: 3px;\"type=\"checkbox\"  class='selectEmpCheckbox' id="+indexEntry["emp_threshold_id"]+" value=\""+indexEntry["emp_threshold_id"]+"\">"+ "</td>";
		htmlEmpthreshold +="<td class='objectCenter'><input disabled type='text' placeholder='Begin Threshold' style='width: 110px;margin-bottom: 0px;' class='selectEmpBegin numberOnly' id='empBegin-"+indexEntry["emp_threshold_id"]+"' value=\""+indexEntry["begin_threshold"]+"\"></td>";
		htmlEmpthreshold +="<td class='objectCenter'><input disabled type='text' placeholder='End Threshold' style='width: 110px;margin-bottom: 0px;' class='selectEmpEnd numberOnly' id='empEnd-"+indexEntry["emp_threshold_id"]+"' value=\""+indexEntry["end_threshold"]+"\"></td>";
		htmlEmpthreshold +="<td class='objectCenter'><button disabled class=\"btn jscolor {valueElement:null,value:'"+indexEntry["color_code"]+"',valueElement:'empColor-"+indexEntry["emp_threshold_id"]+"'} selectEmpColor\" style='width:50px; height:20px;'></button> <input type='hidden' id=\"empColor-"+indexEntry["emp_threshold_id"]+"\" value='"+indexEntry["color_code"]+"'></td>";
		htmlEmpthreshold += "</tr>";
		
	});
	$('#formListEmpResult').html(htmlEmpthreshold);
	jscolor.installByClassName("jscolor");

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
	
	
	
};
//*********** listEmpThresholdFn end *********************//


//************ clear start *********//

var clearFn = function() {
	$("body").mLoading();
	setThemeColorFn(galbalDataSystemcon["theme_color"]);
	$("#month").val(galbalDataSystemcon["period_start_month_id"]);
	$("#appraisalFrequency").val(galbalDataSystemcon["appraisal_frequency_id"]);
	$("#bonusFrequency").val(galbalDataSystemcon["bonus_frequency_id"]);	
	$("#bonusprorateSystem").val(galbalDataSystemcon["bonus_prorate"]);
	$("#dailyBonusRate").val(galbalDataSystemcon["daily_bonus_rate"]);
	$("#monthlyBonusRate").val(galbalDataSystemcon["monthly_bonus_rate"]);
	$("#workingSystem").val(galbalDataSystemcon["nof_date_bonus"]);
	$("#salaryRaiseFrequency").val(galbalDataSystemcon["salary_raise_frequency_id"]);
	$("#current_appraisal_year").val(galbalDataSystemcon["current_appraisal_year"]);
	
	if(galbalDataSystemcon["raise_type"] == 1){$("#raiseFixAmount").prop("checked", true);}
	else if(galbalDataSystemcon["raise_type"] == 2){$("#raisePercentage").prop("checked", true);}
	 
	if(galbalDataSystemcon["result_type"] == 0){$("#resultWeightPercentage").prop("checked", true);}
	else if(galbalDataSystemcon["result_type"] == 1){$("#resultPercentage").prop("checked", true);}
	else if(galbalDataSystemcon["result_type"] == 2){$("#raiseScore").prop("checked", true);}
	if(galbalDataSystemcon["threshold"] == 1){$("#thresholdOn").prop("checked", true);}
	else if(galbalDataSystemcon["threshold"] == 0){$("#thresholdOff").prop("checked", true);}
	if(galbalDataSystemcon["email_reminder_flag"] == 1){$("#emailReminderOn").prop("checked", true);}
	else if(galbalDataSystemcon["email_reminder_flag"] == 0){$("#emailReminderOff").prop("checked", true);}

	var htmlTheamColor = "<button class=\"btn jscolor {valueElement:null,value:'"+galbalDataSystemcon["theme_color"]+"',valueElement:'themeColor',onFineChange:'setThemeColorFn(this)'} \" style='width:70px; height:26px;'></button>";
	$("#listThemeColor").html(htmlTheamColor);
	jscolor.installByClassName("jscolor");
	setTimeout(function(){
		$("body").mLoading('hide');
	},1000);
	
	//Modal Setup Email
	$("#form_mail_driver").val(galbalDataSystemcon["mail_driver"]);
	$("#form_mail_host").val(galbalDataSystemcon["mail_host"]);
	$("#form_mail_port").val(galbalDataSystemcon["mail_port"]);
	$("#form_mail_username").val(galbalDataSystemcon["mail_username"]);
	$("#form_mail_password").val(galbalDataSystemcon["mail_password"]);
	$("#form_mail_encryption").val(galbalDataSystemcon["mail_encryption"]);
	$("#form_web_domain").val(galbalDataSystemcon["web_domain"]);
	
};

//************** clear end *********//
var generateDropDownList = function(url,type,request,initValue){
 	var html="";
 	
 	if(initValue!=undefined){
 		html+="<option value=''>"+initValue+"</option>";
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
 				html+="<option value="+indexEntry[Object.keys(indexEntry)[0]]+">"+indexEntry[Object.keys(indexEntry)[1] == undefined  ?  Object.keys(indexEntry)[0]:Object.keys(indexEntry)[1]]+"</option>";	
 			});	

 		}
 	});	
 	return html;
 };



// --------------- listSystemConfig start---------------

var listSystemConfigFn = function (data) {
	var htmlTable = "";
	$.each(data,function(index,indexEntry) {
		htmlTable += "<tr class='rowSearch'>";//cds_result_id
		htmlTable += "<td class='columnSearch'>"+ indexEntry["period_start_month_name"]+ "</td>";
		htmlTable += "</tr>";
	});
	$("#listSystemConfig").html(htmlTable);
}
//...................listSystemConfig end......................



//..................update start.......................
var updateFn = function() {
	var raiseType=0;
	var resultType=0;
	var threshold=0;
	var emailReminder=0;
	if($("#raiseFixAmount:checked").is(":checked")){raiseType=1;}
	else if($("#raisePercentage:checked").is(":checked")){raiseType=2;}
	 
	if($("#resultWeightPercentage:checked").is(":checked")){resultType=0;}
	else if($("#resultPercentage:checked").is(":checked")){resultType=1;}
	else if($("#raiseScore:checked").is(":checked")){resultType=2;}
	
	if($("#thresholdOn:checked").is(":checked")){threshold=1;}
	else if($("#thresholdOff:checked").is(":checked")){threshold=0;}
	
	if($("#emailReminderOn:checked").is(":checked")){emailReminder=1;}
	else if($("#emailReminderOff:checked").is(":checked")){emailReminder=0;}
	
	
	$.ajax({
		url:restfulURL+restfulPathSystemcon,
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
			"current_appraisal_year"            :  $("#current_appraisal_year").val(),
			"raise_type"			            :  raiseType,
			"result_type"			            :  resultType,
			"threshold"							:  threshold,
			"email_reminder_flag"				:  emailReminder,
			"theme_color"			            :  $("#themeColor").val()
			
		},	
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data,status) {
				if (data['status'] == "200") {
					//*****btnsubmit******
					//getDataFn();
					galbalDataSystemcon=data['data'];
					callFlashSlide("update Successfully."); 	  
				}else if (data['status'] == "400"){
					validationFn(data,"#information");
			    }
			}
	});
	
	return false
};

//******************** update end********//

var updateMailFn = function() {
	
	$.ajax({
		url:restfulURL+restfulPathSystemcon,
		type : "PATCH",
		dataType : "json",
		data : {
			
			"period_start_month_id"             :  galbalDataSystemcon["period_start_month_id"],
			"appraisal_frequency_id"            :  galbalDataSystemcon["appraisal_frequency_id"],
			"bonus_frequency_id"                :  galbalDataSystemcon["bonus_frequency_id"],
			"bonus_prorate"                     :  galbalDataSystemcon["bonus_prorate"],
			"daily_bonus_rate"                  :  galbalDataSystemcon["daily_bonus_rate"],
			"monthly_bonus_rate"                :  galbalDataSystemcon["monthly_bonus_rate"],
			"nof_date_bonus"                    :  galbalDataSystemcon["nof_date_bonus"],
			"salary_raise_frequency_id"         :  galbalDataSystemcon["salary_raise_frequency_id"],
			"current_appraisal_year"            :  galbalDataSystemcon["current_appraisal_year"],
			"raise_type"			            :  galbalDataSystemcon["raise_type"],
			"result_type"			            :  galbalDataSystemcon["result_type"],
			"threshold"							:  galbalDataSystemcon["threshold"],
			"email_reminder_flag"				:  galbalDataSystemcon["email_reminder_flag"],
			"theme_color"			            :  galbalDataSystemcon["theme_color"],
			// Update Mail
			"mail_driver"         				:  $("#form_mail_driver").val(),
			"mail_host"            				:  $("#form_mail_host").val(),
			"mail_port"			            	:  $("#form_mail_port").val(),
			"mail_username"			            :  $("#form_mail_username").val(),
			"mail_password"						:  $("#form_mail_password").val(),
			"mail_encryption"					:  $("#form_mail_encryption").val(),
			"web_domain"			            :  $("#form_web_domain").val(),
			
		},	
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data,status) {
				if (data['status'] == "200") {
					
					galbalDataSystemcon["mail_driver"] = $("#form_mail_driver").val();
					galbalDataSystemcon["mail_host"] = $("#form_mail_host").val();
					galbalDataSystemcon["mail_port"] = $("#form_mail_port").val();
					galbalDataSystemcon["mail_username"] = $("#form_mail_username").val();
					galbalDataSystemcon["mail_password"] = $("#form_mail_password").val();
					galbalDataSystemcon["mail_encryption"] = $("#form_mail_encryption").val();
					galbalDataSystemcon["web_domain"] = $("#form_web_domain").val();

					
					$("#ModalSetupReminder").modal('hide');
					callFlashSlide("Update Mail Successfully."); 	  
				}else if (data['status'] == "400"){
					validationFn(data,"#information3","error");
			    }
			}
	});
	
	return false
};
//..................update emp start.......................
var updateEmpFn = function() {
	
	var chackSelect =  false;
	
	$.each($(".selectEmpCheckbox").get(),function(index,indexEntry){
		if($(indexEntry).is(":checked")){
			chackSelect = true;
			
		}
	});
	if (chackSelect == false){
		callFlashSlide("Please Select Employee Thershold !!!");

		
		}
	else{
		var emp_thresholds = [];

		$.each($(".selectEmpCheckbox").get(),function(index,indexEntry){
			if($(indexEntry).is(":checked")){
				emp_thresholds.push({
					"emp_threshold_id"	:	this.id,
					"begin_threshold" 	:	$("#empBegin-"+this.id).val(),
					"end_threshold" 	:	$("#empEnd-"+this.id).val(),
					"color_code"		:	$("#empColor-"+this.id).val()
				});				
			}
		});
		//alert(JSON.stringify(emp_thresholds));

		$.ajax({
			url:restfulURL+restfulPathEmpThreshold,
			type:"PATCH",
			dataType:"json",
			data:{
				"result_type" 		:	 $("#id").val(),
				"emp_thresholds"	:	 emp_thresholds
			},
			headers:{authorization:"Bearer "+tokenID.token},
			async:false,
			success:function(data){
				if (data['status'] == "200") {

					getDateEmpThresholdFn();
					$("#action").val("");
					$(".add").removeAttr("disabled");
					$(".edit").removeAttr("disabled");
					$(".del").removeAttr("disabled");
					callFlashSlide("Update Successfully.");
					
					
					
				}else if (data['status'] == "400") {
					validationFn(data,"#information2");
				}
			}
		});
		

		
	}
	
	
	return false
};

//******************** update emp end********//

//..................insert emp start.......................
var insertEmpFn = function() {
	
		var emp_thresholds = [];
		var id;
		$.each($(".newSelectEmpCheckbox").get(),function(index,indexEntry){
			id=this.id.split("-")[1];
			
			emp_thresholds.push({
				"begin_threshold" 	:	$("#newEmpBegin-"+id).val(),
				"end_threshold" 	:	$("#newEmpEnd-"+id).val(),
				"color_code"		:	$("#newEmpColor-"+id).val()
			});				
			
		});
		//alert(JSON.stringify(emp_thresholds));

		$.ajax({
			url:restfulURL+restfulPathEmpThreshold,
			type:"POST",
			dataType:"json",
			data:{
					"result_type" 		:	 $("#id").val(),
					"emp_thresholds"	:	 emp_thresholds
				},
			headers:{authorization:"Bearer "+tokenID.token},
			async:false,
			success:function(data){
				if (data['status'] == "200") {

					getDateEmpThresholdFn();
					$("#action").val("");
					$(".add").removeAttr("disabled");
					$(".edit").removeAttr("disabled");
					$(".del").removeAttr("disabled");
					callFlashSlide("Insert Successfully.");
					
					
					
				}else if (data['status'] == "400") {
					validationFn(data,"#information2");
				}
			}
		});
		

		
	
	
	
	return false
};

//******************** insert emp end********//
//..................Delete emp start.......................
var deleteEmpFn = function() {
	var chackSelect =  false;
	

		
		
		$.each($(".selectEmpCheckbox").get(),function(index,indexEntry){
			if($(indexEntry).is(":checked")){
				chackSelect = true;
				
			}
		});
		if (chackSelect == false){
			callFlashSlide("Please Select Employee Thershold !!!");

			
			}
		else{
			$("#confrimModal").modal();
			$(document).off("click","#btnConfirmOK");
			$(document).on("click","#btnConfirmOK",function(){
			var emp_thresholds = [];

			$.each($(".selectEmpCheckbox").get(),function(index,indexEntry){
				if($(indexEntry).is(":checked")){
					emp_thresholds.push({
						"emp_threshold_id"	:	this.id
					});				
				}
			});
			//alert(JSON.stringify(emp_thresholds));

			$.ajax({
				url:restfulURL+restfulPathEmpThreshold,
				type:"DELETE",
				dataType:"json",
				data:{
					"result_type" 		:	 $("#id").val(),
					"emp_thresholds"	:	 emp_thresholds
				},				
				headers:{authorization:"Bearer "+tokenID.token},
				async:false,
				success:function(data){
					if (data['status'] == "200") {

						getDateEmpThresholdFn();
						$("#action").val("");
						$(".add").removeAttr("disabled");
						$(".edit").removeAttr("disabled");
						$(".del").removeAttr("disabled");
						$("#confrimModal").modal('hide');
						callFlashSlide("Delect Successfully.");
						
						
						
					}else if (data['status'] == "400") {
						$("#confrimModal").modal('hide');
						validationFn(data,"#information2");
						callFlashSlide(data,"error");
					}
				}
			});		
			
		});
		}

	
	
	
	return false
};

//******************** Delete emp end********//


$(document).ready(function () {
	
	 var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		 if(connectionServiceFn(username,password,plid)==true){
	 		//url,type,request,initValue
	 		$("#month").html(generateDropDownList(restfulURL+restfulPathDropDownMonth,"GET"));
	 		$("#appraisalFrequency ,#bonusFrequency ,#salaryRaiseFrequency").html(generateDropDownList(restfulURL+restfulPathDropDownFrequency,"GET"));
	
			getDataFn();
			$(".app_url_hidden").show();
			$(".btnCancle").click(function () {
				clearFn();
				
			});
			$("#btnSubmit").click(function(){
				updateFn();
				
			});
			$("#btnSetupReminder").click(function(){
				//Modal Setup Email
				$("#form_mail_driver").val(galbalDataSystemcon["mail_driver"]);
				$("#form_mail_host").val(galbalDataSystemcon["mail_host"]);
				$("#form_mail_port").val(galbalDataSystemcon["mail_port"]);
				$("#form_mail_username").val(galbalDataSystemcon["mail_username"]);
				$("#form_mail_password").val(galbalDataSystemcon["mail_password"]);
				$("#form_mail_encryption").val(galbalDataSystemcon["mail_encryption"]);
				$("#form_web_domain").val(galbalDataSystemcon["web_domain"]);
			});
			$("#btnEmailSubmit").click(function(){
				updateMailFn();
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
				
				$("#action").val("");
				if($("#resultWeightPercentage").is(":checked")){
					$("#modalTitleSetThershold").html("Set Thershold : Weight Percentage");
					$("#id").val($("#resultWeightPercentage").val());
				}
				else if($("#resultPercentage").is(":checked")){
					$("#modalTitleSetThershold").html("Set Thershold : Percentage");
					$("#id").val($("#resultPercentage").val());
				}
				else{
					$("#modalTitleSetThershold").html("Set Thershold : Score");
					$("#id").val($("#raiseScore").val());
				}
				$("#btnEmpCancel").click();
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
				htmlEmpthreshold +=	"	<input disabled  style=\"margin-bottom: 3px;\"type=\"checkbox\"  class='newSelectEmpCheckbox' id=newEmpCheckbox-"+maxData+" >"+ "</td>";
				htmlEmpthreshold +="<td class='objectCenter'><input type='text' placeholder='Begin Threshold' style='width: 110px;margin-bottom: 0px;' class='newSelectEmpBegin numberOnly' id='newEmpBegin-"+maxData+"' ></td>";
				htmlEmpthreshold +="<td class='objectCenter'><input type='text' placeholder='End Threshold' style='width: 110px;margin-bottom: 0px;' class='newSelectEmpEnd numberOnly' id='newEmpEnd-"+maxData+"' ></td>";
				htmlEmpthreshold +="<td class='objectCenter'><button class=\"jscolor {valueElement:null,value:'ffffff',valueElement:'newEmpColor-"+maxData+"'} newSelectEmpColor\" style='width:50px; height:20px;'></button> <input type='hidden' id=\"newEmpColor-"+maxData+"\" value='ffffff'></td>";
				htmlEmpthreshold += "</tr>";
				
				$("#formListEmpResult").append(htmlEmpthreshold);
				jscolor.installByClassName("jscolor");
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
				
			});
			$(".edit").click(function(){
				$("#action").val("edit");
				$(".add").attr("disabled","disabled");
				$(".del").attr("disabled","disabled");
				//getDateEmpThresholdFn();
				$(".selectEmpCheckbox").removeAttr("disabled");
				$(".selectEmpBegin").removeAttr("disabled");
				$(".selectEmpEnd").removeAttr("disabled");
				$(".selectEmpColor").removeAttr("disabled");
				
				
				
			});
			$(".del").click(function(){
				$("#action").val("delect");
				$(".add").attr("disabled","disabled");
				$(".edit").attr("disabled","disabled");
				//getDateEmpThresholdFn();
				$(".selectEmpCheckbox").removeAttr("disabled");

			});
			$("#btnEmpSubmit").click(function(){
				if($("#action").val() == ""){
					callFlashSlide("Please Select Menu Manage !!!");
				}else if ($("#action").val() == "add") {
					insertEmpFn();
				}else if($("#action").val() == "edit"){
					updateEmpFn();
				}else{
					deleteEmpFn();
				}
				return false;
				
				
				
			});
			$.getScript($("#url_portlet").val()+"/js/plugins/jquery_mask/jquery.mask.min.js", function(){

				  $('.port').mask('9999');

			});
			
	 	}
	 }
	
});


	
	



