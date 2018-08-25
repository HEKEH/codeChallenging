var loadLevel = function(game, n) {
    n = n - 1
    var level = levels[n]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

var enableDebugMode = function(game, enable) {
    if(!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event){
        var k = event.key
        if (k == 'p') {
            // 暂停功能
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            // 为了 debug 临时加的载入关卡功能
            // blocks = loadLevel(game, Number(k))
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}

const ajax = request => {
    let r = new XMLHttpRequest()
    r.open('GET', request.url, true)
    r.responseType = 'arraybuffer'
    r.onreadystatechange = event => {
        if (r.readyState == 4) {
            request.callback(r.response)
        }
    }
    r.send()
}

var __main = function() {
    var images = {
        bg: 'img/bg_day.png',
        bird0: 'img/bird0_0.png',
        bird1: 'img/bird0_1.png',
        bird2: 'img/bird0_2.png',
        ground: 'img/ground.png',
        pipe_down: 'img/pipe_down.png',
        pipe_up: 'img/pipe_up.png',

        tile1: 'img/tiles/t1.png',
        tile2: 'img/tiles/t2.png',
        tile3: 'img/tiles/t3.png',
        tile4: 'img/tiles/t4.png',
    }

    let request = {
        url : 'mario.nes',
        callback(r) {
            window.bytes = new Uint8Array(r)
        }
    }
    ajax(request)

    var game = GuaGame.instance(30, images, function(g){
        var s = SceneEditor.new(g)
        g.runWithScene(s)
    })

    enableDebugMode(game, true)
}

__main()
