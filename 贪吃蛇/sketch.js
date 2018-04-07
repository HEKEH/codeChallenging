let w = 20
let movePeriod = 10
let RemainingTime

//let foodPeriod = 20
//let foodEmerge
let foodGroup = []

let snake
let food

let blankCells

let cellNumX //x方向格子数量
let cellNumY //y方向格子数量

let score = 0
let lives = 3




function setup() {
    played = false
    RemainingTime = 0
    createCanvas(801,801)
    cellNumX = floor(width/w)
    cellNumY = floor(height/w)
    snake = new Snake()

    //foodEmerge = 0
    food = new Food()
    foodGroup.push(food)
}

function keyPressed() {
    switch (key) {
        case ' ':
        played = true
        break

        case 'S':
        snake.turnDir('down')
        break

        case 'W':
        snake.turnDir('up')
        break

        case 'D':
        snake.turnDir('right')
        break

        case 'A':
        snake.turnDir('left')
        break
    }
}

function draw() {
    if (played) {
        if (!gameOver()){
            if (RemainingTime == 0){
                // if (foodEmerge == 0) {
                //     food = new Food()
                //     foodGroup.push(food)
                //     foodEmerge = foodPeriod
                // }
                // foodEmerge--
                RemainingTime = movePeriod
                background(255)
                stroke(2)
                noFill()
                rect(0, 0, cellNumX * w, cellNumY * w)
                for (var i = foodGroup.length-1 ; i >= 0 ; i--) {
                    var notEat = true
                    let f = foodGroup[i]
                    if (notEat && f.eaten()) {
                        snake.grow()
                        foodGroup.splice(i,1)
                        notEat = false
                        score += 1
                        food = new Food()
                        foodGroup.push(food)
                    } else {
                        f.show()
                    }
                }
                if (notEat) {
                    snake.update()
                }
                snake.show()
                select('#score').html(`score: ${score}`)
                select('#lives').html(`lives: ${lives}`)
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
    else {
        background(255)
        fill('rgb(244, 13, 13)')
        noStroke()
        textSize(40)
        textAlign(CENTER,CENTER)
        text('Press Space To Start Game!', width/2,height/2)

        stroke(2)
        noFill()
        rect(0, 0, cellNumX * w, cellNumY * w)
        select('#score').html(`score: ${score}`)
        select('#lives').html(`lives: ${lives}`)
    }
}


function gameOver() {
    if (lives < 1) {
        return true
    }
    return false
}
