//set initial start

$(document).ready(function(){
/*
 คณะครุศาสตร์อุตสาหกรรมและเทคโนโลยี   - ฟ้าอ่อน #00FFFF
คณะทรัพยากรชีวภาพและเทคโนโลยี - เขียวอ่อน #76B800
คณะพลังงานสิ่งแวดล้อมและวัสดุ - ส้ม-ขาว #FFA500
คณะวิทยาศาสตร์  - เหลือง #FFFF00
คณะวิศวกรรมศาสตร์  - เลือดหมู #A52A2A
คณะศิลปศาสตร์  - ฟ้าคราม #4682b4
คณะสถาปัตยกรรมศาสตร์และการออกแบบ  - ส้ม  #FFAE00
คณะเทคโนโลยีสารสนเทศ  -  เทา-เงิน  #F0F8FF
บัณฑิตวิทยาลัยการจัดการและนวัตกรรม  - เลือดหมู / แดงเข้ม #EF4C00
บัณฑิตวิทยาลัยร่วมด้านพลังงานและสิ่งแวดล้อม  - ฟ้าน้ำเงิน #007BC3
วิทยาลัยสหวิทยาการ  ไม่มี
สถาบันการเรียนรู้   แดง ดำ เชียว (เลือกใช้ค่ะอาจจับคู่แค่ 2 สี)
สถาบันวิทยาการหุ่นยนต์ภาคสนาม  - ส้ม  #FFAE00 
*/
//set tooltip

	$("#btnBarChartMutiYaxes").click(function(){
		var series1=[['11-01-2011',2052], ['11-02-2011',2205], ['11-03-2011',1910], ['11-04-2011',2085], ['11-05-2011',2261]];
  	    var series2=[['11-01-2011',10], ['11-02-2011',20], ['11-03-2011',30], ['11-04-2011',40], ['11-05-2011',50]];
  	    
  	    
  	    barChartY2axis(series1,series2);
	});

	$("#btnBarChart").click(function(){

		$.ajax({
			url:"../Model/barChart.jsp",
			type:"get",
			dataType:"json",
			success:function(data){
				
				//alert(data);
				option=[];
				option['cateRotate']=0;
				option['theme']=theme;
				option['location']='e';
				option['placement']='outside';
				option['tooltipTextColor']='yellow';
				option['title']="ชื่อกราฟ";
				option['barWidth']=20;
				option['fontSize']='14px';
				//show value in graph
				option['pointLabels']=true;
				//set rotation value
				option['pointLabelsRotate']=-90;
				//dicimal
				option['pointLabelsDicimal']=true;
				
				//font size value in graph
				option['pointLabelsFont']='13px';
				//font tooltip size
				option['tooltipFontSize']='10px';
				//clickable
				option['clickable']=true;
				//show hide tooltip
				option['tooltip']=true;
				//font color value
				option['pointLabelsColor']="white";
				
			    option['themeCustom']=["red","green","yellow","#cccccc"];

				barChart("chart",data,option);	
				
				
				
				
			   //bind function click here start.
				 $('#chart').bind('jqplotDataClick',
		            function (ev, seriesIndex, pointIndex, data) {	
					 
					option=[];
					option['param']={"param1":"1","param2":'2'};
					
					var cateName= getCate("../Model/barChart.jsp",pointIndex,option);
					 console.log(cateName);
					 
					 //console.log(getCate("../Model/barChart.jsp",pointIndex)); 
					 console.log(getSeriesCode("../Model/barChart.jsp",seriesIndex,option)); 
		            }
		        );
				//bind function click here end.
				 
				
			}
		});
	});
	$("#btnBarChartMutiSeries").click(function(){
		$.ajax({
			url:"../Model/barChartMutiSeries.jsp",
			type:"get",
			dataType:"json",
			success:function(data){
				
				option=[];
				option['cateRotate']=-30;
				option['theme']=theme;
				option['stackSeries']=false;
				option['tooltipTextColor']='white';
				option['location']='e';
				option['placement']='outside';
				option['title']="ชื่อกราฟ";
				option['pointLabels']=true;
				option['pointLabelsFont']='15px';
				//show hide tooltip
				option['tooltip']=true;
				barChart("chart",data,option);	
				
				//bind function click here start.
				 $('#chart').bind('jqplotDataClick',
		            function (ev, seriesIndex, pointIndex, data) {					
					 console.log(getCate("../Model/barChartMutiSeries.jsp",pointIndex)); 
					 console.log(getSeries("../Model/barChartMutiSeries.jsp",seriesIndex)); 
		            }
		        );
				//bind function click here end.
			}
		});
		
	});
	$("#btnChartHorizontal").click(function(){
		$.ajax({
			url:"../Model/barChart.jsp",
			type:"get",
			dataType:"json",
			success:function(data){
				//alert(data);
				option=[];
				option['cateRotate']=-30;
				option['theme']=theme;
				option['tooltipTextColor']='white';
				option['location']='e';
				option['placement']='outside';
				option['stackSeries']=false;
				option['title']="ชื่อกราฟ";
				option['barWidth']=25;
				option['tooltip']=true;
				//dicimal
				option['pointLabelsDicimal']=true;
				
				option['pointLabels']=true;
				option['pointLabelsFont']='20px';
				option['ticks']=['0','20','40','60','80','100',];
				
				
				option['themeCustom']=["red","green","yellow","#cccccc"];
				barChartHorizontal("chart",data,option);	
				
				//bind function click here start.
				 
				 $('#chart').bind('jqplotDataClick',
		            function (ev, seriesIndex, pointIndex, data) {	
					
					 console.log(getCate("../Model/barChart.jsp",pointIndex)); 
					 console.log(getSeries("../Model/barChart.jsp",seriesIndex)); 
		            }
		        );
				//bind function click here end.
				
			}
		});
	});
	$("#btnChartLine").click(function(){
		$.ajax({
			url:"../Model/barChartMutiSeries.jsp",
			type:"get",
			dataType:"json",
			success:function(data){
				//alert(data);
				option=[];
				option['cateRotate']=-30;
				option['theme']=theme;
				option['title']="ชื่อกราฟ";
				option['tooltipTextColor']='red';
				option['location']='e';
				option['placement']='outside';
				option['title']="ชื่อกราฟ";
				
				//show hide tooltip
				option['tooltip']=true;
				option['pointLabels']=true;
				option['pointLabelsFont']='20px';
				option['clickable']=true;
				
				
				lineChart("chart",data,option);	
				//bind function click here start.
				 $('#chart').bind('jqplotDataClick',
		            function (ev, seriesIndex, pointIndex, data) {	
					
					 console.log(getCate("../Model/barChartMutiSeries.jsp",pointIndex)); 
					 console.log(getSeries("../Model/barChartMutiSeries.jsp",seriesIndex)); 
					 
					 
		            }
		        );
				//bind function click here end.
			}
		});
	});
	
	$("#btnDonut").click(function(){
		$.ajax({
			url:"../Model/pieChart.jsp",
			type:"get",
			dataType:"json",
			success:function(data){
				
				option=[];
				option['cateRotate']=-30;
				option['theme']=theme;
				option['tooltipTextColor']='white';
				option['title']="ชื่อกราฟ";
				option['location']='e';
				option['placement']='inside';
				option['showDataLabels']=true;
				//show hide tooltip
				option['tooltip']=true;
				donutChart("chart",data,option);	
				
				//bind function click here start.
				 $('#chart').bind('jqplotDataClick',
		            function (ev, seriesIndex, pointIndex, data) {				
					 console.log(getCate("../Model/pieChart.jsp",pointIndex)); 
		            }
		        );
				//bind function click here end.
				 
			}
		});
	
	});
	
	$("#btnPie").click(function(){
		$.ajax({
			url:"../Model/pieChart.jsp",
			type:"get",
			dataType:"json",
			success:function(data){
				
				option=[];
				option['theme']=theme;	
				option['dataLabels']='value';//‘label’, ‘value’, ‘percent’ 	
				option['tooltipTextColor']='white';
				option['title']="ชื่อกราฟ";
				option['showDataLabels']=true;
				option['pointLabelsFont']="13px";
				option['pointLabelsColor']="white";
				pieChart("chart",data,option);	
				
				//bind function click here start.
				 $('#chart').bind('jqplotDataClick',
		            function (ev, seriesIndex, pointIndex, data) {				
					 console.log(getCate("../Model/pieChart.jsp",pointIndex)); 
		            }
		        );
				//bind function click here end.
			}
		});
	});
	
	$("#btnBarLineChart").click(function(){
		$.ajax({
			url:"../Model/barLineChart.jsp",
			type:"get",
			dataType:"json",
			success:function(data){
				
				option=[];
				option['cateRotate']=0;
				option['theme']=theme;
				option['tooltipTextColor']='red';
				option['location']='e';
				option['placement']='outside';
				option['title']="ชื่อกราฟ1";
				option['pointLabels']=true;
				option['pointLabelsFont']='16px';
				option['barWidth']=40;
				option['background']=true;
				//show hide tooltip
				option['tooltip']=true;
				//option['max']=100;
				//option['themeCustom']=["red","green","yellow"];
				
				barLineChart("chart",data,option);	
				
				/*
				$('#chart tr.jqplot-table-legend').bind('click', function() {
				    alert($(this).children().last().text());
				});
				*/
				
				
				
				//bind function click here start.
				var i=0;
				 $('#chart').bind('jqplotDataClick',		
		            function (ev, seriesIndex, pointIndex, data) {	
					if((i%2)!=0){
					console.log(getCate("../Model/barLineChart.jsp",pointIndex)); 
					console.log(getSeries("../Model/barLineChart.jsp",seriesIndex)); 
					}
					i++;				 
		            }
		        );
				//bind function click here end.
				 
			}
		});
	});
	
	$("#btnBarLineChart2").click(function(){
		$.ajax({
			url:"../Model/barLineChart2.jsp",
			type:"get",
			dataType:"json",
			success:function(data){
				
				option=[];
				option['cateRotate']=0;
				option['theme']=theme;
				option['title']="Graph BarlineChart";
				option['tooltipTextColor']='white';
				option['location']='e';
				option['placement']='outside';
				option['title']="ชื่อกราฟ";
				option['pointLabels']=true;
				option['pointLabelsFont']='16px';
				//show hide tooltip
				option['tooltip']=true;
				//show y2axis
				option['y2axis']=true;
				barLineChart("chart",data,option);	
				
				//bind function click here start.
				var i=0;
				 $('#chart').bind('jqplotDataClick',		
		            function (ev, seriesIndex, pointIndex, data) {	
					if((i%2)!=0){
					console.log(getCate("../Model/barLineChart2.jsp",pointIndex)); 
					console.log(getSeries("../Model/barLineChart2.jsp",seriesIndex)); 
					}
					i++;				 
		            }
		        );
				//bind function click here end.
			}
		});
	});
	
	
	$("#btnChartHorizontalMutiSeries").click(function(){
		$.ajax({
			url:"../Model/barChartMutiSeries.jsp",
			type:"get",
			dataType:"json",
			success:function(data){
				//alert(data);
				option=[];
				option['cateRotate']=-30;
				option['theme']=theme;
				option['tooltipTextColor']='white';
				option['title']="ชื่อกราฟ";
				option['location']='e';
				option['placement']='outside';
				option['barWidth']=7;
				option['stackSeries']=false;
				
				option['pointLabels']=true;
				option['pointLabelsFont']='20px';
				//show hide tooltip
				option['tooltip']=true;
				max:option['max']=100;
				barChartHorizontal("chart",data,option);	
				//alert("hello");
				
				//bind function click here start.
				 $('#chart').bind('jqplotDataClick',
		            function (ev, seriesIndex, pointIndex, data) {	
					
					 console.log(getCate("../Model/barChartMutiSeries.jsp",pointIndex)); 
					 console.log(getSeries("../Model/barChartMutiSeries.jsp",seriesIndex)); 
		            }
		        );
				//bind function click here end.
				 
			}
		});
	
	});
	$("#btnChartHorizontalMutiSeriesStace").click(function(){
		$.ajax({
			url:"../Model/barChartMutiSeries.jsp",
			type:"get",
			dataType:"json",
			success:function(data){
				//alert(data);
				option=[];
				option['cateRotate']=-30;
				option['theme']=theme;
				option['stackSeries']=true;
				option['tooltipTextColor']='white';
				option['location']='e';
				option['placement']='outside';
				option['pointLabels']=true;
				option['pointLabelsFont']='20px';
				//show hide tooltip
				option['tooltip']=true;
				
				barChartHorizontal("chart",data,option);
				
				//bind function click here start.
				 $('#chart').bind('jqplotDataClick',
		            function (ev, seriesIndex, pointIndex, data) {	
					
					 console.log(getCate("../Model/barChartMutiSeries.jsp",pointIndex)); 
					 console.log(getSeries("../Model/barChartMutiSeries.jsp",seriesIndex)); 
		            }
		        );
				//bind function click here end.
				 

			}
		});
		
	});
	
	$("#btngaugeChart").click(function(){
		$.ajax({
			url:"../Model/gaugeChart.jsp",
			type:"get",
			dataType:"json",
			success:function(data){
				//alert(data);
				option=[];
				option['cateRotate']=0;
				option['ticks']="[10000, 30000, 50000, 70000]";
				option['intervals']="[22000, 55000, 70000]";
				option['intervalColors']="['red', 'yellow', 'green']";
				option['label']='Metric Tons per Year';
				option['labelPosition']='bottom';
				option['labelHeightAdjust']=-5;
				option['intervalOuterRadius']=130;
				option['tooltipTextColor']='white';
				
				gaugeChart("chart",data,option);
				
				
					
			}
		});
	});
	
	$("#btnMapRegion").click(function(){
		//th_mill_en
		//th_regions_mill_en
		
		$.ajax({
			url:"../Model/mapThRegion.jsp",
			type:"get",
			dataType:"json",
			success:function(data){
				option=[];
				option['mapType']="th_regions_mill_en";
				option['tooltipTextColor']='white';
				option['theme']=theme;
				option['initial']="#808080";
				option['selected']="#F4A582";
				option['scale']="['#C8EEFF', '#0071A4']";
				
				map("chart",data,option);	
			}
		});
		
		
	});
	$("#btnMapProvince").click(function(){
		//th_mill_en
		//th_regions_mill_en
		
		$.ajax({
			url:"../Model/mapThProvince.jsp",
			type:"get",
			dataType:"json",
			success:function(data){
				option=[];
				option['mapType']="th_mill_en";
				option['tooltipTextColor']='white';
				option['theme']=theme;
				option['initial']="#808080";
				option['selected']="#F4A582";
				option['scale']="['#C8EEFF', '#0071A4']";
				
				map("chart",data,option);	
				/*clickable*/
				$(".jvectormap-element").on("click",function(){
					alert($("#mapCode").text());
				});
			}
		});
		
		
	});
	
	$("#btnMapRegionByProvince").click(function(){
		//th_mill_en
		//th_regions_mill_en
		
		$.ajax({
			
			url:"../Model/mapThRegionProvince.jsp",
			type:"get",
			dataType:"json",
			success:function(data){
				option=[];
				option['mapType']="th_mill_region_th";
				option['tooltipTextColor']='white';
				option['theme']=theme;
				option['initial']="#808080";
				option['selected']="#F4A582";
				option['scale']="['#C8EEFF', '#0071A4']";
				
				map("chart",data,option);	
				var provinceRegion=new Array();
				//Map Province,Region Start
				
				
				provinceRegion["TH-1"]="TH-BK";
				provinceRegion["TH-60"]="TH-XC";
				provinceRegion["TH-24"]="TH-PM";
				provinceRegion["TH-29"]="TH-PM";
				provinceRegion["TH-33"]="TH-XC";
				provinceRegion["TH-72"]="TH-XC";
				provinceRegion["TH-52"]="TH-XC";
				provinceRegion["TH-65"]="TH-XC";
				provinceRegion["TH-10"]="TH-XC";
				provinceRegion["TH-64"]="TH-XC";
				provinceRegion["TH-9"]="TH-XE";
				provinceRegion["TH-50"]="TH-XE";
				provinceRegion["TH-7"]="TH-XE";
				provinceRegion["TH-16"]="TH-XE";
				provinceRegion["TH-8"]="TH-XE";
				provinceRegion["TH-31"]="TH-XE";
				provinceRegion["TH-18"]="TH-XE";
				provinceRegion["TH-63"]="TH-XE";
				provinceRegion["TH-21"]="TH-XNE";
				provinceRegion["TH-28"]="TH-XNE";
				provinceRegion["TH-69"]="TH-XNE";
				provinceRegion["TH-56"]="TH-XNE";
				provinceRegion["TH-76"]="TH-XNE";
				provinceRegion["TH-47"]="TH-XNE";
				provinceRegion["TH-11"]="TH-XNE";
				provinceRegion["TH-77"]="TH-XNE";
				provinceRegion["TH-27"]="TH-XNE";
				provinceRegion["TH-71"]="TH-XNE";
				provinceRegion["TH-6"]="TH-XNE";
				provinceRegion["TH-73"]="TH-XNE";
				provinceRegion["TH-55"]="TH-XNE";
				provinceRegion["TH-70"]="TH-XNE";
				provinceRegion["TH-43"]="TH-XNE";
				provinceRegion["TH-48"]="TH-XNE";
				provinceRegion["TH-4"]="TH-XNE";
				provinceRegion["TH-57"]="TH-XNE";
				provinceRegion["TH-20"]="TH-XNE";
				provinceRegion["TH-44"]="TH-XNE";
				provinceRegion["TH-14"]="TH-XN";
				provinceRegion["TH-54"]="TH-XN";
				provinceRegion["TH-53"]="TH-XN";
				provinceRegion["TH-75"]="TH-XN";
				provinceRegion["TH-40"]="TH-XN";
				provinceRegion["TH-26"]="TH-XN";
				provinceRegion["TH-41"]="TH-XN";
				provinceRegion["TH-13"]="TH-XN";
				provinceRegion["TH-45"]="TH-XN";
				provinceRegion["TH-23"]="TH-XN";
				provinceRegion["TH-74"]="TH-XN";
				provinceRegion["TH-5"]="TH-XN";
				provinceRegion["TH-17"]="TH-XN";
				provinceRegion["TH-66"]="TH-XN";
				provinceRegion["TH-37"]="TH-XN";
				provinceRegion["TH-36"]="TH-XN";
				provinceRegion["TH-39"]="TH-XN";
				provinceRegion["TH-51"]="TH-XW";
				provinceRegion["TH-3"]="TH-XW";
				provinceRegion["TH-67"]="TH-XW";
				provinceRegion["TH-19"]="TH-PM";
				provinceRegion["TH-62"]="TH-PM";
				provinceRegion["TH-61"]="TH-XW";
				provinceRegion["TH-38"]="TH-XW";
				provinceRegion["TH-30"]="TH-XW";
				provinceRegion["TH-22"]="TH-XS";
				provinceRegion["TH-2"]="TH-XS";
				provinceRegion["TH-34"]="TH-XS";
				provinceRegion["TH-42"]="TH-XS";
				provinceRegion["TH-68"]="TH-XS";
				provinceRegion["TH-49"]="TH-XS";
				provinceRegion["TH-12"]="TH-XS";
				provinceRegion["TH-58"]="TH-XS";
				provinceRegion["TH-59"]="TH-XS";
				provinceRegion["TH-15"]="TH-XS";
				provinceRegion["TH-35"]="TH-XS";
				provinceRegion["TH-32"]="TH-XS";
				provinceRegion["TH-46"]="TH-XS";
				provinceRegion["TH-25"]="TH-XS";

				
				//Map Province Region End
				
				$(".jvectormap-element").on("click",function(){
					var provinceCode=$("#mapCode").text();
						
						alert(provinceRegion[""+provinceCode+""]);
							
						
						
					
				});
			}
		});
		
		
	});
	
	$("#btnMapWorld").click(function(){
		//th_mill_en
		//th_regions_mill_en
		
		$.ajax({
			url:"../Model/mapWorld.jsp",
			type:"get",
			dataType:"json",
			success:function(data){
				option=[];
				option['mapType']="world_mill_en";
				option['tooltipTextColor']='white';
				option['theme']=theme;
				option['initial']="#808080";
				option['selected']="#F4A582";
				option['scale']="['#C8EEFF', '#0071A4']";
				option['markerStyle']={
					      initial: {
					          fill: '#F8E23B',
					          stroke: '#383f47'
					        }
					      };
				/*
				option['markers']=[
				            {latLng: [41.90, 12.45], name: 'Vatican City'},
				            {latLng: [43.73, 7.41], name: 'Monaco'},
				            {latLng: [-0.52, 166.93], name: 'Nauru'},
				            {latLng: [-8.51, 179.21], name: 'Tuvalu'},
				            {latLng: [43.93, 12.46], name: 'San Marino'},
				            {latLng: [47.14, 9.52], name: 'Liechtenstein'},
				            {latLng: [7.11, 171.06], name: 'Marshall Islands'},
				            {latLng: [17.3, -62.73], name: 'Saint Kitts and Nevis'},
				            {latLng: [3.2, 73.22], name: 'Maldives'},
				            {latLng: [35.88, 14.5], name: 'Malta'},
				            {latLng: [12.05, -61.75], name: 'Grenada'},
				            {latLng: [13.16, -61.23], name: 'Saint Vincent and the Grenadines'},
				            {latLng: [13.16, -59.55], name: 'Barbados'},
				            {latLng: [17.11, -61.85], name: 'Antigua and Barbuda'},
				            {latLng: [-4.61, 55.45], name: 'Seychelles'},
				            {latLng: [7.35, 134.46], name: 'Palau'},
				            {latLng: [42.5, 1.51], name: 'Andorra'},
				            {latLng: [14.01, -60.98], name: 'Saint Lucia'},
				            {latLng: [6.91, 158.18], name: 'Federated States of Micronesia'},
				            {latLng: [1.3, 103.8], name: 'Singapore'},
				            {latLng: [1.46, 173.03], name: 'Kiribati'},
				            {latLng: [-21.13, -175.2], name: 'Tonga'},
				            {latLng: [15.3, -61.38], name: 'Dominica'},
				            {latLng: [-20.2, 57.5], name: 'Mauritius'},
				            {latLng: [26.02, 50.55], name: 'Bahrain'},
				            {latLng: [0.33, 6.73], name: 'São Tomé and Príncipe'}
				          ];
				*/
				map("chart",data,option);
				$(".jvectormap-element").on("click",function(){
					alert($("#mapCode").text());
				});
				 
			}
		});
		
		
	});
	
	
	
	$("#btnTable").click(function(){
		$.ajax({
			url:"../Model/table.jsp",
			type:"get",
			dataType:"json",
			success:function(data){
				console.log(data);
				option=[];
				option['theme']=theme;
				option['title']=["ลำดับ","หัวข้อ","Admission","test2"];
				option['contentType']=["","String","Number","Number"];
				option['height']='430';
				option['colsWidth']=["80","100","120","150"];
				option["runNumber"]=true;
				table("chart",data,option);	
				
				
			}
		});
	});
});