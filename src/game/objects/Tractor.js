import * as Phaser from "phaser";

export default class Tractor extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y) {
    super(scene, x, y, "tractor");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setImmovable(true);
    this.body.setAllowGravity(false);

    this.setOrigin(0.5);
    this.setScale(0.12);
    this.setDepth(20);

    this.speed = 150;
    this.spawnOffset = Math.max(this.displayWidth, this.displayHeight) * 1.1;

    this.setupPath();
  }

  setupPath() {
    const walls = ["top", "bottom", "left", "right"];

    let startWall = Phaser.Utils.Array.GetRandom(walls);
    let endWall;

    do {
      endWall = Phaser.Utils.Array.GetRandom(walls);
    } while (endWall === startWall);

    const start = this.getRandomPointOnWall(startWall);
    const end = this.getRandomPointOnWall(endWall);

    this.setPosition(start.x, start.y);

    this.targetX = end.x;
    this.targetY = end.y;

    const angle = Phaser.Math.Angle.Between(start.x, start.y, end.x, end.y);

    this.rotation = angle;

    this.scene.physics.velocityFromRotation(
      angle,
      this.speed,
      this.body.velocity,
    );
  }

  getRandomPointOnWall(wall) {
    const cam = this.scene.cameras.main;

    const left = cam.scrollX;
    const right = cam.scrollX + cam.width;
    const top = cam.scrollY;
    const bottom = cam.scrollY + cam.height;

    const offset = this.spawnOffset;

    switch (wall) {
      case "top":
        return {
          x: Phaser.Math.Between(left, right),
          y: top - offset,
        };

      case "bottom":
        return {
          x: Phaser.Math.Between(left, right),
          y: bottom + offset,
        };

      case "left":
        return {
          x: left - offset,
          y: Phaser.Math.Between(top, bottom),
        };

      case "right":
        return {
          x: right + offset,
          y: Phaser.Math.Between(top, bottom),
        };
    }
  }

  update() {
    const dist = Phaser.Math.Distance.Between(
      this.x,
      this.y,
      this.targetX,
      this.targetY,
    );

    if (dist < 10) {
      this.destroy();
    }
  }
}
