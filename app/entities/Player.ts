import { elements as el } from "../utils/Elements.js";
import { Action } from "./Action.js";
import { settings } from "../settings.js";
import { Hitbox } from "./Hitbox.js";
import { GameState } from "../core/Game.js";
export class Player extends Hitbox {
  public action: Action;
  public _hitpoints: number = 0;
  private frame: number = 1; // direction version
  private lastInputTime = 0;
  private lastInputEvent: KeyboardEvent = new KeyboardEvent(" ");

  constructor(
    public name: string,
    public id: string,
    public hitpointsStarting: number,
    public width: number,
    public height: number,
    public x: number,
    public y: number,
    public speed: number,
    public direction: "Up" | "Down" | "Left" | "Right"
  ) {
    super(x, y, width, height); // Call the Hitbox constructor
    this.name = name;
    el.playerState.icon.src = `assets/img/characters/${this.id}/gif/${this.id}Down.gif`;
    el.playerState.name.innerHTML = name;
    this.hitpointsStarting = hitpointsStarting;
    this.hitpoints = hitpointsStarting;
    this.action = new Action(
      settings.actionEffectNumber,
      settings.actionCooldown
    );
    this.action.createEls();
  }

  determineMovement(event: KeyboardEvent): [number, number, boolean] {
    let isMovementKey: boolean = true,
      x_new: number = this.x,
      y_new: number = this.y;
    if (event.key === "ArrowDown" || event.key === "s") {
      y_new += this.speed;
      this.direction = "Down";
    } else if (event.key === "ArrowRight" || event.key === "d") {
      x_new += this.speed;
      this.direction = "Right";
    } else if (event.key === "ArrowLeft" || event.key === "q") {
      x_new -= this.speed;
      this.direction = "Left";
    } else if (event.key === "ArrowUp" || event.key === "z") {
      y_new -= this.speed;
      this.direction = "Up";
    } else {
      isMovementKey = false;
    }

    return [x_new, y_new, isMovementKey];
  }
  moveCharacter(event: KeyboardEvent) {
    let isMoved: boolean = false,
      x_old: number = this.x,
      y_old: number = this.y;

    // Destructure the result of determineMovement to get x_new, y_new, and isMovementKey
    let [x_new, y_new, isMovementKey] = this.determineMovement(event);

    if (!isMovementKey) {
      return 0;
    }
    // in case i want to know if there was a double movement input or not
    // this.checkIfCombinationInput(event);
    // Prevent movement out of bounds
    x_new = Math.max(
      0,
      Math.min(settings.arenaWidth - settings.characterWidth, x_new as number)
    );
    y_new = Math.max(
      0,
      Math.min(settings.arenaHeight - settings.characterHeight, y_new as number)
    );
    this.x = x_new;
    this.y = y_new;
    if (x_new != x_old || y_new != y_old) {
      isMoved = true;
    }
    isMovementKey ? this.hop() : null;
    this.render();
    return isMoved ? 1 : 0;
  }

  checkIfCombinationInput(event: KeyboardEvent) {
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - this.lastInputTime;

    let result;
    // If the time difference between clicks is small, it's a double-click
    if (timeDifference < 300 && event.key != this.lastInputEvent!.key) {
      // 300ms is a common threshold for double-click
      console.log("Double-click detected!");
      result = true;
    } else {
      console.log("Single-click detected.");
      result = false;
    }

    let previousInputEvent = this.lastInputEvent; // save previous key before overwriting it
    this.lastInputTime = currentTime; // update last input time
    this.lastInputEvent = event; // update last input key
    return [result, previousInputEvent];
  }

  performAction(event: KeyboardEvent) {
    if (event.key === " ") {
      // console.log("Performing action");
      el.character.classList.remove("action", "action");
      setTimeout(() => {
        el.character.classList.add("action");
      }, 0);
      return this.action.triggerAction(event);
    }
  }

  // Setter for hitpoints, updates the DOM with 'O' characters
  set hitpoints(newHitpoints: number) {
    if (newHitpoints < 0) {
      newHitpoints = 0;
    }
    // console.log("Player health:", newHitpoints);
    this._hitpoints = newHitpoints;
    if (newHitpoints <= 3) {
      // If up two n points, show each one
      el.playerState.health.innerHTML =
        "<img src='assets/img/items/heart.png' />".repeat(newHitpoints);
    } else {
      // Display with a number otherwise
      el.playerState.health.innerHTML = `<img src='assets/img/items/heart.png' /> × ${newHitpoints}`;
    }
  }

  public takeDamage(): GameState {
    this.hitpoints = this._hitpoints - 1;
    if (this._hitpoints <= 0) {
      el.character.classList.add("dead");
      el.imgCharacter.src = "assets/img/items/skull.png";
      return "game_over";
    } else {
      return "ongoing";
    }
  }

  nextFrame(): number {
    // omly using half the frames for now
    this.frame += 2;
    if (this.frame >= 5) {
      this.frame = 1;
    }
    // console.log("Frame n :" , this.frame);
    return this.frame;
  }

  render() {
    if (el.character) {
      // Update the player's position in the DOM using CSS transforms
      // el.character.style.transform = `translate(${this.x}px, ${this.y}px)`;
      el.character.style.top = `${this.y}px`;
      el.character.style.left = `${this.x}px`;
      this.frame = this.nextFrame();
      el.imgCharacter.src = `assets/img/characters/${this.id}/${this.id}${this.direction}${this.frame}.png`;
    }
  }

  private hop() {
    el.character.classList.remove("hop", "action");
    setTimeout(() => {
      el.character.classList.add("hop");
    }, 0);
  }
}
