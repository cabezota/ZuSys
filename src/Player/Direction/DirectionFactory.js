import Direction from "./Direction";
import directionAsset from "./assets/flecha-direcion.png";


export default class DirectionFactory {
  constructor(game) {
	this.KEY = "direction";
	this.game = game;
  }

  loadAssets() {
	this.game.load.image(this.KEY, directionAsset);
  }

  create(x, y) {
	const sprite = this.add.sprite(x, y, "direction");

	return new Direction(sprite);
  }
}
