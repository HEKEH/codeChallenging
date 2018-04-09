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

        this.xBounceJudge(this.radius)
        this.xBounceJudge(width - 1 - this.radius)
        this.yBounceJudge(this.radius)
        let goundTouch=this.yBounceJudge(height - 1 - this.radius)
        if (goundTouch){
            if (abs(this.speed.y) <= g * dt) {//当速度太小时，强制为0
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
    if (distance([this.x, this.y],[Origin.x, Origin.y]) <=  0.5 * Math.sqrt((Math.pow(this.speed.x * dt,2) + Math.pow(this.speed.y * dt,2)))) {
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

Ball.prototype.xBounceJudge = function(objectX) {
    //let dir = this.speed.x / abs(this.speed.x)
    let target = (this.x - objectX) / (this.speed.x * dt)
    if (target >= 0 && target < 1) {
        this.speed.x = - this.speed.x * bounceDecay
        this. x = (1 + bounceDecay) * objectX - this. x * bounceDecay
    }
}

Ball.prototype.yBounceJudge = function(objectY) {
    //let dir = this.speed.y / abs(this.speed.y)
    let target = (this.y - objectY) / (this.speed.y * dt)
    log((this.y - objectY),(this.speed.y * dt))
    if (target >= 0 && target <= 1) {
        this.speed.y = - this.speed.y * bounceDecay
        this. y = (1 + bounceDecay) * objectY - this. y * bounceDecay
        return true
    }
}

// Ball.prototype.RightBounceJudge = function(x) {
//     if (this.x - this.radius < x ) {
//         this.x = x + this.radius
//         this.speed.x = abs(this.speed.x) * bounceDecay
//     }
// }
//
// Ball.prototype.LeftBounceJudge = function(x) {
//     if (this.x + this.radius > x ) {
//         this.x = x - this.radius
//         this.speed.x = -abs(this.speed.x) * bounceDecay
//     }
// }
//
// Ball.prototype.DownBounceJudge = function(y) {
//     if (this.y - this.radius < y ) {
//         this.y = y + this.radius
//         this.speed.y = abs(this.speed.y) * bounceDecay
//     }
// }
//
// Ball.prototype.UpBounceJudge = function(y) {
//     if (this.y + this.radius > y) {
//         //this.y = y - this.radius
//         this.speed.y = - abs(this.speed.y) * bounceDecay
//         return true
//     }
// }
