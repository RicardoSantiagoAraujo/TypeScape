
//1) saisir le nom du pokemon et valider avec le bouton ou avec Enter (le nom ne doit pas etre vide !)
//2) Masquer la div formStart, Afficher la div grass, mettre le nom du pokemon en title sur la div pikachu
//3) Gerer les deplacements, pouvoir bouger dans toutes les directions (haut,bas,gauche,droite) => les fleches et / ou zqsd
//4) Modifier la position de la div pikachu en fonction de la direction (+-30px par deplacement) et changer l'image
//5) Verifier que pikachu ne sort pas de la div grass

var posX=0;
var posY=0;
var mouvement=30;
var pokemon="pikachu";
var direction="Down";
var imgPikachu = document.getElementById("imgPikachu") as HTMLImageElement;
imgPikachu.setAttribute("src","assets/img/"+pokemon+direction+".png");


var inputName = document.getElementById("inputName") as HTMLInputElement;
var btnStart = document.getElementById("btnStart") as HTMLButtonElement;
var formStart = document.getElementById("formStart") as HTMLDivElement;
var grass = document.getElementById("grass") as HTMLDivElement;
var pikachu = document.getElementById("pikachu") as HTMLDivElement;
var eclair = document.getElementById("eclair") as HTMLDivElement;
var effetEclairGrass = document.getElementById("effetEclairGrass") as HTMLDivElement;
var effetEclairSea = document.getElementById("effetEclairSea") as HTMLDivElement;
var eclairRandom = document.getElementById("eclairRandom") as HTMLDivElement;
var eclairRandom2 = document.getElementById("eclairRandom2") as HTMLDivElement;
var eclairRandom3 = document.getElementById("eclairRandom3") as HTMLDivElement;
var eclairRandom4 = document.getElementById("eclairRandom4") as HTMLDivElement;
var eclairRandom5 = document.getElementById("eclairRandom5") as HTMLDivElement;
var eclairRandom6 = document.getElementById("eclairRandom6") as HTMLDivElement;
var eclairRandom7 = document.getElementById("eclairRandom7") as HTMLDivElement;
var eclairRandom8 = document.getElementById("eclairRandom8") as HTMLDivElement;
inputName.oninput = function() {
  if(inputName.value != ""){
    btnStart.disabled = false;
  } else {
    btnStart.disabled = true;
  }
}

// btnStart.onclick = function(){
//   formStart.style.display = "none";
//   grass.style.display = "block";
// }

inputName.onkeydown= lancerJeue;
btnStart.onclick = lancerJeue;


function lancerJeue(event: KeyboardEvent | MouseEvent){
  console.log(event)
  if ((event instanceof KeyboardEvent && event.key == "Enter") || event.type=="click"){
    formStart.style.display = "none";
    grass.style.display = "block";
  }
}





console.log(pikachu);
document.onkeydown = deplacement;


function deplacement(event : KeyboardEvent)
{
  console.log("movement!")
  if(event.key=="ArrowDown" || event.key=="s" )
  {
    posY += mouvement;
    direction = "Down";
  }
  else if(event.key=="ArrowRight" || event.key=="d" )
  {
    posX += mouvement;
    direction = "Right";
  }

  else if(event.key=="ArrowLeft" || event.key=="q")
  {
    posX -= mouvement;
    direction = "Left";
  }

  else if(event.key=="ArrowUp" || event.key=="z")
  {
    posY -= mouvement;
    direction = "Up";
  }
  console.log(posY);

  console.log(event.key)
  if (event.key == " "){
     eclair.style.opacity="1";
     eclair.classList.add("eclairAnimation");
    triggerThunder();
    effetEclairGrass.style.filter = "brightness(0.3)contrast(110%)hue-rotate(90deg)";
    effetEclairSea.style.filter = "brightness(2)contrast(110%)hue-rotate(-90deg)";
    imgPikachu.style.filter = "brightness(2)contrast(110%)";
    effetEclairGrass.style.transform = "scale(1.1)";
     setTimeout(function(){
      eclair.style.opacity = "0";
      eclair.classList.remove("eclairAnimation");
      eclairRandom.style.opacity = "0";
      eclairRandom2.style.opacity = "0";
      eclairRandom3.style.opacity = "0";
      eclairRandom4.style.opacity = "0";
      eclairRandom5.style.opacity = "0";
      eclairRandom6.style.opacity = "0";
      eclairRandom7.style.opacity = "0";
      eclairRandom8.style.opacity = "0";

      effetEclairGrass.style.filter = "brightness(1)";
      effetEclairSea.style.filter = "brightness(1)";
      effetEclairGrass.style.transform = "scale(1)";
      imgPikachu.style.filter = "brightness(1)";
     }
     , 500)

    //  eclair.style.display= "block";
    }

  if(posX < 0){posX = 0}
  if(posY < 0){posY = 0}
  if(posX > 660){posX = 660}
  if(posY > 660){posY = 660}


  pikachu.style.top=posY+"px";
  pikachu.style.left=posX+"px";
  imgPikachu.setAttribute("src","assets/img/"+pokemon+direction+".png");

}


