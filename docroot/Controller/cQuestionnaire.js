
//Global variable
var globalSevice=[];
var globalDataTemp=[];

const pageNumberDefault=1;
// restfulPath Service
globalSevice['restfulPathQuestionnaire']=restfulURL + "/" + serviceName + "/public/questionaire";
globalSevice['restfulPathDropDownQuestionnaireType']= globalSevice['restfulPathQuestionnaire'] +"/list_type";
globalSevice['restfulPathQuestionaireAutocompleteName']= globalSevice['restfulPathQuestionnaire']+ "/auto_name";
globalSevice['restfulPathDelete']= [globalSevice['restfulPathQuestionnaire'] + "/section",
									globalSevice['restfulPathQuestionnaire'] + "/question",
									globalSevice['restfulPathQuestionnaire'] + "/answer",];
globalSevice['restfulPathDropDownAnswerType']=globalSevice['restfulPathQuestionnaire'] + "/list_answer_type";
// Data List Answer Type Temp
globalDataTemp['DropDownAnswerType']="";
// Autocomplete Temp   
globalDataTemp['tempQuestionaireLabel']="";
globalDataTemp['tempQuestionaireId']="";
// Auto NumberID
globalDataTemp['NumberID']=0;

globalDataTemp['FindOne'];

globalDataTemp['form']= $( "#formModalQuestionnaire" );

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
 var getDropDownAnswerTypeFn = function(url,type,request,initValue){
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
	 			 			
	 			globalDataTemp['DropDownAnswerType']=data;

	 		}
	 	});	
	 	
	 };
 var listDropDownAnswerTypeFn = function(value){
		 	var html="";
		 	//value = parseInt(value);
		 	$.each(globalDataTemp['DropDownAnswerType'],function(index,indexEntry){
 				if(indexEntry[Object.keys(indexEntry)[0]] == value){
 					html+="<option selected value="+indexEntry[Object.keys(indexEntry)[0]]+">"+indexEntry[Object.keys(indexEntry)[1] == undefined  ?  Object.keys(indexEntry)[0]:Object.keys(indexEntry)[1]]+"</option>";
 					firstItem=false;
 				}else{
 					html+="<option value="+indexEntry[Object.keys(indexEntry)[0]]+">"+indexEntry[Object.keys(indexEntry)[1] == undefined  ?  Object.keys(indexEntry)[0]:Object.keys(indexEntry)[1]]+"</option>";
 				}
 					
 			});	
		 	return html;
		 };
var generateNumberIDFn = function(){
	globalDataTemp['NumberID']++;
	return globalDataTemp['NumberID'];
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

	
}
//--------  Clear End
var imgAnswerTypeFn = function(valueType){
	 var html ="";
	 valueType = String(valueType);
	 switch (valueType ) {
     case "1":
     case "2":
   	  html ="<img src='"+$("#url_portlet").val()+"/img/answer/circle.svg' style='opacity: 0.3;'>";
         break;
     case "3":
     case "4":
   	  html ="<img src='"+$("#url_portlet").val()+"/img/answer/square.svg' style='opacity: 0.3;'>";
         break;
     case "5":
     case "6":
   	  html ="<img src='"+$("#url_portlet").val()+"/img/answer/triangle.svg' style='opacity: 0.3;'>";
         break;
     case "7":
   	  html ="<img src='"+$("#url_portlet").val()+"/img/answer/comment.svg' style='opacity: 0.3;'>";
         break;
     default:
   	  html ="<img src='"+$("#url_portlet").val()+"/img/answer/circle.svg' style='opacity: 0.3;'>";
	 }
	 return html;
};
//binding Input NumberOnly start
var scriptInputNumberOnlyFn = function (){
	$('.numberOnly').mask('Z9999999999.00', {

		  translation: {
		    'Z': {
		       pattern: /[0-9*]/,
		      //optional: true
		    }
		  }
		});
}
//binding tooltip start
var scriptToolTipFn = function (){
	$('[data-toggle="tooltip"]').css({"cursor":"pointer"});
	 $('[data-toggle="tooltip"]').tooltip({
		 html:true,container: '#ModalQuestionnaire'
	 });
 }; 
//binding Flat Toggle start
var scriptFlatToggleFn = function (){
	 $('.flat-toggle').off('click');
	 $('.flat-toggle').on('click', function() {
	        if ($(this).hasClass('on')) {
	        	
	        	if($(this).hasClass('isUrlReport')){ 
	        		$(this).parent().prev().find( 'input' ).prop('disabled', true);  
	        		$(this).parent().prev().find( 'input' ).val("");
	        		$(this).parent().prev().find( 'input' ).addClass('url_report_cursor');
	        	}
	      
	            $(this).removeClass('on');
	            $(this).attr("data-value","0");
	        } else {
	        	
	          	if($(this).hasClass('isUrlReport')){
	        		$(this).parent().prev().find( 'input' ).prop('disabled', false);
	        		$(this).parent().prev().find( 'input' ).removeClass('url_report_cursor');
	        	}
	          	
	          	if($(this).hasClass('isNotApplicable')){ 
	          		$.each($(this).parent().parent().parent().children('tr').get(),function(index,indexEntry){
	          			$(indexEntry).find( '.isNotApplicable' ).removeClass('on');
	          			$(indexEntry).find( '.isNotApplicable' ).attr("data-value","0");
	          		});
	        	}
	          	
	            $(this).addClass('on');
	            $(this).attr("data-value","1");
	        }
	    });
	 
 }; 
