var globalData="";
var globalSevice=[];
globalSevice['restfulPathQuestionnaireData']=restfulURL + "/" + serviceName + "/public/questionaire_data";
globalSevice['restfulPathDropDownQuestionnaireList']= globalSevice['restfulPathQuestionnaireData'] +"/list_questionaire";
globalSevice['restfulPathAutocompleteEmployeeName']= globalSevice['restfulPathQuestionnaireData']+ "/auto_emp";

globalSevice['restfulPathAssignTemplate']= globalSevice['restfulPathQuestionnaireData']+ "/assign_template";



restfulURL+"/"+serviceName+"/public/questionaire_data/auto_emp"
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
	  document.getElementById(id).value = today;
	  // document.getElementById("datepicker-end").value = today;

};
var getDataTemplateFn = function(data_header_id) {
	var questionaire_id = $("#param_questionaire_id").val();
	toDayFn('modal_datepicker_start');
	$.ajax({
		url: globalSevice['restfulPathAssignTemplate'],
		type:"get",
		dataType:"json",
		async:true,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{
			"questionaire_id": questionaire_id,
			"data_header_id": data_header_id
		},
		success:function(data){
			generateQuestionaireForm(data);
			
			/*
			 $.each(data,function(index,indexEntry){
 				if(firstItem == true){
 					html+="<option selected value="+indexEntry[Object.keys(indexEntry)[0]]+">"+indexEntry[Object.keys(indexEntry)[1] == undefined  ?  Object.keys(indexEntry)[0]:Object.keys(indexEntry)[1]]+"</option>";
 					firstItem=false;
 				}else{
 					html+="<option value="+indexEntry[Object.keys(indexEntry)[0]]+">"+indexEntry[Object.keys(indexEntry)[1] == undefined  ?  Object.keys(indexEntry)[0]:Object.keys(indexEntry)[1]]+"</option>";
 				}
 					
 			});
			  
			 */
			
			globalData=data;
			setThemeColorFn(tokenID.theme_color);
			$("#modalQuestionaireData").modal({
				"backdrop" : setModalPopup[0],
				"keyboard" : setModalPopup[1]
			});
		}
	});
}

var getDataFn = function(page,rpp){
	var start_date = $("#param_datepicker_start").val();
	var end_date= $("#param_datepicker_end").val();
	var questionaire_id= $("#param_questionaire_id").val();
	var emp_snapshot_id = $("#param_tse").val();

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/questionaire_data",
		type:"get",
		dataType:"json",
		async:true,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{
			"page":page,
			"rpp":rpp,
			"start_date":start_date,
			"end_date":end_date,
			"questionaire_id":questionaire_id,
			"emp_snapshot_id":emp_snapshot_id
		},
		success:function(data){
			$(".search_result").show();
			globalData = data;
			paginationSetUpFn(globalData['current_page'],globalData['last_page'],globalData['last_page']);
		}
	});
}

