import Phaser from 'phaser';

export class gameBackground extends Phaser.Scene {
  constructor(){
    super("gameBackground")
  }

  preload(){

  }

  create(){
    var levelOne = this.scene.launch("Level1", {
      eventListener: this
    });
    var ui = this.scene.launch("Hud", {
      eventListener: this
    });
    this.scene.bringToTop("Hud");
  }
  update(){

  }

}