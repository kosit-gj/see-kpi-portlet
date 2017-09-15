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
//out.print(plid);

%>
<style>
	
	
	
	
	/* Large desktop Start#####################################*/
 @media (min-width: 1200px) { 
 
	.modal.large {
		    width: 90%;
		    margin-left:-45%;  
		    top:0px;
		}
		
	.aui .modal-body{
		/*max-height: 400px;*/
	}
	.aui .displayWeightOnMobile{
	display:none;

	}
	.aui .ibox-content .control-label{
    	text-align: right;
	}
	
	

	
	.aui .row-fluid#usageLogAdvanceSearchArea .span3{
		width: 24.5%;
	}
	.aui #btnUsageLogSearchArea{
		width: 99.3%;
	}
	
	
  }
  /* Large desktop End######################################*/
  
  /*  desktop Start#########################################*/
 @media (min-width: 980px) and (max-width: 1199px) {
 
 	.modal.large {
		    width: 90%;
		    margin-left:-45%;  
		    top:0px;
		}
		
	.aui .modal-body{
		/*max-height: 400px;*/	
	}
	.aui .displayWeightOnMobile{
	display:none;
	}
	.aui .ibox-content .control-label{
    	text-align: right;
	}
	
	.aui #usageLogAdvanceSearchArea.row-fluid .span3 {
    	width: 32.5%;
	}
	
	.aui #usageLogAdvanceSearchArea.row-fluid .span9 {
	    width: 98.621%;
	}
	
	.aui #btnUsageLogSearchArea{
		width: 98.621%;
	}
	
 	
  }
 /*  desktop End############################################*/
 
 /* Portrait tablet to landscape and desktop Start##########*/
 @media (min-width: 768px) and (max-width: 979px) {
 
	
	.modal.large {
		    width: 90%;
		    margin-left:-45%;  
		    top:0px;
		}
	.pagingText{
		display:block;
	}
	.aui .p-t-xxs {
    	text-align: right;
	}
	.pagianation_area{
		position:'';
	}
	
	.aui .modal-body{
		/*max-height: 400px;	*/
	}
	.checkWeigthOver{
		display:'block';
	}
	
	.aui .btnManagement{
		width:'';
	}
	.aui .displayWeightOnMobile{
	display:none;
	}
	
	
	.aui .ibox-content .control-label{
    	text-align: right;
	}
	
	.aui #usageLogAdvanceSearchArea.row-fluid .span3 {
	    width: 24.2%;
	}
	
	.aui #usageLogAdvanceSearchArea.row-fluid .span9 {
	    width: 73.909%;
	}
	
	.aui #btnUsageLogSearchArea{
		width:98.731%
	}

  }
 /* Portrait tablet to landscape and desktop End############*/ 
 
 /* Landscape phone to portrait tablet Start################*/
 @media (max-width: 767px) { 
 	
 	.modal.large {
 	
	    width: '';
	    top:0px;    
	}
	#grandTototalWeightArea{
		position: relative;
    	top: -385px;
	}
	.aui .ibox-content .control-label {
    	text-align: left;
	}
	
	
		.pagianation_area{
		/*position:absolute;*/
	}
	
	.aui .modal-body{
		/*max-height: 300px;	*/
	}
	.checkWeigthOver{
		display:none;
	}
	.aui .displayWeightOnMobile{
	display:inline;
	}
	.aui .btnAssignment{
		float:right;
	}
	
	.aui .btnManagement{
		width:100%;
	}
	.aui .p-t-xxs {
    	text-align: right;
	}
	.aui #btnUsageLogSearchArea{
		width: 100%;
		
	}
	
 
  }
 /* Landscape phone to portrait tablet End##################*/ 
 
 /* Landscape phones and down Start#########################*/
 @media (max-width: 480px) { 
 	
 	.pagingText{
		display:none;
	}
	.aui .ibox-content .control-label{
    	text-align: left;
	}
	.pagianation_area{
		/*position:absolute;*/
	}
	.aui .modal-body{
		/*max-height: 300px;	*/
	}
	
	.checkWeigthOver{
		display:none;
	}
	.total_weigth_all{
		display:block
	}
	.aui .btnAssignment{
		float:'';
	}
	.aui .displayWeightOnMobile{
	display:inline;
	}
	
	.aui .p-t-xxs {
    	text-align: left;
	}
	
	.aui #btnUsageLogSearchArea{
		width: 100%;
		
	}
  }
  /* Landscape phones and down End##########################*/
  
  
  .breadcrumbs2 {
    background: rgba(0, 0, 0, 0) linear-gradient(to bottom, #fff 0px, #f6f6f6 47%, #ededed 100%) repeat scroll 0 0;
    border-radius: 0;
    margin-bottom: 0;
    padding-bottom: 5px;
}

.aui #usageLogAdvanceSearchArea input[type="color"], .aui input[type="date"], .aui input[type="datetime"], .aui input[type="datetime-local"], .aui input[type="email"], .aui input[type="month"], .aui input[type="number"], .aui input[type="password"], .aui input[type="search"], .aui input[type="tel"], .aui input[type="text"], .aui input[type="time"], .aui input[type="url"], .aui input[type="week"], .aui select, .aui textarea, .aui .uneditable-input{
	margin-bottom: 0;
}
.ibox-title{
	min-height: 30px;
}
.aui #breadcrumbs {
    margin-bottom: 0;
}

