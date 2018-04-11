let grid
let newNumMark
let past
let fs = [48, 48, 40, 32]//fontsize
let score = 0
let w = 100

function setup() {
    createCanvas(410,410)
    noLoop()//使draw() 不循环
    grid = blankGrid()
    newNumMark = blankGrid()
    addNumber()
    addNumber()
    past = [].concat(grid)
    updateCanvas()
}

function updateCanvas() {
    background(255)
    drawGrid()
    select('#score').innerHTML = 'score: ' + score
}

function keyPressed() {
    let played = true

    let reversed = false
    let transformed = false

    past = [].concat(grid)//copy grid

    switch (key) {
        case 'S':
        break

        case 'W':
        grid = reverseGrid(grid)
        reversed = true
        break

        case 'D':
        grid = transformGrid(grid)
        transformed = true
        break

        case 'A':
        grid = transformGrid (grid)
        grid = reverseGrid (grid)
        reversed = true
        transformed = true
        break

        default:
        played = false
    }

    if (played) {
        for (var i = 0; i < 4; i++) {
            grid[i] = operate(grid[i])
        }

        if (reversed) {
            grid = reverseGrid(grid)
        }

        if (transformed) {
            grid = transformGrid(grid)
        }

        let changed = compare(past,grid)
        if (changed) {
            addNumber()
        }
        updateCanvas()
        if(isVictory()) {
            console.log('You Win!')
        }
        else if(isGameOver()) {
            console.log('Game Over!')
        }
    }
}

// function keyPressed() {
//     //console.log(key)
//     if (['W', 'A', 'S' ,'D'].contains(key)) {
//         let reversed = false
//         let transformed = false
//
//         past = [].concat(grid)//copy grid
//
//         if (key == 'S') {
//             //do nothing
//         }
//         else if (key == 'W') {
//             grid = reverseGrid(grid)
//             reversed = true
//         }
//         else if (key == 'D') {
//             grid = transformGrid(grid)
//             transformed = true
//         }
//
//         else if (key == 'A') {
//             grid = transformGrid (grid)
//             grid = reverseGrid (grid)
//             reversed = true
//             transformed = true
//         }
//
//         for (var i = 0; i < 4; i++) {
//             grid[i] = operate(grid[i])
//         }
//
//         if (reversed) {
//             grid = reverseGrid(grid)
//         }
//
//         if (transformed) {
//             grid = transformGrid(grid)
//         }
//         //let changed = past.toString()!==grid.toString()//compare past and grid
//         let changed = compare(past,grid)
//         if (changed) {
//             addNumber()
//         }
//         updateCanvas()
//         if(isVictory()) {
//             console.log('You Win!')
//         }
//         else if(isGameOver()) {
//             console.log('Game Over!')
//         }
//     }
// }
