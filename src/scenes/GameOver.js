import Phaser from "phaser";

export class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }
  preload(){

  }
  create(){
    this.add.text(0,0, "Scene3...")
  }
  update(){
    
  }
}