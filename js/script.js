const dino = document.querySelector(".dino");
const pontuacao = document.querySelector(".pontuacao");
const contadorpontos = document.querySelector(".contadorpontos");
const background = document.querySelector(".background");
let isjumping = false;
let pontuacaoAtual = 0;
console.log(pontuacao);
let position = 0;
let gameover = false;
function handleKeyUp(event) {
  if (!gameover) {
    if (event.keyCode === 32 || event.keyCode === 38) {
      if (!isjumping) {
        Jump();
      }
    }
  } else {
    location.reload();
  }
}

function Jump() {
  isjumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval);
      //decendo
      let dowInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(dowInterval);
          isjumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + "px";
        }
      }, 70);
    } else {
      position += 20;
      dino.style.bottom = position + "px";
    }
  }, 3);
}

function createCactus() {
  const cactus = document.createElement("div");
  let cactusPosition = 1000;
  let radomTime = Math.random() * 6000;
  console.log(radomTime);
  cactus.style.left = cactusPosition + "px";
  cactus.classList.add("cactus");
  background.appendChild(cactus);

  let leftInterval = setInterval(() => {
    if (cactusPosition <= -60) {
      clearInterval(leftInterval);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      clearInterval(leftInterval);
      document.body.innerHTML = `<div class="game-over"> <h1 class="item-fim" >Fim de jogo </h1> <h2 class="item-fim">pontuação</h2> <p class="item-fim"> ${pontuacaoAtual}</p> </div>`;
      gameover = true;
    }
    {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + "px";
    }
  }, 20);

  setTimeout(createCactus, radomTime);
}

function alterapontuacao() {
  pontuacaoAtual += 1;
  pontuacao.innerHTML = pontuacaoAtual;
}
function contador() {
  if (!gameover) {
    alterapontuacao();
    setTimeout(contador, 800);
  }
}
contador();
createCactus();

document.addEventListener("keyup", handleKeyUp);
