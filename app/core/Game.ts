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
  objectDict: Record<string, Object> = {};
  objectCounter: number = 0;

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
        // Remove objects from arena
        this.emptyArena();
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

  emptyArena() {
    for (const [key, val] of Object.entries(this.objectDict)) {
      delete this.objectDict[key];
      document.querySelector(`.${(val as Enemy).obstacle_unique_id}`)?.remove();
    }
    this.objectDict = {};
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

  obstactGenerator() {
    let obstact_interval = 1000;
    const intervalId = setInterval(() => {
      for (let i = 0; i < 3; i++) {
        this.objectCounter++;
        let obstact_width = getRandomNumberBetween(30, 150);
        let obstact_height = getRandomNumberBetween(30, 150);
        let obstact_x_position = getRandomNumberBetween(
          0,
          this.settings.arenaWidth - obstact_width
        );
        let obstact_y_position = getRandomNumberBetween(
          0,
          this.settings.arenaHeight - obstact_height
        );
        const enemy = new Enemy(
          obstact_x_position,
          obstact_y_position,
          obstact_width,
          obstact_height,
          25,
          2000
        );
        this.objectDict[enemy.obstacle_unique_id] = enemy;
      }
    }, obstact_interval);
  }

  detectCollisions() {
    let isOngoingCollision: boolean = false;
    for (let enemy of Object.values(this.objectDict)) {
      if (
        this.player.isCollidingWith(enemy as Enemy) &&
        (enemy as Enemy).stateEnemy == "active"
      ) {
        // console.log("Collision detected!");
        this.state = this.player.takeDamage();
        isOngoingCollision = true;
        break; // break out once damage is detected,to avoid taking multiple damage from overlapping obstacts
      } else {
      }
    }
    if (isOngoingCollision) {
      el.character.classList.add("damaged");
    } else {
      el.character.classList.remove("damaged");
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
      el.counters._all.style.display = "block";
      el.playerState._all.style.display = "flex";
      el.actionCooldownTimer._all.style.display = "flex";
      this.state = "ongoing";
      el.audioElement.play();
      console.log("Starting Round");
      this.player.render();
      this.obstactGenerator();
      document.addEventListener("keydown", (event) => {
        if (this._state == "game_over") {
          return 0;
        }
        this.pauseGame(event);
        if (this._state == "paused") {
          return 0;
        }
        this.steps = this._steps + this.player.moveCharacter(event);
        if (this.player.performAction(event)) {
          this.emptyArena();
        }
        this.detectCollisions();
      });
      // Run collision detection on an interval
      const collissionInterval = setInterval(() => {
        this.detectCollisions();
      }, 1000);
    }
  }
}
