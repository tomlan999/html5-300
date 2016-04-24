var totalnumbers = 0;
var totalstrings = 0;
var sum = 0;
var average = 0;
var wordarray = [];
var wordObject = {};
var arrayElement = 0;

$('#submit').on( 'click', submit );
$('#reset').on( 'click', reset );

// submit Function: Get value from textarea, alert on no value, if numeric calculate and populate numbers, if string concatenate and calculate word counts

function submit(evt) {
   evt.preventDefault( );
  
  var content = $( "#textarea" ).val();
  
  if (content == "") {
    alert("Please enter a number or a string!");
  }
  
  else if ($.isNumeric(content)) { 
    
    totalnumbers++; 
    content = Number(content); 
    sum = (sum + content); 
    average = (sum / totalnumbers); 
    
    $("#totalnumbers").text(totalnumbers);
    $("#sum").text(sum);
    $("#average").text(average);
   }
  
  else {
    
    totalstrings++
    $("#totalstrings").text(totalstrings);
    $("#concat").text($("#concat").text() + " " + content);
    
    wordcountArray(content);
    wordcountObject(wordarray);
    buildTable(wordObject);
  }
  
  $( "#textarea" ).val("");
}

// reset Function:  Clear variables, values and paragraphs, build empty table

function reset() {

  totalnumbers = 0;
  totalstrings = 0;
  sum = 0;
  average = 0;
  wordarray = [];
  wordObject = {};
  arrayElement = 0;
  
  $( "#textarea" ).val("");
  $("#totalnumbers").text("0");
  $("#totalstrings").text("0");
  $("#sum").text("0");
  $("#average").text("0");
  $("#concat").text("");
  
  buildTable();
}

// wordcountArray Function: Receive a string, check each character, add letters and apostrophes to words, drop spaces and special characters, add words to array

function wordcountArray(incomingString){
  var counter = 0;
  var char;
  var word;
  
  while (counter <= incomingString.length){
    if (/[a-z']/i.test(incomingString.charAt(counter))){
      char = incomingString.charAt(counter);
      if (word != undefined) {
        word = word+char;
      }
      else {
        word = char;
      }
    }
    
    else if (word != "" && word != undefined) {
      wordarray.push(word);
      word = "";
    }
    counter++;
  }
}

// wordcountObject Function: Receive an array, retrieve each element and check if it is a key in wordObject, if yes add 1 to value associated with that key, if no add as a key and set value to 1

function wordcountObject(incomingArray) {
  var word;
  var wordcount = 0;
  
  while (arrayElement < incomingArray.length) {
    word = incomingArray[arrayElement];
    
    if (word in wordObject === true) {
      wordcount = Number(wordcount);
      wordcount = wordObject[word]+1;
      wordObject[word] = wordcount;
    }
    
    else{
      wordObject[word] = 1;
    }
    
    arrayElement++;
  }
}

// buildTable function:  Receive an object, empty table, build new table using contents of the object

function buildTable (incomingObject) {
  $("#table-body").empty();
    
  for (i in incomingObject) {
    $("#table-body").append('<tr>');
    $("#table-body").append('<td>' + i + '</td>');
    $("#table-body").append('<td>' + incomingObject[i] + '</td>');
    $("#table-body").append('</tr>');
  }
}