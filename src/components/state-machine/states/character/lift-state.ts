import { GameObject } from '../../../../common/types';
import { isArcadePhysicsBody } from '../../../../common/utils';
import { CharacterGameObject } from '../../../../game-objects/common/character-game-object';
import { HeldGameObjectComponent } from '../../../game-object/held-game-object-component';
// import { Player } from '../../../../game-objects/player/player';
import { BaseCharacterState } from './base-character-state';
import { CHARACTER_STATES } from './character-states';

export class LiftState extends BaseCharacterState {
  constructor(gameObject: CharacterGameObject) {
    super(CHARACTER_STATES.LIFT_STATE, gameObject);
  }

  public onEnter(args: unknown[]): void {
    // console.log(this._gameObject.direction);
    // this._gameObject.play({ key: PLAYER_ANIMATION_KEYS.IDLE_DOWN, repeat: -1 }, true);
    const gameObjectBeingPickedUp = args[0] as GameObject;

    if (isArcadePhysicsBody(this._gameObject.body)) {
      this._gameObject.body.velocity.x = 0;
      this._gameObject.body.velocity.y = 0;
    }

    // get held component to switch state
    const heldComponent = HeldGameObjectComponent.getComponent<HeldGameObjectComponent>(this._gameObject);
    if (heldComponent === undefined) {
      this._stateMachine.setState(CHARACTER_STATES.IDLE_STATE);
      return;
    }
    heldComponent.object = gameObjectBeingPickedUp;
    // console.log('Held component:', heldComponent);

    // disable game objects and physics body to allow player carry object.
    if (isArcadePhysicsBody(gameObjectBeingPickedUp.body)) {
      gameObjectBeingPickedUp.body.enable = false;
    }
    gameObjectBeingPickedUp.setDepth(2).setOrigin(0.5, 0.5);

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
