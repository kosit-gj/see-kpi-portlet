<%@ page import="javax.portlet.*"%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="com.liferay.portal.kernel.util.WebKeys"%>
<%@ page import="com.liferay.portal.util.PortalUtil"%>

<%@ taglib uri="http://liferay.com/tld/theme" prefix="liferay-theme"%>
<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet"%>
<%@ taglib uri="http://alloy.liferay.com/tld/aui" prefix="aui"%>
<%@ taglib uri="http://liferay.com/tld/ui" prefix="liferay-ui"%>
<liferay-theme:defineObjects />
<portlet:defineObjects />
<%

String username = themeDisplay.getUser().getScreenName();
String password = (String)request.getSession().getAttribute(WebKeys.USER_PASSWORD);
layout = themeDisplay.getLayout();
plid = layout.getPlid();

long companyID = themeDisplay.getCompanyId();
String pAuth = com.liferay.portal.security.auth.AuthTokenUtil.getToken(request);
%>
<input type="hidden" id="user_portlet" name="user_portlet" value="<%=username%>">
<input type="hidden" id="pass_portlet" name="pass_portlet" value="<%=password%>">
<input type="hidden" id="url_portlet" name="url_portlet" value="<%= renderRequest.getContextPath() %>">
<input type="hidden" id="plid_portlet" name="plid_portlet" value="<%= plid %>">
<input type="hidden" id="companyID" name="companyID" value="<%= companyID %>">
<input type="hidden" id="pAuth" name="pAuth" value="<%= pAuth %>">

