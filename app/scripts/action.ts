import {
  actionCharacterEffect,
  effetsEclair,
  eclairRandoms,
  imgCharacter,
  actionCooldownTimer,
} from "./elements.js";
import { settings } from "./settings.js";

var actionAvailable: boolean = true;
var actionDuration: 5000;

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
  // console.log("action available: ", actionAvailable);
  // console.log("Trigger action keydown", event.key);
  if (event.key === " ") {
    if (actionAvailable) {
      triggerRandomThunderstorm();
      restartCountdown();
      setTimeout(() => {
        eclairRandoms.forEach((eclair) => {
          eclair.classList.remove("actionArenaEffect--active");
        });
      }, 500);
      actionAvailable = false;
      setTimeout(() => {
        actionAvailable = true;
      }, settings.actionCooldown);
    }
  }
}

document.addEventListener("keydown", (event) => {
  onAction(event);
});

function timeFormat(time: number): string {
  return String(Math.round((time / 1000) * 100) / 100) + "s";
}

function restartCountdown() {
  var countdownTime = settings.actionCooldown;
  actionCooldownTimer.classList.remove("ready");
  actionCooldownTimer.innerHTML = timeFormat(countdownTime);
  var stepSize = 100;
  const interval = setInterval(function () {
    countdownTime = countdownTime - stepSize; // Decrease the time by 1 second

    // Display the remaining time
    actionCooldownTimer.innerHTML = timeFormat(countdownTime);

    // If the countdown reaches 0, stop the timer and display "EXPIRED"
    if (countdownTime <= 0) {
      clearInterval(interval);
      actionCooldownTimer.innerHTML = "READY";
      actionCooldownTimer.classList.add("ready");
    }
  }, stepSize); // Update the countdown every second
}
