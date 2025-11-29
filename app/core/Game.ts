import { Player } from "../entities/Player.js";
import { Input } from "./Input.js";
import { Settings } from "./Settings.js";

export class Game {
  player: Player;
  input: Input;
  settings: Settings;
  state: "started" | "paused";

  constructor(settings: Settings) {
    console.log("Init game...");
    this.state = "paused";
    this.settings = settings;
    this.player = new Player(100, 100);
    this.input = new Input();
  }

  update(dt: number) {
    // this.player.update(dt, this.input);
  }

  render() {
    // this.player.render();
  }
}
