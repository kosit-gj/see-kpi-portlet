<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<%@ taglib uri="http://alloy.liferay.com/tld/aui" prefix="aui"%>
<%@ page import="javax.portlet.*"%>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://liferay.com/tld/theme" prefix="liferay-theme" %>
<%@ page import="com.liferay.portal.kernel.util.WebKeys" %>
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
layout = themeDisplay.getLayout();
plid = layout.getPlid();
//out.print(username);
//out.print("password2="+password);

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
.aui .url_report_cursor,.aui .cursorNotAllowed,
.aui #ModalQuestionnaire .cursorNotAllowed tr:hover > td,
.aui #ModalQuestionnaire .cursorNotAllowed tr:hover > th {
cursor: not-allowed !important;
}

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

.popover {
	width: 150px;
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

.aui .modal-body .form-horizontal .form-group {
	margin-left: 0px;
	margin-right: 0px;
	margin-bottom: 10px;
}

.aui .form-horizontal .checkbox, .aui .form-horizontal .checkbox-inline,
	.aui .form-horizontal .radio, .aui .form-horizontal .radio-inline {
	margin-bottom: 0;
	margin-top: 0;
	padding-top: 0px;
}

#ui-datepicker-div, .ui-datepicker {
	z-index: 99999 !important;
}

/* new */
.aui .modal-header .close {
	font-size: 1.4em !important;
	margin-top: 4px !important;
	padding-top: 5px !important;
}

.aui #Questionnaire_list_content {
	display: none;
}

.aui .form-group {
	margin-bottom: 5px;
}

.aui .control-label {
	cursor: default;
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
}

.aui .modal {
	top: 2%;
}
/* Large desktop */
@media ( min-width : 1200px) {
	#confrimModal {
		left: 51%;
	}
	.modal.large {
		width: 90%;
		margin-left: -45%;
		top: 0px;
	}
}

/* Portrait tablet to landscape and desktop */
@media ( min-width : 980px) and (max-width: 1199px) {
	#confrimModal {
		left: 57%;
	}
	.modal.large {
		width: 90%;
		margin-left: -45%;
		top: 0px;
	}
}

@media ( min-width : 768px) and (max-width: 979px) {
	#ModalQuestionnaire {
		left: 2%;
		right: 2%;
	}
	.modal.large {
		width: 90%;
		margin-left: -45%;
		top: 0px;
	}
	#confrimModal {
		left: 58.5%;
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
	.aui .section-parent{margin-top: 15px ;}
	.aui .answer-type{margin-top: 15px ;}
}

/* Landscape phone to portrait tablet */
@media ( max-width : 767px) {
	#confrimModal {
		left: 23.5%;
	}
	.modal.large {
		width: '';
		top: 0px;
	}
	@media ( min-width : 481px) and (max-width: 615px) {
	}
	.aui .section-parent{margin-top: 15px ;}
	.aui .answer-type{margin-top: 15px ;}
}

/* Landscape phones and down */
@media ( max-width : 480px) {
	.aui #confrimModalCdsResult,
	.aui  #confrimModal {
		left: 1%;
	}

	.aui .section-parent{margin-top: 15px ;}
	.aui .answer-type{margin-top: 15px ;}
}

.aui #list-info {
	position: absolute;
	bottom: 90px;
	left: 0px;
	z-index: 999999999999999999999999;
	opacity: 0;
	width: auto;
	padding: 8px;
	background-color: #333333;
	border: 1px solid rgba(255, 255, 255, 0.9);
	-webkit-transition: opacity 0.2s ease-out, bottom 0.2s ease-out;
	-moz-transition: opacity 0.2s ease-out, bottom 0.2s ease-out;
	-o-transition: opacity 0.2s ease-out, bottom 0.2s ease-out;
	transition: opacity 0.2s ease-out, bottom 0.2s ease-out;
}

.aui #file {
	width: 100%;
	height: 100%;
}

.aui  #list-info p {
	color: #ffffff;
	font-weight: 400;
	font-size: 0.9em;
	text-align: left;
	z-index: 999999999999999999999999;
}
.segment:last-child {
    margin-bottom: 10px;
}

