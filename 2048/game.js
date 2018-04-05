function slide(row) {
    let arr = row.filter(val => val)
    let missing = 4 - arr.length
    let zeros = new Array(missing).fill(0)
    row = zeros.concat(arr)
    return row
}

function combine(row) {
    for (var i = row.length-1; i >= 1; i--) {
        if (row[i] !== 0) {
            if (row[i] == row[i-1]) {
                row[i] += row[i-1]
                score += row[i]
                row[i-1] = 0
            }
        }
    }
    return row
}

function operate(row) {
    row = slide(row)
    row = combine(row)
    row = slide(row)
    return row
}

function compare(a,b) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (a[i][j] !== b[i][j]) {
                return true
            }
        }
    }
    return false
}

function addNumber() {
    let options = []
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (grid[i][j] == 0) {
                options.push({
                    x : i,
                    y : j,
                })
            }
        }
    }
    if(options.length>0) {
        let choice = random(options)
        let r = random(1)
        grid[choice.x][choice.y] = r < 0.9 ? 2 : 4
        newNumMark[choice.x][choice.y] = 1
    }
}

function isVictory() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (grid[i][j] == 2048) {
                return true
            }
        }
    }
    return false
}

function isGameOver() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (grid[i][j] == 0) {
                return false
            }
            if (j!==3 && grid[i][j] === grid[i][j+1]) {
                return false
            }
            if (i!==3 && grid[i][j] === grid[i+1][j]) {
                return false
            }
        }
    }
    return true
}

// Array.prototype.contains = function (obj) {
//   var i = this.length;
//   while (i--) {
//     if (this[i] === obj) {
//       return true;
//     }
//   }
//   return false;
// }
