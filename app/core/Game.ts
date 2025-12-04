import { Arena } from "../entities/Arena.js";
import { Player } from "../entities/Player.js";
import { Enemy } from "../entities/Enemy.js";
import { NonPlayerObject } from "../entities/nonPlayerObject.js";
import { Item, itemType } from "../entities/Item.js";
import { Settings } from "./Settings.js";
import { elements as el } from "../utils/Elements.js";
import { getRandomNumberBetween } from "../utils/helper.js";
import { Chronometer } from "../entities/Chronometer.js";

export type GameState = "ongoing" | "paused" | "game_over";

/**
 * Represents the game state and logic
 * @class
 */
export class Game {
  arena: Arena;
  player!: Player;
  settings: Settings;
  chosen_character_id: string = "";
  _state: GameState;
  _score: number;
  score_max: number;
  _steps: number;
  steps_max: number;
  objectDict: Record<"enemies" | "items", Record<string, NonPlayerObject>> = {
    enemies: {},
    items: {},
  };
  objectCounter: number = 0;
  enemyIntervalId: any = null;
  enemyInterval: number; // time between enemy spawns
  enemiesPerSpawn: number; // number of enemies created per spawn
  chronometer: Chronometer;
  constructor(settings: Settings) {
    console.log("Init game...");
    this._state = "paused";
    this.settings = settings;
    this.arena = new Arena(settings.arenaWidth, settings.arenaWidth);
    this._score = 0;
    this.score_max = 0;
    this._steps = 0;
    this.steps_max = 0;
    this.enemyInterval = settings.startingEnemyInterval;
    this.enemiesPerSpawn = settings.startingEnemiesPerSpawn;
    this.activateMuteFunctionality();
    this.chronometer = new Chronometer(
      el.counters.survival_time,
      el.counters.survival_time_max
    );
    el.inputName.value = settings.defaultCharacterName; // Default name
    this.toggleStartButton();
    if (settings.requireCharacterCreation) {
      this.presentAvailableCharacter(settings);
      el.inputName.oninput = this.toggleStartButton;
      el.inputName.onkeydown = (event) => this.startRound(event);
      el.btnStart.onclick = (event) => {
        this.player = new Player(
          el.inputName.value,
          this.chosen_character_id,
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
        this.chosen_character_id = charId;
      }
      labelEl.onclick = (event: Event) => {
        this.chosen_character_id = charId;
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

      this.player.hitpoints = this.player.hitpointsStarting;
      this.steps = 0;
      this.score = 0;
      el.character.classList.remove("dead");
      el.character.classList.remove("damaged");
      this.enemyInterval = this.settings.startingEnemyInterval;
      this.enemiesPerSpawn = this.settings.startingEnemiesPerSpawn;
      this.chronometer.reset();
      el.counters.score.classList.remove("break-record");
      el.counters.steps.classList.remove("break-record");
      setTimeout(() => {
        this.player.x = this.settings.startingPositionX;
        this.player.y = this.settings.startingPositionY;
        this.state = "ongoing";
        this.player.render();
        el.gameOverMenu.style.display = "none";
        this.chronometer.start();
        // Remove objects from arena
        this.emptyArena(["enemies", "items"]);
      }, 1000);
    }
  }

  set steps(newStep: number) {
    this._steps = newStep;
    el.counters.steps.innerHTML = String(this._steps);
    if (this._steps > this.steps_max) {
      this.steps_max = newStep;
      el.counters.steps_max.innerHTML = String(this.steps_max);
      el.counters.steps.classList.add("break-record");
    }
  }

  set score(newScore: number) {
    this._score = newScore;
    el.counters.score.innerHTML = String(newScore);
    if (this._score > this.score_max) {
      this.score_max = newScore;
      el.counters.score_max.innerHTML = String(this.score_max);
      el.counters.score.classList.add("break-record");
    }
  }

  emptyArena(item_types: ("enemies" | "items")[]) {
    // console.log("Empty the arena !");
    for (let item_type of item_types) {
      for (const [key, val] of Object.entries(this.objectDict[item_type])) {
        // console.log(`.${(val as NonPlayerObject).unique_id}`);
        delete this.objectDict[item_type][key];
        let elToDelete = document.querySelector(
          `.${(val as NonPlayerObject).unique_id}`
        );
        elToDelete?.classList.add("destroyed");
        setTimeout(() => {
          elToDelete?.remove();
        }, 500);
      }
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
        this.chronometer.stop();
      } else if (this._state === "paused") {
        console.log("Resume game !");
        this.state = "ongoing"; // Resume the game
        el.pauseMenu.style.display = "none";
        this.chronometer.start();
      }
    }
  }

  enemyGenerator() {
    // If an interval already exists, clear it
    if (this.enemyIntervalId) {
      clearInterval(this.enemyIntervalId);
    }
    // console.log("Enemy interval: ", this.enemyInterval);

    this.enemyIntervalId = setInterval(() => {
      for (let i = 0; i < this.enemiesPerSpawn; i++) {
        if (this._state != "ongoing") {
          return;
        }
        this.objectCounter++;
        let enemy_width = getRandomNumberBetween(30, 150);
        let enemy_height = getRandomNumberBetween(30, 150);
        let enemy_x_position = getRandomNumberBetween(
          0,
          this.settings.arenaWidth - enemy_width
        );
        let enemy_y_position = getRandomNumberBetween(
          0,
          this.settings.arenaHeight - enemy_height
        );
        const enemy = new Enemy(
          enemy_x_position,
          enemy_y_position,
          enemy_width,
          enemy_height,
          1000
        );
        this.objectDict.enemies[enemy.unique_id] = enemy;
      }
    }, this.enemyInterval);
  }

  itemGenerator() {
    let interval = 5000;
    const intervalId = setInterval(() => {
      const probabilities: itemType[] = [
        ...Array(2).fill("health"),
        ...Array(8).fill("point"),
      ];

      const item_type: itemType =
        probabilities[Math.floor(Math.random() * probabilities.length)];
      for (let i = 0; i < 1; i++) {
        if (this._state != "ongoing") {
          return;
        }
        this.objectCounter++;
        let width = 30;
        let height = 30;
        let x_position = getRandomNumberBetween(
          0,
          this.settings.arenaWidth - width
        );
        let y_position = getRandomNumberBetween(
          0,
          this.settings.arenaHeight - height
        );
        const obj = new Item(
          x_position,
          y_position,
          width,
          height,
          1000,
          item_type
        );
        this.objectDict.items[obj.unique_id] = obj;
      }
    }, interval);
  }

  detectCollisions() {
    // --- With Enemies
    let isOngoingEnemyCollision: boolean = false;
    for (let enemy of Object.values(this.objectDict.enemies)) {
      if (
        this.player.isCollidingWith(enemy as Enemy) &&
        (enemy as Enemy).state == "active" &&
        this._state == "ongoing"
      ) {
        // console.log("Collision detected!");
        this.state = this.player.takeDamage();
        isOngoingEnemyCollision = true;
        break; // break out once damage is detected,to avoid taking multiple damage from overlapping enemys
      } else {
      }
    }
    if (isOngoingEnemyCollision) {
      el.character.classList.add("damaged");
    } else {
      el.character.classList.remove("damaged");
    }
    // --- With Items
    let isOngoingItemCollision: boolean = false;
    for (let item of Object.values(this.objectDict.items)) {
      if (
        this.player.isCollidingWith(item as Item) &&
        (item as Item).state == "active"
      ) {
        let itemEl = document.querySelector(`.${item.unique_id}`);
        if ((item as Item).item_type == "point") {
          this.score = this._score + 1;
          // Increase number of action effects to augment visuals
          this.player.action.numberOfEffects += 1;
          this.player.action.createEls();
          // adjust time between enemy spawns
          this.enemyInterval = Math.floor(this.enemyInterval * 0.99);
          // adjust n of enemies per spawn
          this.enemiesPerSpawn =
            this.settings.startingEnemiesPerSpawn +
            Math.floor(this._score / 10);
          this.enemyGenerator();
        } else if ((item as Item).item_type == "health") {
          this.player.hitpoints = this.player._hitpoints + 1;
        }
        delete this.objectDict.items[item.unique_id];
        itemEl?.classList.add("picked");
        console.log(itemEl);
        setTimeout(() => {
          itemEl?.remove();
        }, 200);
        isOngoingItemCollision = true;
      } else {
      }
    }
    if (isOngoingItemCollision) {
      el.character.classList.add("pickup");
    } else {
      el.character.classList.remove("pickup");
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
      this.enemyGenerator();
      this.itemGenerator();
      this.chronometer.start();

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
          this.emptyArena(["enemies"]);
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