.segment {
   
    position: relative;
    background: #fff;
    -webkit-box-shadow: 0 1px 2px 0 rgba(34,36,38,.15);
/*     box-shadow: 0 1px 2px 0 rgba(34,36,38,.15); */
    box-shadow:0 0.25rem 0.75rem rgba(0, 0, 0, .05);
    margin: 1rem 0;
    padding: 1em 1em;
    border-radius: .28571429rem;
    border: 1px solid rgba(34,36,38,.15);
}


.aui .section-name{margin-bottom: 0px !important;top: 5px;font-size: 13px;}
.aui .answer-type{margin-bottom: 0px !important;}
.aui .section-parent{width: auto; margin-right: 60px;margin-bottom: 0px !important;margin-right: 20px;top: 3px;}
.aui #ModalQuestionnaire .table td {background: white;}
.aui #ModalQuestionnaire .table-hover tbody tr:hover > td, .aui #ModalQuestionnaire .table-hover tbody tr:hover > th {
    background-color: #f5f5f5;
}
.aui #ModalQuestionnaire .table-hover tfoot tr:hover > td, .aui #ModalQuestionnaire .table-hover tfoot tr:hover > th {
    background-color: #f5f5f5; cursor: pointer;
}
.aui #ModalQuestionnaire .table-hover tbody tr:hover .imgMoveHandleAnswerRow,
.aui #ModalQuestionnaire .sortUnderSubSectionItem  .box-header:hover .imgMoveHandleQuestion,
.aui #ModalQuestionnaire .sortUnderSectionItem  .box-header:hover .imgMoveHandleQuestion{
    
    cursor: -webkit-grab;
  	cursor: -moz-grab;
}
.aui #ModalQuestionnaire .table-hover tbody tr:hover .imgMoveHandleAnswerRow:active,
.aui #ModalQuestionnaire .table-hover tbody tr:hover .imgMoveHandleAnswerRow:active:before,
.aui #ModalQuestionnaire .table-hover tbody tr:hover .imgMoveHandleAnswerRow:active:after,
.aui #ModalQuestionnaire .sortUnderSubSectionItem  .box-header:hover .imgMoveHandleQuestion:active,
.aui #ModalQuestionnaire .sortUnderSubSectionItem  .box-header:hover .imgMoveHandleQuestion:before,
.aui #ModalQuestionnaire .sortUnderSubSectionItem  .box-header:hover .imgMoveHandleQuestion:after,
.aui #ModalQuestionnaire .sortUnderSectionItem  .box-header:hover .imgMoveHandleQuestion:active,
.aui #ModalQuestionnaire .sortUnderSectionItem  .box-header:hover .imgMoveHandleQuestion:before,
.aui #ModalQuestionnaire .sortUnderSectionItem  .box-header:hover .imgMoveHandleQuestion:after {
  cursor: -webkit-grabbing;
  cursor: -moz-grabbing;
}
.aui #ModalQuestionnaire .table-hover tbody tr:hover .imgMoveHandleAnswerRow img,
.aui #ModalQuestionnaire .sortUnderSubSectionItem .box-header:hover .imgMoveHandleQuestion img,
.aui #ModalQuestionnaire .sortUnderSectionItem .box-header:hover .imgMoveHandleQuestion img{
	display: block;
}
.aui .imgMoveHandleAnswerRow img,
.aui #ModalQuestionnaire .sortUnderSubSectionItem .box-header .imgMoveHandleQuestion img,
.aui #ModalQuestionnaire .sortUnderSectionItem .box-header .imgMoveHandleQuestion img{
	display: none;
	
}
.aui #ModalQuestionnaire .sortUnderSubSectionItem .box-header .imgMoveHandleQuestion,
.aui #ModalQuestionnaire .sortUnderSectionItem .box-header .imgMoveHandleQuestion{
	margin-top: -8px;
	height: 20px;
}
.aui .btnDelAnswerRow{
	cursor: pointer;
	font-size: 24px; 
	color: #ff7d7d;
}




