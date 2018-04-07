function updateStack() {
    for (var k = 0; k < block.shape.dm.length; k++) {
        let i = block.shape.dm[k] + block.m
        let j = block.shape.dn[k] + block.n
        if (i >= 0 && i <= gridNumX - 1 && j >= 0 && j <= gridNumY - 1){
            stackMatrix[i][j] = {
                'color' : block.color,
            }
        }
    }
    updateLines()
}

function updateLines() {
    for (var l = 0; l < gridNumY; l++) {
        let deleteAllowed = true
        for (var k = 0; k < gridNumX; k++) {
            if (stackMatrix[k][l] == 0) {
                deleteAllowed = false
                break
            }
        }
        if (deleteAllowed) {
            score += 100
            deleteLine(l)
        }
    }
}

function deleteLine(l) {
    for (var k = 0; k < gridNumX; k++) {
        stackMatrix[k].splice(l,1)
        stackMatrix[k] = [0].concat(stackMatrix[k])
    }
}

function drawStack() {
    for (var i = 0; i < gridNumX; i++) {
        for (var j = 0; j < gridNumY; j++) {
            let grid = stackMatrix[i][j]
            if (grid !== 0){
                fill(grid.color)
                stroke(0)
                strokeWeight(2)
                rect(i*w, j*w, w, w)
            }
        }
    }
}
