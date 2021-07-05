


const d = document;
// DOM var
const $filter = d.querySelector(".filter"),
  $items = d.querySelector(".items"),
  $items2 = d.querySelector(".items2"),
  // ui user and pc
  $userImg = d.querySelector("#user-img"),
  $userChoice = d.querySelector(".user-choice"),
  $pcImg = d.querySelector("#pc-img"),
  $desktopChoice = d.querySelector(".desktop-choice"),
  // score and countDisplay
  $score = d.querySelector(".score-num"),
  $count = d.querySelector(".count"),
  $textAction = d.querySelector(".text-action"),
  $divAction = d.querySelector(".p-action"),
  // btn
  $playAgainBtn = d.querySelector(".again"),
  $resetScoreBtn = d.querySelector(".reset"),
  // modal
  $modal = d.getElementById("myModal"),
  $btn = d.getElementById("myBtn"),
  $span = d.getElementsByClassName("close")[0],
  // background svg
  $tri = d.getElementById("tri");

const paper = 1,
  scissors = 2,
  rock = 3,
  svg = [
    "./images/icon-paper.svg",
    "./images/icon-scissors.svg",
    "./images/icon-rock.svg",
  ];

const color = [
  "border: 15px solid hsl(230, 89%, 62%); box-shadow: -2px 4px 1px hsl(230, 91%, 57%);",
  "border: 15px solid hsl(39, 89%, 49%); box-shadow: -2px 4px 1px hsl(39, 94%, 25%);",
  "border: 15px solid hsl(349, 71%, 52%); box-shadow: -2px 4px 1px hsl(349, 89%, 37%);",
];

// get number random

const getRandom = () => {
  return Math.floor(Math.random() * (4 - 1) + 1);
};

// logic Game

// score
d.addEventListener("DOMContentLoaded", () => {
  localStorage.getItem("score")
    ? ($score.textContent = localStorage.getItem("score"))
    : localStorage.setItem("score", 0);
});

// choice
// user template
const userChoiceTemplate = (num) => {
  $userImg.src = svg[num - 1];
  $userChoice.style.cssText = color[num - 1];
};

const desktopTemplate = (num) => {
  $pcImg.src = svg[num - 1];
  $desktopChoice.style.cssText = color[num - 1];
  $desktopChoice.classList.remove("hidden");
};

// count 3--2---1
const countDown = (num, element) => {
  let down = setInterval(() => {
    if (num == 0) clearInterval(down);
    element.textContent = num;
    num--;
  }, 1000);
};

// desktop template
const desktopChoiceTemplate = (nums) => {
  let choice = getRandom();
  countDown(3, $count);
  setTimeout(() => {
    $count.classList.add("hidden");
    desktopTemplate(choice);
    $divAction.classList.remove("hidden");
    logicWiner(nums,choice);
    $score.textContent = localStorage.getItem("score");
  }, 4000);
};

const logicWiner = (numUser, numPC) => {
  let winner = "You win",
    loser = "you lost",
    draw = "Tie";
  let score = localStorage.getItem("score");
  if (numUser == 1) {
    //el usuario eligio papel
    if (numPC == 1) {
      //pc eligio papel
      $textAction.textContent = draw;
    } else {
      if (numPC == 2) {
        //pc eligio tijera
        $textAction.textContent = loser;
      } else {
        if (numPC == 3) {
          //pc eligio piedra
          $textAction.textContent = winner;
          score++;
        }
      }
    }
  }
  if (numUser == 2) {
    //el usuario eligio tijera
    if (numPC == 1) {
      //pc eligio papel
      $textAction.textContent = winner;
      score++;
    } else {
      if (numPC == 2) {
        //pc eligio tijera
        $textAction.textContent = draw;
      } else {
        if (numPC == 3) {
          //pc eligio piedra
          $textAction.textContent = loser;
        }
      }
    }
  }
  if (numUser == 3) {
    //el usuario eligio piedra
    if (numPC == 1) {
      //pc eligio papel
      $textAction.textContent = loser;
    } else {
      if (numPC == 2) {
        //pc eligio tijera
        $textAction.textContent = winner;
        score++;
      } else {
        if (numPC == 3) {
          //pc eligio piedra
          $textAction.textContent = draw;
        }
      }
    }
  }

  localStorage.setItem("score",score);
};

// ui
const handleChange = (num) => {
  $items.classList.add("filter");
  $items2.classList.remove("filter");
  userChoiceTemplate(num);
  desktopChoiceTemplate(num);
  $tri.classList.add("filter");
};


// play again   and    reset


d.addEventListener("click",(e)=>{
  if(e.target.matches(".again")){
   location.reload();
  }

  if(e.target.matches(".reset")){
   localStorage.clear();
   localStorage.setItem("score", 0);
   $score.textContent = localStorage.getItem("score");
   location.reload();
  }

})


// modal logic

$btn.onclick = function() {
  $modal.style.display = "block";
}

$span.onclick = function() {
  $modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == $modal) {
    $modal.style.display = "none";
  }
}