.aui .btnDelAnswerRow:hover{
	color: red;
}
.aui .addAnswerRow{
	cursor: pointer;
}
.aui .input-answer-name, .aui .input-answer-score{
	margin-bottom: 0px !important; 
	font-size: 11px;

}
.aui .error{
	color: #a94442 !important;
	font-style: italic;
	font-weight: bold !important;
}


</style>
<div id="container1" >
				<!--  nav bar -->
				<div class='row-fluid'>

					<div class='col-xs-12'>
						<div id="slide_status" class="span12" style="z-index: 9000;">
						
							<div id="btnCloseSlide"><i class='fa fa-times'></i></div>
							<div id="slide_status_area"></div>
						</div>
					</div>

				</div>


	<div class="row-fluid app_url_hidden">
		<!-- start--row-fluid -->

		<div class="col-lg-12" style="padding-left: 0px;padding-right: 0px;">
			<div class="ibox float-e-margins">
				<div class="ibox-title">
					<h5>Advance Search</h5>
				</div>

				<div class="ibox-content breadcrumbs2">
					<div class="row-fluid p-t-xxs">
						<div class="form-inline">
							<div  class="form-group pull-left span3" style="margin-left: 5px">
								<select data-toggle="tooltip" title="Questionnaire Type"
									class="input span12 m-b-n" id="search_quest_type" name="search_quest_type"><option
										selected value="">All Questionnaire Type</option></select>
							</div>
<!-- 						
							<div  class="form-group pull-left span3" style="margin-left: 5px">
								<select data-toggle="tooltip" title="level"
									class="input span12 m-b-n" id="search_level_id" name="search_level_id"><option
										selected value="">All Level</option></select>
							</div>
-->
							<div class="form-group pull-left span6" style="margin-left: 5px">
								<input data-toggle="tooltip" title="Questionnaire Name"
									class="span12 m-b-n ui-autocomplete-input"
									style="margin-bottom: 10px;" id="search_quest_name"
									data-placement="top" name="search_quest_name" type="text"
									placeholder="Questionnaire Name"> <input
									class="form-control input-sm" id="search_quest_id"
									name="search_quest_id" value="" type="hidden">
							</div>
	
							<div class="form-group pull-right m-b-none p-b-xxs">
								<button type="button" class="btn btn-info input-sm"
									name="btn_search_advance" id="btn_search_advance"
									style="margin-left: 5px">
									<i class="fa fa-search"></i>&nbsp;Search
								</button>
							</div>
						</div>
					</div>
				</div>
				<!-- content end -->
			</div>

		</div>

	</div>
	<!-- end--row-fluid -->



	<div class="row-fluid " id="Questionnaire_list_content">
		<div class="col-lg-12" style="padding-left: 0px; padding-right: 0px;">
			<div class="ibox-title">
				<h5>Questionnaire List</h5>
			</div>


			<div class="ibox-content">
				<div class="row-fluid">
					<div class="span12">
						<button type="button" class="btn btn-success" style="margin-bottom: 10px;margin-top: 5px;"
							id="btnAddQuestionnaire" data-target=#ModalQuestionnaire data-toggle='modal' data-backdrop='static' data-keyboard='false'>
							<i class="fa fa-plus-square"></i>&nbsp;Add Questionnaire
						</button>
					</div>
				</div>
				<!-- start table -->
				<div class="row-fluid" style="overflow: auto;">
					<table class="table table-striped" id="tableQuestionnaire"
						style="max-width: none; min-width: 800;">
						<thead>
							<tr>
								<th style='width: 5%; white-space: nowrap;'>No.</th>
								<th style='width: 15%; white-space: nowrap;'>Questionnaire Type</th>
								<th style='width: auto; white-space: nowrap;'>Questionnaire Name</th>
								<th style='width: 10%; white-space: nowrap;text-align: right;'>Pass Score</th>
								<th style='width: 10%; text-align: center;' class='objectCenter'>Is Active</th>
								<th style='width: 10%; text-align: center;' class='objectCenter'>Manage</th>
							</tr>
						</thead>
						<tbody id="listQuestionnaire">

						</tbody>
					</table>
				</div>

				<!-- end table -->


			</div>
			<!-- content end -->
		</div>
	</div>

