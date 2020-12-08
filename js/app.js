'use strict';

//function that lets you easily get an id from html
let $ = (x) => {
    return document.getElementById(x);
};

//initialize global variables
let arr = [];
const noOfPoints = 5;
let minRoll;
let maxRoll;

//random number generator, with min and max as parameters
const rollIt = (min, max) => {
    return Math.floor(Math.random() * max) + min;
};

//sets innerhtml to a random number between 1 and 10
const roll = () => {
    return $("roll").innerHTML = rollIt(minRoll, maxRoll);
};

//adds random generated number to array
let addToArr = () => {
    arr.push($("roll").innerHTML);
};

//game mode, player chooses interval of numbers. Has to be parsed for correct interval values to be placed in array, since it prompts a string
let gameMode = () => {
    let minNum = prompt("Please choose a low number");
    let maxNum = prompt("Please choose a high number");
    minRoll = parseInt(minNum);
    maxRoll = parseInt(maxNum);
    
    //if player didnt choose a number
    if(minNum.length === 0 || maxNum.length === 0){
        //chose random number
        minRoll = rollIt(0, 10);
        maxRoll = rollIt(11, 100);
    }
    $("interval").innerHTML = minRoll + " - " + maxRoll;
}

//checks if winner to conditions and gives alert and starts a new game.
let winner = () => {
    if ($("player1Points").innerHTML == noOfPoints) {
        alert("Player 1 WINS!");
        newGame();
    } else if ($("cpuPoints").innerHTML == noOfPoints) {
        alert("CPU WINS!");
        newGame();
    }
};

//resets game
let newGame = () => {
    $("player1Points").innerHTML = 0;
    $("cpuPoints").innerHTML = 0;
    $("roll").innerHTML = "Roll Me!";
    arr = [];
};

//player turn, checks if button is clicked, checks if next value in array is higher or lower and reacts accordingly
let player1Turn = () => {
    if ($("player1High").checked) {
        if (arr[arr.length - 1] > arr[arr.length - 2]) {
            console.log("correct");
            $("player1Points").innerHTML++;
        } else {
            console.log("false");
        }
    }
    if ($("player1Low").checked) {
        if (arr[arr.length - 1] < arr[arr.length - 2]) {
            console.log("correct");
            $("player1Points").innerHTML++;
        } else {
            console.log("false");
        }
    }
    $("player1Low").checked = false;
    $("player1High").checked = false;
};

//computer turns, makes a decision whether to check higher or lower, but if middle number, makes a random 50/50 decision 
let computerTurn = () => {
    if (arr[arr.length - 2] < (maxRoll / 2)) {
        console.log("imma chosing higher");
        $("cpuHigh").checked = true;
        if ($("cpuHigh").checked) {
            $("cpuPoints").innerHTML++;
        }
    } else if (arr[arr.length - 2] > (maxRoll / 2)) {
        console.log("imma chosing Lower");
        $("cpuLow").checked = true;
        if ($("cpuLow").checked) {
            $("cpuPoints").innerHTML++;
        }
    } else if (arr[arr.length - 2] == (maxRoll / 2)) {
        let newRanNum = Math.floor(Math.random() * maxRoll) + minRoll;
        if(newRanNum % 2 == 0){
            $("cpuHigh").checked = true;
        }else{
            $("cpuLow").checked = true;
        }
        console.log("imma choose random")
    }
};

//addeventlistener on button that goes through the contents of the game, in order as game is played.
$("rollBtn").addEventListener('click', () => {
    roll();
    addToArr();
    player1Turn();
    computerTurn();
    winner();
});

gameMode();