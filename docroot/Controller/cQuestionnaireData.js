const currentUrlReport = document.URL.split(":")[0]+"://"+window.location.host+"/web/guest/wwwr-summary-form";
var globalData="";
var globalDataTemp=[];
var globalSevice=[];
globalSevice['restfulPathQuestionnaireData']=restfulURL + "/" + serviceName + "/public/questionaire_data";
globalSevice['restfulPathDropDownQuestionnaireList'] = globalSevice['restfulPathQuestionnaireData'] +"/list_questionaire";
globalSevice['restfulPathRoleAuthorize']= globalSevice['restfulPathQuestionnaireData'] +"/role_authorize";
globalSevice['restfulPathAutocompleteEmployeeName']= globalSevice['restfulPathQuestionnaireData']+ "/auto_emp";
globalSevice['restfulPathAutocompleteEmployeeName2']= globalSevice['restfulPathQuestionnaireData']+ "/auto_emp2";
globalSevice['restfulPathAutocompleteStoreName']= globalSevice['restfulPathQuestionnaireData']+ "/auto_store";

globalSevice['restfulPathAssignTemplate']= globalSevice['restfulPathQuestionnaireData']+ "/assign_template";
globalSevice['restfulPathGenerateTemplate']= globalSevice['restfulPathQuestionnaireData']+ "/generate_template";
globalSevice['restfulPathEvaluatedRetailerListEdit']= globalSevice['restfulPathQuestionnaireData']+ "/evaluated_retailer_list_edit";
globalSevice['restfulPathEvaluatedRetailerList']= globalSevice['restfulPathQuestionnaireData']+ "/evaluated_retailer_list";


//Autocomplete Temp   
globalDataTemp['tempSearchEmpNameLabel']="";
globalDataTemp['tempSearchEmpNameId']="";
globalDataTemp['tempModalEmpNameLabel']="";
globalDataTemp['tempModalEmpNameId']="";
globalDataTemp['tempModalPositionCode']="";
globalDataTemp['tempModalEmpName']="";
globalDataTemp['tempModalEmpNameAgenLabel']="";
globalDataTemp['tempModalEmpNameAssignLabel']="";
globalDataTemp['tempAutocompleteStore']={};

globalDataTemp['tempTemplateStore']=[];


var clearFn = function() {
	
	$("#modalTitleRole ").html("Questionnaire");
	$("#accordionListQuestionaireData , #listDataStageHistory , #genBtnStage ").empty();
	$("	form#linkParam :input, " +
		"#modal_empsnapshot_name , " +
		"#modal_empsnapshot_id , " +
		"#modal_position_code ," +
		"#modal_agent_name , " +
		"#modal_assign_name ," +
		"#modal_remark").val("");
	$(		"#modal_empsnapshot_name , " + 
			"#modal_questionaire_type_id ," +
			"#modal_datepicker_start , " +
			"#modal_from_stage , " +
			"#modal_to_stage , " +
			"#modal_remark , " +
			"#btnSubmit").prop('disabled', false);
	$("#modal_questionaire_type_id").val($("#modal_questionaire_type_id option:first").val());
	//$("#form_questionnaire_type").val($("#form_questionnaire_type option:first").val());
	$("#inform_label_confirm").text("Confirm to Delete Data?");
	$("#id").val("");
	$("#action").val("add");
	$("#action_modal").val("");
	$(".btnModalClose").click();

	
}

var getURLParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}

var getRoleAuthorizeFn = function (){
	$.ajax({
		url: globalSevice['restfulPathRoleAuthorize'],
		type:"get",
		dataType:"json",
		async:true,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			if(data.add_flag == 0){
				$("#btn-add").prop('disabled', true);
			}
		}
	});
};
var generateDropDownList = function(url,type,request,initValue){
 	var html="";
 	var firstItem=true;
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

 var toDayFn = function(id) {
	  var date = new Date();
	  var day = date.getDate();
	  var month = date.getMonth() + 1;
	  var year = date.getFullYear();

	  if (month < 10) month = "0" + month;
	  if (day < 10) day = "0" + day;

	  var today = day + "/" + month + "/" + year;
	  //document.getElementById(id).value = today;
	  $(id).val(today);
	  // document.getElementById("datepicker-end").value = today;

};
var scriptBtnAddStoreFn = function (){
	$(".btnAddStore").off("click");
	$(".btnAddStore").on("click" ,function(){
		//console.log($(this).parent().parent().next().next());
		if($("#modal_datepicker_start").val() == "" || $("#modal_empsnapshot_id").val() ==""){
			
			callFlashSlide("กรุณาเลือกวันที่ และชื่อ/รหัส พนักงานขาย");
			$('.modal-scrollable').animate({
                scrollTop: $("#modal_empsnapshot_name").offset().top
            }, 500);
			return false;
		}
		$(this).parent().parent().next().hide();
		$(this).parent().parent().next().next().show();

	});
};
var scriptBtnListStoreFn = function (){
	$(".btnListStore").off("click");
	$(".btnListStore").on("click" ,function(){
		if($("#modal_datepicker_start").val() == "" || $("#modal_empsnapshot_id").val() ==""){
			callFlashSlide("กรุณาเลือกวันที่ และชื่อ/รหัส พนักงานขาย");
			$('.modal-scrollable').animate({
                scrollTop: $("#modal_empsnapshot_name").offset().top
            }, 500);
			return false;
		}
		var element = $(this).parent().parent().next();
		var section_id = element.attr("section_id");
		var position_code = $("#modal_position_code").val();
		var data_header_id = ($("#action").val() == "add" ? "" : $("#id").val());
		var date = $("#modal_datepicker_start").val();
		var html ="";
		var is_disabled = ($("#action_modal").val() == 1 ? "" : "disabled");
		
		$.ajax({
			url: globalSevice['restfulPathEvaluatedRetailerList'],
			type:"get",
			dataType:"json",
			async:true,
			headers:{Authorization:"Bearer "+tokenID.token},
			data:{
				"section_id": section_id,
				"position_code": position_code,
				"data_header_id": data_header_id,
				"date": date
			},
			success:function(data){

					html+="  <div class='panel-heading' style='vertical-align: top; '>ผลการทำงาน ณ วันที่ "+date+"</div>";
					html+="  <div class='panel-body'>";
					html+="	<div class='row-fluid' style='overflow: auto;'>";
					html+="    <table style='max-width: none;' class='table table-bordered table-hover customers'>";
					html+="      <thead>";
					html+="        <tr><th style='width:50%; vertical-align: top; text-align: center;min-width: 96px;'>ชื่อร้าน</th>";
					html+="        <th style='width:10%; vertical-align: top; text-align:center;'>คะแนนรวม</th>";
					html+="        <th style='width:40%'></th>";
					html+="      </tr></thead>";
					html+="      <tbody class='listDataStore'>";
				$.each(data,function(index,indexEntry){
					
					html+="<tr >";
					html+="	<td >"+indexEntry.customer_name+"</td>";
					html+="	<td style='text-align: right;' >"+indexEntry.score+"</td>";
					html+="	<td><div align='center'>";
					//html+="			&nbsp;";

					html+="			<button style='width: 65px; margin-bottom: 3px;' ";
					html+="				class='btn btn-small btn-warning' data_header_id='"+indexEntry.data_header_id+"' customer_id='"+indexEntry.customer_id+"' section_id='"+indexEntry.section_id+"' ";
					html+="				onclick='btnEditStoreFn(this);'>"+($("#action_modal").val()=="0" ? "View" : "Edit")+"</button>";
					html+="			<span></span>";
					html+="			<button style='width: 65px; margin-bottom: 3px;' "+($("#action_modal").val()=="0" ? "disabled" : "")+" ";
					html+="				class='btn btn-small btn-danger' "+is_disabled;
					html+="				onclick='btnDelStoreFn(this);' data_header_id='"+indexEntry.data_header_id+"' customer_id='"+indexEntry.customer_id+"' section_id='"+indexEntry.section_id+"'>Delete</button>";
					html+="		</div></td>";
					html+="</tr>";
				});
				
				element.next().hide();
				element.show();
					html+="		 </tbody>";
					html+="		</table>";
					html+="  </div>";
					html+="  </div>";
					element.html(html);
			}
		});
		
		
		

	});
};
var btnEditStoreFn = function (element){
	//console.log(element);
	//console.log($(element).parent().parent().parent().parent().parent().parent().parent().next());
	var data_header_id = $(element).attr("data_header_id");
	var customer_id = $(element).attr("customer_id");
	var section_id = $(element).attr("section_id");
	$.ajax({
		url:globalSevice['restfulPathEvaluatedRetailerListEdit'],
		type:"get",
		dataType:"json",
		async:true,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{
			"data_header_id":data_header_id,
			"customer_id":customer_id,
			"section_id":section_id
		},
		success:function(data){
			var html = "";
			html+="  <div class='panel-heading'> ประเมินผลการทำงานของร้านค้า";
			html+="    <button class='closePanelScore' type='button' ><span aria-hidden='true'><i class='fa fa-times'></i></span></button>";
			html+="  </div>";
			html+="  <div class='panel-body'>";
			html+="    <div class='row-fluid'>";
			html+="      <div class='span6'>";
			html+="        <label for='storeName-modal'>ชื่อร้านค้า</label>";
			html+="        <input disabled class='span12 autocompleteStoreName' type='text' style='margin-bottom: 0px;' id='storeName-modal'   section_id='"+customer_id+"' value='"+data.customer.customer_name+"'>";
			html+="        <input class='autocompleteStoreID ' type='hidden' value='"+data.customer.customer_id+"'>";
			html+="      </div>";
			html+="    </div>";
			html+="    <br>";
			$.each(data["data"].sub_section,function(index2,indexEntry2) {
				if(indexEntry2.question != "" && indexEntry2.answer == ""){
					//console.log("Sub Section"); 
					//indexEntry2.answer_type_id กับ indexEntry2.is_show_comment ไม่ใช้				
					html+="<table class='table table-striped table-bordered ' id='tableParentQuestion-"+indexEntry2.question_id+"' question_id='"+indexEntry2.question_id+"'>";
					html+="  <thead>";
					html+="    <tr>";
					html+="      <th class='' colspan='2' style='vertical-align: top;'>"+indexEntry2.question_name+"</th>";
					//html+="      <th class='' style='vertical-align: top; text-align: center;'>คะแนน</th>";
					html+="    </tr>";
					html+="  </thead>";
					html+="  <tbody>";
					$.each(indexEntry2.question,function(index3,indexEntry3) {
						
						if(indexEntry3.answer_type_id == 1 || indexEntry3.answer_type_id == 2 ){
							html+=generateAnswerFormRadioFn(indexEntry3,"Sub Section");
						}else if(indexEntry3.answer_type_id == 3 || indexEntry3.answer_type_id == 4 ){
							html+=generateAnswerFormCheckboxesFn(indexEntry3,"Sub Section");
						}else if(indexEntry3.answer_type_id == 5 || indexEntry3.answer_type_id == 6 ){
							html+=generateAnswerFormDropdownFn(indexEntry3,"Sub Section");
						}else{
							html+=generateAnswerFormCommentFn(indexEntry3,"Sub Section");
						}
						
						
					});
					
					html+="  </tbody>";
					html+="</table>";
					
					
					
					}else if(indexEntry2.question == "" && indexEntry2.answer != ""){
						
						if(indexEntry2.answer_type_id == 1 || indexEntry2.answer_type_id == 2 ){
							html+=generateAnswerFormRadioFn(indexEntry2,"Question");
						}else if(indexEntry2.answer_type_id == 3 || indexEntry2.answer_type_id == 4 ){
							html+=generateAnswerFormCheckboxesFn(indexEntry2,"Question");
						}else if(indexEntry2.answer_type_id == 5 || indexEntry2.answer_type_id == 6 ){
							html+=generateAnswerFormDropdownFn(indexEntry2,"Question");
						}else{
							html+=generateAnswerFormCommentFn(indexEntry2,"Question");
						}
		
					}
					
					
				
				//console.log("---------End sub_section----------");
			});
			
			html+="  </div>";
			$(element).parent().parent().parent().parent().parent().parent().parent().parent().hide();
			$(element).parent().parent().parent().parent().parent().parent().parent().parent().next().html(html);
			$(element).parent().parent().parent().parent().parent().parent().parent().parent().next().show();
			if($("#action_modal").val()=="0"){$("#accordionListQuestionaireData").find('input , select, textarea , .closePanelScore').prop('disabled', true);}
			
			scriptBtnClearAddStoreFn(); 
		}
	});
}
var btnDelStoreFn = function (element){

	var data_header_id = $(element).attr("data_header_id");
	var customer_id = $(element).attr("customer_id");
	var section_id =  $(element).attr("section_id");
	$("#inform_label_confirm").text("Confirm to Delete Data?");
	$("#confrimModal").modal({
		"backdrop" : setModalPopup[0],
		"keyboard" : setModalPopup[1]
	});
	$(document).off("click","#btnConfirmOK");
	$(document).on("click","#btnConfirmOK",function(){
		$.ajax({
			url:globalSevice['restfulPathEvaluatedRetailerList'],
			type:"delete",
			dataType:"json",
			async:true,
			data:{
				"data_header_id":data_header_id,
				"customer_id":customer_id,
				"section_id" : section_id
			},
			headers:{Authorization:"Bearer "+tokenID.token},
			success:function(data){
				if(data['status']==200){
					$(element).parent().parent().parent().remove();
					callFlashSlide("Delete Successfully");
					$("#confrimModal").modal('hide');
				}else if(data['status']=="400"){
					callFlashSlide(validationFn(data),"error");
				}
			}
		});
		
	});
	
	

};
var scriptBtnClearAddStoreFn  = function (){
	$(".closePanelScore").off("click");
	$(".closePanelScore").on("click" ,function(){
		
		var elements = $(this).parent().parent();
		var section_id=elements.attr("section_id");
		$("#inform_label_confirm").text("Please confirm the cancellation by evaluated retailer?");
		$("#confrimModal").modal({
			"backdrop" : setModalPopup[0],
			"keyboard" : setModalPopup[1]
		});
		$(document).off("click","#btnConfirmOK");
		$(document).on("click","#btnConfirmOK",function(){
			elements.hide(); 
			$("#confrimModal").modal('hide');
			if($("#action_modal").val()=="0"){$("#accordionListQuestionaireData").find('input , select, textarea , .closePanelScore').prop('disabled', true);}
			else{
				var html ="";
				
				html+="    <div class='row-fluid'>";
				html+="      <div class='span6'>";
				html+="        <label for='storeName-modal'>ชื่อร้านค้า</label>";
				html+="        <input class='span12 autocompleteStoreName' type='text' style='margin-bottom: 0px;' id='storeName-modal' section_id='"+section_id+"'>";
				html+="        <input class='autocompleteStoreID ' type='hidden' value=''>";
				html+="      </div>";
				html+="    </div>";
				html+="    <br>";
				html+= generateQuestionaireFormBySubSectionFn(globalDataTemp['tempTemplateStore']["section_"+section_id]);
				elements.find(".panel-body").html(html);
			}
			/*elements.find('.autocompleteStoreName').prop('disabled', false);
			elements.find('input ,textarea ,select option').attr("data_detail_id", "");
			elements.find('select option').prop('selected', false);
			elements.find('select option:eq(0)').prop('selected', true);
			elements.find('input[type="radio"][value="0.0"]').prop('checked', false);
			elements.find('input[type="checkbox"]').prop('checked', false);
			elements.find('.autocompleteStoreName').val("");
			elements.find('.autocompleteStoreID').val("");
			elements.find('textarea').val("");*/
			
			scriptAutocompleteStoreNameFn();
		});
	});
};
var scriptViewReportFn  = function (){
	$(".viewReport").off("click");
	$(".viewReport").on("click" ,function(event){
		event.stopPropagation();
		event.preventDefault();
//		$("form#linkParam #linkParam_questionaire_type_id" ).val($(this).attr("questionaire_type_id"));
//		//$("form#linkParam #linkParam_questionaire_id" ).val($("#search_questionaire_type_id option:selected" ).val());
//		$("form#linkParam #linkParam_assessor_id" ).val($(this).attr("assessor_id"));
//		$("form#linkParam #linkParam_data_header_id" ).val($("#id" ).val());
//		$("form#linkParam #linkParam_questionaire_date" ).val($("#modal_datepicker_start" ).val());
//		
//		$("form#linkParam").attr("action", $(this).attr("url"));
//		$("form#linkParam").submit();


		$("form#linkParam #linkParam_questionaire_type_id" ).val($(this).attr("questionaire_type_id"));
		//$("form#linkParam #linkParam_questionaire_id" ).val($(this).attr("questionaire_id"));
		$("form#linkParam #linkParam_assessor_id" ).val($(this).attr("assessor_id"));
		$("form#linkParam #linkParam_emp_snapshot_id" ).val($("#modal_empsnapshot_id").val());
		$("form#linkParam #linkParam_data_header_id" ).val($("#id" ).val());
		$("form#linkParam #linkParam_questionaire_date" ).val($("#modal_datepicker_start").val());
		

		var parameter = {};
		
		var output_type ="xlsx";
		
		parameter = {
					param_questionaire_type: $(this).attr("questionaire_type_id"),
					param_data_header_id: $("#id" ).val(),
					param_questionaire_date: $(this).attr("questionaire_date"),
					param_employee:$(this).attr("emp_snapshot_id"),
					param_assessor: $(this).attr("assessor_id"),
					//param_section : $(this).attr("section_id"),
					//param_parent_question_id:"",
					param_date_start :"",
					param_date_end:""
				  };

		var data = JSON.stringify(parameter);
		var url_report_jasper = $(this).attr("url")+"&token="+tokenID.token+"&template_format="+output_type+"&used_connection=1&inline=1&data="+data+"&subreport_bundle=1";
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			    window.open(url_report_jasper,"_blank");
			} else {
				//$('#iFrame_report').attr('src',url_report_jasper);
				window.open(url_report_jasper,"_blank");
			}
		
	});
};

