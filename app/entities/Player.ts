import { elements as el } from "../utils/Elements.js";
import { Action } from "./Action.js";
import { settings } from "../settings.js";
import { Hitbox } from "./Hitbox.js";
import { GameState } from "../core/Game.js";
export class Player extends Hitbox {
  public action: Action;
  public _hitpoints: number = 0;

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
    el.playerState.icon.src = `assets/img/characters/${this.id}/${this.id}Down.png`;
    el.playerState.name.innerHTML = name;
    this.hitpointsStarting = hitpointsStarting;
    this.hitpoints = hitpointsStarting;
    this.action = new Action(
      settings.actionEffectNumber,
      settings.actionCooldown
    );
  }

  moveCharacter(event: KeyboardEvent) {
    let isMoved: boolean = false,
      x_new: number = this.x,
      x_old: number = this.x,
      y_new: number = this.y,
      y_old: number = this.y;

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
      return 0;
    }
    // Prevent movement out of bounds
    x_new = Math.max(
      0,
      Math.min(settings.arenaWidth - settings.characterWidth, x_new)
    );
    y_new = Math.max(
      0,
      Math.min(settings.arenaHeight - settings.characterHeight, y_new)
    );
    this.x = x_new;
    this.y = y_new;
    if (x_new != x_old || y_new != y_old) {
      isMoved = true;
    }
    this.render();
    return isMoved ? 1 : 0;
  }

  performAction(event: KeyboardEvent) {
    if (event.key === " ") {
      // console.log("Performing action");
      this.action.triggerAction(event);
    }
  }

  // Setter for hitpoints, updates the DOM with 'O' characters
  set hitpoints(newHitpoints: number) {
    if (newHitpoints < 0) {
      newHitpoints = 0;
    }
    // console.log("Player health:", newHitpoints);
    this._hitpoints = newHitpoints;
    el.playerState.health.innerHTML =
      "<img src='https://png.pngtree.com/png-vector/20220428/ourmid/pngtree-smooth-glossy-heart-vector-file-ai-and-png-png-image_4557871.png' />".repeat(
        newHitpoints
      ); // Update player state in DOM
  }

  public takeDamage(): GameState {
    this.hitpoints = this._hitpoints - 1;
    if (this._hitpoints <= 0) {
      el.character.classList.add("dead");
      el.imgCharacter.src =
        "https://p7.hiclipart.com/preview/415/127/691/8-bit-color-skull-pixel-art-skull.jpg";
      return "game_over";
    } else {
      return "ongoing";
    }
  }

  render() {
    if (el.character) {
      // Update the player's position in the DOM using CSS transforms
      // el.character.style.transform = `translate(${this.x}px, ${this.y}px)`;
      el.character.style.top = `${this.y}px`;
      el.character.style.left = `${this.x}px`;
      el.imgCharacter.src = `assets/img/characters/${this.id}/${this.id}${this.direction}.png`;
    }
  }
}
