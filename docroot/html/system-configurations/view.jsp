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
<!-- 
					<div class="row-fluid">
					<div class="col-lg-12">
						<div class="span12" >
							<h1>
							<i class="fa fa fa-pencil-square-o icon-title"></i>
							<small style="">System Configuration</small>
							</h1>
						</div>
					</div>
				</div>
 -->
				
<div class="row"><!-- start--row -->

                   </div><!-- end--row -->
         			<div class="row-fluid app_url_hidden">
				         		<div class="span12">
					         	<div class="ibox-title">
	                                <h5>System Configuration </h5>
	         					</div>
	         					
	         					
	         					<div class="ibox-content"> 
								<div class="row-fluid" id="sysconf">
								
									
							
							
<!-- 							<div class="span12  offset2"> -->
									
									<div class="row-fluid">
         								<div class="span5 object-right" >
											<label class='text-label'>  Current Appraisal Year &nbsp;:</label>
										</div>
										
										
										<div class="span2" >
											<input class="form-control input-data numberOnly span12" type="text" name='current_appraisal_year' id="current_appraisal_year">
										</div>
									
									</div>
									
         							<div class="row-fluid">
         								<div class="span5 object-right" >
											<label class='text-label'>  Period start Month &nbsp;:</label>
										</div>
										<div class="span3" id="drop_down_list_month">
											<select name="month" title="Month" data-toggle="tooltip" class="input form-control input-sm span12" id="month"></select>
										</div>
									</div>
								
								
									<div class="row-fluid">
										<div class="span5 object-right" >
											<label class='text-label'>  Appraisal Frequency &nbsp;:</label>
										</div>
										<div class="span3" id="appraisalSystem">
											<select id="appraisalFrequency" class="input form-control input-sm span12" data-toggle="tooltip" title="Appraisal Frequency" name="appraisalFrequency">
											</select>
										
										</div>
									</div>
									
									<div class="row-fluid">
										<div class="span5 object-right" >
											<label class='text-label'>   Bonus Frequency  &nbsp;:</label>
												
										</div>
										<div class="span3" id="bonusfreSystem">
										<select id="bonusFrequency" class="input form-control input-sm span12" data-toggle="tooltip" title="Bonus Frequency" name="bonusFrequency">
										</select>
										</div>
	                	
									</div>
									
									
								<div class="row-fluid">
								
									<div class="span5 object-right" >
										<label class='text-label'>    Bonus Prorate   &nbsp;:</label>
										
									</div>
									
									<div class="span3">
	                					<select data-toggle="tooltip" title="TypeDatabase" class="input form-control input-sm span12"  id="bonusprorateSystem" name="flag_2">
											<option value="คิดสัดส่วนตามปี">คิดสัดส่วนตามปี</option>
											<option value="คิดสัดส่วนตามรอบจ่ายโบนัส">คิดสัดส่วนตามรอบจ่ายโบนัส</option>								
										</select>
									 	 
									</div>
									
								</div>
								
								<div class="row-fluid">
	                             
									<div class="span5 object-right" >
										<label class='text-label'>Daily Bonus Rate  &nbsp;:</label>
									</div>
									
									<div class="span2" >
										<input class="form-control input-data numberOnly span12" type="text"id="dailyBonusRate">
									</div>
								</div>
								<div class="row-fluid">
	                             
									<div class="span5 object-right" >
										<label class='text-label'>Monthly Bonus Rate  &nbsp;:</label>
									</div>
									
									<div class="span2" >
										<input class="form-control input-data numberOnly span12" type="text"id="monthlyBonusRate">
									</div>
								</div>
								
								<div class="row-fluid">
	                             
									<div class="span5 object-right" >
										<label class='text-label'> Working Day for Bonus Payment  &nbsp;:</label>
									</div>
									
									<div class="span2" >
										<input class="form-control input-data numberOnly span12" type="text"id="workingSystem">  
									</div>
									
								</div>
								
								
								<div class="row-fluid">
							
									<div class="span5 object-right" >
									<label class='text-label'>  Salary Raise Frequency &nbsp;:</label>
									
									</div>
									<div class="span3" id="salarySystem">
										<select id="salaryRaiseFrequency" class="input form-control input-sm span12" data-toggle="tooltip" title="Frequency" name="salaryRaiseFrequency">
										</select>
									</div>

                                 </div> 
                                 <div class="row-fluid">
							
									<div class="span5 object-right" >
									<label class='text-label'>  Raise Type  &nbsp;:</label>
									
									</div>
									<div class="span5">
										
										<label class="radio" style="margin-bottom: 10px; float: left; margin-right: 12px;">
											  <input checked='checked'  type="radio" name="optionsRadios" id="raiseFixAmount" value="1">
											  Fix Amount
										</label>
										<label class="radio" style="margin-bottom: 10px; float: left; margin-right: 10px;">
											<input type="radio" name="optionsRadios" id="raisePercentage" value="2" >
											  Percentage
										</label>
										
									</div>

                                 </div> 
                                 <div class="row-fluid">
							
									<div class="span5 object-right" >
									<label class='text-label'>  Result Type  &nbsp;:</label>
									
									</div>
									<div class="span5">
										<label class="radio" style="margin-bottom: 10px; float: left; margin-right: 10px;display:none;">
											<input type="radio" name="optionsRadios2" id="resultWeightPercentage" value="0" checked='checked'>
											  Weight Percentage
										</label>								
										<label class="radio" style="margin-bottom: 10px; float: left; margin-right: 10px;">
											<input type="radio" name="optionsRadios2" id="resultPercentage" value="1" >
											  Percentage
										</label>
										<label class="radio" style="margin-bottom: 10px; float: left; margin-right: 10px;">
											  <input   type="radio" name="optionsRadios2" id="raiseScore" value="2">
											  Score
										</label>
										
									</div>

                                 </div> 
