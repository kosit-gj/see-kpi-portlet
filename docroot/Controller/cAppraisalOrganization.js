//------ List Appraisal Level Start
var listAppraisalLevel = function() {
	var htmlTable="";
	var htmlDropDown="";
	$.ajax ({
		url:""+restfulURL+"/"+serviceName+"/public/org/al_list" ,
		type:"get" ,
		dataType:"json" ,
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
			//console.log(data);
			htmlDropDown+="<option  value=''></option>";
			$.each(data,function(index,indexEntry){
				htmlTable+="<tr>";
				htmlTable+="<td>";
				htmlTable+="<input  style=\"margin-bottom: 2px;\" id=\"form_role_item-"+indexEntry["level_id"]+"\" class=\"from_data_role\"";
				htmlTable+="type='checkbox' value=\""+indexEntry["level_id"]+"\">";
				htmlTable+="</td>";
				htmlTable+="<td style=\"vertical-align:middle\">"+indexEntry["appraisal_level_name"]+"</td>";
				htmlTable+="</tr>";
				htmlDropDown+="<option  value="+indexEntry["level_id"]+">"+indexEntry["appraisal_level_name"]+"</option>";
//				}		
			});	
		}
	});	
	$("#formListAppraisalLevel").html(htmlTable);
	//console.log(htmlDropDown);
	$("#from_Level_id").html(htmlDropDown);
	
	 $(".from_data_role").click(function(){  // à¹€à¸¡à¸·à¹ˆà¸­à¸„à¸¥à¸´à¸� checkbox  à¹ƒà¸”à¹†  
	        if($(this).prop("checked")==true){ // à¸•à¸£à¸§à¸ˆà¸ªà¸­à¸š property  à¸�à¸²à¸£ à¸‚à¸­à¸‡   
	            var indexObj=$(this).index(".from_data_role"); //   
	            $(".from_data_role").not(":eq("+indexObj+")").prop( "checked", false ); // à¸¢à¸�à¹€à¸¥à¸´à¸�à¸�à¸²à¸£à¸„à¸¥à¸´à¸� à¸£à¸²à¸¢à¸�à¸²à¸£à¸­à¸·à¹ˆà¸™  
	        }  
	    });  
}
var assignLevelOrgFn = function () {
	var chackSelect =  false;
	var org =[];
	var level = [];
	//console.log("insertRoleFn");
	$.each($(".selectBoxorganization").get(),function(index,indexEntry){
		if($(indexEntry).is(":checked")){
			org.push(indexEntry.id.split("-")[1]);
		}
	});
	//console.log("selectEmpCheckbox Pass");
	$.each($(".from_data_role").get(),function(index,indexEntry){
		if($(indexEntry).is(":checked")){
			level.push($(indexEntry).val());
			chackSelect = true;
		}
	});
	//console.log("from_data_role Pass");
	if (chackSelect == false){callFlashSlideInModal("<font color='red'>*</font> Please Select Appraisal level !!!","#information3"); return false;}
	//console.log("chackSelect Pass");
		$.ajax({
			url : ""+restfulURL+"/"+serviceName+"/public/org/role",
			type : "PATCH",
			dataType : "json",
			headers:{Authorization:"Bearer "+tokenID.token},
			async:false,
			data:{
				"orgs"	:	org,
				"roles"	:	level
				},
			success : function(data) {
				//console.log("ajax Pass");
				if(data['status']==200){
					callFlashSlide("Add Appraisal level Successfully.");
					getDataFn($("#pageNumber").val(),$("#rpp").val(),golbalDataCascades['options'],dataSearch);
					$('#ModalLevel').modal('hide');
					
				}
			}
		});
	
	return false;
}
 
