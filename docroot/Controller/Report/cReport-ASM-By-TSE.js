var username = "";
var password = "";
var galbalDataTemp=[]; 

$(document).ready(function() {

  var username = $('#user_portlet').val();
  var password = $('#pass_portlet').val();
  var plid = $('#plid_portlet').val();
  if (username != "" && username != null & username != [] && username != undefined) {

    if (connectionServiceFn(username, password, plid) == false) {
      return false;
    }
    $('[data-toggle="tooltip"]').css({
      "cursor": "pointer"
    });
    $('[data-toggle="tooltip"]').tooltip({
      html: true
    });
	    
    toDayFn("#date-start");
	toDayFn("#date-end");

	 $( function() {
	        $( "#date-start" ).datepicker({
			 	dateFormat: "dd/mm/yy",
	            minDate: new Date(2018, 1 - 1, 1),
	            onSelect: function () {
	                var dt2 = $('#date-end');
	                var startDate = $(this).datepicker('getDate');
	                var minDate = $(this).datepicker('getDate');
	                var dt2Date = dt2.datepicker('getDate');
	                //difference in days. 86400 seconds in day, 1000 ms in second
	                var dateDiff = (dt2Date - minDate)/(86400 * 1000);
	                
	                //startDate.setDate(startDate.getDate() + 30);
	                if (dt2Date == null || dateDiff < 0) {
	                		dt2.datepicker('setDate', minDate);
	                }
	                /*else if (dateDiff > 30){
	                		dt2.datepicker('setDate', null);
	                }*/
	                //sets dt2 maxDate to the last day of 30 days window
	                dt2.datepicker('option', 'maxDate', null);
	                dt2.datepicker('option', 'minDate', minDate);
	               	clearParamFn();
	            }
	        });
	      } );
	    
	    $( function() {
	        $( "#date-end" ).datepicker({ 
	        	dateFormat: "dd/mm/yy",
	        	minDate: 0,
	        	   onSelect: function () {
		               	clearParamFn();
		            }
	        });
	      } );
	    
	    $("#date-start ,#date-end").keypress(function(event) {
		    return ( ( event.keyCode || event.which ) === 9 ? true : false );
		});
	    
		$("#date-start ,#date-end").keydown(function(event) {		
		    return ( ( event.keyCode || event.which ) === 9 ? true : false );
		});
    
	    assessorParam($("#tse-code-or-tse-name-id").val());
	    $("#QuestionnaireType").change(function() {
	    	clearParamFn();
		});
	    
    var dataClearParam = [{
        'id': '#Position',
        'val': ""
      },
      {
        'id': '#Position_id',
        'val': ""
      },
      {
        'id': '#EmpName',
        'val': ""
      },
      {
        'id': '#EmpName_id',
        'val': ""
      }
    ];

    var dataSetParam = [{
        'id': '#Position',
        'val': "" + cMain_position_name + ""
      },
      {
        'id': '#Position_id',
        'val': cMain_position_id
      },
      {
        'id': '#EmpName',
        'val': "" + cMain_emp_name + "(" + session_emp_code + ")"
      },
      {
        'id': '#EmpName_id',
        'val': cMain_emp_id
      },
      {
        'id': '#AppraisalEmpLevel',
        'val': "" + cMain_level_id + ""
      }
    ];
    
    $("#tse-code-or-tse-name").autocomplete();
    questionnaireTypeParam();
    jobfunctionParam();
    $(".app_url_hidden").show();
		
  }
});


$("#btnExport").click(function(){
	getDataFn();
});

var clearParamFn = function(){
	$("#tse-code-or-tse-name").val('');
	$("#tse-code-or-tse-name-id").val('');
	$("#assessor-code-or-name").val('');
	galbalDataTemp=[]; 
	assessorParam($("#tse-code-or-tse-name-id").val());
}

var questionnaireTypeParam = function(){
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/questionaire_data/list_questionaire1",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			htmlOption+="<option selected='selected' value=''>All Questionnaire Type</option>";
			$.each(data,function(index,indexEntry){
				if(index==0){
					htmlOption+="<option value="+indexEntry['questionaire_type_id']+">"+indexEntry['questionaire_type']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['questionaire_type_id']+">"+indexEntry['questionaire_type']+"</option>";
				}
			});
			$("#QuestionnaireType").html(htmlOption);
			console.log(data);
		}
	});
}

var jobfunctionParam = function(){
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/questionaire_report/list_job_function",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			htmlOption+="<option selected='selected' value=''>All Job Function</option>";
			$.each(data,function(index,indexEntry){
				if(index==0){
					htmlOption+="<option value="+indexEntry['job_function_id']+">"+indexEntry['job_function_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['job_function_id']+">"+indexEntry['job_function_name']+"</option>";
				}
			});
			$("#jobfunction").html(htmlOption);
			console.log(data);
		}
	});
}

