var newGame = document.getElementById('New-Game');
var cancel = document.getElementById('Cancel');
var stats = document.getElementById('Stats');
var winnerText = document.getElementById('winner-Text');
var userText = document.getElementById('userText');
var compText = document.getElementById('compText');
var yourWins = document.getElementById('your-Wins');
var enemyWins = document.getElementById('enemy-Wins');
var round = document.getElementById('counter');
var userSelection = document.getElementsByClassName('button');
var okButton = document.getElementById('ok');
var counter = 0;

var choices = {
  paper: "PAPER",
  rock: "ROCK",
  scissors: "SCISSORS"
};

var choicesArr = [choices.paper, choices.rock, choices.scissors];

var params = {
    currentRound: {
      number: 0,
    },
    playerName: '',
    rounds: 0,
    playerWinThisRound: 0,
    enemyWinThisRound: 0,
    progress: [],
  };

function setStateButtons (element) {
  for (let i = 0; i < userSelection.length; i++) {
    userSelection[i].disabled = element;
  }
}

cancel.addEventListener('click', function(){
  hideModal('new-game-modal');
})

// document.querySelector('.start-game').addEventListener('click', function () {
//   showModal('new-game-modal');
// })

newGame.addEventListener('click', function(){
  params.playerName = document.getElementsByTagName('input')[0].value;
  params.rounds = Number(document.getElementById('rounds').value);
  if(params.playerName === '' || params.rounds === '') {
    setStateButtons(true);
  }
  else if (params.rounds < 0) {
    document.getElementById('rounds').classList.add('red-input');
  }
  else if (params.rounds > 0){
    document.getElementById('rounds').classList.remove('red-input');
    counter = params.rounds;
    params.currentRound = {
      number: 0,
    };
    params.playerWinThisRound = 0;
    params.enemyWinThisRound = 0;
    yourWins.innerHTML = 'Twoje wygrane ' + params.playerWinThisRound;
    enemyWins.innerHTML = 'Wygrane przeciwnika ' + params.enemyWinThisRound;
    hideModal('new-game-modal');
    setStateButtons(false);
  }
})

for(let i = 0; i < userSelection.length; i++) {

  userSelection[i].addEventListener("click", function(event) {
    counter -= 1;
    round.innerHTML = 'Pozostało rund ' + counter;
    var computerChoice = getComputerChoice();
    var userChoice = getUserChoice(i);

    params.currentRound = { number: params.currentRound.number };

    if ( computerChoice === userChoice) {
      winnerText.innerHTML = 'w tej rundzie mamy remis';
      params.currentRound.winner = 'remis';
    }

    else if (
      userChoice === choices.paper && computerChoice === choices.rock ||
      userChoice === choices.rock && computerChoice === choices.scissors ||
      userChoice === choices.scissors && computerChoice === choices.paper
    )
    {
      winnerText.innerHTML = 'w tej rundzie wygrał ' + params.playerName;
      params.playerWinThisRound += 1;
      yourWins.innerHTML = 'Twoje wygrane ' + params.playerWinThisRound;
      params.currentRound.winner = 'player';
    }

    else {
      winnerText.innerHTML = 'w tej rundzie Komputer Wygrał';
      params.enemyWinThisRound += 1;
      enemyWins.innerHTML = 'Wygrane przeciwnika ' + params.enemyWinThisRound;
      params.currentRound.winner = 'computer';
    }

    params.currentRound.number += 1

    choseElementByUser(userChoice);
    choseElementByComp(computerChoice);

    checkGameEnd();
  })
}

function choseElementByUser(userChoice) {
  var user = '';

  if (userChoice === choices.paper){
    user = 'Papier';
  }
  else if (userChoice === choices.rock) {
    user = 'Kamień';
  }
  else {
    user = 'Nożyce';
  }
  userText.innerHTML = 'Wybrałeś ' + user;
  params.currentRound.playerChoice = user;
}

function choseElementByComp(computerChoice) {
  if (computerChoice === choices.paper){
    comp = 'Papier';
  }
  else if (computerChoice === choices.rock) {
    comp = 'Kamień';
  }
  else {
    comp = 'Nożyce';
  }
  compText.innerHTML = 'Komputer wybrał ' +comp;

  params.currentRound.compChoice = comp;
}

function checkGameEnd() {
  //console.log('roundsy', params.playerName, 'params.currentRound', params.currentRound);
  if (params.currentRound.number > 0){
    params.currentRound.playerWin = params.playerWinThisRound;
    params.currentRound.enemy = params.enemyWinThisRound;
  }

  if (params.rounds === params.currentRound.number || counter === 0) {
    setStateButtons(true);
    if (params.playerWinThisRound < params.enemyWinThisRound){
      showModal('gameOver');
    }
    else if (params.playerWinThisRound > params.enemyWinThisRound) {
      document.getElementById('plyName').innerHTML = 'Wygrałeś ' + params.playerName;
      showModal('exit');
    }
    else if (params.playerWinThisRound === params.enemyWinThisRound && params.rounds > 0) {
      showModal('draw');
    }
  }

  params.progress.push(params.currentRound);
}

function gameStats() {
  return params.progress;
}

function getComputerChoice() {
  return choicesArr[Math.floor((Math.random() * 3))];
}

function getUserChoice(index) {
  return choicesArr[index];
}

function showModal(idModal) {
  document.getElementById('modal-overlay').classList.add('show');
  document.getElementById(idModal).classList.add('show');
}

function hideModal (idModal) {
  event.preventDefault();
  document.getElementById('modal-overlay').classList.remove('show');
  document.getElementById(idModal).classList.remove('show');
}
stats.addEventListener('click', function(){
  debugger
  document.getElementById("tab").innerHTML = gameStats();
  console.log(gameStats());
  //params.progress.join('');
})


// var wrapper = document.creatEelement('table');
// var playerScoreEl = document.createElement('span');
//
// document.xxx.appendChild(wrapper);
