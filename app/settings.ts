import { Settings } from "./core/Settings.js";

export var settings = new Settings({
  defaultCharacterName: "Default Name",
  defaultCharacterId: "pikachu",
  availableCharacters: ["pikachu", "farfetchd"],
  movementDistancePerClick: 50,
  arenaWidth: 550,
  arenaHeight: 550,
  startingPositionX: null,
  startingPositionY: null,
  characterHeight: 50,
  characterWidth: 50,
  requireCharacterCreation: true,
  actionCooldown: 3000,
  actionEffect: ["assets/img/eclair2.png", "assets/img/eclair3.png"],
  actionEffectNumber: 15,
});
