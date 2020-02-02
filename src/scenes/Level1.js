import Phaser from "phaser";
import PlayerFactory from "../Player/Player";
import background from "../assets/map/tiles/backing2.jpg";
import platforms from "../assets/map/tiles/backing.jpg";
import map from "../assets/map/Level1.json";
import platform from "../assets/platform.png";

export class Level1 extends Phaser.Scene {
  constructor() {
    super("Level1");
    this.playerFactory = null;
    this.player = null;
    this.layer = null;
    this.map = null;
    this.background = null;
    this.backgroundImage = null;
  }

  preload() {
    this.load.image("background", background);
    this.load.image("platforms", platforms);
    this.load.tilemapTiledJSON("map", map);

    this.playerFactory = new PlayerFactory(this);
    this.playerFactory.loadAssets();
  }

  create() {
    this.backgroundImage = this.add.image(0, 0, "background");
    // this.backgroundImage.setScale(1, 1);
    this.map = this.make.tilemap({ key: "map" });

    this.physics.world.setBounds(0, 0, 500, 6000);
    const platforms = this.physics.add.group({
      allowGravity: false,
      immovable: true
    });

    const platformObjects = this.map.getObjectLayer("Capa de Objetos 1")
      .objects;

    platformObjects.forEach(obj => {
      const platform = platforms.create(obj.x, obj.y);
      console.log(platform);
      platform.body.setSize(obj.width, obj.height, false);
      platform.body.checkCollision.up = true;
      platform.body.checkCollision.down = false;
      platform.body.checkCollision.left = false;
      platform.body.checkCollision.right = false;
      platform.setOrigin(0, 0);
    });

    var ui = this.scene.launch("Hud", {
      eventListener: this
    });
    this.scene.bringToTop("Hud");

    this.backgroundImage = this.add.image(0, 0, "background").setOrigin(0, 0);
    this.backgroundImage.setScale(1, 1);
    this.map = this.make.tilemap({ key: "map" });

    this.player = this.playerFactory.create(64, 5800);

    this.physics.add.collider(
      this.player.sprite,
      platforms,
      (player, platform) => {
        player.setVelocity(0, 0);
        this.player.turnToLast();
      },
      null,
      this
    );

    this.cameras.main.setBounds(0, 0, 500, 6000);
    this.cameras.main.startFollow(this.player.sprite);

    // this.layer_collisions = this.map.createStaticLayer("Collisions Layer");
    // this.map.setCollision([1]);
    // this.layer_collisions.visible = false;
    // this.layer_collisions.debug = false;
    // this.setTopCollisionsTiles(2);
  }

  update() {
    this.player.update();
  }
}
