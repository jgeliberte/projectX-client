var serviceTable;

$(document).ready(function() {
	initializeServiceDataTable();
});

function initializeServiceDataTable(){
	serviceTable = $('#dentalService').DataTable( {
		columns: [
		{title: "#"},
		{title: "Code"},
		{title: "Name"},
		{title: "Description"},
		{title: "Fee"}
		]
	} );
}