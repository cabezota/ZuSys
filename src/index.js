import Phaser from "phaser";
import playerAsset from "./assets/pink.png";
import platformAsset from "./assets/platform.png";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 500,
  height: 600,
  scene: {
    preload: preload,
    create: create
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
	}
  }
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("player", playerAsset);
  this.load.image("platform", platformAsset);
}

let player,
	platforms,
	spacebars;
function create() {
  player = this.physics.add.sprite(64, 64, "player");
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  platforms = this.physics.add.staticGroup();
  platforms.create(436, 536, "platform");

  this.physics.add.collider(player, platforms);
}


