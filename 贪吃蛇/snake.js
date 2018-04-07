let Snake = function() {
    this.head = {
        'x' : (floor(random(cellNumX - 14)) + 7),
        'y' : (floor(random(cellNumY - 14)) + 7),
    }
    this.direction = 'static'
    this.EnableAllDir()

    this.bodyInit()

    this.color = random(['rgb(149, 127, 116)','rgb(235, 255, 3)','rgb(9, 249, 40)','rgb(30, 11, 247)','rgb(161, 12, 241)',])
}

Snake.prototype.EnableAllDir = function() {
    this.dirEnabled = {
        'left' : true,
        'right' : true,
        'down' : true,
        'up' : true,
    }
}

Snake.prototype.turnDir = function(dir) {
    if (this.dirEnabled[dir]) {
        this.direction = dir
        this.EnableAllDir()
        this.dirEnabled[reverseDir(dir)] = false
    }
}

Snake.prototype.bodyInit = function() {
    this.body = new Array(5)
    this.body[0] = {}
    this.body[0].x = this.head.x
    this.body[0].y = this.head.y
    let option = floor(random(4))
    let dir = ['left', 'right', 'up', 'down'][option]
    this.dirEnabled[reverseDir(dir)] = false
    let stretch = [[1, 0] , [-1, 0], [0, 1], [0, -1]][option]
    for (var i = 1; i < this.body.length; i++) {
        this.body[i] = {}
        this.body[i].x = this.body[i-1].x + stretch[0]
        this.body[i].y = this.body[i-1].y + stretch[1]
    }
}

Snake.prototype.show = function() {
    fill(this.color)
    stroke(0)
    strokeWeight(2)
    for (var i = 0; i < this.body.length; i++) {
        rect(this.body[i].x * w, this.body[i].y * w, w, w)
    }
    fill(0)
    ellipse(this.head.x * w + w / 2, this.head.y * w + w / 2, w/2)
}

Snake.prototype.update = function() {
    if (this.head.x < 0 || this.head.x >= cellNumX || this.head.y < 0 || this.head.y >= cellNumY) {
        this.death()
    } else {
        switch (this.direction) {
            case 'static':
            break

            case 'left':
            this.moveLeft()
            break

            case 'right':
            this.moveRight()
            break

            case 'down':
            this.moveDown()
            break

            case 'up':
            this.moveUp()
            break
        }
    }
}

Snake.prototype.death = function() {
    lives --
    if (lives) {
        this.revive()
        foodGroup = []
        food = new Food()
        foodGroup.push(food)
    }
}

Snake.prototype.revive = function() {
    snake = new Snake()
}

Snake.prototype.advance = function() {
    for (var i = this.body.length - 1; i > 0; i --) {
        this.body[i].x = this.body[i-1].x
        this.body[i].y = this.body[i-1].y
        //console.log(this.body[i])
    }
    this.body[0].x = this.head.x
    this.body[0].y = this.head.y

}

Snake.prototype.moveRight = function() {
    this.head.x ++
    this.advance()
}

Snake.prototype.moveLeft = function() {
    this.head.x --
    this.advance()
}

Snake.prototype.moveDown = function() {
    this.head.y ++
    this.advance()
}

Snake.prototype.moveUp = function() {
    this.head.y --
    this.advance()
}

Snake.prototype.grow = function() {
    let g = {}
    let tail = this.body[this.body.length-1]
    g.x = tail.x
    g.y = tail.y
    this.update()
    this.body.push(g)
}
