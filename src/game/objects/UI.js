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
  }

  setScore(score) {
    this.scoreText.setText("Cash: " + score + " €");
  }
}
