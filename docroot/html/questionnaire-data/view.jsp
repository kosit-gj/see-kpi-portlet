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
	String username = themeDisplay.getUser().getScreenName();
	String password = (String) request.getSession().getAttribute(WebKeys.USER_PASSWORD);
	layout = themeDisplay.getLayout();
	plid = layout.getPlid();
	
%>
<input type="hidden" id="user_portlet" name="user_portlet" value="<%=username%>">
<input type="hidden" id="pass_portlet" name="pass_portlet" value="<%=password%>">
<input type="hidden" id="url_portlet" name="url_portlet" value="<%= renderRequest.getContextPath() %>">
<input type="hidden" id="plid_portlet" name="plid_portlet" value="<%= plid %>">
<style>
.input-to-button {
    width: 200px;
    height: 20px;
    padding-right: 50px;
}

.button-to-input {
    margin-left: -50px;
    height: 25px;
    width: 50px;
    background: blue;
    color: white;
    border: 0;
    -webkit-appearance: none;
}
/*
.aui .table td {
	background-color: #ffffff;
	border: none;
}*/

.aui .breadcrumbs2 {
	background: rgba(0, 0, 0, 0)
		linear-gradient(to bottom, #fff 0px, #f6f6f6 47%, #ededed 100%) repeat
		scroll 0 0;
	border-radius: 0;
	margin-bottom: 0;
	padding-bottom: 0px
}

.aui #breadcrumbs {
	margin-bottom: 0px;
}

.portlet-content, .portlet-minimized .portlet-content-container {
	background-color: #fafafa;
}

.aui .countPagination {
	width: 70px;
	margin-bottom: 0px:
}

.aui .popover {
	width: 80px;
}

.aui .popover-content {
    padding: 5px;
}


.aui .pagination {
	margin: 5px 0;
}

.pagingDropdown {
	float: right;
	padding-top: 5px;
}

.aui .btn {
	font-size: 14px;
	padding: 5px 12px;
	width: auto;
	margin-top: 0px;
	display: inline;
}

.aui input[type="color"], .aui input[type="date"], .aui input[type="datetime"],
	.aui input[type="datetime-local"], .aui input[type="email"], .aui input[type="month"],
	.aui input[type="number"], .aui input[type="password"], .aui input[type="search"],
	.aui input[type="tel"], .aui input[type="text"], .aui input[type="time"],
	.aui input[type="url"], .aui input[type="week"], .aui select, .aui textarea,
	.aui .input-prepend .add-on, .aui .navbar-search .search-query, .aui .uneditable-input
	{
	font-size: 14px;
	height: auto;
	line-height: normal;
}

.p-t-xxs {
	padding-top: 5px;
}

.p-t-xs {
	padding-top: 10px;
}

.p-b-xxs {
	padding-bottom: 5px;
}

.p-b-xs {
	padding-bottom: 10px;
}

.aui .form-horizontal .form-group {
	margin-left: 0px;
	margin-right: 0px;
}

.aui .form-horizontal .checkbox, .aui .form-horizontal .checkbox-inline,
	.aui .form-horizontal .radio, .aui .form-horizontal .radio-inline {
	margin-bottom: 0;
	margin-top: 0;
	padding-top: 0px;
}

.aui #ui-datepicker-div, .aui .ui-datepicker {
	z-index: 99999 !important;
}

.aui .from_data_role, .aui  .selectEmpCheckbox {
	cursor: pointer;
	height: 17px;
	width: 17px;
}

.aui .checkbox label, .aui .radio label {
	cursor: default;
}

/* new */
.aui .modal-header .close{
	font-size: 1.4em !important;
    margin-top: 4px !important;
    padding-top: 5px !important;
}
.aui .ui-autocomplete{
	z-index: 1300;
}
.aui #from_emp_type {
	width: 170px;
}

.aui #employee_list_content {
	display: none;
}

.aui .form-group {
	margin-bottom: 5px;
}

.aui .control-label {
	cursor: default;
}

.aui input[type="radio"], .aui  input[type="checkbox"] {
	margin: 1px 0 0;
}

