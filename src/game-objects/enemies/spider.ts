import * as Phaser from 'phaser';
import { Position } from '../../common/types';
import { InputComponent } from '../../components/input/Input-component';
import { IdleState } from '../../components/state-machine/states/character/idle-state';
import { CHARACTER_STATES } from '../../components/state-machine/states/character/character-states';
import { MoveState } from '../../components/state-machine/states/character/move-state';
import { ENEMY_SPIDER_SPEED } from '../../common/config';
import { AnimationConfig } from '../../components/game-object/animation-component';
import { ASSET_KEYS, SPIDER_ANIMATION_KEYS } from '../../common/assets';
import { CharacterGameObject } from '../common/character-game-object';

export type SpiderConfig = {
  scene: Phaser.Scene;
  position: Position;
  //   controls: InputComponent;
};

export class Spider extends CharacterGameObject {
  constructor(config: SpiderConfig) {
    const animConfig = { key: SPIDER_ANIMATION_KEYS.WALK, repeat: -1, ignoreIfPlaying: true };
    const animationConfig: AnimationConfig = {
      WALK_DOWN: animConfig,
      WALK_UP: animConfig,
      WALK_LEFT: animConfig,
      WALK_RIGHT: animConfig,
      IDLE_DOWN: animConfig,
      IDLE_UP: animConfig,
      IDLE_LEFT: animConfig,
      IDLE_RIGHT: animConfig,
    };

    super({
      scene: config.scene,
      position: config.position,
      assetKey: ASSET_KEYS.SPIDER,
      frame: 0,
      id: `spider-${Phaser.Math.RND.uuid()}`,
      isPlayer: false,
      animationConfig,
      speed: ENEMY_SPIDER_SPEED,
      inputComponent: new InputComponent(),
    });

    this._stateMachine.addState(new IdleState(this));
    this._stateMachine.addState(new MoveState(this));
    this._stateMachine.setState(CHARACTER_STATES.IDLE_STATE);

    this.scene.time.addEvent({
      delay: Phaser.Math.Between(500, 1500),
      callback: this.#changeDirection,
      callbackScope: this,
      loop: false,
    });
  }

  #changeDirection(): void {
    this.controls.reset();
    this.scene.time.delayedCall(200, () => {
      const randomDirection = Phaser.Math.Between(0, 3);
      if (randomDirection === 0) {
        this.controls.isUpDown = true;
      } else if (randomDirection === 1) {
        this.controls.isRightDown = true;
      } else if (randomDirection === 2) {
        this.controls.isDownDown = true;
      } else {
        this.controls.isLeftDown = true;
      }
    });
  }
}
