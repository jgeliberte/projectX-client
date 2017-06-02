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
		$('.popover').popover('hide');
	});
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
	$.each(json, function () {
		var fee = this.service_fee;
		var checkId = this.id;

		$('#'+this.id).popover({html:true,
			placement : 'bottom',
			title: "<b>Quantity:</b> <input type='number' id='quantityTooth' class='form-control' value='1'>", 
			content: "<div style='margin-bottom:5px;'><b>Amount:</b>"+
			"<input type='text' id='"+this.id+"php' class='form-control'/></div>"+
			"<input type='button' name='popOver' style='margin: auto; display: block;' class='btn btn-primary btn-md' value='Confirm'>" });
		
		$('#'+this.id).click(function(){
			console.log(this.id + " " + checkId);
			$('#'+this.id+'php').val(fee);
			var qtyValue = this.value;
			$('#quantityTooth').on("change", function(){
				console.log(this.value);
				computeFeePerService(this.value, fee);

			});

			$('input[name="popOver"]').on('click',function(){
				$('.popover').popover('hide');
				$('.'+checkId).text($('#quantityTooth').val());
			});
			// } else {
			// 	
			// }
			console.log(fee);
			
		});

	});
	// $('.checkbox').on("click", ":checkbox", function () {
	// 	var checkId = this.id;
	// 	var isChecked = this.checked;

	// 		if(isChecked){
	// 			if(checkId == this.id){
	// 				console.log('#' + checkId);

	// 				$("#popCheck"+checkId).popover({ html:true, title: "<b>Quantity:</b> <input type='number' id='quantityTooth' class='form-control' value='1'>", content: "<b>Amount:</b> <input type='text' id='serviceFee' class='form-control' disabled/>" });
	// 				var fee = this.service_fee;
	// 				$('#serviceFee').val(fee);
	// 				$('#quantityTooth').on("change", function(){
	// 					console.log(this.value);
	// 					computeFeePerService(this.value, fee);
	// 				});

	// 			}

	// 		}else {
	// 			// console.log(this.service_name);
	// 			//$("#"+this.id).popover({ html:true, title: "<b>Quantity:</b> <input type='number' id='quantityTooth' class='form-control' value='1'>", content: "<b>Amount:</b> <input type='text' id='serviceFee' class='form-control'/>" });
	// 			$("#popCheck4").popover('hide');
	// 		}
	// 	});

	// });
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

		$('#serviceIdDiv').append($('<div class="col-xs-4" style="margin-top:10px;">'+
			'<button type="button" class="btn btn-primary form-control btnService" id="'+this.id+'">'+
			''+this.service_name.toUpperCase()+'<span class="badge '+this.id+'"></span></button></div>'));

	});
}