.ibox-title {
	padding: 1px 10px;
}

.ibox-content {
	background-color: #fff;
	border: 1px solid #ffe57f;
	color: inherit;
	margin-bottom: 5px;
	padding-left: 15px;
	padding-right: 15px;
}

.aui h5 {
	margin: 7px 0;
}

.gray-bg {
	background-color: #f3f3f4;
}

#objectCenter {
	text-align: center;
	vertical-align: middle;
}

.aui .checkbox input[type="checkbox"] {
	opacity: 1;
	z-index: 1;
}


.aui .modal {
	top: 2%;
}

#container {
	width: 93.5%;
}

/* Large desktop */
@media ( max-width : 1310px) {
	.aui [class*="span"], .aui  .uneditable-input[class*="span"], .aui .row-fluid [class*="span"]
		{
		display: block;
		float: none;
		width: 100%;
		margin-left: 0;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
}
@media ( min-width : 1200px) {
	.modal.large {
		    width: 90%;
		    margin-left:-45%;
		    top:0px;
		}
		
	.aui #confrimModal {
		left: 50%;
	}
}

/* Portrait tablet to landscape and desktop */
@media ( min-width : 980px) and (max-width: 1199px) {
		.modal.large {
		    width: 90%;
		    margin-left:-45%;
		    top:0px;
		}
		
	.aui #confrimModal {
		left: 50%;
	}
}

@media ( min-width : 768px) and (max-width: 979px) {
		.modal .large {
		    width: 90%;
		    margin-left:-45%;
		    top:0px;
		}
		
	.aui #confrimModal {
		left: 15%;
		right: 15%;
	}
	
	#ModalLevel {
		left: 15%;
		right: 15%;
	}
	
	#ModalImport {
		left: 15%;
		right: 15%;
	}
	
	.aui .ResultsPerPageTop {
		position: absolute;
		left: -20px;
		top: 46px;
	}
	.aui .ResultsPerPageBottom {
		position: relative;
		top: -40px;
	}
	.aui [class*="span"], .aui  .uneditable-input[class*="span"], .aui .row-fluid [class*="span"]
		{
		display: block;
		float: none;
		width: 100%;
		margin-left: 0;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
	.aui #widthPersenTop {
		width: 10.1%;
	}
	.aui #widthPersenBottom {
		width: 11%;
	}
	.aui .txtCountPaginationTop {
		position: absolute;
		left: -14.9%;
		top: 51px;
		width: 41.66666667%;
	}
	.aui .selectCountPaginationTop {
		position: absolute;
		left: 86.5%;
		top: 51px;
		width: 24%;
	}
	.aui .txtCountPaginationBottom {
		left: -11.5%;
		top: -45px;
		width: 43.96666667%;
		position: relative;
	}
	.aui .selectCountPaginationBottom {
		left: 90.1%;
		top: -75px;
		width: 25%;
		position: relative;
	}
}
@media ( min-width : 766px) and (max-width: 768px) {
		#confrimModal {
		left: 20% !important;
		right: 20% !important;
		}
		.modal.large {
		    width: 90%;
 		    margin-left:-45%; 
		    top:0px;
		    left: 5%;
			right: 5%;
		}
	}
/* Landscape phone to portrait tablet */
@media ( max-width : 767px) {
	.modal.large {

	    width: 90%;
	    top:0px;
	}
	
	#confrimModal {
		left: 20% !important;
		right: 20% !important;
	}
	.aui .ResultsPerPageTop {
		position: absolute;
		left: -20px;
		top: 46px;
	}
	.aui .ResultsPerPageBottom {
		position: relative;
		top: -40px;
	}
	@media ( min-width : 481px) and (max-width: 615px) {
		.aui .height-32-px {
			height: 42px
		}
		.aui #confrimModal {
			left: 10%;
			right: 10%;
		}
		.aui .ResultsPerPageTop {
			position: absolute;
			left: -20px;
			top: 46px;
		}
		.aui .ResultsPerPageBottom {
			position: static;
		}
	}
	.aui #width-100-persen {
		
	}
	.aui #widthPersenTop {
		width: 10.3%;
	}
	#widthPersenBottom {
		width: 11.2%;
	}
	.aui .txtCountPaginationTop {
		position: absolute;
		left: -14.9%;
		top: 51px;
		width: 41.66666667%;
	}
	.aui .selectCountPaginationTop {
		position: absolute;
		left: 86.5%;
		top: 51px;
		width: 24%;
	}
	.aui .txtCountPaginationBottom {
		left: -11.5%;
		top: -45px;
		width: 43.96666667%;
		position: relative;
	}
	.aui .selectCountPaginationBottom {
		left: 90.1%;
		top: -75px;
		width: 25%;
		position: relative;
	}
}

