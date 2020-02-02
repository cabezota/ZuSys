import Phaser from "phaser";
import { TitleScreen } from "./scenes/TitleScreen";
import { Level1 } from "./scenes/Level1";
import { GameOver } from "./scenes/GameOver";

const config = {
  type: Phaser.AUTO,
  width: 500,
  height: 600,
  scene: [TitleScreen, Level1, GameOver],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
	}
  },
};

export const game = new Phaser.Game(config);
