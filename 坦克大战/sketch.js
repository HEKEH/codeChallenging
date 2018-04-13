let img
// let p1
// let p2
let playerMissiles
let enemyMissiles
let players
let enemies

function preload(){
    img = {
        'P1' : {
            'left' : 'image/Player1/p1tankL.gif',
            'right' : 'image/Player1/p1tankR.gif',
            'down' : 'image/Player1/p1tankD.gif',
            'up' : 'image/Player1/p1tankU.gif',
        },

        'P2' : {
            'left' : 'image/Player2/p2tankL.gif',
            'right' : 'image/Player2/p2tankR.gif',
            'down' : 'image/Player2/p2tankD.gif',
            'up' : 'image/Player2/p2tankU.gif',
        },

        'enemy1' : {
            'left' : 'image/enemy/enemy1L.gif',
            'right' : 'image/enemy/enemy1R.gif',
            'down' : 'image/enemy/enemy1D.gif',
            'up' : 'image/enemy/enemy1U.gif',
        },

        'enemy2' : {
            'left' : 'image/enemy/enemy2L.gif',
            'right' : 'image/enemy/enemy2R.gif',
            'down' : 'image/enemy/enemy2D.gif',
            'up' : 'image/enemy/enemy2U.gif',
        },

        'enemy3' : {
            'left' : 'image/enemy/enemy3L.gif',
            'right' : 'image/enemy/enemy3R.gif',
            'down' : 'image/enemy/enemy3D.gif',
            'up' : 'image/enemy/enemy3U.gif',
        },

        'missile' : {
            'player' : 'image/bullet/tankmissile.gif',
            'enemy' : 'image/bullet/enemymissile.gif',
        },

        'items' : {
            'grass' : 'image/environment/grass.png',
        },
    }

    let names = Object.keys(img)
    for (var i = 0; i < names.length; i++) {
        let cates = Object.keys(img[names[i]])
        for (var j = 0; j < cates.length; j++) {
            let tempImg = imageFromPath(img[names[i]][cates[j]])
            img[names[i]][cates[j]] = tempImg
        }
    }
}

function setup() {
    createCanvas(1201,801)
    width = width - 1
    height = height -1
    playerMissiles = new MissilesGroup()
    enemyMissiles = new MissilesGroup()
    players = new Players()
    enemies = new Enemies()
}

function keyPressed() {
    for (var p of players.members) {
        p.keyPressedCheck(key)
    }
}

function keyReleased() {
    for (var p of players.members) {
        p.keyReleasedCheck(key)
    }
}

function draw() {
    background(100)
    stroke(0)
    noFill()
    rect(0, 0, width, height)
    players.show()
    enemies.show()
    playerMissiles.show()
    enemyMissiles.show()
}
