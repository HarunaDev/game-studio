import { isArcadePhysicsBody } from '../../../../common/utils';
import { CharacterGameObject } from '../../../../game-objects/common/character-game-object';
// import { Player } from '../../../../game-objects/player/player';
import { BaseCharacterState } from './base-character-state';
import { CHARACTER_STATES } from './character-states';

export class LiftState extends BaseCharacterState {
  constructor(gameObject: CharacterGameObject) {
    super(CHARACTER_STATES.LIFT_STATE, gameObject);
  }

  public onEnter(): void {
    // console.log(this._gameObject.direction);
    // this._gameObject.play({ key: PLAYER_ANIMATION_KEYS.IDLE_DOWN, repeat: -1 }, true);

    if (isArcadePhysicsBody(this._gameObject.body)) {
      this._gameObject.body.velocity.x = 0;
      this._gameObject.body.velocity.y = 0;
    }

    this._gameObject.animationComponent.playAnimation(`LIFT_${this._gameObject.direction}`);
  }
  public onUpdate(): void {
    // transition to idle holding state when animation finish
    if (this._gameObject.animationComponent.isAnimationPlaying()) {
      return;
    }

    this._stateMachine.setState(CHARACTER_STATES.IDLE_HOLDING_STATE);
  }
}
