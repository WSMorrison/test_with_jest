let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    choices: ['button1', 'button2', 'button3', 'button4'],
}

function newGame() {
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
}

module.exports = { game, newGame };