let width
let height
let context
let lineColor
let fillColor
let canvas
let lineWeight
let key
let keyCode
let keyBePressed = {}
let mouseX
let mouseY
let mouseButton
let fontSize = 12
let textFont
let LEFT = 'left'
let RIGHT = 'right'
let CENTER = 'center'
let UP = 'up'
let DOWN = 'down'
let textPosX
let textPosY
let loopAbled = true

const select = (string) => document.querySelector(string)

const imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

const drawImage = function(o) {
    context.drawImage(o.img, o.x, o.y)
}

Array.prototype.contains = function(o) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == o) {
            return true
        }
    }
    return false
}

const createCanvas = function(w, h) {
    canvas = document.getElementById("canvas")
    context = canvas.getContext("2d")

    canvas.setAttribute("width",w)
    canvas.setAttribute("height",h)

    width = w
    height = h
}

const background = function() {
    let w = canvas.getAttribute("width")
    let h = canvas.getAttribute("height")
    context.clearRect(0, 0, w, h);
    if (arguments.length == 1){
        let color = arguments[0]
        canvas.style.background = `rgb(${color},${color},${color})`
    } else if (arguments.length == 3) {
        canvas.style.background = `rgb(${arguments[0]},${arguments[1]},${arguments[2]})`
    }
}

const stroke = function() {
    if (arguments.length == 1){
        let color = arguments[0]
        if (typeof(color) == 'string') {
            lineColor = color
        }
        else {
            lineColor = `rgb(${color},${color},${color})`
        }
    } else if (arguments.length == 3) {
        lineColor = `rgb(${arguments[0]},${arguments[1]},${arguments[2]})`
    }
}

const fill  = function() {
    if (arguments.length == 1){
        let color = arguments[0]
        if (typeof(color) == 'string') {
            fillColor = color
        } else {
            fillColor = `rgb(${color},${color},${color})`
        }
    } else if (arguments.length == 3) {
        fillColor = `rgb(${arguments[0]},${arguments[1]},${arguments[2]})`
    }
}

const noFill = function() {
    fillColor = false
}

const noStroke = function() {
    lineColor = false
}


const strokeWeight = function(w) {
    lineWeight = w
}

const rect = function(x, y, w, h) {
    if (fillColor) {
        context.fillStyle = fillColor
        context.fillRect(x, y, w, h)
    }
    if (lineWeight) {
        context.lineWidth = lineWeight
    }
    if (lineColor) {
        context.strokeStyle = lineColor
        let path=new Path2D()
        path.rect(x, y, w, h)
        context.stroke(path)
    }
}

const arc = function(x, y, diameterX, diameterY, startAngle, endAngle, anticlockwise = false) {
    var path=new Path2D()
    path.ellipse(x, y, diameterX / 2, diameterX / 2, 0 , startAngle, endAngle, anticlockwise)
    if (lineWeight) {
        context.lineWidth = lineWeight
    }

    if (lineColor) {
        context.strokeStyle = lineColor
        context.stroke(path)
    }
}

const ellipse = function(x, y, diameterX, diameterY = diameterX, rotation=0) {
    var path=new Path2D()
    path.ellipse(x, y, diameterX / 2, diameterX / 2, rotation, 0, 2 * Math.PI)
    if (lineWeight) {
        context.lineWidth = lineWeight
    }
    if (fillColor) {
        context.fillStyle = fillColor
        context.fill(path)
    }
    if (lineColor) {
        context.strokeStyle = lineColor
        context.stroke(path)
    }
}

const line = function(Ax, Ay, Bx, By) {
    var path=new Path2D()
    path.moveTo(Ax, Ay)
    path.lineTo(Bx, By)
    if (lineWeight) {
        context.lineWidth = lineWeight
    }
    if (lineColor) {
        context.strokeStyle = lineColor
        context.stroke(path)
    }
}

const floor = Math.floor

const random = function() {
    if (arguments.length == 0) {
        return Math.random()
    } else if (arguments.length >= 3) {
        let i = floor(Math.random() * arguments.length)
        return arguments[i]
    } else {
        let arg = arguments[0]
        if (typeof(arg) == "number") {
            let nums = Array.prototype.slice.call(arguments,0)
            if (nums.length == 1) {//random(10)
                return Math.random() * nums[0]
            } else if ( nums.length == 2) {//random(10,20)
                return Math.random() * (nums[1] - nums[0]) + nums[0]
            }
        } else {
            let obj = Array.prototype.slice.call(arguments,0)
            if (obj.length == 1) {//random(['10','20'])
                let i = floor(Math.random() * arg.length)
                return arg[i] }
            else{//random('10','20')
                let r = floor(Math.random() * arguments.length)
                return arguments[r]
            }
        }
    }
}



const PI = Math.PI
const log = console.log.bind(console)
const abs = Math.abs
const max = function() {
    if (arguments.length == 1) {
        let arr = arguments[0]
        if (typeof(arr) !== 'number'){
            let ret = arr[0]
            for (var i = 1; i < arr.length; i++) {
                if (ret < arr[i]) {
                    ret = arr[i]
                }
            }
            return ret
        }
    }
    return Math.max(arguments)
}

const min = function() {
    if (arguments.length == 1) {
        let arr = arguments[0]
        if (typeof(arr) !== 'number'){
            let ret = arr[0]
            for (var i = 1; i < arr.length; i++) {
                if (ret > arr[i]) {
                    ret = arr[i]
                }
            }
            return ret
        }
    }
    return Math.min(arguments)
}

function randomRgbColor() { //随机生成RGB颜色
    var r = floor(random(256)) //随机生成256以内r值
    var g = floor(random(256)) //随机生成256以内g值
    var b = floor(random(256)) //随机生成256以内b值
    return `rgb(${r},${g},${b})` //返回rgb(r,g,b)格式颜色
}

function textSize(size) {
    fontSize = size
    textFont = `${size}px Arial`
}

function textAlign(xP = LEFT, yP = DOWN) {
    textPosX = xP
    textPosY = yP
}

function text(words, x, y) {
    if (textFont) {
        context.font = textFont
    }
    let tW = context.measureText(words).width
    let tH = fontSize

    switch (textPosX) {
        case LEFT:
            break
        case RIGHT:
            x = x - tW
            break
        case CENTER:
            x = x - tW / 2
            break
    }

    switch (textPosY) {
        case UP:
            y = y + tH
            break
        case DOWN:
            break
        case CENTER:
            y = y + tH / 2
            break
    }
    if (fillColor) {
        context.fillStyle = fillColor
        context.fillText(words, x , y)
    }
    // if (lineColor) {
    //     context.strokeStyle = lineColor
    //     context.strokeText(words, x, y)
    // }
}

function noLoop() {
    loopAbled = false
}

var collide=function(a,b){
  return ((a.y - (b.y + b.h)) * (a.y + a.h - b.y) <= 0) && ((a.x - (b.x + b.w)) * (a.x + a.w - b.x) <= 0)
}

// createCanvas(1000, 1000)
// background(255)
// fill('rgb(255,0,0)')
// textSize(40)
//stroke('rgb(0,255,0)')
// text('Press Space To Start Game!', width/2,height/2)

// stroke('rgb(255,0,0)')
// strokeWeight(3)
// rect(50, 50, 100, 100)
// arc(100,100,100,100,0,1)
// ellipse(150, 150, 20)
