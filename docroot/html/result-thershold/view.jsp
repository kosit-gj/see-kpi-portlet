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
//out.print(username);
//out.print("password2="+password);
%>
<input type="hidden" id="user_portlet" name="user_portlet" value="<%=username%>">
<input type="hidden" id="pass_portlet" name="pass_portlet" value="<%=password%>">
<input type="hidden" id="url_portlet" name="url_portlet" value="<%= renderRequest.getContextPath() %>">


<style>


/* Large desktop Start#####################################*/
  @media (min-width: 1200px) { 

   }
   /* Large desktop End######################################*/
   
   /*  desktop Start#########################################*/
  @media (min-width: 980px) and (max-width: 1199px) {
  
  	
   }
  /*  desktop End############################################*/
  
  /* Portrait tablet to landscape and desktop Start##########*/
  @media (min-width: 768px) and (max-width: 979px) {
  		 .text-label{
		  	text-align:right;
		  }
   }
  /* Portrait tablet to landscape and desktop End############*/ 
  
  /* Landscape phone to portrait tablet Start################*/
  @media (max-width: 767px) { 
 	  .text-label{
	  	text-align:left;
	  }	
	  .btn-right{
	  text-align: right;}
   }
  /* Landscape phone to portrait tablet End##################*/ 
  
  /* Landscape phones and down Start#########################*/
  @media (max-width: 480px) { 
  	
  .text-label{
  	text-align:left;
  }
  		
}
   /* Landscape phones and down End##########################*/
     
    
.aui #breadcrumbs {
    margin-bottom: 0px;
}
.aui td {padding:3px 3px 3px 8px !important;}
.aui .objectCenter {vertical-align: middle !important;}
.aui .btn {
	font-size: 14px;
 	padding: 4px 12px; 
	width: auto;
	margin-top: 0px;
	display: inline;
}
.aui select, .aui textarea, .aui input[type="text"], .aui input[type="password"], .aui input[type="datetime"], .aui input[type="datetime-local"], .aui input[type="date"], .aui input[type="month"], .aui input[type="time"], .aui input[type="week"], .aui input[type="number"], .aui input[type="email"], .aui input[type="url"], .aui input[type="search"], .aui input[type="tel"], .aui input[type="color"], .aui .uneditable-input {
    height: 20px;
    padding: none;
    font-size: 14px;
}
.aui .modal {
	top: 3%;
}
.aui #confrimModal {
	top: 10%;
}

</style>
	
		<div class="">
				<div class='row-fluid'>

					
						<div id="slide_status" class='span12'>
							<div id="btnCloseSlide">×</div>
							<div id="slide_status_area"></div>
						</div>
					

				</div>

	<div class="row">
		<!-- start--row -->

	</div>
	<!-- end--row -->
	<div class="row-fluid app_url_hidden">
		<div class="span12">
			<div class="ibox-title">
				<h5>Set Thershold</h5>
			</div>


			<div class="ibox-content">
				<div class="row-fluid">
						<div class="col-lg-12">
						
						
						<div class="form-group pull-left m-b-none "> <!-- data-target="#ModalRole"  -->
							<button type="button" class="btn btn-primary add" style="">
								&nbsp;&nbsp;Add&nbsp;&nbsp;
							</button>
							<button type="button" class="btn btn-warning edit " style="margin-left: 5px;">
								&nbsp;&nbsp;Edit&nbsp;&nbsp;
							</button>
							<button  type="button" class="btn btn-danger del "style="margin-left: 5px;">
								&nbsp;&nbsp;Delete&nbsp;&nbsp;
							</button>
						</div>
						<div class="form-group pull-right m-b-none "> 
							<button class="btn btn-success" type="button" id="btnEmpSubmit" style="margin-left: 5px;">Save</button>
							<button class="btn btn-danger btnEmpCancle" id="btnEmpCancel" type="button" style="margin-left: 5px;">Cancel</button>
						</div>
						</div>
				</div>
				<!-- form start -->

					<div>
						<!-- start table -->
						<div class="table-responsive">
							<table class="table table-striped" id="formTableRole">
								<thead>
									<tr>
										<th style='width: auto; '>Check Box</th>
										<th style='width: auto'>Begin Threshold</th>
										<th style='width: auto'>End Threshold</th>
										<th style='width: auto'>Color Picker</th>
									</tr>
								</thead>
								<tbody id="formListEmpResult">

								</tbody>
							</table>
						</div>

						<!-- end table -->



					</div>
					<!-- form End -->
				<input type="hidden" name="id" id="id" value="">
				<input type="hidden" name="action" id="action" value="add">
				<div class="alert alert-warning" id="information2"
					style="display: none;">
				</div>
				<br style='clear: both'>
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
					<button data-dismiss="modal" class="close" type="button" style="padding-top:3px">
						<span aria-hidden="true">×</span><span class="sr-only"></span>
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
					
					<div class="alert alert-warning information" id="information"
						style="display: none;"></div>
				</div>
			</div>
		</div>
	</div>
	<!-- Modal Confirm End -->
		



