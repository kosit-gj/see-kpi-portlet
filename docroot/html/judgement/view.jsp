<%@ page import="com.liferay.portal.kernel.util.WebKeys" %>
<%@ page import="com.liferay.portal.util.PortalUtil" %>
<%@ page import="javax.portlet.*"%>
<%@ page contentType="text/html; charset=UTF-8" %>

<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<%@ taglib uri="http://alloy.liferay.com/tld/aui" prefix="aui"%>
<%@ taglib uri="http://liferay.com/tld/theme" prefix="liferay-theme" %>
<%@ taglib uri="http://liferay.com/tld/ui" prefix="liferay-ui" %>

<liferay-theme:defineObjects />
<portlet:defineObjects />

<%
String username = themeDisplay.getUser().getScreenName();
String password = (String)request.getSession().getAttribute(WebKeys.USER_PASSWORD);
String param_link = PortalUtil.getOriginalServletRequest(request).getParameter("param_link");
String param_item_result_id = PortalUtil.getOriginalServletRequest(request).getParameter("param_item_result_id");
layout = themeDisplay.getLayout();
plid = layout.getPlid();
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
	
	.aui .table-responsive {
		white-space: nowrap;
	    /*overflow: hidden;*/
	    text-overflow: ellipsis;
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

.aui input[type="checkbox"]{
margin :0px;
}
.aui input, .aui textarea, .aui .uneditable-input {
   /* width: 47px;*/
}

 .aui .table td {
    border-top: 1px solid #ddd;
    line-height: 16px;
    padding: 8px;
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
}
.boxActualPercentageArea{
	width:39%;
	float:right;
	margin-left: 0.5%;
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
    border: 1px solid #f1d875;
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
.aui .infoItem:hover{
background-color:#71cccc !important;
}
</style>


<!-- Start HTML -->

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

                                    <!-- Select Start------------------------------------------------------------------------------------->

                                    <div class="form-group pull-left span3" style="margin-left: 5px">
                                        <select data-toggle="tooltip" title="" data-original-title="<liferay-ui:message key="year" />" class="input form-control input-sm span12" id="AppraisalYear" name="AppraisalYear">
                                        </select>
                                        <input type="hidden" value="" id="param_AppraisalYear">
                                    </div>

                                    <div class="form-group pull-left span3" style="margin-left: 5px">
                                        <select data-toggle="tooltip" title="" data-original-title="<liferay-ui:message key="period" />" class="input form-control input-sm span12" id="AppraisalPeriod" name="AppraisalPeriod">
                                        </select>
                                        <input type="hidden" value="" id="param_AppraisalPeriod">
                                    </div>

                                    <div class="form-group pull-left span3" style="margin-left: 5px">
                                        <select id="Judgement" name="Judgement-Status" data-toggle="tooltip" title="" data-original-title="<liferay-ui:message key="judgement-status" />" class="input form-control input-sm span12">
                                        </select>
                                        <input type="hidden" value="" id="param_Judgement">
                                    </div>
                                    <!-- Select End------------------------------------------------------------------------------------->

                                    <!-- Button Start----------------------------------------------------------------------------------->

                                    <div class="form-group span12 m-b-none pull-right" style="margin-left: 5px; text-align:right;">
                                        <button type="button" class="btn btn-info input-sm" name="btn_search_advance"
                                            id="btn_search_advance">
                                            <i class="fa fa-search"></i>&nbsp;
                                            <liferay-ui:message key="search" />
                                        </button>
                                        <button type="button" class="btn btn-warning input-sm" name="btn_judgement" id="btn_judgement">
                                            <liferay-ui:message key="judgement" />
                                        </button>
                                        <button type="button" class="btn btn-success input-sm" name="btn_raise_salary"
                                            id="btn_raise_salary">
                                            <liferay-ui:message key="raise-salary" />
                                        </button>
                                    </div>
                                    <div class="form-group span3 m-b-none pull-right" style="margin-left: 5px; text-align:right;">

                                        <!-- Button End----------------------------------------------------------------------------------->
                                    </div>
                                </div> <!-- ibox-content End-->
                            </div>
                        </div>
                    </div> <!-- end--row-fluid -->
                </div>
            </div>


            <div class="row-fluid search_result">
                <div class="span12">
                    <div class="ibox-title">
                        <div class='titlePanel'>
                            <liferay-ui:message key="kpi-result-list" />
                        </div>
                    </div>
                    <div class="ibox-content">

                        <!-- start table -->
                        <!-- pagination start -->
                        <div class="row-fluid">
                            <div class="span6 pagianation_area">
                                <div class="pagination_top pagination"></div>
                            </div>

                            <div class="span6 object-right paging-text">

                                <div class='pagingDropdown'>
                                    <select id='countPaginationTop' class="form-control input-sm countPagination">
                                        <option>10</option>
                                        <option>20</option>
                                        <option>50</option>
                                        <option>100</option>
                                    </select>

                                </div>
                                <div class='pagingText'>
                                    <liferay-ui:message key="results-per-page" />
                                </div>

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
                                    <select id='countPaginationBottom' class="form-control input-sm countPagination">
                                        <option>10</option>
                                        <option>20</option>
                                        <option>50</option>
                                        <option>100</option>
                                    </select>
                                </div>
                                <div class='pagingText'>
                                    <liferay-ui:message key="results-per-page" />
                                </div>
                            </div>

                        </div>
                        <!-- pagination end -->

                    </div>
                    <!-- content end -->
                </div>
            </div>


        </div>
    </div>








    <!-- Modal Start Appraisal -->

    <div aria-hidden="true" role="dialog" tabindex="-1" id="ModalAppraisal" class="modal inmodal large" style="display: none;">
        <div class="modal-dialog ">
            <div class="modal-content animated bounceInRight">
                <div class="modal-header">
                    <button data-dismiss="modal" class="close" type="button">
                        <span aria-hidden="true">×</span><span class="sr-only"></span>
                    </button>
                    <h4 class="modal-title" id="modalTitleRole">
                        <liferay-ui:message key="judgement" />
                    </h4>
                </div>
                <div class="modal-body">

                    <!-- -------------From Employee Start------------- -->

                    <div class="row-fluid" id="modal-header">
                        <div class="span12">
                            <div class="ibox float-e-margins">
                                <div class="ibox-title">
                                    <div class='titlePanel' id='titlePanelInformation'>
                                        <liferay-ui:message key="employee-information" />
                                    </div>
                                </div>
                                <!-- ibox-content-radius -->
                                <div class="ibox-content ">
                                    <div class="container-fluid" id='empInformation'>
                                        <div class='hasWeightGrandTotalArea'>
                                            <div class="span10 ">

                                                <div class="row-fluid">

                                                    <label class="span3 textInfo">
                                                        <liferay-ui:message key="employee-code" />:</label>
                                                    <label class="span3  textData txtEmpCode" id="txtEmpCode"></label>
                                                    <label class="span3 textInfo">
                                                        <liferay-ui:message key="employee-name" />:</label>
                                                    <label class="span3  textData txtEmpName" id="txtEmpName"></label>
                                                </div>
                                                <div class="row-fluid">
                                                    <label class="span3 textInfo">
                                                        <liferay-ui:message key="position" />:</label>
                                                    <label class="span3  textData txtPosition" id="txtPosition"></label>
                                                    <label class="span3 textInfo">
                                                        <liferay-ui:message key="organization" />:</label>
                                                    <label class="span3  textData txtOrgName" id="txtOrgName"></label>
                                                </div>
                                                <div class="row-fluid">

                                                    <label class="span3 textInfo">
                                                        <liferay-ui:message key="chief-employee-code" />:</label>
                                                    <label class="span3  textData txtChiefEmpCode" id="txtChiefEmpCode"></label>
                                                    <label class="span3 textInfo">
                                                        <liferay-ui:message key="chief-employee-name" />:</label>
                                                    <label class="span3  textData txtChiefEmpName" id="txtChiefEmpName"></label>
                                                </div>

                                                <div class="row-fluid">
                                                    <label class="span3 textInfo">
                                                        <liferay-ui:message key="period" />:</label>
                                                    <label class="span3  textData txtPeriod" id="txtPeriod"></label>
                                                </div>
                                            </div>
                                            <div class="span2 grandTototalWeightArea" id='grandTototalWeightArea'>
                                                <label class="span12 p-t-xxsg text-center ">
                                                    <liferay-ui:message key="grand-total" /></label>
                                                <label class="span12 p-t-xxsg text-center txtGrandTotalWeigh" id="txtGrandTotalWeigh"
                                                    style="font-size: 300%;"></label>
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
                                    <div class='titlePanel'>
                                        &nbsp;&nbsp;
                                    </div>
                                </div>
                                <div class="ibox-content ibox-content-radius">
                                    <div id='modal-table-judgerment'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- -------------From Appraisal Start------------- -->

                </div> <!-- content end -->
                <div class="modal-footer">
                    <div class='row-fluid'>
                        <button class="btn btn-success" type="button" id="btn_submit">
                            <liferay-ui:message key="submit" /></button>
                        <input type='hidden' id='emp_result_id' name='emp_result_id' value=''>
                        <button data-dismiss="modal" class="btn btn-danger btnCancle" type="button">
                            <liferay-ui:message key="cancel" /></button>
                    </div>
                    <div class="alert alert-warning" id="information" style="display: none;"></div>
                </div>
            </div>
        </div>
    </div>







    <!-- Language Template for js -->
    <%@ include file="/html/language-js-template/view.jsp" %>

</body>

<script src="/see-kpi-portlet/js/jquery3.1.1.js"></script>
<script type="text/javascript">
    var jQuery_1_1_3 = $.noConflict(true);
</script>