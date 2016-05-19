
$('#submit').on( 'click', submit );
$('#cancel').on( 'click', showTable );
$('#add-new').on( 'click', showForm );

buildTable();

// --Submit Function:  When Submit is clicked, retrieve form contents, check for empty // fields, add player info to database, build and display the table

function submit( evt ) {
  
  evt.preventDefault( );
  var edit = evt.target.getAttribute("edit");
  var player = $( "#name" ).val();
  var number = $( "#number" ).val();
  var comment = $( "#comment").val();
  var baseUrl = 'https://shielded-sea-3725.herokuapp.com/data-api/';
  var collection = 'tlandeis';

  if (player == ""){
      alert ("Please enter a player name!");
  }

  else if (number == ""){
    alert ("Please enter a player number!");
  }

  else if ( edit == "n") {

    $.ajax( baseUrl + collection,
    {
      method: 'POST',
      data: {
                player: player,
                number: number,
                comment: comment
            },
      success: buildTable,
      error: logAjaxError
    } );
  }
  
  else {
    
    var id = evt.target.getAttribute("rest-id");
    $( "#submit" ).attr("edit","n");

    $.ajax( baseUrl + collection + '/' + id,
    {
        method: 'PUT',
        data: {
                player: player,
                number: number,
                comment: comment
              },
        success: buildTable,
        error: logAjaxError
    } );
    $( "#submit" ).attr("rest-id","");
  }
}

// --buildTable Function:  Get records from database, remove html table, build new html table, create edit and delete events

function buildTable () {
  
  var baseUrl = 'https://shielded-sea-3725.herokuapp.com/data-api/';
  var collection = 'tlandeis';

  $.ajax( baseUrl + collection,
  {
      method: 'GET',
      success: createTable,
      error: logAjaxError
  } );

  function createTable( data ) {

    $("#table-body").empty();
    
    for (i = 0; i < data.length; i++) {
      $("#table-body").append('<tr>');
      $("#table-body").append('<td>' + data[i].player + '</td>');
      $("#table-body").append('<td>' + data[i].number + '</td>');
      $("#table-body").append('<td>' + data[i].comment + '</td>');
      $("#table-body").append('<button id="' + data[i]._id + '" type="button" class="delete">Delete</button>');
      $("#table-body").append('<button id="' + data[i]._id + '" type="button" class="edit">Edit</button>');
      $("#table-body").append('</tr>');
    }
    
    $('.delete').on( 'click', remove );
    $('.edit').on( 'click', edit );
  }
  
  showTable();
  clear();
   
}

// remove Function:  Get id of Delete button, delete associated record

function remove(evt) {
  var id = evt.target.getAttribute("id");
  var baseUrl = 'https://shielded-sea-3725.herokuapp.com/data-api/';
  var collection = 'tlandeis';
  
  $.ajax( baseUrl + collection + '/' + id,
  {
      method: 'DELETE',
      success: buildTable,
      error: logAjaxError
  } );
}

// edit Function:  Get id of Edit button, get record to edit, populate and show form, add id to Submit button

function edit(evt) {
  showForm();
  var id = evt.target.getAttribute("id"); 
  var baseUrl = 'https://shielded-sea-3725.herokuapp.com/data-api/';
  var collection = 'tlandeis';

  evt.preventDefault( );

  $.ajax( baseUrl + collection + '/' + id,
  {
      method: 'GET',
      success: populateForm,
      error: logAjaxError
  } );

  function populateForm( data ) {
    $( "#name" ).val( data.player );
    $( "#number" ).val( data.number );
    $( "#comment" ).val( data.comment );
    $( "#submit" ).attr("rest-id",id);
    $( "#submit" ).attr("edit","y");
  } 
}

// --clear Function:  Clear form values

function clear() {
  $( "#name" ).val( "" );
  $( "#number" ).val( "" );
  $( "#comment" ).val( "" );
}

// --showForm Function:  Hide the table and show the form

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

function logAjaxError( jqXHR, textStatus, errorThrown ) {
    console.log( 'AJAX error. Status:', textStatus, 'error:', errorThrown );
}
