import Phaser from "phaser";
import Background from "../assets/map/backgrounds/zuSys-fondo-title-big.png";
import Title from "../assets/map/backgrounds/zuSys-title.png";
import Electra from "../assets/map/backgrounds/zuSys-electra-title.png";
import mp3 from "../assets/audio/inicio.ogg";
import Start from "../assets/start.png";

var music;

export class TitleScreen extends Phaser.Scene {
  constructor() {
    super("TitleScreen");
  }

  preload() {
    this.load.image("bg", Background);
    this.load.image("electra", Electra);
    this.load.image("title", Title);
    this.load.audio("music", mp3);
    this.load.image("press-enter-text", Start);
  }

  create() {
    console.log(this);
    music = this.sound.add("music");
    music.play();

    var titleBackground = this.add.tileSprite(0.0, 0.0, 500.0, 800.0, "bg");
    titleBackground.setOrigin(0.0, 0.20);
    titleBackground.setScrollFactor(0.0, 0.0);

    var gameTitle = this.add.image(244.00002, 196.0, "title");

    var titleElectra = this.add.tileSprite(140.0, 345, 291.0, 311.0, "electra");
    titleElectra.setOrigin(0.0, 0.0);
    titleElectra.setScrollFactor(0.25, 0.0);
    titleElectra.setScale(0.7);


    var tween = this.tweens.add({
      targets: [titleElectra, titleBackground],
      y: 100,
      duration: 2000,
      ease: "Power1",
      loop: 100,
      yoyo: true
    });

    localStorage.setItem('lives', 3)

    var instructions = this.add.image(144.00002, 75.42618, "instructions");
    instructions.visible = false;

    var press_enter_text = this.add.image(
      254.00002,
      555.42445,
      "press-enter-text"
    );

    this.fInstructions = instructions;
    this.fTitle = gameTitle;
    this.fPress_enter_text = press_enter_text;

    this.time.addEvent({
      loop: true,
      delay: 700,
      callback: function() {
        this.blinkText();
      },
      callbackScope: this
    });

    this.input.keyboard.on("keydown_ENTER", this.startGame, this);
  }

  blinkText() {
    this.fPress_enter_text.visible = !this.fPress_enter_text.visible;
  }

  startGame() {
    this.scene.start("gameBackground");
    music.stop();
  }
}
