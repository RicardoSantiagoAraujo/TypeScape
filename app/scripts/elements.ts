export const imgCharacter = document.getElementById(
  "imgCharacter"
) as HTMLImageElement;
export const inputName = document.getElementById(
  "inputName"
) as HTMLInputElement;
export const availableCharacters = document.getElementById(
  "availableCharacters"
) as HTMLDivElement;
export const btnStart = document.getElementById(
  "btnStart"
) as HTMLButtonElement;
export const btnMute = document.getElementById("btnMute") as HTMLButtonElement;
export const audioElement = document.getElementById(
  `themeMusic`
) as HTMLAudioElement;
export const formStart = document.getElementById("formStart") as HTMLDivElement;
export const arena = document.getElementById("arena") as HTMLDivElement;
export const character = document.getElementById("character") as HTMLDivElement;

export const actionCharacterEffect = document.getElementById(
  "actionCharacterEffect"
) as HTMLDivElement;

export const effetsAction = {
  arena: document.getElementById("effetActionArena") as HTMLDivElement,
  sea: document.getElementById("effetActionSea") as HTMLDivElement,
};

export const ActionRandoms = Array.from(
  document.querySelectorAll(`.ActionRandom`) as NodeListOf<HTMLElement>
);

export const actionCooldownTimer = document.querySelector(
  "#actionCooldownTimer .timer"
) as HTMLElement;
