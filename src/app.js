import 'normalize.css';
import './main.scss';

const calculator = document.querySelector('.calculator');
const calculatorKeys = document.querySelector('.calculator__keys');
const screen = document.querySelector('.calculator__screen');

// TODO: Refactor code: decouple all possible code
// TODO: Move state from datasets to object
// TODO: Refactor code: move all code to classes?
calculatorKeys.addEventListener('click', (e) => {
  e.preventDefault();
  if (!e.target.closest('button')) return;

  // Handle comma insertion
  if (e.target.dataset.type === 'comma' && !screen.innerText.includes('.')) {
    screen.innerText += '.';
    return;
  }

  // Clear operator
  if (
    e.target.dataset.type === 'operator' &&
    e.target.dataset.operation === 'clear'
  ) {
    screen.innerText = '0';
    delete calculator.dataset.previousOperator;
    delete calculator.dataset.firstNumber;
    return;
  }

  // Case when we press math operator
  if (
    e.target.dataset.type === 'operator' &&
    e.target.dataset.operation != 'clear' &&
    e.target.dataset.operation != 'equals'
  ) {
    calculator.dataset.previousOperator = e.target.dataset.operation;
    calculator.dataset.firstNumber = screen.innerText;
    screen.innerText = '0';

    return;
  }

  // Equals operator
  if (
    e.target.dataset.type === 'operator' &&
    e.target.dataset.operation === 'equals'
  ) {
    if (calculator.dataset.previousOperator === undefined) return;

    const secondNumber = screen.innerText;

    let result = '';
    switch (calculator.dataset.previousOperator) {
      case 'plus':
        result = +calculator.dataset.firstNumber + +secondNumber;
        break;
      case 'minus':
        result = +calculator.dataset.firstNumber - +secondNumber;
        break;
      case 'times':
        result = +calculator.dataset.firstNumber * +secondNumber;
        break;
      case 'divide':
        result = +calculator.dataset.firstNumber / +secondNumber;
        break;
      default:
        console.error('Something goes wrong...');
        break;
    }

    screen.innerText = result;
    calculator.dataset.firstNumber = result;
    return;
  }

  if (screen.innerText === '0') {
    screen.innerText = e.target.innerText;
  } else {
    screen.innerText += e.target.innerText;
  }
});
