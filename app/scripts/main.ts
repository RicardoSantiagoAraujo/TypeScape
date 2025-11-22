const movementSpeed = 30;
let posX = 0;
let posY = 0;
let direction = "Down";
const pokemon = "pikachu";

const imgPikachu = document.getElementById("imgPikachu") as HTMLImageElement;
const inputName = document.getElementById("inputName") as HTMLInputElement;
const btnStart = document.getElementById("btnStart") as HTMLButtonElement;
const formStart = document.getElementById("formStart") as HTMLDivElement;
const arena = document.getElementById("arena") as HTMLDivElement;
const pikachu = document.getElementById("pikachu") as HTMLDivElement;
const eclair = document.getElementById("eclair") as HTMLDivElement;

const effetsEclair = {
  arena: document.getElementById("effetEclairArena") as HTMLDivElement,
  sea: document.getElementById("effetEclairSea") as HTMLDivElement,
};

const eclairRandoms = Array.from(
  { length: 8 },
  (_, i) => document.getElementById(`eclairRandom${i + 1}`) as HTMLDivElement
);

inputName.oninput = toggleStartButton;
inputName.onkeydown = startGame;
btnStart.onclick = startGame;

document.onkeydown = movePikachu;

function toggleStartButton() {
  btnStart.disabled = inputName.value === "";
}

function startGame(event: KeyboardEvent | MouseEvent) {
  if (
    event instanceof KeyboardEvent &&
    event.key !== "Enter" &&
    event.type !== "click"
  ) {
    return;
  }

  formStart.style.display = "none";
  arena.style.display = "block";
}

function movePikachu(event: KeyboardEvent) {
  if (event.key === "ArrowDown" || event.key === "s") {
    posY += movementSpeed;
    direction = "Down";
  } else if (event.key === "ArrowRight" || event.key === "d") {
    posX += movementSpeed;
    direction = "Right";
  } else if (event.key === "ArrowLeft" || event.key === "q") {
    posX -= movementSpeed;
    direction = "Left";
  } else if (event.key === "ArrowUp" || event.key === "z") {
    posY -= movementSpeed;
    direction = "Up";
  }

  // Prevent movement out of bounds
  posX = Math.max(0, Math.min(660, posX));
  posY = Math.max(0, Math.min(660, posY));

  pikachu.style.top = `${posY}px`;
  pikachu.style.left = `${posX}px`;

  imgPikachu.setAttribute("src", `assets/img/${pokemon}${direction}.png`);

  if (event.key === " ") {
    triggerRandomThunderstorm();
  }

  console.log("posY", posY);
  console.log("posX", posX);
}

function triggerRandomThunderstorm() {
  // Start eclair animations
  eclairRandoms.forEach((eclairElement) => {
    eclairElement.classList.add("eclairAnimation2");
    setRandomPosition(eclairElement);
  });

  // Play random thunder sound
  const thunderSound = Math.floor(Math.random() * 2) + 1;
  const audioElement = document.getElementById(
    `thunder${thunderSound}`
  ) as HTMLAudioElement;
  audioElement.play();

  // Reset after animation ends
  setTimeout(() => {
    audioElement.pause();
    audioElement.currentTime = 0;
    eclairRandoms.forEach((eclairElement) => {
      eclairElement.classList.remove("eclairAnimation2");
    });
  }, 2000);

  // Apply effects to the environment
  applyEclairEffects();
}

function setRandomPosition(element: HTMLElement) {
  const randomX = Math.random() * 700 - 200;
  const randomY = Math.random() * 700 - 200;
  element.style.top = `${randomX}px`;
  element.style.left = `${randomY}px`;
}

function applyEclairEffects() {
  eclair.classList.add("eclairAnimation");

  effetsEclair.arena.style.filter =
    "brightness(0.3)contrast(110%)hue-rotate(90deg)";
  effetsEclair.sea.style.filter =
    "brightness(2)contrast(110%)hue-rotate(-90deg)";
  imgPikachu.style.filter = "brightness(2)contrast(110%)";
  effetsEclair.arena.style.transform = "scale(1.1)";

  setTimeout(() => {
    // Reset effects after the animation ends
    eclair.classList.remove("eclairAnimation");
    effetsEclair.arena.style.filter = "brightness(1)";
    effetsEclair.sea.style.filter = "brightness(1)";
    effetsEclair.arena.style.transform = "scale(1)";
    imgPikachu.style.filter = "brightness(1)";
  }, 500);
}
