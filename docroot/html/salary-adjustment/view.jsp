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

.aui .appraisal_result .popover{
	width:120px;
}

.aui select, .aui input[type="text"] {
    font-size: 13px;
}
.aui .infoItem:hover{
background-color:#71cccc !important;
}

#tableBonusAdjustment thead tr th {
 white-space: nowrap;
 text-align: center;
 vertical-align: middle;
 font-size: 14 px;
}


.aui .list-data-table .table-bordered th{
/*  background-color: #666666 !important; */
/*  color: #ffffff; */
/*  vertical-align: top; */
 	font-weight: 700;
/*  text-align: center; */
}
.aui .list-data-table .table-bordered td{
 vertical-align: top;
/*  text-align: center; */
 font-size: 12px;
/*  background-color: #fcfcfc; */
 border-top: 1px solid #ddd;
 line-height: 16px;
 padding: 5px;

#tableBonusAdjustment tbody tr td .input-xs{ 
  line-height: 10px; height: 5px; font-size: 10px; width: 100px; text-align: right; 
 } 

.aui #tableBonusAdjustment .float-label-control { /*position: relative;*/ margin-bottom: 0 px;font-size: smaller; }
   /* .aui #tableBonusAdjustment .float-label-control ::-webkit-input-placeholder { color: transparent; }
    .aui #tableBonusAdjustment .float-label-control :-moz-placeholder { color: transparent; }
    .aui #tableBonusAdjustment .float-label-control ::-moz-placeholder { color: transparent; }
    .aui #tableBonusAdjustment .float-label-control :-ms-input-placeholder { color: transparent; }*/
    .aui #tableBonusAdjustment .float-label-control input:-webkit-autofill,
    .aui #tableBonusAdjustment .float-label-control textarea:-webkit-autofill { background-color: transparent !important; -webkit-box-shadow: 0 0 0 1000px white inset !important; -moz-box-shadow: 0 0 0 1000px white inset !important; box-shadow: 0 0 0 1000px white inset !important; }
    .aui #tableBonusAdjustment .float-label-control input, .aui #tableBonusAdjustment .float-label-control textarea, .aui #tableBonusAdjustment .float-label-control label { font-size: 1.3em; box-shadow: none; -webkit-box-shadow: none; }
        .aui #tableBonusAdjustment .float-label-control input:focus,
        .aui #tableBonusAdjustment .float-label-control textarea:focus { box-shadow: none; -webkit-box-shadow: none ; border-bottom-width: 3px !important;; padding-bottom: 0 !important;; border-color:#673ab7 !important; }
        .aui #tableBonusAdjustment .float-label-control textarea:focus { padding-bottom: 4px; }
    .aui #tableBonusAdjustment .float-label-control input, .aui #tableBonusAdjustment .float-label-control textarea { display: block; width: 100%; padding: 0.1em 0em 1px 0em; border: none; border-radius: 0px; border-bottom: 1px solid #aaa !important; outline: none; margin: 0px; background: none; }
    .aui #tableBonusAdjustment .float-label-control textarea { padding: 0.1em 0em 5px 0em; }
    .aui #tableBonusAdjustment .float-label-control label { position: absolute; font-weight: normal; /*top: -1.0em;*/top: 1.9em;  left: 0.08em; color: #aaaaaa !important; z-index: -1; font-size: 0.85em; -moz-animation: float-labels 300ms none ease-out; -webkit-animation: float-labels 300ms none ease-out; -o-animation: float-labels 300ms none ease-out; -ms-animation: float-labels 300ms none ease-out; -khtml-animation: float-labels 300ms none ease-out; animation: float-labels 300ms none ease-out; /* There is a bug sometimes pausing the animation. This avoids that.*/ animation-play-state: running !important; -webkit-animation-play-state: running !important; }
    .aui #tableBonusAdjustment .float-label-control input.empty + label,
    .aui #tableBonusAdjustment .float-label-control textarea.empty + label { top: 0.1em; font-size: 1.5em; animation: none; -webkit-animation: none; }
    .aui #tableBonusAdjustment .float-label-control input:not(.empty) + label,
    .aui #tableBonusAdjustment .float-label-control textarea:not(.empty) + label { z-index: 1; }
    .aui #tableBonusAdjustment .float-label-control input:not(.empty):focus + label,
    .aui #tableBonusAdjustment .float-label-control textarea:not(.empty):focus + label { color: #aaaaaa !important; }
    .aui #tableBonusAdjustment .float-label-control.label-bottom label { -moz-animation: float-labels-bottom 300ms none ease-out; -webkit-animation: float-labels-bottom 300ms none ease-out; -o-animation: float-labels-bottom 300ms none ease-out; -ms-animation: float-labels-bottom 300ms none ease-out; -khtml-animation: float-labels-bottom 300ms none ease-out; animation: float-labels-bottom 300ms none ease-out; }
    .aui #tableBonusAdjustment .float-label-control.label-bottom input:not(.empty) + label,
    .aui #tableBonusAdjustment .float-label-control.label-bottom textarea:not(.empty) + label { top: 3em; }


