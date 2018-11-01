var options=[];

var GenerateOptionIntoFormType = function(selectedId){
	$.ajax({
        url: restfulURL+"/"+serviceName+"/public/appraisal_structure/form_list",
        type: "get",
        dataType: "json",
        data: {},
        async: false,
        headers: { Authorization: "Bearer " + tokenID.token },
        success: function (data) { console.log(data);
        	var htmlOption = "";
            $.each(data, function (index, indexEntry) {
            	if(selectedId == indexEntry.form_id){
            		htmlOption += "<option value=" + indexEntry.form_id + " selected='selected'>" + indexEntry.form_name + "</option>";
            	} else {
            		htmlOption += "<option value=" + indexEntry.form_id + " >" + indexEntry.form_name + "</option>";
            	}
            });
            console.log(htmlOption);
            $("#form_id").html(htmlOption);
        }
	});
} 


var GenerateOptionIntoIsDeriveLevel = function(selectedId){
	$.ajax({
        url: restfulURL+"/"+serviceName+"/public/appraisal_structure/level_list",
        type: "get",
        dataType: "json",
        data: {},
        async: false,
        headers: { Authorization: "Bearer " + tokenID.token },
        success: function (data) {
        	var levelId = $("#level_id");
        	levelId.empty();
            $.each(data, function (index, indexEntry) {
            	if(selectedId == indexEntry.level_id){
            		levelId.append(new Option(indexEntry.appraisal_level_name, indexEntry.level_id, selected, selected));
            	} else {
            		levelId.append(new Option(indexEntry.appraisal_level_name, indexEntry.level_id));
            	}
            });
        }
	});
}

var ClearAppraisalStructureFn = function(){
	$("#seq_no").val("");
	$("#structure_name").val("");
	$("#nof_target_score").val("0");
}

var InsertAppraisalStructureFn = function(Status){
	
	var seq_no = $("#seq_no").val();
	var structure_name = $("#structure_name").val();
	var nof_target_score = $("#nof_target_score").val();
	var form_id = $("#form_id").val();
	var is_unlimited_reward = "0";
	var is_unlimited_deduction = Number($('#is_unlimited_deduction').prop('checked'));
	var is_value_get_zero = Number($('#is_value_get_zero').prop('checked'));
	var is_active = Number($('#is_active').prop('checked'));
	var is_no_raise_value = Number($('#is_no_raise_value').prop('checked'));
	var level_id = $("#level_id").val();
	var is_derive = Number($('#is_derive').prop('checked'));

	$.ajax({
        url: restfulURL+"/"+serviceName+"/public/appraisal_structure",
        type: "post",
        dataType: "json",
        data: {
        	"seq_no":seq_no,
        	"structure_name":structure_name,
        	"nof_target_score":nof_target_score,
        	"form_id":form_id,
        	"is_unlimited_reward":is_unlimited_reward,
        	"is_unlimited_deduction":is_unlimited_deduction,
        	"is_value_get_zero":is_value_get_zero,
        	"is_active":is_active,
        	"is_no_raise_value":is_no_raise_value,
        	"level_id":level_id,
        	"is_derive":is_derive
        },
        async: false,
        headers: { Authorization: "Bearer " + tokenID.token },
        success: function (data) { 
        	if(data['status']=='200'){
        		  		
        		if(Status == 'Save'){
        			callFlashSlide("Insert successed.");
        			ClearAppraisalStructureFn();
        			$("#saveStructureModal").modal('hide');
        			CreateDataStructureTableFn(options); //ja insert
        			$("#table-appraisalStructure thead th").css("vertical-align", "middle");
        	    	$("#modal-appraisalStructure").empty();
        		}else if(Status == 'SaveAnother'){
        			callFlashSlideInModal("Insert success.","#information","");
        			ClearAppraisalStructureFn();
        			createDataTableFn(options);
        			$("#table-appraisalStructure thead th").css("vertical-align", "middle");
        	    	$("#modal-appraisalStructure").empty();
        		}
        	
        	}else if(data['status']=='400'){
        		callFlashSlideInModal(validationFn(data),"#information","error");
			}
        }
	});
}


