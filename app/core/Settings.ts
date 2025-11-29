// core/Settings.ts
export interface SettingsConfig {
  characterName: string;
  characterId: string;
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
}

export class Settings {
  characterName: string;
  characterId: string;
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

  constructor(config: SettingsConfig) {
    this.characterName = config.characterName;
    this.characterId = config.characterId;
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
  }
}
