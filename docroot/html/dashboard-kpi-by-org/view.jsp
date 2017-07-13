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

<link rel="StyleSheet" href="/see-kpi-portlet/js/Horizontal_Tree/dtree/dtree.css" type="text/css" />
<script type="text/javascript" src="/see-kpi-portlet/js/Horizontal_Tree/dtree/vertdtree.js"></script>


<style>

/*main css*/
.dtree a.nodeSel {
    background-color: white;
}

.aui .row-fluid .span8 {
    width: 67.812%;
}

.aui .row-fluid .span9 {
    width: 76.359%;
}

.aui .row-fluid [class*="span"] {
  
    margin-left: 0.564%;
 
}
.orgBOx{
	width:200px;
	/*background:#f9f9f9;*/
	border-radius:4px;
	border: 1px solid #ddd;
	padding: 5px;
	text-align: left;
	margin-left:5px;
	
	background: #ECE9E6;  /* fallback for old browsers */
background: -webkit-linear-gradient(to bottom, #FFFFFF, #ECE9E6);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to bottom, #FFFFFF, #ECE9E6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	
}
.orgBOx .orgBoxL{
	float:left;
	width:65px;
}
.orgBOx .orgBoxR{
	float:left;
	width:135px;
	padding-top:5px;
}
.orgText{
	height:15px;
}
	
.dtree a.node, .dtree a.nodeSel {
    padding: 0;
}



.aui .modal{
	 left: 0;
	 top: 0;
	 margin-left: 0px;
	/* width: 100%;*/
	 border-radius: 0px;
	/* height:100%;*/
 }
 
.aui .modal.fade.in {
    top: 0;
}


.titleL{
	float:left;
	width:70%;
}
.titleR{
	float:right;
	width:25%;
	text-align:right;
	padding-right:5px;
}
#fullscreen{
	cursor:pointer;
}





