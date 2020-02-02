import Phaser from "phaser";
import playerAsset from "./assets/image/sprite-pruebita.png";
import platformAsset from "./assets/image/platform.png";
import battery from "./assets/image/vidaTinyHero.png";
import energyIcon from "./assets/image/enrgy-iconTinyHero.png";
import energyBar from "./assets/image/energy-barTinyHero.png";
import bgLives from "./assets/image/ui-vidaTinyHero.png";
import powerUpAssets from "./assets/atlas/spritesheet.png";
import powerUpJson from "./assets/atlas/spritesheet.json";
import capturaPinza from "./assets/image/captura-pinzaTinyHero.png";
import capturaAmortiguador from "./assets/image/captura-amortiguadorTinyHero.png";
import capturaEngranaje from "./assets/image/captura-engranajeTinyHero.png";

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
      debug: false
    }
  }
};

const game = new Phaser.Game(config);

let gameOptions = {
  initialTime: 60
};

function preload() {
  this.load.image("player", playerAsset);
  this.load.image("platform", platformAsset);
  this.load.image("battery", battery);
  this.load.image("energyIcon", energyIcon);
  this.load.image("energyBar", energyBar);
  this.load.image("bgLives", bgLives);
  this.load.atlas("powerUp", powerUpAssets, powerUpJson);
  this.load.image("capturaPinza", capturaPinza);
  this.load.image("capturaAmortiguador", capturaAmortiguador);
  this.load.image("capturaEngranaje", capturaEngranaje);
}

let player, platforms, spacebars;

function create() {
  this.timeLeft = gameOptions.initialTime;
  player = this.physics.add.sprite(64, 64, "player");
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  platforms = this.physics.add.staticGroup();
  platforms.create(436, 536, "platform");

  //energybar
  let energyBar = this.add.sprite(470, 130, "energyBar");
  //energy mask
  this.energyMask = this.add.sprite(470, 130, "energyBar");
  this.energyMask.visible = false;

  energyBar.mask = new Phaser.Display.Masks.BitmapMask(this, this.energyMask);

  //background Lives
  this.bgLives = this.add.sprite(465, 309, "bgLives");

  //energy icon
  this.energyIcon = this.add.sprite(470, 30, "energyIcon");

  //Lives
  this.lives_1 = this.add.sprite(465, 335, "battery");
  this.lives_2 = this.add.sprite(465, 310, "battery");
  this.lives_3 = this.add.sprite(465, 285, "battery");

  //PowerUps
  this.powerUp = this.add
    .sprite(470, 233, "powerUp")
    .setFrame("activepowerup-1TinyHero.png");

  //Piezas
  this.findPinza = this.add.sprite(470, 400, "capturaPinza");
  this.findAmortiguador = this.add.sprite(470, 425, "capturaAmortiguador");
  this.findEngranaje = this.add.sprite(470, 450, "capturaEngranaje");

  this.physics.add.collider(player, platforms);

  //Barra de tiempo
  this.gameTimer = this.time.addEvent({
    delay: 1000,
    callback: function() {
      this.timeLeft--;

      // dividing enery bar width by the number of seconds gives us the amount
      // of pixels we need to move the energy bar each second
      let stepHeight = this.energyMask.displayHeight / gameOptions.initialTime;

      // moving the mask
      this.energyMask.y -= stepHeight;
      if (this.timeLeft == 0) {
        //Game Over
      }
    },
    callbackScope: this,
    loop: true
  });
}
