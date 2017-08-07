<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<%@ taglib uri="http://alloy.liferay.com/tld/aui" prefix="aui"%>
<%@ page import="javax.portlet.*"%>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://liferay.com/tld/theme" prefix="liferay-theme" %>
<%@ page import="com.liferay.portal.kernel.util.WebKeys" %>
<liferay-theme:defineObjects />
<portlet:defineObjects />
<%

String username = themeDisplay.getUser().getScreenName();
String password = (String)request.getSession().getAttribute(WebKeys.USER_PASSWORD);

%>
<input type="hidden" id="user_portlet" name="user_portlet" value="<%=username%>">
<input type="hidden" id="pass_portlet" name="pass_portlet" value="<%=password%>">
<input type="hidden" id="url_portlet" name="url_portlet" value="<%= renderRequest.getContextPath() %>">





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

<div class="app_url_hidden" style="display: block;">
<div class="row-fluid"><!-- start--row-fluid -->

   <div class="span12">
           <div class="ibox float-e-margins">
                <div class="ibox-title" style="background-color: rgb(83, 120, 253); border-color: rgb(83, 120, 253); min-height:0px;">      
                    <div class="titlePanelSearch">Advance Search</div> 
    			</div>
    					
    			<div class="ibox-content breadcrumbs2" style="border-color: rgb(83, 120, 253);"> 
    						
    				<div class="row-fluid ">
							
							<div style="margin-left: 5px; margin-bottom: 3px;" class="form-group pull-left span3" id="phaseArea">
								<select name="Phase" id="Phase" class="input form-control input-sm" title="" data-toggle="tooltip" style="cursor: pointer;" data-original-title="Phase">
						
									<option value="1">Phase1</option>
									<option value="2">Phase2</option>
						
								</select>
							</div>
							<div style="margin-left: 5px; margin-bottom: 3px;" class="form-group pull-left span3" id="apprasiaItemArea">
								<select name="apprasiaItem" id="apprasiaItem" class="input form-control input-sm" title=""  data-toggle="tooltip" style="cursor: pointer;" data-original-title="Apprasia Item">
						
									<option value="">appraisal Item1</option>
									<option value="">appraisal Item2</option>
						
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
  	margin:3px;
  	padding:3px;
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
}
.boxTargetData{
	padding-top:15px;
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
</style>

<div class="row-fluid"><!-- start--row-fluid -->

   <div class="span12">
           <div class="ibox float-e-margins">
                <div class="ibox-title" style="background-color: rgb(83, 120, 253); border-color: rgb(83, 120, 253); min-height:0px;">      
                    <div class="titlePanelSearch">Action Plan</div> 
    			</div>
    					
    			<div class="ibox-content breadcrumbs2" style="border-color: rgb(83, 120, 253);"> 
    						
    				<div class="row-fluid ">
							
							<div class='boxActionPlainArea alert alert-success'>
								<div class='boxActionL'>
									
									<div class='actionPlanList'>
									Phase โครงการพัฒนาระบบการประเมิน
									</div>
									<div class='actionPlanList'>
									Organization หน่วยงานกลยุทธ์องค์กร
									</div>
									<div class='actionPlanList'>
									Appraisal Item ยอดขายเทียบเป้า
									</div>
									 
									 <!-- 
									<table class='table'>
										<tr>
											<td>Phase โครงการพัฒนาระบบการประเมิน</td>
										</tr>
										<tr>
											<td>Organization หน่วยงานกลยุทธ์องค์กร</td>
										</tr>
										<tr>
											<td>Appraisal Item ยอดขายเทียบเป้า</td>
										</tr>
									</table>
									 -->
								</div>
								<div class='boxActionR'>
									
									<div class='boxActualPercentageArea'>
									
										<div class='boxActualvsForecast boxForecastVsActual'>
											<div class='fontBold '>
												%Actual vs Forecast 
											</div>
											<div >
												60% <span id='sparkline1'></span>
											</div>
										</div>
										<div class='boxActualvsTarget boxForecastVsActual'>
											<div class='fontBold'>
											% Actual vs Target 
											</div>
											<div>
											60% <span id='sparkline2'></span>
											</div>
											
										</div>
										
									</div>
									<div class='boxForecastArea'>
										<div class='boxForecastResult boxForecastVsActual'>
											<div class='fontBold fontCenter'>
											Forecast Result
											</div>
											<div class='fontCenter'>
											 60,000
											 </div>
										</div>
										<div class='boxActual boxForecastVsActual'>
											<div class='fontBold fontCenter'>
											Actual
											</div>
											<div class='fontCenter'>
											 20,000
											 </div>
										</div>
									</div>
									<div class='boxTargetArea' style='font-size:20px;'>
										<div class='boxTargetData'>
										<div class='fontBold fontCenter'>Target</div>
										<div class='fontCenter fontBold' style='font-size:24px;margin-top:5px; color:green;'>80,000</div>
										</div>
									</div>
									
									
								</div>
								<br style='clear:both'>
							</div>
							
					
					</div>
		
	    		

					<div class='row-fluid' style='margin-top:5px;margin-bottom:5px;'>
						<div class=' alert alert-block'>
							<div class='span6'>
								<button type="button" class="btn btn-success input-sm" name="btn-" id="btn-">
								
									Add
								</button>
								<button type="button" class="btn btn-warning  input-sm" name="btn-" id="btn-">
									Edit
								</button>
								<button type="button" class="btn btn-danger input-sm" name="btn-" id="btn-">
									Delete
								</button>
							</div>
							<div class='span6'>
								<div style='text-align:right;'>
									<button type="button" class="btn btn-primary input-sm" name="btn-" id="btn-">
										Save
									</button>
									<button type="button" class="btn btn-danger input-sm" name="btn-" id="btn-">
										Cancel
									</button>
									
								</div>
							</div>
							<br style='clear:both'>
						</div>
					</div>
					<div>
					<!-- Select,Task,Plan Start,Plan Start,Plan End,Actual Start,Actual End,Responsible,%Completed,PV,AC,EV -->
						<table class='table'>
							<thead>
								<tr>
									<th><center>Select</center></th>
									<th>Task</th>
									<th>Plan Start</th>
									<th>Plan End</th>
									<th>Actual Start</th>
									<th>Actual End</th>
									<th>Responsible</th>
									<th><center>%Completed</center></th>
									<th><center>PV</center></th>
									<th><center>AC</center></th>
									<th><center>EV</center></th>
									
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
									<center>
									<input type='checkbox' name='' id='' class='' value=''>
									</center>
									</td>
									<td>Plan</td>
									<td>
									<!--  
										<input type='text' name='' id='' class='datepicker input-small' style="height:20px; margin-right:3px;" value='08/07/2017'>
										-->
										<input type='text' name='' id='' class='datepicker input-small' style="height:20px;margin-right:3px;" value='08/07/2017'>
									</td>
									<td>
											<!--  
										<input type='text' name='' id='' class='datepicker input-small' style="height:20px; margin-right:3px;" value='08/07/2017'>
										-->
										<input type='text' name='' id='' class='datepicker input-small' style="height:20px;margin-right:3px;" value='08/07/2017'>
									</td>
									<td>
											<!--  
										<input type='text' name='' id='' class='datepicker input-small' style="height:20px; margin-right:3px;" value='08/07/2017'>
										-->
										<input type='text' name='' id='' class='datepicker input-small' style="height:20px;margin-right:3px;" value='08/07/2017'>
									</td>
									<td>
											<!--  
										<input type='text' name='' id='' class='datepicker input-small' style="height:20px; margin-right:3px;" value='08/07/2017'>
										-->
										<input type='text' name='' id='' class='datepicker input-small' style="height:20px; margin-right:3px;" value='08/07/2017'>
									</td>
									<td>
									ศักดิ์สิทธิ์ ยศกระจารุกุล
									</td>
									
									<td>
									<center>20</center>
									</td>
									
									<td>
									<center>-</center>
									</td>
									<td>
									<center>20</center>
									</td>
									<td>
									<center>50</center>
									</td>
								</tr>
								<tr>
									<td>
									<center>
									<input type='checkbox' name='' id='' class='' value=''>
									</center>
									</td>
									<td>Do</td>
									<td>
										<input type='text' name='' id='' class='datepicker input-small' style="height:20px; margin-right:3px;" value='08/07/2017'>
									
									</td>
									<td>
										<input type='text' name='' id='' class='datepicker input-small' style="height:20px; margin-right:3px;" value='08/07/2017'>
									
									</td>
									<td>
										<input type='text' name='' id='' class='datepicker input-small' style="height:20px; margin-right:3px;" value='08/07/2017'>
									
									</td>
									<td>
										<input type='text' name='' id='' class='datepicker input-small' style="height:20px; margin-right:3px;" value='08/07/2017'>
									
									</td>
									<td>
									ศักดิ์สิทธิ์ ยศกระจารุกุล
									</td>
									
									<td>
									<center>20</center>
									</td>
									
									<td>
									<center>-</center>
									</td>
									<td>
									<center>20</center>
									</td>
									<td>
									<center>50</center>
									</td>
								</tr>
								<tr>
									<td>
									<center>
									<input type='checkbox' name='' id='' class='' value=''>
									</center>
									</td>
									<td>Check</td>
									<td>
										<input type='text' name='' id='' class='datepicker input-small' style="height:20px; margin-right:3px;" value='08/07/2017'>
									</td>
									<td>
										<input type='text' name='' id='' class='datepicker input-small' style="height:20px; margin-right:3px;" value='08/07/2017'>
									</td>
									<td>
										<input type='text' name='' id='' class='datepicker input-small' style="height:20px; margin-right:3px;" value='08/07/2017'>
									</td>
									<td>
										<input type='text' name='' id='' class='datepicker input-small' style="height:20px; margin-right:3px;" value='08/07/2017'>
									</td>
									<td>
									ศักดิ์สิทธิ์ ยศกระจารุกุล
									</td>
									
									<td>
									<center>20</center>
									</td>
									
									<td>
									<center>-</center>
									</td>
									<td>
									<center>20</center>
									</td>
									<td>
									<center>50</center>
									</td>
								</tr>
								<tr>
									<td>
									<center>
									<input type='checkbox' name='' id='' class='' value=''>
									</center>
									</td>
									<td>Action</td>
									<td>
										<input type='text' name='' id='' class='datepicker input-small' style="height:20px; margin-right:3px;" value='08/07/2017'>
									</td>
									<td>
										<input type='text' name='' id='' class='datepicker input-small' style="height:20px; margin-right:3px;" value='08/07/2017'>
									</td>
									<td>
										<input type='text' name='' id='' class='datepicker input-small' style="height:20px; margin-right:3px;" value='08/07/2017'>
									</td>
									<td>
										<input type='text' name='' id='' class='datepicker input-small' style="height:20px; margin-right:3px;" value='08/07/2017'>
									</td>
									<td>
									ศักดิ์สิทธิ์ ยศกระจารุกุล
									</td>
									
									<td>
									<center>20</center>
									</td>
									
									<td>
									<center>-</center>
									</td>
									<td>
									<center>20</center>
									</td>
									<td>
									<center>50</center>
									</td>
								</tr>
								<tr>
									<td>
									<center>
									<input type='checkbox' name='' id='' class='' value=''>
									</center>
									</td>
									<td>Summary</td>
									<td>
										<input type='text' name='' id='' class='datepicker input-small' style="height:20px; margin-right:3px;" value='08/07/2017'>
									</td>
									<td>
										<input type='text' name='' id='' class='datepicker input-small' style="height:20px; margin-right:3px;" value='08/07/2017'>
									</td>
									<td>
										<input type='text' name='' id='' class='datepicker input-small' style="height:20px; margin-right:3px;" value='08/07/2017'>
									</td>
									<td>
										<input type='text' name='' id='' class='datepicker input-small' style="height:20px; margin-right:3px;" value='08/07/2017'>
									</td>
									<td>
									ศักดิ์สิทธิ์ ยศกระจารุกุล
									</td>
									
									<td>
									<center>20</center>
									</td>
									
									<td>
									<center>-</center>
									</td>
									<td>
									<center>20</center>
									</td>
									<td>
									<center>50</center>
									</td>
								</tr>
							</tbody>
							
						</table>
					</div>


</div><!-- content end -->
	    </div>
	    		
	</div>

</div><!-- end--row-fluid -->




 </div>