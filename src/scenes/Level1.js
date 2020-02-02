import Phaser from "phaser";
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
      this.player = this.playerFactory.create(64, 64);
      
    }
  
    update() {  
      this.player.update();
    }
  }