import jumpBarAsset from "../../assets/burbuja-potencia.png";

class JumpBar {
  constructor({sprite}) {

	this.sprite = sprite;
  }  
}

export default class JumpBarFactory {
  constructor(game) {
	this.KEY = "jumpBar";
	this.game = game;
  }

  loadAssets() {
	this.game.load.image(this.KEY, jumpBarAsset);
  }

  create(x, y) {
	return new JumpBar({
	  sprite: this.game.add.sprite(x, y, "jumpBar")
	});
  }
}

