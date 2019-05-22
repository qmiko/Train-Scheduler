
var config = {
    apiKey: "AIzaSyAyXr18832QzKLQ9AeteinziNcg4I7ZIT8",
    authDomain: "myproject-c06d8.firebaseapp.com",
    databaseURL: "https://myproject-c06d8.firebaseio.com",
    projectId: "myproject-c06d8",
    storageBucket: "myproject-c06d8.appspot.com",
    messagingSenderId: "796262105469",
    appId: "1:796262105469:web:cf6af65aac32e9e0"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding Employees
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainTime = moment($("#firstTrain-input").val().trim(), "HH:mm").format("X");
    var trainFrequency = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: trainDest,
      time: trainTime,
      rate: trainFrequency
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.rate);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#firstTrain-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().rate;
  
    // Train Info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainTime);
    console.log(trainFrequency);
  
    // Prettify the train start
    var trainTimePretty = moment.unix(trainTime).format("HH:mm");
  
    // To calculate the next train
    var nextTrain = moment().diff(moment(trainTime, "X"), "minutes");
    console.log(nextTrain);
  
    // Calculate minutes to arrival
    var minAway = nextTrain * trainFrequency;
    console.log(minAway);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      $("<td>").text(trainTimePretty),
      $("<td>").text(nextTrain),
      $("<td>").text(trainFrequency),
      $("<td>").text(minAway)
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });