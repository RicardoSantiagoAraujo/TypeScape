import { Hitbox } from "./Hitbox.js";
import { elements as el } from "../utils/Elements.js";

export class Enemy extends Hitbox {
  private damage: number;
  private spawnDelay: number;
  public stateEnemy: "inactive" | "active" = "inactive";
  obstacle_unique_id: string;
  private static counter: number = 0;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    damage: number,
    spawnDelay: number
  ) {
    super(x, y, width, height); // Call the Hitbox constructor
    Enemy.counter++;
    this.obstacle_unique_id = `obstact_${Enemy.counter}`;
    this.damage = damage;
    this.spawnDelay = spawnDelay;

    const div = document.createElement("div");
    div.classList.add(this.obstacle_unique_id);
    // Set the text content of the div
    div.textContent = "";

    // Add a class to the div for styling purposes
    div.classList.add("enemy", "spawning");

    // Set styles directly on the div
    div.style.left = `${this.x}px`;
    div.style.top = `${this.y}px`;
    div.style.width = `${this.width}px`;
    div.style.height = `${this.height}px`;

    // Append the div to the body of the document
    el.arena.appendChild(div);

    // Add style for fully spawned
    setTimeout(() => {
      div.classList.remove("spawning");
      this.stateEnemy = "active";
    }, this.spawnDelay);
  }

  // Additional enemy-specific behavior
  move(dx: number, dy: number) {
    this.x += dx;
    this.y += dy;
  }
}
