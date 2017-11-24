<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<%@ taglib uri="http://alloy.liferay.com/tld/aui" prefix="aui"%>
<%@ page import="javax.portlet.*"%>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://liferay.com/tld/theme" prefix="liferay-theme" %>
<%@ page import="com.liferay.portal.kernel.util.WebKeys" %>
<%@ page import="com.liferay.portal.util.PortalUtil" %>
<liferay-theme:defineObjects />
<portlet:defineObjects />
<%
/*
PortletSession portletSession1 = renderRequest.getPortletSession();
portletSession1.setAttribute("password", "authenticated", PortletSession.APPLICATION_SCOPE);
String pwd = (String) portletSession1.getAttribute("password", PortletSession.APPLICATION_SCOPE);
out.print(pwd);
String password=PortalUtil.getUser(request).getPassword();
*/

String username = themeDisplay.getUser().getScreenName();
String password = (String)request.getSession().getAttribute(WebKeys.USER_PASSWORD);
//out.print(username);

String param_link = PortalUtil.getOriginalServletRequest(request).getParameter("param_link");
String param_item_result_id = PortalUtil.getOriginalServletRequest(request).getParameter("param_item_result_id");
layout = themeDisplay.getLayout();
plid = layout.getPlid();
//out.print(param);
//out.print("password2="+password);
%>
<input type="hidden" id="param_link" name="param_link" value="<%=param_link%>">
<input type="hidden" id="param_item_result_id" name="param_item_result_id" value="<%=param_item_result_id%>">

<input type="hidden" id="user_portlet" name="user_portlet" value="<%=username%>">
<input type="hidden" id="pass_portlet" name="pass_portlet" value="<%=password%>">
<input type="hidden" id="url_portlet" name="url_portlet" value="<%= renderRequest.getContextPath() %>">
<input type="hidden" id="plid_portlet" name="plid_portlet" value="<%= plid %>">

<style>

 /* Large desktop Start#####################################*/
 @media (min-width: 1200px) { 
 
	.modal.large {
		    width: 90%;
		    margin-left:-45%;  
		    top:0px;
		}
		
	.aui .modal-body{
		/*max-height: 400px;*/	
	}
	
	#smartArea{
	display:show;
	}
	
	.breadcrumbs2 .row-fluid .span4{
			width: 32.624%;
		}
	
	#actionPlanModal{
		margin-top:0px;

	}
	.moblieArea{
		display:none;
	}
	.desktopArea{
		display:block;
	}
	
	.saveAndCancelArea{
		text-align:right;
	}	
	
	#actualvsTargetBar{
		display:'';
	}
	#actualvsForecastBar{
		display:'';
	}
	
	.aui .row-fluid#advanceSearchAppraisal .span3{
		width: 24.5%;
	}


	 
  }
  /* Large desktop End######################################*/
  
  /*  desktop Start#########################################*/
 @media (min-width: 980px) and (max-width: 1199px) {
 
 	.modal.large {
		    width: 90%;
		    margin-left:-45%;  
		    top:0px;
		}
		
	.aui .modal-body{
		/*max-height: 400px;*/	
	}
	#smartArea{
	display:none;
	}
	
	.breadcrumbs2 .row-fluid .span4{
			width: 32.624%;
		}
		
	#actionPlanModal{
		margin-top:0px;
	}
		
	#actionPlanModal{
		margin-top:0px;
	}
	
	
	.moblieArea{
		display:none;
	}
	.desktopArea{
		display:block;
	}
	
	.saveAndCancelArea{
		text-align:right;
	}
	
	#actualvsTargetBar{
		display:'';
	}
	#actualvsForecastBar{
		display:'';
	}	
	
	.aui #advanceSearchAppraisal.row-fluid .span3 {
    	width: 32.5%;
	}
		
 	
  }
 /*  desktop End############################################*/
 
 /* Portrait tablet to landscape and desktop Start##########*/
 @media (min-width: 768px) and (max-width: 979px) {
 
	.aui .modal{
		left:1%;
	}
	.modal.large {
		    width: 90%;
		    margin-left:-45%;  
		    top:0px;
		}
	.pagingText{
		display:block;
	}
	.aui .p-t-xxs {
    	text-align: right;
	}
	.pagianation_area{
		position:'';
	}
	
	.aui .modal-body{
		/*max-height: 400px;*/	
	}
	#smartArea{
	display:none;
	}
	
	#actionPlanModal{
		margin-top:0px;
	}

	
	
	.moblieArea{
		display:block;
		font-size:0.8em;
	}
	.desktopArea{
		display:none;
	}
	
	.saveAndCancelArea{
		text-align:right;
	}
	
	
	
	#actualvsTargetBar{
		display:none;
	}
	#actualvsForecastBar{
		display:none;
	}
	
	.aui #advanceSearchAppraisal.row-fluid .span3 {
	    width: 24.2%;
	}
 

  }
 /* Portrait tablet to landscape and desktop End############*/ 
 
 /* Landscape phone to portrait tablet Start################*/
 @media (max-width: 767px) { 
 	
 	.modal.large {
 	
	    width: '';
	    top:0px;    
	}
	#grandTototalWeightArea{
		position: relative;
    	top: -300px;
	}
	.aui .p-t-xxs {
    	text-align: left;
	}
	
	
		.pagianation_area{
		/*position:absolute;*/
	}
	
	.aui .modal-body{
		/*max-height: 300px;*/	
	}
	#smartArea{
	display:none;
	}
	
	#actionPlanModal{
		margin-top:0px;
	}
	
	#actionPlanModal{
		margin-top:0px;
	}
	
	.moblieArea{
		display:block;
		font-size:0.7em;
	}
	.desktopArea{
		display:none;
	}
	.saveAndCancelArea{
		text-align:left;
	}
	
	#actualvsTargetBar{
		display:'';
	}
	#actualvsForecastBar{
		display:'';
	}
	
	/*btn area start*/
	#btnSaveActionPlan{
		width:100%;
	}
	#btnCancelActionPlan{
		width:100%;
	}
	
	#btnAddActionPlan{
		width:100%;
	}
	#btnEditActionPlan{
		width:100%;
	}
	#btnDelActionPlan{
		width:100%;
	}
	#btnDownloadAttachFile{
		width:100%;
	}
	/*btn area end*/
 
  }
 /* Landscape phone to portrait tablet End##################*/ 
 
 /* Landscape phones and down Start#########################*/
 @media (max-width: 480px) { 
 	
 	.pagingText{
		display:none;
	}
	.aui .p-t-xxs {
    	text-align: left;
	}
	.pagianation_area{
		/*position:absolute;*/
	}
	.aui .modal-body{
		/*max-height: 300px;*/
	}
	#smartArea{
	display:none;
	}
	
	#actionPlanModal{
		margin-top:0px;
	}
	
	#actionPlanModal{
		margin-top:0px;
	}
	
	.moblieArea{
		display:block;
		font-size:0.6em;
	}
	.desktopArea{
		display:none;
	}
	.saveAndCancelArea{
		text-align:left;
	}
	
	#actualvsTargetBar{
		display:none;
	}
	#actualvsForecastBar{
		display:none;
	}
	
	
	/*btn area start*/
	#btnSaveActionPlan{
		width:100%;
	}
	#btnCancelActionPlan{
		width:100%;
	}
	
	#btnAddActionPlan{
		width:100%;
	}
	#btnEditActionPlan{
		width:100%;
	}
	#btnDelActionPlan{
		width:100%;
	}
	#btnDownloadAttachFile{
		width:100%;
	}
	/*btn area end*/
 

  }
  /* Landscape phones and down End##########################*/
  
  

