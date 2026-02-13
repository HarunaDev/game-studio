import { CHARACTER_ANIMATIONS } from '../../../../common/assets';
import { isArcadePhysicsBody } from '../../../../common/utils';
import { CharacterGameObject } from '../../../../game-objects/common/character-game-object';
// import { Player } from '../../../../game-objects/player/player';
import { BaseCharacterState } from './base-character-state';
import { CHARACTER_STATES } from './character-states';

export class DeathState extends BaseCharacterState {
  #onDieCallBack: () => void;

  constructor(gameObject: CharacterGameObject, onDieCallBack: () => void = () => undefined) {
    super(CHARACTER_STATES.DEATH_STATE, gameObject);
    this.#onDieCallBack = onDieCallBack;
  }

  public onEnter(): void {
    // console.log(this._gameObject.direction);
    // this._gameObject.play({ key: PLAYER_ANIMATION_KEYS.IDLE_DOWN, repeat: -1 }, true);
    // this._gameObject.animationComponent.playAnimation(`IDLE_${this._gameObject.direction}`);

    if (isArcadePhysicsBody(this._gameObject.body)) {
      this._gameObject.body.velocity.x = 0;
      this._gameObject.body.velocity.y = 0;
    }
    this._gameObject.invulnerableComponent.invulnerable = true;
    (this._gameObject.body as Phaser.Physics.Arcade.Body).enable = false;

    this._gameObject.animationComponent.playAnimation(CHARACTER_ANIMATIONS.DIE_DOWN, () => {
      this.#triggerDefeatedEvent();
    });
  }

  #triggerDefeatedEvent(): void {
    this._gameObject.disableObject();
    this.#onDieCallBack();
  }
}