var scriptAutocompleteStoreNameFn  = function (){
	$(".autocompleteStoreName").autocomplete({
        source: function (request, response) {
        	$.ajax({
				 url:globalSevice['restfulPathAutocompleteStoreName'],
				 type:"get",
				 dataType:"json",
				 headers:{Authorization:"Bearer "+tokenID.token},
				 data:{
				 	 "data_header_id" : $("#id").val(),
					 "customer_name":request.term,
					 "position_code":$("#modal_position_code").val()
					 },
				 //async:false,
                 error: function (xhr, textStatus, errorThrown) {
                        console.log('Error: ' + xhr.responseText);
                    },
				 success:function(data){
					  
						response($.map(data, function (item) {
                            return {
                            	label: item.customer_name+" ("+item.customer_code+")",
                                value: item.customer_name+" ("+item.customer_code+")",
                                data_id :item.customer_id
                            };
                        }));
					
				},
				beforeSend:function(){
					$("body").mLoading('hide');	
				}
				
				});
        },
		select:function(event, ui) {
			var el = event.target;
			var label = "label-"+$(el).attr("section_id");
			var storeId = "id-"+$(el).attr("section_id");
			
			$(el).val(ui.item.value);
			$(el).next().val(ui.item.data_id);
            globalDataTemp['tempAutocompleteStore'][label]=ui.item.value;
            globalDataTemp['tempAutocompleteStore'][storeId]=ui.item.data_id;
            return false;
        },change: function(e, ui) {  
        	var el = e.target;
        	var label = "label-"+$(el).attr("section_id");
			var storeId = "id-"+$(el).attr("section_id");
			if ($(el).val() == globalDataTemp['tempAutocompleteStore'][label]) {
				$(el).next().val(globalDataTemp['tempAutocompleteStore'][storeId]);
			} else if (ui.item != null) {
				$(el).next().val(ui.item.data_id);
			} else {
				$(el).next().val("");
			}
        	
         }
    });
}
var scriptCheckBtnRequireRemarkFn =function (){
	$("#modal_remark").off("keyup");
	$("#modal_remark").keyup(function(){
		 var status_require_answer = false;
		 var status_require_remark = false;
		 //check require answer
		 $.each($("#accordionListQuestionaireData").find("[answer_type_id=7] textarea").get(),function(index,indexEntry){
			if($(indexEntry).val()==""){
				status_require_answer = true;
				return false;
			}
		 });
		 //check require remark
		 if($("#modal_remark").val()==""){
			 status_require_remark=true;
		 }
		// true = disabled , false = not disabled
		 $(".btnStageSubmit[is_require_answer=0][view_comment_flag=1]").prop('disabled', status_require_remark);
		 $(".btnStageSubmit[is_require_answer=1][view_comment_flag=1]").prop('disabled', (status_require_answer || status_require_remark));

	});
};
var scriptCheckBtnRequireAnswerFn = function (){
	//ต้องกรอกข้อมูลภายใต้ที่ answer_type_id=7 ทั้งหมดก่อนถึงจะกดปุ่มได้
	$("#accordionListQuestionaireData").find("[answer_type_id=7] textarea").off("keyup");
	$("#accordionListQuestionaireData").find("[answer_type_id=7] textarea").keyup(function(){
		  var status_require_answer = false;
		  var status_require_remark = false;
		  //check require answer
		  $.each($("#accordionListQuestionaireData").find("[answer_type_id=7] textarea").get(),function(index,indexEntry){
			if($(indexEntry).val()==""){
				status_require_answer = true;
				return false;
			}
		  });
		  //check require remark
		  if($("#modal_remark").val()==""){
			  status_require_remark=true;
		  }
		  // true = disabled , false = not disabled
		  $(".btnStageSubmit[is_require_answer=1][view_comment_flag=0]").prop('disabled', status_require_answer);
		  $(".btnStageSubmit[is_require_answer=1][view_comment_flag=1]").prop('disabled', (status_require_answer || status_require_remark));
		 
	});
};
var scriptCheckboxCheckIsNarcoticsAnonymousFn  = function (){
	$("#accordionListQuestionaireData .checkboxAnswer").off("click");
	$("#accordionListQuestionaireData .checkboxAnswer").on("click",function(){
		
		if($(this).attr("is_not_applicable") == 1 && $(this).is(":checked") == true){
			$(this).parent().parent().find('input[is_not_applicable="0"]').prop('checked', false);
		}else{
			$(this).parent().parent().find('input[is_not_applicable="1"]').prop('checked', false);
		}
	});
	
};
var setModalContentBodyHeightFn = function(){
	
		var windowHeight = $(window ).outerHeight();
	var modalHeight = $("#modalQuestionaireData").outerHeight();
	var modalHeaderHeight = $("#modalQuestionaireData .modal-content .modal-header").outerHeight();
	var modalBodyHeight = $("#modalQuestionaireData .modal-content .modal-body").outerHeight();
	var modalFooterHeight = $("#modalQuestionaireData .modal-content .modal-footer").outerHeight();
	//$('#modalQuestionaireData .modal-body').css('cssText', "max-height: "+((modalBodyHeight)+(windowHeight-modalHeight)-40)+"px !important;overflow-y:auto !important;");

	$('#modalQuestionaireData .modal-body').css('cssText', "max-height: "+((modalBodyHeight)+(windowHeight-modalHeight)-40)+"px !important;overflow-y:auto !important;");
	$(window).off('resize');
	$(window).on('resize',function(){
		  console.log($(window ).outerHeight());		
	       setTimeout(function(){ 
	    		var windowHeight = $(window ).outerHeight();
	    		var modalHeight = $("#modalQuestionaireData").outerHeight();
	    		var modalHeaderHeight = $("#modalQuestionaireData .modal-content .modal-header").outerHeight();
	    		var modalBodyHeight = $("#modalQuestionaireData .modal-content .modal-body").outerHeight();
	    		var modalFooterHeight = $("#modalQuestionaireData .modal-content .modal-footer").outerHeight();
	    		//$('#modalQuestionaireData .modal-body').css('cssText', "max-height: "+((modalBodyHeight)+(windowHeight-modalHeight)-40)+"px !important;overflow-y:auto !important;");

	    		$('#modalQuestionaireData .modal-body').css('cssText', "max-height: "+((modalBodyHeight)+(windowHeight-modalHeight)-40)+"px !important;overflow-y:auto !important;");
	    		/*
 .modal-scrollable {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: visible;
} 
 * */
	       }, 5);
	  });
};
var findOneFn = function(data_header_id) {
	
	toDayFn('#modal_datepicker_start');
	$.ajax({
		url: globalSevice['restfulPathAssignTemplate'],
		type:"get",
		dataType:"json",
		async:true,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{
			"data_header_id": data_header_id
		},
		success:function(data){
			if(data.status == "200"){
				$("#modalTitleRole").html(data.head.questionaire_name);
				generateQuestionaireFormFn(data);
				generateStageFn(data.stage,data.current_stage,data.to_stage);
				
				
				
				$("#modalQuestionaireData").modal({
					"backdrop" : setModalPopup[0],
					"keyboard" : setModalPopup[1]
				});
				setModalContentBodyHeightFn();
			}else{
				callFlashSlide(data.data,"error");
			}
			
		}
	});
};
var getTemplateQuestionnaireFn = function() {
	var emp_snapshot_id = $("#modal_empsnapshot_id").val();
	var questionaire_type_id = $("#modal_questionaire_type_id").val();
	var date = $("#modal_datepicker_start").val();
	$.ajax({
		url: globalSevice['restfulPathGenerateTemplate'],
		type:"get",
		dataType:"json",
		async:true,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{
			"emp_snapshot_id": emp_snapshot_id,
			"questionaire_type_id": questionaire_type_id,
			"date" : date
		},
		success:function(data){
			if(data.status == "200"){
				$("#id").val(data.head.questionaire_id);
				$("#modalTitleRole").html(data.head.questionaire_name);
				generateQuestionaireFormFn(data);
				generateStageFn(data.stage,data.current_stage,data.to_stage);
			}else{
				
				$("#accordionListQuestionaireData , #listDataStageHistory , #genBtnStage ").empty();
	        	$("#modal_empsnapshot_id").val("");
				$("#modal_position_code").val("");
				$("#modal_agent_name").val("");
	            $("#modal_assign_name").val("");
	            $("#modal_empsnapshot_name").val("");
	            $("#linkParam_emp_snapshot_id").val("");
	            $("#modal_questionaire_type_id").val("");
	            $("#id").val("");
	            
	            callFlashSlide(data.data,"error");
			}
		}
	});
};

