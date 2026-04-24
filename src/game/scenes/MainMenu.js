import { Scene } from "phaser";
import * as Phaser from "phaser";
import Grass from "../objects/Grass.js";
import { AudioMixin } from "../mixins/AudioMixin.js";

export class MainMenu extends Scene {
  constructor() {
    super("MainMenu");
  }

  preload() {
    this.load.setPath("assets");

    this.load.image("grass", "grass.png");
    this.load.image("logo", "logo.png");
    this.preloadAudio();
  }

  create() {
    this.playBackgroundMusic();

    const temp = new Grass(this, 0, 0);
    const stepX = temp.displayWidth;
    const stepY = temp.displayHeight;
    temp.destroy();
    this.menuGrass = [];
    const buffer = 20;
    for (let x = stepX / 2; x < this.scale.width; x += stepX) {
      const grass = new Grass(this, x, -stepY / 2 - buffer);
      this.menuGrass.push(grass);
    }
    this.time.addEvent({
      delay: 2000,
      loop: true,
      callback: () => {
        const grass = Phaser.Utils.Array.GetRandom(this.menuGrass);
        grass.cut();
      },
    });

    this.gameNameText = this.add
      .text(
        this.scale.width / 2,
        this.scale.height / 4,
        "Lawn Mower Billionaire",
        {
          fontSize: "50px",
        },
      )
      .setOrigin(0.5);

    this.gameOverText = this.add
      .text(
        this.scale.width / 2,
        this.scale.height / 2 + 100,
        "Press ENTER to play",
        {
          fontSize: "32px",
          fill: "#fff",
        },
      )
      .setOrigin(0.5);

    this.controlsText = this.add
      .text(this.scale.width / 2, this.scale.height / 2.4, "Move: ARROW KEYS", {
        fontSize: "20px",
        fill: "#ffffff",
      })
      .setOrigin(0.5);

    this.goalText = this.add
      .text(
        this.scale.width / 2,
        this.scale.height / 2.1,
        "Cut grass while avoiding tractors to earn € → Become a billionaire!",
        {
          fontSize: "20px",
          fill: "#ffffff",
        },
      )
      .setOrigin(0.5);

    this.tweens.add({
      targets: this.gameOverText,
      alpha: { from: 1, to: 0 },
      duration: 800,
      repeat: -1,
      yoyo: true,
    });

    this.enterKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER,
    );

    this.add
      .text(this.scale.width - 121, this.scale.height - 100, "Made with", {
        fontSize: "20px",
        fill: "#fff",
      })
      .setOrigin(0.5);

    const logoSpace = 20;
    this.logo = this.add
      .sprite(
        this.scale.width - logoSpace,
        this.scale.height - logoSpace,
        "logo",
      )
      .setOrigin(1, 1)
      .setScale(0.4);
  }

  update(time, delta) {
    const logoSpace = 25;
    this.logo.y = this.scale.height - logoSpace + Math.sin(time * 0.005) * 2;
    if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
      this.scene.start("Game");
    }
  }
}

Object.assign(MainMenu.prototype, AudioMixin);