/* Landscape phones and down */
@media ( max-width : 480px) {
	.aui #from_emp_type {
		width: 100%;
	}
	.aui 	#confrimModal {
		left: 1% !important;
		right: 1% !important;
	
	}
	.aui .ResultsPerPageBottom {
		position: static;
	}
	.aui #width-100-persen {
		width: 110%;
	}
	.aui #widthPersenTop {
		width: 17%;
	}
	.aui #widthPersenBottom {
		width: 19.1%;
	}
	.aui .height-32-px {
		height: 42px
	}
	.aui .txtCountPaginationTop {
		position: absolute;
		left: -25%;
		top: 40px;
		width: 41.66666667%;
	}
	.aui .selectCountPaginationTop {
		position: absolute;
		left: 78.5%;
		top: 42px;
		width: 24%;
	}
	.aui .txtCountPaginationBottom {
		left: -21.2%;
		top: -5px;
		width: 43.96666667%;
		position: relative;
	}
	.aui .selectCountPaginationBottom {
		left: 82.9%;
		top: -34px;
		width: 25%;
		position: relative;
	}
	.aui .modalRemark {
		width: 320px !important;
	}
	.aui .modal_remark {
		min-height: 0px !important;
	}
 	.aui .footer-remark {
 		padding: 10px 12px 12px; 
 	} 
	#modalQuestionaireData select, #modalQuestionaireData textarea, #modalQuestionaireData input[type="text"], #modalQuestionaireData .uneditable-input {
		margin-bottom: 0px !important;
	}
}

   #modalQuestionaireData .panel {
		padding: 15px;
		margin-bottom: 10px;
		background-color: #ffffff;
		border: 1px solid #dddddd;
		border-radius: 4px;
		-webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
		padding-bottom: 20px;
	}

	#modalQuestionaireData  .panel-heading {
		padding: 10px 15px;
		margin: -15px -15px 10px;
		font-size: 15px;
		font-weight: 500;
		background-color: #f5f5f5;
		border-bottom: 1px solid #dddddd;
		border-top-right-radius: 3px;
		border-top-left-radius: 3px;
	}

	#modalQuestionaireData  .panel-footer {
		padding: 10px 15px;
		margin: 15px -15px -15px;
		background-color: #f5f5f5;
		border-top: 1px solid #dddddd;
		border-bottom-right-radius: 3px;
		border-bottom-left-radius: 3px;
	}

	#modalQuestionaireData  .panel-primary {
		border-color: #428bca;
	}

	#modalQuestionaireData  .panel-primary .panel-heading {
		/*color: #ffffff;
		background-color: #428bca;
		border-color: #428bca;
		line-height: 25px;*/
		background-color: #046cb4 !important;
  		border-color: #046cb4;
  		color: #ffffff;
  		line-height: 15px;
	}
	#modalQuestionaireData  .panel-hello .panel-heading {
		color: #ffffff;
		background-color: #5fb962;
		border-color: #5fb962;
		line-height: 15px;
	}

	#modalQuestionaireData  .panel-success {
		border-color: #d6e9c6;
	}

	#modalQuestionaireData  .panel-success .panel-heading {
		color: #468847;
		background-color: #dff0d8;
		border-color: #d6e9c6;
	}

	#modalQuestionaireData  .panel-warning {
		border-color: #fbeed5;
	}

	#modalQuestionaireData  .panel-warning .panel-heading {
		color: #c09853;
		background-color: #fcf8e3;
		border-color: #fbeed5;
	}

	#modalQuestionaireData  .panel-danger {
		border-color: #eed3d7;
	}

	#modalQuestionaireData  .panel-danger .panel-heading {
		color: #b94a48;
		background-color: #f2dede;
		border-color: #eed3d7;
	}

	#modalQuestionaireData  .panel-info {
