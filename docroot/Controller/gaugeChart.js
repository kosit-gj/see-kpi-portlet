var gaugeChart = function(chartId,data,option){
	
	s1 = data[0];

	var ticks=option['ticks'];
	var ticsObj=eval("("+ticks+")");
	
	var intervals=option['intervals'];
	var intervalsObj=eval("("+intervals+")");
	
	var intervalColors=option['intervalColors'];
	var intervalColorsObj=eval("("+intervalColors+")");
	
	
	 
	   plot4 = $.jqplot(chartId,[s1],{
		   animate: true,
	       seriesDefaults: {
	           renderer: $.jqplot.MeterGaugeRenderer,
	           rendererOptions: {
	               label: option['label'],
	               labelPosition: option['labelPosition'],
	               labelHeightAdjust: option['labelHeightAdjust'],
	               intervalOuterRadius: option['intervalOuterRadius'],
	               ticks: ticsObj,
	               intervals:intervalsObj,
	               intervalColors:intervalColorsObj
	           }
	       }
	   });
};