.aui .table {
    margin-bottom: 0;
}
.aui .pagination {
    margin: 0;
}
</style>
<input type="hidden" id="user_portlet" name="user_portlet" value="<%=username%>">
<input type="hidden" id="pass_portlet" name="pass_portlet" value="<%=password%>">
<input type="hidden" id="url_portlet" name="url_portlet" value="<%= renderRequest.getContextPath() %>">
<input type="hidden" id="plid_portlet" name="plid_portlet" value="<%= plid %>">

<!-- 
This is the <b>Usage Log</b> portlet in View mode.2

 -->


				
<div class="row-fluid" style='display:block;' id='advanceSearchDisplay'>
	<!--  SEARCH ADVANCE START -->
            
            <div class="span12">
                    <div class="ibox float-e-margins">
                        <div class="ibox-title"> 
                             <div class='titlePanel'>Advance Search</div>
                        </div>
                        <div class="ibox-content breadcrumbs2"> 
         					
         					
         					<div  class="row-fluid " id='usageLogAdvanceSearchArea'>
									
									<div id="appraisalTypeArea" class="form-group span2"
										style="margin-left: 5px; margin-bottom: 3px;">
										<select data-toggle="tooltip" title="Appraisal Type"
											class="input form-control input-sm span12" id="appraisalType"
											name="appraisalType">
								
											<option value="">2017</option>
								
										</select>
									</div>
									 <div id='xxxArea' class="form-group span2"
										style="margin-left: 5px; margin-bottom: 3px;">
										<select data-toggle="tooltip" title="Xxx"
											class="input form-control input-sm span12" id="xxx"
											name="xxx">
								
											<option value="">ประเมินประจำปี 2017</option>
								
								
										</select>
									</div>
									<div id='xxxArea' class="form-group span2"
										style="margin-left: 5px; margin-bottom: 3px;">
										<select data-toggle="tooltip" title="Xxx"
											class="input form-control input-sm span12" id="xxx"
											name="xxx">
								
											<option value="">ทุกฝ่าย</option>
								
								
										</select>
									</div>
									
									
									
									<div id='appraisalLevelArea' class="form-group span2"
										style="margin-left: 5px; margin-bottom: 3px;">
										<select data-toggle="tooltip" title="Appraisal Level"
											class="input form-control input-sm span12" id="appraisalLevel"
											name="appraisalLevel">
								
											<option value="">ทุกเขต</option>
								
								
										</select>
									</div>
									<div class="form-group span2" style="margin-left: 5px; margin-bottom: 3px;">
										<select data-toggle="tooltip" title="" data-original-title="organization"
											class="input form-control input-sm span12" id="organization"
											name="organization">
											<option value=''>ทุก KPI</option>
										</select>
									</div>
									
									
									
									

								<div id='btnUsageLogSearchArea' class="form-group  m-b-none " style="margin-left: 5px; margin-bottom: 3px; text-align: right;  ">
									<button type="button" class="btn btn-info input-sm"
										name="btnSearchAdvance" id="btnSearchAdvance">
										<i class="fa fa-search"></i>&nbsp;Search
									</button>
									
								</div>
							
							</div>	
							
							
							
         					
				         </div>	
                    </div>
                </div>
            
            <!-- SEARCH ADVANCE END -->
