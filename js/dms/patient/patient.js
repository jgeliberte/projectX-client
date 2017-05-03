$(document).ready(function() {
	var patientJsonResult = [];
	var patientDataset = [];
	$('#patientMenu').click(function(){
		window.location = '/v1/patient';
	});
	//$('#patientMenu').load(
	$.getJSON("/v1/fetchallpatient", function(data){
		for (var key in data) {
			if(data.hasOwnProperty(key)){
				var value = data[key];
				console.log(value);
				var dataParse = JSON.stringify(value);
				for (var i = 0; i < value.length; i++) {
					if(value[i].firstname != null){
						patientJsonResult.push(i + 1);
						patientJsonResult.push(value[i].firstname);
						patientJsonResult.push(value[i].lastname);
						patientJsonResult.push(value[i].age);
						patientJsonResult.push(value[i].primary_contact);
						patientJsonResult.push(appendPatientIcons());
						patientJsonResult.push(value[i].middlename);
						patientJsonResult.push(value[i].gender);
						patientJsonResult.push(value[i].address);
						patientJsonResult.push(value[i].email_address);
						patientJsonResult.push(value[i].secondary_contact);
						patientDataset.push(patientJsonResult);
						patientJsonResult = [];

					}
				}
				console.log("Data: " + dataParse);
				console.log("array :" + patientJsonResult);
			}
		};
		console.log(patientDataset);
            //$('#patient_records').attr("href", 'v1/patient');
            var patientTable = $('#patientRecords').DataTable( {
            	data: patientDataset,
            	columns: [
            	{title: "#"},
            	{title: "First Name"},
            	{title: "Last Name"},
            	{title: "Age"},
            	{title: "Phone Contact"},
            	{title: ""}
            	]
            } );

            $("#patientRecords tbody").on('click', '.updatePatient' , function(){
            	var closestRow = $(this).closest('tr');
            	var data = patientTable.row(closestRow).data();
            	var taskID = data;
            	$('#addPatient').modal('toggle');
            	setPatientData(data);
            	//alert(taskID);
            	
            });

        });
	// /);

	$('#btnAddPatient').on('click', function(){
		$.post("/v1/addpatient" , function(data){
			var sendPatientDataFirstArray = ["patient_data"];
			var sendPatientDataArray = [];
			var sendPatientObject = {};
			sendPatientObject["firstname"] = $('#firstName').val();
			sendPatientObject["lastname"] =  $('#lastName').val();
			sendPatientObject["middlename"] = $('#middleName').val();
			sendPatientObject["gender"] =  $('input[name=gender]:checked').val();
			sendPatientObject["address"] = $('#address').val(),
			sendPatientObject["email_address"] = $('#email').val(),
			sendPatientObject["primary_contact"] = $('#primary').val(),
			sendPatientObject["secondary_contact"] = $('#secondary').val()
			for(var i=0; i<sendPatientDataFirstArray.length; i++) {
				sendPatientDataArray[sendPatientDataFirstArray[i]] = sendPatientObject;

			}
			//sendPatientDataFirstArray.push({["patient_data"] : sendPatientObject});
			//sendPatientDataArray.push(sendPatientDataFirstArray);
			//ar bla = $('#firstName').val();
			console.log(sendPatientDataFirstArray);
			
		});
	});

	$('.modal').on('hidden.bs.modal', function(e) { 
		$(".modal-body input").val("")
	}) ;



});

function appendPatientIcons() {
	var icons = "<div style='display: block;text-align: center;'>" + 
	"<span class='updatePatient glyphicon glyphicon-pencil' aria-hidden='true' style='margin-right: 15%;'></span>" + 
	"<span class='archiveData glyphicon glyphicon-trash' aria-hidden='true'></span>" + 
	"</div>"

	return icons;
}

function setPatientData(patientValue){
	$('#firstName').val(patientValue[1]);
	$('#middleName').val(patientValue[6]);
	$('#lastName').val(patientValue[2]);
	$('#age').val(patientValue[3]);
	$('#address').val(patientValue[8]);
	$('#email').val(patientValue[9]);
	$('#primary').val(patientValue[4]);
	$('#secondary').val(patientValue[10]);
	$("input[name=gender][value=" + patientValue[7] + "]").prop('checked', true);

}