
let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let level = 0;

let highScore = 0;

let currentColour = 0; //Used for indexing when comparing both pattern

let started = false;

$(".btn").click(function (e) {  //Detect which button is clicked
   
    let userChosenColour = e.target.id; //Get the id of the button

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer();

});

function checkAnswer(){

    if (userClickedPattern[currentColour] == gamePattern[currentColour]){
        if (userClickedPattern.length == gamePattern.length){ //Before levelling up, check if the user completed the level or current sequence
            setTimeout(function () {
                nextSequence();
              }, 1000);
            userClickedPattern = [];
            currentColour = 0;
        }
        else{
            currentColour++;
        }
    }
    else{
        if(level > highScore){ //Update highscore only if the level is greater than the current highscore
            highScore = level - 1;
        }
        $(".high-score").text("High score: " + highScore);
        gameOver();
    }
}

function gameOver(){

    new Audio("sounds/wrong.mp3").play();

    $("body").addClass("game-over");
    setTimeout(function () {$("body").removeClass("game-over");}, 200); //Flash game over animation

    $("#level-title").text("Game Over, Press Any Key to Restart"); //Changes the title to game over

    gamePattern = []; 
    userClickedPattern = [];

    started = false; //Enable the game to start over
    level = 0;

}

$(document).keydown(function (e) { 

    if(!started){

        nextSequence();
        started = true;

    }

});

function nextSequence() {

    level++;
    $("#level-title").text("Level " + level); //Change the main heading based on current level

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100); //Flash button animation

    playSound(randomChosenColour);
    
}

function playSound(name){

    new Audio("sounds/"+name+".mp3").play();

}

function animatePress(currentColour){
    
    $("#"+currentColour).addClass("pressed"); //Add class "pressed" to the clicked button
    
    setTimeout(function() { $("#"+currentColour).removeClass("pressed"); }, 100); //Remove class "pressed" for flash animation

}



