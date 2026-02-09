import * as Phaser from 'phaser';
import { Direction, Position } from '../../common/types';
// import { PLAYER_ANIMATION_KEYS } from '../../common/assets';
import { InputComponent } from '../../components/input/Input-component';
import { ControlComponent } from '../../components/game-object/controls-component';
// import { isArcadePhysicsBody } from '../../common/utils';
import { StateMachine } from '../../components/state-machine/state-machine';
// import { IdleState } from '../../components/state-machine/states/character/idle-state';
// import { CHARACTER_STATES } from '../../components/state-machine/states/character/character-states';
// import { MoveState } from '../../components/state-machine/states/character/move-state';
import { SpeedComponent } from '../../components/game-object/speed-component';
// import { PLAYER_SPEED } from '../../common/config';
import { DirectionComponent } from '../../components/game-object/direction-component';
import { AnimationComponent, AnimationConfig } from '../../components/game-object/animation-component';
// import { PLAYER_ANIMATION_KEYS } from '../../common/assets';

export type CharacterConfig = {
  scene: Phaser.Scene;
  position: Position;
  assetKey: string;
  frame?: number;
  inputComponent: InputComponent;
  animationConfig: AnimationConfig;
  speed: number;
  id?: string;
  isPlayer: boolean;
};

export abstract class CharacterGameObject extends Phaser.Physics.Arcade.Sprite {
  protected _controlsComponent: ControlComponent;
  protected _speedComponent: SpeedComponent;
  protected _directionComponent: DirectionComponent;
  protected _animationComponent: AnimationComponent;
  protected _stateMachine: StateMachine;
  protected _isPlayer: boolean;

  constructor(config: CharacterConfig) {
    const { scene, position, assetKey, frame, speed, animationConfig, inputComponent, id, isPlayer } = config;
    const { x, y } = position;
    super(scene, x, y, assetKey, frame || 0);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this._controlsComponent = new ControlComponent(this, inputComponent);
    this._speedComponent = new SpeedComponent(this, speed);
    this._directionComponent = new DirectionComponent(this);
    this._animationComponent = new AnimationComponent(this, animationConfig);

    // this.play({ key: PLAYER_ANIMATION_KEYS.IDLE_DOWN, repeat: -1 });

    this._stateMachine = new StateMachine(id);
    // this._stateMachine.addState(new IdleState(this));
    // this._stateMachine.addState(new MoveState(this));
    // this._stateMachine.setState(CHARACTER_STATES.IDLE_STATE);

    // gen config
    this._isPlayer = isPlayer;
  }

  get controls(): InputComponent {
    return this._controlsComponent.controls;
  }

  get speed(): number {
    return this._speedComponent.speed;
  }

  get direction(): Direction {
    return this._directionComponent.direction;
  }
  set direction(value: Direction) {
    this._directionComponent.direction = value;
  }

  get animationComponent(): AnimationComponent {
    return this._animationComponent;
  }

  public update(): void {
    this._stateMachine.update();
  }
}
