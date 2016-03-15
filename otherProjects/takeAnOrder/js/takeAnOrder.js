$(document).ready(function() {

  /*
  -click - done
  -focus
  -blur
  -change
  -mouseenter & mouseleave
  */

  $("#myButton").on("mouseenter", function() {
    $("#log").append("<br> Mouse Enter")
      $(this).text("Order Now");
    })
    .on("mouseleave", function() {
        $("#log").append("<br> Mouse Leave")
      $(this).text("Order Placed");

    });

  $("#mySingleLineText").on("focus", function() {
    $("#log").append("<br> Focus Purple")
      $(this).css("background-color", "#7d1e49")
    })
    .on("blur", function() {
      $("#log").append("<br> Blur White")
      $(this).css("background-color", "#FFF")
    });

  $("#mySelect").on("change", function() {
    $("#log").append("<br> Value Input Change")
    var val = $(this).val();
    $("#mySelectMessage").html(val + " is a nice selection!");
  });

  $("#myButton").on("click", function() {
    $("#log").append("<br> Button Was Clicked")

    var myInput = $("#mySingleLineText").val();

    var myTextarea = $("#myTextarea").val();

    var mySelect = $("#mySelect").val();

    var myRadio = $("[name='gender']:checked").val();

    var myCheckValues = [];
    //each is a jquery loop for objects/arrays
    $("[name='vehicle']:checked").each(function() {
      $("#log").append("<br>Value Was Selected")

      myCheckValues.push($(this).val());
    });

    $("#log").append("<br>User clicked the button!");

    $("#log").append("<br>User clicked the button: " + myInput);
    $("#log").append("<br>Value of textarea is: " + myTextarea);
    $("#log").append("<br>Value of select is: " + mySelect);
    $("#log").append("<br>Value of radio button is: " + myRadio);
    $("#log").append("<br> Value of check is: " + myCheckValues.join());
  });

});
