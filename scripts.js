let state = (selected, by) => {
    return {selected, by}
}
let currentPlayer;

const gameBoard = (() => {
    const gameBoardElement = document.querySelector(".gameboard");
    let gameBoardStates = [];

    const createNewBoard = () => {
        // Clear any previous board
        while (gameBoardElement.firstChild){
            gameBoardElement.removeChild(gameBoardElement.firstChild)
        }
        
        // set game board states array to contain state objects that all default to selected equals false
        for (let i = 0; i < 9; i++) {
            gameBoardStates.push(state(false));
            let block = document.createElement("div");
            block.classList.add("board-block");
            block.dataset.index = i;
            gameBoardElement.appendChild(block);
        }
        gameBoardElement.classList.add('gameboard-on');
    }
    return {createNewBoard, gameBoardStates}
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
    const newGame = document.querySelector('.new-game-button');
    let currentPlayerDisplay = document.querySelector('.current-player');
    
    const player1 = createPlayer("matt", 1);
    const player2 = createPlayer("computer", 2);
    currentPlayer = player1;
    

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
        currentPlayerDisplay.innerHTML = currentPlayer.name;
        const boardBlocks = document.querySelectorAll('.board-block');
        boardBlocks.forEach(item => {
            item.addEventListener('click', () => {
                if (item.innerHTML != ""){
                    return
                } else {
                    gameBoard.gameBoardStates[item.dataset.index] = state(true, currentPlayer.playerNum);
                    
                }
                displayController.displayContent(boardBlocks);
                changeTurns();
                currentPlayerDisplay.innerHTML = currentPlayer.name;
                console.log("current player is " + currentPlayer.name)
            
                
            })
            
        })
    
    }

    newGame.addEventListener('click', () => {
        gameBoard.createNewBoard();
        startGame();
    })

})();

