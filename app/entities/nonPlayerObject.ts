import { Hitbox } from "./Hitbox.js";
import { elements as el } from "../utils/Elements.js";

export class NonPlayerObject extends Hitbox {
  private spawnDelay: number;
  public state: "inactive" | "active" = "inactive";
  unique_id: string;
  private classNames: string[];
  private static counter: number = 0;
  public image_url: string = "https://pngimg.com/d/coin_PNG36871.png";
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
  }

  public addElement() {
    const div = document.createElement("div");
    const bgImg = document.createElement("div");
    // Set the text content of the div
    div.textContent = "";

    // Add a class to the div for styling purposes
    div.classList.add(
      "nonPlayerObject",
      this.unique_id,
      ...this.classNames,
      "spawning"
    );
    bgImg.classList.add("nonPlayerObject__bg-img");

    // Set styles directly on the div
    div.style.left = `${this.x}px`;
    div.style.top = `${this.y}px`;
    div.style.width = `${this.width}px`;
    div.style.height = `${this.height}px`;
    bgImg.style.backgroundImage = `url(${this.image_url})`;

    // Append the div to the body of the document
    div.appendChild(bgImg);
    el.arena.appendChild(div);

    // Add style for fully spawned
    setTimeout(() => {
      div.classList.remove("spawning");
      this.state = "active";
    }, this.spawnDelay);
  }

  // Update the image of the div element when `image_url` changes
  public updateElement() {
    const div = document.querySelector(
      `.${this.unique_id} .nonPlayerObject__bg-img`
    ) as HTMLElement;
    if (div) {
      div.style.backgroundImage = `url(${this.image_url})`;
    }
  }
}