//binding btn Delete Element start
var scriptBtnDelHeaderBoxQuestionFn = function (){
	 $('.btnDelSection , .btnDelSubSection , .btnDelQuestion').off('click');
	 $('.btnDelSection , .btnDelSubSection , .btnDelQuestion').on('click', function() {
	        if($(this).attr("delete-id") != undefined && $(this).attr("delete-id") != null && $(this).attr("delete-id") != ""){
	        	var el = $(this);
	        	var deleteType = this.id.split("-")[0];
	        	var deleteTypeNumber;
	        	if( deleteType == "btnDelSection"){deleteTypeNumber=0;}
	        	else if (deleteType == "btnDelSubSection" || deleteType == "btnDelQuestion"){deleteTypeNumber=1;}
	        	$(".btnModalClose").click();
	        	$("#confrimModal").modal({
					"backdrop" : setModalPopup[0],
					"keyboard" : setModalPopup[1]
				});
				$(document).off("click","#btnConfirmOK");
				$(document).on("click","#btnConfirmOK",function(){
				
					$.ajax({
						 url: globalSevice['restfulPathDelete'][deleteTypeNumber]+"/"+el.attr("delete-id"),
						 type : "delete",
						 dataType:"json",
						 headers:{Authorization:"Bearer "+tokenID.token},
						success:function(data){    
					    	 
						     if(data['status']==200){
						    	 
						       callFlashSlide("Delete Successfully.");
						       el.parent().parent().parent().parent().parent().remove();
						       $("#confrimModal").modal('hide');
						       
						     }else if (data['status'] == "400"){
						    	 callFlashSlideInModal(data['data'],"#inform_on_confirm","error");
						    	}
						 }
					});
					
				});
	        }else{
	        	$(this).parent().parent().parent().parent().parent().remove();
	        }
	        
	    });
};
//binding btn Delete Element Answer Row start
var scriptBtnDelAnswerRowFn = function (){
	  $('.btnDelAnswerRow').off('click');
	  $('.btnDelAnswerRow').on('click', function() {
	        
	        if($(this).attr("delete-id") != undefined && $(this).attr("delete-id") != null && $(this).attr("delete-id") != ""){
	        	var el = $(this);
	        	$(".btnModalClose").click();
	        	$("#confrimModal").modal({
					"backdrop" : setModalPopup[0],
					"keyboard" : setModalPopup[1]
				});
				$(document).off("click","#btnConfirmOK");
				$(document).on("click","#btnConfirmOK",function(){
				
					$.ajax({
						 url: globalSevice['restfulPathDelete'][2]+"/"+el.attr("delete-id"),
						 type : "delete",
						 dataType:"json",
						 headers:{Authorization:"Bearer "+tokenID.token},
						success:function(data){    
					    	 
						     if(data['status']==200){
						    	 
						       callFlashSlide("Delete Successfully.");
						       el.parent().parent().remove();
						       $("#confrimModal").modal('hide');
						       
						     }else if (data['status'] == "400"){
						    	 callFlashSlideInModal(data['data'],"#inform_on_confirm","error");
						    	}
						 }
					});
					
				});
	        }else{
	        	$(this).parent().parent().remove();
	        }
	    });
		 
};
//binding Drop Down Answer Type by Sub Section change all icon at drop down Answer Type by Question 
var scriptDropDownAnswerTypeSubSectionChangeIconFn = function (){
	$('.dropDownAnswerTypeSubSection').off('change');
	$(".dropDownAnswerTypeSubSection").change(function() {
		var valueType = $(this).val(); 
		$(this).parent().parent().parent().next().find( '.dropDownAnswerTypeQuestion' ).val(valueType);
		$(this).parent().parent().parent().next().find( '.imgAnswerType' ).html(imgAnswerTypeFn(valueType));
	});
}; 
//binding drop down Answer Type by Question change all icon at row answer 
var scriptDropDownAnswerTypeQuestionChangeIconFn = function (){
	$('.dropDownAnswerTypeQuestion').off('change');
	$(".dropDownAnswerTypeQuestion").change(function() {
		var valueType = $(this).val();
		$(this).parent().parent().parent().next().find( '.imgAnswerType' ).html(imgAnswerTypeFn(valueType));
	});
}; 
//btn gennerate html Sub Section
var scriptBtnAddSubSectionFn = function (){
	  $('.btnAddSubSection').off('click');
	  $('.btnAddSubSection').on('click', function() {
	  	var questionType= $(this).attr("question-type");
		var bodyStampParentID = $(this).parent().parent().parent().next().attr("id");
		var numberIdFirst=parseInt(Math.random()*1000000);
		var numberIdSecond=parseInt(Math.random()*1000000);
		console.log($(this).parent().parent().parent().next());
		console.log("Question Type :"+questionType);

	  	var html="";
	  	html+="<div class='span11 sortUnderSectionItem "+(questionType == "subSection-question" ? ""+bodyStampParentID+"" : ""+bodyStampParentID+"")+"' question-type='SubSection'>";
	  	html+="	<div class='box2 box-primary' >";
	  	html+="		<div class='box-header with-border' style='padding-top: 5px;'>";
	  	html+="		<center class='imgMoveHandleQuestion'><div style='width: 13px;padding-top: 4px;'><img src='"+$("#url_portlet").val()+"/img/answer/grip-horizontal.svg' style='opacity: 0.3;'></div></center>";
	  	html+="			<div class='form-inline' >";
	  	html+="				<div class='form-group float-label-control pull-left span5 section-name' style='margin-top: 5px;'>";
	  	html+="					<input type='text' class='form-control inputSubSectionName' data-toggle='tooltip' title='' placeholder='Sub Section'";
	  	html+="						id='inputSubSectionName-"+numberIdFirst+"-"+numberIdSecond+"' name='inputSubSectionName-"+numberIdFirst+"-"+numberIdSecond+"'  data-original-title='Sub Section' required>";
	  	html+="				</div>";
	  	html+="				<div class='form-group float-label-control pull-left span2 section-name' style='margin-top: 5px;'>";
	  	html+="					<input type='text' class='form-control inputSubSectionPassScore numberOnly' data-toggle='tooltip' title='' placeholder='Pass Score'";
	  	html+="						id='' name=''  data-original-title='Pass Score'>";
	  	html+="				</div>";
	  	html+="				<div class='form-group pull-left span3 answer-type' style='margin-top: 5px;'>";
	  	html+="					<select data-toggle='tooltip' title='AnswerType' class='input span12 m-b-n dropDownAnswerTypeSubSection' id=''";
	  	html+="						name='' data-original-title='Answer Type'>";
		html+= 						listDropDownAnswerTypeFn(1);
	  	html+="					</select>";
	  	html+="				</div>";
	  	html+="				<div class='form-group pull-right m-b-n ' style='display: block;' >";
	  	html+="					<button type='button' class='btn btn-success input-sm btnAddQuestion' question-type='subSection-question'";
	  	html+="						name='' id='' style='margin-left: 5px;margin-top: 5px;'>";
	  	html+="						<i class='fa fa-plus-square'></i>&nbsp;Add Question";
	  	html+="					</button>";
	  	html+="					<button type='button' class='btn btn-danger input-sm btnDelSubSection' name='' id=''";
	  	html+="						style='margin-left: 5px;margin-top: 5px;'><i class='fa fa-trash'></i>";
	  	html+="					</button>";
	  	html+="				</div>";
	  	html+="			</div>";
	  	html+="		</div>";
	  	// <!-- /.box-header -->
	  	html+="		<div class='box-body sortUnderSubSectionList' id='bodySubSectionListQuestion-"+generateNumberIDFn()+"' >";
	  	html+="			<br>";

	  	html+="		</div>";
	  	// <!-- /.box-body -->
	  	html+="	</div>";
	  	html+="</div>";
	  	
	  	$(this).parent().parent().parent().next().append(html);
	  	scriptBtnDelHeaderBoxQuestionFn();
	  	scriptBtnAddQuestionFn();
	  	scriptToolTipFn();
	  	scriptInputNumberOnlyFn();
	  	scriptSortUnderSubSectionListFn();
	  	scriptSortUnderSectionListFn();
	  });
  };
