import { Hitbox } from "./Hitbox.js";
import { elements as el } from "../utils/Elements.js";

export class Item extends Hitbox {
  private damage: number;
  private spawnDelay: number;
  public stateItem: "inactive" | "active" = "inactive";
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
    Item.counter++;
    this.obstacle_unique_id = `obstact_${Item.counter}`;
    this.damage = damage;
    this.spawnDelay = spawnDelay;

    const div = document.createElement("div");
    div.classList.add(this.obstacle_unique_id);
    // Set the text content of the div
    div.textContent = "";

    // Add a class to the div for styling purposes
    div.classList.add("item", "spawning");

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
      this.stateItem = "active";
    }, this.spawnDelay);
  }
}
