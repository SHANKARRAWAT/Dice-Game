'use strict';
const score0 = document.querySelector('#score--0');
// const currentScore = document.querySelector('#current--0');
const pl0 = document.querySelector('.player--0');

const pl1 = document.querySelector('.player--1');
const score1 = document.querySelector('#score--1');

const newGame = document.querySelector('.btn--new');
const rollDice = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');

const img = document.querySelector('.dice');
img.classList.add('hidden');

let playing,
  activeplayer,
  score = [],
  scorepl;

const init = function () {
  score0.textContent = 0;
  score1.textContent = 0;

  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;

  activeplayer = 0;
  score[0] = 0;
  score[1] = 0;
  scorepl = 0;
  playing = true;

  img.classList.add('hidden');
};

init();
// switching between the player;
const switchplayer = function () {
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  activeplayer = activeplayer === 0 ? 1 : 0;
  scorepl = 0;
  pl0.classList.toggle('player--active');
  pl1.classList.toggle('player--active');
};

// roll the dice
rollDice.addEventListener('click', function () {
  if (!playing) return;
  const diceNumber = Math.trunc(Math.random() * 6) + 1;
  img.classList.remove('hidden');
  img.src = `dice-${diceNumber}.png`;

  if (diceNumber != 1) {
    scorepl += diceNumber;
    document.getElementById(`current--${activeplayer}`).textContent = scorepl;
    // currentScore.textContent = scorepl;
  } else {
    switchplayer();
  }
});

//on Hold;
hold.addEventListener('click', function () {
  if (!playing) return;

  score[activeplayer] += scorepl;
  document.getElementById(`score--${activeplayer}`).textContent =
    score[activeplayer];
  if (score[activeplayer] >= 10) {
    playing = false;
    document
      .querySelector(`.player--${activeplayer}`)
      .classList.add('player--winner');

    document
      .querySelector(`.player--${activeplayer}`)
      .classList.remove('player--active');

    // console.log(`player ${activeplayer + 1} wins`);
  } else {
    switchplayer();
  }
});

//reset game
newGame.addEventListener('click', function () {
  const pla = document.querySelector(`.player--${activeplayer}`);
  pla.classList.remove('player--winner');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');

  init();
});
