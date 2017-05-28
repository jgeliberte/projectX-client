var patientTable;
var data = null;

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
		var deletePatientId = patientTable.row(closestRow).data();
		if (confirm("Do you want to delete?")) {
			callDeletePatientService(deletePatientId[11]);
		}
		return false;
		
	});
}