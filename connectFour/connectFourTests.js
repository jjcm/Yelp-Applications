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
    }},

    testCheckColumnHeight: function() { with(this) {
        var x = new Board();
        assert(x.checkColumnHeight(0) == 0);

        x.dropInColumn(0);
        assert(x.checkColumnHeight(0) == 1);
    }},



    /*



    testColumn: function() { with(this) {
    }},



    */
}); 
