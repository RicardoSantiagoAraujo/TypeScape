import { Player } from "../entities/Player";
import { Input } from "./Input";

export class Game {
  player: Player;
  input: Input;

  constructor() {
    this.player = new Player(100, 100);
    this.input = new Input();
  }

  update(dt: number) {
    this.player.update(dt, this.input);
  }

  render() {
    this.player.render();
  }
}
