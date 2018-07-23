var timeOut;
//Check Validation Start
var validationFn = function(data) {

 	var validate = "";
 	var count = 0;
 	$.each(data, function(index, indexEntry) {

 		if (index != undefined) {
 			for (var key in indexEntry) {
 			    if (indexEntry.hasOwnProperty(key)) {
		 			if (count == 0) {
		 				validate += "<font color='red'>* </font>" + indexEntry[key] + "";
		 			} else {
		 				validate += "<br><font color='red'>* </font> " + indexEntry[key] + " ";
		 			}
		 			
		 			count++;
 			    }
 			    
 			}
 		}

 	});
 	
 	callFlashSlideInModal(validate,"#information2","error");
}
 
 var getDataFn = function() {
	 $( document ).ajaxStart(function() {
		 $("body").mLoading('hide');
	 });
	 
	 $.ajax({
			url:restfulURL+"/"+serviceName+"/public/job_log",
			type:"get",
			dataType:"json",
			async:false,
			headers:{Authorization:"Bearer "+tokenID.token},
			success:function(data) {
				listDataFn(data);
			}
	 }).then(function() {
		clearTimeout(timeOut);
		timeOut = setTimeout(getDataFn, 5000);
	 });
}

var findOneFn = function(id) {
	$( document ).ajaxStart(function() {
		$("body").mLoading();
	});
	
	 $.ajax({
			url:restfulURL+"/"+serviceName+"/public/job_log/"+id,
			type:"get",
			dataType:"json",
			async:false,
			headers:{Authorization:"Bearer "+tokenID.token},
			success:function(data) {
				assignToTemplate(data);
			}
	});
};

var updateFN = function() {
	$( document ).ajaxStart(function() {
		$("body").mLoading();
	});
	
	var job_log_id = $("#edit_job_log_id").val();
	var job_log_name = $("#edit_job_log_name").val();
	var param_start_date = $("#edit_start_date").val();
	var param_end_date = $("#edit_end_date").val();
	var destination_address = $("#edit_destination_address").val().trim();
	var sender_name = $("#edit_sender_name").val();
	var sender_address = $("#edit_sender_address").val().trim();
	var path_batch_file = $("#edit_path_batch_file").val();
	var path_log_file = $("#edit_path_log_file").val();
	var subject_error = $("#edit_subject_error").val();
	var comment_error = $("#edit_scomment_error").val();
	
	var cc = [];
	$('#edit_cc .row_data').each(function(){
		cc.push({
			'cc': $(this).find('input').val().trim()
		});
	});
	
	var bcc = [];
	$('#edit_bcc .row_data').each(function(){
		bcc.push({
			'bcc': $(this).find('input').val().trim()
		});
	});
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/job_log/"+job_log_id,
		type:"patch",
		dataType:"json",
		async:false,
		data: {
			"job_log_name": job_log_name,
			"param_start_date": param_start_date,
			"param_end_date": param_end_date,
			"destination_address": destination_address,
			"cc": cc,
			"bcc": bcc,
			"sender_name": sender_name,
			"sender_address": sender_address,
			"path_batch_file": path_batch_file,
			"path_log_file": path_log_file,
			"subject_error": subject_error,
			"comment_error": comment_error
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data) {
			if(data['status']==200) {
				$('#ModalJobLog').modal('hide');
				getDataFn();
				callFlashSlide("Updated Successfully.");
			} else if(data['status']==400) {
				//console.log(data);
				validationFn(data['data']);
			}
		}
	});
}

var runFN = function() {
	$( document ).ajaxStart(function() {
		$("body").mLoading();
	});
	
	var job_log_id = $("#run_job_log_id").val();
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/job_log/run/"+job_log_id,
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data) {
			if(data['status']==200) {
				$('#confrimModal').modal('hide');
				getDataFn();
				callFlashSlide("Runing...");
			} else {
				callFlashSlide(data['data'],"error");
			}
		}
	});
}