var generateQuestionaireForm = function(data) {
	console.log(data);
	var html = "";
	//section_id: 4, section_name: "FF Preparation Process", is_cust_search: 0, sub_section
	$.each(data['data'],function(index,indexEntry) {
		//console.log(indexEntry);
		html+="<h3 section_id='"+indexEntry.section_id+"'>"+indexEntry.section_name+"</h3>";
		html+="<div>";
		if( indexEntry.is_cust_search == 1){
			html+="<div class='row-fluid'>";
			html+="  <div class='span6'>";
			html+="    <button class='btn btn-success' id='add-store'>Add</button>";
			html+="    <button class='btn btn-info' onclick='listStore();'>Evaluated Retailer List</button>";
			html+="  </div>";
			html+="</div>";
		}

		$.each(indexEntry.sub_section,function(index2,indexEntry2) {
			if(indexEntry2.question != "" && indexEntry2.answer == ""){
				console.log("Sub Section"); 
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
						html+=generateAnswerFormRadioFn(indexEntry3);
					}else if(indexEntry3.answer_type_id == 3 || indexEntry3.answer_type_id == 4 ){
						html+=generateAnswerFormCheckboxesFn(indexEntry3);
					}else if(indexEntry3.answer_type_id == 5 || indexEntry3.answer_type_id == 6 ){
						html+=generateAnswerFormDropdownFn(indexEntry3);
					}else{
						console.log("Before Comment");
						html+=generateAnswerFormCommentFn(indexEntry3);
					}
					
					
				});
				
				html+="  </tbody>";
				html+="</table>";
				
				
				
				}else if(indexEntry2.question == "" && indexEntry2.answer != ""){
					
					
					
				}
				
				if((index2+1) != indexEntry.sub_section.length){
					html+="  <hr style='margin-top: 15px; margin-bottom: 15px;'>";
					
				}
			
			console.log("---------End sub_section----------");
		});
		html+="</div>";
		console.log("------------------------------------End section------------------------------------");
	});
	
	$("#accordionListQuestionaireData").html(html);
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
	$("#slideUpDownStageHistory").off("click");
	$("#slideUpDownStageHistory").on("click",function(){
        $("#slideStageHistory").slideToggle("slow");
    });
	
	/*
	var htmlTemplate = "";
	
	$.each(data['data'],function(index,indexEntry) {
		if(indexEntry['is_cust_search']==0) {
			htmlTemplate+="<div class=\"accordion\">";
		    htmlTemplate+="<div class=\"accordion-group\">";
		    htmlTemplate+="<div class=\"accordion-heading\">";
		    htmlTemplate+="<div class=\"accordion-toggle ibox-title\" data-toggle=\"collapse\" href=\"#collapse"+indexEntry['section_id']+"\" style=\"padding: 5px 10px 0px;\">";
		    htmlTemplate+=""+indexEntry['section_name']+"";
		    htmlTemplate+="</div>";
		    htmlTemplate+="</div>";
		    htmlTemplate+="<div id=\"collapse"+indexEntry['section_id']+"\" class=\"accordion-body collapse\">";
		    htmlTemplate+="<div class=\"accordion-inner ibox-content\">";
		    $.each(indexEntry['sub_section'],function(index2,indexEntry2) {
		    	if(indexEntry2['question'].length>0) {

		    	} else {
			    	htmlTemplate+="<div class=\"table-responsive\" style='overflow:auto;'>";
			    	htmlTemplate+="<table class=\"table table-striped\" style=\"max-width: none\">";
				 	htmlTemplate+="<thead><tr>";
				 	htmlTemplate+="<th style=\"width: 20%; vertical-align: top !important;\">"+indexEntry2['question_name']+"</th>";
				 	htmlTemplate+=generateAnswerForm(indexEntry2['answer_type_id'],indexEntry2['answer']);
				 	htmlTemplate+="</tr></thead>";
				 	htmlTemplate+="</div>";
		    	}
		    });
		    htmlTemplate+="</div>";
		    htmlTemplate+="</div>";
		    htmlTemplate+="</div>";
		    htmlTemplate+="</div>";
		} else {
			
		}
	});
	$("#listQuestionaireData").html(htmlTemplate);*/
}
var generateAnswerFormRadioFn = function(data) {
	//console.log(" ----  Form Radio -----");
	//console.log(data);

	html="";
	
	html+="    <tr question_id='"+data.question_id+"'>";
	html+="      <td class=''><p>"+data.question_name+"</p>";
	html+="      <div class='row-fluid'>";
	html+="        <div class='"+(data.answer_type_id == 1 ? "span12" : "span3")+"'>";
	$.each(data.answer,function(index,indexEntry) {

		html+="        <label class='radio inline' style='padding-bottom: 5px; margin-bottom: 10px;margin-left: 10px;'>";
		html+="          <input style='margin-top: 2px;' class='radioAnswer' type='radio' name='optionsRadios-"+data.question_id+"' id='optionsRadios-"+indexEntry.score+"' value='"+indexEntry.answer_id+"' is_not_applicable='"+indexEntry.is_not_applicable+"'> "+indexEntry.answer_name+"";
		html+="        </label>";

	});
	html+="        </div>";
	html+="        <div class='span9' style='display:"+(data.answer_type_id == 1 ? "none" : "block")+"'> ";
	html+="          <textarea class='form-control' rows='2' id='comment-"+data.question_id+"' style='width:98%; margin-bottom: 0px;min-height:60px; resize: vertical;'></textarea>";
	html+="        </div>";
	html+="      </td>";
	html+="    </tr>";
	//console.log("Return : "+html);
	return html;
};
var generateAnswerFormCheckboxesFn = function(data) {
	//console.log(" ----  Form Checkboxes -----");
	html="";

	html+="    <tr question_id='"+data.question_id+"'>";
	html+="      <td class=''><p>"+data.question_name+"</p>";
	html+="      <div class='row-fluid'>";
	html+="        <div class='"+(data.answer_type_id == 1 ? "span12" : "span3")+"'>";
	$.each(data.answer,function(index,indexEntry) {

		html+="        <label class='radio inline' style='padding-bottom: 5px; margin-bottom: 10px;margin-left: 10px;padding-left: 0px;'>";
		html+="          <input style='margin-top: 2px;margin-top: -2px;' class='checkboxAnswer' type='checkbox' name='optionsRadios-"+data.question_id+"' id='optionsRadios-"+indexEntry.score+"' value='"+indexEntry.answer_id+"' is_not_applicable='"+indexEntry.is_not_applicable+"'> "+indexEntry.answer_name+"";
		html+="        </label>";

	});
	html+="        </div>";
	html+="        <div class='span9' style='display:"+(data.answer_type_id == 1 ? "none" : "block")+"'> ";
	html+="          <textarea class='form-control' rows='2' id='comment-"+data.question_id+"' style='width:98%; margin-bottom: 0px;min-height:60px; resize: vertical;'></textarea>";
	html+="        </div>";
	html+="      </td>";
	html+="    </tr>";
	return html;
};
var generateAnswerFormDropdownFn = function(data) {
	console.log(" ----  Form Dropdown -----");
	console.log(data);
	
	//answer: Array [ {…}, {…} ],answer_type_id: 2,parent_question_id: 4,question_id: 5,​​​​​is_show_comment:0,question_name: "1.1 จำนวนและรายการสินค้าบนรถ / ความพร้อมรถ"
	 
	
	html="";
	
	html+="    <tr question_id='"+data.question_id+"'>";
	html+="      <td class='col1'><p>"+data.question_name+"</p>";
	html+="        <textarea class='form-control' rows='1' id='comment-"+data.question_id+"' style='width:94.5%; margin-bottom: 0px; resize: vertical;display:"+(data.is_show_comment == 5 ? "none;" : "block;")+"'></textarea>";
	html+="      </td>";
	html+="      <td class='col2'>";
	html+="        <div align='center'>";
	html+="         <select class='span2 sel'>";
	$.each(data.answer,function(index,indexEntry) {
		//answer_id: 149 ,answer_name: "Yes" ,is_not_applicable: 0, row_name: "Yes" ,score: "1.0"
		html+="            <option value='"+indexEntry.score+"' answer_id='"+indexEntry.answer_id+"' is_not_applicable='"+indexEntry.is_not_applicable+"'>"+indexEntry.answer_name+"</option>";

	});
	html+="          </select>";
	html+="          <div>";
	html+="      </td>";
	html+="    </tr>";
	return html;
};
var generateAnswerFormCommentFn = function(data) {
	console.log(" ----  Comment Data -----");
	console.log(data);
	html="";

	html+="    <tr question_id='"+data.question_id+"'>";
	html+="      <td class='' colspan='2'><p>"+data.question_name+"</p>";

	$.each(data.answer,function(index,indexEntry) {
		//answer_id: 149 ,answer_name: "Yes" ,is_not_applicable: 0, row_name: "Yes" ,score: "1.0"
		html+="      <p>"+indexEntry.answer_name+"</p>";
		html+="       	<textarea class='form-control' rows='5' id='comment-"+data.question_id+"' style='width:98%; margin-bottom: 0px; resize: vertical;' answer_id='"+indexEntry.answer_id+"' is_not_applicable='"+indexEntry.is_not_applicable+"' score='"+indexEntry.score+"'></textarea>";

		if((index+1) != data.answer.length){
			html+="  <hr style='margin-top: 15px; margin-bottom: 15px;'>";
		}
	});
	
	
	html+="      </td>";
	
	html+="    </tr>";

	return html;
	
};
var generateAnswerForm = function(answer_type_id,answer) {
	var answerTemplate = "";
	
	if(answer_type_id==1) {
		//Radio Choice No Comment
	} else if(answer_type_id==2) {
		//Radio Choice With Comment
			
	} else if(answer_type_id==3) {
		//Checkboxes Choice No Comment
			
	} else if(answer_type_id==4) {
		//Checkboxes Choice With Comment
			
	} else if(answer_type_id==5) {
		answerTemplate+="<th style=\"width: 60%\">";
		answerTemplate+="</th>";
		answerTemplate+="<th style=\"width: 20%\">";
		answerTemplate+="<select id=\"\" name=\"\">";
		$.each(answer,function(index,indexEntry) {
			answerTemplate+="<option value="+indexEntry['score']+">"+indexEntry['answer_name']+"</option>";
	    });
		answerTemplate+="</select>";
		answerTemplate+="</th>";
	} else if(answer_type_id==6) {
		answerTemplate+="<th style=\"width: 60%\"><input id=\"\" type=\"text\" placeholder=\"Comment\">";
		answerTemplate+="</th>";
		answerTemplate+="<th style=\"width: 20%\">";
		answerTemplate+="<select id=\"\" name=\"\">";
		$.each(answer,function(index,indexEntry) {
			answerTemplate+="<option value="+indexEntry['score']+">"+indexEntry['answer_name']+"</option>";
	    });
		answerTemplate+="</select>";
		answerTemplate+="</th>";
	} else {
		answerTemplate+="<th style=\"width: 80%\">";
		answerTemplate+="<textarea rows=\"5\" id=\"\" style=\"width:100%;\"></textarea>";
		answerTemplate+="</th>";
	}
	
	return answerTemplate;
}

 $(document).ready(function(){
	var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		if(connectionServiceFn(username,password,plid)==false){
	 		return false;
		}
		 
		$(".advance-search input").val("");
		$("#param_questionaire_id").html(generateDropDownList(globalSevice['restfulPathDropDownQuestionnaireList'],"GET",{}));
		$("#param_datepicker_start,#param_datepicker_end,#modal_datepicker_start").datepicker({
			dateFormat: "yy/mm/dd"
		});
	 	
		$(".app_url_hidden").show();
		
		$(".popover-edit-del").popover({
			delay : {
				hide : 100
			}
		});
		
		
		
		$("#btn-search").click(function() {
			getDataFn();
		});
		
		$("#btn-add").click(function() {
			getDataTemplateFn();
		});
		
		 $("#param_tse").autocomplete({
		        source: function (request, response) {
		        	$.ajax({
						 url:globalSevice['restfulPathAutocompleteEmployeeName'],
						 type:"get",
						 dataType:"json",
						 headers:{Authorization:"Bearer "+tokenID.token},
						 data:{
							 "emp_name":request.term,
							 },
		                 error: function (xhr, textStatus, errorThrown) {
		                        console.log('Error: ' + xhr.responseText);
		                    },
						 success:function(data){
								response($.map(data, function (item) {
		                            return {
		                                label: item.emp_snapshot_id+"-"+item.emp_name,
		                                value: item.emp_snapshot_id+"-"+item.emp_name
		                            };
		                        }));
						},
						beforeSend:function(){
							$("body").mLoading('hide');
						}

						});
		        }
		 });
		 
		 $("#modal_tse_name").autocomplete({
		        source: function (request, response) {
		        	$.ajax({
						 url:globalSevice['restfulPathAutocompleteEmployeeName'],
						 type:"get",
						 dataType:"json",
						 headers:{Authorization:"Bearer "+tokenID.token},
						 data:{
							 "emp_name":request.term,
							 },
		                 error: function (xhr, textStatus, errorThrown) {
		                        console.log('Error: ' + xhr.responseText);
		                    },
						 success:function(data){
								response($.map(data, function (item) {
		                            return {
		                                label: item.emp_snapshot_id+"-"+item.emp_name,
		                                value: item.emp_snapshot_id+"-"+item.emp_name,
		                                distributor_name : item.distributor_name,
		                                chief_emp_name : item.chief_emp_name,
		                                position_code : item.position_code
		                            };
		                        }));
						},
						beforeSend:function(){
							$("body").mLoading('hide');
						}

						});
		        },
				select:function(event, ui) {
					$("#modal_agent_name").val(ui.item.distributor_name);
		            $("#modal_assign_name").val(ui.item.chief_emp_name);
		            return false;
		        }
		 });
	 }
 });