var getDataFn = function(){
	var start_date = $("#param_start_date").val();
	var end_date= $("#param_end_date").val();
	var questionaire_type_id= $("#param_questionaire_type_id").val();
	var emp_snapshot_id = $("#param_emp_snapshot_id").val();
	
	$.ajax({
		url:globalSevice['restfulPathQuestionnaireData'],
		type:"get",
		dataType:"json",
		async:true,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{
			"start_date":start_date,
			"end_date":end_date,
			"questionaire_type_id":questionaire_type_id,
			"emp_snapshot_id":emp_snapshot_id
		},
		success:function(data){
			listData(data);
			globalData = data;
		}
	});
};
var delFn = function(id) {
	$.ajax({
		url:globalSevice['restfulPathQuestionnaireData']+"/"+id,
		type:"delete",
		dataType:"json",
		async:true,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			if(data['status']==200){
				getDataFn();
				callFlashSlide("Delete Successfully");
				$("#confrimModal").modal('hide');
			}else if(data['status']=="400"){
				callFlashSlide(validationFn(data),"error");
			}
		}
	});
};
var listData = function(data) {
	//console.log(data);
	if (data == ""){
		$("#listData").html("<div style='margin-top: 40px;margin-bottom: 40px;font-weight: bold;color: #e04747;' align='center'>No Data to Display.</div>");
		return false;
	}
	var html = "";
	$.each(data,function(index,indexEntry) {

		html+="<h3>"+indexEntry.stage_name;
		html+="</h3>";
		html+="<div class=\"list-data-table\">";
		
				html+="<table class='table table-striped table-bordered' style='max-width: none; '>";
				html+="  <thead>";
				html+="    <tr>";
				html+="      <th width=\"15%\" >วันที่</th>";
				html+="      <th width=\"15%\">รหัส TSE</th>";
				html+="      <th width=\"60%\" >ชื่อ-สกุล TSE</th>";
				html+="      <th width=\"10%\"></th>";
				html+="    </tr>";
				html+="  </thead>";
				html+="  <tbody>";
				$.each(indexEntry['data'],function(index2,indexEntry2) {
					html+="    <tr>";
					html+="      <td style='white-space: nowrap;'>"+indexEntry2.questionaire_date+"</td>";
					html+="      <td>"+indexEntry2.position_code+"</td>";
					html+="      <td style='text-align: left;'>"+indexEntry2.emp_name+"</td>";
					html+="      <td>";
					/*
					    
					 	edit_flag	1    
						delete_flag	1
						view_flag	1 
					 */
					html+="		  <i data-trigger=\"focus\" tabindex=\""+index2+"\" title=\"\" data-original-title=\"\" class=\"fa fa-cog font-gear popover-edit-del\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"left\"  data-content=\"";
					html+="			<button class='btn btn-info btn-small btn-gear view' id='view-"+indexEntry2.data_header_id+"' questionaire_date='"+indexEntry2.questionaire_date+"' questionaire_id='"+indexEntry2.questionaire_id+"' assessor_id='"+indexEntry2.assessor_id+"' emp_snapshot_id='"+indexEntry2.emp_snapshot_id+"' emp_name='"+indexEntry2.emp_name+"' questionaire_type_id='"+indexEntry2.questionaire_type_id+"'>Report</button>" ;
					
					if((indexEntry2.edit_flag==1 && indexEntry2.view_flag==0)){
						html+="			<button class='btn btn-warning btn-small btn-gear edit' id='edit-"+indexEntry2.data_header_id+"' edit='1'>Edit</button>" ;
					}else if((indexEntry2.edit_flag==0 && indexEntry2.view_flag==1)){
						html+="			<button class='btn btn-warning btn-small btn-gear edit' id='edit-"+indexEntry2.data_header_id+"' edit='0'>View</button>" ;
					}
					html+="			<button "+(indexEntry2.delete_flag == 1 ? "" : "disabled")+" class='btn btn-danger btn-small btn-gear del' id='del-"+indexEntry2.data_header_id+"'>Delete</button>\"></i>";
					html+="		 </td>";
					html+="    </tr>";
				});
				html+="  </tbody>";
				html+="</table>";

		html+="</div>";

	});
	
	$("#listData").html(html);
	
	$(".popover-edit-del").popover(setPopoverDisplay);
	$("#listData").off("click",".popover-edit-del");
	$("#listData").on("click",".popover-edit-del",function(){
		$(".view").on("click",function() {
			var view=this.id.split("-");
			var id=view[1];
			$("form#linkParam #linkParam_questionaire_type_id" ).val($(this).attr("questionaire_type_id"));
			//$("form#linkParam #linkParam_questionaire_id" ).val($(this).attr("questionaire_id"));
			$("form#linkParam #linkParam_assessor_id" ).val($(this).attr("assessor_id"));
			$("form#linkParam #linkParam_emp_snapshot_id" ).val($(this).attr("emp_snapshot_id"));
			$("form#linkParam #linkParam_data_header_id" ).val(id);
			$("form#linkParam #linkParam_questionaire_date" ).val($(this).attr("questionaire_date"));
			

			var parameter = {};
			var template_name ="";
			var output_type ="xlsx";
			template_name="report-summary-from";
			parameter = {
						param_questionaire_type: $(this).attr("questionaire_type_id"),
						param_data_header_id: id,
						param_questionaire_date: $(this).attr("questionaire_date"),
						param_employee:$(this).attr("emp_snapshot_id"),
						param_assessor: $(this).attr("assessor_id"),
						//param_section:"",
						//param_parent_question_id:"",
						param_date_start:"",
						param_date_end:"",
					  };

			var data = JSON.stringify(parameter);
			var url_report_jasper = restfulURL+"/"+serviceName+"/public/generateAuth?template_name="+template_name+"&token="+tokenID.token+"&template_format="+output_type+"&used_connection=1&inline=1&data="+data+"&subreport_bundle=1";
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				    window.open(url_report_jasper,"_blank");
				} else {
					//$('#iFrame_report').attr('src',url_report_jasper);
					window.open(url_report_jasper,"_blank");
				}
//			$("form#linkParam").attr("action", currentUrlReport);
//			$("form#linkParam").submit();
		});
		$(".edit").on("click",function() {
			var edit=this.id.split("-");
			var id=edit[1];
			var action_edit= $(this).attr("edit");  // 1 แก้ไขได้  0 แก้ไขไม่ได้
			clearFn();
			$("#id").val(id);
			$("#action").val("edit");
			$("#action_modal").val(action_edit);
			$(this).parent().parent().parent().children().click();
			findOneFn(id);
		});
		
		$(".del").on("click",function() {
			var edit=this.id.split("-");
			var id=edit[1];

			$("#confrimModal").modal({
				"backdrop" : setModalPopup[0],
				"keyboard" : setModalPopup[1]
			});
			$(this).parent().parent().parent().children().click();
			$(document).off("click","#btnConfirmOK");
			$(document).on("click","#btnConfirmOK",function(){
				delFn(id);
			});
		});
	});
	
	if(typeof $("#listData").data("ui-accordion") != "undefined"){
		$("#listData").accordion("destroy").accordion({
		    heightStyle: "content",
		    collapsible: true,
		    beforeActivate: function (event, ui) {
		      // The accordion believes a panel is being opened
		      if (ui.newHeader[0]) {
		        var currHeader = ui.newHeader;
		        var currContent = currHeader.next('.ui-accordion-content');
		        // The accordion believes a panel is being closed
		      } else {
		        var currHeader = ui.oldHeader;
		        var currContent = currHeader.next('.ui-accordion-content');
		      }
		      // Since we've changed the default behavior, this detects the actual status
		      var isPanelSelected = currHeader.attr('aria-selected') == 'true';

		      // Toggle the panel's header
		      currHeader.toggleClass('ui-corner-all', isPanelSelected).toggleClass('accordion-header-active ui-state-active ui-corner-top', !isPanelSelected).attr('aria-selected', ((!isPanelSelected).toString()));

		      // Toggle the panel's icon
		      currHeader.children('.ui-icon').toggleClass('ui-icon-triangle-1-e', isPanelSelected).toggleClass('ui-icon-triangle-1-s', !isPanelSelected);

		      // Toggle the panel's content
		      currContent.toggleClass('accordion-content-active', !isPanelSelected)
		      if (isPanelSelected) {
		        currContent.slideUp();
		      } else {
		        currContent.slideDown();
		      }
		      return false; // Cancels the default action
		    }
		  });
	}else{
		$("#listData").accordion({
		    heightStyle: "content",
		    collapsible: true,
		    beforeActivate: function (event, ui) {
		      // The accordion believes a panel is being opened
		      if (ui.newHeader[0]) {
		        var currHeader = ui.newHeader;
		        var currContent = currHeader.next('.ui-accordion-content');
		        // The accordion believes a panel is being closed
		      } else {
		        var currHeader = ui.oldHeader;
		        var currContent = currHeader.next('.ui-accordion-content');
		      }
		      // Since we've changed the default behavior, this detects the actual status
		      var isPanelSelected = currHeader.attr('aria-selected') == 'true';

		      // Toggle the panel's header
		      currHeader.toggleClass('ui-corner-all', isPanelSelected).toggleClass('accordion-header-active ui-state-active ui-corner-top', !isPanelSelected).attr('aria-selected', ((!isPanelSelected).toString()));

		      // Toggle the panel's icon
		      currHeader.children('.ui-icon').toggleClass('ui-icon-triangle-1-e', isPanelSelected).toggleClass('ui-icon-triangle-1-s', !isPanelSelected);

		      // Toggle the panel's content
		      currContent.toggleClass('accordion-content-active', !isPanelSelected)
		      if (isPanelSelected) {
		        currContent.slideUp();
		      } else {
		        currContent.slideDown();
		      }
		      return false; // Cancels the default action
		    }
		  });
	}
};
var generateQuestionaireFormFn = function(data) {
	//console.log(data);
	if($("#action").val() == "edit"){
		$("#modal_datepicker_start").val(data.head.questionaire_date);
		$("#modal_empsnapshot_name").val(data.head.emp_name+" ("+data.head.position_code+")" );
		$("#modal_agent_name").val(data.head.distributor_name);
		$("#modal_assign_name").val(data.head.chief_emp_name);
		$("#modal_empsnapshot_id").val(data.head.emp_snapshot_id);
		$("#modal_position_code").val(data.head.position_code);
		$("#linkParam_emp_snapshot_id").val(data.head.emp_snapshot_id);
		$("#modal_questionaire_type_id").val(data.head.questionaire_type_id);
		$("#modal_empsnapshot_name , #modal_datepicker_start ,#modal_questionaire_type_id ").prop('disabled', true);
		
	}
	
	/*
	 param_questionaire_type: $(this).attr("questionaire_type_id"),
					param_data_header_id: $("#id" ).val(),
					param_questionaire_date: $(this).attr("questionaire_date"),
					param_employee:$(this).attr("emp_snapshot_id"),
					param_assessor: $(this).attr("assessor_id"), 
	 */
	
	var html = "";
	//section_id: 4, section_name: "FF Preparation Process", is_cust_search: 0, sub_section
	$.each(data['data'],function(index,indexEntry) {
		
		html+="<h3 >"+indexEntry.section_name;
		if(indexEntry.is_show_report == 1){
			html+="<span class='viewReport' url='"+indexEntry.report_url+"' emp_snapshot_id='"+data['head'].emp_snapshot_id+"' questionaire_date='"+data['head'].questionaire_date+"' section_id='"+indexEntry.section_id+"' assessor_id='"+data['head'].assessor_id+"' questionaire_type_id='"+data['head'].questionaire_type_id+"'><img src='"+$("#url_portlet").val()+"/img/report.svg' data-toggle='tooltip' data-original-title='View Report' style='width: 30px;float: right;margin-top: -2px;'></span>";
		}
		html+="</h3>";
		html+="<div is_cust_search='"+indexEntry.is_cust_search+"' section_id='"+indexEntry.section_id+"'>";
		if( indexEntry.is_cust_search == 1){
			globalDataTemp['tempTemplateStore']["section_"+indexEntry.section_id]=indexEntry.sub_section;
			html+="<div class='row-fluid' style='margin-bottom: 10px;'>";
			html+="  <div class='span6'>";
			html+="    <button class='btn btn-success btnAddStore' id='btnAddStore-"+indexEntry.section_id+"' section_id='"+indexEntry.section_id+"'>Add</button>";
			html+="    <button class='btn btn-info btnListStore' id='btnListStore-"+indexEntry.section_id+"' section_id='"+indexEntry.section_id+"'>Evaluated Retailer List</button>";
			html+="  </div>";
			html+="</div>";
			
			html+="<div class='panel panel-info panalRetailList' id='panalRetailList-"+indexEntry.section_id+"' section_id='"+indexEntry.section_id+"' style='padding-bottom: 15px;padding-left: 0;padding-right: 0;display: none;'></div>";
			html+="<div class='panel panel-info panalScore' id='panalScore-"+indexEntry.section_id+"' style='padding-bottom: 15px; display: none;' section_id='"+indexEntry.section_id+"'> ";
			html+="  <div class='panel-heading'> ประเมินผลการทำงานของร้านค้า";
			html+="    <button class='closePanelScore' type='button' ><span aria-hidden='true'><i class='fa fa-times'></i></span></button>";
			html+="  </div>";
			html+="  <div class='panel-body'>";
			html+="    <div class='row-fluid'>";
			html+="      <div class='span6'>";
			html+="        <label for='storeName-modal'>ชื่อร้านค้า</label>";
			html+="        <input class='span12 autocompleteStoreName' type='text' style='margin-bottom: 0px;' id='storeName-modal' data-toggle='' title='' section_id='"+indexEntry.section_id+"'>";
			html+="        <input class='autocompleteStoreID ' type='hidden' value=''>";
			html+="      </div>";
			html+="    </div>";
			html+="    <br>";
		}
			html+= generateQuestionaireFormBySubSectionFn(indexEntry.sub_section);
			
		if( indexEntry.is_cust_search == 1){
			html+="    </div>";
			html+="</div>";
		}
		html+="</div>";
		//console.log("------------------------------------End section------------------------------------");
	});
	
	$("#accordionListQuestionaireData").html(html);
	if($("#action_modal").val()=="0"){
		$("#accordionListQuestionaireData").find('input , select, textarea , .closePanelScore').prop('disabled', true);
		$("#accordionListQuestionaireData").find('input , select, textarea , .closePanelScore').addClass('cursorNotAllowed');
	};
	scriptAutocompleteStoreNameFn();
	scriptCheckboxCheckIsNarcoticsAnonymousFn();
	$("#accordion").empty();
	if(typeof $("#accordionListQuestionaireData").data("ui-accordion") != "undefined"){
		$("#accordionListQuestionaireData").accordion("destroy").accordion({
		    heightStyle: "content",
		    collapsible: true,
		    beforeActivate: function (event, ui) {
		      // The accordion believes a panel is being opened
		      if (ui.newHeader[0]) {
		        var currHeader = ui.newHeader;
		        var currContent = currHeader.next('.ui-accordion-content');
		        // The accordion believes a panel is being closed
		      } else {
		        var currHeader = ui.oldHeader;
		        var currContent = currHeader.next('.ui-accordion-content');
		      }
		      // Since we've changed the default behavior, this detects the actual status
		      var isPanelSelected = currHeader.attr('aria-selected') == 'true';

		      // Toggle the panel's header
		      currHeader.toggleClass('ui-corner-all', isPanelSelected).toggleClass('accordion-header-active ui-state-active ui-corner-top', !isPanelSelected).attr('aria-selected', ((!isPanelSelected).toString()));

		      // Toggle the panel's icon
		      currHeader.children('.ui-icon').toggleClass('ui-icon-triangle-1-e', isPanelSelected).toggleClass('ui-icon-triangle-1-s', !isPanelSelected);

		      // Toggle the panel's content
		      currContent.toggleClass('accordion-content-active', !isPanelSelected)
		      if (isPanelSelected) {
		        currContent.slideUp();
		      } else {
		        currContent.slideDown();
		      }
		      return false; // Cancels the default action
		    }
		  });
	}else{
		$("#accordionListQuestionaireData").accordion({
		    heightStyle: "content",
		    collapsible: true,
		    beforeActivate: function (event, ui) {
		      // The accordion believes a panel is being opened
		      if (ui.newHeader[0]) {
		        var currHeader = ui.newHeader;
		        var currContent = currHeader.next('.ui-accordion-content');
		        // The accordion believes a panel is being closed
		      } else {
		        var currHeader = ui.oldHeader;
		        var currContent = currHeader.next('.ui-accordion-content');
		      }
		      // Since we've changed the default behavior, this detects the actual status
		      var isPanelSelected = currHeader.attr('aria-selected') == 'true';

		      // Toggle the panel's header
		      currHeader.toggleClass('ui-corner-all', isPanelSelected).toggleClass('accordion-header-active ui-state-active ui-corner-top', !isPanelSelected).attr('aria-selected', ((!isPanelSelected).toString()));

		      // Toggle the panel's icon
		      currHeader.children('.ui-icon').toggleClass('ui-icon-triangle-1-e', isPanelSelected).toggleClass('ui-icon-triangle-1-s', !isPanelSelected);

		      // Toggle the panel's content
		      currContent.toggleClass('accordion-content-active', !isPanelSelected)
		      if (isPanelSelected) {
		        currContent.slideUp();
		      } else {
		        currContent.slideDown();
		      }
		      return false; // Cancels the default action
		    }
		  });
	}
	
	if($("#action").val() == "add" || $("#action").val() == ""){
		$("#slideUpDownStageHistory").hide();
	}else{
		$("#slideUpDownStageHistory").show();
		$("#slideUpDownStageHistory").off("click");
		$("#slideUpDownStageHistory").on("click",function(){
	        $("#slideStageHistory").slideToggle("slow");
	    });
	}
	scriptBtnClearAddStoreFn();  
	scriptBtnListStoreFn();  
	scriptBtnAddStoreFn();
	scriptViewReportFn();
	
	$('[data-toggle="tooltip"]').css({"cursor":"pointer"});
	 $('[data-toggle="tooltip"]').tooltip({
		 html:true,container: '#modalQuestionaireData'
	 });
};
var generateQuestionaireFormBySubSectionFn = function(data){
	var html = "";
	
	$.each(data,function(index2,indexEntry2) {
		if(indexEntry2.question != "" && indexEntry2.answer == ""){
			//console.log("Sub Section"); 
			//indexEntry2.answer_type_id กับ indexEntry2.is_show_comment ไม่ใช้				
			html+="<table style='max-width: none;' class='table table-striped table-bordered ' id='tableParentQuestion-"+indexEntry2.question_id+"' question_id='"+indexEntry2.question_id+"'>";
			html+="  <thead>";
			html+="    <tr>";
			html+="      <th class='' colspan='2' style='vertical-align: top;'>"+indexEntry2.question_name+"</th>";
			//html+="      <th class='' style='vertical-align: top; text-align: center;'>คะแนน</th>";
			html+="    </tr>";
			html+="  </thead>";
			html+="  <tbody>";
			$.each(indexEntry2.question,function(index3,indexEntry3) {
				
				if(indexEntry3.answer_type_id == 1 || indexEntry3.answer_type_id == 2 ){
					html+=generateAnswerFormRadioFn(indexEntry3,"Sub Section");
				}else if(indexEntry3.answer_type_id == 3 || indexEntry3.answer_type_id == 4 ){
					html+=generateAnswerFormCheckboxesFn(indexEntry3,"Sub Section");
				}else if(indexEntry3.answer_type_id == 5 || indexEntry3.answer_type_id == 6 ){
					html+=generateAnswerFormDropdownFn(indexEntry3,"Sub Section");
				}else{
					html+=generateAnswerFormCommentFn(indexEntry3,"Sub Section");
				}
				
				
			});
			
			html+="  </tbody>";
			html+="</table>";
			
			
			
			}else if(indexEntry2.question == "" && indexEntry2.answer != ""){
				
				if(indexEntry2.answer_type_id == 1 || indexEntry2.answer_type_id == 2 ){
					html+=generateAnswerFormRadioFn(indexEntry2,"Question");
				}else if(indexEntry2.answer_type_id == 3 || indexEntry2.answer_type_id == 4 ){
					html+=generateAnswerFormCheckboxesFn(indexEntry2,"Question");
				}else if(indexEntry2.answer_type_id == 5 || indexEntry2.answer_type_id == 6 ){
					html+=generateAnswerFormDropdownFn(indexEntry2,"Question");
				}else{
					html+=generateAnswerFormCommentFn(indexEntry2,"Question");
				}
					
					
				
				
				
			}
			
			if((index2+1) != data.length){
				html+="  <hr style='margin-top: 15px; margin-bottom: 15px;'>";
				
			}
		
		//console.log("---------End sub_section----------");
	});
	
	return html;
	
};