.ibox-content {
    background-color: #fff;
    border: 1px solid #ffe57f;
    color: inherit;
    margin-bottom: 5px;
    padding-left: 15px;
    padding-right: 15px;
}

#countPaginationTop{
	width:60px;
}
#countPaginationBottom{
	width:60px;
}
#btnPaginationTop{
	width:300px;
	float:left;
}
#dropdownPaginationTop{
	/*width:100px;*/
	float:right;
}
#btnPaginationBottom{
	width:300px;
	float:left;
}
#dropdownPaginationBottom{
	/*width:100px;*/
	float:right;
}
.aui .pagination {
   margin: 0;
}
.pagingText {
    float: right;
    margin-right: 5px;
    padding-top: 5px;
}
.aui .popover-content {
    padding: 5px;
}
.aui .modal-footer {
  
    border-radius: 0;
   
}

/*
.aui .modal {
    background-clip: padding-box;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
    left: 23%;
    margin-left: -280px;
    outline: 0 none;
    position: fixed;
    top: 0%;
    width: 90%;
    z-index: 1050;
}
*/
.aui input, .aui textarea, .aui .uneditable-input {
   /* width: 47px;*/
}

 .aui .table td {
    border-top: 1px solid #ddd;
    line-height: 16px;
    padding: 5px;
    text-align: left;
    vertical-align: top;
}
.aui input[type="color"], .aui input[type="date"], .aui input[type="datetime"], .aui input[type="datetime-local"], .aui input[type="email"], .aui input[type="month"], .aui input[type="number"], .aui input[type="password"], .aui input[type="search"], .aui input[type="tel"], .aui input[type="text"], .aui input[type="time"], .aui input[type="url"], .aui input[type="week"], .aui select, .aui textarea, .aui .uneditable-input {
    border: 1px solid #ddd;
    color: #8d8d8d;
    font-weight: 200;
    margin-bottom: 0;
    
}
.aui #breadcrumbs {
    margin-bottom: 0;
}
.breadcrumbs2{

	background: rgba(0, 0, 0, 0) linear-gradient(to bottom, #fff 0px, #f6f6f6 47%, #ededed 100%) repeat scroll 0 0;
    border-radius: 0;
    margin-bottom: 0;
  	/*padding-bottom: 0px*/

}
.aui .searchAdvanceText{
	/*width:94%;*/
}
.aui select, .aui textarea, .aui input[type="text"], .aui input[type="password"], .aui input[type="datetime"], .aui input[type="datetime-local"], .aui input[type="date"], .aui input[type="month"], .aui input[type="time"], .aui input[type="week"], .aui input[type="number"], .aui input[type="email"], .aui input[type="url"], .aui input[type="search"], .aui input[type="tel"], .aui input[type="color"], .aui .uneditable-input{
	padding:5px;
	padding-top:0px;
	height: 30px;
}
.aui .p-t-xxs{
 padding-top: 5px;
 /*text-align: right;
 font-weight: bold;*/
}
.aui .p-t-xxsg{
 padding-top: 5px;
 text-align: right;
 font-weight: bold;
}

.aui .pagination ul > li:last-child > a, .aui .pagination ul > li:last-child > span{
   border-bottom-right-radius: 0;
   border-top-right-radius: 0;
}
.aui .pagination ul > li:first-child > a, .aui .pagination ul > li:first-child > span{
	border-bottom-left-radius: 0;
    border-top-left-radius: 0;
}
.aui .table td{
	font-size: 13px;
}
/*
.modal.large {
    width: 90%;
    margin-left:-45%;  
    top:0px;
}
*/
.aui #assignTo{
	width:100%;
}
.aui #actionToAssign{
	width:100%;
}

.aui .row-fluid [class*="span"]{
min-height: auto;
margin-bottom:1px;
}

.textInfo{
	font-wieght:bold;
	/*text-align:right;*/
}
/*
.aui label {
    color: #555;
    font-size: 16px;
}
*/
.aui #btnSearchAdvance{
	left:4px; position:relative;
}
.aui .textData{
	  font-weight: bold;
}

/* Important part */
.modal-dialog{
    overflow-y: initial !important
}
.modal-body{
    max-height: calc(100vh - 200px);
    overflow-y: auto;
}
.aui .table td{
	text-align: '';
}
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
    padding: 0 0 0 5px;
    font-size: 14px;
}


/* Modal action plan START */

.boxActionPlainArea{
	
}
.boxActionPlainArea .boxActionL{
	/*float:left;*/
	/*width:55%;*/
	/*border:1px solid #cccccc;*/
	margin-top: 3px;
}

.boxActionPlainArea .boxActionR{
	/*float:right;*/
	/*width:565px;*/
	/*width:45%;*/
	/*border:1px solid #cccccc;*/
}

.boxTargetArea{
	width:27%;
	float:left;
	border-width: 1px 1px 1px 1px;
	border-color: #cccccc;
  	border-style: solid;
  	margin-top:3px;
  	padding:5px;
  	height: 89px;
  	background:#fff;
	
}
.boxForecastArea{
	width:28.5%;
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
	width:39%;
	float:right;
	margin-left: 0.5%;
	
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
  	margin-top:3px;
  	height: 40px;
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
  	font-weight: bold;
  	background:#fff;
  	/*height: 37.5px;*/
  	min-height: 37.5px;
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

.ui-autocomplete{
	z-index: 999999;
}

.actionplan_input{
	display:none;
}
.jqstooltip{
	display:none;
}
#jqstooltip{
	display:none;
}
.ganntChartTititle{
	/*background-color: #fffbdc;*/
    border: 1px solid #f1d875;
   /* padding:10px;
    margin-bottom:5px;
    */
}
/* Modal action plan END */


