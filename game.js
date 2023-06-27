var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameOn = false;
var level = 0;
var userSaltos = 1;

function nextSequence(){
    level++;
    $("#level-title").text("Level " + level);
    randomNumber = Math.floor(Math.random( )* 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut();
    $("#" + randomChosenColour).fadeIn();
    playSound(randomChosenColour);
}
function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(elemento, currentColour){
    elemento.addClass("pressed");
    setTimeout(function (){elemento.removeClass("pressed");}, 100); 
    nextStep();
}

function endGame(){
    playSound("wrong");
    $("#level-title").text("GAME OVER on level: " + level + ", Press Any Key to Restart");
    gameOn=false;
    level = 0;
    userSaltos = 1;
    gamePattern = [];
    userClickedPattern = [];
    $("body").addClass("game-over");
}

function sonIguales(userSaltos){
    var retorno = true;
    for (let index = 0; index < userSaltos; index++) {
        if (gamePattern[index] !== userClickedPattern[index]){
            return false;
        }
    }
    return retorno;   
}

function nextStep(){
    if (sonIguales(userSaltos)) {
        //El juego continua hasta equivocarse
        //sino se equivoca en el patron completo se llama a nextSequence
        
        if (userSaltos == gamePattern.length) {
            $("#level-title").text("Good! be ready to next level");
            setTimeout(function (){
                userSaltos = 1;
                userClickedPattern = [];
                nextSequence();
            }, 1000);
        }
        userSaltos++;
        //sigue dando clicks
    } else {
        endGame();
    }
};

$(".btn").on("click", function(){
    if(gameOn){
        var userChosenColour =  $(this).attr("id");
        userClickedPattern.push(userChosenColour); 
        playSound(userChosenColour);
        animatePress($(this) , userChosenColour);
    }
});

$("body").keypress(function(){
    if(!gameOn){
        gameOn=true;
        $("body").removeClass("game-over");
        nextSequence();
    }
});

