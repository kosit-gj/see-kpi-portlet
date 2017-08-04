var restfulPathPosition="/see_api/public/position";


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
		url : restfulURL+restfulPathPosition,
		type : "get",
		dataType : "json",
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,// w8 data 
		success : function(data) {
			listPositionFn(data);
			
		}
	});
	
};
//*********** getdata end *********************//

//-------- findOne
var findOneFn = function(id) {
	$.ajax({
		url:restfulURL+restfulPathPosition+"/"+id,
		type : "get",
		dataType : "json",
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {		
			$("#id").val(id);
			$("#mPosName").val(data['position_name']);
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
var listPositionFn = function(data){
	var htmlOrg='';
	var IsActive ="";
	$.each(data,function(index,indexEntry){
		if (indexEntry["is_active"]=="1"){
			IsActive ="<input disabled type=\"checkbox\"  value=\"1\" checked>";
		}else if (indexEntry["is_active"]=="0"){
			IsActive ="<input disabled type=\"checkbox\"  value=\"0\" >";
		}
		
		htmlOrg += "<tr class='rowSearch'>";
		htmlOrg += "<td style='vertical-align: middle;'>"+ indexEntry["position_name"]+ "</td>";
		htmlOrg += "<td style='vertical-align: middle;text-align: center;'>"+IsActive+"</td>";
		
		htmlOrg += "<td style='vertical-align: middle;text-align: center;'><i class=\"fa fa-cog font-gear popover-edit-del\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-trigger=\"focus\" tabindex=\""+index+"\" data-content=\"<button class='btn btn-warning btn-xs edit' id="+ indexEntry["position_id"]+ " data-target=#ModalPosition data-toggle='modal'>Edit</button>&nbsp;" ;
		htmlOrg += "<button id="+indexEntry["position_id"]+" class='btn btn-danger btn-xs del'>Delete</button>\"></i></td>";
		htmlOrg += "</tr>";
	});
	$('#listPosition').html(htmlOrg);
	$(".popover-edit-del").popover();
	$("#tablePosition").off("click",".popover-edit-del");
	$("#tablePosition").on("click",".popover-edit-del",function(){
		
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
					 url:restfulURL+restfulPathPosition+"/"+id,
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
	$("#id").val("");
	$("#mPosName").val("");
	$("#checkbox_is_active").prop("checked",false);
	
	$(".btnModalClose").click();

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
		url:restfulURL+restfulPathPosition+"/"+$("#id").val(),
		type : "PATCH",
		dataType : "json",
		data : {
		    "position_name": $("#mPosName").val(),
			"is_active":checkboxIsActive
		},	
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			if (data['status'] == "200") {
				getDataFn();
				clearFn();
				$('#ModalPosition').modal('hide');
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
	
	$.each(data,function(index,indexEntry){

		
		if(data[index]['position_name']!= undefined || data[index]['position_name']==null){
			if(data[index]['position_name']== null){//The employee code field is null
				errorData+="<font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font> Org code : null <i class='fa fa-level-down'></i><br>";
			}else{
				errorData+="<font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font> Org code : "+data[index]['position_name']+" <i class='fa fa-level-down'></i><br>";}
		}
		if(data[index]['errors']['position_name']!=undefined){
			errorData+="<font color='red'>&emsp;*</font> "+data[index]['errors']['position_name']+"<br>";
		}
		if(data[index]['errors']['is_active']!=undefined){
			errorData+="<font color='red'>&emsp;*</font> "+data[index]['errors']['is_active']+"<br>";
		}


	});
	//alert(errorData);
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
			$("#exportToExcel").click(function(){
				$("form#formExportToExcel").attr("action",$("#url_portlet").val()+"/file/appraisal_position_template.xlsx");
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
			$('form#fileImportPosition').on('submit', uploadFiles);

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
					url:restfulURL+restfulPathPosition+"/import",
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
									
							callFlashSlide("Position Successfully");
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


	
	



