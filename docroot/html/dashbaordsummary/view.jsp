<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<%@ taglib uri="http://alloy.liferay.com/tld/aui" prefix="aui"%>
<%@ page import="javax.portlet.*"%>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://liferay.com/tld/theme" prefix="liferay-theme" %>
<%@ page import="com.liferay.portal.kernel.util.WebKeys" %>
<liferay-theme:defineObjects />
<portlet:defineObjects />


<style>

.ui-multiselect-menu{
	z-index: 5555;
}
.ui-multiselect{
	padding: 5px;
}
.ui-corner-all, .ui-corner-top, .ui-corner-right, .ui-corner-tr{
	border-top-right-radius: 0;
}

.ui-corner-all, .ui-corner-top, .ui-corner-left, .ui-corner-tl{
	border-top-left-radius: 0;
}

.ui-corner-all, .ui-corner-bottom, .ui-corner-left, .ui-corner-bl{
	border-bottom-left-radius: 0;
}

.ui-corner-all, .ui-corner-bottom, .ui-corner-right, .ui-corner-br{
	border-bottom-right-radius: 0;
}
.ui-multiselect-header span.ui-icon{
	top: 5px;
}
.aui ul, .aui ol{
	margin: 0px 0px 0px 0px;
}
.ui-icon{
	 margin-top: 0;
}
.aui input[type="radio"], .aui input[type="checkbox"]{
	margin: -5px 0 0;
}
.aui label{
	margin-bottom: 0px;
}
.ui-multiselect-checkboxes li{
	padding-right: 0px;
}
.aui form{
	margin: 0 0 5px;
}
.aui .filter{
	margin-bottom: 5px;
    margin-top: 5px;
}
.aui .form-group > .control-label-search{
	padding-top: 5px;
}

 /* Large desktop Start#####################################*/
 @media (min-width: 1200px) { 

	.modal.large {
		    width: 90%;
		    margin-left:-45%;  
		    top:0px;
		}
		
	.modal.medium {
		    width: 50%;
		    margin-left:-25%;  
		    top:0px;
		}
	
		/*Qauntity Start*/
		.form-label-quantity{
		text-align: right;
		}
		.form-input-customs-title{
			width: 250px;
		}
		.aui .redFont{
 		
	 		  float: right;
	 	}
	 	.form-label-customs{
	 		text-align: right;
	 	}
		/*Quantity End*/
	
  }
  /* Large desktop End######################################*/
  
  /*  desktop Start#########################################*/
 @media (min-width: 980px) and (max-width: 1199px) {
 
 	.modal.large {
		    width: 90%;
		    margin-left:-45%;  
		    top:0px;
		}
		
		.modal.medium {
		    width: 50%;
		    margin-left:-25%;  
		    top:0px;
		}
		/*All Start*/
		.aui #btnSearchAdvance{
		margin-bottom:5px;
		width:100%;
		}
		.aui #btnCoppy{
			width:100%;
		}
		/*All End*/
		
		/*Qauntity Start*/
		.form-label-quantity{
		text-align: left;
		}
		.form-input-customs-title{
			width: 250px;
		}
		.aui .redFont{
 		
	 		  float: right;
	 	}
	 	.form-label-customs{
	 		text-align: right;
	 	}
		/*Quantity End*/
 	
  }
 /*  desktop End############################################*/
 
 /* Portrait tablet to landscape and desktop Start##########*/
 @media (min-width: 768px) and (max-width: 979px) {
 
	.modal.large {
		    width: 90%;
		    margin-left:-45%;  
		    top:0px;
		}
	.modal.medium {
		    width: 50%;
		    margin-left:-25%;  
		    top:0px;
		}
		
	.aui .ibox-title2{
		height:45px;
	}
	
	.aui .ibox-title{
		min-height: 0px;
	}
	
	
	.aui .btnAdd{
		position: relative;
   		top: 0px;
	}
	/*All Form Start*/
	.aui .modal-body{
		max-height: 400px;
	}
	.aui #btnSearchAdvance{
		margin-bottom:5px;
		width:100%;
	}
	.aui #btnCoppy{
		width:100%;
	}
	
	/*All Form End*/
	/*Deduct Score Start*/
 	.aui .form-file-mangement{
 		height: 45px;
 	}
 	.aui .form-label-customs{
 		text-align: right;
 	}
 	
 	.aui .redFont{
 		
 		  float: right;
 	}
 	/*Deduct Score Start*/
 	
 	/*Qauntity Start*/
 	.form-label-quantity{
		text-align: left;
		}
	.form-input-customs-title{
		width: 250px;
	}
	.aui .redFont{
 		
 		  float: left;
 	}
 	.aui .pagianation_area{
		/*position:relative;*/
	}
	.aui #textarea_cds{
		height: 150px;
	}
	/*Qauntity End*/
  }
 /* Portrait tablet to landscape and desktop End############*/ 
 
 /* Landscape phone to portrait tablet Start################*/
 @media (max-width: 767px) { 
 
 
 .modal.large {
 	
	    width: '';
	    top:0px;    
	}
	
	.modal.medium {
		   width: '';
	   	   top:0px;  
		}
	
 	.pagingText{
 		display:none;
 	}
 	#btnPaginationTop{
 		width:300px;
 		float:left;
 	}
	#dropdownPaginationTop{
		width:100px;
 		float:right;
	}
	#btnPaginationBottom{
 		width:300px;
 		float:left;
 	}
	#dropdownPaginationBottom{
		width:100px;
 		float:right;
	}
	.aui .form-group > .control-label-search {
    	text-align: left;
	}
	
	.aui .ibox-title2{
		height:63px;
	}
	
	.aui .btnAdd{
		position: relative;
   		top: -22px;
	}
	/*All Form Start*/
	.aui .modal-body{
		max-height: 350px;
	}
	/*All Form End*/
	/*Deduct Score Start*/
 	.aui .form-file-mangement{
 		height: 50px;
 	}
 	.aui .form-label-customs{
 		 text-align: left;
 	}
 	.aui .redFont{
 		 
 		  float: left;
 	}
 	#modalDeductScoreDescription{
 		font-size:25px;
 	}
 	
 	/*Deduct Score Start*/
 	/*Quality Start*/
 	#modalQualityDescription{
 		font-size:25px;
 	}
 	/*Quality End*/
 	
 	/*Quantity Start*/
 	#modalTitleQuantity{
 		font-size:25px;
 	}

 	.form-label-quantity{
		text-align: left;
	}
	
	.form-input-customs-title{
		width: 250px;
	}
	#cdsNameLabel{
		display:none;
	}
	.aui .pagianation_area{
		/*position:absolute;*/
	}
	.aui #textarea_cds{
		height: 77px;
	}
 	/*Quantity End*/
	
  }
 /* Landscape phone to portrait tablet End##################*/ 
 
 /* Landscape phones and down Start#########################*/
 @media (max-width: 480px) { 
 	
 	
 
 	#btnPaginationTop{
 		width:300px;
 		float:left;
 	}
	#dropdownPaginationTop{
		width:100px;
 		float:right;
	}
	#btnPaginationBottom{
 		width:300px;
 		float:left;
 	}
	#dropdownPaginationBottom{
		width:100px;
 		float:right;
	}
	.aui .form-group > .control-label-search{
    	text-align: left;
	}
	
	.aui .ibox-title2{
		height:63px;
	}
	
	.aui .btnAdd{
		position: relative;
   		top: -22px;
	}
	/*All Form Start*/
	/*
	.aui .modal-body{
		max-height: 300px;
	}
	*/
	/*All Form End*/
 	
 	/*Deduct Score Start*/
 	.aui .form-file-mangement{
 		height: 50px;
 	}
 	.aui .form-label-customs{
 		 text-align: left;
 		 
 	}
 	.aui .redFont{
 		
 		 float: left;
 	}
 	#modalDeductScoreDescription{
 		font-size:20px;
 	}
 	/*Deduct Score Start*/
 	/*Quality Start*/
 	#modalQualityDescription{
 		font-size:20px;
 	}

 	/*Quality End*/
 	
 	/*Quantity Start*/
 	#modalTitleQuantity{
 		font-size:20px;
 	}
 	.form-label-quantity{
		text-align: left;
	}
	.form-input-customs{
		width: 100%;
	}
	#cdsNameLabel{
		display:none;
	}
	.paging-text2{
		display:none;
	}
	.form-input-customs-title{
		width: 100%;
	}
	.aui .pagianation_area{
		/*position:static;*/
	}
	.aui .pagingDropdown{
		float: left;
	}
	.aui #textarea_cds{
		height: 77px;
	}
 	/*Quantity End*/
 	
 	.aui .ibox-title2 .btn{
 		font-size:12px;
 	}

  }
  /* Landscape phones and down End##########################*/
  
  
  
  /* main start*/
        table {
            width: 100%;
        }
        .aui #breadcrumbs {
		    margin-bottom: 5px;
		}
       .aui .portlet-content, .aui .portlet-minimized .portlet-content-container {
	    -moz-border-bottom-colors: none;
	    -moz-border-left-colors: none;
	    -moz-border-right-colors: none;
	    -moz-border-top-colors: none;
	    border-color: #eaeaea;
	    border-image: none;
	    border-style: solid;
	    border-width: 0 1px 1px;
	    padding: 10px 10px 10px;
	}
	/*
	.aui #modal-quantity{
    background-clip: padding-box;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
    left: 34%;
    margin-left: -280px;
    outline: 0 none;
    position: fixed;
    top: 0%;
    width: 1000px;
    z-index: 1050;
    */
}
.aui .modal-footer {
    background-color: #f5f5f5;
    border-radius: 0;
    border-top: 1px solid #ddd;
    box-shadow: 0 1px 0 white inset;
    margin-bottom: 0;
    padding: 14px 15px 15px;
    text-align: right;
}
.aui select {
    background-color: white;
    border: 1px solid #ccc;
    width: 100%;
}
.aui input{
	width: 100%;
}

