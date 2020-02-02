import Phaser from "phaser";
import bgGameOver from "../assets/fullBackground.png";

export class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }
  preload() {
    this.load.image("bgGameOver", bgGameOver);
  }
  create() {
    this.bgGameOver = this.add.image(250, 300, "bgGameOver");

    //this.scene.remove("Level1");
    this.scene.remove("Hud");
  }
  update() {}
}
