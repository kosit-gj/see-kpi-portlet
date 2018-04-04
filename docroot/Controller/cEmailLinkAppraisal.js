//Ready to call Function.
$(document).ready(function() {
	var username = $('#user_portlet').val();
	var password = $('#pass_portlet').val();
	var plid = $('#plid_portlet').val();
	
	if(username!="" && username!=null & username!=[] && username!=undefined ) {
		
		if(connectionServiceFn(username,password,plid)==true) {
			
			emailLinkAppraisal = true;
			
			var getUrlParameter = function getUrlParameter(sParam) {
			    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
			        sURLVariables = sPageURL.split('&'),
			        sParameterName,
			        i;

			    for (i = 0; i < sURLVariables.length; i++) {
			        sParameterName = sURLVariables[i].split('=');

			        if (sParameterName[0] === sParam) {
			            return sParameterName[1] === undefined ? true : sParameterName[1];
			        }
			    }
			}
			
			var url_emp_result_id = getUrlParameter('emp_result_id');
			
			var embedParam="";
			embedParam+="<input type='hidden' class='embed_param_search' id='embed_appraisalType' name='embed_appraisalType' value=''>";
			embedParam+="<input type='hidden' class='embed_param_search' id='emp_result_id' name='emp_result_id' value='"+url_emp_result_id+"'>";
			$("#embedParamSearch").append(embedParam);
			
			if(url_emp_result_id==undefined) {
				$(".app_url_hidden").hide();
				console.log('undefined '+url_emp_result_id);
				return false;
			}
			
			
			findOneFn(url_emp_result_id);

		}
	}
});