/*main css*/

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
													<option value="2017">2017</option>
												</select>
												
												</div>
											</div>
										</div>
										<div class="span4 inputFormSearch">
											<div class="form-group">
												<label class="span4 control-label period-label numberOnly">Period:</label>
												<div id="connection_name0" class="span8 inputFormSearch">
												
												<select style="width:100%" name="paramMonth" id="paramMonth" class="form-control input-sm">
													<option value="5">Nov</option>
													<option value="6">Dec</option>
													<option value="7">Jan</option>
													<option value="8">Feb</option>
													<option value="9">Mar</option>
													<option value="10">Apr</option>
													<option value="11">May</option>
													<option value="12">Jun</option>
													<option value="13">Jul</option>
													<option value="14">Aug</option>
													<option value="15">Sep</option>
													<option value="16">Oct</option>
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
         								
         								
	         							<div class="span3">
							                    <div class="ibox float-e-margins">
							                        <div class="ibox-title">
							                            <div class='titlePanelSearch2'>Balance Scorecard</div>
							                            
							                        </div>
							                        <div class="ibox-content" id='ibox-content-bsc'>

							                        </div>
							                    </div>
							            </div>
							            
							            <div class="span9 " style='margin-left: px;'>
										
    
    											<div class="ibox float-e-margins" id="yui_patched_v3_11_0_1_1499078660628_1256">
							                        <div class="ibox-title" id="yui_patched_v3_11_0_1_1499078660628_1317">
							                        	<div class='titleL'>
							                            	<div class="titlePanelSearch2 itemName" id="yui_patched_v3_11_0_1_1499078660628_1316"></div>
							                           		
							                            </div>
							                            <div class='titleR'>
							                            	<a href="#myModal" role="button"  style='color:black;' data-toggle="modal"><i  id='fullscreen' class="icon-resize-full"></i></a>
							                            </div>
							                            <br style='clear:both'>
							                            
							                        </div>
							                        <div id="ibox-content-bsc" class="ibox-content scrollbar-inner" style="display: block; padding:5px;"> 
							                        
							                        
							                        
							                        	
							                        	 <script language=javascript>	
							                        	 
							                        		 
							                        	mytree2 = new dTree('mytree2');
							                 			mytree2.add(145, -1, ' <div class="orgBOx"><div class="orgBoxL"><img width="50" height="50" src="/see-kpi-portlet/img/a1.jpg" class="img-circle" style="border:4px solid orange;" id="yui_patched_v3_11_0_1_1499158953997_1443"></div><div class="orgBoxR"><div class="orgText">Score : <span style="font-size:16px; font-weight:bold;">70%</span></div><div class="orgText">กลุ่มงานกลยุทธ์องค์กร</div><div class="orgText" id="" style="font-size:12px;">นายพิษณุพร ขาวประเสริฐ</div><div class="orgText" id="" style="font-size:12px;"><em>รองกรรมการผู้จัดการ</em></div></div><br style="clear:both"></div>', '#', 'เป้าหมายสิ้นปี:10,000 ล้าน | ผลงาน:7,000 ล้าน', 'Test2', 'Test3');															

							                 			
							                 			mytree2.add(147, 145, ' <div class="orgBOx"><div class="orgBoxL"><img width="50" height="50" src="/see-kpi-portlet/img/a4.jpg" class="img-circle" style="border:4px solid orange;" id="yui_patched_v3_11_0_1_1499158953997_1443"></div><div class="orgBoxR"><div class="orgText">Score : <span style="font-size:16px; font-weight:bold;">78%</span></div><div class="orgText">สายงานกลยุทธ์ 1</div> <div class="orgText">นายสมบัติ ทวีผลจรูญ</div><div class="orgText" id="" style="font-size:12px;"><em>ผู้ช่วยกรรมการผู้จัดการ</em></div> </div><br style="clear:both"></div>', '#', 'เป้าหมายสิ้นปี:2,500 ล้าน | ผลงาน:1,950 ล้าน', '', '');
							                 			mytree2.add(149, 145, ' <div class="orgBOx"><div class="orgBoxL"><img width="50" height="50" src="/see-kpi-portlet/img/a4.jpg" class="img-circle" style="border:4px solid #00ff00;" id="yui_patched_v3_11_0_1_1499158953997_1443"></div><div class="orgBoxR"><div class="orgText">Score : <span style="font-size:16px; font-weight:bold;">85%</span></div><div class="orgText">สายงานกลยุทธ์ 2</div> <div class="orgText">นายวิชัย วิรัตกพันธ์</div><div class="orgText" id="" style="font-size:12px;"><em>ผู้ช่วยกรรมการผู้จัดการ</em></div> </div><br style="clear:both"></div>', '#', 'เป้าหมายสิ้นปี:2,500 ล้าน | ผลงาน:2,125 ล้าน', '', '');
							                 			mytree2.add(151, 145, ' <div class="orgBOx"><div class="orgBoxL"><img width="50" height="50" src="/see-kpi-portlet/img/a4.jpg" class="img-circle" style="border:4px solid orange;" id="yui_patched_v3_11_0_1_1499158953997_1443"></div><div class="orgBoxR"><div class="orgText">Score : <span style="font-size:16px; font-weight:bold;">79%</span></div><div class="orgText">สายงานเทคโนโลยี</div><div class="orgText" id="" style="font-size:12px;">สารสนเทศ</div><div class="orgText">นายอภิรัตน์ อรุณวิไลรัตน์</div><div class="orgText" id="" style="font-size:12px;"><em>ผู้ช่วยกรรมการผู้จัดการ</em></div> </div><br style="clear:both"></div>', '#', 'เป้าหมายสิ้นปี:2,500ล้าน | ผลงาน:1,975 ล้าน', '', '');
							                 			mytree2.add(152, 145, ' <div class="orgBOx"><div class="orgBoxL"><img width="50" height="50" src="/see-kpi-portlet/img/a6.jpg" class="img-circle" style="border:4px solid red;" id="yui_patched_v3_11_0_1_1499158953997_1443"></div><div class="orgBoxR"><div class="orgText">Score : <span style="font-size:16px; font-weight:bold;">66%</span></div><div class="orgText">สายงานบริหารโครงการ</div><div class="orgText">สารสนเทศและสนับสนุน</div><div class="orgText" id="" style="font-size:12px;">ระบบงานหลัก</div> <div class="orgText">นางสมจิตต์ รถทอง</div><div class="orgText" id="" style="font-size:12px;"><em>ผู้ช่วยกรรมการผู้จัดการ</em></div> </div><br style="clear:both"></div>', '#', 'เป้าหมายสิ้นปี:2,500ล้าน | ผลงาน:1,650 ล้าน', '', '');
							                 			
							                 		
							                 			
							                 			mytree2.add(156, 147, ' <div class="orgBOx"><div class="orgBoxL"><img width="50" height="50" src="/see-kpi-portlet/img/a3.jpg" class="img-circle" style="border:4px solid red;" id="yui_patched_v3_11_0_1_1499158953997_1443"></div><div class="orgBoxR"><div class="orgText">Score : <span style="font-size:16px; font-weight:bold;">55%</span></div><div class="orgText">นางสาวหทัยทิพย์ เหลืองธนาพลกุล</div><div class="orgText" id="" style="font-size:12px;"><em>ฝ่ายวิเคาราะห์และ</em></div><div class="orgText" id="" style="font-size:12px;"><em>วางแผนกลยุทธ์</em></div><div class="orgText" id="" style="font-size:12px;"><em>รษก.</em></div></div><br style="clear:both"></div>', '#', 'เป้าหมายสิ้นปี:1,250 ล้าน | ผลงาน:688 ล้าน', '', '');
							                 			mytree2.add(157, 147, ' <div class="orgBOx"><div class="orgBoxL"><img width="50" height="50" src="/see-kpi-portlet/img/a4.jpg" class="img-circle" style="border:4px solid red;" id="yui_patched_v3_11_0_1_1499158953997_1443"></div><div class="orgBoxR"><div class="orgText">Score : <span style="font-size:16px; font-weight:bold;">68%</span></div><div class="orgText">นายสุรจิต สุวรรณมณี</div><div class="orgText" id="" style="font-size:12px;"><em>ฝ่ายพัฒนากระบวนงาน</em></div><div class="orgText" id="" style="font-size:12px;"><em>รษก.</em></div></div><br style="clear:both"></div>', '#', 'เป้าหมายสิ้นปี:1,250 ล้าน | ผลงาน:850 ล้าน', '', '');
							                 			
							                 			
							                 			mytree2.add(158, 149, ' <div class="orgBOx"><div class="orgBoxL"><img width="50" height="50" src="/see-kpi-portlet/img/a5.jpg" class="img-circle" style="border:4px solid #00ff00;" id="yui_patched_v3_11_0_1_1499158953997_1443"></div><div class="orgBoxR"><div class="orgText">Score : <span style="font-size:16px; font-weight:bold;">88%</span></div><div class="orgText">นางสุวัฒนา ทิมมาศย์</div><div class="orgText" id="" style="font-size:12px;"><em>ฝ่ายประเมินผลองค์กร</em></div><div class="orgText" id="" style="font-size:12px;"><em>รษก.</em></div></div><br style="clear:both"></div>', '#', 'เป้าหมายสิ้นปี:1,250 ล้าน | ผลงาน:1,100 ล้าน', '', '');
							                 			mytree2.add(159, 149, ' <div class="orgBOx"><div class="orgBoxL"><img width="50" height="50" src="/see-kpi-portlet/img/a6.jpg" class="img-circle" style="border:4px solid #2aad2a;" id="yui_patched_v3_11_0_1_1499158953997_1443"></div><div class="orgBoxR"><div class="orgText">Score : <span style="font-size:16px; font-weight:bold;">90%</span></div><div class="orgText">นางสาวเยาวนี ศรีสาคร</div><div class="orgText" id="yui_patched_v3_11_0_1_1499158953997_1398" style="font-size:12px;"><em>ฝ่ายประเมินผลองค์กร</em></div><div class="orgText" id="" style="font-size:12px;"><em>รษก.</em></div></div><br style="clear:both"></div>', '#', 'เป้าหมายสิ้นปี:1,250 ล้าน | ผลงาน:1,125 ล้าน', '', '');
							                 			
							                 			
							                 			mytree2.add(160, 151, ' <div class="orgBOx"><div class="orgBoxL"><img width="50" height="50" src="/see-kpi-portlet/img/a7.jpg" class="img-circle" style="border:4px solid orange;" id="yui_patched_v3_11_0_1_1499158953997_1443"></div><div class="orgBoxR"><div class="orgText">Score : <span style="font-size:16px; font-weight:bold;">72%</span></div><div class="orgText">นายศรพงศ์ ดุรงคเวโรจน์</div><div class="orgText" id="yui_patched_v3_11_0_1_1499158953997_1398" style="font-size:12px;"><em>ฝ่ายวิชาการและเผยแพร่</em></div><div class="orgText" id="" style="font-size:12px;"><em>ด้านเทคโนโลยีสารสนเทศ</em></div></div><br style="clear:both"></div>', '#', 'เป้าหมายสิ้นปี:1,250 ล้าน | ผลงาน:900 ล้าน', '', '');
							                 			mytree2.add(161, 151, ' <div class="orgBOx"><div class="orgBoxL"><img width="50" height="50" src="/see-kpi-portlet/img/a8.jpg" class="img-circle" style="border:4px solid orange;" id="yui_patched_v3_11_0_1_1499158953997_1443"></div><div class="orgBoxR"><div class="orgText">Score : <span style="font-size:16px; font-weight:bold;">78%</span></div><div class="orgText">นายสราวุธ อุยานนนท์</div><div class="orgText" id="yui_patched_v3_11_0_1_1499158953997_1398" style="font-size:12px;"><em>ฝ่ายปฎิบัติการสารสนเทศ</em></div></div><br style="clear:both"></div>', '#', 'เป้าหมายสิ้นปี:1,250 ล้าน | ผลงาน:975 ล้าน', '', '');
							                 			
							                 			
							                 			mytree2.add(163, 152, ' <div class="orgBOx"><div class="orgBoxL"><img width="50" height="50" src="/see-kpi-portlet/img/a1.jpg" class="img-circle" style="border:4px solid red;" id="yui_patched_v3_11_0_1_1499158953997_1443"></div><div class="orgBoxR"><div class="orgText">Score : <span style="font-size:16px; font-weight:bold;">63%</span></div><div class="orgText">นางบุษกร ปภัสสรศิริ</div><div class="orgText" id="yui_patched_v3_11_0_1_1499158953997_1398" style="font-size:12px;"><em>ศูนย์ความมั่นคงปลอดภัย</em></div><div class="orgText" id="" style="font-size:12px;"><em>รษก.</em></div></div><br style="clear:both"></div>', '#', 'เป้าหมายสิ้นปี:1,250 ล้าน | ผลงาน:788 ล้าน', '', '');
							                 			mytree2.add(164, 152, ' <div class="orgBOx"><div class="orgBoxL"><img width="50" height="50" src="/see-kpi-portlet/img/a2.jpg" class="img-circle" style="border:4px solid red;" id="yui_patched_v3_11_0_1_1499158953997_1443"></div><div class="orgBoxR"><div class="orgText">Score : <span style="font-size:16px; font-weight:bold;">66%</span></div><div class="orgText">นางสมจิตต์ รถทอง รษก.</div><div class="orgText" id="yui_patched_v3_11_0_1_1499158953997_1398" style="font-size:12px;"><em>ฝ่ายบริหารโครงการสารสนเทศ</em></div><div class="orgText" id="" style="font-size:12px;"><em>รษก.</em></div></div><br style="clear:both"></div>', '#', 'เป้าหมายสิ้นปี:1,250 ล้าน | ผลงาน: 825ล้าน', '', '');
							                 	
							                 			
							                 			document.write(mytree2); 
															
															
													</script> 
							                        	
							                        	
							                        	
							                        <br style='clear:both'>
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
 <!-- 
 <a href="#" title="That&apos;s what this widget is">Tooltips</a>
  -->
 

 <!-- 
 <div class='orgBOx'>
 	<div class='orgBoxL'>
 		 <img width="50" height="50" src="/see-kpi-portlet/img/a1.jpg" class="img-circle" style="border:4px solid #00ff00;" id="yui_patched_v3_11_0_1_1499158953997_1443">
 	</div>
 	<div class='orgBoxR'>
 	
 		<div class='orgText'>Score : <span style="font-size:16px; font-weight:bold;">90%</span></div>
 		<div class='orgText'>เขมิกา เถาปล้อง</div>
 		<div class='orgText' id="yui_patched_v3_11_0_1_1499158953997_1398" style="font-size:12px;"><em>Developers</em></div>
 		
 	</div>
 	<br style='clear:both'>
 </div>
  -->

  

    <!-- Button to trigger modal -->
    <!-- 
    <a href="#myModal" role="button" class="btn" data-toggle="modal" id='modalExpand'>Launch demo modal</a>
      -->
    <!-- Modal -->
    <div id="myModal" class="modal  fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style='z-index:100000000000000;'>
      <div class="modal-header" style='background:#fc0;'>
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="icon-resize-small"></i></button>
        <h3 id="myModalLabel" >Modal header</h3>
      </div>
      <div class="modal-body">
        <p>
        <script language=javascript>	
							                        	 
							                        		 
			mytree1 = new dTree('mytree1');
			mytree1.add(145, -1, ' <div class="orgBOx"><div class="orgBoxL"><img width="50" height="50" src="/see-kpi-portlet/img/a1.jpg" class="img-circle" style="border:4px solid orange;" id="yui_patched_v3_11_0_1_1499158953997_1443"></div><div class="orgBoxR"><div class="orgText">Score : <span style="font-size:16px; font-weight:bold;">70%</span></div><div class="orgText">กลุ่มงานกลยุทธ์องค์กร</div><div class="orgText" id="" style="font-size:12px;">นายพิษณุพร ขาวประเสริฐ</div><div class="orgText" id="" style="font-size:12px;"><em>รองกรรมการผู้จัดการ</em></div></div><br style="clear:both"></div>', '#', 'เป้าหมายสิ้นปี:10,000 ล้าน | ผลงาน:7,000 ล้าน', 'Test2', 'Test3');															

			
			mytree1.add(147, 145, ' <div class="orgBOx"><div class="orgBoxL"><img width="50" height="50" src="/see-kpi-portlet/img/a4.jpg" class="img-circle" style="border:4px solid orange;" id="yui_patched_v3_11_0_1_1499158953997_1443"></div><div class="orgBoxR"><div class="orgText">Score : <span style="font-size:16px; font-weight:bold;">78%</span></div><div class="orgText">สายงานกลยุทธ์ 1</div> <div class="orgText">นายสมบัติ ทวีผลจรูญ</div><div class="orgText" id="" style="font-size:12px;"><em>ผู้ช่วยกรรมการผู้จัดการ</em></div> </div><br style="clear:both"></div>', '#', 'เป้าหมายสิ้นปี:2,500 ล้าน | ผลงาน:1,950 ล้าน', '', '');
			mytree1.add(149, 145, ' <div class="orgBOx"><div class="orgBoxL"><img width="50" height="50" src="/see-kpi-portlet/img/a4.jpg" class="img-circle" style="border:4px solid #00ff00;" id="yui_patched_v3_11_0_1_1499158953997_1443"></div><div class="orgBoxR"><div class="orgText">Score : <span style="font-size:16px; font-weight:bold;">85%</span></div><div class="orgText">สายงานกลยุทธ์ 2</div> <div class="orgText">นายวิชัย วิรัตกพันธ์</div><div class="orgText" id="" style="font-size:12px;"><em>ผู้ช่วยกรรมการผู้จัดการ</em></div> </div><br style="clear:both"></div>', '#', 'เป้าหมายสิ้นปี:2,500 ล้าน | ผลงาน:2,125 ล้าน', '', '');
			mytree1.add(151, 145, ' <div class="orgBOx"><div class="orgBoxL"><img width="50" height="50" src="/see-kpi-portlet/img/a4.jpg" class="img-circle" style="border:4px solid orange;" id="yui_patched_v3_11_0_1_1499158953997_1443"></div><div class="orgBoxR"><div class="orgText">Score : <span style="font-size:16px; font-weight:bold;">79%</span></div><div class="orgText">สายงานเทคโนโลยี</div><div class="orgText" id="" style="font-size:12px;">สารสนเทศ</div><div class="orgText">นายอภิรัตน์ อรุณวิไลรัตน์</div><div class="orgText" id="" style="font-size:12px;"><em>ผู้ช่วยกรรมการผู้จัดการ</em></div> </div><br style="clear:both"></div>', '#', 'เป้าหมายสิ้นปี:2,500ล้าน | ผลงาน:1,975 ล้าน', '', '');
			mytree1.add(152, 145, ' <div class="orgBOx"><div class="orgBoxL"><img width="50" height="50" src="/see-kpi-portlet/img/a6.jpg" class="img-circle" style="border:4px solid red;" id="yui_patched_v3_11_0_1_1499158953997_1443"></div><div class="orgBoxR"><div class="orgText">Score : <span style="font-size:16px; font-weight:bold;">66%</span></div><div class="orgText">สายงานบริหารโครงการ</div><div class="orgText">สารสนเทศและสนับสนุน</div><div class="orgText" id="" style="font-size:12px;">ระบบงานหลัก</div> <div class="orgText">นางสมจิตต์ รถทอง</div><div class="orgText" id="" style="font-size:12px;"><em>ผู้ช่วยกรรมการผู้จัดการ</em></div> </div><br style="clear:both"></div>', '#', 'เป้าหมายสิ้นปี:2,500ล้าน | ผลงาน:1,650 ล้าน', '', '');
			
		
			
			mytree1.add(156, 147, ' <div class="orgBOx"><div class="orgBoxL"><img width="50" height="50" src="/see-kpi-portlet/img/a3.jpg" class="img-circle" style="border:4px solid red;" id="yui_patched_v3_11_0_1_1499158953997_1443"></div><div class="orgBoxR"><div class="orgText">Score : <span style="font-size:16px; font-weight:bold;">55%</span></div><div class="orgText">นางสาวหทัยทิพย์ เหลืองธนาพลกุล</div><div class="orgText" id="" style="font-size:12px;"><em>ฝ่ายวิเคาราะห์และ</em></div><div class="orgText" id="" style="font-size:12px;"><em>วางแผนกลยุทธ์</em></div><div class="orgText" id="" style="font-size:12px;"><em>รษก.</em></div></div><br style="clear:both"></div>', '#', 'เป้าหมายสิ้นปี:1,250 ล้าน | ผลงาน:688 ล้าน', '', '');
			mytree1.add(157, 147, ' <div class="orgBOx"><div class="orgBoxL"><img width="50" height="50" src="/see-kpi-portlet/img/a4.jpg" class="img-circle" style="border:4px solid red;" id="yui_patched_v3_11_0_1_1499158953997_1443"></div><div class="orgBoxR"><div class="orgText">Score : <span style="font-size:16px; font-weight:bold;">68%</span></div><div class="orgText">นายสุรจิต สุวรรณมณี</div><div class="orgText" id="" style="font-size:12px;"><em>ฝ่ายพัฒนากระบวนงาน</em></div><div class="orgText" id="" style="font-size:12px;"><em>รษก.</em></div></div><br style="clear:both"></div>', '#', 'เป้าหมายสิ้นปี:1,250 ล้าน | ผลงาน:850 ล้าน', '', '');
			
			
			mytree1.add(158, 149, ' <div class="orgBOx"><div class="orgBoxL"><img width="50" height="50" src="/see-kpi-portlet/img/a5.jpg" class="img-circle" style="border:4px solid #00ff00;" id="yui_patched_v3_11_0_1_1499158953997_1443"></div><div class="orgBoxR"><div class="orgText">Score : <span style="font-size:16px; font-weight:bold;">88%</span></div><div class="orgText">นางสุวัฒนา ทิมมาศย์</div><div class="orgText" id="" style="font-size:12px;"><em>ฝ่ายประเมินผลองค์กร</em></div><div class="orgText" id="" style="font-size:12px;"><em>รษก.</em></div></div><br style="clear:both"></div>', '#', 'เป้าหมายสิ้นปี:1,250 ล้าน | ผลงาน:1,100 ล้าน', '', '');
			mytree1.add(159, 149, ' <div class="orgBOx"><div class="orgBoxL"><img width="50" height="50" src="/see-kpi-portlet/img/a6.jpg" class="img-circle" style="border:4px solid #2aad2a;" id="yui_patched_v3_11_0_1_1499158953997_1443"></div><div class="orgBoxR"><div class="orgText">Score : <span style="font-size:16px; font-weight:bold;">90%</span></div><div class="orgText">นางสาวเยาวนี ศรีสาคร</div><div class="orgText" id="yui_patched_v3_11_0_1_1499158953997_1398" style="font-size:12px;"><em>ฝ่ายประเมินผลองค์กร</em></div><div class="orgText" id="" style="font-size:12px;"><em>รษก.</em></div></div><br style="clear:both"></div>', '#', 'เป้าหมายสิ้นปี:1,250 ล้าน | ผลงาน:1,125 ล้าน', '', '');
			
			
			mytree1.add(160, 151, ' <div class="orgBOx"><div class="orgBoxL"><img width="50" height="50" src="/see-kpi-portlet/img/a7.jpg" class="img-circle" style="border:4px solid orange;" id="yui_patched_v3_11_0_1_1499158953997_1443"></div><div class="orgBoxR"><div class="orgText">Score : <span style="font-size:16px; font-weight:bold;">72%</span></div><div class="orgText">นายศรพงศ์ ดุรงคเวโรจน์</div><div class="orgText" id="yui_patched_v3_11_0_1_1499158953997_1398" style="font-size:12px;"><em>ฝ่ายวิชาการและเผยแพร่</em></div><div class="orgText" id="" style="font-size:12px;"><em>ด้านเทคโนโลยีสารสนเทศ</em></div></div><br style="clear:both"></div>', '#', 'เป้าหมายสิ้นปี:1,250 ล้าน | ผลงาน:900 ล้าน', '', '');
			mytree1.add(161, 151, ' <div class="orgBOx"><div class="orgBoxL"><img width="50" height="50" src="/see-kpi-portlet/img/a8.jpg" class="img-circle" style="border:4px solid orange;" id="yui_patched_v3_11_0_1_1499158953997_1443"></div><div class="orgBoxR"><div class="orgText">Score : <span style="font-size:16px; font-weight:bold;">78%</span></div><div class="orgText">นายสราวุธ อุยานนนท์</div><div class="orgText" id="yui_patched_v3_11_0_1_1499158953997_1398" style="font-size:12px;"><em>ฝ่ายปฎิบัติการสารสนเทศ</em></div></div><br style="clear:both"></div>', '#', 'เป้าหมายสิ้นปี:1,250 ล้าน | ผลงาน:975 ล้าน', '', '');
			
			
			mytree1.add(163, 152, ' <div class="orgBOx"><div class="orgBoxL"><img width="50" height="50" src="/see-kpi-portlet/img/a1.jpg" class="img-circle" style="border:4px solid red;" id="yui_patched_v3_11_0_1_1499158953997_1443"></div><div class="orgBoxR"><div class="orgText">Score : <span style="font-size:16px; font-weight:bold;">63%</span></div><div class="orgText">นางบุษกร ปภัสสรศิริ</div><div class="orgText" id="yui_patched_v3_11_0_1_1499158953997_1398" style="font-size:12px;"><em>ศูนย์ความมั่นคงปลอดภัย</em></div><div class="orgText" id="" style="font-size:12px;"><em>รษก.</em></div></div><br style="clear:both"></div>', '#', 'เป้าหมายสิ้นปี:1,250 ล้าน | ผลงาน:788 ล้าน', '', '');
			mytree1.add(164, 152, ' <div class="orgBOx"><div class="orgBoxL"><img width="50" height="50" src="/see-kpi-portlet/img/a2.jpg" class="img-circle" style="border:4px solid red;" id="yui_patched_v3_11_0_1_1499158953997_1443"></div><div class="orgBoxR"><div class="orgText">Score : <span style="font-size:16px; font-weight:bold;">66%</span></div><div class="orgText">นางสมจิตต์ รถทอง รษก.</div><div class="orgText" id="yui_patched_v3_11_0_1_1499158953997_1398" style="font-size:12px;"><em>ฝ่ายบริหารโครงการสารสนเทศ</em></div><div class="orgText" id="" style="font-size:12px;"><em>รษก.</em></div></div><br style="clear:both"></div>', '#', 'เป้าหมายสิ้นปี:1,250 ล้าน | ผลงาน: 825ล้าน', '', '');
	
			
			document.write(mytree1); 
			
			
	</script> 
        
        </p>
      </div>
      <!-- 
      <div class="modal-footer">
        <button id='btnClose' class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
        
      </div>
       -->
    </div>






 
 