//btn gennerate html Question
	var scriptBtnAddQuestionFn = function (){
		  $('.btnAddQuestion').off('click');	  
		  $(".btnAddQuestion").on('click',function() {
			  var questionType= $(this).attr("question-type");
			  var answerTypeValue = $(this).parent().parent().find( ':selected' ).val();
			  var bodyStampParentID = $(this).parent().parent().parent().next().attr("id");
			  var numberIdFirst=parseInt(Math.random()*1000000);
			  var numberIdSecond=parseInt(Math.random()*1000000);
			  //console.log("Question Type :"+questionType);
		  	//console.log("Answer Type Value :"+answerTypeValue );
		  	//console.log($(this).parent().parent().parent().next().attr("id"));
		  	//console.log($(this).parent().parent().parent().next().append("<div class='span10'>test</div>"));
			  
			  var html="";
			  html+="<div class='"+(questionType == "subSection-question" ? "sortUnderSubSectionItem span10 "+bodyStampParentID+"" : "sortUnderSectionItem span11 "+bodyStampParentID+"")+"' style='display: block;' question-type='question'>";
			  html+="	<div class='box2 box-primary' >";
			  html+="		<div class='box-header with-border'  style='padding-top: 5px;'>";
			  html+="		<center class='imgMoveHandleQuestion'><div style='width: 13px;padding-top: 4px;'><img src='"+$("#url_portlet").val()+"/img/answer/grip-horizontal.svg' style='opacity: 0.3;'></div></center>";

			  html+="			<div class='form-inline' >";
			  html+="				<div class='form-group float-label-control pull-left "+(questionType == "subSection-question" ? " span6 " : " span7 ")+" section-name' style='margin-top: 5px;'>";
			  html+="					<input type='text' class='form-control inputQuestionName' placeholder='Question Name' id='inputQuestionName-"+numberIdFirst+"-"+numberIdSecond+"' name='inputQuestionName-"+numberIdFirst+"-"+numberIdSecond+"' data-toggle='tooltip' data-original-title='Question Name' required>";
			  html+="				</div>";
			  html+="				<div class='form-group pull-left "+(questionType == "subSection-question" ? " span4 " : " span3 ")+" answer-type' style='margin-top: 5px;'>";
			  html+="					<select data-toggle='tooltip' data-original-title='Answer Type'";
			  html+="						class='input span12 m-b-n dropDownAnswerTypeQuestion' id=''>";
			  html+= 						listDropDownAnswerTypeFn(answerTypeValue);
			  html+="					</select>";
			  html+="				</div>";
			  html+="				<div class='form-group pull-right m-b-n' >";
			  html+="					<button type='button' class='btn btn-danger input-sm btnDelQuestion'";
			  html+="						name='' id='' style='margin-left: 5px;margin-top: 5px;'>";
			  html+="						<i class='fa fa-trash'></i>";
			  html+="					</button>";
			  html+="				</div>";
			  html+="			</div>";
			  html+="		</div>";
			  html+="		<div class='box-body' id=''>";
			  html+="			<div class='table-responsive' style='overflow: auto;' id=''>";
			  html+="				<table class='table table-hover' id='table"+(questionType == "subSection-question" ? "SubQuestionAnswer-"+generateNumberIDFn()+"" : "QuestionAnswer-"+generateNumberIDFn()+"")+"' style='min-width: 450px;'>";
			  html+="					<tbody>";
			  			
			  html+="					</tbody>";
			  html+="					<tfoot class='addAnswerRow' >";
			  html+="						<tr>";
			  html+="							<td style='min-width: 9px;width: 9px;' class=''>";
			  html+="							<td style='min-width: 20px;width: 20px;' class='imgAnswerType'>";
			  html+=  							imgAnswerTypeFn(answerTypeValue);
			  html+="							</td>";
			  html+="							<td colspan='4' >Click Add Orther</td>";
			  html+="						</tr>";
			  html+="					</tfoot>";
			  html+="				</table>";
			  html+="			</div>";
			  html+="		</div>";
			  html+="	</div>";
			  html+="</div>";
	
			  $(this).parent().parent().parent().next().append(html);
			  
			  scriptBtnDelHeaderBoxQuestionFn();
			  scriptDropDownAnswerTypeSubSectionChangeIconFn();
			  scriptDropDownAnswerTypeQuestionChangeIconFn();
			  scriptAddAnswerRowFn();
			  scriptToolTipFn();
			  if(questionType == "question"){scriptSortUnderSectionListFn();}
			  
		  	
		  });		
		
};
//Click Add Generrate HTML Answer Row
var scriptAddAnswerRowFn = function (){
	$('.addAnswerRow').off('click');
	$('.addAnswerRow').on('click', function() {
		//console.log($(this).prev().append(""));
			var tbodyEl = $(this).prev();
			var answerTypeValue = $(this).parent().parent().parent().prev().find( ':selected' ).val();
			var html="";
			var numberIdFirst=parseInt(Math.random()*1000000);
			var numberIdSecond=parseInt(Math.random()*1000000);
			console.log($(this).parent().parent().parent().prev().find( ':selected' ).val());
			html+="<tr>";
			html+="	<td style='min-width: 9px;width: 9px; vertical-align: middle;' class='imgMoveHandleAnswerRow'>";
			html+="		<img src='"+$("#url_portlet").val()+"/img/answer/grip-vertical.svg' style='opacity: 0.3;'>";
			html+="	</td>";
			html+="	<td style='min-width: 20px;width: 20px;' class='imgAnswerType'>";
			html+=  imgAnswerTypeFn(answerTypeValue);
			html+="	</td>";
			html+="	<td style='width: 70%;' >";
			html+="		<div class='float-label-control input-answer-name' >";
			html+="			<input type='text' class='form-control inputAnswerName' data-toggle='tooltip' data-original-title='Answer Name' placeholder='Answer Name' id='inputAnswerName-"+numberIdFirst+"-"+numberIdSecond+"' name='inputAnswerName-"+numberIdFirst+"-"+numberIdSecond+"' required>";
			html+="		</div>";
			html+="	</td>";
			html+="	<td style='min-width: 100px;width: 100px;'>";
			html+="		<div class='float-label-control input-answer-score'>";
			html+="			<input type='text' class='form-control inputAnswerScore numberOnly' data-toggle='tooltip' data-original-title='Score' placeholder='Score' id='inputAnswerScore-"+numberIdFirst+"-"+numberIdSecond+"' name='inputAnswerScore-"+numberIdFirst+"-"+numberIdSecond+"' required>";
			html+="		</div>";
			html+="	</td>";
			html+="	<td style='min-width: 75px' >";
			html+="		<div class='isNotApplicable flat-toggle' data-value='0'>";
			html+="			<span>N/A</span>";
			html+="		</div>";
			html+="	</td>";
			html+="	<td><i class='fa fa-close btnDelAnswerRow'></i></td>";
			html+="</tr>";
			
			tbodyEl.append(html);
			
			 scriptFlatToggleFn();
			 scriptBtnDelAnswerRowFn();
			 scriptToolTipFn();
			 scriptInputNumberOnlyFn();
			 //$(tbodyEl).sortable( "destroy" );
			 scriptSortAnswerRowFn();
	    });
	
};
var scriptSortAnswerRowFn = function (){
	$("#formModalQuestionnaire tbody").sortable({
		  group: 'no-drop',
		  handle: '.imgMoveHandleAnswerRow',
		  //items: '.sortableItem:not(#orgParent)',
		  axis: 'y',
		  onDragStart: function ($item, container, _super) {
		    // Duplicate items of the no drop area
		    if(!container.options.drop)
		      $item.clone().insertAfter($item);
		    _super($item, container);
		  }
		});
};


