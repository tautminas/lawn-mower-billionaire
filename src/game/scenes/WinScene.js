import { Scene } from "phaser";
import * as Phaser from "phaser";

export class WinScene extends Scene {
  constructor() {
    super("WinScene");
  }

  preload() {
    this.load.setPath("assets");

    this.load.image("logo", "logo.png");
  }

  create() {
    this.congratsText = this.add
      .text(
        this.scale.width / 2,
        this.scale.height / 4,
        "Thank you for playing!",
        {
          fontSize: "50px",
        },
      )
      .setOrigin(0.5);

    this.controlsText = this.add
      .text(
        this.scale.width / 2,
        this.scale.height / 2.4,
        "Congratulations on becoming a billionaire! 🎉",
        {
          fontSize: "20px",
          fill: "#ffffff",
        },
      )
      .setOrigin(0.5);

    this.goalText = this.add
      .text(
        this.scale.width / 2,
        this.scale.height / 2.1,
        "Game created by Tautminas Cibulskis for GameDev.js game jam 2026",
        {
          fontSize: "20px",
          fill: "#ffffff",
        },
      )
      .setOrigin(0.5);

    this.playAgainText = this.add
      .text(
        this.scale.width / 2,
        this.scale.height / 2 + 100,
        "Press ENTER to play again",
        {
          fontSize: "32px",
          fill: "#fff",
        },
      )
      .setOrigin(0.5);

    this.tweens.add({
      targets: this.playAgainText,
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
