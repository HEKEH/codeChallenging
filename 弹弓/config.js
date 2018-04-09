function distance(a,b) {
    return Math.sqrt((Math.pow(a[0] - b[0],2) + Math.pow(a[1] - b[1],2)))
}

function randomRgbColor() { //随机生成RGB颜色
    var r = floor(random(256)) //随机生成256以内r值
    var g = floor(random(256)) //随机生成256以内g值
    var b = floor(random(256)) //随机生成256以内b值
    return `rgb(${r},${g},${b})` //返回rgb(r,g,b)格式颜色
}

let log = console.log.bind(console)
