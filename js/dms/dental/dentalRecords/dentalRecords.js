var inputId;
var serviceFee = [];


$(document).ready(function() {
	var date = new Date();
	//alert(date);
	$('#dentalMenu').click(function(){
		window.location = '/v1/dentalrecords';
	});

	initializeDentalRecordTable();
	initializeDentalActivityTable();
	callGetDentalRecords();
	callGetDentalService();
	

	$('#btnAddActivity').click(function(){
		//$('input[name=serviceRendered]:checked').each(function(){
			sendDentalServiceActivity();
			$(".modal .close").click();
			$('input[type=checkbox]').attr('checked',false);
		//});
		
	});

	$('.modal').on('hidden.bs.modal', function(e) { 
		$(".modal-body input").val("")
		value = "";
	}) ;

});

function sendDentalServiceActivity(){
	var sendDentalObject = {};

	for(var i = 0; i < serviceFee.length; i++){
		alert(serviceFee[i]);
	// 	sendDentalObject["patient_fk_id"] = dental[11];
	// sendDentalObject["service_rendered"] = serviceFee[i];
	// sendDentalObject["date_rendered"]
	// sendDentalObject["fee_rendered"]
	// sendDentalObject["remarks_rendered"]
}

}

function appendDentalPatientIcons() {
	var icons = "<div style='display: block;text-align: center;'>" +
	"<div id='tool' data-toggle='tooltip' data-placement='top' title='Diagnose Patient'" + 
	"<i class='addRecords fa fa-plus-square ' aria-hidden='true' style='margin-right: 15%;'></i></div>" +
	"<div id='tool' href='#' data-toggle='tooltip' data-placement='right' title='Preview Diagnose'" + 
	"<i class='previewDental fa fa-eye' aria-hidden='true'></i></div>" +
	"</div>"

	return icons;
}

function displayPopOverOnCheck(json){
	$('.checkbox').on("change", ":checkbox", function () {
		var checkId = this.id;
		var isChecked = this.checked;
		$.each(json, function () {
			if(isChecked){
				if(checkId == this.id){
					console.log('#' + checkId);
					
					$("#popCheck"+checkId).popover({ html:true, title: "<b>Quantity:</b> <input type='number' id='quantityTooth' class='form-control' value='1'>", content: "<b>Amount:</b> <input type='text' id='serviceFee' class='form-control' disabled/>" });
					var fee = this.service_fee;
					$('#serviceFee').val(fee);
					$('#quantityTooth').on("change", function(){
						console.log(this.value);
						computeFeePerService(this.value, fee);
					});

				}

			}else {
				// console.log(this.service_name);
				//$("#"+this.id).popover({ html:true, title: "<b>Quantity:</b> <input type='number' id='quantityTooth' class='form-control' value='1'>", content: "<b>Amount:</b> <input type='text' id='serviceFee' class='form-control'/>" });
				$("#popCheck4").popover('hide');
			}
		});
		
	});
}

function computeFeePerService(quantity, serviceFee){
	var totalServiceFee = serviceFee * quantity ;
	$('#serviceFee').val(totalServiceFee);
	console.log(totalServiceFee);
}

function appendService(json){
	$.each(json, function () {
		inputId = this.service_fee;
		//console.log(json);
		//inputId = inputId.replace(/ /g, '');
		// $("#serviceIdDiv").append($("<div class='col-sm-4'><div class='checkbox'>" + 
		// 	"<label style='margin-right: 1%;'><div id='popCheck"+this.id+"'><input type='checkbox' id='"+this.id+"' name='serviceRendered' value='"+this.service_name+"'/>" +this.service_name+ "</label>" +
		// 	"</div></div></div>"));

		$('#serviceIdDiv').append($('<div class="col-xs-4" style="margin-top:10px;"><button type="button" class="btn btn-primary form-control" id="'+this.id+'">'+this.service_name.toUpperCase()+'</button></div>'));

	});
}


