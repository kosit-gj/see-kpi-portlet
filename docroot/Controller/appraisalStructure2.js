$(document).ready(function() {	
	
	var username = $('#user_portlet').val()
	var password = $('#pass_portlet').val()
	var plid = $('#plid_portlet').val()
	
	if(username!="" && username!=null & username!=[] && username!=undefined ) {
		
		if(connectionServiceFn(username,password,plid)==true) {
			
			$("#form_id").change(function() {

				if($("#form_id").val()==3) { //if Deduct Score
					
					Unlimited_Deduction_func();
					function Unlimited_Deduction_func() {

						var UD_html ="<input  type='hidden'  id='is_unlimited_deduction' name='is_unlimited_deduction' value='0'>";
						UD_html	   +="<input type='checkbox' checked class='checkbox checkbox-is_unlimited_deduction' placeholder='' id='is_unlimited_deduction' name='is_unlimited_deduction'>";
							
						$("#Unlimited_Deduction_checkbox_header").show();
						$("#Unlimited_Deduction_checkbox").html(UD_html);
						
					}
					
				}
				else {

					$("#Unlimited_Deduction_checkbox_header").hide();
					$(".checkbox-is_unlimited_deduction").prop('checked',false);
				}
				
			})
			
		}
		
	}
	
})