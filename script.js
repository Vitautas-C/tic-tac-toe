const info = document.querySelector(".info")
const nextPlayer = document.querySelector(".next")

const linesEl = document.querySelector(".lines")

const cells = document.querySelectorAll(".cell")


const gameState = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]


const lines = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]],
]


let readyPlayer1 = true
renderGameState()

cells.forEach((cell, index) => cell.onclick = () => {
    const move = makeMove(index)
    if (!move) return

    renderGameState()
    winner = checkForWinner()
    if (!winner) return
    const [player, lineIndex] = winner
    announceWinner(player)
    setLineActive(lineIndex)
    cells.forEach((cell) => cell.onclick = null)
    nextPlayer.className = "next"
})


function announceWinner(player) {
    info.classList.add("active")
    info.firstChild.innerText = player
}


function renderGameState() {
    gameState.forEach((row, i) => {
        row.forEach((cell, j) => {
            if (cell === 0) {
                cells[i * 3 + j].classList.add("zero")
            } else if (cell == 1) {
                cells[i * 3 + j].classList.add("cross")
            }
        })
    })
    readyPlayer1 === true ? nextPlayer.classList.add("cross") : nextPlayer.classList.remove("cross")
    readyPlayer1 === false ? nextPlayer.classList.add("zero") : nextPlayer.classList.remove("zero")
}


function checkForWinner() {
    const linesValues = lines.map(line => line.map(([i, j]) => gameState[i][j]).join(""))

    for (let i = 0; i < linesValues.length; i++) {
        if (linesValues[i] == "111") {
            return ["Cross", i]
        } else if (linesValues[i] == "000") {
            return ["Zero", i]
        }
    }
}


function setLineActive(index) {
    linesEl.children[index].classList.add("active", readyPlayer1 ? "red" : "blue")
}


function makeMove(index) {
    const i = Math.floor(index / 3)
    const j = index % 3

    if (gameState[i][j] !== null) return false

    if (readyPlayer1) {
        gameState[i][j] = 1
        readyPlayer1 = false
    } else {
        gameState[i][j] = 0
        readyPlayer1 = true
    }
    return true
}

