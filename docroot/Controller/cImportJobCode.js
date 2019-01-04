var restfulPathImportJobCode="/"+serviceName+"/public/import_job_code";
var restfulPathExport="/"+serviceName+"/public/import_job_code/export";
var restfulPathDelete="/"+serviceName+"/public/import_job_code/delete/";
var restfulPathEdit="/"+serviceName+"/public/import_job_code/update/";

//Global variable
var galbalDataImportEmp=[];
var galbalDataTemp = [];
var pageNumberDefault=1;

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
	callFlashSlideInModal(validate,"#information2","error");
};


var validateFileFn = function(data){
	var validateFile="";

	$.each(data,function(index,indexEntry){
		if(indexEntry[Object.keys(indexEntry)[0]]!= undefined || indexEntry[Object.keys(indexEntry)[0]]==null){
		
			if(indexEntry[Object.keys(indexEntry)[0]]== null){//The employee code field is null
				validateFile+="<font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font> "+Object.keys(indexEntry)[0]+" : null <i class='fa fa-level-down'></i><br>";
			}else{
				validateFile+="<font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font> "+Object.keys(indexEntry)[0]+": "+indexEntry[Object.keys(indexEntry)[0]]+" <i class='fa fa-level-down'></i><br>";
			}
			if(indexEntry['errors']!=null || indexEntry['errors']!=undefined || indexEntry['errors']!=""){
				if(typeof(indexEntry['errors'])==='object') { // message validate error
					for (var key in indexEntry['errors']) {
		 			    if (indexEntry['errors'].hasOwnProperty(key)) {
		 			    	validateFile+="<font color='red'>&emsp;*</font> "+indexEntry['errors'][key]+"<br>";
		 			    }
		 			}
				} else { //message exception error
					validateFile+="<font color='red'>&emsp;*</font> "+indexEntry['errors']+"<br>";
				}
			}
		}
	 
	});
	callFlashSlideInModal(validateFile,"#informationFile","error");
}


var clearFn = function() {
	$(".btnModalClose").click();
	$("#from_job_code").val("") 
	$("#from_job_code").val("");
	$("#from_knowledge_point").val("");
	$("#from_capability_point").val("");
	$("#from_total_point").val("");
	$("#from_baht_per_point").val("");
}


