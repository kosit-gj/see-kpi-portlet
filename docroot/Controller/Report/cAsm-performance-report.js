var username = "";
var password = "";
var galbalDataTemp = [];

$(document).ready(function () {

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

    // get parameter year
    yearParam();
    // get parameter questionnaireType
    questionnaireTypeParam();

    // Export File
    $("#btnExport").click(function () {
      getDataFn();
    });

    $(".app_url_hidden").show();
  }
});

var questionnaireTypeParam = function () {
  $.ajax({
    url: restfulURL + "/" + serviceName + "/public/questionaire_data/list_questionaire",
    type: "get",
    dataType: "json",
    async: false,
    headers: { Authorization: "Bearer " + tokenID.token },
    success: function (data) {
      var htmlOption = "";
      $.each(data, function (index, indexEntry) {
        if (index == 0) {
          htmlOption += "<option selected='selected' value=" + indexEntry['questionaire_type_id'] + ">" + indexEntry['questionaire_type'] + "</option>";
        } else {
          htmlOption += "<option value=" + indexEntry['questionaire_type_id'] + ">" + indexEntry['questionaire_type'] + "</option>";
        }
      });
      $("#QuestionnaireType").html(htmlOption);
    }
  });
}

var yearParam = function () {
  $.ajax({
    url: restfulURL + "/" + serviceName + "/public/questionaire_data/report/list_year",
    type: "get",
    dataType: "json",
    async: false,
    headers: { Authorization: "Bearer " + tokenID.token },
    success: function (data) {
      var htmlOption = "";
      $.each(data, function (index, indexEntry) {
        if (index == 0) {
          htmlOption += "<option selected='selected' value=" + indexEntry['YEAR'] + ">" + indexEntry['YEAR'] + "</option>";
        } else {
          htmlOption += "<option value=" + indexEntry['YEAR'] + ">" + indexEntry['YEAR'] + "</option>";
        }
      });
      $("#year").html(htmlOption);
    }
  });
}


var getDataFn = function() {
  $("body").mLoading('show'); //Loading
  
	var parameter = {};
  var template_name ="";
  
  // parameter  
	var year = $("#year").val();
	var questionaire_type_id = $("#QuestionnaireType").val();
	
	template_name="asm-performance-report";
	
	parameter = {
      year: year,
			questionaire_type_id : questionaire_type_id,
	};
	
	var data = JSON.stringify(parameter);
	var url_report_jasper = restfulURL+"/"+serviceName+"/public/generateAuth?template_name="+template_name+"&token="+tokenID.token+"&template_format=xlsx&used_connection=1&inline=1&data="+data+"&subreport_bundle=1";	
	console.log("url_report_jasper | ",url_report_jasper);
	 if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		 window.open(url_report_jasper,"_blank");
		} else {
			$('#iFrame_report').attr('src',url_report_jasper);
		}
	 $("body").mLoading('hide'); //Loading
};