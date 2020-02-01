import jumpBarAsset from "../../assets/green.png";
import jumpBarJson from "../../assets/green.json";

class JumpBar {
  constructor({sprite, anims, jumpKey}) {
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
	this.game.load.atlas(this.KEY, jumpBarAsset, jumpBarJson);
  }

  create(x, y) {
	const frames = this.game.anims.generateFrameNames(this.KEY);
	
	const jumpBar = new JumpBar({
	  anims: this.game.anims.create({
		key: "charging",
		frames,
		frameRate: 2
	  }),
	  sprite: this.game.add.sprite(x, y, "jumpBar")
	});

	jumpBar.sprite.setFrame("Recurso 62.png");

	// jumpBar.sprite.play(anims);

	return jumpBar;
  }
}

