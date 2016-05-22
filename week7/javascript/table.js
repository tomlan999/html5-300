
var tableRow;
var toEdit = 0;

// If nothing is stored in localStorage, initialize rowID variable and store it at position 0, else retrieve value from localStorage

if (localStorage.length == 0 ){
  localStorage[ 0 ] = JSON.stringify( 0 );
  var rowID = 0;
}
else {
  var rowID = JSON.parse( localStorage[0] );
}
  
buildTable();


$('#submit').on( 'click', submit );
$('#cancel').on( 'click', showTable );
$('#add-new').on( 'click', showForm );

// --Submit Function:  When Submit is clicked, retrieve form contents, check for empty fields, create row object, add it to localStorage, build and display the table

function submit(evt) {
  evt.preventDefault( );
  var edit = evt.target.getAttribute("edit");
  
  var player = $( "#name" ).val();
  var number = $( "#number" ).val();
  var comment = $( "#comment").val();
  
  if (player == ""){
    alert ("Please enter a player name!");
  }
  
  else if (number == ""){
    alert ("Please enter a player number!");
  }
  
  else if ( edit == "n") {
    rowID++
    localStorage[ 0 ] = JSON.stringify( rowID );
    createRow(player, number, comment);
    addToStorage(rowID, tableRow);
    buildTable();
  }
  
  else {
    $( "#submit" ).attr("edit","n");
    createRow(player, number, comment);
    addToStorage(editID, tableRow);
    buildTable();
  }
}

// --CreateRow Function:  Accept variables from submit function, create tableRow object

function createRow (player, number, comment){
  tableRow = {
    name: player,
    number: number,
    comment: comment
  }
}

// --addToStorage Function:  Accept RowID and tableRow object as an argument, update (edit) or add to (new) localStorage

function addToStorage (rowID, newRow) {
  localStorage[ rowID ] = JSON.stringify( newRow );

}

// --buildTable Function:  Remove html table, build new html table using records retrieved from localStorage, create edit and delete events

function buildTable () {
  $("#table-body").empty();
    
  for (i = 1; i < localStorage.length; i++) {
      var key = localStorage.key( i );
      var data = JSON.parse( localStorage[ key ] );
      $("#table-body").append('<tr>');
      $("#table-body").append('<td>' + data.name + '</td>');
      $("#table-body").append('<td>' + data.number + '</td>');
      $("#table-body").append('<td>' + data.comment + '</td>');
      $("#table-body").append('<button id="' + key + '" type="button" class="delete">Delete</button>');
      $("#table-body").append('<button id="' + key + '" type="button" class="edit">Edit</button>');
      $("#table-body").append('</tr>');
  }
  
  $('.delete').on( 'click', remove );
  $('.edit').on( 'click', edit );
  showTable();
}

// remove Function:  Get id of Delete button (matches row id), delete associated localStorage record, rebuild and show table

function remove(evt) {
  var id = evt.target.getAttribute("id");
  localStorage.removeItem( id );
  buildTable();
}

// edit Function:  Get id of Edit button (matches row id), hide table and show form, populate form

function edit(evt) {
  editID = evt.target.getAttribute("id");
  var data = JSON.parse( localStorage[ editID ] );
  showForm();
  
  $( "#submit" ).attr("edit","y");
  $( "#name" ).val( data.name );
  $( "#number" ).val( data.number );
  $( "#comment" ).val( data.comment );
}

// --clear Function:  Clear form values

function clear() {
  $( "#name" ).val( "" );
  $( "#number" ).val( "" );
  $( "#comment" ).val( "" );
}

// --addNew Function:  Hide the table and show the form

function showForm () {
  $( "#table" ).hide();
  $( "#form" ).show();
}

// --showTable Function:  Hide the form and show the table

function showTable() {
  $( "#table" ).show();
  $( "#form" ).hide();
  clear();
}