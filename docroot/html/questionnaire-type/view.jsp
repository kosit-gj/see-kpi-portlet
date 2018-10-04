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
%>
<input type="hidden" id="user_portlet" name="user_portlet" value="<%=username%>">
<input type="hidden" id="pass_portlet" name="pass_portlet" value="<%=password%>">
<input type="hidden" id="url_portlet" name="url_portlet" value="<%= renderRequest.getContextPath() %>">
<input type="hidden" id="plid_portlet" name="plid_portlet" value="<%= plid %>">

<div class=''>	
	<div id="mainContent">
	</div>
</div>

<style>
.popover {
	width: 230px;
}
.aui .table thead th {
    font-size: 13px;
    font-weight: normal;
}
.aui #listAuthQuestionnaireType .table thead th {
    background-color: #f0efef;
    font-size: 15px;
    font-weight: normal;
}
.aui .ui-accordion .ui-accordion-header {

    display: block;
    cursor: pointer;
    position: relative;
    margin: 2px 0 0 0;
    padding: .5em .5em .5em .7em;
    font-size: 100%;

}
.aui .accordion-modal h3,
.aui #listAuthQuestionnaireType h3 {
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
	padding-top: 2px !important;
    padding-right: 3px !important;
    padding-left: 3px !important;

}
.aui .modal {

    top: -62%;

}
</style>

<!-- Modal Import Appraisal Criteria -->

	<div aria-hidden="true" role="dialog" tabindex="-1" id="addModalAuthorized"
		class="modal inmodal" style="display: none;">
		<div class="modal-dialog">
			<div class="modal-content bounceInRight">
				<div class="modal-header">
					<button data-dismiss="modal" class="close" type="button" style="padding-top:5px">
						<span aria-hidden="true"><i class='fa fa-times'></i></span><span class="sr-only" style="display:none;"></span>
					</button>

					<h4 class="modal-title" id="">Questionnaire Authorized</h4>
	
				</div>
				<div class="modal-body">
					<!-- content start -->


					<!-- form start -->
					<div class="form-inline p-b-xs" id="">
						<div class="">
							<div class="form-group m-n " >
								<label class="form-label-emp" style="font-weight: 600;cursor: default;">Questionnaire Type : </label>&nbsp; 
								<label style="font-weight: 600;cursor: default;"
									id="form_auth_questionnaire_type" class="form-label-emp"> </label>&nbsp;
							</div>

						</div>
					</div>

					<div id="listAuthQuestionnaireType">

					</div>
					<!-- form End -->
					<!-- content end -->
				</div>
				<div class="modal-footer">
				
					<input type='hidden' id='authorized_questionaire_type_id' name='authorized_questionaire_type_id'>
					<button class="btn btn-success" type="button" id="btnAuthQuestionnaireSubmit">Save</button>
					<button data-dismiss="modal" class="btn btn-danger btnCancle"
						type="button">Cancel</button></div>
				<div class="alert alert-warning information" id="information2" style="display: none;"></div>
				</div>
			</div>
		</div>

	<!-- Modal End Appraisal Criteria -->

