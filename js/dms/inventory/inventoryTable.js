var inventoryTable;

function initializeInventoryDataTable(){
	inventoryTable = $('#inventory').DataTable( {
		columns: [
		{title: "#"},
		{title: "Name"},
		{title: "Qty"},
		{title: ""}
		]
	} );
}