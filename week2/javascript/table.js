
var players = []
var tableRow
var rowID = 0
var toEdit = 0

$('#submit').on( 'click', submit );
$('#cancel').on( 'click', showTable );
$('#add-new').on( 'click', addNew );
$('#submit-edit').on( 'click', submitEdit );
$('#cancel-edit').on( 'click', cancelEdit );

// --Submit Function:  When Submit is clicked, retrieve form contents, check for empty // fields, create row object, add it to an array, build and display the table

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
    rowID++
    createRow(player, number, comment, rowID);
    addToArray(tableRow);
    buildTable(players);
    showTable();
    clear();
  }
}

// --CreateRow Function:  Accept variables from submit function, create tableRow object

function createRow (player, number, comment, rowid){
  tableRow = {
    name: player,
    number: number,
    comment: comment,
    id:rowid
  }
}

// --addToArray Function:  Accept tableRow object as an argument, push it onto players array

function addToArray (newRow) {
  players.push(newRow);
}

// --buildTable Function:  Accept players array as an argument, remove html table, build new html table, create edit and delete events

function buildTable (playerArray) {
  $("#table-body").empty();
  $("#table-body").append('<tr>');
  $("#table-body").append('<th>Player Name</th>');
  $("#table-body").append('<th>Player Number</th>');
  $("#table-body").append('<th>User Comment</th>');
  $("#table-body").append('</tr>');
  
  for (i = 0; i < playerArray.length; i++) {
    $("#table-body").append('<tr>');
    $("#table-body").append('<td>' + playerArray[i].name + '</td>');
    $("#table-body").append('<td>' + playerArray[i].number + '</td>');
    $("#table-body").append('<td>' + playerArray[i].comment + '</td>');
    $("#table-body").append('<button id="' + playerArray[i].id + '" type="button" class="delete">Delete</button>');
    $("#table-body").append('<button id="' + playerArray[i].id + '" type="button" class="edit">Edit</button>');
    $("#table-body").append('</tr>');
  }
  
  $('.delete').on( 'click', remove );
  $('.edit').on( 'click', edit );
}

// --clear Function:  Clear form values

function clear() {
  $( "#name" ).val( "" );
  $( "#number" ).val( "" );
  $( "#comment" ).val( "" );
}

// --addNew Function:  Hide the table and show the form

function addNew () {
  $( "#table" ).hide();
  $( "#form" ).show();
}

// --showTable Function:  Hide the form and show the table

function showTable() {
  $( "#table" ).show();
  $( "#form" ).hide();
  clear();
}

// remove Function:  Get id of Delete button (matches row id), delete associated array element, renumber row ids, rebuild and show table

function remove(evt) {
  var toDelete = evt.target.getAttribute("id");
  players.splice((toDelete-1), 1);
  rowID--
  for (i = 0; i < players.length; i++){
    players[i].id = (i+1);
  }
  buildTable(players);
  showTable();
}

// edit Function:  Get id of Edit button (matches row id), hide table and show form, populate form, show submit and cancel buttons tied to edit events

function edit(evt) {
  toEdit = evt.target.getAttribute("id");
  addNew();
  
  $( "#name" ).val( players[toEdit-1].name );
  $( "#number" ).val( players[toEdit-1].number );
  $( "#comment" ).val( players[toEdit-1].comment );
  
  $( "#submit-edit" ).show();
  $( "#submit" ).hide();
  $( "#cancel-edit" ).show();
  $( "#cancel" ).hide();
  
}

// submitEdit Function:  Update array element being edited, show submit and cancel buttons tied to Add events, build and show table

function submitEdit() {
   
  players[toEdit-1].name = $( "#name" ).val( );
  players[toEdit-1].number = $( "#number" ).val( );
  players[toEdit-1].comment = $( "#comment" ).val( );
  
  $( "#submit-edit" ).hide();
  $( "#submit" ).show();
  $( "#cancel-edit" ).hide();
  $( "#cancel" ).show();
  
  buildTable(players);
  showTable();
}

// cancelEdit Function:  Show table and hide form, show submit and cancel buttons tied to Add events

function cancelEdit() {
  $( "#table" ).show();
  $( "#form" ).hide();
  $( "#submit-edit" ).hide();
  $( "#submit" ).show();
  $( "#cancel-edit" ).hide();
  $( "#cancel" ).show();
  clear();
}