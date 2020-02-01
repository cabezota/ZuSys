import playerAsset from "../assets/pink.png";
import DirectionFactory from "./Direction/Direction";

class Player {
  constructor(sprite, directionFactory) {
	this.sprite = sprite;
	this.sprite.setCollideWorldBounds(true);
	this.direction = directionFactory.create(
	  this.sprite.x,
	  this.sprite.y,
	);
  }

  update() {
	this.direction.update(this.sprite.x, this.sprite.y);
  }
}

export default class PlayerFactory {
  constructor(game) {
	this.KEY = "player";
	this.game = game;
	this.directionFactory = new DirectionFactory(game);
  }

  loadAssets() {
	this.game.load.image("player", playerAsset);
	this.directionFactory.loadAssets();
  }

  create(x, y) {
	return new Player(
	  this.game.physics.add.sprite(x, y, "player"),
	  this.directionFactory
	);
  }
}
