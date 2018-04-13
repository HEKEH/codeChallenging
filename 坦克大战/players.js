class Player extends Tank {
    constructor(name) {
        super(name)
        this.dir = 'up'
        this.lastdir = 'up'
        this.lastlastdir = 'up'

        this.imgs = img[this.name]
        this.img = this.imgs[this.dir]
        this.missileImg = img['missile']['player']
        this.missilesGroup = playerMissiles

        this.w = this.img.width
        this.h = this.img.height
        this.rivals = enemies
        this.speed = playerSpeed
        this.moveAllowed = 0
        this.lives = 2
    }

    advanceAdjust(dir) {
        let step = move(reverseDir(dir), this.speed)
        this.x += step[0]
        this.y += step[1]
        // if (crossBorder(this)) {//我好牛逼
        //     this.x -= 2*step[0]
        //     this.y -= 2*step[1]
        // }
    }

    attacked() {
        this.lives --
    }

    update() {
        this.rivals = enemies
        for (var member of enemies.members) {
            if (collide(this, member)) {
                this.attacked()
                this.reset()
            }
        }
        super.update()
    }

    keyPressedCheck(key) {
        if (Object.keys(this.keyOfDir).contains(key)) {
            this.moveAllowed += 1
            this.lastlastdir = this.lastdir
            this.lastdir = this.dir
            this.dir = this.keyOfDir[key]
        }
        else {
            let actionKeys = Object.keys(this.actions)
            for (var i = 0; i < actionKeys.length; i++) {
                if (key == actionKeys[i]) {
                    this.actions[key]()
                }
            }
        }
    }

    keyReleasedCheck(key) {
        if (Object.keys(this.keyOfDir).contains(key)) {
            this.moveAllowed -= 1
            if (this.lastdir == this.keyOfDir[key]) {
                this.lastdir = this.lastlastdir
            }
            if (this.moveAllowed && this.dir == this.keyOfDir[key]) {
                this.dir = this.lastdir
            }
        }
    }
}

class Player1 extends Player {
    constructor(name) {
        super('P1')
        this.x = width / 4 - this.w / 2
        this.y = 3 * height / 4
        this.keyOfDir = keyOfDirP1
        this.setActions()
    }
    reset() {
        this.dir = 'up'
        this.x = width / 4 - this.w / 2
        this.y = 3 * height / 4
    }
    setActions() {
        let self =this
        this.actions = {
            'F' : function(){//'F'键
                return self.fire()
            },
        }
    }
}

class Player2 extends Player {
    constructor(name) {
        super('P2')
        this.x = 3 * width / 4 - this.w / 2
        this.y = 3 * height / 4
        this.keyOfDir = keyOfDirP2
        this.setActions()
    }
    reset() {
        this.dir = 'up'
        this.x = 3 * width / 4 - this.w / 2
        this.y = 3 * height / 4
    }
    setActions() {
        let self =this
        this.actions = {
            '0' : function(){//'0'键
                return self.fire()
            },
        }
    }
}

class Players {
    constructor() {
        this.members = [new Player1(), new Player2()]
    }
    update() {
        this.members = this.members.filter(p => p.lives > 0)
    }
    show() {
        this.update()
        for(var p of this.members) {
            p.show()
        }
    }
}
