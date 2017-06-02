function callGetInventory() {
	var inventoryResult = [];
	var inventoryServiceNum = 1;
	var inventoryDataSet = [];
	$.getJSON("/v1/getallitems", function(data){
		for (var key in data) {
			if(data.hasOwnProperty(key)){
				var value = data[key];
				console.log("inventory"+value);
				var dataParse = JSON.stringify(value);
				for (var i = 0; i < value.length; i++) {
					if(value[i].item_code != null){
						inventoryResult.push(inventoryServiceNum);
						inventoryResult.push(value[i].item_code);
						inventoryResult.push(value[i].item_name);
						inventoryResult.push(value[i].item_quantity);
						inventoryResult.push(appendInvetorysIcons());
						inventoryDataSet.push(inventoryResult);
						inventoryResult = [];
						inventoryServiceNum++;
					}
				}
			}
		};
		inventoryTable.clear();
		inventoryTable.rows.add(inventoryDataSet);
		inventoryTable.draw();

		// updateService();

	});
}

function callAddInventory() {
	$.post("/v1/additem",{inventory_data : JSON.stringify(sendInventoryInfo())})
	.done(function(data, status){
		alert(data);
		callGetDentalServices();
		$(".modal .close").click();

	});
}

function callUpdateInventory() {
	// body...
}

function callDeleteInventory() {
	// body...
}