/* 		border-color: #bce8f1; */
		border-color: #eaeef4 !important;
	}

	#modalQuestionaireData  .panel-info .panel-heading {
	/*
		color: #3a87ad;
		background-color: #d9edf7;
		border-color: #bce8f1;*/
		background-color:#666666 !important;
  		border-color: #eaeef4 !important;
  		color: #ffffff !important;
	}
	


	#modalQuestionaireData  .well{
		padding-bottom: 15px;
	    padding-top: 10px;
		margin-bottom: 10px;
		background: #ffeecc;
		border-color: #ffeecc;
	}
#modalQuestionaireData select, 
#modalQuestionaireData textarea, 
#modalQuestionaireData input[type="text"],
#modalQuestionaireData .uneditable-input{
	display: inline-block;
/* 	height: 20px; */
	padding: 4px 6px;
	margin-bottom: 10px;
	font-size: 14px;
	line-height: 20px;
	color: #555555;
	vertical-align: middle;
	-webkit-border-radius: 4px;
	-moz-border-radius: 4px;
	border-radius: 4px;
}
#modalQuestionaireData table select{
	margin-bottom: 00px;
}
#modalQuestionaireData select,
#modalQuestionaireData textarea, 
#modalQuestionaireData input[type="text"], 
#modalQuestionaireData .uneditable-input{
/* 	background-color: #ffffff; */
	border: 1px solid #cccccc;
	-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
	-moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
	box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
	-webkit-transition: border linear 0.2s, box-shadow linear 0.2s;
	-moz-transition: border linear 0.2s, box-shadow linear 0.2s;
	-o-transition: border linear 0.2s, box-shadow linear 0.2s;
	transition: border linear 0.2s, box-shadow linear 0.2s;
}
#modalQuestionaireData label, 
#modalQuestionaireData input, 
#modalQuestionaireData select,
#modalQuestionaireData textarea {
    font-size: 15px !important;
}
.aui #modalQuestionaireData .table-bordered th{
background-color: #666666 !important;color: #ffffff;
}
.aui #modalQuestionaireData .panalRetailList .table-bordered th{
background-color: #6666b3 !important;color: #ffffff;
}/*#6666b3*/
.aui .ui-accordion .ui-accordion-header {

    display: block;
    cursor: pointer;
    position: relative;
    margin: 2px 0 0 0;
    padding: .5em .5em .5em .7em;
    font-size: 100%;

}
.aui .accordion-modal h3,
.aui #listData h3 {
	font-weight: normal;
    line-height: 25px !important;
    font-weight: bold;

}
.aui  .ui-state-active {

    background: #00a0d4 none repeat scroll 0 0 !important;
    border: 1px solid #ffffff !important;
    color: #ffffff !important;
    

}
.aui .ui-accordion .ui-accordion-content {

    padding-right: 3px !important;
    padding-left: 3px !important;

}

.aui .col1 {

    width: 80%;

}
.aui .col2 {

    width: 20%;
    min-width: 51px;

}
.aui #slideStageHistory{
	display: none;
}
-webkit-overflow-scrolling: touch ; 
/* overflow-scrolling:touch !important; */
overflow:auto;
}



.aui .closePanelScore:hover {

    color: red;
    text-decoration: none;
    cursor: pointer;
    opacity: .7;

}
.aui .closePanelScore {

    padding: 0;
    cursor: pointer;
    background: transparent;
    border: 0;
    -webkit-appearance: none;
    float: right;
    font-size: 22px;
    font-weight: bold;
    line-height: 22px;
    color: red;
    opacity: .9;

}
.aui .list-data-table .table-bordered th{
	background-color: #666666 !important;
	color: #ffffff;
	vertical-align: top;
	text-align: center;
}

