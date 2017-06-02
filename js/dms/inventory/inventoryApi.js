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
						inventoryResult.push(value[i].item_price);
						inventoryResult.push(appendInvetorysIcons());
						inventoryResult.push(value[i].id);
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

		updateInventory();
		// updateService();

	});
}

function callAddInventory() {
	$.post("/v1/additem",{inventory_data : JSON.stringify(sendInventoryInfo())})
	.done(function(data, status){
		alert(data);
		callGetInventory();
	});
}

function callUpdateInventory() {
	$.post("/v1/updateitem",{inventory_data : JSON.stringify(sendInventoryInfo())})
	.done(function(data, status){
		alert(data);
		$('input').val("");
		callGetInventory();
	});
}

function callDeleteInventory() {
	// body...
}