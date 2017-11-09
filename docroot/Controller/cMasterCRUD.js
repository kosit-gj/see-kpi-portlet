//Global Variable 
var golbalDataCRUD =[];
var golbalDataCascades = [];
var dataSearch="";
var addCommas =  function(nStr)
{
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}
//set paginate start
var paginationSetUpCRUDFn = function(pageIndex,pageTotal,options){
	
	if(pageTotal==0){
		pageTotal=1
	}
	$('.pagination_top,.pagination_bottom').off("page");
	$('.pagination_top,.pagination_bottom').bootpag({
	    total: pageTotal,//page Total
	    page: pageIndex,//page index
	    maxVisible: 5,//à¸ˆà¸³à¸™à¸§à¸™à¸›à¸¸à¹ˆà¸¡
	    leaps: true,
	    firstLastUse: true,
	    first: '←',
	    last: '→',
	    wrapClass: 'pagination',
	    activeClass: 'active',
	    disabledClass: 'disabled',
	    nextClass: 'next',
	    prevClass: 'prev',
	    next: 'next',
	    prev: 'prev',
	    lastClass: 'last',
	    firstClass: 'first'
	}).on("page", function(event, num){
		var rpp=10;
		if($("#rpp").val()==undefined){
			rpp=10;
		}else{
			rpp=$("#rpp").val();
		}
		
		getDataFn(num,rpp,options,dataSearch);
		
	    $(".pagingNumber").remove();
	    var htmlPageNumber= "<input type='hidden' id='pageNumber' name='pageNumber' class='pagingNumber' value='"+num+"'>";
	    $("body").append(htmlPageNumber);
	   
	}); 

	$(".countPagination").off("change");
	$(".countPagination").on("change",function(){

		$("#countPaginationTop").val($(this).val());
		$("#countPaginationBottom").val($(this).val());
		
		getDataFn(1,$(this).val(),options,dataSearch);
		
		$(".rpp").remove();
		$(".pagingNumber").remove();
		var htmlRrp=
	    htmlRrp+= "<input type='hidden' id='rpp' name='rpp' class='rpp' value='"+$(this).val()+"'>";
		htmlRrp+= "<input type='hidden' id='pageNumber' name='pageNumber' class='pagingNumber' value='1'>";
	    $("body").append(htmlRrp);
	});
}
//set paginate end

function validateNumber(event) {
    var key = window.event ? event.keyCode : event.which;
    if (event.keyCode === 8 || event.keyCode === 46) {
        return true;
    } else if ( key < 48 || key > 57 ) {
        return false;
    } else {
        return true;
    }
};
var validateFileFn = function(data){
	var validateFile="";

	$.each(data,function(index,indexEntry){
		if(indexEntry[Object.keys(indexEntry)[0]]!= undefined || indexEntry[Object.keys(indexEntry)[0]]==null){
			if(indexEntry[Object.keys(indexEntry)[0]]== null){//The employee code field is null
				validateFile+="<font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font> "+Object.keys(indexEntry)[0]+" : null <i class='fa fa-level-down'></i><br>";
			}else{
				validateFile+="<font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font> "+Object.keys(indexEntry)[0]+": "+indexEntry+" <i class='fa fa-level-down'></i><br>";}
			}
	     $.each(indexEntry['errors'],function(index2,indexEntry2){
	    	 validateFile+="<font color='red'>&emsp;*</font> "+indexEntry2+"<br>";
	     });
	 
	});
	callFlashSlideInModal(validateFile,"#informationFile","error");
}
var searchMultiFn=function(search,searchName){
	var paramSearchName="";
	 if(searchName==undefined){
		 paramSearchName="";
	 }else{
		 paramSearchName =searchName;
	 }
	 
	 var search = search.trim().toLowerCase();
	 $(".rowSearch"+paramSearchName).hide();
     $.each( $(".rowSearch"+paramSearchName),function(index1,indexEntry1){
    	 //console.log(indexEntry1);	
    	 var i=0;
    	 $.each($(".columnSearch"+paramSearchName,this),function(index2,indexEntry2){
    		 //console.log($(indexEntry2).text());
    		 //console.log($(indexEntry2).text().indexOf(search));
    		 if($(indexEntry2).text().trim().toLowerCase().indexOf(search)>=0){
    			 $(this).parent().show();
    			 return false;
    		 }
    	 });
     });
}


