// var restfulPathDashboard="/"+serviceName+"/public/cds_result";
 var galbalDataTemp = [];
 var galbalData = [];
 
//# Generate Drop Down List
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
 				if(index==0 && indexEntry!=""){
 					html+="<option selected value="+indexEntry[Object.keys(indexEntry)[0]]+">"+indexEntry[Object.keys(indexEntry)[1] == undefined  ?  Object.keys(indexEntry)[0]:Object.keys(indexEntry)[1]]+"</option>";	
 				}else{
 					html+="<option value="+indexEntry[Object.keys(indexEntry)[0]]+">"+indexEntry[Object.keys(indexEntry)[1] == undefined  ?  Object.keys(indexEntry)[0]:Object.keys(indexEntry)[1]]+"</option>";	
 	 				
 				}
 			});	

 		}
 	});	
 	return html;
 };
 var generateAutocomplete = function(id,url,type,requests){
	 $(id).autocomplete({
	        source: function (request, response) {
	        	requests[Object.keys(requests)] = request.term;
	        	$.ajax({
					 url:url,
					 type:type,
					 dataType:"json",
					 data:requests,
					//async:false,
					 headers:{Authorization:"Bearer "+tokenID.token},
	                 error: function (xhr, textStatus, errorThrown) {
	                        console.log('Error: ' + xhr.responseText);
	                    },
					 success:function(data){
						  
							response($.map(data, function (item) {
	                            return {
	                                label: item[Object.keys(item)[1]],
	                                value: item[Object.keys(item)[1]],
	                                value_id : item[Object.keys(item)[0]]
	                                
	                            };
	                        }));
						
					},
					beforeSend:function(){
						$("body").mLoading('hide');	
					}
					
					});
	        },
			select:function(event, ui) {
				$(id).val(ui.item.value);
	            $(id+"_id").val(ui.item.value_id);
	            galbalDataTemp[id] = ui.item.label;
	            galbalDataTemp[id+"_id"]=ui.item.value_id;
	            return false;
	        },change: function(e, ui) {  

	 
				if ($(id).val() == galbalDataTemp[id]) {
					$(id+"_id").val(galbalDataTemp[id+"_id"]);
				}  else if (ui.item != null){
					$(id+"_id").val(ui.item.value_id);
				}else {
					$(id+"_id").val("");
				}
	         }
	    });
 }
 
 var dropDrowPeriodFn = function(paramPeriod,paramAssignFrequency){
		
		var htmlOption="";
		
		
		if(paramAssignFrequency==1){
			htmlOption+="<option value=''></option>";
		}else{
			$("#period").removeAttr("disabled");
		}
		
		$.ajax({
			url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/period_list",
			type:"get",
			dataType:"json",
			async:false,
			headers:{Authorization:"Bearer "+tokenID.token},
			data:{"appraisal_year":$("#YearList").val(),"frequency_id":$("#periodFrequency").val()},
			success:function(data){
				
				
				$.each(data,function(index,indexEntry){
					if(index==0 && paramAssignFrequency==0){
						htmlOption+="<option selected='selected' value="+indexEntry['period_id']+">"+indexEntry['appraisal_period_desc']+"</option>";
					}else{
						htmlOption+="<option value="+indexEntry['period_id']+">"+indexEntry['appraisal_period_desc']+"</option>";
					}
				});
				$("#period_id").html(htmlOption);
				
				if(paramAssignFrequency==1){
					$("#period_id").attr("disabled","disabled");
				}else{
					$("#period_id").removeAttr("disabled");
				}
				
					
			}
		});
		
	}
 var getDataFn = function(){

		
		var level_id		= 	$("#embed_appraisal_level_id").val().split(",");
		var position_id		= 	$("#embed_position_id").val();
		var org_id 			=	$("#embed_organization").val().split(",");
		$.ajax({
			url : restfulURL+"/"+serviceName+"/public/import_assignment/item_list",
			type : "get",
			dataType : "json",
			data:{
				"position_id"			:		position_id,
				"level_id"				:		level_id,
				"org_id"				:		org_id	
			},
			headers:{Authorization:"Bearer "+tokenID.token},
			async:false,// w8 data 
			success : function(data) {
				if(data['status'] == 200 && data['data'] != ""){
					galbalData=data['data'];
					listAssignmentFn(data['data']);
					$("#import_assignment_list_content").show();
				}
				else {
					callFlashSlide("Data not found!");
					$("#import_assignment_list_content").hide();
				}

				
			}
		});	
};

