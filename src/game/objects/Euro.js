import * as Phaser from "phaser";

export default class Euro extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y) {
    super(scene, x, y, "euro");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setOrigin(0.5);
    this.setScale(0.1);
  }

  goUp() {
    const screenHeight = this.scene.cameras.main.height;
    const baseLift = screenHeight * 0.15;
    const lift = Phaser.Math.Between(baseLift * 0.8, baseLift * 1.2);

    this.scene.tweens.add({
      targets: this,
      y: this.y - lift,
      duration: 400,
      ease: "Quad.easeOut",
      yoyo: true,
      easeYoyo: "Quad.easeIn",
      onComplete: () => {
        this.destroy();
      },
    });
  }

  goDown() {
    if (!this.scene) return;

    this.scene.tweens.add({
      targets: this,
      y:
        this.scene.cameras.main.scrollY +
        this.scene.cameras.main.height +
        this.displayHeight,
      angle: 90,
      duration: 2000,
      ease: "Cubic.easeIn",
      onComplete: () => {
        this.destroy();
      },
    });
  }
}
