import Phaser from "phaser";
import playerAsset from "../assets/ELECTRA.png";
import playerJson from "../assets/ELECTRA.json";
import DirectionFactory from "./Direction/Direction";
import StateMachine from "javascript-state-machine";
import StateMachineHistory from "javascript-state-machine/lib/history";
import JumpBarFactory from "./JumpBar/JumpBar";

class Player {
  constructor({sprite, directionFactory, jumpBarFactory, leftKey, rightKey, jumpKey}) {
	this.sprite = sprite;
	this.sprite.setCollideWorldBounds(true);
	
	this.direction = directionFactory.create(
	  this.sprite.x,
	  this.sprite.y,
	);

	this.jumpBar = jumpBarFactory.create(
	  this.sprite.x,
	  this.sprite.y,
	  jumpKey
	);
	
	this.leftKey = leftKey;
	this.rightKey = rightKey;
	this.jumpKey = jumpKey;

	this.state = new StateMachine({
	  init: "facingRight",
	  transitions: [
		{ name: "turnLeft", from: ["facingRight", "jumping"], to: "facingLeft"},
		{ name: "turnRight", from: ["facingLeft", "jumping"], to: "facingRight"},
		{ name: "takeImpulse", from: ["facingLeft", "facingRight"], to: "takingImpulse"},
		{ name: "jump", from: "takingImpulse", to: "jumping"},
	  ],
	  methods: {
		onTurnLeft: () => {
		  this.sprite.flipX = true;
		  this.direction.turnLeft();
		},
		onTurnRight: () => {
		  this.sprite.flipX = false;
		  this.direction.turnRight();
		},
		onTakeImpulse: () => {
		  this.direction.shoot();		  
		  this.jumpBar.play();
		},
		onJump: () => {
		  this.jumpBar.reset();
		  this.direction.aim();
		},
	  },
	  plugins: [new StateMachineHistory()]
	});

  }

  jump() {
	console.log("hola");
  }

  update() {
	this.direction.update(this.sprite.x, this.sprite.y, this.state.is("facingRight"));
	this.jumpBar.update(this.sprite.x, this.sprite.y);


	if(Phaser.Input.Keyboard.JustDown(this.jumpKey) && this.state.can("takeImpulse")) {
	  this.state.takeImpulse();
	}		

	if(Phaser.Input.Keyboard.JustUp(this.jumpKey) && this.state.can("jump")) {
	  this.state.jump();
	  const turns = this.state.history.filter(state => {
		return state === "facingRight" || state === "facingLeft";
	  });
	  const lastTurn = turns[turns.length - 1];
	  this.state.clearHistory();

	  if(lastTurn === "facingLeft")  {
		this.state.turnLeft();
	  }
	  else {
		this.state.turnRight();
	  }
	}

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
	this.game.load.atlas("player", playerAsset, playerJson);
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
	  jumpKey: this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
	});

	const frames = this.game.anims.generateFrameNames("player");
	const anims = this.game.anims.create({
	  key: "idle",
	  frames: [frames[0], frames[6]],
	  frameRate: 2,
	  repeat: -1,
	});

	player.sprite.play(anims);

	return player;
  }
}

