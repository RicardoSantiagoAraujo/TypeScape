import { settings } from "./settings.js";
import {
  character,
  arena,
  inputName,
  btnStart,
  btnMute,
  audioElement,
  formStart,
  imgCharacter,
  availableCharacters,
} from "./elements.js";
import "./action.js"; // Import actions to initialize them
var gameState: "started" | "paused" = "paused";
const characterName: string = settings.characterName;
const movementSpeed: number = settings.MovementDistancePerClick;
let posX: number = settings.startingPositionX;
let posY: number = settings.startingPositionY;
let direction: string;

imgCharacter.src = `assets/img/characters/${settings.characterId}/${settings.characterId}Down.png`;
character.style.top = `${posY}px`;
character.style.left = `${posX}px`;
settings.availableCharacters.forEach((charId) => {
  const labelEl = document.createElement("label");
  labelEl.innerHTML = `
    <input type="radio" name="option" value="Option 1" ${
      charId == settings.characterId ? "checked" : ""
    }>
    <img src=${`assets/img/characters/${charId}/${charId}Down.png`} alt=${charId} />
     `;
  if (charId == settings.characterId) {
  }
  labelEl.onclick = () => {
    settings.characterId = charId;
    imgCharacter.src = `assets/img/characters/${settings.characterId}/${settings.characterId}Down.png`;
  };
  availableCharacters.appendChild(labelEl);
});

inputName.oninput = toggleStartButton;
inputName.onkeydown = startGame;
btnStart.onclick = startGame;
if (settings.requireCharacterCreation === false) {
  startGame(new MouseEvent("click"));
}

// Mute / Unmute Theme Music
btnMute.onclick = () => {
  if (audioElement.paused) {
    audioElement.play();
    btnMute.value = "Mute Audio";
  } else {
    audioElement.pause();
    btnMute.value = "Unmute Audio";
  }
};

document.addEventListener("keydown", moveCharacter);

function toggleStartButton() {
  btnStart.disabled = inputName.value === "";
}

function startGame(event: KeyboardEvent | MouseEvent) {
  if (
    event instanceof KeyboardEvent &&
    event.key !== "Enter" &&
    event.type !== "click"
  ) {
    return;
  }

  formStart.style.display = "none";
  arena.style.display = "block";
  gameState = "started";
  audioElement.play();
}

function moveCharacter(event: KeyboardEvent) {
  if (gameState != "started") {
    // console.log("Game not yet started");
    return;
  }
  if (event.key === "ArrowDown" || event.key === "s") {
    posY += movementSpeed;
    direction = "Down";
  } else if (event.key === "ArrowRight" || event.key === "d") {
    posX += movementSpeed;
    direction = "Right";
  } else if (event.key === "ArrowLeft" || event.key === "q") {
    posX -= movementSpeed;
    direction = "Left";
  } else if (event.key === "ArrowUp" || event.key === "z") {
    posY -= movementSpeed;
    direction = "Up";
  } else {
    return;
  }

  // Prevent movement out of bounds
  posX = Math.max(
    0,
    Math.min(settings.arenaWidth - settings.characterWidth, posX)
  );
  posY = Math.max(
    0,
    Math.min(settings.arenaHeight - settings.characterHeight, posY)
  );

  character.style.top = `${posY}px`;
  character.style.left = `${posX}px`;

  imgCharacter.setAttribute(
    "src",
    `assets/img/characters/${settings.characterId}/${settings.characterId}${direction}.png`
  );

  // console.log("posY", posY);
  // console.log("posX", posX);
}
