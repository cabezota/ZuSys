import Phaser from "phaser";
import platformAsset from "../assets/image/platform.png";
import battery from "../assets/image/vidaTinyHero.png";
import energyIcon from "../assets/image/enrgy-iconTinyHero.png";
import energyBar from "../assets/image/energy-barTinyHero.png";
import powerUpAssets from "../assets/atlas/spritesheet2.png";
import powerUpJson from "../assets/atlas/spritesheet2.json";
import capturaPinza from "../assets/image/captura-pinzaTinyHero.png";
import capturaAmortiguador from "../assets/image/captura-amortiguadorTinyHero.png";
import capturaEngranaje from "../assets/image/captura-engranajeTinyHero.png";
import ambienteAudio from "../assets/audio/Ambiente.ogg";
import levelAudio from "../assets/audio/In-game.ogg";

var level;
var ambiente;

export class Hud extends Phaser.Scene {
  constructor() {
    super("Hud");
    this.initialTime = 120;
    this.platforms = null;
  }
  preload() {
    this.load.image("platform", platformAsset);
    this.load.image("battery", battery);
    this.load.image("energyIcon", energyIcon);
    this.load.image("energyBar", energyBar);
    this.load.atlas("powerUp", powerUpAssets, powerUpJson);
    this.load.image("capturaPinza", capturaPinza);
    this.load.image("capturaAmortiguador", capturaAmortiguador);
    this.load.image("capturaEngranaje", capturaEngranaje);
    this.load.audio("levelAudio", levelAudio);
    this.load.audio("ambienteAudio", ambienteAudio);
  }
  create() {
    level = this.sound.add("levelAudio", { loop: true });
    ambiente = this.sound.add("ambienteAudio", { loop: true });
    level.play();
    ambiente.play();
    this.timeLeft = this.initialTime;

    //energybar
    let energyBar = this.add.sprite(470, 130, "energyBar");
    //energy mask
    this.energyMask = this.add.sprite(470, 130, "energyBar");
    this.energyMask.visible = false;

    energyBar.mask = new Phaser.Display.Masks.BitmapMask(this, this.energyMask);

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

    //Barra de tiempo
    this.gameTimer = this.time.addEvent({
      delay: 1000,
      callback: function() {
        this.timeLeft--;

        // dividing enery bar width by the number of seconds gives us the amount
        // of pixels we need to move the energy bar each second
        let stepHeight = this.energyMask.displayHeight / this.initialTime;

        // moving the mask
        this.energyMask.y -= stepHeight;
        if (this.timeLeft === 0) {
          this.gameOver();
        }
      },
      callbackScope: this,
      loop: true
    });
  }

  gameOver() {
    this.cameras.main.shake(500);
    // fade camera
    this.time.delayedCall(
      250,
      function() {
        this.cameras.main.fade(250);
      },
      [],
      this
    );
    level.stop();
    ambiente.stop();
    this.scene.start("GameOver");
  }
}
