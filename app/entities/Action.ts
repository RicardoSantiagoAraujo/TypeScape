import { elements as el } from "../utils/Elements.js";
import { settings } from "../settings.js";
import { timeFormat } from "../utils/helper.js";
export class Action {
  actionAvailable: boolean;
  numberOfEffects: number;
  cooldownMilliseconds: number;

  constructor(numberOfEffects: number, cooldownMilliseconds: number) {
    this.actionAvailable = true;
    this.numberOfEffects = numberOfEffects;
    this.cooldownMilliseconds = cooldownMilliseconds;

    for (let i = 0; i < settings.actionEffectNumber; i++) {
      let currentAction;
      // Obtion A. Completely random:
      //   currentAction = Math.floor(Math.random() * settings.actionEffect.length);
      // Option B. Equal amount of each:
      currentAction = i % settings.actionEffect.length;
      let actionImg = settings.actionEffect[currentAction];
      document.querySelector(
        "#actionArenaEffect"
      )!.innerHTML += `<img class="ActionRandom" src=${actionImg}>`;
      console.log(actionImg);
    }
  }

  triggerRandomEffects() {
    el.actionRandomsFunc().forEach((actionElement) => {
      actionElement.classList.add("actionArenaEffect--active");
      this.setRandomPosition(actionElement);
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
      el.actionRandomsFunc().forEach((actionElement) => {
        actionElement.classList.remove("actionCharacterEffect--active");
      });
    }, 2000);

    // Apply effects to the environment
    this.applyActionEffects();
  }

  setRandomPosition(element: HTMLElement) {
    const randomX = Math.random() * settings.arenaWidth - 0;
    const randomY = Math.random() * settings.arenaHeight - 0;
    element.style.top = `${randomY}px`;
    element.style.left = `${randomX}px`;
  }

  applyActionEffects() {
    el.actionCharacterEffect.classList.add("actionCharacterEffect--active");

    el.effetsAction.arena.style.filter =
      "brightness(0.3)contrast(110%)hue-rotate(90deg)";
    el.effetsAction.sea.style.filter =
      "brightness(2)contrast(110%)hue-rotate(-90deg)";
    el.imgCharacter.style.filter = "brightness(2)contrast(110%)";
    el.effetsAction.arena.style.transform = "scale(1.03)";

    setTimeout(() => {
      // Reset effects after the animation ends
      el.actionCharacterEffect.classList.remove(
        "actionCharacterEffect--active"
      );
      el.effetsAction.arena.style.filter = "brightness(1)";
      el.effetsAction.sea.style.filter = "brightness(1)";
      el.effetsAction.arena.style.transform = "scale(1)";
      el.imgCharacter.style.filter = "brightness(1)";
    }, 500);
  }

  triggerAction(event: KeyboardEvent) {
    if (this.actionAvailable) {
      this.triggerRandomEffects();
      this.restartCountdown();
      setTimeout(() => {
        el.actionRandomsFunc().forEach((action) => {
          action.classList.remove("actionArenaEffect--active");
        });
      }, 500);
      this.actionAvailable = false;
      setTimeout(() => {
        this.actionAvailable = true;
      }, this.cooldownMilliseconds);
    }
  }

  restartCountdown() {
    var countdownTime = settings.actionCooldown;
    el.actionCooldownTimer.classList.remove("ready");
    el.actionCooldownTimer.innerHTML = timeFormat(countdownTime);
    var stepSize = 100;
    const interval = setInterval(function () {
      countdownTime = countdownTime - stepSize; // Decrease the time by 1 second

      // Display the remaining time
      el.actionCooldownTimer.innerHTML = timeFormat(countdownTime);

      // If the countdown reaches 0, stop the timer and display "EXPIRED"
      if (countdownTime <= 0) {
        clearInterval(interval);
        el.actionCooldownTimer.innerHTML = "READY";
        el.actionCooldownTimer.classList.add("ready");
      }
    }, stepSize); // Update the countdown every second
  }
}
