<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<%@ taglib uri="http://alloy.liferay.com/tld/aui" prefix="aui"%>
<%@ page import="javax.portlet.*"%>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://liferay.com/tld/theme" prefix="liferay-theme" %>
<%@ page import="com.liferay.portal.kernel.util.WebKeys" %>
<liferay-theme:defineObjects />
<portlet:defineObjects />
<%

String username = themeDisplay.getUser().getScreenName();
String password = (String)request.getSession().getAttribute(WebKeys.USER_PASSWORD);
layout = themeDisplay.getLayout();
plid = layout.getPlid();
out.print(plid);

%>
<style>
	.aui .row-fluid#usageLogAdvanceSearchArea .span3{
		width: 24.57%;
	}
</style>
<input type="hidden" id="user_portlet" name="user_portlet" value="<%=username%>">
<input type="hidden" id="pass_portlet" name="pass_portlet" value="<%=password%>">
<input type="hidden" id="url_portlet" name="url_portlet" value="<%= renderRequest.getContextPath() %>">


This is the <b>Usage Log</b> portlet in View mode.2




				
<div class="row-fluid">
	<!--  SEARCH ADVANCE START -->
            
            <div class="span12">
                    <div class="ibox float-e-margins">
                        <div class="ibox-title">
                            <h5>Advance Search </h5>   
                        </div>
                        <div class="ibox-content breadcrumbs2"> 
         					
         					
         					<div  class="row-fluid " id='usageLogAdvanceSearchArea'>
									
									<div id="appraisalTypeArea" class="form-group pull-left span3"
										style="margin-left: 5px; margin-bottom: 3px;">
										<select data-toggle="tooltip" title="Appraisal Type"
											class="input form-control input-sm span12" id="appraisalType"
											name="appraisalType">
								
											<option value="0"></option>
								
										</select>
									</div>
									 <div id="empNameArea" class="form-group pull-left span3"
										style="margin-left: 5px; margin-bottom: 3px;">
										<input data-toggle="tooltip" type="text" class="form-control input-sm span12 "
											placeholder="Emp Name" id="empName" data-original-title="Employee Name">
									</div>
									 <div id="PositionArea" class="form-group pull-left span3"
										style="margin-left: 5px; margin-bottom: 3px;">
										<input data-toggle="tooltip" type="text" id="Position" placeholder="Position"
											class="form-control input-sm span12" data-original-title="Position">
									</div>
									
									<div id="appraisalTypeArea" class="form-group pull-left span3"
										style="margin-left: 5px; margin-bottom: 3px;">
										<select data-toggle="tooltip" title="Appraisal Type"
											class="input form-control input-sm span12" id="appraisalType"
											name="appraisalType">
								
											<option value="0"></option>
								
										</select>
									</div>
									 <div id="empNameArea" class="form-group pull-left span3"
										style="margin-left: 5px; margin-bottom: 3px;">
										<input data-toggle="tooltip" type="text" class="form-control input-sm span12 "
											placeholder="Emp Name" id="empName" data-original-title="Employee Name">
									</div>
									 <div id="PositionArea" class="form-group pull-left span3"
										style="margin-left: 5px; margin-bottom: 3px;">
										<input data-toggle="tooltip" type="text" id="Position" placeholder="Position"
											class="form-control input-sm span12" data-original-title="Position">
									</div>
									 <div id="PositionArea" class="form-group pull-left span3"
										style="margin-left: 5px; margin-bottom: 3px;">
										<input data-toggle="tooltip" type="text" id="Position" placeholder="Position"
											class="form-control input-sm span12" data-original-title="Position">
									</div>
									 <div id="PositionArea" class="form-group pull-left span3"
										style="margin-left: 5px; margin-bottom: 3px;">
										<input data-toggle="tooltip" type="text" id="Position" placeholder="Position"
											class="form-control input-sm span12" data-original-title="Position">
									</div>
									 <div id="PositionArea" class="form-group pull-left span3"
										style="margin-left: 5px; margin-bottom: 3px;">
										<input data-toggle="tooltip" type="text" id="Position" placeholder="Position"
											class="form-control input-sm span12" data-original-title="Position">
									</div>
									
									
							
								<div class="form-group pull-right m-b-none "
									style="margin-bottom: 5px;">
									<button type="button" class="btn btn-info input-sm"
										name="btnSearchAdvance" id="btnSearchAdvance">
										<i class="fa fa-search"></i>&nbsp;Search
									</button>
									<button type="button" data-target='#ModalAssignment'
										data-toggle='modal' class="btn btn-warning input-sm"
										name="btnAssignment" id="btnAssignment">
										<i class="fa fa-sign-in"></i>&nbsp;Assign
									</button>
								</div>
							
							</div>	
         					
				         </div>	
                    </div>
                </div>
            
            <!-- SEARCH ADVANCE END -->
</div>
				
<div class="row-fluid display_result">

    <div class="span12">
        <div class="ibox float-e-margins">
            <div class="ibox-title">
                  </div>
                  <div class="ibox-content">
                   
                   
                <!-- pagination start -->
                    <div class="row-fluid">
                       <div class="span9 ">
						<span class="pagination_top"></span>
                       </div>
                        <div class="span3 object-right paging-text">
                        
                        	<div class='pagingDropdown'>
                        	
                        			<select name="account" id='countPaginationTop'  class="form-control input-sm span12 countPagination">
			                             <option>10</option>
			                             <option>20</option>
			                             <option>50</option>
			                             <option>100</option>
			                         </select>
                        	
                        	</div>
							<div class='pagingText'>Results per page</div>
						
                        </div>
                        <!-- 
                        <div class="span1">
                       	<select name="account" id='countPaginationTop'  class="form-control input-sm countPagination">
                             <option>10</option>
                             <option>20</option>
                             <option>30</option>
                             <option>40</option>
                         </select> 
                       	</div>
                       	 -->
                     </div> 
              <!-- pagination end --> 
              <div class='row-fluid'>
              	<div class=''> 
	                <div class="table-responsive">
	        
	                    <!--  main table  start-->
	               		  <table class="table" id="mainTableUsageLog">
	               		  <thead>
	                        <tr  class="active">
								<!-- <th>Usage Log.</th> -->
								
	                        </tr>
	                        </thead>
		               		  	<tbody id="listMainUsageLog">	
			               		<tbody>
	               		  	</table>
	               		<!--  main table end -->
	                </div>
                </div>    
                </div>
                <!-- pagination start -->
                    <div class="row-fluid">
                       <div class="span9 ">
						<span class="pagination_top"></span>
                       </div>
                        <div class="span3 object-right paging-text">
                        
                        	<div class='pagingDropdown'>
	                        	<select name="account" id='countPaginationBottom'  class="form-control input-sm span12 countPagination">
	                             	<option>10</option>
	                             	<option>20</option>
	                             	<option>50</option>
	                             	<option>100</option>
	                         	</select> 
                        	
                        	</div>
							<div class='pagingText'>Results per page</div>
                        
                        </div>
                        <!-- 
                        <div class="span1">
                       	<select name="account" id='countPaginationBottom'  class="form-control input-sm countPagination">
                             <option>10</option>
                             <option>20</option>
                             <option>30</option>
                             <option>40</option>
                         </select> 
                       	</div>
                       	 -->
                     </div> 
              	<!-- pagination end -->
                <br style='clear:both'>
            </div>
        </div>
    </div>

</div>


 

