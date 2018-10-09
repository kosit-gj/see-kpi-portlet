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
        $( "#date-start" ).datepicker({dateFormat: "dd/mm/yy"});
      } );
    
    $( function() {
        $( "#date-end" ).datepicker({ dateFormat: "dd/mm/yy"});
      } );
    
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
    $("#assessor-code-or-name").autocomplete();
    questionnaireTypeParam();
    
    $(".app_url_hidden").show();
		
  }
});


$("#btnExport").click(function(){
	getDataFn();
});

var questionnaireTypeParam = function(){
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/questionaire_data/list_questionaire",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(index==0){
					htmlOption+="<option selected='selected' value="+indexEntry['questionaire_type_id']+">"+indexEntry['questionaire_type']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['questionaire_type_id']+">"+indexEntry['questionaire_type']+"</option>";
				}
			});
			$("#QuestionnaireType").html(htmlOption);
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
      return false;
    },
    change: function(e, ui) {
      if ($("#tse-code-or-tse-name").val() == galbalDataTemp['tse_emp_name']) {
        $("#tse-code-or-tse-name-id").val(galbalDataTemp['tse_emp_snapshot_id']);
      } else if (ui.item != null) {
        $("#tse-code-or-tse-name-id").val(ui.item.emp_snapshot_id);
      } else {
        $("#tse-code-or-tse-name-id").val("");
      }
    }
  });

$("#assessor-code-or-name").autocomplete({

    source: function(request, response) {
      $.ajax({
        url: restfulURL + "/" + serviceName + "/public/questionaire_report/auto_assessor_report",
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
      $("#assessor-code-or-name").val(ui.item.label);
      $("#assessor-code-or-name-id").val(ui.item.emp_snapshot_id);
      galbalDataTemp['assessor_emp_name'] = ui.item.label;
      galbalDataTemp['assessor_emp_snapshot_id'] = ui.item.emp_snapshot_id;
//      empNameAutoCompelteChangeToPositionName(ui.item.value);
      return false;
    },
    change: function(e, ui) {
      if ($("#assessor-code-or-name").val() == galbalDataTemp['assessor_emp_name']) {
        $("#assessor-code-or-name-id").val(galbalDataTemp['assessor_emp_snapshot_id']);
      } else if (ui.item != null) {
        $("#assessor-code-or-name-id").val(ui.item.emp_snapshot_id);
      } else {
        $("#assessor-code-or-name-id").val("");

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
	var assessor_id = $("#assessor-code-or-name-id").val();
	var emp_snapshot_id = $("#tse-code-or-tse-name-id").val();
	
	if(questionaire_type_id == 1){
		template_name="report-ww-position";
	}
	else if(questionaire_type_id == 2){
		template_name="report-wr-position";
	}
	
	parameter = {
			param_questionaire_type: questionaire_type_id,
			param_employee : emp_snapshot_id,
			param_assessor : assessor_id,
			param_date_start : date_start,
			param_date_end : date_end
		  };
	
	if (date_start == '' && date_end == ''){
		 $("body").mLoading('hide'); //Loading
		callFlashSlide(Liferay.Language.get("date-is-require"));
		return false;
	}

//	var currentLocale = $("#user_locale").val();
//	if(typeof currentLocale !== 'undefined'){
//		template_name = template_name+"_"+currentLocale;
//	}
	
		
	var data = JSON.stringify(parameter);
	var url_report_jasper = restfulURL+"/"+serviceName+"/public/questionaire_report/export_transaction?start_date="+date_start+"&end_date="+date_end+"&questionaire_type_id="+questionaire_type_id+"&assessor_id="+assessor_id+"&emp_snapshot_id="+emp_snapshot_id+"&token="+tokenID.token;
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