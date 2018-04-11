let Origin
//加速度
let ball
let elasticCord
let dt //时间间隔
let g  //重力加速度
let k //弹性系数
let mu // 摩阻力
let bounceDecay //碰撞衰减

let OriginDragEnabled = false

function setup() {
    createCanvas(1501,801)
    Origin = {
        'x' : 300,
        'y' : height/2,
    }
    dt = 1
    k = 0.003
    g = 0.2
    mu = 0.4
    bounceDecay = 0.9

    ball = new Ball()
    elasticCord = new ElasticCord()//橡皮筋
}

function draw() {
    background(255)
    stroke(2)
    noFill()
    rect(0, 0, width - 1, height - 1)

    if (OriginDragEnabled) {
        dragOrigin(mouseX, mouseY)
    }

    ball.show()
    elasticCord.show()
}

function mousePressed() {
    if (mouseButton == 'left' && ball.contains(mouseX,mouseY)) {
        ball.released = false
        ball.dragged = true
    } else if (mouseButton == 'right' && distance([mouseX, mouseY], [Origin.x, Origin.y]) < 10){
        OriginDragEnabled = true
    }
}

function mouseReleased() {
    if (mouseButton == 'left' && ball.dragged) {
        ball.dragged = false
        ball.released = true
    } else if (mouseButton == 'right'){
        OriginDragEnabled = false
    }
}

function ElasticCord() {
    this.x = Origin.x
    this.y = Origin.y
    this.color = 'rgb(255,0,0)'
}
ElasticCord.prototype.update = function() {
    this.x = ball.x - Math.cos(ball.angle)*ball.radius
    this.y = ball.y + Math.sin(ball.angle)*ball.radius
}
ElasticCord.prototype.show = function() {
    if (!ball.freed) {
        this.update()
        //画盖子
        stroke('rgb(67, 91, 10)')
        strokeWeight(3)
        noFill()
        let angle = ball.angle
        arc(this.x + 25 * Math.cos(angle), this.y - 25 * Math.sin(angle), 50, 50, PI- angle - 0.4, PI- angle + 0.4)
        //画皮筋
        stroke(this.color)
        strokeWeight(2)
        line(this.x, this.y, Origin.x, Origin.y)
    }
}

function dragOrigin (x, y) {
    let dx = x - Origin.x
    let dy = y - Origin.y

    elasticCord.x += dx
    elasticCord.y += dy

    ball.x += dx
    ball.y += dy

    Origin.x += dx
    Origin.y += dy
}
