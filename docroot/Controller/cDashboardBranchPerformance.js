var galbalDashboard=[];
var galbalDataTemp = [];
var generateDropDownList = function(url,type,request,initValue){
 	var html="";
 	
 	if(initValue!=undefined){
 		html+="<option value=''>"+initValue+"</option>";
	}

 	$.ajax ({
 		url:url,
 		type:type ,
 		dataType:"json" ,
 		data:request,
 		headers:{Authorization:"Bearer "+tokenID.token},
 		async:false,
 		success:function(data){
 			 			
 			$.each(data,function(index,indexEntry){
 				html+="<option value="+indexEntry[Object.keys(indexEntry)[0]]+">"+indexEntry[Object.keys(indexEntry)[1] == undefined  ?  Object.keys(indexEntry)[0]:Object.keys(indexEntry)[1]]+"</option>";	
 			});	

 		}
 	});	
 	return html;
 };

function findById(source, id) {
    return source.filter(function( obj ) {
        // coerce both obj.id and id to numbers 
        // for val & type comparison
        return +obj.id === +id;
    })[ 0 ];
}



var getMapProvinceinitialsName = function(id){
	//console.log(id);
	var objectProvinceName=[
	 
	{'id':'57','province':'Chiang Rai','initials':'ชร'},
	{'id':'56 	','province':'Phayao','initials':'พย'},
	{'id':'55 	','province':'Nan','initials':'นน'},
	{'id':'54 	','province':'Phrae','initials':'พร'},
	{'id':'53 	','province':'Uttaradit','initials':'อต'},
	{'id':'52 	','province':'Lampang','initials':'ลป'},
	{'id':'51 	','province':'Lamphun','initials':'ลพ'},
	{'id':'50 	','province':'Chiang Mai','initials':'ชม'},
	{'id':'93 	','province':'Phatthalung','initials':'พท'},
	{'id':'92 	','province':'Trang','initials':'ตง'},
	{'id':'91 	','province':'Satun','initials':'สต'},
	{'id':'90 	','province':'Songkhla','initials':'สข'},
	{'id':'96 	','province':'Narathiwat','initials':'นธ'},
	{'id':'95 	','province':'Yala','initials':'ยล'},
	{'id':'58 	','province':'Mae Hong Son','initials':'มส'},
	{'id':'13 	','province':'Pathum Thani','initials':'ปท'},
	{'id':'12 	','province':'Nonthaburi','initials':'นบ'},
	{'id':'11 	','province':'Samut Prakan','initials':'สป'},
	{'id':'10 	','province':'Bangkok Metropolis','initials':'กทม'},
	{'id':'17 	','province':'Sing Buri','initials':'สห'},
	{'id':'16 	','province':'Lop Buri','initials':'ลบ'},
	{'id':'15 	','province':'Ang Thong','initials':'อท'},
	{'id':'14 	','province':'Phra Nakhon Si Ayutthaya','initials':'อย'},
	{'id':'71 	','province':'Kanchanaburi','initials':'กจ'},
	{'id':'70 	','province':'Ratchaburi','initials':'รบ'},
	{'id':'19 	','province':'Saraburi','initials':'สบ'},
	{'id':'72 	','province':'Suphan Buri','initials':'สพ'},
	{'id':'75 	','province':'Samut Songkhram','initials':'สส'},
	{'id':'73 	','province':'Nakhon Pathom','initials':'นฐ'},
	{'id':'77 	','province':'Prachuap Khiri Khan','initials':'ปข'},
	{'id':'76 	','province':'Phetchaburi','initials':'พบ'},
	{'id':'18   ','province':'Chai Nat','initials':'ชน'},
	{'id':'39 	','province':'Nong Bua Lam Phu','initials':'นภ'},
	{'id':' 0	','province':'' ,'initials':''},
	{'id':'74 	','province':'Samut Sakhon','initials':'สค'},
	{'id':'84 	','province':'Surat Thani','initials':'สฏ'},
	{'id':'85 	','province':'Ranong','initials':'รน'},
	{'id':'86 	','province':'Chumphon','initials':'ชพ'},
	{'id':'80 	','province':'Nakhon Si Thammarat','initials':'นศ'},
	{'id':'81 	','province':'Krabi','initials':'กบ'},
	{'id':'82 	','province':'Phangnga','initials':' 	พง'},
	{'id':'83 	','province':'Phuket','initials':'ภก'},
	{'id':'32 	','province':'Surin','initials':'สร'},
	{'id':'40 	','province':'Khon Kaen','initials':'ขก'},
	{'id':'41 	','province':'Udon Thani','initials':'อด'},
	{'id':'42 	','province':'Loei','initials':'ลย'},
	{'id':'43 	','province':'Nong Khai','initials':'นค'},
	{'id':'44 	','province':'Maha Sarakham','initials':'มค'},
	{'id':'45 	','province':'Roi Et','initials':'รอ'},
	{'id':'46 	','province':'Kalasin','initials':'กส'},
	{'id':'47 	','province':'Sakon Nakhon','initials':'สน'},
	{'id':'48 	','province':'Nakhon Phanom','initials':'นพ'},
	{'id':'49 	','province':'Mukdahan','initials':'มห'},
	{'id':'26 	','province':'Nakhon Nayok','initials':'นย'},
	{'id':'27 	','province':'Sa Kaeo','initials':'สก'},
	{'id':'24 	','province':'Chachoengsao','initials':'ฉช'},
	{'id':'25 	','province':'Prachin Buri','initials':'ปจ'},
	{'id':'22 	','province':'Chanthaburi','initials':'จบ'},
	{'id':'23 	','province':'Trat','initials':'ตร'},
	{'id':'20 	','province':'Chon Buri','initials':'ชบ'},
	{'id':'21 	','province':'Rayong','initials':'รย'},
	{'id':'62 	','province':'Kamphaeng Phet','initials':'กพ'},
	{'id':'63 	','province':'Tak','initials':'ตก'},
	{'id':'60 	','province':'Nakhon Sawan','initials':'นว'},
	{'id':'61 	','province':'Uthai Thani','initials':'อน'},
	{'id':'66 	','province':'Phichit','initials':'พจ'},
	{'id':'67 	','province':'Phetchabun','initials':'พช'},
	{'id':'64 	','province':'Sukhothai','initials':'สท'},
	{'id':'65 	','province':'Phitsanulok','initials':'พล'},
	{'id':'35 	','province':'Yasothon','initials':'ยส'},
	{'id':'34 	','province':'Ubon Ratchathani','initials':'อบ'},
	{'id':'37 	','province':'Amnat Charoen','initials':'อจ'},
	{'id':'33 	','province':'Si Sa Ket','initials':'ศก'},
	{'id':'38 	','province':'Bueng Kan','initials':'บก'},
	{'id':'36 	','province':'Chaiyaphum','initials':'ชย'},
	{'id':'31 	','province':'Buri Ram','initials':'บร'},
	{'id':'94 	','province':'Pattani','initials':'ปน'},
	{'id':'30 	','province':'Nakhon Ratchasima','initials':'นม'}
	];

	var result = findById( objectProvinceName, id );
	return result.initials;
}


