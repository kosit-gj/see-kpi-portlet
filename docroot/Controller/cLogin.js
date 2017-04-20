$(document).ready(function(){
	
	$("#btnSubmit").click(function(){
		$.ajax({
			
			url:"http://192.168.1.58/dqs_api/public/session",
			//url:"http://58.9.74.76/dqs_api/public/session",
			type:"POST",
			dataType:"text",
			data:{"user_name":"tyw","password":"P@ssw0rd"},
			error: function(jqXHR, textStatus, errorThrown) {
				$("#information").html("<font color='red'>***</font> invalid credentials.").show();
			},
			success:function(data){
				//console.log(data);
				localStorage.setItem("tokenID",data);
				alert("Login is Success");
				
			}
		})			
		return false;
	});
	
});