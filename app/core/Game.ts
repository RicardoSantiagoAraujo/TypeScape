import { Arena } from "../entities/Arena.js";
import { Player } from "../entities/Player.js";
import { Enemy } from "../entities/Enemy.js";
import { Settings } from "./Settings.js";
import { elements as el } from "../utils/Elements.js";

/**
 * Represents the game state and logic
 * @class
 */
export class Game {
  arena: Arena;
  player: Player;
  settings: Settings;
  state: "started" | "paused";

  constructor(settings: Settings) {
    console.log("Init game...");
    this.state = "paused";
    this.settings = settings;
    this.arena = new Arena(settings.arenaWidth, settings.arenaWidth);
    this.player = new Player(
      settings.defaultCharacterName,
      settings.defaultCharacterId,
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
      this.state = "started";
      el.audioElement.play();
      console.log("Starting Round");
      // console.log(this.player)
      this.player.render();
      const enemy = new Enemy(260, 40, 50, 50, 25);
      // Check if the player is colliding with the enemy

      document.addEventListener("keydown", (event) => {
        // console.log("Listening for player movement", event);
        this.player.moveCharacter(event);
        this.player.performAction(event);
        if (this.player.isCollidingWith(enemy)) {
          console.log("Collision detected!");
        } else {
          console.log("No collision.");
        }
      });
    }
  }
}
