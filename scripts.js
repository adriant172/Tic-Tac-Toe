let currentPlayer;

const gameBoard = (() => {
    const gameBoardElement = document.querySelector(".gameboard");
    let gameBoardContent = [];

    const createNewBoard = () => {
        // Clear any previous board
        while (gameBoardElement.firstChild){
            gameBoardElement.removeChild(gameBoardElement.firstChild)
        }
        // create each board block with event listeners that will change the state of the board based on the current player
        for (let i = 0; i < 9; i++) {
            gameBoardContent.push("");
            let block = document.createElement("div");
            block.classList.add("board-block");
            block.dataset.index = i;
            // block.addEventListener('click', () => {
            //     if (block.innerHTML != ""){
            //         return
            //     }
            //     if (currentPlayer == "player1"){
            //         gameBoardContent[block.dataset.index] = "X";
            //     }
            //     if (currentPlayer == "player2") {
            //         gameBoardContent[block.dataset.index] = "O";
            //     }
            //     displayBoardContent();
            // })
            gameBoardElement.appendChild(block);
        }
        gameBoardElement.classList.add('gameboard-on');
    }

    const displayBoardContent = (boardBlocks) => {
        // const boardBlocks = document.querySelectorAll('.boardBlock');
        let counter = 0;
        for (block of boardBlocks){
            block.innerHTML = gameBoardContent[counter];
            counter++;
        }
    }
    return {createNewBoard, displayBoardContent}
})();

// gameBoard.createNewBoard();


const createPlayer = (name) => {
    const winMessage = `Congrats ${name}! You Win`;

    return {name, winMessage}
}

const gameFlow = (() => {
    const newGame = document.querySelector('.new-game-button');
    const player1 = createPlayer("matt");
    const player2 = createPlayer("computer");

    const start = () => { newGame.addEventListener('click', () => {
        gameBoard.createNewBoard();
        startGame();
    })} 

    

    const changeTurns = () => {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        }
        if (currentPlayer === player2){
            currentPlayer = player1;
        }
    }

    const startGame = () => {
        const boardBlocks = document.querySelectorAll('.boardBlock');
        currentPlayer = player1;
        boardBlocks.forEach(item => {
            item.addEventListener('click', () => {
                if (item.innerHTML != ""){
                    return
                }
                if (currentPlayer == "player1"){
                    gameBoardContent[item.dataset.index] = "X";
                    changeTurns()
                }
                if (currentPlayer == "player2") {
                    gameBoardContent[item.dataset.index] = "O";
                    changeTurns()
                }
                displayBoardContent(boardBlocks);
            })
        })

    }
    return {start}

})();

gameFlow();