var generateStageFn = function(stage,current_stage,to_stage) {
	var dropdownCurrentStageHTML="";
	var dropdownToStageHTML="";
	var htmlBtnStage="";
	var TableStageHTML="";
	$.each(stage,function(index,indexEntry){
	
		TableStageHTML+="<tr >";
		TableStageHTML+="	<td>"+indexEntry['created_by']+"</td>";
		TableStageHTML+="	<td>"+indexEntry['created_dttm']+"</td>";
		TableStageHTML+="	<td>"+indexEntry['from_action']+"</td>";
		TableStageHTML+="	<td>"+indexEntry['chief_emp_name']+"</td>";
		TableStageHTML+="	<td>"+indexEntry['to_action']+"</td>";
		TableStageHTML+="	<td>"+indexEntry['emp_name']+"</td>";
		TableStageHTML+="	<td>"+notNullTextFn(indexEntry['remark'])+"</td>";
		TableStageHTML+="</tr>";

	});
	$("#listDataStageHistory").html(TableStageHTML);
	//$("#slideUpDownStageHistory").show();
	
	
	$.each(to_stage,function(index,indexEntry){
		htmlBtnStage+="<button class='btn btn-success btnStageSubmit' type='button' style='margin-left: 5px;margin-top: 5px;' " +
				" is_require_answer='"+indexEntry.is_require_answer+"' " +(indexEntry.is_require_answer == "1" || indexEntry.view_comment_flag == "1" ? "disabled": "")+
				" current_stage_id='"+current_stage.stage_id+"' " +
				" view_comment_flag='"+indexEntry.view_comment_flag+"' " +
				" to_stage='"+indexEntry.stage_id+"' >"+indexEntry.stage_name+"</button>";
	});
	$("#genBtnStage").html(htmlBtnStage); 
	//data.role.view_comment_flag
	if(to_stage == ""){
		$(".modalRemark").hide();
	}else{
		$(".modalRemark").show();
		scriptCheckBtnRequireRemarkFn();
	} 
	scriptCheckBtnRequireAnswerFn();
	
	// Frist Check  Btn require_answer and Btn require_remark
	var check_require_answer = false;
	var check_require_remark = false;
	
	$.each($("#accordionListQuestionaireData").find("[answer_type_id=7] textarea").get(),function(index,indexEntry){
		if($(indexEntry).val()==""){
			check_require_answer = true;
			return false;
		}
	});
	if($("#modal_remark").val()==""){
		check_require_remark=true;
	}
	
	$(".btnStageSubmit[is_require_answer=1][view_comment_flag=0]").prop('disabled', check_require_answer);		
	$(".btnStageSubmit[is_require_answer=0][view_comment_flag=1]").prop('disabled', check_require_remark);
	$(".btnStageSubmit[is_require_answer=1][view_comment_flag=1]").prop('disabled', (check_require_answer || check_require_remark));	  
	 
	
	
	$(".btnStageSubmit").off("click");
	$(".btnStageSubmit").click(function() {
		if ($("#action").val() == "add"|| $("#action").val() == "") {	insertFn(this);		}
		else{	updateFn(this);		}
	});
};
var generateAnswerFormRadioFn = function(data,question_type ) {
	//console.log(" ----  Form Radio -----");
	//console.log(data);

	var html="";
	if(question_type == "Sub Section"){
	html+="    <tr question_id='"+data.question_id+"' answer_type_id='"+data.answer_type_id+"' is_show_comment='"+data.is_show_comment+"'>";
	html+="      <td class=''><p>"+data.question_name+"</p>";
	html+="      <div class='row-fluid'>";
	html+="        <div class='"+(data.answer_type_id == 1 ? "span12" : "span3")+"'>";
	$.each(data.answer,function(index,indexEntry) {

		html+="        <label class='radio inline' style='padding-bottom: 5px; margin-bottom: 10px;margin-left: 10px;'>";
		html+="          <input "+(indexEntry.is_check == 1 ? "checked":"")+" style='margin-top: 2px;' class='radioAnswer' type='radio' " +
							"name='optionsRadios-"+data.question_id+"' " +
							"id='optionsRadios-"+indexEntry.answer_id+"' " +
							"data_detail_id='"+(indexEntry.data_detail_id != undefined ? indexEntry.data_detail_id : "")+"' " +
							"answer_id='"+indexEntry.answer_id+"' " +
							"value='"+indexEntry.score+"' " +
							"full_score='"+indexEntry.full_score+"' " +
							"is_not_applicable='"+indexEntry.is_not_applicable+"' > "+indexEntry.answer_name+"";
		html+="        </label>";

	});
	html+="        </div>";
	html+="        <div class='span9' style='display:"+(data.answer_type_id == 1 ? "none" : "block")+"'> ";
	html+="          <textarea class='form-control' rows='2' id='comment-"+data.question_id+"' style='width:98%; margin-bottom: 0px;min-height:60px; resize: vertical;'>"+(data.answer[0].desc_answer != undefined ? data.answer[0].desc_answer : "")+"</textarea>";
	html+="        </div>";
	html+="      </td>";
	html+="    </tr>";
	
	}else if(question_type == "Question"){

		
		
		html+="<table class='table table-striped table-bordered ' id='tableRadioQuestion-"+data.question_id+"' question_id='"+data.question_id+"'>";
		html+="  <thead>";
		html+="    <tr>";
		html+="      <th class='' colspan='2' style='vertical-align: top;'>"+data.question_name+"</th>";
		//html+="      <th class='' style='vertical-align: top; text-align: center;'>คะแนน</th>";
		html+="    </tr>";
		html+="  </thead>";
		html+="  <tbody>";
		html+="    <tr question_id='"+data.question_id+"' answer_type_id='"+data.answer_type_id+"' is_show_comment='"+data.is_show_comment+"'>";
		html+="      <td>";
		html+="      <div class='row-fluid'>";
		html+="        <div class='"+(data.answer_type_id == 1 ? "span12" : "span3")+"'>";
		$.each(data.answer,function(index,indexEntry) {
			html+="        <label class='radio inline' style='padding-bottom: 5px; margin-bottom: 10px;margin-left: 10px;'>";
			html+="          <input "+(indexEntry.is_check == 1 ? "checked":"")+" style='margin-top: 2px;' class='radioAnswer' type='radio' name='optionsRadios-"+data.question_id+"' id='optionsRadios-"+indexEntry.answer_id+"' data_detail_id='"+(indexEntry.data_detail_id != undefined ? indexEntry.data_detail_id : "")+"' answer_id='"+indexEntry.answer_id+"' full_score='"+indexEntry.full_score+"' value='"+indexEntry.score+"' is_not_applicable='"+indexEntry.is_not_applicable+"'> "+indexEntry.answer_name+"";
			html+="        </label>";
			
		});
		html+="        </div>";
		html+="        <div class='span9' style='display:"+(data.answer_type_id == 1 ? "none" : "block")+"'> ";
		html+="          <textarea class='form-control' rows='2' id='comment-"+data.question_id+"' style='width:98%; margin-bottom: 0px;min-height:60px; resize: vertical;'>"+(data.answer[0].desc_answer != undefined ? data.answer[0].desc_answer : "")+"</textarea>";
		html+="        </div>";
		html+="      </td>";
		html+="    </tr>";
		html+="  </tbody>";
		html+="</table>";
	}
	//console.log("Return : "+html);
	return html;
};
var generateAnswerFormCheckboxesFn = function(data,question_type) {
	//console.log(" ----  Form Checkboxes -----");
	var html="";
	if(question_type == "Sub Section"){
	html+="    <tr question_id='"+data.question_id+"' answer_type_id='"+data.answer_type_id+"' is_show_comment='"+data.is_show_comment+"'>";
	html+="      <td class=''><p>"+data.question_name+"</p>";
	html+="      <div class='row-fluid'>";
	html+="        <div class='"+(data.answer_type_id == 3 ? "span12" : "span3")+"'>";
	$.each(data.answer,function(index,indexEntry) {

		html+="        <label class='radio inline' style='padding-bottom: 5px; margin-bottom: 10px;margin-left: 10px;padding-left: 0px;'>";
		html+="          <input "+(indexEntry.is_check == 1 ? "checked":"")+" style='margin-top: 2px;margin-top: -2px;' class='checkboxAnswer' type='checkbox' name='optionsCheckbox-"+data.question_id+"' id='optionsCheckbox-"+indexEntry.answer_id+"' data_detail_id='"+(indexEntry.data_detail_id != undefined ? indexEntry.data_detail_id : "")+"' answer_id='"+indexEntry.answer_id+"' full_score='"+indexEntry.full_score+"' value='"+indexEntry.score+"' is_not_applicable='"+indexEntry.is_not_applicable+"'> "+indexEntry.answer_name+"";
		html+="        </label>";

	});
	html+="        </div>";
	html+="        <div class='span9' style='display:"+(data.answer_type_id == 3 ? "none" : "block")+"'> ";
	html+="          <textarea class='form-control' rows='2' id='comment-"+data.question_id+"' style='width:98%; margin-bottom: 0px;min-height:60px; resize: vertical;'>"+(data.answer[0].desc_answer != undefined ? data.answer[0].desc_answer : "")+"</textarea>";
	html+="        </div>";
	html+="      </td>";
	html+="    </tr>";
	}else if(question_type == "Question"){

		
		
		html+="<table class='table table-striped table-bordered ' id='tableRadioQuestion-"+data.question_id+"' question_id='"+data.question_id+"'>";
		html+="  <thead>";
		html+="    <tr>";
		html+="      <th class='' colspan='2' style='vertical-align: top;'>"+data.question_name+"</th>";
		//html+="      <th class='' style='vertical-align: top; text-align: center;'>คะแนน</th>";
		html+="    </tr>";
		html+="  </thead>";
		html+="  <tbody>";
		html+="    <tr question_id='"+data.question_id+"' answer_type_id='"+data.answer_type_id+"' is_show_comment='"+data.is_show_comment+"'>";
		html+="      <td>";
		html+="      <div class='row-fluid'>";
		html+="        <div class='"+(data.answer_type_id == 3 ? "span12" : "span3")+"'>";
		$.each(data.answer,function(index,indexEntry) {
			html+="        <label class='radio inline' style='padding-bottom: 5px; margin-bottom: 10px;margin-left: 10px;padding-left: 0px;'>";
			html+="          <input "+(indexEntry.is_check == 1 ? "checked":"")+" style='margin-top: 2px;margin-top: -2px;' class='checkboxAnswer' type='checkbox' name='optionsCheckbox-"+data.question_id+"' name='optionsCheckbox-"+data.question_id+"' id='optionsRadios-"+indexEntry.answer_id+"' data_detail_id='"+(indexEntry.data_detail_id != undefined ? indexEntry.data_detail_id : "")+"' answer_id='"+indexEntry.answer_id+"' full_score='"+indexEntry.full_score+"' value='"+indexEntry.score+"' is_not_applicable='"+indexEntry.is_not_applicable+"'> "+indexEntry.answer_name+"";
			html+="        </label>";

		});
		html+="        </div>";
		html+="        <div class='span9' style='display:"+(data.answer_type_id == 3 ? "none" : "block")+"'> ";
		html+="          <textarea class='form-control' rows='2' id='comment-"+data.question_id+"' style='width:98%; margin-bottom: 0px;min-height:60px; resize: vertical;'>"+(data.answer[0].desc_answer != undefined ? data.answer[0].desc_answer : "")+"</textarea>";
		html+="        </div>";
		html+="      </td>";
		html+="    </tr>";
		html+="  </tbody>";
		html+="</table>";
	}
	return html;
};
var generateAnswerFormDropdownFn = function(data,question_type) {
	//console.log(" ----  Form Dropdown -----");
	//console.log(data);
	
	//answer: Array [ {…}, {…} ],answer_type_id: 2,parent_question_id: 4,question_id: 5,​​​​​is_show_comment:0,question_name: "1.1 จำนวนและรายการสินค้าบนรถ / ความพร้อมรถ"
	 
	
	var html="";
	if(question_type == "Sub Section"){
		html+="    <tr question_id='"+data.question_id+"' answer_type_id='"+data.answer_type_id+"' is_show_comment='"+data.is_show_comment+"'>";
		html+="      <td class='col1'><p>"+data.question_name+"</p>";
		html+="        <textarea class='form-control' rows='1' id='comment-"+data.question_id+"' style='width:94.5%; margin-bottom: 0px; resize: vertical;display:"+(data.answer_type_id == 5 ? "none;" : "block;")+"'>"+(data.answer[0].desc_answer != undefined ? data.answer[0].desc_answer : "")+"</textarea>";
		html+="      </td>";
		html+="      <td class='col2' style='min-width: 60px;'>";
		html+="        <div align='center'>";
		html+="         <select class='span2 sel'>";
		$.each(data.answer,function(index,indexEntry) {
			//answer_id: 149 ,answer_name: "Yes" ,is_not_applicable: 0, row_name: "Yes" ,score: "1.0"
			html+="            <option "+(indexEntry.is_check == 1 ? "selected":"")+" value='"+indexEntry.score+"' data_detail_id='"+(indexEntry.data_detail_id != undefined ? indexEntry.data_detail_id : "")+"' answer_id='"+indexEntry.answer_id+"' is_not_applicable='"+indexEntry.is_not_applicable+"' full_score='"+indexEntry.full_score+"'>"+indexEntry.answer_name+"</option>";
	
		});
		html+="          </select>";
		html+="          <div>";
		html+="      </td>";
		html+="    </tr>";
	}else if(question_type == "Question"){

		html+="<table class='table table-striped table-bordered ' id='tableDropdownQuestion-"+data.question_id+"' question_id='"+data.question_id+"'>";
		html+="  <thead>";
		html+="    <tr>";
		html+="      <th class='' colspan='2' style='vertical-align: top;'>"+data.question_name+"</th>";
		html+="    </tr>";
		html+="  </thead>";
		html+="  <tbody>";
		html+="    <tr question_id='"+data.question_id+"' answer_type_id='"+data.answer_type_id+"' is_show_comment='"+data.is_show_comment+"'>";//style='display:"+(data.answer_type_id == 1 ? "none" : "block")+"'
		html+="      <td class='col1'><p>คะแนน</p>";
		html+="        <textarea class='form-control' rows='1' id='comment-"+data.question_id+"' style='width:94.5%; margin-bottom: 0px; resize: vertical;display:"+(data.answer_type_id == 5 ? "none;" : "block;")+"'>"+(data.answer[0].desc_answer != undefined ? data.answer[0].desc_answer : "")+"</textarea>";
		html+="      </td>";
		html+="      <td class='col2' style='min-width: 60px;'>";
		html+="        <div align='center'>";
		html+="         <select class='span2 sel'>";
		$.each(data.answer,function(index,indexEntry) {
			//answer_id: 149 ,answer_name: "Yes" ,is_not_applicable: 0, row_name: "Yes" ,score: "1.0"
			html+="            <option "+(indexEntry.is_check == 1 ? "selected":"")+" value='"+indexEntry.score+"' data_detail_id='"+(indexEntry.data_detail_id != undefined ? indexEntry.data_detail_id : "")+"' answer_id='"+indexEntry.answer_id+"' is_not_applicable='"+indexEntry.is_not_applicable+"' full_score='"+indexEntry.full_score+"'>"+indexEntry.answer_name+"</option>";

		});
		html+="          </select>";
		html+="          <div>";
		html+="      </td>";
		html+="    </tr>";
		html+="  </tbody>";
		html+="</table>";
	}
	return html;
};
var generateAnswerFormCommentFn = function(data,question_type) {
	//console.log(" ----  Comment Data -----");
	//console.log(data);
	var html="";
	if(question_type == "Sub Section"){
		html+="    <tr question_id='"+data.question_id+"' answer_type_id='"+data.answer_type_id+"' is_show_comment='1'>";
		html+="      <td class='' colspan='2'><p>"+data.question_name+"</p>";
		$.each(data.answer,function(index,indexEntry) {
			//answer_id: 149 ,answer_name: "Yes" ,is_not_applicable: 0, row_name: "Yes" ,score: "1.0"
			html+="      <p>"+indexEntry.answer_name+"</p>";
			html+="       	<textarea class='form-control' rows='5' id='comment-"+data.question_id+"' style='width:96%; margin-bottom: 0px; resize: vertical;' data_detail_id='"+(indexEntry.data_detail_id != undefined ? indexEntry.data_detail_id : "")+"' answer_id='"+indexEntry.answer_id+"' is_not_applicable='"+indexEntry.is_not_applicable+"' score='"+indexEntry.score+"' full_score='"+indexEntry.full_score+"'>"+indexEntry.desc_answer+"</textarea>";
			if((index+1) != data.answer.length){
				html+="  <hr style='margin-top: 15px; margin-bottom: 15px;'>";
			}
		});
		
		html+="      </td>";
		html+="    </tr>";
	}else if(question_type == "Question"){
		html+="<table class='table table-striped table-bordered ' id='tableCommentQuestion-"+data.question_id+"' question_id='"+data.question_id+"'>";
		html+="  <thead>";
		html+="    <tr>";
		html+="      <th class='' colspan='2' style='vertical-align: top;'>"+data.question_name+"</th>";
		//html+="      <th class='' style='vertical-align: top; text-align: center;'>คะแนน</th>";
		html+="    </tr>";
		html+="  </thead>";
		html+="  <tbody>";
		html+="    <tr question_id='"+data.question_id+"' answer_type_id='"+data.answer_type_id+"' is_show_comment='1'>";
		html+="      <td>";
		$.each(data.answer,function(index,indexEntry) {
			//console.log(index);
			html+="      <p>"+indexEntry.answer_name+"</p>";
			html+="       	<textarea class='form-control' rows='5' id='comment-"+data.question_id+"' style='width:96%; margin-bottom: 10px; resize: vertical;' data_detail_id='"+(indexEntry.data_detail_id != undefined ? indexEntry.data_detail_id : "")+"' answer_id='"+indexEntry.answer_id+"' is_not_applicable='"+indexEntry.is_not_applicable+"' score='"+indexEntry.score+"' full_score='"+indexEntry.full_score+"'>"+indexEntry.desc_answer+"</textarea>";
	
			
		});
		html+="      </td>";
		html+="    </tr>";
		html+="  </tbody>";
		html+="</table>";
	}
	

	return html;
	
};