var CreateDataStructureTableFn = function(options){
	//save option
	golbalDataCascades['options']=options;
	//options['advanceSearchSet']
	var advanceSearchSet =(options['advanceSearchSet'] == '' || options['advanceSearchSet'] == undefined  ? false : options['advanceSearchSet']);
	var expressSearch =(options['expressSearch'] == '' || options['expressSearch'] == undefined  ? false : options['expressSearch']);
	
	$.ajax({
		url: $("#url_portlet").val()+"/theme/basic.html",
		dataType:"html",
		type:"get",
		async:false,
		success:function(data){

			$("#mainContent").html(data);
			
			if(expressSearch==true){
				$("#expressSearchArea").html(createExpressSearchFn());
			}
			if(options['btnAddOption'] == false && options['btnAddOption']!=undefined){
				$("#btnAdd").css({"display":"none"});
			}else{
				$("#btnAddData").html(options['formDetail']['formName']);
				$("#btnAdd").attr({
					"data-target" : "#modal-"+options['formDetail']['id']+"",
					"data-backdrop" : setModalPopup[0],
					"data-keyboard" : setModalPopup[1]
				});
			}
			$("#titilePage").html(options['formDetail']['formName']);
			$("#titlePanel").html(options['formDetail']['formName']+" List");
			//data-target="#modal-databaseConnection"  btnAddOption
			
			
			
			var tableHTML="";
			var styleCss ="text-align: right;";
			var styleCssCenter ="text-align:center;";
			tableHTML+="<table class=\"table table-striped\" id=\"table-"+options['formDetail']['id']+"\" style=\"max-width: none;\">";                               		
			tableHTML+="    <thead>";
			tableHTML+="        <tr>"
			$.each(options['colunms'],function(index,indexEntry){
				if(indexEntry['colunmsType']=='hidden'){
					tableHTML+="            <th d style='width:"+indexEntry['width']+"; display:none;'><b>"+indexEntry['colunmsDisplayName']+"</b></th>";	
				}else{
					if(indexEntry['colunmsDataType'] == "decimal" ||indexEntry['colunmsDataType'] == "int" ){
						tableHTML+="            <th  style='width:"+indexEntry['width']+";"+styleCss+"'><b>"+indexEntry['colunmsDisplayName']+"</b></th>";
					}else if(indexEntry['colunmsDataType'] == "color"){
						tableHTML+="            <th  style='width:"+indexEntry['width']+";"+styleCss+"'><b>"+indexEntry['colunmsDisplayName']+"</b></th>";
					}else if (indexEntry['colunmsType'] == "checkbox" ){
						tableHTML+="            <th  style='width:"+indexEntry['width']+";"+styleCssCenter+"'><b>"+indexEntry['colunmsDisplayName']+"</b></th>";
					}else {tableHTML+="            <th  style='width:"+indexEntry['width']+"'><b>"+indexEntry['colunmsDisplayName']+"</b></th>";}
					
				}
			});
			tableHTML+="           	 	<th style='text-align:center;'><b>Manage</b></th>";
			
			tableHTML+="        </tr>";
			tableHTML+="    </thead>";
			tableHTML+="    <tbody id=\"listData\">";
			
			
			tableHTML+="    </tbody>";
			tableHTML+="</table>";
			$("#tableArea").html(tableHTML);
			
			$("#modalFormArea").html(createFormFn(options));
			
			$.getScript($("#url_portlet").val()+"/js/jscolor-2.0.4/jscolor.js", function(){

				jscolor.installByClassName("jscolor");

			});
			
			
			//binding date picker start
			$( ".datepicker" ).datepicker({ dateFormat: "yy-mm-dd" });
			//binding date picker end
		
		
			if(advanceSearchSet==true){
				
				$("#advanceSearchParamArea").html(createAvanceSearchFn(options));
				$("#advanceSearchArea").show();
			
			}else{
				$("#advanceSearchArea").hide();
			}
			createScriptCascadesFn(options);
			if(options['btnAdvanceSearchOption']!=undefined){
				$("#btnAdvanceSearchOption").html(createBtnAdvanceSearchOptionFn(options['btnAdvanceSearchOption']));
			}
			if(options['btnAdvanceSearchLastOption']!=undefined){
				$("#btnAdvanceSearchLastOption").html(createBtnAdvanceSearchOptionFn(options['btnAdvanceSearchLastOption']));
			}
			if(options['btnAdvanceDownloadOption']!=undefined){
				$("#btnAdvanceDownloadOption").html(createBtnAdvanceDownloadOptionFn());
				$("#exportToExcel").click(function(){
					$("form#formExportToExcel").attr("action",options['btnAdvanceDownloadOption']['url']);
				});
			}
			if(options['btnAdvanceImportOption']!=undefined){
				$("#btnAdvanceImportOption").html(createBtnAdvanceImportOptionFn(options['btnAdvanceImportOption']));
				//################################################
				//FILE IMPORT START
				
				$.getScript($("#url_portlet").val()+"/js/dropify.js", function(){
					
					// Basic
				     $('.dropify').dropify();

				     // Translated
				      $('.dropify-fr').dropify({
				         messages: {
				         	 'default': 'Glissez-dposez un fichier ici ou cliquez',
				             replace: 'Glissez-dposez un fichier ou cliquez pour remplacer',
				             remove:  'Supprimer',
				             error:   'Dsol, le fichier trop volumineux'
				         }
				     });
					// Used events
				     var drEvent = $('#input-file-events').dropify();

				     drEvent.on('dropify.beforeClear', function(event, element){
				         return confirm("Do you really want to delete \"" + element.file.name + "\" ?");
				     });

				     drEvent.on('dropify.afterClear', function(event, element){
				         alert('File deleted');
				     });

				     drEvent.on('dropify.errors', function(event, element){
				         console.log('Has Errors');
				     });

				     var drDestroy = $('#input-file-to-destroy').dropify();
				     drDestroy = drDestroy.data('dropify');
				     $('#toggleDropify').on('click', function(e){
				         e.preventDefault();
				         if (drDestroy.isDropified()) {
				             drDestroy.destroy();
				         } else {
				             drDestroy.init();
				         }
				     });

				});
				
				$("#btn_import").click(function () {
					$('#modal-import #file').val("");
					$(".btnModalClose").click();
					$(".dropify-clear").click(); 
				});
				// Variable to store your files
				var files;
				// Add events
				$('#file').on('change', prepareUpload2);

				// Grab the files and set them to our variable
				function prepareUpload2(event)
				{
				  files = event.target.files;
				}
				$('form#fileImport').on('submit', uploadFiles);

				// Catch the form submit and upload the files
				function uploadFiles(event)
				{
					
					event.stopPropagation(); // Stop stuff happening
					event.preventDefault(); // Totally stop stuff happening

					// START A LOADING SPINNER HERE

					// Create a formdata object and add the files
					var data = new FormData();
					$.each(files, function(key, value)
					{
						data.append(key, value);
					});
					$("body").mLoading();
					$.ajax({
						url:options['serviceName']+"/import",
						type: 'POST',
						data: data,
						cache: false,
						dataType: 'json',
						processData: false, // Don't process the files
						contentType: false, // Set content type to false as jQuery will tell the server its a query string request
						headers:{Authorization:"Bearer "+tokenID.token},
						success: function(data, textStatus, jqXHR)
						{
							
							console.log(data);
							if(data['status']==200 && data['errors'].length==0){
										
								callFlashSlide(""+options['btnAdvanceImportOption']['formName']+" Successfully");
								getDataFn($("#pageNumber").val(),$("#rpp").val(),golbalDataCascades['options'],dataSearch);
								$("body").mLoading('hide');
								$("#modal-import").modal('hide');
								
							}else{
								validateFileFn(data['errors']);
								getDataFn($("#pageNumber").val(),$("#rpp").val(),golbalDataCascades['options'],dataSearch);
								$("body").mLoading('hide');
							}
						},
						error: function(jqXHR, textStatus, errorThrown)
						{
							// Handle errors here
							callFlashSlide('Format Error : ' + textStatus);
							// STOP LOADING SPINNER
						}
					});
					return false;
				}
				
				
				//################################################
				
			}
			var getSelectionStart = function (o) {
				if (o.createTextRange) {
					var r = document.selection.createRange().duplicate()
					r.moveEnd('character', o.value.length)
					if (r.text == '') return o.value.length
					return o.value.lastIndexOf(r.text)
				} else return o.selectionStart
			};
//			jQuery('.numberOnly').keypress(function (evt) { 
//				//console.log("Keypress");
//				 var charCode = (evt.which) ? evt.which : event.keyCode;
//				 var number = this.value.split('.');
//				 if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
//				    return false;
//				 }
//				    //just one dot
//				 if(number.length>1 && charCode == 46){
//				    return false;
//				 }
//				    //get the carat position
//				 var caratPos = getSelectionStart(this);
//				 var dotPos = this.value.indexOf(".");
//				 if( caratPos > dotPos && dotPos>-1 && (number[1].length > 1)){
//				    return false;
//				 }
//				 return true;
//			});
			$.getScript($("#url_portlet").val()+"/js/plugins/jquery_mask/jquery.mask.min.js", function(){

				  $('.ip_address').mask('0ZZ.0ZZ.0ZZ.0ZZ', {
					    translation: {
					      'Z': {
					        pattern: /[0-9]/, optional: true
					      }
					    },
					    onChange: function(cep, event, currentField, options){
					        if(cep){
					            var ipArray = cep.split(".");
					            for (i in ipArray){
					                if(ipArray[i] != "" && parseInt(ipArray[i]) > 255){
					                    ipArray[i] =  '255';
					                }
					            }
					            var resultingValue = ipArray.join(".");
					            $(currentField).val(resultingValue);
					        }
					    }
					  });
				  $('.numberOnly').mask('Z9999999999.00', {

					  translation: {
					    'Z': {
					       pattern: /-/,
					      optional: true
					    }
					  }
					})

			});
//			$.getScript($("#url_portlet").val()+"/js/jquery.inputmask.bundle.js", function(){
//				$('.numberOnly').inputmask("numeric", {
//				    radixPoint: ".",
//				    groupSeparator: ",",
//				    digits: 2,
//				    autoGroup: true,
//				    //prefix: '$ ', //Space after $, this will not truncate the first character.
//				    rightAlign: false,
//				    oncleared: function () { self.Value(''); }
//				});
//			});
//			$(".numberOnly").ForceNumericOnly();
//			$(".numberOnly").keyup(function (e) {
//				IsNumeric($(this).val(),this);
////				Â  Â  Â  Â  // Allow: backspace, delete, tab, escape, enter and .
////					
////				Â  Â  Â  Â  if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
////				Â  Â  Â  Â  Â  Â  Â // Allow: Ctrl+A, Command+A
////				Â  Â  Â  Â  Â  Â  (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||Â 
////				Â  Â  Â  Â  Â  Â  Â // Allow: home, end, left, right, down, up
////				Â  Â  Â  Â  Â  Â  (e.keyCode >= 35 && e.keyCode <= 40)) {
////				Â  Â  Â  Â  Â  Â  Â  Â  Â // let it happen, don't do anything
////				Â  Â  Â  Â  Â  Â  Â  Â  Â return;
////				Â  Â  Â  Â  }
////				Â  Â  Â  Â  // Ensure that it is a number and stop the keypress
////				Â  Â  Â  Â  if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
////				Â  Â  Â  Â  Â  Â  e.preventDefault();
////				Â  Â  Â  Â  }
//				});
			
			
			
			//AutoComplete Search Start
			
			//AutoComplete Search End
			
			$("#btnSubmit").click(function(){
				//
				//alert("hellojquery");
				var checkboxes = $("form#"+options['formDetail']['id']).find('input[type="checkbox"]');
				$.each( checkboxes, function( key, value ) {
				    if (value.checked === false) {
				        value.value = 0;
				       
				    } else {
				        value.value = 1;
				    
				    }
				   // $(value).attr('type', 'hidden');
				});
				
				var data = $("form#"+options['formDetail']['id']).serialize();
				//console.log(data);
				
				if($("#action").val()=="add"){
					//console.log(data);
					insertFn(data,options);
				}else{
					console.log(data);
					updateFn(data,options);
				}
			});
			
			
			$("#btnAddAnother").click(function(){

				var checkboxes = $("form#"+options['formDetail']['id']).find('input[type="checkbox"]');
				$.each( checkboxes, function( key, value ) {
				    if (value.checked === false) {
				        value.value = 0;
				       
				    } else {
				        value.value = 1;
				    
				    }
				   // $(value).attr('type', 'hidden');
				});
				var data = $("form#"+options['formDetail']['id']).serialize();
				insertFn(data,options,'saveAndAnother');
			});
			
			$("#btnSearch")	.click(function(){
				searchMultiFn($("#searchText").val(),options['formDetail']['id']);
			});
			
			$("#btnAdd").click(function(){
				//$("#modalFormArea").html(createFormFn(options));
				clearFn(options);
				$("#btnAddAnother").show();
				$("#modalFormArea select option:first").prop("selected", true);
				
				$(window).scrollTop(0);
				setTimeout(function(){
					$(".modal-body").scrollTop(0);
				});
				
			});
			
			//advance search start
	    	$("form#searchAdvanceForm").submit(function(){
	    		
	    		
	    		sessionStorage.setItem("searchAdvanceForm",$(this).serialize());
	    		dataSearch = sessionStorage.getItem("searchAdvanceForm");
	    		$(".countPagination").val(10);
	    		$("#rpp").remove();
	    		getDataFn($("#pageNumber").val(),$("#rpp").val(),options,dataSearch);

	    		return false;
	    	});
	    	
	    	if(advanceSearchSet==false){
	    		getDataFn($("#pageNumber").val(),$("#rpp").val(),options,dataSearch);
	    	}
	    	//advance search end
	    	setThemeColorFn(tokenID.theme_color);
		}
	});
}



