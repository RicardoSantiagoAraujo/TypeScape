import { elements as el } from "../utils/Elements.js";
import { settings } from "../settings.js";

/**
 * Class for main player action
 * @class
 */
export class Action {
  actionAvailable: boolean;
  numberOfEffects: number;
  cooldownMilliseconds: number;

  constructor(numberOfEffects: number, cooldownMilliseconds: number) {
    // console.log("Action constructor !");
    this.actionAvailable = true;
    this.numberOfEffects = numberOfEffects;
    this.cooldownMilliseconds = cooldownMilliseconds;
    this.createEls();
  }

  createEls() {
    el.actionArenaEffect.innerHTML = ""; // empty the element to start anew
    for (let i = 0; i < this.numberOfEffects; i++) {
      let currentAction;
      // Obtion A. Completely random:
      //   currentAction = Math.floor(Math.random() * settings.actionEffect.length);
      // Option B. Equal amount of each:
      currentAction = i % settings.actionEffect.length;
      let actionImg = settings.actionEffect[currentAction];
      el.actionArenaEffect.innerHTML += `<div class="ActionRandom"><img class="ActionRandomImg" src=${actionImg}><div/>`;
      // console.log(actionImg);
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
    }, this.cooldownMilliseconds);

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
    let characterEffects: string[] = [
      "assets/img/actions/bolt1.png",
      "assets/img/actions/bolt2.png",
      "assets/img/actions/bolt3.png",
      "assets/img/actions/bolt4.png",
    ];
    el.actionCharacterEffect.src =
      characterEffects[Math.floor(Math.random() * characterEffects.length)];
    el.actionCharacterEffect.classList.add("actionCharacterEffect--active");

    el.sufaceTextures.arena.style.filter =
      "brightness(0.3)contrast(110%)hue-rotate(90deg)";
    el.sufaceTextures.sea.style.filter =
      "brightness(2)contrast(110%)hue-rotate(-90deg)";
    el.imgCharacter.style.filter = "brightness(2)contrast(110%)";
    el.sufaceTextures.arena.style.transform = "scale(1.03)";

    setTimeout(() => {
      // Reset effects after the animation ends
      el.sufaceTextures.arena.style.filter = "brightness(1)";
      el.sufaceTextures.sea.style.filter = "brightness(1)";
      el.sufaceTextures.arena.style.transform = "scale(1)";
      el.imgCharacter.style.filter = "brightness(1)";
    }, 500);
    setTimeout(() => {
      // Once cooldown is finished, make animation available
      el.actionCharacterEffect.classList.remove(
        "actionCharacterEffect--active"
      );
    }, this.cooldownMilliseconds);
  }

  triggerAction(event: KeyboardEvent) {
    if (this.actionAvailable) {
      this.triggerRandomEffects();
      this.restartCountdown();
      setTimeout(() => {
        el.actionRandomsFunc().forEach((action) => {
          action.classList.remove("actionArenaEffect--active");
        });
      }, this.cooldownMilliseconds);
      this.actionAvailable = false;
      setTimeout(() => {
        this.actionAvailable = true;
      }, this.cooldownMilliseconds);
      return true;
    }
  }

  timeFormat(time: number): string {
    return String(Math.round((time / 1000) * 100) / 100) + " s";
  }

  /**
   * Function to reset skill cooldown countdown
   */
  restartCountdown() {
    var countdownTime = this.cooldownMilliseconds;
    el.actionCooldownTimer.timer.classList.remove("ready");
    el.actionCooldownTimer.timer.innerHTML = this.timeFormat(countdownTime);
    var stepSize = 100;
    const interval = setInterval(() => {
      countdownTime = countdownTime - stepSize; // Decrease the time by 1 second

      // Display the remaining time
      el.actionCooldownTimer.timer.innerHTML = this.timeFormat(countdownTime);

      // If the countdown reaches 0, stop the timer and display "EXPIRED"
      if (countdownTime <= 0) {
        clearInterval(interval);
        el.actionCooldownTimer.timer.innerHTML = "READY";
        el.actionCooldownTimer.timer.classList.add("ready");
      }
    }, stepSize); // Update the countdown every second
  }
}
