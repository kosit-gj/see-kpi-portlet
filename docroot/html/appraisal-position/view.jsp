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
		.aui .container{
			width: 50%;
			margin-right: auto;
			margin-left: auto;
		}
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
		  .aui .container{
			width: 100%;
			margin-right: auto;
			margin-left: auto;
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
	  .aui .container{
			width: 100%;
			margin-right: auto;
			margin-left: auto;
		}
   }
  /* Landscape phone to portrait tablet End##################*/ 
  
  /* Landscape phones and down Start#########################*/
  @media (max-width: 480px) { 
  	.aui .container{
			width: 100%;
			margin-right: auto;
			margin-left: auto;
		}
  	
  .text-label{
  	text-align:left;
  }
  		
}
   /* Landscape phones and down End##########################*/
     
    .aui .container{
			width: 50%;
			margin-right: auto;
			margin-left: auto;
		}
.breadcrumbs2 {
	background: rgba(0, 0, 0, 0)
		linear-gradient(to bottom, #fff 0px, #f6f6f6 47%, #ededed 100%) repeat
		scroll 0 0;
	border-radius: 0;
	margin-bottom: 0; 
	padding-bottom: 0px
}

#breadcrumbs {
	margin-bottom: 0px;
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

.aui .checkbox input[type="checkbox"] {
	opacity: 1;
	z-index: 1;
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
	top: 2%;
}
.aui #file{
	width: 100%;
	height: 100%;
}
.aui .modal-header .close{
	font-size: 1.4em !important;
    margin-top: 4px !important;
    padding-top: 5px !important;
}
</style>
	
		<div class="">
				<div class='row-fluid'>

					
						<div id="slide_status" class='span12'>
							<div id="btnCloseSlide"><i class='fa fa-times'></i></div>
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
				<h5>Position</h5>
			</div>


			<div class="ibox-content">
				<div class="row-fluid" id="sysconf">

					<div class="row-fluid">
						<div class="form-group  m-b-none ">
							<form id="formExportToExcel" action="" method="post"
								class="" style="margin-bottom: 5px;">
								<button id="exportToExcel" class="btn btn-warning btn-sm"
									type="submit">
									<i class="fa fa-download"></i> Download
								</button>
								<button id="btn_import" type="button" data-target="#ModalImport"
									data-toggle="modal" class="btn btn-success btn-sm "
									style="margin-left: 5px;">
									<i class="fa fa-upload"></i>&nbsp;Import
								</button>
							</form>
							
						</div>
						

					</div>

					<div class="row-fluid">
						<div class="table-responsive p-t-xs" style="overflow: auto;">
							<table class="table table-striped" id="tablePosition">
								<thead>
									<tr>
										<th style='width: auto'>Position&nbsp;Name</th>
										<th style='width: 20%; text-align: center;'>IsActive</th>
										<th style='width: 10%; text-align: center;'>Manage</th>
									</tr>
								</thead>
								<tbody id="listPosition">
<!-- 									<tr> -->
<!-- 										<td>asdasdasdasdasd</td> -->
<!-- 										<td id="objectCenter" class="objectCenter " style=""><input style="margin-bottom: 3px;" class="selectCdsCheckbox" id="kpiCheckbox-959" value="959" type="checkbox"></td> -->
<!-- 										<td id="objectCenter" style="vertical-align: middle;"><i class="fa fa-cog font-gear popover-edit-del" data-html="true" data-toggle="popover" data-placement="top" data-trigger="focus" tabindex="1" data-content="&lt;button class='btn btn-warning btn-xs edit' id=960 data-target=#ModalPosition data-toggle='modal'&gt;Edit&lt;/button&gt;&nbsp;&lt;button id=960 data-target=#confrimModal class='btn btn-danger btn-xs del'&gt;Delete&lt;/button&gt;" data-original-title="" title=""></i></td> -->
<!-- 									<tr> -->
								</tbody>
							</table>


						</div>
					</div>
				</div>
				<br style='clear: both'>
			</div>
		</div>
	</div>
</div>
  


<!-- Modal Start Edit -->
<div aria-hidden="true" role="dialog" tabindex="-1" id="ModalPosition" class="modal inmodal" style="display: none;">
    <div class="modal-dialog">
    <div class="modal-content  bounceInRight">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" style="padding-top:5px"><span aria-hidden="true"><i class='fa fa-times'></i></span><span class="sr-only"></span></button>
                <!-- <i class="fa fa-laptop modal-icon"></i> -->
                <h4 class="modal-title" id="modalTitlePosition">Position</h4>
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
							<label class="control-label">Position Name:</label>
								<div class="controls">
									<input type="text" class="form-control input-sm span12" placeholder="" id="mPosName"/>
								</div>
											

						</div>

						<div class="form-group p-xxs">
								<label class="control-label">Is Active:</label>
								<div class="controls">
									<label for="" class="checkbox" style="cursor:default">
                  					<input id="checkbox_is_active" name="checkbox_is_active" type="checkbox"
										value="" style="margin-top: 2px;">
                					</label>
								</div>
						</div>
						
					</div>
                </div>
					<!-- form End -->
                <!-- content end -->
            </div>
            <div class="modal-footer">
           	 	<input type="hidden" name="id" id="id" value="">
   				<input type="hidden" name="action" id="action" value="add">
   				
   				<button class="btn btn-success" type="button" id="btnSubmit">Save</button>
<!--    				<button class="btn btn-success" type="button" id="btnAddAnother">Save & Add Another</button> -->
                <button data-dismiss="modal" class="btn btn-danger btnCancle" type="button">Cancel</button>
                <div class="alert alert-warning information" id="information" style="display: none;max-height:45px; overflow-y: scroll; position:relative;"></div>
            </div>
        </div>
    </div>
</div>
<!-- Modal End Edit -->


<!-- Modal Import Position -->

<div aria-hidden="true" role="dialog" tabindex="-1" id="ModalImport"
	class="modal inmodal" style="display: none;">
	<div class="modal-dialog">
		<div class="modal-content  bounceInRight">
			<div class="modal-header">
				<button data-dismiss="modal" class="close" type="button"
					style="padding-top: 5px">
					<span aria-hidden="true"><i class='fa fa-times'></i></span><span class="sr-only"></span>
				</button>
				<h4 class="modal-title" id="">Import Position</h4>
			</div>
			<div class="modal-body">
				<!-- content start -->

			

				<!-- form start -->


				<div class="form-group">
					<form id="fileImportPosition">

						<h4>FILE IMPORT</h4>
						<div class="fileUpload ">
							<input type="file" id="file" class="dropify" accept=".xls, .xlsx" /><span></span>
						</div>
					</form>

					<!-- start table -->
				</div>
				<!-- form End -->
				<!-- content end -->
			</div>
			<div class="modal-footer">
				<button class="btn btn-success" type="submit"
					id="importPosition" form="fileImportPosition">Import</button>
				<button data-dismiss="modal" class="btn btn-danger btnCancle"
					type="button">Cancel</button>
				<div class="alert alert-warning information" id="information2" style="display: none;"></div>
			</div>
		</div>
	</div>
</div>
<!-- Modal Import Position -->

<!-- Modal Confirm Start -->
<div aria-hidden="true" role="dialog" tabindex="-1" id="confrimModal"
	class="modal inmodal in"
	style="width: 400px; left: calc; display: none;">
	<div class="modal-dialog">
		<div class="modal-content  bounceInRight">
			<div class="modal-header">
				<button data-dismiss="modal" class="close" type="button"
					style="padding-top: 3px">
					<span aria-hidden="true"><i class='fa fa-times'></i></span><span class="sr-only"></span>
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