var ToggledFlagOnSaveStructureModal = function(formIdValue){
	if(formIdValue == 1){
		// Disabled Deduct and Reward //
		$("#is_unlimited_deduction_header, #is_value_get_zero_header, #is_unlimited_reward_header, #is_no_raise_value_header").hide();
		$("#is_unlimited_deduction, #is_value_get_zero, #is_unlimited_reward, #is_no_raise_value").prop('checked',false);
		
		// Enabled Derive and Level (form type 1 only) //
		$('#level_id').val($("#level_id option:eq(0)").val());
		$('#is_derive').prop('checked', true);
		$('#form-group-level_id').show();
		$('#form-group-is_derive').show();
		
	} else if(formIdValue == 2){
		// Disabled Deduct and Reward //
		$("#is_unlimited_deduction_header, #is_value_get_zero_header, #is_unlimited_reward_header, #is_no_raise_value_header").hide();
		$("#is_unlimited_deduction, #is_value_get_zero, #is_unlimited_reward, #is_no_raise_value").prop('checked',false);
		
		// Disabled Derive and Level //
		$('#level_id').val('');
		$('#is_derive').prop('checked', false);
		$("#form-group-level_id").hide();
		$("#form-group-is_derive").hide();
		
	} else if(formIdValue == 3) { //if Deduct Score
		// Disabled Reward //
		$("#is_unlimited_reward_header").hide();
		$("#is_unlimited_reward").prop('checked',false);
		
		// Enabled Deduct //
		$("#is_unlimited_deduction_header, #is_value_get_zero_header, #is_no_raise_value_header").show();
		$("#is_unlimited_deduction, #is_value_get_zero").prop('checked',true);
		$("#is_no_raise_value").prop('checked', false);
		
		// Disabled Derive and Level //
		$('#level_id').val('');
		$('#is_derive').prop('checked', false);
		$("#form-group-level_id").hide();
		$("#form-group-is_derive").hide();
		
	} else if(formIdValue == 4) { //if Reward Score
		// Disabled Deduct //
		$("#is_unlimited_deduction_header, #is_value_get_zero_header, #is_no_raise_value_header").hide();
		$("#is_unlimited_deduction, #is_value_get_zero, #is_no_raise_value").prop('checked',false);
		
		// Enabled Reward //
		$("#is_unlimited_reward_header").show();
		$("#is_unlimited_reward").prop('checked',true);
		
		// Disable Derive and Level //
		$('#level_id').val('');
		$('#is_derive').prop('checked', false);
		$("#form-group-level_id").hide();
		$("#form-group-is_derive").hide();
	}
}

