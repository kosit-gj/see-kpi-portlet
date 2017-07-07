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
         			<div class="row-fluid">
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
										<div class="span3" id="drop_down_list_month"></div>
									</div>
								
								
									<div class="row-fluid">
										<div class="span5 object-right" >
											<label class='text-label'>  Appraisal Frequency &nbsp;:</label>
										</div>
										<div class="span3" id="appraisalSystem"></div>
									</div>
									
									<div class="row-fluid">
										<div class="span5 object-right" >
											<label class='text-label'>   Bonus Frequency  &nbsp;:</label>
												
										</div>
										<div class="span3" id="bonusfreSystem"></div>
	                	
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
									</div>

                                 </div> 
                                 <div class="row-fluid">
							
									<div class="span5 object-right" >
									<label class='text-label'>  Raise Type  &nbsp;:</label>
									
									</div>
									<div class="span3">
										
										<label class="radio" style="margin-bottom: 10px; float: left; margin-right: 10px;">
											  <input checked='checked'  type="radio" name="optionsRadios" id="raiseFixAmount" value="0">
											  Fix Amount
										</label>
										<label class="radio" style="margin-bottom: 10px; float: left; margin-right: 10px;">
											<input type="radio" name="optionsRadios" id="raisePercentage" value="1" >
											  Percentage
										</label>
										
									</div>

                                 </div> 
                                 <div class="row-fluid">
							
									<div class="span5 object-right" >
									<label class='text-label'>  Result Type  &nbsp;:</label>
									
									</div>
									<div class="span5">
										
										
										<label class="radio" style="margin-bottom: 10px; float: left; margin-right: 10px;">
											<input type="radio" name="optionsRadios2" id="resultPercentage" value="0" checked='checked'>
											  Percentage
										</label>
										<label class="radio" style="margin-bottom: 10px; float: left; margin-right: 10px;">
											  <input   type="radio" name="optionsRadios2" id="raiseScore" value="1">
											  Score
										</label>
										<button disabled data-target="#ModalEmpResult" data-toggle="modal" class=" btn btn-success " type="button" id="btnEmpResult" style="margin: -6px 10px 6px 10px;" >Employee Result Thershold</button>
									</div>

                                 </div> 
                                 <div class="row-fluid">
							
									<div class="span5 object-right" >
									<label class='text-label'>  Theme Color &nbsp;:</label>
									
									</div>
									<div class="span3" style="margin-bottom: 25px;">
										<button
										    class="jscolor {valueElement:null,value:'ffcc00',valueElement:'themeColor',onFineChange:'updateThemeFn(this)'}"
										    style="width:50px; height:20px;"></button>
										    <input type="hidden" id="themeColor" value="">
										   
									</div>

                                 </div> 
                                 <div class="row-fluid">
							
									<div class="span5 object-right" >
									<label>  </label>
									
									</div>
									<div class="span5 btn-right">
										<input type="hidden" name="id" id="id" value="">
						   				<input type="hidden" name="action" id="action" value="add">
						   				
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
					<h4 class="modal-title" id="modalTitleRole">Emp Thershold</h4>
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
					<input type="hidden" name="action" id="action" value="add">
					<div class="alert alert-warning" id="information"
						style="display: none;"></div>
				</div>
			</div>
		</div>
	</div>
	<!-- Modal End Role -->




		