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

    this.startX = x;
    this.startY = y;

    this.isCut = false;
  }

  cut(onComplete) {
    if (this.isCut) return;

    this.isCut = true;
    this.body.enable = false;

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
        this.setVisible(false);

        if (onComplete) onComplete();

        this.scene.time.delayedCall(5000, () => {
          this.respawn();
        });
      },
    });
  }

  respawn() {
    this.setPosition(this.startX, this.startY);
    this.setVisible(true);
    this.setAngle(0);

    this.body.enable = true;
    this.isCut = false;
  }
}
