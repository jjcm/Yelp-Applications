function Board(){
    var XLENGTH = 7;
    var YLENGTH = 6;
    var numberOfMoves = 0;
    var firstPlayersTurn = true;
    /*init the 2d array that will store the board's current state*/
    this.plays = new Array(XLENGTH);

    var i = this.plays.length;
    while (i--){
        this.plays[i] = new Array;
    }

    //drops a piece into a column, iff the column is not at the max height.
    this.dropInColumn = function(columnNumber){
        if(columnNumber >= XLENGTH) return false;
        if(this.checkColumnHeight(columnNumber) >= YLENGTH) return false;

        this.plays[columnNumber].push(firstPlayersTurn);
        //incriment the number of moves
        numberOfMoves++;

        //check to see if the move was a winning move
        if(this.checkWinningMove(columnNumber))
            win();
        //toggle to the next player's turn
        firstPlayersTurn = !firstPlayersTurn;

        return true;
    } 

    //checks the column height at any location of the board.
    this.checkColumnHeight = function(columnNumber){
        return this.plays[columnNumber].length;
    }

    //checks if the last move was a winning move. Takes in the column number of the last play as an argument.
    this.checkWinningMove = function(columnNumber){
        /* Have to check for solutions along four axis ( |, /, -, and \ ), each iteration here tests to see if an axis has a solution, and if so returns true. If not, it returns false; */

        //return false if we don't have enough moves queued to create a solution;
        if(numberOfMoves < 7) return false; 

        //find out who just played (can't use the variable firstPlayersTurn to check, just in case this is called out of the context of a game);
        var lastTurn = this.plays[columnNumber][this.plays[columnNumber].length - 1];

        //Check  | 
        if(this.checkColumnHeight(columnNumber) >= 4){
            var i = this.checkColumnHeight(columnNumber);
            var inARow=0;
            while(i--){
                if(this.plays[columnNumber][i] == lastTurn){
                    inARow++;
                    if(inARow == 4) return true; 
                }
                else break;
            }
        }
        return false;
    }
    
    var win = function(){
        //alert('Player ' + ( firstPlayersTurn ? 'one ' : 'two ' ) + 'has won.');
    }
}



    

    
    