</div>
<style>
	.branchText{
		float:left;
	}
	.branchPerformance{
		float: right;
	    position: absolute;
	    right: 5px;
	    top: 5px;
	}
	.ui-state-active, .ui-widget-content .ui-state-active, .ui-widget-header .ui-state-active, a.ui-button:active, .ui-button:active, .ui-button.ui-state-active:hover{
		background: whitesmoke;
	}
	
	.aui h1, .aui h2, .aui h3{
		line-height: 65px;
	}
	#mapPerfomanceArea{
		height:597px;
		
	}
</style>	
	<button id='btnCreateMap'>Create Map</button>			
<div class="row-fluid ">

   	<div class='span6'>
   		Span6
   		<div id='mapPerfomanceArea' ></div>
   	</div>
   	<div class='span6'>
   		
   		
   				<h3 style='text-align:center;'>
   				
   					Branch Performance: กทม.
   				
   				</h3>
   				
   				
   		
   				
   		
   		
   		
   		<div id='detailPerfomanceArea'>
   			<h3><span style='padding-top:10px;'>สาขา: คอนแวนต์</span>
   			
   
			 	
			 	<div class='branchPerformance'>
			  		<svg id="fillgauge1" width="70px" height="70px" onclick="gauge1.update(NewValue());"></svg>
			   	</div>
			   	<br style='clear:both'>
   			</h3>
			  
				
			
			  
			  
			  
			  
			  <div>
			   <!-- Content Start -->
			   		Test
			   <!-- Content End -->
			   
			   
			  </div>
			 
			  <h3><span style='padding-top:10px;'>สาขา: เซ็นต์หลุยส์ 3</span>
	   			
	   
				 	
				 	<div class='branchPerformance'>
				  		<svg id="fillgauge2" width="70px" height="70px" onclick="gauge1.update(NewValue());"></svg>
				   	</div>
				   	<br style='clear:both'>
	   			</h3>
	   			
			  <div>
			    <p>
			    Sed non urna. Donec et ante. Phasellus eu ligula. Vestibulum sit amet
			    purus. Vivamus hendrerit, dolor at aliquet laoreet, mauris turpis porttitor
			    velit, faucibus interdum tellus libero ac justo. Vivamus non quam. In
			    suscipit faucibus urna.
			    </p>
			  </div>
			  
			  <h3><span style='padding-top:10px;'>สาขา: ดอนเมือง</span>
	   			
	   
				 	
				 	<div class='branchPerformance'>
				  		<svg id="fillgauge3" width="70px" height="70px" onclick="gauge1.update(NewValue());"></svg>
				   	</div>
				   	<br style='clear:both'>
	   			</h3>
	   			
			  <div>
			    <p>
			    Nam enim risus, molestie et, porta ac, aliquam ac, risus. Quisque lobortis.
			    Phasellus pellentesque purus in massa. Aenean in pede. Phasellus ac libero
			    ac tellus pellentesque semper. Sed ac felis. Sed commodo, magna quis
			    lacinia ornare, quam ante aliquam nisi, eu iaculis leo purus venenatis dui.
			    </p>
			    <ul>
			      <li>List item one</li>
			      <li>List item two</li>
			      <li>List item three</li>
			    </ul>
			  </div>
			  
			  <h3><span style='padding-top:10px;'>สาขา: สะพานสูง</span>
	   			
	   
				 	
				 	<div class='branchPerformance'>
				  		<svg id="fillgauge4" width="70px" height="70px" onclick="gauge1.update(NewValue());"></svg>
				   	</div>
				   	<br style='clear:both'>
	   			</h3>
			  <div>
			    <p>
			    Cras dictum. Pellentesque habitant morbi tristique senectus et netus
			    et malesuada fames ac turpis egestas. Vestibulum ante ipsum primis in
			    faucibus orci luctus et ultrices posuere cubilia Curae; Aenean lacinia
			    mauris vel est.
			    </p>
			    <p>
			    Suspendisse eu nisl. Nullam ut libero. Integer dignissim consequat lectus.
			    Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
			    inceptos himenaeos.
			    </p>
			  </div>
			
   			
   		</div>
   	</div>
	
</div>


<div id='embedParamSearch'></div>







 

