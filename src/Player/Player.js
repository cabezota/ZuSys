import Phaser from "phaser";
import playerAsset from "../assets/ELECTRA.png";
import playerJson from "../assets/ELECTRA.json";
import DirectionFactory from "./Direction/Direction";
import StateMachine from "javascript-state-machine";
import StateMachineHistory from "javascript-state-machine/lib/history";
import JumpBarFactory from "./JumpBar/JumpBar";
import jumpAudioAsset from "../assets/audio/Salto.ogg";

class Player {
  constructor({
	sprite,
	directionFactory,
	jumpBarFactory,
	leftKey,
	rightKey,
	jumpKey,
	physics,
	idleAnims,
	jumpingLeftAnims,
	jumpingRightAnims,
	standingAnims,
	jumpSound,
  }) {
	this.jumpSound = jumpSound;
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

	this.physics = physics;	

	this.state = new StateMachine({
	  init: "facingRight",
	  transitions: [
		{ name: "turnLeft", from: ["facingRight", "jumping"], to: "facingLeft"},
		{ name: "turnRight", from: ["facingLeft", "jumping"], to: "facingRight"},
		{ name: "takeImpulse", from: ["facingLeft", "facingRight"], to: "takingImpulse"},
		{ name: "jump", from: "takingImpulse", to: "jumping"},
		{ name: "stand", from: "*", to: "standing"},
	  ],
	  methods: {
		onTurnLeft: () => {
		  this.direction.sprite.alpha = 1;
		  this.jumpBar.sprite.alpha = 1;
		  this.sprite.flipX = true;
		  this.direction.turnLeft();
		  this.sprite.play(idleAnims);
		},
		onTurnRight: () => {
		  this.direction.sprite.alpha = 1;
		  this.jumpBar.sprite.alpha = 1;		  
		  this.sprite.flipX = false;
		  this.direction.turnRight();
		  this.sprite.play(idleAnims);
		},
		onTakeImpulse: () => {
		  this.direction.shoot();		  
		  this.jumpBar.play();
		},
		onJump: () => {
		  this.jumpBar.reset();
		  this.direction.aim();
		  this.sprite.play(jumpingRightAnims);
		  this.direction.sprite.alpha = 0;
		  this.jumpBar.sprite.alpha = 0;
		  this.jumpSound.play();
		},
		onStand: () => {
		  this.sprite.play(standingAnims);
		},
		onInvalidTransition: (transition, from, to) => {
		  console.log(transition, from, to);
		}
	  },
	  plugins: [new StateMachineHistory()]
	});

	this.speed = 0;
	this.MAX_SPEED = 400;

	this.idleAnims = idleAnims;
	this.jumpingRightAnims = jumpingRightAnims;
	this.jumpingLeftAnims = jumpingLeftAnims;
	
	this.sprite.play(this.idleAnims);
  }

  stand() {
	this.state.stand();
	this.turnToLast();
  }

  update() {
	this.direction.update(this.sprite.x, this.sprite.y, this.state.is("facingRight"));
	this.jumpBar.update(this.sprite.x, this.sprite.y);


	if(Phaser.Input.Keyboard.JustDown(this.jumpKey) && this.state.can("takeImpulse")) {
	  if(!this.state.is("takingImpulse")) {
		this.state.takeImpulse();
	  }
	}

	if(this.state.is("takingImpulse")) {
	  if(this.speed < this.MAX_SPEED) {
		this.speed += 4;
	  }	  
	}

	if(Phaser.Input.Keyboard.JustUp(this.jumpKey) && this.state.can("jump")) {
	  this.state.jump();

	  this.physics.velocityFromRotation(this.direction.sprite.rotation - Math.PI/2, this.speed, this.sprite.body.velocity);
	  this.speed = 0;

	  // this.turnToLast();
	}
	if(Phaser.Input.Keyboard.JustDown(this.leftKey) && this.state.can("turnLeft")) {
	  this.state.turnLeft();
	}
	if(Phaser.Input.Keyboard.JustDown(this.rightKey) && this.state.can("turnRight")) {
	  this.state.turnRight();
	}
  }

  turnToLast() {
	  if(this.lastTurn() === "facingLeft")  {
	  	this.state.turnLeft();
	  }
	  else {
	  	this.state.turnRight();
	  }	
  }

  lastTurn() {
	const turns = this.state.history.filter(state => {
	  return state === "facingRight" || state === "facingLeft";
	});
	const lastTurn = turns[turns.length - 1];
	return lastTurn;
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
	this.jumpAudio = this.game.load.audio("jump", jumpAudioAsset);
	this.game.load.atlas("player", playerAsset, playerJson);
	this.directionFactory.loadAssets();
	this.jumpBarFactory.loadAssets();
  }

  create(x, y) {
	const frames = this.game.anims.generateFrameNames("player");
	
	const jumpingLeftAnims = this.game.anims.create({
	  key: "jumping_left",
 	  frames: [frames[2]],
	  repeat: -1
	});

	const jumpingRightAnims = this.game.anims.create({
	  key: "jumping_right",
	  frames: [frames[4]],
	  repeat: -1
	});	
	
	const idleAnims = this.game.anims.create({
	  key: "idle",
	  frames: [frames[0], frames[6]],
	  frameRate: 2,
	  repeat: -1,
	});

	const standingAnims = this.game.anims.create({
	  key: "standing",
	  frames: [frames[3]],
	  repeat: -1,
	});

	const player = new Player({
	  sprite: this.game.physics.add.sprite(x, y, "player"),
	  directionFactory:  this.directionFactory,
	  jumpBarFactory: this.jumpBarFactory,
	  leftKey: this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
	  rightKey: this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
	  jumpKey: this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
	  physics: this.game.physics,
	  jumpingLeftAnims,
	  jumpingRightAnims,
	  idleAnims,
	  standingAnims,
	  jumpSound: this.game.sound.add("jump"),
	});

	return player;
  }
}

 