var insertFn = function(data,options,param){
	
	$.ajax({
		
		url:options['serviceName'],
		type : "POST",
		dataType : "json",
		data : data,
		headers:{Authorization:"Bearer "+options['tokenID'].token},
		success : function(data,status) {
			if(data['status']=="200"){
				//alert("Insert Success");
//				callFlashSlide("Insert success.");
//				getDataFn($("#pageNumber").val(),$("#rpp").val(),options);
//				clearFn(options);
				
				
				
				  if(param !="saveAndAnother"){
					  	callFlashSlide("Insert success.");
					
						getDataFn($("#pageNumber").val(),$("#rpp").val(),options,dataSearch);
						clearFn(options);
						
						$("#modal-"+options['formDetail']['id']).modal('hide');
					}else{
						
						//callFlashSlide("Insert success.");
						callFlashSlideInModal("Insert success.","#information","");
						
						getDataFn($("#pageNumber").val(),$("#rpp").val(),options,dataSearch);
						clearFn(options);
						 
					}
				  
				  
			}else if(data['status']=="400"){
				callFlashSlideInModal(validationFn(data),"#information","error");
			}
			
		}
	});
}
var deleteFn = function(id,options){

	$.ajax({
		
		url:options['serviceName']+"/"+id,
		type : "delete",
		dataType : "json",
		async:false,
		headers:{Authorization:"Bearer "+options['tokenID'].token},
		success : function(data) {
			if(data['status']==200){
				
			getDataFn($("#pageNumber").val(),$("#rpp").val(),options,dataSearch);
			clearFn(options);
			$("#confrimModal").modal('hide');
			}else if(data['status']==400){
				
				//inform_on_confirm
				callFlashSlideInModal(data['data'],"#inform_on_confirm","error");
				//$("#confrimModal").modal('hide');
			}
		}
	}); 
}
var clearFn = function(options){
	$("#id").val("");
	$("#action").val("add");
	$("#information").hide();
	$.each(options['form'],function(index,indexEntry){

		if(indexEntry['inputType']=="text" || indexEntry['inputType']=="date" || indexEntry['inputType']=="password"){
			var dataDefault =(indexEntry['default'] == undefined ? "" : indexEntry['default']);
			$("form#"+options['formDetail']['id']+" #"+indexEntry['id']).val(dataDefault);
		}else if(indexEntry['inputType']=="dropdown" || indexEntry['inputType']=="cascades"){
			if(indexEntry['updateList']== true && indexEntry['updateList']!=undefined){
				$.ajax({
					url:indexEntry['url'],
					dataType:"json",
					type:"get",
					async:false,
					headers:{Authorization:"Bearer "+tokenID.token},
					success:function(data){
						var inputType ="";
						//initValue
						if(indexEntry['initValue']!=undefined){
							inputType+="<option value=''>"+indexEntry['initValue']+"</option>";
						}
						golbalDataCascades[indexEntry['id']] = data;
						
						$.each(data,function(index2,indexEntry2){

							if(dataSearch==indexEntry2[Object.keys(indexEntry2)[0]]){
								
								inputType+="<option selected value="+indexEntry2[Object.keys(indexEntry2)[0]]+">"+indexEntry2[Object.keys(indexEntry2)[1]]+"</option>";
							}else{
								inputType+="<option value="+indexEntry2[Object.keys(indexEntry2)[0]]+">"+indexEntry2[Object.keys(indexEntry2)[1]]+"</option>";
							}
						});
						$("form#"+options['formDetail']['id']+"  #"+indexEntry['id']).html(inputType);
						//alert(inputType);
					}
				})
			}
			$("form#"+options['formDetail']['id']+"  #"+indexEntry['id']).val($("form#"+options['formDetail']['id']+"  #"+indexEntry['id']+" option:first").val());
		}else if(indexEntry['inputType']=="color"){
			$("form#"+options['formDetail']['id']+" #"+indexEntry['id']).val("");
			$("form#"+options['formDetail']['id']+"  #btnColor-"+indexEntry['id']).css("background-color", "#FFFFFF");
			
		}else if(indexEntry['inputType']=="checkbox"){
			
			if(indexEntry['default']=="checked"){
				$("form#"+options['formDetail']['id']+" #"+indexEntry['id']).prop('checked',true);
				
			}else{
				$("form#"+options['formDetail']['id']+" #"+indexEntry['id']).prop('checked',false);
			}
			
		}
	});
}
var updateFn = function(data,options){
	
	$.ajax({
			url:options['serviceName']+"/"+$("#id").val(),
			type : "patch",
			dataType : "json",
			data : data,
			headers:{Authorization:"Bearer "+options['tokenID'].token},
			success : function(data,status) {
				if(data['status']=="200"){
					//alert("Update Success");
					callFlashSlide("Update success.");
					$("#modal-"+options['formDetail']['id']).modal('hide');
					getDataFn($("#pageNumber").val(),$("#rpp").val(),options,dataSearch);
					clearFn(options);
					
				}else if(data['status']=="400"){
					callFlashSlideInModal(validationFn(data),"#information","error");
				}
				
			}
		});
}
var mapObjectToFormFn  =function(data,options){
	
	/*
	"form":[{
	"label":"Connection Name","inputType":"text","default":"DefultText",
	"id":"connectionName","width":"350px","required":true
	},
	 */
	
	$.each(options['form'],function(index,indexEntry){

		if(indexEntry['inputType']=="text" || indexEntry['inputType']=="date"){
			$("form#"+options['formDetail']['id']+"  #"+indexEntry['id']).val(data[indexEntry['id']]);
		}else if(indexEntry['inputType']=="dropdown" || indexEntry['inputType']=="cascades" ){
			if(indexEntry['updateList']== true && indexEntry['updateList']!=undefined){
				$.ajax({
					url:indexEntry['url'],
					dataType:"json",
					type:"get",
					async:false,
					headers:{Authorization:"Bearer "+tokenID.token},
					success:function(data){
						var inputType ="";
						//initValue
						if(indexEntry['initValue']!=undefined){
							inputType+="<option value=''>"+indexEntry['initValue']+"</option>";
						}
						golbalDataCascades[indexEntry['id']] = data;
						
						$.each(data,function(index2,indexEntry2){

							if(dataSearch==indexEntry2[Object.keys(indexEntry2)[0]]){
								
								inputType+="<option selected value="+indexEntry2[Object.keys(indexEntry2)[0]]+">"+indexEntry2[Object.keys(indexEntry2)[1]]+"</option>";
							}else{
								inputType+="<option value="+indexEntry2[Object.keys(indexEntry2)[0]]+">"+indexEntry2[Object.keys(indexEntry2)[1]]+"</option>";
							}
						});
						$("form#"+options['formDetail']['id']+"  #"+indexEntry['id']).html(inputType);
						//alert(inputType);
					}
				})
			}
			$("form#"+options['formDetail']['id']+"  #"+indexEntry['id']).val(data[indexEntry['id']]).change();
			//alert("form#"+options['formDetail']['id']+" > #"+indexEntry['id']);
			//alert(data[indexEntry['id']]);
		}else if(indexEntry['inputType']=="color"){
			$("form#"+options['formDetail']['id']+"  #"+indexEntry['id']).val(data[indexEntry['id']]);
			$("form#"+options['formDetail']['id']+"  #btnColor-"+indexEntry['id']).attr('class',"btn jscolor {valueElement:null,value:'"+data[indexEntry['id']]+"',valueElement:'"+indexEntry['id']+"'}").css("background-color", "#"+data[indexEntry['id']]);
			
			//alert("form#"+options['formDetail']['id']+" > #"+indexEntry['id']);
			//alert(data[indexEntry['id']]);
		}else if(indexEntry['inputType']=="checkbox"){
			
			if(data[indexEntry['id']]==1){
				
				$(".checkbox-"+indexEntry['id']).prop('checked',true);
				
			}else{
				$(".checkbox-"+indexEntry['id']).prop('checked',false);
			}
			
		}
		

		
	});
		
	
//	$.each(data,function(index,indexEntry){
//		if(options[''])
//		$("#"+index).val(indexEntry);
//	});
	$("#modal-"+options['formDetail']['id']).modal();
}
var fineOneFn = function(id,options){
	$.ajax({
		
		url:options['serviceName']+"/"+id,
		type : "GET",
		dataType : "json",
		async:false,
		headers:{Authorization:"Bearer "+options['tokenID'].token},
		success : function(data) {
			$("#id").val(data[options['formDetail']['pk_id']]);
			$("#action").val('edit');
			$("#btnAddAnother").hide();
			mapObjectToFormFn(data,options);
		}
	});
}
var displayTypeFn = function(colunms,options){
	var htmlTbody="";
	if(colunms['colunmsType']=='checkbox'){
	htmlTbody+="<td class=\"columnSearch"+options['formDetail']['id']+"\">"+indexEntry[indexEntry2['id']]+"</td>";
	}else{
	htmlTbody+="<td class=\"columnSearch"+options['formDetail']['id']+"\">"+indexEntry[indexEntry2['id']]+"</td>";	
	}
	return htmlTbody;
};
var listDataFn = function(data,options){
	
	var htmlTbody="";
	$.each(data,function(index,indexEntry) {
		//console.log(indexEntry);
		htmlTbody+="    	<tr class=\"rowSearch"+options['formDetail']['id']+"\">";
		$.each(options['colunms'],function(index2,indexEntry2){
			
			if(indexEntry2['colunmsType']=='checkbox'){
				if(indexEntry[indexEntry2['id']]==1){
					htmlTbody+="<td style='text-align:center;' class=\"columnSearch"+options['formDetail']['id']+"\"><input type='checkbox' disabled='disabled' checked='checked'></td>";
				}else{
					htmlTbody+="<td  style='text-align:center;' class=\"columnSearch"+options['formDetail']['id']+"\"><input type='checkbox' disabled='disabled'></td>";
				}
				
			}else if(indexEntry2['colunmsType']=='text'){
				var formatText = "";
				var styleFormatNum = "";
				if(indexEntry2['colunmsDataType'] == "decimal"){
					formatText= addCommas(parseFloat(indexEntry[indexEntry2['id']]).toFixed(2));
					styleFormatNum ="style='text-align: right;padding-right: 10px;'";
			
				}else if(indexEntry2['colunmsDataType'] == "int"){
					formatText= addCommas(parseInt(indexEntry[indexEntry2['id']]));
					styleFormatNum ="style='text-align: right;padding-right: 10px;'";
				}else{formatText=indexEntry[indexEntry2['id']];}
				htmlTbody+="    		<td class=\"columnSearch"+options['formDetail']['id']+"\" "+styleFormatNum+">"+notNullTextFn(formatText)+"</td>";
			
			}else if(indexEntry2['colunmsType']=='hidden'){

				htmlTbody+="    		<td style='display:none;' class=\"hidden columnSearch"+options['formDetail']['id']+"\">"+indexEntry[indexEntry2['id']]+"</td>";
			
			}else if(indexEntry2['colunmsType']=='color'){

				htmlTbody+="    		<td class=\" columnSearch"+options['formDetail']['id']+"\"><button disabled class=\"btn\" style=\"width: 70px; height: 26px; background-color:#"+indexEntry[indexEntry2['id']]+";opacity: 1 !important;\"></button></td>";
			
			}
		});
		htmlTbody+="    		<td style=\"text-align:center\">";
		htmlTbody+="    		<i data-trigger=\"focus\" tabindex=\""+index+"\" data-content=\"";
		
		if(options['btnManageOption']!=undefined){
		htmlTbody+="    		&lt;button id='"+options['btnManageOption']['id']+"-"+indexEntry[options['formDetail']['pk_id']]+"' class='btn btn-info btn-small btn-gear "+options['btnManageOption']['id']+"'&gt;"+options['btnManageOption']['name']+"&lt;/button&gt;";
		}
		
		htmlTbody+="			&lt;button class='btn btn-warning btn-small btn-gear edit' id='edit-"+indexEntry[options['formDetail']['pk_id']]+"' data-target=#addModalRule data-toggle='modal'&gt;Edit&lt;/button&gt;&nbsp;&lt;button id='del-"+indexEntry[options['formDetail']['pk_id']]+"' class='btn btn-danger btn-small btn-gear del'&gt;Delete&lt;/button&gt;\" data-placement=\"top\" data-toggle=\"popover\" data-html=\"true\" class=\"fa fa-cog font-gear popover-edit-del\" data-original-title=\"\" title=\"\"></i>";
		htmlTbody+="    		</td>";
		htmlTbody+="    	</tr>";
		//&lt;button id='id-"+indexEntry[options['formDetail']['pk_id']]+"' class='btn btn-danger btn-small btn-gear del'&gt;Delete&lt;/button&gt;
	});
	
	$("#listData").html(htmlTbody);
	$(".popover-edit-del").popover();
	$("#table-"+options['formDetail']['id']).off("click",".popover-edit-del");
	$("#table-"+options['formDetail']['id']).on("click",".popover-edit-del",function(){
		//console.log($(this).next().find('.edit').hide());
		//console.log($(this).parent().prev().text());
		//console.log($(this).parent().prev().text());
	if(options['formDetail']['edit_flag']==true){
	}else{
		if($(this).parent().prev().text()==0 && $(this).parent().prev().text()!=""){
			
			$(this).next().find('.edit').attr("disabled","disabled");
		}else{
			
			$(this).next().find('.edit').removeAttr("disabled");
		}
	}
		//Delete Start
		$(".del").on("click",function() {
			
			$(".btnModalClose").click();
			var id=this.id.split("-");
			id=id[1];
			$("#confrimModal").modal();
			$(this).parent().parent().parent().children().click();
			$(document).off("click","#btnConfirmOK");
			$(document).on("click","#btnConfirmOK",function(){
				deleteFn(id,options);
			});
		});
		//findOne Start
		$(".edit").on("click",function() {
			//alert(this.id);
			$("#information").hide();
			$(this).parent().parent().parent().children().click();
			var id=this.id.split("-");
			id=id[1];
			fineOneFn(id,options);
			$("#action").val("edit");
			$(window).scrollTop(0);
			setTimeout(function(){
				$(".modal-body").scrollTop(0);

			});
		});
	});	
	
	
	
}
var getDataFn = function(page,rpp,options,search){
	
	var paramPage =(page == undefined || page == ""  ? "1" : page);
	var paramrpp =(rpp == undefined || rpp == "" ? "" : rpp);
	var pagignation =(options['pagignation'] == '' || options['pagignation'] == undefined  ? false : options['pagignation']);
	
	
	var data="";
	if(search!=undefined){
		data=search+"&page="+paramPage+"&rpp="+paramrpp;
	}else{
		data="page="+paramPage+"&rpp="+paramrpp;
	}
	$.ajax({
		url : options['serviceName'],
		type : "get",
		dataType : "json",
		async:false,
		//data:{"page":page,"rpp":rpp},
		data:data,
		headers:{Authorization:"Bearer "+options['tokenID'].token},
		success : function(data) {
			//alert(data['data'].length);
			//if(data['data'].length>0){
				var dataResult="";
				if(pagignation==true){
					dataResult=data['data'];
				}else{
					dataResult=data;
				}
				listDataFn(dataResult,options);
				golbalDataCRUD=data;
				
				if(pagignation==true){
					$(".paginationControl").show();
					//alert(golbalDataCRUD['current_page']);
					paginationSetUpCRUDFn(golbalDataCRUD['current_page'],golbalDataCRUD['last_page'],options);
					
				}else{
					$(".paginationControl").hide();
				}
			
				$(".resultArea").show();
			//}
			
			
		}
	});
}
//getDataFn();


