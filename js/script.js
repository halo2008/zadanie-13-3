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

var params =
  {
    currentRound: 0,
    playerName: '',
    rounds: [],
    playerWinThisRound: 0,
    enemyWinThisRound: 0,
    progress: [],
  };

function isDisabledButtons (element) {
  for (let i = 0; i < userSelection.length; i++) {
    userSelection[i].disabled = element;
  }
}

isDisabledButtons(true);

cancel.addEventListener('click', function(){
  hideModal('modal-name');
})


newGame.addEventListener('click', function(){
  params.playerName = document.getElementsByTagName('input')[0].value;
  params.rounds = document.getElementById('rounds').value;
  if(params.playerName === '' || params.rounds === '') {
         isDisabledButtons(true);
     }
  else if (params.rounds < 0) {
    document.getElementById('rounds').classList.add('redInput');
  }
  else if (params.rounds > 0){
    params.progress.push('<h1> Nowa Gra </h1>');
    document.getElementById('rounds').classList.remove('redInput');
    counter = params.rounds;
    params.currentRound = 0;
    params.playerWinThisRound = 0;
    params.enemyWinThisRound = 0;
    yourWins.innerHTML = 'Twoje wygrane ' + params.playerWinThisRound;
    enemyWins.innerHTML = 'Wygrane przeciwnika ' + params.enemyWinThisRound;
    hideModal('modal-name');
    isDisabledButtons(false);
  }
})

for(let i = 0; i < userSelection.length; i++) {
  userSelection[i].addEventListener("click", function() {
    counter -= 1;
    round.innerHTML = 'Pozostało rund ' + counter;
    var computerChoice = getComputerChoice();
    var userChoice = getUserChoice(i);

    if ( computerChoice === userChoice) {
      winnerText.innerHTML = 'w tej rundzie mamy remis';
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
    }

    else {
      winnerText.innerHTML = 'w tej rundzie Komputer Wygrał';
      params.enemyWinThisRound += 1;
      enemyWins.innerHTML = 'Wygrane przeciwnika ' + params.enemyWinThisRound;
    }

    choseElementByUser(userChoice);
    choseElementByComp(computerChoice);

    params.currentRound += 1;

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
  params.progress.push('<h3 <br> Wybrałeś ' + user + '</h3>');
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
  params.progress.push('<h3> Komputer wybrał ' + comp + '</h3>');
}

function checkGameEnd() {
  //console.log('roundsy', params.playerName, 'params.currentRound', params.currentRound);
  if (params.currentRound > 0){
    params.progress.push('<br> </h2>'+'<h3> Numer rundy: '+ params.currentRound + '</h3>' + '<h2> Wynik po tej rundzie ' +
    params.playerWinThisRound + " : " + params.enemyWinThisRound);
  }
  if (params.rounds === params.currentRound || counter === 0) {
    isDisabledButtons(true);
    if (params.playerWinThisRound < params.enemyWinThisRound){
      params.progress.push('<h1> <br> Wygrał Komputer </h1>');
      showModal('gameOver');
    }
    else if (params.playerWinThisRound > params.enemyWinThisRound) {
      params.progress.push('<h1> <br> Wygrał ' + params.playerName + '</h1>');
      var namePly = params.playerName;
      document.getElementById('plyName').innerHTML = 'Wygrałeś ' + namePly;
      showModal('exit');
    }
    else if (params.playerWinThisRound === params.enemyWinThisRound && params.rounds > 0) {
      params.progress.push('<h1><br> Remis</h1>');
      showModal('draw');
    }
  }
}

checkGameEnd();

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
  document.getElementById("tab").innerHTML = params.progress.join('');
})
