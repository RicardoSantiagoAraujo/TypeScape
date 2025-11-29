import { Hitbox } from "./Hitbox.js";
import { elements as el } from "../utils/Elements.js";

export class Enemy extends Hitbox {
  damage: number;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    damage: number
  ) {
    super(x, y, width, height); // Call the Hitbox constructor
    this.damage = damage;

    const div = document.createElement("div");
    // Set the text content of the div
    div.textContent = "ENEMY";

    // Add a class to the div for styling purposes (optional)
    div.classList.add("my-div");

    // Set styles directly on the div (optional)
    div.style.position = "absolute";
    div.style.backgroundColor = "lightblue";
    div.style.left = `${this.x}px`;
    div.style.top = `${this.y}px`;
    div.style.width = `${this.width}px`;
    div.style.height = `${this.height}px`;
    div.style.border = "2px solid #ff0000ff";
    div.style.borderRadius = "8px";
    div.style.fontSize = "16px";
    div.style.textAlign = "center";

    // Append the div to the body of the document
    el.arena.appendChild(div);
  }

  // Additional enemy-specific behavior
  move(dx: number, dy: number) {
    this.x += dx;
    this.y += dy;
  }
}
