import * as Phaser from "phaser";

export default class LawnMower extends Phaser.Physics.Arcade.Image {
  throttle = 0;

  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.setOrigin(0.5);
    this.setScale(0.1);
  }

  configure() {
    this.angle = 0;
    this.driveAngleOffset = Phaser.Math.DegToRad(-90);

    this.body.angularDrag = 100;
    this.body.maxSpeed = 1024;

    this.body.setSize(64, 64, true);
  }

  update(delta, cursorKeys) {
    const { left, right, up, down } = cursorKeys;

    if (up.isDown) {
      this.throttle += 0.7 * delta;
    } else if (down.isDown) {
      this.throttle -= 3.0 * delta;
    } else {
      this.throttle = Phaser.Math.Linear(this.throttle, 0, 0.05);
    }

    this.throttle = Phaser.Math.Clamp(this.throttle, -256, 2048);

    const steer = this.throttle < 0 ? -1 : 1;

    if (left.isDown) {
      this.body.setAngularAcceleration(-200000 * steer);
    } else if (right.isDown) {
      this.body.setAngularAcceleration(200000 * steer);
    } else {
      this.body.setAngularAcceleration(0);
    }

    const driveRotation = this.rotation + this.driveAngleOffset;
    this.scene.physics.velocityFromRotation(
      driveRotation,
      this.throttle,
      this.body.velocity,
    );

    this.body.maxAngular = Phaser.Math.Clamp(
      (120 * this.body.speed) / 1024,
      0,
      120,
    );
  }
}
