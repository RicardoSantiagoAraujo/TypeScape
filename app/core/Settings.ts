// core/Settings.ts
export interface SettingsConfig {
  defaultCharacterName: string;
  defaultCharacterId: string;
  availableCharacters: string[];
  movementDistancePerClick: number;
  arenaWidth: number;
  arenaHeight: number;
  startingPositionX: number | null;
  startingPositionY: number | null;
  characterHeight: number;
  characterWidth: number;
  requireCharacterCreation: boolean;
  actionCooldown: number;
  actionEffect: string[];
  actionEffectNumber: number;
  startingEnemyInterval: number;
  startingEnemiesPerSpawn: number;
  enemyBackgroundImage: string;
}

export class Settings {
  defaultCharacterName: string;
  defaultCharacterId: string;
  availableCharacters: string[];
  movementDistancePerClick: number;
  arenaWidth: number;
  arenaHeight: number;
  startingPositionX: number;
  startingPositionY: number;
  characterHeight: number;
  characterWidth: number;
  requireCharacterCreation: boolean;
  actionCooldown: number;
  actionEffect: string[];
  actionEffectNumber: number;
  startingEnemyInterval: number;
  startingEnemiesPerSpawn: number;

  enemyBackgroundImage: string;

  constructor(config: SettingsConfig) {
    this.defaultCharacterName = config.defaultCharacterName;
    this.defaultCharacterId = config.defaultCharacterId;
    this.availableCharacters = config.availableCharacters;
    this.movementDistancePerClick = config.movementDistancePerClick;
    this.arenaWidth = config.arenaWidth;
    this.arenaHeight = config.arenaHeight;
    this.startingPositionX = config.startingPositionX
      ? config.startingPositionX
      : (config.arenaWidth - config.characterWidth) / 2;
    this.startingPositionY = config.startingPositionY
      ? config.startingPositionY
      : (config.arenaHeight - config.characterHeight) / 2;
    this.characterHeight = config.characterHeight;
    this.characterWidth = config.characterWidth;
    this.requireCharacterCreation = config.requireCharacterCreation;
    this.actionCooldown = config.actionCooldown;
    this.actionEffect = config.actionEffect;
    this.actionEffectNumber = config.actionEffectNumber;
    this.startingEnemyInterval = config.startingEnemyInterval;
    this.startingEnemiesPerSpawn = config.startingEnemiesPerSpawn;
    this.enemyBackgroundImage = config.enemyBackgroundImage;
  }
}