.aui .ca-menu li{
    line-height: 0px;
}

.aui .appraisal_result .popover{
	width:120px;
}

.aui select, .aui input[type="text"] {
    font-size: 13px;
}

</style>


<body class=" gray-bg ">
<div class='row-fluid'>
	<div id="slide_status" class='span12'>
		<div id="btnCloseSlide">×</div>
		<div id="slide_status_area"></div>
	</div>
</div>


	<div class="app_url_hidden">
		<div class="container1">
			<div id="includePage" class="ng-view ng-scope">
			<!-- 
				<h2><i class="fa fa fa-pencil-square-o icon-title"></i> <span id="modalDescription"> Appraisal</span> </h2>
 			-->
				<div class="row-fluid">
					<!-- start--row-fluid -->

					<div class="span12">
						<div class="ibox float-e-margins">
							<div class="ibox-title">
								<div class='titlePanel'>Advance Search</div>
							</div>

							<div class="ibox-content breadcrumbs2">
														
								<div class="row-fluid" id='advanceSearchAppraisal'>
							
							<div class="form-group pull-left span3" style="margin-left: 5px">
									<select data-toggle="tooltip" title="" data-original-title="Year"
										class="input form-control input-sm span12" id="AppraisalYear"
										name="AppraisalYear">
									</select>
								</div>
								<div class="form-group pull-left span3" style="margin-left: 5px">
									<select data-toggle="tooltip" title="" data-original-title="Period"
										class="input form-control input-sm span12" id="AppraisalPeriod"
										name="AppraisalPeriod">
										<option>All Appraisal Period</option>
									</select>
								</div>
								
								
								<div class="form-group pull-left span3" style="margin-left: 5px">
										<select data-toggle="tooltip" title="" data-original-title="Entity Type "
											class="input form-control input-sm span12" id="appraisalType"
											name="appraisalType">
								
										</select>
									</div>
									
									<div id="" class="form-group pull-left span3" style="margin-left: 5px">
										<input data-toggle="tooltip" title="" data-original-title="Employee Name"
											class="form-control input-sm searchAdvanceText span12"
											placeholder="Employee Name" type="text" id="EmpName" name="EmpName">
									</div>
									
									<div id="" class="form-group pull-left span3" style="margin-left: 5px">
										<input data-toggle="tooltip" title="" data-original-title="Position"
											class="form-control input-sm searchAdvanceText span12"
											placeholder="Position" type="text" id="Position" name="Position">
									</div>
									
									
								
								
								
								
								<div class="form-group pull-left span3" style="margin-left: 5px">
									<select data-toggle="tooltip" title="" data-original-title="Level"
										class="input form-control input-sm span12" id="AppraisalLevel"
										name="AppraisalLevel">
										<option>All Level</option>
										<option>ระดับบริหาร</option>
										<option>ระดับการจัดการ</option>
										<option>ระดับบังคับบัญชา</option>
										<option>ระดับเจ้าหน้าที่</option>
										<option>HR</option>
									</select>
								</div>
								
								<div class="form-group pull-left span3" style="margin-left: 5px">
									<select data-toggle="tooltip" title="" data-original-title="organization"
										class="input form-control input-sm span12" id="organization"
										name="organization">
										<option>All Organization</option>
									</select>
								</div>
							
								
								
								
								<div class="form-group span3 m-b-none pull-right" style="margin-left: 5px; text-align:right;">
									<button type="button" class="btn btn-info input-sm"
										name="btnSearchAdvance" id="btnSearchAdvance">
										<i class="fa fa-search"></i>&nbsp;Search
									</button>
									&nbsp;
								</div>
							
							</div>
														
							
							
								</div>

							</div>
							<!-- content end -->
						</div>

					</div>

				</div>
				<!-- end--row-fluid -->

				<div class="row-fluid search_result" >
					<div class="span12">
						<div class="ibox-title">
							<div class='titlePanel'>KPI Result List</div>
						</div>


						<div class="ibox-content">

							<!-- start table -->
							<!-- pagination start -->
                                    	<div class="row-fluid">
	                                    	<div class="span6 pagianation_area" >
												<div class="pagination_top pagination"></div>
	                                    	</div>
	                                    
		                                    <div class="span6 object-right paging-text">
		                                    
		                                    	<div class='pagingDropdown'>
		                                 			<select  id='countPaginationTop'  class="form-control input-sm countPagination">
					                                     <option>10</option>
					                                     <option>20</option>
					                                     <option>50</option>
					                                     <option>100</option>
					                                 </select>
		                                 		
		                                 		</div>
												<div class='pagingText'>Results per page</div>
		                                    
		                                    </div>
		                                    
                                    	</div> 
                                    	 <!-- pagination end -->
						




							
							<div id="listAppraisal"></div>	

							<!-- pagination start -->
							<div class="row-fluid">
	                                    	<div class="span6 pagianation_area">
	
												  <p class="pagination_bottom pagination"></p>
												
	                                    	</div>
	                                    
		                                    <div class="span6 object-right paging-text">
		                                    	<div class='pagingDropdown'>
		                                 			<select  id='countPaginationBottom'  class="form-control input-sm countPagination">
					                                     <option>10</option>
					                                     <option>20</option>
					                                     <option>50</option>
					                                     <option>100</option>
					                                 </select> 
			                                 	</div>
												<div class='pagingText'>Results per page</div>
		                                    </div>
		                                   
                                    	</div> 
							<!-- pagination end -->
							<!-- end table -->
						</div>
						<!-- content end -->
					</div>
				</div>


			</div>
	</div>
	
	<!-- Modal Start Appraisal -->

	<div aria-hidden="true" role="dialog" tabindex="-1" id="ModalAppraisal"
		class="modal inmodal large" style="display: none;">
		<div class="modal-dialog " >
			<div class="modal-content animated bounceInRight">
				<div class="modal-header">
					<button data-dismiss="modal" class="close" type="button">
						<span aria-hidden="true">×</span><span class="sr-only"></span>
					</button>
					<!-- <i class="fa fa-laptop modal-icon"></i> -->
					<h4 class="modal-title" id="modalTitleRole">KPI Result</h4>
					<!-- 
                <small class="font-bold">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</small>
                 -->
				</div>
				<div class="modal-body">
					<!-- content start -->
					<!-- 
					<h2>
						<i class="fa fa fa-pencil-square-o icon-title"></i> <span
							id="modalDescription">Appraisal</span>
					</h2>
					<hr>
					 -->
					
					<!-- -------------From Employee Start------------- -->
					<div class="row-fluid">
					<div class="span12">
						<div class="ibox float-e-margins">
							<div class="ibox-title">
								<div class='titlePanel' id='titlePanelInformation'>Employee Information</div>
							</div>
							<!-- ibox-content-radius -->
							<div class="ibox-content ">
								<div class="container-fluid"  id='empInformation'>
									<div class='hasWeightGrandTotalArea'>
										<div class="span10 ">
												
												<div class="row-fluid">
												
													<label class="span3 textInfo">Employee code:</label>
													<label class="span3  textData txtEmpCode" id="txtEmpCode"></label>
													<label class="span3 textInfo">Employee Name:</label>
													<label class="span3  textData txtEmpName" id="txtEmpName"></label>
												</div>
												<div class="row-fluid">
													<label class="span3 textInfo">Position:</label>
													<label class="span3  textData txtPosition" id="txtPosition"></label>
													<label class="span3 textInfo">Organization:</label>
													<label class="span3  textData txtOrgName" id="txtOrgName"></label>
												</div>
												<div class="row-fluid">
													
													<label class="span3 textInfo">Chief Employee Code:</label>
													<label class="span3  textData txtChiefEmpCode" id="txtChiefEmpCode"></label>
													<label class="span3 textInfo">Chief Employee Name:</label>
													<label class="span3  textData txtChiefEmpName" id="txtChiefEmpName"></label>
												</div>
											
												<div class="row-fluid">
													<label class="span3 textInfo">Period:</label>
													<label class="span3  textData txtPeriod"  id="txtPeriod"></label>
												</div>
										</div>
										<div class="span2" id='grandTototalWeightArea'>
												<label class="span12 p-t-xxsg text-center ">Grand Total</label>
												<label class="span12 p-t-xxsg text-center txtGrandTotalWeigh" id="txtGrandTotalWeigh" style="font-size: 300%;"></label>
										
										</div>
									
									
									</div>
									
									<div class='noWeightGrandTotalArea'>
									<!--  -->
									<div class="span12">
												
												<div class="row-fluid">
												
													<label class="span3 textInfo">Employee code:</label>
													<label class="span3  textData txtEmpCode" id="txtEmpCode"></label>
													<label class="span3 textInfo">Employee Name:</label>
													<label class="span3  textData txtEmpName" id="txtEmpName"></label>
												</div>
												<div class="row-fluid">
													<label class="span3 textInfo">Position:</label>
													<label class="span3  textData txtPosition" id="txtPosition"></label>
													<label class="span3 textInfo">Organization:</label>
													<label class="span3  textData txtOrgName" id="txtOrgName"></label>
												</div>
												<div class="row-fluid">
													
													<label class="span3 textInfo">Chief Employee Code:</label>
													<label class="span3  textData txtChiefEmpCode" id="txtChiefEmpCode"></label>
													<label class="span3 textInfo">Chief Employee Name:</label>
													<label class="span3  textData txtChiefEmpName" id="txtChiefEmpName"></label>
												</div>
											
												<div class="row-fluid">
													<label class="span3 textInfo">Period:</label>
													<label class="span3  textData txtPeriod"  id="txtPeriod"></label>
												</div>
										</div>
										
									<!--  -->
									</div>	

								</div>
								
								<div class="container-fluid"  id='orgInformation'>
								
									<div class='hasWeightGrandTotalArea'>
								
											<div class="span10 ">
													
													<div class="row-fluid">
													
														<label class="span3 textInfo">Organization code:</label>
														<label class="span3  textData txtOrgCodeOrg" id="txtOrgCodeOrg"></label>
														<label class="span3 textInfo">Organization Name:</label>
														<label class="span3  textData txtOrgNameOrg" id="txtOrgNameOrg"></label>
													</div>
													<div class="row-fluid">
														<label class="span3 textInfo">Parent Organization:</label>
														<label class="span3  textData txtParentOrganizationOrg" id="txtParentOrganizationOrg"></label>
														<label class="span3 textInfo">Period:</label>
														<label class="span3  textData txtPeriodOrg"  id="txtPeriodOrg"></label>
													</div>
													
											</div>
											<div class="span2" id='grandTototalWeightArea'>
													<label class="span12 p-t-xxsg text-center ">Grand Total </label>
													<label class="span12 p-t-xxsg text-center txtGrandTotalWeighOrg" id="txtGrandTotalWeighOrg" style="font-size: 300%;"></label>
											
											</div>
									
									</div>
									
									<div class='noWeightGrandTotalArea'>
									
											<div class="span12 ">
													
													<div class="row-fluid">
													
														<label class="span3 textInfo">Organization code:</label>
														<label class="span3 textInfo textData txtOrgCodeOrg" id="txtOrgCodeOrg"></label>
														<label class="span3 textInfo">Organization Name:</label>
														<label class="span3 textInfo textData txtOrgNameOrg" id="txtOrgNameOrg"></label>
													</div>
													<div class="row-fluid">
														<label class="span3 textInfo">Parent Organization:</label>
														<label class="span3 textInfo textData txtParentOrganizationOrg" id="txtParentOrganizationOrg"></label>
														<label class="span3 textInfo">Period:</label>
														<label class="span3 textInfo textData txtPeriodOrg"  id="txtPeriodOrg"></label>
													</div>
													
											</div>
											
									</div>
									

								</div>
								

							</div>
						</div>

					</div>

				</div>
				<!-- -------------From Employee Start------------- -->
				
				
				
				
					
					
					<!-- -------------From Appraisal Start------------- -->
					<div class="row-fluid">
					<div class="span12">
						<div class="ibox float-e-margins">
							<div class="ibox-title">
								<div class='titlePanel'>KPI Result</div>
							</div>
					
							<div class="ibox-content ibox-content-radius">
									
									<div id='appraisal_template_area'></div>


								</div>
						</div>

					</div>

				</div>
				<!-- -------------From Appraisal Start------------- -->

		
					<!-- content end -->
				</div>
				<div class="modal-footer">
				
					
					<div class='row-fluid'>
						<!-- 
						<div class="span3 ">
							 <div class="form-group p-xxs"> 
								 <label class="span5 p-t-xxs"><b>Assign to:</b></label> 
								 <div class="span7"> 
									 <select data-toggle="tooltip" title="" class="input form-control input-sm" id="assignTo" name="assignTo">
							
									 </select>
								 </div> 
							 </div> 
						 </div>
						  -->
						 <div class="span3 ">
							 <div class="form-group p-xxs"> 
								 <label class="span4 p-t-xxs"><b>Action:</b></label> 
								 <div class="span8"> 
									<select data-toggle="tooltip" title="" class="input form-control input-sm" id="actionToAssign" name="actionToAssign">
								
									</select>
								 </div> 
							 </div> 
						 </div>
						 <div class="span5 ">
	            			<div class="form-group "> 
								 <label class="span3 p-t-xxs"><b>Remark:</b></label> 
								 <div class="span9"> 
									 <input type='text' name='remark_footer' id='remark_footer' class='span12' value=''>
								 </div> 
							 </div>  
	            		</div>
	            		
						 
						  <div class="span4 offset0">
						  
							  	<button class="btn btn-success" type="button" id="btnSubmit">Submit</button>
								<input type='hidden' id='emp_result_id' name='emp_result_id' value=''>
								<button data-dismiss="modal" class="btn btn-danger btnCancle" type="button">Cancel</button>
						  
						  </div>
					
					</div>
					
					<div class="row-fluid" style='text-align:left;'>
            		<a href="#" id='slideUpDownStageHistory' style='display:none;'>Work Flow Stage History</a>
            		<div id='slideStageHistory' style='display:none;'>
            			<table class='table'>
            				<thead>
            					<tr>
            						<th  style='width:15%'>Created By</th>
            						<th  style='width:15%'>Created Datetime</th>
            						<th  style='width:15%'>From Stage</th>
            						<th  style='width:15%'>To Stage</th>
            						<th  style='width:35%'>Remark</th>
            					</tr>
            				</thead>
            				<tbody id='listDataStageHistory'>
            					<tr >
            						<td>emp_code1</td>
            						<td>2017-08-16 10:20:22</td>
            						<td>HR</td>
            						<td>Manager</td>
            						<td>่Reject เนื่องจากไม่เหมาะสม</td>
            					</tr>
            					<tr >
            						<td>emp_code1</td>
            						<td>2017-08-16 10:20:22</td>
            						<td>HR</td>
            						<td>Manager</td>
            						<td>่Reject เนื่องจากไม่เหมาะสม</td>
            					</tr>
            					<tr >
            						<td>emp_code1</td>
            						<td>2017-08-16 10:20:22</td>
            						<td>HR</td>
            						<td>Manager</td>
            						<td>่Reject เนื่องจากไม่เหมาะสม</td>
            					</tr>
            				</tbody>
            			</table>
            		</div>
            	</div>

					<div class="alert alert-warning" id="information"
						style="display: none;"></div>
				</div>
			</div>
		</div>
	</div>
	<input type="hidden" name="id" id="id" value="">
	<input type="hidden" name="action" id="action" value="add">
	<!-- Modal End Appraisal -->
	
	
	
	 
