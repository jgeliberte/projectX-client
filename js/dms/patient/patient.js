var patientJsonResult = [];
var patientTable;
var data = null;
var patientId = "";

$(document).ready(function() {

	$('#patientMenu').click(function(){
		window.location = '/v1/patient';
	});

	initializeDataTable();
	getPatientFromServer();
	deletePatient();

	$('#btnAddPatient').on('click', function(){
		if(data == null){
			$.post("/v1/addpatient",{patient_data : JSON.stringify(sendPatientInfo())})
			.done(function(data){
				var status = JSON.stringify(data);
				alert(data.status);
				getPatientFromServer();
				$(".modal .close").click();
			});
		} else {
			$.post("/v1/updatepatient",{patient_data : JSON.stringify(sendPatientInfo())})
			.done(function(data){
				alert(data.status);
				console.log( JSON.stringify(sendPatientInfo()));
				getPatientFromServer();
				$(".modal .close").click();
			});
		}
	});
	

	$('.modal').on('hidden.bs.modal', function(e) { 
		$(".modal-body input").val("")
	}) ;

});

function appendPatientIcons() {
	var icons = "<div style='display: block;text-align: center;'>" + 
	"<span class='updatePatient glyphicon glyphicon-pencil' aria-hidden='true' style='margin-right: 15%;'></span>" + 
	"<span class='archiveData glyphicon glyphicon-trash' aria-hidden='true'></span>" + 
	"</div>"

	return icons;
}

function getPatientFromServer(){
	var patientDataset = [];
	$.getJSON("/v1/fetchallpatient", function(data){
		for (var key in data) {
			if(data.hasOwnProperty(key)){
				var value = data[key];
				console.log(value);
				var dataParse = JSON.stringify(value);
				for (var i = 0; i < value.length; i++) {
					if(value[i].firstname != null){
						if(value[i].status == 1){
							patientJsonResult.push(i + 1);
							patientJsonResult.push(value[i].firstname);
							patientJsonResult.push(value[i].lastname);
							patientJsonResult.push(value[i].birthdate);
							patientJsonResult.push(value[i].primary_contact);
							patientJsonResult.push(appendPatientIcons());
							patientJsonResult.push(value[i].middlename);
							patientJsonResult.push(value[i].gender);
							patientJsonResult.push(value[i].address);
							patientJsonResult.push(value[i].email_address);
							patientJsonResult.push(value[i].secondary_contact);
							patientJsonResult.push(value[i].id);
							patientJsonResult.push(value[i].status);
							patientDataset.push(patientJsonResult);
							patientJsonResult = [];
						}
					}
				}
				console.log("Data: " + dataParse);
				console.log("array :" + patientJsonResult);
			}
		};
		console.log(patientDataset.status);
		patientTable.clear();
		patientTable.rows.add(patientDataset);
		patientTable.draw();
		
		updatePatient();

	});
}

function deletePatientFromServer(patientDBId){
	$.post("/v1/archivepatient",{patient_id : JSON.stringify(patientDBId)})
	.done(function(data){
		var status = JSON.stringify(data);
		alert(data);
		getPatientFromServer();
	});
}

function initializeDataTable(){
	patientTable = $('#patientRecords').DataTable( {
		columns: [
		{title: "#"},
		{title: "First Name"},
		{title: "Last Name"},
		{title: "Birthdate"},
		{title: "Phone Contact"},
		{title: ""}
		],
		"deferRender": true
	} );
}

function updatePatient(){
	$("#patientRecords tbody").on('click', '.updatePatient' , function(){
		var closestRow = $(this).closest('tr');
		data = patientTable.row(closestRow).data();
		var taskID = data;
		$('#addPatient').modal('show');
		setPatientData(data);
	});
}

function deletePatient(){
	$("#patientRecords tbody").on('click', '.archiveData' , function(){
		var closestRow = $(this).closest('tr');
		data = patientTable.row(closestRow).data();
		deletePatientFromServer(data[11]);
	});
}

function setPatientData(patientValue){
	patientId = patientValue[11];
	$('#firstName').val(patientValue[1]);
	$('#middleName').val(patientValue[6]);
	$('#lastName').val(patientValue[2]);
	$('#birthdate').val(patientValue[3]);
	$('#address').val(patientValue[8]);
	$('#email').val(patientValue[9]);
	$('#primary').val(patientValue[4]);
	$('#secondary').val(patientValue[10]);
	//$("input[name=gender][value=" + patientValue[7] + "]").prop('checked', true);
	$("input[name=gender][value=" + patientValue[7] + "]").click();
}

function sendPatientInfo(){
	var sendPatientObject = {};
	var sendPatientDataArray = {};

	sendPatientObject["id"] = patientId;
	sendPatientObject["firstname"] = $('#firstName').val();
	sendPatientObject["lastname"] =  $('#lastName').val();
	sendPatientObject["middlename"] = $('#middleName').val();
	sendPatientObject["birthdate"] = $('#birthdate').val();
	sendPatientObject["gender"] =  $('input[name=gender]:checked').val();
	sendPatientObject["address"] = $('#address').val();
	sendPatientObject["email_address"] = $('#email').val();
	sendPatientObject["primary_contact"] = $('#primary').val();
	sendPatientObject["secondary_contact"] = $('#secondary').val();
	// sendPatientDataArray["patient_data"] = JSON.stringify(sendPatientObject);
	// sendPatientDataArray["data"] = sendPatientObject;
	return sendPatientObject;
}