var updateFn = function(element){
	
	var data_header_id = $("#id").val();
	//var questionaire_id = $("#search_questionaire_type_id").val();
	var emp_snapshot_id = $("#modal_empsnapshot_id").val();
	//var questionaire_date = $("#modal_datepicker_start").val();
	var total_score = 0;
	var total_full_score = 0;
	var score = [];
	var full_score = [];
	var detail = [];
	var stage = {};
	stage.from_stage_id =  $(element).attr("current_stage_id");
	stage.to_stage_id =  $(element).attr("to_stage");
	stage.remark =  $("#modal_remark").val();


	$.each($("#accordionListQuestionaireData").children('div').get(),function(index,indexEntry){
		
		$.each($(indexEntry).find('tbody tr').get(),function(index2,indexEntry2){
			var detail_group ={};
			detail_group.section_id= $(indexEntry).attr("section_id");
			detail_group.customer_id= "";
			detail_group.question_id = $(indexEntry2).attr("question_id");
			if($(indexEntry).attr("is_cust_search")==1){
				detail_group.customer_id= $(indexEntry).find(".autocompleteStoreID ").val();
			}

			if($(indexEntry2).attr("answer_type_id") == "1" || $(indexEntry2).attr("answer_type_id") == "2"){

				
				if($(indexEntry).attr("is_cust_search")==1 && detail_group.customer_id == ""){}
				else{
					
					$.each($(indexEntry2).find("input:checked").get(),function(index3,indexEntry3){
						
						if($(indexEntry).attr("is_cust_search")==0 && $(indexEntry3).attr("is_not_applicable")==0){
							score.push(parseFloat($(indexEntry3).val()));
							full_score.push(parseFloat($(indexEntry3).attr("full_score")));
						}
						detail.push({
							section_id			: detail_group.section_id,
							customer_id			: detail_group.customer_id,
							question_id			: detail_group.question_id,
							data_detail_id 		: $(indexEntry3).attr("data_detail_id"),
							answer_id			: $(indexEntry3).attr("answer_id"),
							full_score			: $(indexEntry3).attr("full_score"),
							score				: $(indexEntry3).val(),
							is_not_applicable	: $(indexEntry3).attr("is_not_applicable"),
							desc_answer			: $(indexEntry2).find("textarea").val()
						});
					});
				}
				
				
				
			}else if($(indexEntry2).attr("answer_type_id") == "3" || $(indexEntry2).attr("answer_type_id") == "4"){
				if($(indexEntry).attr("is_cust_search")==1 && detail_group.customer_id == ""){}
				else{
					$.each($(indexEntry2).find("input:checked").get(),function(index3,indexEntry3){
						
						
						if($(indexEntry).attr("is_cust_search")==0 && $(indexEntry3).attr("is_not_applicable") == 0 ){
							score.push(parseFloat($(indexEntry3).val()));
							full_score.push(parseFloat($(indexEntry3).attr("full_score")));
						}
						//console.log("Bf total_score :"+parseFloat(total_score +$(indexEntry3).val()).toFixed(1));
						detail.push({
							section_id			: detail_group.section_id,
							customer_id			: detail_group.customer_id,
							question_id			: detail_group.question_id,
							data_detail_id 		: $(indexEntry3).attr("data_detail_id"),
							answer_id			: $(indexEntry3).attr("answer_id"),
							full_score			: $(indexEntry3).attr("full_score"),
							score				: $(indexEntry3).val(),
							is_not_applicable	: $(indexEntry3).attr("is_not_applicable"),
							desc_answer			: $(indexEntry2).find("textarea").val()
						});
					});
				}
				
				
				
				
			}else if($(indexEntry2).attr("answer_type_id") == "4" || $(indexEntry2).attr("answer_type_id") == "5"){


				if($(indexEntry).attr("is_cust_search")==1 && detail_group.customer_id == ""){}
				else{
					if($(indexEntry).attr("is_cust_search")==0 && $(indexEntry2).find("option:selected").attr("is_not_applicable")==0){
						score.push(parseFloat($(indexEntry2).find("option:selected").val()));
						full_score.push(parseFloat($(indexEntry2).find("option:selected").attr("full_score")));
					}
					detail.push({
							section_id			: detail_group.section_id,
							customer_id			: detail_group.customer_id,
							question_id			: detail_group.question_id,
							data_detail_id 		: $(indexEntry2).find("option:selected").attr("data_detail_id"),
							answer_id			: $(indexEntry2).find("option:selected").attr("answer_id"),
							full_score			: $(indexEntry2).find("option:selected").attr("full_score"),
							score				: $(indexEntry2).find("option:selected").val(),
							is_not_applicable	: $(indexEntry2).find("option:selected").attr("is_not_applicable"),
							desc_answer			: $(indexEntry2).find("textarea").val()
						});
				}
				
				

			}else{
				if($(indexEntry).attr("is_cust_search")==1 && detail_group.customer_id == ""){}
				else{
					$.each($(indexEntry2).find("textarea").get(),function(index3,indexEntry3){
						//score.push(parseFloat($(indexEntry3).attr("score")));
						detail.push({
							section_id			: detail_group.section_id,
							customer_id			: detail_group.customer_id,
							question_id			: detail_group.question_id,
							data_detail_id 		: $(indexEntry3).attr("data_detail_id"),
							full_score			: $(indexEntry3).attr("full_score"),
							answer_id			: $(indexEntry3).attr("answer_id"),
							score				: $(indexEntry3).attr("score"),
							is_not_applicable	: $(indexEntry3).attr("is_not_applicable"),
							desc_answer			: $(indexEntry3).val()
						});
					});
				}
			}
			
		
			
		});

	});


	$.each(score ,function(){total_score +=parseFloat(this) || 0; });
	$.each(full_score ,function(){total_full_score +=parseFloat(this) || 0; });
	
	console.log(detail);
	console.log("total full score" + total_full_score);
	console.log("total score" + total_score);
	$.ajax({
		
		url:globalSevice['restfulPathQuestionnaireData'],
		type : "PATCH",
		dataType : "json",
		data : {
				
			"data_header_id" : data_header_id,
			//"questionaire_id": questionaire_id,
			//"questionaire_date": questionaire_date,
			"emp_snapshot_id": emp_snapshot_id,
			"total_score": total_score,
			"full_score" : total_full_score,
			"detail": detail,
			"stage" :  stage
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			if (data['status'] == "200") {
				callFlashSlide("Update Successfully.");
				$('#modalQuestionaireData').modal('hide');
				getDataFn();
				clearFn();
			}else if (data['status'] == "400") {
				//console.log(data);
				callFlashSlide("Failed to insert data.");
			}  
				   
		}
	});








	 
	  
	  
};