</div>

	
	
<input type="hidden" name="id" id="id" value="">
<input type="hidden" name="action" id="action" value="add">

<!-- Modal Confirm Start -->
	<div aria-hidden="true" role="dialog" tabindex="-1" id="confrimModal"
		class="modal inmodal in" style="width:400px;left:calc;display: none;">
		<div class="modal-dialog">
			<div class="modal-content  bounceInRight">
				<div class="modal-header">
					<button data-dismiss="modal" class="close" type="button" style="padding-top:5px">
						<span aria-hidden="true"><i class='fa fa-times'></i></span><span class="sr-only">Close</span>
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

							<label>Confirm to Delete Data?</label>
							<div id="inform_on_confirm" class='information'></div>
						</div>
					</div>

					<!-- form start -->
					<!-- content end -->
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
				</div>
			</div>
		</div>
	</div>
	<!-- Modal Confirm End -->
	
	
	<!-- Modal KPI Start Edit -->

  <div aria-hidden="true" role="dialog" tabindex="-1" id="ModalQuestionnaire" class="modal inmodal large" style="display: none;">
    <div class="modal-dialog  ">
    <div class="modal-content animated bounceInRight">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" style="padding-top:5px">
						<span aria-hidden="true"><i class='fa fa-times'></i></span><span class="sr-only">Close</span>
					</button>
                <h4 class="modal-title" id="modalTitleRole">Add Questionnaire</h4>
               
            </div>
			<div class="modal-body">
			<form id="formModalQuestionnaire" >
				<div class="row-fluid p-t-xxs">
					<div class="form-inline">
						<div class="form-group pull-left span3"
							style="margin-left: 0px; position: relative;">
							<select data-toggle="tooltip" title="Questionnaire Type"
								class="input span12 m-b-n " id="form_questionnaire_type"
								name="form_questionnaire_type" data-container=".modal-header"><option selected
									value="">No Questionnaire Type</option></select>
						</div>
<!-- 					
						<div class="form-group pull-left span3"
							style="margin-left: 0px; position: relative;">
							<select data-toggle="tooltip" title="Level"
								class="input span12 m-b-n " id="form_level_id"
								name="form_level_id"><option selected
									value="">No Level </option></select>
						</div>
 -->
					</div>
				</div>
				<div class="row-fluid p-t-lg">
					<div class="form-inline">

						<div class="form-group float-label-control pull-left span6">
							<input type="text" class="form-control "
								placeholder="Questionnaire Name" id="form_questionnaire_name" name="form_questionnaire_name"
								data-toggle="tooltip" title="Questionnaire Name" required>
						</div>
						<div class="form-group float-label-control pull-left span2"
							style="width: auto; top: 4px;" >
							<span>Pass Score:</span>
						</div>
						<div class="form-group float-label-control pull-left span2">
							<input type="text" class="form-control numberOnly" placeholder="Score"
								id="form_questionnaire_pass_score" name="form_questionnaire_pass_score" data-toggle="tooltip" required
								title="Pass Score">
						</div>
						<div class="form-group float-label-control pull-left span2"
							style="width: auto; margin-right: 60px; ">
							<div class="flat-toggle " id="form_questionnaire_is_active"
								data-value="1">
								<span>Is Active</span>

							</div>
						</div>

						<div class="form-group pull-right m-b-none p-b-xxs">
							<button type="button" class="btn btn-success input-sm btnAddSection"
								name="" id=""
								style="margin-left: 5px">
								<i class="fa fa-plus-square"></i>&nbsp;Add Section
							</button>
						</div>

					</div>
				</div>



				<div id="listSection">
				</div>
				
				</form>
				<!-- content end -->
			</div>
			<div class="modal-footer">
            	<button class="btn btn-success" type="button" id="btnSubmit">Save</button>
   				<button class="btn btn-success" type="button" id="btnAddAnother">Save & Add Another</button>
                <button data-dismiss="modal" class="btn btn-danger btnCancle" type="button">Cancel</button>
                
     			<div class="alert alert-warning information" id="information2" style="display: none;"></div>
            	
           	 	
            </div>
        </div>
    </div>
    
