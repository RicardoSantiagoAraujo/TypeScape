export const elements = {
  imgCharacter: document.getElementById("imgCharacter") as HTMLImageElement,
  inputName: document.getElementById("inputName") as HTMLInputElement,
  availableCharacters: document.getElementById(
    "availableCharacters"
  ) as HTMLDivElement,
  btnStart: document.getElementById("btnStart") as HTMLButtonElement,
  btnMute: document.getElementById("btnMute") as HTMLButtonElement,
  audioElement: document.getElementById(`themeMusic`) as HTMLAudioElement,
  formStart: document.getElementById("formStart") as HTMLDivElement,
  pauseMenu: document.getElementById("pauseMenu") as HTMLDivElement,
  arena: document.getElementById("arena") as HTMLDivElement,
  character: document.getElementById("character") as HTMLDivElement,
  actionCharacterEffect: document.getElementById(
    "actionCharacterEffect"
  ) as HTMLDivElement,
  sufaceTextures: {
    arena: document.getElementById("arenaTexture") as HTMLDivElement,
    sea: document.getElementById("outerTexture") as HTMLDivElement,
  },
  actionRandomsFunc: () => {
    return Array.from(
      document.querySelectorAll(`.ActionRandom`) as NodeListOf<HTMLElement>
    );
  },
  actionCooldownTimer: document.querySelector(
    "#actionCooldownTimer .timer"
  ) as HTMLElement,
};
