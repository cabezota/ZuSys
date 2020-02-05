import Phaser from "phaser";
import bgGameOver from "../assets/map/backgrounds/bg-gameover.png";
import titleGameOver from "../assets/map/backgrounds/gameOver.png";
import electraGameOver from "../assets/map/backgrounds/electra-gameover.png";
import gameOverAudio from "../assets/audio/GameOver.ogg";
import poweredByAsset from "../assets/poweredby.png";

var overAudio;

export class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }
  preload() {
    this.load.image("bgGameOver", bgGameOver);
    this.load.image("titleGameOver", titleGameOver);
    this.load.image("electraGameOver", electraGameOver);
	this.load.image("poweredBy", poweredByAsset);
    this.load.audio("overAudio", gameOverAudio);
  }
  create() {
    this.bgGameOver = this.add.image(250, 300, "bgGameOver");

    this.titleGameOver = this.add.tileSprite(250, 300, titleGameOver.width, titleGameOver.height, "titleGameOver");

    this.electraGameOver1 = this.add.image(250, 400, "electraGameOver");
    
    localStorage.setItem('lives', 3)




	this.add.image(250, 560, "poweredBy");
    overAudio = this.sound.add("overAudio");
    overAudio.play();

    //this.scene.remove("Level1");
    this.scene.remove("Hud");
  }
  update() {}
}
