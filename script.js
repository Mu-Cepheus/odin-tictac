class Player {
    #name;
    #marker;
    constructor(argname, argMarker) {
        this.#name = argname;
        this.#marker = argMarker;
    }

    get name() {
        return this.#name;
    }

    set name(argName) {
        this.#name = argName;
    }

    get marker() {
        return this.#marker;
    }
}

let boardChildren = document.querySelector(".board").children;
let board = document.querySelector(".board");
let player1 = new Player("Player 1", "X");
let player2 = new Player("Player 2", "O");
let statusText = document.querySelector(".status>p");
let resetButton = document.querySelector("#reset");
let p1Button = document.querySelector("#p1Button");
let p2Button = document.querySelector("#p2Button");

class GameBoard {
    static #board = [[null, null, null], [null, null, null], [null, null, null]];
    static #lastMarker;

    static get lastMarker() {
        return this.#lastMarker;
    }

    static get board() {
        for (let i = 0; i < this.#board.length; i++) {
            console.log(`[${this.#board[i][0]}] [${this.#board[i][1]}] [${this.#board[i][2]}]`);
        }
        return this.#board.flat(Infinity);
    }

    static setBoardSpace(argData) {
        if (!(this.#board.some((row) => { return row.includes("O") || row.includes("X") })) && argData.marker !== "X") {
            throw new Error("First input must be X!");
        } else if (argData.row > 2 || argData.row < 0 || argData.column > 2 || argData.column < 0) {
            throw new Error("Invalid coordinates!")
        } else if (argData.marker !== "X" && argData.marker !== "O") {
            throw new Error("Invalid marker!");
        } else if (this.#lastMarker === argData.marker) {
            throw new Error("It is not your turn!")
        } else if (this.#board[argData.row][argData.column] !== null) {
            throw new Error("That space is taken!")
        } else {
            this.#board[argData.row][argData.column] = argData.marker;
            if (this.#board.every((row) => !row.includes(null))) {
                this.board;
                return { winStatus: "full", winMarker: null };
            } else {
                const winning = this.#checkWin(argData);
                this.#lastMarker = argData.marker;
                this.board;
                return winning;
            }
        }
    }

    static resetBoard() {
        this.#board = [[null, null, null], [null, null, null], [null, null, null]];
    }

    static #checkWin(argData) {
        switch (argData.row) {
            case 0:
                switch (argData.column) {
                    case 0:
                        if ((argData.marker === this.#board[0][1] && argData.marker === this.#board[0][2]) || (argData.marker === this.#board[1][0] && argData.marker === this.#board[2][0]) || (argData.marker === this.#board[1][1] && argData.marker === this.#board[2][2])) {
                            console.log(`${argData.marker} wins`)
                            return { winStatus: true, winMarker: argData.marker };
                        }
                        break;
                    case 1:
                        if ((argData.marker === this.#board[0][0] && argData.marker === this.#board[0][2]) || (argData.marker === this.#board[1][1] && argData.marker === this.#board[2][1])) {
                            console.log(`${argData.marker} wins`)
                            return { winStatus: true, winMarker: argData.marker };
                        }
                        break;
                    case 2:
                        if ((argData.marker === this.#board[0][1] && argData.marker === this.#board[0][0]) || (argData.marker === this.#board[1][2] && argData.marker === this.#board[2][2]) || (argData.marker === this.#board[1][1] && argData.marker === this.#board[2][0])) {
                            console.log(`${argData.marker} wins`)
                            return { winStatus: true, winMarker: argData.marker };
                        }
                        break;
                }
                break;
            case 1:
                switch (argData.column) {
                    case 0:
                        if ((argData.marker === this.#board[0][0] && argData.marker === this.#board[2][0]) || (argData.marker === this.#board[1][1] && argData.marker === this.#board[1][2])) {
                            console.log(`${argData.marker} wins`)
                            return { winStatus: true, winMarker: argData.marker };
                        }
                        break;
                    case 1:
                        if ((argData.marker === this.#board[0][1] && argData.marker === this.#board[2][1]) || (argData.marker === this.#board[1][0] && argData.marker === this.#board[1][2]) || (argData.marker === this.#board[0][0] && argData.marker === this.#board[2][2]) || (argData.marker === this.#board[0][2] && argData.marker === this.#board[2][0])) {
                            console.log(`${argData.marker} wins`)
                            return { winStatus: true, winMarker: argData.marker };
                        }
                        break;
                    case 2:
                        if ((argData.marker === this.#board[0][2] && argData.marker === this.#board[2][2]) || (argData.marker === this.#board[1][0] && argData.marker === this.#board[1][1])) {
                            console.log(`${argData.marker} wins`)
                            return { winStatus: true, winMarker: argData.marker };
                        }
                        break;
                }
                break;
            case 2:
                switch (argData.column) {
                    case 0:
                        if ((argData.marker === this.#board[0][0] && argData.marker === this.#board[1][0]) || (argData.marker === this.#board[2][1] && argData.marker === this.#board[2][2]) || (argData.marker === this.#board[1][1] && argData.marker === this.#board[0][2])) {
                            console.log(`${argData.marker} wins`)
                            return { winStatus: true, winMarker: argData.marker };
                        }
                        break;
                    case 1:
                        if ((argData.marker === this.#board[2][0] && argData.marker === this.#board[2][2]) || (argData.marker === this.#board[0][1] && argData.marker === this.#board[1][1])) {
                            console.log(`${argData.marker} wins`)
                            return { winStatus: true, winMarker: argData.marker };
                        }
                        break;
                    case 2:
                        if ((argData.marker === this.#board[0][2] && argData.marker === this.#board[1][2]) || (argData.marker === this.#board[2][0] && argData.marker === this.#board[2][1]) || (argData.marker === this.#board[0][0] && argData.marker === this.#board[1][1])) {
                            console.log(`${argData.marker} wins`)
                            return { winStatus: true, winMarker: argData.marker };
                        }
                        break;
                }
                break;
        }
        return { winStatus: false, winMarker: null };
    }
}

class DisplayController {
    static loadBoard() {
        let board = GameBoard.board;
        for (let i = 0; i < board.length; i++) {
            if (board[i]) {
                boardChildren[i].textContent = board[i];
            }
        }
    }

    static resetButton() {
        GameBoard.resetBoard();
        for (const element of boardChildren) {
            element.textContent = "";
        }
    }

    static nameChange(event) {
        event.preventDefault();
        let textBox;
        if (event.target.id === "p1Button") {
            textBox = document.querySelector("#player1");
            player1.name = textBox.value;
        } else {
            textBox = document.querySelector("#player2");
            player2.name = textBox.value;
        }
    }

    static placeMarker(event) {
        let target = event.target;
        let lastMarker = GameBoard.lastMarker;
        let currentMarker, winMarker;
        let winStatus = false;
        if ((!lastMarker || lastMarker === "O") && (event.target.textContent !== "X" || event.target.textContent !== "O")) {
            event.target.textContent = "X";
            currentMarker = "X";
            statusText.textContent = `${player2.name}'s turn`;
        } else if (lastMarker === "X" && (event.target.textContent !== "X" || event.target.textContent !== "O")) {
            event.target.textContent = "O"
            currentMarker = "O"
            statusText.textContent = `${player1.name}'s turn`;
        }
        switch (target.id) {
            case "space1":
                ({ winStatus, winMarker } = GameBoard.setBoardSpace({ row: 0, column: 0, marker: currentMarker }));
                break;
            case "space2":
                ({ winStatus, winMarker } = GameBoard.setBoardSpace({ row: 0, column: 1, marker: currentMarker }));
                break;
            case "space3":
                ({ winStatus, winMarker } = GameBoard.setBoardSpace({ row: 0, column: 2, marker: currentMarker }));
                break;
            case "space4":
                ({ winStatus, winMarker } = GameBoard.setBoardSpace({ row: 1, column: 0, marker: currentMarker }));
                break;
            case "space5":
                ({ winStatus, winMarker } = GameBoard.setBoardSpace({ row: 1, column: 1, marker: currentMarker }));
                break;
            case "space6":
                ({ winStatus, winMarker } = GameBoard.setBoardSpace({ row: 1, column: 2, marker: currentMarker }));
                break;
            case "space7":
                ({ winStatus, winMarker } = GameBoard.setBoardSpace({ row: 2, column: 0, marker: currentMarker }));
                break;
            case "space8":
                ({ winStatus, winMarker } = GameBoard.setBoardSpace({ row: 2, column: 1, marker: currentMarker }));
                break;
            case "space9":
                ({ winStatus, winMarker } = GameBoard.setBoardSpace({ row: 2, column: 2, marker: currentMarker }));
                break;
        }
        if (winStatus === true && winMarker) {
            if (winMarker === "X") {
                statusText.textContent = `${player1.name} wins`;
            } else {
                statusText.textContent = `${player2.name} wins`;
            }
        } else if (winStatus === "full") {
            statusText.textContent = `board is full`;
        }
    }
}

board.addEventListener("click", DisplayController.placeMarker)
resetButton.addEventListener("click", DisplayController.resetButton)
p1Button.addEventListener("click", DisplayController.nameChange)
p2Button.addEventListener("click", DisplayController.nameChange)