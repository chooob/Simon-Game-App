var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = false;

var buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() {
  $("#level-title").text("Level " + level);
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);

}

function playSound(key) {
  var sound;
  switch (key) {
    case "red":
      sound = new Audio("sounds/red.mp3");
      sound.play();
      break;

    case "green":
      sound = new Audio("sounds/green.mp3")
      sound.play();
      break;

    case "yellow":
      sound = new Audio("sounds/yellow.mp3")
      sound.play();
      break;

    case "blue":
      sound = new Audio("sounds/blue.mp3")
      sound.play();
      break;

    default:
      alert("Error");
  }
}

$(".btn").on("click", function(e) {
  if (start === true) {
    var userChosenColour;
    userChosenColour = $(e.target).attr('id');
    userClickedPattern.push(userChosenColour)
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer();
  }
});


function checkAnswer() {

  if(userClickedPattern[userClickedPattern.length-1] === gamePattern[userClickedPattern.length-1]){
    if(userClickedPattern.length === gamePattern.length){
      userClickedPattern = [];
      setTimeout(function() {
        nextSequence()
      }, 1000);
    }
  }else {
    console.log("wrong");
    incorrect();
  }
}

function incorrect(){
  var wrong = new Audio("sounds/wrong.mp3");
  wrong.play();
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  console.log("gameover");
  startOver();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  start = false;
  userClickedPattern = [];
}



$(document).on("keypress", function() {
  if (start === false) {
    start = true;
    console.log(start);
    nextSequence();
  } else {
    console.log("game started already");
  }
});
