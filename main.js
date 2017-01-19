


var toe = (function(){

    function Dumb_ai(board) {

            this.board = board,

            this.play = function () {

                var positions = this.board.get_vacant_positions();
                var i = Math.floor(Math.random() * positions.length);

                return positions[i];
            };
    }

    function Smart_ai(board) {

        function Result(num_moves, ways) {

            this.num_moves = num_moves;
            this.ways = ways;

            this.copy = function() {

                var new_result = new Result(this.num_moves, this.ways);
                return new_result;
            };

            this.set = function(result) {
                this.num_moves = result.num_moves;
                this.ways = result.num_moves;
            };
        }

        

        function count_moves_to_win(board, side, result) {

            function get_best_result(results) {

                var min_num_moves = Infinity;
                var ways = 0;


                for (var i = 0; i < results.length; i++) {

                    if (results[i].num_moves < min_num_moves) {
                        min_num_moves = results[i].num_moves;
                        ways = 1;
                    }
                    else if (min_num_moves == results[i].num_moves){
                        ways++;
                    }

                }

                return new Result(min_num_moves, ways);
            }


            board.print();

            if (board.is_full()) {
                result.num_moves = Infinity;
                return;
            }
                

            if (board.check_win() == side) {
                return;
            }

            var positions = board.get_vacant_positions();
            var results = [];

            for (var i = 0; i < positions.length; i++) {
                var new_board = board.copy();
                new_board.play_position(positions[i], side);


                var r = result.copy();
                r.num_moves++;

                count_moves_to_win(new_board, side, r);
                results[i] = r.copy();
            }

            r = get_best_result(results);
            result.set(r);
        }

        this.board = board;

        this.play = function(side) {
            var positions = this.board.get_vacant_positions();

            var result = new Result(0, 0);
            count_moves_to_win(this.board, side, result);
            
            console.log("num_moves: " + result.num_moves);
            console.log("ways: " + result.ways);
        }
    }

    function Board() {

        var wins = [0700, 070, 07, 0444, 0222, 0111, 0421, 0124];

        this.x = 0;
        this.o = 0;


        this.copy = function() {

            var new_board = new Board();
            new_board.x = this.x;
            new_board.o = this.o;

            return new_board;
        }

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
                  this.smart_ai = new Smart_ai(this.board);
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

var cpy_board = game.board.copy();
console.log("copy of board:");
cpy_board.print();




console.log(game);

console.log(game.board.check_win());

console.log("get vacant positions");
console.log(game.board.get_vacant_positions());

console.log("Dumb Ai turn");
var p = game.dumb_ai.play();
game.board.play_position(p, 'o');
game.board.print();

console.log("copy of board:");
cpy_board.print();

game.smart_ai.play('x');
