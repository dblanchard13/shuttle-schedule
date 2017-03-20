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

// LOAD READY RUN
$(document).ready(function(){

	// CALCULATE THE NEXT ARRIVAL TIME
	function nextArrivalTime(start, freq) {
		var start = moment(start, 'hh:mm')
		//console.log(start);
		var diff = moment().diff(start, 'minutes');
		if (moment(start).isAfter()) {
			return start.format('hh:mm A');
		}
		while (diff > freq) {
			diff = diff - freq;
			start.add(freq, 'm');
		}
		return (start.add(freq, 'm').format('hh:mm A'));
	}

	// CALCULATE HOW MANY MINUTES UNTIL NEXT ARRIVAL
	function minToArrival(start, freq) {
		var next = moment(nextArrivalTime(start, freq), 'hh:mm A');
		next.diff(moment(), 'minutes');
		return (next.diff(moment(), 'minutes') + " min");
	}

	function writeTable(snapshot) {
		var row = $("<tr>");
		row.append("<td>" + snapshot.val().shuttle + "</td>");
		row.append("<td>" + snapshot.val().shuttle_bay + "</td>");
		row.append("<td>" + snapshot.val().destination + "</td>");
		row.append("<td>" + snapshot.val().frequency + "</td>");
		row.append("<td>" + nextArrivalTime(snapshot.val().first_shuttle, snapshot.val().frequency) + "</td>");
		row.append("<td>" + minToArrival(snapshot.val().first_shuttle, snapshot.val().frequency) + "</td>");
		$("#data-table").append(row);
	}

	// UPDATE TABLE ON PAGE LOAD OR WHEN THE DATA IN FIREBASE CHANGES
	database.ref().on("child_added", function(childSnapshot) {
		writeTable(childSnapshot);
	})

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
