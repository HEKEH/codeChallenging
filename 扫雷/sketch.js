function create2DArray(cols,rows){
    arr = new Array(cols)
    for (var i = 0; i < cols; i++) {
        arr[i] = new Array(rows)
    }
    return arr
}

var grid;
var w = 20
var cols
var rows

var totalBees = 300

function setup() {
    createCanvas(801, 801)
    cols = floor(width / w)
    rows = floor(height / w)
    grid = create2DArray(cols,rows)
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j] = new Cell(i,j,w)
        }
    }

    var options = []
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            options.push([i,j])
        }
    }

    for (var n = 0; n < totalBees; n++) {
        var index = floor(random(options.length))
        var choice = options[index]
        var i = choice[0]
        var j = choice[1]
        options.splice(index,1)
        grid[i][j].bee = true
    }

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].countBees()
        }
    }

}

function mousePressed(){
    let i = floor(mouseX/w)
    let j = floor(mouseY/w)
    var cell =  grid[i][j]
    if (mouseButton == 'left') {
        cell.reveal()
        if (cell.bee) {
            gameOver()
        }
    }
    else if (mouseButton == 'right') {
        cell.mark()
    }
}

function draw() {
    background(255)
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].show()
        }
    }
}

function gameOver() {
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].reveal()
        }
    }
}
