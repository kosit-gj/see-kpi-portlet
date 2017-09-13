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

	<div id="mainContent">
	</div>
	
<style>

/* Large desktop */
@media ( min-width : 1200px) {
	#confrimModalCreateGroup {
		left: 56%;
	}
}

/* Portrait tablet to landscape and desktop */
@media ( min-width : 980px) and (max-width: 1199px) {
	#confrimModalCreateGroup {
		left: 57%;
	}
}

@media ( min-width : 768px) and (max-width: 979px) {
	#confrimModalCreateGroup {
		left: 58.5%;
	}

}

/* Landscape phone to portrait tablet */
@media ( max-width : 767px) {
	#confrimModalCreateGroup {
		left: 23.5%;
	}
	@media ( min-width : 481px) and (max-width: 622px) {
		#confrimModalCreateGroup {
			left: 16.5%;
		}
}

/* Landscape phones and down */
@media ( max-width : 480px) {
	#confrimModalCreateGroup {
		left: 1%;
	}
}
</style>

<input type="hidden" name="group_id" id="group_id" value="">
<input type="hidden" name="group_action" id="group_action" value="add">
<!-- Modal Start Create -->

  <div aria-hidden="true" role="dialog" tabindex="-1" id="ModalCreateGroup" class="modal inmodal" style="display: none;" data-toggle="modal">
    <div class="modal-dialog">
    <div class="modal-content  bounceInRight">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" style="padding-top:5px"><span aria-hidden="true"><i class='fa fa-times'></i></span><span class="sr-only"></span></button>
                <!-- <i class="fa fa-laptop modal-icon"></i> -->
                <h4 class="modal-title" id="modalTitleRole">Threshold Group</h4>
                <!-- 
                <small class="font-bold">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</small>
                 -->
            </div>
            <div class="modal-body">
                <!-- content start -->
                <div class="row-fluid">
                	<div class="span12 form-horizontal p-t-xxs">
                		<div class="form-group">
							<label class="control-label">Group Name:<span
								class="redFont " style="position:absolute;margin-left:4px">*</span>
							</label>
							<div class="controls">
								<input type="text" name="createThreshold_name" id="createThreshold_name"
									placeholder="Theshould Name" class="span12 m-b-n"
									style="width: 100%">
							</div>
						</div>
						<div class="form-group pull-right">
							<button class="btn btn-success" type="button" id="btnSaveGroup">Save</button>
                			<button data-dismiss="modal" class="btn btn-danger btnCancle btnCancleGroup" type="button">Cancel</button>
						</div>
                	
                	</div>
                </div>
                <!-- form start -->
                <div class="row-fluid">
                	<div class="table-responsive">
							<table class="table table-striped" id="formTableThresholdGroup">
								<thead>
									<tr>
										<th style='width: 10%;'>No.</th>
										<th style='width: auto'>Group Name</th>
										<th style='width: 15%;'>Is Active</th>
										<th style='width: 15%'>Manage</th>
									</tr>
								</thead>
								<tbody id="formListThresholdGroup">

								</tbody>
							</table>
						</div>
       			</div>
                



				<!-- form End -->
                <!-- content end -->
            </div>
            <div class="modal-footer">
           	 	
   				
  
                <div class="alert alert-warning information" id="information2" style="display: none;"></div>
            </div>
        </div>
    </div>
</div>
	<!-- Modal End Create -->
	
	
	<!-- Modal Start Create -->

  <div aria-hidden="true" role="dialog" tabindex="-1" id="ModalEditGroup" class="modal inmodal" style="display: none;z-index:1300;">
    <div class="modal-dialog">
    <div class="modal-content  bounceInRight">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" style="padding-top:5px"><span aria-hidden="true"><i class='fa fa-times'></i></span><span class="sr-only"></span></button>
                <!-- <i class="fa fa-laptop modal-icon"></i> -->
                <h4 class="modal-title" id="modalTitleRole">Threshold Group</h4>
                <!-- 
                <small class="font-bold">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</small>
                 -->
            </div>
            <div class="modal-body">
                <!-- content start -->
                <!-- form start -->
                <div class="row-fluid">
                	<div class="span12 form-horizontal p-t-xxs">
						<div class="form-group p-xxs">
							<label class="control-label">Group Name<span
								class="redFont "style="position:absolute;margin-left:4px">*</span>
							</label>
							<div class="controls">
								<input type="text" name="form_threshold_name" id="form_threshold_name"
									placeholder="Threshold Name" class="span12 m-b-n "
									style="width: 200px">
							</div>
						</div>
						<div class="form-group ">
							<label class="control-label"> IsActive </label>
							<div class="controls">
								<input type="hidden" value="0" name="form_is_active_" id="form_is_active_">
								<input type="checkbox" name=form_is_active id="form_is_active" placeholder=""
									class="checkbox checkbox-is_active" checked>
							</div>
						</div>
					</div>
       			</div>
                



				<!-- form End -->
                <!-- content end -->
            </div>
            <div class="modal-footer">
           	 	
   				
  				<button class="btn btn-success" type="button" id="btnSaveEditGroup">Save</button>
                <button data-dismiss="modal" class="btn btn-danger  btnCancleGroup" type="button">Cancel</button>
                <div class="alert alert-warning information" id="information3" style="display: none;"></div>
            </div>
        </div>
    </div>
</div>
	<!-- Modal End Create -->
	
	
		<!-- Modal Confirm Start -->
	<div aria-hidden="true" role="dialog" tabindex="-1" id="confrimModalCreateGroup"
		class="modal inmodal in" style="width:400px;left:calc;display: none;z-index:1300; margin-top: 5%;" >
		<div class="modal-dialog">
			<div class="modal-content  bounceInRight">
				<div class="modal-header">
					<button data-dismiss="modal" class="close" type="button" style="padding-top:3px">
						<span aria-hidden="true"><i class='fa fa-times'></i></span><span class="sr-only"></span>
					</button>
					<h4 class="modal-title">Threshold Group</h4>
				</div>
				<div class="modal-body">
					<!-- content start -->
	
					<!-- form start -->
					<div class="form-kpi-mangement">
						<div class="form-kpi-label" align="center">

							<label>Would you like to set this group</label>
							<label>as the active threshold group?</label>
							<div id="inform_on_confirm2" class='information'></div>
						</div>
					</div>

					<!-- form start -->
					<!-- content end -->
				</div>
				<div class="modal-footer">
					<div align="center">
						<button class="btn btn-success" id="btnConfirmGroupOK" type="button">
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

		