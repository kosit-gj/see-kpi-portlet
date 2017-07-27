var restfulPathEmpThreshold="/see_api/public/emp_threshold";
var galbalDataEmpThreshold =[];
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
	
	callFlashSlideInModal(validate,"#information","error");
	$(".btnModalClose").hide();
};	
var getDateFn = function(){
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

//-------- findOne
var findOneFn = function(id) {
	$.ajax({
		url:restfulURL+restfulPathOrganization+"/"+id,
		type : "get",
		dataType : "json",
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {		
			
			$("#mOrgCode").val(data['org_code']);
			$("#mOrgName").val(data['org_name']);
			$("#mOrgParentName").val(data['parent_org_name']);
			$("#mOrgParentId").val(data['parent_org_code']);

			//IsAction
			if(data['is_active']==1){
				$('#checkbox_is_active').prop('checked', true);
			}else{
				$('#checkbox_is_active').prop('checked', false);
			}

		}
	});
};
//--------- findOne
//------------------- listEmpThresholdFn FN Start ---------------------
var listEmpThresholdFn = function(data){
	var htmlEmpthreshold='';
	$.each(data,function(index,indexEntry){
		htmlEmpthreshold += "<tr class='rowSearch'>";
		htmlEmpthreshold += "<td class='objectCenter'>";
		htmlEmpthreshold +=	"	<input disabled style=\"margin-bottom: 3px;\"type=\"checkbox\"  class='selectEmpCheckbox' id="+indexEntry["emp_threshold_id"]+" value=\""+indexEntry["emp_threshold_id"]+"\">"+ "</td>";
		htmlEmpthreshold +="<td class='objectCenter'><input disabled type='text' placeholder='Begin Threshold' style='width: 110px;margin-bottom: 0px;' class='selectEmpBegin numberOnly' id='empBegin-"+indexEntry["emp_threshold_id"]+"' value=\""+indexEntry["begin_threshold"]+"\"></td>";
		htmlEmpthreshold +="<td class='objectCenter'><input disabled type='text' placeholder='End Threshold' style='width: 110px;margin-bottom: 0px;' class='selectEmpEnd numberOnly' id='empEnd-"+indexEntry["emp_threshold_id"]+"' value=\""+indexEntry["end_threshold"]+"\"></td>";
		htmlEmpthreshold +="<td class='objectCenter'><button disabled class=\"jscolor {valueElement:null,value:'"+indexEntry["color_code"]+"',valueElement:'empColor-"+indexEntry["emp_threshold_id"]+"'} selectEmpColor\" style='width:50px; height:20px;'></button> <input type='hidden' id=\"empColor-"+indexEntry["emp_threshold_id"]+"\" value='"+indexEntry["color_code"]+"'></td>";
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
	 

	$(".btnModalClose").click();
	
	//$("#id").val("");
	$("#action").val("");
};

//************** clear end *********//




//..................update emp start.......................
var updateFn = function() {
	
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

					getDateFn();
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
var insertFn = function() {
	
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

					getDateFn();
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
var deleteFn = function() {
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

						getDateFn();
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

var getSelectionStart = function (o) {
	if (o.createTextRange) {
		var r = document.selection.createRange().duplicate()
		r.moveEnd('character', o.value.length)
		if (r.text == '') return o.value.length
		return o.value.lastIndexOf(r.text)
	} else return o.selectionStart
};
$(document).ready(function () {
	
	 var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
	 	if(connectionServiceFn(username,password)==true){
	 		clearFn();
	 		$("#id").val("1");
	 		$("#btnEmpCancel").click();
			$(".app_url_hidden").show();
			

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

				$(".selectEmpCheckbox").removeAttr("disabled");
				$(".selectEmpBegin").removeAttr("disabled");
				$(".selectEmpEnd").removeAttr("disabled");
				$(".selectEmpColor").removeAttr("disabled");
				
				
				
			});
			$(".del").click(function(){
				$("#action").val("delect");
				$(".add").attr("disabled","disabled");
				$(".edit").attr("disabled","disabled");
				//getDateFn();
				$(".selectEmpCheckbox").removeAttr("disabled");

			});
			$("#btnEmpSubmit").click(function(){
				if($("#action").val() == ""){
					callFlashSlide("Please Select Menu Manage !!!");
				}else if ($("#action").val() == "add") {
					insertFn();
				}else if($("#action").val() == "edit"){
					updateFn();
				}else{
					deleteFn();
				}
				return false;

			});
			$("#btnEmpCancel").click(function(){
				$("#action").val("add");
				$(".add").removeAttr("disabled");
				$(".edit").removeAttr("disabled");
				$(".del").removeAttr("disabled");
				getDateFn();
				
			});
	 		
	 		

			
			
	 	}
	 }
	 

	 
	 
	
});


	
	



