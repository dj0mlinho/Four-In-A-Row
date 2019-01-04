class Token {
  constructor(index, owner) {
    this.id = `token-${index}-${owner.id}`;
    this.owner = owner;
    this.dropped = false;
  }
  get htmlToken() {
    return document.getElementById(this.id);
  }

  drawHTMLToken() {
    const token = document.createElement('div');
    document.querySelector('#game-board-underlay').appendChild(token);
    token.setAttribute('id', this.id);
    token.setAttribute('class', 'token');
    token.style.backgroundColor = this.owner.color;

  }

}