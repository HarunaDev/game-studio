import { Direction, GameObject } from '../../common/types';
import { BaseGameObjectComponent } from './base-game-object';

export class ThrowableObjectComponent extends BaseGameObjectComponent {
  #callback: () => void;

  constructor(gameObject: GameObject, callback = () => undefined) {
    super(gameObject);
    this.#callback = callback;
  }

  // drop object
  public drop(): void {
    this.#callback();
  }

  // drop object
  public throw(direction: Direction): void {
    this.#callback();
  }
}
