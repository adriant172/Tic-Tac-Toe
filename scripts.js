let currentPlayer;

const gameBoard = ((currentPlayer) => {
    const gameBoardElement = document.querySelector(".gameboard");
    let gameBoardContent = [];

    const createNewBoard = () => {
        // Clear any previous board
        while (gameBoardElement.firstChild){
            gameBoardElement.removeChild(gameBoardElement.firstChild)
        }
        // create each board block with event listeners that will change the state of the board based on the current player
        for (let i = 0; i > 9; i++) {
            gameBoardContent.push("");
            let block = document.createElement("div");
            block.classList.add("boardBlock");
            block.dataset.index = i;
            block.addEventListener('click', () => {
                if (block.innerHTML != ""){
                    return
                }
                if (currentPlayer == "player1"){
                    gameBoardContent[block.dataset.index] = "X";
                }
                if (currentPlayer == "player2") {
                    gameBoardContent[block.dataset.index] = "O";
                }
                displayBoardContent();
            })
            gameBoardElement.appendChild(block);
        }
    }

    const displayBoardContent = () => {
        const boardBlocks = document.querySelectorAll('.boardBlock');
        let counter = 0;
        for (block of boardBlocks){
            block.innerHTML = gameBoardContent[counter];
            counter++;
        }
    }
})();



