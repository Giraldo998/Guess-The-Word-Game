import { wordsDb } from './data.js';
import { inputContainer, mistakesIndicator, numberOfTries, tryItem, wordContainer} from './dom.js';

let currentWord = '';
let mistakes = [];
let errorCounter = 0;
let hitsCounter = 0;

const getRandomWord = () => {
	const randomIndex = Math.floor(Math.random() * wordsDb.length);
	currentWord = wordsDb[randomIndex];
	return wordsDb[randomIndex];
};

const scrambleWord = (word) => {
	const scrambledWord = word.split('').sort(() => Math.random() - 0.5).join('');
	return scrambledWord;
};

const printMistakes = () => {
	mistakesIndicator.innerHTML = mistakes;
	triesIndicator();

	if (errorCounter >= 5) {
		alert('fin del juego');
		resetGame();
	}
};

const triesIndicator = () => {
	if (errorCounter >= 1) {
		tryItem[0].classList.add('active');

		if (errorCounter >= 2) {
			tryItem[1].classList.add('active');
		}
		if (errorCounter >= 3) {
			tryItem[2].classList.add('active');
		}
		if (errorCounter >= 4) {
			tryItem[3].classList.add('active');
		}
		if (errorCounter >= 5) {
			tryItem[4].classList.add('active');
		}
	}
};

const inputChange = (e) => {
	const {value, dataset} = e.target;
	const index = parseInt(dataset.index);

	if (currentWord[index] !== value) {
		if (value !== '') {
			mistakes.push(value);
			errorCounter++;
         numberOfTries.innerHTML = `(${errorCounter}/5)`;
		}
		printMistakes();
	};

   if (currentWord[index] === value) {
      hitsCounter ++;
      if (hitsCounter === currentWord.length) alert('congratulations');
   }
};


const manageInput = (word) => {
	inputContainer.innerHTML = '';

	for (let i = 0; i < word.length; i++) {
		const input = document.createElement('input');
		input.setAttribute('type', 'text');
		input.setAttribute('maxlength', '1');
		input.setAttribute('data-index', i);
		input.setAttribute('placeholder', '_');
		inputContainer.appendChild(input);

		input.addEventListener('input', inputChange);
	}
};

export const startGame = ()=>{
   const word = getRandomWord();
   wordContainer.innerHTML = scrambleWord(word);
   manageInput(word);
}

export const resetGame = () => {
	wordContainer.innerHTML = null;
	inputContainer.innerHTML = null;
	mistakesIndicator.innerHTML = '';
	errorCounter = 0;
   mistakes = [];
   numberOfTries.innerHTML = '(0/5)';

   for (const item of tryItem) {
      item.classList.remove('active')
   }
};