var scriptSortUnderSubSectionListFn = function (){
	$("#formModalQuestionnaire .sortUnderSubSectionList").sortable({
		  group: 'no-drop',
		  handle: '.imgMoveHandleQuestion',
		  items: '.sortUnderSubSectionItem',
		  axis: 'y',
		  onDragStart: function ($item, container, _super) {
		    // Duplicate items of the no drop area
		    if(!container.options.drop)
		      $item.clone().insertAfter($item);
		    _super($item, container);
		  }
		});
};
var scriptSortUnderSectionListFn = function (){
	$("#formModalQuestionnaire .sortUnderSectionList").sortable({
		  group: 'no-drop',
		  handle: '.imgMoveHandleQuestion',
		  items: '.sortUnderSectionItem',
		  axis: 'y',
		  onDragStart: function ($item, container, _super) {
		    // Duplicate items of the no drop area
		    if(!container.options.drop)
		      $item.clone().insertAfter($item);
		    _super($item, container);
		  }
		});
};
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

// -------- findOne
var findOneFn = function(id) {
	var count = 1
	$.ajax({
		url:globalSevice['restfulPathQuestionnaire']+"/"+id,
		type : "get",
		dataType : "json",
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			globalDataTemp['FindOne']=data;
			listQuestionnaireFindOneFn(data);
			
		}
	});
};
//--------- findOne


// --------  ListData  Start

var listQuestionnaireFn = function(data) {
	//alert("listQuestionnaireFn");
	
	var htmlTable = "";
	var countNo = 1;
	$.each(data,function(index,indexEntry) {
      
		htmlTable += "<tr class='rowSearch'>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+ countNo + "</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+ indexEntry["questionaire_type"]+ "</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+ indexEntry["questionaire_name"]+ "</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;text-align: right;\">"+ notNullFn(indexEntry["pass_score"])+ "</td>";
		
		// column Manage
		htmlTable += "<td id=\"objectCenter\" style=\"vertical-align: middle;\"><i class=\"fa fa-cog font-gear popover-edit-del\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-trigger=\"focus\" tabindex=\""+index+"\" data-content=\"" ;
		// data-content
		htmlTable += "<button id="+indexEntry["questionaire_id"]+" class='btn btn-warning btn-xs edit' data-target=#ModalQuestionnaire data-toggle='modal' data-backdrop='"+setModalPopup[0]+"' data-keyboard='"+setModalPopup[1]+"'>Edit</button>&nbsp;"
		htmlTable += "<button id="+indexEntry["questionaire_id"]+" class='btn btn-danger btn-xs del'>Delete</button>\"></i></td>";
		
		htmlTable += "</tr>";
		countNo++;
	});


	$("#listQuestionnaire").html(htmlTable);

	
	//function popover
	$(".popover-edit-del").popover(setPopoverDisplay);
	
	$("#tableQuestionnaire").off("click",".popover-edit-del");
	$("#tableQuestionnaire").on("click",".popover-edit-del",function(){
		
			$(".edit").on("click",function() {
			clearFn();
			$("#modalTitleRole").html("Edit Questionnaire");
			
			
			$(this).parent().parent().parent().children().click();
			//alert($(this).parent().parent().parent().children().click());
			
			$("#btnAddAnother").hide();
			
			findOneFn(this.id);
			
			$("#id").val(this.id);
			$("#action").val("edit");	
			
			
		});
		
		
		$(".del").on("click",function(){
			var id = this.id;
			$(this).parent().parent().parent().children().click();
			$(".btnModalClose").click();
			$("#confrimModal").modal({
				"backdrop" : setModalPopup[0],
				"keyboard" : setModalPopup[1]
			});
			$(document).off("click","#btnConfirmOK");
			$(document).on("click","#btnConfirmOK",function(){
			
				$.ajax({
					 url: globalSevice['restfulPathQuestionnaire']+"/"+id,
					 type : "delete",
					 dataType:"json",
					 headers:{Authorization:"Bearer "+tokenID.token},
					success:function(data){    
				    	 
					     if(data['status']==200){
					    	 
					       callFlashSlide("Delete Successfully.");
					       getDataFn();
					       $("#confrimModal").modal('hide');
					       
					     }else if (data['status'] == "400"){
					    	 callFlashSlideInModal(data['data'],"#inform_on_confirm","error");
					    	}
					 }
				});
				
			});
			
		});	
		
	});
	
	
}

