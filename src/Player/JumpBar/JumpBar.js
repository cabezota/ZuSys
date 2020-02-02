import Phaser from "phaser";
import jumpBarAsset from "../../assets/green.png";
import jumpBarJson from "../../assets/green.json";

class JumpBar {
  constructor({sprite, anims}) {
	this.sprite = sprite;
	this.anims = anims;
  }

  update(x, y) {
	this.sprite.x = x;
	this.sprite.y = y - 65;
  }

  play() {
	this.sprite.play(this.anims);
  }

  reset() {
	this.sprite.anims.stop();
  }
}

export default class JumpBarFactory {
  constructor(game) {
	this.KEY = "jumpBar";
	this.game = game;
  }

  loadAssets() {
	this.game.load.atlas(this.KEY, jumpBarAsset, jumpBarJson);
  }

  create(x, y) {
	const frames = this.game.anims.generateFrameNames(this.KEY).reverse();

	const jumpBar = new JumpBar({
	  anims: this.game.anims.create({
		key: "charging",
		frames,
		frameRate: 2
	  }),
	  sprite: this.game.add.sprite(x, y, "jumpBar"),
	});

	jumpBar.sprite.setFrame("Recurso 62.png");

	// jumpBar.sprite.play(anims);

	return jumpBar;
  }
}

