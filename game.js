
var buttonColours = ["red","blue","green","yellow"];
var gamePattern = []
var userClickedPattern = []
var started = false;

var level = 0;

$(document).keypress(function(){
  if (!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  makeSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);

});


function makeSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
  }

function nextSequence() {
  userClickedPattern = []
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber =(Math.floor(Math.random()*4));
  var randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);

  button = $('#'+ randomChosenColor);
  $(button).fadeIn(100).fadeOut(100).fadeIn(100);
  makeSound(randomChosenColor);
}

function animatePress(currentColour){
  $('#'+currentColour).addClass('pressed');
  setTimeout(function(){
    $('#'+currentColour).removeClass('pressed');
  }, 100);
}

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
    },1000);
  }
}
  else{
  makeSound("wrong");
  $("body").addClass("game-over");
  $("#level-title").text("Game over, Press any key to restart!");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  startOver();
}
}

function startOver(){
  gamePattern = [];
  level = 0;
  started = false;

}
