(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var Widget = TTT.Widget = function (game, $el) {
    this.game = game;
    this.$el = $el;
    this.bindEvents();
  };

  Widget.prototype.bindEvents = function () {
    var that = this;
    var $tiles = $(".tile");
    $tiles.click(function(event) {
      var square = $(event.currentTarget);
      that.makeMove(square);
    }); 
  };

  Widget.prototype.makeMove = function ($square) {
    var color = (this.game.currentPlayer === "x" ? "green" : "red");
    var that = this;
    $square.addClass(color);
    var $row = $square.data("col");
    var $col = $square.parent().data("row");
    this.game.playMove([$row, $col]);
    if (this.game.winner()){
      $(".tile").off("click");
      $(".message").html(color + " won!");
    }
  };

  Widget.prototype.play = function () {
  };

  Widget.prototype.setupBoard = function () {
    
  };
})();
