import { INTERACTIVE_OBJECT_TYPE } from '../../../../common/common';
import { exhaustiveGuard } from '../../../../common/utils';
import { CharacterGameObject } from '../../../../game-objects/common/character-game-object';
import { CollidingObjectsComponent } from '../../../game-object/colliding-object-component';
import { InteractiveObjectComponent } from '../../../game-object/interactive-object-component';
import { InputComponent } from '../../../input/Input-component';
import { BaseMoveState } from './base-move-state';
import { CHARACTER_STATES } from './character-states';

export class MoveState extends BaseMoveState {
  constructor(gameObject: CharacterGameObject) {
    super(CHARACTER_STATES.MOVE_STATE, gameObject, 'WALK');
  }

  //   public onEnter(): void {
  //     this._gameObject.play({ key: PLAYER_ANIMATION_KEYS.IDLE_DOWN, repeat: -1 }, true);

  //     if (isArcadePhysicsBody(this._gameObject.body)) {
  //       this._gameObject.body.velocity.x = 0;
  //       this._gameObject.body.velocity.y = 0;
  //     }
  //   }

  public onUpdate(): void {
    const controls = this._gameObject.controls;

    // if no input provided transition back to idle state
    if (this.isNoInputMovement(controls)) {
      this._stateMachine.setState(CHARACTER_STATES.IDLE_STATE);
    }

    // check if object was interacted with
    if (this.#checkIfObjectWasInteractedWith(controls)) {
      return;
    }

    this.handleCharacterMovement();
  }

  #checkIfObjectWasInteractedWith(controls: InputComponent): boolean {
    const collideComponent = CollidingObjectsComponent.getComponent<CollidingObjectsComponent>(this._gameObject);

    if (collideComponent === undefined || collideComponent.objects.length === 0) {
      return false;
    }

    const collisionObject = collideComponent.objects[0];
    const interactiveObjectComponent =
      InteractiveObjectComponent.getComponent<InteractiveObjectComponent>(collisionObject);

    // if interactive object then we can't interact with that object
    if (interactiveObjectComponent === undefined) {
      return false;
    }

    // check to see if play pressed a key to interact with the object
    if (!controls.isActionKeyJustDown) {
      return false;
    }

    // check if player can interact with an object
    if (!interactiveObjectComponent.canInteractWith()) {
      return false;
    }
    interactiveObjectComponent.interact();

    // check the interactive object type in transition to the state
    if (interactiveObjectComponent.objectType === INTERACTIVE_OBJECT_TYPE.PICKUP) {
      this._stateMachine.setState(CHARACTER_STATES.LIFT_STATE);
      return true;
    }

    if (interactiveObjectComponent.objectType === INTERACTIVE_OBJECT_TYPE.OPEN) {
      this._stateMachine.setState(CHARACTER_STATES.OPEN_CHEST_STATE);
      return true;
    }

    if (interactiveObjectComponent.objectType === INTERACTIVE_OBJECT_TYPE.AUTO) {
      return false;
    }

    exhaustiveGuard(interactiveObjectComponent.objectType);
  }
}