var locations = [
//	
//       		  ['<div id="11">วัดลาดปลาเค้า</div>', 13.846876, 100.604481],
//       		  ['<div id="12">หมู่บ้านอารียา</div>', 13.847766, 100.605768],
//       		  ['<div id="13">สปีดเวย์</div>', 13.845235, 100.602711],
//       		  ['<div id="14">สเต็ก ลุงหนวด</div>',13.862970, 100.613834]
       		];
var pinSymbol = function (color) {
    return {
    	 path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
        fillColor: color,
        fillOpacity: 1,
        strokeColor: '#000',
        strokeWeight: 2,
        scale: 1,
   };
}
 function initGoogleMap() {
	 
	 		locations = [];
		var region_code= $("#embed_region").val();
		var period= $("#embed_period").val();
		var district_code= $("#embed_district").val();
		var kpi= $("#embed_kpi").val();
		//region_code=41&period_id=17&district_code=77031
		$.ajax({
			url:restfulURL+"/"+serviceName+"/public/dashboard/branch_performance",
			type:"get",
			dataType:"json",
			data:{
				"region_code"				:		region_code,
				"period_id"					:		period,
				"district_code"				:		district_code,
				"item_id"					:		kpi
			},
			async:false,
			headers:{Authorization:"Bearer "+tokenID.token},
			success:function(data){
				$.each(data['google_map'],function(index,indexEntry){
					locations.push([indexEntry['org_id']+"-"+indexEntry['org_name'],parseFloat(indexEntry['latitude']),parseFloat(indexEntry['longitude']),indexEntry['color_code'],[indexEntry]]);
				});
				console.log(locations);
				data['longitude']
				data['latitude']
				var mapOptions = {
						  center: {lat: (locations[0] == undefined ? parseFloat("13.7251088") :data['latitude']), lng: (locations[0] == undefined ? parseFloat("100.4847133") :data['longitude'])},
						  zoom: (locations[0] == undefined ? 5 : 10),
						  mapTypeId: google.maps.MapTypeId.ROADMAP
						};
							
						var maps = new google.maps.Map(document.getElementById("mapGooglePerfomanceArea"),mapOptions);
						var bounds  = new google.maps.LatLngBounds();
						var marker, i, info;

						for (i = 0; i < locations.length; i++) {  

							marker = new google.maps.Marker({
							   position: new google.maps.LatLng(locations[i][1], locations[i][2]),
							   map: maps,
							   icon: pinSymbol(locations[i][3]),
							   title: locations[i][0].split("-")[1]
							});

							info = new google.maps.InfoWindow();
							bounds.extend(marker.position);
						  google.maps.event.addListener(marker, 'click', (function(marker, i) {
							 
							return function() {
							  info.setContent(locations[i][0].split("-")[1]);
							  info.open(maps, marker);
							  
							  //console.log(marker.title);
							  //console.log(locations[i][4]);
							  $("body").mLoading();
							  listDataPerformanceDetailFn(locations[i][4],marker.title,"gmap");
							  
							  //$("body").mLoading('hide');
							  //alert(locations[i][0].split("-")[0]);
							  //console.log(locations[i][4]);
							}
						  })(marker, i));

						}
						
						maps.fitBounds(bounds); 	// # auto-zoom
						//maps.panToBounds(bounds); 	// # auto-center 
				
				
				
				
			}
		});

	 
	 
	 
	

}
var getColorJvectorMap = function(){
	var txtColorData="";
	var txtDataAvg="";
	var objColorData="";
	var objDataAvg="";
	var region_code= $("#embed_region").val();
	var period= $("#embed_period").val();
	var district_code= $("#embed_district").val();
	var kpi= $("#embed_kpi").val();
	//region_code=41&period_id=17&district_code=77031
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/dashboard/branch_performance",
		type:"get",
		dataType:"json",
		data:{
			"region_code"				:		region_code,
			"period_id"					:		period,
			"district_code"				:		district_code,
			"item_id"					:		kpi
			
		},
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			txtColorData+="{";
			txtDataAvg+="{";
			$.each(data['vector_map'],function(index,indexEntry){
				if(index!=0){
					txtColorData+=",";
					txtDataAvg+=",";
				}
				txtColorData+="\"TH-"+indexEntry['province_code']+"\":\""+indexEntry['color_code']+"\"";
				txtDataAvg+="\"TH-"+indexEntry['province_code']+"\":\""+indexEntry['average']+"\"";
				
			});
			txtColorData+="}";
			txtDataAvg+="}";
			//console.log(txtColorData);
			objColorData = eval("("+txtColorData+")");
			objDataAvg = eval("("+txtDataAvg+")");
			//console.log(objColorData);
			createJvectorMap(objColorData,objDataAvg);
		}
	});
}
var listDataPerformanceDetailFn = function(data,district,type){
	//console.log(data);
	var scrollID =  $('#mapArea').children();
	var scroll;
	$(window).off("scroll","resize");
	$(window).on("scroll");
	scrollID.removeClass('fixed');
	var rageGreenColor="#ffffff";
	var rangeColorsThreshold="[]";
	var mainArea="";	
	mainArea+="<h3 style='text-align:center;color:black;font-size: 20px;margin: 0px;' id='BranchPerTitle'></h3>";
	mainArea+="<div id='detailPerfomanceArea'></div>";
	if(data == null || data == undefined || data =="" ){
		mainArea+="<div id='noData'>No data to display.</div>";
	}
	$("#detailArea").html(mainArea);
	$("#BranchPerTitle").html("Branch Performance:"+district);
	//console.log(data);
	$.each(data,function(index,indexEntry){
	
	var dataTableHTML="";
	dataTableHTML+="<h3 data-sparkline='"+(index == 0 ? "active":"")+"'><span style='padding-top:10px;' id='bpf_org_id-"+indexEntry['org_id']+"'>"+indexEntry['org_name']+"</span>";
	dataTableHTML+="<div class='branchPerformance'>";
	dataTableHTML+="<svg id=\"fillgauge"+indexEntry['org_id']+"\" width=\"70px\" height=\"70px\" onclick=\"gauge"+indexEntry['org_id']+".update(NewValue());\"></svg>";
	dataTableHTML+="</div>";
	dataTableHTML+="<br style='clear:both'>";
	dataTableHTML+="</h3>";
  
	dataTableHTML+="<div>";
		dataTableHTML+="<table class='table table-bordered' style='width:100%;'>";
			dataTableHTML+="<thead>";
				dataTableHTML+="<tr>";
					dataTableHTML+="<th>Perspective</th>";
					dataTableHTML+="<th style='min-width: 130px;'>KPI</th>";
					dataTableHTML+="<th>UOM</th>";
					dataTableHTML+="<th style='text-align:center;min-width: 250px;'>KPI Result</th>";	
			dataTableHTML+="</tr>";
			dataTableHTML+="</thead>";
			dataTableHTML+="<tbody>";
				
			$.each(indexEntry['branch_details'],function(index2,indexEntry2){
				if(index2==0){
					 rageGreenColor=indexEntry2['rangeColor'][0];
					 rangeColorsThreshold=indexEntry2['rangeColor'];
					
				}
				
				/*
			actual
	
				"2.40"
			forecast
				
				"3.00"
			item_name
				
				"01 จำนวนเงิน Gross NPL"
			percent_forecast
				
				"80.000000"
			percent_forecast_str
				
				"100,80.000000,100.00,70.00,50.00"
			percent_target
				
				"60.000000"
			percent_target_str
				
				"100,60.000000,100.00,70.00,50.00"
			perspective_name
				
				"01.Strong Financial"
			rangeColor
				
				["4EFF03", "FFFF00", "FF0000"]
			
			target
				
				"4.00"
			uom_name
				
			"ร้อยละ"
				*/
				
				dataTableHTML+="<tr>";
					dataTableHTML+="<td>"+indexEntry2['perspective_name']+" </td>";
					dataTableHTML+="<td>"+indexEntry2['item_name']+"<br><span class='LastUpdateText'>As of: "+indexEntry2['etl_dttm']+"</span></td>";
					dataTableHTML+="<td>"+indexEntry2['uom_name']+" </td>";
					dataTableHTML+="<td>";
					
					dataTableHTML+="<table class='tableInside table-striped'>";
						dataTableHTML+="<thead>";
							dataTableHTML+="<tr>";
								dataTableHTML+="<th style='min-width: 90px;'>Target</th>";
								dataTableHTML+="<th style='min-width: 60px;'>Forecast</th>";
								dataTableHTML+="<th style='min-width: 60px;'>Actual</th>";
							dataTableHTML+="</tr>";
							dataTableHTML+="</thead>";
							dataTableHTML+="<tbody>";
								dataTableHTML+="<tr>";
									dataTableHTML+="<td style=' text-align: right !important;'>"+notNullFn(indexEntry2['target'])+"</td>";
									dataTableHTML+="<td style=' text-align: right !important;'>"+notNullFn(indexEntry2['forecast'])+"</td>";
									dataTableHTML+="<td style=' text-align: right !important;'>"+notNullFn(indexEntry2['actual'])+"</td>";
								dataTableHTML+="</tr>";
								dataTableHTML+="<tr>";
									dataTableHTML+="<td>%Taget<span style='float:right'>"+notNullFn(indexEntry2['percent_target'])+"</span></td>";
									dataTableHTML+="<td colspan='2'><div class='sparkline' style='opacity:0;'  >"+indexEntry2['percent_target_str']+"</div></td>";
								dataTableHTML+="</tr>";
								dataTableHTML+="<tr>";
									dataTableHTML+="<td>%Forecast<span style='float:right'>"+notNullFn(indexEntry2['percent_forecast'])+"</span></td>";
									dataTableHTML+="<td colspan='2'><div class='sparkline' style='opacity:0;'>"+indexEntry2['percent_forecast_str']+"</div></td>";
								dataTableHTML+="</tr>";
							dataTableHTML+="</tbody>";
						dataTableHTML+="</table>";
					dataTableHTML+="</td>";
				dataTableHTML+="</tr>";
				
			});
				
				
			dataTableHTML+="</tbody>";
		dataTableHTML+="</table>"; 
	dataTableHTML+="</div>";
	$("#detailPerfomanceArea").append(dataTableHTML);
	//D3 Liquid Fill Gaug
	var config = liquidFillGaugeDefaultSettings();
	config.circleColor = indexEntry['color_code'];
	config.textColor = "black";
	config.waveTextColor = "black";
	config.waveColor = indexEntry['color_code'];
	

	
	config.circleThickness = 0.2;
	config.textVertPosition = 0.5;
	config.waveAnimateTime = 8000;
	config.waveHeight = 0.15;
    config.waveOffset = 0.25;
    config.circleThickness = 0.05;
    
	var gauge = loadLiquidFillGauge("fillgauge"+indexEntry['org_id'], notNullFn(indexEntry['pct']),config);
	
	

	

});



$("#detailPerfomanceArea" ).accordion({
    heightStyle: "content",
    collapsible: true,
    beforeActivate: function(event, ui) {
        // The accordion believes a panel is being opened
       if (ui.newHeader[0]) {
           var currHeader  = ui.newHeader;
           var currContent = currHeader.next('.ui-accordion-content');
        // The accordion believes a panel is being closed
       } else {
           var currHeader  = ui.oldHeader;
           var currContent = currHeader.next('.ui-accordion-content');
       }
        // Since we've changed the default behavior, this detects the actual status
       var isPanelSelected = currHeader.attr('aria-selected') == 'true';
       
        // Toggle the panel's header
       currHeader.toggleClass('ui-corner-all',isPanelSelected).toggleClass('accordion-header-active ui-state-active ui-corner-top',!isPanelSelected).attr('aria-selected',((!isPanelSelected).toString()));
       
       // Toggle the panel's icon
       currHeader.children('.ui-icon').toggleClass('ui-icon-triangle-1-e',isPanelSelected).toggleClass('ui-icon-triangle-1-s',!isPanelSelected);
       
        // Toggle the panel's content
       currContent.toggleClass('accordion-content-active',!isPanelSelected)    
       if (isPanelSelected) { currContent.slideUp(); }  else { currContent.slideDown(); }

       return false; // Cancels the default action
   }
});

$(".ui-accordion-header").click(function(){
	//console.log($(this).attr("data-sparkline"));
	if($(this).attr("data-sparkline") != "active" ){
		var e_this =  "#"+$(this).next()[0].id;
		//console.log($(e_this +" .sparkline"));
		$(e_this +" .sparkline").sparkline('html', {
	        type: 'bullet',
	        width:'120',
	        height: '20',
	        targetWidth: '6',
		    targetColor: '#fefefe',
		    performanceColor: '#282a4b',
	        rangeColors: rangeColorsThreshold
		}).css("opacity","1");
		$(this).attr("data-sparkline","active" )
	}
	
});

setTimeout(function(){
	
//	$(".sparkline").sparkline([10,12,12,9,7], {
//	    type: 'bullet',
//	    rangeColors: ['#d3dafe','#a8b6ff','red ']
//	}).css("opacity","1");
	    

	
	$(".sparkline").sparkline('html', {
        type: 'bullet',
        width:'120',
        height: '20',
        targetWidth: '6',
	    targetColor: '#fefefe',
	    performanceColor: '#282a4b',
        rangeColors: rangeColorsThreshold
	}).css("opacity","1");
	$("body").mLoading('hide');
	},1000);

/*
 .sparkline(ragneValue1, {
	        type: 'bullet',
	        width:'80',
	        targetColor: rageGreenColor,
	        performanceColor: 'blue',
	        rangeColors: rangeColorsThreshold});
	        
 */




$("#detailArea").show();
if(type == "gmap"){
	  $("#mapGoogle").css({"width" : ""});
}

if(window.innerWidth >= 768 && (data !="" )){
	
	
	scroll = $(window).scrollTop();
	if (scroll >= 290) {
		  scrollID.addClass('fixed');
		  if(type == "gmap"){
			  $("#mapGoogle").css({"width" : "43%"});
		  }	
	  }
	  else {
		  scrollID.removeClass('fixed');
		  if(type == "gmap"){
		  $("#mapGoogle").css({"width" : ""});
	  }	}
	$(window).scroll(function(){
		scroll = $(window).scrollTop();
	  
	  
	  if (scroll >= 290) {
		  scrollID.addClass('fixed');
		  if(type == "gmap"){
			  $("#mapGoogle").css({"width" : "43%"});
		  }	
	  }
	  else {
		  scrollID.removeClass('fixed');
		  if(type == "gmap"){
		  $("#mapGoogle").css({"width" : ""});
	  }	}
	});
}

$(window).on('resize',function(){
	
	
	if(window.innerWidth >= 768 && (data !="" )){
		
		
		scroll = $(window).scrollTop();
		if (scroll >= 290) {
			  scrollID.addClass('fixed');
			  if(type == "gmap"){
				  $("#mapGoogle").css({"width" : "43%"});
			  }	
		  }
		  else {
			  scrollID.removeClass('fixed');
			  if(type == "gmap"){
			  $("#mapGoogle").css({"width" : ""});
		  }	}
		$(window).off("scroll");
		$(window).on("scroll");
		$(window).scroll(function(){
			scroll = $(window).scrollTop();
		  
		  
		  if (scroll >= 290) {
			  scrollID.addClass('fixed');
			  if(type == "gmap"){
				  $("#mapGoogle").css({"width" : "43%"});
			  }	
		  }
		  else {
			  scrollID.removeClass('fixed');
			  if(type == "gmap"){
			  $("#mapGoogle").css({"width" : ""});
		  }	}
		});
	}else{
		$(window).off("scroll");
		$(window).on("scroll");
		scrollID.removeClass('fixed');
		if(type == "gmap"){
			  $("#mapGoogle").css({"width" : ""});
		}
	}
	
	
	
});



  
}
var showPerformanceDetailFn=function(district,province){
	var dataDetails="";
	var period= $("#embed_period").val();
	var kpi= $("#embed_kpi").val();
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/dashboard/branch_details",
		type:"get",
		dataType:"json",
		data : {
			"province_code"		:  	district,
				"period_id"		:	period,
				"item_id"		:	kpi
				
			
		},
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
				
				listDataPerformanceDetailFn(data,province);
				//console.log(data);
			
		}
	});
	
}
var createJvectorMap = function(objColorData,objDataAvg){
	//jVector map thailand
	//var objColorData={"TH-10":"red","TH-12":"yellow"};
    $('#mapPerfomanceArea').vectorMap({
    	map: 'th_mill',
//    	zoomMin: 1.4,
//        focusOn: {
//            x: 0.1,
//            y: 0.1,
//            scale: 1
//        },
    	//map: 'th_mill_en',
    	backgroundColor: "transparent",
    	series: {
 	        regions: [{
 	            values:objColorData,
 	            attribute: "fill"
 	        }]
 	    },
 	    regionsSelectable: false,
		regionStyle: {
			initial: {fill: "#808080"},
			selected: {fill: "#F4A582"}
		},
    	labels: {
    	      regions: {
    	        render: function(code){
    	          //var doNotShow = ['US-RI', 'US-DC', 'US-DE', 'US-MD'];
//    	          if (doNotShow.indexOf(code) === -1) {
//    	        	  getMapProvinceinitialsName(code.split('-')[1]);
//    	        	 // return code.split('-')[1];
//    	        	  
//    	        	  return getMapProvinceinitialsName(code.split('-')[1]);
//    	          }
    	          
    	          getMapProvinceinitialsName(code.split('-')[1]);
 	        	  return getMapProvinceinitialsName(code.split('-')[1]);
    	        }
    			/*,
    	        offsets: function(code){
    	          return {
    	            'CA': [-10, 10],
    	            'ID': [0, 40],
    	            'OK': [25, 0],
    	            'LA': [-20, 0],
    	            'FL': [45, 0],
    	            'KY': [10, 5],
    	            'VA': [15, 5],
    	            'MI': [30, 30],
    	            'AK': [50, -25],
    	            'HI': [25, 50]
    	          }[code.split('-')[1]];
    	        }
    	        */
    	      }
    	    },
  	      onRegionClick:function (event, code){
  				/* Get province name from jvector append to tag hidden in body, For the grid title header. */
  				var map = $("#mapPerfomanceArea").vectorMap("get", "mapObject");
  				$("#districtNameHi").remove();
  				$("body").append("<input type=\"hidden\" id=\"districtNameHi\" value=\""+map.getRegionName(code)+"\">");
  				
  				var district = code.substring(3);
  				//$("body").mLoading();
  				showPerformanceDetailFn(district,$("#districtNameHi").val());
  				$("body").mLoading();
  		    },
    	    onRegionTipShow: function (e, el, code) {
    	        el.html(el.html() + ' , Avg. : '+(notNullFn(objDataAvg[code]) == "NaN"? '0.00':notNullFn(objDataAvg[code])));
    	    }
    	
    	});
}
//SearchAdvance
var searchAdvanceFn = function() {
	/*
	year,
	period,
	region,
	district,
	kpi
	*/
	

	
	var embedParam="";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_year' name='embed_year' value='"+$("#year").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_period' name='embed_period' value='"+$("#period").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_region' name='embed_region' value='"+$("#region").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_district' name='embed_district' value='"+$("#district").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_kpi' name='embed_kpi' value='"+$("#kpi").val()+"'>";

	$("#embedParamSearch").html(embedParam);
	
	if($("#embed_region").val()==""){
		
		$("#mapArea").html("<div id='mapPerfomanceArea'  style='height:"+(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?"500px":"557px")+";'></div>");
		$("#mapPerfomanceArea").show();
		$("#mapGooglePerfomanceArea").hide();
		getColorJvectorMap();
	}else{
		
		$("#mapArea").html("<div id='mapGoogle'><div id='mapGooglePerfomanceArea' style='width:100%; height:500px;'></div></div>");
		$("#mapPerfomanceArea").hide();
		$("#mapGooglePerfomanceArea").show();
		initGoogleMap();
	}

}; 
$("document").ready(function(){
	var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		 if(connectionServiceFn(username,password,plid)==false){
	 		return false;
	 	}
		 
		 	$("#year").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/dashboard/year_list","GET"));
			$("#period").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/dashboard/period_list","POST",{"appraisal_year":$("#year").val()}));
			$("#region").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/dashboard/region_list","GET",{},"All Region"));
		 	$("#district").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/dashboard/district_list","get",{"org_code":$("#region").val()},"All District"));
		 	$("#kpi").html((generateDropDownList(restfulURL+"/"+serviceName+"/public/dashboard/kpi_map_list","POST",{"region_code":$("#region").val(),"district_code":$("#district").val()},"All KPI")));
			
		 	//#Change Param Function
			$("#year").change(function(){$("#period").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/dashboard/period_list","POST",{"appraisal_year":$("#year").val()}));});
			$("#region").change(function(){$("#district").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/dashboard/district_list","get",{"org_code":$("#region").val()},"All District"));$("#district").change();});
			$("#district").change(function(){$("#kpi").html((generateDropDownList(restfulURL+"/"+serviceName+"/public/dashboard/kpi_map_list","POST",{"region_code":$("#region").val(),"district_code":$("#district").val()},"All KPI")));});
			$(".app_url_hidden").show();
			//$( "#detailPerfomanceArea" ).accordion();
			 
			 /*
		    var gauge1 = loadLiquidFillGauge("fillgauge1", 55);
		    var config1 = liquidFillGaugeDefaultSettings();
		    config1.circleColor = "#FF7777";
		    config1.textColor = "#FF4444";
		    config1.waveTextColor = "#FFAAAA";
		    config1.waveColor = "#FFDDDD";
		    config1.circleThickness = 0.2;
		    config1.textVertPosition = 0.2;
		    config1.waveAnimateTime = 1000;
		    
		    var gauge2 = loadLiquidFillGauge("fillgauge2", 80);
		    var config2= liquidFillGaugeDefaultSettings();
		    config2.circleColor = "#FF7777";
		    config2.textColor = "#FF4444";
		    config2.waveTextColor = "#FFAAAA";
		    config2.waveColor = "#FFDDDD";
		    config2.circleThickness = 0.2;
		    config2.textVertPosition = 0.2;
		    config2.waveAnimateTime = 1000;
		    
		    var gauge3 = loadLiquidFillGauge("fillgauge3", 70);
		    var config3 = liquidFillGaugeDefaultSettings();
		    config3.circleColor = "#FF7777";
		    config3.textColor = "#FF4444";
		    config3.waveTextColor = "#FFAAAA";
		    config3.waveColor = "#FFDDDD";
		    config3.circleThickness = 0.2;
		    config3.textVertPosition = 0.2;
		    config3.waveAnimateTime = 1000;
		    
		    var gauge4 = loadLiquidFillGauge("fillgauge4", 45);
		    var config4 = liquidFillGaugeDefaultSettings();
		    config4.circleColor = "#FF7777";
		    config4.textColor = "#FF4444";
		    config4.waveTextColor = "#FFAAAA";
		    config4.waveColor = "#FFDDDD";
		    config4.circleThickness = 0.2;
		    config4.textVertPosition = 0.2;
		    config4.waveAnimateTime = 1000;
		    */
		    
		    
		    $("#btnCreateMap").click(function(){
		    	createJvectorMap();
		    });
		    
		    $("#btnCreateGoogleMap").click(function(){
		    	
		    	initGoogleMap();
		    	//alert("hello jquery");	
		    });
		    
		    //click submit();
		    $("#btnSearchAdvance").click(function(){
		    	$("#detailArea").hide();
		    	searchAdvanceFn();
		    });
		    
		    
		    
		//binding tooltip start
			 $('[data-toggle="tooltip"]').css({"cursor":"pointer"});
			 $('[data-toggle="tooltip"]').tooltip({
				 html:true
			 });
		//binding tooltip end
				 
		 
	 }
	
	 //get data color map for jector
	// getColorJvectorMap();
	
	 
	
	 
	    
	
	    
});