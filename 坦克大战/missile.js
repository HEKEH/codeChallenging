class Missile {
    constructor(tank) {
        this.tank = tank
        this.dir = tank.dir
        this.targets = tank.rivals
        this.img = tank.missileImg
        this.w = this.img.width
        this.h = this.img.height
        this.speed = 5
        this.exist = true
        this.setPos()
    }
    setPos() {
        switch(this.dir){
        case 'right':
            this.x = this.tank.x + this.tank.w
            this.y = this.tank.y + this.tank.h / 2 - this.h / 2
            break
        case 'left':
            this.x = this.tank.x - this.w
            this.y = this.tank.y + this.tank.h / 2 - this.h / 2
            break
        case 'up':
            this.x = this.tank.x + this.tank.w / 2 - this.w / 2
            this.y = this.tank.y - this.h
            break
        case 'down':
            this.x = this.tank.x + this.tank.w / 2 - this.w / 2
            this.y = this.tank.y + this.tank.h
        }
    }
    advance() {
        let step = move(this.dir, this.speed)
        this.x += step[0]
        this.y += step[1]
        if (crossBorder(this)) {
            this.disappear()
        }
    }
    update() {
        this.advance()
        this.targets = this.tank.rivals
        for (var member of this.targets.members) {
            if (collide(this, member)) {
                member.attacked()
                member.reset()
                this.disappear()
            }
        }
    }
    show() {
        this.update()
        drawImage(this)
    }
    disappear() {
        this.exist = false
    }
}

class MissilesGroup {
    constructor() {
        this.missiles = []
    }
    extends(m) {
        this.missiles.push(m)
    }
    update() {
        this.missiles = this.missiles.filter(m => m.exist)
    }
    show() {
        this.update()
        for(var m of this.missiles) {
            m.show()
        }
    }
}
