import Phaser from "phaser";
import bgGameOver from "../assets/fullBackground.png";
import gameOverAudio from "../assets/audio/GameOver.ogg";

var overAudio;

export class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }
  preload() {
    this.load.image("bgGameOver", bgGameOver);
    this.load.audio("overAudio", gameOverAudio);
  }
  create() {
    this.bgGameOver = this.add.image(250, 300, "bgGameOver");
    overAudio = this.sound.add("overAudio");
    overAudio.play();

    //this.scene.remove("Level1");
    this.scene.remove("Hud");
  }
  update() {}
}
