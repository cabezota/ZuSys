import Phaser from "phaser";
import platformAsset from "../assets/platform.png";
import PlayerFactory from "../Player/Player";

export class Level1 extends Phaser.Scene {
    constructor() {
      super("Level1");
      this.playerFactory = null;
      this.player = null;
    }


    preload() {
      this.playerFactory = new PlayerFactory(this);
      this.playerFactory.loadAssets();
    }
  
    create() {  
      player = this.playerFactory.create(64, 64);

      this.add.text(0, 0, 'Scene 2..', { fontFamily: '"Roboto Condensed"' });
      
    }
  
    update() {  
      this.player.update();
    }
  }