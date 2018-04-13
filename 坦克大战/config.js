let playerSpeed = 3
let enemySpeeds = [1.5, 2, 2.5, 3]
let directions = ['left', 'right', 'down', 'up']
let enemyTypes = ['enemy1', 'enemy2', 'enemy3',]
let keyOfDirP1 = {
    'A' : 'left',
    'W' : 'up',
    'D' : 'right',
    'S' : 'down',
}


let keyOfDirP2 = {
    'ArrowLeft' : 'left', // 左键头
    'ArrowUp' : 'up',
    'ArrowRight' : 'right',
    'ArrowDown' : 'down',
}

function move(dir, speed) {
    switch(dir){
    case 'right':
        return [speed, 0]
        break
    case 'left':
        return [-speed, 0]
        break
    case 'up':
        return [0, -speed]
        break
    case 'down':
        return [0, speed]
        break
    }
}
