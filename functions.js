// game contents
var winPossibilities = [
[1,2,3],
[4,5,6],
[7,8,9],
[1,4,7],
[2,5,8],
[3,6,9],
[1,5,9],
[3,5,7]
    ];

var grid = [[0,0,0],
            [0,0,0],
            [0,0,0]];


window.onload = function (){
    var button = document.getElementsByTagName("button");
    button.textContent = "Start!"
    button.addEventListener("click", startGame)
}

// add event listeners to all grid boxes
function startGame(){
    var wholeGrid = document.querySelector("main");
    var boxes = document.querySelectorAll(".box");

    for (var i=0; i< boxes.length; i++){
         console.log(boxes[i]);
         boxes[i].addEventListener("click", game);
    }
}

// global variables

var num;
var remainder;
var player;
var playerX = [];
var playerO =[];
var ifWinning = false;
var noOfTurns = 0;


// actual game

function game(){
    if (noOfTurns< 9 && !ifWinning){
        num = event.target.id;
        answer = Math.floor(num / 3);
        remainder = num % 3;
        console.log("ans:" + answer + " num:"+num + " R:"+remainder);

        var gridNotTaken = checkGridTaken();
        if (gridNotTaken){
            if (noOfTurns % 2 !== 0) { //comes later
                player = "X";
                this.innerHTML = "X";
                document.getElementsByTagName("p")[0].textContent = "It's Player O's turn.";
                appendGridList();
                console.log(grid);
                playerX.push(parseInt(this.id));

                if (playerO.length > 2){
                    // ifWinning = checkWin(player);
                    ifWinning = checkWin(playerX);
                    if (ifWinning){
                        console.log("yay");
                        document.getElementsByTagName("p")[0].textContent = "Player X wins!";
                    } else{
                        console.log("nooo");
                    }
                }

            }
             else { //comes first
                player = "O";
                this.innerHTML = "O";
                document.getElementsByTagName("p")[0].textContent = "It's Player X's turn.";
                appendGridList(player);
                console.log(grid);
                playerO.push(parseInt(this.id));
                console.log(playerO);

                if (playerO.length > 2){
                    // ifWinning = checkWin(player);
                    ifWinning = checkWin(playerO);
                    if (ifWinning){
                        console.log("yay");
                        document.getElementsByTagName("p")[0].textContent = "Player O wins!";
                    } else{
                        console.log("nooo");
                    }
                }
            }
            noOfTurns++;
        }

        if (noOfTurns === 9 && !ifWinning){
            document.getElementsByTagName("p")[0].textContent = "No turns left. It's a draw! Try again.";
        }

    } else {
        document.getElementsByTagName("p")[0].textContent = "The game has ended. Try again.";
    }
}


// change grid list according to play

function appendGridList(){
    if (remainder > 0) {
        grid[answer][remainder-1] = player;
    } else {
        console.log(num);
        grid[answer -1][2] = player;

    }
}


// check if grid is taken, so there is no double play

function checkGridTaken(){
    if (remainder > 0) {
        if (Boolean(grid[answer][remainder-1]) === false){
            return true;
        } else {
            document.getElementsByTagName("p")[0].textContent = "Cell already filled. Try another one.";
            return false;
        }
    } else {
        if (Boolean(grid[answer -1][2]) === false){
            return true;
        } else {
            document.getElementsByTagName("p")[0].textContent = "Cell already filled. Try another one.";
            return false;
        }
    }
}


// check winning condition
// Array.every(function) --> the function is a threshold/filter. eg. value > 30, returns 36, 44 etc
// each val in winArray checked against playerArr. if val exists in playerArr, indexOf() returns the index of said val i.e > 0
// thus if it returns -1, it means the value does not exist in playerArr.

function checkWin(playerArray){
    debugger;
    var winning = false;
    for (var winArray of winPossibilities){
        var res = winArray.every(val => playerArray.indexOf(val)  !== -1);
        if (res){
            winning = true;
            break;
        }
    }
    return winning;
}

// alternative method to check winning condition

// function checkWin(player){
//     // check diagonal;
//     debugger;
//     if ((player === grid[0][0]) && (grid[0][0] === grid[1][1]) && (grid[1][1]  === grid[2][2])){
//         return true;
//     }

//     if ((player === grid[0][2]) && (grid[0][2] === grid[1][1]) && (grid[1][1] === grid[2][0])) {
//         // check anti-diagonal
//         return true;
//     }

//     // check rows
//     for (var i= 0; i<3; i++){
//         if ((player === grid[i][0]) && (grid[i][0] === grid[i][1]) && (grid[i][1] === grid[i][2])) {
//             return true;
//         }
//     }

//     // check columns
//     for (var j= 0; j<3; j++){
//         if ((player === grid[0][j]) && (grid[0][j] === grid[1][j]) && (grid[1][j] === grid[2][j])) {
//             return true;
//         }
//     }
//     return false;
// }

function reset(){

}
