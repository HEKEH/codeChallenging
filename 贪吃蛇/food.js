function Food() {
    let location =blankCell()
    this.x = location[0]
    this.y = location[1]
    this.color = randomRgbColor()
}

Food.prototype.show = function() {
    fill(this.color)
    stroke(0)
    strokeWeight(2)
    ellipse(this.x * w + w / 2, this.y * w + w / 2, w)
}

Food.prototype.eaten = function() {
    if (this.x == snake.head.x && this.y == snake.head.y){
        return true
    } else {
        return false
    }
}
