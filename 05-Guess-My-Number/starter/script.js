'use strict';

// console.log(document.querySelector(".message").textContent);
// document.querySelector(".message").textContent = "Correct Number..";
// document.querySelector(".number").textContent = 13;
// document.querySelector(".score").textContent = 10;
// document.querySelector(".guess").value = 30;

const secretNumber = Math.trunc(Math.random()*20)+1;
let score = 20;
let highScore = 0;

//function to display message in the game..
const displayMessage = function(message) {
    document.querySelector('.message').textContent = message; 
}


document.querySelector(".check").addEventListener
("click", function() {
    const guess = Number(document.querySelector(".guess").value);
    // console.log(guess);

    //when there is no input
    if (!guess) {
        // document.querySelector(".message").textContent = "Not a Number..";
        displayMessage('Not a number!!');
    }
    // When player wins 
    else if (guess === secretNumber) {
        document.querySelector(".message").textContent = "Correct Number..";
        document.querySelector(".number").textContent = secretNumber;
        document.querySelector("body").style.backgroundColor = "#60b347";
        document.querySelector(".number").style.width = "30rem";

        if(score > highScore){
            highScore = score;
            document.querySelector(".highscore").textContent = highScore;
        }
    }
    // when guess is wrong
    else if(guess !== secretNumber){
        if (score > 1) {
            document.querySelector(".message").textContent = 
            guess > secretNumber ? 'Too high!..' : 'Too low !!..';
            score--;
            document.querySelector(".score").textContent = score;
        }
        else {
            document.querySelector(".message").textContent = "you lost the game";
            document.querySelector(".score").textContent = 0;
        }
       
    }




    // When guess is too high..
    // else if (guess > secretNumber) {
    //     if (score > 1) {
    //         document.querySelector(".message").textContent = "Too High !!";
    //         score--;
    //         document.querySelector(".score").textContent = score;
    //     }
    //     else {
    //         document.querySelector(".message").textContent = "you lost the game";
    //         document.querySelector(".score").textContent = 0;
    //     }
       
//     }
// //     // When guess is too low...
//     else if (guess < secretNumber) {
//         if (score > 1) {
//             document.querySelector(".message").textContent = "Too Low !!";
//             score--;
//             document.querySelector(".score").textContent = score;
//         }
//         else {
//             document.querySelector(".message").textContent = "you lost the game";
//             document.querySelector(".score").textContent = 0;
//         }
        
//     }
});

//Again section
document.querySelector(".again").addEventListener
("click", function(){
   document.querySelector(".message").textContent = "Start guessing";
    document.querySelector(".number").textContent = "?";
    document.querySelector(".score").textContent  = 20;
    document.querySelector(".guess").value = "";
    document.querySelector("body").style.backgroundColor = "#222";
    document.querySelector(".number").style.width = "15rem";
    // document.querySelector('.highscore').textContent = 0;
})