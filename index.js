var buttonColours = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userPattern = [];
var level = 0;

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    
    level++;
    $("#level-title").text("Level " + level);

    userPattern = [];
    console.log(gamePattern);
}

//using jQuery to get id
$(".btn").on("click", function (event) {
    userPattern.push(this.id);
    console.log(userPattern); 

    playSound(this.id);
    animationClicked(this.id);

    checkAnswer(userPattern.length - 1);
});

//using javascript to get id
// var selectBtn = document.querySelectorAll(".btn");
// for (i = 0; i < selectBtn.length; i++) {
//     selectBtn[i].addEventListener("click", function(event) {
//         userPattern.push(this.id);
//         console.log(userPattern);
//     });    
// }

function playSound(colour) {
    var sound = new Audio("sounds/" + colour + ".mp3");
        sound.play();
} 

function animationClicked(colour) {
    var getBtn = document.querySelector("." + colour);
    getBtn.classList.add("pressed");

    setTimeout(function() {
        getBtn.classList.remove("pressed");
    }, 200);

} 

$("#level-title").on("click", function() {
    nextSequence();
}); 



function checkAnswer (currentLvl) {
    if (gamePattern[currentLvl]=== userPattern[currentLvl]) {
        $("#level-title").text("Yes!");
        if (gamePattern.length === userPattern.length) {
            setTimeout(function() {
                $("#level-title").text("Get ready!");    
            }, 800);
            
            setTimeout(function() {
                nextSequence();
            }, 2000);
        }
    } else {
        playSound("wrong");

        $("#level-title").text("Game over... Click here to restart.")
        
        $("body").addClass("game-over");
        setTimeout(function() {$("body").removeClass("game-over");}, 300);

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
}

// $(".rule-title").on("click", function(){
//     $(".p2").toggle();
// })
