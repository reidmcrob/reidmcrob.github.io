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

      $.getJSON("jsonDatabase/finalProject.json", function(data){
        //console.dir(data);
        var html="";
        $.each(data,function(index, item){
        html += '<div class="col-xs-12 col-md-4 jsonCats">' +
        '<div class= "catName"> <small></small> ' +item.name+ '</div>'+
        '<img class="catImage" src="'+item.image+'"/>'+
        //'<div class="commentContainer">';
        $.each(item.comments, function(ind, i){
          html+= '<div class="renterName"><small>' +i.username+ '</small></div>'+
                  '<div class="renterComment">' +i.comment+ '</div>'+
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

        $('#endRentDate').datepicker({});

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
    }
    //begin the program, get the homepage

    getPartial("homePage");

  })
