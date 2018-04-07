function reverseDir(dir) {
    return {
        'left' :'right',
        'right' :'left',
        'up' :'down',
        'down' :'up',
    } [dir]
}


function randomRgbColor() { //随机生成RGB颜色
    var r = floor(random(256)) //随机生成256以内r值
    var g = floor(random(256)) //随机生成256以内g值
    var b = floor(random(256)) //随机生成256以内b值
    return `rgb(${r},${g},${b})` //返回rgb(r,g,b)格式颜色
}

let log = console.log.bind(console)


function allCells() {
    let ret = new Array(cellNumX)
    for (var i = 0; i < cellNumX; i++) {
        ret[i] = new Array(cellNumY).fill(1)
    }
    return ret
}

function blankCell() {
    let cells = allCells()
    for (var i = 0; i < snake.body.length; i++) {
        cells[snake.body[i].x][snake.body[i].y] = 0
    }
    for (var i = 0; i < foodGroup.length; i++) {
        let f = foodGroup[i]
        cells[f.x][f.y] = 0
    }
    let ret
    let val
    do {
        ret = [floor(random(cellNumX)),floor(random(cellNumY))]
        val = cells[ret[0]][ret[1]]
    } while (val==0);
    return ret
}
