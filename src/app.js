////////////////
/**
 * Class representing a Calculator.
 */
class Calculator {
	/**
	 * Create a Calculator instance.
	 * @param {Object} previousOperandTextElement - The text element for the previous operand.
	 * @param {Object} currentOperandTextElement - The text element for the current operand.
	 */
	constructor(previousOperandTextElement, currentOperandTextElement) {
		this.previousOperandTextElement = previousOperandTextElement
		this.currentOperandTextElement = currentOperandTextElement
		this.clear()
	}

	/**
	 * Clear the current and previous operands and the current operation.
	 */
	clear() {
		this.currentOperand = ''
		this.previousOperand = ''
		this.operation = undefined
	}

	/**
	 * Delete the last character from the current operand.
	 */
	deleteLastCharacter() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1)
	}

	/**
	 * Append a number to the current operand.
	 * @param {string} number - The number to append.
	 */
	appendNumber(number) {
		if (number === '.' && this.currentOperand.includes('.')) return
		this.currentOperand = this.currentOperand.toString() + number.toString()
	}

	/**
	 * Choose the operation for computation.
	 * @param {string} operation - The operation symbol.
	 */
	chooseOperation(operation) {
		if (this.currentOperand === '') return
		if (this.previousOperand !== '') {
			this.compute()
		}
		this.operation = operation
		this.previousOperand = this.currentOperand
		this.currentOperand = ''
	}

	/**
	 * Perform the computation based on the operation, previous and current operands.
	 */
	compute() {
		let computation
		const prev = parseFloat(this.previousOperand)
		const current = parseFloat(this.currentOperand)
		if (isNaN(prev) || isNaN(current)) return

		switch (this.operation) {
			case '+':
				computation = prev + current
				break
			case '-':
				computation = prev - current
				break
			case '*':
				computation = prev * current
				break
			case '÷':
				if (current === 0) {
					alert('Cannot divide by zero')
					return
				}
				computation = prev / current
				break
			default:
				return
		}
		this.currentOperand = computation
		this.operation = undefined
		this.previousOperand = ''
	}
	/**
	 * Append a number to the current operand.
	 * @param {number} number - The number to display.
	 */
	getDisplayNumber(number) {
		const stringNumber = number.toString()
		const integerDigits = parseFloat(stringNumber.split('.')[0])
		const decimalDigits = stringNumber.split('.')[1]
		let integerDisplay
		if (isNaN(integerDigits)) {
			integerDisplay = ''
		} else {
			integerDisplay = integerDigits.toLocaleString('en', {
				maximumFractionDigits: 0,
			})
		}
		if (decimalDigits != null) {
			return `${integerDisplay}.${decimalDigits}`
		} else {
			return integerDisplay
		}
	}
	/**
	 * Update the display elements with the current and previous operands.
	 */
	updateDisplay() {
		this.currentOperandTextElement.innerText = this.getDisplayNumber(
			this.currentOperand
		)
		this.previousOperandTextElement.innerText = this.previousOperand
		if (this.operation != null) {
			this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
				this.previousOperand
			)}${this.operation}`
		}
	}
}

// DOM Elements
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equal]')
const clearAllButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const previousOperandTextElement = document.querySelector(
	'[data-previous-operand]'
)
const currentOperandTextElement = document.querySelector(
	'[data-current-operand]'
)

// Create calculator instance
const calculator = new Calculator(
	previousOperandTextElement,
	currentOperandTextElement
)

// Event Listeners
numberButtons.forEach((button) => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.innerText)
		calculator.updateDisplay()
	})
})

operationButtons.forEach((button) => {
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.innerText)
		calculator.updateDisplay()
	})
})

equalButton.addEventListener('click', () => {
	calculator.compute()
	calculator.updateDisplay()
})

clearAllButton.addEventListener('click', () => {
	calculator.clear()
	calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
	calculator.deleteLastCharacter()
	calculator.updateDisplay()
})

var checkbox = document.querySelector('input[name=checkbox]')

checkbox.addEventListener('change', function () {
	if (this.checked) {
		document.body.setAttribute('data-theme', 'dark')
	} else {
		document.body.setAttribute('data-theme', 'light')
	}
})
