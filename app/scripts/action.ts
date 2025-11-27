import {
  actionCharacterEffect,
  effetsEclair,
  eclairRandoms,
  imgCharacter,
} from "./elements.js";
import { settings } from "./settings.js";

function triggerRandomThunderstorm() {
  eclairRandoms.forEach((eclairElement) => {
    eclairElement.classList.add("actionArenaEffect--active");
    setRandomPosition(eclairElement);
  });

  // Play random thunder sound
  const thunderSound = Math.floor(Math.random() * 2) + 1;
  const audioElement = document.getElementById(
    `thunder${thunderSound}`
  ) as HTMLAudioElement;
  audioElement.play();

  // Reset after animation ends
  setTimeout(() => {
    audioElement.pause();
    audioElement.currentTime = 0;
    eclairRandoms.forEach((eclairElement) => {
      eclairElement.classList.remove("actionCharacterEffect--active");
    });
  }, 2000);

  // Apply effects to the environment
  applyEclairEffects();
}

function setRandomPosition(element: HTMLElement) {
  const randomX = Math.random() * settings.arenaWidth - 0;
  const randomY = Math.random() * settings.arenaHeight - 0;
  element.style.top = `${randomY}px`;
  element.style.left = `${randomX}px`;
}

function applyEclairEffects() {
  actionCharacterEffect.classList.add("actionCharacterEffect--active");

  effetsEclair.arena.style.filter =
    "brightness(0.3)contrast(110%)hue-rotate(90deg)";
  effetsEclair.sea.style.filter =
    "brightness(2)contrast(110%)hue-rotate(-90deg)";
  imgCharacter.style.filter = "brightness(2)contrast(110%)";
  effetsEclair.arena.style.transform = "scale(1.03)";

  setTimeout(() => {
    // Reset effects after the animation ends
    actionCharacterEffect.classList.remove("actionCharacterEffect--active");
    effetsEclair.arena.style.filter = "brightness(1)";
    effetsEclair.sea.style.filter = "brightness(1)";
    effetsEclair.arena.style.transform = "scale(1)";
    imgCharacter.style.filter = "brightness(1)";
  }, 500);
}

function onAction(event: KeyboardEvent) {
  // console.log("Trigger action keydown", event.key);
  if (event.key === " ") {
    triggerRandomThunderstorm();
  }
  setTimeout(() => {
    eclairRandoms.forEach((eclair) => {
      eclair.classList.remove("actionArenaEffect--active");
    });
  }, 500);
}

document.addEventListener("keydown", onAction);
