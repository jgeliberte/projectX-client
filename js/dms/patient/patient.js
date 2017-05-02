$(document).ready(function() {
	var patientResult = [];
	var array1 = [];
	$('#patientMenu').click(function(){
		window.location = '/v1/patient';
	});
	$('#patientMenu').load(
		$.getJSON("/v1/fetchallpatient", function(data){
			for (var key in data) {
				if(data.hasOwnProperty(key)){
					var value = data[key];
					console.log(value);
					var dataParse = JSON.stringify(value);
					for (var i = 0; i < value.length; i++) {
						if(value[i].firstname != null){
							patientResult.push(i + 1);
							patientResult.push(value[i].firstname);
							patientResult.push(value[i].lastname);
							patientResult.push(value[i].age);
							patientResult.push(value[i].primary_contact);
							patientResult.push(appendPatientIcons());
							array1.push(patientResult);
							patientResult = [];
							
						}
					}
					console.log("Data: " + dataParse);
					console.log("array :" + patientResult);
				}
			};
			console.log(array1);
            //$('#patient_records').attr("href", 'v1/patient');
            var patientTable = $('#patientRecords').DataTable( {
            	data: array1
            } );

            $("#patientRecords .updatePatient").click('tr' , function(){
            	var data = patientTable.row( this ).data();
            	alert( 'You clicked on '+data[0]+'\'s row' );
		//$('#addPatient').modal('toggle');
	});

            // $('#patientRecords tbody').on('click', 'tr', function () {
            // 	var data = patientTable.row( this ).data();
            // 	alert( 'You clicked on '+data[0]+'\'s row' );
            // } );


        //});
    })
		);


});

function appendPatientIcons() {
	var icons = "<div style='display: block;text-align: center;'>" + 
	"<span class='updatePatient glyphicon glyphicon-pencil' aria-hidden='true' style='margin-right: 15%;'></span>" + 
	"<span class='archiveData glyphicon glyphicon-trash' aria-hidden='true'></span>" + 
	"</div>"

	return icons;
}