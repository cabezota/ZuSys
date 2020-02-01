import directionAsset from "../../assets/flecha-direcion.png";

class Direction {
  constructor(sprite) {
	this.sprite = sprite;
  }

  update(x, y) {
	this.sprite.x = x;
	this.sprite.y = y;
  }
}

export default class DirectionFactory {
  constructor(game) {
	this.KEY = "direction";
	this.game = game;
  }

  loadAssets() {
	this.game.load.image(this.KEY, directionAsset);
  }

  create(x, y) {
	return new Direction(
	  this.game.add.sprite(x, y, "direction")	  
	);
  }
}
