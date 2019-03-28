var galbalDataTemp = [];
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
$(document).ready(function(){
   
	 var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		 if(connectionServiceFn(username,password,plid)==true){
	 
	 		
    	var options={
    			"colunms":[
    						{"colunmsDisplayName":"Valid Date","width":"15%","id":"valid_date","colunmsType":"text"},
    			           {"colunmsDisplayName":"Position Name","width":"20%","id":"position_name","colunmsType":"text"},
    			           {"colunmsDisplayName":"Job Function","width":"20%","id":"job_function_name","colunmsType":"text"},
    			           {"colunmsDisplayName":"Head Counte", "width":"15%","id":"head_count","colunmsType":"text","colunmsDataType":"int"},
    			          ],
    			"form":[
	    				{
	    				"label":"Head Countee","inputType":"text","placeholder":"Head Counte","default":"0",
	    				"id":"head_count","width":"250px","dataTypeInput":"number","required":true,
					   },
    					
    			     ], 	
    			 "advanceSearch":[
    				 	{
    				 		"label":"Start Date","label_tooltip":"Start Date","inputType":"text","placeholder":"Start Date",
    				 		"id":"start_date","width":"100%","default":""
     				    },
     				    {
         	 				"label":"End Date","label_tooltip":"End Date","inputType":"text","placeholder":"End Date",
         	 				"id":"end_date","width":"100%","default":""
       				    },
       				    {
         	 				"label":"Position","label_tooltip":"Position","inputType":"autoComplete","placeholder":"Position",
         	 				"id":"position_name","width":"100%","default":""
       				    },
       				    {
        				 	"label":"Job Function","label_tooltip":"Job Function","inputType":"dropdown",
        					"id":"job_function_id","width":"100%","initValue":"All Job Function",
        					"url":""+restfulURL+"/"+serviceName+"/public/head_count/list_job_function"
         				}
     				    ],
    			 "formDetail":{"formSize":"modal-dialog","formName":"Head Count","id":"head_count","pk_id":"head_count_id"},       
    			 "serviceName":[restfulURL+"/"+serviceName+"/public/head_count"],
    			 "tokenID":tokenID,
    			 "pagignation":true,
    			 "expressSearch":false,
    			 "advanceSearchSet":true,
    			 "btnAddOption":false,
    			 "btnAdvanceDownloadOption":{"url":""+$("#url_portlet").val()+"/file/head_count_template.xlsx"},
    			 "btnAdvanceImportOption":{"formName":"Import Head Count","accept":".xls ,.xlsx"}
    			 //"btnManageOption":{"id":"BtnID","name":"BtnName"},
    			 //"btnAdvanceSearchOption":{"id":"BtnID","name":"<i class=\"fa fa-plus-square\"></i>&nbsp;Btn"}
    	}
    	
    	createDataTableFn(options);
    	
		}
		 $("#start_date input").parent().attr('id',  "start_date_temp");
		 $("#end_date input").parent().attr('id',  "start_date_temp");
		 
		 $( function() {
		        $( "#start_date" ).datepicker({
				 	dateFormat: "dd/mm/yy",
		            minDate: new Date(2018, 1 - 1, 1),
		            onSelect: function () {
		                var dt2 = $('#end_date');
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
		            	
		            }
		        });
		      } );
		    
		    $( function() {
		        $( "#end_date" ).datepicker({ 
		        	dateFormat: "dd/mm/yy",
		        	minDate: 0
		        });
		      } );
		    
		    $("#start_date ,#end_date").keypress(function(event) {
			    return ( ( event.keyCode || event.which ) === 9 ? true : false );
			});
		    
			$("#start_date ,#end_date").keydown(function(event) {		
			    return ( ( event.keyCode || event.which ) === 9 ? true : false );
			});
			toDayFn("#start_date , #end_date");
	 	//Autocomplete From Position Start
    	$("form#searchAdvanceForm #position_name input").autocomplete({
            source: function (request, response) {
            	$.ajax({
    				 url:restfulURL+"/"+serviceName+"/public/head_count/auto",
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
    	
    	$("#position_code").prop("disabled", true);
	 }
    });
 
