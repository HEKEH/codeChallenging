const e = sel => document.querySelector(sel)

var log = console.log.bind(console)

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

var rectIntersects = function(a, b) {
    if ((a.y - (b.y + b.image.height)) * ((a.y + a.image.height) - b.y) <= 0) {
        if ((a.x - (b.x + b.image.width)) * ((a.x + a.image.width) - b.x) <= 0) {
            return true
        }
    }
    return false
}

var aInb = function(x, x1, x2) {
    return x >= x1 && x <= x2
}
