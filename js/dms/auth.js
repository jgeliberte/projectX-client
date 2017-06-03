var keys = {};
$(document).ready(function() {

	
	$('#confirm-btn').click(function(){
		$.post('../login/addAuthCode', {auth_code : $('#auth-code').val()}).done(function(data){
			if (data == "1" || data == true) {
				window.location = "http://localhost";
			}
		});
	});

	$(document).keydown(function (e) {
	    keys[e.which] = true;
	    detectKeypress();
	});

	$(document).keyup(function (e) {
	    delete keys[e.which];
	    detectKeypress();
	});

});

function detectKeypress() {
	if (($("#auth-modal").data('bs.modal') || {}).isShown != true) {
		var key_collection = [];
	    for (var i in keys) {
	        if (!keys.hasOwnProperty(i)) continue;  
	        key_collection.push(i); 
	    }
	    if (key_collection[0] == "18" && key_collection[1] == "67" && key_collection[2] == "74") {
	    	$.get('../login/generateAuth',function(data){
	    		$('#gen-code').val(data);
	    		$('#auth-modal').modal('toggle');
	    	});
	    }
	}
}