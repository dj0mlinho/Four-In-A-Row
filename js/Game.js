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
    return [new Player("Mladen", 1, "lightblue", true), new Player("Anastazija", 2, "yellow")]
  }
  startGame() {
    this.board.drawHTMLBoard();
    this.activePlayer.activeToken.drawHTMLToken();
    this.ready = true;
  }

  handleKeyDown() {
    if (game.ready) {
      if (event.key == 'ArrowRight') {
        this.activePlayer.activeToken.moveRight(this.board.columns)
      } else if (event.key == 'ArrowLeft') {
        this.activePlayer.activeToken.moveLeft()
      } else if (event.key == 'ArrowDown') {
        this.playToken()
      } else {}
    }
  }
  playToken() {

    let spaces = this.board.spaces;
    let activeToken = this.activePlayer.activeToken;
    let targetColumn = spaces[activeToken.columnLocation];
    let targetSpace = null;

    for (let space of targetColumn) {
      if (space.token === null) {
        targetSpace = space;
      }
    }
    if (targetSpace !== null) {
      const game = this;
      game.ready = false;

      activeToken.drop(targetSpace, function () {
        game.updateGameState(activeToken, targetSpace);
      });
    }
  }
  updateGameState(token, target) {
    target.mark(token);

    if (!this.checkForWin(target)) {
      this.switchPlayers();

      if (this.activePlayer.checkTokens()) {
        this.activePlayer.activeToken.drawHTMLToken();
        this.ready = true;
      } else {
        this.gameOver("No more tokens");
      }
    } else {
      this.gameOver(`${target.owner.name} wins!`);
    }
  }
  checkForWin(target) {
    const owner = target.token.owner;
    let win = false;

    // vertical
    for (let x = 0; x < this.board.columns; x++) {
      for (let y = 0; y < this.board.rows - 3; y++) {
        if (this.board.spaces[x][y].owner === owner &&
          this.board.spaces[x][y + 1].owner === owner &&
          this.board.spaces[x][y + 2].owner === owner &&
          this.board.spaces[x][y + 3].owner === owner) {
          win = true;
        }
      }
    }

    // horizontal
    for (let x = 0; x < this.board.columns - 3; x++) {
      for (let y = 0; y < this.board.rows; y++) {
        if (this.board.spaces[x][y].owner === owner &&
          this.board.spaces[x + 1][y].owner === owner &&
          this.board.spaces[x + 2][y].owner === owner &&
          this.board.spaces[x + 3][y].owner === owner) {
          win = true;
        }
      }
    }

    // diagonal
    for (let x = 3; x < this.board.columns; x++) {
      for (let y = 0; y < this.board.rows - 3; y++) {
        if (this.board.spaces[x][y].owner === owner &&
          this.board.spaces[x - 1][y + 1].owner === owner &&
          this.board.spaces[x - 2][y + 2].owner === owner &&
          this.board.spaces[x - 3][y + 3].owner === owner) {
          win = true;
        }
      }
    }

    // diagonal
    for (let x = 3; x < this.board.columns; x++) {
      for (let y = 3; y < this.board.rows; y++) {
        if (this.board.spaces[x][y].owner === owner &&
          this.board.spaces[x - 1][y - 1].owner === owner &&
          this.board.spaces[x - 2][y - 2].owner === owner &&
          this.board.spaces[x - 3][y - 3].owner === owner) {
          win = true;
        }
      }
    }

    return win;
  }
  switchPlayers() {
    for (let player of this.players) {
      player.active === true ? player.active = false : player.active = true;
    }
  }
  gameOver(message) {
    document.querySelector('#game-over').style.display = "block";
    document.querySelector('#game-over').textContent = message;
  }

}