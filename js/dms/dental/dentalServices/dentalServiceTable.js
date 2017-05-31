var serviceTable;

function initializeServiceDataTable(){
	serviceTable = $('#dentalService').DataTable( {
		columns: [
		{title: "#"},
		{title: "Name"},
		{title: "Fee"},
		{title: "Date Created"},
		{title: ""}
		]
	} );
}

function updateService(){
	$("#dentalService tbody").on('click', '.updateService' , function(){
		var closestRow = $(this).closest('tr');
		dentalData = serviceTable.row(closestRow).data();
		$('#addService').modal('show');
		setDentalService(dentalData);
	});
}

function deleteDentalService(){
	$("#dentalService tbody").on('click', '.archiveService' , function(){
		var closestRow = $(this).closest('tr');
		var deletePatientId = serviceTable.row(closestRow).data();
		if (confirm("Do you want to delete?")) {
			callDeleteDentalService(deletePatientId[5]);
		}
		return false;
		
	});
}