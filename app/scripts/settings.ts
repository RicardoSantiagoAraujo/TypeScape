export var settings = {
  characterName: "Character",
  characterId: "pikachu",
  availableCharacters: ["pikachu", "farfetchd"],
  MovementDistancePerClick: 50,
  arenaWidth: 550,
  arenaHeight: 550,
  characterHeight: 50,
  characterWidth: 50,
  get startingPositionX() {
    return (this.arenaWidth - this.characterWidth) / 2;
  },
  get startingPositionY() {
    return (this.arenaHeight - this.characterHeight) / 2;
  },
  requireCharacterCreation: true,
  actionCooldown: 3000,
  actionEffect: ["assets/img/eclair2.png","assets/img/eclair3.png"],
  actionEffectNumber: 5,
};
