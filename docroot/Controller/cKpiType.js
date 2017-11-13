var restfulPathKPI="/"+serviceName+"/public/kpi_type";

$(document).ready(function(){
	
	 var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		 if(connectionServiceFn(username,password,plid)==true){
   	
   	//alert(createTableFn());
		    	var options={
		    			
		    			"colunms":[
		    			           {"colunmsDisplayName":"KPI Type Name","width":"65%","id":"kpi_type_name","colunmsType":"text"},
		    			           {"colunmsDisplayName":"IsActive","width":"20%","id":"is_active","colunmsType":"checkbox"},
		    			          ],
		    			"form":[{
		    					"label":"KPI Type Name","inputType":"text","placeholder":"KPI Type Name",
		    					"id":"kpi_type_name","width":"200px","required":true,
		    					},
		    			        
		    					{
		        					"label":"IsActive","inputType":"checkbox","default":"checked",
		        					"id":"is_active","width":"250px"
		        					}
		    					
		    			     ],
		        	     "formDetail":{"formSize":"modal-dialog","formName":"KPI Type","id":"kpi_type_id","pk_id":"kpi_type_id"},       
		    			 "serviceName":[restfulURL+restfulPathKPI],
		    			 "tokenID":tokenID,
		    			 "pagignation":false,
		    			 "expressSearch":false
		    	}
		    	console.log(options['tokenID'].token);
		    	createDataTableFn(options);
	 	}	
	 }   
   	
   });

	
	