<style>
 /* Large desktop Start#####################################*/
 @media (min-width: 1200px) {
	.position-result-perpage {
		display: flex;
		justify-content: space-between;
	}
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
	.position-result-perpage {
		display: flex;
		justify-content: space-between;
	}
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
	.position-result-perpage {
		display: flex;
		justify-content: space-between;
	}
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
	
	.aui .table-responsive {
		white-space: nowrap;
	    /*overflow: hidden;*/
	    text-overflow: ellipsis;
	}
	
	#adjust_percent {
		width: 20%;
	}


  }
 /* Portrait tablet to landscape and desktop End############*/

 /* Landscape phone to portrait tablet Start################*/
 @media (max-width: 767px) {
	 .position-result-perpage {
		display: flex;
		justify-content: space-between;
	}
	#adjust_percent {
		width: 20%;
	}
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
	
	.aui .table-responsive {
		white-space: nowrap;
	    /*overflow: hidden;*/
	    text-overflow: ellipsis;
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
	.position-result-perpage {
		display: block;
		justify-content: space-between;
	}
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
	
	.aui .table-responsive {
		white-space: nowrap;
	    /*overflow: hidden;*/
	    text-overflow: ellipsis;
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



.aui select, .aui input[type="text"] {
    font-size: 13px;
}
.ibox-title {
    -moz-border-bottom-colors: none;
    -moz-border-left-colors: none;
    -moz-border-right-colors: none;
    -moz-border-top-colors: none;
    background-color: #fc0;
    border-color: #fc0;
    border-image: none;
    border-style: solid solid none;
    border-width: 3px 0 0;
    color: black;
    margin-bottom: 0;
    min-height: 35px;
    padding: 0 10px;
 }
 .titlePanel {

    font-size: 14px;
    font-weight: bold;
    margin-right: 5px;
    padding-top: 7px;

}
 .list_content{
 display: none;}





</style>
<div id="container1">
    <div class='row-fluid'>
        <div class='col-xs-12'>
            <div id="slide_status" class="span12" style="z-index: 9000;">
                <div id="btnCloseSlide"><i class='fa fa-times'></i></div>
                <div id="slide_status_area"></div>
            </div>
        </div>
    </div>
<div class="app_url_hidden">
		<div class="container1">
			<div id="includePage" class="ng-view ng-scope">
				<div class="row-fluid">
					<!-- start--row-fluid -->

					<div class="span12">
						<div class="ibox float-e-margins">
							<div class="ibox-title">
								<div class='titlePanel'>
									<liferay-ui:message key="advanced-search" />
								</div>
							</div>

							<div class="ibox-content breadcrumbs2">
								<div class="row-fluid" id='advanceSearchAppraisal'>
				
				                  <div class="form-group pull-left span2" style="margin-left: 5px">
				                    <select data-toggle="tooltip" title="" data-original-title="<liferay-ui:message key="year"/>" class="input form-control input-sm span12"
				                      id="AppraisalYear" name="AppraisalYear">
				                      <option>2018</option>
				                    </select>
				                  </div>
				
				                  <div class="form-group pull-left span3" style="margin-left: 5px">
				                    <select data-toggle="tooltip" title="" data-original-title="<liferay-ui:message key="period"/>" class="input form-control input-sm span12"
				                      id="AppraisalPeriod" name="AppraisalPeriod">
				                      <option>ประเมินผลประจำปี 2018</option>
				                    </select>
				                  </div>
								 
								 <div class="form-group pull-left span2" style="margin-left: 5px">
				                    <select data-toggle="tooltip" title="" data-original-title="<liferay-ui:message key="form"/>" class="input form-control input-sm span12"
				                      id="AppraisalForm" name="AppraisalForm">
				                    </select>
				                  </div>
				                  
								  <div class="form-group pull-left span2" style="margin-left: 5px">
										<input data-toggle="tooltip" title="" data-original-title="Effective Date" class="form-control input-sm effective-date span12" placeholder="Effective Date" type="text" id="effectiveDate" name="effectiveDate" style="cursor: pointer;">
								</div>
								<div class="form-group pull-left span2" style="margin-left: 5px">
									<input data-toggle="tooltip" title="" data-original-title="Adjust Date" class="form-control input-sm expired-date span12" placeholder="Adjust Date" type="text" id="adjustDate" name="adjustDate" style="cursor: pointer;">
								</div>
				
				                  <div class="form-group span2 m-b-none pull-right" style="margin-top: 1px; margin-left: 5px; margin-right: 3px; text-align:right;">
<!-- 				                    <button type="button" class="btn btn-info input-sm" name="btnSearchAdvance" id="btnSearchAdvance"> -->
<%-- 				                      <i class="fa fa-search"></i>&nbsp;<liferay-ui:message key="search"/> --%>
<!-- 				                    </button> -->
				                    &nbsp;
				                    <form id="formExportToExcel" action="" method="post" class="pull-right" style="margin-bottom: 0px; margin-left: 5px">
										<button type="button" class="btn btn-success input-sm" name="btnExport" id="btnExport">
											<i class="fa fa-download"></i>&nbsp;<liferay-ui:message key="export"/>
				                    	</button>
									</form>
				                  </div>
				
				                </div>
								
							
						</div>
						<!-- content end -->
					</div>
				</div>
			</div>
			<!-- end--row-fluid -->
		</div>
	</div>
    
</div>
	
	
<!-- Modal Confirm Start -->
<div aria-hidden="true" role="dialog" tabindex="-1" id="confrimModal" class="modal inmodal in" style="width:400px;left:calc;display: none;">
    <div class="modal-dialog">
        <div class="modal-content  bounceInRight">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" style="padding-top:3px">
                    <span aria-hidden="true"><i class='fa fa-times'></i></span>
                </button>
                <h5 class="modal-title">Confirm Dialog</h5>
            </div>
            <div class="modal-body">
                <div class="form-kpi-mangement">
                    <div class="form-kpi-label" align="center">

                        <label id="label-del">Confirm to Delete Data?</label>
                        <div id="inform_on_confirm" class='information'></div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div align="center">
                    <button class="btn btn-success" id="btnConfirmOK" type="button">
                        &nbsp;&nbsp;<i class="fa fa-check-circle"></i>&nbsp;&nbsp;Yes&nbsp;&nbsp;
                    </button>
                    &nbsp;&nbsp;
                    <button data-dismiss="modal" class="btn btn-danger" type="button">
                        <i class="fa fa-times-circle"></i>&nbsp;Cancel
                    </button>
                </div>
                <div class="alert alert-warning information" id="information" style="display: none;"></div>
            </div>
        </div>
    </div>
</div>
<!-- Modal Confirm End -->