</div>                      
<!-- Modal KPI End Edit -->
<!--

				<div id="listSection">
<!-- -------------------------------------------------------Start Section------------------------------------------------------ 

				
						<div class="row-fluid" id="addSection-1">
							<div class="box box-primary" >
								<div class="box-header with-border">
									<div class="form-inline">
										<div class="form-group float-label-control pull-left span6 section-name">
											<input type="text" class="form-control " placeholder="Section Name" id="addSectionName-1"
												name="addSectionName-1" data-toggle="tooltip" title="Section Name">
										</div>
										<div class="form-group float-label-control pull-left span2 section-parent isCustomerSearch">
											<div class=" flat-toggle on"
												id="addIsCustomerSearch-1" data-value="1">
												<span>Is Customer search</span>
											</div>
										</div>
										<div class="form-group pull-right m-b-n">
											<button type="button" class="btn btn-success input-sm btnAddSubSection" 
												name="" id="" style="margin-left: 5px;margin-bottom: 5px;">
												<i class="fa fa-plus-square"></i>&nbsp;Add Sub Section
											</button>
											<button type="button" class="btn btn-success input-sm btnAddQuestion" question-type="question"
												name="" id="" style="margin-left: 5px;margin-bottom: 5px;">
												<i class="fa fa-plus-square"></i>&nbsp;Add Question
											</button>
											<button type="button" class="btn btn-danger input-sm btnDelSection"
												name="btnDelSection-1" id="btnDelSection-1" style="margin-left: 5px;margin-bottom: 5px;">
												<i class="fa fa-trash"></i>
											</button>
										</div>
									</div>
								</div>
								<!-- /.box-header -->
								<div class="box-body" id="listQuestion-1">
<!-- -----------------------------------------------------Start Sub Section----------------------------------  
										<br>
										<div class="span11 listQuestion-1" answer-type="SubSection">
											<div class="box2 box-primary" >
												<div class="box-header with-border" style="padding-top: 5px;">
													<div class="form-inline" >
														<div class="form-group float-label-control pull-left span5 section-name" style="margin-top: 5px;">
															<input type="text" class="form-control" data-toggle="tooltip" title="" placeholder="Sub Section"
																id="addSubSectionName-1-1" name="addSubSectionName-1-1"  data-original-title="Sub Section">
														</div>
														<div class="form-group float-label-control pull-left span2 section-name" style="margin-top: 5px;">
															<input type="text" class="form-control" data-toggle="tooltip" title="" placeholder="Pass Score"
																id="addSubSectionPassScore-1-1" name="addSubSectionPassScore-1-1"  data-original-title="Pass Score">
														</div>
														<div class="form-group pull-left span3 answer-type" style="margin-top: 5px;">
															<select data-toggle="tooltip" title="AnswerType" class="input span12 m-b-n dropDownAnswerTypeSubSection" id=""
																name="" data-original-title="Answer Type">
																<option  value="1">Radio Choice No Comment</option>
																<option  value="2">Radio Choice With Comment</option>
																<option  value="3">Checkboxes Choice No Comment</option>
																<option  value="4">Checkboxes Choice With Comment</option>
																<option  value="5">Dropdown Choice No Comment</option>
																<option  value="6">Dropdown Choice With Comment</option>
																<option  value="7">Comment</option>
															</select>
														</div>
														<div class="form-group pull-right m-b-n " style="display: block;" >
															<button type="button" class="btn btn-success input-sm btnAddQuestion" question-type="subSection-question"
																name="" id="" style="margin-left: 5px;margin-top: 5px;">
																<i class="fa fa-plus-square"></i>&nbsp;Add Question
															</button>
															<button type="button" class="btn btn-danger input-sm btnDelSubSection" name="" id=""
																style="margin-left: 5px;margin-top: 5px;"><i class="fa fa-trash"></i>
															</button>
														</div>
													</div>
												</div>
												<!-- /.box-header -->
												<div class="box-body" id="bodySubSection-1-1" >										
													<br>
