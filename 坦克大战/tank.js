class Tank {
    constructor( name ) {
        this.name = name
    }
    advance() {
        let step = move(this.dir, this.speed)
        this.x += step[0]
        this.y += step[1]
    }
    reset() {

    }
    update() {
        //log('moveAllowed',this.moveAllowed)
        this.img = this.imgs[this.dir]
        this.w = this.img.width
        this.h = this.img.height
        if (this.moveAllowed) {
            if (!crossBorder(this)){
                this.advance()
                this.dirRecord = this.dir
            } else {
                this.advanceAdjust(this.dirRecord)//我好牛逼
            }
        }
    }
    show() {
        this.update()
        drawImage(this)
    }
    fire() {
        let missile = new Missile(this)
        this.missilesGroup.extends(missile)
    }
}