var listDataFn = function(data) {
	 htmlHTML="";
	 var styleTD = "text-align: right; font-weight: bold;";
	 var fontColorStyle="";
	 var buttonStatus = "";
	 var cssStatus = false;

	 $.each(data,function(index,indexEntry) {
		if (index % 2 === 0) {
			htmlHTML+="<div class=\"row-fluid\">";
		}
		
		if(indexEntry['status']=='Loading') {
			cssStatus = true;
			fontColorStyle = "color: orange;";
			buttonStatus = "<button class='btn btn-success btn-small btn-gear run' id="+ indexEntry["job_log_id"]+" disabled=\"disabled\"><img id=\"loading\" src=\"../../see-kpi-portlet/img/uploading.gif\" width=\"20\">&nbsp;Runing...</button>"
							+"&nbsp;&nbsp;<button class='btn btn-warning btn-small btn-gear edit' id="+ indexEntry["job_log_id"]+" disabled=\"disabled\"><i class=\"fa fa-cog\"></i>&nbsp;Edit</button>";
		} else {
			if (indexEntry['status']=='Success') {
				fontColorStyle = "color: green;";
				buttonStatus = "<button class='btn btn-success btn-small btn-gear run btn-run-status' id="+ indexEntry["job_log_id"]+"><i class=\"fa fas fa-play\"></i>&nbsp;Run</button>"
								+"&nbsp;&nbsp;<button class='btn btn-warning btn-small btn-gear edit' id="+ indexEntry["job_log_id"]+"><i class=\"fa fa-cog\"></i>&nbsp;Edit</button>";
			} else {
				fontColorStyle = "color: red;";
				buttonStatus = "<button class='btn btn-success btn-small btn-gear run btn-run-status' id="+ indexEntry["job_log_id"]+"><i class=\"fa fas fa-play\"></i>&nbsp;Run</button>"
								+"&nbsp;&nbsp;<button class='btn btn-warning btn-small btn-gear edit' id="+ indexEntry["job_log_id"]+"><i class=\"fa fa-cog\"></i>&nbsp;Edit</button>";
			}
		}
		
			htmlHTML+="<li class=\"span6\">";
					htmlHTML+="<div class=\"\" style=\"margin-top: 10px;\">";
						htmlHTML+="<div class=\"table-responsive scrollbar-inner\" style='overflow:auto; margin-top: 10px;'>";
							htmlHTML+="<table class=\"table\" style=\"max-width :none;\">";
								htmlHTML+="<thead>";
									htmlHTML+="<tr>";
										htmlHTML+="<th><h4>Status : <span style='"+fontColorStyle+"'>"+indexEntry['status']+"</span></h4></th>";
										htmlHTML+="<th><div style=\"text-align: right\" class=\"popover-edit-del\">"+buttonStatus+"</div></th>";
									htmlHTML+="</tr>";
								htmlHTML+="</thead>";
								htmlHTML+="<tbody>";
									htmlHTML+="<tr>";
										htmlHTML+="<td style='"+styleTD+"'>Job Log Name :</td>";
										htmlHTML+="<td>"+indexEntry['job_log_name']+"</td>";
									htmlHTML+="</tr>";
									htmlHTML+="<tr>";
										htmlHTML+="<td style='"+styleTD+"'>ETL Start Date :</td>";
										htmlHTML+="<td>"+indexEntry['etl_start_dttm']+"</td>";
									htmlHTML+="</tr>";
									htmlHTML+="<tr>";
										htmlHTML+="<td style='"+styleTD+"'>ETL Finish Date :</td>";
										htmlHTML+="<td>"+indexEntry['etl_finish_dttm']+"</td>";
									htmlHTML+="</tr>";
									htmlHTML+="<tr>";
										htmlHTML+="<td style='"+styleTD+"'>Start Date :</td>";
										htmlHTML+="<td>"+indexEntry['param_start_date']+"</td>";
									htmlHTML+="</tr>";
									htmlHTML+="<tr>";
										htmlHTML+="<td style='"+styleTD+"'>End Date :</td>";
										htmlHTML+="<td>"+indexEntry['param_end_date']+"</td>";
									htmlHTML+="</tr>";
								htmlHTML+="</tbody>";
							htmlHTML+="</table>";
						htmlHTML+="</div>";
					htmlHTML+="</div>";
			htmlHTML+="</li>";
		if (index % 2 !== 0) {
			htmlHTML+="</div>";
		}

	});
	$("#listJobLog").html(htmlHTML);
	
	if(cssStatus==true) {
		$(".btn-run-status").attr('disabled', true);
	}
}

var assignToTemplate = function(data) {
	$("#edit_job_log_id").val(data['job_log_id']);
	$("#edit_job_log_name").val(data['job_log_name']);
	$("#edit_start_date").val(data['param_start_date']);
	$("#edit_end_date").val(data['param_end_date']);
	$("#edit_destination_address").val(data['destination_address']);
	$("#edit_sender_name").val(data['sender_name']);
	$("#edit_sender_address").val(data['sender_address']);
	$("#edit_path_batch_file").val(data['path_batch_file']);
	$("#edit_path_log_file").val(data['path_log_file']);
	$("#edit_subject_error").val(data['subject_error']);
	$("#edit_scomment_error").val(data['comment_error']);
	
	assignToCC(data['cc']);
	assignToBCC(data['bcc']);
}