// --------  ListData  End
var listQuestionnaireFindOneFn = function(data) {
	var html="";
	$("#form_questionnaire_type").val(data.head.questionaire_type_id);
	$("#form_questionnaire_name").val(data.head.questionaire_name);
	$("#form_questionnaire_pass_score").val(data.head.pass_score);
	$("#form_questionnaire_is_active").val(data.head.pass_score);
	
	if(data.head.is_active == 1){
		$("#form_questionnaire_is_active").removeClass('on');
        $("#form_questionnaire_is_active").addClass('on');
        $("#form_questionnaire_is_active").attr("data-value","1");
	}else{
		$("#form_questionnaire_is_active").removeClass('on');
        $("#form_questionnaire_is_active").attr("data-value","0");
	}

	$.each(data.questionaire_section,function(index,indexEmtry){
		
		  html+="<div class='row-fluid addSection' id='edit-headerSection-"+indexEmtry.section_id+"'>";
		  html+="	<div class='box box-primary' >";
		  html+="		<div class='box-header with-border'>"; 
		  html+="			<div class='form-inline'>";
		  html+="				<div class='form-group float-label-control pull-left span6 section-name'>";
		  html+="					<input type='text' class='form-control inputSectionName' placeholder='Section Name' id=''";
		  html+="						name='' data-toggle='tooltip' title='Section Name' required value='"+indexEmtry.section_name+"'> ";
		  html+="				</div>";
		  html+="				<div class='form-group float-label-control pull-left span2 section-parent '>";
		  html+="					<div class='isCustomerSearch flat-toggle "+(indexEmtry.is_cust_search == 0 ? "" :"on")+"'";
		  html+="						id='' data-value='"+indexEmtry.is_cust_search+"'>";
		  html+="						<span>Is Customer search</span>";
		  html+="					</div>";
		  html+="				</div>";
		  html+="			</div>";
		  html+="			<div class='form-inline'>";
		  html+="				<div class='form-group float-label-control pull-left span6 section-name'>";
		  html+="					<input  "+(indexEmtry.is_show_report == 0 ? "disabled" :"")+" type='text' class='form-control inputUrlReport "+(indexEmtry.is_show_report == 0 ? "url_report_cursor" :"")+"' placeholder='URL Report' id=''";
		  html+="						name='' data-toggle='tooltip' title='URL Report'required value='"+(indexEmtry.report_url == undefined ? "" :indexEmtry.report_url)+"'>";
		  html+="				</div>";
		  html+="				<div class='form-group float-label-control pull-left span2 section-parent '>";
		  html+="					<div class='isUrlReport flat-toggle "+(indexEmtry.is_show_report == 0 ? "" :"on")+"'";
		  html+="						id='' data-value='"+indexEmtry.is_show_report+"'>";
		  html+="						<span>Is URL Report</span>";
		  html+="					</div>";
		  html+="				</div>";
		  html+="				<div class='form-group pull-right m-b-n'>";
		  html+="					<button type='button' class='btn btn-success input-sm btnAddSubSection' question-type='subSection-question'";
		  html+="						name='' id='' style='margin-left: 5px;margin-bottom: 5px;'>";
		  html+="						<i class='fa fa-plus-square'></i>&nbsp;Add Sub Section";
		  html+="					</button>";
		  html+="					<button type='button' class='btn btn-success input-sm btnAddQuestion' question-type='question'";
		  html+="						name='' id='' style='margin-left: 5px;margin-bottom: 5px;'>";
		  html+="						<i class='fa fa-plus-square'></i>&nbsp;Add Question";
		  html+="					</button>";
		  html+="					<button type='button' class='btn btn-danger input-sm btnDelSection' question-type='subSection-question'";
		  html+="						name='btnDelSection-"+indexEmtry.section_id+"' id='btnDelSection-"+indexEmtry.section_id+"' style='margin-left: 5px;margin-bottom: 5px;' delete-id='"+indexEmtry.section_id+"'>";
		  html+="						<i class='fa fa-trash'></i>";
		  html+="					</button>";
		  html+="				</div>";
		  html+="			</div>";

		  html+="		</div>";
		  	// /.box-header   generateNumberIDFn
		  html+="		<div class='box-body sortUnderSectionList ' id='edit-bodySectionListQuestion-"+indexEmtry.section_id+"'>";
		  html+="			<br>";
		  
		  $.each(indexEmtry.sub_section,function(index2,indexEmtry2){
				if(indexEmtry2.question != "" && indexEmtry2.answer == ""){
					console.log("Sub Section");
				 
					html+="<div class='span11 sortUnderSectionItem edit-bodySectionListQuestion-"+indexEmtry.section_id+"' question-type='SubSection' SubSection-id='"+indexEmtry2.question_id+"'>";
				  	html+="	<div class='box2 box-primary' >";
				  	html+="		<div class='box-header with-border' style='padding-top: 5px;'>";
				  	html+="		<center class='imgMoveHandleQuestion'><div style='width: 13px;padding-top: 4px;'><img src='"+$("#url_portlet").val()+"/img/answer/grip-horizontal.svg' style='opacity: 0.3;'></div></center>";
				  	html+="			<div class='form-inline' >";
				  	html+="				<div class='form-group float-label-control pull-left span5 section-name' style='margin-top: 5px;'>";
				  	html+="					<input type='text' class='form-control inputSubSectionName' data-toggle='tooltip' title='' placeholder='Sub Section'";
				  	html+="						id='inputSubSectionName-"+generateNumberIDFn()+"' name='inputSubSectionName-"+generateNumberIDFn()+"'  data-original-title='Sub Section' required value='"+indexEmtry2.question_name+"'>";
				  	html+="				</div>";
				  	html+="				<div class='form-group float-label-control pull-left span2 section-name' style='margin-top: 5px;'>";
				  	html+="					<input type='text' class='form-control inputSubSectionPassScore numberOnly' data-toggle='tooltip' title='' placeholder='Pass Score'";
				  	html+="						id='' name=''  data-original-title='Pass Score' value='"+indexEmtry2.pass_score+"'>";
				  	html+="				</div>";
				  	html+="				<div class='form-group pull-left span3 answer-type' style='margin-top: 5px;'>";
				  	html+="					<select data-toggle='tooltip' title='AnswerType' class='input span12 m-b-n dropDownAnswerTypeSubSection' id=''";
				  	html+="						name='' data-original-title='Answer Type'>";
					html+= 						listDropDownAnswerTypeFn(indexEmtry2.answer_type_id);
				  	html+="					</select>";
				  	html+="				</div>";
				  	html+="				<div class='form-group pull-right m-b-n ' style='display: block;' >";
				  	html+="					<button type='button' class='btn btn-success input-sm btnAddQuestion' question-type='subSection-question'";
				  	html+="						name='' id='' style='margin-left: 5px;margin-top: 5px;'>";
				  	html+="						<i class='fa fa-plus-square'></i>&nbsp;Add Question";
				  	html+="					</button>";
				  	html+="					<button type='button' class='btn btn-danger input-sm btnDelSubSection' name='btnDelSubSection-"+indexEmtry2.question_id+"' id='btnDelSubSection-"+indexEmtry2.question_id+"' delete-id='"+indexEmtry2.question_id+"'";
				  	html+="						style='margin-left: 5px;margin-top: 5px;'><i class='fa fa-trash'></i>";
				  	html+="					</button>";
				  	html+="				</div>";
				  	html+="			</div>";
				  	html+="		</div>";
				  	// <!-- /.box-header -->
				  	html+="		<div class='box-body sortUnderSubSectionList' id='edit-bodySubSectionListQuestion-"+indexEmtry2.question_id+"' >";
				  	html+="			<br>";
				  	html+=listQuestionnaireFindOneByQuestionFn(indexEmtry2.question,"subSection-question","edit-bodySubSectionListQuestion-"+indexEmtry2.question_id);
				  	
				  	html+="		</div>";
				  	// <!-- /.box-body -->
				  	html+="	</div>";
				  	html+="</div>";
				}
				else if(indexEmtry2.question == "" && indexEmtry2.answer != ""){
					console.log("Question ");
					var dataQuestion = [];
					dataQuestion.push(indexEmtry2);
					html+=listQuestionnaireFindOneByQuestionFn(dataQuestion,"question","edit-bodySectionListQuestion-"+indexEmtry.section_id);
				}
		  });
		  html+="		</div>";
		  	// /.box-body
		  html+="	</div>";
		  html+="</div>";
		
	});
	
	$("#listSection").html(html);
	
	scriptBtnAddSubSectionFn();
	scriptBtnAddQuestionFn();
	scriptAddAnswerRowFn();
	
	scriptBtnDelAnswerRowFn();
	scriptBtnDelHeaderBoxQuestionFn();

	
	scriptDropDownAnswerTypeSubSectionChangeIconFn();
	scriptDropDownAnswerTypeQuestionChangeIconFn();
	
	scriptSortUnderSectionListFn();
	scriptSortUnderSubSectionListFn();
	scriptSortAnswerRowFn();
	
	scriptFlatToggleFn();
	scriptToolTipFn();
};
var listQuestionnaireFindOneByQuestionFn = function(data,question_type,body_stamp_parent,parent_id) {
	var html="";
	console.log(data);
	//'"+(questionType == "subSection-question" ? "span10 "+bodyStampParentID+"" : "span11 "+bodyStampParentID+"")+"'
	 $.each(data,function(index,indexEmtry){
	  		var questionType = "subSection-question";
	  			  		
	  		  html+="<div class='"+(question_type == "subSection-question" ? "sortUnderSubSectionItem span10 "+body_stamp_parent+"" : "sortUnderSectionItem span11 "+body_stamp_parent+"")+"' style='display: block;' question-type='"+question_type+"' question-id='"+indexEmtry.question_id+"' parent-id='"+indexEmtry.parent_question_id+"'>";
			  html+="	<div class='box2 box-primary' >";
			  html+="		<div class='box-header with-border'  style='padding-top: 5px;'>";
			  html+="		<center class='imgMoveHandleQuestion'><div style='width: 13px;padding-top: 4px;'><img src='"+$("#url_portlet").val()+"/img/answer/grip-horizontal.svg' style='opacity: 0.3;'></div></center>";
			  html+="			<div class='form-inline' >";
			  html+="				<div class='form-group float-label-control pull-left span6 section-name' style='margin-top: 5px;'>";
			  html+="					<input type='text' class='form-control inputQuestionName' placeholder='Question Name' id='inputQuestionName-"+indexEmtry.question_id+"' name='inputQuestionName-"+indexEmtry.question_id+"' data-toggle='tooltip' data-original-title='Question Name' required value='"+indexEmtry.question_name+"'>";
			  html+="				</div>";
			  html+="				<div class='form-group pull-left "+(question_type == "subSection-question" ? " span4 " : " span3 ")+"  answer-type' style='margin-top: 5px;'>";
			  html+="					<select data-toggle='tooltip' data-original-title='Answer Type'";
			  html+="						class='input span12 m-b-n dropDownAnswerTypeQuestion' id=''>";
			  html+= 						listDropDownAnswerTypeFn(indexEmtry.answer_type_id);
			  html+="					</select>";
			  html+="				</div>";
			  html+="				<div class='form-group pull-right m-b-n' >";
			  html+="					<button type='button' class='btn btn-danger input-sm btnDelQuestion'";
			  html+="						name='btnDelQuestion-"+indexEmtry.question_id+"' id='btnDelQuestion-"+indexEmtry.question_id+"' style='margin-left: 5px;margin-top: 5px;' delete-id='"+indexEmtry.question_id+"'>";
			  html+="						<i class='fa fa-trash'></i>";
			  html+="					</button>";
			  html+="				</div>";
			  html+="			</div>";
			  html+="		</div>";
			  html+="		<div class='box-body' id=''>";
			  html+="			<div class='table-responsive' style='overflow: auto;' id=''>";
			  html+="				<table class='table table-hover' id='table"+(questionType == "subSection-question" ? "SubQuestionAnswer-"+generateNumberIDFn()+"" : "QuestionAnswer-"+generateNumberIDFn()+"")+"' style='min-width: 450px;'>";
			  html+="					<tbody>";
			  $.each(indexEmtry.answer,function(index2,indexEmtry2){
				  	html+="<tr answer-id='"+indexEmtry2.answer_id+"'>";
					html+="	<td style='min-width: 9px;width: 9px; vertical-align: middle;' class='imgMoveHandleAnswerRow'>";
					html+="		<img src='"+$("#url_portlet").val()+"/img/answer/grip-vertical.svg' style='opacity: 0.3;'>";
					html+="	</td>";
					html+="	<td style='width: 20px;min-width: 20px;' class='imgAnswerType'>";
					html+=  imgAnswerTypeFn(indexEmtry.answer_type_id);
					html+="	</td>";
					html+="	<td style='width: 70%;' >";
					html+="		<div class='float-label-control input-answer-name' >";
					html+="			<input type='text' class='form-control inputAnswerName' data-toggle='tooltip' data-original-title='Answer Name' placeholder='Answer Name' id='inputAnswerName-"+indexEmtry2.answer_id+"' name='inputAnswerName-"+indexEmtry2.answer_id+"' value='"+indexEmtry2.answer_name+"' required>";
					html+="		</div>";
					html+="	</td>";
					html+="	<td style='min-width: 100px;width: 100px;'>";
					html+="		<div class='float-label-control input-answer-score'>";
					html+="			<input type='text' class='form-control inputAnswerScore numberOnly' data-toggle='tooltip' data-original-title='Score' placeholder='Score' id='inputAnswerScore-"+indexEmtry2.answer_id+"' name='inputAnswerScore-"+indexEmtry2.answer_id+"' value='"+indexEmtry2.score+"' required>";
					html+="		</div>";
					html+="	</td>";
					html+="	<td style='min-width: 75px' >";
					html+="		<div class='isNotApplicable flat-toggle "+(indexEmtry2.is_not_applicable == 0 ? "" :"on")+"' data-value='"+indexEmtry2.is_not_applicable+"'>";
					html+="			<span>N/A</span>";
					html+="		</div>";
					html+="	</td>";
					html+="	<td><i class='fa fa-close btnDelAnswerRow' id='btnDelAnswerRow-"+indexEmtry2.answer_id+"' delete-id='"+indexEmtry2.answer_id+"'></i></td>";
					html+="</tr>";
			  });
			  html+="					</tbody>";
			  html+="					<tfoot class='addAnswerRow' >";
			  html+="						<tr>";
			  html+="							<td style='min-width: 9px;width: 9px;' class=''>";
			  html+="							<td style='width: 20px;' class='imgAnswerType'>";
			  html+=  							imgAnswerTypeFn(indexEmtry.answer_type_id);
			  html+="							</td>";
			  html+="							<td colspan='4' >Click Add Orther</td>";
			  html+="						</tr>";
			  html+="					</tfoot>";
			  html+="				</table>";
			  html+="			</div>";
			  html+="		</div>";
			  html+="	</div>";
			  html+="</div>";
	  		 
	  	 });
	 return html;
};
//--------  Get Data Answer 
var getDataAnswerFn = function (data){
	var group_answer=[];
	$.each(data,function(index,indexEntry){
		var answer = {};
		if($(indexEntry).attr("answer-id") != undefined && $(indexEntry).attr("answer-id") != null && $(indexEntry).attr("answer-id") != ""){
			answer.answer_id=$(indexEntry).attr("answer-id");
		}
		answer.row_name = $(indexEntry).find( '.inputAnswerName' ).val();
		answer.answer_name = $(indexEntry).find( '.inputAnswerName' ).val();
        answer.score = $(indexEntry).find( '.inputAnswerScore' ).val();
        answer.is_not_applicable = $(indexEntry).find( '.isNotApplicable' ).attr("data-value");
		group_answer.push(answer);
	});
	return group_answer;
};

