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
.fontBold{
	font-size:16px;
	font-weight:bold;
}
.fontNumber{
	text-align:right;
}
.fontString{
	text-align:left;
}
.fontCenter{
	text-align:center;
}
.tableInside{
	width:100%;
}
table#tableAllKPI .aui .table th, .aui .table td{
	padding: 2px;
}
</style>
<table class='table table-bordered' id='tableAllKPI'>

	<thead>
		<tr>
			<th width='100px'>
			<div class='fontBold '> Perspective</div>
			</th>
			
			<th width='100px'>
			<div class='fontBold '>KPI</div>
			</th>
			
			<th width='100px'>
			<div class='fontBold '>UOM</div>
			</th>
			
			<th width='300px'>
			<div class='fontBold fontCenter'>ธอส</div>
			</th>
			
			<th width='300px'>
			<div class='fontBold fontCenter'>กลยุทธ์องค์กร</div>
			</th>
			
			<th width='300px'>
			<div class='fontBold fontCenter'>สาขานครหลวง</div>
			</th>
		</tr>
		</thead>
		<tbody>
			<tr>
				<td>Strong Financial</td>
				<td>จำนวนเงิน Gross NPL</td>
				<td>ร้อยละ</td>
				<td>
					<!-- table start -->
					<table class='tableInside table-striped'>
						<thead>
							<tr>
								<th><div class='fontBold '>Target</div></th>
								<th><div class='fontBold '>Forecast</div></th>
								<th><div class='fontBold '>Actual</div></th>
							</tr>
							
						</thead>
						<tbody>
							<tr>
								<td>4</td>
								<td>3.5</td>
								<td>3</td>
							</tr>
							<tr>
								<td>%Target</td>
								<td colspan='2'><div class='sparkline'></div></td>
								
							</tr>
							<tr>
								<td>%Forecast</td>
								<td colspan='2'><div class='sparkline'></div></td>
								
							</tr>
						</tbody>
					</table>
					<!-- table end -->
				</td>
				<td>
				<!-- table start -->
					<table class='tableInside table-striped'>
						<thead>
							<tr>
								<th><div class='fontBold '>Target</th>
								<th><div class='fontBold '>Forecast</th>
								<th><div class='fontBold '>Actual</th>
							</tr>
							
						</thead>
						<tbody>
							<tr>
								<td>4</td>
								<td>3.5</td>
								<td>3</td>
							</tr>
							<tr>
								<td>%Target</td>
								<td colspan='2'><div class='sparkline'></div></td>
								
							</tr>
							<tr>
								<td>%Forecast</td>
								<td colspan='2'><div class='sparkline'></div></td>
								
							</tr>
						</tbody>
					</table>
					<!-- table end -->
				</td>
				<td>
				<!-- table start -->
					<table class='tableInside table-striped'>
						<thead>
							<tr>
								<th><div class='fontBold '>Target</div></th>
								<th><div class='fontBold '>Forecast</div></th>
								<th><div class='fontBold '>Actual</div></th>
							</tr>
							
						</thead>
						<tbody>
							<tr>
								<td>4</td>
								<td>3.5</td>
								<td>3</td>
							</tr>
							<tr>
								<td>%Target</td>
								<td colspan='2'><div class='sparkline'></div></td>
								
							</tr>
							<tr>
								<td>%Forecast</td>
								<td colspan='2'><div class='sparkline'></div></td>
								
							</tr>
						</tbody>
					</table>
					<!-- table end -->
				</td>
			</tr>
			
			<tr>
				<td>Strong Financial</td>
				<td>จำนวนเงิน Gross NPL</td>
				<td>ร้อยละ</td>
				<td>
					<!-- table start -->
					<table class='tableInside table-striped'>
						<thead>
							<tr>
								<th><div class='fontBold '>Target</div></th>
								<th><div class='fontBold '>Forecast</div></th>
								<th><div class='fontBold '>Actual</div></th>
							</tr>
							
						</thead>
						<tbody>
							<tr>
								<td>4</td>
								<td>3.5</td>
								<td>3</td>
							</tr>
							<tr>
								<td>%Target</td>
								<td colspan='2'><div class='sparkline'></div></td>
								
							</tr>
							<tr>
								<td>%Forecast</td>
								<td colspan='2'><div class='sparkline'></div></td>
								
							</tr>
						</tbody>
					</table>
					<!-- table end -->
				</td>
				<td>
				<!-- table start -->
					<table class='tableInside table-striped'>
						<thead>
							<tr>
								<th><div class='fontBold '>Target</div></th>
								<th><div class='fontBold '>Forecast</div></th>
								<th><div class='fontBold '>Actual</div></th>
							</tr>
							
						</thead>
						<tbody>
							<tr>
								<td>4</td>
								<td>3.5</td>
								<td>3</td>
							</tr>
							<tr>
								<td>%Target</td>
								<td colspan='2'><div class='sparkline'></div></td>
								
							</tr>
							<tr>
								<td>%Forecast</td>
								<td colspan='2'><div class='sparkline'></div></td>
								
							</tr>
						</tbody>
					</table>
					<!-- table end -->
				</td>
				<td>
				<!-- table start -->
					<table class='tableInside table-striped'>
						<thead>
							<tr>
								<th><div class='fontBold '>Target</div></th>
								<th><div class='fontBold '>Forecast</div></th>
								<th><div class='fontBold '>Actual</div></th>
							</tr>
							
						</thead>
						<tbody>
							<tr>
								<td>4</td>
								<td>3.5</td>
								<td>3</td>
							</tr>
							<tr>
								<td>%Target</td>
								<td colspan='2'><div class='sparkline'></div></td>
								
							</tr>
							<tr>
								<td>%Forecast</td>
								<td colspan='2'><div class='sparkline'></div></td>
								
							</tr>
						</tbody>
					</table>
					<!-- table end -->
				</td>
			</tr>
			
			<tr>
				<td>Strong Financial</td>
				<td>จำนวนเงิน Gross NPL</td>
				<td>ร้อยละ</td>
				<td>
					<!-- table start -->
					<table class='tableInside table-striped'>
						<thead>
							<tr>
								<th><div class='fontBold '>Target</div></th>
								<th><div class='fontBold '>Forecast</div></th>
								<th><div class='fontBold '>Actual</div></th>
							</tr>
							
						</thead>
						<tbody>
							<tr>
								<td>4</td>
								<td>3.5</td>
								<td>3</td>
							</tr>
							<tr>
								<td>%Target</td>
								<td colspan='2'><div class='sparkline'></div></td>
								
							</tr>
							<tr>
								<td>%Forecast</td>
								<td colspan='2'><div class='sparkline'></div></td>
								
							</tr>
						</tbody>
					</table>
					<!-- table end -->
				</td>
				<td>
				<!-- table start -->
					<table class='tableInside table-striped'>
						<thead>
							<tr>
								<th><div class='fontBold '>Target</div></th>
								<th><div class='fontBold '>Forecast</div></th>
								<th><div class='fontBold '>Actual</div></th>
							</tr>
							
						</thead>
						<tbody>
							<tr>
								<td>4</td>
								<td>3.5</td>
								<td>3</td>
							</tr>
							<tr>
								<td>%Target</td>
								<td colspan='2'><div class='sparkline'></div></td>
								
							</tr>
							<tr>
								<td>%Forecast</td>
								<td colspan='2'><div class='sparkline'></div></td>
								
							</tr>
						</tbody>
					</table>
					<!-- table end -->
				</td>
				<td>
				<!-- table start -->
					<table class='tableInside table-striped'>
						<thead>
							<tr>
								<th><div class='fontBold '>Target</div></th>
								<th><div class='fontBold '>Forecast</div></th>
								<th><div class='fontBold '>Actual</div></th>
							</tr>
							
						</thead>
						<tbody>
							<tr>
								<td>4</td>
								<td>3.5</td>
								<td>3</td>
							</tr>
							<tr>
								<td>%Target</td>
								<td colspan='2'><div class='sparkline'></div></td>
								
							</tr>
							<tr>
								<td>%Forecast</td>
								<td colspan='2'><div class='sparkline'></div></td>
								
							</tr>
						</tbody>
					</table>
					<!-- table end -->
				</td>
			</tr>
			
		</tbody>
	
</table>
