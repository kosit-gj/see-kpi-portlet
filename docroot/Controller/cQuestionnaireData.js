var globalData="";
var globalDataTemp=[];
var globalSevice=[];
globalSevice['restfulPathQuestionnaireData']=restfulURL + "/" + serviceName + "/public/questionaire_data";
globalSevice['restfulPathDropDownQuestionnaireList']= globalSevice['restfulPathQuestionnaireData'] +"/list_questionaire";
globalSevice['restfulPathAutocompleteEmployeeName']= globalSevice['restfulPathQuestionnaireData']+ "/auto_emp";

globalSevice['restfulPathAssignTemplate']= globalSevice['restfulPathQuestionnaireData']+ "/assign_template";
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
var scriptBtnAddStoreFn = function (){
	$(".btnAddStore").off("click");
	$(".btnAddStore").on("click" ,function(){
		console.log($(this).parent().parent().next().next());
		if($("#modal_datepicker_start").val() == "" || $("#modal_empsnapshot_id").val() ==""){
			callFlashSlideInModal("กรุณาเลือกวันที่ และชื่อ/รหัส พนักงานขาย");
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
			callFlashSlideInModal("กรุณาเลือกวันที่ และชื่อ/รหัส พนักงานขาย");
			return false;
		}
		var element = $(this).parent().parent().next().next();
		var section_id = element.attr("section_id");
		var position_code = $("#modal_position_code").val();
		var data_header_id = $("#id").val();
		var date = $("#datepicker-modal").val();
		var html ="";
		html+="  <div class='panel-heading' style='vertical-align: top; '>ผลการทำงาน ณ วันที่ "+date+"</div>";
		html+="  <div class='panel-body'>";
		html+="    <table class='table table-bordered table-hover customers'>";
		html+="      <thead>";
		html+="        <tr><th style='width:50%; vertical-align: top; text-align: center'>ชื่อร้าน</th>";
		html+="        <th style='width:10%; vertical-align: top; text-align:center;'>คะแนนรวม</th>";
		html+="        <th style='width:40%'></th>";
		html+="      </tr></thead>";
		html+="      <tbody >";
		
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

				
				$.each(data,function(index,indexEntry){
					html+="<tr >";
					html+="	<td >"+indexEntry.customer_name+"</td>";
					html+="	<td style='text-align: right;' >"+indexEntry.score+"</td>";
					html+="	<td><div align='center'>";
					html+="			&nbsp;";
					html+="			<button style='width: 65px; margin-bottom: 3px;'";
					html+="				class='btn btn-small btn-warning' data_header_id='"+indexEntry.data_header_id+"' customer_id='"+indexEntry.customer_id+"' section_id='"+indexEntry.section_id+"' ";
					html+="				onclick='btnEditStoreFn(this);'>Edit</button>";
					html+="			&nbsp;";
					html+="			<button style='width: 65px; margin-bottom: 3px;'";
					html+="				class='btn btn-small btn-danger' ";
					html+="				onclick='btnDelStoreFn(this);' data_header_id='"+indexEntry.data_header_id+"' customer_id='"+indexEntry.customer_id+"' section_id='"+indexEntry.section_id+"'>Delete</button>";
					html+="		</div></td>";
					html+="</tr>";
				});
				
				$(this).parent().parent().next().next().hide();
				
				$(this).parent().parent().next().show();
			}
		});
		html+="		 </tbody>";
		html+="		</table>";
		html+="  </div>";
		element.html(html);
		

	});
};
var scriptBtnClearAddStoreFn  = function (){
	$(".closePanalScore").off("click");
	$(".closePanalScore").on("click" ,function(){
		
		
		$(this).parent().parent().hide();
		$(this).parent().parent().find('select option:eq(0)').prop('selected', true);
		$(this).parent().parent().find('input[type="radio"]').attr('checked', false);
		$(this).parent().parent().find('input[type="checkbox"]').attr('checked', false);
		$(this).parent().parent().find('textarea').val("");

	});
};
var scriptViewReportFn  = function (){
	$(".viewReport").off("click");
	$(".viewReport").on("click" ,function(event){
		event.stopPropagation();
		event.preventDefault();

		$("form#linkParam").attr("action", $(this).attr("url"));
//		$("form#linkParam").submit();
	});
};
var btnEditStoreFn = function (element){
	console.log(element);
}
var btnDelStoreFn = function (element){
	console.log(element);
}
var getDataTemplateFn = function(data_header_id) {
	var questionaire_id = $("#param_questionaire_id").val();
	$("#modalTitleRole").html($("#param_questionaire_id :selected").text());
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
			var dropdownCurrentStageHTML="";
			var dropdownToStageHTML="";
			generateQuestionaireForm(data);
			generateStageFn(data.stage,data.current_stage,data.to_stage);
			
			   
			
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
	var emp_snapshot_id = $("#param_empsnapshot").val();

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
		html+="<h3 section_id='"+indexEntry.section_id+"'>"+indexEntry.section_name;
		if(indexEntry.is_show_report == 1){
			html+="<span class='viewReport' url='"+indexEntry.report_url+"' questionaire_type_id='"+data['data'].questionaire_type_id+"'><img src='"+$("#url_portlet").val()+"/img/report.svg' data-toggle='tooltip' data-original-title='View Report' style='width: 30px;float: right;margin-top: -2px;'></span>";
		}
		html+="</h3>";
		html+="<div is_cust_search='"+indexEntry.is_cust_search+"'>";
		if( indexEntry.is_cust_search == 1){
			html+="<div class='row-fluid' style='margin-bottom: 10px;'>";
			html+="  <div class='span6'>";
			html+="    <button class='btn btn-success btnAddStore' id='btnAddStore-"+indexEntry.section_id+"' section_id='"+indexEntry.section_id+"'>Add</button>";
			html+="    <button class='btn btn-info btnListStore' id='btnListStore-"+indexEntry.section_id+"' section_id='"+indexEntry.section_id+"'>Evaluated Retailer List</button>";
			html+="  </div>";
			html+="</div>";
			
			html+="<div class='panel panel-info ' id='panalList-"+indexEntry.section_id+"' section_id='"+indexEntry.section_id+"' style='padding-bottom: 15px;display: none;'></div>";
			html+="<div class='panel panel-info panalScore' id='panalScore-"+indexEntry.section_id+"' style='padding-bottom: 15px; display: none;' section_id='"+indexEntry.section_id+"'> ";
			html+="  <div class='panel-heading'> ประเมินผลการทำงานของร้านค้า";
			html+="    <button type='button' class='closePanalScore'>×</button>";
			html+="  </div>";
			html+="  <div class='panel-body'>";
			html+="    <div class='row-fluid'>";
			html+="      <div class='span6'>";
			html+="        <label for='storeName-modal'>ชื่อร้านค้า</label>";
			html+="        <input class='span12 ' type='text' style='margin-bottom: 0px;' id='storeName-modal' data-toggle='tooltip' title='' data-original-title='Search' >";
			html+="      </div>";
			html+="    </div>";
			html+="    <br>";
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
						html+=generateAnswerFormRadioFn(indexEntry3,"Sub Section");
					}else if(indexEntry3.answer_type_id == 3 || indexEntry3.answer_type_id == 4 ){
						html+=generateAnswerFormCheckboxesFn(indexEntry3,"Sub Section");
					}else if(indexEntry3.answer_type_id == 5 || indexEntry3.answer_type_id == 6 ){
						html+=generateAnswerFormDropdownFn(indexEntry3,"Sub Section");
					}else{
						console.log("Before Comment");
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
						console.log("Before Comment");
						html+=generateAnswerFormCommentFn(indexEntry2,"Question");
					}
						
						
					
					
					
				}
				
				if((index2+1) != indexEntry.sub_section.length){
					html+="  <hr style='margin-top: 15px; margin-bottom: 15px;'>";
					
				}
			
			console.log("---------End sub_section----------");
		});
		
		if( indexEntry.is_cust_search == 1){
			html+="    </div>";
			html+="</div>";
		}
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
	scriptBtnClearAddStoreFn();  
	scriptBtnListStoreFn();  
	scriptBtnAddStoreFn();
	$('[data-toggle="tooltip"]').css({"cursor":"pointer"});
	 $('[data-toggle="tooltip"]').tooltip({
		 html:true,container: '#modalQuestionaireData'
	 });
}
var generateStageFn = function(stage,current_stage,to_stage) {
	var dropdownCurrentStageHTML="";
	var dropdownToStageHTML="";
	var TableStageHTML="";
	$.each(stage,function(index,indexEntry){
	
		TableStageHTML+="<tr >";
		TableStageHTML+="	<td>"+indexEntry['created_by']+"</td>";
		TableStageHTML+="	<td>"+indexEntry['created_dttm']+"</td>";
		TableStageHTML+="	<td>"+indexEntry['from_action']+"</td>";
		TableStageHTML+="	<td>"+indexEntry['to_action']+"</td>";
		TableStageHTML+="	<td>"+notNullTextFn(indexEntry['remark'])+"</td>";
		TableStageHTML+="</tr>";

	});
	
	$.each(current_stage,function(index,indexEntry){	
		 dropdownCurrentStageHTML+="<option value="+indexEntry[Object.keys(indexEntry)[0]]+">"+indexEntry[Object.keys(indexEntry)[1] == undefined  ?  Object.keys(indexEntry)[0]:Object.keys(indexEntry)[1]]+"</option>";	
	});

	
	$.each(to_stage,function(index,indexEntry){
		dropdownToStageHTML+="<option value="+indexEntry[Object.keys(indexEntry)[0]]+">"+indexEntry[Object.keys(indexEntry)[1] == undefined  ?  Object.keys(indexEntry)[0]:Object.keys(indexEntry)[1]]+"</option>";		
	});
	$("#modal_from_stage").html(dropdownCurrentStageHTML);  
	$("#modal_to_stage").html(dropdownToStageHTML); 
	$("#listDataStageHistory").html(TableStageHTML);
	//$("#slideUpDownStageHistory").show();
};
var generateAnswerFormRadioFn = function(data,question_type ) {
	//console.log(" ----  Form Radio -----");
	//console.log(data);

	var html="";
	if(question_type == "Sub Section"){
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
	
	}else if(question_type == "Question"){

		
		
		html+="<table class='table table-striped table-bordered ' id='tableRadioQuestion-"+data.question_id+"' question_id='"+data.question_id+"'>";
		html+="  <thead>";
		html+="    <tr>";
		html+="      <th class='' colspan='2' style='vertical-align: top;'>"+data.question_name+"</th>";
		//html+="      <th class='' style='vertical-align: top; text-align: center;'>คะแนน</th>";
		html+="    </tr>";
		html+="  </thead>";
		html+="  <tbody>";
		html+="    <tr>";
		html+="      <td>";
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
	html+="    <tr question_id='"+data.question_id+"'>";
	html+="      <td class=''><p>"+data.question_name+"</p>";
	html+="      <div class='row-fluid'>";
	html+="        <div class='"+(data.answer_type_id == 3 ? "span12" : "span3")+"'>";
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
	}else if(question_type == "Question"){

		
		
		html+="<table class='table table-striped table-bordered ' id='tableRadioQuestion-"+data.question_id+"' question_id='"+data.question_id+"'>";
		html+="  <thead>";
		html+="    <tr>";
		html+="      <th class='' colspan='2' style='vertical-align: top;'>"+data.question_name+"</th>";
		//html+="      <th class='' style='vertical-align: top; text-align: center;'>คะแนน</th>";
		html+="    </tr>";
		html+="  </thead>";
		html+="  <tbody>";
		html+="    <tr>";
		html+="      <td>";
		html+="      <div class='row-fluid'>";
		html+="        <div class='"+(data.answer_type_id == 3 ? "span12" : "span3")+"'>";
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
		html+="  </tbody>";
		html+="</table>";
	}
	return html;
};
var generateAnswerFormDropdownFn = function(data,question_type) {
	console.log(" ----  Form Dropdown -----");
	console.log(data);
	
	//answer: Array [ {…}, {…} ],answer_type_id: 2,parent_question_id: 4,question_id: 5,​​​​​is_show_comment:0,question_name: "1.1 จำนวนและรายการสินค้าบนรถ / ความพร้อมรถ"
	 
	
	var html="";
	if(question_type == "Sub Section"){
		html+="    <tr question_id='"+data.question_id+"'>";
		html+="      <td class='col1'><p>"+data.question_name+"</p>";
		html+="        <textarea class='form-control' rows='1' id='comment-"+data.question_id+"' style='width:94.5%; margin-bottom: 0px; resize: vertical;display:"+(data.answer_type_id == 5 ? "none;" : "block;")+"'></textarea>";
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
	}else if(question_type == "Question"){

		html+="<table class='table table-striped table-bordered ' id='tableDropdownQuestion-"+data.question_id+"' question_id='"+data.question_id+"'>";
		html+="  <thead>";
		html+="    <tr>";
		html+="      <th class='' colspan='2' style='vertical-align: top;'>"+data.question_name+"</th>";
		html+="    </tr>";
		html+="  </thead>";
		html+="  <tbody>";
		html+="    <tr question_id='"+data.question_id+"'>";//style='display:"+(data.answer_type_id == 1 ? "none" : "block")+"'
		html+="      <td class='col1'><p>คะแนน</p>";
		html+="        <textarea class='form-control' rows='1' id='comment-"+data.question_id+"' style='width:94.5%; margin-bottom: 0px; resize: vertical;display:"+(data.answer_type_id == 5 ? "none;" : "block;")+"'></textarea>";
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
		html+="  </tbody>";
		html+="</table>";
	}
	return html;
};
var generateAnswerFormCommentFn = function(data,question_type) {
	console.log(" ----  Comment Data -----");
	console.log(data);
	var html="";
	if(question_type == "Sub Section"){
		html+="    <tr question_id='"+data.question_id+"'>";
		html+="      <td class='' colspan='2'><p>"+data.question_name+"</p>";
		$.each(data.answer,function(index,indexEntry) {
			//answer_id: 149 ,answer_name: "Yes" ,is_not_applicable: 0, row_name: "Yes" ,score: "1.0"
			html+="      <p>"+indexEntry.answer_name+"</p>";
			html+="       	<textarea class='form-control' rows='5' id='comment-"+data.question_id+"' style='width:96%; margin-bottom: 0px; resize: vertical;' answer_id='"+indexEntry.answer_id+"' is_not_applicable='"+indexEntry.is_not_applicable+"' score='"+indexEntry.score+"'></textarea>";
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
		html+="    <tr>";
		html+="      <td>";
		$.each(data.answer,function(index,indexEntry) {
			console.log(index);
			html+="      <p>"+indexEntry.answer_name+"</p>";
			html+="       	<textarea class='form-control' rows='5' id='comment-"+data.question_id+"' style='width:96%; margin-bottom: 10px; resize: vertical;' answer_id='"+indexEntry.answer_id+"' is_not_applicable='"+indexEntry.is_not_applicable+"' score='"+indexEntry.score+"'></textarea>";
	
			
		});
		html+="      </td>";
		html+="    </tr>";
		html+="  </tbody>";
		html+="</table>";
	}
	

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
			dateFormat: "dd/mm/yy"
		});
		toDayFn("param_datepicker_start");
		
		toDayFn("param_datepicker_end");
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
		/*
		 globalDataTemp['tempSearchEmpNameLabel']="";
		globalDataTemp['tempSearchEmpNameId']="";
		 */
		$("#param_empsnapshot").autocomplete({
	        source: function (request, response) {
	        	$.ajax({
					 url:globalSevice['restfulPathAutocompleteEmployeeName'],
					 type:"get",
					 dataType:"json",
					 headers:{Authorization:"Bearer "+tokenID.token},
					 data:{
						 "emp_name":request.term
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
				$("#param_empsnapshot").val(ui.item.value);
	            $("#param_empsnapshot_id").val(ui.item.data_id);
	            globalDataTemp['tempSearchEmpNameLabel'] = ui.item.value;
	            globalDataTemp['tempSearchEmpNameId']=ui.item.data_id;
	            return false;
	        },change: function(e, ui) {  
				if ($("#param_empsnapshot").val() == globalDataTemp['tempSearchEmpNameLabel']) {
					$("#param_empsnapshot_id").val(globalDataTemp['tempSearchEmpNameId']);
				} else if (ui.item != null) {
					$("#param_empsnapshot_id").val(ui.item.data_id);
				} else {
					$("#param_empsnapshot_id").val("");
				}
	        	
	         }
	    });
		
		$("#modal_empsnapshot_name").autocomplete({
	        source: function (request, response) {
	        	$.ajax({
					 url:globalSevice['restfulPathAutocompleteEmployeeName'],
					 type:"get",
					 dataType:"json",
					 headers:{Authorization:"Bearer "+tokenID.token},
					 data:{
						 "emp_name":request.term
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
	            $("#linkParam_emp_name").val(ui.item.emp_name);
	            
	            globalDataTemp['tempModalEmpNameLabel'] = ui.item.value;
	            globalDataTemp['tempModalEmpNameId']=ui.item.data_id;
	            globalDataTemp['tempModalPositionCode']=ui.item.position_code;
	            globalDataTemp['tempModalEmpNameAgenLabel']=ui.item.distributor_name;
	            globalDataTemp['tempModalEmpNameAssignLabel']=ui.item.chief_emp_name;
	            globalDataTemp['tempModalEmpName']=ui.item.emp_name;
	            
	            return false;
	        },change: function(e, ui) {  
				if ($("#modal_empsnapshot_name").val() == globalDataTemp['tempModalEmpNameLabel']) {
					$("#modal_empsnapshot_id").val(globalDataTemp['tempModalEmpNameId']);
					$("#modal_position_code").val(globalDataTemp['tempModalPositionCode']);
		            $("#modal_agent_name").val(globalDataTemp['tempModalEmpNameAgenLabel']);
		            $("#modal_assign_name").val(globalDataTemp['tempModalEmpNameAssignLabel']);
		            $("#linkParam_emp_name").val(globalDataTemp['tempModalEmpName']);
				} else if (ui.item != null) {
					$("#modal_empsnapshot_id").val(ui.item.data_id);
					$("#modal_position_code").val(ui.item.position_code);
					$("#modal_agent_name").val(ui.item.distributor_name);
		            $("#modal_assign_name").val(ui.item.chief_emp_name);
		            $("#linkParam_emp_name").val(ui.item.emp_name);
				} else {
					$("#modal_empsnapshot_id").val("");
					$("#modal_position_code").val("");
					$("#modal_agent_name").val("");
		            $("#modal_assign_name").val("");
		            $("#linkParam_emp_name").val("");
				}
	        	
	         }
	    });
		 
	 }
 });