$(document).ready(function(){

  $.getJSON("jsonDatabase/jsonCats.json",function(data){
    console.dir(data);
    var html="";
    $.each(data,function(index, item){
    html += '<div class="col-md-4">' +
    '<div class= "catName"> <small>Name:</small> ' +item.name+ '</div>'+
    '<div class= "catType"> <small>Type:</small> ' +item.type+ '</div>'+
    '<div class= "catGender"> <small>Gender:</small> ' +item.gender+ '</div>'+
    '<img class=catImage src="'+item.image+'"/>'+
    '<div class="commentContainer">';
    $.each(item.comments, function(ind, i){
      html+= '<div class="renterName">' +i.username+ '</div>'+
              '<div class="renterComment">' +i.comment+ '</div>'+
              '<div class="renterStars">';

              var numStars = Number(i.stars);

              for(var i=1; i<=5; i++){
                if(i<= numStars){
                  html+='<img src="images/fullstar.png"/>';
                }
                else{
                  html+= '<img src="images/emptystar.png"/>';
                }
              }

              html+= '</div>'; //end stars
    })// each comment

    //do some stuff
    html+= '</div>'+ //comment container
          '</div>'; //col-md-4
    })//each cat
    $("#catData").append(html);
  })
})
/*
//one per cat
<div class="col-md-4 cat">
<div class= "catName"></div>
<div class= "catType"></div>
<div class= "catGender"></div>
<img src=""/>
<div class="commentContainer">
  <div class="renterName"></div>
  <div class="renterComment"></div>
  <div class="renterStars"></div>
  //5 stars, some full, some empty
</div> //end starts
</div> //end comments container
</div> //ends cat


*/