var assignToCC = function(data) {
	$('#edit_cc .list_input').html('');
	
	if(data!=null) {
		if(data.indexOf(',')) {
			var value = data.split(',');
			value.forEach(function(item,index) {
				if(index==0) {
					$('#edit_cc .row_data input').val(item);
				} else {
					$html = '<div class="row-fluid row_data">'
								+'<label class="control-label"></label>'
								+'<div class="controls" style="display:flex">'
		            				+'<input class="form-control input-sm span10" type="text" value="'+item+'">&nbsp;'
		            				+'<button class="btn btn-danger btn-small del-row" style="margin-bottom: 7px;"><i class="fa fas fa-times"></i></button>'
		            			+'</div>'
		            		+'</div>'
					$('#edit_cc .list_input').append($html);
				}
			});
		} else {
			$('#edit_cc .row_data input').val(data);
		}
	}
}

var assignToBCC = function(data) {
	$('#edit_bcc .list_input').html('');
	
	if(data!=null) {
		if(data.indexOf(',')) {
			var value = data.split(',');
			value.forEach(function(item,index) {
				if(index==0) {
					$('#edit_bcc .row_data input').val(item);
				} else {
					$html = '<div class="row-fluid row_data">'
								+'<label class="control-label"></label>'
								+'<div class="controls" style="display:flex">'
		            				+'<input class="form-control input-sm span10" type="text" value="'+item+'">&nbsp;'
		            				+'<button class="btn btn-danger btn-small del-row" style="margin-bottom: 7px;"><i class="fa fas fa-times"></i></button>'
		            			+'</div>'
		            		+'</div>'
					$('#edit_bcc .list_input').append($html);
				}
			});
		} else {
			$('#edit_bcc .row_data input').val(data);
		}
	}
}

 $(document).ready(function(){
	var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		if(connectionServiceFn(username,password,plid)==false){
	 		return false;
		}
		 
		getDataFn();
	 	
		$(".app_url_hidden").show();
		
		$(".popover-edit-del").popover({
			delay : {
				hide : 100
			}
		});
		
		$(".advance-search input").val("");
		
		//binding tooltip start
		$('[data-toggle="tooltip"]').css({"cursor":"pointer"});
		 $('[data-toggle="tooltip"]').tooltip({
			 html:true
		});
		//binding tooltip end
		 $(".lfr-hudcrumbs").removeClass("lfr-hudcrumbs");
		 
		$("#edit_start_date").datepicker();
		$("#edit_start_date").datepicker( "option", "dateFormat", "yy-mm-dd" );
		$("#edit_end_date").datepicker();
		$("#edit_end_date").datepicker( "option", "dateFormat", "yy-mm-dd" );
		$(".ui-datepicker").hide();
		
		$('.modal-add').click(function() {
			$(this).closest('.wrap').find('.list_input').append($(this).data('tr'));
		});
		
		$('body').on("click", ".del-row", function(){ this.closest('.row-fluid').remove(); });
		 
		$("#listJobLog").on("click",".edit",function() {
			var id = this.id;
			$(".information").hide();
			$("#demo,#demo2").hide();
	
			findOneFn(id);
			
			$("#ModalJobLog").modal({
				"backdrop" : setModalPopup[0],
				"keyboard" : setModalPopup[1]
			});
			//$(this).parent().parent().parent().children().click();
			//$(window).scrollTop(0);
			$(".modal-body").scrollTop(0);
			$(".fht-tbody").scrollTop(0);
			 
		});
		
		$("#listJobLog").on("click",".run",function() {
			var id = this.id;
			$("#run_job_log_id").val(id);
			$("#confrimModal").modal({
				"backdrop" : setModalPopup[0],
				"keyboard" : setModalPopup[1]
			});
			
			//$(this).parent().parent().parent().children().click();
			//$(window).scrollTop(0);
			$(".modal-body").scrollTop(0);
			$(".fht-tbody").scrollTop(0);
			 
		});
		
		$("#btnSubmitUpdate").click(function() {
			updateFN();
		});
		
		$("#btnConfirmOK").click(function() {
			runFN();
		});
		
		$("#btnadven").click(function() {
			$("#demo").toggle();
		});
		
		$("#btnadven2").click(function() {
			$("#demo2").toggle();
		});
		
	 }
 });