var assessorParam = function(emp_snapshot_id){
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/questionaire_report/list_assessor_report2",
		type:"get",
		dataType:"json",
		async:true,
		data:{
			"start_date": $("#date-start").val(),
			"end_date": $("#date-end").val(),
			"emp_snapshot_id" :emp_snapshot_id,
			"questionaire_type_id":$("#QuestionnaireType").val(),
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			htmlOption+="<option selected='selected' value=''>ผู้ประเมินทั้งหมด</option>";
			if(data['status'] == '200'&&data['data'].length!=0){
				
				$.each(data['data'],function(index,indexEntry){
					htmlOption+="<option value="+indexEntry['emp_snapshot_id']+">"+indexEntry['emp_name']+"</option>";
				});
			}
//			else if(data['status'] == '404'){
//				callFlashSlide(Liferay.Language.get(data['data']));
//			}
//			else{
//				callFlashSlide(Liferay.Language.get("ไม่พบข้อมูล"));
//			}
			$("#assessor-code-or-name").html(htmlOption);
		}
	});
}


$("#tse-code-or-tse-name").autocomplete({

    source: function(request, response) {
      $.ajax({
        url: restfulURL + "/" + serviceName + "/public/questionaire_report/auto_emp_report",
        type: "GET",
        dataType: "json",
        data: {
          "emp_name": request.term
        },
        //async:false,
        headers: {
          Authorization: "Bearer " + tokenID.token
        },
        error: function(xhr, textStatus, errorThrown) {
          console.log('Error: ' + xhr.responseText);
        },
        success: function(data) {
          console.log(data)
          response($.map(data, function(item) {
            return {
              label: item.emp_name,
              value: item.emp_name,
              emp_snapshot_id: item.emp_snapshot_id,
            };
          }));
        },
        beforeSend: function() {
          $("body").mLoading('hide');
        }
      });
    },
    select: function(event, ui) {
      $("#tse-code-or-tse-name").val(ui.item.label);
      $("#tse-code-or-tse-name-id").val(ui.item.emp_snapshot_id);
      galbalDataTemp['tse_emp_name'] = ui.item.label;
      galbalDataTemp['tse_emp_snapshot_id'] = ui.item.emp_snapshot_id;
//      empNameAutoCompelteChangeToPositionName(ui.item.value);
      assessorParam($("#tse-code-or-tse-name-id").val());
      return false;
    },
    change: function(e, ui) {
    	console.log("test");
      if ($("#tse-code-or-tse-name").val() == galbalDataTemp['tse_emp_name']) {
        $("#tse-code-or-tse-name-id").val(galbalDataTemp['tse_emp_snapshot_id']);
      } else if (ui.item != null) {
        $("#tse-code-or-tse-name-id").val(ui.item.emp_snapshot_id);
      } else {
        $("#tse-code-or-tse-name-id").val("");
        assessorParam($("#tse-code-or-tse-name-id").val());
      }
    }
  });


var getDataFn = function() {
	$("body").mLoading('show'); //Loading
	
	var parameter = {};
	var template_name ="";
	var date_start = $("#date-start").val();
	var date_end = $("#date-end").val();
	var questionaire_type_id = $("#QuestionnaireType").val();
	var assessor_id = $("#assessor-code-or-name").val();
	var emp_snapshot_id = $("#tse-code-or-tse-name-id").val();
	var job_function = $("#jobfunction").val();
	var data_header_id="";
	var questionaire_date="";
	
	template_name="ASM-by-TSE-Report"; 
	
	parameter = {
			param_questionaire_type: questionaire_type_id,
			param_employee : emp_snapshot_id,
			param_assessor : assessor_id,
			param_date_start : date_start,
			param_date_end : date_end,
			param_data_header_id:data_header_id,     
			param_questionaire_date:questionaire_date,
			param_job_function:job_function
			
		  };
	
	if (date_start == '' || date_end == ''){
		 $("body").mLoading('hide'); //Loading
		callFlashSlide(Liferay.Language.get("Date start or Date end is require!"));
		return false;
	}

	
	var data = JSON.stringify(parameter);
	var url_report_jasper = restfulURL+"/"+serviceName+"/public/generateAuth?template_name="+template_name+"&token="+tokenID.token+"&template_format=xlsx&used_connection=1&inline=1&data="+data;
	console.log(url_report_jasper);
//	return false;
	 if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		 window.open(url_report_jasper,"_blank");
		} else {
			$('#iFrame_report').attr('src',url_report_jasper);
		}
	 $("body").mLoading('hide'); //Loading
};

var toDayFn = function(id) {
	  var date = new Date();
	  var day = date.getDate();
	  var month = date.getMonth() + 1;
	  var year = date.getFullYear();

	  if (month < 10) month = "0" + month;
	  if (day < 10) day = "0" + day;

	  var today = day + "/" + month + "/" + year;
	  //document.getElementById(id).value = today;
	  $(id).val(today);
	  // document.getElementById("datepicker-end").value = today;

};