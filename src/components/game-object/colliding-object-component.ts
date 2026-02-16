import { GameObject } from '../../common/types';
import { BaseGameObjectComponent } from './base-game-object';

export class CollidingObjectComponent extends BaseGameObjectComponent {
  #objects: GameObject[];

  constructor(gameObject: GameObject) {
    super(gameObject);
    this.#objects = [];
  }

  get objects(): GameObject[] {
    return this.#objects;
  }

  //   adding game object to list
  public add(gameObject: GameObject): void {
    this.#objects.push(gameObject);
  }

  //   reset to list
  public reset(): void {
    this.#objects = [];
  }
}
