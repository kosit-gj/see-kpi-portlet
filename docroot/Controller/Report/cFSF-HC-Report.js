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
    
	    $("#QuestionnaireType").change(function() {
	    	clearParamFn();
		});
    
    questionnaireTypeParam();
    $(".app_url_hidden").show();
		
  }
});


$("#btnExport").click(function(){
	getDataFn();
});

var clearParamFn = function(){
	galbalDataTemp=[]; 
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


var getDataFn = function() {
	$("body").mLoading('show'); //Loading
	var parameter = {};
	var template_name ="";
	var date_start = $("#date-start").val();
	var date_end = $("#date-end").val();
	var questionaire_type_id = $("#QuestionnaireType").val();
	
	template_name="FSF-HC-Report"; 
	
	parameter = {
			param_questionaire_type: questionaire_type_id,
			param_date_start : date_start,
			param_date_end : date_end,
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