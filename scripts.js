let state = (selected, by) => {
    return {selected, by}
}
let currentPlayer;

const gameBoard = (() => {
    const gameBoardElement = document.querySelector(".gameboard");
    let gameBoardStates = [];
    
    const clearBoard = () => {
        while (gameBoardElement.firstChild){
            gameBoardElement.removeChild(gameBoardElement.firstChild)
        }
        gameBoardElement.classList.remove('gameboard-on')
    }

    const createNewBoard = () => {
        // Clear any previous board
        clearBoard();
        
        // set game board states array to contain state objects that all default to selected equals false
        for (let i = 0; i < 9; i++) {
            gameBoardStates[i] = state(false);
            let block = document.createElement("div");
            block.classList.add("board-block");
            block.dataset.index = i;
            gameBoardElement.appendChild(block);
        }
        gameBoardElement.classList.add('gameboard-on');
        
    }
    return {createNewBoard, gameBoardStates, clearBoard}
})();



const displayController = (() => {
    function displayContent(boardBlocks){
        // const boardBlocks = document.querySelectorAll('.boardBlock');
        let gameBoardContent = [];
        for (let i = 0; i < gameBoard.gameBoardStates.length; i++) {
            if (gameBoard.gameBoardStates[i].selected === true) {
                if(gameBoard.gameBoardStates[i].by == 1) {
                    gameBoardContent.push("X");
                } else {
                    gameBoardContent.push("O");
                }
            }else {
                gameBoardContent.push("");
            }
        }
        for (block of boardBlocks){
            block.innerHTML = gameBoardContent[block.dataset.index];
        }
    }
    return{displayContent}
})();


const createPlayer = (name, playerNum) => {
    const winMessage = `Congrats ${name}! You Win`;
    return {name, winMessage, playerNum}
}


const gameFlow = (() => {
    const twoPlayerGame = document.querySelector('.two-player-game');
    const startGameButton = document.querySelector('.start-game-button');
    const playerNameInput = document.querySelector('#player-names');
    let currentPlayerDisplay = document.querySelector('.current-player');
    
    let player1;
    let player2;
    // currentPlayer = player1;

    function arrayEquals(a, b) {
        return Array.isArray(a) &&
          Array.isArray(b) &&
          a.length === b.length &&
          a.every((val, index) => val === b[index]);
      }


    function winCheck() {
        const playerPlacement = gameBoard.gameBoardStates.map( x => {
            return x.by
        })
        const winCombinations = [[0,1,2], [3,4,5], [6,7,8], [0,4,8], [2,4,6], [0,3,6], [1,4,7], [2,5,8]];
        for (let i = 0; i < winCombinations.length; i++) {
            let gameBoardSlice = winCombinations[i].map(x => playerPlacement[x])
            if (arrayEquals(gameBoardSlice, [1, 1, 1])) {
                return 1
            }
            if (arrayEquals(gameBoardSlice, [2,2,2])) {
                return 2
            }
        }
        
    }

    function tieCheck() {
        const gameBoardStates = gameBoard.gameBoardStates
        for (block of gameBoardStates) {
            if (block.selected == false) {
                return 0
            }  
        }
        return 1
    }

    function changeTurns() {
        if (currentPlayer.playerNum === 1) {
            currentPlayer = player2;
            return
        }
        if (currentPlayer.playerNum === 2){
            currentPlayer = player1;
            return
        }
    }
    
    const startGame = () => {
        currentPlayerDisplay.innerHTML = currentPlayer.name + " please begin!";
        const boardBlocks = document.querySelectorAll('.board-block');
        const overlay = document.querySelector('.overlay')
        const gameOverPrompt = document.querySelector('.gameover-message');
        const resetButton = document.querySelector('.reset-game');
        const twoPlayerGameOverButton = document.querySelector('.game-over-button');
        

        twoPlayerGameOverButton.addEventListener('click', () => {
            overlay.style.display = "";
            playerNameInput.style.display = "flex";
            gameBoard.clearBoard()
            currentPlayerDisplay.innerHTML = "";
        })
        resetButton.addEventListener('click', () => {
            overlay.style.display = "";
            gameBoard.createNewBoard();
            currentPlayer = player1;
            startGame();
        })

        boardBlocks.forEach(item => {
            item.addEventListener('click', () => {
                if (item.innerHTML != ""){
                    return
                } else {
                    gameBoard.gameBoardStates[item.dataset.index] = state(true, currentPlayer.playerNum);
                    
                }
                displayController.displayContent(boardBlocks);

                changeTurns();
                let winResult = winCheck();
                let tieResult = tieCheck();

                setTimeout(() => {if (winResult == 1) {
                    overlay.style.display = "flex";
                    gameOverPrompt.innerHTML = player1.winMessage;
                    
                }
                if (winResult == 2) {
                    overlay.style.display = "flex";
                    gameOverPrompt.innerHTML = player2.winMessage;
                }
                if (tieResult == 1) {
                    overlay.style.display = "flex";
                    gameOverPrompt.innerHTML = "Looks like its a Tie!!"
                }
            }, 250)
                currentPlayerDisplay.innerHTML = currentPlayer.name + "'s turn";
                console.log("current player is " + currentPlayer.name)
                
            })
            
        })
    
    }

    twoPlayerGame.addEventListener('click', () => {
        playerNameInput.style.display = "flex";

    })

    startGameButton.addEventListener('click', () => {
        let playerOneName = document.querySelector('#player1');
        let playerTwoName = document.querySelector('#player2');
        if (playerOneName.value == "") {
            playerOneName.value = "Player 1";
        }
        if (playerTwoName.value == "") {
            playerTwoName.value = "Player 2";
        }

        player1 = createPlayer(playerOneName.value, 1);
        player2 = createPlayer(playerTwoName.value, 2);
        currentPlayer = player1;

        gameBoard.createNewBoard();
        startGame();
        playerNameInput.style.display = "";
        playerOneName.value = "";
        playerTwoName.value = "";


    })

    return {winCheck}
})();

