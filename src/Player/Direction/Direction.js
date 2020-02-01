import directionAsset from "../../assets/flecha-direcion.png";

class Direction {
  constructor(sprite) {
	this.X_OFFSET = 15;
	this.Y_OFFSET = -50;
	this.ROTATION_DELTA = Math.PI/80;
	this.ROTATION_0 = 0;
	this.ROTATION_BOUND = Math.PI/2;

	this.sprite = sprite;
	// Para que la flecha rote con el borde inferior como centro.
	this.sprite.setOrigin(1);
	this.clockwise = true;
	this.isFacingRight = true;
  }

  update(x, y) {
	this.moveWithOffset(x, y);

	// rotate se debe ejecutar antes de el if. El orden importa
	this.rotate();
	if(this.isRotationOutOfBounds()) {
	  this.toggleRotation();
	}
  }

  moveWithOffset(x, y) {
	this.sprite.x = x + this.X_OFFSET;
	this.sprite.y = y + this.Y_OFFSET;
  }

  rotate() {
	const sign = this.clockwise? 1 : -1;
	this.sprite.rotation = this.sprite.rotation + this.ROTATION_DELTA * sign;
  }

  isRotationOutOfBounds() {
	if(this.isFacingRight) {	
	  return this.sprite.rotation <= this.ROTATION_0 
		|| this.sprite.rotation >= this.ROTATION_BOUND;  
	} else {
	  return this.sprite.rotation > this.ROTATION_0 
		|| this.sprite.rotation < - this.ROTATION_BOUND;  	  
	}
  }

  toggleRotation() {
	this.clockwise = !this.clockwise;
  }

  turnLeft() {
	this.isFacingRight = false;
	this.clockwise = true;
	this.sprite.rotation = - this.ROTATION_BOUND;
  }

  turnRight() {
	this.isFacingRight = true;
	this.clockwise = false;
	this.sprite.rotation = this.ROTATION_BOUND;
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
