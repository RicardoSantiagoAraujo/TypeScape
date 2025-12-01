import { Arena } from "../entities/Arena.js";
import { Player } from "../entities/Player.js";
import { Enemy } from "../entities/Enemy.js";
import { Settings } from "./Settings.js";
import { elements as el } from "../utils/Elements.js";
import { getRandomNumberBetween } from "../utils/helper.js";

export type GameState = "ongoing" | "paused" | "game_over";

/**
 * Represents the game state and logic
 * @class
 */
export class Game {
  arena: Arena;
  player: Player;
  settings: Settings;
  _state: GameState;
  _score: number;
  score_max: number;
  _steps: number;
  steps_max: number;

  constructor(settings: Settings) {
    console.log("Init game...");
    this._state = "paused";
    this.settings = settings;
    this.arena = new Arena(settings.arenaWidth, settings.arenaWidth);
    this._score = 0;
    this.score_max = 0;
    this._steps = 0;
    this.steps_max = 0;
    this.player = new Player(
      settings.defaultCharacterName,
      settings.defaultCharacterId,
      3,
      settings.characterHeight,
      settings.characterWidth,
      settings.startingPositionX,
      settings.startingPositionY,
      settings.movementDistancePerClick,
      "Down"
    );
    this.activateMuteFunctionality();
    el.inputName.value = settings.defaultCharacterName; // Default name
    this.toggleStartButton();
    if (settings.requireCharacterCreation) {
      this.presentAvailableCharacter(settings);
      el.inputName.oninput = this.toggleStartButton;
      el.inputName.onkeydown = (event) => this.startRound(event);
      el.btnStart.onclick = (event) => {
        this.player = new Player(
          el.inputName.value,
          this.player.id,
          3,
          settings.characterHeight,
          settings.characterWidth,
          settings.startingPositionX,
          settings.startingPositionY,
          settings.movementDistancePerClick,
          "Down"
        );
        this.startRound(event);
      };
    } else {
      this.startRound(new MouseEvent("click"));
    }
  }

  toggleStartButton(): void {
    el.btnStart.disabled = el.inputName.value === "";
  }

  presentAvailableCharacter(settings: Settings) {
    settings.availableCharacters.forEach((charId: string) => {
      const labelEl = document.createElement("label");
      labelEl.innerHTML = `
        <input type="radio" name="option" value=${charId} ${
        charId == settings.defaultCharacterId ? "checked" : ""
      }>
        <img src=${`assets/img/characters/${charId}/${charId}Down.png`} alt=${charId} />
         `;
      if (charId == settings.defaultCharacterId) {
      }
      labelEl.onclick = (event: Event) => {
        this.player.id = charId;
      };
      el.availableCharacters.appendChild(labelEl);
    });
  }

  activateMuteFunctionality() {
    // Mute / Unmute Theme Music
    el.btnMute.onclick = () => {
      if (el.audioElement.paused) {
        el.audioElement.play();
        el.btnMute.value = "Mute Audio";
      } else {
        el.audioElement.pause();
        el.btnMute.value = "Unmute Audio";
      }
    };
  }

  set state(newState: GameState) {
    // console.log(`State is changing from ${this._state} to ${newState}`);
    this._state = newState;
    if (newState == "game_over") {
      console.log("Game over !");
      el.gameOverMenu.style.display = "block";
      setTimeout(() => {
        this.player.x = this.settings.startingPositionX;
        this.player.y = this.settings.startingPositionY;
        this.player.render();
        el.gameOverMenu.style.display = "none";
        this.state = "ongoing";
        this.player.hitpoints = this.player.hitpointsStarting;
        this.steps = 0;
        el.character.classList.remove("dead");
        el.character.classList.remove("damaged");
      }, 1000);
    }
  }

  set steps(newStep: number) {
    this._steps = newStep;
    el.counters.steps.innerHTML = String(this._steps);
    if (this._steps > this.steps_max) {
      this.steps_max = newStep;
      el.counters.steps_max.innerHTML = String(this.steps_max);
    }
  }

  pauseGame(event: KeyboardEvent) {
    //// STILL NEED TO IMPLEMENT ACTUAL LOGIC
    if (event.key === "Escape") {
      // Pause the game
      if (this._state === "ongoing") {
        console.log("Pause game !");
        this.state = "paused"; // Set the game state to "paused"
        el.pauseMenu.style.display = "block";
      } else if (this._state === "paused") {
        console.log("Resume game !");
        this.state = "ongoing"; // Resume the game
        el.pauseMenu.style.display = "none";
      }
    }
  }

  startRound(event: KeyboardEvent | MouseEvent) {
    if (
      event instanceof KeyboardEvent &&
      event.key !== "Enter" &&
      event.type !== "click"
    ) {
      return;
    }
    if (el.inputName.value != "") {
      el.formStart.style.display = "none";
      el.arena.style.display = "block";
      this.state = "ongoing";
      el.audioElement.play();
      console.log("Starting Round");
      // console.log(this.player)
      this.player.render();
      var enemyList: Enemy[] = [];
      for (let i = 0; i < 5; i++) {
        const enemy = new Enemy(
          getRandomNumberBetween(0, this.settings.arenaWidth),
          getRandomNumberBetween(0, this.settings.arenaHeight),
          getRandomNumberBetween(30, 150),
          getRandomNumberBetween(30, 150),
          25,
          2000
        );
        enemyList.push(enemy);
      }

      document.addEventListener("keydown", (event) => {
        if (this._state == "game_over") {
          return 0;
        }
        this.pauseGame(event);
        if (this._state == "paused") {
          return 0;
        }
        this.steps = this._steps + this.player.moveCharacter(event);
        this.player.performAction(event);
        for (let enemy of enemyList) {
          if (this.player.isCollidingWith(enemy)) {
            console.log("Collision detected!");
            this.state = this.player.takeDamage();
            el.character.classList.add("damaged");
          } else {
            el.character.classList.remove("damaged");
          }
        }
      });
    }
  }
}