<!-- Modal Phase Start -->
<div aria-hidden="true" role="dialog" tabindex="-1" id="phaseModal" class="modal inmodal " style="display: none; margin-top: 0px;">
    <div class="modal-dialog">
    <div class="modal-content animated bounceInRight">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span><span class="sr-only"></span></button>
                <h5 class="modal-title">Phase </h5>
            </div>
            <div class="modal-body">
               
<div style='margin-bottom:5px;'>
<table style='width:100%'> 
	<tr>
		<td style='width:100px; '><b>Phase Name</b></td>
		<td><input  type='text' name='phaseName' id='phaseName' placeholder='Phase Name' class='input form-control input-sm-small span4' value=''></td>
	</tr>
	<tr>
		<td ><b>Is Active</b></td>
		<td style='text-align:left;'><input type='checkbox' name='phaseIsActive' id='phaseIsActive' class='input form-control input-sm-small' value='0'></td>
	</tr>
</table>                
	<div align="right">
	     <button class="btn btn-success" id="btnSavePhase" type="button">&nbsp;&nbsp;<i class="fa fa-check-circle"></i>&nbsp;&nbsp;Save&nbsp;&nbsp;</button>&nbsp;&nbsp;
	     <button class="btn btn-danger" id='btnCancelPhase' type="button"><i class="fa fa-times-circle"></i>&nbsp;Cancel</button>
	</div>
