
$('.inner-box').on( 'mousedown', down );

//---------------------------------------------

function down(evt) {
  
  // Get cursor left and top relative to document
  var cursorLeft = evt.pageX;
  var cursorTop = evt.pageY;
  
  // Find box id and get left and top relative to document
  var id = evt.target.id;
  var element = $("#" + id);
  var boxTop = element.offset().top;
  var boxLeft = element.offset().left;
   
  // Find difference between cursor left/top and box left/top
  var boxTopDiff = (cursorTop - boxTop);
  var boxLeftDiff = (cursorLeft - boxLeft);
  
  $(document).on( 'mousemove', move);
  
  //---------------------------------------------

  function move(evt) {
    
    // Get new cursor position
    var cursorLeft = evt.pageX;
    var cursorTop = evt.pageY;
    
    // Calculate new box position
    var newOffsetLeft = cursorLeft - boxLeftDiff;
    var newOffsetTop = cursorTop - boxTopDiff;
    
    // Set new box offsets
    $(element).offset({left: newOffsetLeft, top: newOffsetTop});
    
    $(document).on( 'mouseup', up );
  }
  
  //------------------------------------------------------

  function up() {
     $(document).off( 'mousemove', move);
     $(document).off( 'mouseup', up);

  }

}



