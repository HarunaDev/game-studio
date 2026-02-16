import { GameObject, InteractiveObjectType } from '../../common/types';
import { BaseGameObjectComponent } from './base-game-object';

export class InteractingObjectComponent extends BaseGameObjectComponent {
  #objectType: InteractiveObjectType;
  #callback: () => void; // call function to make player do something after interacting with object
  #canInteractCheck: () => boolean;

  constructor(
    gameObject: GameObject,
    objectType: InteractiveObjectType,
    canInteractCheck = () => true,
    callback = () => undefined,
  ) {
    super(gameObject);
    this.#objectType = objectType;
    this.#callback = callback;
    this.#canInteractCheck = canInteractCheck;
  }

  get objectType(): InteractiveObjectType {
    return this.#objectType;
  }

  public interact(): void {
    this.#callback();
  }

  public canInteractWith(): boolean {
    return this.#canInteractCheck();
  }
}
