import { settings } from "./settings.js";

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
