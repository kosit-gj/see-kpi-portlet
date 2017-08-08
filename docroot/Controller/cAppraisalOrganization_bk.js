var restfulPathOrganization="/see_api/public/org";
var tempOrgName = "";
var tempOrgId= "";
var golbalDataError = [];
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
//------------------- GetData FN Start ---------------------
var getDataFn = function(page,rpp){
	//var month= $("#drop_down_list_month").val();
	
	$.ajax({
		url : restfulURL+restfulPathOrganization,
		type : "get",
		dataType : "json",
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,// w8 data 
		success : function(data) {
			listOrganizationFn(data);
			
		}
	});
	
};
//*********** getdata end *********************//

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
var listOrganizationFn = function(data){
	var htmlOrg='';
	var IsActive ="";
	$.each(data,function(index,indexEntry){
		if (indexEntry["is_active"]=="1"){
			IsActive ="<input disabled type=\"checkbox\"  value=\"1\" checked>";
		}else if (indexEntry["is_active"]=="0"){
			IsActive ="<input disabled type=\"checkbox\"  value=\"0\" >";
		}
		
		htmlOrg += "<tr class='rowSearch'>";
		htmlOrg += "<td style='vertical-align: middle;'>"+ indexEntry["org_code"]+ "</td>";
		htmlOrg += "<td style='vertical-align: middle;'>"+ indexEntry["org_name"]+ "</td>";
		htmlOrg += "<td style='vertical-align: middle;'>"+ indexEntry["parent_org_name"]+ "</td>";
		htmlOrg += "<td class='objectCenter'>"+IsActive+"</td>";
		
		htmlOrg += "<td class='objectCenter'><i class=\"fa fa-cog font-gear popover-edit-del\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-trigger=\"focus\" tabindex=\""+index+"\" data-content=\"<button class='btn btn-warning btn-xs edit' id="+ indexEntry["org_id"]+ " data-target=#ModalOrganization data-toggle='modal'>Edit</button>&nbsp;" ;
		htmlOrg += "<button id="+indexEntry["org_id"]+" class='btn btn-danger btn-xs del'>Delete</button>\"></i></td>";
		htmlOrg += "</tr>";
	});
	$('#listOrganization').html(htmlOrg);
	//function popover
	$(".popover-edit-del").popover();
	$("#tableOrganization").off("click",".popover-edit-del");
	$("#tableOrganization").on("click",".popover-edit-del",function(){
		
			$(".edit").on("click",function() {
			clearFn();
			
			$(this).parent().parent().parent().children().click();
			//$("#btnAddAnother").hide();
			//$("#txt_sample_data").attr("disabled","disabled"); 
			
			findOneFn(this.id);
			//alert($("#checkbox_is_sql:checked").is(":checked"));
			
			$("#id").val(this.id);
			$("#action").val("edit");	
			
			
		});
		
		
		$(".del").on("click",function(){
			var id = this.id;
			$(this).parent().parent().parent().children().click();
			 
			$("#confrimModal").modal();
			$(document).off("click","#btnConfirmOK");
			$(document).on("click","#btnConfirmOK",function(){
			
				$.ajax({
					 url:restfulURL+restfulPathOrganization+"/"+id,
					 type : "delete",
					 dataType:"json",
					 headers:{Authorization:"Bearer "+tokenID.token},
					success:function(data){    
				    	 
					     if(data['status']==200){
					    	 
					       callFlashSlide("Delete Successfully.");
					       getDataFn();
					       clearFn();
					       $("#confrimModal").modal('hide');
					       
					     }else if (data['status'] == "400"){
					    	 callFlashSlideInModal(data['data'],"#inform_on_confirm","error");
					    	}
					 }
				});
				
			});
			
		});	
		
	});
	
	
};
//*********** listEmpThresholdFn end *********************//


//************ clear start *********//

var clearFn = function() {
	 
	$("#mOrgCode").val("");
	$("#mOrgName").val("");
	$("#mOrgParentName").val("");
	$("#mOrgParentId").val("");
	$("#checkbox_is_active").prop("checked",false);
	
	$(".btnModalClose").click();
	
	$("#id").val("");
	$("#action").val("add");
};

//************** clear end *********//




//..................update start.......................
var updateFn = function() {
	

	var checkboxIsActive="";

	if($("#checkbox_is_active:checked").is(":checked")){
		checkboxIsActive="1";
	}else{
		checkboxIsActive="0";
	}
	
	$.ajax({
		url:restfulURL+restfulPathOrganization+"/"+$("#id").val(),
		type : "PATCH",
		dataType : "json",
		data : {
			"org_code":$("#mOrgCode").val(),
			"org_name":$("#mOrgName").val(),
			"parent_org_code":$("#mOrgParentId").val(),
			"is_active":checkboxIsActive
		},	
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			if (data['status'] == "200") {
				getDataFn();
				clearFn();
				$('#ModalOrganization').modal('hide');
				callFlashSlide("Update Successfully.");
				
			}else if (data['status'] == "400") {
				//alert("Error ?");
				validationFn(data);
			}
		}
	});
	return false;
};

//******************** update end********//


