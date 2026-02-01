import { Player } from '../../../../game-objects/player/player';
import { BaseCharacterState } from './base-character-state';
import { CHARACTER_STATES } from './character-states';

export class IdleState extends BaseCharacterState {
  constructor(gameObject: Player) {
    super(CHARACTER_STATES.IDLE_STATE, gameObject);
  }

  onEnter(): void {
    console.log('test');
  }
  onUpdate(): void {
    console.log('test update');
  }
}
