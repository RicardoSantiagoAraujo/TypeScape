import { Hitbox } from "./Hitbox.js";
import { elements as el } from "../utils/Elements.js";

export class NonPlayerObject extends Hitbox {
  private spawnDelay: number;
  public state: "inactive" | "active" = "inactive";
  unique_id: string;
  private classNames: string[];
  private static counter: number = 0;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    spawnDelay: number,
    classNames: string[]
  ) {
    super(x, y, width, height); // Call the Hitbox constructor
    NonPlayerObject.counter++;
    this.unique_id = `nonPlayerObject_${NonPlayerObject.counter}`;
    this.classNames = classNames;
    this.spawnDelay = spawnDelay;

    const div = document.createElement("div");
    // Set the text content of the div
    div.textContent = "";

    // Add a class to the div for styling purposes
    div.classList.add("nonPlayerObject", this.unique_id, ...classNames, "spawning");

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
      this.state = "active";
    }, this.spawnDelay);
  }
}
