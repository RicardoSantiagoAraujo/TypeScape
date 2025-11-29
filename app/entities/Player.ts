import { elements as el } from "../utils/Elements.js";
import { settings } from "../settings.js";
export class Player {
  constructor(
    public name: string,
    public id: string,
    public width: number,
    public height: number,
    public x: number,
    public y: number,
    public speed: number,
    public direction: "Up" | "Down" | "Left" | "Right"
  ) {}

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
