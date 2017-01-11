


var toe = (function(){

    function Board() {

        this.x = 0;
        this.o = 0;

        this.print = function() {

            var count = 0;

            for (var position = 0400; position > 0; position >>= 1) {

                if ((this.x & position) == position)
                    process.stdout.write("x ");
                else if ((this.o & process) == position)
                    process.stdout.write("o ");
                else
                    process.stdout.write("- ");

                if (++count % 3 == 0)
                    process.stdout.write('\n');

            }
        };

        this.play_position = function (position, side) {

            if (side == 'x')
                this.x |= position;

            if (side == 'o')
                this.o |= position;
        };
    }

    return {

        Game: function(x_player, o_player, who_goes_first) {
            
            this.board = new Board;
            this.x_player = x_player;
            this.o_player = o_player;
            this.turn = who_goes_first;
        }
    };
})();

console.log(new toe.Game());

game = new toe.Game();
game.board.print();
game.board.play_position(0400, 'x');
game.board.print();
