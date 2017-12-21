<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<%@ taglib uri="http://alloy.liferay.com/tld/aui" prefix="aui"%>
<%@ page import="javax.portlet.*"%>
<%@ page contentType="text/html; charset=UTF-8" %>

<portlet:defineObjects />

		<div class="row-fluid">
			<div class="span12">
				<div class="row-fluid">
					<div class="span12">
						<div class="panel panel-warning">
							<div class="panel-heading">Advance Search</div>
							<div class="panel-body">
								<div class="row-fluid">
									<div class="span8">
										<div class="span12">
											<form class="form-inline">
											<select id="s_yr"></select>
											<select id="s_qt"></select>
											</form>
											<span id="show_nodata"></span>
										</div>
									</div>
									<div class="span4" align="right">
										<button type="button" class="btn btn-info" onclick="search_benchmark()">
											<i class="icon-search icon-white"></i>&nbsp;&nbsp;Search
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row-fluid">
					<div class="span12">
						<div class="panel panel-warning">
							<div class="panel-heading">Benchmark</div>
							<div class="panel-body">
								<div class="span8">
									<button type="button" class="btn btn-warning" onclick="download_benchmark()">
										<i class="fa fa-download" aria-hidden="true"></i>&nbsp;&nbsp;Download 
									</button>
									<span class="btn btn-success btn-file">
										<i class="fa fa-upload" aria-hidden="true"></i>&nbsp;&nbsp;
									    Import <input type="file" id="ip_excel">
									</span>
									&nbsp;&nbsp;
									<i id="ip_confirm" class="" aria-hidden="true">&nbsp;&nbsp;<span id="ip_confirmt"></span>
										<img id="loading" src="../../see-kpi-portlet/img/uploading.gif" width="20" style="display: none;">
									</i>
								</div>
								<div class="span4" align="right">
									<span id="textnumber" style="display: none;">Refresh in </span>
									<span id="number" style="display: none;">10</span>
								</div>
								<div class="table table-responsive">
									<table class="table table-striped">
										<thead>
											<tr>
												<th>Year</th>
												<th>Quarter</th>
												<th>KPI</th>
												<th>Company</th>
												<th>Value</th>
											</tr>
										</thead>
										<tbody id="data-benchmark"></tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