</div>
<table class='table'>
	<thead>
		<tr>
			<th style='width:10%;'>
			<b>No.</b>
			</th>
			<th style='width:30%;'>
			<b>Phase Name</b>
			</th>
			<th style='width:10%; text-align:center;'>
			<b>is Active</b>
			</th>
			<th style='text-align:center; width:15%;'>
			<b>Manage</b>
			</th>
		</tr>
	</thead>
	<tbody id='listDataPhase'>
		
	</tbody>
	

	<input type="hidden" name="pahse_id_edit" id="pahse_id_edit" value="">
	<input type="hidden" name="phase_action" id="phase_action" value="add">
	<input type="hidden" name="phase_item_result_id" id="phase_item_result_id" value="">
	
	
</table>




<!-- 
Phase
Phase Name
Is Active
 -->
				
	               
                               
                <!-- form start -->
                <!-- content end -->
            </div>
         
        </div>
    </div>
    
    
   
</div>


<!-- Modal Reason Start -->
<div aria-hidden="true" role="dialog" tabindex="-1" id="reasonModal" class="modal inmodal " style="display: none; margin-top: 0px;">
    <div class="modal-dialog">
    <div class="modal-content animated bounceInRight">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span><span class="sr-only"></span></button>
                <h5 class="modal-title">Reason</h5>
            </div>
            <div class="modal-body">
               
<div style='margin-bottom:5px;'>
<table style='width:100%'> 
	<tr>
		<td style='width:100px; '><b>Reason </b></td>
		<td><input  style='margin-bottom:5px;'  type='text' name='reason_name' id='reason_name' placeholder='Reason' class='input form-control input-sm-small span5' value=''></td>
	</tr>
	
</table>                
	<div align="right">
	     <button class="btn btn-success" id="btnSaveReason" type="button">&nbsp;&nbsp;<i class="fa fa-check-circle"></i>&nbsp;&nbsp;Save&nbsp;&nbsp;</button>&nbsp;&nbsp;
	     <button class="btn btn-danger" id='btnCancelReason' type="button"><i class="fa fa-times-circle"></i>&nbsp;Cancel</button>
	</div>
</div>
			<table class='table'>
				<thead>
					<tr>
						<th style='width:10%;'>
						<b>No.</b>
						</th>
						<th style='width:30%;'>
						<b>Reason</b>
						</th>
						<th style='text-align:center; width:15%;'>
						<b>Manage</b>
						</th>
					</tr>
				</thead>
				<tbody id='listDataReason'>
					
				</tbody>
				
			
				<input type="hidden" name="reason_id_edit" id="reason_id_edit" value="">
				<input type="hidden" name="reason_action" id="reason_action" value="add">
				<input type="hidden" name="reason_item_result_id" id="reason_item_result_id" value="">
				
				
			</table>
          
                <!-- form start -->
                <!-- content end -->
            </div>
         
        </div>
    </div>
