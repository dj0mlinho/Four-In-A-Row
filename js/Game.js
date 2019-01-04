class Game {
  constructor() {
    this.board = new Board();
    this.players = this.createPlayers();
    this.ready = false;
  }
  get activePlayer() {
    return this.players.find(player => player.active);
  }
  createPlayers() {
    return [new Player("Mladen", 1, "#e15258", true), new Player("Anastazija", 2, "#e59a13")]
  }
  startGame() {
    this.board.drawHTMLBoard();
    this.activePlayer.activeToken.drawHTMLToken();
    this.ready = true;
  }
}