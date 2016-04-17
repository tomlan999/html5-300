/*

--Submit Function:  When Submit is clicked, retrieve form contents, check for empty fields, create row object, add it to an array, build and display the table
--CreateRow Function:  Accept variables from submit function, create tableRow object
--addToArray Function:  Accept tableRow object as an argument, push it onto players array
--buildTable Function:  Accept players array as an argument, remove html table, build new html table
--cancel Function:  Clear form values
--addNew Function:  Hide the table and show the form
--showForm Function:  Hide the form and show the table

*/

var players = []
var tableRow

$('#submit').on( 'click', submit );
$('#cancel').on( 'click', cancel );
$('#add-new').on( 'click', addNew );

function submit(evt) {
  evt.preventDefault( );
  
  var player = $( "#name" ).val();
  var number = $( "#number" ).val();
  var comment = $( "#comment").val();
  
  if (player == ""){
    alert ("Please enter a player name!");
  }
  
  else if (number == ""){
    alert ("Please enter a player number!");
  }
  
  else {
    createRow(player, number, comment);
    addToArray(tableRow);
    buildTable(players);
    showTable();
    cancel();
  }
}

function createRow (player, number, comment){
  tableRow = {
    name: player,
    number: number,
    comment: comment
  }
}

function addToArray (newRow) {
  players.push(newRow);
}

function buildTable (playerArray) {
  $("#table-body").empty();
  $("#table-body").append('<tr>');
  $("#table-body").append('<th>Player Name</th>');
  $("#table-body").append('<th>Player Number</th>');
  $("#table-body").append('<th>User Comment</th>');
  $("#table-body").append('</tr>');
  for (i = 0; i < playerArray.length; i++) {
    console.log(playerArray[i]);
    $("#table-body").append('<tr>');
    $("#table-body").append('<td>' + playerArray[i].name + '</td>');
    $("#table-body").append('<td>' + playerArray[i].number + '</td>');
    $("#table-body").append('<td>' + playerArray[i].comment + '</td>');
    $("#table-body").append('</tr>');
  }
}

function cancel() {
  $( "#name" ).val( "" );
  $( "#number" ).val( "" );
  $( "#comment" ).val( "" );
}

function addNew () {
  $( "#table" ).hide();
  $( "#form" ).show();
}

function showTable() {
  $( "#table" ).show();
  $( "#form" ).hide();
}