$(document).ready(function(){
    	
	 var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		 if(connectionServiceFn(username,password,plid)==true){

	    	options={
	    			"colunms":[
	    			           {"colunmsDisplayName": "Seq", "width":"auto", "id":"seq_no", "colunmsType":"text"},
	    			           {"colunmsDisplayName":"Structure Name", "width":"auto", "id":"structure_name", "colunmsType":"text"},
	    			           {"colunmsDisplayName":"#Target Score", "width":"auto", "id":"nof_target_score", "colunmsType":"text", "colunmsDataType":"int"},
	    			           {"colunmsDisplayName":"Type", "width":"auto", "id":"form_name", "colunmsType":"text"},
	    			           {"colunmsDisplayName":"Level", "width":"auto", "id":"level_name", "colunmsType":"text"},
	    			           {"colunmsDisplayName":"Unlimited Reward", "width":"10%", "id":"is_unlimited_reward", "colunmsType":"checkbox"},
	    			           {"colunmsDisplayName":"Unlimited Deduction", "width":"10%", "id":"is_unlimited_deduction", "colunmsType":"checkbox"},
	    			           {"colunmsDisplayName":"Value Get Zero", "width":"10%", "id":"is_value_get_zero", "colunmsType":"checkbox"},
	    			           {"colunmsDisplayName":"IsDerive", "width":"5%", "id":"is_derive", "colunmsType":"checkbox"},
	    			           {"colunmsDisplayName":"IsActive", "width":"5%","id":"is_active","colunmsType":"checkbox"},
	
	    			          ],
	    			"form":[   {
						       "label":"Seq","inputType":"text","placeholder":"Seq",
						       "id":"seq_no","width":"250px","dataTypeInput":"number","required":true,
						       },
						       {
	    					   "label":"Structure Name","inputType":"text","placeholder":"Structure Name",
	    					   "id":"structure_name","width":"250px","required":true,
	    					   },
	    					   {
	    	    				"label":"#Target Score","inputType":"text","placeholder":"Target Score","default":"0",
	    	    				"id":"nof_target_score","width":"250px","dataTypeInput":"number","required":true,
	    					   },
	    					   {
		    					"label":"Form Type","inputType":"dropdown","default":"All",
		    					"id":"form_id","width":"250px","url":""+restfulURL+"/"+serviceName+"/public/appraisal_structure/form_list"
		    					},
		    					{
		            				"label":"Level","inputType":"dropdown","default":"All",
		            				"id":"level_id","width":"250px", "url":""+restfulURL+"/"+serviceName+"/public/appraisal_structure/level_list"
		            			},
		    					{
		            				"label":"IsDerive","inputType":"checkbox","default":"checked",
		            				"id":"is_derive","width":"250px"
		            			},
	        					{
	            				"label":"IsActive","inputType":"checkbox","default":"checked",
	            				"id":"is_active","width":"250px"
	            				}
	    					
		    				],
	    			"formIf":[	{
			        				"style":"display:none;","class_header":"\"is_unlimited_reward_header\"",
									"label":"Unlimited Reward","inputType":"checkbox","default":"unchecked",
			        				"id":"is_unlimited_reward","width":"250px"
		        				},
		        				{
		            				"style":"display:none;","class_header":"\"is_unlimited_deduction_header\"",
		    						"label":"Unlimited Deduction","inputType":"checkbox","default":"unchecked",
		            				"id":"is_unlimited_deduction","width":"250px"
	            				},
	            				{
			            			"style":"display:none;","class_header":"\"is_value_get_zero_header\"",
			    					"label":"Value Get Zero","inputType":"checkbox","default":"unchecked",
			            			"id":"is_value_get_zero","width":"250px"
		            			},
		            			{
		            				"style":"display:none;","class_header":"\"is_no_raise_value_header\"",
			    					"label":"No Raise Value","inputType":"checkbox","default":"unchecked",
			            			"id":"is_no_raise_value","width":"250px"
		            			}
	    			     	 ],
	    			 "formDetail":{"formSize":"modal-dialog","formName":"Appraisal Structure","id":"appraisalStructure","pk_id":"structure_id"},       
	    			 "serviceName":[restfulURL+"/"+serviceName+"/public/appraisal_structure"],
	    			 "tokenID":tokenID,
	    			 "pagignation":false,
	    			 "expressSearch":false,
	    			 "advanceSearchSet":false,
	    	}
	    	
	    	CreateDataStructureTableFn(options);
	    	$("#table-appraisalStructure thead th").css("vertical-align", "middle");
	    	$("#modal-appraisalStructure").empty();
	    	
	    	// using new modal
	    	$("#btnAdd").attr("data-target", "#saveStructureModal");
	    	
	    	// $("#btnAdd").off("click");
	    	$("#btnAdd").unbind( "click" );
	        $("#btnAdd").on("click", function () {
	        	
	        	// generate option into select tag
	        	GenerateOptionIntoFormType(0);
	        	GenerateOptionIntoIsDeriveLevel(0);
	        	
	        	$("#form_id").change(function() {
	        		ToggledFlagOnSaveStructureModal(this.value);
		    	});
		    	$("#form_id").change();
		    	
		    	// is_derive change
		    	$('#is_derive').change(function() {
		    		if(this.checked) {
		    			$('#level_id').val($("#level_id option:eq(0)").val());
		    			$('#form-group-level_id').show();
		    		} else {
		    			$('#level_id').val("0");
		    			$('#form-group-level_id').hide();
		    		}
		    		$('#textbox1').val(this.checked);
		    	});
		    	
		    	
		    	// submit 
		    	$("#btnSetweightSubmit").click(function(){
		    		InsertAppraisalStructureFn("Save");
	     		});
		    	
		    	$("#btnSetweightSubmitAnother").click(function(){
		    		InsertAppraisalStructureFn("SaveAnother");
	     		});
		    	
		    	
	        })
	    
	 	}
	 }
	 $(".popover-edit-del").popover({delay:{hide:100}});
	 $("#tableArea").off("click",".popover-edit-del");
	 $("#tableArea").on("click",".popover-edit-del",function(){
	    var eml = $(this).next().find('button[id^=edit-]');
	    eml.removeClass('edit').removeAttr("data-target").removeAttr("data-toggle");
	    eml.addClass('newEdit')
	 });
	 
	// update
//	 $("#btnAdd").off( "click" );
//     $(".edit").unbind( "click" );
//     $(".edit").on("click", function () {
//     	alert("test");
//     })
     
});