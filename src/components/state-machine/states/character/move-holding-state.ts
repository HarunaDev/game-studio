import { DIRECTION } from '../../../../common/common';
import { Direction } from '../../../../common/types';
import { isArcadePhysicsBody } from '../../../../common/utils';
import { CharacterGameObject } from '../../../../game-objects/common/character-game-object';
// import { Player } from '../../../../game-objects/player/player';
import { BaseCharacterState } from './base-character-state';
import { CHARACTER_STATES } from './character-states';

export class MoveHoldingState extends BaseCharacterState {
  constructor(gameObject: CharacterGameObject) {
    super(CHARACTER_STATES.MOVE_HOLDING_STATE, gameObject);
  }

  public onUpdate(): void {
    const controls = this._gameObject.controls;

    // if no input provided transition back to idle state
    if (!controls.isDownDown && !controls.isUpDown && !controls.isLeftDown && !controls.isRightDown) {
      this._stateMachine.setState(CHARACTER_STATES.IDLE_HOLDING_STATE);
    }

    // const controls = this.#controlsComponent.controls;
    if (controls.isUpDown) {
      //   this._gameObject.play({ key: PLAYER_ANIMATION_KEYS.WALK_UP, repeat: -1 }, true);
      this.#updateVelocity(false, -1);
      this.#updateDirection(DIRECTION.UP);
    } else if (controls.isDownDown) {
      //   this._gameObject.play({ key: PLAYER_ANIMATION_KEYS.WALK_DOWN, repeat: -1 }, true);
      this.#updateVelocity(false, 1);
      this.#updateDirection(DIRECTION.DOWN);
    } else {
      this.#updateVelocity(false, 0);
    }

    const isMovingVertically = controls.isDownDown || controls.isUpDown;

    if (controls.isLeftDown) {
      this._gameObject.setFlipX(true);
      this.#updateVelocity(true, -1);
      this.#updateDirection(DIRECTION.LEFT);
      if (!isMovingVertically) {
        this.#updateDirection(DIRECTION.LEFT);
      }
    } else if (controls.isRightDown) {
      this._gameObject.setFlipX(false);
      this.#updateVelocity(true, 1);
      if (!isMovingVertically) {
        this.#updateDirection(DIRECTION.RIGHT);
      }
    } else {
      this.#updateVelocity(true, 0);
    }

    this.#normalizeVelocity();

    // this._stateMachine.setState(CHARACTER_STATES.MOVE_STATE);
  }

  #updateVelocity(isX: boolean, value: number): void {
    if (!isArcadePhysicsBody(this._gameObject.body)) {
      return;
    }
    if (isX) {
      this._gameObject.body.velocity.x = value;
      return;
    }
    this._gameObject.body.velocity.y = value;
  }

  #normalizeVelocity(): void {
    if (!isArcadePhysicsBody(this._gameObject.body)) {
      return;
    }
    this._gameObject.body.velocity.normalize().scale(this._gameObject.speed);
  }

  #updateDirection(direction: Direction): void {
    this._gameObject.direction = direction;
    this._gameObject.animationComponent.playAnimation(`WALK_HOLD_${this._gameObject.direction}`);
  }
}
