///////////////////////////////////////////////////////////////////////////////
// VARIABLE DECLARATIONS
///////////////////////////////////////////////////////////////////////////////
var config = {
	apiKey: "AIzaSyB3O2HaO5Sh_W_ITRSu28SeoMuP5ibfJ0A",
    	authDomain: "shuttle-schedule.firebaseapp.com",
		databaseURL: "https://shuttle-schedule.firebaseio.com",
		storageBucket: "shuttle-schedule.appspot.com",
		messagingSenderId: "41362873231"
	};
var database = firebase.database();
var myFirebase = new Firebase('https://shuttle-schedule.firebaseio.com/');


///////////////////////////////////////////////////////////////////////////////
// PRIMARY AND UTILITY FUNCTIONS
///////////////////////////////////////////////////////////////////////////////

database.ref().on("value", function(snapshot) {


///////////////////////////////////////////////////////////////////////////////
// CLICK FUNCTIONS BELOW
///////////////////////////////////////////////////////////////////////////////

$("#submit").on('click', function(){
	var shuttle = $("#shuttle-name").val().trim();
	var shuttle_bay = $("#shuttle-bay").val().trim();
	var destination = $("#destination").val().trim();
	var frequency = $("#frequency").val().trim();
	var first_shuttle = $("#first-shuttle").val().trim();

	myFirebase.push({
		shuttle: shuttle,
		shuttle_bay: shuttle_bay,
		destination: destination,
		frequency: frequency,
		first_shuttle: first_shuttle
	});
})


///////////////////////////////////////////////////////////////////////////////
// MAIN
///////////////////////////////////////////////////////////////////////////////
firebase.initializeApp(config);
$(document).ready(function(){


});