import * as Phaser from "phaser";

export default class UI {
  constructor(scene) {
    this.scene = scene;

    this.scoreText = scene.add.text(20, 20, "Cash: 0 €", {
      fontSize: "24px",
      color: "#ffffff",
    });

    this.scoreText.setDepth(100);
    this.scoreText.setScrollFactor(0);
    this.gameOverText = null;
    this.replayText = null;
  }

  setScore(score) {
    this.scoreText.setText("Cash: " + score + " €");
  }

  showGameOver() {
    if (this.gameOverText) return;

    const centerX = this.scene.scale.width / 2;
    const centerY = this.scene.scale.height / 2;

    this.gameOverText = this.scene.add
      .text(centerX, centerY - 40, "GAME OVER", {
        fontSize: "48px",
        fill: "#ff0000",
      })
      .setOrigin(0.5)
      .setDepth(100)
      .setScrollFactor(0);

    this.replayText = this.scene.add
      .text(centerX, centerY + 40, "Press ENTER to play again", {
        fontSize: "28px",
        fill: "#ffffff",
      })
      .setOrigin(0.5)
      .setDepth(100)
      .setScrollFactor(0);

    this.scene.tweens.add({
      targets: this.replayText,
      alpha: { from: 1, to: 0 },
      duration: 800,
      repeat: -1,
      yoyo: true,
    });
  }

  hideGameOver() {
    if (this.gameOverText) {
      this.gameOverText.destroy();
      this.gameOverText = null;
    }
    if (this.replayText) {
      this.replayText.destroy();
      this.replayText = null;
    }
  }
}
