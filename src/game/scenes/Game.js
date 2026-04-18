import { Scene } from "phaser";
import LawnMower from "../objects/LawnMower.js";
import Grass from "../objects/Grass.js";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  preload() {
    this.load.setPath("assets");

    this.load.image("lawn-mower", "lawn-mower.png");
    this.load.image("logo", "logo.png");
    this.load.image("grass", "grass.png");
  }

  create() {
    this.mower = new LawnMower(this, 512, 384, "lawn-mower");
    this.add.existing(this.mower);
    this.physics.add.existing(this.mower);
    this.mower.configure();
    this.cursors = this.input.keyboard.createCursorKeys();

    this.grass = new Grass(this, 400, 300);

    this.physics.add.overlap(this.mower, this.grass, () => {
      console.log("Grass hit!");
      this.grass.body.enable = false;
    });
  }

  update(time, delta) {
    this.mower.update(delta, this.cursors);
  }
}
