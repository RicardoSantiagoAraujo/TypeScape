import { Settings } from "./core/Settings.js";

export var settings = new Settings({
  defaultCharacterName: "Default Name",
  defaultCharacterId: "pikachu",
  availableCharacters: [
    "pikachu",
    "farfetchd",
    "psyduck",
    "snorlax",
    "jigglypuff",
    "gengar",
    "ditto",
    "raichu",
    "mewtwo",
    "ninetails",
    "magikarp",
    "dragonite",
  ],
  movementDistancePerClick: 50,
  arenaWidth: 750, // must change in variables.scss too
  arenaHeight: 500, // must change in variables.scss too
  startingPositionX: null,
  startingPositionY: null,
  characterHeight: 50, // must change in variables.scss too
  characterWidth: 50, // must change in variables.scss too
  requireCharacterCreation: true,
  actionCooldown: 3000,
  actionEffect: [
    "assets/img/actions/lightning1.png",
    "assets/img/actions/lightning2.png",
    "assets/img/actions/lightning3.png",
    "assets/img/actions/lightning4.png",
    "assets/img/actions/lightning5.png",
    "assets/img/actions/lightning6.png",
    "assets/img/actions/lightning7.png",
  ],
  actionEffectNumber: 5,
  startingEnemyInterval: 1000,
  startingEnemiesPerSpawn: 3,
  enemyBackgroundImage: "../assets/img/textures/space_reduced.png",
});
