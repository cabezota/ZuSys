import directionAsset from "../../assets/flecha-direcion.png";

class Direction {
  constructor(sprite) {
	this.sprite = sprite;
	this.sprite.rotation = this.sprite.rotation;
	this.sprite.setOrigin(1);
	this.clockwise = true;
  }

  update(x, y) {
	this.sprite.x = x + 15;
	this.sprite.y = y - 50;

	if(this.clockwise) {
	  this.sprite.rotation += Math.PI/80;
	  if(this.sprite.rotation >= Math.PI/2) {
		this.clockwise = false;
	  }
	} else {
	  this.sprite.rotation -= Math.PI/80;
	  if(this.sprite.rotation <= 0) {
		this.clockwise = true;
	  }
	}
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