<!--                                  threshold -->
								<div class="row-fluid">
							
									<div class="span5 object-right" >
									<label class='text-label'>  Threshold  &nbsp;:</label>
									
									</div>
									<div class="span5">
										
										<label class="radio" style="margin-bottom: 10px; float: left; margin-right: 20px;">
											  <input checked='checked'  type="radio" name="optionsThreshold" id="thresholdOn" value="1">
											  Threshold
										</label>
										<label class="radio" style="margin-bottom: 10px; float: left; margin-right: 10px;">
											<input type="radio" name="optionsThreshold" id="thresholdOff" value="0" >
											  No Threshold 
										</label>
										
									</div>

                                 </div> 
								<div class="row-fluid">
							
									<div class="span5 object-right" >
									<label class='text-label'>  Email Reminder  &nbsp;:</label>
									
									</div>
									<div class="span5">
										
										<label class="radio" style="margin-bottom: 10px; float: left; margin-right: 20px;">
											  <input  type="radio" name="optionsEmailReminder" id="emailReminderOn" value="1">
											  Yes
										</label>
										<label class="radio" style="margin-bottom: 10px; float: left; margin-right: 10px;">
											<input type="radio" name="optionsEmailReminder" id="emailReminderOff" value="0" checked='checked'>
											  No 
										</label>
										
									</div>

                                 </div> 
                                 <div class="row-fluid">
							
									<div class="span5 object-right" >
									<label class='text-label'>  Setup Mail Server  &nbsp;:</label>
									
									</div>
									<div class="span5">
										
										<button  data-target="#ModalSetupReminder" data-toggle="modal" class=" btn btn-warning " type="button" id="btnSetupReminder" style="margin-top: -5px;" ><i class="fa fa-cogs"></i> Edit</button>
										
										
									</div>

                                 </div> 
                                 <div class="row-fluid">
							
									<div class="span5 object-right" >
									<label class='text-label'>  Theme Color &nbsp;:</label>
									
									</div>
									<div class="span3" style="margin-bottom: 25px; width:auto;margin-right: 5px; display:inline;" id="listThemeColor">
										<button
										    class="btn jscolor {valueElement:null,value:'ffcc00',valueElement:'themeColor',onFineChange:'updateThemeFn(this)'}"
										    style="width:70px; height:26px;"></button>
									</div>
									<div class='input-prepend input-append' style="margin-top: -2px;display: inline; display: -moz-box;" >
										<span class='add-on'>#</span>
										<input type="text"  maxlength='6'  id="themeColor" name="themeColor" style='width: 80px; ' class='m-b-n span4'>
									</div>
										
                                 </div> 
                                 <div class="row-fluid">
							
									<div class="span5 object-right" >
									<label>  </label>
									
									</div>
									<div class="span5 btn-right">
										<input type="hidden" name="id" id="id" value="">
						   				<input type="hidden" name="action" id="action" value="add">
						   				<button  data-target="#ModalEmpResult" data-toggle="modal" class=" btn btn-success " type="button" id="btnEmpResult" style="display:none;" >Set Threshold</button>
						   				<button class=" btn btn-primary " type="button" id="btnSubmit" >Save</button>
						                <button data-dismiss="modal" class=" btn btn-danger btnCancle" type="button">Cancel</button>
						                
									
									</div>

                                 </div> 
               
         						 <!-- 
					         	  <div class="modal-footers" align="right">
					         	     
					           	 	
					               
					             </div>
					              -->
            </div>
            <div class="row-fluid" >
            <div class="alert alert-warning" id="information" style=""></div>
            </div>
           <br style='clear:both'>
          </div>
        </div>          
     </div>
  </div>
  
  <!--  #####################Content data here ######################-->
		
	<!-- Modal Start Role -->

	<div aria-hidden="true" role="dialog" tabindex="-1" id="ModalEmpResult"
		class="modal inmodal" style="display: none;">
		<div class="modal-dialog">
			<div class="modal-content bounceInRight">
				<div class="modal-header">
					<button data-dismiss="modal" class="close" type="button" style="padding-top:5px">
						<span aria-hidden="true">×</span><span class="sr-only"></span>
					</button>
					<!-- <i class="fa fa-laptop modal-icon"></i> -->
					<h4 class="modal-title" id="modalTitleSetThershold">Set Thershold : </h4>
					<!-- 
                <small class="font-bold">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</small>
                 -->
				</div>
				<div class="modal-body">
					<!-- content start -->
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
					<!-- content end -->

					<div class="alert alert-warning" id="information2"
						style="display: none;"></div>
				</div>
			</div>
		</div>
	</div>
	<!-- Modal End Role -->



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
	
	
		<!-- Modal Start Email -->

	<div aria-hidden="true" role="dialog" tabindex="-1" id="ModalSetupReminder"
		class="modal inmodal" style="display: none;">
		<div class="modal-dialog">
			<div class="modal-content bounceInRight">
				<div class="modal-header">
					<button data-dismiss="modal" class="close" type="button" style="padding-top:5px">
						<span aria-hidden="true">×</span><span class="sr-only"></span>
					</button>
					<!-- <i class="fa fa-laptop modal-icon"></i> -->
					<h4 class="modal-title" id="modalTitleSetThershold">Setup Email</h4>
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
							<label class="control-label">Mail Driver :
							</label>
							<div class="controls">
								<input type="text" name="form_mail_driver" id="form_mail_driver"
									placeholder="Mail Driver" class="span12 m-b-n "
									style="">
							</div>
						</div>
						<div class="form-group p-xxs">
							<label class="control-label">Mail Host :
							</label>
							<div class="controls">
								<input type="text" name="form_mail_host" id="form_mail_host"
									placeholder="Mail Host" class="span12 m-b-n "
									style="">
							</div>
						</div>
						<div class="form-group p-xxs">
							<label class="control-label">Mail Port :
							</label>
							<div class="controls">
								<input type="text" name="form_mail_port" id="form_mail_port"
									placeholder="Mail Port" class="span12 m-b-n port "
									style="">
							</div>
						</div>
						<div class="form-group p-xxs">
							<label class="control-label">Mail Username :
							</label>
							<div class="controls">
								<input type="text" name="form_mail_username" id="form_mail_username"
									placeholder="Mail Username" class="span12 m-b-n "
									style="">
							</div>
						</div>
						<div class="form-group p-xxs">
							<label class="control-label">Mail Password :
							</label>
							<div class="controls">
								<input type="password" name="form_mail_password" id="form_mail_password"
									placeholder="Mail Password" class="span12 m-b-n "
									style="">
							</div>
						</div>
						<div class="form-group p-xxs">
							<label class="control-label">Mail Encryption :
							</label>
							<div class="controls">
								<input type="text" name="form_mail_encryption" id="form_mail_encryption"
									placeholder="Mail Encryption" class="span12 m-b-n "
									style="">
							</div>
						</div>
						<div class="form-group p-xxs">
							<label class="control-label">Web Domain :
							</label>
							<div class="controls">
								<input type="text" name="form_web_domain" id="form_web_domain"
									placeholder="Web Domain" class="span12 m-b-n "
									style="">
							</div>
						</div>
						
						
					</div>
       			</div>
					
					<!-- form End -->
					<!-- content end -->
				
				</div>
				<div class="modal-footer">
					<div align="right">
						<button class="btn btn-success" type="button" id="btnEmailSubmit" style="margin-left: 5px;">Save</button>
						<button data-dismiss="modal"  class="btn btn-danger btnEmailCancle" id="btnEmailCancel" type="button" style="margin-left: 5px;">Cancel</button>
					</div>
					<div class="alert alert-warning information" id="information3"
						style="display: none;"></div>
				</div>
			</div>
		</div>
	</div>
	<!-- Modal End Email -->
		