.ibox-content {
    background-color: #fff;
    border: 1px solid #ffe57f;
    color: inherit;
    margin-bottom: 5px;
    padding: 5px;
}
.aui .table th, .aui .table td {
    border-top: 1px solid #ddd;
    line-height: 20px;
    padding-bottom: 3px;
    padding-right: 0;
    padding-top: 3px;
    text-align: left;
    vertical-align: top;
}
.aui .pagination {
    margin: 0;
}
.display-none{
	display:none;
}
.pagingText {
    float: right;
    margin-right: 5px;
    padding-top: 5px;
}
.gray-bg {
    background-color: #f3f3f4;
}

.ibox-content {
    background-color: #fff;
    border: 1px solid #ffe57f;
    color: inherit;
    margin-bottom: 5px;
    padding-left: 15px;
    padding-right: 15px;
}
/*
.aui .portlet-content, .aui .portlet-minimized .portlet-content-container {
    -moz-border-bottom-colors: none;
    -moz-border-left-colors: none;
    -moz-border-right-colors: none;
    -moz-border-top-colors: none;
    background: #f3f3f4 none repeat scroll 0 0;
    border-color: #eaeaea;
    border-image: none;
    border-style: solid;
    border-width: 0 1px 1px;
    padding: 1px 10px 10px;
}
*/
.form-file-mangement {
    height: 37px;
}
.form-label-customs{
	font-weight: bold;
}
.aui hr{
	margin: 10px 0;
}
/* main end*/

