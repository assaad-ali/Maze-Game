/********************* Update Html /**********************/
function updateHtml(){
    let scoreDiv = document.getElementsByClassName("example")[0]
    scoreDiv.id = "score"
    scoreDiv.style.textAlign = "center"
    let restartButton = document.createElement("button")
    restartButton.classList = "boundary"
    restartButton.id = "restart"
    restartButton.style = "margin: auto; text-align: center; width:100px; height:25px; display:flex; font-size: 15px; background-color: red;"
    restartButton.innerText = "Restart"
    document.body.appendChild(restartButton)

}

/********************* Global Variables /**********************/

var elements = document.getElementsByClassName("boundary")

// start -> end -----> win 
// start -> boundaries -----> lose

var playing = false

var gamescore = 0

var milliSec = 0,
    seconds = 0,
    minutes = 0;

var liveTimer = document.getElementById("live_timer");
var currentTimer = 0,
    lastTimer = 0,
    bestTimer = 0

/********************* Functions /**********************/

function drawRedBoundaries(){
    
    for(let i =0; i<elements.length; i++){

        elements[i].classList.add("youlose")
    }
}

function onBoundary(){
    
    if(playing){
        lose()
    }
}

function lose(){

    playing = false

    updateScore(-10)
    updateMessage("You Lost!", "lostMessage")
    
    drawRedBoundaries()
    document.getElementById
    endTimer()
}

function removeRedBoundaries(){

    for(let i=0; i<elements.length; i++){

        elements[i].classList.remove("youlose")
    }
}

function theStart(){

    playing = true
    liveTimer.innerText = "start"
    removeRedBoundaries()
    startTimer()

}

function updateScore(score){

    gamescore += score
    document.getElementById("score").innerText = gamescore
}

function updateMessage(message, _class){

    document.getElementById('status').innerText = message

    document.getElementById('status').className = _class
}

function theEnd(){
    
    if(playing){

        playing = false

        updateScore(5)
        updateMessage("You Won!", "wonMessage")
        endTimer()
        checkBestTimer()
        
    } 

    
}

function restart(){

    playing = false
    
    updateScore(-gamescore)
    removeRedBoundaries()
    endTimer()
    updateMessage("Begin by moving your mouse over the \"S\"", "")
}

function startTimer(){

    liveTimer = setInterval(printTimer,100);

}


function endTimer(){

    clearInterval(printTimer)
    milliSec = 0
    seconds = 0
    minutes = 0
    liveTimer.innerText = '00 : 00'
}

function printTimer(){

    milliSec += 1

    if(milliSec == 10){

        milliSec = 0
        seconds++
    }
    if(seconds == 60){

        seconds = 0
        minutes++
    }
    let messageMinutes =""
    let messageSec = ""
    let messageMilliSec = ""

    if(minutes < 10) messageMinutes = "0" + minutes
    if(seconds < 10) messageSec = "0" + seconds
    if(milliSec < 10) messageMilliSec = "0" + milliSec

    timerMessage = `Live:\n${messageMinutes}:${messageSec}.${messageMilliSec}`
    liveTimer.innerText = timerMessage
}

function checkBestTimer(){
    

}


/********************* Events Listeners /**********************/

function addStartEventlistener(){

    document.getElementById("start").addEventListener("click", theStart)
}

function addInBoundaryEventListener(){

    for(let i = 0; i < elements.length; i++){

        elements[i].addEventListener("mouseenter", onBoundary) 
    }
}

function addOutBoundaryEventListener(){

    document.getElementById("game").addEventListener("mouseleave", onBoundary)
}

function addEndEventListener(){

    document.getElementById("end").addEventListener("mouseenter", theEnd)
}

function addRestartEventListener(){

    document.getElementById("restart").addEventListener("click", restart)
}

function initMaze() {

    updateHtml()
    addStartEventlistener()
    addInBoundaryEventListener()
    addOutBoundaryEventListener()
    addEndEventListener()
    addRestartEventListener()
}

window.onload = function(){

    initMaze()
}

