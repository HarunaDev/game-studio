import { GameObject } from '../../common/types';
import { InputComponent } from '../input/Input-component';
import { BaseGameObjectComponent } from './base-game-object';

export class ControlComponent extends BaseGameObjectComponent {
  #inputComponent: InputComponent;

  constructor(gameObject: GameObject, inputComponent: InputComponent) {
    super(gameObject);
    this.#inputComponent = inputComponent;
  }

  get controls(): InputComponent {
    return this.#inputComponent;
  }
}
