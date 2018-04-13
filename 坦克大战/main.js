preload()

setup()


window.addEventListener('keydown', function(event) {
    if (!keyBePressed[event.key]) {
        key = event.key
        keyBePressed[key] = true
        if (key.length == 1 && key >= 'A' && key <= 'z') {
            key = key.toUpperCase()
        }
        keyCode = event.keyCode
        try {
            keyPressed()
        }
        catch(e) {
            console.error(e)
            return
        }
    }
})

window.addEventListener('keyup', function(event) {
    key = event.key
    keyBePressed[key] = false
    if (key.length == 1 && key >= 'A' && key <= 'z') {
        key = key.toUpperCase()
    }
    keyCode = event.keyCode
    try {
        keyReleased()
    }
    catch(e) {
        console.error(e)
        return
    }
})

window.addEventListener('mousedown',function(event){
    mouseX=event.offsetX
    mouseY=event.offsetY
    if (event.button == 0) {
        mouseButton = 'left'
    } else if (event.button == 1) {
        mouseButton = 'center'
    } else if (event.button == 2) {
        mouseButton = 'right'
    }
    try {
        mousePressed()
    }
    catch(e) {
        return
    }
})

window.addEventListener('mouseup',function(event){
    mouseX=event.offsetX
    mouseY=event.offsetY
    if (event.button == 0) {
        mouseButton = 'left'
    } else if (event.button == 1) {
        mouseButton = 'center'
    } else if (event.button == 2) {
        mouseButton = 'right'
    }
    try {
        mouseReleased()
    }
    catch(e) {
        return
    }
})

window.addEventListener('mousemove',function(event){
    mouseX=event.offsetX
    mouseY=event.offsetY
})

let loopId = setInterval(function() {
    if (loopAbled) {
        draw()
    } else {
        clearInterval(loopId)
    }
}, 1000/60)
