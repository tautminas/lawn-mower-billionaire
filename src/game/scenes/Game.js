import { Scene } from "phaser";
import LawnMower from "../objects/LawnMower.js";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  preload() {
    this.load.setPath("assets");

    this.load.image("lawn-mower", "lawn-mower.png");
    this.load.image("logo", "logo.png");
  }

  create() {
    this.mower = new LawnMower(this, 512, 384, "lawn-mower");
    this.add.existing(this.mower);
    this.physics.add.existing(this.mower);
    this.mower.configure();
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update(time, delta) {
    this.mower.update(delta, this.cursors);
  }
}