var insertFn = function(options){
	
	var questionaire_type_id=$("#form_questionnaire_type").val();
	var questionaire_name=$("#form_questionnaire_name").val();
	var pass_score=$("#form_questionnaire_pass_score").val();
	var is_active=$("#form_questionnaire_is_active").attr("data-value");
	var questionaire_section = [];

	$.each($("#listSection").children('div').get(),function(index,indexEntry){
		var group_section={};
		group_section.section_name = $(indexEntry).find( '.inputSectionName' ).val();
		group_section.report_url = $(indexEntry).find( '.inputUrlReport' ).val();
		group_section.is_show_report = ($(indexEntry).find( '.isUrlReport ' ).hasClass('on') == true ? "1":"0");
		group_section.is_cust_search = ($(indexEntry).find( '.isCustomerSearch ' ).hasClass('on') == true ? "1":"0");
		group_section.sub_section = [];
		
		// loop sub_section 
		$.each($(indexEntry).children().children(".box-body").children('div').get(),function(index2,indexEntry2){
			var sub_section = {};
			
			if($(indexEntry2).attr("question-type") == "SubSection"){
				// SubSection Start
				sub_section.answer_type_id = $(indexEntry2).find( '.dropDownAnswerTypeSubSection' ).val();
	          	sub_section.question_name = $(indexEntry2).find( '.inputSubSectionName' ).val();
	          	sub_section.pass_score = $(indexEntry2).find( '.inputSubSectionPassScore' ).val();
	          	sub_section.question = [];
				$.each($(indexEntry2).children().children(".box-body").children('div').get(),function(index3,indexEntry3){
					var question = {};
					question.answer_type_id = $(indexEntry3).find( '.dropDownAnswerTypeQuestion' ).val();
	          		question.question_name = $(indexEntry3).find( '.inputQuestionName' ).val();
	          		question.answer = getDataAnswerFn($(indexEntry3).children().find("tbody").children('tr').get());
					
					sub_section.question.push(question);
					
				});
				// SubSection End

			}else{// answer-type = question
				// Question Start
	          	sub_section.answer_type_id = $(indexEntry2).find( '.dropDownAnswerTypeQuestion' ).val();
	          	sub_section.question_name = $(indexEntry2).find( '.inputQuestionName' ).val();
	          	sub_section.pass_score = "";
	          	sub_section.answer = getDataAnswerFn($(indexEntry2).children().find("tbody").children('tr').get());
	          	// Question End
			}

			group_section.sub_section.push(sub_section);
			
		});
		
		questionaire_section.push(group_section);
		
	});


	console.log(questionaire_section);

	
	
	
	$.ajax({
		
		url:globalSevice['restfulPathQuestionnaire'],
		type : "POST",
		dataType : "json",
		data : {
			 "questionaire_name": questionaire_name,
			 "questionaire_type_id": questionaire_type_id,
			 "pass_score": pass_score,
			 "is_active": is_active,
			 "questionaire_section": questionaire_section
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			if (data['status'] == "200") {
				 
				   if(options !="saveAndAnother"){
					   callFlashSlide("Insert Successfully.");
					   getDataFn();
					   clearFn();
				 	   $('#ModalQuestionnaire').modal('hide');
					}else{
						getDataFn();
						clearFn();
						callFlashSlideInModal("Insert Data is Successfully.");
					}
			}else if (data['status'] == "400") {
				//alert("Error ?");
				console.log(data);
				var html ="";
				$.each(data.errors.data.validate,function(index,indexEmtry){
					if(index == 0){
						html+="<font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font>"+indexEmtry;
					}else{
						html+="<br><font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font>"+indexEmtry;
					}
				});
				callFlashSlideInModal(html,"#information2","error");
				//validationFn(data);
			}  
				   
				   
			
		}
	});
};

