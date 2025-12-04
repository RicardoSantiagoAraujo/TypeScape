import { NonPlayerObject } from "./nonPlayerObject.js";
import { elements as el } from "../utils/Elements.js";

export type itemType = "health" | "point";
export class Item extends NonPlayerObject {
  public stateItem: "inactive" | "active" = "inactive";
  public item_type: itemType;
  item_unique_id: string;
  private static counterItem: number = 0;
  public image_url: string;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    spawnDelay: number,
    item_type: itemType
  ) {
    super(x, y, width, height, spawnDelay, ["item", item_type]); // Call the NonPlayerObject constructor
    Item.counterItem++;
    this.item_unique_id = `item_${Item.counterItem}`;
    this.item_type = item_type;

    switch (item_type) {
      case "health": {
        this.image_url = "assets/img/items/heart.png";
        break;
      }
      case "point": {
        this.image_url = "assets/img/items/coin.png";
        break;
      }
      default: {
        this.image_url = "assets/img/items/skull.png";
        break;
      }
    }
    super.addElement();
  }
}
