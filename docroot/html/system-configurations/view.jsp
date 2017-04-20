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
									<div class="span3" id="salarySystem"></div>

                                 </div> 
                                 
                                 <div class="row-fluid">
							
									<div class="span5 object-right" >
									<label>  </label>
									
									</div>
									<div class="span3">
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
		
	




		