</div>
<!-- Modal Reason End -->

<!-- Modal attach file Start -->
<div aria-hidden="true" role="dialog" tabindex="-1" id="attachFileModal" class="modal inmodal " style="display: none; margin-top: 0px;">
    <div class="modal-dialog">
    <div class="modal-content animated bounceInRight">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span><span class="sr-only"></span></button>
                <h5 class="modal-title">Attach Files</h5>
            </div>
            <div class="modal-body">
               
			<div style='margin-bottom:5px;'>
			<form id="attachFileForm">  
			<table style='width:100%'> 
				<tr>
					
					<td>
					      
						<input  style='width:100%;height:100%;'  type='file' name='attach_files_attachment' id='attach_files_attachment' class="dropify" accept=".xls, .xlsx, .pdf,doc,docx,jpeg"  multiple>
						<span style='text-align:right;'>
						
						</span>
					</td>
				</tr>
				
			</table> 
			<!--  
			<input align="right" type='submit' class="btn btn-primary" type="button" id="btnSaveAttach" value='Upload'>               
			-->
			</form>
			</div>
			<input type="hidden" name="attach_file_item_result_id" id="attach_file_item_result_id" value="">
                <!-- content end -->
            </div>
            <div class="modal-footer">
					<button class="btn btn-success" type="submit" id="btnSaveAttach" form="attachFileForm">Upload</button>
					<button data-dismiss="modal" class="btn btn-danger btnCancle"
						type="button">Cancel</button>
						<div class="alert alert-warning information" id="information"
						style="display: none;  position:relative;"></div>
				</div>
         
        </div>
    </div>
</div>
<!-- Modal attach file End -->


<!-- Modal Download Attach File Start -->
<div aria-hidden="true" role="dialog" tabindex="-1" id="downloadAttachFileModal" class="modal inmodal " style="display: none; margin-top: 0px;">
    <div class="modal-dialog">
    <div class="modal-content animated bounceInRight">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span><span class="sr-only"></span></button>
                <h5 class="modal-title">Download Files</h5>
            </div>
            <div class="modal-body">
            <!-- content start -->
			<table class='table'>
				<thead>
					<tr>
						<th style='width:5%;'>
						<b>No.</b>
						</th>
						<th style='width:50%;'>
						<b>Attach Files</b>
						</th>
						<th style='text-align:center; width:10%;'>
						<b>Manage</b>
						</th>
					</tr>
				</thead>
				<tbody id='listDataAttachFile'>
					
				</tbody>
			</table>
            <!-- content end -->
            </div>
         
        </div>
    </div>
</div>
<!-- Modal Download attach file End -->


