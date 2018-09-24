 $(document).ready(function(){
    	
	 var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
		 if(connectionServiceFn(username,password,plid)==true){
			 var options = {
					 "colunms":[
							{
								 "colunmsDisplayName": "Appraisal Form Name",
								 "width": "65%",
								 "id": "appraisal_form_name",
								 "colunmsType": "text"
							 },
							 {
								 "colunmsDisplayName": "IsActive",
								 "width": "20%",
								 "id": "is_active",
								 "colunmsType": "checkbox"
							 }
						],
						"form":[
							{
								"label": "Appraisal Form Name",
								"inputType": "text",
								"placeholder": "Appraisal Form Name",
								"id": "appraisal_form_name",
								"width": "200px",
								"required": true
							},
							{
								"label": "IsActive",
								"inputType": "checkbox",
								"default": "checked",
								"id": "is_active",
								"width":"250px"
							}
						],
						"formDetail":{
							"formSize": "modal-dialog", 
							"formName": "Appraisal Form", 
							"id": "appraisal_form_id",
							"pk_id": "appraisal_form_id"
						},
						"serviceName":[restfulURL+"/"+serviceName+"/public/appraisal_form"],
						"tokenID":tokenID,
						"pagignation":false,
						"expressSearch":false
			}
			 
			createDataTableFn(options);
		}
	}
	 
});