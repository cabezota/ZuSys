import directionAsset from "../../assets/flecha-direcion.png";

class Direction {
  constructor(sprite) {
	this.sprite = sprite;
	this.sprite.rotation = this.sprite.rotation;
  }

  update(x, y) {
	this.sprite.x = x + 15;
	this.sprite.y = y - 70;
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