<!-- modal action plan start -->
<div aria-hidden="true" role="dialog" tabindex="-1" id="actionPlanModal" class="modal inmodal large" style="display: none; margin-top: 0px;">
    <div class="modal-dialog">
    <div class="modal-content animated bounceInRight large">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span><span class="sr-only"></span></button>
                <h5 class="modal-title">Action Plan</h5>
            </div>
          
            
            


 

            <!-- smart cricle area -->
            
		<div class="container" id='smartArea' style='margin-top:10px; width:1050px;'>

			    <ul class="ca-menu">
			                    <li style='background:#ED1C24;'> 
			                        <a href="#">
			                           <!--  <span class="ca-icon">A</span> #aed6f1 --> 
			                            <div class="ca-content" >
			                                <h2 class="ca-main" style='font-size: 80px; color:#ffffff;'>S</h2>
			                                <h3 class="ca-sub" style='font-size: 17px; color:#ffffff;'>SPECIFIC</h3>
			                            </div>
			                        </a>                   
			                    </li>
			                    <li style='background:#DBAE0F;'>
			                        <a href="#">
			                          <!--  <span class="ca-icon">I</span> #85c1e9-->
			                            <div class="ca-content">
			                                <h2 class="ca-main" style='font-size: 80px; color:#ffffff;'>M</h2>
			                                <h3 class="ca-sub" style='font-size: 17px; color:#ffffff;'>MEASURABLE</h3>
			                            </div>
			                        </a>                   
			                    </li>
			                    <li style='background:#EF59A0;'>
			                        <a href="#">
			                           <!-- <span class="ca-icon">C</span> #3498db-->
			                            <div class="ca-content">
			                                <h2 class="ca-main" style='font-size: 80px; color:#ffffff;'>A</h2>
			                                <h3 class="ca-sub" style='font-size: 17px; color:#ffffff;'>ATTAINABLE</h3>
			                            </div>
			                        </a>                    
			                    </li>
			                    <li style='background:#009245;'>
			                        <a href="#">
			                           <!-- <span class="ca-icon">S</span> #1f74ad-->
			                            <div class="ca-content">
			                                <h2 class="ca-main" style='font-size: 80px; color:#ffffff;'>R</h2>
			                                <h3 class="ca-sub"  style='font-size: 17px; color:#ffffff;'>RELEVANT</h3>
			                            </div>
			                        </a>  
			                    </li>
			                     <li style='background:#F7931E;'>
			                        <a href="#">
			                           <!-- <span class="ca-icon">T</span> #144d73-->
			                            <div class="ca-content">
			                                <h2 class="ca-main" style='font-size: 80px; color:#ffffff;'>T</h2>
			                                <h3 class="ca-sub" style='font-size: 17px; color:#ffffff;'>TIME-BOUND</h3>
			                            </div>
			                        </a>  
			                    </li>
			    </ul>
			</div>
            <!-- smart cricle area -->
            
            <div class="modal-body">
                <!-- content start -->
                 
				<div class="row-fluid">
				<!-- start--row-fluid -->
				   <div class="span12">
				           <div class="ibox float-e-margins">
				           <!-- 
				                <div class="ibox-title" style="background-color: rgb(83, 120, 253); border-color: rgb(83, 120, 253); min-height:0px;">      
				                    <div class="titlePanelSearch">Action Plan</div> 
				    			</div>
				    		-->
				    			<div class="ibox-content breadcrumbs2" style="border-color: rgb(83, 120, 253);"> 
				    						
				    				<div class="row-fluid ">
											
											<div class='boxActionPlainArea alert alert-success'>
												<div class='span6'>
													<div class='boxActionL'>
														<!-- 
														<div class='actionPlanList'>
														Phase <span id='actionPlanPhase'></span>
														</div>
														 -->
														<div class='actionPlanList'>
															<div style='padding-top:10px; padding-left: 10px;'>
																Organization: <span id='actionPlanOrganization'></span>
															</div>
														</div>
														<div class='actionPlanList'>
															<div style='padding-top:10px; padding-left: 10px;'>
																KPI: <span id='actionPlanAppraisalItem'></span>
															</div>
														</div>
														 
														
													</div>
												</div>
												<div class='span6'>
													<div class='boxActionR'>
														
														<div class='boxActualPercentageArea'>
														
															<div class='boxActualvsForecast boxForecastVsActual'>
																<div  class='fontBold desktopArea'>
																	%Actual vs Forecast 
																</div>
																<div class='fontBold moblieArea' >
																	%Actual vs Forecast 
																</div>
																<div >
																	<span id='actionPlanActualVSforecast'></span>% <span id='actualvsForecastBar'></span>
																</div>
															</div>
															<div class='boxActualvsTarget boxForecastVsActual'>
																<div class='fontBold desktopArea'>
																	% Actual vs Target 
																</div>
																<div class='fontBold moblieArea' >
																	% Actual vs Target 
																</div>
																<div>
																<span id='actionPlanActualVSTarget'></span>% <span id='actualvsTargetBar'></span>
																</div>
																
															</div>
															 
														</div>
														<div class='boxForecastArea'>
															<div class='boxForecastResult boxForecastVsActual'>
																<div class='fontBold fontCenter'>
																Forecast
																</div>
																<div class='fontCenter'>
																 <span id='actionPlanForecastResult'></span>
																 </div>
															</div>
															<div class='boxActual boxForecastVsActual'>
																<div class='fontBold fontCenter'>
																Target
																</div>
																<div class='fontCenter'>
																 <span id='actionPlanTarget'></span>
																 </div>
															</div>
														</div>
														<div class='boxTargetArea' style='font-size:20px;'>
															<div class='boxTargetData'>
															<div class='fontBold fontCenter'>Actual</div>
															<div class='fontCenter fontBold' style='font-size:15px;margin-top:5px; color:green;'> <span id='actionPlanActual'></span></div>
															</div>
														</div>
													</div>
												</div>
												
												
												<br style='clear:both'>
											</div>
									</div>
						
					    		
				
									<div class='row-fluid' style='margin-top:5px;margin-bottom:5px;'>
										<div class=' alert alert-block'>
											<div class='span6'>
												<button type="button" class="btn btn-success input-sm" name="btn-" id="btnAddActionPlan">
												
													Add
												</button>
												<button type="button" class="btn btn-warning  input-sm" name="btn-" id="btnEditActionPlan">
													Edit
												</button>
												<button type="button" class="btn btn-danger input-sm" name="btn-" id="btnDelActionPlan">
													Delete
												</button>
												<input type="hidden" id="action_actionplan" value="add" name="action_actionplan">
            									<input type="hidden" id="action_new_actionplan" value="" name="action_new_actionplan">
            									<input type="hidden" id="actionplan_emp_id" value="" name="actionplan_emp_id">
            									<input type="hidden" id="actionplan_emp_name" value="" name="actionplan_emp_name">
            									<input type="hidden" id="item_result_id" value="3" name="item_result_id">
            									
											</div>
											<div class='span6'>
												<div class='saveAndCancelArea' >
													<button type="button" class="btn btn-primary input-sm" name="btn-" id="btnDownloadAttachFile">
														Download
													</button>
													<button type="button" class="btn btn-primary input-sm" name="btn-" id="btnSaveActionPlan">
														Save
													</button>
													<button type="button" class="btn btn-danger input-sm" name="btn-" id="btnCancelActionPlan">
														Cancel
													</button>
													
												</div>
											</div>
											<br style='clear:both'>
										</div>
									</div>
									<div style="overflow: auto; width:100%;">
									<!-- Select,Task,Plan Start,Plan Start,Plan End,Actual Start,Actual End,Responsible,%Completed,PV,AC,EV -->
										<table class='table'>
											<thead>
												<tr>
													<th style='width:5%'><center><b>Select</b></center></th>
													<th style='width:10%'><b>Task</b></th>
													<th style='width:8%'><b>Plan Start</b></th>
													<th style='width:8%'><b>Plan End</b></th>
													<th style='width:9%'><b>Actual Start</b></th>
													<th style='width:8%'><b>Actual End</b></th>
													<th style='width:5%'><b>Phase</b></th>
													<th style='width:10%'><b>Responsible</b></th>
													<th style='width:10%;'><b>%Completed</b></th>
<!-- 													<th style='width:7%;text-align:right;'><b>PV</b></th> -->
<!-- 													<th style='width:7%;text-align:right;'><b>AC</b></th> -->
<!-- 													<th style='width:7%;text-align:right;'><b>EV</b></th> -->
													
												</tr>
											</thead>
											<tbody id='listDataActionPlan'>
												<!-- 
												<tr>
													<td>
													<center>
														<input type='checkbox' name='' id='' class='' value=''>
													</center>
													</td>
													<td>Plan</td>
													<td>
												
														<input type='text' name='planStart' id='planStart' class='datepicker input-small' style="height:20px;margin-right:3px;" value='08/07/2017'>
													</td>
													<td>
														<input type='text' name='planEnd' id='planEnd' class='datepicker input-small' style="height:20px;margin-right:3px;" value='08/07/2017'>
													</td>
													<td>
														<input type='text' name='actualStart' id='actualStart' class='datepicker input-small' style="height:20px;margin-right:3px;" value='08/07/2017'>
													</td>
													<td>
														<input type='text' name='actualStart' id='actualStart' class='datepicker input-small' style="height:20px; margin-right:3px;" value='08/07/2017'>
													</td>
													<td>
														<select id='phase' name='phase' class='input-small' style="height:22px; margin-right:3px;">
															<option>Phase1</option>
															<option>Phase2</option>
															<option>Phase3</option>
														</select>
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
												 -->
											</tbody>
											
										</table>
									</div>
				
				
				</div><!-- content end -->
					    </div>
					    		
					</div>
				
				</div>
				<!-- end--row-fluid -->
				<div class="alert alert-warning information" id="information3"
						style="display: none;"></div>
                <!-- content end -->
            </div>
           
        </div>
    </div>
    
    
   
</div>
<!-- modal action plan end -->







