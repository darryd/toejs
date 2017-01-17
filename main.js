


var toe = (function(){

    function Dumb_ai(board) {

            this.board = board,

            this.play = function () {

                var positions = this.board.get_vacant_positions();
                var i = Math.floor(Math.random() * positions.length);

                return positions[i];
            };
    }

    function Board() {

        var wins = [0700, 070, 07, 0444, 0222, 0111, 0421, 0124];

        this.x = 0;
        this.o = 0;

        this.is_vacant = function(position) {
                return (((this.x | this.o) & position) == 0)
        };

        this.get_vacant_positions = function () {

                var positions = [];

                for (var pos = 0400; pos > 0; pos >>= 1) {
                    if (this.is_vacant(pos))
                        positions.push(pos);
                }

                return positions;
        };

        this.print = function() {

                var count = 0;

                for (var position = 0400; position > 0; position >>= 1) {

                    if ((this.x & position) == position)
                        process.stdout.write("x ");
                    else if ((this.o & position) == position)
                        process.stdout.write("o ");
                    else
                        process.stdout.write("- ");

                    if (++count % 3 == 0)
                        process.stdout.write('\n');

                }
                process.stdout.write('\n');
            };

           this.play_position = function (position, side) {

                if (side == 'x')
                    this.x |= position;

                if (side == 'o')
                    this.o |= position;
            };


            this.is_full = function() {
                return this.board == 0777;
            };

            this.check_win = function() {

                for (var i = 0; i < wins.length; i++) {
                    if ((this.x & wins[i]) == wins[i])
                        return 'x';

                    if ((this.o & wins[i]) == wins[i])
                        return 'o';
                }

                return 'no win';
            };
    }

    return {

        Game: function(x_player, o_player, who_goes_first) {

                  this.board = new Board;
                  this.dumb_ai = new Dumb_ai(this.board);
                  this.x_player = x_player;
                  this.o_player = o_player;
                  this.turn = who_goes_first;
          },
    };
})();

console.log(new toe.Game());

game = new toe.Game();
game.board.print();
game.board.play_position(0400, 'x');
game.board.print();




console.log(game);

console.log(game.board.check_win());

console.log("get vacant positions");
console.log(game.board.get_vacant_positions());

console.log("Dumb Ai turn");
var p = game.dumb_ai.play();
game.board.play_position(p, 'o');
game.board.print();

