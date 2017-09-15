var myArray = [{'id':'73','foo':'bar'},{'id':'45','foo':'bar'}];


function findById(source, id) {
    return source.filter(function( obj ) {
        // coerce both obj.id and id to numbers 
        // for val & type comparison
        return +obj.id == +id;
    })[ 0 ];
}

var result = findById( myArray, 45 );

//console.log(result);

var getMapProvinceinitialsName = function(){
	var objectProvinceName=[
	        {'id':'10','desc':'กทม'},
	        {'id':'TH-17','desc':'สห'},
	        {'id':'TH-16','desc':'ลบ'},
	        {'id':'TH-15','desc':'อท'},
	        {'id':'TH-14','desc':'อย'}
			];
	
	console.log(objectProvinceName);
	console.log("-----------");
	console.log(myArray);
	var result = findById( objectProvinceName, '10' );
	console.log(result);
}
getMapProvinceinitialsName();




var createJvectorMap = function(){
	//jVector map thailand
    $('#mapPerfomanceArea').vectorMap({
    	//map: 'th_mill',
    	map: 'th_mill_en',
    	labels: {
    	      regions: {
    	        render: function(code){
    	          var doNotShow = ['US-RI', 'US-DC', 'US-DE', 'US-MD'];

    	          if (doNotShow.indexOf(code) === -1) {
    	            return code.split('-')[1];
    	          }
    	        },
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
    	      }
    	    }
    	
    	});
}
$("document").ready(function(){
	 $( "#detailPerfomanceArea" ).accordion();
	 
	 
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
	    
	    
	    
	    $("#btnCreateMap").click(function(){
	    	createJvectorMap();
	    });
	    
	    
});