class TileMap {
    constructor(game) {
        this.game = GuaGame
        this.tiles = [
            2, 2, 2, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, //每一列图块
            2, 2, 2, 0, 3, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2,
            2, 2, 4, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2,
            3, 2, 4, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2,
            3, 2, 4, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2,
        ]
        this.th = 15
        this.offsetX = 0
        this.tileSize = 32

        this.tw = Math.floor(this.tiles.length / this.th)

        this.images = {
            1: GuaImage.new(game, 'tile1'),
            2: GuaImage.new(game, 'tile2'),
            3: GuaImage.new(game, 'tile3'),
            4: GuaImage.new(game, 'tile4'),
        }
    }

    static new(...args){
        let i = new this(...args)
        return i
    }

    update() {
        this.offsetX -= 1
    }
    draw() {
        let offsetI = Math.floor(- this.offsetX / this.tileSize) * this.th
        let numberofTiles = this.th * (16 + 1)
        let upper_limit = Math.min(numberofTiles + offsetI, this.tiles.length)
        for (var i = offsetI; i < upper_limit; i++) {
            let index = this.tiles[i]
            if (index != 0) {
                let tile_image = this.images[index]
                tile_image.x = Math.floor(i / this.th) * this.tileSize
                tile_image.x += this.offsetX
                tile_image.y = (i % this.th) * this.tileSize
                tile_image.draw()
            }
        }
    }
    onGround(x, y) {
        let i = Math.floor(y / this.tileSize)
        let j = Math.floor(x / this.tileSize)
        return this.tiles[this.th * j + i] != 0
    }
}