var listAssignmentFn = function(data){
	var htmlTable = "";
	$.each(data,function(index,indexEntry) {


		htmlTable += "<div class='ibox-title2'><div class='titlePanelSub' style='padding-top: 5px;'>"+indexEntry['structure_name']+"</div></div>";
		htmlTable += "<table class='table table-striped' >";
		htmlTable += "<thead>";
		htmlTable += "	<tr>";
		htmlTable += "		<th style='width: 10px;vertical-align: middle;'><input  style='margin-bottom: 3px;' type='checkbox'  class='selectAllCheckbox' id='strCheckbox-"+indexEntry['structure_id']+"' value='"+indexEntry['structure_id']+"'></th>";
		htmlTable += "		<th style='width: auto'>KPI&nbsp;Name&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th>";
		htmlTable += "	</tr>";
		htmlTable += "</thead>";
		htmlTable += "<tbody>";
  
		$.each(indexEntry['data'],function(index2,indexEntry2) {

			htmlTable += "<tr class='rowSearch'>";
			htmlTable += "<td id=\"objectCenter\" class='objectCenter 'style=\"\">"+"<input  style=\"margin-bottom: 3px;\"type=\"checkbox\"  class='selectCheckbox selectStructure-"+indexEntry['structure_id']+"' id=kpiCheckbox-"+indexEntry2["item_id"]+" value=\""+indexEntry2["item_id"]+"\">"+ "</td>";
			htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+notNullTextFn(indexEntry2["item_name"])+"</td>";
			htmlTable += "</tr>";
  
		});
		htmlTable += "</tbody>";
		htmlTable += "</table>";
		
	});
	

	$("#listAssignment").html(htmlTable);
	setThemeColorFn(tokenID.theme_color);
	$("#listAssignment").off("click",".selectAllCheckbox");
	$(".selectAllCheckbox").on("click",function() {
		var id = $(this).val();
		if($(this).is(":checked")){
			
			$(".selectStructure-"+id+"").prop('checked', true); 
			
		}else{
			$(".selectStructure-"+id+"").prop('checked', false); 
		}
	});
};
 
 var searchAdvanceFn = function () {
	//embed parameter start
		
		$(".embed_param_search").remove();
		
		var embedParam="";
		embedParam+="<input type='hidden' class='embed_param_search' id='embed_appraisal_type_id' name='embed_appraisal_type_id' value='"+$("#appraisalType").val()+"'>";
		embedParam+="<input type='hidden' class='embed_param_search' id='embed_emp_id' name='embed_emp_id' value='"+$("#empName_id").val()+"'>";
		embedParam+="<input type='hidden' class='embed_param_search' id='embed_position_id' name='embed_position_id' value='"+$("#Position_id").val()+"'>";
		embedParam+="<input type='hidden' class='embed_param_search' id='embed_appraisal_level_id' name='embed_appraisal_level_id' value='"+($("#appraisalLevel").val() == null ? "":$("#appraisalLevel").val())+"'>";
		embedParam+="<input type='hidden' class='embed_param_search' id='embed_organization' name='embed_organization' value='"+($("#organization").val() == null ? "":$("#organization").val())+"'>";
		embedParam+="<input type='hidden' class='embed_param_search' id='embed_year_list' name='embed_year_list' value='"+$("#YearList").val()+"'>";
		embedParam+="<input type='hidden' class='embed_param_search' id='embed_period_frequency' name='embed_period_frequency' value='"+$("#periodFrequency").val()+"'>";
		embedParam+="<input type='hidden' class='embed_param_search' id='embed_assign_frequency' name='embed_assign_frequency' value='"+$("#assignFrequency").val()+"'>";
		embedParam+="<input type='hidden' class='embed_param_search' id='embed_period_id' name='embed_period_id' value='"+$("#period_id").val()+"'>";
			
		$("#embedParamSearch").append(embedParam);
		
		getDataFn();

};
 
