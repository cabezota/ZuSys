import Phaser from "phaser";
import playerAsset from "./assets/pink.png";
import platformAsset from "./assets/platform.png";
import sky from "./assets/sky.png"

let player,
    platforms,
    spacebars;

class SceneA extends Phaser.Scene {

  constructor ()
    {
        super('SceneA');
    }
  preload() {
    this.load.image("player", playerAsset);
    this.load.image("platform", platformAsset);
  }
  create() {
    player = this.physics.add.sprite(64, 64, "player");
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    platforms = this.physics.add.staticGroup();
    platforms.create(436, 536, "platform");

    this.physics.add.collider(player, platforms);
  }
}

class SceneB extends Phaser.Scene {

  constructor ()
  {
      super('SceneB');
  }
  preload(){
    this.load.image('sky', sky);
  }
  create(){
    this.add.image(400, 300, 'sky');
    var txt1 = this.add.text(225,300, 'start');

    txt1.setInteractive().on('pointerdown', function() {
        this.scene.scene.start('SceneA');
    });
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 500,
  height: 600,
  scene: [ SceneB, SceneA ],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
	}
  }
};

const game = new Phaser.Game(config);
