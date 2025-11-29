import { settings } from "./settings.js";

for (let i = 0; i < settings.actionEffectNumber; i++) {
 let rand = Math.floor(Math.random() * settings.actionEffect.length);
 let actionImg = settings.actionEffect[rand];
  document.querySelector(
    "#actionArenaEffect"
  )!.innerHTML += `<img class="ActionRandom" src=${actionImg}>`;
  console.log(actionImg);
}