.aui .list-data-table .table-bordered td{
	vertical-align: top;
	text-align: center;
}

.aui .list-data-table .table-bordered td .btn-gear{
	width: 100%;
}
.aui #modalQuestionaireData .modal-body {
    max-height: calc(100vh - 206px);
    overflow-y: auto;
}

.aui #modalQuestionaireData .cursorNotAllowed {
cursor: not-allowed !important;
}

.aui .fix-width-button {
	width: 90px;
}



</style>

<div class='row-fluid '>
	<div class='col-xs-12'>
		<div id="slide_status" class="span12" style="z-index: 9000;">
<!-- 			<div id="btnCloseSlide"><i class='fa fa-times'></i></div> -->
			<div id="slide_status_area"></div>
		</div>
	</div>
</div>

<div class="app_url_hidden" style="display: block;">
	<div class="row-fluid app_url_hidden">
		<!-- start--row-fluid -->
		<div class="span12">
			<div class="ibox float-e-margins">
				<div class="ibox-title" style="background-color: rgb(83, 120, 253); border-color: rgb(83, 120, 253); min-height: 0px;">
					<h5>ค้นหา</h5>
				</div>
				<div class="ibox-content breadcrumbs2 advance-search" style="border-color: rgb(83, 120, 253);">
					<div class="row-fluid">
						<div class="span3">
				          <label for="search_questionaire_type_id">เลือกประเภทแบบฟอร์ม</label>
				          <select id="search_questionaire_type_id" class="span12" name="search_questionaire_type_id"></select>
				        </div>
						<div class="span3">
				          <label for="search_datepicker_start">วันที่เริ่มต้น</label>
				          <input id="search_datepicker_start" class="span12" type="text" placeholder="">
				        </div>
				        <div class="span3">
				          <label for="search_datepicker_end">วันที่สิ้นสุด</label>
				          <input id="search_datepicker_end" class="span12" type="text" placeholder="">
				        </div>
				        <div class="span3">
				          <label for="search_empsnapshot">ชื่อ/รหัสเขตพนักงาน</label>
				          <input id="search_empsnapshot" class="span12" type="text" placeholder="">
				          <input class="form-control input-sm" id="search_empsnapshot_id" name="search_empsnapshot_id" value="" type="hidden">
				        </div>
					</div>
					<div class="row-fluid">
						<div class="span12">
							<div style="float: right;">
					    		<button id="btn-search" class="btn btn-info"><i class="icon-search icon-white"></i>&nbsp;&nbsp;Search</button>
					    		<button id="btn-add" data-backdrop="static" data-keyboard="false" class="btn btn-success"><i class="icon-plus-sign icon-white"></i>&nbsp;&nbsp;Add Form</button>
				        	</div>
				        	<div style="clear: both; margin-bottom: 8px;"></div>
				        </div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<div class="row-fluid" style="display: none;" id="QuestionnaireData_list_content">
	    <div class="span12">
	        <div class="ibox-title">
	            <div class='titlePanel'>ข้อมูลการประเมินผลการทำงานของพนักงานขาย (TSE)</div>
	        </div>
	        <div class="ibox-content">
	            <div id="listData"></div>
	        </div>
	    </div>
	</div>

<input type="hidden" name="id" id="id" value="">
<input type="hidden" name="action" id="action" value="add">
<input type="hidden" name="action_modal" id="action_modal" value="" view_comment_flag="">
	<!-- Modal KPI Start Edit -->
	  <div aria-hidden="true" role="dialog" tabindex="-1" id="modalQuestionaireData" class="modal inmodal large" style="display: none;">
	    <div class="modal-dialog">
	    <div class="modal-content bounceInRight">
	            <div class="modal-header">
	                <button class="close btnCancle" type="button"><span aria-hidden="true"><i class='fa fa-times'></i></span><span class="sr-only"></span></button>
	                <h4 class="modal-title" id="modalTitleRole"> </h4>
	            </div>
	            <div class="modal-body">
<!-- 	            ----- -->