<!-- modal gantt chart start -->
<div aria-hidden="true" role="dialog" tabindex="-1" id="ganttChartModal" class="modal inmodal large" style="display: none; margin-top: 0px;">
    <div class="modal-dialog">
    <div class="modal-content animated bounceInRight large">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span><span class="sr-only"></span></button>
                <h5 class="modal-title">Gantt Chart</h5>
            </div>

            <div class="modal-body">
                <!-- content start -->
                 <!-- 
                <div class='container' >
	                <div class='row-fluid ' >
	                	<div class='span4 ' style='font-weight:bold;'>
	                		Period: <span id='ganttAppraisalPeriodDescTxt'></span>
	                	</div>
	                	<div class='span4 ' style='font-weight:bold;'>
	                		Organization: <span id='ganttOrgTxt'></span>
	                	</div>
	                	<div class='span4 ' style='font-weight:bold;'>
	                		Appraisal Item: <span id='ganttAppraisalItemTxt'></span>
	                	</div>
	                </div>
                </div>
                -->
                <div class="ibox float-e-margins">
							<div class="ibox-title" style="background-color: rgb(255, 224, 18); border-color: rgb(255, 224, 18); text-align:right;">
								<!-- 
								Zoom
			                	<select id='ganntChartZoom' style='width:65px;'>
			                		<option value='90'>100%</option>
			                		<option value='80'>80%</option>
			                		<option value='60'>60%</option>
			                		<option value='40'>40%</option>
			                		<option value='20'>20%</option>
			                		<option value='10'>0%</option>
			                	</select>
			                	 -->
			                	 <div style='display:none;'>
				                	<select id='selectGanntChartType' style='width:75px;' >
				                		<option value='d'>Daily</option>
				                		<option value='m'>Monthly</option>
				                	</select>
			                	 </div>
			                	 <div style='display:none;'>
			                	Please select range of day
			                	<select  id='selectGanntChartViewDaily' style='width:100px;'>
			                		
			                	</select>
			                	</div>
			                	<select id='selectGanntChartViewMonthly' style='width:85px; display:none;'>
			                		<option value='1'>1 Month</option>
			                		<option value='2'>2 Months</option>
			                		<option value='3'>3 Months</option>
			                		<option value='4'>4 Months</option>
			                		<option value='5'>5 Months</option>
			                		<option value='6'>6 Months</option>
			                		<option value='7'>7 Months</option>
			                		<option value='8'>8 Months</option>
			                		<option value='9'>9 Months</option>
			                		<option value='10'>10 Months</option>
			                		<option value='11'>11 Months</option>
			                		<option value='12'>12 Months</option>
			                	</select>
			                	
			                	<button  style='display:none;' class='btn btn-primary' id='btnGanttSubmit'><i class=""></i> Submit</button>
			                	<button class='btn btn-primary' id='btnPrint'><i class="icon-print"></i> Print</button>

							</div>
							<!-- ibox-content-radius -->
							<div class="ibox-content " style="border-color: rgb(255, 224, 18);">
							
							
							
							
									 <div class='row-fluid  ganntChartTititle ganntChartTitleOrg'  >
					                	<div class='span4 ' style='font-weight:bold;padding:10px;'>
					                		Period: <span class='ganttAppraisalPeriodDescTxt'></span>
					                	</div>
					                	<div class='span4 ' style='font-weight:bold;padding:10px;'>
					                		Organization: <span class='ganttOrgTxt'></span>
					                	</div>
					                	<div class='span4 ' style='font-weight:bold;padding:10px;'>
					                		KPI: <span class='ganttAppraisalItemTxt'></span>
					                	</div>
					                </div>
					                <div class='ganntChartTititle ganntChartTitleEmpArea'>
						                <div class='row-fluid   ganntChartTitleEmp'  >
						                	<div class='span6 ' style='font-weight:bold;padding:10px;padding-bottom:0px'>
						                		Period: <span  class='ganttAppraisalPeriodDescTxt'></span>
						                	</div>
						                	<div class='span6 ' style='font-weight:bold;padding:10px;padding-bottom:0px'>
						                		Organization: <span class='ganttOrgTxt'></span>
						                	</div>
						                </div>
						                <div class='row-fluid  ganntChartTitleEmp'>
						                	<div class='span6 ' style='font-weight:bold;padding:10px; padding-top:5px'>
						                		Employee: <span class='ganttEmpTxt'></span>
						                	</div>
						                	<div class='span6 ' style='font-weight:bold;padding:10px; padding-top:5px'>
						                		KPI: <span class='ganttAppraisalItemTxt'></span>
						                	</div>
						                </div>
					                
					                </div>
	                
									  <div style='text-align:center;'>
					                 	<div id='ganttChart' ></div>
									  </div>

							</div>
				</div>

              
				<!-- 
				<div style='text-align:right;'>
						Zoom
	                	<select id='ganntChartZoom' style='width:65px;'>
	                		<option value='10'>100%</option>
	                		<option value='20'>80%</option>
	                		<option value='40'>60%</option>
	                		<option value='60'>40%</option>
	                		<option value='80'>20%</option>
	                		<option value='90'>0%</option>
	                	</select>
	             </div>
	              -->
	             <input type="hidden" name="gantt_item_result_id" id="gantt_item_result_id" value="">
	             <input type="hidden" name="gantt_unit" id="gantt_unit" value="">
	             <input type="hidden" name="gantt_amount" id="gantt_amount" value="">
                <!-- content end -->
            </div>
           
        </div>
    </div>
    
    
   
</div>
<!-- modal gantt chart end -->


	
<!-- Modal Confirm Start -->
<div aria-hidden="true" role="dialog" tabindex="-1" id="confrimModal" class="modal inmodal " style="display: none;">
    <div class="modal-dialog ">
    <div class="modal-content animated bounceInRight">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span><span class="sr-only"></span></button>
                <h5 class="modal-title">Confirm Dialog</h5>
            </div>
            <div class="modal-body">
                <!-- content start -->
                <!-- <h2><i class="fa fa fa-pencil-square-o icon-title"></i> ADD NEW GRADE</h2>
                <hr>
                 -->
                <!-- form start -->
                <div class="form-kpi-mangement">
	                <div class="form-kpi-label" align="center">
	                 		<label>Confirm to Delete Data?</label>
	                </div>
                </div>
                               
                <!-- form start -->
                <!-- content end -->
            </div>
            <div class="modal-footer">
            	<div align="center">
	                <button class="btn btn-success" id="btnConfirmOK" type="button">&nbsp;&nbsp;<i class="fa fa-check-circle"></i>&nbsp;&nbsp;Yes&nbsp;&nbsp;</button>&nbsp;&nbsp;
	                <button data-dismiss="modal" class="btn btn-danger" type="button"><i class="fa fa-times-circle"></i>&nbsp;Cancel</button>
            	</div>
            </div>
        </div>
    </div>
    
    
   
</div>
<!-- Modal Confirm End -->

<div id="embedParamSearch"></div>
	

</body>

<script src="/see-kpi-portlet/js/jquery3.1.1.js"></script>
<script type="text/javascript">
 var jQuery_1_1_3 = $.noConflict(true);
</script>
 
	
	




	

    
    	
    