console.log(  posX= Math.random()* 700)

function triggerThunder(){
  eclairRandom.classList.add("eclairAnimation2");
  eclairRandom2.classList.add("eclairAnimation2");
  eclairRandom3.classList.add("eclairAnimation2");
  eclairRandom4.classList.add("eclairAnimation2");
  eclairRandom5.classList.add("eclairAnimation2");
  eclairRandom6.classList.add("eclairAnimation2");
  eclairRandom7.classList.add("eclairAnimation2");
  eclairRandom8.classList.add("eclairAnimation2");

  let sound = Math.floor(Math.random()*2) + 1;
  console.log(sound);
  var audioElement  = document.getElementById("thunder" + sound) as HTMLAudioElement;
  audioElement.play();
  setTimeout(function(){
    audioElement.pause();
    audioElement.currentTime = 0;
    eclairRandom.classList.remove("eclairAnimation2");
    eclairRandom2.classList.remove("eclairAnimation2");
    eclairRandom3.classList.remove("eclairAnimation2");
    eclairRandom4.classList.remove("eclairAnimation2");
    eclairRandom5.classList.remove("eclairAnimation2");
    eclairRandom6.classList.remove("eclairAnimation2");
    eclairRandom7.classList.remove("eclairAnimation2");
    eclairRandom8.classList.remove("eclairAnimation2");
  }, 2000)

  let posX2= Math.random()* 700-200;
  let posY2= Math.random()* 700-200;
  let posX3= Math.random()* 700-200;
  let posY3= Math.random()* 700-200;
  let posX4= Math.random()* 700-200;
  let posY4= Math.random()* 700-200;
  let posX5= Math.random()* 700-200;
  let posY5= Math.random()* 700-200;
  let posX6= Math.random()* 700-200;
  let posY6= Math.random()* 700-200;
  let posX7= Math.random()* 700-200;
  let posY7= Math.random()* 700-200;
  let posX8= Math.random()* 700-200;
  let posY8= Math.random()* 700-200;
  let posX9= Math.random()* 700-200;
  let posY9= Math.random()* 700-200;

  eclairRandom.style.top = String(posX2);
  eclairRandom.style.left = String(posY2);
  eclairRandom.style.opacity = "1";

  eclairRandom2.style.top = String(posX3);
  eclairRandom2.style.left = String(posY3);
  eclairRandom2.style.opacity = "1";

  eclairRandom3.style.top = String(posX4);
  eclairRandom3.style.left = String(posY4);
  eclairRandom3.style.opacity = "1";

  eclairRandom4.style.top = String(posX5);
  eclairRandom4.style.left = String(posY5);
  eclairRandom4.style.opacity = "1";

  eclairRandom5.style.top = String(posX6);
  eclairRandom5.style.left = String(posY6);
  eclairRandom5.style.opacity = "1";


  eclairRandom6.style.top = String(posX7);
  eclairRandom6.style.left = String(posY7);
  eclairRandom6.style.opacity = "1";

  eclairRandom7.style.top = String(posX8);
  eclairRandom7.style.left = String(posY8);
  eclairRandom7.style.opacity = "1";

  eclairRandom8.style.top = String(posX9);
  eclairRandom8.style.left = String(posY9);
  eclairRandom8.style.opacity = "1";
}