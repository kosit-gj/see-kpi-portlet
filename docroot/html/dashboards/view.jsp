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
    	.year-label{
    		text-align:right;
    	}
    	.period-label{
    		text-align:right;
    	}
    	.wrapper-content {
		    padding: 0px 10px;
		} 
     }
    /* Portrait tablet to landscape and desktop End############*/ 
    
    /* Landscape phone to portrait tablet Start################*/
    @media (max-width: 767px) { 
   	 	.year-label{
    		text-align:left;
    	}
    	.period-label{
    		text-align:left;
    	}
    	.wrapper-content {
		    padding: 0px 0px;
		}
     }
    /* Landscape phone to portrait tablet End##################*/ 
    
    /* Landscape phones and down Start#########################*/
    @media (max-width: 480px) { 
    	
    	.year-label{
    		text-align:left;
    	}
    	.period-label{
    		text-align:left;
    	}
    	.wrapper-content {
		    padding: 0px 0px;
		}
		    	
    	
     }
     /* Landscape phones and down End##########################*/
     
     
     



	.aui #breadcrumbs {
	    margin-bottom: 0px;
	}
	.aui .portlet-content, .aui .portlet-minimized .portlet-content-container {
	  background-color: #fafafa;
	}
	.jqplot-table-legend-label{width: 79px;}
	
	.ibox-content{
		padding:5px;
	}
	.ibox-title{
		min-height: auto;
	}
	.ibox-title {
	
		padding: 5px;
	
	}
	.aui .table th, .aui .table td{
	 padding: 3px;
	 padding-left:5px;
	 font-size: 13px;
	}
	.aui .nav-tabs > li > a
	 border-radius: 0px 0px 0px 0px;
	}
	
	
	.aui .tab-content {
    overflow: visible;
	}
	
	.ball{
		width:20px;
		height:20px;border-radius:100px; 
		float:left;
	}
	
	.ibox-content{
		display: none;
	}
	.aui .titleL{
	float:left;
	}
	
	.aui .titleR{
	float:right;
	}
	.aui .ballStatus{
	height:20px;
	width:20px;
	border-radius:100%;
	}
	
	.aui .clicked{
		background-color:white;
	}
	

	
</style>

</head>

<body class="top-navigation gray-bg ">

<!--  #####################Content data here ######################-->
<div class="">
<!-- 
<h2>
	<i class="fa fa fa-dashboard icon-title"></i> 
	<span id="modalDescription"> Company Dashboard</span> 
</h2>
 -->
				<div class="row-fluid"><!-- start--row-fluid -->

                    <div class="span12">
                        <div class="ibox float-e-margins">
                            <div class="ibox-title" style='padding-bottom:0px;'>
								<div class='container-fluid'>
									<div class='span2 '>
									  <div class="titlePanelSearch" style="margin-left:0px;margin-bottom:10px;">KPI DASHBOARD</div>
									</div>
									<div class='span10 object-right'>
									
										<div class="span3 offset1 inputFormSearch">
											<div class="form-group">
												<label class="span4 control-label year-label numberOnly">Year:</label>
												<div id="connection_name0" class="span8  inputFormSearch">
												
												<select style="width:100%" name="paramYear" id="paramYear" class="form-control input-sm">
												
												</select>
												
												</div>
											</div>
										</div>
										<div class="span3 inputFormSearch">
											<div class="form-group">
												<label class="span4 control-label period-label numberOnly">Period:</label>
												<div id="connection_name0" class="span8 inputFormSearch">
												
												<select style="width:100%" name="paramMonth" id="paramMonth" class="form-control input-sm">
												
												</select>
												
												</div>
											</div>
										</div>
										<div class="span3 inputFormSearch">
											<div class="form-group">
												<label class="span4 control-label period-label numberOnly">Employee: </label>
												<div id="connection_name0" class="span8 inputFormSearch">
												
												<select style="width:100%" name="paramEmp" id="paramEmp" class="form-control input-sm">
													
												</select>
												
												</div>
											</div>
										</div>
										
										<div class="span2">
										
											<button id="btnSearchAdvance" name="btnSearchAdvance" class="btn btn-info input-sm" type="submit" style="margin-bottom: 5px;">&nbsp;<span>Submit</span></button>
			
										</div>
										
									</div>
								</div>                               
                                 
         					</div>
         					
         						<div class="ibox-content"> 
         							<!-- content start -->
         							<div class='row-fluid'>
         								
         								
	         							<div class="span4">
							                    <div class="ibox float-e-margins">
							                        <div class="ibox-title">
							                            <div class='titlePanelSearch2'>Balance Scorecard</div>
							                            
							                        </div>
							                        <div class="ibox-content" id='ibox-content-bsc'>

							                        </div>
							                    </div>
							            </div>
							            
							            <div class="span8 " style='margin-left: 5px;'>
	<ul class="nav nav-tabs" style="width:30; margin-bottom: 0px;">
		<li class="active"><a data-toggle="tab" href="#monthly" id="Monthly_tab" style='border-radius: 0px;'>Monthly</a></li>
		<li><a data-toggle="tab" href="#YTD" id="YTD_tab" style=' border-radius: 0px;'>YTD</a></li>
	</ul>
	
<div class="tab-content" style='overflow: visible; '>
<div class='itemName ' style='text-align:center; padding:5px; font-weight:bold; margin: 5px;'></div>
    <div id="monthly" class="tab-pane fade in active">
    										<div class='row-fluid wrapper-content'>
							            		<div class='span12'>
								                    <div class="ibox float-e-margins">
								                        <!--<div class="ibox-title">
								                             <div class='titlePanelSearch2'>Monthly</div> 
								                            
								                        </div>-->
								                        <div class="ibox-content">
								                            
								                            <div class='row-fluid'>
								                            	
								                            	<div class='span12'  id='monthlyVarianceArea'>
								                            		<div class='chart'  style="width:100%" id='monthlyVariance'></div>
								                            	</div>
								                            </div>
								                            <div class='row-fluid'>	
								                            	<div class='span12' id='monthlyGrowthArea'>
								                            		<div class='chart'  style="width:100%" id='monthlyGrowth'></div>
								                            	</div>
								                            </div>
								                            
								                        </div>
								                    </div>
							                   	</div>
							                </div>
    
    </div>
    <div id="YTD" class="tab-pane fade">
    										<div class='row-fluid  wrapper-content'>
							            		<div class='span12'>
								                    <div class="ibox float-e-margins">
								                        <!--<div class="ibox-title">
								                              <div class='titlePanelSearch2'>YTD</div>
								                            
								                        </div> -->
								                        <div class="ibox-content">
								                        
								                            <div class='row-fluid'>
								                           <!-- <div class='itemName yellow2' style='text-align:center; padding:5px; font-weight:bold; margin-bottom: 5px;'></div> --> 
								                            	<div class='span12' id='ytdVarianceArea'>
								                            		<div class='chart' style="width:100%" id='ytdVariance'></div>
								                            	</div>
								                            </div>
								                            <div class='row-fluid'>
								                            	<div class='span12' id='ytdGrowthArea'>
								                            		<div class='chart' style="width:100%" id='ytdGrowth'></div>
								                            	</div>
								                            </div>
								                            
								                        </div>
								                    </div>
							                   	</div>
							                </div>
							                
    </div>
</div>  
							            </div>
							            
         							
         							</div>
         							<!-- content end -->
				         		</div>
				         		
				         		</div>
				         		
         				</div>
	
         			</div><!-- end--row-fluid -->
         			
         					 
  </div>       					
 <!--  #####################Content data here ######################-->
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 




 
 
