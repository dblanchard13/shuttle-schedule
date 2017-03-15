// VARIABLE DECLARATIONS
var config = {
	apiKey: "AIzaSyB3O2HaO5Sh_W_ITRSu28SeoMuP5ibfJ0A",
    	authDomain: "shuttle-schedule.firebaseapp.com",
		databaseURL: "https://shuttle-schedule.firebaseio.com",
		storageBucket: "shuttle-schedule.appspot.com",
		messagingSenderId: "41362873231"
	};
firebase.initializeApp(config);
var database = firebase.database();

// CALCULATE THE NEXT ARRIVAL TIME
function nextArrivalTime() {
	return "3:00pm"
}

// CALCULATE HOW MANY MINUTES UNTIL NEXT ARRIVAL
function minToArrival() {
	return "30 minutes"
}



// UPDATE TABLE ON PAGE LOAD OR WHEN THE DATA IN FIREBASE CHANGES
database.ref().on("child_added", function(childSnapshot) {
	var row = $("<tr>");
	row.append("<td>" + childSnapshot.val().shuttle + "</td>");
	row.append("<td>" + childSnapshot.val().shuttle_bay + "</td>");
	row.append("<td>" + childSnapshot.val().destination + "</td>");
	row.append("<td>" + childSnapshot.val().frequency + "</td>");
	row.append("<td>" + nextArrivalTime() + "</td>");
	row.append("<td>" + minToArrival() + "</td>");
	$("#data-table").append(row);
})

///////////////////////////////////////////////////////////////////////////////
// MAIN
///////////////////////////////////////////////////////////////////////////////
$(document).ready(function(){
	// FORM SUBMISSION, SENDING DATA TO FIREBASE
	$("#btn-submit").on('click', function(event){
		event.preventDefault();
		var shuttle = $("#shuttle-name").val().trim();
		var shuttle_bay = $("#shuttle-bay").val().trim();
		var destination = $("#destination").val().trim();
		var frequency = $("#frequency").val().trim();
		var first_shuttle = $("#first-shuttle").val().trim();

		database.ref().push({
			shuttle: shuttle,
			shuttle_bay: shuttle_bay,
			destination: destination,
			frequency: frequency,
			first_shuttle: first_shuttle
		});

		$("#shuttle-name").val("");
		$("#shuttle-bay").val("");
		$("#destination").val("");
		$("#frequency").val("");
		$("#first-shuttle").val("");
	})
});