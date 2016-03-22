$(document).ready(function(){

  $.getJSON("jsonDatabase/cat.json",function(data){
    console.dir(data);
  })
})
