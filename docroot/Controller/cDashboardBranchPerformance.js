

function findById(source, id) {
    return source.filter(function( obj ) {
        // coerce both obj.id and id to numbers 
        // for val & type comparison
        return +obj.id === +id;
    })[ 0 ];
}



var getMapProvinceinitialsName = function(id){
	console.log(id);
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
	{'id':'22 	','province':'Chanthaburi','initials':'ปจ'},
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
       		  ['<div id="11">วัดลาดปลาเค้า</div>', 13.846876, 100.604481],
       		  ['<div id="12">หมู่บ้านอารียา</div>', 13.847766, 100.605768],
       		  ['<div id="13">สปีดเวย์</div>', 13.845235, 100.602711],
       		  ['<div id="14">สเต็ก ลุงหนวด</div>',13.862970, 100.613834]
       		];

 function initMap() {
	var mapOptions = {
	  center: {lat: 13.847860, lng: 100.604274},
	  zoom: 15,
	}
		
	var maps = new google.maps.Map(document.getElementById("mapGooglePerfomanceArea"),mapOptions);
	
	var marker, i, info;

	for (i = 0; i < locations.length; i++) {  

		marker = new google.maps.Marker({
		   position: new google.maps.LatLng(locations[i][1], locations[i][2]),
		   map: maps,
		   title: locations[i][0]
		});

		info = new google.maps.InfoWindow();

	  google.maps.event.addListener(marker, 'click', (function(marker, i) {
		 
		return function() {
		  info.setContent(locations[i][0]);
		  info.open(maps, marker);
		  
		  console.log(marker.title);
		  alert(marker.title)
		  console.log(i);
		}
	  })(marker, i));

	}

}
var createJvectorMap = function(){
	//jVector map thailand
    $('#mapPerfomanceArea').vectorMap({
    	map: 'th_mill',
    	//map: 'th_mill_en',
    	labels: {
    	      regions: {
    	        render: function(code){
    	          var doNotShow = ['US-RI', 'US-DC', 'US-DE', 'US-MD'];

    	          if (doNotShow.indexOf(code) === -1) {
    	        	  getMapProvinceinitialsName(code.split('-')[1]);
    	        	 // return code.split('-')[1];
    	        	  
    	        	  return getMapProvinceinitialsName(code.split('-')[1]);
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
    	    },
  	      onRegionClick:function (event, code){
  				/* Get province name from jvector append to tag hidden in body, For the grid title header. */
  				var map = $("#mapPerfomanceArea").vectorMap("get", "mapObject");
  				$("#provinceNameHi").remove();
  				$("body").append("<input type=\"hidden\" id=\"provinceNameHi\" value=\""+map.getRegionName(code)+"\">");
  				
  				var provinceid = code.substring(3);
  				
  				console.log(provinceid);
  				alert(provinceid);
  				
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
	    
	    $("#btnCreateGoogleMap").click(function(){
	    	
	    	initMap();
	    	//alert("hello jquery");	
	    });
	    
	    
});