<!-- -----------------------------------------------------Start Question by Sub Section ---------------------------------- 			
													<div class="span10 bodySubSection-1-1" style="display: block;">
														<div class="box2 box-primary" >
															<div class="box-header with-border"  style="padding-top: 5px;">
																<div class="form-inline" >
																	<div class="form-group float-label-control pull-left span6 section-name" style="margin-top: 5px;">
																		<input type="text" class="form-control" placeholder="Question" id="" data-toggle="tooltip" data-original-title="Question Name">
																	</div>
																	<div class="form-group pull-left span4 answer-type" style="margin-top: 5px;">
																		<select data-toggle="tooltip" data-original-title="Answer Type"
																			class="input span12 m-b-n dropDownAnswerTypeQuestion" id="">
																			<option selected value="1">Radio Choice No Comment</option>
																			<option  value="2">Radio Choice With Comment</option>
																			<option  value="3">Checkboxes Choice No Comment</option>
																			<option  value="4">Checkboxes Choice With Comment</option>
																			<option  value="5">Dropdown Choice No Comment</option>
																			<option  value="6">Dropdown Choice With Comment</option>
																			<option  value="7">Comment</option>
																		</select>
																	</div>
																	<div class="form-group pull-right m-b-n" >
																		<button type="button" class="btn btn-danger input-sm btnDelQuestion"
																			name="" id="" style="margin-left: 5px;margin-top: 5px;">
																			<i class="fa fa-trash"></i>
																		</button>
																	</div>
																</div>
															</div>
															<div class="box-body" id="">
																<div class="table-responsive" style="overflow: auto;" id="">
																	<table class="table table-hover" id="tableSubQuestion-1-1" style="min-width: 450px;">
																		<tbody>
																			<tr>
																				<td style="width: 20px;" class="imgAnswerType">
																					<img src="/see-kpi-portlet/img/answer/circle.svg" style="opacity: 0.3;">
																				</td>
																				<td style="width: 70%;" >
																					<div class="float-label-control input-answer-name" >
																						<input type="text" class="form-control" data-toggle="tooltip" data-original-title="Answer Name" placeholder="Answer Name" id="">
																					</div>
																				</td>
																				<td>
																					<div class="float-label-control input-answer-score">
																						<input type="text" class="form-control " data-toggle="tooltip" data-original-title="Score" placeholder="Score" id="">
																					</div>
																				</td>
																				<td style="min-width: 75px" >
																					<div class="isNotApplicable flat-toggle" data-value="0">
																						<span>N/A</span>
																					</div>
																				</td>
																				<td><i class="fa fa-close btnDelAnswerRow"></i></td>
																			</tr>
																		</tbody>
																		<tfoot class="addAnswerRow" >
																			<tr>
																				<td style="width: 20px;" class="imgAnswerType">
																					<img src="/see-kpi-portlet/img/answer/circle.svg" style="opacity: 0.3;">
																				</td>
																				<td colspan="4" >Click Add Orther</td>
																			</tr>
																		</tfoot>
																	</table>
																</div>
															</div>
														</div>
													</div>
<!-- -----------------------------------------------------End Question by Sub Section----------------------------------  													
												</div>
												<!-- /.box-body -->
											</div>
										</div>
