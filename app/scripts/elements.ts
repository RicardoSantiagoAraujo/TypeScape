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

export const effetsEclair = {
  arena: document.getElementById("effetEclairArena") as HTMLDivElement,
  sea: document.getElementById("effetEclairSea") as HTMLDivElement,
};

export const eclairRandoms = Array.from(
  document.querySelectorAll(`.eclairRandom`) as NodeListOf<HTMLElement>
);
