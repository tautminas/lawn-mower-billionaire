import { Scene } from "phaser";
import LawnMower from "../objects/LawnMower.js";
import Grass from "../objects/Grass.js";
import Euro from "../objects/Euro.js";
import UI from "../objects/UI.js";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  preload() {
    this.load.setPath("assets");

    this.load.image("lawn-mower", "lawn-mower.png");
    this.load.image("logo", "logo.png");
    this.load.image("grass", "grass.png");
    this.load.image("euro", "euro.png");
  }

  create() {
    this.mower = new LawnMower(this, 512, 384, "lawn-mower");
    this.add.existing(this.mower);
    this.physics.add.existing(this.mower);
    this.mower.configure();

    this.cursors = this.input.keyboard.createCursorKeys();

    this.grass = new Grass(this, 400, 300);

    this.score = 0;
    this.ui = new UI(this);
    this.ui.setScore(this.score);

    this.physics.add.overlap(this.mower, this.grass, (mower, grass) => {
      if (grass.isCut) return;
      grass.cut();
    });

    this.events.on("grassCut", (x, y) => {
      const euro = new Euro(this, x, y);
      euro.goUp();
      this.score += 1;
      this.ui.setScore(this.score);
    });
  }

  update(time, delta) {
    this.mower.update(delta, this.cursors);
  }
}
