$(document).ready(function() {

  var circleOrEx = "o"; // this says who is getting the first turn. As of now 'O' will go first
  var isGameInProgress = true; // this says that when the document loads there will be an active tic tac toe board ready to play
  var winningCombos = { // the tic tac toe board is made up of 9 squares but since it is an array it is counted from 0-8. these values outline the winning combinations starting from each possible square on the board. The board looks like this:
    // 0 | 1 | 2
    // ---------
    // 3 | 4 | 5
    // ---------
    // 6 | 7 | 8



    0: [ //0 is key
      [1, 2], //user wins if they enter in three of the same values across the top three squares
      [3, 6], //user wins if they enter in three of the same values down the far left column
      [4, 8] //user wins if they enter in three of the same values  diagonally from the top left to bottom right
    ],
    1: [ //winning combinations starting from square 1
      [0, 2], //user wins if they enter their answers accross the top bar
      [4, 7] //user wins if they enter the same answer down the middle column
    ], //there are no diagonal winning combinations for values 1, 3, 5, 7
    2: [ //winning combinations starting from square 2
      [0, 1], //user wins if they enter in three of the same values across the top three squares
      [5, 8], //user wins if they enter in three of the same values down the far right column
      [4, 6] //user wins if they enter three of the same values diagonally from the top right to bottom
    ],
    3: [ //winning combinations starting from square 3
      [0, 6], //user wins if they enter three of the same values down the far left column
      [4, 5] //user wins if they enter three of the same values across the middle row
    ],
    4: [ //winning combinations starting from square 4
      [1, 8], //this would not be a winning combination
      [2, 6], //user wins if they enter in three of the same values diagonally from the top right to bottom left
      [1, 7], //user wins if they enter in three of the same values down the middle column
      [3, 5] // user wins if they enter in three of the same values across the middle row
    ],
    5: [ //winning ombinations starting from square 5
      [2, 8], //user wins if they enter three of the same values down the far right column
      [3, 4] // user wins if they enter three of the same values across the middle row
    ],
    6: [ //winning combinations starting from square 6
      [0, 3], //user wubs if they enter three of the same values down the far left column
      [2, 4], //user wins if they enter three of the same values  diagonally from the top left to bottom right
      [7, 8] //user wins if they enter three of the same values across the bottom three squares
    ],
    7: [ //winning combinations starting from square 7
      [1, 4], //user wins if they enter three of the same values down the middle column
      [6, 8] //user wins if they enter three of the same values across the bottom three squares
    ],
    8: [ //winning combinations starting from square 8
      [0, 4], //user wins if they enter three of the same values  diagonally from the bottom right to the top left
      [2, 5], //user wins if they enter three of the same values down the far right column
      [6, 7] //user wins if they enter three of the same values across the bottom three squares
    ]
  };

  // the function will run when the user clicks on the board. the game begins
  $("#board").find("div").on("click", function() {

    if (isGameInProgress && $(this).hasClass("empty")) { /// within the #board remove the empty class and add either an X or an O value to the square when it is is clicked
      $(this).removeClass("empty").append("<span class='" + circleOrEx + "'>" + circleOrEx + "</span"); //allows the user to put the X or O in the square

      checkIfWon($(this).index(), circleOrEx); //this function determines which player starts the game and the order they will continue in

      if (circleOrEx === "o") { // if o has played then then it is x's turn; run line 67
        circleOrEx = "x"; //it is now x's turn
      } else {
        circleOrEx = "o"; // x has now played and it is o's turn
      }
    }

  });

  // the function will run once you click the button with the 'newGame' id
  $("#newGame").on("click", function() {

    var boardSquares = $("#board").find("div"); //boardSquares now becomes every div element within #board, which is each of the nine blank squares that make up the tic tac toe game
    var firstEmptyMemorySquare = $(".container").find(".nine").filter(function() { //bonus Explain what filter does
      return $.trim($(this).text()) === "" && $(this).children().length === 0;
    }).not("#board").first();

    if (firstEmptyMemorySquare.length == 1) { //moves the finished game to an EmptyMemorySquare
      firstEmptyMemorySquare.html($("#board").html());
    } else {
      $(".container").find(".nine").not("#board").empty();
      $(".container").find(".nine").first().html($("#board").html());
    }

    //ensures that users can places x's nd o'x, makes all the classes empty
    boardSquares.each(function() {
      $(this).addClass("empty").empty();
    })
    isGameInProgress = true;
  })

  //this will check if a player won. the final value in a winning combination is chosenSquare
  function checkIfWon(chosenSquare) {

    var mulitArr = winningCombos[chosenSquare];
    var playerWon;

    for (var i = 0; i < mulitArr.length; i++) { //this provides the length of the multidimensional array
      playerWon = true;
      for (var j = 0; j < mulitArr[i].length; j++) { //the value will start at zero and user must enter three values within a winning combination.  If j started at 1 the user only needs to match two of the same values in a winning combination.  )
        if (!$("#board").find("div").eq(mulitArr[i][j]).find("span").hasClass(circleOrEx)) { //if no one wins then nothing will happpen
          playerWon = false;
        }
      }

      if (playerWon) { //the remaining lines will affect the board when a player enters a winning combination

        for (var j = 0; j < mulitArr[i].length; j++) {
          $("#board").find("div").eq(mulitArr[i][j]).find("." + circleOrEx).addClass("green"); //the first two winning imputs will be green
        }
        $("#board").find("div").eq(chosenSquare).find("." + circleOrEx).addClass("green"); //makes the last winning imput green
        alert("Winner is " + circleOrEx.toUpperCase() + "!"); //alert will come up if "Winner is X" or "Winner is O"
        isGameInProgress = false; //the game is no longer active since a player has won
        return false; //this exits the loop
      }
    }


  }
})