var updateFn = function(){
	var questionaire_type_id=$("#form_questionnaire_type").val();
	var questionaire_id = $("#id").val();
	var questionaire_name=$("#form_questionnaire_name").val();
	var pass_score=$("#form_questionnaire_pass_score").val();
	var is_active=$("#form_questionnaire_is_active").attr("data-value");
	var questionaire_section = [];

	$.each($("#listSection").children('div').get(),function(index,indexEntry){
		var group_section={};

		if(indexEntry.id.split("-")[0] == "edit"){group_section.section_id=indexEntry.id.split("-")[2];}
		group_section.report_url = $(indexEntry).find( '.inputUrlReport' ).val();
		group_section.is_show_report = ($(indexEntry).find( '.isUrlReport ' ).hasClass('on') == true ? "1":"0");
		group_section.section_name = $(indexEntry).find( '.inputSectionName' ).val();
		group_section.is_cust_search = ($(indexEntry).find( '.isCustomerSearch ' ).hasClass('on') == true ? "1":"0");
		group_section.sub_section = [];
		
		// loop sub_section 
		$.each($(indexEntry).children().children(".box-body").children('div').get(),function(index2,indexEntry2){
			var sub_section = {};
			
			if($(indexEntry2).attr("question-type") == "SubSection"){
				// SubSection Start
				if($(indexEntry2).attr("subsection-id") != undefined && $(indexEntry2).attr("subsection-id") != null && $(indexEntry2).attr("subsection-id") != ""){
					sub_section.question_id=$(indexEntry2).attr("subsection-id");
				}
				sub_section.answer_type_id = $(indexEntry2).find( '.dropDownAnswerTypeSubSection' ).val();
	          	sub_section.question_name = $(indexEntry2).find( '.inputSubSectionName' ).val();
	          	sub_section.pass_score = $(indexEntry2).find( '.inputSubSectionPassScore' ).val();
	          	sub_section.question = [];
				$.each($(indexEntry2).children().children(".box-body").children('div').get(),function(index3,indexEntry3){
					var question = {};
					if($(indexEntry3).attr("question-id") != undefined && $(indexEntry3).attr("question-id") != null && $(indexEntry3).attr("question-id") != ""){
						question.question_id=$(indexEntry3).attr("question-id");
					}
					question.answer_type_id = $(indexEntry3).find( '.dropDownAnswerTypeQuestion' ).val();
	          		question.question_name = $(indexEntry3).find( '.inputQuestionName' ).val();
	          		question.answer = getDataAnswerFn($(indexEntry3).children().find("tbody").children('tr').get());
					
					sub_section.question.push(question);
					
				});
				// SubSection End

			}else{// answer-type = question
				// Question Start 
				if($(indexEntry2).attr("question-id") != undefined && $(indexEntry2).attr("question-id") != null && $(indexEntry2).attr("question-id") != ""){
					sub_section.question_id=$(indexEntry2).attr("question-id");
				}
				sub_section.answer_type_id = $(indexEntry2).find( '.dropDownAnswerTypeQuestion' ).val();
	          	sub_section.question_name = $(indexEntry2).find( '.inputQuestionName' ).val();
	          	sub_section.pass_score = "";
	          	sub_section.answer = getDataAnswerFn($(indexEntry2).children().find("tbody").children('tr').get());
	          	// Question End
			}

			group_section.sub_section.push(sub_section);
			
		});
		
		questionaire_section.push(group_section);
		
	});


	console.log(questionaire_section);
$.ajax({
		
		url:globalSevice['restfulPathQuestionnaire'],
		type : "PATCH",
		dataType : "json",
		data : {
				
			 "questionaire_id" : questionaire_id,
			 "questionaire_name": questionaire_name,
			 "questionaire_type_id": questionaire_type_id,
			 "pass_score": pass_score,
			 "is_active": is_active,
			 "questionaire_section": questionaire_section
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			if (data['status'] == "200") {
				callFlashSlide("Update Successfully.");
				getDataFn();
				clearFn();
				$('#ModalQuestionnaire').modal('hide');
					
			}else if (data['status'] == "400") {
				//alert("Error ?");
				console.log(data);
				var html ="";
				$.each(data.errors.data.validate,function(index,indexEmtry){
					if(index == 0){
						html+="<font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font>"+indexEmtry;
					}else{
						html+="<br><font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font>"+indexEmtry;
					}
				});
				callFlashSlideInModal(html,"#information2","error");
				//validationFn(data);
			}  
				   
				   
			
		}
	});
};

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

	$("#search_quest_name #search_quest_id").val("");
	$("#search_quest_type").html(generateDropDownList(globalSevice['restfulPathDropDownQuestionnaireType'],"GET",{},"All Questionnaire Type"));
	$("#form_questionnaire_type").html(generateDropDownList(globalSevice['restfulPathDropDownQuestionnaireType'],"GET",{}));
	
	getDropDownAnswerTypeFn(globalSevice['restfulPathDropDownAnswerType'],"GET",{});
	
	$(".app_url_hidden").show();
	$("#btn_search_advance").click(function(){
	
		searchAdvanceFn(
				$("#search_quest_type").val(),
				$("#search_quest_id").val()
				);
			
		$("#Questionnaire_list_content").show();
		
		return false;
	});
	
	
	$("#btnAddQuestionnaire").click(function(){
		$("#btnAddAnother").show();
	});
	$("#btnSubmit").click(function(){
		// var form = $( "#formModalQuestionnaire" );
		//globalDataTemp['form'] = $( "form#formModalQuestionnaire" ).validate(); 
		
		globalDataTemp['form'].validate();
		if(globalDataTemp['form'].valid()){
			if ($("#action").val() == "add"|| $("#action").val() == "") {
				insertFn();
			}else{
				updateFn();
			}
		}else{
			callFlashSlideInModal("<font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font> Please enter all required fields.","#information2","error");
		}
		
		return false;
	});
	
	$("#btnAddAnother").click(function(){
		globalDataTemp['form'].validate();
		if(globalDataTemp['form'].valid()){
			insertFn("saveAndAnother");
		}else{
			callFlashSlideInModal("<font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font> Please enter all required fields.","#information2","error");
		}
	});
	
	$(".btnCancle , .close").click(function() {
		clearFn();
	});


	
	//Autocomplete Search Start

	$("#search_quest_name").autocomplete({
        source: function (request, response) {
        	$.ajax({
				 url:globalSevice['restfulPathQuestionaireAutocompleteName'],
				 type:"get",
				 dataType:"json",
				 headers:{Authorization:"Bearer "+tokenID.token},
				 data:{
					 "questionaire_type_id":$("#search_quest_type").val(),
					 "questionaire_name":request.term
					 },
				 //async:false,
                 error: function (xhr, textStatus, errorThrown) {
                        console.log('Error: ' + xhr.responseText);
                    },
				 success:function(data){
					  
						response($.map(data, function (item) {
                            return {
                                label: item.questionaire_name,
                                value: item.questionaire_name,
                                data_id :item.questionaire_id
                            };
                        }));
					
				},
				beforeSend:function(){
					$("body").mLoading('hide');	
				}
				
				});
        },
		select:function(event, ui) {
			$("#search_quest_name").val(ui.item.value);
            $("#search_quest_id").val(ui.item.data_id);
            globalDataTemp['tempQuestionaireLabel'] = ui.item.value;
            globalDataTemp['tempQuestionaireId']=ui.item.data_id;
            return false;
        },change: function(e, ui) {  
			if ($("#search_quest_name").val() == globalDataTemp['tempQuestionaireLabel']) {
				$("#search_quest_id").val(globalDataTemp['tempQuestionaireId']);
			} else if (ui.item != null) {
				$("#search_quest_id").val(ui.item.data_id);
			} else {
				$("#search_quest_id").val("");
			}
        	
         }
    });
	
   
	//Autocomplete Search End

	 scriptToolTipFn();
	 scriptFlatToggleFn();
	 scriptInputNumberOnlyFn();

	  // btn get Section
	  $('.btnAddSection').off('click');
	  $('.btnAddSection').on('click', function() {
		  console.log($(this).parent().parent().parent().next());
		  var html="";
		  html+="<div class='row-fluid addSection' id='add-headerSection-"+generateNumberIDFn()+"'>";
		  html+="	<div class='box box-primary' >";
		  html+="		<div class='box-header with-border'>";
		  html+="			<div class='form-inline'>";
		  html+="				<div class='form-group float-label-control pull-left span6 section-name'>";
		  html+="					<input type='text' class='form-control inputSectionName' placeholder='Section Name' id=''";
		  html+="						name='' data-toggle='tooltip' title='Section Name'required>";
		  html+="				</div>";
		  html+="				<div class='form-group float-label-control pull-left span2 section-parent '>";
		  html+="					<div class='isCustomerSearch flat-toggle'";
		  html+="						id='' data-value='0'>";
		  html+="						<span>Is Customer search</span>";
		  html+="					</div>";
		  html+="				</div>";
		  html+="			</div>";
		  
		  html+="			<div class='form-inline'>";
		  html+="				<div class='form-group float-label-control pull-left span6 section-name'>";
		  html+="					<input  disabled type='text' class='form-control inputUrlReport url_report_cursor' placeholder='URL Report' id=''";
		  html+="						name='' data-toggle='tooltip' title='URL Report'required>";
		  html+="				</div>";
		  html+="				<div class='form-group float-label-control pull-left span2 section-parent '>";
		  html+="					<div class='isUrlReport flat-toggle'";
		  html+="						id='' data-value='0'>";
		  html+="						<span>Is URL Report</span>";
		  html+="					</div>";
		  html+="				</div>";
		  html+="				<div class='form-group pull-right m-b-n'>";
		  html+="					<button type='button' class='btn btn-success input-sm btnAddSubSection' question-type='subSection-question'";
		  html+="						name='' id='' style='margin-left: 5px;margin-bottom: 5px;'>";
		  html+="						<i class='fa fa-plus-square'></i>&nbsp;Add Sub Section";
		  html+="					</button>";
		  html+="					<button type='button' class='btn btn-success input-sm btnAddQuestion' question-type='question'";
		  html+="						name='' id='' style='margin-left: 5px;margin-bottom: 5px;'>";
		  html+="						<i class='fa fa-plus-square'></i>&nbsp;Add Question";
		  html+="					</button>";
		  html+="					<button type='button' class='btn btn-danger input-sm btnDelSection' question-type='subSection-question'";
		  html+="						name='' id='' style='margin-left: 5px;margin-bottom: 5px;'>";
		  html+="						<i class='fa fa-trash'></i>";
		  html+="					</button>";
		  html+="				</div>";
		  html+="			</div>";
		  html+="		</div>";
		  	// /.box-header   generateNumberIDFn
		  html+="		<div class='box-body sortUnderSectionList' id='add-bodySectionListQuestion-"+generateNumberIDFn()+"'>";
		  html+="			<br>";
		  	//       content Question
		  html+="		</div>";
		  	// /.box-body
		  html+="	</div>";
		  html+="</div>";
		  $(this).parent().parent().parent().next().append(html);
		  
		  scriptFlatToggleFn();
		  scriptBtnAddSubSectionFn();
		  scriptBtnAddQuestionFn();
		  scriptBtnDelHeaderBoxQuestionFn();
		  scriptToolTipFn();
		  
	  });
	
	  
	  
	

});
/*
 $("#listSection").sortable({
  group: 'no-drop',
  handle: '.draganddrop',
  items: '.sortableItem:not(#orgParent)',
  axis: 'y',
  onDragStart: function ($item, container, _super) {
    // Duplicate items of the no drop area
    if(!container.options.drop)
      $item.clone().insertAfter($item);
    _super($item, container);
  }
});

$("div").hover(function(){
    $(this).animate({ width: "200px" });
}, function() {
    $(this).animate({ width: "100px" });
});
 */