var createInputTypeFn  = function(object,tokenID){
	
	//var initValue =(object['initValue'] == undefined  ? false : object['initValue']);
	
	var inputType="";
	var inputTooltip ="";

/*
{
"label":"Database Type","inputType":"dropdown","default":"All",
"id":"databaseType","width":"250px","url":"","required":true
},
 */
	if(object['label_tooltip']!= undefined || object['label_tooltip']!= null ){
		inputTooltip ="data-toggle='tooltip' data-original-title='"+object['label_tooltip']+"'"; 
	}else{
		inputTooltip ="";
	}
	if(object['inputType']=="cascades"){
		inputType="<select "+inputTooltip+" class=\"span12 m-b-n\" id=\""+object['id']+"\" name=\""+object['id']+"\" style=\"width:"+object['width']+"\">";			
		//initValue
		if(object['initValue']!=undefined){
			inputType+="<option value=''>"+object['initValue']+"</option>";
		}
		//console.log(golbalDataCascades[object['cascades']['id']][0]);
		$.each(golbalDataCascades[object['cascades']['id']][0][object['cascades']['listData']],function(index,indexEntry){
			//inputType+="<option value="+indexEntry+">"+indexEntry+"</option>";
			inputType+="<option value="+(indexEntry[Object.keys(indexEntry)[0]] != undefined ? indexEntry[Object.keys(indexEntry)[0]] : indexEntry)+">"+(indexEntry[Object.keys(indexEntry)[1]] != undefined ? indexEntry[Object.keys(indexEntry)[1]] : indexEntry)+"</option>";

		});
		inputType+="</select>";
		
		
		
	}
	if(object['inputType']=="dropdown"){
		
		$.ajax({
			url:object['url'],
			dataType:"json",
			type:"get",
			async:false,
			headers:{Authorization:"Bearer "+tokenID.token},
			success:function(data){
				inputType="<select "+inputTooltip+" class=\"span12 m-b-n\" id=\""+object['id']+"\" name=\""+object['id']+"\" style=\"width:"+object['width']+"\">";			
				//initValue
				if(object['initValue']!=undefined){
					inputType+="<option value=''>"+object['initValue']+"</option>";
				}
				golbalDataCascades[object['id']] = data;
				
				$.each(data,function(index,indexEntry){
				
					
					if(dataSearch==indexEntry[Object.keys(indexEntry)[0]]){
						
						inputType+="<option selected value="+indexEntry[Object.keys(indexEntry)[0]]+">"+indexEntry[Object.keys(indexEntry)[1]]+"</option>";
					}else{
						inputType+="<option value="+indexEntry[Object.keys(indexEntry)[0]]+">"+indexEntry[Object.keys(indexEntry)[1]]+"</option>";
					}
				});
				inputType+="</select>";
				//alert(inputType);
			}
		})
		
	}else if(object['inputType']=="text" || object['inputType']=="autoComplete"|| object['inputType']=='hidden'){

		var dataTypeInput =(object['dataTypeInput'] == 'number' ? "numberOnly" : object['dataTypeInput'] == 'ip' ? "ip_address" : object['dataTypeInput'] == undefined ? "" : object['dataTypeInput']);
		var dataDefault =(object['default'] == undefined ? "" : object['default']);
		if(object['placeholder']!=undefined){
			
			inputType+="<input "+inputTooltip+" type=\""+(object['inputType']=='hidden' ? "hidden" : "text")+"\" style='width:"+object['width']+"' class=\"span12 m-b-n "+dataTypeInput+"\" placeholder=\""+object['placeholder']+"\" id=\""+object['id']+"\" name=\""+object['id']+"\" value=\""+object['default']+"\"  >";
			
		}else{
			inputType+="<input "+inputTooltip+" type=\""+(object['inputType']=='hidden' ? "hidden" : "text")+"\" style='width:"+object['width']+"' class=\"span12 m-b-n "+dataTypeInput+"\" placeholder=\"\" id=\""+object['id']+"\" name=\""+object['id']+"\" value=\""+object['default']+"\" >";
			
		}
		
	}else if(object['inputType']=="color" ){


		inputType+="<button id=\"btnColor-"+object['id']+"\" name=\"btnColor-"+object['id']+"\" class=\"btn jscolor {valueElement:null,value:'FFFFFF',valueElement:'"+object['id']+"'} \" style='width:"+object['width']+"; height:"+object['height']+"; margin-right: 5px;'></button>";
		inputType+="<div class='input-prepend input-append' >";
		inputType+="	<span class='add-on'>#</span>";
		inputType+="	<input "+inputTooltip+" type=\"text\"  maxlength='6'  id=\""+object['id']+"\" name=\""+object['id']+"\" style='width: 80px;' class='m-b-n span4'>";
		inputType+="</div>";
		
	}else if(object['inputType']=="date"){

		
		var dataTypeInput =(object['dataTypeInput'] == 'number' ? "numberOnly" : "");
		if(object['placeholder']!=undefined){
			
			inputType+="<input type=\"text\" style='width:"+object['width']+"' class=\"span12 m-b-n datepicker "+dataTypeInput+"\" placeholder=\""+object['placeholder']+"\" id=\""+object['id']+"\" name=\""+object['id']+"\">";
			
		}else{
			inputType+="<input type=\"text\" style='width:"+object['width']+"' class=\"span12 datepicker m-b-n "+dataTypeInput+"\" placeholder=\"\" id=\""+object['id']+"\" name=\""+object['id']+"\">";
			
		}
		
	}else if(object['inputType']=="checkbox"){
	
		var checked =(object['default'] == 'checked' ? "checked" : "");

		inputType+="<input  type=\"hidden\"  id=\""+object['id']+"\" name=\""+object['id']+"\" value='0'>";
		inputType+="<input type='checkbox' "+checked+" class=\"checkbox checkbox-"+object['id']+"\" placeholder=\"\" id=\""+object['id']+"\" name=\""+object['id']+"\">";
		
		
	}else if(object['inputType']=="radio"){
		
		inputType+="<input type='radio' class=\"radio\" placeholder=\"\" id=\""+object['id']+"\" name=\""+object['id']+"\">";
		
	}else if(object['inputType']=="password"){
		
		if(object['placeholder']!=undefined){
			inputType+="<input type=\"password\" style='width:"+object['width']+"' class=\"span12 m-b-n \" placeholder=\""+object['placeholder']+"\" id=\""+object['id']+"\" name=\""+object['id']+"\">";
			
		}else{
			inputType+="<input type=\"password\" style='width:"+object['width']+"' class=\"span12 m-b-n \" placeholder=\"\" id=\""+object['id']+"\" name=\""+object['id']+"\">";
			
		}
	}
	return inputType;
}
var createExpressSearchFn = function(){
var expressSearch="";
expressSearch+="<div class=\"input-group\"><input type=\"text\" class=\"input-sm form-control\" id=\"searchText\" placeholder=\"Search\"> <span class=\"input-group-btn\">";
expressSearch+="<button id=\"btnSearch\" class=\"btn btn-sm btn-primary\" type=\"button\">&nbsp;<i class=\"fa fa-search\"></i></button> </span>";
expressSearch+="</div>";

return expressSearch;
}
var createFormFn = function(options){
	
var formHTML="";
formHTML+="<form id='"+options['formDetail']['id']+"' name='"+options['formDetail']['id']+"'>";
formHTML+="<div aria-hidden=\"true\" role=\"dialog\" tabindex=\"-1\" id=\"modal-"+options['formDetail']['id']+"\" class=\"modal inmodal\" style=\"display: none;\">";
formHTML+="<div class=\"modal-dialog\">";
formHTML+="<div class=\"modal-content  bounceInRight\">";
formHTML+="        <div class=\"modal-header\">";
formHTML+="            <button style=\" \" data-dismiss=\"modal\" class=\"close\" type=\"button\"><span aria-hidden=\"true\"><i class='fa fa-times'></i></span><span class=\"sr-only\" style=\"display: none;\">Close</span></button>";
formHTML+="            <h4 class=\"modal-title\" id=\""+options['formDetail']['id']+"\">"+options['formDetail']['formName']+"</h4>";
formHTML+="        </div>";
formHTML+="        <div class=\"modal-body\">";
//formHTML+="            <div class=\"row-fluid\"><div class=\"col-lg-12\"><div class=\"span12\" style=\"padding: 0px 10px; height:65px;\"><h1><i class=\"fa fa fa-pencil-square-o icon-title\"></i><small id=\"modalDescription\" style=\" position:absolute;top:37px;left:85px\">"+options['formDetail']['formName']+"</small>";
//formHTML+="           </h1></div></div></div> <hr>";
formHTML+="           <div class=\"row-fluid\">";
formHTML+="           <div class=\"span12 form-horizontal p-t-xxs\">";


 
$.each(options['form'],function(index,indexEntry){
	formHTML+="           <div class=\"form-group p-xxs\">";
	formHTML+="                <label class=\"control-label\">";
	formHTML+="                "+indexEntry['label']+"";
								if(indexEntry['required']==true){
									formHTML+="<span class='redFont '>*</span>";
								}
	formHTML+="                </label>";
	formHTML+="                <div class=\"controls\">";
	formHTML+=					createInputTypeFn(indexEntry,options['tokenID']);
	formHTML+="                </div>";
	formHTML+="                </div>";


});
formHTML+="        </div></div></div></div>";
formHTML+="        <div class=\"modal-footer\">";
formHTML+="       	 	<input type=\"hidden\" name=\"id\" id=\"id\" value=\"\">";
formHTML+="				<input type=\"hidden\" name=\"action\" id=\"action\" value=\"add\">";
formHTML+="				<button class=\"btn btn-primary\" type=\"button\" id=\"btnSubmit\">Save</button>";
formHTML+="				<button class=\"btn btn-primary\" type=\"button\" id=\"btnAddAnother\">Save & Add Another</button>";
formHTML+="            <button data-dismiss=\"modal\" class=\"btn btn-danger btnCancle\" type=\"button\">Cancel</button>";
formHTML+="            <div class=\"alert alert-warning information\" id=\"information\" style=\"display: none;\"></div>";
formHTML+="        </div>";
formHTML+="    </div>";
formHTML+="</div>";
formHTML+="</div>";   
formHTML+="</form>"; 
return formHTML;
}
var createScriptCascadesFn = function(options){
	if(options['advanceSearch']!=undefined){
	$.each(options['advanceSearch'],function(index,indexEntry){
		if(indexEntry['inputType'] == "cascades"){
			$("form#searchAdvanceForm  #"+indexEntry['cascades']['id'] +" select").change(function(){
				var htmlChange = "";
				if(indexEntry['initValue']!=undefined){
					htmlChange+="<option value=''>"+indexEntry['initValue']+"</option>";
				}
				$.each(golbalDataCascades[indexEntry['cascades']['id']],function(index2,indexEntry2){
					if(indexEntry2[indexEntry['cascades']['id']] == $("form#searchAdvanceForm  #"+indexEntry['cascades']['id']+" select").val()){
						
						$.each(indexEntry2[indexEntry['cascades']['listData']],function(index3,indexEntry3){
							//htmlChange+="<option value="+indexEntry3+">"+indexEntry3+"</option>";
							htmlChange+="<option value="+(indexEntry3[Object.keys(indexEntry3)[0]] != undefined ? indexEntry3[Object.keys(indexEntry3)[0]] : indexEntry3)+">"+(indexEntry3[Object.keys(indexEntry3)[1]] != undefined ? indexEntry3[Object.keys(indexEntry3)[1]] : indexEntry3)+"</option>";
						});
					}
				});
				$("form#searchAdvanceForm  #"+indexEntry['id']+" select").html(htmlChange);
			});
		}
	});
	};
	$.each(options['form'],function(index,indexEntry){
		if(indexEntry['inputType'] == "cascades"){
			$("form#"+options['formDetail']['id']+"  #"+indexEntry['cascades']['id']).change(function(){
				var htmlChange = "";
				if(indexEntry['initValue']!=undefined){
					htmlChange+="<option value=''>"+indexEntry['initValue']+"</option>";
				}
				$.each(golbalDataCascades[indexEntry['cascades']['id']],function(index2,indexEntry2){
					if(indexEntry2[indexEntry['cascades']['id']] == $("form#"+options['formDetail']['id']+"  #"+indexEntry['cascades']['id']).val()){
						
						$.each(indexEntry2[indexEntry['cascades']['listData']],function(index3,indexEntry3){
							//htmlChange+="<option value="+indexEntry3+">"+indexEntry3+"</option>";
							htmlChange+="<option value="+(indexEntry3[Object.keys(indexEntry3)[0]] != undefined ? indexEntry3[Object.keys(indexEntry3)[0]] : indexEntry3)+">"+(indexEntry3[Object.keys(indexEntry3)[1]] != undefined ? indexEntry3[Object.keys(indexEntry3)[1]] : indexEntry3)+"</option>";
						});
					}
				});
				$("form#"+options['formDetail']['id']+"  #"+indexEntry['id']).html(htmlChange);
			});
		}
	});
}
var createBtnAdvanceSearchOptionFn = function(object){
	
	var AdvanceSearchOption="";
	//AdvanceSearchOption+="	<div class=\"input-group\" >";
	//AdvanceSearchOption+="     	<div id=\"btnSearchArea\">";
	AdvanceSearchOption+="    		<button style=\"margin-bottom: 5px;\"  type=\"button\" class=\"btn btn-success input-sm\" name=\""+object['id']+"\" id=\""+object['id']+"\">"+object['name']+"</button>";
	//AdvanceSearchOption+="     	</div>";
	//AdvanceSearchOption+=" 	</div>";
 	
 	return AdvanceSearchOption;
}
var createBtnAdvanceDownloadOptionFn = function(object){
	
	var AdvanceDownloadOption="";
 	AdvanceDownloadOption+="<form id='formExportToExcel' action='' method='post' class='' style='display: inline-flex; margin-bottom: 5px; position: relative; top: -1px;'>";
	AdvanceDownloadOption+="	<button id='exportToExcel' class='btn btn-warning btn-sm' type='submit'>";
	AdvanceDownloadOption+="		<i class='fa fa-download'></i> Download";
	AdvanceDownloadOption+="	</button>";
	AdvanceDownloadOption+="</form>";
 	return AdvanceDownloadOption;
}
var createBtnAdvanceImportOptionFn = function(object){
	
	
	if(object['formName'] != undefined){
		$("#modal-import #modalTitleFile").html(object['formName']);
	}else{
		$("#modal-import #modalTitleFile").html("Import Option['formName']");
	}
	if(object['accept'] != undefined){
		$("#modal-import #file").attr('accept',object['accept']);
	}
	
	var AdvanceImportOption="";
	AdvanceImportOption+="    		<button style=\"margin-bottom: 5px;\"  type=\"button\" class=\"btn btn-success input-sm\" name=\"btn_import\" id=\"btn_import\" data-target='#modal-import' data-toggle='modal'><i class='fa fa-upload'></i>&nbsp;Import</button>";
 	return AdvanceImportOption;
}
var createAvanceSearchFn = function(options){
	var avanceSearchHTML="";
	$.each(options['advanceSearch'],function(index,indexEntry){
/*
 <div class=\"span4 form-horizontal \">
										<div class="form-group p-xxs ">
											<label class="control-label">CDS Name</label>
											<div class="controls">
												<input data-toggle="tooltip" title="CDS Name" class="span12 m-b-n ui-autocomplete-input" placeholder="CDS Name" id="cds_name" name="cds_name" type="text">
												<input class="form-control input-sm" id="cds_id" name="cds_id" value="" type="hidden">
											</div>
											

										</div>
									</div>
 */
		if(indexEntry['inputType']=='dropdown' || indexEntry['inputType']=='cascades'){
		
			avanceSearchHTML+="<div class='form-group pull-left span3' style='margin-left: 5px' id=\""+indexEntry['id']+"\">";
			avanceSearchHTML+=createInputTypeFn(indexEntry,options['tokenID']);
			avanceSearchHTML+="</div>";
			/*avanceSearchHTML+="<div class=\"span6 form-horizontal \">";
				avanceSearchHTML+="<div class=\"form-group p-xxs\"><label class=\"control-label\">"+indexEntry['label']+"</label>";
					avanceSearchHTML+="<div class=\"controls\" id=\""+indexEntry['id']+"\">";
					avanceSearchHTML+=createInputTypeFn(indexEntry,options['tokenID']);
					avanceSearchHTML+="</div>";
				avanceSearchHTML+="</div>";
			avanceSearchHTML+="</div>";*/
			
		}else if(indexEntry['inputType']=='text' || indexEntry['inputType']=='autoComplete' || indexEntry['inputType']=='hidden'){
			
			var dataTypeInput =(indexEntry['dataTypeInput'] == 'number' ? "numberOnly" : "");
			avanceSearchHTML+="<div class='form-group pull-left span3' style='margin-left: 5px' id='"+indexEntry['id']+"'>";
			avanceSearchHTML+=createInputTypeFn(indexEntry,options['tokenID']);
			avanceSearchHTML+="</div>";
			/*
			avanceSearchHTML+="<div class=\"span6 form-horizontal\">";
				avanceSearchHTML+="<div class=\"form-group p-xxs\"><label class=\"control-label "+dataTypeInput+"\">"+indexEntry['label']+"</label>";
				avanceSearchHTML+="<div class=\"controls\" id='"+indexEntry['id']+"'>";
				avanceSearchHTML+=createInputTypeFn(indexEntry,options['tokenID']);
				avanceSearchHTML+="</div>";
				avanceSearchHTML+="</div>";
			avanceSearchHTML+="</div>";*/
			
		}
	});
	
	

	return avanceSearchHTML;
	

	
	
}
var createDataTableFn = function(options){
	//save option
	golbalDataCascades['options']=options;
	//options['advanceSearchSet']
	var advanceSearchSet =(options['advanceSearchSet'] == '' || options['advanceSearchSet'] == undefined  ? false : options['advanceSearchSet']);
	var expressSearch =(options['expressSearch'] == '' || options['expressSearch'] == undefined  ? false : options['expressSearch']);
	
	$.ajax({
		url:$("#url_portlet").val()+"/theme/basic.html",
		dataType:"html",
		type:"get",
		async:false,
		success:function(data){
			
			
			
			$("#mainContent").html(data);
			
			if(expressSearch==true){
				$("#expressSearchArea").html(createExpressSearchFn());
			}
			if(options['btnAddOption'] == false && options['btnAddOption']!=undefined){
				$("#btnAdd").css({"display":"none"});
			}else{
				$("#btnAddData").html(options['formDetail']['formName']);
				$("#btnAdd").attr("data-target","#modal-"+options['formDetail']['id']);
			}
			$("#titilePage").html(options['formDetail']['formName']);
			$("#titlePanel").html(options['formDetail']['formName']+" List");
			//data-target="#modal-databaseConnection"  btnAddOption
			
			
			
			var tableHTML="";
			var styleCss ="text-align: right;";
			var styleCssCenter ="text-align:center;";
			tableHTML+="<table class=\"table table-striped\" id=\"table-"+options['formDetail']['id']+"\">" ;                               		
			tableHTML+="    <thead>";
			tableHTML+="        <tr>"
			$.each(options['colunms'],function(index,indexEntry){
				if(indexEntry['colunmsType']=='hidden'){
					tableHTML+="            <th d style='width:"+indexEntry['width']+"; display:none;'><b>"+indexEntry['colunmsDisplayName']+"</b></th>";	
				}else{
					if(indexEntry['colunmsDataType'] == "decimal" ||indexEntry['colunmsDataType'] == "int" ){
						tableHTML+="            <th  style='width:"+indexEntry['width']+";"+styleCss+"'><b>"+indexEntry['colunmsDisplayName']+"</b></th>";
					}else if(indexEntry['colunmsDataType'] == "color"){
						tableHTML+="            <th  style='width:"+indexEntry['width']+";"+styleCss+"'><b>"+indexEntry['colunmsDisplayName']+"</b></th>";
					}else if (indexEntry['colunmsType'] == "checkbox" ){
						tableHTML+="            <th  style='width:"+indexEntry['width']+";"+styleCssCenter+"'><b>"+indexEntry['colunmsDisplayName']+"</b></th>";
					}else {tableHTML+="            <th  style='width:"+indexEntry['width']+"'><b>"+indexEntry['colunmsDisplayName']+"</b></th>";}
					
				}
			});
			tableHTML+="           	 	<th style='text-align:center;'><b>Manage</b></th>";
			
			tableHTML+="        </tr>";
			tableHTML+="    </thead>";
			tableHTML+="    <tbody id=\"listData\">";
			
			
			tableHTML+="    </tbody>";
			tableHTML+="</table>";
			$("#tableArea").html(tableHTML);
			
			$("#modalFormArea").html(createFormFn(options));
			
			$.getScript($("#url_portlet").val()+"/js/jscolor-2.0.4/jscolor.js", function(){

				jscolor.installByClassName("jscolor");

			});
			
			
			//binding date picker start
			$( ".datepicker" ).datepicker({ dateFormat: "yy-mm-dd" });
			//binding date picker end
		
		
			if(advanceSearchSet==true){
				
				$("#advanceSearchParamArea").html(createAvanceSearchFn(options));
				$("#advanceSearchArea").show();
			
			}else{
				$("#advanceSearchArea").hide();
			}
			createScriptCascadesFn(options);
			if(options['btnAdvanceSearchOption']!=undefined){
				$("#btnAdvanceSearchOption").html(createBtnAdvanceSearchOptionFn(options['btnAdvanceSearchOption']));
			}
			if(options['btnAdvanceDownloadOption']!=undefined){
				$("#btnAdvanceDownloadOption").html(createBtnAdvanceDownloadOptionFn());
				$("#exportToExcel").click(function(){
					$("form#formExportToExcel").attr("action",options['btnAdvanceDownloadOption']['url']);
				});
			}
			if(options['btnAdvanceImportOption']!=undefined){
				$("#btnAdvanceImportOption").html(createBtnAdvanceImportOptionFn(options['btnAdvanceImportOption']));
				//################################################
				//FILE IMPORT START
				
				$.getScript($("#url_portlet").val()+"/js/dropify.js", function(){
					
					// Basic
				     $('.dropify').dropify();

				     // Translated
				      $('.dropify-fr').dropify({
				         messages: {
				         	 'default': 'Glissez-dposez un fichier ici ou cliquez',
				             replace: 'Glissez-dposez un fichier ou cliquez pour remplacer',
				             remove:  'Supprimer',
				             error:   'Dsol, le fichier trop volumineux'
				         }
				     });
					// Used events
				     var drEvent = $('#input-file-events').dropify();

				     drEvent.on('dropify.beforeClear', function(event, element){
				         return confirm("Do you really want to delete \"" + element.file.name + "\" ?");
				     });

				     drEvent.on('dropify.afterClear', function(event, element){
				         alert('File deleted');
				     });

				     drEvent.on('dropify.errors', function(event, element){
				         console.log('Has Errors');
				     });

				     var drDestroy = $('#input-file-to-destroy').dropify();
				     drDestroy = drDestroy.data('dropify');
				     $('#toggleDropify').on('click', function(e){
				         e.preventDefault();
				         if (drDestroy.isDropified()) {
				             drDestroy.destroy();
				         } else {
				             drDestroy.init();
				         }
				     });

				});
				
				$("#btn_import").click(function () {
					$('#modal-import #file').val("");
					$(".btnModalClose").click();
					$(".dropify-clear").click(); 
				});
				// Variable to store your files
				var files;
				// Add events
				$('#file').on('change', prepareUpload2);

				// Grab the files and set them to our variable
				function prepareUpload2(event)
				{
				  files = event.target.files;
				}
				$('form#fileImport').on('submit', uploadFiles);

				// Catch the form submit and upload the files
				function uploadFiles(event)
				{
					
					event.stopPropagation(); // Stop stuff happening
					event.preventDefault(); // Totally stop stuff happening

					// START A LOADING SPINNER HERE

					// Create a formdata object and add the files
					var data = new FormData();
					$.each(files, function(key, value)
					{
						data.append(key, value);
					});
					$("body").mLoading();
					$.ajax({
						url:options['serviceName']+"/import",
						type: 'POST',
						data: data,
						cache: false,
						dataType: 'json',
						processData: false, // Don't process the files
						contentType: false, // Set content type to false as jQuery will tell the server its a query string request
						headers:{Authorization:"Bearer "+tokenID.token},
						success: function(data, textStatus, jqXHR)
						{
							
							console.log(data);
							if(data['status']==200 && data['errors'].length==0){
										
								callFlashSlide(""+options['btnAdvanceImportOption']['formName']+" Successfully");
								getDataFn($("#pageNumber").val(),$("#rpp").val(),golbalDataCascades['options'],dataSearch);
								$("body").mLoading('hide');
								$("#modal-import").modal('hide');
								
							}else{
								validateFileFn(data['errors']);
								getDataFn($("#pageNumber").val(),$("#rpp").val(),golbalDataCascades['options'],dataSearch);
								$("body").mLoading('hide');
							}
						},
						error: function(jqXHR, textStatus, errorThrown)
						{
							// Handle errors here
							callFlashSlide('Format Error : ' + textStatus);
							// STOP LOADING SPINNER
						}
					});
					return false;
				}
				
				
				//################################################
				
			}
			var getSelectionStart = function (o) {
				if (o.createTextRange) {
					var r = document.selection.createRange().duplicate()
					r.moveEnd('character', o.value.length)
					if (r.text == '') return o.value.length
					return o.value.lastIndexOf(r.text)
				} else return o.selectionStart
			};
//			jQuery('.numberOnly').keypress(function (evt) { 
//				//console.log("Keypress");
//				 var charCode = (evt.which) ? evt.which : event.keyCode;
//				 var number = this.value.split('.');
//				 if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
//				    return false;
//				 }
//				    //just one dot
//				 if(number.length>1 && charCode == 46){
//				    return false;
//				 }
//				    //get the carat position
//				 var caratPos = getSelectionStart(this);
//				 var dotPos = this.value.indexOf(".");
//				 if( caratPos > dotPos && dotPos>-1 && (number[1].length > 1)){
//				    return false;
//				 }
//				 return true;
//			});
			$.getScript($("#url_portlet").val()+"/js/plugins/jquery_mask/jquery.mask.min.js", function(){

				  $('.ip_address').mask('0ZZ.0ZZ.0ZZ.0ZZ', {
					    translation: {
					      'Z': {
					        pattern: /[0-9]/, optional: true
					      }
					    },
					    onChange: function(cep, event, currentField, options){
					        if(cep){
					            var ipArray = cep.split(".");
					            for (i in ipArray){
					                if(ipArray[i] != "" && parseInt(ipArray[i]) > 255){
					                    ipArray[i] =  '255';
					                }
					            }
					            var resultingValue = ipArray.join(".");
					            $(currentField).val(resultingValue);
					        }
					    }
					  });
				  $('.numberOnly').mask('Z9999999999.00', {

					  translation: {
					    'Z': {
					       pattern: /-/,
					      optional: true
					    }
					  }
					})

			});
//			$.getScript($("#url_portlet").val()+"/js/jquery.inputmask.bundle.js", function(){
//				$('.numberOnly').inputmask("numeric", {
//				    radixPoint: ".",
//				    groupSeparator: ",",
//				    digits: 2,
//				    autoGroup: true,
//				    //prefix: '$ ', //Space after $, this will not truncate the first character.
//				    rightAlign: false,
//				    oncleared: function () { self.Value(''); }
//				});
//			});
//			$(".numberOnly").ForceNumericOnly();
//			$(".numberOnly").keyup(function (e) {
//				IsNumeric($(this).val(),this);
////				Â  Â  Â  Â  // Allow: backspace, delete, tab, escape, enter and .
////					
////				Â  Â  Â  Â  if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
////				Â  Â  Â  Â  Â  Â  Â // Allow: Ctrl+A, Command+A
////				Â  Â  Â  Â  Â  Â  (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||Â 
////				Â  Â  Â  Â  Â  Â  Â // Allow: home, end, left, right, down, up
////				Â  Â  Â  Â  Â  Â  (e.keyCode >= 35 && e.keyCode <= 40)) {
////				Â  Â  Â  Â  Â  Â  Â  Â  Â // let it happen, don't do anything
////				Â  Â  Â  Â  Â  Â  Â  Â  Â return;
////				Â  Â  Â  Â  }
////				Â  Â  Â  Â  // Ensure that it is a number and stop the keypress
////				Â  Â  Â  Â  if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
////				Â  Â  Â  Â  Â  Â  e.preventDefault();
////				Â  Â  Â  Â  }
//				});
			
			
			
			//AutoComplete Search Start
			
			//AutoComplete Search End
			
			$("#btnSubmit").click(function(){
				//
				//alert("hellojquery");
				var checkboxes = $("form#"+options['formDetail']['id']).find('input[type="checkbox"]');
				$.each( checkboxes, function( key, value ) {
				    if (value.checked === false) {
				        value.value = 0;
				       
				    } else {
				        value.value = 1;
				    
				    }
				   // $(value).attr('type', 'hidden');
				});
				
				var data = $("form#"+options['formDetail']['id']).serialize();
				//console.log(data);
				
				if($("#action").val()=="add"){
					console.log(data);
					insertFn(data,options);
				}else{
					
					updateFn(data,options);
				}
			});
			
			
			$("#btnAddAnother").click(function(){
				var checkboxes = $("form#"+options['formDetail']['id']).find('input[type="checkbox"]');
				$.each( checkboxes, function( key, value ) {
				    if (value.checked === false) {
				        value.value = 0;
				       
				    } else {
				        value.value = 1;
				    
				    }
				   // $(value).attr('type', 'hidden');
				});
				var data = $("form#"+options['formDetail']['id']).serialize();
				insertFn(data,options,'saveAndAnother');
			});
			
			$("#btnSearch")	.click(function(){
				searchMultiFn($("#searchText").val(),options['formDetail']['id']);
			});
			
			$("#btnAdd").click(function(){
				//$("#modalFormArea").html(createFormFn(options));
				clearFn(options);
				$("#btnAddAnother").show();
				$("#modalFormArea select option:first").prop("selected", true);
				
				$(window).scrollTop(0);
				setTimeout(function(){
					$(".modal-body").scrollTop(0);
				});
				
			});
			
			//advance search start
	    	$("form#searchAdvanceForm").submit(function(){
	    		
	    		
	    		sessionStorage.setItem("searchAdvanceForm",$(this).serialize());
	    		dataSearch = sessionStorage.getItem("searchAdvanceForm");
	    		$(".countPagination").val(10);
	    		$("#rpp").remove();
	    		getDataFn($("#pageNumber").val(),$("#rpp").val(),options,dataSearch);

	    		return false;
	    	});
	    	
	    	if(advanceSearchSet==false){
	    		getDataFn($("#pageNumber").val(),$("#rpp").val(),options,dataSearch);
	    	}
	    	//advance search end
	    	setThemeColorFn(tokenID.theme_color);
		}
	});
}
