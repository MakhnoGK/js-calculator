import 'normalize.css';
import './main.scss';

const calculatorKeys = document.querySelector('.calculator__keys');
const screen = document.querySelector('.calculator__screen');

const calculatorState = {
  input: '0',
  firstNumber: undefined,
  operator: undefined,
};

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
    clear();
    return;
  }

  // Case when we press math operator
  if (
    e.target.dataset.type === 'operator' &&
    e.target.dataset.operation != 'clear' &&
    e.target.dataset.operation != 'equals'
  ) {
    selectOperator(e.target.dataset.operation);
    return;
  }

  // Equals operator
  if (
    e.target.dataset.type === 'operator' &&
    e.target.dataset.operation === 'equals'
  ) {
    calculate();
    return;
  }

  numberInput(e.target);
});

/**
 * Perform a calculation and re-render.
 */
function calculate() {
  if (calculatorState.operator === undefined) return;

  const secondNumber = +calculatorState.input;

  let result = '';
  switch (calculatorState.operator) {
    case 'plus':
      result = +calculatorState.firstNumber + secondNumber;
      break;
    case 'minus':
      result = +calculatorState.firstNumber - secondNumber;
      break;
    case 'times':
      result = +calculatorState.firstNumber * secondNumber;
      break;
    case 'divide':
      result = +calculatorState.firstNumber / secondNumber;
      break;
    default:
      console.error('Something goes wrong...');
      break;
  }

  calculatorState.firstNumber = result;
  calculatorState.input = calculatorState.firstNumber;
  render();
}

/**
 * @param  { Element } source - button element to get number from
 */
function numberInput(source) {
  if (calculatorState.input === '0') {
    calculatorState.input = source.innerText;
  } else {
    calculatorState.input += source.innerText;
  }

  render();
}

/**
 * @param  { string } operator - operator from data- attribute
 */
function selectOperator(operator) {
  calculatorState.operator = operator;
  calculatorState.firstNumber = calculatorState.input;
  calculatorState.input = '0';
  render();
}

/**
 * Assign default values to the state and re-render.
 */
function clear() {
  calculatorState.firstNumber = undefined;
  calculatorState.operator = undefined;
  calculatorState.input = '0';
  render();
}

/**
 * Render screen contents depend on state.
 */
function render() {
  screen.innerText = calculatorState.input;
}
