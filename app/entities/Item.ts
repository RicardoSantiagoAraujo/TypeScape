import { NonPlayerObject } from "./nonPlayerObject.js";
import { elements as el } from "../utils/Elements.js";

export class Item extends NonPlayerObject {
  public stateItem: "inactive" | "active" = "inactive";
  item_unique_id: string;
  private static counterItem: number = 0;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    spawnDelay: number
  ) {
    super(x, y, width, height, spawnDelay, ["item"]); // Call the Hitbox constructor
    Item.counterItem++;
    this.item_unique_id = `item_${Item.counterItem}`;
  }
}
