import Phaser from "phaser";
import platformAsset from "./assets/platform.png";
import PlayerFactory from "./Player/Player";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 500,
  height: 600,
  scene: {
    preload: preload,
    create: create,
	update: update,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
	}
  },
};

const game = new Phaser.Game(config);
let playerFactory;
function preload() {
  playerFactory = new PlayerFactory(this);
  playerFactory.loadAssets();
}

let player,
	direction,
	platforms,
	spacebars;
function create() {
  this.scale.pageAlignHorizontally = true;
  this.scale.pageAlignVertically = true;
  this.scale.refresh();
  player = playerFactory.create(64, 64);

  platforms = this.physics.add.staticGroup();
  platforms.create(436, 536, "platform");

  this.physics.add.collider(player, platforms);
}

function update() {
  player.update();
}

