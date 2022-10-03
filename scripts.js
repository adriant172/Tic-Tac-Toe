
const gameBoard = (() => {
    const gameBoardElement = document.querySelector(".gameboard");
    let gameBoardStates = [];
    let state = () => {
        let selected = false;
        let by = "";
        return {selected, by}
    }

    const createNewBoard = () => {
        // Clear any previous board
        while (gameBoardElement.firstChild){
            gameBoardElement.removeChild(gameBoardElement.firstChild)
        }
        
        // create each board block with event listeners that will change the state of the board based on the current player
        for (let i = 0; i < 9; i++) {
            gameBoardStates.push(state);
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
    return {createNewBoard, displayBoardContent, gameBoardStates}
})();

// gameBoard.createNewBoard();


const createPlayer = (name, marker) => {
    const winMessage = `Congrats ${name}! You Win`;
    

    return {name, winMessage, marker}
}


const gameFlow = (() => {
    const newGame = document.querySelector('.new-game-button');
    let gameBoardContent = [];

    const player1 = createPlayer("matt", "X");
    const player2 = createPlayer("computer", "O");
    let currentPlayer = player1;

    const changeTurns = () => {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        }
        if (currentPlayer === player2){
            currentPlayer = player1;
        }
        console.log("current player is" + currentPlayer)
    }
    
    const startGame = () => {
        const boardBlocks = document.querySelectorAll('.board-block');
        boardBlocks.forEach(item => {
            item.addEventListener('click', () => {
                if (item.innerHTML != ""){
                    return
                } else {
                    gameBoard.gameBoardContent[item.dataset.index] = currentPlayer.marker;
                    
                }
                gameBoard.displayBoardContent(boardBlocks);      
                
            })
            changeTurns();
        })
    
    }

    newGame.addEventListener('click', () => {
        gameBoard.createNewBoard();
        startGame();
    })

})();

