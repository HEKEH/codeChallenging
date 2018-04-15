let w = 20
let grid
function heuristic(a, b) {
    return Math.sqrt(Math.pow(a.i - b.i, 2) + Math.pow(a.j - b.j, 2))
}

function removeFromArray(arr, element) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === element) {
            arr.splice(i, 1)
        }
    }
}
function setup() {
    //frameRate(10)
    createCanvas(801,801)
    cols = floor(width / w)
    rows = floor(height / w)
    grid = new Array(cols)
    for (var i = 0; i < cols; i++) {
        grid[i] = new Array(rows)
        for (var j = 0; j < rows; j++) {
            grid[i][j] = new Spot(i, j)
        }
    }
    start = grid[0][0]
    //start = grid[5][5]
    end = grid[cols - 1][rows - 1]
    start.wall = false
    end.wall = false
    openSet = [start]
    current = start
    current.g = 0
    current.h = heuristic(current, end)
    closeSet = []
}

function draw() {
    background(255)

    let winner = openSet.length - 1
    for (var i = openSet.length - 2; i >= 0; i--) {
        if(openSet[i].f < openSet[winner].f) {
            winner = i
        }
    }

    current = openSet[winner]
    current.searchNeighbors(grid)
    removeFromArray(openSet,current)
    closeSet.push(current)
    for (var i = 0; i < current.neighbors.length; i++) {
        let neighbor = current.neighbors[i]
        if (!closeSet.includes(neighbor) && !neighbor.wall) {
            if (!openSet.includes(neighbor)) {
                neighbor.h = heuristic(neighbor, end)
                neighbor.g = current.g + heuristic(neighbor, current)
                neighbor.f = neighbor.g + neighbor.h
                neighbor.previous = current
                openSet.push(neighbor)
            } else if (neighbor.g > current.g + heuristic(neighbor, current)) {
                neighbor.g = current.g + heuristic(neighbor, current)
                neighbor.f = neighbor.g + neighbor.h
                neighbor.previous = current
            }
        }
    }

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            if (grid[i][j].wall) {
                grid[i][j].show(0)
            }
            //else {
            //     grid[i][j].show(255)
            // }
        }
    }
    // for (var i = 0; i < openSet.length; i++) {
    //         openSet[i].show('rgb(0, 255, 0)')
    // }
    // for (var i = 0; i < closeSet.length; i++) {
    //         closeSet[i].show('rgb(255, 0, 0)')
    // }
    let temp = current
    //temp.show('rgb(0, 0, 255)')
    path = [temp]
    while(temp.previous) {
        temp = temp.previous
        //temp.show('rgb(0, 0, 255)')
        path.push(temp)
    }

    noFill()
    stroke(255, 0, 255);
    strokeWeight(w / 4);
    //beginShape();
    let lineStart = path[0]
    for (var i = 1; i < path.length; i++) {
        //vertex(path[i].i * w + w / 2, path[i].j * w + w / 2)
        line(lineStart.i * w + w / 2, lineStart.j * w + w / 2, path[i].i * w + w / 2, path[i].j * w + w / 2)
        lineStart = path[i]
    }
    //endShape()

    if (current === end) {
        noLoop()
        console.log('Done!')
    } else if (openSet.length == 0) {
        noLoop()
        console.log('No Way')
    }
}

function Spot(i, j) {
    this.i = i
    this.j = j
    this.f = 0
    this.g = 0
    this.h = 0

    if (random() < 0.25) {
        this.wall = true
    } else {
        this.wall = false
    }
    this.searchNeighbors = function(grid) {
        this.neighbors = []
        for (var l of [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1],]) {
            let i = this.i + l[0]
            let j = this.j + l[1]
            if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
                continue
            }
            this.neighbors.push(grid[i][j])
        }
    }
    this.show = function(color) {
        // stroke(0)
        // strokeWeight(1)
        noStroke()
        fill(color)
        rect(this.i * w, this.j * w, 9.9 * w / 10, 9.9 * w / 10)
    }
}
