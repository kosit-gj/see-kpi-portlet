$(document).ready(function() {
	
	//---------------------------------- barChart ------------------------------------
	var reportBarChaert = function(){
		//alert("test");
		var value="[200, 600, 700, 1000]";
		var cate=" ['May', 'June', 'July', 'August']";
		var data =[];
		data = [[1],
		        [1],
		        [1]];
		option = [];
		option['stackSeries'] = true;
		option['themeCustom'] = [ "#F34541" ];
		option['fontFamily'] = 'Tahoma,Geneva,sans-serif';
		option['fontSize'] = '18px';
		option['textColor'] = '#000000';
		// option['pointLabels']='true';
		option['pointLabelsFont'] = '18px';
		option['pointLabelsColor'] = "#000000";
		option['placement'] = 'outside';
		//option['location'] = 'n';
		option['numberRows'] = '1';
		//option['tooltip'] = true;
		option['labelY'] = 'จำนวนคน';
		option['angle'] = '-45';
        barChart("bar-example",data,option);
	
		
	};
	reportBarChaert();
	//---------------------------------- barChart ------------------------------------
	
	
	
});