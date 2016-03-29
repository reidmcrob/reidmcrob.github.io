$(document).ready(function() {

  $("#getClients").on("click", function() {

  $.getJSON("http://michelleabes.github.io/otherProjects/ajaxExamples/jsonDatabase/clients.json", function(data) {

    var html= "<table class='table table-hover table-striped'>" + "<tr><th>Name</th><th>Email</th><th>Company</th></tr>";

    $.each(data, function(index, item){

      html += "<tr>" +
      "<td>" + item.name + "</td>" +
      "<td>" + item.email + "</td>" +
      "<td>" + item.company + "</td>" +
      "</tr>";

    })

      html += "</table>";
      $("#data").append(html);


    // alert(data);
    //console.dir(data);
    //  $("#data").append(item.name)

  })

  })
});


/* $.getJSON("someFolder/someFile.json", function (data) {

$(document).ready(function () {

	var html = "";

$.each(data, function (index, item) {
        	html += "<div>" +
            	"<span class='song'>" + item.name + "</span>" +
            	"<span class='artist'>" + item.artist + "</span>" +
            	"</div>"
    	});

    	$("#musicDiv").append(html);

	});
}); */
