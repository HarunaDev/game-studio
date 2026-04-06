import { CUSTOM_EVENTS, EVENT_BUS } from '../../../../common/event-bus';
import { CharacterGameObject } from '../../../../game-objects/common/character-game-object';
import { Chest } from '../../../../game-objects/objects/chest';
// import { Player } from '../../../../game-objects/player/player';
import { BaseCharacterState } from './base-character-state';
import { CHARACTER_STATES } from './character-states';

export class OpenChestState extends BaseCharacterState {
  constructor(gameObject: CharacterGameObject) {
    super(CHARACTER_STATES.OPEN_CHEST_STATE, gameObject);
  }

  public onEnter(args: unknown[]): void {
    const chest = args[0] as Chest;

    // reset object velocity
    this._resetObjectVelocity();

    // play idle animation based on game object direction.
    this._gameObject.animationComponent.playAnimation(`LIFT_${this._gameObject.direction}`, () => {
      // event bus
      EVENT_BUS.emit(CUSTOM_EVENTS.OPENED_CHEST, chest);
      this._stateMachine.setState(CHARACTER_STATES.IDLE_STATE);
    });
  }
}
