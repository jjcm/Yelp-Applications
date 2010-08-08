function Board(){
    /*init the 2d array that will store the board's current state*/
    this.plays = new Array(7);

    var i = this.plays.length;
    while (i--){
        this.plays[i] = new Array;
    }
}

//drops a piece into a column, iff the column is not at the max height.
Board.prototype.dropInColumn = function(columnNumber){
    return false;
} 

//checks the column height at any location of the board.
Board.prototype.checkColumnHeight = function(columnNumber){
    return false;
}

//checks if the last move was a winning move. Takes in the column number of the last play as an argument.
Board.prototype.checkWinningMove = function(columnNumber){
    return false;
}


    

    
    


