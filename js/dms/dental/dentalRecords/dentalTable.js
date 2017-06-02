var dentalRecordTable;
var dentalActivityTable;

function initializeDentalRecordTable() {
	dentalRecordTable = $('#dentalRecords').DataTable( {
		columns: [
		{title: "#"},
		{title: "First Name"},
		{title: "Last Name"},
		{title: "BirthDate"},
		{title: "Phone Contact"},
		{title: ""}
		]
	} );
}

function addDental(){
	$("#dentalRecords tbody").on('click', '.addRecords' , function(){
		var closestRow = $(this).closest('tr');
		data = dentalRecordTable.row(closestRow).data();
		$('#addDental').modal('show');
		$('#patientName').text(data[2].toUpperCase() + ", " + data[1].toUpperCase() +" "+ data[6].toUpperCase());
		$('#gender').text(data[7]);
		$('#primary').text(data[3]);
		
	});
}

function previewDentalActivity(){
	$("#dentalRecords tbody").on('click', '.previewDental' , function(){
		var closestRow = $(this).closest('tr');
		previewData = dentalRecordTable.row(closestRow).data();
		$('#previewDental').modal('show');
		$('#patientName2').text(previewData[2].toUpperCase() + ", " + previewData[1].toUpperCase() +" "+ previewData[6].toUpperCase());
		$('#gender2').text(previewData[7]);
		$('#primary2').text(previewData[4]);
		//setDentalData(previewData);
	});
}

//modal table
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