//-------- Update Criteria Start
var options=[];
var scriptCheckboxCheckIsActiveOnlyOneFn  = function (){
	$("#listAuthQuestionnaireType .checkboxIsActive").off("click");
	$("#listAuthQuestionnaireType .checkboxIsActive").on("click",function(){
		$(this).parent().parent().parent().find('.checkboxIsActive').prop('checked', false);
		$(this).prop('checked', true);
	});
	
};
var insertAuthorizedQuestionaireFn = function () {
	var data =[];
	var id = $("#authorized_questionaire_type_id").val();

	$('#listAuthQuestionnaireType').children('div').get()
	$.each($('#listAuthQuestionnaireType').children('div').get(),function(index, indexEntry) {
		if($(indexEntry).find("input:checked").attr("questionaire_id") != undefined){
			data.push({
			"job_function_id": ""+$(indexEntry).attr("job_function_id")+"",
			"questionaire_id": ""+$(indexEntry).find("input:checked").attr("questionaire_id")+""
		   });
		};
	});
	

		$.ajax({
			url:restfulURL+"/"+serviceName+"/public/questionaire_type/manage/"+id,
			type : "PATCH",
			dataType : "json",
			headers:{Authorization:"Bearer "+tokenID.token},
			async:false,
			data:{"data":data},
			success : function(data) {
				if(data['status']==200){
					callFlashSlide("Update Questionaire Authorized Successfully.");
					
					getDataFn('','',options);
					
					$('#addModalAuthorized').modal('hide');
					
				}else if (data['status'] == "400") {
					
					var validate = "<font color='red'>* </font>" + data['data'] + "";
					//alert(validate);
					callFlashSlideInModal(validate,"#information2","error");
					
				} 
			}
		});
	
	return false;
}

var listAuthQuestionnaireTypeFn = function(id){
	$("#listAuthQuestionnaireType").empty();
	$.ajax({ 
		url:restfulURL+"/"+serviceName+"/public/questionaire_type/manage/"+id,
		type : "get",
		dataType : "json",
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {

			$("#form_auth_questionnaire_type").text(data.head.questionaire_type);
			var html = "";
			$.each(data.data,function(index,indexEntry) { 
				html+="<h3 >"+indexEntry.job_function_name+"</h3>"
				html+="<div job_function_id='"+indexEntry.job_function_id+"'>";
				html+="	<div class='table-responsive'>";
				html+="		<table class='table table-striped' id='formTableAppraisalLevel'>";
				html+="			<thead>";
				html+="				<tr>";
				html+="					<th style='width: auto;'>Select</th>";
				html+="					<th style='width: 80%'>Questionaire Name</th>";
				html+="				</tr>";
				html+="			</thead>";
				html+="			<tbody >";
				console.log(indexEntry);
				console.log(indexEntry.questionaire);
				$.each(indexEntry.questionaire,function(index2,indexEntry2) {
					/*
					 	"questionaire_id": "",
          				"questionaire_name": "",
          				"is_check": ""
					 */
					html+="<tr>";
					html+="	<td><input style='margin-bottom: 2px;' id='form_role_item-1' "+(indexEntry2.is_check == 1 ? "checked":"")+"";
					html+="		class='checkboxIsActive' type='checkbox' value='' questionaire_id='"+indexEntry2.questionaire_id+"'></td> ";
					html+="	<td style='vertical-align: middle'>"+indexEntry2.questionaire_name+"</td>";
					html+="</tr>";
				});
				html+="			</tbody>";
				html+="		</table>";
				html+="	</div>";
				html+="</div>";
			});
			$("#listAuthQuestionnaireType").html(html);
			scriptCheckboxCheckIsActiveOnlyOneFn();
			if(typeof $("#listAuthQuestionnaireType").data("ui-accordion") != "undefined"){
				$("#listAuthQuestionnaireType").accordion("destroy").accordion({
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
				$("#listAuthQuestionnaireType").accordion({
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
			
			$("#addModalAuthorized").modal({
	 			"backdrop" : setModalPopup[0],
				"keyboard" : setModalPopup[1]
	 		});
								
		}
	});
};
$(document).ready(function(){
        	//alert(createTableFn());
	
	
	 var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		 if(connectionServiceFn(username,password,plid)==true){
	 		
	 	
			 		options={
		 			"colunms":[
		 			           {"colunmsDisplayName":"Questionaire Type","width":"","id":"questionaire_type","colunmsType":"text"}
		 			          ],	 	    			
		 			"form":[
		 	    				{
								"label":"Questionaire Type","inputType":"text","placeholder":"Questionaire Type",
								"id":"questionaire_type","width":"250px","dataTypeInput":"text","required":true,
								}
		 	    				
		 	    					
		 	    			],
		 	    			
		 	    			
		 			 "formDetail":{"formSize":"modal-dialog","formName":"Questionaire Type","id":"questionaireTypeForm","pk_id":"questionaire_type_id"},       
		 			 "serviceName":[restfulURL+"/"+serviceName+"/public/questionaire_type"],
		 			 "tokenID":tokenID,
		 			 "pagignation":false,
		 			 "expressSearch":false,
		 			 "advanceSearchSet":false,
		 			 "btnManageOption":{"id":"addModalAuthorized","name":"Authorized"}
		 	}
		 	//console.log(options['tokenID'].token);
		 	createDataTableFn(options);
		 	
		 	 
		 	//alert("helo");
		 	$(document).on('click','.addModalAuthorized',function(){
		 		
		 		var id = this.id.split("-");
		 		id=id[1];
		 		$("#authorized_questionaire_type_id").val(id);

		 		//$("#ac_appraisal_level_name").html("<b>"+$(this).parent().parent().parent().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().text()+"</b>");
		 		listAuthQuestionnaireTypeFn(id);
		 		
		 		
		 		$("#btnAuthQuestionnaireSubmit").off("click");
		 		$("#btnAuthQuestionnaireSubmit").on("click",function(){
		 			$(".btnModalClose").click();
		 			insertAuthorizedQuestionaireFn();
		 			
		 		});
		 		 			
		 	});
 	
	 	}
	 }
 	
 	});
