function blankGrid() {
    return [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ]
}

function reverseGrid(grid) {
    for (var i = 0; i < 4; i++) {
        grid[i].reverse()
    }
    return grid
}

function transformGrid(grid) {
    let newGrid = blankGrid()
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            newGrid[i][j] = grid[j][i]
        }
    }
    return newGrid
}


function drawGrid() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            let val = grid[i][j]
            let s = val.toString()
            if (newNumMark[i][j] === 1){
                strokeWeight(8)
                stroke(200, 0, 200)
                newNumMark[i][j] = 0
            }else{
                strokeWeight(4)
                stroke(0)
            }
            if (val !== 0) {
                fill(colorsSizes[s].color)
                rect(i * w + 4, j * w + 4, w, w, w/3)

                fill(0)
                textAlign(CENTER, CENTER)
                noStroke()
                textSize(colorsSizes[s].size)
                text(val, i * w + w / 2 + 4, j * w + w / 2 + 4)
            } else {
                noFill()
                rect(i * w + 4, j * w + 4, w, w, w/3 + 4)
            }
        }
    }
}
