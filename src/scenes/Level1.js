import Phaser from "phaser";
import PlayerFactory from "../Player/Player";
import levelMp3 from '../assets/audio/Ambiente.ogg'

export class Level1 extends Phaser.Scene {
    constructor() {
      super("Level1");
      this.playerFactory = null;
      this.player = null;
    }


    preload() {
      this.playerFactory = new PlayerFactory(this);
      this.playerFactory.loadAssets();
      this.load.audio('music',levelMp3)
    }
  
    create() {  
      this.player = this.playerFactory.create(64, 64);
      var music = this.sound.add('music');
      music.play();
    }
  
    update() {  
      this.player.update();
    }
  }