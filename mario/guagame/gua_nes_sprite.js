class GuaNesSprite {
    constructor(game, bytes, map) {
        this.game = game
        this.map = map

        //每4次循环动作1次
        this.frameCount = 4

        this.flipX = false
        //this.rotation = 0
        this.alpha = 1


        this.tileOffset = 32784
        this.offset = this.tileOffset
        this.step = 0

        this.bytes = bytes
        this.bytesPerBlock = 16
        this.blocksPerSprite = 8   //4行*2列
        this.bytesPerSprite = this.bytesPerBlock * this.blocksPerSprite
        this.pixelWidth = 2  //一个马里奥像素实际占据3*3个真实像素点
        this.pixelsPerBlockSide = 8 // 一个图块8*8像素
        this.colors = [
            'white',
            '#FA9054',
            '#FF2F18',
            '#C75D02',
        ]


        // 重力加速度、速度、位置、尺寸
        this.gy = 10
        this.vy = 0

        this.vx = 0
        this.mx = 0 //摩擦力加速度

        //this.horizon = 50
        this.x = 200
        this.y = 100
        this.w = this.pixelWidth * this.pixelsPerBlockSide * 2
        this.h = this.pixelWidth * this.pixelsPerBlockSide * 4

    }

    // frames () {
    //     return this.animations[this.animationName]
    // }
    jump() {
        this.vy = -10
    }
    updateGravity() {
        let onGround = this.map.onGround(this.x ,this.y + 64)
        if (onGround && this.vy > 0) {
            this.vy = 0
            let i = Math.floor(this.y / 32)
            this.y = i * 32
        } else {
            this.y += this.vy
            this.vy += this.gy * 0.2
        }
    }
    update() {
        //更新　alpha 透明度
        if (this.alpha > 0) {
            this.alpha -= 0.05
        }
        // 更新x方向移动
        if (this.vx * this.mx >= 0) {
            this.vx = 0
            this.mx = 0
        } else {
            this.vx += this.mx
        }
        this.x += this.vx
        // 更新受力
        this.updateGravity()

        this.frameCount --
        if (this.frameCount == 0) {
            this.frameCount = 4
            this.offset = this.tileOffset + this.step * this.bytesPerSprite
            this.step ++
            this.step %= 3
        }

    }
    draw() {
        var context = this.game.context
        context.save()

        var w2 = this.w / 2
        var h2 = this.h / 2


        context.translate(this.x + w2 + this.map.offsetX, this.y + h2)
        if (this.flipX) {
            context.scale(-1, 1)
        }
        context.globalAlpha = this.alpha
        //context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2, -h2)

        this.drawSprite(this.bytes, context)

        context.restore()
    }
    //move(x, keyStatus) {
    move(x) {
        this.flipX = (x < 0)
        let s = 0.5 * x

        //if (keyStatus == 'down') {
        if (this.vx != 0) {
            this.mx = - Math.abs(s / 2) * this.vx / Math.abs(this.vx)
        }
        else {
            this.mx = - s / 2
        }
        this.vx += s
        //}
        // console.log('this.flipX', this.flipX, this.x);
        // var animationNames = {
        //     down: 'run',
        //     up: 'idle',
        // }
        // var name = animationNames[keyStatus]
        // this.changeAnimation[name]
    }
    // changeAnimation(name) {
    //     this.animationName = name
    // }

    drawSprite(data, context){
        let pixelsPerBlockSide = this.pixelsPerBlockSide
        let pixelWidth = this.pixelWidth
        let index = this.offset
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 2; j++) {
                let x = j * pixelWidth * pixelsPerBlockSide
                let y = i * pixelWidth * pixelsPerBlockSide
                this.drawBlock(context, x, y, data.slice(index), pixelsPerBlockSide, pixelWidth)
                index += this.bytesPerBlock
            }
        }
    }

    drawBlock(context, x, y, bytes, pixelsPerBlock, pixelWidth) {
        let w = pixelWidth
        let h = pixelWidth
        for (var i = 0; i < pixelsPerBlock; i++) {//i代表行数
            let p1 = bytes[i]
            let p2 = bytes[i + 8]
            for (var j = 0; j < pixelsPerBlock; j++) {//j代表列数
                let c1 = (p1 >> (7 - j)) & 0b00000001
                let c2 = (p2 >> (7 - j)) & 0b00000001
                let color_index = (c1 << 1) + c2
                if(color_index == 0)
                {
                    continue
                }
                let color = this.colors[color_index]
                context.fillStyle = color
                let px = x + j * w
                let py = y + i * h
                context.fillRect(px, py, w, h)
            }
        }
    }
}
