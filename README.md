# Tic-Tac-Toe
This is a simple tic-tac-toe game that can be played in your browser

This project took quite some time to complete due to several reworks of the structure of the logic. I eventually decided to go with a Model - View type of workflow. Where I capture the states and the associated player of each block/space within the game board in one array. However I construct another array with that references this state data in order to display the corresponding markers in the html itself. 
