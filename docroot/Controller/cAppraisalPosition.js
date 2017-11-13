var galbalDataTemp = []; 
$(document).ready(function(){
   
	 var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		 if(connectionServiceFn(username,password,plid)==true){
	 
	 		
    	var options={
    			"colunms":[
    						{"colunmsDisplayName":"Position Code","width":"15%","id":"position_code","colunmsType":"text"},
    			           {"colunmsDisplayName":"Position Name","width":"60%","id":"position_name","colunmsType":"text"},
    			           {"colunmsDisplayName":"Is Active","width":"auto","id":"is_active","colunmsType":"checkbox"},
    			          ],
    			"form":[{
						"label":"Position Code","inputType":"text","placeholder":"Position Code",
						"id":"position_code","width":"250px","required":true
						},{
    					"label":"Position Name","inputType":"text","placeholder":"Position Name",
    					"id":"position_name","width":"350px","required":true
    					},
    					{
	 	    			"label":"IsActive","inputType":"checkbox","default":"checked",
	 	    			"id":"is_active","width":"200px"
	 	    			}
    					
    			     ], 	
    			 "advanceSearch":[{
     	 				"label":"Position","label_tooltip":"Position","inputType":"autoComplete","placeholder":"Position",
     	 				"id":"position_name","width":"100%","default":""
     				    }
     				    ],
    			 "formDetail":{"formSize":"modal-dialog","formName":"Position","id":"position","pk_id":"position_id"},       
    			 "serviceName":[restfulURL+"/"+serviceName+"/public/position"],
    			 "tokenID":tokenID,
    			 "pagignation":false,
    			 "expressSearch":false,
    			 "advanceSearchSet":true,
    			 "btnAddOption":false,
    			 "btnAdvanceDownloadOption":{"url":""+$("#url_portlet").val()+"/file/appraisal_position_template.xlsx"},
    			 "btnAdvanceImportOption":{"formName":"Import Position","accept":".xls ,.xlsx"}
    			 //"btnManageOption":{"id":"BtnID","name":"BtnName"},
    			 //"btnAdvanceSearchOption":{"id":"BtnID","name":"<i class=\"fa fa-plus-square\"></i>&nbsp;Btn"}
    	}
    	
    	createDataTableFn(options);
    	
		}
	 	//Autocomplete From Position Start
    	$("form#searchAdvanceForm #position_name input").autocomplete({
            source: function (request, response) {
            	$.ajax({
    				 url:restfulURL+"/"+serviceName+"/public/position/auto",
    				 type:"POST",
    				 dataType:"json",
    				 data:{
    					 "q":request.term},
    				//async:false,
    				 headers:{Authorization:"Bearer "+tokenID.token},
                     error: function (xhr, textStatus, errorThrown) {
                            console.log('Error: ' + xhr.responseText);
                        },
    				 success:function(data){
    					  
    						response($.map(data, function (item) {
    							var dataSet = new Object();
    							//autocomplete default values REQUIRED
    							dataSet.label = item.position_name;
    							dataSet.value = item.position_name;

                                //extend values
    							dataSet.position_id = item.position_id;

    							console.log(dataSet);
                                return dataSet;
                            }));
    					
    				},
    				beforeSend:function(){
    					$("body").mLoading('hide');	
    				}
    				
    				});
            }
        });
       
    	//Autocomplete From Position End
	 }
    });
 
