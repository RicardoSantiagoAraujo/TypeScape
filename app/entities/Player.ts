import { elements as el } from "../utils/Elements.js";
import { Action } from "./Action.js";
import { settings } from "../settings.js";
import { Hitbox } from "./Hitbox.js";
import { GameState } from "../core/Game.js";
export class Player extends Hitbox {
  public action: Action;

  constructor(
    public name: string,
    public id: string,
    public hitpoints: number,
    public width: number,
    public height: number,
    public x: number,
    public y: number,
    public speed: number,
    public direction: "Up" | "Down" | "Left" | "Right"
  ) {
    super(x, y, width, height); // Call the Hitbox constructor
    this.hitpoints = hitpoints;
    this.action = new Action(
      settings.actionEffectNumber,
      settings.actionCooldown
    );
  }

  moveCharacter(event: KeyboardEvent) {
    if (event.key === "ArrowDown" || event.key === "s") {
      this.y += this.speed;
      this.direction = "Down";
    } else if (event.key === "ArrowRight" || event.key === "d") {
      this.x += this.speed;
      this.direction = "Right";
    } else if (event.key === "ArrowLeft" || event.key === "q") {
      this.x -= this.speed;
      this.direction = "Left";
    } else if (event.key === "ArrowUp" || event.key === "z") {
      this.y -= this.speed;
      this.direction = "Up";
    } else {
      return;
    }
    // Prevent movement out of bounds
    this.x = Math.max(
      0,
      Math.min(settings.arenaWidth - settings.characterWidth, this.x)
    );
    this.y = Math.max(
      0,
      Math.min(settings.arenaHeight - settings.characterHeight, this.y)
    );
    this.render();
  }

  performAction(event: KeyboardEvent) {
    if (event.key === " ") {
      console.log("Performing action");
      this.action.triggerAction(event);
    }
  }

  public takeDamage(): GameState {
    console.log("Player health: ", this.hitpoints);
    this.hitpoints = this.hitpoints - 1;
    if (this.hitpoints <= 0) {
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
