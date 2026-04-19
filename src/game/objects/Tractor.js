import * as Phaser from "phaser";

export default class Tractor extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y) {
    super(scene, x, y, "tractor");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setOrigin(0.5);
    this.setScale(0.12);

    this.body.setImmovable(true);
    this.body.setAllowGravity(false);
  }
}