//******************** listError start********//
var listErrorFn =function(data){
	var errorData="";
	golbalDataError=data;
	
	
	$.each(data,function(index,indexEntry){
		if(indexEntry[Object.keys(indexEntry)[0]]!= undefined || indexEntry[Object.keys(indexEntry)[0]]==null){
			if(indexEntry[Object.keys(indexEntry)[0]]== null){//The employee code field is null
				errorData+="<font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font> Org code : null <i class='fa fa-level-down'></i><br>";
			}else{
				errorData+="<font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font> Org code : "+data[index]['org_code']+" <i class='fa fa-level-down'></i><br>";}
			}
	     $.each(indexEntry['errors'],function(index2,indexEntry2){
	    	 	errorData+="<font color='red'>&emsp;*</font> "+indexEntry2+"<br>";
	     });
	 
	});
//	$.each(data,function(index,indexEntry){
//
//		
//		if(data[index]['org_code']!= undefined || data[index]['org_code']==null){
//			if(data[index]['org_code']== null){//The employee code field is null
//				errorData+="<font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font> Org code : null <i class='fa fa-level-down'></i><br>";
//			}else{
//				errorData+="<font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font> Org code : "+data[index]['org_code']+" <i class='fa fa-level-down'></i><br>";}
//			
//		}
//		if(data[index]['errors']['org_code']!=undefined){
//			errorData+="<font color='red'>&emsp;*</font> "+data[index]['errors']['org_code']+"<br>";
//		}
//		if(data[index]['errors']['org_name']!=undefined){
//			errorData+="<font color='red'>&emsp;*</font> "+data[index]['errors']['org_name']+"<br>";
//		}
//		if(data[index]['errors']['is_active']!=undefined){
//			errorData+="<font color='red'>&emsp;*</font> "+data[index]['errors']['is_active']+"<br>";
//		}
//
//
//	});
	
	callFlashSlideInModal(errorData,"#information2","error");
	//callFlashSlideInModal(errorData);
	/*return errorData;*/
}
//******************** listError End********//
$(document).ready(function () {
	
	 var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
	 	if(connectionServiceFn(username,password)==true){
	 		clearFn();
			getDataFn();
			$(".app_url_hidden").show();
	 		$("#btnSubmit").click(function(){
	 			updateFn();
	 		});
	 		/*
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
			});*/
	 		$('.numberOnly').keypress(function (evt) { 
	 			 var key = window.evt ? evt.keyCode : evt.which;
	 		    if (evt.keyCode === 8 || evt.keyCode === 46 || evt.keyCode === 37 || evt.keyCode === 39) {
	 		        return true;
	 		    } else if ( key < 48 || key > 57 ) {
	 		        return false;
	 		    } else {
	 		    	return true;
	 		    }
			});
	 		
	 		//Autocomplete Search Start
	 		$("#mOrgParentName").autocomplete({
	 	        source: function (request, response) {
	 	        	$.ajax({
	 					 url:restfulURL+restfulPathOrganization+"/auto_org_name",
	 					 type:"post",
	 					 dataType:"json",
	 					 headers:{Authorization:"Bearer "+tokenID.token},
	 					 data:{"org_name":request.term},
	 					 //async:false,
	 	                 error: function (xhr, textStatus, errorThrown) {
	 	                        console.log('Error: ' + xhr.responseText);
	 	                    },
	 					 success:function(data){
	 						console.log(data);
	 							response($.map(data, function (item) {
	 								console.log(item.org_code);
	 								//alert(item.org_code);
	 	                            return {
	 	                                label: item.org_name,
	 	                                value: item.org_name,
	 	                                org_code:item.org_code
	 	                            };
	 	                        }));
	 						
	 					},
	 					beforeSend:function(){
	 						$("body").mLoading('hide');	
	 					}
	 					
	 					});
	 	        },
	 			select:function(event, ui) {
	 				$("#mOrgParentName").val(ui.item.value);
	 	            $("#mOrgParentId").val(ui.item.org_code);
	 	            tempOrgName = ui.item.value;
	 	            tempOrgId=ui.item.org_code;
	 	            return false;
	 	        },change: function(e, ui) {  
	 				if ($("#mOrgParentName").val() == tempOrgName) {
	 					$("#mOrgParentId").val(tempOrgId);
	 				} else if (ui.item != null) {
	 					$("#mOrgParentId").val(ui.item.org_code);
	 				} else {
	 					$("#mOrgParentId").val("");
	 				}
	 	        	
	 	         }
	 	    });
	 	   
	 		//Autocomplete Search End
			$("#exportToExcel").click(function(){
				$("form#formExportToExcel").attr("action",$("#url_portlet").val()+"/file/appraisal_organization_template.xlsx");
			});
			//FILE IMPORT MOBILE START
			$("#btn_import").click(function () {
				$('#file').val("");
				$(".btnModalClose").click();
				$(".dropify-clear").click(); 
			});
//			$("#importFileMobile").click(function () {
//				$('#file').val("");
//			});
			// Variable to store your files
			var files;
			// Add events
			$('#file').on('change', prepareUpload2);

			// Grab the files and set them to our variable
			function prepareUpload2(event)
			{
			  files = event.target.files;
			}
			$('form#fileImportOrganization').on('submit', uploadFiles);

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
					url:restfulURL+restfulPathOrganization+"/import",
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
									
							callFlashSlide("Import Organization Successfully");
							getDataFn();
							$("body").mLoading('hide');
							$('#ModalImport').modal('hide');
							
						}else{
							listErrorFn(data['errors']);
							getDataFn();
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
			
			
	 	}
	 }
	 

	 
	 $("#radiosWeight").click();
	 
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


	
	



