//player objects storing player name? and player marker
function createPlayer(argName, argMarker) {
    const name = argName
    const marker = argMarker;

    return { "name": argName, "marker": argMarker };
}

let boardChildren = document.querySelector(".board").children;
let board = document.querySelector(".board");
let player1 = createPlayer("Player 1", "X");
let player2 = createPlayer("Player 2", "O");
let statusText = document.querySelector(".status>p");
let resetButton = document.querySelector("#reset");
let p1Button = document.querySelector("#p1Button");
let p2Button = document.querySelector("#p2Button");

const gameBoard = (function () {
    let board = [[null, null, null], [null, null, null], [null, null, null]]
    let lastMarker;

    function getLastMarker() {
        return lastMarker;
    }

    function checkWin(argRow, argCol, argMarker) {
        switch (argRow) {
            case 0:
                switch (argCol) {
                    case 0:
                        if ((argMarker === board[0][1] && argMarker === board[0][2]) || (argMarker === board[1][0] && argMarker === board[2][0]) || (argMarker === board[1][1] && argMarker === board[2][2])) {
                            console.log(`${argMarker} wins`)
                            return { winStatus: true, winMarker: argMarker };
                        }
                        break;
                    case 1:
                        if ((argMarker === board[0][0] && argMarker === board[0][2]) || (argMarker === board[1][1] && argMarker === board[2][1])) {
                            console.log(`${argMarker} wins`)
                            return { winStatus: true, winMarker: argMarker };
                        }
                        break;
                    case 2:
                        if ((argMarker === board[0][1] && argMarker === board[0][0]) || (argMarker === board[1][2] && argMarker === board[2][2]) || (argMarker === board[1][1] && argMarker === board[2][0])) {
                            console.log(`${argMarker} wins`)
                            return { winStatus: true, winMarker: argMarker };
                        }
                        break;
                }
                break;
            case 1:
                switch (argCol) {
                    case 0:
                        if ((argMarker === board[0][0] && argMarker === board[2][0]) || (argMarker === board[1][1] && argMarker === board[1][2])) {
                            console.log(`${argMarker} wins`)
                            return { winStatus: true, winMarker: argMarker };
                        }
                        break;
                    case 1:
                        if ((argMarker === board[0][1] && argMarker === board[2][1]) || (argMarker === board[1][0] && argMarker === board[1][2]) || (argMarker === board[0][0] && argMarker === board[2][2]) || (argMarker === board[0][2] && argMarker === board[2][0])) {
                            console.log(`${argMarker} wins`)
                            return { winStatus: true, winMarker: argMarker };
                        }
                        break;
                    case 2:
                        if ((argMarker === board[0][2] && argMarker === board[2][2]) || (argMarker === board[1][0] && argMarker === board[1][1])) {
                            console.log(`${argMarker} wins`)
                            return { winStatus: true, winMarker: argMarker };
                        }
                        break;
                }
                break;
            case 2:
                switch (argCol) {
                    case 0:
                        if ((argMarker === board[0][0] && argMarker === board[1][0]) || (argMarker === board[2][1] && argMarker === board[2][2]) || (argMarker === board[1][1] && argMarker === board[0][2])) {
                            console.log(`${argMarker} wins`)
                            return { winStatus: true, winMarker: argMarker };
                        }
                        break;
                    case 1:
                        if ((argMarker === board[2][0] && argMarker === board[2][2]) || (argMarker === board[0][1] && argMarker === board[1][1])) {
                            console.log(`${argMarker} wins`)
                            return { winStatus: true, winMarker: argMarker };
                        }
                        break;
                    case 2:
                        if ((argMarker === board[0][2] && argMarker === board[1][2]) || (argMarker === board[2][0] && argMarker === board[2][1]) || (argMarker === board[0][0] && argMarker === board[1][1])) {
                            console.log(`${argMarker} wins`)
                            return { winStatus: true, winMarker: argMarker };
                        }
                        break;
                }
                break;
        }
        return { winStatus: false, winMarker: null };
    }

    const getBoard = function () {
        for (let i = 0; i < board.length; i++) {
            console.log(`[${board[i][0]}] [${board[i][1]}] [${board[i][2]}]`);
        }
        return board.flat(Infinity);
    };

    const setBoard = function (argRow, argCol, argMarker) {
        if (!(board.some((row) => { return row.includes("O") || row.includes("X") })) && argMarker !== "X") {
            throw new Error("First input must be X!");
        } else if (argRow > 2 || argRow < 0 || argCol > 2 || argCol < 0) {
            throw new Error("Invalid coordinates!")
        } else if (argMarker !== "X" && argMarker !== "O") {
            throw new Error("Invalid marker!");
        } else if (lastMarker === argMarker) {
            throw new Error("It is not your turn!")
        } else if (board[argRow][argCol] !== null) {
            throw new Error("That space is taken!")
        } else {
            board[argRow][argCol] = argMarker;
            if (board.every((row) => !row.includes(null))) {
                getBoard();
                return { winStatus: "full", winMarker: null };
            } else {
                const winning = checkWin(argRow, argCol, argMarker);
                lastMarker = argMarker;
                getBoard();
                return winning;
            }
        }
    }

    const resetBoard = function () {
        board = [[null, null, null], [null, null, null], [null, null, null]];
    }

    return { getBoard, setBoard, resetBoard, getLastMarker }
})();

const displayController = (function () {
    const loadBoard = function () {
        let board = gameBoard.getBoard();
        for (let i = 0; i < board.length; i++) {
            if (board[i]) {
                boardChildren[i].textContent = board[i];
            }
        }
    };

    const resetButton = function () {
        gameBoard.resetBoard();
        for (const element of boardChildren) {
            element.textContent = "";
        }
    };

    const nameChange = function (event) {
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

    const placeMarker = function (event) {
        let target = event.target;
        let lastMarker = gameBoard.getLastMarker();
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
                ({ winStatus, winMarker } = gameBoard.setBoard(0, 0, currentMarker));
                break;
            case "space2":
                ({ winStatus, winMarker } = gameBoard.setBoard(0, 1, currentMarker));
                break;
            case "space3":
                ({ winStatus, winMarker } = gameBoard.setBoard(0, 2, currentMarker));
                break;
            case "space4":
                ({ winStatus, winMarker } = gameBoard.setBoard(1, 0, currentMarker));
                break;
            case "space5":
                ({ winStatus, winMarker } = gameBoard.setBoard(1, 1, currentMarker));
                break;
            case "space6":
                ({ winStatus, winMarker } = gameBoard.setBoard(1, 2, currentMarker));
                break;
            case "space7":
                ({ winStatus, winMarker } = gameBoard.setBoard(2, 0, currentMarker));
                break;
            case "space8":
                ({ winStatus, winMarker } = gameBoard.setBoard(2, 1, currentMarker));
                break;
            case "space9":
                ({ winStatus, winMarker } = gameBoard.setBoard(2, 2, currentMarker));
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
    };

    return { loadBoard, placeMarker, resetButton, nameChange }
})();

board.addEventListener("click", displayController.placeMarker)
resetButton.addEventListener("click", displayController.resetButton)
p1Button.addEventListener("click", displayController.nameChange)
p2Button.addEventListener("click", displayController.nameChange)