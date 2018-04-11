let w = 20
let movePeriod = 4
let RemainingTime
let block
let stackMatrix
let gridNumX //x方向各自数量
let gridNumY //x方向各自数量
let score = 0

function setup() {
    played = true
    RemainingTime = 0
    createCanvas(401,801)
    gridNumX = floor(width/w)
    gridNumY = floor(height/w)
    block = new Block()
    stackMatrix = new Array(gridNumX)
    for (var i = 0; i < gridNumX; i++) {
        stackMatrix[i] = new Array(gridNumY).fill(0)
    }
}

function addBlock() {
    let block = new Block()
}

function draw() {
    if (!gameOver()){
        if (RemainingTime == 0){
            RemainingTime = movePeriod
            background(255)
            stroke(2)
            noFill()
            rect(0, 0, width ,height)
            updateBlock()
            block.show()
            drawStack()
            select('#score').innerHTML = 'score: ' + score
        }
        RemainingTime--
    } else {
        fill('rgb(244, 13, 13)')
        noStroke()
        textSize(40)
        textAlign(CENTER,CENTER)
        text('Game Over !', width/2,height/2)
        noLoop()
    }
}

function updateBlock() {
    block.deathJudge()
    if (block.alive){
        block.update()
    } else {
        updateStack()
        block = new Block()
    }
}

function keyPressed() {
    if (key == 'A') {
        block.leftMove = true
    }
    else if (key == 'D') {
        block.rightMove = true
    }

    else if (key == 'S') {
        block.compelMoveDown = true
    }

    else if (key == ' ') {
        block.rotate()
        block.deathJudge()
    }
}

function keyReleased() {
    if (key == 'A') {
        block.leftMove = false
    }
    else if (key == 'D') {
        block.rightMove = false
    }

    else if (key == 'S') {
        block.compelMoveDown = false
    }
}

function gameOver() {
    for (var i = 0; i < gridNumX; i++) {
        if (stackMatrix[i][0] !== 0) {
            return true
        }
    }
    return false
}
