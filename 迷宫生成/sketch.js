let w = 40
function setup() {
    createCanvas(800, 800)
    cols = floor(width / w)
    rows = floor(height / w)
    grid = []
    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            let cell = new Cell(i, j)
            grid.push(cell)
        }
    }
    current = grid[0]
    current.visited = true
    stack = [current]
    //frameRate(5)
}

function draw() {
    background(50)
    for (var i = 0; i < grid.length; i++) {
        grid[i].show()
    }
    fill(0,255,0)
    noStroke()
    rect(current.i * w, current.j * w, w, w)

    let next = checkNeighbors(current.i, current.j)
    if (next) {
        breakWall(current, next)
        current = next
        current.visited = true
        stack.push(current)
    } else if (stack.length > 0) {
        current = stack.pop()
    }
}

function Cell(i, j) {
    this.i = i
    this.j = j
    this.walls = [true, true, true, true] // 'top','right','bottom','left'
    this.visited = false
}

Cell.prototype.show = function() {
    let x = this.i * w
    let y = this.j * w
    if (this.visited) {
        noStroke()
        fill(255, 0, 255)
        rect(x, y, w, w)
    }
    stroke(255)
    if (this.walls[0]) {//top
        line(x, y, x + w, y)
    }
    if (this.walls[1]) {//right
        line(x + w, y, x + w, y + w)
    }
    if (this.walls[2]) {//bottom
        line(x + w, y + w, x, y + w)
    }
    if (this.walls[3]) {//left
        line(x, y + w, x, y)
    }
}
let checkNeighbors = function(i, j) {
    let neighbors = []
    let neighborsIndex = [index(i - 1, j), index(i, j + 1), index(i + 1, j), index(i, j - 1 )]
    for (k of neighborsIndex) {
        if (grid[k] && !grid[k].visited) {
            neighbors.push(grid[k])
        }
    }
    if (neighbors.length > 0) {
        let r = floor(Math.random() * neighbors.length)
        return neighbors[r]
    } else {
        return undefined
    }
}

function index(i, j) {
    if (i < 0 || j < 0 || i > rows - 1 || j > cols - 1) {
        return -1
    }
    return j * cols + i
}

function breakWall(a, b) {
    if (b.i - a.i == 1) {
        a.walls[1] = false
        b.walls[3] = false
    } else if(b.i - a.i == -1) {
        a.walls[3] = false
        b.walls[1] = false
    }

    if (b.j - a.j == 1) {
        a.walls[2] = false
        b.walls[0] = false
    } else if(b.j - a.j == -1) {
        a.walls[0] = false
        b.walls[2] = false
    }
}
