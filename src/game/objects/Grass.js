import * as Phaser from "phaser";

export default class Grass extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y) {
    super(scene, x, y, "grass");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setOrigin(0.5);
    this.setImmovable(true);

    this.setScale(0.08);
    this.body.setSize(500, 500, true);
    this.setDepth(0);
  }
}
