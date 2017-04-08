$(document).ready(function() {
    $('#confirm-btn').click(function(event) {
    	var data = {
    		'username' : $('#username').val(),
    		'password' : $('#password').val()
    	};

    	$.post('../login/validate/',{credentials: data}).done(function(data){
    		var response = JSON.parse(data);
    	});	
    });

    $('#register-btn').click(function(event) {
    	var data = {
    		'username' : $('#register-username').val(),
    		'password' : $('#register-password').val(),
    		'firstname' : $('#register-firstname').val(),
    		'lastname' : $('#register-lastname').val(),
    		'middlename' : $('#register-middlename').val(),
    		'prefix' : $('#register-prefix').val(),
    	}

    	$.post('../login/register/',{user_info: data}).done(function(data){
    		var response = JSON.parse(data);	
    	});
    });
});