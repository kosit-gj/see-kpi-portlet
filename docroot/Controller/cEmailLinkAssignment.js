//Ready to call Function.
$(document).ready(function() {
			emailLinkAssignment = true;
			var url_emp_result_id;
			var url_emp_code;
			var url_level_id_org;
			var url_level_id_emp;
			var url_appraisal_type_id;
			var url_org_id;
			var url_stage_id;
			var url_period_id;
			
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
			
			function getDataParameterUrl(url_emp_result_id) {
				$.ajax({
					url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/email_link_assignment",
					type:"get",
					dataType:"json",
					async:false,
					data:{"emp_result_id":url_emp_result_id},
					headers:{Authorization:"Bearer "+tokenID.token},
					success:function(data){
						if(data[0]) {
							url_level_id_org = data[0]['level_id'];
							url_level_id_emp = data[0]['level_id_emp'];
							url_emp_code= data[0]['emp_code'];
							url_org_id = data[0]['org_id'];
							url_stage_id = data[0]['stage_id'];
						} else {
							callFlashSlide("Data is empty.");
							return false;
						}
					}
				});
			}
			
			url_emp_result_id = getUrlParameter('emp_result_id');
			url_appraisal_type_id = getUrlParameter('appraisal_type_id');
			console.log(url_emp_result_id,'url_emp_result_id')
			
			if(url_emp_result_id==undefined) {
				$(".app_url_hidden").hide();
				console.log('undefined '+emp_result_id);
				return false;
			}
			
			getDataParameterUrl(url_emp_result_id);
			
			var embedParam="";
			embedParam+="<input type='hidden' class='embed_param_search' id='embed_appraisal_level_id_org' name='embed_appraisal_level_id_org' value='"+url_level_id_org+"'>";
			embedParam+="<input type='hidden' class='embed_param_search' id='embed_appraisal_level_id_emp' name='embed_appraisal_level_id_emp' value='"+url_level_id_emp+"'>";
			embedParam+="<input type='hidden' class='embed_param_search' id='embed_appraisal_type_id' name='embed_appraisal_type_id' value='"+url_appraisal_type_id+"'>";
			embedParam+="<input type='hidden' class='embed_param_search' id='appraisalType' name='appraisalType' value='"+url_appraisal_type_id+"'>";
			embedParam+="<input type='hidden' class='embed_param_search' id='period_id_edit' name='period_id_edit' value=''>";
			embedParam+="<input type='hidden' class='embed_param_search' id='appraisalLevel' name='appraisalLevel' value='"+url_level_id_org+"'>";
			embedParam+="<input type='hidden' class='embed_param_search' id='appraisalLevelEmp' name='appraisalLevelEmp' value='"+url_level_id_emp+"'>";
			$("#embedParamSearch").append(embedParam);
			
			emp_result_id = url_emp_result_id; // emp_result_id in assignmentslidescore.js
			org_id_to_assign = url_org_id; // org_id_to_assign in assignmentslidescore.js
			
			findOneFn(emp_result_id,"",url_stage_id,url_emp_code);
});