/**
 * @jest-environment jsdom
 */
const { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn } = require('../game');

jest.spyOn(window, 'alert').mockImplementation(() => {});

beforeAll(() => {
    let fs = require('fs');
    let fileContents = fs.readFileSync('index.html', 'utf-8');
    document.open();
    document.write(fileContents);
    document.close();
});

describe('Check the game object contains the correct keys.', () => {
    test('The score key exists.', () => { 
        expect('score' in game).toBe(true);
    });
    test('The currentGame key exists.', () => { 
        expect('currentGame' in game).toBe(true);
    });
    test('The playerMoves key exists.', () => { 
        expect('playerMoves' in game).toBe(true);
    });
    test('The choices key exists.', () => { 
        expect('choices' in game).toBe(true);
    });
    test('The choices key contains the correct ids.', () => {
        expect(game.choices).toEqual(['button1', 'button2', 'button3', 'button4']);
    });
    test('The turnNumber key exists.', () => {
        expect('turnNumber' in game).toBe(true);
    });
});

describe('Check newGame works correctly.', () => {
    beforeAll(() => {
        game.score = 42;
        game.playerMoves = ['button1', 'button2'];
        game.currentGame = ['button1', 'button2'];
        document.getElementById('score').innerText = '81';
        newGame();
    });
    test('Should set the game score to zero.', () => {
        expect(game.score).toEqual(0);
    });
    test('Should be one element in currentGame array.', () => {
        expect(game.currentGame.length).toBe(1);
    });
    test('Should clear playerMoves array.', () => {
        expect(game.playerMoves.length).toBe(0);
    });
    test('Should display 0 for element with id score.', () => {
        expect(document.getElementById('score').innerText).toEqual(0);
    });
    test('Expect data-listener to be true.', () => {
        newGame();
        const elements = document.getElementsByClassName('circle');
        for (let element of elements) {
            expect(element.getAttribute('data-listener')).toEqual('true');
        }
    });
});

describe('Check gameplay works properly.', () => {
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });
    test('The addTurn function adds a new turn to the game.', () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test('Should add correct class to light up button.', () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain('light');
    });
    test('The showTurns function should update game.turnNumber.', () => {
        game.turnNumber = 81;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
    test('Should increment the score if the turn is correct.', () => {
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.score).toBe(1);
    });
    test('Should call an alert if the move is wrong.', () => {
        game.playerMoves.push('wrong');
        playerTurn();
        expect(window.alert).toBeCalledWith('Wrong Move!');
    });
});