@keyframes float-labels {
    0% { opacity: 1; color: #aaa; top: 0.1em; font-size: 1.5em; }
    20% { font-size: 1.5em; opacity: 0; }
    30% { top: 0.1em; }
    50% { opacity: 0; font-size: 0.85em; }
    100% { top: -1em; opacity: 1; }
}

@-webkit-keyframes float-labels {
    0% { opacity: 1; color: #aaa; top: 0.1em; font-size: 1.5em; }
    20% { font-size: 1.5em; opacity: 0; }
    30% { top: 0.1em; }
    50% { opacity: 0; font-size: 0.85em; }
    100% { top: -1em; opacity: 1; }
}

@keyframes float-labels-bottom {
    0% { opacity: 1; color: #aaa; top: 0.1em; font-size: 1.5em; }
    20% { font-size: 1.5em; opacity: 0; }
    30% { top: 0.1em; }
    50% { opacity: 0; font-size: 0.85em; }
    100% { top: 3em; opacity: 1; }
}

@-webkit-keyframes float-labels-bottom {
    0% { opacity: 1; color: #aaa; top: 0.1em; font-size: 1.5em; }
    20% { font-size: 1.5em; opacity: 0; }
    30% { top: 0.1em; }
    50% { opacity: 0; font-size: 0.85em; }
    100% { top: 3em; opacity: 1; }
}
}

input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
/* .ui-icon.ui-icon-triangle-1-s{ */
/* 	margin-top: 2px; */
/* } */
/* .ui-multiselect.ui-widget.ui-state-default.ui-corner-all{ */
/* 	padding-bottom: 4px;padding-top: 4px; */
/* } */
/* .ui-multiselect-checkboxes.ui-helper-reset input[type=checkbox]{ */
/* 	margin-bottom: 5px;margin-right: 5px;margin-top: 0px; */
/* } */
 #tableBonusAdjustment tbody tr td .input-xs{ 
 	line-height: 10px; height: 15px; font-size: 10px; width: 100px; text-align: right; 
 }
.aui #tableBonusAdjustment .float-label-control { /*position: relative;*/ margin-bottom: 0 px;font-size: smaller; }
   /* .aui #tableBonusAdjustment .float-label-control ::-webkit-input-placeholder { color: transparent; }
    .aui #tableBonusAdjustment .float-label-control :-moz-placeholder { color: transparent; }
    .aui #tableBonusAdjustment .float-label-control ::-moz-placeholder { color: transparent; }
    .aui #tableBonusAdjustment .float-label-control :-ms-input-placeholder { color: transparent; }*/
    .aui #tableBonusAdjustment .float-label-control input:-webkit-autofill,
    .aui #tableBonusAdjustment .float-label-control textarea:-webkit-autofill { background-color: transparent !important; -webkit-box-shadow: 0 0 0 1000px white inset !important; -moz-box-shadow: 0 0 0 1000px white inset !important; box-shadow: 0 0 0 1000px white inset !important; }
    .aui #tableBonusAdjustment .float-label-control input, .aui #tableBonusAdjustment .float-label-control textarea, .aui #tableBonusAdjustment .float-label-control label { font-size: 1.3em; box-shadow: none; -webkit-box-shadow: none; }
        .aui #tableBonusAdjustment .float-label-control input:focus,
        .aui #tableBonusAdjustment .float-label-control textarea:focus { box-shadow: none; -webkit-box-shadow: none ; border-bottom-width: 3px !important;; padding-bottom: 0 !important;; border-color:#673ab7 !important; }
        .aui #tableBonusAdjustment .float-label-control textarea:focus { padding-bottom: 4px; }
    .aui #tableBonusAdjustment .float-label-control input, .aui #tableBonusAdjustment .float-label-control textarea { display: block; width: 100%; padding: 0.1em 0em 1px 0em; border: none; border-radius: 0px; border-bottom: 1px solid #aaa !important; outline: none; margin: 0px; background: none; }
    .aui #tableBonusAdjustment .float-label-control textarea { padding: 0.1em 0em 5px 0em; }
    .aui #tableBonusAdjustment .float-label-control label { position: absolute; font-weight: normal; /*top: -1.0em;*/top: 1.9em;  left: 0.08em; color: #aaaaaa !important; z-index: -1; font-size: 0.85em; -moz-animation: float-labels 300ms none ease-out; -webkit-animation: float-labels 300ms none ease-out; -o-animation: float-labels 300ms none ease-out; -ms-animation: float-labels 300ms none ease-out; -khtml-animation: float-labels 300ms none ease-out; animation: float-labels 300ms none ease-out; /* There is a bug sometimes pausing the animation. This avoids that.*/ animation-play-state: running !important; -webkit-animation-play-state: running !important; }
    .aui #tableBonusAdjustment .float-label-control input.empty + label,
    .aui #tableBonusAdjustment .float-label-control textarea.empty + label { top: 0.1em; font-size: 1.5em; animation: none; -webkit-animation: none; }
    .aui #tableBonusAdjustment .float-label-control input:not(.empty) + label,
    .aui #tableBonusAdjustment .float-label-control textarea:not(.empty) + label { z-index: 1; }
    .aui #tableBonusAdjustment .float-label-control input:not(.empty):focus + label,
    .aui #tableBonusAdjustment .float-label-control textarea:not(.empty):focus + label { color: #aaaaaa !important; }
    .aui #tableBonusAdjustment .float-label-control.label-bottom label { -moz-animation: float-labels-bottom 300ms none ease-out; -webkit-animation: float-labels-bottom 300ms none ease-out; -o-animation: float-labels-bottom 300ms none ease-out; -ms-animation: float-labels-bottom 300ms none ease-out; -khtml-animation: float-labels-bottom 300ms none ease-out; animation: float-labels-bottom 300ms none ease-out; }
    .aui #tableBonusAdjustment .float-label-control.label-bottom input:not(.empty) + label,
    .aui #tableBonusAdjustment .float-label-control.label-bottom textarea:not(.empty) + label { top: 3em; }
	
	.aui #tableBonusAdjustment .float-label-control input{font-size: 12px;text-align: right;}
 @keyframes float-labels {
    0% { opacity: 1; color: #aaa; top: 0.1em; font-size: 1.5em; }
    20% { font-size: 1.5em; opacity: 0; }
    30% { top: 0.1em; }
    50% { opacity: 0; font-size: 0.85em; }
    100% { top: -1em; opacity: 1; }
}
 @-webkit-keyframes float-labels {
    0% { opacity: 1; color: #aaa; top: 0.1em; font-size: 1.5em; }
    20% { font-size: 1.5em; opacity: 0; }
    30% { top: 0.1em; }
    50% { opacity: 0; font-size: 0.85em; }
    100% { top: -1em; opacity: 1; }
}
 @keyframes float-labels-bottom {
    0% { opacity: 1; color: #aaa; top: 0.1em; font-size: 1.5em; }
    20% { font-size: 1.5em; opacity: 0; }
    30% { top: 0.1em; }
    50% { opacity: 0; font-size: 0.85em; }
    100% { top: 3em; opacity: 1; }
}
 @-webkit-keyframes float-labels-bottom {
    0% { opacity: 1; color: #aaa; top: 0.1em; font-size: 1.5em; }
    20% { font-size: 1.5em; opacity: 0; }
    30% { top: 0.1em; }
    50% { opacity: 0; font-size: 0.85em; }
    100% { top: 3em; opacity: 1; }
}

	.testOverFlow {
		max-width: 200px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.testOverFlow:hover {
		max-width: 200px;
	    text-overflow: clip;
	    white-space: normal;
	    word-break: break-all;
	}
.box {
    position: relative;
    border-radius: 3px;
    background: #ffffff;
    border-top: 4px solid #d2d6de;
    margin-bottom: 20px;
    width: 100%;
    box-shadow: 0 1px 10px rgba(0,0,0,0.1);
}
.box2 {
    position: relative;
    border-radius: 3px;
    background: #ffffff;
    border-top: 6px solid #d2d6de;
    margin-bottom: 20px;
    width: 100%;
    box-shadow: 0 1px 10px rgba(0,0,0,0.1);
}

.box-primary {
    border-top-color: #3c8dbc;
}
.box-warning {
    border-top-color: #f39c12;
}
.box-info {
    border-top-color: #00c0ef;
}
.box-success {
    border-top-color: #00a65a;
}
.box-danger {
    border-top-color: #dd4b39;
}
.box-header.with-border {
    border-bottom: 1px solid #f4f4f4;
}
.box-header {
    color: #444;
    display: block;
    padding: 10px;
    position: relative;
}
.box-header:before, .box-body:before, .box-footer:before, .box-header:after, .box-body:after, .box-footer:after {
    content: " ";
    display: table;
}
.box-header:after, .box-body:after, .box-footer:after {
    clear: both;
}
.box-header>.fa, .box-header>.glyphicon, .box-header>.ion, .box-header .box-title {
    display: inline-block;
    font-size: 18px;
    margin: 0;
    line-height: 1;
}
.box-body {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    padding: 10px;
}
.tablesorter-bootstrap .tablesorter-header i.tablesorter-icon {
    /* position: absolute; */
    right: 2px;
    top: 50%;
    margin-top: -7px;
    width: 14px;
    height: 14px;
    background-repeat: no-repeat;
    line-height: 14px;
    display: inline-block;
}
.icon-sort-color{
	color: cornflowerblue;
}
.sort-z-score:hover {
    background: #f8f8f8 !important;
}
.titlePanel {
	width: 100%;
}





.multiselect-filter-th {
	display:flex;
	align-items:center;
	justify-content:center;
	position:relative;
}

.multiselect-filter-selectBox {
  position: relative;
  width: 20px;
  cursor: pointer;
}

.multiselect-filter-selectBox select {
  width: 100%;
  font-weight: bold;
}

.multiselect-filter-overSelect {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

#multiselect-filter-checkboxes {
  display: none;
  border: 1px #dadada solid;
  text-align: left;
}

#multiselect-filter-checkboxes label {
  display: block;
}

#multiselect-filter-checkboxes label:hover {
  background-color: #1e90ff;
}

#multiselect-filter-checkboxes input[type="checkbox"] {
  vertical-align: top;
}
</style>


<body class="gray-bg">

  <div class='row-fluid'>
    <div id="slide_status" class='span12'>
      <div id="btnCloseSlide">×</div>
      <div id="slide_status_area"></div>
    </div>
  </div>


	<!-- <div class="app_url_hidden"> -->
		<div class="container" style="width: 100%">
			<div id="advanceSearchAppraisalGroup" class="ng-view ng-scope" style="display: none;">
				<div class="row-fluid">
					<!-- start--row-fluid -->

					<div class="span12">
						<div class="ibox float-e-margins">
							<div class="ibox-title">
								<div class='titlePanel'><liferay-ui:message key="advanced-search"/></div>
							</div>

							<div class="ibox-content breadcrumbs2">

                <div class="row-fluid" id='advanceSearchAppraisal'>
                  <div class="form-group pull-left span3" style="margin-left: 5px">
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

                  <div class="form-group pull-left span3" style="margin-left: 5px">
                    <select id="AppraisalEmpLevel" name="AppraisalEmpLevel" data-toggle="tooltip"
                      title="" data-original-title="<liferay-ui:message key="employee-level"/>" class="input form-control input-sm span12">
                      <option>All Level</option>
                    </select>
                  </div>
                  
                  <div class="form-group pull-left span3" style="margin-left: 5px">
                    <select id="AppraisalOrgLevel" name="AppraisalOrgLevel" data-toggle="tooltip"
                      title="" data-original-title="<liferay-ui:message key="organization-level"/>" class="input form-control input-sm span12">
                      <option>All Level</option>
                    </select>
                  </div>

                  <div class="form-group pull-left span3" style="margin-left: 5px">
                    <select data-toggle="tooltip" title="" data-original-title="<liferay-ui:message key="organization"/>"
                      class="input form-control input-sm span12" id="organization" name="organization">
                      <!-- <option>All Organization</option> -->
                    </select>
                  </div>
                  
                  <div class="form-group pull-left span3" style="margin-left: 5px">
                    <input data-toggle="tooltip" title="" data-original-title="<liferay-ui:message key="employee-name"/>"
                      class="form-control input-sm searchAdvanceText span12" placeholder="<liferay-ui:message key="employee-name"/>"
                      type="text" id="EmpName" name="EmpName" />
                      <input class="form-control input-sm" id="EmpName_id" name="EmpName_id" value="" type="hidden">
                  </div>

                  <div class="form-group pull-left span3" style="margin-left: 5px; margin-top: 2px; margin-bottom: 2px;">
                  <select data-toggle="tooltip" title="<liferay-ui:message key="Position"/>" multiple="multiple" data-original-title="<liferay-ui:message key="Position"/>" class="input form-control input-sm span12" id="Position" name="Position">
                 </select>            
                  </div>
				 
				 <div class="form-group pull-left span3" style="margin-left: 5px">
                    <select data-toggle="tooltip" title="" data-original-title="<liferay-ui:message key="form"/>" class="input form-control input-sm span12"
                      id="AppraisalForm" name="AppraisalForm">
                    </select>
                  </div>
                  
				  <div class="form-group pull-left span3" style="margin-left: 5px">
                    <select data-toggle="tooltip" title="" data-original-title="<liferay-ui:message key="status"/>" class="input form-control input-sm span12"
                      id="status" name="status">
                      <!-- <option>All Status</option> -->
                    </select>
                  </div>

<!--                   <div class="form-group pull-left span3" style="margin-left: 5px;"> -->
<%--                     <select style="display: none;" data-toggle="tooltip" title="" data-original-title="<liferay-ui:message key="manage"/>" class="input form-control input-sm span12" --%>
<!--                       id="fake_adjust" name="fake_adjust"> -->
<!--                     </select> -->
<!--                   </div> -->


                  <div class="form-group pull-right m-b-none span3" style="margin-top: 1px; margin-left: 5px; text-align:right;">
								<div class="form-group pull-right m-b-none ">
									<button type="button" name="btnSearchAdvance" id="btnSearchAdvance" class="btn btn-info input-sm " style="margin-left: 5px;">
										<i class="fa fa-search"></i>&nbsp;<liferay-ui:message key="search"/>
									</button>
								</div>
							</div>

                </div>

								</div>

							</div>
							<!-- content end -->
						</div>

					</div>

				
				<!-- end--row-fluid -->

				<div id="search_result" style="display: none;"> <!-- class="row-fluid search_result" > -->
					<div class="span12">
						<div class="ibox-title">
							<div class='titlePanel'>Salary Adjustment</div>
						</div>						
						<div class="ibox-content">
						<!-- pagination start -->
						<div class="row-fluid">
							<div class="position-result-perpage">
								<div class="pagianation_area">
									<div class="pagination_top pagination"></div>
								</div>
								<div class="object-right paging-text">
									<div class='pagingDropdown'>
										<select id='countPaginationTop'
											class="form-control input-sm countPagination">
											<option>10</option>
											<option>20</option>
											<option>50</option>
											<option>100</option>
											<option>All</option>
										</select>
									</div>
									<div class='pagingText'>
										<liferay-ui:message key="results-per-page" />
									</div>
								</div>
							</div>
						</div>
						<!-- pagination end -->
							<div id="scroll-tableBonusAdjustment" class="row-fluid list-data-table" style="overflow: auto;">							
							<table class="table table-striped table-bordered" id="tableBonusAdjustment" style="margin-bottom: 7px; max-width: none; min-height: 130px;">
							<thead>
						    <tr id="tableBonusAdjustment-head1">
						      <th rowspan="3" style="width:auto; text-align:center;"><liferay-ui:message key="no-dot"/></th>
						      <th rowspan="3" style="width:auto; text-align:center;"><liferay-ui:message key="emp-code"/></th>
						      <th rowspan="3" style="width:auto;"><liferay-ui:message key="employee-name"/></th>
						      <th rowspan="3" style="width:auto;"><liferay-ui:message key="position"/></th>
						      <th rowspan="3" style="width:auto; text-align:center;">PG</th>
						      <th rowspan="3" style="width:auto; text-align:center;">ฝ่าย</th>
						      <th rowspan="3" style="width:auto; text-align:center;">
						      	<div class="multiselect-filter-th">
							      <liferay-ui:message key="group"/>
							      <div class="multiselect-filter" onclick="showCheckboxesFilter()">
									    <div class="multiselect-filter-selectBox">
									      <select style="border: 0; background-color: #f0efef;"></select>
									      <div class="multiselect-filter-overSelect"></div>
									    </div>
									    <div style="overflow: hidden;">
									    	<div id="multiselect-filter-checkboxes"></div>
									    </div>
								  </div>
							  	</div>
						      </th>
						      <th rowspan="3" style="width:auto; text-align:center;">Job Code</th>
						      <th rowspan="3" style="width:auto;">Position Code</th>
						      <th rowspan="3" style="width:auto;">คะแนนเต็มตีค่างาน<br>(ความรู้)</th>
						      <th rowspan="3" style="width:auto;">คะแนนเต็มตีค่างาน<br>(ศักยภาพ)</th>
						      <th rowspan="3" style="width:auto;">Total Point</th>
						      <th rowspan="3" style="width:auto;">Baht/Point</th>
						      <th rowspan="3" style="width:auto;">ผลการประเมินค่างาน<br>(65 คะแนน )</th>
						      <th rowspan="3" style="width:auto;">คะแนนความรู้</th>
						      <th rowspan="3" style="width:auto;">คะแนนศักยภาพ</th>
						      <th rowspan="3" style="width:auto;">คะแนนผลงานปีที่ผ่านมา<br>(20 คะแนน )</th>
						      <th rowspan="3" style="width:auto;">คะแนนความสามารถที่มีคุณค่าต่อองค์กร<br>(15 คะแนน )</th>
						      <th rowspan="3" style="width:auto;">คะแนนประเมิน Mgr.</th>
						      <th rowspan="3" style="width:auto;">คะแนนประเมิน BU.</th>
						      <th rowspan="3" style="width:auto;">คะแนนประเมิน COO.</th>
						      <th rowspan="3" style="width:auto;">เกรด</th>
						      <th colspan="3" style="width:auto; text-align:center;">รายได้จากการคำนวนตีค่างาน</th>
						      <th colspan="7" style="width:auto; text-align:center;">รายได้ปัจจุบัน</th>
						      <th rowspan="3" style="width:auto;">ขาด/เกิน</th>
						      <th rowspan="3" style="width:auto;">Cal Standard</th>
						      <th colspan="2" style="width:auto; text-align:center;">% Cal</th>
						      <th colspan="4" style="width:auto; text-align:center;">รายได้ที่เปลี่ยนแปลง</th>
						      <th colspan="7" style="width:auto; text-align:center;">รายได้ใหม่</th>
						    </tr>
						    <tr id="tableBonusAdjustment-head2">
						 	  <th rowspan="2" style="width:auto;">รายได้รวมที่ควรได้ 90% ไม่รวม Bonus</th>
						      <th rowspan="2" style="width:auto;">รายได้ Fixที่ควรได้ 65%</th>
						      <th rowspan="2" style="width:auto;">รายได้ Var ที่ควรได้25%</th>
						      <th rowspan="2" style="width:auto;">รายได้ปัจจุบัน Total</th>
						      <th colspan="3" style="width:auto; text-align:center;">FIX65%</th>
						      <th colspan="3" style="width:auto; text-align:center;">VAR25%</th>
						      <th rowspan="2" style="width:auto;">%</th>
						      <th rowspan="2" style="width:auto;">Bath</th>
						      <th rowspan="2" style="width:auto;">ปรับรายได้  Total</th>
						      <th rowspan="2" style="width:auto;">ปรับเงินเงินเดือน</th>
						      <th rowspan="2" style="width:auto;">ปรับ P-QPI</th>
						      <th rowspan="2" style="width:auto;">% Diff</th>
						      <th rowspan="2" style="width:auto;">รายได้ใหม่ Total</th>
 							  <th colspan="3" style="width:auto; text-align:center;">FIX65%</th>
						      <th colspan="3" style="width:auto; text-align:center;">VAR25%</th>
						    </tr>			
						     <tr id="tableBonusAdjustment-head3">
						      <th style="width:auto;">Salary</th>
						      <th style="width:auto;">P-QPI</th>
						      <th style="width:auto;">อื่นๆ</th>
						      <th style="width:auto;">MPI</th>
						      <th style="width:auto;">PI</th>
						      <th style="width:auto;">อื่นๆ</th>
						      <th style="width:auto;">Salary</th>
						      <th style="width:auto;">P-QPI</th>
						      <th style="width:auto;">อื่นๆ</th>
						      <th style="width:auto;">MPI</th>
						      <th style="width:auto;">PI</th>
						      <th style="width:auto;">อื่นๆ</th>
						    </tr>
							</thead>
							<tbody id="list_empjudege">
							</tbody>
							</table>
							</div>
							<!-- pagination start -->
							<div class="row-fluid">
								<div class="position-result-perpage">
									<div class="pagianation_area">
										<p class="pagination_bottom pagination"></p>
									</div>
									<div class="object-right paging-text">
										<div class='pagingDropdown'>
											<select id='countPaginationBottom'
												class="form-control input-sm countPagination">
												<option>10</option>
												<option>20</option>
												<option>50</option>
												<option>100</option>
												<option>All</option>
											</select>
										</div>
										<div class='pagingText'>
											<liferay-ui:message key="results-per-page" />
										</div>
									</div>
								</div>
							</div>
							<!-- pagination end -->
							<div class='row-fluid head_adjust' style="margin-top: 10px; display: none;">
								<div class="position-result-perpage">
									 <div class="">
										 <div class="form-group p-xxs" style="display: flex;">
											 <label class="p-t-xxs" style="text-align: center;"><b><liferay-ui:message key="action"/>&nbsp;:&nbsp;</b></label>
											 <div>
												<select style="min-width: 150px;" data-toggle="tooltip" title="" class="input form-control input-sm" id="actionToAssign" name="actionToAssign">
												</select>
											 </div>
										 </div>
									 </div>
							  		<div style='text-align:right; display: flex;'>
							  			<label style="display: none;" id="fake_adjust_box" class="p-t-xxs" style="text-align: center;"><b><liferay-ui:message key="judge-name"/>&nbsp;:&nbsp;</b></label>
								  		<select style="display: none; min-width: 150px;" class="input form-control input-sm"
					                      id="fake_adjust" name="fake_adjust">
					                    </select>&nbsp;
								  	<button class="btn btn-success" type="button" id="btnSubmit"><liferay-ui:message key="submit"/></button>
									<input type='hidden' id='emp_result_id' name='emp_result_id' value=''>
										<%--<button data-dismiss="modal" class="btn btn-danger btnCancle" type="button"><liferay-ui:message key="cancel"/></button> --%>
							  		</div>
						  		</div>
							</div>
					 		<div class="row-fluid" style='text-align:left;'></div>
						  	<div class="alert alert-warning" id="information" style="display: none; margin-bottom: 10px;"></div>



							
							<!-- end table -->
						</div>
						<!-- content end -->
					</div>
				</div>


			</div>
	</div>
	
	<!-- Modal Confirm Start -->
	<div aria-hidden="true" role="dialog" tabindex="-1" id="confrimModal"
		class="modal inmodal in" style="width:400px;left:calc;display: none;">
		<div class="modal-dialog">
			<div class="modal-content  bounceInRight">
				<div class="modal-header">
					<button data-dismiss="modal" class="close" type="button" style="padding-top:5px">
						<span aria-hidden="true"><i class='fa fa-times'></i></span>
					</button>
					<h5 class="modal-title"><liferay-ui:message key="confirm-dialog"/></h5>
				</div>
				<div class="modal-body">
					<div class="form-kpi-mangement">
						<div class="form-kpi-label" align="center">
							<label id="fake_adjust_name"></label>
							<div id="" class='information'></div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<div align="center">
						<button class="btn btn-success" id="btnConfirmYes" type="button"><liferay-ui:message key="submit"/></button>
						<button data-dismiss="modal" class="btn btn-danger btnCancle" type="button"><liferay-ui:message key="cancel"/></button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- Modal Confirm End -->
	
	<div id="embedParamSearch"></div>
	
	</body>
	
<!-- Language Template for js -->
<%@ include file="/html/language-js-template/view.jsp" %>
	
<script src="/see-kpi-portlet/js/jquery3.1.1.js"></script>
<script type="text/javascript">
 var jQuery_1_1_3 = $.noConflict(true);
</script>