<!-- -----------------------------------------------------End Sub Section----------------------------------
<!-- -----------------------------------------------------Start Question ----------------------------------  
										<div class="span11 listQuestion-1" answer-type="Question">
											<div class="box2 box-primary" >
												<div class="box-header with-border">
													<div class="form-inline">
														<div class="form-group float-label-control pull-left span7 section-name">
															<input type="text" class="form-control"
																placeholder="Question" id="form_section_name">
														</div>
														<div class="form-group pull-left span3 answer-type" >
															<select data-toggle="tooltip" title=""
																class="input span12 m-b-n dropDownAnswerTypeQuestion"  id="search_answer_type"
																name="search_answer_type" 
																data-original-title="Answer Type">
																<option  value="1">Radio Choice No Comment</option>
																			<option  value="2">Radio Choice With Comment</option>
																			<option  value="3">Checkboxes Choice No Comment</option>
																			<option  value="4">Checkboxes Choice With Comment</option>
																			<option  value="5">Dropdown Choice No Comment</option>
																			<option  value="6">Dropdown Choice With Comment</option>
																			<option  value="7">Comment</option>
															</select>
														</div>
														<div class="form-group pull-right m-b-n">
															<button type="button" class="btn btn-danger input-sm btnDelQuestion"
																name="" id=""
																style="margin-left: 5px">
																<i class="fa fa-trash"></i>
															</button>
														</div>
													</div>
												</div>
												<div class="box-body"
													id="">
													<div class="table-responsive" style="overflow: auto;"
														id="">
														<table class="table table-hover" id="tableQuestion-1-1" style="min-width: 500px;"
															id="">
															<tbody id="">
																<tr id="">
																	<td style="width: 20px;" class="imgAnswerType">
																		<img src="/see-kpi-portlet/img/answer/triangle.svg"  style="opacity: 0.3;">
																	</td>
																	<td style="width: 75%;"
																		id="yui_patched_v3_11_0_1_1536026702777_1530">
																		<div class="float-label-control"
																			style="margin-bottom: 0px; font-size: 11px;"
																			id="yui_patched_v3_11_0_1_1536026702777_1529">
																			<input type="text" class="form-control"
																				placeholder="Answer Name" id="form_section_name">
																		</div>
																	</td>
																	<td id="yui_patched_v3_11_0_1_1536026702777_1542">
																		<div class="float-label-control"
																			style="margin-bottom: 0px; font-size: 11px;"
																			id="yui_patched_v3_11_0_1_1536026702777_1541">
																			<input type="text" class="form-control"
																				placeholder="Score" id="form_section_name">
																		</div>
																	</td>
																	<td id="yui_patched_v3_11_0_1_1536026702777_3492"><i
																		class="fa fa-close"
																		style="font-size: 24px; color: red"
																		id="yui_patched_v3_11_0_1_1536026702777_3491"></i></td>
																</tr>
																
															</tbody>
															<tfoot class="addAnswerRow"
																id="">
																<tr id="">
																	<td style="width: 10px;" class="imgAnswerType">
																		<div class="inconRadio"></div>
																	</td>
																	<td colspan="3"
																		id="yui_patched_v3_11_0_1_1536026702777_3399">Click
																		Add Answer &amp; Orther</td>
																</tr>
															</tfoot>
														</table>
													</div>
												</div>
											</div>
										</div>
<!-- -----------------------------------------------------End Question ---------------------------------- 
								</div>
								<!-- /.box-body -->
							</div>
						</div>
						
<!-- -----------------------------------------End Section-------------------------------------------------------------- 
				</div>
				


 -->
 	<!-- Modal Confirm Start -->
	<div aria-hidden="true" role="dialog" tabindex="-1" id="confrimModalActiveJobGroup"
		class="modal inmodal in" style="width:400px;left:calc;display: none;z-index:1300; margin-top: 5%;" >
		<div class="modal-dialog">
			<div class="modal-content  bounceInRight">
				<div class="modal-header">
					<button data-dismiss="modal" class="close" type="button" style="padding-top:3px">
						<span aria-hidden="true"><i class='fa fa-times'></i></span><span class="sr-only"></span>
					</button>
					<h4 class="modal-title">Confirm Dialog</h4>
				</div>
				<div class="modal-body">
					<!-- content start -->
	
					<!-- form start -->
					<div class="form-kpi-mangement">
						<div class="form-kpi-label" align="center">

							<label>Would you like to set this job group</label>
							<label>as the active questionnaire group?</label>
							<div id="inform_on_confirm2" class='information'></div>
						</div>
					</div>

					<!-- form start -->
					<!-- content end -->
				</div>
				<div class="modal-footer">
					<div align="center">
						<button class="btn btn-success" id="btnConfirmJobGroupOK" type="button">
							&nbsp;&nbsp;<i class="fa fa-check-circle"></i>&nbsp;&nbsp;Yes&nbsp;&nbsp;
						</button>
						&nbsp;&nbsp;
						<button data-dismiss="modal" class="btn btn-danger" type="button">
							<i class="fa fa-times-circle"></i>&nbsp;Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- Modal Confirm End -->