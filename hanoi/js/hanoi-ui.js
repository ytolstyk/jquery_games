(function () {
  if (typeof Hanoi === "undefined") {
    window.Hanoi = {};
  }

  var UI = Hanoi.UI = function (game, $el) {
    this.game = game;
    this.$el = $el;
    this.bindEvents();
    this.tower = "";
  };
  
  UI.prototype.bindEvents = function () {
    var that = this;
    var $stacks = $(".stack");
    $stacks.click(function(event) {
      if (that.tower === "") {
        var children = $(event.currentTarget).children();
        if (children.length === 0) {
          return;
        }
        that.selectTower($(children[0]));
      } else {
        var $stack = $(event.currentTarget); 
        that.dropTower($stack);
      }
    });
  };
  
  UI.prototype.selectTower = function ($tower) {
    this.tower = $tower;
    $tower.addClass("red");
  };
  
  UI.prototype.dropTower = function ($stack) {
    if (this.makeMove(this.tower, $stack)) {
      $stack.prepend(this.tower);
      this.isWon();
    } 
    this.tower.removeClass("red");
    this.tower = "";
  };
  
  UI.prototype.makeMove = function ($tower, $stack) {
    var $startStack = $($tower.parent()).data("tower");
    var $endStack = $stack.data("tower");
    return this.game.move($startStack, $endStack);
  };
  
  UI.prototype.isWon = function () {
    if (this.game.isWon()) {
      $(".stack").off("click");
      $(".message").html("You won!");
    }
  };
})();
