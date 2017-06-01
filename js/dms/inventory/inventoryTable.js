var inventoryTable;

function initializeInventoryDataTable(){
	inventoryTable = $('#inventory').DataTable( {
		columns: [
		{title: "#"},
		{title: "Item Code"},
		{title: "Name"},
		{title: "Qty"},
		{title: ""}
		]
	} );
}