/*local start*/
/*
.aui #modal-quality{
    background-clip: padding-box;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
    left: 50%;
    margin-left: -280px;
    outline: 0 none;
    position: fixed;
    top: 10%;
    width: 500px;
    z-index: 1050;
}
*/
.form-label-customs {
    float: left;
    padding-top: 1px;
    width: 170px;
    /*text-align:right;*/
}

.form-label-quantity {
    float: left;
    padding-top: 1px;
    width: 170px;
    font-weight:bold;
    /*text-align:right;*/
}

.form-group > .control-label-search{
	/*font-weight:bold;*/
	text-align:right;
}

.breadcrumbs2{

	background: rgba(0, 0, 0, 0) linear-gradient(to bottom, #fff 0px, #f6f6f6 47%, #ededed 100%) repeat scroll 0 0;
    border-radius: 0;
    margin-bottom: 0;
  	padding-bottom: 5px

}
.wrapper-content{
	padding: 10px;
}
.aui .table thead th{
	font-weight:bold;
}
.aui .form-group > .control-label-search{
   	/*font-weight:bold;*/
}
.aui .pagination{
 /*display:absolute;*/
}
.aui .popover-content{
padding:5px;
}

/*
.aui .modal-body{
overflow-y: visible;
}
*/
/*
.modal{
    max-height: calc(100vh - 0px);
    overflow-y: auto;
}*/

.aui .table th, .aui .table td{
	font-size: 13px;
}
.aui .countPagination2{
	height:30px;
}

/*local end*/
/* Update by au */
.aui .btn {
	font-size: 14px;
 	padding: 4px 12px; 
	width: auto;
	margin-top: 0px;
	display: inline;
}
.aui select, .aui textarea, .aui input[type="text"], .aui input[type="password"], .aui input[type="datetime"], .aui input[type="datetime-local"], .aui input[type="date"], .aui input[type="month"], .aui input[type="time"], .aui input[type="week"], .aui input[type="number"], .aui input[type="email"], .aui input[type="url"], .aui input[type="search"], .aui input[type="tel"], .aui input[type="color"], .aui .uneditable-input {
    height: 30px;
    padding: none;
    font-size: 14px;
}
</style>
<style>
.boxActionPlainArea{
	
}
.boxActionPlainArea .boxActionL{
	float:left;
	width:50%;
	/*border:1px solid #cccccc;*/
	
}

.boxActionPlainArea .boxActionR{
	float:right;
	width:565px;
	/*border:1px solid #cccccc;*/
}

.boxTargetArea{
	width:25%;
	float:right;
	border-width: 1px 1px 1px 1px;
	border-color: #cccccc;
  	border-style: solid;
  	margin:1px;
  	padding:5px;
  	height: 89px;
  	background:#fff;
	
}
.boxForecastArea{
	width:32%;
	float:right;
	
	/*
	border-width: 1px 1px 1px 1px;
	border-color: #cccccc;
  	border-style: solid;
  	margin:1px;
  	padding:5px;
  	*/
  	
}
.boxActualPercentageArea{
	width:40%;
	float:right;
	
	/*
	border-width: 1px 1px 1px 1px;
	border-color: #cccccc;
  	border-style: solid;
  	margin:1px;
  	padding:5px;*/
  	
}
.fontBold{
	font-weight:bold;
}
.boxForecastVsActual{
	border-width: 1px 1px 1px 1px;
	border-color: #cccccc;
  	border-style: solid;
  	padding:3.5px;
  	background:#fff;
  	margin: 1px 3px 3px;
}
.fontCenter{
	text-align:center;
}
.actionPlanList{

	padding:5px;
	border-width: 1px 1px 1px 1px;
	border-color: #cccccc;
  	border-style: solid;
  	margin-bottom:3px;
  	font-size: 16px;
  	font-weight: bold;
  	background:#fff;
}
.boxTargetData{
	padding-top:20px;
}
.aui .alert, .aui .portlet-msg-alert, .aui .portlet-msg-error, .aui .portlet-msg-help, .aui .portlet-msg-info, .aui .portlet-msg-progress, .aui .portlet-msg-success{
	padding: 8px 8px 8px 14px;
	color:#555;
	margin-bottom: 0;
}


.aui select, .aui textarea, .aui input[type="text"], .aui input[type="password"], .aui input[type="datetime"], .aui input[type="datetime-local"], .aui input[type="date"], .aui input[type="month"], .aui input[type="time"], .aui input[type="week"], .aui input[type="number"], .aui input[type="email"], .aui input[type="url"], .aui input[type="search"], .aui input[type="tel"], .aui input[type="color"], .aui .uneditable-input{
	height:'';
}

.aui input[type="color"], .aui input[type="date"], .aui input[type="datetime"], .aui input[type="datetime-local"], .aui input[type="email"], .aui input[type="month"], .aui input[type="number"], .aui input[type="password"], .aui input[type="search"], .aui input[type="tel"], .aui input[type="text"], .aui input[type="time"], .aui input[type="url"], .aui input[type="week"], .aui select, .aui textarea, .aui .uneditable-input{
	margin-bottom: 0px;
}

.ui-accordion .ui-accordion-header{
	margin: 0px;
    padding: 0px;
}
</style>


<%
String username = themeDisplay.getUser().getScreenName();
String password = (String)request.getSession().getAttribute(WebKeys.USER_PASSWORD);
%>
<input type="hidden" id="user_portlet" name="user_portlet" value="<%=username%>">
<input type="hidden" id="pass_portlet" name="pass_portlet" value="<%=password%>">
<input type="hidden" id="url_portlet" name="url_portlet" value="<%= renderRequest.getContextPath() %>">

<div class="app_url_hidden" style="display: block;">
<div class="row-fluid"><!-- start--row-fluid -->

   <div class="span12">
           <div class="ibox float-e-margins">
                <div class="ibox-title" style="background-color: rgb(83, 120, 253); border-color: rgb(83, 120, 253); min-height:0px;">      
                    <div class="titlePanelSearch">Advance Search</div> 
    			</div>
    					
    			<div class="ibox-content breadcrumbs2" style="border-color: rgb(83, 120, 253);"> 
    						
    				<div class="row-fluid ">
							
							<div style="margin-left: 5px; margin-bottom: 3px;" class="form-group pull-left span2" id="yearArea">
								<select name="year" id="year" class="input form-control input-sm" title="" data-toggle="tooltip" style="cursor: pointer;" data-original-title="Year">
						
									<option value="1">2016</option>
									<option value="2">2017</option>
						
								</select>
							</div>
							<div style="margin-left: 5px; margin-bottom: 3px;" class="form-group pull-left span2" id="periodArea">
								<select name="period" id="period" class="input form-control input-sm" title=""  data-toggle="tooltip" style="cursor: pointer;" data-original-title="Period">
						
									<option value="">Period1</option>
									<option value="">Period1</option>
						
								</select>
							</div>
							
							<div style="margin-left: 5px; margin-bottom: 3px;" class="form-group pull-left span2" id="apprasiaLevelArea">
								<select name="apprasiaLevel" id="apprasiaLevel" class="input form-control input-sm" title=""  data-toggle="tooltip" style="cursor: pointer;" data-original-title="Apprasia Level">
						
									<option value="">Appraisal Level1</option>
									<option value="">Appraisal Level2</option>
						
								</select>
							</div>
							<div style="margin-left: 5px; margin-bottom: 3px;" class="form-group pull-left span2" id="organizationArea">
								<select name="organization" id="organization" class="input form-control input-sm" title=""  data-toggle="tooltip" style="cursor: pointer;" data-original-title="Organization">
						
									<option value="">Organization 1</option>
									<option value="">Organization 2</option>
						
								</select>
							</div>
							<div style="margin-left: 5px; margin-bottom: 3px;" class="form-group pull-left span4" id="kpiArea">
								<select name="kpi" id="kpi" class="input form-control input-sm" title=""  data-toggle="tooltip" style="cursor: pointer;" data-original-title="KPI">
						
									<option value="">KPI1</option>
									<option value="">KPI2</option>
						
								</select>
							</div>
							
						
						<div style="margin-bottom: 5px;" class="form-group pull-right m-b-none ">
							<button id="btnSearchAdvance" name="btnSearchAdvance" class="btn btn-info input-sm" type="button">
								<i class="fa fa-search"></i>&nbsp;Search
							</button>
							
						</div>
					
					</div>
		
	    		</div><!-- content end -->
	    </div>
	    		
	</div>

</div><!-- end--row-fluid -->


<style>
.graphLTop{
	float:left;
	padding:5px;
	border:1px solid #cccccc;
	margin:2px;
	width:28.8%;
	font-weight:bold;
	background:#ddd;
	
}
.graphLTop .textGRaphTop{
	text-align:center;
}
.graphLTopHeader{
	font-weight:bold;
	font-size:18px;
	color:orange;
}
</style>






<!-- content accordion start -->
<div id="accordion">
  <h3>Section 1</h3>
  <div class='' style='height:auto;'>
    	<div class='span4'>
    		<div class='graphLTopHeader'>จำนวนเงิน Gross NPL</div>
    		<div>
    			<div class='graphLTop'>
    				<div class='textGRaphTop'>Target</div>
    				<div class='textGRaphTop'>9,999,999</div>
    			</div>
    			<div class='graphLTop'>
    				
    				<div class='textGRaphTop'>Forecast</div>
    				<div class='textGRaphTop'>8,888,888</div>
    			</div>
    			<div class='graphLTop'>
    				
    				<div class='textGRaphTop'>Actual</div>
    				<div class='textGRaphTop'>7,777,777</div>
    			</div>
    			<br style='clear:both'>
    		</div>
    		<div>
    		 	<div id="chart-container">FusionCharts will render here</div>
    		</div>
    		
    	</div>
    	
    	<div class='span8'>
    			<div id="chart-container2">FusionCharts will render here</div>
    	</div>
  </div>
  <h3>Section 2</h3>
  <div>
    <p>
    Sed non urna. Donec et ante. Phasellus eu ligula. Vestibulum sit amet
    purus. Vivamus hendrerit, dolor at aliquet laoreet, mauris turpis porttitor
    velit, faucibus interdum tellus libero ac justo. Vivamus non quam. In
    suscipit faucibus urna.
    </p>
  </div>
  <h3>Section 3</h3>
  <div>
    <p>
    Nam enim risus, molestie et, porta ac, aliquam ac, risus. Quisque lobortis.
    Phasellus pellentesque purus in massa. Aenean in pede. Phasellus ac libero
    ac tellus pellentesque semper. Sed ac felis. Sed commodo, magna quis
    lacinia ornare, quam ante aliquam nisi, eu iaculis leo purus venenatis dui.
    </p>
    <ul>
      <li>List item one</li>
      <li>List item two</li>
      <li>List item three</li>
    </ul>
  </div>
  <h3>Section 4</h3>
  <div>
    <p>
    Cras dictum. Pellentesque habitant morbi tristique senectus et netus
    et malesuada fames ac turpis egestas. Vestibulum ante ipsum primis in
    faucibus orci luctus et ultrices posuere cubilia Curae; Aenean lacinia
    mauris vel est.
    </p>
    <p>
    Suspendisse eu nisl. Nullam ut libero. Integer dignissim consequat lectus.
    Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
    inceptos himenaeos.
    </p>
  </div>
</div>
<!-- content accordion end -->



 </div>
 