$(document).ready(function(){
    
	 var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		 if(connectionServiceFn(username,password,plid)==true){
	 
	 		
    	var options={
    			"colunms":[
    					   {"colunmsDisplayName":"Select","width":"5%","id":"org_id","colunmsType":"selectBox"},
    			           {"colunmsDisplayName":"Org. Code","width":"14%","id":"org_code","colunmsType":"text"},
    			           {"colunmsDisplayName":"Org. Name","width":"18%","id":"org_name","colunmsType":"text"},
    			           {"colunmsDisplayName":"Abbreviation","width":"10%","id":"org_abbr","colunmsType":"text"},
    			           {"colunmsDisplayName":"Appraisal Level","width":"11%","id":"appraisal_level_name","colunmsType":"text"},
    			           {"colunmsDisplayName":"Parent Org.","width":"13%","id":"parent_org_name","colunmsType":"text"},
    			           {"colunmsDisplayName":"Province","width":"","id":"province_name","colunmsType":"text"},
    			           {"colunmsDisplayName":"Lt.","width":"","id":"latitude","colunmsType":"text"},
    			           {"colunmsDisplayName":"Ln.","width":"","id":"longitude","colunmsType":"text"},
    			           {"colunmsDisplayName":"Is Active","width":"7%","id":"is_active","colunmsType":"checkbox"},
    			          ],
    			"form":[{
    					"label":"Organization Code","inputType":"text","placeholder":"Organization Code",
    					"id":"org_code","width":"250px","required":true
    					},
    					{
        				"label":"Organization Name","inputType":"text","placeholder":"Organization Name",
        				"id":"org_name","width":"350px","required":true
        				},
        				{
            				"label":"Abbreviation","inputType":"text","placeholder":"Abbreviation",
            				"id":"org_abbr","width":"250px"
            			},
//    			        {
//    					"label":"Parent Org.","inputType":"dropdown","initValue":"","updateList":true,
//    					"id":"parent_org_code","width":"250px","url":""+restfulURL+"/"+serviceName+"/public/org/parent_list",
//    					},
    					{
        				"label":"Appraisal Level","inputType":"dropdown","initValue":"","updateList":true,
        				"id":"level_id","width":"250px","url":""+restfulURL+"/"+serviceName+"/public/org/al_list"
        				},
        				{
        	    			"label":"Parent Org.","initValue":"","inputType":"cascades",
        	    			"id":"parent_org_code","width":"350px",
        	    			"cascades":{
        	    							"id"		:	"level_id",
        	    							"listData"	:	"parent_org"
        	    						}
        	    		},
        	    		{
            				"label":"Province Name","inputType":"dropdown","initValue":"",
            				"id":"province_code","width":"250px","url":""+restfulURL+"/"+serviceName+"/public/org/province_list"
            			},
            			{
        					"label":"Latitude","inputType":"text","dataTypeInput":"geographic","placeholder":"Latitude",
        					"id":"latitude","width":"250px"
        				},
        				{
        					"label":"Longitude","inputType":"text","dataTypeInput":"geographic","placeholder":"Longtitude",
        					"id":"longitude","width":"250px"
        				},
    					{
	 	    			"label":"IsActive","inputType":"checkbox","default":"checked",
	 	    			"id":"is_active","width":"200px"
	 	    			}
    					
    			     ],
    			 "advanceSearch":[{
 	 					"label":"Level","label_tooltip":"Level","inputType":"dropdown",
 	 					"id":"level_id","width":"100%","initValue":"All Level",
 	 					"url":""+restfulURL+"/"+serviceName+"/public/org/al_list"
 	 					},
 	 					{
 	 	 				"label":"Organization","label_tooltip":"Organization","inputType":"cascades","initValue":"All Organization",
 	 	 				"id":"org_code","width":"100%",
 	 	 				"cascades":{
							"id"		:	"level_id",
							"listData"	:	"org"
 	 	 					}
 	 	 				}],
    			 "formDetail":{"formSize":"modal-dialog","formName":"Organization","id":"organization","pk_id":"org_id"},       
    			 "serviceName":[restfulURL+"/"+serviceName+"/public/org"],
    			 "tokenID":tokenID,
    			 "pagignation":false,
    			 "expressSearch":false,
    			 "advanceSearchSet":true,
    			 "btnAddOption":false,
    			 "btnAdvanceDownloadOption":{"url":""+$("#url_portlet").val()+"/file/appraisal_organization_template.xlsx"},
    			 "btnAdvanceImportOption":{"formName":"Import Organization","accept":".xls ,.xlsx"},
    			 //"btnManageOption":{"id":"BtnID","name":"BtnName"},
    			 "btnAdvanceSearchLastOption":{"id":"btnAssignLevel","name":"<i class=\"fa fa-pencil-square-o\"></i>&nbsp;Assign&nbsp;Level","ClassBtnColor":"btn-primary"}
    	}
    	
    	createDataTableFn(options);
    	$.getScript($("#url_portlet").val()+"/js/plugins/jquery_mask/jquery.mask.min.js", function(){

			  $('.geographic').mask('999.000000');

		});
    	$(document).on('click','#btnAssignLevel',function(){
    		$(".btnModalClose").click();
    		$("#formListAppraisalLevel").empty();
    		var chackSelect =  false;
    		$.each($(".selectBoxorganization").get(),function(index,indexEntry){
    			if($(indexEntry).is(":checked")){
    				chackSelect = true;
    				return false;
    			}
    		});
    		if (chackSelect == true){
    			listAppraisalLevel();
    			
    			$("#ModalLevel").modal({
    				"backdrop" : setModalPopup[0],
    				"keyboard" : setModalPopup[1]
    			});
    			}
    		else{
    			callFlashSlide("Please Select Organization !!!");
    		}
    	});
    	$(document).on('click','#btnLvSubmit',function(){
    		assignLevelOrgFn();
    		return false;
    	});
    	
		}
	 }
	//binding tooltip start
	 $('[data-toggle="tooltip"]').css({"cursor":"pointer"});
	 $('[data-toggle="tooltip"]').tooltip({
		 html:true
	 });
	//binding tooltip end
    });
 