var insertFn = function(element){

	var questionaire_id = $("#id").val();
	var emp_snapshot_id = $("#modal_empsnapshot_id").val();
	var questionaire_date = $("#modal_datepicker_start").val();
	var total_score = 0;
	var total_full_score = 0;
	var score = [];
	var full_score = [];
	var detail = [];
	var stage = {};
	stage.from_stage_id =  $(element).attr("current_stage_id");
	stage.to_stage_id =  $(element).attr("to_stage");
	stage.remark =  $("#modal_remark").val();


	$.each($("#accordionListQuestionaireData").children('div').get(),function(index,indexEntry){
		
		$.each($(indexEntry).find('tbody tr').get(),function(index2,indexEntry2){
			var detail_group ={};
			detail_group.section_id= $(indexEntry).attr("section_id");
			detail_group.customer_id= "";
			detail_group.question_id = $(indexEntry2).attr("question_id");
			if($(indexEntry).attr("is_cust_search")==1){
				detail_group.customer_id= $(indexEntry).find(".autocompleteStoreID ").val();
			}

			if($(indexEntry2).attr("answer_type_id") == "1" || $(indexEntry2).attr("answer_type_id") == "2"){

				
				if($(indexEntry).attr("is_cust_search")==1 && detail_group.customer_id == ""){}
				else{
					
					$.each($(indexEntry2).find("input:checked").get(),function(index3,indexEntry3){
						//score.push(parseFloat($(indexEntry3).val()));
						if($(indexEntry).attr("is_cust_search")==0 && $(indexEntry3).attr("is_not_applicable")==0){
							score.push(parseFloat($(indexEntry3).val()));
							full_score.push(parseFloat($(indexEntry3).attr("full_score")));
						}
						detail.push({
							section_id			: detail_group.section_id,
							customer_id			: detail_group.customer_id,
							question_id			: detail_group.question_id,
							answer_id			: $(indexEntry3).attr("answer_id"),
							full_score			: $(indexEntry3).attr("full_score"),
							score				: $(indexEntry3).val(),
							is_not_applicable	: $(indexEntry3).attr("is_not_applicable"),
							desc_answer			: $(indexEntry2).find("textarea").val()
						});
					});
				}
				
				
				
			}else if($(indexEntry2).attr("answer_type_id") == "3" || $(indexEntry2).attr("answer_type_id") == "4"){
				if($(indexEntry).attr("is_cust_search")==1 && detail_group.customer_id == ""){}
				else{
					$.each($(indexEntry2).find("input:checked").get(),function(index3,indexEntry3){
						
						//score.push(parseFloat($(indexEntry3).val()));
						if($(indexEntry).attr("is_cust_search")==0 && $(indexEntry3).attr("is_not_applicable") == 0){
							score.push(parseFloat($(indexEntry3).val()));
							full_score.push(parseFloat($(indexEntry3).attr("full_score")));
						}
						//console.log("Bf total_score :"+parseFloat(total_score +$(indexEntry3).val()).toFixed(1));
						detail.push({
							section_id			: detail_group.section_id,
							customer_id			: detail_group.customer_id,
							question_id			: detail_group.question_id,
							answer_id			: $(indexEntry3).attr("answer_id"),
							full_score			: $(indexEntry3).attr("full_score"),
							score				: $(indexEntry3).val(),
							is_not_applicable	: $(indexEntry3).attr("is_not_applicable"),
							desc_answer			: $(indexEntry2).find("textarea").val()
						});
					});
				}
				
				
				
				
			}else if($(indexEntry2).attr("answer_type_id") == "4" || $(indexEntry2).attr("answer_type_id") == "5"){


				if($(indexEntry).attr("is_cust_search")==1 && detail_group.customer_id == ""){}
				else{
					
					//score.push(parseFloat($(indexEntry2).find("option:selected").val()));
					if($(indexEntry).attr("is_cust_search")==0 && $(indexEntry2).find("option:selected").attr("is_not_applicable") == 0){
						score.push(parseFloat($(indexEntry2).find("option:selected").val()));
						full_score.push(parseFloat($(indexEntry2).find("option:selected").attr("full_score")));
					}
					detail.push({
							section_id			: detail_group.section_id,
							customer_id			: detail_group.customer_id,
							question_id			: detail_group.question_id,
							answer_id			: $(indexEntry2).find("option:selected").attr("answer_id"),
							full_score			: $(indexEntry2).find("option:selected").attr("full_score"),
							score				: $(indexEntry2).find("option:selected").val(),
							is_not_applicable	: $(indexEntry2).find("option:selected").attr("is_not_applicable"),
							desc_answer			: $(indexEntry2).find("textarea").val()
						});
				}
				
				

			}else{
				if($(indexEntry).attr("is_cust_search")==1 && detail_group.customer_id == ""){}
				else{
					$.each($(indexEntry2).find("textarea").get(),function(index3,indexEntry3){
						//score.push(parseFloat($(indexEntry3).attr("score")));
						detail.push({
							section_id			: detail_group.section_id,
							customer_id			: detail_group.customer_id,
							question_id			: detail_group.question_id,
							answer_id			: $(indexEntry3).attr("answer_id"),
							full_score			: $(indexEntry3).attr("full_score"),
							score				: $(indexEntry3).attr("score"),
							is_not_applicable	: $(indexEntry3).attr("is_not_applicable"),
							desc_answer			: $(indexEntry3).val()
						});
					});
				}
			}
			
		
			
		});

	});


	$.each(score ,function(){total_score +=parseFloat(this) || 0; });
	$.each(full_score ,function(){total_full_score +=parseFloat(this) || 0; });
	
	console.log(detail);
	console.log("total full score" + total_full_score);
	console.log("total score" + total_score);
	$.ajax({
		
		url:globalSevice['restfulPathQuestionnaireData'],
		type : "POST",
		dataType : "json",
		data : {
			"questionaire_id": questionaire_id,
			"questionaire_date": questionaire_date,
			"emp_snapshot_id": emp_snapshot_id,
			"total_score": total_score,
			"full_score" : total_full_score,
			"detail": detail,
			"stage" :  stage
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			if (data['status'] == "200") {
				callFlashSlide("Insert Successfully.");
				$('#modalQuestionaireData').modal('hide');
				//getDataFn();
				clearFn();
			}else if (data['status'] == "400") {
				console.log(data);
				callFlashSlide("Failed to insert data.");
			}  
				   
				   
			
		}
	});








	 
	  
	  
};
var searchAdvanceFn = function (start_date,end_date,questionaire_type_id,emp_snapshot_id) {
	//embed parameter start
	var htmlParam="";
	htmlParam+="<input type='hidden' class='param_Embed' id='param_start_date' name='param_start_date' value='"+start_date+"'>";
	htmlParam+="<input type='hidden' class='param_Embed' id='param_end_date' name='param_end_date' value='"+end_date+"'>";
	htmlParam+="<input type='hidden' class='param_Embed' id='param_questionaire_type_id' name='param_questionaire_type_id' value='"+questionaire_type_id+"'>";
	htmlParam+="<input type='hidden' class='param_Embed' id='param_emp_snapshot_id' name='param_emp_snapshot_id' value='"+emp_snapshot_id+"'>";
	$(".param_Embed").remove();
	$("body").append(htmlParam);
	//console.log(start_date);console.log(end_date);console.log(questionaire_id);console.log(emp_snapshot_id);
	getDataFn();
	
};
 $(document).ready(function(){
	var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		if(connectionServiceFn(username,password,plid)==false){
	 		return false;
		}
		 
		$(".advance-search input").val("");
		$("#search_questionaire_type_id").html(generateDropDownList(globalSevice['restfulPathDropDownQuestionnaireList'],"GET",{}));
		$("#modal_questionaire_type_id").html(generateDropDownList(globalSevice['restfulPathDropDownQuestionnaireList'],"GET",{}," "));
		$("#modal_questionaire_type_id").change(function() {
			  
			  if($("#modal_questionaire_type_id").val() == ""){
				  $("#modalTitleRole").text("Questionnaire");
				  $("#accordionListQuestionaireData , #listDataStageHistory , #genBtnStage ").empty();
		        	$("#modal_empsnapshot_id").val("");
					$("#modal_position_code").val("");
					$("#modal_agent_name").val("");
		            $("#modal_assign_name").val("");
		            $("#modal_empsnapshot_name").val("");
		            $("#linkParam_emp_snapshot_id").val("");
		            $("#modal_questionaire_type_id").val("");
		            $("#id").val("");
			  }else{
				  getTemplateQuestionnaireFn();
			  }
			  //getTemplateQuestionnaireFn();
		});
		$("#modal_datepicker_start").datepicker({
			dateFormat: "dd/mm/yy",
            minDate: new Date(2018, 1 - 1, 1),
	        onSelect: function () {
	        	//alert("asdasdasd");
	        	$("#modalTitleRole").text("Questionnaire");
	        	$("#accordionListQuestionaireData").empty();
	        	$("#modal_empsnapshot_name").val("");
	        	$("#modal_empsnapshot_id").val("");
				$("#modal_position_code").val("");
				$("#modal_agent_name").val("");
	            $("#modal_assign_name").val("");
	            $("#modal_questionaire_type_id").val("");
	            $("#linkParam_emp_snapshot_id").val("");
	            
	            
	        }
		});
		 $("#search_datepicker_start").datepicker({
			 	dateFormat: "dd/mm/yy",
	            minDate: new Date(2018, 1 - 1, 1),
	            onSelect: function () {
	                var dt2 = $('#search_datepicker_end');
	                var startDate = $(this).datepicker('getDate');
	                var minDate = $(this).datepicker('getDate');
	                var dt2Date = dt2.datepicker('getDate');
	                //difference in days. 86400 seconds in day, 1000 ms in second
	                var dateDiff = (dt2Date - minDate)/(86400 * 1000);
	                
	                //startDate.setDate(startDate.getDate() + 30);
	                if (dt2Date == null || dateDiff < 0) {
	                		dt2.datepicker('setDate', minDate);
	                }
	                /*else if (dateDiff > 30){
	                		dt2.datepicker('setDate', null);
	                }*/
	                //sets dt2 maxDate to the last day of 30 days window
	                dt2.datepicker('option', 'maxDate', null);
	                dt2.datepicker('option', 'minDate', minDate);
	            }
	        });
	        $('#search_datepicker_end').datepicker({
	        	dateFormat: "dd/mm/yy",
	        	minDate: 0
	        });
	    
		
		toDayFn("#search_datepicker_start , #search_datepicker_end , #modal_datepicker_start");
		
		$("#search_datepicker_start ,#search_datepicker_end , #modal_datepicker_start").keypress(function(event) {
		    return ( ( event.keyCode || event.which ) === 9 ? true : false );
		});
		
		getRoleAuthorizeFn();
		$(".app_url_hidden").show();
		$("#btn-search").click(function(){
			
			searchAdvanceFn(
					$("#search_datepicker_start").val(),
					$("#search_datepicker_end").val(),
					$("#search_questionaire_type_id").val(),
					$("#search_empsnapshot_id").val()
					);
				
			$("#QuestionnaireData_list_content").show();
			
			return false;
		});
		$(".popover-edit-del").popover({
			delay : {
				hide : 100
			}
		});
		
		
		
		
		
		$("#btn-add").click(function() {
			clearFn();
			//findOneFn();
			$("#slideUpDownStageHistory").hide();
			$("#modalQuestionaireData").modal({
				"backdrop" : setModalPopup[0],
				"keyboard" : setModalPopup[1]
			});
			setModalContentBodyHeightFn();
		});
		$("#modalQuestionaireData .btnCancle").click(function() {
			$("#inform_label_confirm").html("You want to leave this <br>\""+$("#modalTitleRole ").text()+"\" ?");
			$("#confrimModal").modal({
				"backdrop" : setModalPopup[0],
				"keyboard" : setModalPopup[1]
			});
			$(document).off("click","#btnConfirmOK");
			$(document).on("click","#btnConfirmOK",function(){
				$("#confrimModal").modal('hide');
				$("#modalQuestionaireData").modal('hide');
				clearFn();
				
			});
			
			
		});

		$("#search_empsnapshot").autocomplete({
	        source: function (request, response) {
	        	$.ajax({
					 url:globalSevice['restfulPathAutocompleteEmployeeName'],
					 type:"get",
					 dataType:"json",
					 headers:{Authorization:"Bearer "+tokenID.token},
					 data:{
						 "emp_name" : request.term,
						 "start_date" : $("#search_datepicker_start").val(),
						 "end_date" :  $("#search_datepicker_end").val(),
						 "questionaire_type_id" : $("#search_questionaire_type_id").val(),
						 },
					 //async:false,
	                 error: function (xhr, textStatus, errorThrown) {
	                        console.log('Error: ' + xhr.responseText);
	                    },
					 success:function(data){
						  
							response($.map(data, function (item) {
	                            return {
	                            	label: item.emp_name+" ("+item.position_code+")",
	                                value: item.emp_name+" ("+item.position_code+")",
	                                data_id :item.emp_snapshot_id
	                            };
	                        }));
						
					},
					beforeSend:function(){
						$("body").mLoading('hide');	
					}
					
					});
	        },
			select:function(event, ui) {
				$("#search_empsnapshot").val(ui.item.value);
	            $("#search_empsnapshot_id").val(ui.item.data_id);
	            globalDataTemp['tempSearchEmpNameLabel'] = ui.item.value;
	            globalDataTemp['tempSearchEmpNameId']=ui.item.data_id;
	            return false;
	        },change: function(e, ui) {  
				if ($("#search_empsnapshot").val() == globalDataTemp['tempSearchEmpNameLabel']) {
					$("#search_empsnapshot_id").val(globalDataTemp['tempSearchEmpNameId']);
				} else if (ui.item != null) {
					$("#search_empsnapshot_id").val(ui.item.data_id);
				} else {
					$("#search_empsnapshot_id").val("");
				}
	        	
	         }
	    });
		
		$("#modal_empsnapshot_name").autocomplete({
	        source: function (request, response) {
	        	$.ajax({
					 url:globalSevice['restfulPathAutocompleteEmployeeName2'],
					 type:"get",
					 dataType:"json",
					 headers:{Authorization:"Bearer "+tokenID.token},
					 data:{
						 "emp_name":request.term,
						 //"date" : $("#modal_datepicker_start").val(),
						 "questionaire_type_id" : ($("#action").val() == "add" ? $("#modal_questionaire_type_id").val() : "")
						 },
					 //async:false,
	                 error: function (xhr, textStatus, errorThrown) {
	                        console.log('Error: ' + xhr.responseText);
	                    },
					 success:function(data){
						  
							response($.map(data, function (item) {
	                            return {
	                            	label: item.emp_name+" ("+item.position_code+")",
	                                value: item.emp_name+" ("+item.position_code+")",
	                                distributor_name : item.distributor_name,
	                                chief_emp_name : item.chief_emp_name,
	                                emp_name: item.emp_name,
	                                position_code: item.position_code,
	                                data_id :item.emp_snapshot_id
	                            };
	                        }));
						
					},
					beforeSend:function(){
						$("body").mLoading('hide');	
					}
					
					});
	        },
			select:function(event, ui) {
				$("#modal_empsnapshot_name").val(ui.item.value);
	            $("#modal_empsnapshot_id").val(ui.item.data_id);
	            $("#modal_position_code").val(ui.item.position_code);
	            $("#modal_agent_name").val(ui.item.distributor_name);
	            $("#modal_assign_name").val(ui.item.chief_emp_name);
	            $("#linkParam_emp_snapshot_id").val(ui.item.data_id);
	            
	            globalDataTemp['tempModalEmpNameLabel'] = ui.item.value;
	            globalDataTemp['tempModalEmpNameId']=ui.item.data_id;
	            globalDataTemp['tempModalPositionCode']=ui.item.position_code;
	            globalDataTemp['tempModalEmpNameAgenLabel']=ui.item.distributor_name;
	            globalDataTemp['tempModalEmpNameAssignLabel']=ui.item.chief_emp_name;
	            $("#modal_questionaire_type_id").val("");
	            //globalDataTemp['tempModalEmpName']=ui.item.emp_name;
	            //getTemplateQuestionnaireFn();
	            return false;
	        },change: function(e, ui) {  
	        	
				if ($("#modal_empsnapshot_name").val() == globalDataTemp['tempModalEmpNameLabel']) {
					/*
					$("#modal_empsnapshot_id").val(globalDataTemp['tempModalEmpNameId']);
					$("#modal_position_code").val(globalDataTemp['tempModalPositionCode']);
		            $("#modal_agent_name").val(globalDataTemp['tempModalEmpNameAgenLabel']);
		            $("#modal_assign_name").val(globalDataTemp['tempModalEmpNameAssignLabel']);
		            $("#linkParam_emp_snapshot_id").val(globalDataTemp['tempModalEmpNameId']);*/
				} else if (ui.item != null) {
					$("#modal_empsnapshot_id").val(ui.item.data_id);
					$("#modal_position_code").val(ui.item.position_code);
					$("#modal_agent_name").val(ui.item.distributor_name);
		            $("#modal_assign_name").val(ui.item.chief_emp_name);
		            $("#linkParam_emp_snapshot_id").val(ui.item.data_id);
		            $("#modal_questionaire_type_id").val("");
				} else {
					$("#modalTitleRole").text("Questionnaire");
		        	$("#accordionListQuestionaireData").empty();
		        	$("#modal_empsnapshot_id").val("");
					$("#modal_position_code").val("");
					$("#modal_agent_name").val("");
		            $("#modal_assign_name").val("");
		            $("#linkParam_emp_snapshot_id").val("");
		            $("#modal_questionaire_type_id").val("");
				}
	        	
	        	
	         }
	    });
		
		var URLParameter_header_id = getURLParameter('data_header_id');
		  var URLParameter_action = getURLParameter('action');
		  var URLParameter_action_modal = getURLParameter('action_modal');
		  
		  if(URLParameter_header_id!=undefined && URLParameter_action!=undefined && URLParameter_action_modal!=undefined) {
		   $("#id").val(URLParameter_header_id);
		   $("#action").val(URLParameter_action);
		   $("#action_modal").val(URLParameter_action_modal);// 1 แก้ไขได้  0 แก้ไขไม่ได้
		   findOneFn(URLParameter_header_id);
		  }
		
		  
	 }
 });
 
 
