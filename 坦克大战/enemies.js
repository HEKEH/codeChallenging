class Enemy extends Tank {
    constructor() {
        name = random(enemyTypes)
        super(name)
        this.lives = 1

        this.dir = random(directions)
        this.target = random(players.members)

        this.imgs = img[this.name]
        this.img = this.imgs[this.dir]
        this.missileImg = img['missile']['enemy']
        this.missilesGroup = enemyMissiles

        this.w = this.img.width
        this.h = this.img.height
        this.x = random(width - this.w)
        this.y = random(height / 3 - this.h)

        this.speed = enemySpeeds[0]
        this.moveAllowed = true

        this.rivals = players

        this.changePeriod = 40
        this.changeTime = this.changePeriod
    }

    attacked() {
        this.lives -= 1
    }

    advanceAdjust(dir) {
        this.dir = reverseDir(dir)
        this.advance()
    }

    update() {
        if (this.target.lives <= 0 && players.members.length > 0) {
            this.target = random(players.members)
        }
        if (this.changeTime == 0) {
            this.changeTime = this.changePeriod
            this.targetChase()
        }
        this.changeTime --
        super.update()
    }
    targetChase() {
        let d1 = this.target.x - this.x
        let d2 = this.target.y - this.y
        let dir1 = d1 < 0 ? 'left':'right'
        let dir2 = d2 < 0 ? 'up':'down'
        let dir3 = abs(d1) < abs(d2) ? dir1 : dir2
        let dir4 = abs(d1) > abs(d2) ? dir1 : dir2
        if (min(abs(d1), abs(d2)) > this.w) {
            if (random() < 0.85) {
                this.dir = dir3
            } else {
                this.dir = random(directions)
            }
        } else {
            if (random() < 0.85) {
                this.dir = dir4
            } else {
                this.dir = random(directions)
            }
        }
        if (random() < 0.2) {
            this.fire()
        }
    }
}

class Enemies {
    constructor() {
        this.numberOfMembers = 3
        this.members = []
    }
    update() {
        if (this.members.length < this.numberOfMembers) {
            let e = new Enemy()
            this.members.push(e)
        }
        this.members = this.members.filter(m => m.lives > 0)
    }
    show() {
        this.update()
        for(var e of this.members) {
            e.show()
        }
    }
}
