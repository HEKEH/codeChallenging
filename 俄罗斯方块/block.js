let Block = function() {
    this.speed = random ([1.5, 2, 3])
    this.type = floor(random(typeOfBlock.length))
    this.property = typeOfBlock[this.type]
    this.shape = this.property['shape']
    this.color = this.property['color']

    this.m = floor(random(floor(width / w - max(this.shape.dm) + min(this.shape.dm))))- min(this.shape.dm)
    //对应x方向
    this.n = 0//对应y方向
    // this.x = w * this.m
    // this.y = 0

    this.leftMove = false
    this.rightMove = false
    this.compelMoveDown = false

    this.alive = true

    this.downAwait = 0
}
Block.prototype.update = function() {
    if (this.downAwait < 0){
        this.n += 1
        this.downAwait = 6/this.speed
    }
    this.downAwait --

    if (this.leftMove){
        this.moveLeft()
    }
    if (this.rightMove){
        this.moveRight()
    }
    if (this.compelMoveDown){
        this.moveDown()
    }
}

Block.prototype.deathJudge = function() {
    for (var k = 0; k < block.shape.dm.length; k++) {
        let i = this.shape.dm[k] + block.m
        let j = this.shape.dn[k] + block.n
        if (j >= gridNumY - 1) {
            this.alive = false
            return
        }
        else if (i >= 0 && i <= gridNumX - 1 && j >= 0) {
            if (stackMatrix[i][j+1] !== 0) {
                this.alive = false
                return
            }
        }
    }
}

Block.prototype.moveLeftAllowed = function() {
    for (var k = 0; k < this.shape.dm.length; k++) {
        let i = this.shape.dm[k] + block.m
        let j = this.shape.dn[k] + block.n
        if (i <= 0 || stackMatrix[i-1][j] !== 0) {
            return false
        }
    }
    return true
}

Block.prototype.moveRightAllowed = function() {
    for (var k = 0; k < this.shape.dm.length; k++) {
        let i = this.shape.dm[k] + this.m
        let j = this.shape.dn[k] + this.n
        if (i >= gridNumX - 1 || stackMatrix[i+1][j] !== 0) {
            return false
        }
    }
    return true
}


Block.prototype.moveLeft = function() {
    if (this.moveLeftAllowed()) {
        this.m -= 1
    }
}

Block.prototype.moveRight = function() {
    if (this.moveRightAllowed()) {
        this.m += 1
    }
}

Block.prototype.moveDown = function() {
    this.deathJudge()
    if (this.alive) {
        this.n += 1
    }
}


Block.prototype.rotate = function() {
    //let rotateAllowed = true
    let len = this.shape.dn.length
    let dm = new Array(len)
    let dn = new Array(len)

    let j_Rivise = - min(this.shape.dm) - max(this.shape.dn)
    let i = this.m
    let j = this.n + j_Rivise

    for (var k = 0; k < this.shape.dm.length; k++) {
        dm[k] = - this.shape.dn[k]
        dn[k] = this.shape.dm[k]
    }
    rotateAllowed = this.rotateJudge(i, j, dm, dn) || this.rotateJudge(i-1, j, dm, dn) || this.rotateJudge(i+1, j, dm, dn) || this.rotateJudge(i+2, j, dm, dn) || this.rotateJudge(i-2, j, dm, dn)
    if (rotateAllowed) {
        this.n = j
        this.shape.dm = dm
        this.shape.dn = dn
    }
}

Block.prototype.rotateJudge = function(i, j, dm, dn) {
    for (var k = 0; k < dm.length; k++) {
        if (i + dm[k] < 0 || i + dm[k] > gridNumX-1 || j + dn[k] >= gridNumY-1 || stackMatrix[i + dm[k]][j + dn[k]] !== 0) {
            return false
        }
    }
    this.m = i
    return true
}


Block.prototype.show = function() {
    fill(this.color)
    stroke(0)
    strokeWeight(2)
    for (var i = 0; i < this.shape.dm.length; i++) {
        let m = this.m + this.shape.dm[i]
        let n = this.n + this.shape.dn[i]
        if (m>=0 && m <=gridNumX - 1 && n>=0 && n <= gridNumY - 1) {
            rect(m * w, n * w, w, w)
        }
    }
}
