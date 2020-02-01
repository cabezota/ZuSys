import Phaser from "phaser";
import playerAsset from "../assets/pink.png";
import DirectionFactory from "./Direction/Direction";


class Player {
  constructor({sprite, directionFactory, leftKey, rightKey}) {
	this.sprite = sprite;
	this.sprite.setCollideWorldBounds(true);
	this.direction = directionFactory.create(
	  this.sprite.x,
	  this.sprite.y,
	);
	this.leftKey = leftKey;
	this.rightKey = rightKey;
  }

  update() {
	this.direction.update(this.sprite.x, this.sprite.y);

	if(Phaser.Input.Keyboard.JustDown(this.leftKey)) {
	  this.turnLeft();
	}
	if(Phaser.Input.Keyboard.JustDown(this.rightKey)) {
	  this.turnRight();
	}
  }

  turnLeft() {
	this.sprite.flipX = true;
	this.direction.turnLeft();
  }

  turnRight() {
	this.sprite.flipX = false;
	this.direction.turnRight();
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
	const player = new Player({
	  sprite: this.game.physics.add.sprite(x, y, "player"),
	  directionFactory:  this.directionFactory,
	  leftKey: this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
	  rightKey: this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
	});

	return player;
  }
}

