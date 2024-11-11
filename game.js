let gamerPattern = [];
let UserClickedPattern = [];
const buttonColors = ["red", "yellow", "blue", "green"];
let level = 0;

$(".btn").on("click", function () {
  let userChosenColour = this.id;
  UserClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  // if(gamerPattern.length === UserClickedPattern.length)
  // {
  if (checkAnswer(gamerPattern, UserClickedPattern)) {
    console.log(gamerPattern);
    console.log(UserClickedPattern);
    setTimeout(() => {
      nextSequence();
    }, 1000);
    UserClickedPattern = [];
  }
  // else{
  //     console.log(gamerPattern);
  //     console.log(UserClickedPattern);
  //   console.log('error function');
  // }
  //}
  // else {
  //     console.log('non ancora lunghi uguali');
  //}
});

function playSound(name) {
  let audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function animatePress(colour) {
  $("#" + colour).addClass("pressed");

  setTimeout(function () {
    $("#" + colour).removeClass("pressed");
  }, 100);
}

function gameOver() {
  $("body").addClass("game-over");
  let gameover = new Audio("./sounds/wrong.mp3");
  gameover.play();
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  level = 0;
  $("h1").text("Press any key to restart");
  gamerPattern = [];
  UserClickedPattern = [];
}

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColors[randomNumber];
  setTimeout(function () {
    animatePress(randomChosenColour);
    playSound(randomChosenColour);
  }, 1000);

  if (level === 0) {
    $("#level-title").text(`Level ${level}`);
  } else {
    $("#level-title").text(`Level ${level}`);
  }
  if (gamerPattern.length === 0) {
    gamerPattern.push(randomChosenColour);
  } else {
    gamerPattern.push(randomChosenColour);
  }

  level++;
}

$(document).on("keydown", function () {
  nextSequence();
});

function checkAnswer(currentLevel, userClick) {
  let i = 0;
  let c = 0;

  if (userClick.length < currentLevel.length) {
    while (c < userClick.length) {
      if (userClick[c] === currentLevel[c]) {
        c++;
      } else {
        console.log(userClick);
        console.log(currentLevel);
        gameOver();
        return false;
      }
    }
  } else {
    while (i < currentLevel.length) {
      if (currentLevel[i] === userClick[i]) {
        i++;
      } else {
        console.log("errore con lunghezza uguale");
        console.log(userClick);
        console.log(currentLevel);
        gameOver();
        userClick = [];
        return false;
      }
    }
    return true;
  }
}
