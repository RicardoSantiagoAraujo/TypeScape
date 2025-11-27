export var settings = {
  characterName: "Character",
  characterId: "pikachu",
  availableCharacters: ["pikachu", "farfetchd"],
  MovementDistancePerClick: 50,
  arenaWidth: 530,
  arenaHeight: 530,
  characterHeight: 50,
  characterWidth: 50,
  get startingPositionX() {
    return (this.arenaWidth - this.characterWidth) / 2;
  },
  get startingPositionY() {
    return (this.arenaHeight - this.characterHeight) / 2;
  },
  requireCharacterCreation: true,
};
