import { GameObject } from '../../common/types';
import { BaseGameObjectComponent } from './base-game-object';

export class HeldGameObjectComponent extends BaseGameObjectComponent {
  #object: GameObject | undefined;

  constructor(gameObject: GameObject) {
    super(gameObject);
  }

  get object(): GameObject | undefined {
    return this.#object;
  }

  set object(object: GameObject) {
    this.#object = object;
  }

  // drop object
  public drop(): void {
    this.#object = undefined;
  }
}
