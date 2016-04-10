// Create variables
var submit = document.getElementById("submit"); //variable representing submit button
var reset = document.getElementById("reset"); //variable representing reset button
var totalnumbers = 0;
var sum = 0;
var average = 0;

// Create event listeners - when click event occurs, execute function
submit.addEventListener("click", onClick);
reset.addEventListener("click", resetAll);

// Submit button function
function onClick(evt) {
  evt.preventDefault(); // Prevent form from submitting
  var element = $( "#number" ).val(); // Retrieve value submitted to the form
  if ($.isNumeric(element) == true) { // Check to see if value is numeric
    totalnumbers++; // Add one to submission count
    var element1 = Number(element); // Convert value to numeric value
    sum = (sum + element1); // Add to sum of all numbers
    average = (sum / totalnumbers); // Calculate new average
    // Update all paragraph elements
    document.getElementById("totalnumbers").innerHTML = totalnumbers;
    document.getElementById("sum").innerHTML = sum;
    document.getElementById("average").innerHTML = average;
  }
  else {
    alert ("Please enter a numeric value!!");
  }
  $( "#number" ).val(""); // Clear the input field
}

// Reset button function
function resetAll(){
  //evt.preventDefault(); 
  $( "#number" ).val(""); // Clear the input field
  // Reset variables
  totalnumbers = 0;
  sum = 0;
  average = 0;
  // Reset all paragraph elements
  document.getElementById("totalnumbers").innerHTML = "0";
  document.getElementById("sum").innerHTML = "0";
  document.getElementById("average").innerHTML = "0";
}