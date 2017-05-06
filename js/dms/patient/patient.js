var patientJsonResult = [];
var patientDataset = [];
var patientTable;
var data = null;
var patientId = "";

$(document).ready(function() {
	$('#patientMenu').click(function(){
		window.location = '/v1/patient';
	});

	setPatientToDataTable();
	getPatientFromServer();

	$('#btnAddPatient').on('click', function(){
		if(data == null){
			alert("add");
			$.post("/v1/addpatient", sendPatientInfo())
			.done(function(data){
				console.log( JSON.stringify(data.status));
				getPatientFromServer();
				$(".modal .close").click();

			});
		} else {
			alert("update");
			$.post("/v1/updatepatient", sendPatientInfo())
			.done(function(data){
				alert(data);
				console.log( JSON.stringify(sendPatientInfo()));

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
	$.getJSON("/v1/fetchallpatient", function(data){
		for (var key in data) {
			if(data.hasOwnProperty(key)){
				var value = data[key];
				console.log(value);
				var dataParse = JSON.stringify(value);
				for (var i = 0; i < value.length; i++) {
					if(value[i].firstname != null){
						patientJsonResult.push(i + 1);
						patientJsonResult.push(value[i].firstname);
						patientJsonResult.push(value[i].lastname);
						patientJsonResult.push(value[i].age);
						patientJsonResult.push(value[i].primary_contact);
						patientJsonResult.push(appendPatientIcons());
						patientJsonResult.push(value[i].middlename);
						patientJsonResult.push(value[i].gender);
						patientJsonResult.push(value[i].address);
						patientJsonResult.push(value[i].email_address);
						patientJsonResult.push(value[i].secondary_contact);
						patientJsonResult.push(value[i].id);
						patientDataset.push(patientJsonResult);
						patientJsonResult = [];

					}
				}
				console.log("Data: " + dataParse);
				console.log("array :" + patientJsonResult);
			}
		};
		console.log(patientDataset);
		patientTable.clear();
		patientTable.rows.add(patientDataset);
		patientTable.draw();

		updatePatient();
});
}

function setPatientToDataTable(){
	patientTable = $('#patientRecords').DataTable( {
		columns: [
		{title: "#"},
		{title: "First Name"},
		{title: "Last Name"},
		{title: "Age"},
		{title: "Phone Contact"},
		{title: ""}
		]
	} );
}

function updatePatient(){
	$("#patientRecords tbody").on('click', '.updatePatient' , function(){
		var closestRow = $(this).closest('tr');
		data = patientTable.row(closestRow).data();
		var taskID = data;
		$('#addPatient').modal('toggle');
		setPatientData(data);
	});
}

function setPatientData(patientValue){
	patientId = patientValue[11];
	$('#firstName').val(patientValue[1]);
	$('#middleName').val(patientValue[6]);
	$('#lastName').val(patientValue[2]);
	$('#age').val(patientValue[3]);
	$('#address').val(patientValue[8]);
	$('#email').val(patientValue[9]);
	$('#primary').val(patientValue[4]);
	$('#secondary').val(patientValue[10]);
	$("input[name=gender][value=" + patientValue[7] + "]").prop('checked', true);

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
	sendPatientDataArray["patient_data"] = JSON.stringify(sendPatientObject);

	return sendPatientDataArray;
}