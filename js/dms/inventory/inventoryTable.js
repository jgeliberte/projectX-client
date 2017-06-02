var inventoryTable;
var inventoryData = null;

function initializeInventoryDataTable(){
	inventoryTable = $('#inventory').DataTable( {
		columns: [
		{title: "#"},
		{title: "Item Code"},
		{title: "Name"},
		{title: "Qty"},
		{title: "Price"},
		{title: ""}
		]
	} );
}

function updateInventory(){
	$("#inventory tbody").on('click', '.updateInventory' , function(){
		var closestRow = $(this).closest('tr');
		inventoryData = inventoryTable.row(closestRow).data();
		setInventoryData(inventoryData);
	});
}