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
									<div class='span6 '>
									  <div class="titlePanelSearch" style="margin-left:0px;margin-bottom:10px;">KPI DASHBOARD</div>
									</div>
									<div class='span6 object-right'>
									
										<div class="span4 offset1 inputFormSearch">
											<div class="form-group">
												<label class="span4 control-label year-label numberOnly">Year:</label>
												<div id="connection_name0" class="span8  inputFormSearch">
												
												<select style="width:100%" name="paramYear" id="paramYear" class="form-control input-sm">
												
												</select>
												
												</div>
											</div>
										</div>
										<div class="span4 inputFormSearch">
											<div class="form-group">
												<label class="span4 control-label period-label numberOnly">Period:</label>
												<div id="connection_name0" class="span8 inputFormSearch">
												
												<select style="width:100%" name="paramMonth" id="paramMonth" class="form-control input-sm">
												
												</select>
												
												</div>
											</div>
										</div>
										
										<div class="span3">
										
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
							            
							            <div class="span8 " style='margin-left: px;'>
										
    
    											<div class="ibox float-e-margins" id="yui_patched_v3_11_0_1_1499078660628_1256">
							                        <div class="ibox-title" id="yui_patched_v3_11_0_1_1499078660628_1317">
							                            <div class="titlePanelSearch2 itemName" id="yui_patched_v3_11_0_1_1499078660628_1316">Balance Scorecard</div>
							                            
							                        </div>
							                        <div id="ibox-content-bsc" class="ibox-content" style="display: block; padding:5px;"> 
							                        
							                        
							                        	<div class='mytree'>
							                        	
							                        	 <script>
														//gernarate graph tree
															/*
															mytree = new dTree('mytree');
															mytree.add(145, -1, '<img width="50" height="50" src="images.png"/> Developers', 'team_index.asp?groupe_id=145', 'Developers', '', '');
															mytree.add(148, 145, '<img width="50" height="50" src="images.png"/> Desktop Developers', 'team_index.asp?groupe_id=148', 'Desktop Developers', '', '');
															mytree.add(147, 145, '<img width="50" height="50" src="images.png"/> Web Developers', 'team_index.asp?groupe_id=147', 'Web Developers', '', '');
															mytree.add(149, 147, '<img width="50" height="50" src="images.png"/> Asp.net Developers', 'team_index.asp?groupe_id=149', 'Asp.net Developers', '', '');
															mytree.add(151, 149, '<img width="50" height="50" src="images.png"/> Asp.net 1.0', 'team_index.asp?groupe_id=151', 'Asp.net 1.0', '', '');
															mytree.add(152, 149, '<img width="50" height="50" src="images.png"/> Asp.net 1.1', 'team_index.asp?groupe_id=152', 'Asp.net 1.1', '', '');
															mytree.add(153, 149, '<img width="50" height="50" src="images.png"/> Asp.net 2.0999999999999999999', 'team_index.asp?groupe_id=153', 'Asp.net 2.0', '', '');
															mytree.add(150, 147, '<img width="50" height="50" src="images.png"/> PHP Developers', 'team_index.asp?groupe_id=150', 'PHP Developers', '', '');
															mytree.add(154, 150, '<img width="50" height="50" src="images.png"/> Zend Studio', 'team_index.asp?groupe_id=154', 'Zend Studio', '', '');
															document.write(mytree); 
															*/
														 </script>
														 
							                        	
							                        	
							                        	</div>
							                        
							                        </div>
							                    </div>





							
										<!-- span8 -->
							            </div>
							            <!-- span8 -->
							            
							            
							            
							            
							            
         							
         							</div>
         							<!-- content end -->
				         		</div>
				         		
				         		</div>
				         		
         				</div>
	
         			</div><!-- end--row-fluid -->
         			
         					 
  </div>       					
 <!--  #####################Content data here ######################-->
 
 
 
 

 
 
 
 
 
 
 
 
 
 




 
 
