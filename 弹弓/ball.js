function Ball() {
    this.setup()
}
Ball.prototype.setup = function() {
    this.x = Origin.x
    this.y = Origin.y
    this.g = g
    this.angle = 0
    this.radius = 7
    this.speed = {
        'x' : 0,
        'y' : 0,
    }
    this.a = {
        'x' : 0,
        'y' : 0,
    } // 加速度
    this.color = randomRgbColor()
    this.dragged = false
    this.released = false
    this.freed = false
}

Ball.prototype.contains = function(x, y) {
    if (distance([this.x,this.y],[x,y]) < this.radius) {
        return true
    }
    return false
}



Ball.prototype.update = function() {
    if (this.dragged) {
        this.drag(mouseX, mouseY)
    }
    if (this.released) {
        this.Move()
    }
}

Ball.prototype.Move = function() {
    this.x = this.x + this.speed.x * dt
    this.y = this.y + this.speed.y * dt
    if (!this.freed) {
        this.a.x = k * (Origin.x - this.x)
        this.a.y = k * (Origin.y - this.y)
        if (this.reachOrigin()) {
            this.freed = true
            this.a.x = 0
        }
    } else {
        this.a.y = this.g
        if ((this.y + this.radius == height - 1) && this.speed.y == 0 ) {//地面
            if (abs(this.speed.x) > mu * g * dt) {
                this.a.x = - mu * g * this.speed.x / abs(this.speed.x)
            } else {
                this.a.x = 0
                this.speed.x = 0
            }
        }

        this.RightBounceJudge(0)
        this.LeftBounceJudge(width - 1)
        this.DownBounceJudge(0)
        let goundTouch=this.UpBounceJudge(height - 1)
        if (goundTouch){
            if (abs(this.speed.y) <= g * dt / 2) {
                this.g = 0
                this.y = height - 1 - this.radius
                this.speed.y = 0
                this.a.y = 0
            }
        }
    }
    this.speed.x += this.a.x * dt
    this.speed.y += this.a.y * dt // this.a.y * dt太大(=g.dt)，abs(this.speed.y) 不能小于g.dt,不可能满足
}



Ball.prototype.reachOrigin = function() {
    if (distance([this.x, this.y],[Origin.x, Origin.y]) < Math.sqrt((Math.pow(this.speed.x * dt,2) + Math.pow(this.speed.y * dt,2)))) {
        return true
    }
    else {
        return false
    }
}

Ball.prototype.free = function() {
    this.freed = true
}

Ball.prototype.show = function() {
    this.update()
    fill(this.color)
    stroke(0)
    strokeWeight(2)
    ellipse(this.x , this.y , this.radius*2)
}



Ball.prototype.drag = function(x, y) {
    this.x = x
    this.y = y
    this.angle = - Math.atan((Origin.y - y) / (Origin.x - x))
    if (Origin.x - x < 0) {
        this.angle = this.angle + Math.PI
    }
}

Ball.prototype.RightBounceJudge = function(x) {
    if (this.x - this.radius < x ) {
        this.x = x + this.radius
        this.speed.x = abs(this.speed.x) * 0.9
    }
}

Ball.prototype.LeftBounceJudge = function(x) {
    if (this.x + this.radius > x ) {
        this.x = x - this.radius
        this.speed.x = -abs(this.speed.x) * 0.9
    }
}

Ball.prototype.DownBounceJudge = function(y) {
    if (this.y - this.radius < y ) {
        this.y = y + this.radius
        this.speed.y = abs(this.speed.y) *0.9
    }
}

Ball.prototype.UpBounceJudge = function(y) {
    if (this.y + this.radius > y) {
        //this.y = y - this.radius
        this.speed.y = - abs(this.speed.y) * 0.9
        return true
    }
}



// Ball.prototype.XbounceJudge = function(barrierPositionX) {
//     //this.speed.x = - this.speed.x
//     if (barrierPositionX > 0 && barrierPositionX < this.radius + abs(this.speed.x) * dt) { // 防止bug
//         this.speed.x = - abs(this.speed.x) * 0.8
//     } else if (barrierPositionX < 0 && barrierPositionX > - this.radius - abs(this.speed.x) * dt){
//         this.speed.x = abs(this.speed.x) * 0.8
//     }
// }
//
// Ball.prototype.YbounceJudge = function(barrierPositionY) {
//     if (barrierPositionY > 0 && barrierPositionY < this.radius + abs(this.speed.y) * dt) { // 防止bug
//         if (abs(this.speed.y) < 0.1) {
//             this.g = 0
//             this.y = height -1 -this.radius
//             this.speed.y = 0
//             this.a.y = 0
//         } else{
//             this.speed.y = - abs(this.speed.y) * 0.8
//             log(this.speed.y)
//         }
//     } else if (barrierPositionY < 0 && barrierPositionY > - this.radius - abs(this.speed.y) * dt) {
//         this.speed.y = abs(this.speed.y) * 0.8
//     }
// }
