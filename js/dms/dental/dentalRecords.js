var patientDentalJsonResult = [];
var patientDentalDataset = [];
var dentalTable;
var dentalActivityTable;
var dentalNum = 1;
var dentalServiceResult = [];
var inputId;
var serviceFee = [];
var value = "";

$(document).ready(function() {
	var date = new Date();
	//alert(date);
	$('#dentalMenu').click(function(){
		window.location = '/v1/dentalrecords';
	});

	$('#btnAddActivity').click(function(){
		//$('input[name=serviceRendered]:checked').each(function(){
			sendDentalServiceActivity();
			$(".modal .close").click();
			$('input[type=checkbox]').attr('checked',false);
		//});
		
	});

	initializeDentalActivityTable();
	getDentalServiceRecords();

	//$('#patientMenu').load(
	$.getJSON("/v1/fetchallpatient", function(data){
		for (var key in data) {
			if(data.hasOwnProperty(key)){
				var value = data[key];
				console.log(value);
				var dataParse = JSON.stringify(value);
				for (var i = 0; i < value.length; i++) {
					if(value[i].firstname != null){
						if(value[i].status == 1){
							patientDentalJsonResult.push(dentalNum);
							patientDentalJsonResult.push(value[i].firstname);
							patientDentalJsonResult.push(value[i].lastname);
							patientDentalJsonResult.push(value[i].birthdate);
							patientDentalJsonResult.push(value[i].primary_contact);
							patientDentalJsonResult.push(appendDentalPatientIcons());
							patientDentalJsonResult.push(value[i].middlename);
							patientDentalJsonResult.push(value[i].gender);
							patientDentalJsonResult.push(value[i].address);
							patientDentalJsonResult.push(value[i].email_address);
							patientDentalJsonResult.push(value[i].secondary_contact);
							patientDentalJsonResult.push(value[i].id);
							patientDentalDataset.push(patientDentalJsonResult);
							patientDentalJsonResult = [];
							dentalNum++;
						}
					}
				}
				console.log("Data: " + dataParse);
				console.log("array :" + patientDentalJsonResult);
			}
		};
		console.log(patientDentalDataset);

		dentalTable = $('#dentalRecords').DataTable( {
			data: patientDentalDataset,
			columns: [
			{title: "#"},
			{title: "First Name"},
			{title: "Last Name"},
			{title: "BirthDate"},
			{title: "Phone Contact"},
			{title: ""}
			]
		} );

		addDental();
		previewDentalActivity();
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
	"<i class='addRecords fa fa-plus-square ' aria-hidden='true' style='margin-right: 15%;'></i>" +
	"<i class='previewDental fa fa-eye' aria-hidden='true'></i>" +
	"</div>"

	return icons;
}

function addDental(){
	$("#dentalRecords tbody").on('click', '.addRecords' , function(){
		var closestRow = $(this).closest('tr');
		data = dentalTable.row(closestRow).data();
		$('#addDental').modal('show');
		$('#patientName').text(data[2].toUpperCase() + ", " + data[1].toUpperCase() +" "+ data[6].toUpperCase());
		$('#gender').text(data[7]);
		$('#primary').text(data[4]);
		
		checkBoxIsChecked(value);
		
	});
}

function checkBoxIsChecked(json){
	$('.checkbox').on("change", ":checkbox", function () {
		var valueId = this.value;
		var isChecked = this.checked;
		$.each(json, function () {
			if (isChecked) {
				if(valueId == this.service_name){
					console.log(inputId + ' is checked');
					$("#"+this.service_fee).prop('disabled', false);
					$("#"+this.service_fee).val(this.service_fee);
					serviceFee.push(this.service_fee);
				}
			} else {
				if(valueId == this.service_name){
					$("#"+this.service_fee).prop('disabled', true);
					$("#"+this.service_fee).val('');
				}
			}
		});
		
	});
}

function getDentalServiceRecords(){
	var dentalDataSet = [];
	$.getJSON("/v1/getallservices", function(data){
		for (var key in data) {
			if(data.hasOwnProperty(key)){
				value = data[key];
				console.log(value);
			}
		};
		appendService(value);
		
	});
}

function appendService(json){
	$.each(json, function () {
		inputId = this.service_fee;
		//inputId = inputId.replace(/ /g, '');
		$("#serviceIdDiv").append($("<div class='col-md-9'><div class='checkbox' style='display:flex;'>" + 
			"<label style='margin-right: 1%;'><input type='checkbox' name='serviceRendered' value='"+this.service_name+"'>" +this.service_name+ "</label>" +
			"<input type='text' class='form-control' id='remarks' placeholder='Remarks' style='margin-right:1%'/>" + 
			"<div class='col-md-6'><div class='input-group pesos'><span class='input-group-addon'><i class='fa fa-rub' aria-hidden='true'></i></span>" +
			"<input type='text' class='form-control' id='"+inputId+"' disabled/>" +
			"</div></div></div></div>"));
	});
}

function previewDentalActivity(){
	$("#dentalRecords tbody").on('click', '.previewDental' , function(){
		var closestRow = $(this).closest('tr');
		previewData = dentalTable.row(closestRow).data();
		$('#previewDental').modal('show');
		$('#patientName2').text(previewData[2].toUpperCase() + ", " + previewData[1].toUpperCase() +" "+ previewData[6].toUpperCase());
		$('#gender2').text(previewData[7]);
		$('#primary2').text(previewData[4]);
		//setDentalData(previewData);
	});
}

function initializeDentalActivityTable(){
	dentalActivityTable = $('#dentalActivities').DataTable( {
		columns: [
		{title: "#"},
		{title: "Services"},
		{title: "Date"},
		{title: "Price"},
		{title: "Remarks"},
		{title: ""}
		]
	} );
}

