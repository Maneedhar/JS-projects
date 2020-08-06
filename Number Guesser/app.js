/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

//Game values
let min = 1,
    max = 10,
    winningNum = getRandom(max, min),
    guessesLeft = 3;

//UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

//Assign min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again')
  {
    window.location.reload();
  }
})

//Listen for guess
guessBtn.addEventListener('click', function()
{
  let guess = parseInt(guessInput.value);

  //Validate input
  if(isNaN(guess) || guess < min || guess > max)
  {
    setMsg(`Please enter a number between  ${min} and ${max}`, 'red');
  }

  //check if won
  else if (guess === winningNum)
  {
    //Game Over - Won
    gameOver(true, `${winningNum} is correct. You Won!`);
  }
  else
  {
    guessesLeft -= 1;

    if(guessesLeft === 0)
    {
      //Game Over - lost
      guessInput.value = '';
      gameOver(false, `Game over, you lost. Correct number is ${winningNum}`, 'red');
    }
    else
    {
      //Game continues - answer wrong

      //change border color 
      guessInput.style.borderColor = 'red';

      //Clear Input
      guessInput.value = '';

      //Wrong number 
      setMsg(`${guess} is not correct. Guess another number. ${guessesLeft} guesses left`, 'red');

    }
  }

});

//Game over
function gameOver(won, msg)
{
  let color;
  won === true ? color = 'green' : color = 'red';
  //Disable input
  guessInput.disabled = true;
  //Change border color
  guessInput.style.borderColor = color;
  //Set text color
  message.style.color = color;
  //Set message
  setMsg(msg);

  //Play Again?
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

// Winning Number
function getRandom(min, max) 
{
  return Math.floor(Math.random()*(max - min + 1) + min);
}

//set message
function setMsg(msg, color)
{
  message.style.color = color;
  message.textContent = msg;
}