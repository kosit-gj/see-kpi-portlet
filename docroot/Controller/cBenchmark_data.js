			$(document).ready(function() {
				//auto check
				$.ajax({
					url:restfulURL+'/'+serviceName+"/public/benchmark_data/select_list_search",
					type:"get",
					//crossDomain: true,
					dataType:"json",
					success:function(result) {
						//console.log(result)
						if(result.nodata) {
					    	$('#s_yr').append('<option value="" disabled="" selected>ไม่มีข้อมูลปี</option>');
					    	$('#s_qt').append('<option value="" disabled="" selected>ไม่มีข้อมูลไตรมาส</option>');
					    	$('#show_nodata').append('ดาวน์โหลดข้อมูลด้านล่างเพื่อทำการเพิ่มข้อมูล');
						}
						else {
							var list_year;
							list_year +='<option value="">Select Year</option>';
					        $.each(result.year, function (key,value) {
					        	list_year += 
					                '<option value="'+value.year+'">' + value.year + '</option>'
					                ;
					    	});
					    	$('#s_yr').append(list_year);

					    	var list_quarter;
					    	list_quarter +='<option value="">Select Quarter</option>';
					    	$('#s_qt').append(list_quarter);
						}
					}
				});

				//search quarter
				$("#s_yr").change(function(){
					$('#s_qt').empty();
					var data_val = {'s_check':'wdsdwokd@wkdo','s_yr':$("#s_yr").val()};
					$.ajax({
						url:restfulURL+'/'+serviceName+"/public/benchmark_data/search_quarter",
						type:"get",
						//crossDomain: true,
						dataType:"json",
						data:{"datas":JSON.stringify(data_val)},
						success:function(result) {
							//console.log(result.nodata)
							var list_quarter;
							if(result.nodata) {
								list_quarter +=
					                '<option value="">Select Quarter</option>'
					                ;
							}
							else {
								list_quarter +=
					                '<option value="">Select Quarter</option>'
					                ;
								$.each(result.quarter, function (key,value) {
						    		list_quarter +=
						                '<option value="'+value.quarter+'">' + value.quarter + '</option>'
						            ;
						    	});
							}
					    	$('#s_qt').append(list_quarter);
						}
					});
				});
			});

			function search_benchmark() {
				
				$('#data-benchmark').empty();
				var data_val = {
					's_check':'Kcsodiow48',
					's_yr':$("#s_yr").val(),
					's_qt':$("#s_qt").val()
				};
				//console.log(data_val)
				$.ajax({
					url:restfulURL+'/'+serviceName+"/public/benchmark_data/search_benchmark",
					type:"get",
					//crossDomain: true,
					dataType:"json",
					data:{"datas":JSON.stringify(data_val)},
					success:function(result) {
						//console.log(result)
						var trHTML;
				        $.each(result, function (key,value) {
				        	trHTML += 
				                '<tr><td>' + value.year + 
				                '</td><td>' + value.quarter + 
				                '</td><td>' + value.kpi_name + 
				                '</td><td>' + value.company_code + 
				                '</td><td>' + value.value + 
				                '</td></tr>';
				    	});
				    	$('#data-benchmark').append(trHTML);
					}
				})
			}

			function download_benchmark() {
				var d_check = 'Swc4w8dQ88Wcd8';
				window.open(restfulURL+'/'+serviceName+'/public/benchmark_data/download_benchmark/'+d_check,"_self");
				return false;
			}

			// function load_excel() {
				var oFileIn;
				oFileIn = document.getElementById('ip_excel');
				if(oFileIn.addEventListener) {
			    	oFileIn.addEventListener('change', filePicked, false);
			    }
			// }

			function filePicked(oEvent) {
				$('#data-benchmark').empty();
				// Get The File From The Input
				var oFile = oEvent.target.files[0];
				var sFilename = oFile.name;
				// Create A File Reader HTML5
				var reader = new FileReader();

				// Ready The Event For When A File Gets Selected
				reader.onload = function(e) {
					var data = e.target.result;
					var cfb = XLSX.read(data, {type: 'binary'});
				    //console.log(cfb)
				    cfb.SheetNames.forEach(function(sheetName) {
				        // Obtain The Current Row As CSV
				        //var sCSV = XLS.utils.make_csv(cfb.Sheets[sheetName]);   
				        var oJS = XLS.utils.sheet_to_json(cfb.Sheets[sheetName]);   
				        //$("#ip_excel").html(sCSV);
				        console.log(oJS);
				        $('#loading').show();
				        $.ajax({
				        	url:restfulURL+'/'+serviceName+"/public/benchmark_data/import_benchmark",
				        	type:"post",
							//crossDomain: true,
							dataType:"json",
							data:{"datas":JSON.stringify(oJS)},
							success:function(result) {
								//console.log(result)
								var trHTML;
								$.each(result, function (key,value) {
									trHTML += 
									'<tr><td>' + value.year + 
									'</td><td>' + value.quarter + 
									'</td><td>' + value.kpi_name + 
									'</td><td>' + value.company_code + 
									'</td><td>' + value.value + 
									'</td></tr>';     
								});

								$('#loading').hide();
								$('#ip_confirm').addClass("fa fa-check text-success");
								$("#ip_confirmt").text("Import Success");
								$('#data-benchmark').append(trHTML);

								$('#number').show();
								$('#textnumber').show();
								var counter = 10;
								var interval = setInterval(function() {
									counter--;
									$("#number").html(counter);
									if (counter == 0) {
								        //Do something
								        //$("#number").html("Refresh!");
								        // Stop the counter
								        clearInterval(interval);
								    }
								}, 1000);
						    	setTimeout(location.reload.bind(location), 10000);
						    }
						})
				    });
				};
				// Tell JS To Start Reading The File.. You could delay this if desired
				reader.readAsBinaryString(oFile);
			}