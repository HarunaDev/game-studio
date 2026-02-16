import * as Phaser from 'phaser';
// import { Position } from '../../common/types';
import { ASSET_KEYS, CHEST_FRAME_KEYS } from '../../common/assets';
import { ChestState, Position } from '../../common/types';
import { CHEST_STATE } from '../../common/common';

type ChestConfig = {
  scene: Phaser.Scene;
  position: Position;
  requiresBossKey: boolean;
  chestState?: ChestState;
};

export class Chest extends Phaser.Physics.Arcade.Image {
  #state: ChestState;
  #isBossKeyChest: boolean;

  constructor(config: ChestConfig) {
    const { scene, position } = config;
    const frameKey = config.requiresBossKey ? CHEST_FRAME_KEYS.BIG_CHEST_CLOSED : CHEST_FRAME_KEYS.SMALL_CHEST_CLOSED;
    super(scene, position.x, position.y, ASSET_KEYS.DUNGEON_OBJECTS, frameKey);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setOrigin(0, 1).setImmovable(true);

    this.#state = config.chestState || CHEST_STATE.HIDDEN;
    this.#isBossKeyChest = config.requiresBossKey;
  }
}
