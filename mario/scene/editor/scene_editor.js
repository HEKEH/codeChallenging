class SceneEditor extends GuaScene {
    constructor(game) {
        super(game)

        // var bg = GuaImage.new(game, 'bg')
        // this.addElement(bg)
        //
        // this.grounds = []
        // for (var i = 0; i < 30; i++) {
        //     var g = GuaImage.new(game, 'ground')
        //     g.x = i * 19
        //     g.y = 450
        //     this.addElement(g)
        //     this.grounds.push(g)
        // }
        var map = TileMap.new(game)
        this.addElement(map)

        this.mario = new GuaNesSprite(game, window.bytes, map)
        this.addElement(this.mario)

        this.setupInputs()
    }
    update() {
        super.update()
    }
    setupInputs() {

        var self = this
        var m = this.mario
        self.game.registerAction('a', function() {
            m.move(-1)
        })

        self.game.registerAction('d', function() {
            m.move(1)
        })

        self.game.registerAction('w', function() {
            m.jump()
        })
    }
}
