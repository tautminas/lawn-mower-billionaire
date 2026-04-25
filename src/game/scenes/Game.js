import { Scene } from "phaser";
import LawnMower from "../objects/LawnMower.js";
import Tractor from "../objects/Tractor.js";
import Grass from "../objects/Grass.js";
import Euro from "../objects/Euro.js";
import UI from "../objects/UI.js";
import * as Phaser from "phaser";
import { AudioMixin } from "../mixins/AudioMixin.js";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  init() {
    this.score = 0;
    this.targetEuros = 1000000000;
    this.targetGrass = 1234;
    this.eurosPerGrass = this.targetEuros / this.targetGrass;
  }

  preload() {
    this.load.setPath("assets");

    this.load.image("lawn-mower", "lawn-mower.png");
    this.load.image("logo", "logo.png");
    this.load.image("grass", "grass.png");
    this.load.image("euro", "euro.png");
    this.load.image("tractor", "tractor.png");
    this.preloadAudio();
  }

  create() {
    this.playBackgroundMusic();

    this.isGameOver = false;
    this.delay = 2000;

    this.cursors = this.input.keyboard.createCursorKeys();
    this.escKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ESC,
    );
    this.enterKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER,
    );

    this.mower = new LawnMower(this, 512, 384);

    this.grassGroup = this.add.group();
    const cam = this.cameras.main;
    const temp = new Grass(this, 0, 0);
    const stepX = temp.displayWidth;
    const stepY = temp.displayHeight;
    temp.destroy();
    for (let x = stepX / 2; x < cam.width; x += stepX) {
      for (let y = stepY / 2; y < cam.height; y += stepY) {
        this.grassGroup.add(new Grass(this, x, y));
      }
    }

    this.ui = new UI(this);
    this.ui.setScore(this.score);

    this.tractors = this.add.group();
    this.tractors.add(new Tractor(this, 0, 0));
    this.tractorSpawnEvent = this.time.addEvent({
      delay: this.delay,
      loop: true,
      callback: () => {
        this.tractors.add(new Tractor(this, 0, 0));
      },
    });

    this.difficultyEvent = this.time.addEvent({
      delay: 5000,
      loop: true,
      callback: () => {
        if (!this.isGameOver && this.delay > 300) {
          this.delay -= 100;
          this.tractorSpawnEvent.remove();
          this.tractorSpawnEvent = this.time.addEvent({
            delay: this.delay,
            loop: true,
            callback: () => {
              this.tractors.add(new Tractor(this, 0, 0));
            },
          });
        }
      },
    });

    this.events.on("shutdown", () => {
      this.difficultyEvent.remove();
      this.tractorSpawnEvent.remove();
    });

    this.physics.add.overlap(this.mower, this.grassGroup, (mower, grass) => {
      if (grass.isCut) return;
      grass.cut();
    });

    this.physics.add.overlap(this.mower, this.tractors, () => {
      if (this.isGameOver) return;
      this.isGameOver = true;
      this.mower.disableBody();
      this.ui.showGameOver();
    });

    this.events.off("grassCut");
    this.events.on("grassCut", (x, y) => {
      if (this.isGameOver) return;
      const euro = new Euro(this, x, y);
      euro.goUp();
      this.score += 1;
      this.ui.setScore(this.score * this.eurosPerGrass);
      if (this.score >= this.targetGrass) {
        this.scene.start("WinScene");
      }
    });
  }

  update(time, delta) {
    if (Phaser.Input.Keyboard.JustDown(this.enterKey) && this.isGameOver) {
      this.scene.restart();
    }

    if (this.isGameOver) return;

    this.mower.update(delta, this.cursors);

    if (Phaser.Input.Keyboard.JustDown(this.escKey)) {
      this.scene.start("MainMenu");
    }
  }
}

Object.assign(Game.prototype, AudioMixin);
