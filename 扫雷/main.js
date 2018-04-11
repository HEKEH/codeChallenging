setup()


window.addEventListener('keydown', function(event) {
    key = event.key
    if (key >= 'A' && key <= 'z') {
        key = key.toUpperCase()
    }
    keyCode = event.key.toUpperCase()
    try {
        keyPressed()
    }
    catch(e) {
        return
    }
})

window.addEventListener('keyup', function(event) {
    key = event.key
    if (key >= 'A' && key <= 'z') {
        key = key.toUpperCase()
    }
    keyCode = event.key.toUpperCase()
    try {
        keyReleased()
    }
    catch(e) {
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

// function runloop() {
//     draw()
//     setTimeout(function() {
//         runloop()
//     }, 1000/60)
// }
//
// runloop()
let loopId = setInterval(function() {
    if (loopAbled) {
        try {
            draw()
        } catch (e) {
            clearInterval(loopId)
        }
    } else {
        clearInterval(loopId)
    }
}, 1000/60)
