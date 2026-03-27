import { isArcadePhysicsBody } from '../../../../common/utils';
import { CharacterGameObject } from '../../../../game-objects/common/character-game-object';
// import { Player } from '../../../../game-objects/player/player';
import { BaseCharacterState } from './base-character-state';
import { CHARACTER_STATES } from './character-states';

export class IdleHoldingState extends BaseCharacterState {
  constructor(gameObject: CharacterGameObject) {
    super(CHARACTER_STATES.IDLE_HOLDING_STATE, gameObject);
  }

  public onEnter(): void {
    // console.log(this._gameObject.direction);
    // this._gameObject.play({ key: PLAYER_ANIMATION_KEYS.IDLE_DOWN, repeat: -1 }, true);
    this._gameObject.animationComponent.playAnimation(`IDLE_HOLD_${this._gameObject.direction}`);

    if (isArcadePhysicsBody(this._gameObject.body)) {
      this._gameObject.body.velocity.x = 0;
      this._gameObject.body.velocity.y = 0;
    }
  }
  public onUpdate(): void {
    const controls = this._gameObject.controls;
    // check if player threw away the object
    if (controls.isActionKeyJustDown) {
      // throw item
      this._stateMachine.setState(CHARACTER_STATES.THROW_STATE);
      return;
    }

    if (!controls.isDownDown && !controls.isUpDown && !controls.isLeftDown && !controls.isRightDown) {
      return;
    }

    this._stateMachine.setState(CHARACTER_STATES.MOVE_HOLDING_STATE);
  }
}
