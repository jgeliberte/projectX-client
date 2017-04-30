$(document).ready(function() {

	$('#dentalRecords').DataTable( {
		data: displayDentalRecords()
	} );


	$('#patient_records').click(function(){
		$.get( "../v1/fetchallpatient", function( data ) {
			var response = JSON.parse(data);
			var dataset = [];
			var dataraw= [];
			debugger;
			for (var counter = 0; counter < response.data.length; counter++) {
				var ctr = 0;
				var getKeys = $.map(response.data[counter], function(value, index) {
					return [value];
				});

		        getKeys.forEach(function(x) {
		        	if (ctr == 0 || ctr == 1 ||
		        		ctr == 3 || ctr == 4 || ctr == 8) {
		        		dataraw.push(x);
		        	}
		        	ctr++;
		        });

				dataraw.push(appendPatientIcons());
				dataset.push(dataraw);
				dataraw = [];
			}
			console.log(dataset);
 			$('#patientRecords').DataTable( {
				data: dataset
			});
		});
	});
	
	function appendPatientIcons() {
		var icons = "<div style='display: block;text-align: center;'>" + 
		"<span class='updatePatient glyphicon glyphicon-pencil' aria-hidden='true' style='margin-right: 15%;'></span>" + 
		"<span class='glyphicon glyphicon-trash' aria-hidden='true'></span>" + 
		"</div>"

		return icons;
	}

	function displayDentalRecords() {
		var dentalData = [
		["1" , "Juan" , "Dela Cruz" , "26" , "09012345678", appendDentalIcons()],
		["2" , "Maria" , "Clara" , "21" , "09253457810", appendDentalIcons()],
		["3" , "John" , "Geliberte" , "23" , "099946193003", appendDentalIcons()]
		];

		return dentalData;
	}

	function appendDentalIcons() {
		var icons = "<div style='display: block;text-align: center;'>" + 
		"<span id = 'diagnos' class='glyphicon glyphicon-pencil' aria-hidden='true' style='margin-right: 15%;'></span>" + 
		"<span id = 'history' class='glyphicon glyphicon-list-alt' aria-hidden='true'></span>" + 
		"</div>"

		return icons;
	}

	$(".updatePatient").click(function(){
		$('#addPatient').modal('toggle');
	});


});
