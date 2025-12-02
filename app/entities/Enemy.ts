import { Hitbox } from "./Hitbox.js";
import { elements as el } from "../utils/Elements.js";
import { NonPlayerObject } from "./nonPlayerObject.js";

export class Enemy extends NonPlayerObject {
  public stateEnemy: "inactive" | "active" = "inactive";
  enemy_unique_id: string;
  private static counterEnemy: number = 0;
  public image_url: string = "../assets/img/textures/blackhole.png";

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    spawnDelay: number
  ) {
    super(x, y, width, height, spawnDelay, ["enemy"]); // Call the Hitbox constructor
    Enemy.counterEnemy++;
    this.enemy_unique_id = `enemy_${Enemy.counterEnemy}`;
    super.updateDivImage(); // Update the div image after setting the new image_url
  }
}
