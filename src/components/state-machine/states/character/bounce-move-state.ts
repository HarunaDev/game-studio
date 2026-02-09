import * as Phaser from 'phaser';
// import { isArcadePhysicsBody } from '../../../../common/utils';
import { CharacterGameObject } from '../../../../game-objects/common/character-game-object';
// import { Player } from '../../../../game-objects/player/player';
import { BaseCharacterState } from './base-character-state';
import { CHARACTER_STATES } from './character-states';

export class BounceMoveState extends BaseCharacterState {
  constructor(gameObject: CharacterGameObject) {
    super(CHARACTER_STATES.BOUNCE_MOVE_STATE, gameObject);
  }

  public onEnter(): void {
    // console.log(this._gameObject.direction);
    // this._gameObject.play({ key: PLAYER_ANIMATION_KEYS.IDLE_DOWN, repeat: -1 }, true);
    this._gameObject.animationComponent.playAnimation(`IDLE_${this._gameObject.direction}`);

    const speed = this._gameObject.speed;
    const randomDirection = Phaser.Math.Between(0, 3);
    if (randomDirection === 0) {
      this._gameObject.setVelocity(speed, speed);
    } else if (randomDirection === 1) {
      this._gameObject.setVelocity(speed, speed);
    } else if (randomDirection === 2) {
      this._gameObject.setVelocity(speed, speed);
    } else {
      this._gameObject.setVelocity(speed, speed);
    }
    this._gameObject.setBounce(1);
  }
}
