new Test.Unit.Runner({
    setup: function() {
    },

    teardown: function() {
    },

    testObjectCreation: function() { with(this) {
        var x = new Board();
        assert(typeof(x) == 'object');
    }},

    testColumnDrop: function() { with(this) {
        var x = new Board();
        assert(x.dropInColumn(0));
        
        x = new Board();
        var i = 6;
        while(i--)
            x.dropInColumn(0);
        //column is now full, so it should return false if we try to place another piece in that column
        assert(!x.dropInColumn(0));

        //shouldn't be able to drop outside of the size of the board
        assert(!x.dropInColumn(7));
    }},

    testTurnCounter: function() { with(this) {
        var x = new Board();
        assert(x.getTurnCounter() == 0);
        x.dropInColumn(0);
        assert(x.getTurnCounter() == 1);
    }},

    testCheckColumnHeight: function() { with(this) {
        var x = new Board();
        assert(x.getColumnHeight(0) == 0);

        x.dropInColumn(0);
        assert(x.getColumnHeight(0) == 1);
    }},


    /*
     * Test vertical, aka |
     */
    testVerticalWin: function() { with(this) {
        var x = new Board();
        //test empty column
        assert(!x.checkWinningMove(0));

        /* Arrange board like so
         *  0 1 2 3 4 5 6
         * | | | | | | | |
         * | | | | | | | |
         * | | | | | | | |
         * | | | | | | | |
         * |x|o| | | | | |
         * |x|o| | | | | |
         * |x|o| | | | | |
         *
         * should not be a win in column 0
         */
        var i = 3;
        while(i--){
            x.dropInColumn(0);
            x.dropInColumn(1);
        }
        //should only be 3 in a row
        assert(!x.checkWinningMove(0));

        //drop a fourth in column 0, should be a winning move for player 1 (x)
        x.dropInColumn(0);
        assert(x.checkWinningMove(0));

        //drop a fourth in column 0, should be a winning move for player 2 (o)
        x.dropInColumn(1);
        assert(x.checkWinningMove(1));

        x = new Board();
        /* Arrange board like so
         *  0 1 2 3 4 5 6
         * | | | | | | | |
         * | | | | | | | |
         * |x| | | | | | |
         * |x| | | | | | |
         * |x| | | | | | |
         * |o|o| | | | | |
         * |x|o| | | | | |
         *
         * should not be a win in column 0
         */
        x.dropInColumn(0); //x
        x.dropInColumn(0); //o
        x.dropInColumn(0); //x
        x.dropInColumn(1); //o
        x.dropInColumn(0); //x
        x.dropInColumn(1); //o
        x.dropInColumn(0); //x
        assert(!x.checkWinningMove(0));
    }},

    /*
     * Test diagonal left, aka /
     */
    testDiagonalLeftWin: function() { with(this) {
        var x = new Board();
        //test empty column
        assert(!x.checkWinningMove(0));

        /* Arrange board like so
         *  0 1 2 3 4 5 6
         * | | | | | | | |
         * | | | | | | | |
         * | | | | | | | |
         * | | | | | | | |
         * | | |x|o| | | |
         * | |x|o|o| | | |
         * |x|o|o|x|x| | |
         *
         * should not be a win in column 3
         */

        x.dropInColumn(0); //x
        x.dropInColumn(1); //o
        x.dropInColumn(1); //x
        x.dropInColumn(2); //o
        x.dropInColumn(3); //x
        x.dropInColumn(2); //o
        x.dropInColumn(2); //x
        x.dropInColumn(3); //o
        x.dropInColumn(4); //x
        x.dropInColumn(3); //o

        //should only be 3 in a row
        assert(!x.checkWinningMove(2));

        //should be a winning move
        x.dropInColumn(3) //x
        assert(x.checkWinningMove(3));

        x = new Board();
        /* Arrange board like so
         *  0 1 2 3 4 5 6
         * | | | | | | | |
         * | | | | | | | |
         * | | | | | | | |
         * | | | |x| | | |
         * | | |x|o| | | |
         * | |o|o|o| | | |
         * |x|o|x|x|x| | |
         *
         * should not be a win in column 3
         */

        x.dropInColumn(0); //x
        x.dropInColumn(1); //o
        x.dropInColumn(2); //x
        x.dropInColumn(1); //o
        x.dropInColumn(3); //x
        x.dropInColumn(2); //o
        x.dropInColumn(2); //x
        x.dropInColumn(3); //o
        x.dropInColumn(4); //x
        x.dropInColumn(3); //o
        x.dropInColumn(3); //x

        assert(!x.checkWinningMove(3));
    }},

    /*
     * Test horizontal, aka -
     */
    testHorizontalWin: function() { with(this) {
        var x = new Board();
        //test empty column
        assert(!x.checkWinningMove(0));

        /* Arrange board like so
         *  0 1 2 3 4 5 6
         * | | | | | | | |
         * | | | | | | | |
         * | | | | | | | |
         * | | | | | | | |
         * | | | | | | | |
         * |o|o|o| | | | |
         * |x|x|x| | | | |
         *
         * should not be a win 
         */
        var i = 3;
        while(i--){
            x.dropInColumn(i);
            x.dropInColumn(i);
        }
        //should only be 3 in a row
        assert(!x.checkWinningMove(2));

        //drop a fourth in column 0, should be a winning move for player 1
        x.dropInColumn(3);
        assert(x.checkWinningMove(3));

        //should be a winning move for player 2
        x.dropInColumn(3);
        assert(x.checkWinningMove(3));

        x = new Board();
        /* Arrange board like so
         *  0 1 2 3 4 5 6
         * | | | | | | | |
         * | | | | | | | |
         * | | | | | | | |
         * | | | | | | | |
         * | | | | | | | |
         * |o|x|o| | | | |
         * |x|o|x|x| | | |
         *
         * should not be a win for player 1
         */
        x.dropInColumn(0); //x
        x.dropInColumn(1); //o
        x.dropInColumn(1); //x
        x.dropInColumn(0); //o
        x.dropInColumn(2); //x
        x.dropInColumn(2); //o
        x.dropInColumn(3); //x
        assert(!x.checkWinningMove(3));

        //should not be a win for player 2
        x.dropInColumn(3); //o 
        assert(!x.checkWinningMove(3));
    }},

    /*
     * Test diagonal right, aka \
     */
    testDiagonalRightWin: function() { with(this) {
        var x = new Board();
        //test empty column
        assert(!x.checkWinningMove(0));

        /* Arrange board like so
         *  0 1 2 3 4 5 6
         * | | | | | | | |
         * | | | | | | | |
         * | | | | | | | |
         * | | | | | | | |
         * | | |o|x| | | |
         * | | |o|o|x| | |
         * | |x|x|o|o|x| |
         *
         * should not be a win in column 3
         */

        x.dropInColumn(5); //x
        x.dropInColumn(4); //o
        x.dropInColumn(4); //x
        x.dropInColumn(3); //o
        x.dropInColumn(2); //x
        x.dropInColumn(3); //o
        x.dropInColumn(3); //x
        x.dropInColumn(2); //o
        x.dropInColumn(1); //x
        x.dropInColumn(2); //o

        //should only be 3 in a row
        assert(!x.checkWinningMove(3));

        //should be a winning move
        x.dropInColumn(2) //x
        assert(x.checkWinningMove(2));

        x = new Board();
        /* Arrange board like so
         *  0 1 2 3 4 5 6
         * | | | | | | | |
         * | | | | | | | |
         * | | | | | | | |
         * | | |x| | | | |
         * | | |o|x| | | |
         * | | |o|o|o| | |
         * | |x|x|x|o|x| |
         *
         * should not be a win in column 3
         */

        x.dropInColumn(5); //x
        x.dropInColumn(4); //o
        x.dropInColumn(3); //x
        x.dropInColumn(4); //o
        x.dropInColumn(2); //x
        x.dropInColumn(3); //o
        x.dropInColumn(3); //x
        x.dropInColumn(2); //o
        x.dropInColumn(1); //x
        x.dropInColumn(2); //o
        x.dropInColumn(2); //x

        assert(!x.checkWinningMove(2));
    }},

    /*



    test: function() { with(this) {
    }},



    */
}); 
