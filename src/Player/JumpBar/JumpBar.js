import jumpBarAsset from "../../assets/burbuja-brincoTinyHero.png";

class JumpBar {
  constructor({sprite}) {
	this.sprite = sprite;
  }

  update(x, y) {
	this.sprite.x = x;
	this.sprite.y = y - 65;
  }
}

export default class JumpBarFactory {
  constructor(game) {
	this.KEY = "jumpBar";
	this.game = game;
  }

  loadAssets() {
	this.game.load.spritesheet(this.KEY, jumpBarAsset, {
	  frameWidth: 20,
	  frameHeight: 20,
	});
  }

  create(x, y) {
	return new JumpBar({
	  sprite: this.game.add.sprite(x, y, "jumpBar")
	});
  }
}

