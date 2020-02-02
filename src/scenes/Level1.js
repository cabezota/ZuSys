import Phaser from "phaser";
import PlayerFactory from "../Player/Player";
import levelMp3 from '../assets/audio/Ambiente.ogg';
import background from '../assets/map/tiles/backing2.jpg';
import platforms from '../assets/map/tiles/backing.jpg';
import map from "../assets/map/Level1.json";

export class Level1 extends Phaser.Scene {
    constructor() {
      super("Level1");
      this.playerFactory = null;
      this.player = null;
      this.layer = null;
      this.map = null;
      this.background = null
      this.backgroundImage = null
    }


    preload() {

      this.load.image('background', background );
      this.load.image('platforms', platforms );
      this.load.tilemapTiledJSON('map', map );

      this.playerFactory = new PlayerFactory(this);
      this.playerFactory.loadAssets();
      this.load.audio('music',levelMp3);
    }
  
    create() {  

      this.backgroundImage = this.add.image(0, 0,'background').setOrigin(0, 0);
      this.backgroundImage.setScale(1, 1);
      this.map = this.make.tilemap({ key: 'map' });

      this.layer = this.map.createStaticLayer('background', 'platforms')



      this.player = this.playerFactory.create(64, 64);


      this.cameras.main.setBounds(0,0, this.layer.width, this.layer.height)

      this.layer_collisions = this.map.createStaticLayer("Collisions Layer")
      this.map.setCollision([1]);
      this.layer_collisions.visible = false;
      this.layer_collisions.debug = false;
      this.setTopCollisionsTiles(2);

      var music = this.sound.add('music');
      music.play();
      
      this.input.keyboard.on("keydown_ENTER", this.gameOver, this);
    }
  
    update() {  
      this.player.update();
    }

    gameOver() {
      this.cameras.main.shake(500);
      // fade camera
      this.time.delayedCall(250, function() {
        this.cameras.main.fade(250);
      }, [], this);
      this.scene.start("GameOver");
    }
  }