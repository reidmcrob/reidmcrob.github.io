$(document).ready(function() {

  $(".nav").find("li").on("click", function() {

    $("#pageContent").hide().html("");

    $(".nav").find("li").removeClass("active");
    $(this).addClass("active");
    var page = $(this).attr("id");
    getPartial(page);
  })

  function getPartial(partial) {
    if (partial == "homePage") {

      $.get("partials/home.html", function(data) {
        $("#pageContent").html(data);
        $('.carousel').carousel();
      })

    } else if (partial == "whatPage") {

      $.getJSON("jsonDatabase/finalProject.json",function(data){
        //console.dir(data);
        var html="";
        $.each(data,function(index, item){
        html += '<div class="col-xs-12 col-md-4 jsonCats">' +
        '<div class= "catName"> <small>Name:</small> ' +item.name+ '</div>'+
        '<div class= "catType"> <small>Type:</small> ' +item.type+ '</div>'+
        '<div class= "catGender"> <small>Gender:</small> ' +item.gender+ '</div>'+
        '<img class=catImage src="'+item.image+'"/>'+
        //'<div class="commentContainer">';
        $.each(item.comments, function(ind, i){
          html+= '<div class="renterName"><small>' +i.username+ '</small></div>'+
                  '<div class="renterComment">' +i.comment+ '</div>'+
                  '<div class="renterStars">';

                  //var numStars = Number(i.stars);

                  for(var i=1; i<=5; i++){
                    if(i<= numStars){
                      html+='<img src="images/fullstar.png"/>';
                    }
                    else{
                      html+= '<img src="images/emptystar.png"/>';
                    }
                  }

                  html+= '</div>'+ //end stars
                  '</div>';
        })// each comment

        //do some stuff
        html+= '</div>'+ //comment container
              '</div>'; //col-md-4
        })//each cat
        $("#pageContent").html(html);
      })

    } else if (partial == "elsePage") {
      $.get("partials/order2.html", function(data) {

        $("#pageContent").html(data);

        $('#startRentDate, #endRentDate').datepicker({});

        $("#submitButton").on("click",function(){

                   $("input, select").filter(function() {

                  return !this.value;

                }).closest("div").addClass("has-error");

                //remove error class for non empty ones

                $("input, select").filter(function() {

                  return this.value; //removed !

                }).closest("div").removeClass("has-error");
                var errors = $(".has-error");
                if (errors.length < 1) {
                  //alert("no errors");
                  sendConfirmation();

                }
        })

        $("#cvvCode").on("focus", function(){
          $(this).css("background-color","#dbc9ff");

        })

        .on('blur', function(){
          $(this).css("background-color", "#FFF");

        });

        $("#submitButton").on("mouseenter", function(){

          $(this).text("Get Eating");

        })

        .on("mouseleave", function(){
          $(this).text("Order Now");

        });

      })

    }


    $("#pageContent").fadeIn();

  }

   function sendConfirmation() {
      //make an object to record data for database;
      var order = {};
      //get all teh jquery objects
      var formData = $("input, select");
      //for each jquery object
      formData.each(function() {
        var id = $(this).attr("id"); //get the id of the element
        order[id] = $(this).val(); //set the field and the value
      })
      alert("Sending to database " + JSON.stringify(order));
      $("#successMsg").html("Order Received!<br/><br/>" +
        order.catSelect + " will be delivered on " +
        order.endRentDate +
        "<img id='gummybear' src='images/thankyou.png'>");

    } //sendConfirmation
    //begin the program, get the homepage

    getPartial("homePage");

  }) //ready

  /*
        //put in js
        $("#myButton").on("mouseenter", function() {
            $("#log").append("<br> Mouse Enter")
            $(this).text("Order Placed");
          })
          .on("mouseleave", function() {
            $("#log").append("<br> Mouse Leave")
            $(this).text("Order Now");

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

    }

  }
  getPartial("homePage");
})
