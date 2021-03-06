import directionAsset from "../../assets/flecha-direcionTinyHero.png";

class Direction {
  constructor(sprite) {
	this.X_OFFSET = 1;
	this.Y_OFFSET = -64;
	this.ROTATION_DELTA = Math.PI/80;
	this.ROTATION_0 = 0;
	this.ROTATION_BOUND = Math.PI/2;

	this.sprite = sprite;
	// Para que la flecha rote con el borde inferior como centro.
	this.sprite.setOrigin(1);
	this.clockwise = true;
  }

  update(x, y, isFacingRight) {
	this.moveWithOffset(x, y, isFacingRight);

	// rotate se debe ejecutar antes de el if. El orden importa
	this.rotate();
	if(this.isRotationOutOfBounds(isFacingRight)) {
	  this.toggleRotation();
	}
  }

  shoot() {
	this.ROTATION_DELTA = 0;	
  }

  aim() {
	this.ROTATION_DELTA = Math.PI/80;
  }

  moveWithOffset(x, y, isFacingRight) {
	const sign = isFacingRight? 1 : -1;
	this.sprite.x = x + this.X_OFFSET * sign;
	this.sprite.y = y + this.Y_OFFSET;
  }

  rotate() {
	const sign = this.clockwise? 1 : -1;
	this.sprite.rotation = this.sprite.rotation + this.ROTATION_DELTA * sign;
  }

  isRotationOutOfBounds(isFacingRight) {
	if(isFacingRight) {	
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
	this.clockwise = true;
	this.sprite.rotation = - this.ROTATION_BOUND;
  }

  turnRight() {
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
