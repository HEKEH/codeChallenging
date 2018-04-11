function Cell(i,j,w) {
    this.i = i
    this.j = j
    this.x = i * w
    this.y = j * w
    this.w = w
    this.bee = false
    this.revealed = false
    this.marked = false
    this.neighborCount = 0
}

Cell.prototype.show = function() {
    stroke(0)
    noFill()
    rect(this.x,this.y,this.w,this.w)
    if(this.revealed) {
        if(this.bee) {
            fill(200)
            ellipse(this.x + this.w / 2, this.y + this.w / 2, this.w * 0.5)
        }else {
            fill(200)
            rect(this.x,this.y,this.w,this.w)
            if (this.neighborCount > 0) {
                fill(0)
                textSize(w / 1.5)
                textAlign(CENTER, CENTER)
                noStroke()
                text(this.neighborCount, this.x + this.w / 2 , this.y + this.w / 2)
            }
        }
    }
    else if (this.marked) {
        fill(255,0,0)
        textSize(w / 2)
        textAlign(CENTER, CENTER)
        noStroke()
        text('F',this.x + this.w / 2 , this.y + this.w / 2)
    }
}

Cell.prototype.countBees = function() {
    if (this.bee) {
        this.neighborCount = -1
        return
    }
    total = 0
    for (var xOff = -1; xOff <= 1; xOff++) {
        for (var yOff = -1; yOff <= 1; yOff++) {
            var i = this.i + xOff
            var j = this.j + yOff
            if (i >= 0 && i < cols && j >= 0 && j < rows) {
                var neighbor = grid[i][j]
                if (neighbor.bee) {
                    total ++
                }
            }
        }
    }
    this.neighborCount = total
}

Cell.prototype.contains = function(x,y) {
    return x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w
}

Cell.prototype.reveal = function() {
    this.revealed = true
    if (this.neighborCount == 0) {
        this.floodFill()
    }
}

Cell.prototype.mark = function() {
    this.marked = !this.marked
}

Cell.prototype.floodFill = function() {
    for (var xOff = -1; xOff <= 1; xOff++) {
        for (var yOff = -1; yOff <= 1; yOff++) {
            var i = this.i + xOff
            var j = this.j + yOff
            if (i >= 0 && i < cols && j >= 0 && j < rows) {
                var neighbor = grid[i][j]
                if(!neighbor.revealed) {
                    neighbor.reveal()
                }
            }
        }
    }
}
