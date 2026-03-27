import * as Phaser from 'phaser';
// import { Position } from '../../common/types';
import { ASSET_KEYS } from '../../common/assets';
import { CustomGameObject, Position } from '../../common/types';
import { InteractiveObjectComponent } from '../../components/game-object/interactive-object-component';
import { INTERACTIVE_OBJECT_TYPE } from '../../common/common';
import { ThrowableObjectComponent } from '../../components/game-object/throwable-object-component';

type PotConfig = {
  scene: Phaser.Scene;
  position: Position;
};

export class Pot extends Phaser.Physics.Arcade.Sprite implements CustomGameObject {
  #position: Position;

  constructor(config: PotConfig) {
    const { scene, position } = config;
    super(scene, position.x, position.y, ASSET_KEYS.POT, 0);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setOrigin(0, 1).setImmovable(true);

    this.#position = { x: position.x, y: position.y };

    // add intecactive class
    new InteractiveObjectComponent(this, INTERACTIVE_OBJECT_TYPE.PICKUP);
    new ThrowableObjectComponent(this, () => {
      this.break();
    });
  }

  // disable physics body
  public disableObject(): void {
    (this.body as Phaser.Physics.Arcade.Body).enable = false;
    this.active = false;
    this.visible = false;
  }

  // enable physics body
  public enableObject(): void {
    (this.body as Phaser.Physics.Arcade.Body).enable = true;
    this.active = true;
    this.visible = true;
  }

  public break(): void {
    (this.body as Phaser.Physics.Arcade.Body).enable = false;
    this.setTexture(ASSET_KEYS.POT_BREAK, 0).play(ASSET_KEYS.POT_BREAK);
    this.once(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + ASSET_KEYS.POT_BREAK, () => {
      this.setTexture(ASSET_KEYS.POT, 0);
      this.disableObject();
    });
  }
}
