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
<style>
.form-group {
    margin-bottom: 5px;
}
.aui #Modalcreate .form-horizontal .control-label {
    padding-top: 5px;
    text-align: left;
}
</style>
<input type="hidden" id="user_portlet" name="user_portlet" value="<%=username%>">
<input type="hidden" id="pass_portlet" name="pass_portlet" value="<%=password%>">
<input type="hidden" id="url_portlet" name="url_portlet" value="<%= renderRequest.getContextPath() %>">
<input type="hidden" id="plid_portlet" name="plid_portlet" value="<%= plid %>">

<!-- Modal Start Create -->

  <div aria-hidden="true" role="dialog" tabindex="-1" id="Modalcreate" class="modal inmodal" style="display: none;">
    <div class="modal-dialog">
    <div class="modal-content  bounceInRight">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" style="padding-top:5px"><span aria-hidden="true">×</span><span class="sr-only"></span></button>
                <!-- <i class="fa fa-laptop modal-icon"></i> -->
                <h4 class="modal-title" id="modalTitleRole">Appraisal Period</h4>
                <!-- 
                <small class="font-bold">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</small>
                 -->
            </div>
            <div class="modal-body">
                <!-- content start -->

                
                <!-- form start -->
                <div class="row-fluid">
                	<div class="span12 form-horizontal p-t-xxs">
							<div class="form-group p-xxs" style='margin-bottom: 5px;'>
									<label class="span5 control-label">Appraisal Year</label>
									<div class="span7" id="dropdownAppYear" ></div>
			                <br style="clear:both">
							</div>
							
							<div class="form-group p-xxs" style='margin-bottom: 5px;'>
									<label class="span5 control-label">Start Year</label>
									<div class="span7" id="dropdownStartYear" >
		               				</div>
			                <br style="clear:both">
							</div>
							 
							
							<div class="form-group p-xxs" style='margin-bottom: 5px;'>
								<label class="span5 control-label">Start Month</label>
									<div class="span7" id="dropdownStartMonth" >
		                			</div>
		               		 <br style="clear:both">
							</div>
							
							<div class="form-group p-xxs" style='margin-bottom: 5px;'>
								<label class="span5 control-label">Appraisal Frequency</label>
								<div class="span7" id="dropdownAppFrequency" >
			                	
			               		</div>
			                <br style="clear:both">	
							</div>
							
							<div class='form-group' style='margin-bottom: 5px;'>
				                <div class="span5 control-label">
				                	Appraisal Period Description<span class="redFont ">*</span>
				                </div>
				                
				                 <div class="span7">
				                	<input  class="span12 " placeholder="การประเมินผลการปฏิบัติงานประจำปี" type="text" id="a_p_d" name="a_p_d">
				                </div>
				                <br style="clear:both">
		                	</div>
							<div class="form-group p-xxs" style='margin-bottom: 5px;'>
									<label class="span5 control-label">Bonus Frequency </label>
									<div class="span7" id="dropdownBonusFrequency" >
			                		 </div>
			                <br style="clear:both">
							</div>
							
							<div class='form-group' style='margin-bottom: 5px;'>
				                <div class="span5 control-label">
				                	Bonus Period Description<span class="redFont ">*</span>
				                </div>
				                
				                 <div class="span7">
				                	<input   class="span12 " placeholder="รอบจ่ายโบนัสประจำปี" type="text" id="b_p_d" name="b_p_d">
				                </div>
			                <br style="clear:both">
		                	</div>
		                	
							<div class="form-group p-xxs" style='margin-bottom: 5px;'>
									<label class="span5 control-label">Salary Raise Frequency</label>
									<div class="span7" id="dropdownSalaryFrequncy" >
			                		</div>
			                <br style="clear:both">
							</div>
							
							<div class='form-group' style='margin-bottom: 5px;'>
				                <div class="span5 control-label">
				                	Salary Raise Description<span class="redFont ">*</span>
				                </div>
				                
				                 <div class="span7 ">
				                	<input  class="span12 " placeholder="รอบขึ้นเงินเดือนประจำปี" type="text" id="s_r_d" name="s_r_d">
				                </div>
				                <br style="clear:both">
		                	</div>
						
			</div>
       </div>
                



					<!-- form End -->
                <!-- content end -->
            </div>
            <div class="modal-footer">
           	 	<input type="hidden" name="appraisal_period_id" id="appraisal_period_id" value="">
   				<input type="hidden" name="appraisal_period_action" id="appraisal_period_action" value="add">
   				
   				
   				<button class="btn btn-success" type="button" id="btnAppPeriod">Create Appraisal Period</button>
                <button data-dismiss="modal" class="btn btn-danger btnCancle" type="button">Cancel</button>
                <div class="alert alert-warning information" id="information2" style="display: none;"></div>
            </div>
        </div>
    </div>
</div>
	<!-- Modal End Create -->
	
<div class=''>	
	<div id="mainContent">
	</div>
</div>
		