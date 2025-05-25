import {resetGame, startGame} from './logic.js';
import {randomWordButton, resetButton} from './dom.js';

export const init = ()=>{
   startGame();
   
   randomWordButton.addEventListener('click', startGame);
   
   resetButton.addEventListener('click', resetGame);
}