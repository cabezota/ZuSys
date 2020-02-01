import Phaser from "phaser";
import playerAsset from "../assets/ELECTRA.png";
import DirectionFactory from "./Direction/Direction";
import StateMachine from "javascript-state-machine";
import JumpBarFactory from "./JumpBar/JumpBar";

class Player {
  constructor({sprite, directionFactory, jumpBarFactory, leftKey, rightKey}) {
	this.sprite = sprite;
	this.sprite.setCollideWorldBounds(true);
	
	this.direction = directionFactory.create(
	  this.sprite.x,
	  this.sprite.y,
	);

	this.jumpBar = jumpBarFactory.create(
	  this.sprite.x,
	  this.sprite.y,
	);
	
	this.leftKey = leftKey;
	this.rightKey = rightKey;

	this.state = new StateMachine({
	  init: "facingRight",
	  transitions: [
		{ name: "turnLeft", from: "facingRight", to: "facingLeft"},
		{ name: "turnRight", from: "facingLeft", to: "facingRight"}
	  ],
	  methods: {
		onTurnLeft: () => {
		  this.sprite.flipX = true;
		  this.direction.turnLeft();
		},
		onTurnRight: () => {
		  this.sprite.flipX = false;
		  this.direction.turnRight();
		}
	  }
	});

	this.state.turnLeft();
  }

  update() {
	this.direction.update(this.sprite.x, this.sprite.y, this.state.is("facingRight"));
	this.jumpBar.update(this.sprite.x, this.sprite.y, this.state.is("facingRight"));

	if(Phaser.Input.Keyboard.JustDown(this.leftKey) && this.state.can("turnLeft")) {
	  this.state.turnLeft();
	}
	if(Phaser.Input.Keyboard.JustDown(this.rightKey) && this.state.can("turnRight")) {
	  this.state.turnRight();
	}
  }
}

export default class PlayerFactory {
  constructor(game) {
	this.KEY = "player";
	this.game = game;
	this.directionFactory = new DirectionFactory(game);
	this.jumpBarFactory = new JumpBarFactory(game);
  }

  loadAssets() {
	this.game.load.spritesheet("player", playerAsset, {
	  frameWidth: 100, frameHeight: 100,
	});
	this.directionFactory.loadAssets();
	this.jumpBarFactory.loadAssets();
  }

  create(x, y) {
	const player = new Player({
	  sprite: this.game.physics.add.sprite(x, y, "player"),
	  directionFactory:  this.directionFactory,
	  jumpBarFactory: this.jumpBarFactory,
	  leftKey: this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
	  rightKey: this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
	});

	return player;
  }
}

