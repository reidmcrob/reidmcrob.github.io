$(document).ready(function() {
//get all the nav li items and add a click event
  $(".nav").find("li").on("click", function() {
    $("#pageContent").hide().html("");
 //remove all active class
    $(".nav").find("li").removeClass("active");
    //add active class to clicked li
    $(this).addClass("active");
    //get the correct page according to click
    var page = $(this).attr("id");
    getPartial(page);
  })//click

//get the parital via JSON, add to page, activiate associating js
  function getPartial(partial) {
    if (partial == "homePage") { //ajax get home.html

      $.get("partials/home.html", function(data) {
        $("#pageContent").html(data);
        $('.carousel').carousel();
      })

    } else if (partial == "whatPage") { //ajax order2.html
 //paste the getJSON here; change the append id; change the file name
      $.getJSON("jsonDatabase/finalProject.json", function(data){
        //console.dir(data);
        var html="";
        $.each(data,function(index, item){
        html += '<div class="col-xs-12 col-md-4 jsonCats">' +
        '<div class= "catName"> <small></small> ' +item.name+ '</div>'+
        '<img class="catImage" src="'+item.image+'"/>'+
        //'<div class="commentContainer">';
        '<div class="panel panel-default">' + //added
        '<div class="panel-heading">Reviews</div>';//added
        $.each(item.comments, function(ind, i){
          html += '<div class="panel-body">' + //added
            '<div class="renterName"><small>' + i.username + '</small></div>' +
            '<div class="renterComment">' + i.comment + '</div>' +
            '<div class="renterStars">';

                  //var numStars = Number(i.stars);

                  for(var j=1; j<=5; j++){
                    if(j<= i.stars){
                      html+='<img src="images/fullstar.png"/>';
                    }
                    else{
                      html+= '<img src="images/emptystar.png"/>';
                    }
                  }

                  html+= '</div>'+ //end stars
                  '</div>';//panel body
        })// each comment

        //do some stuff
        html+= '</div>'+ //comment container
              '</div>'; //col-md-4
        })//each cat

        $("#pageContent").html(html);
      })//getJSON

    } else if (partial == "elsePage") {//ajax get order2.html
      $.get("partials/order2.html", function(data) {

        $("#pageContent").html(data);

        $('#endRentDate').datepicker({});

        $("#submitButton").on("click",function(){

          //get all empty inputs and select
               //add error class to div container

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
        })//click

        $("#cvvCode").on("focus", function(){
          $(this).css("background-color","#dbc9ff");

        })

        .on('blur', function(){
          $("#log").append("<br>input blur");
          $(this).css("background-color", "#FFF");

        });

        $("#submitButton").on("mouseenter", function(){
 // $("#log").append("<br>Button mouseenter");
          $(this).text("Get Eating");

        })

        .on("mouseleave", function(){
          //$("#log").append("<br>Button mouseleave");
          $(this).text("Order Now");

        });
      })//get
    }

    $("#pageContent").fadeIn();

  }

   function sendConfirmation() {
      //make an object to record data for database;
      var order = {};
      //get all the jquery objects
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
    }//sendConfirmation
    //begin the program, get the homepage

    getPartial("homePage");

  })//ready
  /*
              //activate the datepicker
              $('#startRentDate, #endRentDate').datepicker({});
              //user clicks submit
              $("#submitButton").on("click", function() {
                //add the error class to div of empty inputs
                $("input, select").filter(function() {
                  return !this.value;
                }).closest("div").addClass("has-error")
                //remove the error class from all filled inputs
                $("input, select").filter(function() {
                  return this.value;
                }).closest("div").removeClass("has-error");
                //get all errors
                var hasError = $(".has-error");
                //if no errors
                if (hasError.length < 1) {
                  sendConfirmation();
                }
              })
              //do when order valid
              function sendConfirmation() {
                //we will store all our order information here
                var order = {};
                //get all input values
                var inputs = $("input, select");
                //put all the input values into object ; this each can be done with jquery objects
                inputs.each(function() {
                  var id = $(this).attr("id");
                  order[id] = $(this).val();
                })
                //act as if sending to databse
                alert("send to databse: " + JSON.stringify(order));
                //show success message
                $("#successMsg").html("Order Received!<br/><br/>" +
                  order.catSelect + " will be delivered on " + order.startRentDate + "<img id='paws' src='images/catPaws.jpeg'>");
              }//end sendConfirmation
  */