<div class="panel panel-default " id="panel-main-modal" style="padding-bottom: 15px; display: show; ">
          <!-- background-color: #eaf2ff; -->
          <div class="panel-body">
            <div class="row-fluid">
              <div class="span3">
				<label for="modal_datepicker_start">วันที่</label>
					<input id="modal_datepicker_start" class="span12" type="text" placeholder="Start Date">
			  </div>
			  <div class="span3">
				<label for="modal_empsnapshot_name">ชื่อ/รหัสเขตพนักงาน</label>
					<input id="modal_empsnapshot_name" class="span12" type="text" placeholder="">
					<input class=" input-sm" id="modal_empsnapshot_id" name="modal_empsnapshot_id" value="" type="hidden">
					<input class=" input-sm" id="modal_position_code" name="modal_position_code" value="" type="hidden">
			  </div>
			  <div class="span3">
				<label for="modal_agent_name">แบบสอบถาม</label> 
					<select id="modal_questionaire_type_id" class="span12"
							name="modal_questionaire_type_id">
					</select>
			  </div>
			  <div class="span3">
				<label for="modal_agent_name">ชื่อผู้แทนจำหน่าย</label>
					<input id="modal_agent_name" class="span12" type="text" placeholder="" disabled>
			  </div>
			  
            </div>
            <div class="row-fluid">
            	<div class="span3">
					<label for="modal_assign_name">ชื่อผู้ทำประเมิน</label>
					<input id="modal_assign_name" class="span12" type="text" placeholder="" disabled>
			  	</div>
            </div>
          </div>
        </div>
<!-- 	               ********************************************************* -->
<div id="accordionListQuestionaireData" class="accordion-modal">
</div>
				<div class="row-fluid" style="text-align: left; margin-top: 15px;" >
					<a href="#" id="slideUpDownStageHistory" style="">Work Flow Stage History</a>
					<div class="table-responsive" style="overflow:auto;">
					<div id="slideStageHistory" >
							<table class="table" style="max-width: none; ">
								<thead >
									<tr style="white-space: nowrap;">
										<th style="width: 10%">ร้านค้า</th>
										<th style="width: 20%">Remark</th>
										<th style="width: 15%">Created Datetime</th>
										<th style="width: 12.5%">From Stage</th>
										<th style="width: 15%">Assessor Name</th>
										<th style="width: 12.5%">To Stage</th>
										<th style="width: 15%">TSE Name</th>
									</tr>
								</thead>
								<tbody id="listDataStageHistory">
									
								</tbody>
							</table>
						</div>
					</div>
				</div>
<!-- 						********************************************************* -->
		   			<div id="listQuestionaireData"></div>
		   			<form id="linkParam" method="POST" target="_blank" action="">
						<input type="hidden" id="linkParam_questionaire_type_id" name="questionaire_type_id" value="">
						<input type="hidden" id="linkParam_data_header_id" name="data_header_id" value="">
<!-- 						<input type="hidden" id="linkParam_questionaire_id" name="questionaire_id" value=""> -->
						<input type="hidden" id="linkParam_assessor_id" name="assessor_id" value="">
						<input type="hidden" id="linkParam_emp_snapshot_id" name="emp_snapshot_id" value="">
						<input type="hidden" id="linkParam_questionaire_date" name="questionaire_date" value="">

					</form>
	            </div>
				<div class="modal-footer footer-remark">
<!-- 					<button class="btn btn-success" type="button" id="btnSubmitUpdate">Save</button> -->
<!-- 					<button data-dismiss="modal" class="btn btn-danger btnCancle" -->
<!-- 						type="button">Cancel</button> -->
					<div class="alert alert-warning information" id="information2"
						style="display: none;"></div>


					<div class="row-fluid">
						<div  style="text-align: left; " class="span12 modalRemark">