var getDataFn = function(page,rpp){
	clearFn();
	$.ajax({
		url : restfulURL+restfulPathImportJobCode,
		type : "get",
		dataType : "json",
		data:{"page":page,"rpp":rpp,
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success : function(data) {
			listImportJobCodeFn(data['data']);
			galbalDataImportEmp=data;
			paginationSetUpFn(galbalDataImportEmp['current_page'],galbalDataImportEmp['last_page'],galbalDataImportEmp['last_page']);
		}
	});
};


var listImportJobCodeFn = function(data) {
	var htmlTable = "";
	$("#listJobCode").empty();
	$.each(data,function(index,indexEntry) {
		htmlTable += "<tr class='rowSearch'>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+ indexEntry["job_code"]+ "</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle; text-align: right;\">"+ addCommas(indexEntry["knowledge_point"])+ "</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle; text-align: right;\">"+ addCommas(indexEntry["capability_point"])+"</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle; text-align: right;\">"+ addCommas(indexEntry["total_point"])+"</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle; text-align: right;\">"+ addCommas(indexEntry["baht_per_point"])+"</td>";
		htmlTable += "<td id=\"objectCenter\" style=\"vertical-align: middle;\"><i class=\"fa fa-cog font-gear popover-edit-del\" data-trigger=\"focus\" tabindex=\""+index+"\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\" " +
				"<button class='btn btn-warning btn-xs btn-gear edit' id="+ indexEntry["job_code"]+ " data-target=#ModalEdit data-toggle='modal' data-backdrop='"+setModalPopup[0]+"' data-keyboard='"+setModalPopup[1]+"'>Edit</button>&nbsp;" +
		        "<button id="+indexEntry["job_code"]+" class='btn btn-danger btn-xs btn-gear del'>Delete</button>\"></i></td>";
		htmlTable += "</tr>";
	});
	$("#listJobCode").html(htmlTable);
	
	//function popover
	$(".popover-edit-del").popover(setPopoverDisplay);
	
	$("#tableJobCode").off("click",".popover-edit-del");
	$("#tableJobCode").on("click",".popover-edit-del",function(){
			$(".edit").on("click",function() {
				clearFn();
				$.ajax({
					url : restfulURL+restfulPathImportJobCode,
					type : "get",
					dataType : "json",
					data:{"job_code":this.id,
					},
					headers:{Authorization:"Bearer "+tokenID.token},
					async:false,
					success : function(data) {
						$.each(data['data'],function(index,indexEntry) {
							$("#from_job_code").val(indexEntry['job_code']) 
							$("#from_job_code").val(indexEntry['job_code']);
							$("#from_knowledge_point").val(indexEntry['knowledge_point']);
							$("#from_capability_point").val(indexEntry['capability_point']);
							$("#from_total_point").val(indexEntry['total_point']);
							$("#from_baht_per_point").val(indexEntry['baht_per_point']);
						});
					}
				});
				
				$(document).off("click","#btnEdit");
				$(document).on("click","#btnEdit",function() {
					$.ajax({
						url : restfulURL+restfulPathEdit+$("#from_job_code").val(),
						type : "patch",
						dataType : "json",
						data:{
							"knowledge_point": $("#from_knowledge_point").val(),
							"capability_point": $("#from_capability_point").val(),
							"total_point": $("#from_total_point").val(),
							"baht_per_point" : $("#from_baht_per_point").val(),
						},
						headers:{Authorization:"Bearer "+tokenID.token},
						async:false,
						success : function(data) {
							 if(data['status']=="200"){
								 getDataFn($("#pageNumber").val(),$("#rpp").val());
								 $('#ModalEdit').modal('hide');
								callFlashSlide("Update Successfully.");
						    }else if (data['status'] == "400"){
						    		validationFn(data);
						     }
						}
					});
				});
			});
		
		$(".del").on("click",function(){
			var job_code = this.id;
			$("#confrimModal").modal({
				"backdrop" : setModalPopup[0],
				"keyboard" : setModalPopup[1]
			});
			
			$(document).off("click","#btnConfirmOK");
			$(document).on("click","#btnConfirmOK",function() {
			$.ajax({
				url : restfulURL+restfulPathDelete+job_code,
				type : "DELETE",
				dataType : "json",
				headers:{Authorization:"Bearer "+tokenID.token},
				async:false,
				success : function(data) {
					 if(data['status']=="200"){
						 getDataFn($("#pageNumber").val(),$("#rpp").val());
						 $('#confrimModal').modal('hide');
						 callFlashSlide("Delete Successfully.");
				    }else if (data['status'] == "400"){
				    	 callFlashSlide(""+data['data']+"");
				     }
				}
			});
		});
			return false;
		});	
	});
}


$(document).ready(function() {

	var username = $('#user_portlet').val();
	var password = $('#pass_portlet').val();
	var plid = $('#plid_portlet').val();
	
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		 if(connectionServiceFn(username,password,plid)==false){
	 		return false;
	 	}
	 }

	$("#countPaginationTop").val( $("#countPaginationTop option:first-child").val());
	$("#countPaginationBottom").val( $("#countPaginationBottom option:first-child").val());

	$(".app_url_hidden").show();

	getDataFn(pageNumberDefault,$("#rpp").val());
	$("#list_content").show();
	

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
		 if (charCode == 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
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
	});
	
	
	$("#exportToExcel").click(function(){
		console.log(restfulURL+restfulPathExport+"?token="+tokenID.token+"")
		$("form#formExportToExcel").attr("action",restfulURL+restfulPathExport+"?token="+tokenID.token);
	});			
			
	
	//FILE IMPORT MOBILE START
	$("#btn_import").click(function () {
		$("#ModalImport").modal({
			"backdrop" : setModalPopup[0],
			"keyboard" : setModalPopup[1]
		});
		$('#file').val("");
		$(".btnModalClose").click();
		$(".dropify-clear").click(); 
	});
	var files;
	// Add events
	$('#file').on('change', prepareUpload2);

	// Grab the files and set them to our variable
	function prepareUpload2(event)
	{
	  files = event.target.files;
	}
	$('form#fileImportJobCode').on('submit', uploadFiles);
	
	function uploadFiles(event) {
	    event.stopPropagation(); // Stop stuff happening
	    event.preventDefault(); // Totally stop stuff happening

	    // START A LOADING SPINNER HERE

	    // Create a formdata object and add the files
	    var data = new FormData();
	    $.each(files, function (key, value) {
	        data.append(key, value);
	    });
	    $("body").mLoading();
	    $.ajax({
	        url: restfulURL + restfulPathImportJobCode,
	        type: 'POST',
	        data: data,
	        cache: false,
	        dataType: 'json',
	        processData: false, // Don't process the files
	        contentType: false, // Set content type to false as jQuery will tell the server its a query string request
	        headers: { Authorization: "Bearer " + tokenID.token },
	        success: function (data, textStatus, jqXHR) {

	            if (data['status'] == 200 && data['errors'].length == 0) {

	                callFlashSlide("Import Job Code Successfully");
	                getDataFn($(".pagination .active").attr("data-lp"), $("#rpp").val());
	                $("body").mLoading('hide');
	                $('#ModalImport').modal('hide');

	                if (data["emp"].length > 0) {
	                    ImportLiferayUser(data);
	                }

	            } else {
	                validateFileFn(data['errors']);
	                getDataFn($(".pagination .active").attr("data-lp"), $("#rpp").val());
	                $("body").mLoading('hide');

	                if (data["emp"].length > 0) {
	                    ImportLiferayUser(data);
	                }
	            }
	        },
	        error: function (jqXHR, textStatus, errorThrown) {
	            // Handle errors here
	            callFlashSlide('Format Error : ' + textStatus);
	            // STOP LOADING SPINNER
	        }
	    });
	    return false;
	}
	
	//binding tooltip start
	 $('[data-toggle="tooltip"]').css({"cursor":"pointer"});
	 $('[data-toggle="tooltip"]').tooltip({
		 html:true
	 });

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
