var newGame = document.getElementById('New-Game');
var winnerText = document.getElementById('winner-Text');
var userText = document.getElementById('userText');
var compText = document.getElementById('compText');
var yourWins = document.getElementById('your-Wins');
var enemyWins = document.getElementById('enemy-Wins');
var round = document.getElementById('rounds');
var win =0 ;
var enemy = 0;
var name;
var currentRound = 0
var rounds = 0;
var counter = 0;
var choices = {
  paper: "PAPER",
  rock: 'ROCK',
  scissors: "SCISSORS"
};
var choicesArr = [choices.paper, choices.rock, choices.scissors];

var userSelection = document.getElementsByClassName('button');

disableBtn();


newGame.addEventListener('click', function(){
  name = window.prompt('podaj imię');
  rounds = parseInt(window.prompt('podaj ilość rund'));
  counter = rounds;
  currentRound = 0;
  win = 0;
  enemy = 0;
  yourWins.innerHTML = 'Twoje wygrane ' + win;
  enemyWins.innerHTML = 'Wygrane przeciwnika ' + enemy;
  for (var i = 0; i < userSelection.length; i++) { 
            userSelection[i].disabled = false;
          }       
})



for(let i = 0; i < userSelection.length; i++) {
  userSelection[i].addEventListener("click", function() {
    counter -= 1;
    round.innerHTML = 'Pozostało rund ' + counter;    
    var computerChoice = getComputerChoice();    
    var userChoice = getUserChoice(i);       
  
    if (
      computerChoice === choices.paper && userChoice === choices.paper ||
      computerChoice === choices.rock && userChoice === choices.rock ||
      computerChoice === choices.scissors && userChoice === choices.scissors
    ) {
      winnerText.innerHTML = 'w tej rundzie mamy remis';
    }
    
    else if (
      userChoice === choices.paper && computerChoice === choices.rock || 
      userChoice === choices.rock && computerChoice === choices.scissors || 
      userChoice === choices.scissors && computerChoice === choices.paper
    ) {
      winnerText.innerHTML = 'w tej rundzie wygrał ' + name;
      win += 1;     
      yourWins.innerHTML = 'Twoje wygrane ' + win;
    }
    
    else {
      winnerText.innerHTML = 'w tej rundzie Komputer Wygrał';     
      enemy += 1;        
      enemyWins.innerHTML = 'Wygrane przeciwnika ' + enemy;
    }      
    
    choseElementByUser(userChoice);
    choseElementByComp(computerChoice);
    
    currentRound += 1;
    
    var scoreEnemy = enemy;
    var scoreWiner = win;
    
    checkGameEnd();    
    
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
    }
    
    function checkGameEnd() {
      console.log('rounds', rounds, 'currentRound', currentRound)
      if (rounds === currentRound) {
        disableBtn();
        if (scoreWiner < scoreEnemy){                  
          alert("Game Over Sucker");
        }
        else if (scoreWiner > scoreEnemy) {                  
          alert("Gratulacje Wygrałeś " + name);
        }
      }      
    }
  })
}

function disableBtn() {
  for (var i = 0; i < userSelection.length; i++) { 
    userSelection[i].disabled = true;
  }       
}

function getComputerChoice() {
    return choicesArr[Math.floor((Math.random() * 3))];
}

function getUserChoice(index) {
    return choicesArr[index];
}