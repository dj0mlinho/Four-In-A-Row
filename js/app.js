let game = new Game()

document.querySelector("#begin-game").addEventListener('click', function () {
  game.startGame()
  this.style.display = 'none';
  document.getElementById('play-area').style.opacity = '1';
})
window.addEventListener('keydown', function () {
  game.handleKeyDown();
})