var listErrorFn = function(data){
	var validateFile="";

$.each(data,function(index,indexEntry){
   if(indexEntry['appraisal_type_id'] == null || indexEntry['appraisal_type_id'] == "" ){
				validateFile+="<font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font> Appraisal_type_id : null , ";
			}else{
				validateFile+="<font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font> Appraisal_type_id : "+indexEntry['appraisal_type_id']+", ";
			}
			if(indexEntry['emp_id'] == null || indexEntry['emp_id'] == "" ){
				validateFile+="<font color='#FFC446'></i></font> Emp_id : null, ";
			}else{
				validateFile+="<font color='#FFC446'></i></font> Emp_id : "+indexEntry['emp_id']+", ";
			}
			if(indexEntry['level_id'] == null || indexEntry['level_id'] == "" ){
				validateFile+="<font color='#FFC446'></font> Level_id : null, ";
			}else{
				validateFile+="<font color='#FFC446'></font> Level_id : "+indexEntry['level_id']+", ";
			}
			if(indexEntry['org_id'] == null || indexEntry['org_id'] == "" ){
				validateFile+="<font color='#FFC446'></font> Org_id : null,<br>";
			}else{
				validateFile+="<font color='#FFC446'></font> Org_id : "+indexEntry['org_id']+",<br>";
			}
			if(indexEntry['period_id'] == null || indexEntry['period_id'] == "" ){
				validateFile+="<font color='#FFC446'></font> Period_id : null, <br>";
			}else{
				validateFile+="<font color='#FFC446'></font> Period_id : "+indexEntry['period_id']+" <br>";
			}
    $.each(indexEntry['data'],function(index2,indexEntry2){
	    	 validateFile+="<font color='red'>&emsp;*</font> "+indexEntry2+"<br>";
	     });
    
	 
	});
	callFlashSlideInModal(validateFile,"#information","error");
	/*return errorData;*/
}


 $(document).ready(function(){
	var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		 if(connectionServiceFn(username,password,plid)==false){
	 		return false;
	 	}
		 
		$("#organization").multiselect({
				 minWidth:'100%;'
		});		
		 $("#appraisalType").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/appraisal_assignment/appraisal_type_list","GET"));
		 
		$("#appraisalType").change(function(){
			$("#appraisalLevel").empty();
			$("#appraisalLevel").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/import_assignment/level_list","GET",{"appraisal_type_id":$("#appraisalType").val()}));				
			 //$("#appraisalLevel").change();
			$("#appraisalLevel").multiselect( 'refresh' );
		});
		generateAutocomplete("#empName",restfulURL+"/"+serviceName+"/public/cds_result/auto_emp_name","post",{"emp_name":null});
		generateAutocomplete("#Position",restfulURL+"/"+serviceName+"/public/appraisal_assignment/auto_position_name","post",{"position_name":null});
		$("#appraisalLevel").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/import_assignment/level_list","GET",{"appraisal_type_id":$("#appraisalType").val()}));		
		$("#appraisalLevel").change(function(){
			$("#organization").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/import_assignment/org_list","GET",{"appraisal_type_id":$("#appraisalType").val(),"level_id":$("#appraisalLevel").val()}));
//			$("#organization").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/import_assignment/org_list","GET",{"level_id":$("#appraisalLevel").val()}));
			$("#organization").multiselect( 'refresh' );
		});
//		$("#appraisalType").change();
		$("#appraisalLevel").change();
		$("#YearList").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/appraisal/year_list","GET"));
		$("#periodFrequency").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/appraisal_assignment/frequency_list","GET"));
		$("#appraisalLevel").multiselect({
			 minWidth:'100%;'
		});
		
		$(".app_url_hidden").show();
		
		
		
		$("#periodFrequency").change(function(){
			dropDrowPeriodFn($(this).val(),$("#assignFrequency").val());
		});
		$("#assignFrequency").change(function(){
			dropDrowPeriodFn($("#periodFrequency").val(),$(this).val())
		});
		$("#assignFrequency").change();
		$("#appraisalType").change(function(){
			if($("#appraisalType").val() == "2"){

				$("#empName,#Position").removeAttr('disabled');
				$("#apprasiaLevel").attr("disabled", 'disabled');
			
			}else if($("#appraisalType").val() == "1"){
				
				$("#empName,#Position").attr("disabled", 'disabled');
				$("#empName,#empName_id,#Position,#Position_id").val("");
			
				
			}
		});
		
		//Search Start
		$("#btnSearchAdvance").click(function(){
			
			searchAdvanceFn();
			
		});
		
		
		
		//#### Call Export Function Start ####
		$("#exportToExcel").click(function(){
	
			var chackSelect =  $(".selectCheckbox").is(":checked");
			console.log($(".selectCheckbox").is(":checked"));
			if (chackSelect == true){
				var item_id =[];
				$.each($(".selectCheckbox").get(),function(index,indexEntry){
					if($(indexEntry).is(":checked")){
						item_id.push($(indexEntry).val());
					}
				});
				

				var param="";
				param+="&appraisal_type_id="		+		$("#embed_appraisal_type_id").val();

				$.each(item_id,function(index,indexEntry){
				      param+="&appraisal_item_id[]="+indexEntry;
				});

				$.each($("#embed_appraisal_level_id").val().split(","),function(index,indexEntry){
				      param+="&appraisal_level_id[]="+indexEntry;
				});
				$.each($("#embed_organization").val().split(","),function(index,indexEntry){
				      param+="&org_id[]="+indexEntry;
				});
				param+="&position_id="				+		$("#embed_position_id").val();
				param+="&emp_id="					+		$("#embed_emp_id").val();
				param+="&period_id="				+		$("#embed_period_id").val();
				param+="&appraisal_year="			+		$("#embed_year_list").val();
				param+="&frequency_id="				+		$("#embed_period_frequency").val();
				
				$("form#formExportToExcel").attr("action",restfulURL+"/"+serviceName+"/public/import_assignment/export?token="+tokenID.token+""+param);
				$("form#formExportToExcel").submit();
				
				}
			else{
				callFlashSlide("Please Select KPI Name !!!");
			}
			
			
		});
	    //#### Call Export Function End ####
		
		
		//FILE IMPORT MOBILE START
		$("#btn_import").click(function () {
			$('#file').val("");
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
		};
		$('form#fileImportAssignment').on('submit', uploadFiles);

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
				url:restfulURL+"/"+serviceName+"/public/import_assignment/import",
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
								
						callFlashSlide("Import Assignment Successfully");
						//getDataFn();
						$("body").mLoading('hide');
						$('#file').val("");
						$('#ModalImport').modal('hide');
						
					}else{
						listErrorFn(data['errors']);
						//getDataFn();
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
		};
		//binding tooltip start
		 $('[data-toggle="tooltip"]').css({"cursor":"pointer"});
		 $('[data-toggle="tooltip"]').tooltip({
			 html:true
		 });
		//binding tooltip end
		// Basic
	     $('.dropify').dropify();

	     // Translated
	      $('.dropify-fr').dropify({
	         messages: {
	         	 default: 'Glissez-d�posez un fichier ici ou cliquez',
	             replace: 'Glissez-d�posez un fichier ou cliquez pour remplacer',
	             remove:  'Supprimer',
	             error:   'D�sol�, le fichier trop volumineux'
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
		
		 
		 
	 }
 });