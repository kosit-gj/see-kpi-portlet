/*
var table=function(tableId,data){
	//alert("Create Table");
	var htmlTable="";
	htmlTable+="<table id=\"table"+tableId+"\">";
	$.each(data,function(index,indexEntry){
		if(index==0){
			htmlTable+="<thead>";
			htmlTable+="<tr class=\"active\">";
			for(var i=0;i<indexEntry.length;i++){
				if(indexEntry[i]==0){
				htmlTable+="<th width=\"300\"><b>"+indexEntry[i]+"</b></th>";	
				}else{
				htmlTable+="<th><b>"+indexEntry[i]+"</b></th>";
				}
			}
			htmlTable+="</tr>";
			htmlTable+="</thead>";
			htmlTable+="<tbody>";
			
		}else{
			
			htmlTable+="<tr>";
			for(var i=0;i<indexEntry.length;i++){
				htmlTable+="<td>"+indexEntry[i]+"</td>";
			}
			htmlTable+="</tr>";
			
		}

	});
	htmlTable+="</tbody>";
	htmlTable+="</table>";

	//console.log(data); 
	//alert(htmlTable);
	$("#"+tableId).html(htmlTable);
	$("#table"+tableId).kendoGrid();
};
*/

var table=function(tableId,data,option){
	
	
	
	
	
	//alert("Create Table");
	
		var htmlTable="";
		htmlTable+="<table id=\"table"+tableId+"\">";
		htmlTable+="<colgroup>";
	    for(var i=0;i<option['colsWidth'].length;i++){
	    	htmlTable+="<col style=\"width:"+(parseInt(option['colsWidth'][i])-0)+"px\" />";
		}
	    htmlTable+="</colgroup>";
	    
	    /*
	    [{
            field: "ContactName",
            title: "Contact Name",
            width: 200
        }, {
            field: "ContactTitle",
            title: "Contact Title"
        }, {
            field: "CompanyName",
            title: "Company Name"
        }, {
            field: "Country",
            width: 150
        }]
	    */
	    var columns="";
	    columns="[";
	    for(var i=0;i<option['colsWidth'].length;i++){
	    	 if(i==0){
	    		 columns+="{";
	    		 columns+="field: \"columns"+i+"\",";
	    		 columns+="width:"+option['colsWidth'][i]+"";
	    	 }else{
	    		 columns+=",{";
	    		 columns+="field: \"columns"+i+"\",";
	    		 columns+="width:"+option['colsWidth'][i]+"";
	    	 }
	    	//htmlTable+="<col style=\"width:"+(parseInt(option['colsWidth'][i])-0)+"\" />";
	    	
	    	 columns+="}";
		}
	    columns+="]";
	    var objColumns=eval("("+columns+")");
	    console.log(objColumns);
	    
		htmlTable+="<thead>";
		for(var i=0;i<option['title'].length;i++){
			
			htmlTable+="<th data-field=column"+i+"><b>"+option['title'][i]+"</b></th>";
			
		}
		htmlTable+="</thead>";
		htmlTable+="<body>";
		$.each(data,function(index,indexEntry){
			
				
				htmlTable+="<tr>";
				if(option['runNumber']){
				htmlTable+="<td>"+(index+1)+"</td>";
				}
				for(var i=0;i<indexEntry.length;i++){
					htmlTable+="<td>"+indexEntry[i]+"</td>";
				}
				htmlTable+="</tr>";
				
			
	
		});
		htmlTable+="</tbody>";
		htmlTable+="</table>";
	
	//console.log(data); 
	//alert(htmlTable);
	$("#"+tableId).html(htmlTable);
   
	$("#table"+tableId).kendoGrid({
        height: option['height'],
        columns: objColumns
        //sortable: true
    });
    
    
	$(".k-grid td").css({"padding":"0px","padding-left":"3px","padding-right":"3px"});
	 $("#table"+tableId+" tbody tr").each(function(){
			
			for(var i=0;i<option['contentType'].length;i++){
				if(option['contentType'][i]=="String"){
					$("td",this).eq(i).css({"text-align":option['text-align']}); 
				}else if(option['contentType'][i]=="Number"){
					//alert(addCommas($("td",this).eq(i).text()));
					$("td",this).eq(i).text(addCommas($("td",this).eq(i).text()));
					$("td",this).eq(i).css({"text-align":"center"}); 
				}else{
					$("td",this).eq(i).css({"text-align":"center"}); 
				}
			}
			
	 });
	
};