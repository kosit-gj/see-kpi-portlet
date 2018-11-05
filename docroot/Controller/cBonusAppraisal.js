
//Global variable
var globalSevice=[];
var globalDataTemp=[];

const pageNumberDefault=1;
// restfulPath Service
globalSevice['restfulPathBonusAppraisal']=restfulURL + "/" + serviceName + "/public/bonus-appraisal";
globalSevice['restfulPathDropDownYear']= globalSevice['restfulPathBonusAppraisal'] +"/list_year";
globalSevice['restfulPathDropDownBonusPeriod']= globalSevice['restfulPathBonusAppraisal']+ "/list_bonus_period";





var generateDropDownList = function(url,type,request,initValue){
 	var html="";
 	var firstItem=false;
 	if(initValue!=undefined){
 		html+="<option selected value=''>"+initValue+"</option>";
	}else{
	 	var firstItem=true;
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
};	

	
// --------  Clear Start 
var clearFn = function() {
	
	$("#modalTitleRole").html("Add Questionnaire");
	
	
	$("#form_questionnaire_type").val($("#form_questionnaire_type option:first").val());
	
	
	$("#form_questionnaire_name").val("");
	$("#form_questionnaire_pass_score").val("");
	
	$("#form_questionnaire_is_active").removeClass('on');
	$("#form_questionnaire_is_active").addClass('on');
    $("#form_questionnaire_is_active").attr("data-value","1");
  
    $("#listSection").empty();
	

	$("#action").val("add");
	$(".btnModalClose").click();
	globalDataTemp['form'].validate().resetForm();
	$("#form_questionnaire_type ,.btnAddSection  ,.numberOnly").prop('disabled', false); 
	$("#form_questionnaire_type ,.btnAddSection  ,.numberOnly").removeClass('cursorNotAllowed');
	
}

//--------  GetData Start
var getDataFn = function(page,rpp){
	//alert("Page : "+page+" - Rpp : "+rpp);

	var questType= $("#param_quest_type").val();
	var questId= $("#param_quest_id").val();
	
	$.ajax({
		url : globalSevice['restfulPathQuestionnaire'],
		type : "get",
		dataType : "json",
		data:{

			"questionaire_type_id":questType,
			"questionaire_id":questId

		},
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success : function(data) {

			listQuestionnaireFn(data);

		}
	});
	
	
};
//--------  GetData End

// -------- Search Start
var searchAdvanceFn = function (quest_type,quest_id) {
	//embed parameter start
	var htmlParam="";
	htmlParam+="<input type='hidden' class='param_Embed' id='param_quest_type' name='param_quest_type' value='"+quest_type+"'>";
	htmlParam+="<input type='hidden' class='param_Embed' id='param_quest_id' name='param_quest_id' value='"+quest_id+"'>";
	$(".param_Embed").remove();
	$("body").append(htmlParam);

	getDataFn(pageNumberDefault,$("#rpp").val());
	
}
// -------- Search End


$(document).ready(function() {

		
	var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		 if(connectionServiceFn(username,password,plid)==false){
	 		return false;
	 	}
	 }

	

	// ------------------- Questionnaire -------------------
	$(".sr-only").hide();

	//$("#search_quest_name #search_quest_id").val("");
	//$("#search_quest_type").html(generateDropDownList(globalSevice['restfulPathDropDownQuestionnaireType'],"GET",{},"All Questionnaire Type"));
	//$("#form_questionnaire_type").html(generateDropDownList(globalSevice['restfulPathDropDownQuestionnaireType'],"GET",{}));
	
	//getDropDownAnswerTypeFn(globalSevice['restfulPathDropDownAnswerType'],"GET",{});
	
	$('[data-toggle="tooltip"]').css({"cursor":"pointer"});
	$('[data-toggle="tooltip"]').tooltip({
		 html:true
	});
	
	$(".app_url_hidden").show();
	$("#bonus_appraisal_list_content").show();
	$("#btn_search_advance").click(function(){
	
//		searchAdvanceFn(
//				$("#search_quest_type").val(),
//				$("#search_quest_id").val()
//				);
			
		$("#bonus_appraisal_list_content").show();
		
		return false;
	});
	
	
	
	
	  
	  
	

});