<!-- 						<label for="modal_remark" >Remark:</label>  -->
						<textarea row="3" class="span12 modal_remark" id="modal_remark" placeholder="Remark" style="resize: vertical;max-height: 56px;min-height: 56px;"></textarea>
						
						</div>
					</div>


					<div class="row-fluid">
						<div>
							<div style="display: inline;" id="genBtnStage">
								<button class="btn btn-success" type="button" style="margin-left: 5px;margin-top: 5px;" id="btnSubmit">Save</button>
								<button class="btn btn-success" type="button" style="margin-left: 5px;margin-top: 5px;" id="btnCompleted">Completed</button>
								
							</div>
							<div style="float: right;">
								<button class="btn btn-danger btnCancle" type="button" style="margin-left: 5px;margin-top: 5px;">Cancel</button>
							</div>
						</div>
					</div>



				</div>
	        </div>
	    </div>
	    
	</div>                      
	<!-- Modal KPI End Edit -->
	
 <!-- Modal Warning Start -->
	<div aria-hidden="true" role="dialog" tabindex="-1" id="ModalWarning"
		class="modal inmodal in" style="width:400px;left:calc;display: none;">
		<div class="modal-dialog">
			<div class="modal-content  bounceInRight">
				<div class="modal-header">
					<h5 class="modal-title">Warning</h5>
				</div>
				<div class="modal-body">
					<!-- content start -->
					<div class="form-kpi-mangement">
						<div class="form-kpi-label" align="center">

							<label id="">คุณไม่สามารถเพิ่มหรือแก้ไขแบบฟอร์มในช่วงปิดปรับปรุงระบบ</label>
							
						</div>
					</div>
					<!-- content end -->
				</div>
				<div class="modal-footer">
					<div align="center">
						<button data-dismiss="modal" class="btn btn-danger fix-width-button" id="" type="button"> <i class="fa fa-times-circle"></i>&nbsp;Close </button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- Modal Warning End -->
	<!-- Modal Confirm Start -->
	<div aria-hidden="true" role="dialog" tabindex="-1" id="confrimModal"
		class="modal inmodal in" style="width:400px;left:calc;display: none;">
		<div class="modal-dialog">
			<div class="modal-content  bounceInRight">
				<div class="modal-header">
					<button data-dismiss="modal" class="close" type="button" style="padding-top:5px">
						<span aria-hidden="true"><i class='fa fa-times'></i></span>
					</button>
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

							<label id="inform_label_confirm">คุณต้องการลบการประเมินร้านค้า?</label>
							<div id="inform_on_confirm" class='information'></div>
						</div>
					</div>

					<!-- form start -->
					<!-- content end -->
				</div>
				<div class="modal-footer">
					<div align="center">
						<button class="btn btn-success fix-width-button" id="btnConfirmOK" type="button">
							&nbsp;&nbsp;<i class="fa fa-check-circle"></i>&nbsp;&nbsp;Yes&nbsp;&nbsp;
						</button>
						<button data-dismiss="modal" class="btn btn-danger fix-width-button" type="button"> <i class="fa fa-times-circle"></i>&nbsp;No </button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- Modal Confirm End -->
	
	<!-- Modal Confirm Start -->
	<div aria-hidden="true" role="dialog" tabindex="-1" id="confrimModalNextAssign"
		class="modal inmodal in" style="width:400px;left:calc;display: none;">
		<div class="modal-dialog">
			<div class="modal-content  bounceInRight">
				<div class="modal-header">
<!-- 					<button data-dismiss="modal" class="close" type="button" style="padding-top:5px"> -->
<!-- 						<span aria-hidden="true"><i class='fa fa-times'></i></span> -->
<!-- 					</button> -->
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

							<label id="">คุณต้องการประเมินต่อหรือไม่?</label>
							<div id="" class='information'></div>
						</div>
					</div>

					<!-- form start -->
					<!-- content end -->
				</div>
				<div class="modal-footer">
					<div align="center">
						<button class="btn btn-success fix-width-button" id="btnConfirmYes" type="button">
							&nbsp;&nbsp;<i class="fa fa-check-circle"></i>&nbsp;&nbsp;Yes&nbsp;&nbsp;
						</button>
						<button data-dismiss="modal" class="btn btn-danger fix-width-button" id="btnConfirmNo" type="button"> <i class="fa fa-times-circle"></i>&nbsp;No </button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- Modal Confirm End -->
	
	
	
</div>
